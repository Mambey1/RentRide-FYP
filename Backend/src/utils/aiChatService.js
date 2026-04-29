// ============================================================
// FILE: Backend/src/utils/aiChatService.js
//
// ✅ MIGRATED: OpenAI → Google Gemini (gemini-1.5-flash)
// 💰 FREE TIER: 1,500 requests/day, 1M tokens/day at no cost
//
// WHAT CHANGED vs OpenAI version:
//   ❌ Removed:  import OpenAI from "openai"
//   ❌ Removed:  openai.chat.completions.create(...)
//   ✅ Added:    import { GoogleGenerativeAI } from "@google/generative-ai"
//   ✅ Added:    genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
//   ✅ Added:    model.generateContent(prompt)
//
// EVERYTHING ELSE is identical — RAG logic, DB search, filters,
// availability checks, error handling — all unchanged.
// ============================================================

// ── CHANGED: Gemini import instead of OpenAI ─────────────────
import { GoogleGenerativeAI } from "@google/generative-ai";

// ── UNCHANGED: MongoDB models ─────────────────────────────────
import Vehicle from "../models/Vehicle.js";
import UserVehicle from "../models/UserVehicle.js";
import Bike from "../models/Bike.js";
import Booking from "../models/Booking.js";
import BikeBooking from "../models/BikeBooking.js";

// ── CHANGED: Gemini client init instead of OpenAI ────────────
// Key comes from Backend/.env → GEMINI_API_KEY=your_key_here
// Get free key at: https://aistudio.google.com/app/apikey
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// gemini-1.5-flash: fastest, cheapest, 1M tokens/day free
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// ─────────────────────────────────────────────────────────────
// UNCHANGED: Extract structured filters from natural language
//
// Examples:
//   "SUV under 5000"        → { type:"SUV", maxPrice:5000 }
//   "automatic 5 seater"    → { transmission:"Automatic", seats:5 }
//   "scooter bike"          → { vehicleCategory:"bike", type:"Scooter" }
// ─────────────────────────────────────────────────────────────
function extractFilters(message) {
  const msg = message.toLowerCase();

  const filters = {
    type: null,
    maxPrice: null,
    minPrice: null,
    seats: null,
    transmission: null,
    fuelType: null,
    vehicleCategory: null,
  };

  // Detect vehicle category
  if (/bike|motorcycle|scooter|two.?wheel|motorbike/i.test(msg)) {
    filters.vehicleCategory = "bike";
  } else if (
    /car|vehicle|suv|sedan|hatchback|van|pickup|coupe|convertible/i.test(msg)
  ) {
    filters.vehicleCategory = "car";
  }

  // Car type — matches Vehicle.js enum values
  const carTypes = [
    "suv",
    "sedan",
    "hatchback",
    "coupe",
    "convertible",
    "sports",
    "luxury",
    "pickup",
    "van",
    "electric",
    "hybrid",
  ];
  for (const t of carTypes) {
    if (msg.includes(t)) {
      filters.type =
        t === "suv" ? "SUV" : t.charAt(0).toUpperCase() + t.slice(1);
      break;
    }
  }

  // Bike type — matches Bike.js enum values
  if (!filters.type || filters.vehicleCategory === "bike") {
    const bikeTypes = [
      "sports",
      "cruiser",
      "touring",
      "scooter",
      "electric",
      "dirt bike",
      "standard",
    ];
    for (const t of bikeTypes) {
      if (msg.includes(t)) {
        filters.type =
          t === "dirt bike"
            ? "Dirt Bike"
            : t.charAt(0).toUpperCase() + t.slice(1);
        break;
      }
    }
  }

  // Price: "under 5000", "below NPR 3000", "less than 100000"
  const maxMatch = msg.match(
    /(?:under|below|less than|max|maximum|upto|up to)\s*(?:rs\.?|npr\.?)?\s*(\d[\d,]*)/i,
  );
  if (maxMatch) filters.maxPrice = parseInt(maxMatch[1].replace(/,/g, ""));

  // Price: "above 2000", "over 1500", "more than 3000"
  const minMatch = msg.match(
    /(?:above|over|more than|min|minimum|at least)\s*(?:rs\.?|npr\.?)?\s*(\d[\d,]*)/i,
  );
  if (minMatch) filters.minPrice = parseInt(minMatch[1].replace(/,/g, ""));

  // Seats: "5 seater", "7 seat"
  const seatsMatch = msg.match(/(\d+)\s*(?:seat|seater|passenger)/i);
  if (seatsMatch) filters.seats = parseInt(seatsMatch[1]);

  // Transmission
  if (/automatic/i.test(msg)) filters.transmission = "Automatic";
  else if (/manual/i.test(msg)) filters.transmission = "Manual";

  // Fuel
  if (/electric/i.test(msg)) filters.fuelType = "Electric";
  else if (/petrol/i.test(msg)) filters.fuelType = "Petrol";

  return filters;
}

