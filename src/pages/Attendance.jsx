import React, { useState, useEffect } from "react";
import { Calendar, Clock, Check, X } from "lucide-react";

export default function Attendance() {
  const [records, setRecords] = useState([]);

  // Dummy static data — replace with API later
  useEffect(() => {
    const dummy = [
      { date: "2025-12-01", checkIn: "09:05 AM", checkOut: "06:01 PM", status: "Present" },
      { date: "2025-12-02", checkIn: "09:45 AM", checkOut: "06:10 PM", status: "Late" },
      { date: "2025-12-03", checkIn: null, checkOut: null, status: "Absent" },
    ];
    setRecords(dummy);
  }, []);

  return (
    <div className="text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Attendance</h2>

        <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
          <Calendar className="text-blue-400" />
          <span>Monthly Records</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-300 border-b border-slate-700">
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Check In</th>
              <th className="py-3 px-2">Check Out</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((row, i) => (
              <tr key={i} className="border-b border-slate-700 hover:bg-slate-700/40 transition">
                <td className="py-3 px-2">{row.date}</td>
                <td className="py-3 px-2">{row.checkIn || "--"}</td>
                <td className="py-3 px-2">{row.checkOut || "--"}</td>
                <td className="py-3 px-2">
                  {row.status === "Present" && (
                    <span className="text-green-400 flex items-center gap-1"><Check size={16}/> Present</span>
                  )}

                  {row.status === "Late" && (
                    <span className="text-yellow-400 flex items-center gap-1"><Clock size={16}/> Late</span>
                  )}

                  {row.status === "Absent" && (
                    <span className="text-red-400 flex items-center gap-1"><X size={16}/> Absent</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
