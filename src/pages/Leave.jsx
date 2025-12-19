import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Clock, CheckCircle2, Circle, 
  ChevronRight, Play, Pause, Plus, 
  Filter, MoreVertical, Coffee, Briefcase,
  AlertCircle, Timer
} from 'lucide-react';

export default function Leave() {
  const [theme] = useState(localStorage.getItem('ems-theme') || 'dark');
  const isDark = theme === 'dark';

  /* --- 1. STATE MANAGEMENT --- */
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [today] = useState(new Date());

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Network Latency Test', time: '09:00 AM', duration: '1h', status: 'completed', category: 'IT' },
    { id: 2, title: 'Department Standup', time: '11:00 AM', duration: '30m', status: 'in-progress', category: 'Meeting' },
    { id: 3, title: 'Compliance Documentation', time: '01:30 PM', duration: '2h', status: 'pending', category: 'Admin' },
  ]);

  /* --- 2. SHIFT TIMER LOGIC --- */
  useEffect(() => {
    let interval;
    if (isClockedIn && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now - startTime;
        
        const hours = Math.floor(diff / 3600000).toString().padStart(2, '0');
        const minutes = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
        
        setElapsedTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isClockedIn, startTime]);

  /* --- 3. HANDLERS --- */
  const handleClockToggle = () => {
    if (!isClockedIn) {
      setStartTime(new Date());
      setIsClockedIn(true);
    } else {
      if(window.confirm("Are you sure you want to end your shift?")) {
        setIsClockedIn(false);
        setStartTime(null);
        setElapsedTime("00:00:00");
      }
    }
  };

  const cycleTaskStatus = (id) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const states = ['pending', 'in-progress', 'completed'];
        const currentIndex = states.indexOf(task.status);
        const nextStatus = states[(currentIndex + 1) % states.length];
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  const progress = Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100);

  /* --- 4. STYLES --- */
  const styles = {
    container: isDark ? 'bg-[#020617] text-slate-300' : 'bg-slate-50 text-slate-600',
    card: isDark ? 'bg-[#030712] border-white/5' : 'bg-white border-slate-200',
    textHeading: isDark ? 'text-white' : 'text-slate-900',
  };

  return (
    <div className={`min-h-screen p-4 md:p-10 transition-colors ${styles.container}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP NAVBAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className={`text-3xl font-black tracking-tighter ${styles.textHeading}`}>
              Task <span className="text-blue-500">Flow</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* CLOCK MODULE */}
          <div className={`flex items-center gap-6 p-4 rounded-3xl border shadow-2xl ${styles.card}`}>
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase text-slate-500 flex items-center gap-1">
                <Timer size={10} /> Shift Duration
              </span>
              <span className={`text-xl font-mono font-black ${isClockedIn ? 'text-blue-500' : 'text-slate-500'}`}>
                {elapsedTime}
              </span>
            </div>
            <button 
              onClick={handleClockToggle}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                isClockedIn 
                ? 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white' 
                : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500'
              }`}
            >
              {isClockedIn ? 'Clock Out' : 'Clock In'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* WEEKLY SCHEDULE PANEL */}
          <div className="space-y-6">
            <div className={`p-6 rounded-[2.5rem] border ${styles.card}`}>
              <h2 className={`text-xs font-black uppercase tracking-widest mb-6 ${styles.textHeading}`}>Weekly Shifts</h2>
              <div className="space-y-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => (
                  <div key={day} className={`p-4 rounded-2xl border flex items-center justify-between ${idx === 4 ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'opacity-60 border-slate-800'}`}>
                    <span className="text-xs font-black">{day}</span>
                    <span className="text-[10px] font-mono">09:00 - 18:00</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-[2.5rem] border border-blue-500/20 bg-blue-500/5`}>
                <AlertCircle className="text-blue-500 mb-3" size={20} />
                <h3 className={`text-sm font-bold mb-1 ${styles.textHeading}`}>Daily Tip</h3>
                <p className="text-xs leading-relaxed text-slate-500">
                  You have 3 tasks pending. Start your "Compliance" task before 2 PM to stay on track.
                </p>
            </div>
          </div>

          {/* MAIN TASK TRACKER */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`p-8 rounded-[2.5rem] border ${styles.card}`}>
              <div className="flex justify-between items-center mb-8">
                <h2 className={`text-xs font-black uppercase tracking-widest ${styles.textHeading}`}>Assigned Tasks</h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-black text-emerald-500 uppercase">Live Sync</span>
                </div>
              </div>

              

              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className={`flex items-center justify-between p-5 rounded-3xl border transition-all ${
                    task.status === 'completed' ? 'border-emerald-500/20 bg-emerald-500/[0.02] opacity-60' : 
                    task.status === 'in-progress' ? 'border-blue-500/40 bg-blue-500/[0.03]' : 
                    'border-slate-800'
                  }`}>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => cycleTaskStatus(task.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          task.status === 'completed' ? 'bg-emerald-500 text-white' : 
                          task.status === 'in-progress' ? 'bg-blue-500 text-white animate-pulse' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {task.status === 'completed' ? <CheckCircle2 size={20} /> : 
                         task.status === 'in-progress' ? <Play size={20} /> : <Circle size={20} />}
                      </button>
                      <div>
                        <h4 className={`text-sm font-bold ${task.status === 'completed' ? 'line-through text-slate-500' : styles.textHeading}`}>
                          {task.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-mono">{task.time} • {task.duration}</span>
                      </div>
                    </div>
                    <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase border ${
                      task.status === 'completed' ? 'border-emerald-500/30 text-emerald-500' : 'border-slate-700 text-slate-500'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* PROGRESS SECTION */}
              <div className="mt-10 pt-8 border-t border-white/5">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-500">Productivity Level</p>
                    <p className={`text-2xl font-black ${styles.textHeading}`}>{progress}%</p>
                  </div>
                  <Briefcase className="text-blue-500 opacity-20" size={40} />
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}