// UNCHANGED: Check if the user is asking about availability/dates
function isAvailabilityQuery(message) {
  return /available|availability|when.*free|is.*booked|next.*available|occupied|free.*date/i.test(
    message,
  );
}

// ─────────────────────────────────────────────────────────────
// UNCHANGED: Retrieve vehicles from MongoDB
//
// 3-pass strategy — guarantees results for vague queries:
//   Pass 1 → structured filters + keyword regex  (specific)
//   Pass 2 → structured filters only             (drop keyword if 0 results)
//   Pass 3 → just { status:"Available" }         (full fallback)
// ─────────────────────────────────────────────────────────────
export async function retrieveVehicles(message) {
  const filters = extractFilters(message);

  // Words too generic to use as search keywords
  const stopWords = new Set([
    "a",
    "an",
    "the",
    "is",
    "are",
    "do",
    "you",
    "have",
    "i",
    "for",
    "in",
    "of",
    "with",
    "that",
    "can",
    "me",
    "show",
    "get",
    "need",
    "want",
    "what",
    "which",
    "any",
    "please",
    "find",
    "looking",
    "tell",
    "us",
    "our",
    "on",
    "at",
    "from",
    "give",
    "much",
    "does",
    "how",
    "cost",
    "price",
    "rent",
    "rental",
    "book",
    "hire",
    "about",
    "some",
    "good",
    "best",
    "cheapest",
    "available",
    "under",
    "above",
    "below",
    "over",
    "daily",
    "per",
    "day",
    "car",
    "bike",
    "vehicle",
    "one",
    "not",
    "but",
    "and",
    "or",
    "also",
    "just",
    "less",
    "than",
    "more",
    "upto",
    "up",
    "perice",
    "prise",
    "all",
    "list",
    "see",
    "cheap",
    "affordable",
    "expensive",
    "new",
    "old",
    "latest",
    "most",
    "very",
  ]);

  const keywords = message
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  const keywordRegex =
    keywords.length > 0 ? new RegExp(keywords.join("|"), "i") : null;

  // Sort cheapest first when no price filter given (good for "cheapest car" queries)
  const cheapestSort =
    filters.maxPrice === null && filters.minPrice === null
      ? { ratePerDay: 1 }
      : {};

  const results = { cars: [], bikes: [] };

  // ── Car search ────────────────────────────────────────────
  if (!filters.vehicleCategory || filters.vehicleCategory === "car") {
    const baseCarQuery = { status: "Available" };
    if (filters.type)
      baseCarQuery.carType = new RegExp(`^${filters.type}$`, "i");
    if (filters.maxPrice !== null || filters.minPrice !== null) {
      baseCarQuery.ratePerDay = {};
      if (filters.maxPrice !== null)
        baseCarQuery.ratePerDay.$lte = filters.maxPrice;
      if (filters.minPrice !== null)
        baseCarQuery.ratePerDay.$gte = filters.minPrice;
    }
    if (filters.seats) baseCarQuery.seats = filters.seats;
    if (filters.transmission) baseCarQuery.gearType = filters.transmission;

    const CAR_SELECT =
      "carName carNumber carType ratePerDay seats gearType airCondition bookingType features description photos status driverName";
    const USER_SELECT =
      "carName carNumber carType ratePerDay seats gearType airCondition bookingType features description vehiclePhotos status";

    // Pass 1: keyword search
    if (keywordRegex) {
      const q = {
        ...baseCarQuery,
        $or: [
          { carName: keywordRegex },
          { carType: keywordRegex },
          { description: keywordRegex },
          { features: keywordRegex },
        ],
      };
      const [a, u] = await Promise.all([
        Vehicle.find(q).select(CAR_SELECT).sort(cheapestSort).limit(5).lean(),
        UserVehicle.find({ ...q, isListed: true, status: "active" })
          .select(USER_SELECT)
          .sort(cheapestSort)
          .limit(3)
          .lean(),
      ]);
      results.cars = [
        ...a.map((c) => ({ ...c, _source: "admin" })),
        ...u.map((c) => ({ ...c, _source: "user" })),
      ];
    }

    // Pass 2: structured filters only
    if (results.cars.length === 0) {
      console.log("[aiChatService] Cars pass 2: filters only");
      const [a, u] = await Promise.all([
        Vehicle.find(baseCarQuery)
          .select(CAR_SELECT)
          .sort(cheapestSort)
          .limit(5)
          .lean(),
        UserVehicle.find({ ...baseCarQuery, isListed: true, status: "active" })
          .select(USER_SELECT)
          .sort(cheapestSort)
          .limit(3)
          .lean(),
      ]);
      results.cars = [
        ...a.map((c) => ({ ...c, _source: "admin" })),
        ...u.map((c) => ({ ...c, _source: "user" })),
      ];
    }

    // Pass 3: full fallback
    if (results.cars.length === 0) {
      console.log("[aiChatService] Cars pass 3: full fallback");
      const [a, u] = await Promise.all([
        Vehicle.find({ status: "Available" })
          .select(CAR_SELECT)
          .sort({ ratePerDay: 1 })
          .limit(5)
          .lean(),
        UserVehicle.find({ status: "active", isListed: true })
          .select(USER_SELECT)
          .sort({ ratePerDay: 1 })
          .limit(3)
          .lean(),
      ]);
      results.cars = [
        ...a.map((c) => ({ ...c, _source: "admin" })),
        ...u.map((c) => ({ ...c, _source: "user" })),
      ];
    }
  }

  // ── Bike search ───────────────────────────────────────────
  if (!filters.vehicleCategory || filters.vehicleCategory === "bike") {
    const baseBikeQuery = { status: "Available" };
    if (filters.type)
      baseBikeQuery.bikeType = new RegExp(`^${filters.type}$`, "i");
    if (filters.maxPrice !== null || filters.minPrice !== null) {
      baseBikeQuery.ratePerDay = {};
      if (filters.maxPrice !== null)
        baseBikeQuery.ratePerDay.$lte = filters.maxPrice;
      if (filters.minPrice !== null)
        baseBikeQuery.ratePerDay.$gte = filters.minPrice;
    }
    if (filters.transmission) baseBikeQuery.transmission = filters.transmission;
    if (filters.fuelType) baseBikeQuery.fuelType = filters.fuelType;

    const BIKE_SELECT =
      "bikeName bikeNumber bikeType brand model ratePerDay engineCapacity fuelType transmission features description photos status helmetIncluded";

    // Pass 1: keyword search
    if (keywordRegex) {
      const q = {
        ...baseBikeQuery,
        $or: [
          { bikeName: keywordRegex },
          { bikeType: keywordRegex },
          { brand: keywordRegex },
          { model: keywordRegex },
          { description: keywordRegex },
        ],
      };
      results.bikes = await Bike.find(q)
        .select(BIKE_SELECT)
        .sort(cheapestSort)
        .limit(5)
        .lean();
    }

    // Pass 2: filters only
    if (results.bikes.length === 0) {
      console.log("[aiChatService] Bikes pass 2: filters only");
      results.bikes = await Bike.find(baseBikeQuery)
        .select(BIKE_SELECT)
        .sort(cheapestSort)
        .limit(5)
        .lean();
    }

    // Pass 3: full fallback
    if (results.bikes.length === 0) {
      console.log("[aiChatService] Bikes pass 3: full fallback");
      results.bikes = await Bike.find({ status: "Available" })
        .select(BIKE_SELECT)
        .sort({ ratePerDay: 1 })
        .limit(5)
        .lean();
    }
  }

  return results;
}

