import React, { useState, useRef } from "react";
import axios from "axios";
import {
  FaTimes,
  FaFlag,
  FaExclamationTriangle,
  FaImage,
  FaCheckCircle,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";

const BASE = "http://localhost:5000";

const REPORT_REASONS = [
  {
    value: "harassment",
    label: "Harassment or Bullying",
    icon: "😡",
    desc: "Threatening, abusive, or hateful messages",
  },
  {
    value: "spam",
    label: "Spam",
    icon: "📢",
    desc: "Repeated unsolicited messages or links",
  },
  {
    value: "fake_listing",
    label: "Fake Listing",
    icon: "🚫",
    desc: "Fraudulent or misleading vehicle listing",
  },
  {
    value: "scam",
    label: "Scam / Fraud",
    icon: "⚠️",
    desc: "Attempting to deceive or defraud",
  },
  {
    value: "inappropriate_content",
    label: "Inappropriate Content",
    icon: "🔞",
    desc: "Offensive, explicit, or inappropriate material",
  },
  {
    value: "other",
    label: "Other",
    icon: "🏳️",
    desc: "Any other violation not listed above",
  },
];

const ReportModal = ({ isOpen, onClose, reportedUser, reportedBy }) => {
  const [step, setStep] = useState(1); // 1 = select reason, 2 = details + proof, 3 = success
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Only image files are accepted as proof.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }
    setError("");
    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setScreenshotPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError("Please provide a description of the issue.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const formData = new FormData();
      formData.append("reportedUser", reportedUser._id || reportedUser.id);
      formData.append("reason", selectedReason);
      formData.append("description", description.trim());
      if (screenshotFile) formData.append("screenshot", screenshotFile);

      await axios.post(`${BASE}/api/reports/submit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setStep(3);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to submit report. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedReason("");
    setDescription("");
    setScreenshotFile(null);
    setScreenshotPreview(null);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-sm">
              <FaFlag className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Report User</h2>
              <p className="text-xs text-gray-500 truncate max-w-[200px]">
                {reportedUser?.name || "Unknown User"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Step indicator */}
        {step < 3 && (
          <div className="flex items-center px-6 pt-4 gap-2">
            {[1, 2].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={`flex items-center gap-1.5 ${step >= s ? "text-red-500" : "text-gray-300"}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${step >= s ? "border-red-500 bg-red-500 text-white" : "border-gray-200 text-gray-300"}`}
                  >
                    {s}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">
                    {s === 1 ? "Select Reason" : "Add Details"}
                  </span>
                </div>
                {s < 2 && (
                  <div
                    className={`flex-1 h-0.5 rounded-full transition-all ${step > s ? "bg-red-400" : "bg-gray-200"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="p-6">
          {/* Step 1: Select Reason */}
          {step === 1 && (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                What's the issue with this user?
              </p>
              <div className="space-y-2">
                {REPORT_REASONS.map((reason) => (
                  <button
                    key={reason.value}
                    onClick={() => setSelectedReason(reason.value)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                      selectedReason === reason.value
                        ? "border-red-400 bg-red-50"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{reason.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-semibold ${selectedReason === reason.value ? "text-red-700" : "text-gray-800"}`}
                      >
                        {reason.label}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {reason.desc}
                      </p>
                    </div>
                    {selectedReason === reason.value && (
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => selectedReason && setStep(2)}
                disabled={!selectedReason}
                className="mt-5 w-full py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:from-red-600 hover:to-orange-600 transition-all shadow-sm"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Details + Screenshot */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-4 p-3 bg-orange-50 border border-orange-100 rounded-xl">
                <FaExclamationTriangle
                  className="text-orange-500 flex-shrink-0"
                  size={13}
                />
                <p className="text-xs text-orange-700">
                  Reporting as:{" "}
                  <strong className="capitalize">
                    {selectedReason.replace("_", " ")}
                  </strong>
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="ml-auto text-xs text-orange-500 hover:underline font-medium"
                >
                  Change
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Describe the issue <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe what happened in detail. Include specific messages, dates, or any other relevant information..."
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300 resize-none transition"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {description.length} / 1000 chars
                </p>
              </div>

              {/* Screenshot upload */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Screenshot Proof{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                {screenshotPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
                    <img
                      src={screenshotPreview}
                      alt="Screenshot preview"
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={handleRemoveScreenshot}
                        className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
                      >
                        <FaTrash size={13} />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                      {screenshotFile?.name}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-red-300 hover:text-red-400 hover:bg-red-50 transition-all"
                  >
                    <FaImage size={20} />
                    <span className="text-xs font-medium">
                      Click to attach screenshot
                    </span>
                    <span className="text-xs text-gray-300">
                      PNG, JPG up to 5MB
                    </span>
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2">
                  <FaExclamationTriangle
                    className="text-red-400 flex-shrink-0"
                    size={12}
                  />
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep(1);
                    setError("");
                  }}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !description.trim()}
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:from-red-600 hover:to-orange-600 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin" size={13} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaFlag size={12} />
                      Submit Report
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-green-500 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Report Submitted
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Your report has been sent to our moderation team.
              </p>
              <p className="text-xs text-gray-400 mb-6">
                We review all reports and take appropriate action. Thank you for
                helping keep the community safe.
              </p>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl mb-5">
                <p className="text-xs text-blue-700">
                  💡 You can continue chatting normally. The reported user won't
                  know you submitted a report.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-900 transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
