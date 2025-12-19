import React, { useState } from "react";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [tempPass, setTempPass] = useState("");

  // Auto-generate simple random password
  const generatePassword = () => {
    const randomPass = Math.random().toString(36).slice(-8); 
    setTempPass(randomPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      role: role.toLowerCase(),
      email,
      password: tempPass,
    };

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    existingUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("User created successfully!");

    setName("");
    setEmail("");
    setTempPass("");
    setRole("");
  };

  return (
    <div className="min-h-screen bg-[#020617] p-8 text-slate-100 flex justify-center items-center font-sans selection:bg-blue-500/30">
      
      {/* Container Card: Removed glow, added stealth borders */}
      <div className="w-full max-w-lg bg-white/[0.01] border border-white/5 p-10 rounded-[2rem] relative z-10">

        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black text-white tracking-tighter">
            Provision <span className="text-blue-600">User</span>
          </h2>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Access Management System</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* NAME */}
          <div className="space-y-2">
            <label className="block text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Full Identity</label>
            <input
              className="w-full p-4 rounded-xl bg-[#020617] border border-white/5 text-slate-200 placeholder-slate-700 focus:outline-none focus:border-blue-600/50 transition-all text-sm"
              placeholder="e.g. Alexander Thompson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="block text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Communication Channel</label>
            <input
              className="w-full p-4 rounded-xl bg-[#020617] border border-white/5 text-slate-200 placeholder-slate-700 focus:outline-none focus:border-blue-600/50 transition-all text-sm"
              placeholder="email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* ROLE */}
          <div className="space-y-2">
            <label className="block text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">System Authorization</label>
            <div className="relative">
              <select
                className="w-full p-4 rounded-xl bg-[#020617] border border-white/5 text-slate-400 focus:outline-none focus:border-blue-600/50 transition-all appearance-none cursor-pointer text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" className="bg-[#020617]">Select Access Level</option>
                <option value="admin" className="bg-[#020617]">Admin</option>
                <option value="hr" className="bg-[#020617]">HR Specialist</option>
                <option value="manager" className="bg-[#020617]">Project Manager</option>
                <option value="employee" className="bg-[#020617]">Standard Employee</option>
              </select>
            </div>
          </div>

          {/* TEMP PASSWORD */}
          <div className="space-y-2">
            <label className="block text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">
              Temporary Security Key
            </label>

            <div className="flex gap-3">
              <input
                className="flex-1 p-4 rounded-xl bg-[#020617] border border-white/5 text-blue-400 font-mono text-xs placeholder-slate-700 focus:outline-none focus:border-blue-600/50 transition-all"
                placeholder="Click Generate"
                value={tempPass}
                onChange={(e) => setTempPass(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={generatePassword}
                className="px-6 py-2 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-white/5 active:scale-95"
              >
                Generate
              </button>
            </div>
          </div>

          {/* SUBMIT BTN - Shadow removed for dark theme consistency */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] p-4 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all mt-4 border border-white/10">
            Initialize Account
          </button>

        </form>
      </div>
    </div>
  );
}