// ─────────────────────────────────────────────────────────────
// UNCHANGED: Get booking dates only — PRIVACY SAFE
// Never exposes: user name, email, phone, payment info
// Only returns: pickup date, return date, booking status
// ─────────────────────────────────────────────────────────────
export async function getAvailabilityInfo(vehicleId, vehicleType = "car") {
  const today = new Date();

  if (vehicleType === "bike") {
    const bookings = await BikeBooking.find({
      bike: vehicleId,
      status: { $in: ["approved", "confirmed", "active"] },
      returnDate: { $gte: today },
    })
      .select("pickupDate returnDate status -_id")
      .sort({ pickupDate: 1 })
      .limit(5)
      .lean();
    return bookings.map((b) => ({
      bookedFrom: b.pickupDate,
      bookedUntil: b.returnDate,
      status: b.status,
    }));
  }

  const bookings = await Booking.find({
    vehicle: vehicleId,
    status: { $in: ["approved", "confirmed", "active"] },
    returnDate: { $gte: today },
  })
    .select("pickupDate returnDate status -_id")
    .sort({ pickupDate: 1 })
    .limit(5)
    .lean();
  return bookings.map((b) => ({
    bookedFrom: b.pickupDate,
    bookedUntil: b.returnDate,
    status: b.status,
  }));
}

