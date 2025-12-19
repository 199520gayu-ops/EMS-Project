import React from 'react';
import { Calendar, CheckCircle, Clock, PlusCircle } from 'lucide-react';

// --- Mock Data ---
const leaveData = {
  totalAllowed: 20,
  used: 5,
  remaining: 15,
  typeBalances: [
    { type: 'Annual Leave', total: 15, used: 3, remaining: 12 },
    { type: 'Sick Leave', total: 5, used: 2, remaining: 3 },
  ],
};

const recentRequests = [
  { id: 1, type: 'Annual Leave', startDate: '2025-01-15', endDate: '2025-01-17', status: 'Approved', days: 3 },
  { id: 2, type: 'Sick Leave', startDate: '2025-02-01', endDate: '2025-02-01', status: 'Pending', days: 1 },
  { id: 3, type: 'Annual Leave', startDate: '2025-03-10', endDate: '2025-03-14', status: 'Rejected', days: 5 },
];

const LeaveDetails = () => {
  // Color classes for status and accent
  const cardBg = "bg-[#1E1E1E]"; // Secondary Dark Background
  const accentColor = "bg-blue-600 hover:bg-blue-500";
  
  // Dynamic status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#03DAC6]/20 text-[#03DAC6] flex items-center"><CheckCircle size={14} className="mr-1" /> Approved</span>;
      case 'Pending':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-600/20 text-yellow-400 flex items-center"><Clock size={14} className="mr-1" /> Pending</span>;
      case 'Rejected':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-600/20 text-red-500 flex items-center">Rejected</span>;
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8 p-4">
      
      <div className="flex justify-between items-center border-b border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-white">Leave Management</h2>
        <button
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${accentColor} text-white shadow-md`}
        >
          <PlusCircle size={20} className="mr-2" />
          Request New Leave
        </button>
      </div>

      {/* --- 1. Leave Balance Summary Cards --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Allowed */}
        <div className={`${cardBg} p-6 rounded-xl shadow-lg border-l-4 border-gray-500`}>
          <p className="text-sm text-gray-400">Total Annual Entitlement</p>
          <p className="text-4xl font-extrabold text-white mt-1">{leaveData.totalAllowed}</p>
          <p className="text-xs text-gray-500">Days per Year</p>
        </div>
        
        {/* Used Days (Alert Color) */}
        <div className={`${cardBg} p-6 rounded-xl shadow-lg border-l-4 border-red-500`}>
          <p className="text-sm text-gray-400">Days Used (YTD)</p>
          <p className="text-4xl font-extrabold text-red-400 mt-1">{leaveData.used}</p>
          <p className="text-xs text-gray-500">Check recent requests below</p>
        </div>
        
        {/* Remaining Days (Success Color) */}
        <div className={`${cardBg} p-6 rounded-xl shadow-lg border-l-4 border-[#03DAC6]`}>
          <p className="text-sm text-gray-400">Days Remaining</p>
          <p className="text-4xl font-extrabold text-[#03DAC6] mt-1">{leaveData.remaining}</p>
          <p className="text-xs text-gray-500">Available for use</p>
        </div>
      </section>

      {/* --- 2. Balance by Type --- */}
      <section className={`${cardBg} p-6 rounded-xl shadow-lg`}>
        <h3 className="text-xl font-semibold mb-4 text-white">Balance by Leave Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {leaveData.typeBalances.map((balance, index) => (
            <div key={index} className="flex justify-between items-center p-3 border border-gray-700 rounded-lg">
              <span className="font-medium text-gray-300">{balance.type}</span>
              <div className="text-right">
                <span className="text-lg font-bold text-[#03DAC6]">{balance.remaining}</span>
                <span className="text-sm text-gray-500 ml-1">of {balance.total} days</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* --- 3. Recent Requests Table --- */}
      <section className={`${cardBg} p-6 rounded-xl shadow-lg`}>
        <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-3">Recent Leave Requests</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#121212]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {recentRequests.map((request) => (
                <tr key={request.id} className="hover:bg-[#2A2A2A] transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{request.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{request.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{request.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">{request.days}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(request.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default LeaveDetails;