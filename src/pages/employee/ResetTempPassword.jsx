import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const logged = JSON.parse(localStorage.getItem("ems_logged_in"));

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  if (!logged) return navigate("/login");

  const handleReset = (e) => {
    e.preventDefault();

    if (!newPass || !confirmPass) {
      setError("All fields are required");
      return;
    }

    if (newPass !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    // UPDATE USER IN LOCAL STORAGE
    const users = JSON.parse(localStorage.getItem("ems_users")) || [];
    const updated = users.map((u) =>
      u.email === logged.email
        ? { ...u, password: newPass, isTempPassword: false }
        : u
    );

    localStorage.setItem("ems_users", JSON.stringify(updated));

    // UPDATE LOGGED USER
    localStorage.setItem(
      "ems_logged_in",
      JSON.stringify({
        ...logged,
        password: newPass,
        isTempPassword: false,
      })
    );

    navigate(`/${logged.role.toLowerCase()}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Reset Password</h2>

        {error && (
          <div className="bg-red-600 text-white p-2 rounded mb-3">{error}</div>
        )}

        <form className="space-y-4" onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
}

