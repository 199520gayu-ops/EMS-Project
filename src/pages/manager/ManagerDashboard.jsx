import { useState, useEffect } from "react";
import { Users, Briefcase, Clock, CheckCircle, TrendingUp, Search, X, ShieldCheck, Plus, ListChecks } from "lucide-react";

export default function ManagerDashboard() {
  /* ---------------- TIME LOGIC ---------------- */
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ---------------- STATE ---------------- */
  const [tasks, setTasks] = useState([
    { id: 1, employee: "Gayathri", task: "Build Attendance Module", deadline: "Jan 20, 2025", status: "In Progress" },
    { id: 2, employee: "Rohit", task: "Fix Payroll Bugs", deadline: "Jan 18, 2025", status: "Pending" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [newTask, setNewTask] = useState({ employee: "", task: "", deadline: "" });

  const [performance] = useState([
    { name: "Gayathri", score: 90, status: "Excellent" },
    { name: "Rohit", score: 75, status: "Good" },
  ]);

  /* ---------------- HANDLERS ---------------- */
  const assignTask = () => {
    if (!newTask.employee || !newTask.task || !newTask.deadline) return;
    setTasks([...tasks, { id: Date.now(), ...newTask, status: "Pending" }]);
    setNewTask({ employee: "", task: "", deadline: "" });
  };

  const updateStatus = (id, status) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const filteredTasks = tasks.filter(
    (t) =>
      t.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 bg-[#02050e] min-h-screen text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* FRIENDLY HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-slate-800/40 p-8 rounded-[2rem] border border-white/5 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">Team Dashboard</h1>
            <p className="text-slate-400 text-sm">Welcome back! Here is what’s happening with your projects today.</p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-semibold text-white">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-xs font-medium text-blue-400 mt-1">
              {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Team" value="08" label="Members" icon={<Users className="text-blue-400" />} />
          <StatCard title="Active Tasks" value={tasks.length} label="Running" icon={<Briefcase className="text-indigo-400" />} />
          <StatCard title="Needs Review" value={tasks.filter(t => t.status === "Pending").length} label="Tasks" icon={<Clock className="text-amber-400" />} />
          <StatCard title="Completed" value={tasks.filter(t => t.status === "Completed").length} label="This Week" icon={<CheckCircle className="text-emerald-400" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ASSIGN NEW TASK */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-800/60 border border-white/10 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Plus size={18} className="text-blue-400" />
                <h2 className="text-lg font-bold text-white">Assign New Task</h2>
              </div>
              <div className="space-y-5">
                <FormField label="Assign to" placeholder="Team member name" value={newTask.employee} onChange={(e) => setNewTask({ ...newTask, employee: e.target.value })} />
                <FormField label="Task Description" placeholder="What needs to be done?" value={newTask.task} onChange={(e) => setNewTask({ ...newTask, task: e.target.value })} />
                <FormField label="Due Date" type="date" value={newTask.deadline} onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} />
                <button onClick={assignTask} className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-3.5 font-bold transition-all shadow-lg shadow-blue-900/40">
                  Add to List
                </button>
              </div>
            </div>

            {/* PERFORMANCE MINI-LIST */}
            <div className="bg-slate-800/30 border border-white/5 rounded-3xl p-8">
              <h2 className="text-md font-bold text-white mb-6">Team Productivity</h2>
              <div className="space-y-6">
                {performance.map((emp, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{emp.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">{emp.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-blue-400">{emp.score}%</p>
                      <div className="w-20 h-1 bg-slate-700 rounded-full mt-1">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${emp.score}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TASK LIST TABLE */}
          <div className="lg:col-span-8">
            <div className="bg-slate-800/40 border border-white/10 rounded-[2.5rem] p-8 h-full shadow-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <ListChecks className="text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Project Tasks</h2>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text"
                    placeholder="Search by name or task..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-sm text-white focus:border-blue-500 outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-white/5">
                      <th className="px-4 pb-4">Team Member</th>
                      <th className="px-4 pb-4">Task Name</th>
                      <th className="px-4 pb-4">Deadline</th>
                      <th className="px-4 pb-4">Status</th>
                      <th className="px-4 pb-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredTasks.map((t) => (
                      <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-5 font-bold text-white text-sm">{t.employee}</td>
                        <td className="px-4 py-5 text-sm text-slate-300">{t.task}</td>
                        <td className="px-4 py-5 text-xs text-slate-500 italic">{t.deadline}</td>
                        <td className="px-4 py-5"><FriendlyBadge status={t.status} /></td>
                        <td className="px-4 py-5 text-right">
                          <select
                            value={t.status}
                            onChange={(e) => updateStatus(t.id, e.target.value)}
                            className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] font-medium text-slate-400 focus:text-white outline-none cursor-pointer"
                          >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- USER-FRIENDLY HELPERS ---------------- */

function StatCard({ title, value, label, icon }) {
  return (
    <div className="bg-slate-800/40 border border-white/5 rounded-3xl p-6 hover:bg-slate-800/60 transition-all shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-900/50 rounded-2xl">{icon}</div>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{title}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-xs text-slate-500">{label}</span>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-400 ml-1">{label}</label>
      <input 
        {...props} 
        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700" 
      />
    </div>
  );
}

function FriendlyBadge({ status }) {
  const styles = {
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };
  return <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${styles[status]}`}>{status}</span>;
}