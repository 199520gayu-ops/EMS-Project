import React, { useEffect, useState } from "react";
import { User, KeyRound, Briefcase, Calendar, Phone, MapPin, Mail } from "lucide-react";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

  // Basic Info
  const [name, setName] = useState(storedUser.name || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [role] = useState(storedUser.role || "Employee");
  
  // New Employee Details
  const [designation, setDesignation] = useState(storedUser.designation || "Software Engineer");
  const [department, setDepartment] = useState(storedUser.department || "IT Department");
  const [phone, setPhone] = useState(storedUser.phone || "");
  const [address, setAddress] = useState(storedUser.address || "");
  const [joiningDate] = useState(storedUser.joiningDate || "2023-01-15");

  const [avatar, setAvatar] = useState(null);

  // Password fields
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  useEffect(() => {
    const avKey = `avatar_${email || "guest"}`;
    const saved = localStorage.getItem(avKey);
    if (saved) setAvatar(saved);
  }, [email]);

  const saveProfile = () => {
    if (!email) {
      alert("Email is required.");
      return;
    }

    const updated = { 
      ...storedUser, 
      name, email, role, 
      designation, department, phone, address 
    };
    
    localStorage.setItem("loggedUser", JSON.stringify(updated));

    // Update user in global users list
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex((u) => u.email === storedUser.email);

    if (idx > -1) {
      users[idx] = { ...users[idx], ...updated };
      localStorage.setItem("users", JSON.stringify(users));
    }

    alert("Profile details updated successfully!");
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      localStorage.setItem(`avatar_${email}`, data);
      setAvatar(data);
    };
    reader.readAsDataURL(f);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white">Employee Profile</h2>
          <p className="text-slate-500 text-sm">Manage your professional information and security.</p>
        </div>
        <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{role}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Avatar & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden mb-4">
                {avatar ? (
                  <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-slate-600" />
                )}
              </div>
              <label className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-xl cursor-pointer hover:scale-110 transition-transform shadow-xl">
                <Briefcase size={16} className="text-white" />
                <input type="file" className="hidden" onChange={onFileChange} />
              </label>
            </div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-blue-400 text-sm font-medium">{designation}</p>
            <div className="mt-6 w-full pt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Calendar size={16} /> <span>Joined {joiningDate}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail size={16} /> <span>{email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Briefcase size={20} className="text-blue-500" /> Personal Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" value={name} onChange={setName} icon={<User size={16}/>} />
              <InputField label="Email Address" value={email} onChange={setEmail} icon={<Mail size={16}/>} />
              <InputField label="Designation" value={designation} onChange={setDesignation} icon={<Briefcase size={16}/>} />
              <InputField label="Department" value={department} onChange={setDepartment} icon={<MapPin size={16}/>} />
              <InputField label="Phone Number" value={phone} onChange={setPhone} icon={<Phone size={16}/>} />
              <InputField label="Office Address" value={address} onChange={setAddress} icon={<MapPin size={16}/>} />
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={saveProfile} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-2xl transition-all">
                Update Profile
              </button>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <KeyRound size={20} className="text-yellow-500" /> Security
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Old Password" type="password" value={oldPass} onChange={setOldPass} />
              <InputField label="New Password" type="password" value={newPass} onChange={setNewPass} />
              <InputField label="Confirm" type="password" value={confirmPass} onChange={setConfirmPass} />
            </div>
            <button className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-2xl transition-all border border-slate-700">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Inputs
function InputField({ label, value, onChange, type = "text", icon }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 ${icon ? 'pl-12' : 'px-4'} pr-4 text-white focus:border-blue-500/50 focus:ring-0 transition-all outline-none text-sm font-medium`}
        />
      </div>
    </div>
  );
}
