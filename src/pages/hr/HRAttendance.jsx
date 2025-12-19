import { useState } from "react";
import { useTheme } from "./ThemeContext"; // Ensure correct path

const attendanceData = [
  { id: 1, name: "Arun Kumar", empId: "EMP001", department: "Engineering", date: "2025-01-13", checkIn: "09:10 AM", checkOut: "06:15 PM", status: "Present" },
  { id: 2, name: "Priya Sharma", empId: "EMP002", department: "HR", date: "2025-01-13", checkIn: "-", checkOut: "-", status: "Leave" },
  { id: 3, name: "Rohit Verma", empId: "EMP003", department: "Finance", date: "2025-01-13", checkIn: "09:45 AM", checkOut: "06:05 PM", status: "Late" },
  { id: 4, name: "Sneha Patel", empId: "EMP004", department: "Marketing", date: "2025-01-13", checkIn: "-", checkOut: "-", status: "WFH" },
];

const statusColors = {
  Present: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  Absent: "bg-rose-500/10 text-rose-600 border border-rose-500/20",
  Late: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  Leave: "bg-cyan-500/10 text-cyan-600 border border-cyan-500/20",
  WFH: "bg-purple-500/10 text-purple-600 border border-purple-500/20",
};

export default function HRAttendance() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");

  const filteredData = attendanceData.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.empId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`p-6 lg:p-10 space-y-8 min-h-screen transition-colors duration-500 font-sans ${
      isDark ? "bg-[#020617] text-slate-200" : "bg-slate-50 text-slate-800"
    }`}>
      
      {/* Header */}
      <div className={`border-b pb-6 transition-colors duration-500 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
        <h2 className={`text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
          Employee <span className="text-cyan-500">Attendance</span>
        </h2>
        <p className="text-slate-500 mt-1 uppercase text-xs tracking-[0.2em] font-bold">
          Daily attendance tracking & monitoring
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <SummaryCard title="Total Employees" value="24" color={isDark ? "text-white" : "text-slate-900"} isDark={isDark} />
        <SummaryCard title="Present Today" value="18" color="text-emerald-500" isDark={isDark} />
        <SummaryCard title="On Leave" value="3" color="text-cyan-500" isDark={isDark} />
        <SummaryCard title="Late" value="2" color="text-amber-500" isDark={isDark} />
        <SummaryCard title="WFH" value="1" color="text-purple-500" isDark={isDark} />
      </div>

      {/* Filters */}
      <div className={`flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between p-4 rounded-2xl border transition-all duration-500 ${
        isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
      }`}>
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by name or employee ID..."
            className={`rounded-xl px-4 py-2.5 w-full transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border ${
              isDark 
                ? "bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-600" 
                : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400"
            }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <input
          type="date"
          className={`rounded-xl px-4 py-2.5 outline-none cursor-pointer border transition-all ${
            isDark 
              ? "bg-slate-950 border-slate-800 text-slate-200 focus:ring-cyan-500/50" 
              : "bg-slate-100 border-slate-200 text-slate-900 focus:ring-cyan-600"
          }`}
        />
      </div>

      {/* Attendance Table */}
      <div className={`overflow-x-auto rounded-[2rem] border shadow-2xl overflow-hidden transition-all duration-500 ${
        isDark ? "bg-slate-900/20 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <table className="min-w-full text-sm">
          <thead className={`uppercase text-[10px] font-black tracking-widest border-b transition-colors ${
            isDark ? "bg-slate-950/50 text-slate-500 border-slate-800" : "bg-slate-50 text-slate-400 border-slate-200"
          }`}>
            <tr>
              <th className="px-6 py-5 text-left">Employee</th>
              <th className="px-6 py-5 text-left">Emp ID</th>
              <th className="px-6 py-5 text-left">Department</th>
              <th className="px-6 py-5 text-center">Date</th>
              <th className="px-6 py-5 text-left">Check In</th>
              <th className="px-6 py-5 text-left">Check Out</th>
              <th className="px-6 py-5 text-left">Status</th>
            </tr>
          </thead>

          <tbody className={`divide-y transition-colors ${isDark ? "divide-slate-800/50" : "divide-slate-100"}`}>
            {filteredData.map((emp) => (
              <tr
                key={emp.id}
                className={`transition-colors group ${isDark ? "hover:bg-cyan-500/5" : "hover:bg-cyan-50"}`}
              >
                <td className={`px-6 py-4 font-bold transition-colors ${isDark ? "text-white group-hover:text-cyan-400" : "text-slate-900 group-hover:text-cyan-600"}`}>
                  {emp.name}
                </td>
                <td className={`px-6 py-4 font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>{emp.empId}</td>
                <td className={`px-6 py-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{emp.department}</td>
                <td className={`px-6 py-4 font-mono text-center text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>{emp.date}</td>
                <td className={`px-6 py-4 font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>{emp.checkIn}</td>
                <td className={`px-6 py-4 font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>{emp.checkOut}</td>
                <td className="px-6 py-4">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${statusColors[emp.status]}`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-20 text-slate-500 italic tracking-wide">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* Summary Card */
function SummaryCard({ title, value, color, isDark }) {
  return (
    <div className={`backdrop-blur-md border rounded-[2rem] p-6 shadow-xl transition-all ${
      isDark 
        ? "bg-slate-900/40 border-slate-800 hover:border-slate-700" 
        : "bg-white border-slate-200 hover:border-slate-300"
    }`}>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{title}</p>
      <h3 className={`text-3xl font-black ${color}`}>{value}</h3>
    </div>
  );
}
