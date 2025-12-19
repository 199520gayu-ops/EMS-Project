import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [newPass, setNewPass] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("authUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleChangePassword = () => {
    const updatedUsers = users.map((u) =>
      u.id === user.id
        ? { ...u, password: newPass, mustChangePassword: false }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem(
      "authUser",
      JSON.stringify({ ...user, password: newPass, mustChangePassword: false })
    );

    // Redirect based on role
    if (user.role === "admin") navigate("/admin/dashboard");
    if (user.role === "hr") navigate("/hr/dashboard");
    if (user.role === "manager") navigate("/manager/dashboard");
    if (user.role === "employee") navigate("/employee/dashboard");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Change Password</h2>

      <input
        placeholder="New Password"
        type="password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />

      <button onClick={handleChangePassword}>Update</button>
    </div>
  );
}




