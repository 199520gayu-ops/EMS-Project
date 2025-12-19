import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Building2, Phone, MapPin, 
  FileText, Briefcase, GraduationCap, CheckCircle2, 
  RefreshCcw, Upload, ShieldCheck, PartyPopper,
  Sun, Moon
} from 'lucide-react';

const Onboarding = () => {
  // --- Initial Form State ---
  const initialFormState = {
    fullName: '',
    email: '',
    dept: 'Engineering',
    phone: '',
    address: '',
    educationCert: null,
    experienceCert: null,
    payslip: null,
    resume: null
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // --- Theme State ---
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  // --- Auto-generate Email ID ---
  useEffect(() => {
    if (formData.fullName && !formData.email.includes('@')) {
      const generated = formData.fullName.toLowerCase().trim().replace(/\s+/g, '.') + '@company.com';
      setFormData(prev => ({ ...prev, email: generated }));
    }
  }, [formData.fullName]);

  // --- Handlers ---
  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setShowSuccess(false);
    document.querySelectorAll('input[type="file"]').forEach(el => el.value = '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        handleReset();
      }, 3000);
    }, 1500);
  };

  // --- Theme Styling Helpers ---
  const bgMain = isDark ? 'bg-[#020617] text-slate-200' : 'bg-slate-50 text-slate-900';
  const cardBg = isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm';
  const inputBg = isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900';
  const sidebarBg = isDark ? 'bg-slate-900/60 border-white/5' : 'bg-white border-slate-200 shadow-xl';

  return (
    <div className={`min-h-screen ${bgMain} p-4 md:p-10 font-sans relative transition-colors duration-300`}>
      
      {/* SUCCESS OVERLAY MESSAGE */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm transition-all">
          <div className={`${isDark ? 'bg-slate-900 border-emerald-500/50' : 'bg-white border-emerald-200'} border p-10 rounded-[3rem] text-center shadow-2xl animate-in zoom-in duration-300`}>
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h2 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Upload Successful!</h2>
            <p className="text-slate-400 mb-6">Employee details have been added to the database.</p>
            <div className="flex items-center justify-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-widest">
              <RefreshCcw size={14} className="animate-spin" /> Auto-resetting form...
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-black flex items-center gap-3 italic ${isDark ? 'text-white' : 'text-slate-900'}`}>
              TECH<span className="text-cyan-500 not-italic">ONBOARD</span>
            </h1>
            <p className="text-slate-500">Secure Employee Document Portal</p>
          </div>
          
          {/* THEME TOGGLE BUTTON */}
          <button 
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-3 rounded-2xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800 text-yellow-500' : 'bg-white border-slate-200 text-slate-600 shadow-sm'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FORM SECTION */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            <div className={`${cardBg} border rounded-3xl p-8 transition-colors`}>
              <h2 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                <User size={16} /> Employee Dossier
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-[10px] uppercase text-slate-500 font-bold mb-2 block">Full Name</label>
                  <input 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleTextChange} 
                    className={`w-full ${inputBg} border rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-all`} 
                    required 
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-slate-500 font-bold mb-2 block">Corporate Email</label>
                  <input 
                    name="email" 
                    value={formData.email} 
                    onChange={handleTextChange} 
                    className={`w-full ${isDark ? 'bg-slate-950/50' : 'bg-slate-100'} border border-slate-800 text-cyan-600 dark:text-cyan-400 rounded-xl px-4 py-3 font-mono text-sm`} 
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-slate-500 font-bold mb-2 block">Department</label>
                  <select 
                    name="dept" 
                    value={formData.dept} 
                    onChange={handleTextChange} 
                    className={`w-full ${inputBg} border rounded-xl px-4 py-3 outline-none transition-all`}
                  >
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Marketing</option>
                  </select>
                </div>
              </div>
            </div>

            {/* DOCUMENT SECTION */}
            <div className={`${cardBg} border rounded-3xl p-8 transition-colors`}>
              <h2 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                <FileText size={16} /> Certificates & Records
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['educationCert', 'experienceCert', 'payslip', 'resume'].map((item) => (
                  <div key={item} className={`p-4 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'} border rounded-2xl border-dashed hover:border-purple-500/50 transition-colors`}>
                    <label className="text-[10px] uppercase text-slate-400 font-bold mb-2 block italic">{item.replace(/([A-Z])/g, ' $1')}</label>
                    <input 
                      type="file" 
                      name={item} 
                      onChange={handleFileChange} 
                      className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'} file:bg-slate-800 file:text-white file:border-0 file:rounded-md file:px-2 file:py-1 cursor-pointer`} 
                    />
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl
                ${isSubmitting ? 'bg-slate-800 text-slate-500' : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:scale-[1.01] active:scale-[0.98] shadow-cyan-900/20'}
              `}
            >
              {isSubmitting ? 'Encrypting & Uploading...' : 'Submit & Provision Access'}
            </button>
          </form>

          {/* SIDEBAR PREVIEW */}
          <div className="lg:col-span-5">
            <div className={`sticky top-10 ${sidebarBg} backdrop-blur-xl border rounded-[2.5rem] p-8 transition-all`}>
              <div className="text-center mb-8">
                <div className={`w-24 h-24 ${isDark ? 'bg-slate-800 border-slate-950' : 'bg-slate-100 border-white'} rounded-full mx-auto mb-4 border-4 flex items-center justify-center`}>
                  <User size={40} className={isDark ? 'text-slate-600' : 'text-slate-400'} />
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{formData.fullName || 'New Employee'}</h3>
                <p className="text-cyan-500 text-sm font-mono italic">{formData.email || 'email@company.com'}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Verification Checklist</h4>
                {['educationCert', 'experienceCert', 'payslip', 'resume'].map(key => (
                  <div key={key} className={`flex items-center justify-between ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-100'} p-3 rounded-xl border transition-colors`}>
                    <span className="text-xs text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    {formData[key] ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border ${isDark ? 'border-slate-700' : 'border-slate-300'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Onboarding;