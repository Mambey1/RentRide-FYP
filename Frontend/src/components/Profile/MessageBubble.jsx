import React, { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaReply,
  FaSmile,
  FaEllipsisV,
  FaTrash,
  FaCheckDouble,
  FaHeadset,
} from "react-icons/fa";
// import { BASE } from "../../services/chatService";
// import { BASE } from "../../services/api";
const BASE = "http://localhost:5000";

const QUICK_REACTIONS = ["❤️", "😂", "😮", "😢", "😡", "👍"];

const MessageBubble = ({
  msg,
  isOwn,
  user,
  otherParticipant,
  isSupportChat,
  onReply,
  onUnsend,
  onDeleteForMe,
  onReact,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showQuickReactions, setShowQuickReactions] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef(null);
  const actionsRef = useRef(null);

  const isUnsent = msg.isUnsent;
  const hasImage = msg.attachments?.length > 0;
  const shouldShowActions = showActions || showQuickReactions || showMoreMenu;

  const reactionGroups = (msg.reactions || []).reduce((acc, r) => {
    acc[r.emoji] = (acc[r.emoji] || 0) + 1;
    return acc;
  }, {});
  const myReaction = (msg.reactions || []).find(
    (r) => r.userId === user?._id || r.userId === user?.id
  );

  useEffect(() => {
    const handler = (e) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(e.target) &&
        actionsRef.current &&
        !actionsRef.current.contains(e.target)
      ) {
        setShowMoreMenu(false);
        setShowQuickReactions(false);
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getBubbleStyle = () => {
    if (isUnsent)
      return "bg-gray-100 text-gray-400 italic border border-gray-200 rounded-2xl";
    if (isOwn)
      return "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm";
    if (msg.senderType === "owner")
      return "bg-orange-50 border border-orange-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";
    if (msg.senderType === "admin")
      return "bg-purple-50 border border-purple-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";
    return "bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";
  };

  return (
    <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} mb-3`}>
      {/* Reply preview */}
      {msg.replyTo &&
        msg.replyToSnapshot &&
        msg.replyToSnapshot.message !== undefined &&
        !isUnsent && (
          <div
            className={`flex items-center gap-1.5 mb-1 px-2 py-1.5 rounded-lg bg-gray-100 border-l-2 border-blue-400 max-w-[65%] ${isOwn ? "mr-8" : "ml-8"}`}
          >
            <FaReply size={9} className="text-blue-400 flex-shrink-0" />
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
            isSupportChat ? (
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                <FaHeadset size={12} />
              </div>
            ) : otherParticipant?.profilePhoto ? (
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
          ) : user?.profilePhoto ? (
            <img
              src={`${BASE}/uploads/profiles/${user.profilePhoto}`}
              alt=""
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>

        {/* Hover wrapper: toolbar + bubble */}
        <div
          className={`flex items-center max-w-[75%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => {
            if (!showMoreMenu && !showQuickReactions) setShowActions(false);
          }}
        >
          {/* Action toolbar */}
          {shouldShowActions && !isUnsent && (
            <div
              ref={actionsRef}
              className="flex items-center gap-0.5 flex-shrink-0 px-1"
            >
              {/* Reply */}
              <button
                onClick={() => onReply(msg)}
                className="w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-blue-50 transition"
                title="Reply"
              >
                <FaReply size={9} className="text-gray-500" />
              </button>

              {/* React */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowQuickReactions(!showQuickReactions);
                    setShowMoreMenu(false);
                  }}
                  className={`w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-yellow-50 transition ${showQuickReactions ? "bg-yellow-50 border-yellow-200" : ""}`}
                  title="React"
                >
                  <FaSmile size={9} className="text-gray-500" />
                </button>
                {showQuickReactions && (
                  <div
                    className={`absolute top-full mt-1 flex gap-1 bg-white rounded-full px-2 py-1.5 shadow-xl border border-gray-100 z-30 ${isOwn ? "right-0" : "left-0"}`}
                  >
                    {QUICK_REACTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          onReact(msg._id, emoji);
                          setShowQuickReactions(false);
                          setShowActions(false);
                        }}
                        className={`text-lg hover:scale-125 transition-transform leading-none ${myReaction?.emoji === emoji ? "scale-125" : ""}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* More options */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => {
                    setShowMoreMenu(!showMoreMenu);
                    setShowQuickReactions(false);
                  }}
                  className={`w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition ${showMoreMenu ? "bg-gray-100" : ""}`}
                >
                  <FaEllipsisV size={8} className="text-gray-500" />
                </button>
                {showMoreMenu && (
                  <div
                    className={`absolute top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-30 min-w-[150px] py-1 ${isOwn ? "right-0" : "left-0"}`}
                  >
                    <button
                      onClick={() => {
                        onReply(msg);
                        setShowMoreMenu(false);
                        setShowActions(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-blue-600 hover:bg-blue-50"
                    >
                      <FaReply size={10} /> Reply
                    </button>
                    {isOwn && (
                      <button
                        onClick={() => {
                          onUnsend(msg._id);
                          setShowMoreMenu(false);
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
                        setShowMoreMenu(false);
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

          {/* Message bubble */}
          <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
            <div className={`px-4 py-2.5 text-sm leading-relaxed break-words ${getBubbleStyle()}`}>
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
                          window.open(`${BASE}${msg.attachments[0].url}`, "_blank")
                        }
                      />
                    </div>
                  )}
                  {msg.message && <p>{msg.message}</p>}
                </>
              )}
            </div>

            {/* Reactions display */}
            {Object.keys(reactionGroups).length > 0 && (
              <div className={`flex gap-0.5 mt-1 flex-wrap ${isOwn ? "justify-end" : "justify-start"}`}>
                {Object.entries(reactionGroups).map(([emoji, count]) => (
                  <button
                    key={emoji}
                    onClick={() => onReact(msg._id, emoji)}
                    className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] border transition ${
                      myReaction?.emoji === emoji
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {emoji}
                    {count > 1 && <span className="ml-0.5">{count}</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Time + read receipt */}
            <div className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}>
              <span className="text-[10px] text-gray-400">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {isOwn && !isUnsent && (
                <FaCheckDouble
                  size={9}
                  className={msg.read ? "text-blue-400" : "text-gray-300"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;