import React, { useState } from 'react';
import { 
  BarChart3, Target, Zap, Star, TrendingUp, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal, 
  UserPlus, FileText, Filter, Calendar
} from 'lucide-react';

const KPIPerformanceModule = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 2025');

  const kpiData = [
    { 
      id: 1, 
      employee: "Sarah Chen", 
      metrics: { productivity: 94, quality: 98, reliability: 90 },
      overall: 94.3, 
      status: "Exceeds", 
      trend: "up" 
    },
    { 
      id: 2, 
      employee: "Marcus Wright", 
      metrics: { productivity: 72, quality: 85, reliability: 78 },
      overall: 78.1, 
      status: "Meeting", 
      trend: "down" 
    },
    { 
      id: 3, 
      employee: "Elena Rossi", 
      metrics: { productivity: 88, quality: 92, reliability: 95 },
      overall: 91.5, 
      status: "Exceeds", 
      trend: "up" 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Target className="text-blue-500" /> KPI & Performance Tracking
          </h1>
          <p className="text-slate-400 text-sm mt-1">Real-time performance metrics and evaluation benchmarks.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1">
            {['Q3', 'Q4', 'Yearly'].map((period) => (
              <button 
                key={period}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${selectedPeriod.includes(period) ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                onClick={() => setSelectedPeriod(`${period} 2025`)}
              >
                {period}
              </button>
            ))}
          </div>
          <button className="bg-slate-900 border border-slate-800 p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <Filter size={18} className="text-slate-400" />
          </button>
        </div>
      </header>

      {/* --- QUICK STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Team Velocity" value="88%" icon={<Zap size={20}/>} color="blue" trend="+5.2%" />
        <StatCard title="Avg. Quality" value="92.4" icon={<Star size={20}/>} color="amber" trend="+1.1%" />
        <StatCard title="Tasks Completed" value="1,240" icon={<BarChart3 size={20}/>} color="emerald" trend="+12%" />
        <StatCard title="Review Cycle" value="14 Days" icon={<Calendar size={20}/>} color="purple" trend="On Track" />
      </div>

      {/* --- MAIN KPI TABLE --- */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h2 className="font-bold text-lg">Performance Leaderboard</h2>
          <button className="flex items-center gap-2 text-xs font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors">
            <FileText size={14} /> Export Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-950/50">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Productivity</th>
                <th className="px-6 py-4">Quality Score</th>
                <th className="px-6 py-4 text-center">Overall Index</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {kpiData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600 font-bold text-xs">
                        {row.employee.charAt(0)}
                      </div>
                      <span className="font-semibold text-sm">{row.employee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${row.metrics.productivity}%` }}></div>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{row.metrics.productivity}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${row.metrics.quality}%` }}></div>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{row.metrics.quality}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="inline-flex items-center gap-1 font-bold text-white">
                      {row.overall}
                      {row.trend === 'up' ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownRight size={14} className="text-red-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-[10px] font-extrabold px-2 py-1 rounded border uppercase tracking-tighter ${
                      row.status === 'Exceeds' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-slate-500 hover:text-white transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- EVALUATION WORKFLOW SECTION --- */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-300">
            <TrendingUp size={18} className="text-purple-500" /> Quarterly Benchmark
          </h3>
          <div className="h-48 flex items-end justify-between px-4">
             {/* Simple visual bar chart placeholder */}
             {[45, 60, 85, 70, 95, 80, 88].map((h, i) => (
               <div key={i} className="w-8 bg-gradient-to-t from-blue-600/20 to-blue-500/60 rounded-t-md hover:to-blue-400 transition-all cursor-pointer group relative" style={{ height: `${h}%` }}>
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}%
                 </div>
               </div>
             ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest border-t border-slate-800 pt-4">
            <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <Target size={160} />
          </div>
          <h3 className="text-xl font-bold mb-2">Performance Review</h3>
          <p className="text-blue-100 text-sm mb-6">You have 4 team evaluations pending for the Q4 cycle. Complete them by Friday.</p>
          <button className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2">
            <UserPlus size={18} /> Start Evaluation
          </button>
          <p className="text-[10px] text-center mt-4 text-blue-200 uppercase font-medium">Automatic sync to HR portal</p>
        </div>
      </div>
    </div>
  );
};

// Helper Sub-component
const StatCard = ({ title, value, icon, color, trend }) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend.includes('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-400'}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
    </div>
  );
};

export default KPIPerformanceModule;