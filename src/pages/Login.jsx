import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Forgot password states
  const [showForgot, setShowForgot] = useState(false);
  const [fpEmail, setFpEmail] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [fpMsg, setFpMsg] = useState("");

  // DEMO USERS
  const demoUsers = [
    { role: "admin", email: "admin@ems.com", password: "Admin@123" },
    { role: "hr", email: "hr@ems.com", password: "Hr@123" },
    { role: "manager", email: "manager@ems.com", password: "Manager@123" },
    { role: "employee", email: "emp@ems.com", password: "Emp@123" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const createdUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allUsers = [...demoUsers, ...createdUsers];

    const found = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      setError("Invalid email or password!");
      return;
    }

    localStorage.setItem("role", found.role);
    localStorage.setItem("currentUser", JSON.stringify(found));

    navigate(`/${found.role}/dashboard`);
  };

  // ---------------- FORGOT PASSWORD ----------------
  const handleResetPassword = () => {
    setFpMsg("");

    if (newPass !== confirmPass) {
      setFpMsg("Passwords do not match");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userFound = false;

    // Check admin-created users
    users = users.map((u) => {
      if (u.email === fpEmail) {
        userFound = true;
        return { ...u, password: newPass };
      }
      return u;
    });

    // Check demo users
    const demoIndex = demoUsers.findIndex((u) => u.email === fpEmail);
    if (demoIndex !== -1) {
      demoUsers[demoIndex].password = newPass;
      userFound = true;
    }

    if (!userFound) {
      setFpMsg("Email not found!");
      return;
    }

    localStorage.setItem("users", JSON.stringify(users));

    setFpMsg("Password reset successful!");
    setTimeout(() => {
      setShowForgot(false);
      setFpEmail("");
      setNewPass("");
      setConfirmPass("");
      setFpMsg("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#020617] p-6 selection:bg-blue-500/30">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-[400px] bg-slate-900/40 shadow-2xl rounded-3xl p-10 border border-white/5 backdrop-blur-2xl relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Login 
          </h1>
          
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-slate-400 text-xs font-bold uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
                <label className="text-slate-400 text-xs font-bold uppercase tracking-widest">Password</label>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 py-2 rounded-xl text-red-400 text-xs text-center font-bold">
                {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] py-4 rounded-2xl text-white font-bold tracking-wide transition-all shadow-lg shadow-blue-900/20"
          >
            Sign In
          </button>

          <p
            onClick={() => setShowForgot(true)}
            className="text-slate-500 text-sm text-center cursor-pointer hover:text-blue-400 transition-colors"
          >
            Forgot your password?
          </p>
        </form>
      </div>

      {/* -------- FORGOT PASSWORD MODAL -------- */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-[380px] border border-white/5 shadow-2xl">
            <h2 className="text-2xl text-white font-bold mb-2">
              Reset Password
            </h2>
            <p className="text-slate-500 text-sm mb-6 font-medium">Enter your credentials to update your password.</p>

            <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Registered Email"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
                  value={fpEmail}
                  onChange={(e) => setFpEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Old Password"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
            </div>

            {fpMsg && (
              <p className={`text-sm text-center mt-4 font-bold ${fpMsg.includes("successful") ? 'text-emerald-400' : 'text-blue-400'}`}>
                {fpMsg}
              </p>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleResetPassword}
                className="flex-1 bg-blue-600 hover:bg-blue-500 p-3 rounded-xl text-white font-bold transition-all shadow-lg shadow-blue-900/20"
              >
                Reset
              </button>
              <button
                onClick={() => setShowForgot(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 p-3 rounded-xl text-slate-300 font-bold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}