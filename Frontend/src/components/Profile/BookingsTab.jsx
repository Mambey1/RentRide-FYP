import React from "react";
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
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { BASE } from "../../services/chatService";
// import { BASE } from "../../services/api";
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
  handleViewDetails,
  handleViewBikeDetails,
  handleMakePayment,
  openCancelModal,
  openBikeCancelModal,
  paymentLoading,
}) => {
  const navigate = useNavigate();

  return (
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

      {/* Vehicle Bookings */}
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
                          onClick={() => openImageViewer(getVehicleImageForBooking(booking))}
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
                          <p className="text-sm text-gray-500">{booking.vehicle?.carNumber}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Booking ID: {booking.confirmationCode}
                          </p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(booking.status)}
                          <div className="mt-2">{getPaymentStatusBadge(booking.paymentStatus)}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <FaCalendarAlt size={10} />
                          <span>
                            {formatDate(booking.pickupDate)} – {formatDate(booking.returnDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <FaClock size={10} />
                          <span>
                            {booking.totalDays} day{booking.totalDays > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <FaMapMarkerAlt size={10} />
                          <span className="truncate">{booking.pickupLocation}</span>
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
                            {booking.driverOption === "with" ? "With Driver" : "Self Drive"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <FaShieldAlt size={10} />
                          <span>
                            {booking.insuranceOption === "premium" ? "Premium" : "Basic"}
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
                        {booking.status === "approved" && booking.paymentStatus === "pending" && (
                          <button
                            onClick={() => handleMakePayment(booking)}
                            disabled={paymentLoading}
                            className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                          >
                            <FaCreditCard size={12} /> Make Payment
                          </button>
                        )}
                        {(booking.status === "pending" || booking.status === "approved") && (
                          <button
                            onClick={() => openCancelModal(booking)}
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

      {/* Bike Bookings */}
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
                              `${BASE}/uploads/bikes/${booking.bike.photos[0].filename}`
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
                          <div className="mt-2">{getPaymentStatusBadge(booking.paymentStatus)}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <FaCalendarAlt size={10} />
                          <span>
                            {formatDate(booking.pickupDate)} – {formatDate(booking.returnDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <FaClock size={10} />
                          <span>
                            {booking.totalDays} day{booking.totalDays > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <FaMapMarkerAlt size={10} />
                          <span className="truncate">{booking.pickupLocation}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <FaRupeeSign size={10} />
                          <span className="font-semibold text-purple-600">
                            {formatCurrency(booking.totalAmount)}
                          </span>
                        </div>
                        {booking.extraHelmet && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaShieldAlt size={10} />
                            <span>Extra Helmet</span>
                          </div>
                        )}
                        {booking.ridingGear && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaShieldAlt size={10} />
                            <span>Riding Gear</span>
                          </div>
                        )}
                        {booking.riderExperience && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaUser size={10} />
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
                        {booking.status === "approved" && booking.paymentStatus === "pending" && (
                          <button
                            onClick={() => navigate(`/payment/${booking._id}`)}
                            className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                          >
                            <FaCreditCard size={12} /> Make Payment
                          </button>
                        )}
                        {(booking.status === "pending" || booking.status === "approved") && (
                          <button
                            onClick={() => openBikeCancelModal(booking)}
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
  );
};

export default BookingsTab;