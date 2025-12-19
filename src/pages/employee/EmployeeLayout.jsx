import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  FileText,
  User,
  LogOut,
  Lock,
} from "lucide-react";

export default function EmployeeLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/employee/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Attendance", path: "/employee/attendance", icon: <Calendar size={18} /> },
    { name: "Leave", path: "/employee/leave", icon: <ClipboardList size={18} /> },
    { name: "Payslips", path: "/employee/payslips", icon: <FileText size={18} /> },
    { name: "Profile", path: "/employee/profile", icon: <User size={18} /> },
    { name: "Leave Details", path: "/employee/employeeleaves", icon: <FileText size={18} /> },
    { name: "Security & Compliance", path: "/employee/employeesecurity", icon: <Lock size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">

      {/* SIDEBAR - Removed white border, used slate-800/50 */}
      <aside className="w-72 bg-slate-900/80 border-r border-slate-800 p-8 flex flex-col backdrop-blur-3xl z-20">
        
        {/* Logo Section */}
        <div className="mb-12 px-2">
          <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            EMS
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1 ml-5">Employee Node</p>
        </div>

        {/* Menu Section */}
        <nav className="flex-1 space-y-3">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4 px-2">Navigation</p>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/20" // Removed shadow, used subtle border
                    : "text-slate-500 hover:bg-slate-800/40 hover:text-slate-200"
                }`}
              >
                <span className={`${isActive ? "text-blue-400" : "group-hover:text-blue-400"} transition-colors`}>
                  {item.icon}
                </span>
                <span className="text-sm font-bold tracking-tight">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section - Removed white border-t */}
        <div className="pt-6 border-t border-slate-800 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 w-full group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> 
            <span className="text-sm font-bold tracking-tight">End Session</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative overflow-y-auto bg-[#020617]">
        {/* Subtler Ambient Glow */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[150px] pointer-events-none z-0"></div>
        
        <section className="relative z-10 p-10 max-w-7xl mx-auto">
          {children}
        </section>
      </main>
    </div>
  );
}