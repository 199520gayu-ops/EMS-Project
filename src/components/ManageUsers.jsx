import React, { useEffect, useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [editUser, setEditUser] = useState(null);

  // ---------------------------------------------------
  // LOAD / SEED USERS
  // ---------------------------------------------------
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ems_users"));

    if (!stored || stored.length === 0) {
      const demoUsers = [
        {
          name: "Admin User",
          email: "admin@ems.com",
          role: "Admin",
          department: "Management",
          designation: "System Administrator",
          phone: "9999999999",
          joiningDate: "2023-01-01",
          isTempPassword: false,
        },
        {
          name: "Anjali Singh",
          email: "anjali@ems.com",
          role: "Manager",
          department: "HR",
          designation: "HR Manager",
          phone: "9876543210",
          joiningDate: "2023-06-15",
          isTempPassword: false,
        },
        {
          name: "Rahul Verma",
          email: "rahul@ems.com",
          role: "Employee",
          department: "Engineering",
          designation: "Frontend Developer",
          phone: "9876543222",
          joiningDate: "2024-02-01",
          isTempPassword: true,
        },
      ];

      localStorage.setItem("ems_users", JSON.stringify(demoUsers));
      setUsers(demoUsers);
    } else {
      setUsers(stored);
    }
  }, []);

  // ---------------------------------------------------
  // DELETE USER
  // ---------------------------------------------------
  const handleDelete = (email) => {
    const updated = users.filter((u) => u.email !== email);
    setUsers(updated);
    localStorage.setItem("ems_users", JSON.stringify(updated));
  };

  // ---------------------------------------------------
  // SAVE EDIT
  // ---------------------------------------------------
  const handleSaveEdit = () => {
    const updated = users.map((u) =>
      u.email === editUser.email ? editUser : u
    );

    setUsers(updated);
    localStorage.setItem("ems_users", JSON.stringify(updated));
    setEditUser(null);
  };

  // ---------------------------------------------------
  // FILTER USERS
  // ---------------------------------------------------
  const filteredUsers = users.filter((user) => {
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    const role = user.role || "";

    const matchesSearch =
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase());

    const matchesRole =
      filterRole === "All" || role === filterRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-8 font-sans selection:bg-blue-500/30">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">
            Directory <span className="text-blue-600">Access</span>
          </h1>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Manage Personnel Data</p>
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search credentials..."
            className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-200 placeholder-slate-700 focus:outline-none focus:border-blue-600/50 transition-all text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 focus:outline-none focus:border-blue-600/50 cursor-pointer appearance-none text-sm transition-all"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="All" className="bg-[#020617]">All Designations</option>
            <option value="Admin" className="bg-[#020617]">Admin</option>
            <option value="Manager" className="bg-[#020617]">Manager</option>
            <option value="Employee" className="bg-[#020617]">Employee</option>
          </select>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white/[0.01] border border-white/5 p-8 rounded-[2rem] relative overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em]">
                <th className="px-4 py-4">Identity</th>
                <th className="px-4">System Email</th>
                <th className="px-4">Role</th>
                <th className="px-4">Department</th>
                <th className="px-4">Phone</th>
                <th className="px-4 text-center">Security</th>
                <th className="px-4 text-right">Operations</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-12 text-slate-700 text-[10px] font-black uppercase tracking-widest italic">
                    No matching records found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="group bg-[#020617] hover:bg-white/[0.02] transition-all duration-200 border border-white/5"
                  >
                    <td className="px-4 py-5 rounded-l-xl border-y border-l border-white/5">
                      <div className="font-bold text-slate-300 group-hover:text-blue-500 transition-colors text-sm">{user.name}</div>
                      <div className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">{user.designation}</div>
                    </td>
                    <td className="px-4 text-xs font-mono text-slate-500 border-y border-white/5">{user.email}</td>
                    <td className="px-4 border-y border-white/5">
                      <span className="px-2 py-1 bg-slate-900 rounded text-slate-400 border border-white/5 text-[9px] font-black uppercase">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 text-xs text-slate-500 border-y border-white/5">{user.department}</td>
                    <td className="px-4 text-xs font-mono text-slate-600 border-y border-white/5 italic">{user.phone}</td>
                    <td className="px-4 text-center border-y border-white/5">
                      {user.isTempPassword ? (
                        <span className="bg-amber-500/5 text-amber-600 border border-amber-500/10 px-3 py-1 rounded-md text-[9px] font-black uppercase">
                          Temp Key
                        </span>
                      ) : (
                        <span className="bg-emerald-500/5 text-emerald-600 border border-emerald-500/10 px-3 py-1 rounded-md text-[9px] font-black uppercase">
                          Verified
                        </span>
                      )}
                    </td>
                    <td className="px-4 text-right rounded-r-xl border-y border-r border-white/5">
                      <div className="flex justify-end gap-2">
                        <button
                          className="px-3 py-1.5 hover:bg-blue-600/10 text-blue-500 rounded-lg transition-all border border-transparent hover:border-blue-500/20 font-bold text-[10px] uppercase"
                          onClick={() => setEditUser({ ...user })}
                        >
                          Modify
                        </button>
                        <button
                          className="px-3 py-1.5 hover:bg-red-600/10 text-red-500 rounded-lg transition-all border border-transparent hover:border-red-500/20 font-bold text-[10px] uppercase"
                          onClick={() => handleDelete(user.email)}
                        >
                          Erase
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editUser && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#020617] border border-white/10 p-10 rounded-[2rem] w-full max-w-lg">
            <h2 className="text-3xl font-black text-white mb-8 tracking-tighter">Update <span className="text-blue-600">Node</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-slate-600 uppercase ml-1">Identity Name</label>
                <input
                  className="w-full p-3 rounded-xl bg-white/[0.02] border border-white/5 focus:outline-none focus:border-blue-600/50 text-slate-200 text-sm transition-all"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-slate-600 uppercase ml-1">Authorization</label>
                <select
                  className="w-full p-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 text-sm focus:outline-none"
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
                  }
                >
                  <option className="bg-[#020617]">Admin</option>
                  <option className="bg-[#020617]">Manager</option>
                  <option className="bg-[#020617]">Employee</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-slate-600 uppercase ml-1">Sector</label>
                <input
                  className="w-full p-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-200 text-sm"
                  value={editUser.department}
                  onChange={(e) =>
                    setEditUser({ ...editUser, department: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-slate-600 uppercase ml-1">Security Protocol</label>
                <select
                  className="w-full p-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 text-sm focus:outline-none"
                  value={editUser.isTempPassword ? "temp" : "active"}
                  onChange={(e) =>
                    setEditUser({
                      ...editUser,
                      isTempPassword: e.target.value === "temp",
                    })
                  }
                >
                  <option value="active" className="bg-[#020617]">Verified Access</option>
                  <option value="temp" className="bg-[#020617]">Temp Credentials</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-10">
              <button
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-500 font-bold text-[10px] uppercase transition-all"
                onClick={() => setEditUser(null)}
              >
                Cancel
              </button>
              <button
                className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-white/10"
                onClick={handleSaveEdit}
              >
                Save Protocol
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}