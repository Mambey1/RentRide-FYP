/**
 * chatNotificationScheduler.js
 *
 * Manages the smart notification logic for unread chat messages:
 *
 * ─ ≤ 3 unread  → schedule email + in-app notification 8 hours after the
 *                  FIRST unread message (delayed). Cancels and reschedules
 *                  if more messages arrive but stays ≤ 3.
 *
 * ─ > 3 unread  → fire email + in-app notification IMMEDIATELY (once per
 *                  unread cycle). Additional messages don't re-trigger.
 *
 * ─ Read event  → cancel any pending timer for that (chat, recipient) pair
 *                  and reset the "instant sent" flag so the cycle can
 *                  start fresh next time.
 *
 * Usage:
 *   import { scheduleUnreadNotification, cancelNotification } from "./chatNotificationScheduler.js";
 *
 *   // On every new message received by a participant:
 *   scheduleUnreadNotification({ chat, recipientId, sender, io });
 *
 *   // When the recipient reads/opens the chat:
 *   cancelNotification(chatId, recipientId);
 */

import User from "../models/User.js";
import {
  createChatUnreadNotification,
  sendChatUnreadEmail,
} from "./notificationHelper.js";
import { getIO } from "../socket/socketServer.js";

// ─── In-Memory State ──────────────────────────────────────────────────────────
// Key: `${chatId}:${recipientId}`
// Value: { timer: Timeout | null, instantSent: boolean, firstUnreadAt: Date | null }
const notificationState = new Map();

const DELAY_MS = 8 * 60 * 60 * 1000; // 8 hours
const THRESHOLD = 3; // messages above this count trigger instant notify

// ─── Helpers ──────────────────────────────────────────────────────────────────
const stateKey = (chatId, recipientId) => `${chatId}:${recipientId}`;

function getState(chatId, recipientId) {
  const key = stateKey(chatId, recipientId);
  if (!notificationState.has(key)) {
    notificationState.set(key, {
      timer: null,
      instantSent: false,
      firstUnreadAt: null,
    });
  }
  return notificationState.get(key);
}

function clearTimer(state) {
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
}

// ─── Core dispatcher ──────────────────────────────────────────────────────────
/**
 * Fire both in-app + email notification for a recipient.
 */