// ─────────────────────────────────────────────────────────────
// CHANGED: RAG response — DB context + Gemini (was GPT)
//
// How it works:
//   1. Format vehicle data as clean text (same as before)
//   2. Build a single prompt string (Gemini uses one prompt, not messages array)
//   3. Call model.generateContent(prompt) instead of openai.chat.completions.create()
//   4. Extract text from response.response.text() instead of choices[0].message.content
// ─────────────────────────────────────────────────────────────
export async function ragResponse(message, vehicleData) {
  const { cars = [], bikes = [] } = vehicleData;
  const allVehicles = [...cars, ...bikes];

  // Serialize DB results into readable text context for Gemini
  // Kept SHORT to save tokens (free tier has limits)
  const vehicleContext = allVehicles
    .map((v) => {
      const isBike = !!v.bikeName;
      const name = isBike ? v.bikeName : v.carName;
      const type = isBike ? v.bikeType : v.carType;
      const source = v._source === "user" ? "Community" : "Fleet";
      const features = (v.features || []).slice(0, 3).join(", ") || "Standard";

      const specs = isBike
        ? `Brand:${v.brand || "N/A"} Engine:${v.engineCapacity || "N/A"} Fuel:${v.fuelType || "Petrol"} Helmet:${v.helmetIncluded ? "Yes" : "No"}`
        : `Seats:${v.seats} Gear:${v.gearType} AC:${v.airCondition} Driver:${v.bookingType}`;

      // Availability dates (privacy-safe — no customer info)
      let availNote = "";
      if (v._availability?.length > 0) {
        const dates = v._availability
          .map(
            (a) =>
              `${new Date(a.bookedFrom).toDateString()}→${new Date(a.bookedUntil).toDateString()}`,
          )
          .join(", ");
        availNote = ` [Booked:${dates}]`;
      }

      return `• [${source}] ${name}(${type}) NPR ${v.ratePerDay}/day | ${specs} | ${features}${availNote}`;
    })
    .join("\n");

  // ── CHANGED: Gemini uses a single combined prompt string ──
  // OpenAI used: { role:"system", content:... }, { role:"user", content:... }
  // Gemini uses: one string with instructions + user question + context
  const prompt = `You are a friendly vehicle rental assistant for Rent-Ride, Kathmandu, Nepal.
Prices are in NPR. Be warm, concise, helpful. Max 3 sentences.
Never reveal customer personal information.

User asked: "${message}"

Available vehicles from our database:
${vehicleContext}

Reply naturally. Highlight the best 1-2 options for the user's needs. Keep it short.`;

  // ── CHANGED: Gemini API call ──────────────────────────────
  // OpenAI: const res = await openai.chat.completions.create({ model, messages })
  //         return res.choices[0].message.content
  //
  // Gemini: const res = await model.generateContent(prompt)
  //         return res.response.text()
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ─────────────────────────────────────────────────────────────
// CHANGED: General Gemini response (no DB context)
// Used when no vehicles match the user's query
// ─────────────────────────────────────────────────────────────
export async function generalResponse(message) {
  // ── CHANGED: Single prompt instead of messages array ─────
  const prompt = `You are a helpful vehicle rental assistant for Rent-Ride, Kathmandu, Nepal.
Answer questions about vehicles, driving in Nepal, travel tips, and rental advice.
If asked about specific available vehicles, tell the user to ask something like "show me available SUVs" or "bikes under NPR 2000".
Keep your answer under 3 sentences and be friendly.

User asked: "${message}"`;

  // ── CHANGED: Gemini API call ──────────────────────────────
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ─────────────────────────────────────────────────────────────
// UNCHANGED (mostly): Main handler — RAG hybrid logic
//
// Flow:
//   1. Search MongoDB for matching vehicles (3-pass strategy)
//   2a. If availability query + results → enrich with booking dates → RAG
//   2b. If results found → RAG (DB context + Gemini)
//   2c. No results → general Gemini response
//
// CHANGED: API key check now looks for GEMINI_API_KEY
// CHANGED: Error messages updated for Gemini error codes
// ─────────────────────────────────────────────────────────────
export async function handleAIChat(message) {
  // ── CHANGED: Check GEMINI_API_KEY instead of OPENAI_API_KEY ─
  if (!process.env.GEMINI_API_KEY) {
    console.error("[aiChatService] ❌ GEMINI_API_KEY is missing from .env");
    return {
      type: "error",
      message:
        "AI service is not configured. Please contact the administrator.",
      vehicles: { cars: [], bikes: [] },
      hasResults: false,
    };
  }

  try {
    console.log(`[aiChatService] 💬 "${message}"`);

    // Step 1: Search DB with 3-pass fallback
    const vehicleData = await retrieveVehicles(message);
    const totalFound = vehicleData.cars.length + vehicleData.bikes.length;
    console.log(
      `[aiChatService] ✅ cars:${vehicleData.cars.length} bikes:${vehicleData.bikes.length}`,
    );

    // Step 2a: Availability query — enrich with booking dates
    if (isAvailabilityQuery(message) && totalFound > 0) {
      const isAskingBike =
        vehicleData.bikes.length > 0 && vehicleData.cars.length === 0;
      const top = isAskingBike ? vehicleData.bikes[0] : vehicleData.cars[0];
      const vType = isAskingBike ? "bike" : "car";

      const availability = await getAvailabilityInfo(top._id, vType);
      const enriched = { ...top, _availability: availability };
      const enrichedData = isAskingBike
        ? {
            cars: vehicleData.cars,
            bikes: [enriched, ...vehicleData.bikes.slice(1)],
          }
        : {
            cars: [enriched, ...vehicleData.cars.slice(1)],
            bikes: vehicleData.bikes,
          };

      const aiText = await ragResponse(message, enrichedData);
      return {
        type: "rag",
        message: aiText,
        vehicles: vehicleData,
        hasResults: true,
      };
    }

    // Step 2b: Results found → RAG with Gemini
    if (totalFound > 0) {
      const aiText = await ragResponse(message, vehicleData);
      return {
        type: "rag",
        message: aiText,
        vehicles: vehicleData,
        hasResults: true,
      };
    }

    // Step 2c: No DB results → pure Gemini response
    console.log("[aiChatService] No DB results → general Gemini response");
    const aiText = await generalResponse(message);
    return {
      type: "general",
      message: aiText,
      vehicles: { cars: [], bikes: [] },
      hasResults: false,
    };
  } catch (error) {
    console.error("[aiChatService] ❌ ERROR:", error.message);

    // ── CHANGED: Gemini-specific error codes ─────────────────
    let userMessage =
      "I'm having a little trouble right now. Please try again! 💬";

    const errStr = error?.message?.toLowerCase() || "";
    const status = error?.status || error?.httpStatus;

    if (
      status === 400 ||
      errStr.includes("api_key") ||
      errStr.includes("invalid")
    ) {
      console.error("[aiChatService] → Invalid GEMINI_API_KEY");
      userMessage = "AI service configuration error. Please contact support.";
    } else if (
      status === 429 ||
      errStr.includes("quota") ||
      errStr.includes("rate limit") ||
      errStr.includes("resource_exhausted")
    ) {
      // Gemini free tier: 1,500 req/day, 15 req/min
      // If hitting this, either wait 1 min (rate) or next day (daily quota)
      console.error(
        "[aiChatService] → Gemini rate/quota limit hit. Free tier: 15 req/min, 1500/day",
      );
      userMessage =
        "I'm a bit busy right now — our AI has hit its rate limit. Please try again in a minute, or use our live chat! 💬";
    } else if (
      status === 403 ||
      errStr.includes("permission") ||
      errStr.includes("forbidden")
    ) {
      console.error(
        "[aiChatService] → Gemini API key lacks permission. Check Google AI Studio.",
      );
      userMessage = "AI service permission error. Please contact support.";
    } else if (
      errStr.includes("fetch") ||
      errStr.includes("network") ||
      errStr.includes("econnrefused")
    ) {
      console.error("[aiChatService] → Network error reaching Gemini API");
      userMessage =
        "Connection issue. Please check your internet and try again.";
    }

    console.error("[aiChatService] Full error:", error);

    return {
      type: "error",
      message: userMessage,
      vehicles: { cars: [], bikes: [] },
      hasResults: false,
    };
  }
}
