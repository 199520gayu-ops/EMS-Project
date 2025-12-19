import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, BarChart2, LogOut,User, ShieldCheck,MessageSquarePlus,TrendingUp } from "lucide-react";


export default function ManagerLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user"); // clear session
    navigate("/login"); // redirect to login
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar */}
      <aside className="w-72 bg-[#010410] border-r border-white/10 flex flex-col z-20">
        
        {/* Logo Section */}
        <div className="p-8 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
            <h2 className="text-2xl font-black tracking-tighter text-white">
              MANAGER
            </h2>
          </div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-5">
            Management Node
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 space-y-3 text-sm">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4 px-2">Core Systems</p>
          
          <NavLink
            to="/manager/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <LayoutDashboard size={18} /> 
            <span className="font-bold tracking-tight">Dashboard</span>
          </NavLink>
          <NavLink
            to="/manager/KPIPerformanceModule"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <TrendingUp size={18} /> 
            <span className="font-bold tracking-tight">PerformanceModule</span>
          </NavLink>

          <NavLink
            to="/manager/reports"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <BarChart2 size={18} /> 
            <span className="font-bold tracking-tight">Performance Intel</span>
          </NavLink>
          
          <NavLink
            to="/manager/managerfeedbackmodule"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <MessageSquarePlus size={18} /> 
            <span className="font-bold tracking-tight">ManagerFeedbackModule</span>
          </NavLink>
          <NavLink
            to="/manager/profile"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <User size={18} /> 
            <span className="font-bold tracking-tight">Profile</span>
          </NavLink>
        </nav>

        {/* Logout Section */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-500 px-4 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 group border border-white/5"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] pointer-events-none z-0"></div>

        {/* Top Header */}
        <header className="h-20 bg-[#020617] border-b border-white/10 flex items-center justify-between px-10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <ShieldCheck size={20} className="text-indigo-400" />
            </div>
            <h1 className="font-black text-xs uppercase tracking-widest text-white">System Overview</h1>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">Authenticated</p>
              <span className="text-sm font-bold text-white tracking-tight">Senior Manager</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/20 border border-white/10">
              M
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-10 overflow-y-auto relative z-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}