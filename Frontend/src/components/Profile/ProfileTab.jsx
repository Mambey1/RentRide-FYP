import React, { useRef } from "react";
import {
  FaCamera,
  FaTimes,
  FaUserEdit,
  FaSave,
  FaEnvelope,
  FaVenusMars,
  FaKey,
  FaCheckCircle,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { BASE } from "../../services/chatService";

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

  return (
    <div className="flex flex-col items-center text-center">
      {/* Avatar */}
      <div className="relative mb-4">
        {photoPreview ? (
          <img
            src={photoPreview}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        {editing && (
          <>
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-md"
            >
              <FaCamera />
            </button>
            {photoPreview && (
              <button
                onClick={onRemovePhoto}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow-md"
              >
                <FaTimes size={12} />
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

      {/* Name / Username */}
      <div className="mb-6">
        {editing ? (
          <div className="flex flex-col items-center gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-semibold text-center bg-transparent border-b border-blue-300 focus:outline-none mb-1 focus:border-blue-500"
              placeholder="Enter name"
            />
            <div className="flex items-center gap-2">
              <span className="text-gray-500">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-gray-500 text-center bg-transparent border-b border-blue-300 focus:outline-none focus:border-blue-500"
                placeholder="username"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-500">@{username}</p>
          </div>
        )}
      </div>

      {/* Save / Edit button */}
      <button
        onClick={editing ? onSaveProfile : onEditToggle}
        disabled={uploading}
        className={`flex items-center gap-2 w-64 py-3 rounded-xl font-medium mb-4 justify-center transition ${
          editing
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        } ${uploading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {uploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Saving...
          </>
        ) : editing ? (
          <>
            <FaSave /> Save Profile
          </>
        ) : (
          <>
            <FaUserEdit /> Edit Profile
          </>
        )}
      </button>

      {editing && (
        <button
          onClick={onEditToggle}
          className="flex items-center gap-2 w-64 bg-red-100 hover:bg-red-200 text-red-700 py-3 rounded-xl font-medium mb-10 justify-center transition"
        >
          <FaTimes /> Cancel Edit
        </button>
      )}

      {/* Info fields */}
      <div className="w-full max-w-xl space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3 text-gray-600">
            <FaEnvelope />
            <span>Email</span>
          </div>
          <span className="font-medium">{user?.email}</span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3 text-gray-600">
            <FaVenusMars />
            <span>Gender</span>
          </div>
          {editing ? (
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          ) : (
            <span className="font-medium">{user?.gender || "Not specified"}</span>
          )}
        </div>

        <div className="space-y-4 pt-4">
          <button
            onClick={() => navigate("/change-password")}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-xl font-medium transition w-full justify-center"
          >
            <FaKey /> Change Password
          </button>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-600 hover:text-blue-700 transition"
            >
              Forgot Password?
            </button>
          </div>
          <div className="flex items-center justify-center gap-3">
            {user?.kycVerified ? (
              <>
                <FaCheckCircle className="text-green-600 text-lg" />
                <span className="font-medium text-green-600">KYC Verified</span>
              </>
            ) : (
              <button
                onClick={() => navigate("/kyc")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition"
              >
                <FaUserCircle /> Complete KYC
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;