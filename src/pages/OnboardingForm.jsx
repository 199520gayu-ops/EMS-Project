import React, { useState } from "react";
import Layout from "../components/Layout";

const OnboardingForm = () => {
   const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    joiningDate: "",
    resume: null,
  });

  const [empId, setEmpId] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setEmployee({ ...employee, resume: e.target.files[0] });
    } else {
      setEmployee({ ...employee, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send file + data
    const formData = new FormData();
    Object.keys(employee).forEach((key) => {
      formData.append(key, employee[key]);
    });

    const response = await fetch("http://localhost:5000/api/onboard", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setEmpId(data.employeeId);
    alert(`Employee Added! Employee ID: ${data.employeeId}`);

    setEmployee({
      fullName: "",
      email: "",
      phone: "",
      department: "",
      role: "",
      joiningDate: "",
      resume: null,
    });
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100 p-6 mx-60">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Add New Employee
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl bg-white p-6 rounded-xl shadow"
      >
        <label className="block font-medium mt-3">Full Name</label>
        <input
          type="text"
          name="fullName"
          className="w-full border px-3 mt-2 py-2 rounded-4xl"
          value={employee.fullName}
          onChange={handleChange}
          required
        />

        <label className="block font-medium mt-3">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border px-3 py-2 mt-2 rounded-4xl"
          value={employee.email}
          onChange={handleChange}
          required
        />

        <label className="block font-medium mt-3">Phone</label>
        <input
          type="tel"
          name="phone"
          className="w-full border px-3 py-2 mt-2 rounded-4xl"
          value={employee.phone}
          onChange={handleChange}
          required
        />

        <label className="block font-medium mt-3">Department</label>
        <select
          name="department"
          className="w-full border px-3 py-2 mt-4 rounded-4xl"
          value={employee.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Developer">Developer</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        

        <label className="block font-medium mt-4">Joining Date</label>
        <input
          type="date"
          name="joiningDate"
          className="w-full border px-3 py-2 mt-2 rounded-4xl"
          value={employee.joiningDate}
          onChange={handleChange}
          required
        />

        <label className="block font-medium mt-3">Upload Resume</label>
        <input
          type="file"
          name="resume"
          className="w-full px-3 py-2 mt-3 border rounded-4xl"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-4xl mx-35 mt-5 hover:bg-blue-700"
        >
          Add Employee
        </button>

        {empId && (
          <p className="mt-4 text-green-600">
            ✔ Employee ID Generated: {empId}
          </p>
        )}
      </form>
    </div>
    </Layout>
  );
};

export default OnboardingForm;