import React, { useState } from "react";
import { ClipboardCheck, Star, GraduationCap, TrendingUp, Search } from "lucide-react";

export default function PerformanceManagement() {
  const [records, setRecords] = useState([
    { id: 1, name: "Gayathri", kpi: "95% Code Coverage", evaluation: "Exceeds Expectations", recommendation: "Senior Developer", feedback: "Demonstrated exceptional technical leadership and cross-functional mentorship." }
  ]);

  const [formData, setFormData] = useState({
    employee: "",
    kpi: "",
    evaluation: "",
    recommendation: "",
    feedback: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.employee) return alert("System Validation: Please designate an associate.");
    
    setRecords([{ id: Date.now(), ...formData }, ...records]);
    setFormData({ employee: "", kpi: "", evaluation: "", recommendation: "", feedback: "" });
  };

  return (
    <div className="p-6 md:p-10 bg-[#020617] min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* EXECUTIVE HEADER */}
        <div className="border-b border-slate-800/60 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            PERFORMANCE <span className="text-indigo-400 font-light tracking-widest">MANAGEMENT</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-[0.4em] mt-2">
            Enterprise Talent Governance & Strategic Review
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ASSESSMENT INPUT COLUMN */}
          <div className="lg:col-span-5">
            <form onSubmit={handleSubmit} className="bg-slate-900/20 border border-slate-800/50 p-8 rounded-xl shadow-sm space-y-6">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-6 flex items-center gap-2">
                <ClipboardCheck size={14} strokeWidth={2.5} /> Assessment Parameters
              </h2>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-500 ml-1 tracking-tight">Personnel Designation</label>
                  <select 
                    value={formData.employee}
                    onChange={(e) => setFormData({...formData, employee: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-md px-4 py-2.5 text-xs text-slate-200 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-950">Select Associate...</option>
                    <option value="Gayathri" className="bg-slate-950">Gayathri (Senior Associate)</option>
                    <option value="Rohit" className="bg-slate-950">Rohit (Technical Lead)</option>
                    <option value="Ananya" className="bg-slate-950">Ananya (Product Analyst)</option>
                  </select>
                </div>

                <FormInput 
                  label="Key Performance Indicators (KPI)" 
                  placeholder="Enter quantifiable deliverables..." 
                  value={formData.kpi}
                  onChange={(e) => setFormData({...formData, kpi: e.target.value})}
                />
                
                <FormInput 
                  label="Core Competency Rating" 
                  placeholder="Executive summary of work quality..." 
                  value={formData.evaluation}
                  onChange={(e) => setFormData({...formData, evaluation: e.target.value})}
                />

                <FormInput 
                  label="Succession Planning" 
                  placeholder="Role progression or advancement track..." 
                  value={formData.recommendation}
                  onChange={(e) => setFormData({...formData, recommendation: e.target.value})}
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-500 ml-1 tracking-tight">Professional Development Strategy</label>
                  <textarea
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-md px-4 py-3 text-xs text-slate-300 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none h-28 resize-none transition-all placeholder:text-slate-700 font-medium"
                    placeholder="Document specialized training and growth trajectories..."
                    value={formData.feedback}
                    onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-md font-bold text-[10px] uppercase tracking-[0.2em] transition-all active:scale-[0.99] border border-indigo-400/20 mt-4 shadow-md shadow-indigo-900/10"
                >
                  Authorize Evaluation Entry
                </button>
              </div>
            </form>
          </div>

          {/* LEDGER COLUMN */}
          <div className="lg:col-span-7 space-y-6">
             <div className="bg-slate-900/10 border border-slate-800/40 rounded-xl p-8 h-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                    <TrendingUp size={14} className="text-emerald-500" /> Historical Performance Ledger
                  </h2>
                </div>

                <div className="space-y-5">
                  {records.map((rec) => (
                    <div key={rec.id} className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-lg hover:border-slate-700 transition-all group shadow-sm">
                      <div className="flex justify-between items-start mb-5">
                        <div>
                          <h3 className="font-bold text-sm text-white tracking-wide">{rec.name || rec.employee}</h3>
                          <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Verified Personnel Record</p>
                        </div>
                        <div className="flex gap-1.5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                          <Star size={10} className="text-amber-500 fill-amber-500" />
                          <Star size={10} className="text-amber-500 fill-amber-500" />
                          <Star size={10} className="text-amber-500 fill-amber-500" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8 text-[10px]">
                        <div className="space-y-1.5">
                          <p className="text-slate-500 uppercase font-bold tracking-tighter">Deliverables & Metrics</p>
                          <p className="text-slate-200 font-semibold leading-relaxed">{rec.kpi}</p>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-slate-500 uppercase font-bold tracking-tighter">Advancement Track</p>
                          <p className="text-slate-200 font-semibold leading-relaxed">{rec.recommendation}</p>
                        </div>
                      </div>
                      
                      <div className="mt-5 pt-5 border-t border-slate-800/50">
                        <p className="text-[9px] uppercase font-bold text-slate-600 mb-2 tracking-widest">Managerial Appraisal Summary</p>
                        <p className="text-[11px] text-slate-400 italic font-medium leading-relaxed bg-slate-950/20 p-3 rounded border-l-2 border-indigo-500/30">
                          {rec.feedback}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {records.length === 0 && (
                  <div className="text-center py-24 text-slate-700">
                    <Search size={32} className="mx-auto mb-4 opacity-20" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Query returned zero records</p>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function FormInput({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase text-slate-500 ml-1 tracking-tight">{label}</label>
      <input
        {...props}
        className="w-full bg-slate-950/50 border border-slate-800 rounded-md px-4 py-2.5 text-xs text-slate-300 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-800 font-medium"
      />
    </div>
  );
}