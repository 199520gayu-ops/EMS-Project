import React, { useState } from "react";
import { useTheme } from "./ThemeContext"; // Ensure path is correct

export default function EmployeesList() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");

  const employees = [
    { id: 1, name: "Gayathri", email: "gayathri@ems.com", role: "Employee", dept: "IT", phone: "9876543210", joiningDate: "2023-08-12", status: "Active" },
    { id: 2, name: "Rohit", email: "rohit@ems.com", role: "Manager", dept: "HR", phone: "9876543221", joiningDate: "2022-05-20", status: "Active" },
    { id: 3, name: "Anjali", email: "anjali@ems.com", role: "HR", dept: "Human Resources", phone: "9876543233", joiningDate: "2023-02-10", status: "Inactive" },
    { id: 4, name: "Rahul", email: "rahul@ems.com", role: "Employee", dept: "Engineering", phone: "9876543244", joiningDate: "2024-01-05", status: "Active" },
  ];

  const filteredEmployees = employees.filter((e) => {
    const query = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(query) ||
      e.email.toLowerCase().includes(query) ||
      e.role.toLowerCase().includes(query) ||
      e.dept.toLowerCase().includes(query)
    );
  });

  return (
    <div className={`min-h-screen p-4 md:p-10 transition-colors duration-500 font-sans ${
      isDark ? "bg-[#020617] text-slate-200" : "bg-slate-50 text-slate-800"
    }`}>
      <div className={`max-w-7xl mx-auto border rounded-[2.5rem] p-6 md:p-10 transition-all duration-500 ${
        isDark 
          ? "bg-slate-900/40 border-slate-800 shadow-2xl backdrop-blur-md" 
          : "bg-white border-slate-200 shadow-xl"
      }`}>
        
        {/* HEADER + SEARCH */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">
          <div>
            <h2 className={`text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Employee <span className="text-cyan-500">Directory</span>
            </h2>
            <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-semibold">
              Total Records: {filteredEmployees.length}
            </p>
          </div>

          <div className="relative group">
            <input
              type="text"
              placeholder="Search directory..."
              className={`w-full md:w-96 px-5 py-3 rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                isDark 
                  ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-600" 
                  : "bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400"
              }`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={`absolute right-4 top-3.5 transition-colors ${
              isDark ? "text-slate-600 group-focus-within:text-cyan-500" : "text-slate-400 group-focus-within:text-cyan-600"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className={`overflow-x-auto rounded-3xl border transition-colors duration-500 ${
          isDark ? "border-slate-800 bg-slate-950/50" : "border-slate-200 bg-slate-50/50"
        }`}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-xs uppercase tracking-[0.15em] border-b ${
                isDark ? "text-slate-500 border-slate-800" : "text-slate-400 border-slate-200"
              }`}>
                <th className="p-6 font-bold">Name</th>
                <th className="p-6 font-bold">Email</th>
                <th className="p-6 font-bold">Role</th>
                <th className="p-6 font-bold">Department</th>
                <th className="p-6 font-bold text-center">Status</th>
              </tr>
            </thead>

            <tbody className={`divide-y ${isDark ? "divide-slate-800/50" : "divide-slate-200"}`}>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-20 text-slate-500 italic">
                    No records found matching your search.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((e) => (
                  <tr
                    key={e.id}
                    className={`group transition-all duration-200 ${
                      isDark ? "hover:bg-cyan-500/5" : "hover:bg-cyan-50"
                    }`}
                  >
                    <td className="p-6">
                        <div className={`font-bold transition-colors ${
                          isDark ? "text-white group-hover:text-cyan-400" : "text-slate-900 group-hover:text-cyan-600"
                        }`}>{e.name}</div>
                        <div className={`text-[10px] font-mono mt-1 ${isDark ? "text-slate-600" : "text-slate-400"}`}>{e.joiningDate}</div>
                    </td>
                    <td className={`p-6 font-mono text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>{e.email}</td>
                    <td className="p-6">
                        <span className={`text-sm px-3 py-1 border rounded-lg transition-colors ${
                          isDark 
                            ? "bg-slate-900 border-slate-800 text-slate-300" 
                            : "bg-white border-slate-200 text-slate-600"
                        }`}>
                            {e.role}
                        </span>
                    </td>
                    <td className={`p-6 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>{e.dept}</td>
                    <td className="p-6 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                          e.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          e.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                        }`}></span>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

