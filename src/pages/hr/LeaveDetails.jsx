import { useState } from "react";
import { useTheme } from "./ThemeContext"; // Ensure path is correct

const initialLeaveRequests = [
  { id: 1, name: "Arun Kumar", empId: "EMP001", department: "Engineering", leaveType: "Casual Leave", from: "2025-01-15", to: "2025-01-16", days: 2, reason: "Personal work", status: "Pending" },
  { id: 2, name: "Priya Sharma", empId: "EMP002", department: "HR", leaveType: "Sick Leave", from: "2025-01-13", to: "2025-01-13", days: 1, reason: "Fever", status: "Approved" },
  { id: 3, name: "Rohit Verma", empId: "EMP003", department: "Finance", leaveType: "WFH", from: "2025-01-14", to: "2025-01-14", days: 1, reason: "Remote work", status: "Rejected" },
];

const statusStyle = {
  Pending: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  Approved: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  Rejected: "bg-rose-500/10 text-rose-600 border border-rose-500/20",
};

export default function LeaveDetails() {
  const { isDark } = useTheme();
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const updateStatus = (newStatus) => {
    setLeaveRequests((prev) =>
      prev.map((leave) =>
        selected.includes(leave.id) ? { ...leave, status: newStatus } : leave
      )
    );
    setSelected([]);
  };

  return (
    <div className={`p-6 lg:p-10 space-y-8 min-h-screen transition-colors duration-500 font-sans ${
      isDark ? "bg-[#020617] text-slate-200" : "bg-slate-50 text-slate-800"
    }`}>

      {/* Header */}
      <div className={`border-b pb-6 transition-colors duration-500 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
        <h2 className={`text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
          Leave <span className="text-cyan-500">Management</span>
        </h2>
        <p className="text-slate-500 mt-1 uppercase text-xs tracking-[0.2em] font-bold">
          Approve, reject or monitor workforce absence
        </p>
      </div>

      {/* Action Bar */}
      <div className={`flex flex-wrap gap-4 items-center justify-between p-4 rounded-2xl border backdrop-blur-md transition-all duration-500 ${
        isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
      }`}>
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Selected Records:
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              isDark ? "bg-cyan-500/20 text-cyan-400" : "bg-cyan-100 text-cyan-700"
            }`}>
                {selected.length}
            </span>
        </div>

        <div className="flex gap-3">
          <button
            disabled={selected.length === 0}
            onClick={() => updateStatus("Approved")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all
              ${selected.length === 0
                ? (isDark ? "bg-slate-800 text-slate-600" : "bg-slate-100 text-slate-400") + " cursor-not-allowed opacity-50"
                : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20"
              }`}
          >
            Approve
          </button>

          <button
            disabled={selected.length === 0}
            onClick={() => updateStatus("Rejected")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all
              ${selected.length === 0
                ? (isDark ? "bg-slate-800 text-slate-600" : "bg-slate-100 text-slate-400") + " cursor-not-allowed opacity-50"
                : "bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-900/20"
              }`}
          >
            Reject
          </button>

          <button
            disabled={selected.length === 0}
            onClick={() => updateStatus("Pending")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all
              ${selected.length === 0
                ? (isDark ? "bg-slate-800 text-slate-600" : "bg-slate-100 text-slate-400") + " cursor-not-allowed opacity-50"
                : "bg-amber-600 text-white hover:bg-amber-500 shadow-lg shadow-amber-900/20"
              }`}
          >
            Pending
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={`overflow-x-auto rounded-[2rem] border shadow-2xl overflow-hidden transition-all duration-500 ${
        isDark ? "bg-slate-900/20 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <table className="min-w-full text-sm">
          <thead className={`uppercase text-[10px] font-black tracking-widest border-b transition-colors ${
            isDark ? "bg-slate-950/50 text-slate-500 border-slate-800" : "bg-slate-50 text-slate-400 border-slate-200"
          }`}>
            <tr>
              <th className="px-6 py-5 w-10"></th>
              <th className="px-6 py-5 text-left">Employee</th>
              <th className="px-6 py-5 text-left">Emp ID</th>
              <th className="px-6 py-5 text-left">Department</th>
              <th className="px-6 py-5 text-left">Leave Type</th>
              <th className="px-6 py-5 text-left">Schedule</th>
              <th className="px-6 py-5 text-center">Days</th>
              <th className="px-6 py-5 text-left">Reason</th>
              <th className="px-6 py-5 text-center">Status</th>
            </tr>
          </thead>

          <tbody className={`divide-y transition-colors ${isDark ? "divide-slate-800/50" : "divide-slate-100"}`}>
            {leaveRequests.map((leave) => (
              <tr
                key={leave.id}
                className={`transition-colors group ${isDark ? "hover:bg-cyan-500/5" : "hover:bg-cyan-50"}`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className={`w-4 h-4 rounded transition-colors focus:ring-cyan-500 ${
                      isDark 
                        ? "border-slate-700 bg-slate-950 text-cyan-500 ring-offset-slate-900" 
                        : "border-slate-300 bg-white text-cyan-600 ring-offset-white"
                    }`}
                    checked={selected.includes(leave.id)}
                    onChange={() => toggleSelect(leave.id)}
                  />
                </td>

                <td className={`px-6 py-4 font-bold transition-colors ${
                  isDark ? "text-white group-hover:text-cyan-400" : "text-slate-900 group-hover:text-cyan-600"
                }`}>
                  {leave.name}
                </td>
                <td className={`px-6 py-4 font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>{leave.empId}</td>
                <td className={`px-6 py-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{leave.department}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[11px] transition-colors ${
                      isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
                    }`}>
                        {leave.leaveType}
                    </span>
                </td>
                <td className={`px-6 py-4 text-xs font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {leave.from} <span className={isDark ? "text-slate-700" : "text-slate-300"}>→</span> {leave.to}
                </td>
                <td className={`px-6 py-4 text-center font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}>{leave.days}</td>
                <td className={`px-6 py-4 max-w-xs truncate italic ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  {leave.reason}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${statusStyle[leave.status]}`}>
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


