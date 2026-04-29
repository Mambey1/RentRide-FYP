// ============================================================
// FILE: Frontend/src/components/Chat/AIChatBot.jsx
// Tailwind CSS — design matches Profile.jsx (blue-purple gradient,
// rounded-2xl, shadow-2xl, white cards, border-gray-200)
// ============================================================

import { useState, useRef, useEffect, useCallback } from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaTrash,
  FaCar,
  FaMotorcycle,
  FaSpinner,
  FaChevronDown,
  FaMapMarkerAlt,
} from "react-icons/fa";
import api from "../../services/api";

// ─────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────
const BASE_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

function getCarImage(vehicle) {
  const photos = vehicle.photos || [];
  if (photos.length > 0) return `${BASE_URL}/uploads/vehicles/${photos[0].filename}`;
  const vp = vehicle.vehiclePhotos || [];
  if (vp.length > 0) return vp[0].url || `${BASE_URL}/uploads/user-vehicles/${vp[0].filename}`;
  return null;
}

function getBikeImage(bike) {
  const photos = bike.photos || [];
  if (photos.length > 0) return `${BASE_URL}/uploads/bikes/${photos[0].filename}`;
  return null;
}

function formatNPR(n) {
  return `NPR ${Number(n).toLocaleString("en-NP")}`;
}

// ─────────────────────────────────────────────────────────────
// Suggestion chips
// ─────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { label: "Available SUVs 🚙", query: "Show me available SUVs" },
  { label: "Bikes under NPR 2000 🏍️", query: "Bikes under NPR 2000 per day" },
  { label: "Automatic with AC ❄️", query: "Automatic cars with air condition" },
  { label: "7 seater vehicle 👨‍👩‍👧‍👦", query: "7 seater vehicles available" },
  { label: "Electric vehicles ⚡", query: "Electric vehicles available" },
  { label: "Cheapest cars 💰", query: "Cheapest cars available" },
];

