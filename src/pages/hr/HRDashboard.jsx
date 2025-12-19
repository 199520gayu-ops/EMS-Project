import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext"; // Ensure this path matches your file structure

export default function HRDashboard() {
  const { isDark } = useTheme(); // Consume the theme state
  
  // --- New Time Logic ---
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const stats = [
    { title: "Total Employees", value: 128, color: isDark ? "text-indigo-400" : "text-indigo-600" },
    { title: "Present Today", value: 112, color: isDark ? "text-emerald-400" : "text-emerald-600" },
    { title: "Pending Leaves", value: 6, color: isDark ? "text-amber-400" : "text-amber-600" },
    { title: "Payroll Pending", value: 4, color: isDark ? "text-rose-400" : "text-rose-600" },
  ];

  const attendanceReport = [
    { label: "Present", value: 88, color: "bg-emerald-500" },
    { label: "Absent", value: 7, color: "bg-rose-500" },
    { label: "Leave", value: 5, color: "bg-cyan-500" },
  ];

  const onboardingSteps = [
    { step: "Documents Submitted", percent: 100 },
    { step: "Verification", percent: 70 },
    { step: "Account Creation", percent: 40 },
    { step: "Completed", percent: 20 },
  ];

  return (
    <div className={`min-h-screen p-6 lg:p-10 space-y-8 transition-colors duration-500 font-sans ${
      isDark ? "bg-[#020617] text-slate-200" : "bg-slate-50 text-slate-800"
    }`}>
      
      {/* Header */}
      <div className={`border-b pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 ${
        isDark ? "border-slate-800" : "border-slate-200"
      }`}>
        <div>
          <h2 className={`text-4xl font-black tracking-tight uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
            HR <span className="text-cyan-500">Dashboard</span>
          </h2>
          <p className="text-slate-500 mt-1 uppercase text-xs tracking-[0.2em] font-bold">
            Workforce & Onboarding Intelligence
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-cyan-600 font-mono text-xl font-bold tracking-wider">
            {formatTime(currentTime)}
          </p>
          <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest mt-1">
            {formatDate(currentTime)}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`backdrop-blur-md p-6 rounded-[2rem] border transition-all ${
              isDark 
                ? "bg-slate-900/40 border-slate-800 hover:border-slate-700" 
                : "bg-white border-slate-200 shadow-sm hover:shadow-md"
            }`}
          >
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">{item.title}</p>
            <p className={`text-4xl font-black ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Reports Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Attendance Chart */}
        <div className={`backdrop-blur-md p-8 rounded-[2.5rem] border ${
          isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
        }`}>
          <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Today's Attendance
          </h3>

          <div className="space-y-6">
            {attendanceReport.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="text-slate-500">{item.label}</span>
                  <span className={isDark ? "text-white" : "text-slate-900"}>{item.value}%</span>
                </div>
                <div className={`w-full rounded-full h-2.5 p-0.5 border ${
                  isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
                }`}>
                  <div
                    className={`${item.color} h-1.5 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Onboarding Progress */}
        <div className={`backdrop-blur-md p-8 rounded-[2.5rem] border ${
          isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
        }`}>
          <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
            Onboarding Pipeline
          </h3>

          <div className="space-y-6">
            {onboardingSteps.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="text-slate-500">{item.step}</span>
                  <span className="text-cyan-600">{item.percent}%</span>
                </div>
                <div className={`w-full rounded-full h-2.5 p-0.5 border ${
                  isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
                }`}>
                  <div
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 h-1.5 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Leave Requests */}
        <div className={`p-8 rounded-[2.5rem] border ${
          isDark ? "bg-slate-900/20 border-slate-800/50" : "bg-slate-100 border-slate-200"
        }`}>
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Pending Requests</h3>
          <ul className="space-y-4">
            {["Gayathri — Sick Leave", "Rohit — Casual Leave", "Anjali — WFH"].map((text, i) => (
                <li key={i} className={`flex justify-between items-center p-4 rounded-2xl border transition-colors group ${
                  isDark ? "bg-slate-950/50 border-slate-800 hover:border-amber-500/30" : "bg-white border-slate-200 hover:border-amber-400"
                }`}>
                   <span className={`text-sm font-semibold transition-colors ${
                     isDark ? "text-slate-300 group-hover:text-white" : "text-slate-600 group-hover:text-slate-900"
                   }`}>{text}</span>
                   <span className="text-[10px] font-black uppercase px-3 py-1 bg-amber-500/10 text-amber-600 rounded-lg border border-amber-500/20">Pending</span>
                </li>
            ))}
          </ul>
        </div>

        {/* Recent Onboarding */}
        <div className={`p-8 rounded-[2.5rem] border ${
          isDark ? "bg-slate-900/20 border-slate-800/50" : "bg-slate-100 border-slate-200"
        }`}>
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Recent Hires</h3>
          <ul className="space-y-4">
            <li className={`flex justify-between items-center p-4 rounded-2xl border group ${
              isDark ? "bg-slate-950/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <span className={`text-sm font-semibold ${isDark ? "text-slate-300 group-hover:text-white" : "text-slate-600"}`}>Arun — Document Verification</span>
              <span className="text-[10px] font-black uppercase px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg border border-blue-500/20">In Progress</span>
            </li>
            <li className={`flex justify-between items-center p-4 rounded-2xl border group ${
              isDark ? "bg-slate-950/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <span className={`text-sm font-semibold ${isDark ? "text-slate-300 group-hover:text-white" : "text-slate-600"}`}>Priya — Account Creation</span>
              <span className="text-[10px] font-black uppercase px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg border border-emerald-500/20">Completed</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

