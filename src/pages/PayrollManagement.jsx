// import React, { useState, useEffect } from "react";

// import Layout from "../components/Layout";

// export default function PayrollManagement() {
//   const [employees, setEmployees] = useState([]);
//   const [payroll, setPayroll] = useState({
//     employeeId: "",
//     month: "",
//     basic: "",
//     allowance: "",
//     deduction: "",
//   });

//   useEffect(() => {
//     const empData = JSON.parse(localStorage.getItem("employees")) || [];
//     setEmployees(empData);
//   }, []);

//   const handleChange = (e) => {
//     setPayroll({ ...payroll, [e.target.name]: e.target.value });
//   };

//   const calculateNet = () => {
//     return (
//       Number(payroll.basic || 0) +
//       Number(payroll.allowance || 0) -
//       Number(payroll.deduction || 0)
//     );
//   };

//   const savePayroll = () => {
//     if (!payroll.employeeId || !payroll.month) {
//       alert("Please fill all fields");
//       return;
//     }

//     const data = JSON.parse(localStorage.getItem("payrollRecords")) || [];

//     const newRecord = {
//       id: Date.now(),
//       ...payroll,
//       netSalary: calculateNet(),
//     };

//     data.push(newRecord);
//     localStorage.setItem("payrollRecords", JSON.stringify(data));

//     alert("Payroll saved successfully!");

//     setPayroll({
//       employeeId: "",
//       month: "",
//       basic: "",
//       allowance: "",
//       deduction: "",
//     });
//   };

//   return (
//     <Layout>
//       <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
//         <h2 className="text-2xl font-semibold mb-4">Payroll Management</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//           <select
//             name="employeeId"
//             value={payroll.employeeId}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="">Select Employee</option>
//             {employees.map((emp) => (
//               <option key={emp.id} value={emp.id}>
//                 {emp.name}
//               </option>
//             ))}
//           </select>

//           <input
//             type="month"
//             name="month"
//             value={payroll.month}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <input
//             type="number"
//             name="basic"
//             placeholder="Basic Salary"
//             value={payroll.basic}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <input
//             type="number"
//             name="allowance"
//             placeholder="Allowances"
//             value={payroll.allowance}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <input
//             type="number"
//             name="deduction"
//             placeholder="Deductions"
//             value={payroll.deduction}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="mt-4">
//           <p className="font-semibold">
//             Net Salary:{" "}
//             <span className="text-green-600">₹{calculateNet()}</span>
//           </p>
//         </div>

//         <button
//           onClick={savePayroll}
//           className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
//         >
//           Generate Payroll
//         </button>
//       </div>
//     </Layout>
//   );
// }


/*
PayrollModule - Full Payroll React Module
Single-file React module (export default) that implements a full-featured payroll system.

How to use:
1. Save this file as: src/pages/PayrollModule.jsx
2. Ensure Tailwind is available in your project.
3. Add route in App.jsx:
   import PayrollModule from "./pages/PayrollModule";
   <Route path="/payroll" element={<PayrollModule />} />
4. Optional: pre-populate localStorage keys used by the module: "employees", "attendances".

Features included:
- Employee list (localStorage-backed) with add/edit/delete
- Attendance records (monthly) with add/edit
- Automatic salary computation (pro-rata based on attendance)
- Overtime, bonus, benefits management
- Deductions and simple progressive tax calculation
- Payroll records save/load (localStorage)
- Payslip generation (print-ready window)
- CSV export of payroll records
- Simple approval workflow (Pending -> Approved -> Rejected)
- Clear separation of small components (inside single file)

Notes:
- No external libraries required beyond React + Tailwind CSS.
- You can replace localStorage persistence with API calls easily.

*/

import React, { useEffect, useMemo, useState } from "react";


// ---------------------- Helper utilities ----------------------
const uid = () => String(Date.now()) + Math.floor(Math.random() * 9999);
const currency = (n) => Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });

