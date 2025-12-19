import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { Bell, Settings, Search } from "lucide-react";

export default function Navbar({ user }) {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const doLogout = () => {
    dispatch(logout());
    nav("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">

      {/* LEFT SIDE - LOGO + MENU ICON */}
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 bg-gray-100 rounded-lg">
          <span className="text-gray-700 text-xl">&#9776;</span>
        </button>

        {/* Branding */}
        <Link to="/dashboard" className="text-xl font-bold text-[#0C1A33] tracking-wide">
          XCELTECH
        </Link>
      </div>

      {/* CENTER - SEARCH BAR */}
      <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg w-full max-w-xl shadow-inner">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-transparent ml-3 w-full text-gray-700"
        />
      </div>

      {/* RIGHT SIDE - ICONS + USER */}
      <div className="flex items-center gap-6">

        <Bell className="text-gray-600 cursor-pointer hover:text-black" size={22} />
        <Settings className="text-gray-600 cursor-pointer hover:text-black" size={22} />

        {/* Profile */}
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-10 h-10 rounded-full border shadow-sm"
          />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={doLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