// ─────────────────────────────────────────────────────────────
// VehicleCard — Tailwind, matches Profile.jsx card style
// ─────────────────────────────────────────────────────────────
function VehicleCard({ vehicle, type }) {
  const isBike = type === "bike";
  const name = isBike ? vehicle.bikeName : vehicle.carName;
  const vType = isBike ? vehicle.bikeType : vehicle.carType;
  const imageUrl = isBike ? getBikeImage(vehicle) : getCarImage(vehicle);
  const isUserListing = vehicle._source === "user";
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden mb-2 hover:shadow-lg transition-shadow duration-200">
      {/* Image */}
      <div className="relative w-24 flex-shrink-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center min-h-[88px]">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 p-2">
            {isBike ? (
              <FaMotorcycle className="text-purple-400" size={26} />
            ) : (
              <FaCar className="text-blue-400" size={26} />
            )}
          </div>
        )}
        {/* Source badge */}
        <span
          className={`absolute top-1.5 left-1.5 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full ${
            isUserListing
              ? "bg-gradient-to-r from-emerald-500 to-teal-500"
              : "bg-gradient-to-r from-blue-600 to-purple-600"
          }`}
        >
          {isUserListing ? "Community" : "Fleet"}
        </span>
      </div>

      {/* Details */}
      <div className="flex-1 p-2.5 flex flex-col gap-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <p className="text-xs font-bold text-gray-800 truncate leading-tight">
            {name}
          </p>
          <span
            className={`flex-shrink-0 text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
              vehicle.status === "Available"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {vehicle.status}
          </span>
        </div>

        <p className="text-[10px] text-purple-600 font-semibold">{vType}</p>

        {/* Car specs */}
        {!isBike && (
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            {vehicle.seats && (
              <span className="text-[10px] text-gray-500">👥 {vehicle.seats} seats</span>
            )}
            {vehicle.gearType && (
              <span className="text-[10px] text-gray-500">⚙️ {vehicle.gearType}</span>
            )}
            {vehicle.airCondition && (
              <span className="text-[10px] text-gray-500">❄️ AC: {vehicle.airCondition}</span>
            )}
            {vehicle.bookingType && (
              <span className="text-[10px] text-gray-500">🚗 {vehicle.bookingType}</span>
            )}
          </div>
        )}

        {/* Bike specs */}
        {isBike && (
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            {vehicle.brand && (
              <span className="text-[10px] text-gray-500">🏷️ {vehicle.brand}</span>
            )}
            {vehicle.fuelType && (
              <span className="text-[10px] text-gray-500">⛽ {vehicle.fuelType}</span>
            )}
            {vehicle.engineCapacity && (
              <span className="text-[10px] text-gray-500">🔧 {vehicle.engineCapacity}</span>
            )}
            {vehicle.helmetIncluded && (
              <span className="text-[10px] text-gray-500">⛑️ Helmet incl.</span>
            )}
          </div>
        )}

        {/* Feature tags */}
        {vehicle.features?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {vehicle.features.slice(0, 3).map((f, i) => (
              <span
                key={i}
                className="text-[9px] bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.5 rounded-full font-medium"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-50">
          <span className="text-xs font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {formatNPR(vehicle.ratePerDay)}
            <span className="text-[9px] text-gray-400 font-normal">/day</span>
          </span>
          <FaMapMarkerAlt size={9} className="text-gray-300" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TypingDots
// ─────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-white rounded-2xl rounded-bl-sm border border-gray-200 shadow-sm w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MessageBubble
// ─────────────────────────────────────────────────────────────
function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  if (msg.role === "typing") {
    return (
      <div className="flex items-end gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 mb-1">
          <FaRobot size={12} className="text-white" />
        </div>
        <TypingDots />
      </div>
    );
  }

  const hasCars = msg.vehicles?.cars?.length > 0;
  const hasBikes = msg.vehicles?.bikes?.length > 0;
  const hasVehicles = hasCars || hasBikes;

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-1`}>
      <div
        className={`flex items-end gap-2 max-w-[90%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 self-end mb-1">
          {isUser ? (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-[9px] font-bold">
              Me
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <FaRobot size={12} className="text-white" />
            </div>
          )}
        </div>

        {/* Content column */}
        <div className="flex flex-col gap-1.5 min-w-0">
          {/* Text bubble */}
          <div
            className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
              isUser
                ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
                : "bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm"
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>

          {/* Vehicle cards below bot message */}
          {!isUser && hasVehicles && (
            <div>
              {hasCars &&
                msg.vehicles.cars.slice(0, 4).map((v, i) => (
                  <VehicleCard key={`c${i}`} vehicle={v} type="car" />
                ))}
              {hasBikes &&
                msg.vehicles.bikes.slice(0, 4).map((v, i) => (
                  <VehicleCard key={`b${i}`} vehicle={v} type="bike" />
                ))}
            </div>
          )}

          {/* Timestamp */}
          {msg.timestamp && (
            <p
              className={`text-[10px] text-gray-400 px-1 ${
                isUser ? "text-right" : "text-left"
              }`}
            >
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AIChatBot — main export
// ─────────────────────────────────────────────────────────────
export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "👋 Hi! I'm the Rent-Ride AI assistant.\n\nAsk me about available cars, bikes, prices, or anything vehicle-related. I'm here to help! 🚗🏍️",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (textOverride) => {
      const text = (textOverride ?? input).trim();
      if (!text || loading) return;

      setInput("");
      setLoading(true);
      setHasInteracted(true);

      setMessages((prev) => [
        ...prev,
        { role: "user", content: text, timestamp: new Date() },
      ]);
      setMessages((prev) => [...prev, { role: "typing" }]);

      try {
        const res = await api.post("/ai-chat", { message: text });
        const data = res.data;

        setMessages((prev) => [
          ...prev.filter((m) => m.role !== "typing"),
          {
            role: "bot",
            content: data.message,
            vehicles: data.hasResults ? data.vehicles : null,
            timestamp: new Date(),
          },
        ]);

        if (!isOpen) setUnread((n) => n + 1);
      } catch {
        setMessages((prev) => [
          ...prev.filter((m) => m.role !== "typing"),
          {
            role: "bot",
            content:
              "Sorry, something went wrong. Please try again or use our live chat! 💬",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, isOpen]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "bot",
        content: "Chat cleared! What vehicle are you looking for? 🚗",
        timestamp: new Date(),
      },
    ]);
    setHasInteracted(false);
  };

  return (
    <>
      <style>{`
        @keyframes ai-pulse-ring {
          0%   { box-shadow: 0 0 0 0   rgba(139,92,246,0.5); }
          70%  { box-shadow: 0 0 0 14px rgba(139,92,246,0);  }
          100% { box-shadow: 0 0 0 0   rgba(139,92,246,0);   }
        }
        .ai-fab-pulse { animation: ai-pulse-ring 2.5s infinite; }
        @keyframes ai-slidein {
          from { opacity:0; transform: scale(0.88) translateY(14px); }
          to   { opacity:1; transform: scale(1)    translateY(0);    }
        }
        .ai-slidein { animation: ai-slidein 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>

      {/* ════════════ FLOATING BUTTON ════════════
          bottom-[90px] = above ChatFloatingButton (bottom-6 / 24px)
      ═══════════════════════════════════════════ */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        title="AI Vehicle Assistant"
        className={`fixed bottom-[90px] right-6 z-[9998] w-14 h-14 rounded-full
          bg-gradient-to-r from-blue-600 to-purple-600
          text-white shadow-2xl flex flex-col items-center justify-center gap-0.5
          hover:scale-110 hover:shadow-purple-500/40 transition-all duration-200
          ${!isOpen ? "ai-fab-pulse" : ""}`}
      >
        {isOpen ? (
          <FaTimes size={20} />
        ) : (
          <>
            <FaRobot size={22} />
            <span className="text-[8px] font-bold tracking-wide">AI</span>
          </>
        )}

        {unread > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md border-2 border-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* ════════════ CHAT WINDOW ════════════ */}
      {isOpen && (
        <div
          className="fixed bottom-[160px] right-6 z-[9997] w-[380px] max-h-[70vh]
            flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white ai-slidein"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                <FaRobot size={17} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">
                  Rent-Ride AI
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  <span className="text-white/75 text-[11px]">
                    Vehicle Assistant
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={clearChat}
                title="Clear chat"
                className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition"
              >
                <FaTrash size={12} className="text-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition"
              >
                <FaChevronDown size={13} className="text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2 bg-gray-50/60">
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips */}
          {!hasInteracted && (
            <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-gray-100 bg-white flex-shrink-0">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s.query)}
                  disabled={loading}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-blue-200
                    bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100
                    transition disabled:opacity-50"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-100 bg-white flex-shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about vehicles, prices, availability…"
              disabled={loading}
              maxLength={500}
              className="flex-1 text-sm px-4 py-2.5 rounded-2xl border border-gray-200
                bg-gray-50 text-gray-800 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300
                disabled:opacity-60 transition"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-10 h-10 flex-shrink-0 rounded-2xl
                bg-gradient-to-r from-blue-600 to-purple-600 text-white
                flex items-center justify-center shadow-md
                hover:shadow-purple-400/50 hover:scale-105
                disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
                transition-all duration-150"
            >
              {loading ? (
                <FaSpinner size={14} className="animate-spin" />
              ) : (
                <FaPaperPlane size={13} />
              )}
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-gray-400 text-center py-1.5 px-4 bg-white border-t border-gray-50 flex-shrink-0">
            🤖 AI may not reflect real-time changes ·{" "}
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-600 font-semibold hover:underline"
            >
              Use live chat for bookings
            </button>
          </p>
        </div>
      )}
    </>
  );
}