// Simple annual progressive tax - tweak slabs as needed
function calculateAnnualTax(annualGross) {
  let tax = 0;
  const slabs = [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ];

  let prev = 0;
  let remaining = annualGross;

  for (const slab of slabs) {
    const slabAmt = Math.max(0, Math.min(remaining, slab.limit - prev));
    tax += slabAmt * slab.rate;
    remaining -= slabAmt;
    prev = slab.limit;
    if (remaining <= 0) break;
  }
  return Math.round(tax);
}

// localStorage helpers
const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (e) {
    return fallback;
  }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// ---------------------- Small UI components ----------------------
function Badge({ children, color = "gray" }) {
  const colors = {
    gray: "bg-gray-200 text-gray-800",
    green: "bg-green-200 text-green-800",
    red: "bg-red-200 text-red-800",
    blue: "bg-blue-200 text-blue-800",
  };
  return <span className={`px-2 py-1 rounded text-xs ${colors[color]}`}>{children}</span>;
}

function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-full rounded shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-600">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// ---------------------- Payroll Module ----------------------
export default function PayrollModule() {
  // data stores
  const [employees, setEmployees] = useState([]);
  const [attendances, setAttendances] = useState([]); // {id, employeeId, month, presentDays, totalDays}
  const [payrollRecords, setPayrollRecords] = useState([]);

  // UI state
  const [activeTab, setActiveTab] = useState("payroll"); // payroll | employees | attendance
  const [empForm, setEmpForm] = useState({ id: "", name: "", role: "", email: "" });
  const [empModalOpen, setEmpModalOpen] = useState(false);
  const [attForm, setAttForm] = useState({ id: "", employeeId: "", month: "", presentDays: "", totalDays: "" });
  const [attModalOpen, setAttModalOpen] = useState(false);
  const [payForm, setPayForm] = useState({
    employeeId: "",
    month: "",
    basic: "",
    allowance: "",
    bonus: "",
    overtimeHours: "",
    overtimeRate: "",
    benefits: "",
    otherDeductions: "",
  });
  const [payslipModal, setPayslipModal] = useState({ open: false, html: "" });

  // load initial data
  useEffect(() => {
    const e = load("employees", []);
    const a = load("attendances", []);
    const p = load("payrollRecords", []);

    // add sample data if empty
    if (!e.length) {
      const sample = [
        { id: "1", name: "Gayathri R", role: "Developer", email: "gayathri@example.com" },
        { id: "2", name: "Ravi K", role: "HR", email: "ravi@example.com" },
      ];
      setEmployees(sample);
      save("employees", sample);
    } else setEmployees(e);

    if (!a.length) {
      const now = new Date();
      const mm = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const sampleAtt = [
        { id: uid(), employeeId: "1", month: mm, presentDays: 22, totalDays: 26 },
        { id: uid(), employeeId: "2", month: mm, presentDays: 24, totalDays: 26 },
      ];
      setAttendances(sampleAtt);
      save("attendances", sampleAtt);
    } else setAttendances(a);

    setPayrollRecords(p);
  }, []);

  // ---------------------- Employee CRUD ----------------------
  function openEmpModal(edit = null) {
    if (edit) setEmpForm(edit);
    else setEmpForm({ id: "", name: "", role: "", email: "" });
    setEmpModalOpen(true);
  }
  function saveEmployee() {
    if (!empForm.name) return alert("Employee name required");
    let newList = [...employees];
    if (empForm.id) {
      newList = newList.map((e) => (e.id === empForm.id ? empForm : e));
    } else {
      const newEmp = { ...empForm, id: uid() };
      newList.push(newEmp);
    }
    setEmployees(newList);
    save("employees", newList);
    setEmpModalOpen(false);
  }
  function deleteEmployee(id) {
    if (!confirm("Delete employee?")) return;
    const newList = employees.filter((e) => e.id !== id);
    setEmployees(newList);
    save("employees", newList);
  }

  // ---------------------- Attendance CRUD ----------------------
  function openAttModal(edit = null) {
    if (edit) setAttForm(edit);
    else setAttForm({ id: "", employeeId: "", month: "", presentDays: "", totalDays: "" });
    setAttModalOpen(true);
  }
  function saveAttendance() {
    if (!attForm.employeeId || !attForm.month) return alert("Select employee & month");
    let newList = [...attendances];
    if (attForm.id) newList = newList.map((a) => (a.id === attForm.id ? attForm : a));
    else newList.push({ ...attForm, id: uid() });
    setAttendances(newList);
    save("attendances", newList);
    setAttModalOpen(false);
  }
  function deleteAttendance(id) {
    if (!confirm("Delete attendance record?")) return;
    const newList = attendances.filter((a) => a.id !== id);
    setAttendances(newList);
    save("attendances", newList);
  }

  // ---------------------- Payroll Calculation ----------------------
  // find attendance for selected employee+month
  const selectedAttendance = useMemo(() => {
    return attendances.find((a) => a.employeeId === payForm.employeeId && a.month === payForm.month) || null;
  }, [attendances, payForm.employeeId, payForm.month]);

  const calculation = useMemo(() => {
    const basic = Number(payForm.basic || 0);
    const allowance = Number(payForm.allowance || 0);
    const bonus = Number(payForm.bonus || 0);
    const overtimeHours = Number(payForm.overtimeHours || 0);
    const overtimeRate = Number(payForm.overtimeRate || 0);
    const benefits = Number(payForm.benefits || 0);
    const otherDeductions = Number(payForm.otherDeductions || 0);

    const presentDays = selectedAttendance ? Number(selectedAttendance.presentDays) : null;
    const totalDays = selectedAttendance ? Number(selectedAttendance.totalDays) : null;

    let prBasic = basic;
    let prAllowance = allowance;

    if (presentDays !== null && totalDays > 0) {
      const ratio = presentDays / totalDays;
      prBasic = Math.round(basic * ratio);
      prAllowance = Math.round(allowance * ratio);
    }

    const overtimePay = Math.round(overtimeHours * overtimeRate);
    const grossMonthly = prBasic + prAllowance + bonus + overtimePay + benefits;
    const annualGross = grossMonthly * 12;
    const annualTax = calculateAnnualTax(annualGross);
    const monthlyTax = Math.round(annualTax / 12);
    const totalDeductions = monthlyTax + otherDeductions;
    const netMonthly = Math.round(grossMonthly - totalDeductions);

    return { prBasic, prAllowance, overtimePay, grossMonthly, annualTax, monthlyTax, totalDeductions, netMonthly, presentDays, totalDays };
  }, [payForm, selectedAttendance]);

  // save payroll record
  function savePayroll() {
    if (!payForm.employeeId || !payForm.month) return alert("Select employee and month");
    const record = {
      id: uid(),
      employeeId: payForm.employeeId,
      month: payForm.month,
      inputs: { ...payForm },
      computed: { ...calculation },
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    const newList = [...payrollRecords, record];
    setPayrollRecords(newList);
    save("payrollRecords", newList);
    alert("Payroll saved (Pending approval)");
  }

  function changePayrollStatus(id, status) {
    const newList = payrollRecords.map((p) => (p.id === id ? { ...p, status } : p));
    setPayrollRecords(newList);
    save("payrollRecords", newList);
  }

  // generate payslip html and open new window
 function generatePayslip(recordInput) {
  const emp = employees.find((e) => e.id === recordInput.employeeId) || { name: "Unknown" };
  const r = recordInput;
  const c = r.computed;
  const html = `
    <html>
    <head>
      <title>Payslip - ${emp.name} - ${r.month}</title>
      <style>
        body{font-family:Arial;padding:20px}
        table{width:100%;border-collapse:collapse}
        th,td{padding:8px;border:1px solid #ddd}
        h2{margin-top:0}
      </style>
    </head>
    <body>
      <h2>Payslip</h2>
      <p><strong>Employee:</strong> ${emp.name} (${emp.role || ""})</p>
      <p><strong>Month:</strong> ${r.month}</p>
      <table>
        <tr><th>Earnings</th><th>Amount (₹)</th></tr>
        <tr><td>Pro-rated Basic</td><td style="text-align:right">${currency(c.prBasic)}</td></tr>
        <tr><td>Pro-rated Allowance</td><td style="text-align:right">${currency(c.prAllowance)}</td></tr>
        <tr><td>Overtime</td><td style="text-align:right">${currency(c.overtimePay)}</td></tr>
        <tr><td>Bonus</td><td style="text-align:right">${currency(Number(r.inputs.bonus))}</td></tr>
        <tr><td>Benefits</td><td style="text-align:right">${currency(Number(r.inputs.benefits))}</td></tr>
        <tr><th>Total Earnings</th><th style="text-align:right">${currency(c.grossMonthly)}</th></tr>
      </table>
      <br/>
      <table>
        <tr><th>Deductions</th><th>Amount (₹)</th></tr>
        <tr><td>Tax (monthly)</td><td style="text-align:right">${currency(c.monthlyTax)}</td></tr>
        <tr><td>Other Deductions</td><td style="text-align:right">${currency(Number(r.inputs.otherDeductions))}</td></tr>
        <tr><th>Total Deductions</th><th style="text-align:right">${currency(c.totalDeductions)}</th></tr>
      </table>
      <h3>Net Pay: ₹${currency(c.netMonthly)}</h3>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <script>window.onload = ()=> setTimeout(()=>window.print(),300);</script>
    </body>
    </html>
  `;

  // open a plain popup (do NOT set noopener/noreferrer) so we can write into it
  const w = window.open("", "_blank");
  if (!w) return alert("Popup blocked - allow popups to view payslip");
  // focus & write synchronously while still in user click handler
  w.document.open();
  w.document.write(html);
  w.document.close();
  try { w.focus(); } catch (e) {}
}

  // CSV export
  function exportPayrollCSV() {
    if (!payrollRecords.length) return alert("No payroll records to export");
    const headers = ["id", "employee", "month", "grossMonthly", "totalDeductions", "netMonthly", "status", "createdAt"];
    const rows = payrollRecords.map((r) => {
      const emp = employees.find((e) => e.id === r.employeeId) || { name: "" };
      return [r.id, emp.name, r.month, r.computed.grossMonthly, r.computed.totalDeductions, r.computed.netMonthly, r.status, r.createdAt];
    });
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payroll_export_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ---------------------- Rendering ----------------------
  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Payroll Module</h1>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab("payroll")} className={`px-4 py-2 rounded ${activeTab==="payroll"?"bg-blue-600 text-white":"bg-gray-100"}`}>Payroll</button>
          <button onClick={() => setActiveTab("employees")} className={`px-4 py-2 rounded ${activeTab==="employees"?"bg-blue-600 text-white":"bg-gray-100"}`}>Employees</button>
          <button onClick={() => setActiveTab("attendance")} className={`px-4 py-2 rounded ${activeTab==="attendance"?"bg-blue-600 text-white":"bg-gray-100"}`}>Attendance</button>
          <button onClick={exportPayrollCSV} className="ml-auto px-3 py-2 bg-gray-800 text-white rounded">Export CSV</button>
        </div>

        {/* ------------- PAYROLL TAB ------------- */}
        {activeTab === "payroll" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Generate Payroll</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select name="employeeId" value={payForm.employeeId} onChange={(e)=> setPayForm({...payForm, employeeId: e.target.value})} className="border p-2 rounded">
                <option value="">Select Employee</option>
                {employees.map((e) => <option key={e.id} value={e.id}>{e.name} — {e.role}</option>)}
              </select>

              <input type="month" name="month" value={payForm.month} onChange={(e)=> setPayForm({...payForm, month: e.target.value})} className="border p-2 rounded" />

              <input type="number" name="basic" placeholder="Basic (₹)" value={payForm.basic} onChange={(e)=> setPayForm({...payForm, basic: e.target.value})} className="border p-2 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <input type="number" name="allowance" placeholder="Allowance (₹)" value={payForm.allowance} onChange={(e)=> setPayForm({...payForm, allowance: e.target.value})} className="border p-2 rounded" />
              <input type="number" name="bonus" placeholder="Bonus (₹)" value={payForm.bonus} onChange={(e)=> setPayForm({...payForm, bonus: e.target.value})} className="border p-2 rounded" />
              <input type="number" name="benefits" placeholder="Benefits (₹)" value={payForm.benefits} onChange={(e)=> setPayForm({...payForm, benefits: e.target.value})} className="border p-2 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <input type="number" name="overtimeHours" placeholder="OT Hours" value={payForm.overtimeHours} onChange={(e)=> setPayForm({...payForm, overtimeHours: e.target.value})} className="border p-2 rounded" />
              <input type="number" name="overtimeRate" placeholder="OT Rate (₹/hr)" value={payForm.overtimeRate} onChange={(e)=> setPayForm({...payForm, overtimeRate: e.target.value})} className="border p-2 rounded" />
              <input type="number" name="otherDeductions" placeholder="Other Deductions" value={payForm.otherDeductions} onChange={(e)=> setPayForm({...payForm, otherDeductions: e.target.value})} className="border p-2 rounded" />
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded">
              <h3 className="font-semibold">Computation Preview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div>
                  <p>Pro-rated Basic: ₹{currency(calculation.prBasic)}</p>
                  <p>Pro-rated Allowance: ₹{currency(calculation.prAllowance)}</p>
                  <p>Overtime Pay: ₹{currency(calculation.overtimePay)}</p>
                  <p>Bonus: ₹{currency(Number(payForm.bonus || 0))}</p>
                  <p>Benefits: ₹{currency(Number(payForm.benefits || 0))}</p>
                </div>
                <div>
                  <p>Gross Monthly: ₹{currency(calculation.grossMonthly)}</p>
                  <p>Monthly Tax (est): ₹{currency(calculation.monthlyTax)}</p>
                  <p>Other Deductions: ₹{currency(Number(payForm.otherDeductions || 0))}</p>
                  <p className="font-semibold mt-2">Net Pay: ₹{currency(calculation.netMonthly)}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={savePayroll} className="bg-green-600 text-white px-4 py-2 rounded">Save Payroll</button>
              <button onClick={()=>{ if(!payForm.employeeId || !payForm.month) return alert('Select employee & month'); const record = { id: 'preview', employeeId: payForm.employeeId, month: payForm.month, inputs: {...payForm}, computed: calculation }; generatePayslip(record); }} className="bg-blue-600 text-white px-4 py-2 rounded">Generate Payslip (Preview)</button>
            </div>

            {/* Payroll records list */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Saved Payrolls</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left">
                      <th className="p-2">Employee</th>
                      <th className="p-2">Month</th>
                      <th className="p-2">Gross</th>
                      <th className="p-2">Net</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollRecords.map((r) => {
                      const emp = employees.find((e) => e.id === r.employeeId) || { name: "-" };
                      return (
                        <tr key={r.id} className="border-t">
                          <td className="p-2">{emp.name}</td>
                          <td className="p-2">{r.month}</td>
                          <td className="p-2">₹{currency(r.computed.grossMonthly)}</td>
                          <td className="p-2">₹{currency(r.computed.netMonthly)}</td>
                          <td className="p-2"><Badge color={r.status==='Approved'? 'green' : r.status==='Rejected' ? 'red' : 'blue'}>{r.status}</Badge></td>
                          <td className="p-2 flex gap-2">
                            <button onClick={()=> generatePayslip(r)} className="px-2 py-1 bg-gray-200 rounded">Payslip</button>
                            <button onClick={()=> changePayrollStatus(r.id, 'Approved')} className="px-2 py-1 bg-green-200 rounded">Approve</button>
                            <button onClick={()=> changePayrollStatus(r.id, 'Rejected')} className="px-2 py-1 bg-red-200 rounded">Reject</button>
                          </td>
                        </tr>
                      );
                    })}
                    {!payrollRecords.length && <tr><td colSpan={6} className="p-4 text-center text-gray-500">No payrolls yet</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------- EMPLOYEES TAB ------------- */}
        {activeTab === "employees" && (
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">Employees</h2>
              <div className="flex gap-2">
                <button onClick={()=> openEmpModal(null)} className="bg-blue-600 text-white px-3 py-1 rounded">Add Employee</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left"><th className="p-2">Name</th><th className="p-2">Role</th><th className="p-2">Email</th><th className="p-2">Actions</th></tr>
                </thead>
                <tbody>
                  {employees.map((e) => (
                    <tr key={e.id} className="border-t">
                      <td className="p-2">{e.name}</td>
                      <td className="p-2">{e.role}</td>
                      <td className="p-2">{e.email}</td>
                      <td className="p-2 flex gap-2">
                        <button onClick={()=> openEmpModal(e)} className="px-2 py-1 bg-gray-200 rounded">Edit</button>
                        <button onClick={()=> deleteEmployee(e.id)} className="px-2 py-1 bg-red-200 rounded">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------- ATTENDANCE TAB ------------- */}
        {activeTab === "attendance" && (
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">Attendance</h2>
              <div className="flex gap-2">
                <button onClick={()=> openAttModal(null)} className="bg-blue-600 text-white px-3 py-1 rounded">Add Record</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left"><th className="p-2">Employee</th><th className="p-2">Month</th><th className="p-2">Present</th><th className="p-2">Total</th><th className="p-2">Actions</th></tr>
                </thead>
                <tbody>
                  {attendances.map((a) => {
                    const emp = employees.find((e) => e.id === a.employeeId) || { name: "-" };
                    return (
                      <tr key={a.id} className="border-t">
                        <td className="p-2">{emp.name}</td>
                        <td className="p-2">{a.month}</td>
                        <td className="p-2">{a.presentDays}</td>
                        <td className="p-2">{a.totalDays}</td>
                        <td className="p-2 flex gap-2">
                          <button onClick={()=> openAttModal(a)} className="px-2 py-1 bg-gray-200 rounded">Edit</button>
                          <button onClick={()=> deleteAttendance(a.id)} className="px-2 py-1 bg-red-200 rounded">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Employee Modal */}
        <Modal open={empModalOpen} title={empForm.id ? "Edit Employee" : "Add Employee"} onClose={()=> setEmpModalOpen(false)}>
          <div className="grid gap-2">
            <input className="border p-2 rounded" placeholder="Name" value={empForm.name} onChange={(e)=> setEmpForm({...empForm, name: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Role" value={empForm.role} onChange={(e)=> setEmpForm({...empForm, role: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Email" value={empForm.email} onChange={(e)=> setEmpForm({...empForm, email: e.target.value})} />
            <div className="flex gap-2 justify-end">
              <button onClick={()=> setEmpModalOpen(false)} className="px-3 py-1 rounded bg-gray-200">Cancel</button>
              <button onClick={saveEmployee} className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
            </div>
          </div>
        </Modal>

        {/* Attendance Modal */}
        <Modal open={attModalOpen} title={attForm.id ? "Edit Attendance" : "Add Attendance"} onClose={()=> setAttModalOpen(false)}>
          <div className="grid gap-2">
            <select className="border p-2 rounded" value={attForm.employeeId} onChange={(e)=> setAttForm({...attForm, employeeId: e.target.value})}>
              <option value="">Select Employee</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
            <input type="month" className="border p-2 rounded" value={attForm.month} onChange={(e)=> setAttForm({...attForm, month: e.target.value})} />
            <input type="number" className="border p-2 rounded" placeholder="Present Days" value={attForm.presentDays} onChange={(e)=> setAttForm({...attForm, presentDays: e.target.value})} />
            <input type="number" className="border p-2 rounded" placeholder="Total Days" value={attForm.totalDays} onChange={(e)=> setAttForm({...attForm, totalDays: e.target.value})} />
            <div className="flex gap-2 justify-end">
              <button onClick={()=> setAttModalOpen(false)} className="px-3 py-1 rounded bg-gray-200">Cancel</button>
              <button onClick={saveAttendance} className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
            </div>
          </div>
        </Modal>

        {/* Payslip modal preview (if needed) */}
        <Modal open={payslipModal.open} title="Payslip Preview" onClose={()=> setPayslipModal({ open:false, html: "" })}>
          <div dangerouslySetInnerHTML={{ __html: payslipModal.html }} />
        </Modal>

      </div>
    </Layout>
  );
}

