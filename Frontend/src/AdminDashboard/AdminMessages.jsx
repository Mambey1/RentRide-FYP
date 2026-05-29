
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";
import {
  FaSearch,
  FaSync,
  FaHeadset,
  FaCar,
  FaBan,
  FaUnlock,
  FaTimes,
  FaPaperPlane,
  FaSmile,
  FaImage,
  FaReply,
  FaEllipsisV,
  FaTrash,
  FaCheck,
  FaCheckDouble,
  FaSpinner,
  FaCommentDots,
  FaComments,
  FaUser,
  FaVolumeMute,
  FaVolumeUp,
  FaLock,
  FaInfoCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { useSocket } from "../context/SocketContext";

const BASE = "http://localhost:5000";
const QUICK_REACTIONS = ["❤️", "😂", "😮", "😢", "😡", "👍"];

// ─── API helpers ──────────────────────────────────────────────────────────────
const api = {
  token: () => localStorage.getItem("token") || sessionStorage.getItem("token"),
  headers: () => ({ Authorization: `Bearer ${api.token()}` }),

  // Admin-specific endpoints
  getChats: () =>
    axios
      .get(`${BASE}/api/admin/chats`, { headers: api.headers() })
      .then((r) => r.data),
  getChat: (id) =>
    axios
      .get(`${BASE}/api/admin/chats/${id}`, { headers: api.headers() })
      .then((r) => r.data),
  markRead: (id) =>
    axios
      .put(`${BASE}/api/admin/chats/${id}/read`, {}, { headers: api.headers() })
      .then((r) => r.data),
  blockUser: (id) =>
    axios
      .put(
        `${BASE}/api/admin/chats/${id}/block`,
        {},
        { headers: api.headers() },
      )
      .then((r) => r.data),
  unblockUser: (id) =>
    axios
      .put(
        `${BASE}/api/admin/chats/${id}/unblock`,
        {},
        { headers: api.headers() },
      )
      .then((r) => r.data),

  // Message endpoint — admin route has full socket emit + unread tracking built in
  sendMessage: (id, message, replyToId = null) =>
    axios
      .post(
        `${BASE}/api/admin/chats/${id}/message`,
        { message, replyToId },
        { headers: api.headers() },
      )
      .then((r) => r.data),

  // Image endpoint — admin route handles socket + unread tracking
  sendImage: (id, file) => {
    const fd = new FormData();
    fd.append("image", file);
    return axios
      .post(`${BASE}/api/admin/chats/${id}/image`, fd, {
        headers: { ...api.headers(), "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },

  // These use the shared user chat endpoints (same logic, admin is a participant)
  unsend: (chatId, msgId) =>
    axios
      .delete(`${BASE}/api/chats/${chatId}/message/${msgId}/unsend`, {
        headers: api.headers(),
      })
      .then((r) => r.data),
  deleteForMe: (chatId, msgId) =>
    axios
      .delete(`${BASE}/api/chats/${chatId}/message/${msgId}`, {
        headers: api.headers(),
      })
      .then((r) => r.data),
  react: (chatId, msgId, emoji) =>
    axios
      .post(
        `${BASE}/api/chats/${chatId}/message/${msgId}/react`,
        { emoji },
        { headers: api.headers() },
      )
      .then((r) => r.data),
  closeChat: (id) =>
    axios
      .put(`${BASE}/api/chats/${id}/close`, {}, { headers: api.headers() })
      .then((r) => r.data),
  deleteConv: (id) =>
    axios
      .delete(`${BASE}/api/chats/${id}/conversation`, {
        headers: api.headers(),
      })
      .then((r) => r.data),
};

// ─── Message Bubble ───────────────────────────────────────────────────────────
const MessageBubble = ({
  msg,
  isOwn,
  adminUser,
  otherParticipant,
  onReply,
  onUnsend,
  onDeleteForMe,
  onReact,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef(null);
  const actionsRef = useRef(null);

  const isUnsent = msg.isUnsent;
  const hasImage = msg.attachments?.length > 0;
  const shouldShow = showActions || showReactions || showMore;

  const reactionGroups = (msg.reactions || []).reduce((a, r) => {
    a[r.emoji] = (a[r.emoji] || 0) + 1;
    return a;
  }, {});
  const myReaction = (msg.reactions || []).find(
    (r) => r.userId === adminUser?._id || r.userId === adminUser?.id,
  );

  useEffect(() => {
    const h = (e) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(e.target) &&
        actionsRef.current &&
        !actionsRef.current.contains(e.target)
      ) {
        setShowMore(false);
        setShowReactions(false);
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const bubble = isUnsent
    ? "bg-gray-100 text-gray-400 italic border border-gray-200 rounded-2xl"
    : isOwn
      ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl rounded-br-sm shadow-md"
      : msg.senderType === "admin"
        ? "bg-violet-50 border border-violet-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm"
        : "bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";

  return (
    <div
      className={`flex flex-col ${isOwn ? "items-end" : "items-start"} mb-3`}
    >
      {/* Reply preview */}
      {msg.replyTo &&
        msg.replyToSnapshot &&
        msg.replyToSnapshot.message !== undefined &&
        !isUnsent && (
          <div
            className={`flex items-center gap-1.5 mb-1 px-2 py-1.5 rounded-lg bg-gray-100 border-l-2 border-indigo-400 max-w-[65%] ${isOwn ? "mr-8" : "ml-8"}`}
          >
            <FaReply size={9} className="text-indigo-400 flex-shrink-0" />
            <p className="text-[10px] text-gray-500 truncate">
              {msg.replyToSnapshot.isUnsent
                ? "Message was unsent"
                : msg.replyToSnapshot.hasImage
                  ? "📷 Image"
                  : msg.replyToSnapshot.message || "Message"}
            </p>
          </div>
        )}

      <div
        className={`flex items-center gap-1 ${isOwn ? "flex-row-reverse" : "flex-row"} w-full`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 self-end mb-1">
          {!isOwn ? (
            otherParticipant?.profilePhoto ? (
              <img
                src={`${BASE}/uploads/profiles/${otherParticipant.profilePhoto}`}
                alt=""
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                {otherParticipant?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )
          ) : adminUser?.profilePhoto ? (
            <img
              src={`${BASE}/uploads/profiles/${adminUser.profilePhoto}`}
              alt=""
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold">
              <FaHeadset size={11} />
            </div>
          )}
        </div>

        <div
          className={`flex items-center max-w-[75%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => {
            if (!showMore && !showReactions) setShowActions(false);
          }}
        >
          {/* Toolbar */}
          {shouldShow && !isUnsent && (
            <div
              ref={actionsRef}
              className="flex items-center gap-0.5 flex-shrink-0 px-1"
            >
              <button
                onClick={() => onReply(msg)}
                className="w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-indigo-50 transition"
                title="Reply"
              >
                <FaReply size={9} className="text-gray-500" />
              </button>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowReactions(!showReactions);
                    setShowMore(false);
                  }}
                  className={`w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-yellow-50 transition ${showReactions ? "bg-yellow-50 border-yellow-200" : ""}`}
                >
                  <FaSmile size={9} className="text-gray-500" />
                </button>
                {showReactions && (
                  <div
                    className={`absolute top-full mt-1 flex gap-1 bg-white rounded-full px-2 py-1.5 shadow-xl border border-gray-100 z-30 ${isOwn ? "right-0" : "left-0"}`}
                  >
                    {QUICK_REACTIONS.map((e) => (
                      <button
                        key={e}
                        onClick={() => {
                          onReact(msg._id, e);
                          setShowReactions(false);
                          setShowActions(false);
                        }}
                        className={`text-lg hover:scale-125 transition-transform leading-none ${myReaction?.emoji === e ? "scale-125" : ""}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => {
                    setShowMore(!showMore);
                    setShowReactions(false);
                  }}
                  className={`w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition ${showMore ? "bg-gray-100" : ""}`}
                >
                  <FaEllipsisV size={8} className="text-gray-500" />
                </button>
                {showMore && (
                  <div
                    className={`absolute top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-30 min-w-[160px] py-1 ${isOwn ? "right-0" : "left-0"}`}
                  >
                    <button
                      onClick={() => {
                        onReply(msg);
                        setShowMore(false);
                        setShowActions(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-indigo-600 hover:bg-indigo-50"
                    >
                      <FaReply size={10} /> Reply
                    </button>
                    {isOwn && (
                      <button
                        onClick={() => {
                          onUnsend(msg._id);
                          setShowMore(false);
                          setShowActions(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-orange-600 hover:bg-orange-50"
                      >
                        <FaTimes size={10} /> Unsend
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onDeleteForMe(msg._id);
                        setShowMore(false);
                        setShowActions(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-500 hover:bg-red-50"
                    >
                      <FaTrash size={10} /> Delete for me
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bubble */}
          <div
            className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}
          >
            <div
              className={`px-4 py-2.5 text-sm leading-relaxed break-words ${bubble}`}
            >
              {isUnsent ? (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FaTimes size={10} /> This message was unsent
                </span>
              ) : (
                <>
                  {hasImage && (
                    <div className="mb-1">
                      <img
                        src={`${BASE}${msg.attachments[0].url}`}
                        alt="attachment"
                        className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer"
                        onClick={() =>
                          window.open(
                            `${BASE}${msg.attachments[0].url}`,
                            "_blank",
                          )
                        }
                      />
                    </div>
                  )}
                  {msg.message && <p>{msg.message}</p>}
                </>
              )}
            </div>

            {/* Reactions */}
            {Object.keys(reactionGroups).length > 0 && (
              <div
                className={`flex gap-0.5 mt-1 flex-wrap ${isOwn ? "justify-end" : "justify-start"}`}
              >
                {Object.entries(reactionGroups).map(([e, c]) => (
                  <button
                    key={e}
                    onClick={() => onReact(msg._id, e)}
                    className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] border transition ${myReaction?.emoji === e ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                  >
                    {e}
                    {c > 1 && <span className="ml-0.5">{c}</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Time + read */}
            <div
              className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}
            >
              <span className="text-[10px] text-gray-400">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {isOwn && !isUnsent && (
                <FaCheckDouble
                  size={9}
                  className={msg.read ? "text-indigo-400" : "text-gray-300"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main AdminMessages Component ─────────────────────────────────────────────
const AdminMessages = () => {
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [chatSearch, setChatSearch] = useState("");
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [processedIds, setProcessedIds] = useState(new Set());
  const [filter, setFilter] = useState("all");
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
  const [blockingUser, setBlockingUser] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);
  const selectedChatRef = useRef(null);
  const adminRef = useRef(null);

  const { socket, isConnected, onNewMessage, joinChat, leaveChat, markRead } =
    useSocket();

  // Load admin user from storage
  useEffect(() => {
    try {
      const u = JSON.parse(
        localStorage.getItem("user") || sessionStorage.getItem("user") || "{}",
      );
      setAdminUser(u);
      adminRef.current = u;
    } catch {}
  }, []);

  useEffect(() => {
    fetchChats();
  }, []);
  useEffect(() => {
    fetchChats();
  }, [filter]);

  // Close emoji on outside click
  useEffect(() => {
    const h = (e) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(e.target) &&
        !e.target.closest(".emoji-btn")
      )
        setShowEmoji(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Socket: unsent messages
  useEffect(() => {
    if (!socket) return;
    const h = ({ messageId }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === messageId
            ? {
                ...m,
                isUnsent: true,
                message: "",
                attachments: [],
                reactions: [],
              }
            : m,
        ),
      );
    };
    socket.on("message_unsent", h);
    return () => socket.off("message_unsent", h);
  }, [socket]);

  // Socket: reactions
  useEffect(() => {
    if (!socket) return;
    const h = ({ messageId, reactions }) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === messageId ? { ...m, reactions } : m)),
      );
    };
    socket.on("message_reaction", h);
    return () => socket.off("message_reaction", h);
  }, [socket]);

  // Global socket listener — update chat list in real time
  useEffect(() => {
    const unsub = onNewMessage("*", (data) => {
      if (!data.message) return;
      const msgId = data.message._id;
      if (msgId && processedIds.has(msgId)) return;
      if (msgId) {
        setProcessedIds((prev) => new Set([...prev, msgId]));
        setTimeout(
          () =>
            setProcessedIds((prev) => {
              const s = new Set(prev);
              s.delete(msgId);
              return s;
            }),
          5000,
        );
      }

      const adminId = (
        adminRef.current?._id || adminRef.current?.id
      )?.toString();
      const senderId = (data.senderId || data.message?.sender?._id)?.toString();
      const isOwn = !!(senderId && adminId && senderId === adminId);
      const isOpen = selectedChatRef.current?._id === data.chatId;

      setChats((prev) => {
        const updated = prev.map((c) => {
          if (c._id !== data.chatId) return c;
          const counts = {
            ...(c.unreadCounts instanceof Map
              ? Object.fromEntries(c.unreadCounts)
              : c.unreadCounts || {}),
          };
          const cur = adminId ? counts[adminId] || 0 : 0;
          if (adminId) counts[adminId] = isOwn || isOpen ? 0 : cur + 1;
          return {
            ...c,
            lastMessage:
              data.message.message ||
              (data.message.attachments?.length ? "📷 Image" : ""),
            lastMessageAt: data.message.createdAt || new Date().toISOString(),
            unreadCounts: counts,
          };
        });
        return updated.sort(
          (a, b) =>
            new Date(b.lastMessageAt || b.updatedAt) -
            new Date(a.lastMessageAt || a.updatedAt),
        );
      });

      if (isOpen && !isOwn) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === data.message._id)) return prev;
          return [...prev, data.message];
        });
        api.markRead(data.chatId).catch(() => {});
        markRead(data.chatId);
      }
    });
    return unsub;
  }, [onNewMessage, markRead, processedIds]);

  // Per-chat listener
  useEffect(() => {
    if (!selectedChat?._id) return;
    selectedChatRef.current = selectedChat;
    const chatId = selectedChat._id;
    const adminId = (adminRef.current?._id || adminRef.current?.id)?.toString();

    const unsub = onNewMessage(chatId, (data) => {
      if (!data.message) return;
      const msgId = data.message._id;
      if (msgId && processedIds.has(msgId)) return;
      if (msgId) {
        setProcessedIds((prev) => new Set([...prev, msgId]));
        setTimeout(
          () =>
            setProcessedIds((prev) => {
              const s = new Set(prev);
              s.delete(msgId);
              return s;
            }),
          5000,
        );
      }

      const senderId = (data.senderId || data.message?.sender?._id)?.toString();
      const isOwn = !!(senderId && adminId && senderId === adminId);

      setMessages((prev) => {
        const tempIdx = prev.findIndex(
          (m) =>
            m._id?.toString().startsWith("temp-") &&
            m.message === data.message.message &&
            isOwn,
        );
        if (tempIdx !== -1) {
          const n = [...prev];
          n[tempIdx] = data.message;
          return n;
        }
        if (!isOwn) {
          if (prev.some((m) => m._id === data.message._id)) return prev;
          return [...prev, data.message];
        }
        return prev;
      });

      setTimeout(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
      if (!isOwn) {
        api.markRead(chatId).catch(() => {});
        markRead(chatId);
      }
    });

    return unsub;
  }, [selectedChat?._id, onNewMessage, markRead, processedIds]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchChats = async (silent = false) => {
    try {
      if (!silent) setChatsLoading(true);
      const res = await api.getChats(filter);
      if (res.success) {
        setChats(
          res.data.sort(
            (a, b) =>
              new Date(b.lastMessageAt || b.updatedAt) -
              new Date(a.lastMessageAt || a.updatedAt),
          ),
        );
      }
    } catch {
      if (!silent) toast.error("Failed to load chats");
    } finally {
      if (!silent) setChatsLoading(false);
    }
  };

  const openChat = async (chat) => {
    if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
    setSelectedChat(chat);
    selectedChatRef.current = chat;
    setShowChatWindow(true);
    setReplyTo(null);
    setShowEmoji(false);
    joinChat(chat._id);
    try {
      setMessagesLoading(true);
      const res = await api.getChat(chat._id);
      if (res.success) {
        setMessages(res.data.messages || []);
        await api.markRead(chat._id);
        markRead(chat._id);
        // Zero out unread for this chat
        const adminId = (
          adminRef.current?._id || adminRef.current?.id
        )?.toString();
        setChats((prev) =>
          prev.map((c) => {
            if (c._id !== chat._id) return c;
            const counts = {
              ...(c.unreadCounts instanceof Map
                ? Object.fromEntries(c.unreadCounts)
                : c.unreadCounts || {}),
            };
            if (adminId) counts[adminId] = 0;
            return { ...c, unreadCounts: counts };
          }),
        );
        setTimeout(
          () => messagesEndRef.current?.scrollIntoView({ behavior: "instant" }),
          80,
        );
      }
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setMessagesLoading(false);
    }
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const closeChat = () => {
    if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
    setShowChatWindow(false);
    setSelectedChat(null);
    selectedChatRef.current = null;
    setMessages([]);
    setNewMessage("");
    setReplyTo(null);
    setShowEmoji(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sending || !selectedChat) return;
    setSending(true);
    const text = newMessage;
    const replyToId = replyTo?._id || null;
    const adminId = adminRef.current?._id || adminRef.current?.id;

    const temp = {
      _id: `temp-${Date.now()}`,
      message: text,
      senderType: "admin",
      read: false,
      createdAt: new Date(),
      attachments: [],
      reactions: [],
      isUnsent: false,
      replyToSnapshot: replyTo
        ? {
            message: replyTo.message,
            senderType: replyTo.senderType,
            isUnsent: replyTo.isUnsent,
            hasImage: (replyTo.attachments || []).length > 0,
          }
        : null,
      sender: {
        _id: adminId,
        name: adminRef.current?.name,
        role: "admin",
        profilePhoto: adminRef.current?.profilePhoto,
      },
    };
    setMessages((prev) => [...prev, temp]);
    setNewMessage("");
    setReplyTo(null);
    setShowEmoji(false);
    setTimeout(
      () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );

    try {
      const res = await api.sendMessage(selectedChat._id, text, replyToId);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === temp._id ? res.data : m)),
        );
        setChats((prev) =>
          prev.map((c) =>
            c._id !== selectedChat._id
              ? c
              : { ...c, lastMessage: text, lastMessageAt: new Date() },
          ),
        );
      } else {
        setMessages((prev) => prev.filter((m) => m._id !== temp._id));
        toast.error("Failed to send message");
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m._id !== temp._id));
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const sendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only images allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB");
      return;
    }
    setUploadingImage(true);
    try {
      const res = await api.sendImage(selectedChat._id, file);
      if (res.success) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === res.data._id)) return prev;
          return [...prev, res.data];
        });
        setChats((prev) =>
          prev.map((c) =>
            c._id !== selectedChat._id
              ? c
              : { ...c, lastMessage: "📷 Image", lastMessageAt: new Date() },
          ),
        );
        setTimeout(
          () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
          100,
        );
      } else toast.error("Failed to send image");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const unsendMessage = async (msgId) => {
    try {
      await api.unsend(selectedChat._id, msgId);
      setMessages((prev) =>
        prev.map((m) =>
          m._id === msgId
            ? {
                ...m,
                isUnsent: true,
                message: "",
                attachments: [],
                reactions: [],
              }
            : m,
        ),
      );
    } catch {
      toast.error("Failed to unsend");
    }
  };

  const deleteForMe = async (msgId) => {
    try {
      await api.deleteForMe(selectedChat._id, msgId);
      setMessages((prev) => prev.filter((m) => m._id !== msgId));
    } catch {
      toast.error("Failed to delete");
    }
  };

  const reactToMessage = async (msgId, emoji) => {
    try {
      const res = await api.react(selectedChat._id, msgId, emoji);
      if (res.success)
        setMessages((prev) =>
          prev.map((m) =>
            m._id === msgId ? { ...m, reactions: res.reactions } : m,
          ),
        );
    } catch {
      toast.error("Failed to react");
    }
  };

  const handleBlockUser = async () => {
    setBlockingUser(true);
    try {
      await api.blockUser(selectedChat._id);
      toast.success("User blocked");
      setShowBlockConfirm(false);
      setSelectedChat((prev) => ({
        ...prev,
        isBlocked: true,
        blockedBy: adminUser?._id,
      }));
      fetchChats(true);
    } catch {
      toast.error("Failed to block user");
    } finally {
      setBlockingUser(false);
    }
  };

  const handleUnblockUser = async () => {
    setBlockingUser(true);
    try {
      await api.unblockUser(selectedChat._id);
      toast.success("User unblocked");
      setShowUnblockConfirm(false);
      setSelectedChat((prev) => ({
        ...prev,
        isBlocked: false,
        blockedBy: null,
      }));
      fetchChats(true);
    } catch {
      toast.error("Failed to unblock user");
    } finally {
      setBlockingUser(false);
    }
  };

  const handleCloseChat = async () => {
    try {
      await api.closeChat(selectedChat._id);
      toast.success("Chat closed");
      setShowCloseConfirm(false);
      fetchChats();
      closeChat();
    } catch {
      toast.error("Failed to close chat");
    }
  };

  const handleDeleteConv = async () => {
    try {
      await api.deleteConv(selectedChat._id);
      toast.success("Conversation deleted");
      setShowDeleteConfirm(false);
      setMessages([]);
    } catch {
      toast.error("Failed to delete");
    }
  };

  const getOtherParticipant = (chat) => {
    const adminId = (adminRef.current?._id || adminRef.current?.id)?.toString();
    if (!chat?.participants) return null;
    return chat.participants.find((p) => p._id?.toString() !== adminId) || null;
  };

  const getUnread = (chat) => {
    const adminId = (adminRef.current?._id || adminRef.current?.id)?.toString();
    if (!adminId || !chat.unreadCounts) return 0;
    if (chat.unreadCounts[adminId] !== undefined)
      return chat.unreadCounts[adminId] || 0;
    const k = Object.keys(chat.unreadCounts).find(
      (k) => k.toString() === adminId,
    );
    return k ? chat.unreadCounts[k] || 0 : 0;
  };

  const getTotalUnread = () => chats.reduce((s, c) => s + getUnread(c), 0);

  const formatTime = (date) => {
    if (!date) return "";
    const diff = Date.now() - new Date(date).getTime();
    const m = Math.floor(diff / 60000),
      h = Math.floor(diff / 3600000),
      d = Math.floor(diff / 86400000);
    if (m < 1) return "now";
    if (m < 60) return `${m}m`;
    if (h < 24) return `${h}h`;
    if (d === 1) return "Yesterday";
    return new Date(date).toLocaleDateString();
  };

  const filtered = chats.filter((c) => {
    if (!chatSearch.trim()) return true;
    const other = getOtherParticipant(c);
    const q = chatSearch.toLowerCase();
    return (
      (other?.name || "").toLowerCase().includes(q) ||
      (c.lastMessage || "").toLowerCase().includes(q) ||
      (c.vehicleName || "").toLowerCase().includes(q)
    );
  });

  const isOwn = (msg) => {
    const adminId = (adminRef.current?._id || adminRef.current?.id)?.toString();
    const senderId = (
      msg.sender?._id ||
      msg.sender?.id ||
      msg.sender
    )?.toString();
    return !!(adminId && senderId && senderId === adminId);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
      {/* ── Chat List ── */}
      <div
        className={`${showChatWindow ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[340px] bg-white border-r border-gray-100 flex-shrink-0`}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaComments className="text-indigo-500" /> Messages
                {getTotalUnread() > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                    {getTotalUnread()}
                  </span>
                )}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {chats.length} conversation{chats.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => fetchChats()}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-indigo-500 transition"
            >
              <FaSync
                className={chatsLoading ? "animate-spin" : ""}
                size={13}
              />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mb-3">
            <FaSearch size={11} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              placeholder="Search conversations…"
              className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            {chatSearch && (
              <button
                onClick={() => setChatSearch("")}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={10} />
              </button>
            )}
          </div>
          {/* Filter tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {[
              ["all", "All"],
              ["support", "Support"],
              ["vehicle", "Vehicle"],
              ["unread", "Unread"],
            ].map(([val, label]) => (
              <button
                key={val}
                onClick={() => {
                  setFilter(val);
                  fetchChats();
                }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${filter === val ? "bg-indigo-600 text-white shadow-sm" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {chatsLoading ? (
            <div className="flex justify-center items-center h-32">
              <FaSpinner className="animate-spin text-indigo-400 text-xl" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-3">
                <FaCommentDots className="text-indigo-300 text-2xl" />
              </div>
              <p className="text-sm font-medium text-gray-600">
                {chatSearch ? "No results" : "No conversations"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {chatSearch
                  ? "Try a different search"
                  : "Messages from users will appear here"}
              </p>
            </div>
          ) : (
            filtered.map((chat) => {
              const other = getOtherParticipant(chat);
              const unread = getUnread(chat);
              const isSelected =
                selectedChat?._id === chat._id && showChatWindow;
              const isSupport = chat.chatType === "support";

              return (
                <div
                  key={chat._id}
                  onClick={() => openChat(chat)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-b border-gray-50 ${isSelected ? "bg-indigo-50 border-l-[3px] border-l-indigo-500" : "hover:bg-gray-50 border-l-[3px] border-l-transparent"}`}
                >
                  <div className="relative flex-shrink-0">
                    {other?.profilePhoto ? (
                      <img
                        src={`${BASE}/uploads/profiles/${other.profilePhoto}`}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                        {other?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    {unread > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                        {unread > 9 ? "9+" : unread}
                      </span>
                    )}
                    {chat.isBlocked && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
                        <FaBan size={7} />
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <span
                        className={`text-sm font-semibold truncate ${unread > 0 ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {other?.name || "Unknown User"}
                      </span>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">
                        {formatTime(chat.lastMessageAt || chat.updatedAt)}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${unread > 0 ? "text-gray-800 font-medium" : "text-gray-400"}`}
                    >
                      {chat.lastMessage || "No messages yet"}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${isSupport ? "bg-violet-50 text-violet-600" : "bg-blue-50 text-blue-600"}`}
                      >
                        {isSupport ? "Support" : "Vehicle"}
                      </span>
                      {chat.vehicleName && !isSupport && (
                        <span className="text-[10px] text-gray-400 truncate">
                          · {chat.vehicleName}
                        </span>
                      )}
                      {chat.isBlocked && (
                        <span className="text-[9px] text-red-500 font-semibold uppercase">
                          Blocked
                        </span>
                      )}
                      {!chat.isActive && (
                        <span className="text-[9px] text-gray-400 font-semibold uppercase">
                          Closed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {chats.length} conversation{chats.length !== 1 ? "s" : ""}
          </span>
          {getTotalUnread() > 0 && (
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
              {getTotalUnread()} unread
            </span>
          )}
        </div>
      </div>

      {/* ── Chat Window ── */}
      {showChatWindow && selectedChat ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="px-5 py-3 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={closeChat}
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
              >
                <FaArrowLeft size={14} />
              </button>
              {(() => {
                const other = getOtherParticipant(selectedChat);
                return (
                  <>
                    {other?.profilePhoto ? (
                      <img
                        src={`${BASE}/uploads/profiles/${other.profilePhoto}`}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                        {other?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {other?.name || "Unknown"}
                        </p>
                        <span className="text-[10px] text-gray-500">
                          {other?.email}
                        </span>
                        {selectedChat.isBlocked && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
                            <FaBan size={8} /> Blocked
                          </span>
                        )}
                        {!selectedChat.isActive && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-gray-50 text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded-full font-semibold">
                            <FaLock size={8} /> Closed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {selectedChat.chatType === "support"
                          ? "Support Chat"
                          : `Vehicle: ${selectedChat.vehicleName || "—"}`}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchChats(true)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition"
                title="Refresh"
              >
                <FaSync size={12} />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 border border-gray-200 transition"
                title="Delete conversation"
              >
                <FaTrash size={11} />
              </button>
              {!selectedChat.isBlocked ? (
                <button
                  onClick={() => setShowBlockConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
                >
                  <FaBan size={11} /> Block
                </button>
              ) : selectedChat.blockedBy?.toString() ===
                (adminUser?._id || adminUser?.id)?.toString() ? (
                <button
                  onClick={() => setShowUnblockConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
                >
                  <FaUnlock size={11} /> Unblock
                </button>
              ) : null}
              {selectedChat.isActive && (
                <button
                  onClick={() => setShowCloseConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-orange-600 hover:bg-orange-50 border border-orange-200 transition"
                >
                  <FaLock size={11} /> Close Chat
                </button>
              )}
            </div>
          </div>

          {/* Info banners */}
          {selectedChat.vehicleId && selectedChat.chatType === "vehicle" && (
            <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FaCar size={12} className="text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-blue-800">
                {selectedChat.vehicleName || "Vehicle Inquiry"}
              </span>
            </div>
          )}
          {selectedChat.chatType === "support" && (
            <div className="px-5 py-2.5 bg-violet-50 border-b border-violet-100 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                <FaHeadset size={12} className="text-violet-600" />
              </div>
              <span className="text-xs font-semibold text-violet-800">
                Support Chat — responding as admin
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 px-5 py-1.5 bg-amber-50 border-b border-amber-100">
            <FaInfoCircle size={10} className="text-amber-500 flex-shrink-0" />
            <p className="text-[9.5px] text-amber-600">
              Messages are automatically deleted after <strong>3 days</strong>.
            </p>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
            {messagesLoading ? (
              <div className="flex justify-center items-center h-full">
                <FaSpinner className="animate-spin text-indigo-400 text-2xl" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-3">
                  <FaCommentDots className="text-indigo-300 text-2xl" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  No messages yet
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Start the conversation as admin
                </p>
              </div>
            ) : (
              (() => {
                const groups = [];
                let lastDate = null;
                messages.forEach((msg, idx) => {
                  const day = new Date(msg.createdAt).toDateString();
                  if (day !== lastDate) {
                    groups.push({
                      type: "date",
                      label: day,
                      key: `date-${idx}`,
                    });
                    lastDate = day;
                  }
                  groups.push({ type: "msg", msg, key: msg._id || idx });
                });
                return groups.map((item) => {
                  if (item.type === "date") {
                    const today = new Date().toDateString();
                    const yesterday = new Date(
                      Date.now() - 86400000,
                    ).toDateString();
                    const label =
                      item.label === today
                        ? "Today"
                        : item.label === yesterday
                          ? "Yesterday"
                          : item.label;
                    return (
                      <div
                        key={item.key}
                        className="flex items-center gap-3 py-2"
                      >
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
                          {label}
                        </span>
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                    );
                  }
                  const { msg } = item;
                  const own = isOwn(msg);
                  const other = getOtherParticipant(selectedChat);
                  return (
                    <MessageBubble
                      key={item.key}
                      msg={msg}
                      isOwn={own}
                      adminUser={adminUser}
                      otherParticipant={other}
                      onReply={setReplyTo}
                      onUnsend={unsendMessage}
                      onDeleteForMe={deleteForMe}
                      onReact={reactToMessage}
                    />
                  );
                });
              })()
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply bar */}
          {replyTo && (
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border-t border-indigo-100">
              <FaReply size={11} className="text-indigo-500 flex-shrink-0" />
              <p className="flex-1 text-xs text-indigo-700 truncate">
                Replying:{" "}
                {replyTo.isUnsent
                  ? "Unsent message"
                  : replyTo.message || "📷 Image"}
              </p>
              <button
                onClick={() => setReplyTo(null)}
                className="text-indigo-400 hover:text-indigo-600"
              >
                <FaTimes size={12} />
              </button>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            {!isConnected && (
              <p className="text-[11px] text-center text-amber-500 mb-2">
                Reconnecting…
              </p>
            )}
            {!selectedChat.isActive ? (
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                <FaLock size={14} className="text-gray-400" />
                <p className="text-xs text-gray-500 flex-1">
                  This chat has been closed by admin.
                </p>
              </div>
            ) : (
              <div className="relative">
                {showEmoji && (
                  <div
                    ref={emojiRef}
                    className="absolute bottom-full mb-3 right-0 z-50"
                  >
                    <div className="rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-white">
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600">
                        <div className="flex items-center gap-2">
                          <FaSmile size={13} className="text-white/80" />
                          <span className="text-xs font-semibold text-white">
                            Emoji
                          </span>
                        </div>
                        <button
                          onClick={() => setShowEmoji(false)}
                          className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition"
                        >
                          <FaTimes size={9} />
                        </button>
                      </div>
                      <EmojiPicker
                        onEmojiClick={(e) => {
                          setNewMessage((p) => p + e.emoji);
                          inputRef.current?.focus();
                        }}
                        width={340}
                        height={380}
                        lazyLoad={true}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
                  <button
                    onClick={() => setShowEmoji(!showEmoji)}
                    className={`emoji-btn flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all ${showEmoji ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md scale-105" : "text-gray-400 hover:text-indigo-500 hover:bg-indigo-50"}`}
                  >
                    <FaSmile size={16} />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="text-gray-400 hover:text-indigo-500 transition flex-shrink-0"
                  >
                    {uploadingImage ? (
                      <FaSpinner className="animate-spin" size={18} />
                    ) : (
                      <FaImage size={18} />
                    )}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={sendImage}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder={
                      replyTo ? "Type your reply…" : "Reply as admin…"
                    }
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
                  >
                    {sending ? (
                      <FaSpinner className="animate-spin" size={13} />
                    ) : (
                      <FaPaperPlane size={13} />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
          <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
            <FaComments className="text-indigo-300 text-3xl" />
          </div>
          <p className="text-base font-semibold text-gray-600">
            Select a conversation
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Choose a chat from the left to start responding
          </p>
        </div>
      )}

      {/* ── Block Confirm ── */}
      {showBlockConfirm && selectedChat && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 pt-6 pb-10">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FaBan size={26} className="text-white" />
              </div>
              <h3 className="text-white text-center text-lg font-bold">
                Block User?
              </h3>
              <p className="text-red-100 text-center text-xs mt-1">
                They won't be able to message in this chat
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                {(() => {
                  const other = getOtherParticipant(selectedChat);
                  return other?.profilePhoto ? (
                    <img
                      src={`${BASE}/uploads/profiles/${other.profilePhoto}`}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {other?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                  );
                })()}
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {getOtherParticipant(selectedChat)?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Will be blocked from this chat
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowBlockConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBlockUser}
                  disabled={blockingUser}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {blockingUser ? (
                    <FaSpinner className="animate-spin" size={13} />
                  ) : (
                    <FaBan size={12} />
                  )}
                  {blockingUser ? "Blocking…" : "Block User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Unblock Confirm ── */}
      {showUnblockConfirm && selectedChat && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 pt-6 pb-10">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FaUnlock size={24} className="text-white" />
              </div>
              <h3 className="text-white text-center text-lg font-bold">
                Unblock User?
              </h3>
              <p className="text-emerald-100 text-center text-xs mt-1">
                They'll be able to message again
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowUnblockConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUnblockUser}
                  disabled={blockingUser}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {blockingUser ? (
                    <FaSpinner className="animate-spin" size={13} />
                  ) : (
                    <FaUnlock size={12} />
                  )}
                  {blockingUser ? "Unblocking…" : "Unblock User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Close Chat Confirm ── */}
      {showCloseConfirm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 pt-6 pb-10">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FaLock size={24} className="text-white" />
              </div>
              <h3 className="text-white text-center text-lg font-bold">
                Close Chat?
              </h3>
              <p className="text-orange-100 text-center text-xs mt-1">
                The user won't be able to send more messages
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <p className="text-sm text-gray-600 mb-5 text-center">
                This will mark the conversation as closed. Existing messages
                will remain visible.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCloseConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCloseChat}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  <FaLock size={12} /> Close Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Conv Confirm ── */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-600 to-gray-800 px-6 pt-6 pb-10">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FaTrash size={24} className="text-white" />
              </div>
              <h3 className="text-white text-center text-lg font-bold">
                Delete Conversation?
              </h3>
              <p className="text-gray-300 text-center text-xs mt-1">
                Only deleted for you
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <p className="text-sm text-gray-600 mb-5 text-center">
                This removes all messages for you only. The user can still see
                the conversation.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConv}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  <FaTrash size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
