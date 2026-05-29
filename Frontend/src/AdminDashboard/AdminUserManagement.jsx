



// AdminUserManagement.jsx — with integrated Direct Message panel
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import {
  FaUsers, FaShieldAlt, FaBan, FaCheckCircle, FaTrash,
  FaExclamationTriangle, FaEye, FaGavel, FaSpinner, FaTimes,
  FaUserCheck, FaUserSlash, FaSearch, FaFilter, FaDownload,
  FaFlag, FaCar, FaCalendarAlt, FaEnvelope, FaIdCard,
  FaUser, FaLock, FaUnlock, FaHistory, FaImage, FaChevronRight,
  FaInfoCircle, FaArrowLeft, FaComments, FaPaperPlane, FaSmile,
  FaReply, FaEllipsisV, FaCheck, FaCheckDouble, FaHeadset,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../context/SocketContext";

const BASE = "http://localhost:5000";
const QUICK_REACTIONS = ["❤️", "😂", "😮", "😢", "😡", "👍"];
const token = () => localStorage.getItem("token") || sessionStorage.getItem("token");
const authHeader = () => ({ Authorization: `Bearer ${token()}` });

// ─── API ────────────────────────────────────────────────────────────────────
const api = {
  // User management
  getUsers: () => axios.get(`${BASE}/api/admin/users`, { headers: authHeader() }).then(r => r.data),
  getUser: (id) => axios.get(`${BASE}/api/admin/users/${id}`, { headers: authHeader() }).then(r => r.data),
  getReports: () => axios.get(`${BASE}/api/admin/reports`, { headers: authHeader() }).then(r => r.data),
  giveWarning: (id, reason) => axios.post(`${BASE}/api/admin/users/${id}/warning`, { reason }, { headers: authHeader() }).then(r => r.data),
  blockUser: (id, reason) => axios.post(`${BASE}/api/admin/users/${id}/block`, { reason }, { headers: authHeader() }).then(r => r.data),
  unblockUser: (id, reason) => axios.post(`${BASE}/api/admin/users/${id}/unblock`, { reason }, { headers: authHeader() }).then(r => r.data),
  resetWarnings: (id) => axios.post(`${BASE}/api/admin/users/${id}/reset-warnings`, {}, { headers: authHeader() }).then(r => r.data),
  deleteUser: (id) => axios.delete(`${BASE}/api/admin/users/${id}`, { headers: authHeader() }).then(r => r.data),
  updateReport: (id, status, adminNote) => axios.patch(`${BASE}/api/admin/reports/${id}/status`, { status, adminNote }, { headers: authHeader() }).then(r => r.data),

  // Chat (reuse AdminMessages endpoints)
  getChats: () => axios.get(`${BASE}/api/admin/chats`, { headers: authHeader() }).then(r => r.data),
  getOrCreateChat: (userId) => axios.post(`${BASE}/api/admin/chats/direct`, { userId }, { headers: authHeader() }).then(r => r.data),
  getChat: (id) => axios.get(`${BASE}/api/admin/chats/${id}`, { headers: authHeader() }).then(r => r.data),
  markRead: (id) => axios.put(`${BASE}/api/admin/chats/${id}/read`, {}, { headers: authHeader() }).then(r => r.data),
  sendMessage: (id, message, replyToId = null) =>
    axios.post(`${BASE}/api/admin/chats/${id}/message`, { message, replyToId }, { headers: authHeader() }).then(r => r.data),
  sendImage: (id, file) => {
    const fd = new FormData(); fd.append("image", file);
    return axios.post(`${BASE}/api/admin/chats/${id}/image`, fd, {
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" }
    }).then(r => r.data);
  },
  unsend: (chatId, msgId) => axios.delete(`${BASE}/api/chats/${chatId}/message/${msgId}/unsend`, { headers: authHeader() }).then(r => r.data),
  deleteForMe: (chatId, msgId) => axios.delete(`${BASE}/api/chats/${chatId}/message/${msgId}`, { headers: authHeader() }).then(r => r.data),
  react: (chatId, msgId, emoji) => axios.post(`${BASE}/api/chats/${chatId}/message/${msgId}/react`, { emoji }, { headers: authHeader() }).then(r => r.data),
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const ConfirmModal = ({ isOpen, title, message, confirmLabel, confirmColor = "red", onConfirm, onCancel, children }) => {
  if (!isOpen) return null;
  const colors = {
    red: { bg: "bg-red-100", icon: "text-red-500", btn: "bg-red-500 hover:bg-red-600" },
    yellow: { bg: "bg-yellow-100", icon: "text-yellow-500", btn: "bg-yellow-500 hover:bg-yellow-600" },
    blue: { bg: "bg-blue-100", icon: "text-blue-500", btn: "bg-blue-500 hover:bg-blue-600" },
  };
  const c = colors[confirmColor] || colors.red;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.bg}`}>
            <FaExclamationTriangle className={c.icon} />
          </div>
          <div><h3 className="font-bold text-gray-900">{title}</h3><p className="text-sm text-gray-500">{message}</p></div>
        </div>
        {children && <div className="px-6 py-4">{children}</div>}
        <div className="px-6 py-4 flex gap-3 justify-end border-t border-gray-100">
          <button onClick={onCancel} className="px-5 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 font-medium">Cancel</button>
          <button onClick={onConfirm} className={`px-5 py-2 rounded-xl text-sm text-white font-semibold ${c.btn}`}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
};

const ImageViewer = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 text-white/70 hover:text-white"><FaTimes size={28} /></button>
      <img src={src} alt="Preview" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" onClick={e => e.stopPropagation()} />
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, gradient, sub }) => (
  <div className={`${gradient} rounded-2xl p-5 text-white relative overflow-hidden`}>
    <div className="absolute right-4 top-4 opacity-20"><Icon size={40} /></div>
    <p className="text-sm font-medium opacity-90 mb-1">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
    {sub && <p className="text-xs opacity-75 mt-1">{sub}</p>}
  </div>
);

const StatusBadge = ({ isBlocked }) => (
  isBlocked
    ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700"><FaBan size={9} /> Blocked</span>
    : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700"><FaCheckCircle size={9} /> Active</span>
);

const WarningPips = ({ count }) => (
  <div className="flex items-center gap-1">
    {[0, 1, 2].map(i => (
      <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i < count ? (count >= 3 ? "bg-red-500" : count >= 2 ? "bg-orange-400" : "bg-yellow-400") : "bg-gray-200"}`} />
    ))}
    <span className={`text-xs font-semibold ml-1 ${count >= 3 ? "text-red-600" : count >= 2 ? "text-orange-500" : count >= 1 ? "text-yellow-600" : "text-gray-400"}`}>{count}/3</span>
  </div>
);

