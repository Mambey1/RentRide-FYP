import React, { useState } from "react";
import {
  FaCar,
  FaMotorcycle,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaUser,
  FaShieldAlt,
  FaEye,
  FaTrash,
  FaCreditCard,
  FaTimes,
  FaSpinner,
  FaFileAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BASE = "http://localhost:5000";

const BookingsTab = ({
  bookings,
  bikeBookings,
  bookingsLoading,
  bikeBookingsLoading,
  bookingSubTab,
  setBookingSubTab,
  getStatusBadge,
  getPaymentStatusBadge,
  formatDate,
  formatCurrency,
  getVehicleImageForBooking,
  openImageViewer,
  // refresh callbacks so cancellation updates the list
  fetchUserBookings,
  fetchUserBikeBookings,
}) => {
  const navigate = useNavigate();

  // ── Vehicle booking modal state ──────────────────────────────────────────
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingDocuments, setBookingDocuments] = useState(null);
  const [bookingDocumentsLoading, setBookingDocumentsLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // ── Bike booking modal state ─────────────────────────────────────────────
  const [showBikeBookingModal, setShowBikeBookingModal] = useState(false);
  const [selectedBikeBooking, setSelectedBikeBooking] = useState(null);
  const [bikeBookingDocuments, setBikeBookingDocuments] = useState(null);
  const [bikeBookingDocumentsLoading, setBikeBookingDocumentsLoading] =
    useState(false);

  // ── Cancel modal state ───────────────────────────────────────────────────
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancellingBooking, setCancellingBooking] = useState(false);
  // track which type is being cancelled
  const [cancellingBike, setCancellingBike] = useState(false);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const fetchBookingDocuments = async (bookingId, isBike = false) => {
    try {
      if (isBike) setBikeBookingDocumentsLoading(true);
      else setBookingDocumentsLoading(true);
      const res = await axios.get(
        `${BASE}/api/documents/booking/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (res.data.success) {
        if (isBike) setBikeBookingDocuments(res.data.data);
        else setBookingDocuments(res.data.data);
      } else {
        if (isBike) setBikeBookingDocuments(null);
        else setBookingDocuments(null);
      }
    } catch {
      if (isBike) setBikeBookingDocuments(null);
      else setBookingDocuments(null);
    } finally {
      if (isBike) setBikeBookingDocumentsLoading(false);
      else setBookingDocumentsLoading(false);
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setBookingDocuments(null);
    setShowBookingModal(true);
    fetchBookingDocuments(booking._id, false);
  };

  const handleViewBikeDetails = (booking) => {
    setSelectedBikeBooking(booking);
    setBikeBookingDocuments(null);
    setShowBikeBookingModal(true);
    fetchBookingDocuments(booking._id, true);
  };

  const openCancelModal = (booking, isBike = false) => {
    if (isBike) setSelectedBikeBooking(booking);
    else setSelectedBooking(booking);
    setCancellingBike(isBike);
    setCancelReason("");
    setShowCancelConfirm(true);
  };

  const handleMakePayment = async (booking) => {
    setPaymentLoading(true);
    try {
      const res = await axios.post(
        `${BASE}/api/payments/initiate-khalti`,
        { bookingId: booking._id },
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      if (res.data.success && res.data.payment_url) {
        sessionStorage.setItem("current_booking_id", booking._id);
        window.location.href = res.data.payment_url;
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }
    setCancellingBooking(true);
    try {
      const bookingId = cancellingBike
        ? selectedBikeBooking._id
        : selectedBooking._id;
      const url = cancellingBike
        ? `${BASE}/api/bikes/admin/bookings/${bookingId}/cancel`
        : `${BASE}/api/bookings/${bookingId}/cancel`;

      const res = await axios.post(
        url,
        { reason: cancelReason },
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );

      if (res.data.success) {
        toast.success(
          `${cancellingBike ? "Bike booking" : "Booking"} cancelled successfully!`,
        );
        setShowCancelConfirm(false);
        setShowBookingModal(false);
        setShowBikeBookingModal(false);
        setCancelReason("");
        setSelectedBooking(null);
        setSelectedBikeBooking(null);
        // refresh the lists
        if (cancellingBike && fetchUserBikeBookings) fetchUserBikeBookings();
        if (!cancellingBike && fetchUserBookings) fetchUserBookings();
      } else {
        toast.error(res.data.message || "Failed to cancel booking");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancellingBooking(false);
    }
  };

  // ── Shared document grid renderer ────────────────────────────────────────
  const renderDocuments = (docs, loading, accentColor = "gray") => {
    if (loading) {
      return (
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <FaSpinner className="animate-spin" size={12} /> Loading documents...
        </div>
      );
    }
    if (!docs) {
      return (
        <p className="text-sm text-gray-400 flex items-center gap-2">
          <FaInfoCircle size={12} /> No documents uploaded for this booking.
        </p>
      );
    }
    const fields = [
      { key: "citizenshipFront", label: "Citizenship Front" },
      { key: "citizenshipBack", label: "Citizenship Back" },
      { key: "licenseFront", label: "License Front" },
      { key: "licenseBack", label: "License Back" },
      { key: "passportPhoto", label: "Passport Photo" },
    ];
    return (
      <div className="grid grid-cols-2 gap-3">
        {fields.map(({ key, label }) =>
          docs[key] ? (
            <div
              key={key}
              className={`border border-${accentColor}-100 rounded-xl overflow-hidden bg-${accentColor}-50/30`}
            >
              <div
                className={`px-3 py-1.5 bg-${accentColor}-50 text-xs font-medium text-${accentColor}-700`}
              >
                {label}
              </div>
              {docs[key].mimetype?.startsWith("image/") ? (
                <img
                  src={`${BASE}${docs[key].url}`}
                  alt={label}
                  className="w-full h-28 object-cover cursor-pointer hover:opacity-90 transition"
                  onClick={() => openImageViewer(`${BASE}${docs[key].url}`)}
                />
              ) : (
                <div className="p-3 text-center">
                  <FaFileAlt className="text-red-400 text-2xl mx-auto mb-1" />
                  <a
                    href={`${BASE}${docs[key].url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View PDF
                  </a>
                </div>
              )}
            </div>
          ) : null,
        )}
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────
  return (
    <>
      <div>
        {/* Sub-tab switcher */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setBookingSubTab("vehicles")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                bookingSubTab === "vehicles"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaCar size={13} /> Vehicles
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${bookingSubTab === "vehicles" ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"}`}
              >
                {bookings.length}
              </span>
            </button>
            <button
              onClick={() => setBookingSubTab("bikes")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                bookingSubTab === "bikes"
                  ? "bg-white shadow text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaMotorcycle size={13} /> Bikes
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${bookingSubTab === "bikes" ? "bg-purple-100 text-purple-600" : "bg-gray-200 text-gray-500"}`}
              >
                {bikeBookings.length}
              </span>
            </button>
          </div>
        </div>

        {/* ── Vehicle Bookings ── */}
        {bookingSubTab === "vehicles" && (
          <>
            {bookingsLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow">
                <FaCar className="text-5xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No vehicle bookings found</p>
                <button
                  onClick={() => navigate("/rentridehome")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Browse Vehicles
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {getVehicleImageForBooking(booking) ? (
                          <img
                            src={getVehicleImageForBooking(booking)}
                            alt={booking.vehicle?.carName}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() =>
                              openImageViewer(
                                getVehicleImageForBooking(booking),
                              )
                            }
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaCar className="text-gray-400 text-3xl" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {booking.vehicle?.carName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {booking.vehicle?.carNumber}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Booking ID: {booking.confirmationCode}
                            </p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(booking.status)}
                            <div className="mt-2">
                              {getPaymentStatusBadge(booking.paymentStatus)}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaCalendarAlt size={10} />
                            <span>
                              {formatDate(booking.pickupDate)} –{" "}
                              {formatDate(booking.returnDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaClock size={10} />
                            <span>
                              {booking.totalDays} day
                              {booking.totalDays > 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaMapMarkerAlt size={10} />
                            <span className="truncate">
                              {booking.pickupLocation}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaRupeeSign size={10} />
                            <span className="font-semibold text-blue-600">
                              {formatCurrency(booking.totalAmount)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaUser size={10} />
                            <span>
                              {booking.driverOption === "with"
                                ? "With Driver"
                                : "Self Drive"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaShieldAlt size={10} />
                            <span>
                              {booking.insuranceOption === "premium"
                                ? "Premium"
                                : "Basic"}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleViewDetails(booking)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                          >
                            <FaEye size={12} /> View Details
                          </button>
                          {booking.status === "approved" &&
                            booking.paymentStatus === "pending" && (
                              <button
                                onClick={() => handleMakePayment(booking)}
                                disabled={paymentLoading}
                                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                              >
                                <FaCreditCard size={12} /> Make Payment
                              </button>
                            )}
                          {(booking.status === "pending" ||
                            booking.status === "approved") && (
                            <button
                              onClick={() => openCancelModal(booking, false)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                            >
                              <FaTrash size={12} /> Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Bike Bookings ── */}
        {bookingSubTab === "bikes" && (
          <>
            {bikeBookingsLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading bike bookings...</p>
              </div>
            ) : bikeBookings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow">
                <FaMotorcycle className="text-5xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No bike bookings found</p>
                <button
                  onClick={() => navigate("/rentridehome")}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Browse Bikes
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bikeBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white border border-purple-100 rounded-xl p-6 hover:shadow-md transition"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-purple-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {booking.bike?.photos?.[0]?.filename ? (
                          <img
                            src={`${BASE}/uploads/bikes/${booking.bike.photos[0].filename}`}
                            alt={booking.bike?.bikeName}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() =>
                              openImageViewer(
                                `${BASE}/uploads/bikes/${booking.bike.photos[0].filename}`,
                              )
                            }
                          />
                        ) : (
                          <FaMotorcycle className="text-purple-300 text-3xl" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {booking.bike?.bikeName}
                              </h3>
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                                Bike
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              {booking.bike?.bikeType || "Standard"}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Booking ID: {booking.confirmationCode}
                            </p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(booking.status)}
                            <div className="mt-2">
                              {getPaymentStatusBadge(booking.paymentStatus)}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaCalendarAlt size={10} />
                            <span>
                              {formatDate(booking.pickupDate)} –{" "}
                              {formatDate(booking.returnDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaClock size={10} />
                            <span>
                              {booking.totalDays} day
                              {booking.totalDays > 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaMapMarkerAlt size={10} />
                            <span className="truncate">
                              {booking.pickupLocation}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaRupeeSign size={10} />
                            <span className="font-semibold text-purple-600">
                              {formatCurrency(booking.totalAmount)}
                            </span>
                          </div>
                          {booking.extraHelmet && (
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaShieldAlt size={10} />{" "}
                              <span>Extra Helmet</span>
                            </div>
                          )}
                          {booking.ridingGear && (
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaShieldAlt size={10} /> <span>Riding Gear</span>
                            </div>
                          )}
                          {booking.riderExperience && (
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaUser size={10} />{" "}
                              <span>{booking.riderExperience}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleViewBikeDetails(booking)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                          >
                            <FaEye size={12} /> View Details
                          </button>
                          {booking.status === "approved" &&
                            booking.paymentStatus === "pending" && (
                              <button
                                onClick={() =>
                                  navigate(`/payment/${booking._id}`)
                                }
                                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                              >
                                <FaCreditCard size={12} /> Make Payment
                              </button>
                            )}
                          {(booking.status === "pending" ||
                            booking.status === "approved") && (
                            <button
                              onClick={() => openCancelModal(booking, true)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                            >
                              <FaTrash size={12} /> Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ══════════ VEHICLE BOOKING DETAILS MODAL ══════════ */}
      {showBookingModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                Booking Details
              </h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {selectedBooking.vehicle?.carName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedBooking.vehicle?.carNumber}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Booking ID: {selectedBooking.confirmationCode}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {getStatusBadge(selectedBooking.status)}
                  {getPaymentStatusBadge(selectedBooking.paymentStatus)}
                </div>
              </div>

              {/* Dates grid */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                <div>
                  <p className="text-xs text-gray-400">Pickup Date</p>
                  <p className="font-medium text-gray-800">
                    {formatDate(selectedBooking.pickupDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Return Date</p>
                  <p className="font-medium text-gray-800">
                    {formatDate(selectedBooking.returnDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="font-medium text-gray-800">
                    {selectedBooking.totalDays} days
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Amount</p>
                  <p className="font-medium text-gray-800">
                    {formatCurrency(selectedBooking.totalAmount)}
                  </p>
                </div>
                {selectedBooking.pickupLocation && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">Pickup Location</p>
                    <p className="font-medium text-gray-800">
                      {selectedBooking.pickupLocation}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-400">Driver Option</p>
                  <p className="font-medium text-gray-800">
                    {selectedBooking.driverOption === "with"
                      ? "With Driver"
                      : "Self Drive"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Insurance</p>
                  <p className="font-medium text-gray-800">
                    {selectedBooking.insuranceOption === "premium"
                      ? "Premium"
                      : "Basic"}
                  </p>
                </div>
              </div>

              {/* Cancellation reason */}
              {selectedBooking.cancellationReason && (
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-xs text-red-400 mb-1">
                    Cancellation Reason
                  </p>
                  <p className="text-sm text-red-700">
                    {selectedBooking.cancellationReason}
                  </p>
                </div>
              )}

              {/* Documents */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaFileAlt className="text-blue-600" /> Uploaded Documents
                </h4>
                {renderDocuments(
                  bookingDocuments,
                  bookingDocumentsLoading,
                  "gray",
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {selectedBooking.status === "approved" &&
                  selectedBooking.paymentStatus === "pending" && (
                    <button
                      onClick={() => handleMakePayment(selectedBooking)}
                      disabled={paymentLoading}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-sm transition disabled:opacity-50"
                    >
                      {paymentLoading ? (
                        <FaSpinner className="animate-spin" size={14} />
                      ) : (
                        <FaCreditCard size={14} />
                      )}
                      Make Payment
                    </button>
                  )}
                {(selectedBooking.status === "pending" ||
                  selectedBooking.status === "approved") && (
                  <button
                    onClick={() => {
                      setShowBookingModal(false);
                      openCancelModal(selectedBooking, false);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium text-sm transition"
                  >
                    <FaTrash size={14} /> Cancel Booking
                  </button>
                )}
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-medium text-sm hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ BIKE BOOKING DETAILS MODAL ══════════ */}
      {showBikeBookingModal && selectedBikeBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                Bike Booking Details
              </h3>
              <button
                onClick={() => setShowBikeBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {selectedBikeBooking.bike?.bikeName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedBikeBooking.bike?.bikeType}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Booking ID: {selectedBikeBooking.confirmationCode}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {getStatusBadge(selectedBikeBooking.status)}
                  {getPaymentStatusBadge(selectedBikeBooking.paymentStatus)}
                </div>
              </div>

              {/* Bike info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaMotorcycle className="text-purple-600" /> Bike Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Engine Capacity</p>
                    <p className="font-medium">
                      {selectedBikeBooking.bike?.engineCapacity || "N/A"} cc
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Rate Per Day</p>
                    <p className="font-medium text-purple-600">
                      {formatCurrency(selectedBikeBooking.bike?.ratePerDay)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                <div>
                  <p className="text-xs text-gray-400">Pickup Date & Time</p>
                  <p className="font-medium text-gray-800">
                    {formatDate(selectedBikeBooking.pickupDate)} at{" "}
                    {selectedBikeBooking.pickupTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Return Date & Time</p>
                  <p className="font-medium text-gray-800">
                    {formatDate(selectedBikeBooking.returnDate)} at{" "}
                    {selectedBikeBooking.returnTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="font-medium text-gray-800">
                    {selectedBikeBooking.totalDays} day
                    {selectedBikeBooking.totalDays > 1 ? "s" : ""}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Pickup Location</p>
                  <p className="font-medium text-gray-800">
                    {selectedBikeBooking.pickupLocation}
                  </p>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="border rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaRupeeSign className="text-green-600" /> Price Breakdown
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Base Price ({selectedBikeBooking.totalDays} days)
                    </span>
                    <span>{formatCurrency(selectedBikeBooking.basePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service Fee</span>
                    <span>
                      {formatCurrency(selectedBikeBooking.serviceFee)}
                    </span>
                  </div>
                  {selectedBikeBooking.extraHelmet && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Extra Helmet</span>
                      <span>
                        {formatCurrency(100 * selectedBikeBooking.totalDays)}
                      </span>
                    </div>
                  )}
                  {selectedBikeBooking.ridingGear && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Riding Gear</span>
                      <span>
                        {formatCurrency(200 * selectedBikeBooking.totalDays)}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span className="text-purple-600">
                      {formatCurrency(selectedBikeBooking.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rider info */}
              {(selectedBikeBooking.riderExperience ||
                selectedBikeBooking.emergencyContact) && (
                <div className="border rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaUser className="text-blue-600" /> Rider Information
                  </h4>
                  {selectedBikeBooking.riderExperience && (
                    <p className="text-sm mb-2">
                      <span className="text-gray-500">Experience:</span>{" "}
                      <span className="font-medium">
                        {selectedBikeBooking.riderExperience}
                      </span>
                    </p>
                  )}
                  {selectedBikeBooking.emergencyContact?.name && (
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-xs text-gray-500 mb-1">
                        Emergency Contact
                      </p>
                      <p className="text-sm">
                        {selectedBikeBooking.emergencyContact.name} –{" "}
                        {selectedBikeBooking.emergencyContact.phone}
                        {selectedBikeBooking.emergencyContact.relationship &&
                          ` (${selectedBikeBooking.emergencyContact.relationship})`}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Special requests */}
              {selectedBikeBooking.specialRequests && (
                <div className="bg-yellow-50 rounded-xl p-4">
                  <p className="text-xs text-yellow-600 mb-1">
                    Special Requests
                  </p>
                  <p className="text-sm text-gray-700">
                    {selectedBikeBooking.specialRequests}
                  </p>
                </div>
              )}

              {/* Cancellation reason */}
              {selectedBikeBooking.cancellationReason && (
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-xs text-red-400 mb-1">
                    Cancellation Reason
                  </p>
                  <p className="text-sm text-red-700">
                    {selectedBikeBooking.cancellationReason}
                  </p>
                </div>
              )}

              {/* Documents */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaFileAlt className="text-purple-600" /> Uploaded Documents
                </h4>
                {renderDocuments(
                  bikeBookingDocuments,
                  bikeBookingDocumentsLoading,
                  "purple",
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {selectedBikeBooking.status === "approved" &&
                  selectedBikeBooking.paymentStatus === "pending" && (
                    <button
                      onClick={() =>
                        navigate(`/payment/${selectedBikeBooking._id}`)
                      }
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-sm transition"
                    >
                      <FaCreditCard size={14} /> Make Payment
                    </button>
                  )}
                {(selectedBikeBooking.status === "pending" ||
                  selectedBikeBooking.status === "approved") && (
                  <button
                    onClick={() => {
                      setShowBikeBookingModal(false);
                      openCancelModal(selectedBikeBooking, true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium text-sm transition"
                  >
                    <FaTrash size={14} /> Cancel Booking
                  </button>
                )}
                <button
                  onClick={() => setShowBikeBookingModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-medium text-sm hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ CANCEL CONFIRM MODAL ══════════ */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Cancel {cancellingBike ? "Bike " : ""}Booking
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Please provide a reason for cancellation.
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Reason for cancellation..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 mb-4 resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelConfirm(false);
                  setCancelReason("");
                }}
                className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-medium text-sm hover:bg-gray-50 transition"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={cancellingBooking}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {cancellingBooking ? (
                  <FaSpinner className="animate-spin" size={13} />
                ) : (
                  <FaTimes size={13} />
                )}
                {cancellingBooking ? "Cancelling..." : "Cancel Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingsTab;
