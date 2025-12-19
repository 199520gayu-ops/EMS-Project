import React, { useState, useEffect } from "react";
import {
  Calendar,
  ClipboardList,
  FileText,
  Activity,
  Clock,
  Bell,
  Settings,
  Command,
  TrendingUp,
  BarChart3,
  Target,
  PieChart,
  ArrowUpRight
} from "lucide-react";

export default function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("loggedUser")) || { name: "Employee", role: "Product Designer" };

  // ===== Attendance State =====
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [inTime, setInTime] = useState("--:--");
  const [outTime, setOutTime] = useState("--:--");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const attendance = JSON.parse(localStorage.getItem("attendanceStatus"));
    if (attendance) {
      setCheckedIn(attendance.checkedIn);
      setCheckedOut(attendance.checkedOut);
      setInTime(attendance.inTime || "--:--");
      setOutTime(attendance.outTime || "--:--");
    }
  }, []);

  const saveStatus = (inStatus, outStatus, timeIn, timeOut) => {
    localStorage.setItem(
      "attendanceStatus",
      JSON.stringify({
        checkedIn: inStatus,
        checkedOut: outStatus,
        inTime: timeIn,
        outTime: timeOut,
      })
    );
  };

  const handleCheckIn = () => {
    if (checkedIn) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCheckedIn(true);
    setInTime(now);
    saveStatus(true, false, now, "--:--");
    alert("✅ Checked In Successfully at " + now);
  };

  const handleCheckOut = () => {
    if (!checkedIn || checkedOut) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCheckedOut(true);
    setOutTime(now);
    saveStatus(true, true, inTime, now);
    alert("👋 Checked Out Successfully at " + now);
  };

  return (
    <div className="min-h-screen bg-[#010d31] text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* --- HEADER (Removed blur and shadow) --- */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-[#000b2c]">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Command size={22} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black tracking-tighter text-slate-100 uppercase">Employee<span className="text-blue-500">Portal</span></h1>
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none mt-1">Personnel Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col items-end border-r border-slate-800/50 pr-8">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">System Time</span>
              <span className="text-sm font-mono font-bold text-blue-500/80">{currentTime}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-900 rounded-lg text-slate-500 transition-colors"><Bell size={20}/></button>
              <button className="p-2 hover:bg-slate-900 rounded-lg text-slate-500 transition-colors"><Settings size={20}/></button>
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-bold text-xs border border-slate-800">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 lg:p-10">
        
        {/* TOP NAVIGATION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <NavCard 
              icon={<Calendar className="text-blue-500/70" size={28} />} 
              title="Schedules" 
              desc="View assigned shifts and upcoming events" 
          />
          <NavCard 
              icon={<ClipboardList className="text-emerald-500/70" size={28} />} 
              title="Leave Ledger" 
              desc="Apply for time off and check balances" 
          />
          <NavCard 
              icon={<FileText className="text-amber-500/70" size={28} />} 
              title="Documents" 
              desc="Access payslips, tax forms and contracts" 
          />
        </div>

        {/* --- REPORT CHARTS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          <div className="lg:col-span-2 bg-slate-950/40 border border-slate-800/50 p-8 rounded-[2rem]">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-2">
                  <BarChart3 size={16} className="text-blue-600" /> Weekly Productivity
                </h3>
                <span className="text-[10px] font-bold text-emerald-500/80 flex items-center gap-1">
                  <TrendingUp size={12} /> +15% Performance
                </span>
              </div>
              
              <div className="flex items-end justify-between gap-2 h-48 px-4">
                {[
                  { day: 'Mon', hrs: 8.5 }, { day: 'Tue', hrs: 9.0 }, 
                  { day: 'Wed', hrs: 7.5 }, { day: 'Thu', hrs: 8.2 }, 
                  { day: 'Fri', hrs: 8.8 }, { day: 'Sat', hrs: 0 }, 
                  { day: 'Sun', hrs: 0 }
                ].map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 w-full group">
                    <div className="relative w-full flex flex-col justify-end items-center h-full">
                      <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-all text-[10px] font-bold text-blue-500/70">{d.hrs}h</div>
                      <div 
                        style={{ height: `${(d.hrs / 10) * 100}%` }} 
                        className="w-full max-w-[40px] rounded-t-lg bg-slate-800 group-hover:bg-blue-600 transition-all duration-300"
                      ></div>
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-600">{d.day}</span>
                  </div>
                ))}
              </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-800/50 p-8 rounded-[2rem]">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-600 mb-8 flex items-center gap-2">
              <PieChart size={16} className="text-emerald-600" /> Task Distribution
            </h3>
            <div className="space-y-6">
              <TaskRow label="Core Development" percent={65} color="bg-blue-600" />
              <TaskRow label="Team Meetings" percent={20} color="bg-emerald-600" />
              <TaskRow label="Documentation" percent={15} color="bg-slate-700" />
              
              <div className="mt-8 pt-6 border-t border-slate-800/50">
                <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                   <Target className="text-blue-600" size={20} />
                   <div>
                      <p className="text-[10px] font-black uppercase text-slate-600">Monthly Goal</p>
                      <p className="text-sm font-bold text-slate-200">88% Progress</p>
                   </div>
                   <ArrowUpRight className="ml-auto text-slate-700" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOWER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-slate-950/40 p-8 rounded-[2rem] border border-slate-800/50 relative overflow-hidden">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-100">
              <Activity className="text-blue-600" size={20} /> Work Summary
            </h3>

            <div className="space-y-4">
              <SummaryItem label="Total Working Days" value="22" color="text-slate-400" />
              <SummaryItem label="Present" value="20" color="text-emerald-500/80" />
              <SummaryItem label="Absent" value="2" color="text-red-500/80" />
              <SummaryItem label="Late Marks" value="1" color="text-amber-500/80" />
            </div>
          </div>

          <div className="bg-slate-950/40 p-8 rounded-[2rem] border border-slate-800/50">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-100">
              <Clock className="text-amber-600" size={20} /> Attendance Control
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/40 p-4 rounded-xl border border-slate-800/50">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Shift Start</p>
                  <p className={`text-xl font-mono font-bold ${checkedIn ? 'text-blue-500' : 'text-slate-800'}`}>{inTime}</p>
              </div>
              <div className="bg-black/40 p-4 rounded-xl border border-slate-800/50">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Shift End</p>
                  <p className={`text-xl font-mono font-bold ${checkedOut ? 'text-red-500/80' : 'text-slate-800'}`}>{outTime}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ActionButton 
                  onClick={handleCheckIn} 
                  disabled={checkedIn} 
                  label={checkedIn ? "Active" : "Check-In"} 
                  color={checkedIn ? "bg-slate-900 text-slate-600 border-slate-800" : "bg-blue-700 hover:bg-blue-600 text-white border-transparent"} 
              />
              <ActionButton 
                  onClick={handleCheckOut} 
                  disabled={!checkedIn || checkedOut} 
                  label={checkedOut ? "Closed" : "Check-Out"} 
                  color={!checkedIn || checkedOut ? "bg-slate-900 text-slate-600 border-slate-800" : "bg-red-700/50 hover:bg-red-600 text-red-100 border-transparent"} 
              />
              <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800/50 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Apply Leave
              </button>
              <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800/50 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                View Payroll
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ------------------ REUSABLE SUB-COMPONENTS ------------------ */

function NavCard({ icon, title, desc }) {
  return (
    <div className="bg-slate-950/40 p-7 rounded-[2rem] border border-slate-800/50 hover:border-slate-700 transition-all duration-300 group cursor-pointer">
      <div className="mb-4 p-3 bg-slate-900 w-fit rounded-xl group-hover:bg-blue-600/10 transition-colors border border-slate-800/50">{icon}</div>
      <h3 className="text-xl font-bold text-slate-100 mb-1 tracking-tight">{title}</h3>
      <p className="text-slate-600 text-xs font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function TaskRow({ label, percent, color }) {
  return (
    <div>
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-400">{percent}%</span>
      </div>
      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
        <div className={`${color} h-full transition-all duration-1000 opacity-80`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, color }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-slate-900">
      <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{label}</span>
      <span className={`text-lg font-bold font-mono ${color}`}>{value}</span>
    </div>
  );
}

function ActionButton({ onClick, disabled, label, color }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${color}`}
    >
      {label}
    </button>
  );
}