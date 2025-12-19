import Layout from "../components/Layout";
import React, { useState } from "react";


export default function HolidayShiftModule() {
  const [holidays, setHolidays] = useState(() => {
    return JSON.parse(localStorage.getItem("holidays")) || [];
  });

  const [shifts, setShifts] = useState(() => {
    return JSON.parse(localStorage.getItem("shifts")) || [];
  });

  const [holiday, setHoliday] = useState({ date: "", name: "" });
  const [shift, setShift] = useState({ employeeId: "", shiftTime: "" });

  const addHoliday = () => {
    const updated = [...holidays, { ...holiday, id: Date.now() }];
    setHolidays(updated);
    localStorage.setItem("holidays", JSON.stringify(updated));
    setHoliday({ date: "", name: "" });
  };

  const addShift = () => {
    const updated = [...shifts, { ...shift, id: Date.now() }];
    setShifts(updated);
    localStorage.setItem("shifts", JSON.stringify(updated));
    setShift({ employeeId: "", shiftTime: "" });
  };

  return (
    <Layout>
    <div className="p-6">
      <h1 className="text-xl font-bold">Holiday & Shift Scheduling</h1>

      {/* Holiday Form */}
      <div className="bg-white shadow p-4 rounded mt-4 space-y-3">
        <h2 className="font-semibold">Add Holiday</h2>

        <input
          type="date"
          className="border p-2 w-full"
          value={holiday.date}
          onChange={(e) => setHoliday({ ...holiday, date: e.target.value })}
        />

        <input
          type="text"
          placeholder="Holiday Name"
          className="border p-2 w-full"
          value={holiday.name}
          onChange={(e) => setHoliday({ ...holiday, name: e.target.value })}
        />

        <button onClick={addHoliday} className="bg-purple-600 text-white p-2 rounded w-full">
          Add Holiday
        </button>
      </div>

      {/* Holidays List */}
      <h3 className="font-semibold mt-6">Holiday List</h3>
      <ul className="list-disc ml-6">
        {holidays.map((h) => (
          <li key={h.id}>
            {h.date} - {h.name}
          </li>
        ))}
      </ul>

      {/* Shift Form */}
      <div className="bg-white shadow p-4 rounded mt-8 space-y-3">
        <h2 className="font-semibold">Assign Shift</h2>

        <input
          type="text"
          placeholder="Employee ID"
          className="border p-2 w-full"
          value={shift.employeeId}
          onChange={(e) => setShift({ ...shift, employeeId: e.target.value })}
        />

        <input
          type="text"
          placeholder="Shift Time (e.g., 9 AM - 5 PM)"
          className="border p-2 w-full"
          value={shift.shiftTime}
          onChange={(e) => setShift({ ...shift, shiftTime: e.target.value })}
        />

        <button onClick={addShift} className="bg-blue-600 text-white p-2 rounded w-full">
          Assign Shift
        </button>
      </div>

      {/* Shift List */}
      <h3 className="font-semibold mt-6">Shift Assignments</h3>
      <ul className="list-disc ml-6">
        {shifts.map((s) => (
          <li key={s.id}>
            {s.employeeId} — {s.shiftTime}
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  );
}
