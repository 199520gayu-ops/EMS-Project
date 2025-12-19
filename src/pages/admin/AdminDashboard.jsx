import React, { useState, useMemo, useEffect } from "react";
import {
  Users, UserPlus, Briefcase, ClipboardList, Search,
  BarChart3, PieChart, ArrowUpRight, Bell, Settings,
  Command, LayoutDashboard, ShieldCheck, Sun, Moon
} from "lucide-react";

export default function AdminDashboard() {
  /* ------------------ THEME STATE ------------------ */
  const [theme, setTheme] = useState(localStorage.getItem("admin-theme") || "dark");
  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem("admin-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  /* ------------------ DATA STATE ------------------ */
  const [searchQuery, setSearchQuery] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [employees] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Lead Developer", status: "Active", output: 92 },
    { id: 2, name: "Sarah HR", email: "sarah.hr@example.com", role: "Senior HR", status: "Active", output: 88 },
    { id: 3, name: "David PM", email: "david@example.com", role: "Project Manager", status: "Inactive", output: 45 },
    { id: 4, name: "Gayathri", email: "gaya@system.com", role: "Manager", status: "Active", output: 98 },
    { id: 5, name: "Rohit", email: "rohit.dev@example.com", role: "Lead Developer", status: "Active", output: 76 },
    { id: 6, name: "Ananya", email: "ananya.hr@example.com", role: "HR Staff", status: "Active", output: 82 },
  ]);

  /* ------------------ CLOCK LOGIC ------------------ */
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ------------------ LOGIC ------------------ */
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, employees]);

  const stats = {
    total: employees.length,
    managers: employees.filter(e => e.role.toLowerCase().includes("manager")).length,
    hr: employees.filter(e => e.role.toLowerCase().includes("hr")).length,
    active: employees.filter(e => e.status === "Active").length,
    avgOutput: Math.round(employees.reduce((acc, curr) => acc + curr.output, 0) / employees.length)
  };

  /* ------------------ DYNAMIC STYLES ------------------ */
  const styles = {
    bg: isDark ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900",
    header: isDark ? "bg-[#020617] border-white/5" : "bg-white border-slate-200",
    card: isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm",
    input: isDark ? "bg-[#020617] border-white/5" : "bg-slate-50 border-slate-200",
    textMuted: isDark ? "text-slate-500" : "text-slate-400",
    tableRow: isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50",
  };

  return (
    <div className={`${styles.bg} min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-300`}>
      
      {/* --- HEADER --- */}
      <header className={`sticky top-0 z-50 w-full border-b ${styles.header} transition-colors`}>
        <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center border border-white/10 shadow-lg shadow-blue-600/20">
                <Command size={22} className="text-white" />
              </div>
              <h1 className={`text-xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Admin</h1>
            </div>

            <nav className="hidden lg:flex items-center gap-6 ml-4">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500">
                <LayoutDashboard size={14} /> Dashboard
              </button>
              <button className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                <Users size={14} /> Team
              </button>
              <button className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                <ShieldCheck size={14} /> Security
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className={`hidden md:block text-right border-r pr-6 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Standard Time</p>
              <p className="text-sm font-mono font-bold text-blue-600">{time}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5 text-yellow-500' : 'hover:bg-slate-100 text-indigo-600'}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className={`p-2.5 rounded-xl transition-colors relative ${isDark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-current"></span>
              </button>
              <div className={`w-px h-8 mx-2 ${isDark ? 'bg-white/5' : 'bg-slate-200'}`}></div>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[10px] border ${isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'}`}>AD</div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-10 max-w-[1600px] mx-auto">

        {/* HEADER TITLE SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className={`text-4xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Admin <span className="text-blue-600">Analytics</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-bold mt-1 uppercase tracking-[0.3em]">Live Intelligence Reports</p>
          </div>

          <div className={`px-5 py-2.5 border rounded-xl flex items-center gap-4 ${styles.card}`}>
            <div className="text-right">
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Auth Level</p>
              <h3 className={`text-sm font-bold leading-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Root Administrator</h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-[10px] text-white border border-white/10">AD</div>
          </div>
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${styles.card} border p-8 rounded-3xl relative overflow-hidden transition-colors`}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <BarChart3 size={14} className="text-blue-500" /> Output Distribution
              </h2>
              <span className={`text-[9px] font-black px-3 py-1 rounded-md border ${isDark ? 'text-slate-500 border-white/5' : 'text-slate-400 border-slate-100'}`}>System Cycle</span>
            </div>
            
            <div className="flex items-end justify-between gap-3 h-48 px-2">
              {employees.map((emp) => (
                <div key={emp.id} className="flex flex-col items-center gap-3 w-full group">
                  <div className="relative w-full flex flex-col justify-end items-center h-40">
                    <div 
                      style={{ height: `${emp.output}%` }} 
                      className={`w-full max-w-[32px] rounded-t-sm transition-all duration-500 border-t border-x ${isDark ? 'border-white/5' : 'border-slate-100'} ${emp.status === 'Active' ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)]' : (isDark ? 'bg-slate-800' : 'bg-slate-200')}`}
                    ></div>
                  </div>
                  <span className="text-[8px] font-bold uppercase text-slate-500 tracking-tighter truncate w-full text-center">{emp.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.card} border p-8 rounded-3xl flex flex-col justify-between transition-colors`}>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <PieChart size={14} className="text-blue-500" /> Efficiency Pulse
              </h2>
              <div className="relative flex justify-center py-4">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" className={isDark ? "text-slate-900" : "text-slate-100"} />
                  <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" 
                    strokeDasharray={314}
                    strokeDashoffset={314 - (314 * stats.avgOutput) / 100}
                    className="text-blue-600 transition-all duration-1000 ease-out" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.avgOutput}%</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase">Avg</span>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-xl flex items-center justify-between border ${isDark ? 'bg-white/[0.03] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-500">Delta</p>
                <p className="text-lg font-black text-emerald-500">+12.4%</p>
              </div>
              <ArrowUpRight size={20} className="text-emerald-500" />
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Users size={18} />} label="Personnel" value={stats.total} color="blue" isDark={isDark} />
          <StatCard icon={<Briefcase size={18} />} label="Ops Managers" value={stats.managers} color="emerald" isDark={isDark} />
          <StatCard icon={<ClipboardList size={18} />} label="System HR" value={stats.hr} color="amber" isDark={isDark} />
          <StatCard icon={<UserPlus size={18} />} label="Active Stream" value={stats.active} color="purple" isDark={isDark} />
        </div>

        {/* DATA TABLE SECTION */}
        <div className={`${styles.card} border p-8 rounded-3xl transition-colors`}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <div className="w-1 h-1 rounded-full bg-blue-500"></div>
              Directory Ledger
            </h2>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                type="text"
                placeholder="Search index..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full border rounded-lg pl-10 pr-4 py-2 text-[11px] outline-none transition-all placeholder:text-slate-400 ${styles.input} ${isDark ? 'text-white focus:border-blue-500/50' : 'text-slate-900 focus:border-blue-500'}`}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-slate-500 text-[9px] font-black uppercase tracking-widest border-b text-left transition-colors" style={{borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}}>
                  <th className="py-4 px-4">Entity</th>
                  <th className="py-4">Access Email</th>
                  <th className="py-4">Classification</th>
                  <th className="py-4 text-right px-4">Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y transition-colors ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className={`${styles.tableRow} transition-colors group`}>
                    <td className={`py-5 px-4 font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{emp.name}</td>
                    <td className="text-[12px] font-mono text-slate-500">{emp.email}</td>
                    <td className="text-[11px]">
                      <span className={`px-2 py-1 rounded border transition-colors ${isDark ? 'bg-slate-900 text-slate-400 border-white/5' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="text-right px-4">
                      <span className={`px-3 py-1 rounded text-[9px] font-black uppercase border transition-all ${emp.status === "Active" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : (isDark ? "text-slate-600 border-white/5 bg-slate-900" : "text-slate-400 border-slate-200 bg-slate-50")}`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, isDark }) {
  const colors = {
    blue: "text-blue-500 border-blue-500/10 bg-blue-500/5",
    emerald: "text-emerald-500 border-emerald-500/10 bg-emerald-500/5",
    amber: "text-amber-500 border-amber-500/10 bg-amber-500/5",
    purple: "text-purple-500 border-purple-500/10 bg-purple-500/5"
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all group ${isDark ? 'bg-white/[0.01] border-white/5 hover:border-white/10' : 'bg-white border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-md'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg border transition-colors ${colors[color]}`}>{icon}</div>
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
      <h2 className={`text-4xl font-black tracking-tighter transition-colors ${isDark ? 'text-white group-hover:text-blue-500' : 'text-slate-900 group-hover:text-blue-600'}`}>
        {value.toString().padStart(2, '0')}
      </h2>
    </div>
  );
}