import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { Home, Users, UserPlus, LogOut, Sun, Moon, UserCircle } from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- Theme State ---
  // Initializing from localStorage so the choice persists on reload
  const [theme, setTheme] = useState(localStorage.getItem("ems-theme") || "dark");
  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem("ems-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path;

  // --- Dynamic Styling Helpers ---
  const styles = {
    sidebar: isDark ? "bg-[#020617] border-white/5" : "bg-white border-slate-200",
    mainContent: isDark ? "bg-[#020617]" : "bg-slate-50",
    textPrimary: isDark ? "text-white" : "text-slate-900",
    textMuted: isDark ? "text-slate-500" : "text-slate-400",
    navActive: isDark 
      ? "bg-blue-600/10 text-blue-400 border-blue-500/20" 
      : "bg-blue-50 text-blue-600 border-blue-100",
    navIdle: isDark
      ? "text-slate-400 hover:bg-white/5 hover:text-white border-transparent"
      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 border-transparent"
  };

  return (
    <div className={`flex min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-300 ${styles.mainContent} ${isDark ? "text-white" : "text-slate-900"}`}>
      
      {/* SIDEBAR */}
      <div className={`w-72 ${styles.sidebar} border-r p-8 flex flex-col relative z-20 transition-colors duration-300`}>
        
        {/* Brand Section */}
        <div className="mb-12 px-2 flex justify-between items-center">
          <div>
            <h2 className={`text-2xl font-black tracking-tighter flex items-center gap-2 ${styles.textPrimary}`}>
              <div className="w-3 h-3 bg-blue-600 rounded-full border border-white/10"></div>
              EMS
            </h2>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mt-1 ml-5 ${styles.textMuted}`}>
              Administration
            </p>
          </div>
        </div>

        {/* Navigation Group */}
        <nav className="space-y-2 flex-1">
          <p className={`text-[10px] font-black uppercase tracking-widest mb-6 px-2 ${styles.textMuted}`}>
            Systems Menu
          </p>
          
          {[
            { path: "/admin", icon: Home, label: "Dashboard" },
            { path: "/admin/manage-users", icon: Users, label: "Manage User" },
            { path: "/admin/create-user", icon: UserPlus, label: "Create User" },
            { path: "/admin/adminprofile", icon: UserCircle, label: "Profile" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 border ${
                isActive(item.path) ? styles.navActive : styles.navIdle
              }`}
            >
              <item.icon size={18} /> 
              <span className="text-xs font-bold tracking-tight">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer / Theme Toggle & Logout */}
        <div className={`pt-6 border-t ${isDark ? "border-white/5" : "border-slate-100"} mt-auto space-y-2`}>
          
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 w-full border border-transparent ${styles.navIdle}`}
          >
            {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-indigo-600" />}
            <span className="text-xs font-bold tracking-tight">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-5 py-4 rounded-xl text-slate-500 hover:bg-red-500/5 hover:text-red-500 transition-all duration-200 w-full group border border-transparent hover:border-red-500/20"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-xs font-bold tracking-tight">End Session</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 relative overflow-y-auto">
        <main className="relative z-10 p-10 max-w-7xl mx-auto">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}