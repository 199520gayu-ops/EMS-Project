import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, MessageSquare, AlertTriangle, 
  Lock, Key, Eye, EyeOff, CheckCircle, 
  Clock, Send, Sun, Moon, Loader2
} from 'lucide-react';

export default function EmployeeSecurity() {
  /* --- 1. STATE MANAGEMENT --- */
  const [theme, setTheme] = useState(localStorage.getItem('ems-theme') || 'dark');
  const isDark = theme === 'dark';
  
  // Security Toggles State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    remoteAccess: false,
    encryption: true
  });

  // Complaint Form State
  const [form, setForm] = useState({ category: 'Technical Issue', description: '' });
  const [selectedPriority, setSelectedPriority] = useState('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // History State
  const [complaints, setComplaints] = useState([
    { id: 'CMP-102', subject: 'Equipment Malfunction', date: '2024-03-10', status: 'Resolved', priority: 'Medium' },
    { id: 'CMP-105', subject: 'Access Permission Denied', date: '2024-03-12', status: 'Pending', priority: 'High' },
  ]);

  const [showApiKey, setShowApiKey] = useState(false);

  /* --- 2. HANDLERS --- */
  const toggleSecurity = (key) => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim()) return alert("Please enter a description");

    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      const newComplaint = {
        id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
        subject: form.category,
        date: new Date().toLocaleDateString(),
        status: 'Pending',
        priority: selectedPriority
      };

      setComplaints([newComplaint, ...complaints]);
      setForm({ ...form, description: '' }); // Reset form
      setIsSubmitting(false);
    }, 1500);
  };

  /* --- 3. DYNAMIC STYLES --- */
  const styles = {
    container: isDark ? 'bg-[#020617] text-slate-300' : 'bg-slate-50 text-slate-600',
    card: isDark ? 'bg-[#030712] border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-sm',
    input: isDark ? 'bg-[#020617] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900',
    textHeading: isDark ? 'text-white' : 'text-slate-900',
  };

  return (
    <div className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${styles.container}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className={`text-3xl font-black tracking-tighter ${styles.textHeading}`}>
            Security & <span className="text-blue-600">Compliance</span>
          </h1>
          <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="p-2 border rounded-xl">
            {isDark ? <Sun className="text-yellow-500" /> : <Moon className="text-indigo-600" />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECURITY COLUMN */}
          <div className="space-y-6">
            <div className={`p-6 rounded-[2rem] border ${styles.card}`}>
              <h2 className={`text-sm font-black uppercase mb-6 flex items-center gap-2 ${styles.textHeading}`}>
                <Lock size={16} className="text-blue-500" /> Security Status
              </h2>
              
              <div className="space-y-4">
                <SecurityToggle 
                   label="Two-Factor Auth" 
                   active={securitySettings.twoFactor} 
                   onClick={() => toggleSecurity('twoFactor')}
                   isDark={isDark} 
                />
                <SecurityToggle 
                   label="Remote Access" 
                   active={securitySettings.remoteAccess} 
                   onClick={() => toggleSecurity('remoteAccess')}
                   isDark={isDark} 
                />
                <SecurityToggle 
                   label="Encrypted Tunnel" 
                   active={securitySettings.encryption} 
                   onClick={() => toggleSecurity('encryption')}
                   isDark={isDark} 
                />
              </div>
            </div>
          </div>

          {/* COMPLAINTS COLUMN */}
          <div className="lg:col-span-2">
            <div className={`p-8 rounded-[2rem] border ${styles.card}`}>
              <h2 className={`text-sm font-black uppercase mb-8 flex items-center gap-2 ${styles.textHeading}`}>
                <MessageSquare size={18} className="text-blue-600" /> Grievance Portal
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500">Category</label>
                    <select 
                      value={form.category}
                      onChange={(e) => setForm({...form, category: e.target.value})}
                      className={`w-full p-3 rounded-xl border text-xs outline-none ${styles.input}`}
                    >
                      <option>Technical Issue</option>
                      <option>Harassment/Conduct</option>
                      <option>Infrastructure</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500">Priority</label>
                    <div className="flex gap-2">
                      {['Low', 'Medium', 'High'].map(p => (
                        <button 
                          key={p} 
                          type="button"
                          onClick={() => setSelectedPriority(p)}
                          className={`flex-1 py-2 text-[10px] font-black rounded-lg border transition-all ${
                            selectedPriority === p ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-400'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500">Description</label>
                  <textarea 
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    rows="4" 
                    className={`w-full p-4 rounded-xl border text-xs outline-none resize-none ${styles.input}`}
                    placeholder="Describe the issue..."
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
                  {isSubmitting ? 'Processing...' : 'Submit Report'}
                </button>
              </form>

              {/* LIST HISTORY */}
              <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-4">Recent Submissions</p>
                <div className="space-y-3">
                  {complaints.map(item => (
                    <div key={item.id} className={`flex items-center justify-between p-4 rounded-2xl border ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="flex items-center gap-4">
                        {item.status === 'Resolved' ? <CheckCircle className="text-emerald-500" size={18} /> : <Clock className="text-amber-500" size={18} />}
                        <div>
                          <p className={`text-xs font-bold ${styles.textHeading}`}>{item.subject}</p>
                          <p className="text-[9px] text-slate-500 font-mono">{item.id} • {item.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${item.status === 'Resolved' ? 'text-emerald-500 border-emerald-500/20' : 'text-amber-500 border-amber-500/20'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- HELPER SUB-COMPONENT --- */
function SecurityToggle({ label, active, onClick, isDark }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100'}`}
    >
      <span className="text-[11px] font-bold">{label}</span>
      <div className={`w-8 h-4 rounded-full relative transition-colors ${active ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-800'}`}>
        <div className={`absolute top-1 w-2 h-2 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`}></div>
      </div>
    </div>
  );
}