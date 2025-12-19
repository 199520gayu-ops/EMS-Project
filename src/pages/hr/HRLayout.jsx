import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Wallet,
  UserPlus,
  LogOut,
  Bell,
  ChevronRight,
  Sun, // Added
  Moon // Added
} from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function HRLayout() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/hr/dashboard" },
    { name: "Employees", icon: Users, path: "/hr/employeeslist" },
    { name: "Attendance", icon: Calendar, path: "/hr/hrattendance" },
    { name: "Leave Requests", icon: FileText, path: "/hr/LeaveDetails" },
    { name: "Payroll", icon: Wallet, path: "/hr/payroll" },
    { name: "Onboarding", icon: UserPlus, path: "/hr/onboarding" },
    { name: "Onboarding Email", icon: UserPlus, path: "/hr/onboardingemail" },
    { name: "Profile", icon: Users, path: "/hr/profile" },
    
  ];

  return (
    <div className={`flex min-h-screen transition-colors duration-500 font-sans selection:bg-cyan-500/30 ${
      isDark ? "bg-[#020617] text-slate-300" : "bg-slate-50 text-slate-900"
    }`}>

      {/* SIDEBAR */}
      <aside className={`w-72 border-r transition-all duration-500 flex flex-col relative z-20 ${
        isDark ? "bg-[#050a18] border-slate-800/50" : "bg-white border-slate-200"
      }`}>
        <div className={`px-8 py-10 text-2xl font-black tracking-tighter italic ${
          isDark ? "text-white" : "text-slate-900"
        }`}>
          EMS<span className="text-cyan-500">.</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menu.map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group
                  ${isActive
                      ? "bg-gradient-to-r from-cyan-600/20 to-transparent text-cyan-400 border-l-2 border-cyan-500"
                      : isDark 
                        ? "text-slate-500 hover:bg-slate-900/50 hover:text-slate-200" 
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={19} className="transition-transform duration-500 group-hover:rotate-[10deg]" />
                  <span className="text-sm font-bold tracking-tight">{item.name}</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-300" />
              </NavLink>
            );
          })}

          {/* THEME TOGGLE BUTTON */}
          <button 
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 mt-4 border ${
              isDark 
                ? "bg-slate-900/40 border-slate-800/50 text-slate-400 hover:text-white" 
                : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {isDark ? <Sun size={19} className="text-yellow-500" /> : <Moon size={19} className="text-indigo-600" />}
            <span className="text-sm font-bold tracking-tight">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </nav>

        {/* LOGOUT */}
        <div className="p-6">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 border border-rose-500/10"
          >
            <LogOut size={18} />
            <span className="text-xs font-black uppercase tracking-[0.15em]">Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Glows - Only visible in dark mode for better aesthetics */}
        {isDark && (
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-900/5 blur-[150px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-900/5 blur-[120px] rounded-full -z-10" />
          </>
        )}

        {/* TOP BAR */}
        <header className={`h-20 backdrop-blur-xl border-b transition-all duration-500 flex justify-between items-center px-10 sticky top-0 z-30 ${
          isDark ? "bg-[#020617]/80 border-slate-800/40" : "bg-white/80 border-slate-200"
        }`}>
          <div className="flex flex-col">
            <h1 className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-500">
              System Console
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Node: Active</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className={`p-2.5 rounded-full border transition-colors relative group ${
              isDark ? "bg-slate-900/50 border-slate-800 hover:border-slate-600" : "bg-slate-100 border-slate-200"
            }`}>
                <Bell size={18} className="text-slate-400 group-hover:text-cyan-500" />
            </button>
            
            <div className={`flex items-center gap-4 pl-6 border-l ${isDark ? "border-slate-800" : "border-slate-200"}`}>
              <div className="text-right hidden sm:block">
                <p className={`text-xs font-black leading-none ${isDark ? "text-white" : "text-slate-900"}`}>ADMIN_USER</p>
                <p className="text-[9px] text-cyan-600 font-bold uppercase tracking-[0.2em] mt-1">Primary Root</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center text-xs font-black text-cyan-500">
                HR
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto relative">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}