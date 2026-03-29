import React from "react";
import { FaChartLine, FaFileAlt, FaDownload } from "react-icons/fa";

const AdminReports = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Reports & Analytics
        </h1>
        <p className="text-gray-500 mt-2">View detailed reports and analytics about your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <FaChartLine className="text-4xl text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenue Report</h3>
          <p className="text-gray-500 text-sm mb-4">View monthly and yearly revenue statistics</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
            <FaDownload /> Generate Report
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <FaFileAlt className="text-4xl text-green-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Booking Summary</h3>
          <p className="text-gray-500 text-sm mb-4">Analyze booking patterns and trends</p>
          <button className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2">
            <FaDownload /> Generate Report
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <FaChartLine className="text-4xl text-purple-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Vehicle Utilization</h3>
          <p className="text-gray-500 text-sm mb-4">Track vehicle usage and availability</p>
          <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2">
            <FaDownload /> Generate Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <FaChartLine className="text-6xl text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Detailed Analytics Coming Soon</h3>
        <p className="text-gray-500">Advanced reporting features are currently under development.</p>
      </div>
    </div>
  );
};

export default AdminReports;