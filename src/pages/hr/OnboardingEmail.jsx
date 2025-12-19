import React, { useState, useEffect } from 'react';
import { 
  Mail, Send, User, Code, Calendar, 
  CheckCircle2, RefreshCcw, Sun, Moon 
} from 'lucide-react';

const OnboardingEmail = () => {
  // --- Constants ---
  const defaultName = 'Alex Thompson';
  const defaultDomain = '@company.com';

  // --- State ---
  const [employeeName, setEmployeeName] = useState(defaultName);
  const [employeeEmail, setEmployeeEmail] = useState('alex.thompson@company.com');
  const [isSent, setIsSent] = useState(false);
  const [theme, setTheme] = useState('dark');

  const isDark = theme === 'dark';

  // --- Auto-generate email ---
  useEffect(() => {
    const emailPrefix = employeeName.toLowerCase().replace(/\s+/g, '.');
    setEmployeeEmail(`${emailPrefix}${defaultDomain}`);
  }, [employeeName]);

  // --- Handlers ---
  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  const handleReset = () => {
    setEmployeeName('');
    setIsSent(false);
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // --- Dynamic Styling Classes ---
  const styles = {
    mainBg: isDark ? 'bg-[#020617] text-slate-300' : 'bg-slate-50 text-slate-600',
    card: isDark ? 'bg-[#030712]/60 border-white/5 shadow-black/50' : 'bg-white border-slate-200 shadow-slate-200/50',
    input: isDark ? 'bg-[#020617] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900',
    emailPreviewBg: isDark ? 'bg-[#030712] border-white/5' : 'bg-white border-slate-200',
    contentCard: isDark ? 'bg-[#020617] border-slate-800/50' : 'bg-slate-50 border-slate-200',
    scheduleBox: isDark ? 'bg-slate-900/20 border-slate-800/40' : 'bg-slate-100 border-slate-200',
    headerGradient: isDark 
      ? 'from-indigo-950 via-blue-900 to-cyan-900' 
      : 'from-indigo-600 via-blue-500 to-cyan-500'
  };

  return (
    <div className={`min-h-screen ${styles.mainBg} p-4 md:p-10 font-sans transition-colors duration-500 selection:bg-cyan-500/30`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
        
        {/* Theme Toggle Floating Button */}
        <button 
          onClick={toggleTheme}
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl border shadow-2xl transition-all hover:scale-110 active:scale-95 ${
            isDark ? 'bg-slate-900 border-slate-700 text-yellow-400' : 'bg-white border-slate-200 text-indigo-600'
          }`}
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Decorative Background Orbs */}
        <div className={`absolute top-0 -left-20 w-72 h-72 rounded-full pointer-events-none blur-[120px] transition-opacity duration-1000 ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'}`}></div>
        <div className={`absolute bottom-0 -right-20 w-96 h-96 rounded-full pointer-events-none blur-[120px] transition-opacity duration-1000 ${isDark ? 'bg-indigo-500/5' : 'bg-indigo-500/10'}`}></div>

        {/* Left Column: Admin Controls */}
        <div className="space-y-6 relative z-10">
          <div className={`${styles.card} backdrop-blur-xl p-8 rounded-[2rem] border shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all`}>
            <h2 className={`text-xl font-black mb-6 flex items-center gap-3 tracking-tight uppercase text-[10px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500 border border-cyan-500/20"><User size={16} /></span> 
              HR Admin Panel
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Employee Name</label>
                <input 
                  type="text" 
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  placeholder="Enter full name..."
                  className={`w-full ${styles.input} border rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner`}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Generated ID</label>
                <div className={`w-full ${styles.input} border-opacity-50 text-cyan-500 font-mono text-sm rounded-xl px-4 py-3 shadow-inner flex items-center gap-2`}>
                  <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse"></div>
                  {employeeEmail}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button 
                  onClick={handleSend}
                  className={`w-full font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] uppercase text-[10px] tracking-widest shadow-lg ${
                    isSent 
                    ? 'bg-emerald-600/20 text-emerald-500 border border-emerald-500/30' 
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/20'
                  }`}
                >
                  {isSent ? <CheckCircle2 size={16} strokeWidth={3}/> : <Send size={16} strokeWidth={3}/>}
                  {isSent ? 'Email Dispatched' : 'Deploy Onboarding'}
                </button>

                <button 
                  onClick={handleReset}
                  className={`w-full bg-transparent hover:bg-slate-400/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-all border uppercase text-[9px] font-bold tracking-widest ${
                    isDark ? 'text-slate-500 border-slate-800/50 hover:text-slate-300' : 'text-slate-400 border-slate-200 hover:text-slate-600'
                  }`}
                >
                  <RefreshCcw size={12} /> Clear Session
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Email Preview */}
        <div className="lg:col-span-2 relative z-10">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">System Output // Preview</div>
            <div className="flex gap-1.5">
                {[1, 2, 3].map(i => <div key={i} className={`w-2.5 h-2.5 rounded-full border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'}`}></div>)}
            </div>
          </div>
          
          <div className={`${styles.emailPreviewBg} rounded-[2.5rem] overflow-hidden border shadow-2xl transition-all`}>
            {/* Email Header */}
            <div className={`bg-gradient-to-br ${styles.headerGradient} p-12 text-center relative overflow-hidden border-b transition-colors`}>
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
              <h1 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">Welcome Home.</h1>
              <p className="text-cyan-100/80 mt-2 font-medium tracking-wide uppercase text-[10px]">Secure Environment Provisioned</p>
            </div>

            {/* Email Content */}
            <div className="p-10 md:p-16 space-y-10 relative">
              <section>
                <h2 className={`text-3xl font-black mb-6 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Hi <span className="text-cyan-500">{employeeName || 'Developer'}</span>,
                </h2>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg leading-relaxed max-w-xl`}>
                  Your environment is ready. We’ve provisioned your official workspace and corporate credentials:
                </p>
                
                <div className={`mt-8 p-6 ${styles.contentCard} border rounded-2xl inline-flex flex-col shadow-xl relative group overflow-hidden transition-all`}>
                  <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-slate-500 text-[9px] block mb-2 uppercase font-black tracking-widest relative z-10">Digital Signature / Email</span>
                  <span className="text-cyan-500 font-mono text-xl font-bold tracking-tight relative z-10">{employeeEmail}</span>
                </div>
              </section>

              {/* Day One Schedule */}
              <div className={`${styles.scheduleBox} rounded-3xl p-8 border shadow-inner transition-all`}>
                <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <span className="p-1.5 bg-blue-500/10 rounded text-blue-500 border border-blue-500/20"><Calendar size={12} /></span>
                  First Day Protocol
                </h3>
                <div className="space-y-6">
                  {[
                    { time: '09:00', task: 'HR Orientation & IT Setup', color: 'bg-cyan-500' },
                    { time: '11:00', task: 'Engineering Team Sync', color: 'bg-blue-500' },
                    { time: '14:00', task: 'Project Architecture Review', color: 'bg-indigo-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-center group">
                      <span className={`font-mono text-[10px] px-3 py-1.5 rounded-lg border transition-all ${
                        isDark ? 'text-slate-400 bg-slate-950 border-slate-800 group-hover:text-white' : 'text-slate-500 bg-white border-slate-200 group-hover:text-slate-900'
                      }`}>{item.time}</span>
                      <div className={`w-1 h-1 rounded-full ${item.color} shadow-[0_0_8px_currentColor]`}></div>
                      <span className={`text-sm font-semibold tracking-wide transition-colors ${isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-800'}`}>{item.task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="text-center pt-6">
                <button className={`px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl active:scale-95 ${
                  isDark ? 'bg-white text-slate-950 hover:bg-cyan-400' : 'bg-slate-900 text-white hover:bg-indigo-600'
                }`}>
                  Initialize Onboarding
                </button>
              </div>

              <footer className={`pt-12 border-t text-center ${isDark ? 'border-slate-900' : 'border-slate-100'}`}>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                  Generated by Core_HR // HQ <br/> 
                  <span className={`${isDark ? 'text-slate-700' : 'text-slate-300'} mt-1 block`}>CONFIDENTIAL SYSTEM NOTIFICATION</span>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingEmail;