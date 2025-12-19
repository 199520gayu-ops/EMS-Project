import React, { useState } from "react";
import Layout from "../components/Layout";

export default function HROnboardingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    systemRole: "Employee",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push({ ...form, id: Date.now() });
    localStorage.setItem("employees", JSON.stringify(employees));
    alert("Employee Created Successfully");
  };

  return (
    <Layout>
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Onboard New Employee</h2>
      <p className="text-sm text-gray-500 mb-6">Fill the employee details below.</p>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label className="text-sm text-gray-700">Full Name</label>
          <input
            name="name"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mt-1"
            placeholder="Employee Name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-700">Email</label>
          <input
            name="email"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mt-1"
            placeholder="Email address"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm text-gray-700">Phone Number</label>
          <input
            name="phone"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mt-1"
            placeholder="Phone No"
          />
        </div>

        {/* Department */}
        <div>
          <label className="text-sm text-gray-700">Department</label>
          <input
            name="department"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mt-1"
            placeholder="Marketing / HR / Tech etc."
          />
        </div>

        {/* Job Role */}
        <div>
          <label className="text-sm text-gray-700">Job Role</label>
          <input
            name="position"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mt-1"
            placeholder="Role / Job Title"
          />
        </div>

        {/* System Role */}
        <div>
          <label className="text-sm text-gray-700">System Role</label>
          <select
            name="systemRole"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-700">Temporary Password</label>
          <input
            name="password"
            onChange={handleChange}
            required
            type="password"
            className="w-full p-3 border rounded-lg mt-1"
            placeholder="Initial password"
          />
        </div>

        <div className="md:col-span-2">
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700">
            Create Employee
          </button>
        </div>
      </form>
    </div>
    </Layout>
  );
}
