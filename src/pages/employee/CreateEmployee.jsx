import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "employee",
    password: "",
  });

  const saveUser = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("User created successfully!");

    // 🔥 IMPORTANT: Redirect after save
    navigate("/admin/manage-users");
  };

  return (
    <div className="min-h-screen bg-[#020617] p-8 text-slate-100 flex justify-center items-center font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-xl bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative z-10">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Add New <span className="text-blue-500">Personnel</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Initialize User Profile</p>
        </div>

        <form className="grid gap-6" onSubmit={saveUser}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <input
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
              placeholder="e.g. Robert Fox"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
            <input
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
              placeholder="robert@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Tier</label>
            <div className="relative">
              <select
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner appearance-none cursor-pointer"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="employee" className="bg-slate-900">Standard Employee</option>
                <option value="manager" className="bg-slate-900">Department Manager</option>
                <option value="hr" className="bg-slate-900">HR Administrator</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                ▼
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Temporary Security Key</label>
            <input
              type="password"
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] py-4 rounded-2xl text-white text-xs font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-900/20 mt-4">
            Create User Account
          </button>
        </form>
      </div>
    </div>
  );
}