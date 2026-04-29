// ============================================================
// FILE: Backend/src/routes/aiChatRoutes.js
// PURPOSE: Express route for the AI chatbot endpoint
// MOUNT IN app.js: import aiChatRoutes from "./routes/aiChatRoutes.js"
//                  app.use("/api", aiChatRoutes);
// ============================================================

import express from "express";
import { handleAIChat } from "../utils/aiChatService.js";

const router = express.Router();

/**
 * POST /api/ai-chat
 *
 * Request body:  { message: string }
 *
 * Response:
 * {
 *   type: "rag" | "general" | "error",
 *   message: string,           — AI-generated natural language reply
 *   vehicles: {
 *     cars: Vehicle[],         — matched cars from DB (empty if none)
 *     bikes: Bike[],           — matched bikes from DB (empty if none)
 *   },
 *   hasResults: boolean        — true if DB returned vehicles
 * }
 *
 * No auth required — this is a public chatbot.
 * Rate limiting recommended via express-rate-limit in production.
 */
router.post("/ai-chat", async (req, res) => {
  try {
    const { message } = req.body;

    // ── Input validation ────────────────────────────────────
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        type: "error",
        message: "A message string is required.",
        vehicles: { cars: [], bikes: [] },
        hasResults: false,
      });
    }

    const trimmed = message.trim();

    if (trimmed.length === 0) {
      return res.status(400).json({
        type: "error",
        message: "Message cannot be empty.",
        vehicles: { cars: [], bikes: [] },
        hasResults: false,
      });
    }

    if (trimmed.length > 500) {
      return res.status(400).json({
        type: "error",
        message: "Message is too long. Please keep it under 500 characters.",
        vehicles: { cars: [], bikes: [] },
        hasResults: false,
      });
    }

    // ── Process through RAG pipeline ────────────────────────
    const result = await handleAIChat(trimmed);

    return res.status(200).json(result);
  } catch (error) {
    console.error("[aiChatRoutes] Unhandled error:", error.message);
    return res.status(500).json({
      type: "error",
      message: "Server error. Please try again shortly.",
      vehicles: { cars: [], bikes: [] },
      hasResults: false,
    });
  }
});

export default router;
