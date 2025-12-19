import React, { useState, useEffect } from "react";

// ---------------------- Helpers ----------------------
const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (e) {
    return fallback;
  }
};

const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export default function EmployeeLeaveSummary({ employeeId }) {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    leaveType: "Sick",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const TOTAL_ANNUAL_LEAVE = {
    Sick: 10,
    Casual: 12,
    Emergency: 5,
    Holiday: 15,
  };

  useEffect(() => {
    setEmployees(load("employees", []));
    setLeaves(load("leaves", []));
  }, []);

  const employee = employees.find((e) => e.id === employeeId) || { name: "Unknown" };
  
  // Filter for approved leaves to calculate balances, 
  // but we show "Pending" and "Approved" in the table.
  const approvedLeaves = leaves.filter((l) => l.employeeId === employeeId && l.status === "Approved");
  const allEmpLeaves = leaves.filter((l) => l.employeeId === employeeId);

  const getLeaveDays = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = e.getTime() - s.getTime();
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1);
  };

  const leaveSummary = approvedLeaves.reduce((acc, l) => {
    const type = l.leaveType || "Other";
    const days = getLeaveDays(l.startDate, l.endDate);
    acc[type] = (acc[type] || 0) + days;
    return acc;
  }, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeave = {
      ...formData,
      id: Date.now(),
      employeeId: employeeId,
      status: "Pending", // Default status for new requests
      requestDate: new Date().toLocaleDateString()
    };

    const updatedLeaves = [newLeave, ...leaves];
    setLeaves(updatedLeaves);
    save("leaves", updatedLeaves);
    setShowForm(false);
    setFormData({ leaveType: "Sick", startDate: "", endDate: "", reason: "" });
    alert("🚀 Leave request submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-[#020617] p-8 text-slate-100 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase">
              Leave <span className="text-blue-500">Analytics</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
              Terminal User: {employee.name}
            </p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            {showForm ? "Close Terminal" : "Request Leave"}
          </button>
        </div>

        {/* Request Form (Conditional Rendering) */}
        {showForm && (
          <div className="mb-12 bg-slate-900/60 border border-blue-500/30 backdrop-blur-3xl p-8 rounded-[2.5rem] animate-in fade-in slide-in-from-top-4 duration-500">
            <h3 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2">
              <Zap size={16} /> New Request Protocol
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Classification</label>
                <select 
                  className="bg-slate-950 border border-white/10 p-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  value={formData.leaveType}
                  onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
                >
                  {Object.keys(TOTAL_ANNUAL_LEAVE).map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Start Cycle</label>
                <input 
                  type="date" 
                  required
                  className="bg-slate-950 border border-white/10 p-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors [color-scheme:dark]"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">End Cycle</label>
                <input 
                  type="date" 
                  required
                  className="bg-slate-950 border border-white/10 p-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors [color-scheme:dark]"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Reasoning/Justification</label>
                <input 
                  type="text" 
                  placeholder="Enter specific details..."
                  required
                  className="bg-slate-950 border border-white/10 p-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                />
              </div>
              <div className="flex items-end">
                <button type="submit" className="w-full bg-white text-black py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-400 transition-colors">
                  Submit to Ledger
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Leave Totals Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.keys(TOTAL_ANNUAL_LEAVE).map((type) => {
            const taken = leaveSummary[type] || 0;
            const remaining = TOTAL_ANNUAL_LEAVE[type] - taken;
            
            const themes = {
              Sick: "from-red-500/20 border-red-500/20 text-red-400",
              Casual: "from-indigo-500/20 border-indigo-500/20 text-indigo-400",
              Emergency: "from-amber-500/20 border-amber-500/20 text-amber-400",
              Holiday: "from-emerald-500/20 border-emerald-500/20 text-emerald-400",
            };

            return (
              <div key={type} className={`relative overflow-hidden bg-slate-900/40 p-6 rounded-[2rem] border ${themes[type].split(' ')[1]} shadow-2xl`}>
                <h3 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${themes[type].split(' ')[2]}`}>{type}</h3>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[8px] font-black text-slate-600 uppercase">Remaining</p>
                    <p className="text-3xl font-black text-white">{remaining >= 0 ? remaining : 0}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black text-slate-600 uppercase">Used</p>
                    <p className="text-lg font-bold text-slate-400">{taken}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Historical Logs */}
        <div className="bg-slate-900/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
            <ClipboardList className="text-blue-500" size={20} /> Historical Ledger
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6">Classification</th>
                  <th className="px-6">Timeline</th>
                  <th className="px-6">Units</th>
                  <th className="px-6">Reasoning</th>
                </tr>
              </thead>
              <tbody>
                {allEmpLeaves.length > 0 ? (
                  allEmpLeaves.map((l) => (
                    <tr key={l.id} className="bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                      <td className="px-6 py-5 rounded-l-2xl">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${
                          l.status === 'Approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="px-6">
                        <span className="text-[10px] font-black text-slate-300 uppercase">{l.leaveType}</span>
                      </td>
                      <td className="px-6">
                        <div className="text-xs font-bold text-slate-200">{l.startDate}</div>
                        <div className="text-[9px] text-slate-600 font-bold uppercase">To: {l.endDate}</div>
                      </td>
                      <td className="px-6">
                        <span className="text-xs font-mono text-blue-400 font-bold">{getLeaveDays(l.startDate, l.endDate)} D</span>
                      </td>
                      <td className="px-6 py-5 rounded-r-2xl">
                        <p className="text-xs text-slate-500 italic max-w-xs truncate">{l.reason}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-600 font-black uppercase tracking-widest text-xs italic">
                      No validated records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Minimal Icons ----------------------
function ClipboardList({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>
    </svg>
  );
}

function Zap({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}