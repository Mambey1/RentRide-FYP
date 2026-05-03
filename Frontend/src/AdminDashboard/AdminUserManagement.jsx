import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUsers,
  FaShieldAlt,
  FaBan,
  FaCheckCircle,
  FaTrash,
  FaExclamationTriangle,
  FaEye,
  FaGavel,
  FaSpinner,
  FaTimes,
  FaUserCheck,
  FaUserSlash,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEnvelope,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningReason, setWarningReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchReports();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data.reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedUser(response.data);
      setShowUserModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details");
    }
  };

  const handleGiveWarning = async (userId) => {
    if (!warningReason.trim()) {
      toast.error("Please provide a reason for the warning");
      return;
    }

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/admin/users/${userId}/warning`,
        { reason: warningReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message);
      setShowWarningModal(false);
      setWarningReason("");
      fetchUsers();
      if (selectedUser) fetchUserDetails(userId);
      
      // Refresh reports if needed
      fetchReports();
    } catch (error) {
      console.error("Error giving warning:", error);
      toast.error(error.response?.data?.message || "Failed to give warning");
    }
  };

  const handleBlockUser = async (userId) => {
    const reason = prompt("Enter reason for blocking this user:");
    if (!reason) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/admin/users/${userId}/block`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message);
      fetchUsers();
      if (selectedUser) fetchUserDetails(userId);
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error(error.response?.data?.message || "Failed to block user");
    }
  };

  const handleUnblockUser = async (userId) => {
    const reason = prompt("Enter reason for unblocking this user:");
    if (!reason) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/admin/users/${userId}/unblock`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message);
      fetchUsers();
      if (selectedUser) fetchUserDetails(userId);
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error(error.response?.data?.message || "Failed to unblock user");
    }
  };

  const handleResetWarnings = async (userId) => {
    if (!window.confirm("Are you sure you want to reset warnings for this user?")) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/admin/users/${userId}/reset-warnings`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message);
      fetchUsers();
      if (selectedUser) fetchUserDetails(userId);
    } catch (error) {
      console.error("Error resetting warnings:", error);
      toast.error("Failed to reset warnings");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone!")) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(response.data.message);
      fetchUsers();
      if (selectedUser) setShowUserModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const getWarningColor = (count) => {
    if (count === 0) return "text-green-600 bg-green-100";
    if (count === 1) return "text-yellow-600 bg-yellow-100";
    if (count === 2) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getReportStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      reviewed: "bg-blue-100 text-blue-800",
      action_taken: "bg-green-100 text-green-800",
      dismissed: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.pending;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" ||
                         (filterStatus === "blocked" && user.isBlocked) ||
                         (filterStatus === "active" && !user.isBlocked) ||
                         (filterStatus === "warnings" && user.warningCount > 0);
    return matchesSearch && matchesFilter;
  });

  // Export users data to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Status", "Warning Count", "Joined Date", "Last Active"];
    const csvData = filteredUsers.map(user => [
      user.name,
      user.email,
      user.isBlocked ? "Blocked" : "Active",
      user.warningCount,
      new Date(user.createdAt).toLocaleDateString(),
      user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "N/A"
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Users data exported successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <FaSpinner className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-gray-500 mt-2">
              Manage users, issue warnings, handle blocks, and review reports
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaDownload className="text-white" />
              Export CSV
            </button>
            <button
              onClick={() => setShowReportsModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaShieldAlt className="text-white" />
              View Reports ({reports.filter(r => r.status === "pending").length})
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option value="all">All Users</option>
                <option value="active">Active Users</option>
                <option value="blocked">Blocked Users</option>
                <option value="warnings">Users with Warnings</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Total: {filteredUsers.length} users
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <FaUsers className="text-3xl opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Active Users</p>
              <p className="text-2xl font-bold">{users.filter(u => !u.isBlocked).length}</p>
            </div>
            <FaUserCheck className="text-3xl opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Blocked Users</p>
              <p className="text-2xl font-bold">{users.filter(u => u.isBlocked).length}</p>
            </div>
            <FaUserSlash className="text-3xl opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Users with Warnings</p>
              <p className="text-2xl font-bold">{users.filter(u => u.warningCount > 0).length}</p>
            </div>
            <FaExclamationTriangle className="text-3xl opacity-80" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Warnings
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">@{user.username || user.email.split('@')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-center">
                      {user.isBlocked ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <FaBan className="mr-1 text-xs" /> Blocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaCheckCircle className="mr-1 text-xs" /> Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {user.warningCount > 0 ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getWarningColor(user.warningCount)}`}>
                          <FaExclamationTriangle className="mr-1 text-xs" />
                          {user.warningCount}/3
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">No warnings</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => fetchUserDetails(user._id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowWarningModal(true);
                          }}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                          title="Give Warning"
                          disabled={user.isBlocked}
                        >
                          <FaGavel className={user.isBlocked ? "opacity-50" : ""} />
                        </button>
                        {user.isBlocked ? (
                          <button
                            onClick={() => handleUnblockUser(user._id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Unblock User"
                          >
                            <FaUserCheck />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBlockUser(user._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Block User"
                          >
                            <FaUserSlash />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <FaUsers className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">User Details</h2>
                  <p className="text-sm text-gray-500">{selectedUser.user.name}</p>
                </div>
              </div>
              <button onClick={() => setShowUserModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* User Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{selectedUser.user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedUser.user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">@{selectedUser.user.username || selectedUser.user.email.split('@')[0]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium capitalize">{selectedUser.user.role || "User"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-medium ${selectedUser.user.isBlocked ? 'text-red-600' : 'text-green-600'}`}>
                      {selectedUser.user.isBlocked ? 'Blocked' : 'Active'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Verified</p>
                    <p className={`font-medium ${selectedUser.user.isEmailVerified ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedUser.user.isEmailVerified ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Warning Count</p>
                    <p className={`font-medium ${selectedUser.user.warningCount >= 3 ? 'text-red-600' : 'text-yellow-600'}`}>
                      {selectedUser.user.warningCount}/3
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium">{new Date(selectedUser.user.createdAt).toLocaleString()}</p>
                  </div>
                  {selectedUser.user.blockedReason && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Block Reason</p>
                      <p className="font-medium text-red-600">{selectedUser.user.blockedReason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Warnings History */}
              {selectedUser.warnings && selectedUser.warnings.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Warning History</h3>
                  <div className="space-y-2">
                    {selectedUser.warnings.map((warning, idx) => (
                      <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-yellow-800">Reason: {warning.reason}</p>
                            <p className="text-sm text-yellow-600 mt-1">
                              Given by: {warning.givenBy?.name || 'Admin'} on {new Date(warning.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reports against user */}
              {selectedUser.reports && selectedUser.reports.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Reports Against User</h3>
                  <div className="space-y-2">
                    {selectedUser.reports.map((report, idx) => (
                      <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-red-800">Reason: {report.reason}</p>
                            <p className="text-sm text-red-600 mt-1">
                              Reported by: {report.reportedBy?.name || 'Anonymous'} on {new Date(report.createdAt).toLocaleString()}
                            </p>
                            {report.description && (
                              <p className="text-sm text-gray-700 mt-2">Description: {report.description}</p>
                            )}
                            {report.screenshotProof && (
                              <a 
                                href={`http://localhost:5000${report.screenshotProof}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                              >
                                View Screenshot
                              </a>
                            )}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReportStatusBadge(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {!selectedUser.user.isBlocked && (
                  <>
                    <button
                      onClick={() => {
                        setShowWarningModal(true);
                        setShowUserModal(false);
                      }}
                      className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
                    >
                      <FaGavel className="inline mr-2" /> Give Warning
                    </button>
                    <button
                      onClick={() => handleBlockUser(selectedUser.user._id)}
                      className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                    >
                      <FaBan className="inline mr-2" /> Block User
                    </button>
                  </>
                )}
                {selectedUser.user.isBlocked && (
                  <button
                    onClick={() => handleUnblockUser(selectedUser.user._id)}
                    className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
                  >
                    <FaUserCheck className="inline mr-2" /> Unblock User
                  </button>
                )}
                {selectedUser.user.warningCount > 0 && (
                  <button
                    onClick={() => handleResetWarnings(selectedUser.user._id)}
                    className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
                  >
                    Reset Warnings
                  </button>
                )}
                <button
                  onClick={() => handleDeleteUser(selectedUser.user._id)}
                  className="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition"
                >
                  <FaTrash className="inline mr-2" /> Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warning Modal */}
      {showWarningModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Issue Warning</h2>
              <button onClick={() => setShowWarningModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FaTimes className="text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4 p-3 bg-yellow-50 rounded-lg">
                <FaExclamationTriangle className="text-yellow-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-600">
                    Giving a warning to <strong className="text-gray-900">{selectedUser.name}</strong>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Current warnings: {selectedUser.warningCount || 0}/3
                  </p>
                </div>
              </div>
              <textarea
                value={warningReason}
                onChange={(e) => setWarningReason(e.target.value)}
                placeholder="Enter detailed reason for this warning..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
              />
              <div className={`mt-3 p-3 rounded-lg ${selectedUser.warningCount + 1 >= 3 ? 'bg-red-50 border border-red-200' : 'bg-blue-50'}`}>
                <p className="text-sm">
                  {selectedUser.warningCount + 1 >= 3 ? (
                    <span className="text-red-700 font-medium">
                      ⚠️ Warning count will reach 3/3. This user will be automatically BLOCKED after this warning!
                    </span>
                  ) : (
                    <span className="text-blue-700">
                      ℹ️ After this warning, user will have {selectedUser.warningCount + 1}/3 warnings.
                      {3 - (selectedUser.warningCount + 1)} more warning(s) until automatic block.
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowWarningModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleGiveWarning(selectedUser._id)}
                className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
              >
                Issue Warning
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reports Modal */}
      {showReportsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">User Reports</h2>
                  <p className="text-sm text-gray-500">Review and manage user reports</p>
                </div>
              </div>
              <button onClick={() => setShowReportsModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 max-h-[calc(85vh-80px)]">
              {reports.length === 0 ? (
                <div className="text-center py-12">
                  <FaShieldAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No reports found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Report against: {report.reportedUser?.name || 'Unknown User'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Reported by: {report.reportedBy?.name || 'Anonymous'} • {new Date(report.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getReportStatusBadge(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700">Reason: {report.reason}</p>
                        {report.description && (
                          <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                        )}
                      </div>
                      {report.screenshotProof && (
                        <div className="mb-3">
                          <a 
                            href={`http://localhost:5000${report.screenshotProof}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline inline-flex items-center gap-1"
                          >
                            📷 View Screenshot Evidence
                          </a>
                        </div>
                      )}
                      {report.adminNote && (
                        <div className="bg-gray-50 p-2 rounded text-sm text-gray-600 mt-2">
                          <span className="font-medium">Admin Note:</span> {report.adminNote}
                        </div>
                      )}
                      <div className="flex gap-2 mt-3">
                        {report.status === "pending" && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedUser(report.reportedUser);
                                setShowReportsModal(false);
                                setShowWarningModal(true);
                              }}
                              className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg transition"
                            >
                              Issue Warning
                            </button>
                            <button
                              onClick={() => handleBlockUser(report.reportedUser._id)}
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition"
                            >
                              Block User
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => {
                            // Here you can add update status functionality
                            toast.info("Status update feature coming soon");
                          }}
                          className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition"
                        >
                          Mark as Reviewed
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;