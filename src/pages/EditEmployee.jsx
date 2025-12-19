import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    position: "",
    systemRole: "",
  });

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const emp = employees.find((e) => e.id === parseInt(id));

    if (emp) {
      setForm(emp);
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const updated = employees.map((e) =>
      e.id === parseInt(id) ? form : e
    );

    localStorage.setItem("employees", JSON.stringify(updated));

    alert("Employee Updated");
    navigate("/employee-list");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} className="border p-2 rounded" />
            <input name="email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="phone" value={form.phone} onChange={handleChange} className="border p-2 rounded" />
            <input name="address" value={form.address} onChange={handleChange} className="border p-2 rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="department" value={form.department} onChange={handleChange} className="border p-2 rounded" />
            <input name="position" value={form.position} onChange={handleChange} className="border p-2 rounded" />
          </div>

          <select name="systemRole" value={form.systemRole} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="HR">HR</option>
          </select>

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Update Employee
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditEmployee;
