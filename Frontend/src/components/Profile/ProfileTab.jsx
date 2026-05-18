import React, { useRef, useMemo } from "react";
import {
  FaCamera,
  FaTimes,
  FaSave,
  FaEnvelope,
  FaVenusMars,
  FaKey,
  FaCheckCircle,
  FaUserCircle,
  FaShieldAlt,
  FaCalendarAlt,
  FaPen,
  FaChevronRight,
  FaLock,
  FaIdCard,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileTab = ({
  user,
  editing,
  name,
  setName,
  username,
  setUsername,
  gender,
  setGender,
  photoPreview,
  uploading,
  onEditToggle,
  onSaveProfile,
  onPhotoChange,
  onRemovePhoto,
}) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const memberSince = useMemo(() => {
    if (!user?.createdAt) return "Recently joined";
    const date = new Date(user.createdAt);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [user?.createdAt]);

  return (
    <div className="w-full min-h-[80vh]">
      {/* ─── TWO-COLUMN LAYOUT ─── */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ━━━ LEFT COLUMN — Identity Card ━━━ */}
        <div className="lg:w-[340px] flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
            {/* Slim accent bar */}
            <div className="h-1.5 bg-blue-600" />

            <div className="px-6 pt-8 pb-6">
              {/* Avatar */}
              <div
                className="mb-5 flex justify-center"
                style={{ perspective: "500px" }}
              >
                <div
                  className="relative"
                  style={{
                    transform: "translateZ(30px) translateY(-4px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white"
                      style={{
                        boxShadow:
                          "0 8px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08), 0 16px 28px -6px rgba(0,0,0,0.10)",
                      }}
                    />
                  ) : (
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl border-4 border-white bg-blue-600"
                      style={{
                        boxShadow:
                          "0 8px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08), 0 16px 28px -6px rgba(0,0,0,0.10)",
                      }}
                    >
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  {editing && (
                    <>
                      <button
                        onClick={() => fileInputRef.current.click()}
                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition shadow-md"
                      >
                        <FaCamera size={11} />
                      </button>
                      {photoPreview && (
                        <button
                          onClick={onRemovePhoto}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition shadow-md"
                        >
                          <FaTimes size={9} />
                        </button>
                      )}
                    </>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={onPhotoChange}
                  />
                </div>
              </div>

              {/* Name / username */}
              <div className="text-center mb-4">
                {editing ? (
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-lg font-bold text-center bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 w-full transition"
                      placeholder="Your name"
                    />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="text-sm text-center bg-gray-50 text-gray-600 border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 w-full transition"
                      placeholder="username"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-lg font-bold text-gray-900">
                        {user?.name || "User"}
                      </h2>
                      {user?.kycVerified && (
                        <FaCheckCircle className="text-blue-600" size={14} />
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">@{username}</p>
                  </>
                )}
              </div>

              {/* Member since */}
              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mb-5">
                <FaCalendarAlt size={10} />
                <span>Member since {memberSince}</span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-5" />

              {/* Action buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={editing ? onSaveProfile : onEditToggle}
                  disabled={uploading}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    editing
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                  } ${uploading ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {uploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : editing ? (
                    <>
                      <FaSave size={12} /> Save Changes
                    </>
                  ) : (
                    <>
                      <FaPen size={10} /> Edit Profile
                    </>
                  )}
                </button>

                {editing && (
                  <button
                    onClick={onEditToggle}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-200 transition"
                  >
                    <FaTimes size={12} /> Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ━━━ RIGHT COLUMN — Details ━━━ */}
        <div className="flex-1 space-y-5">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Personal Information
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              {/* Email row */}
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user?.email || "—"}
                  </p>
                </div>
              </div>

              {/* Gender row */}
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-xl bg-fuchsia-50 text-fuchsia-500 flex items-center justify-center flex-shrink-0">
                  <FaVenusMars size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                    Gender
                  </p>
                  {editing ? (
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="mt-1 w-full max-w-[200px] border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  ) : (
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.gender || "Not specified"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Security & Verification */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Security & Verification
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              {/* KYC row */}
              <div className="flex items-center gap-4 px-6 py-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    user?.kycVerified
                      ? "bg-emerald-50 text-emerald-500"
                      : "bg-amber-50 text-amber-500"
                  }`}
                >
                  <FaIdCard size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                    Identity Verification
                  </p>
                  {user?.kycVerified ? (
                    <div className="flex items-center gap-1.5">
                      <FaCheckCircle size={12} className="text-emerald-500" />
                      <span className="text-sm font-semibold text-emerald-600">
                        Verified
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm font-semibold text-amber-600">
                      Not verified
                    </p>
                  )}
                </div>
                {!user?.kycVerified && (
                  <button
                    onClick={() => navigate("/kyc")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition shadow-sm"
                  >
                    <FaUserCircle size={12} /> Verify Now
                    <FaChevronRight size={8} />
                  </button>
                )}
              </div>

              {/* Password row */}
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0">
                  <FaLock size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                    Password
                  </p>
                  <p className="text-sm text-gray-500">••••••••••</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("/change-password")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition"
                  >
                    <FaKey size={10} /> Change
                  </button>
                  <button
                    onClick={() => navigate("/forgot-password")}
                    className="px-3 py-2 text-xs text-gray-400 hover:text-blue-600 transition"
                  >
                    Forgot?
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Shield */}
          <div
            className="rounded-2xl p-5 border"
            style={{
              background:
                "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)",
              borderColor: "#d1fae5",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <FaShieldAlt size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-1">
                  Account Security
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {user?.kycVerified
                    ? "Your identity is verified and your account is secured. You have full access to all RentRide features."
                    : "Complete KYC verification and keep your password updated to ensure your account stays secure."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
