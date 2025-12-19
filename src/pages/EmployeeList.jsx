import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem("employees")) || []);
  }, []);

  const deleteEmployee = (id) => {
    const updated = employees.filter((emp) => emp.id !== id);
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
    alert("Employee deleted");
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
          <p className="text-gray-500 text-sm">Manage and view employee profiles</p>
        </div>

        <Link
          to="/add-employee"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          + Add Employee
        </Link>
      </div>

      {/* Employee Table */}
      <div className="bg-white border shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase border-b">
            <tr>
              <th className="p-4">Employee</th>
              <th className="p-4">Department</th>
              <th className="p-4">Role</th>
              <th className="p-4">System Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Employee Name + Avatar */}
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${emp.name}&background=0D8ABC&color=fff`}
                      className="w-10 h-10 rounded-full"
                      alt="avatar"
                    />
                    <div>
                      <div className="font-semibold">{emp.name}</div>
                      <div className="text-sm text-gray-500">{emp.email}</div>
                      <div className="text-xs text-gray-400">{emp.phone}</div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {emp.department}
                    </span>
                  </td>

                  {/* Job Role */}
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      {emp.position}
                    </span>
                  </td>

                  {/* System Role */}
                  <td className="p-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      {emp.systemRole}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-center flex justify-center gap-4">
                    <Link
                      to={`/edit-employee/${emp.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteEmployee(emp.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default EmployeeList;