const REPORT_STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  reviewed: "bg-blue-100 text-blue-700 border-blue-200",
  action_taken: "bg-emerald-100 text-emerald-700 border-emerald-200",
  dismissed: "bg-gray-100 text-gray-500 border-gray-200",
};

// ─── Message Bubble (adapted from AdminMessages) ──────────────────────────────
const MessageBubble = ({ msg, isOwn, adminUser, otherParticipant, onReply, onUnsend, onDeleteForMe, onReact }) => {
  const [showActions, setShowActions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef(null);
  const actionsRef = useRef(null);

  const isUnsent = msg.isUnsent;
  const hasImage = msg.attachments?.length > 0;
  const shouldShow = showActions || showReactions || showMore;

  const reactionGroups = (msg.reactions || []).reduce((a, r) => { a[r.emoji] = (a[r.emoji] || 0) + 1; return a; }, {});
  const myReaction = (msg.reactions || []).find(r => r.userId === adminUser?._id || r.userId === adminUser?.id);

  useEffect(() => {
    const h = e => {
      if (moreRef.current && !moreRef.current.contains(e.target) && actionsRef.current && !actionsRef.current.contains(e.target)) {
        setShowMore(false); setShowReactions(false); setShowActions(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const bubble = isUnsent
    ? "bg-gray-100 text-gray-400 italic border border-gray-200 rounded-2xl"
    : isOwn
      ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl rounded-br-sm shadow-md"
      : "bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";

  return (
    <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} mb-3`}>
      {msg.replyTo && msg.replyToSnapshot && !isUnsent && (
        <div className={`flex items-center gap-1.5 mb-1 px-2 py-1.5 rounded-lg bg-gray-100 border-l-2 border-indigo-400 max-w-[65%] ${isOwn ? "mr-8" : "ml-8"}`}>
          <FaReply size={9} className="text-indigo-400 flex-shrink-0" />
          <p className="text-[10px] text-gray-500 truncate">
            {msg.replyToSnapshot.isUnsent ? "Message was unsent" : msg.replyToSnapshot.hasImage ? "📷 Image" : msg.replyToSnapshot.message || "Message"}
          </p>
        </div>
      )}
      <div className={`flex items-center gap-1 ${isOwn ? "flex-row-reverse" : "flex-row"} w-full`}>
        <div className="flex-shrink-0 self-end mb-1">
          {!isOwn ? (
            otherParticipant?.profilePhoto
              ? <img src={`${BASE}/uploads/profiles/${otherParticipant.profilePhoto}`} alt="" className="w-7 h-7 rounded-full object-cover" />
              : <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">{otherParticipant?.name?.charAt(0)?.toUpperCase() || "?"}</div>
          ) : adminUser?.profilePhoto
            ? <img src={`${BASE}/uploads/profiles/${adminUser.profilePhoto}`} alt="" className="w-7 h-7 rounded-full object-cover" />
            : <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold"><FaHeadset size={11} /></div>
          }
        </div>
        <div
          className={`flex items-center max-w-[75%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => { if (!showMore && !showReactions) setShowActions(false); }}
        >
          {shouldShow && !isUnsent && (
            <div ref={actionsRef} className="flex items-center gap-0.5 flex-shrink-0 px-1">
              <button onClick={() => onReply(msg)} className="w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-indigo-50 transition" title="Reply">
                <FaReply size={9} className="text-gray-500" />
              </button>
              <div className="relative">
                <button onClick={() => { setShowReactions(!showReactions); setShowMore(false); }} className={`w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-yellow-50 transition ${showReactions ? "bg-yellow-50 border-yellow-200" : ""}`}>
                  <FaSmile size={9} className="text-gray-500" />
                </button>
                {showReactions && (
                  <div className={`absolute top-full mt-1 flex gap-1 bg-white rounded-full px-2 py-1.5 shadow-xl border border-gray-100 z-30 ${isOwn ? "right-0" : "left-0"}`}>
                    {QUICK_REACTIONS.map(e => (
                      <button key={e} onClick={() => { onReact(msg._id, e); setShowReactions(false); setShowActions(false); }} className={`text-lg hover:scale-125 transition-transform leading-none ${myReaction?.emoji === e ? "scale-125" : ""}`}>{e}</button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative" ref={moreRef}>
                <button onClick={() => { setShowMore(!showMore); setShowReactions(false); }} className={`w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition ${showMore ? "bg-gray-100" : ""}`}>
                  <FaEllipsisV size={8} className="text-gray-500" />
                </button>
                {showMore && (
                  <div className={`absolute top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-30 min-w-[160px] py-1 ${isOwn ? "right-0" : "left-0"}`}>
                    <button onClick={() => { onReply(msg); setShowMore(false); setShowActions(false); }} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-indigo-600 hover:bg-indigo-50">
                      <FaReply size={10} /> Reply
                    </button>
                    {isOwn && (
                      <button onClick={() => { onUnsend(msg._id); setShowMore(false); setShowActions(false); }} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-orange-600 hover:bg-orange-50">
                        <FaTimes size={10} /> Unsend
                      </button>
                    )}
                    <button onClick={() => { onDeleteForMe(msg._id); setShowMore(false); setShowActions(false); }} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-500 hover:bg-red-50">
                      <FaTrash size={10} /> Delete for me
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
            <div className={`px-4 py-2.5 text-sm leading-relaxed break-words ${bubble}`}>
              {isUnsent ? (
                <span className="flex items-center gap-1.5 text-gray-400"><FaTimes size={10} /> This message was unsent</span>
              ) : (
                <>
                  {hasImage && (
                    <div className="mb-1">
                      <img src={`${BASE}${msg.attachments[0].url}`} alt="attachment" className="max-w-[180px] max-h-[130px] rounded-lg cursor-pointer" onClick={() => window.open(`${BASE}${msg.attachments[0].url}`, "_blank")} />
                    </div>
                  )}
                  {msg.message && <p>{msg.message}</p>}
                </>
              )}
            </div>
            {Object.keys(reactionGroups).length > 0 && (
              <div className={`flex gap-0.5 mt-1 flex-wrap ${isOwn ? "justify-end" : "justify-start"}`}>
                {Object.entries(reactionGroups).map(([e, c]) => (
                  <button key={e} onClick={() => onReact(msg._id, e)} className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] border transition ${myReaction?.emoji === e ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                    {e}{c > 1 && <span className="ml-0.5">{c}</span>}
                  </button>
                ))}
              </div>
            )}
            <div className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}>
              <span className="text-[10px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              {isOwn && !isUnsent && <FaCheckDouble size={9} className={msg.read ? "text-indigo-400" : "text-gray-300"} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Direct Message Panel ────────────────────────────────────────────────────
const DirectMessagePanel = ({ targetUser, adminUser, onClose }) => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [processedIds, setProcessedIds] = useState(new Set());

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);
  const chatRef = useRef(null);
  const adminRef = useRef(adminUser);

  const { socket, isConnected, onNewMessage, joinChat, leaveChat, markRead } = useSocket();

  // Load or create chat with this user
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const res = await api.getOrCreateChat(targetUser._id);
        if (res.success) {
          setChat(res.data);
          chatRef.current = res.data;
          joinChat(res.data._id);
          const chatRes = await api.getChat(res.data._id);
          if (chatRes.success) {
            setMessages(chatRes.data.messages || []);
            await api.markRead(res.data._id).catch(() => {});
            markRead(res.data._id);
          }
        }
      } catch {
        toast.error("Failed to open chat");
      } finally {
        setLoading(false);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
          inputRef.current?.focus();
        }, 100);
      }
    };
    init();
    return () => { if (chatRef.current) leaveChat(chatRef.current._id); };
  }, [targetUser._id]);

  // Socket: unsent
  useEffect(() => {
    if (!socket) return;
    const h = ({ messageId }) => setMessages(prev => prev.map(m => m._id === messageId ? { ...m, isUnsent: true, message: "", attachments: [], reactions: [] } : m));
    socket.on("message_unsent", h);
    return () => socket.off("message_unsent", h);
  }, [socket]);

  // Socket: reactions
  useEffect(() => {
    if (!socket) return;
    const h = ({ messageId, reactions }) => setMessages(prev => prev.map(m => m._id === messageId ? { ...m, reactions } : m));
    socket.on("message_reaction", h);
    return () => socket.off("message_reaction", h);
  }, [socket]);

  // Per-chat listener
  useEffect(() => {
    if (!chat?._id) return;
    const chatId = chat._id;
    const adminId = (adminRef.current?._id || adminRef.current?.id)?.toString();
    const unsub = onNewMessage(chatId, (data) => {
      if (!data.message) return;
      const msgId = data.message._id;
      if (msgId && processedIds.has(msgId)) return;
      if (msgId) {
        setProcessedIds(prev => new Set([...prev, msgId]));
        setTimeout(() => setProcessedIds(prev => { const s = new Set(prev); s.delete(msgId); return s; }), 5000);
      }
      const senderId = (data.senderId || data.message?.sender?._id)?.toString();
      const isOwn = !!(senderId && adminId && senderId === adminId);
      setMessages(prev => {
        const tempIdx = prev.findIndex(m => m._id?.toString().startsWith("temp-") && m.message === data.message.message && isOwn);
        if (tempIdx !== -1) { const n = [...prev]; n[tempIdx] = data.message; return n; }
        if (!isOwn) {
          if (prev.some(m => m._id === data.message._id)) return prev;
          return [...prev, data.message];
        }
        return prev;
      });
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      if (!isOwn) { api.markRead(chatId).catch(() => {}); markRead(chatId); }
    });
    return unsub;
  }, [chat?._id, onNewMessage, markRead, processedIds]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // Close emoji on outside click
  useEffect(() => {
    const h = e => { if (emojiRef.current && !emojiRef.current.contains(e.target) && !e.target.closest(".dm-emoji-btn")) setShowEmoji(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim() || sending || !chat) return;
    setSending(true);
    const text = newMessage;
    const replyToId = replyTo?._id || null;
    const adminId = adminRef.current?._id || adminRef.current?.id;
    const temp = {
      _id: `temp-${Date.now()}`, message: text, senderType: "admin", read: false,
      createdAt: new Date(), attachments: [], reactions: [], isUnsent: false,
      replyToSnapshot: replyTo ? { message: replyTo.message, senderType: replyTo.senderType, isUnsent: replyTo.isUnsent, hasImage: (replyTo.attachments || []).length > 0 } : null,
      sender: { _id: adminId, name: adminRef.current?.name, role: "admin", profilePhoto: adminRef.current?.profilePhoto },
    };
    setMessages(prev => [...prev, temp]);
    setNewMessage(""); setReplyTo(null); setShowEmoji(false);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    try {
      const res = await api.sendMessage(chat._id, text, replyToId);
      if (res.success) setMessages(prev => prev.map(m => m._id === temp._id ? res.data : m));
      else { setMessages(prev => prev.filter(m => m._id !== temp._id)); toast.error("Failed to send"); }
    } catch { setMessages(prev => prev.filter(m => m._id !== temp._id)); toast.error("Failed to send"); }
    finally { setSending(false); }
  };

  const sendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Only images allowed"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Max 5MB"); return; }
    setUploadingImage(true);
    try {
      const res = await api.sendImage(chat._id, file);
      if (res.success) {
        setMessages(prev => prev.some(m => m._id === res.data._id) ? prev : [...prev, res.data]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      } else toast.error("Failed to send image");
    } catch { toast.error("Failed to upload image"); }
    finally { setUploadingImage(false); if (fileInputRef.current) fileInputRef.current.value = ""; }
  };

  const unsendMessage = async (msgId) => {
    try {
      await api.unsend(chat._id, msgId);
      setMessages(prev => prev.map(m => m._id === msgId ? { ...m, isUnsent: true, message: "", attachments: [], reactions: [] } : m));
    } catch { toast.error("Failed to unsend"); }
  };

  const deleteForMe = async (msgId) => {
    try { await api.deleteForMe(chat._id, msgId); setMessages(prev => prev.filter(m => m._id !== msgId)); }
    catch { toast.error("Failed to delete"); }
  };

  const reactToMessage = async (msgId, emoji) => {
    try {
      const res = await api.react(chat._id, msgId, emoji);
      if (res.success) setMessages(prev => prev.map(m => m._id === msgId ? { ...m, reactions: res.reactions } : m));
    } catch { toast.error("Failed to react"); }
  };

  const isOwn = (msg) => {
    const adminId = (adminRef.current?._id || adminRef.current?.id)?.toString();
    const senderId = (msg.sender?._id || msg.sender?.id || msg.sender)?.toString();
    return !!(adminId && senderId && senderId === adminId);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {targetUser.profilePhoto
            ? <img src={`${BASE}/uploads/profiles/${targetUser.profilePhoto}`} alt="" className="w-full h-full object-cover" />
            : <span className="text-sm font-bold">{targetUser.name?.charAt(0).toUpperCase()}</span>
          }
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-tight truncate">{targetUser.name}</p>
          <p className="text-[10px] text-white/70 truncate">{targetUser.email}</p>
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition flex-shrink-0">
          <FaTimes size={12} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50 space-y-1">
        {loading ? (
          <div className="flex items-center justify-center h-full"><FaSpinner className="animate-spin text-indigo-400 text-xl" /></div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-3">
              <FaComments className="text-indigo-300 text-2xl" />
            </div>
            <p className="text-sm font-medium text-gray-500">No messages yet</p>
            <p className="text-xs text-gray-400 mt-1">Send a message to {targetUser.name}</p>
          </div>
        ) : (
          (() => {
            const groups = [];
            let lastDate = null;
            messages.forEach((msg, idx) => {
              const day = new Date(msg.createdAt).toDateString();
              if (day !== lastDate) { groups.push({ type: "date", label: day, key: `d-${idx}` }); lastDate = day; }
              groups.push({ type: "msg", msg, key: msg._id || idx });
            });
            return groups.map(item => {
              if (item.type === "date") {
                const today = new Date().toDateString();
                const yesterday = new Date(Date.now() - 86400000).toDateString();
                const label = item.label === today ? "Today" : item.label === yesterday ? "Yesterday" : item.label;
                return (
                  <div key={item.key} className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">{label}</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                );
              }
              const { msg } = item;
              const own = isOwn(msg);
              return (
                <MessageBubble key={item.key} msg={msg} isOwn={own} adminUser={adminUser} otherParticipant={targetUser}
                  onReply={setReplyTo} onUnsend={unsendMessage} onDeleteForMe={deleteForMe} onReact={reactToMessage}
                />
              );
            });
          })()
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply bar */}
      {replyTo && (
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border-t border-indigo-100 flex-shrink-0">
          <FaReply size={11} className="text-indigo-500 flex-shrink-0" />
          <p className="flex-1 text-xs text-indigo-700 truncate">Replying: {replyTo.isUnsent ? "Unsent message" : replyTo.message || "📷 Image"}</p>
          <button onClick={() => setReplyTo(null)} className="text-indigo-400 hover:text-indigo-600"><FaTimes size={12} /></button>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
        {!isConnected && <p className="text-[11px] text-center text-amber-500 mb-2">Reconnecting…</p>}
        <div className="relative">
          {showEmoji && (
            <div ref={emojiRef} className="absolute bottom-full mb-3 right-0 z-50">
              <div className="rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-white">
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600">
                  <div className="flex items-center gap-2"><FaSmile size={13} className="text-white/80" /><span className="text-xs font-semibold text-white">Emoji</span></div>
                  <button onClick={() => setShowEmoji(false)} className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center"><FaTimes size={9} /></button>
                </div>
                <EmojiPicker onEmojiClick={e => { setNewMessage(p => p + e.emoji); inputRef.current?.focus(); }} width={300} height={340} lazyLoad={true} />
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
            <button onClick={() => setShowEmoji(!showEmoji)} className={`dm-emoji-btn flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all ${showEmoji ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md scale-105" : "text-gray-400 hover:text-indigo-500 hover:bg-indigo-50"}`}>
              <FaSmile size={16} />
            </button>
            <button onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} className="text-gray-400 hover:text-indigo-500 transition flex-shrink-0">
              {uploadingImage ? <FaSpinner className="animate-spin" size={16} /> : <FaImage size={16} />}
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={sendImage} />
            <input ref={inputRef} type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyPress={e => e.key === "Enter" && sendMessage()}
              placeholder={`Message ${targetUser.name}…`}
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <button onClick={sendMessage} disabled={!newMessage.trim() || sending}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition">
              {sending ? <FaSpinner className="animate-spin" size={13} /> : <FaPaperPlane size={13} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const AdminUserManagement = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [detailUser, setDetailUser] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailTab, setDetailTab] = useState("profile");

  // Direct message panel
  const [dmUser, setDmUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportFilter, setReportFilter] = useState("all");

  const [viewImage, setViewImage] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, type: "", userId: null, inputVal: "" });
  const [warningModal, setWarningModal] = useState({ open: false, userId: null, userName: "", warningCount: 0 });
  const [warningReason, setWarningReason] = useState("");
  const [warningSubmitting, setWarningSubmitting] = useState(false);
  const [reportActionModal, setReportActionModal] = useState({ open: false, report: null, adminNote: "" });
  const [reportActionLoading, setReportActionLoading] = useState(false);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}");
      setAdminUser(u);
    } catch {}
    fetchUsers();
    fetchReports();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try { const res = await api.getUsers(); setUsers(res.users || []); }
    catch { toast.error("Failed to fetch users"); }
    finally { setLoading(false); }
  };

  const fetchReports = async () => {
    setReportsLoading(true);
    try { const res = await api.getReports(); setReports(res.reports || []); }
    catch { toast.error("Failed to fetch reports"); }
    finally { setReportsLoading(false); }
  };

  const fetchUserDetails = async (userId) => {
    setDetailLoading(true);
    setDetailTab("profile");
    setDmUser(null); // close DM when switching users
    try { const res = await api.getUser(userId); setDetailUser(res); }
    catch { toast.error("Failed to load user details"); }
    finally { setDetailLoading(false); }
  };

  const openDM = (user) => {
    setDmUser(user);
  };

  const handleGiveWarning = async () => {
    if (!warningReason.trim()) { toast.error("Please enter a reason."); return; }
    setWarningSubmitting(true);
    try {
      const res = await api.giveWarning(warningModal.userId, warningReason);
      toast.success(res.message);
      setWarningModal({ open: false, userId: null, userName: "", warningCount: 0 });
      setWarningReason("");
      fetchUsers();
      if (detailUser?.user?._id === warningModal.userId) fetchUserDetails(warningModal.userId);
      fetchReports();
    } catch (e) { toast.error(e.response?.data?.message || "Failed to give warning"); }
    finally { setWarningSubmitting(false); }
  };

  const handleBlockUser = async (userId, reason) => {
    try {
      const res = await api.blockUser(userId, reason);
      toast.success(res.message);
      fetchUsers();
      if (detailUser?.user?._id === userId) fetchUserDetails(userId);
    } catch (e) { toast.error(e.response?.data?.message || "Failed to block user"); }
    setConfirm({ open: false, type: "", userId: null, inputVal: "" });
  };

  const handleUnblockUser = async (userId, reason) => {
    try {
      const res = await api.unblockUser(userId, reason);
      toast.success(res.message);
      fetchUsers();
      if (detailUser?.user?._id === userId) fetchUserDetails(userId);
    } catch (e) { toast.error(e.response?.data?.message || "Failed to unblock user"); }
    setConfirm({ open: false, type: "", userId: null, inputVal: "" });
  };

  const handleResetWarnings = async (userId) => {
    try {
      const res = await api.resetWarnings(userId);
      toast.success(res.message);
      fetchUsers();
      if (detailUser?.user?._id === userId) fetchUserDetails(userId);
    } catch { toast.error("Failed to reset warnings"); }
    setConfirm({ open: false, type: "", userId: null, inputVal: "" });
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await api.deleteUser(userId);
      toast.success(res.message);
      fetchUsers();
      if (detailUser?.user?._id === userId) { setDetailUser(null); setDmUser(null); }
    } catch (e) { toast.error(e.response?.data?.message || "Failed to delete user"); }
    setConfirm({ open: false, type: "", userId: null, inputVal: "" });
  };

  const handleUpdateReportStatus = async (reportId, status) => {
    setReportActionLoading(true);
    try {
      await api.updateReport(reportId, status, reportActionModal.adminNote);
      toast.success("Report status updated");
      setReportActionModal({ open: false, report: null, adminNote: "" });
      fetchReports();
    } catch { toast.error("Failed to update report"); }
    finally { setReportActionLoading(false); }
  };

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatus === "all" || (filterStatus === "blocked" && u.isBlocked) || (filterStatus === "active" && !u.isBlocked) || (filterStatus === "warnings" && u.warningCount > 0);
    return matchSearch && matchFilter;
  });

  const filteredReports = reports.filter(r => reportFilter === "all" ? true : r.status === reportFilter);
  const pendingReportsCount = reports.filter(r => r.status === "pending").length;

  const exportCSV = () => {
    const rows = filteredUsers.map(u => [u.name, u.email, u.isBlocked ? "Blocked" : "Active", u.warningCount, new Date(u.createdAt).toLocaleDateString()]);
    const csv = [["Name", "Email", "Status", "Warnings", "Joined"], ...rows].map(r => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `users_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("CSV exported");
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center"><FaSpinner className="text-blue-500 animate-spin text-4xl mx-auto mb-3" /><p className="text-gray-500 text-sm">Loading users…</p></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/60">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <ImageViewer src={viewImage} onClose={() => setViewImage(null)} />

      <div className="p-6 max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage accounts, warnings, blocks, reports and direct messages</p>
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 shadow-sm transition">
            <FaDownload size={12} /> Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Users" value={users.length} icon={FaUsers} gradient="bg-gradient-to-br from-blue-500 to-cyan-500" />
          <StatCard label="Active" value={users.filter(u => !u.isBlocked).length} icon={FaUserCheck} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
          <StatCard label="Blocked" value={users.filter(u => u.isBlocked).length} icon={FaBan} gradient="bg-gradient-to-br from-red-500 to-rose-500" />
          <StatCard label="Pending Reports" value={pendingReportsCount} icon={FaFlag} gradient="bg-gradient-to-br from-orange-500 to-amber-500" sub={pendingReportsCount > 0 ? "Needs review" : "All clear"} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white border border-gray-200 rounded-xl p-1 w-fit shadow-sm">
          {[{ key: "users", label: "Users", icon: FaUsers }, { key: "reports", label: `Reports${pendingReportsCount > 0 ? ` (${pendingReportsCount})` : ""}`, icon: FaFlag }].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.key ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md" : "text-gray-500 hover:text-gray-800"}`}>
              <tab.icon size={13} />{tab.label}
            </button>
          ))}
        </div>

        {/* ══ USERS TAB ══ */}
        {activeTab === "users" && (
          <div className={`flex gap-6 ${detailUser ? "flex-col xl:flex-row" : ""}`}>
            {/* User list */}
            <div className={`flex-1 min-w-0 ${detailUser ? "xl:max-w-[40%]" : ""}`}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-4">
                <div className="flex gap-3 flex-wrap">
                  <div className="relative flex-1 min-w-[200px]">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by name or email…"
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                  </div>
                  <div className="relative">
                    <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="pl-9 pr-8 py-2 border border-gray-200 rounded-xl text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-300">
                      <option value="all">All Users</option><option value="active">Active</option><option value="blocked">Blocked</option><option value="warnings">Has Warnings</option>
                    </select>
                  </div>
                  <span className="self-center text-xs text-gray-400">{filteredUsers.length} users</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-16 text-gray-400"><FaUsers size={40} className="mx-auto mb-3 opacity-30" /><p className="text-sm font-medium">No users found</p></div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredUsers.map(u => (
                      <div key={u._id} onClick={() => fetchUserDetails(u._id)}
                        className={`flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition cursor-pointer group ${detailUser?.user?._id === u._id ? "bg-blue-50 border-l-4 border-l-blue-500" : "border-l-4 border-l-transparent"}`}>
                        <div className="relative flex-shrink-0">
                          {u.profilePhoto
                            ? <img src={`${BASE}/uploads/profiles/${u.profilePhoto}`} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                            : <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">{u.name.charAt(0).toUpperCase()}</div>
                          }
                          {u.isBlocked && <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"><FaBan className="text-white" size={7} /></div>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-gray-900 truncate">{u.name}</p>
                            <StatusBadge isBlocked={u.isBlocked} />
                          </div>
                          <p className="text-xs text-gray-400 truncate">{u.email}</p>
                        </div>
                        <div className="hidden sm:block flex-shrink-0">{u.warningCount > 0 && <WarningPips count={u.warningCount} />}</div>
                        <FaChevronRight size={11} className="text-gray-300 group-hover:text-gray-500 transition flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Detail + DM panels */}
            {detailUser && (
              <div className="flex-1 min-w-0 xl:max-w-[60%] flex flex-col xl:flex-row gap-4">
                {/* Detail panel */}
                <div className={`flex-1 min-w-0 ${dmUser ? "xl:max-w-[50%]" : ""}`}>
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-6">
                    {detailLoading ? (
                      <div className="flex items-center justify-center h-64"><FaSpinner className="animate-spin text-blue-400 text-2xl" /></div>
                    ) : (
                      <>
                        {/* Detail header */}
                        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
                          <div className="flex items-center gap-3">
                            {detailUser.user.profilePhoto
                              ? <img src={`${BASE}/uploads/profiles/${detailUser.user.profilePhoto}`} alt={detailUser.user.name} className="w-12 h-12 rounded-xl object-cover cursor-pointer hover:opacity-90 transition border border-white shadow-sm" onClick={() => setViewImage(`${BASE}/uploads/profiles/${detailUser.user.profilePhoto}`)} />
                              : <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">{detailUser.user.name.charAt(0).toUpperCase()}</div>
                            }
                            <div>
                              <h3 className="font-bold text-gray-900 text-sm">{detailUser.user.name}</h3>
                              <p className="text-xs text-gray-500">{detailUser.user.email}</p>
                            </div>
                          </div>
                          <button onClick={() => { setDetailUser(null); setDmUser(null); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/80 text-gray-400 hover:text-gray-600 transition">
                            <FaTimes size={14} />
                          </button>
                        </div>

                        {/* Status bar */}
                        <div className="flex items-center gap-3 px-5 py-2.5 bg-white border-b border-gray-100 flex-wrap">
                          <StatusBadge isBlocked={detailUser.user.isBlocked} />
                          <WarningPips count={detailUser.user.warningCount || 0} />
                          {detailUser.user.kycVerified && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full"><FaIdCard size={9} /> KYC</span>}
                          {detailUser.user.isEmailVerified && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full"><FaCheckCircle size={9} /> Verified</span>}
                        </div>

                        {/* Detail tabs */}
                        <div className="flex border-b border-gray-100 overflow-x-auto">
                          {[
                            { key: "profile", label: "Profile", icon: FaUser },
                            { key: "bookings", label: `Bookings (${detailUser.bookings?.length || 0})`, icon: FaCalendarAlt },
                            { key: "listings", label: `Listings (${detailUser.vehicles?.length || 0})`, icon: FaCar },
                            { key: "warnings", label: `Warnings (${detailUser.warnings?.length || 0})`, icon: FaExclamationTriangle },
                            { key: "reports", label: `Reports (${detailUser.reports?.length || 0})`, icon: FaFlag },
                          ].map(t => (
                            <button key={t.key} onClick={() => setDetailTab(t.key)}
                              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition ${detailTab === t.key ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                              <t.icon size={10} />{t.label}
                            </button>
                          ))}
                        </div>

                        {/* Detail content */}
                        <div className="p-5 max-h-[40vh] overflow-y-auto">
                          {detailTab === "profile" && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-3">
                                {[
                                  { label: "Full Name", value: detailUser.user.name },
                                  { label: "Username", value: `@${detailUser.user.username || detailUser.user.email.split("@")[0]}` },
                                  { label: "Gender", value: detailUser.user.gender || "Not specified" },
                                  { label: "Role", value: detailUser.user.role || "user", className: "capitalize" },
                                  { label: "Joined", value: new Date(detailUser.user.createdAt).toLocaleDateString() },
                                  { label: "Warnings", value: `${detailUser.user.warningCount || 0}/3`, className: detailUser.user.warningCount >= 3 ? "text-red-600 font-bold" : "text-yellow-600 font-semibold" },
                                ].map(item => (
                                  <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                                    <p className={`text-sm font-semibold text-gray-800 truncate ${item.className || ""}`}>{item.value}</p>
                                  </div>
                                ))}
                              </div>
                              {detailUser.user.isBlocked && (
                                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                                  <div className="flex items-center gap-2 mb-1"><FaBan className="text-red-400" size={12} /><p className="text-xs font-semibold text-red-700">Blocked</p></div>
                                  <p className="text-xs text-red-600">{detailUser.user.blockedReason || "No reason specified"}</p>
                                  {detailUser.user.blockedAt && <p className="text-xs text-red-400 mt-1">{new Date(detailUser.user.blockedAt).toLocaleString()}</p>}
                                </div>
                              )}
                            </div>
                          )}

                          {detailTab === "bookings" && (
                            <div>
                              {(!detailUser.bookings || detailUser.bookings.length === 0) ? (
                                <div className="text-center py-10 text-gray-400"><FaCalendarAlt size={32} className="mx-auto mb-2 opacity-30" /><p className="text-sm">No bookings yet</p></div>
                              ) : (
                                <div className="space-y-3">
                                  {detailUser.bookings.map(b => (
                                    <div key={b._id} className="border border-gray-100 rounded-xl p-3">
                                      <div className="flex items-start justify-between gap-2 mb-2">
                                        <div><p className="text-sm font-semibold text-gray-800 truncate">{b.vehicle?.carName || b.bike?.name || "Vehicle"}</p><p className="text-xs text-gray-400">Code: {b.confirmationCode || b.bookingCode || "—"}</p></div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap capitalize ${b.status === "completed" ? "bg-emerald-100 text-emerald-700" : b.status === "cancelled" ? "bg-red-100 text-red-600" : b.status === "active" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>{b.status}</span>
                                      </div>
                                      <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <span>📅 {new Date(b.pickupDate || b.startDate || b.createdAt).toLocaleDateString()}</span>
                                        {b.totalAmount && <span>💰 Rs. {b.totalAmount.toLocaleString()}</span>}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {detailTab === "listings" && (
                            <div>
                              {(!detailUser.vehicles || detailUser.vehicles.length === 0) ? (
                                <div className="text-center py-10 text-gray-400"><FaCar size={32} className="mx-auto mb-2 opacity-30" /><p className="text-sm">No listings yet</p></div>
                              ) : (
                                <div className="space-y-3">
                                  {detailUser.vehicles.map(v => {
                                    const thumb = v.vehiclePhotos?.[0]?.url || null;
                                    return (
                                      <div key={v._id} className="border border-gray-100 rounded-xl p-3 flex gap-3">
                                        {thumb ? <img src={`${BASE}${thumb}`} alt={v.carName} className="w-16 h-14 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:opacity-90" onClick={() => setViewImage(`${BASE}${thumb}`)} /> : <div className="w-16 h-14 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0"><FaImage size={20} className="text-gray-300" /></div>}
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm font-semibold text-gray-800 truncate">{v.carName}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap capitalize ${v.status === "active" ? "bg-emerald-100 text-emerald-700" : v.status === "pending" ? "bg-amber-100 text-amber-700" : v.status === "rejected" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}>{v.status}</span>
                                          </div>
                                          <p className="text-xs text-gray-400 mt-0.5 truncate">{v.city}</p>
                                          {v.ratePerDay && <p className="text-xs text-blue-600 font-medium mt-1">Rs. {v.ratePerDay?.toLocaleString()}/day</p>}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}

                          {detailTab === "warnings" && (
                            <div>
                              {(!detailUser.warnings || detailUser.warnings.length === 0) ? (
                                <div className="text-center py-10 text-gray-400"><FaExclamationTriangle size={32} className="mx-auto mb-2 opacity-30" /><p className="text-sm">No warnings issued</p></div>
                              ) : (
                                <div className="space-y-3">
                                  {detailUser.warnings.map((w, idx) => (
                                    <div key={idx} className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                                      <div className="flex items-center justify-between mb-2"><span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Warning #{idx + 1}</span><span className="text-xs text-gray-400">{new Date(w.createdAt).toLocaleString()}</span></div>
                                      <p className="text-sm text-gray-800">{w.reason}</p>
                                      <p className="text-xs text-gray-400 mt-1">By: {w.givenBy?.name || "Admin"}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {detailTab === "reports" && (
                            <div>
                              {(!detailUser.reports || detailUser.reports.length === 0) ? (
                                <div className="text-center py-10 text-gray-400"><FaFlag size={32} className="mx-auto mb-2 opacity-30" /><p className="text-sm">No reports against this user</p></div>
                              ) : (
                                <div className="space-y-3">
                                  {detailUser.reports.map((r, idx) => (
                                    <div key={idx} className="bg-red-50 border border-red-100 rounded-xl p-4">
                                      <div className="flex items-center justify-between mb-2"><span className="text-xs font-bold text-red-600 capitalize">{r.reason?.replace("_", " ")}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${REPORT_STATUS_STYLES[r.status] || REPORT_STATUS_STYLES.pending}`}>{r.status}</span></div>
                                      <p className="text-sm text-gray-700">{r.description}</p>
                                      <p className="text-xs text-gray-400 mt-1">By: {r.reportedBy?.name || "Anonymous"} · {new Date(r.createdAt).toLocaleString()}</p>
                                      {r.screenshotProof && <button onClick={() => setViewImage(`${BASE}${r.screenshotProof}`)} className="mt-2 text-xs text-blue-600 hover:underline flex items-center gap-1"><FaImage size={10} /> View Screenshot</button>}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action footer — now includes Message button */}
                        <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
                          {/* Message CTA row */}
                          <button
                            onClick={() => openDM(detailUser.user)}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 mb-3 rounded-xl text-sm font-semibold transition shadow-sm ${dmUser?._id === detailUser.user._id ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md" : "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"}`}
                          >
                            <FaComments size={13} />
                            {dmUser?._id === detailUser.user._id ? "Chat open →" : `Message ${detailUser.user.name.split(" ")[0]}`}
                          </button>

                          {/* Moderation actions */}
                          <div className="flex flex-wrap gap-2">
                            {!detailUser.user.isBlocked ? (
                              <>
                                <button onClick={() => setWarningModal({ open: true, userId: detailUser.user._id, userName: detailUser.user.name, warningCount: detailUser.user.warningCount || 0 })}
                                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl transition shadow-sm">
                                  <FaGavel size={11} /> Warn
                                </button>
                                <button onClick={() => setConfirm({ open: true, type: "block", userId: detailUser.user._id, inputVal: "" })}
                                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition shadow-sm">
                                  <FaBan size={11} /> Block
                                </button>
                              </>
                            ) : (
                              <button onClick={() => setConfirm({ open: true, type: "unblock", userId: detailUser.user._id, inputVal: "" })}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition shadow-sm">
                                <FaUnlock size={11} /> Unblock
                              </button>
                            )}
                            {(detailUser.user.warningCount || 0) > 0 && (
                              <button onClick={() => setConfirm({ open: true, type: "resetWarnings", userId: detailUser.user._id, inputVal: "" })}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition shadow-sm">
                                <FaHistory size={11} /> Reset
                              </button>
                            )}
                            <button onClick={() => setConfirm({ open: true, type: "delete", userId: detailUser.user._id, inputVal: "" })}
                              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-xl transition">
                              <FaTrash size={11} /> Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* DM panel — slides in alongside detail panel */}
                {dmUser && (
                  <div className="flex-1 min-w-0 xl:max-w-[50%]">
                    <div className="bg-white rounded-2xl border border-indigo-200 shadow-lg overflow-hidden sticky top-6" style={{ height: "600px" }}>
                      <DirectMessagePanel
                        key={dmUser._id}
                        targetUser={dmUser}
                        adminUser={adminUser}
                        onClose={() => setDmUser(null)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══ REPORTS TAB ══ */}
        {activeTab === "reports" && (
          <div>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-4 flex gap-2 flex-wrap">
              {["all", "pending", "reviewed", "action_taken", "dismissed"].map(s => (
                <button key={s} onClick={() => setReportFilter(s)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition border ${reportFilter === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}>
                  {s.replace("_", " ")}
                  {s !== "all" && <span className="ml-1 opacity-70">({reports.filter(r => r.status === s).length})</span>}
                </button>
              ))}
              <button onClick={fetchReports} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                <FaSpinner className={reportsLoading ? "animate-spin" : ""} size={10} /> Refresh
              </button>
            </div>

            {reportsLoading ? (
              <div className="flex items-center justify-center h-40"><FaSpinner className="animate-spin text-blue-400 text-2xl" /></div>
            ) : filteredReports.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm text-center py-20 text-gray-400"><FaFlag size={40} className="mx-auto mb-3 opacity-30" /><p className="text-sm font-medium">No reports</p></div>
            ) : (
              <div className="space-y-3">
                {filteredReports.map(report => (
                  <div key={report._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:border-gray-300 transition">
                    <div className="flex items-start gap-4 flex-wrap">
                      <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border capitalize ${REPORT_STATUS_STYLES[report.status] || REPORT_STATUS_STYLES.pending}`}>{report.status.replace("_", " ")}</span>
                          <span className="text-xs text-gray-400">{new Date(report.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <div><p className="text-xs text-gray-400">Reported User</p><p className="text-sm font-bold text-gray-900">{report.reportedUser?.name || "Unknown"}</p><p className="text-xs text-gray-400 truncate">{report.reportedUser?.email}</p></div>
                          <div className="text-gray-200 font-bold text-lg mx-1">→</div>
                          <div><p className="text-xs text-gray-400">Reported By</p><p className="text-sm font-semibold text-gray-700">{report.reportedBy?.name || "Anonymous"}</p></div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-orange-50 border border-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium capitalize">{report.reason?.replace("_", " ")}</span>
                        </div>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 leading-relaxed">{report.description}</p>
                        {report.screenshotProof && <button onClick={() => setViewImage(`${BASE}${report.screenshotProof}`)} className="mt-3 flex items-center gap-2 text-xs text-blue-600 hover:underline font-medium"><FaImage size={12} /> View Screenshot Evidence</button>}
                        {report.adminNote && <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl"><p className="text-xs font-semibold text-blue-700 mb-1">Admin Note</p><p className="text-xs text-blue-600">{report.adminNote}</p></div>}
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button onClick={() => { fetchUserDetails(report.reportedUser?._id); setActiveTab("users"); }}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl transition whitespace-nowrap">
                          <FaEye size={11} /> View User
                        </button>
                        {/* Direct message from reports tab */}
                        <button onClick={() => { fetchUserDetails(report.reportedUser?._id); setActiveTab("users"); setTimeout(() => openDM(report.reportedUser), 500); }}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-xl transition whitespace-nowrap">
                          <FaComments size={11} /> Message User
                        </button>
                        {report.status === "pending" && (
                          <>
                            <button onClick={() => setWarningModal({ open: true, userId: report.reportedUser?._id, userName: report.reportedUser?.name, warningCount: 0 })}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-xl transition whitespace-nowrap">
                              <FaGavel size={11} /> Warn User
                            </button>
                            <button onClick={() => setConfirm({ open: true, type: "block", userId: report.reportedUser?._id, inputVal: "" })}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition whitespace-nowrap">
                              <FaBan size={11} /> Block User
                            </button>
                          </>
                        )}
                        <button onClick={() => setReportActionModal({ open: true, report, adminNote: report.adminNote || "" })}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition whitespace-nowrap">
                          <FaInfoCircle size={11} /> Update Status
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══ WARNING MODAL ══ */}
      {warningModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-amber-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center"><FaGavel className="text-white" size={15} /></div>
                <div><h3 className="font-bold text-gray-900 text-sm">Issue Warning</h3><p className="text-xs text-gray-500">{warningModal.userName}</p></div>
              </div>
              <button onClick={() => { setWarningModal({ open: false, userId: null, userName: "", warningCount: 0 }); setWarningReason(""); }} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-amber-100 text-gray-400"><FaTimes size={13} /></button>
            </div>
            <div className="p-6">
              <div className={`mb-4 p-3 rounded-xl border text-sm ${warningModal.warningCount + 1 >= 3 ? "bg-red-50 border-red-100 text-red-700" : "bg-amber-50 border-amber-100 text-amber-700"}`}>
                {warningModal.warningCount + 1 >= 3 ? "⚠️ This will be the 3rd warning — user will be automatically blocked!" : `After this: ${warningModal.warningCount + 1}/3 warnings. ${3 - warningModal.warningCount - 1} more until auto-block.`}
              </div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Reason <span className="text-red-400">*</span></label>
              <textarea value={warningReason} onChange={e => setWarningReason(e.target.value)} placeholder="Describe the violation…" rows={4}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={() => { setWarningModal({ open: false }); setWarningReason(""); }} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 font-medium">Cancel</button>
              <button onClick={handleGiveWarning} disabled={warningSubmitting || !warningReason.trim()}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl disabled:opacity-40 flex items-center justify-center gap-2 text-sm">
                {warningSubmitting ? <FaSpinner className="animate-spin" size={13} /> : <FaGavel size={13} />} Issue Warning
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ BLOCK MODAL ══ */}
      {confirm.open && confirm.type === "block" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-red-50">
              <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center"><FaBan className="text-white" size={15} /></div>
              <div><h3 className="font-bold text-gray-900 text-sm">Block User</h3><p className="text-xs text-gray-500">This will prevent the user from logging in</p></div>
            </div>
            <div className="p-6">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Reason <span className="text-red-400">*</span></label>
              <textarea value={confirm.inputVal} onChange={e => setConfirm(p => ({ ...p, inputVal: e.target.value }))} placeholder="Reason for blocking…" rows={3}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 resize-none" />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={() => setConfirm({ open: false, type: "", userId: null, inputVal: "" })} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 font-medium">Cancel</button>
              <button onClick={() => handleBlockUser(confirm.userId, confirm.inputVal)} disabled={!confirm.inputVal.trim()}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl disabled:opacity-40 text-sm flex items-center justify-center gap-2">
                <FaBan size={13} /> Block User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ UNBLOCK MODAL ══ */}
      {confirm.open && confirm.type === "unblock" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-emerald-50">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center"><FaUnlock className="text-white" size={15} /></div>
              <h3 className="font-bold text-gray-900 text-sm">Unblock User</h3>
            </div>
            <div className="p-6">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Reason</label>
              <textarea value={confirm.inputVal} onChange={e => setConfirm(p => ({ ...p, inputVal: e.target.value }))} placeholder="Reason for unblocking…" rows={3}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none" />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={() => setConfirm({ open: false, type: "", userId: null, inputVal: "" })} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 font-medium">Cancel</button>
              <button onClick={() => handleUnblockUser(confirm.userId, confirm.inputVal || "Unblocked by admin")}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2">
                <FaUnlock size={13} /> Unblock User
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal isOpen={confirm.open && confirm.type === "resetWarnings"} title="Reset Warnings" message="This will clear all warnings for this user." confirmLabel="Reset Warnings" confirmColor="blue" onConfirm={() => handleResetWarnings(confirm.userId)} onCancel={() => setConfirm({ open: false, type: "", userId: null, inputVal: "" })} />
      <ConfirmModal isOpen={confirm.open && confirm.type === "delete"} title="Delete User" message="Permanent and cannot be undone. All user data will be removed." confirmLabel="Delete Permanently" confirmColor="red" onConfirm={() => handleDeleteUser(confirm.userId)} onCancel={() => setConfirm({ open: false, type: "", userId: null, inputVal: "" })} />

      {/* ══ REPORT STATUS MODAL ══ */}
      {reportActionModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Update Report Status</h3>
              <button onClick={() => setReportActionModal({ open: false, report: null, adminNote: "" })} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"><FaTimes size={13} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Report by <strong>{reportActionModal.report?.reportedBy?.name}</strong> against <strong>{reportActionModal.report?.reportedUser?.name}</strong></p>
                <p className="text-xs text-gray-400 capitalize">{reportActionModal.report?.reason?.replace("_", " ")} · {reportActionModal.report?.status}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Admin Note</label>
                <textarea value={reportActionModal.adminNote} onChange={e => setReportActionModal(p => ({ ...p, adminNote: e.target.value }))} placeholder="Add a note…" rows={3}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none" />
              </div>
              <div className="flex flex-wrap gap-2">
                {["reviewed", "action_taken", "dismissed"].map(s => (
                  <button key={s} onClick={() => handleUpdateReportStatus(reportActionModal.report._id, s)} disabled={reportActionLoading}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl transition border capitalize whitespace-nowrap disabled:opacity-50 ${s === "action_taken" ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500" : s === "dismissed" ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200" : "bg-blue-500 hover:bg-blue-600 text-white border-blue-500"}`}>
                    {reportActionLoading ? <FaSpinner className="animate-spin inline" size={11} /> : s.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;