async function fireNotification({ recipientId, sender, chat, unreadCount }) {
  try {
    const recipient = await User.findById(recipientId).select("name email");
    if (!recipient) return;

    // Check if chat is muted for this recipient
    const isMuted = (chat.mutedBy || [])
      .map((id) => id.toString())
      .includes(recipientId.toString());
    if (isMuted) {
      console.log(
        `🔕 Notification suppressed (muted) for user_${recipientId}`
      );
      return;
    }

    // Latest unread message preview (not unsent, not deleted-for recipient)
    const latestMsg = [...chat.messages]
      .reverse()
      .find(
        (m) =>
          m.sender.toString() === sender._id.toString() &&
          !m.read &&
          !m.isUnsent &&
          !(m.deletedFor || [])
            .map((id) => id.toString())
            .includes(recipientId.toString())
      );

    const preview = latestMsg?.message?.substring(0, 120) || "";

    // 1️⃣  In-app notification
    const notification = await createChatUnreadNotification(
      recipientId,
      sender.name,
      chat._id.toString(),
      unreadCount,
      preview,
      chat.chatType,
      chat.vehicleName || null
    );

    // 2️⃣  Push real-time socket event so the bell badge updates instantly
    try {
      const io = getIO();
      if (io && notification) {
        io.to(`user_${recipientId}`).emit("notification_received", {
          notification,
          unreadCount,
        });
      }
    } catch (_) {
      // IO might not be available in test contexts
    }

    // 3️⃣  Email notification
    await sendChatUnreadEmail(
      recipient.email,
      recipient.name,
      sender.name,
      unreadCount,
      preview,
      chat._id.toString(),
      chat.vehicleName || null
    );

    console.log(
      `✅ Chat notification fired → user_${recipientId} (${unreadCount} unread from ${sender.name})`
    );
  } catch (err) {
    console.error("chatNotificationScheduler.fireNotification error:", err);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Called every time a new message arrives for a recipient.
 *
 * @param {Object} params
 * @param {import("../models/Chat.js").default} params.chat - Mongoose Chat doc (already saved)
 * @param {string|ObjectId} params.recipientId
 * @param {{ _id: string|ObjectId, name: string }} params.sender
 */
export async function scheduleUnreadNotification({ chat, recipientId, sender }) {
  const chatId = chat._id.toString();
  const recipientStr = recipientId.toString();

  // Count unread messages from THIS sender to THIS recipient
  const unreadMessages = (chat.messages || []).filter(
    (m) =>
      m.sender.toString() === sender._id.toString() &&
      !m.read &&
      !m.isUnsent &&
      !(m.deletedFor || []).map((id) => id.toString()).includes(recipientStr)
  );

  const unreadCount = unreadMessages.length;
  const state = getState(chatId, recipientStr);

  // Track the timestamp of the first unread message
  if (unreadCount === 1 || !state.firstUnreadAt) {
    state.firstUnreadAt = unreadMessages[0]?.createdAt || new Date();
  }

  console.log(
    `📊 Unread check → chat:${chatId} recipient:${recipientStr} unread:${unreadCount} instantSent:${state.instantSent}`
  );

  // ── Case 1: More than THRESHOLD → instant (once per cycle) ────────────────
  if (unreadCount > THRESHOLD) {
    if (!state.instantSent) {
      state.instantSent = true;
      clearTimer(state); // cancel any pending delayed timer

      console.log(
        `⚡ Instant notification triggered (${unreadCount} unread) → user_${recipientStr}`
      );
      await fireNotification({ recipientId, sender, chat, unreadCount });
    } else {
      console.log(
        `🔕 Instant already sent this cycle, skipping for user_${recipientStr}`
      );
    }
    return;
  }

  // ── Case 2: ≤ THRESHOLD → schedule/reschedule delayed notification ─────────
  // Don't schedule again if instant was already sent (shouldn't happen in practice)
  if (state.instantSent) return;

  // Cancel previous delayed timer (we'll reset based on first unread time)
  clearTimer(state);

  const now = Date.now();
  const firstUnreadTime = new Date(state.firstUnreadAt).getTime();
  const elapsed = now - firstUnreadTime;
  const remaining = Math.max(0, DELAY_MS - elapsed);

  console.log(
    `⏰ Scheduling delayed notification in ${Math.round(remaining / 60000)} min for user_${recipientStr}`
  );

  state.timer = setTimeout(async () => {
    // Re-query fresh chat data so we use current unread counts
    const { default: Chat } = await import("../models/Chat.js");
    const freshChat = await Chat.findById(chatId);
    if (!freshChat) return;

    const stillUnread = (freshChat.messages || []).filter(
      (m) =>
        m.sender.toString() === sender._id.toString() &&
        !m.read &&
        !m.isUnsent &&
        !(m.deletedFor || []).map((id) => id.toString()).includes(recipientStr)
    );

    if (stillUnread.length === 0) {
      console.log(
        `✅ Messages already read, skipping delayed notification for user_${recipientStr}`
      );
      return;
    }

    console.log(
      `📬 Delayed notification firing (${stillUnread.length} unread) → user_${recipientStr}`
    );
    await fireNotification({
      recipientId,
      sender,
      chat: freshChat,
      unreadCount: stillUnread.length,
    });
  }, remaining);
}

/**
 * Called when the recipient reads/opens the chat.
 * Cancels any pending timer and resets the cycle.
 *
 * @param {string} chatId
 * @param {string} recipientId
 */
export function cancelNotification(chatId, recipientId) {
  const key = stateKey(chatId.toString(), recipientId.toString());
  const state = notificationState.get(key);

  if (state) {
    clearTimer(state);
    state.instantSent = false;
    state.firstUnreadAt = null;
    console.log(
      `🔄 Notification cycle reset for chat:${chatId} user:${recipientId}`
    );
  }
}