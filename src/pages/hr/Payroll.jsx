import React, { useEffect, useMemo, useState } from "react";

// ---------------------- Helper utilities ----------------------
const uid = () => String(Date.now()) + Math.floor(Math.random() * 9999);
const currency = (n) => Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });

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

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// ---------------------- Small UI components ----------------------
function Badge({ children, color = "gray" }) {
  const colors = {
    gray: "bg-slate-800 text-slate-400 border border-slate-700",
    green: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    red: "bg-rose-500/10 text-rose-500 border border-rose-500/20",
    blue: "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20",
  };
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${colors[color]}`}>{children}</span>;
}

function Modal({ open, title, onClose, children, theme }) {
  if (!open) return null;
  const isDark = theme === "dark";
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm text-white flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-slate-950 border-white/10' : 'bg-white border-slate-200 text-slate-900'} border max-w-2xl w-full rounded-[2rem] shadow-2xl p-8 relative`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-black tracking-tight ${!isDark && 'text-slate-900'}`}>{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-red-500 transition-colors text-xl">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// ---------------------- Payroll Module ----------------------
export default function Payroll() {
  const [employees, setEmployees] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [activeTab, setActiveTab] = useState("payroll");
  const [theme, setTheme] = useState(load("theme", "dark")); // Theme state
  
  const [empForm, setEmpForm] = useState({ id: "", name: "", role: "", email: "" });
  const [empModalOpen, setEmpModalOpen] = useState(false);
  const [attForm, setAttForm] = useState({ id: "", employeeId: "", month: "", presentDays: "", totalDays: "" });
  const [attModalOpen, setAttModalOpen] = useState(false);
  const [payForm, setPayForm] = useState({
    employeeId: "", month: "", basic: "", allowance: "", bonus: "", overtimeHours: "", overtimeRate: "", benefits: "", otherDeductions: "",
  });
  const [payslipModal, setPayslipModal] = useState({ open: false, html: "" });

  useEffect(() => {
    save("theme", theme);
  }, [theme]);

  useEffect(() => {
    const e = load("employees", []);
    const a = load("attendances", []);
    const p = load("payrollRecords", []);
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

  function openEmpModal(edit = null) {
    if (edit) setEmpForm(edit);
    else setEmpForm({ id: "", name: "", role: "", email: "" });
    setEmpModalOpen(true);
  }
  function saveEmployee() {
    if (!empForm.name) return alert("Employee name required");
    let newList = [...employees];
    if (empForm.id) newList = newList.map((e) => (e.id === empForm.id ? empForm : e));
    else newList.push({ ...empForm, id: uid() });
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

  function generatePayslip(recordInput) {
    const emp = employees.find((e) => e.id === recordInput.employeeId) || { name: "Unknown" };
    const r = recordInput;
    const c = r.computed;
    const html = `
      <html>
      <head>
        <title>Payslip - ${emp.name} - ${r.month}</title>
        <style>
          body{font-family:Arial;padding:40px;background:#fff;color:#000}
          table{width:100%;border-collapse:collapse;margin:20px 0}
          th,td{padding:12px;border:1px solid #eee;text-align:left}
          th{background:#f9f9f9}
          .header{border-bottom:2px solid #000;padding-bottom:10px;margin-bottom:20px}
        </style>
      </head>
      <body>
        <div class="header"><h2>PAYSLIP RECEIPT</h2><p>${emp.name} | ${r.month}</p></div>
        <table>
          <tr><th>Earnings</th><th>Amount (₹)</th></tr>
          <tr><td>Basic (Pro-rated)</td><td>${currency(c.prBasic)}</td></tr>
          <tr><td>Allowance</td><td>${currency(c.prAllowance)}</td></tr>
          <tr><td>Overtime</td><td>${currency(c.overtimePay)}</td></tr>
          <tr><td>Bonus / Benefits</td><td>${currency(Number(r.inputs.bonus) + Number(r.inputs.benefits))}</td></tr>
          <tr style="font-weight:bold"><td>Gross Total</td><td>${currency(c.grossMonthly)}</td></tr>
        </table>
        <table>
          <tr><th>Deductions</th><th>Amount (₹)</th></tr>
          <tr><td>Tax (Monthly)</td><td>${currency(c.monthlyTax)}</td></tr>
          <tr><td>Other</td><td>${currency(Number(r.inputs.otherDeductions))}</td></tr>
          <tr style="font-weight:bold"><td>Total Deductions</td><td>${currency(c.totalDeductions)}</td></tr>
        </table>
        <h3 style="text-align:right">Net Payable: ₹${currency(c.netMonthly)}</h3>
        <script>window.onload = ()=> setTimeout(()=>window.print(),300);</script>
      </body>
      </html>
    `;
    const w = window.open("", "_blank");
    if (!w) return alert("Popup blocked");
    w.document.open();
    w.document.write(html);
    w.document.close();
  }

  function exportPayrollCSV() {
    if (!payrollRecords.length) return alert("No payroll records");
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
    a.download = `payroll_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  }

  const isDark = theme === "dark";
  const inputStyle = isDark 
    ? "bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-600 focus:ring-cyan-500/50" 
    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-cyan-500/20";
  
  const cardStyle = isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-xl shadow-slate-200/50";
  const textMuted = isDark ? "text-slate-500" : "text-slate-400";

  return (
    <div className={`min-h-screen transition-colors duration-300 p-6 lg:p-10 font-sans ${isDark ? "bg-[#020617] text-slate-200" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div>
            <h1 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Payroll <span className="text-cyan-500">Management</span>
            </h1>
            <p className={`${textMuted} mt-1 uppercase text-xs tracking-[0.2em] font-bold`}>Financial control & compensation</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2.5 rounded-xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800 text-yellow-500' : 'bg-white border-slate-200 text-slate-600'}`}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <button onClick={exportPayrollCSV} className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border ${isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              Export CSV
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`flex gap-2 p-1 backdrop-blur-md border rounded-2xl w-fit ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          {["payroll", "employees", "attendance"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/20" : `${textMuted} hover:text-cyan-500`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ------------- PAYROLL TAB ------------- */}
        {activeTab === "payroll" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className={`${cardStyle} border p-8 rounded-[2rem] space-y-6`}>
              <h2 className={`text-lg font-black tracking-tight mb-4 uppercase text-xs ${textMuted}`}>Generate New Statement</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ml-2 ${textMuted}`}>Employee</label>
                  <select value={payForm.employeeId} onChange={(e)=> setPayForm({...payForm, employeeId: e.target.value})} className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`}>
                    <option value="">Select Target</option>
                    {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ml-2 ${textMuted}`}>Billing Month</label>
                  <input type="month" value={payForm.month} onChange={(e)=> setPayForm({...payForm, month: e.target.value})} className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} />
                </div>
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ml-2 ${textMuted}`}>Base Salary (₹)</label>
                  <input type="number" placeholder="0.00" value={payForm.basic} onChange={(e)=> setPayForm({...payForm, basic: e.target.value})} className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input type="number" placeholder="Allowance (₹)" value={payForm.allowance} onChange={(e)=> setPayForm({...payForm, allowance: e.target.value})} className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} />
                <input type="number" placeholder="Bonus (₹)" value={payForm.bonus} onChange={(e)=> setPayForm({...payForm, bonus: e.target.value})} className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} />
                <input type="number" placeholder="Benefits (₹)" value={payForm.benefits} onChange={(e)=> setPayForm({...payForm, benefits: e.target.value})} className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input type="number" placeholder="OT Hours" value={payForm.overtimeHours} onChange={(e)=> setPayForm({...payForm, overtimeHours: e.target.value})} className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} />
                <input type="number" placeholder="OT Rate (₹/hr)" value={payForm.overtimeRate} onChange={(e)=> setPayForm({...payForm, overtimeRate: e.target.value})} className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} />
                <input type="number" placeholder="Deductions (₹)" value={payForm.otherDeductions} onChange={(e)=> setPayForm({...payForm, otherDeductions: e.target.value})} className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} />
              </div>

              {/* Preview Box */}
              <div className={`border rounded-2xl p-6 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden ${isDark ? 'bg-slate-950/50 border-cyan-500/10' : 'bg-slate-50 border-slate-200'}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>
                <div className="space-y-3 relative">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-2">Earnings Breakdown</h3>
                  <div className="flex justify-between text-sm"><span className={textMuted}>Pro-rated Basic</span><span className="font-mono">₹{currency(calculation.prBasic)}</span></div>
                  <div className="flex justify-between text-sm"><span className={textMuted}>Allowances</span><span className="font-mono">₹{currency(calculation.prAllowance)}</span></div>
                  <div className="flex justify-between text-sm"><span className={textMuted}>Overtime</span><span className="font-mono text-emerald-500">₹{currency(calculation.overtimePay)}</span></div>
                </div>
                <div className={`space-y-3 relative border-l pl-8 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-2">Net Compensation</h3>
                  <div className="flex justify-between text-sm"><span className={textMuted}>Monthly Tax</span><span className="font-mono text-rose-500">- ₹{currency(calculation.monthlyTax)}</span></div>
                  <div className={`flex justify-between text-sm font-black pt-4 border-t ${isDark ? 'border-slate-800 text-white' : 'border-slate-200 text-slate-900'}`}>
                    <span>Final Payout</span>
                    <span className="text-2xl text-cyan-500">₹{currency(calculation.netMonthly)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={savePayroll} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all">Save Statement</button>
                <button onClick={()=>{ if(!payForm.employeeId || !payForm.month) return alert('Select ID & Month'); generatePayslip({ employeeId: payForm.employeeId, month: payForm.month, inputs: {...payForm}, computed: calculation }); }} 
                  className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}>
                  Preview Slip
                </button>
              </div>
            </div>

            {/* Saved Payrolls Table */}
            <div className={`overflow-x-auto rounded-[2rem] border shadow-2xl overflow-hidden ${cardStyle}`}>
              <table className="w-full text-sm">
                <thead className={`uppercase text-[10px] font-black tracking-widest border-b ${isDark ? 'bg-slate-950/50 text-slate-500 border-slate-800' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                  <tr>
                    <th className="px-6 py-5 text-left">Employee</th>
                    <th className="px-6 py-5 text-left">Period</th>
                    <th className="px-6 py-5 text-left">Gross</th>
                    <th className="px-6 py-5 text-left">Net Payout</th>
                    <th className="px-6 py-5 text-center">Status</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800/50' : 'divide-slate-100'}`}>
                  {payrollRecords.map((r) => {
                    const emp = employees.find((e) => e.id === r.employeeId) || { name: "-" };
                    return (
                      <tr key={r.id} className="hover:bg-cyan-500/5 transition-colors group">
                        <td className={`px-6 py-4 font-bold uppercase text-xs tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>{emp.name}</td>
                        <td className={`px-6 py-4 font-mono text-xs ${textMuted}`}>{r.month}</td>
                        <td className={textMuted}>₹{currency(r.computed.grossMonthly)}</td>
                        <td className="px-6 py-4 font-bold text-cyan-500">₹{currency(r.computed.netMonthly)}</td>
                        <td className="px-6 py-4 text-center"><Badge color={r.status==='Approved'? 'green' : r.status==='Rejected' ? 'red' : 'blue'}>{r.status}</Badge></td>
                        <td className="px-6 py-4 text-right flex gap-2 justify-end">
                          <button onClick={()=> generatePayslip(r)} className={`p-2 rounded-lg transition-all ${isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-900'}`}>Slip</button>
                          <button onClick={()=> changePayrollStatus(r.id, 'Approved')} className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-black uppercase hover:bg-emerald-500 hover:text-white transition-all">Approve</button>
                          <button onClick={()=> changePayrollStatus(r.id, 'Rejected')} className="px-3 py-1 bg-rose-500/10 text-rose-500 rounded-lg text-[10px] font-black uppercase hover:bg-rose-500 hover:text-white transition-all">Deny</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------- EMPLOYEES TAB ------------- */}
        {activeTab === "employees" && (
          <div className={`${cardStyle} border rounded-[2rem] p-8 space-y-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-black uppercase text-xs tracking-widest ${textMuted}`}>Workforce Registry</h2>
              <button onClick={()=> openEmpModal(null)} className="bg-cyan-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest">New Entry</button>
            </div>
            <div className={`overflow-x-auto rounded-2xl border overflow-hidden ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <table className="w-full text-sm">
                <thead className={`uppercase text-[10px] font-black tracking-widest ${isDark ? 'bg-slate-950 text-slate-500' : 'bg-slate-50 text-slate-400'}`}>
                  <tr><th className="px-6 py-4 text-left">Identity</th><th className="px-6 py-4 text-left">Position</th><th className="px-6 py-4 text-left">Channel</th><th className="px-6 py-4 text-right">Operations</th></tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800/50 bg-slate-950/20' : 'divide-slate-100 bg-white'}`}>
                  {employees.map((e) => (
                    <tr key={e.id} className="hover:bg-cyan-500/5 transition-all group">
                      <td className={`px-6 py-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{e.name}</td>
                      <td className={`px-6 py-4 ${textMuted}`}>{e.role}</td>
                      <td className="px-6 py-4 text-cyan-500 font-mono text-xs">{e.email}</td>
                      <td className="px-6 py-4 text-right flex gap-3 justify-end">
                        <button onClick={()=> openEmpModal(e)} className="text-slate-500 hover:text-cyan-400 font-black text-[10px] uppercase">Edit</button>
                        <button onClick={()=> deleteEmployee(e.id)} className="text-slate-500 hover:text-rose-500 font-black text-[10px] uppercase">Delete</button>
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
          <div className={`${cardStyle} border rounded-[2rem] p-8 space-y-6`}>
            <div className="flex justify-between items-center">
              <h2 className={`text-xl font-black uppercase text-xs tracking-widest ${textMuted}`}>Log Verification</h2>
              <button onClick={()=> openAttModal(null)} className="bg-cyan-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest">Add Log</button>
            </div>
            <div className={`overflow-x-auto rounded-2xl border overflow-hidden ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <table className="w-full text-sm">
                <thead className={`uppercase text-[10px] font-black tracking-widest ${isDark ? 'bg-slate-950 text-slate-500' : 'bg-slate-50 text-slate-400'}`}>
                  <tr><th className="px-6 py-4 text-left">Employee</th><th className="px-6 py-4 text-left">Month</th><th className="px-6 py-4 text-center">Active / Total</th><th className="px-6 py-4 text-right">Actions</th></tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800/50 bg-slate-950/20' : 'divide-slate-100 bg-white'}`}>
                  {attendances.map((a) => {
                    const emp = employees.find((e) => e.id === a.employeeId) || { name: "-" };
                    return (
                      <tr key={a.id} className="hover:bg-cyan-500/5 transition-all">
                        <td className={`px-6 py-4 font-bold uppercase text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{emp.name}</td>
                        <td className={`px-6 py-4 font-mono text-xs ${textMuted}`}>{a.month}</td>
                        <td className="px-6 py-4 text-center font-bold"><span className="text-emerald-500">{a.presentDays}</span> <span className="text-slate-400">/</span> <span className={isDark ? 'text-slate-200' : 'text-slate-600'}>{a.totalDays}</span></td>
                        <td className="px-6 py-4 text-right flex gap-3 justify-end">
                          <button onClick={()=> openAttModal(a)} className="text-slate-500 hover:text-cyan-400 font-black text-[10px] uppercase">Modify</button>
                          <button onClick={()=> deleteAttendance(a.id)} className="text-slate-500 hover:text-rose-500 font-black text-[10px] uppercase">Purge</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modals */}
        <Modal open={empModalOpen} theme={theme} title={empForm.id ? "Modify Identity" : "Create New Identity"} onClose={()=> setEmpModalOpen(false)}>
          <div className="space-y-4">
            <input className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} placeholder="Full Name" value={empForm.name} onChange={(e)=> setEmpForm({...empForm, name: e.target.value})} />
            <input className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} placeholder="Professional Role" value={empForm.role} onChange={(e)=> setEmpForm({...empForm, role: e.target.value})} />
            <input className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} placeholder="System Email" value={empForm.email} onChange={(e)=> setEmpForm({...empForm, email: e.target.value})} />
            <div className="flex gap-4 pt-4">
              <button onClick={saveEmployee} className="flex-1 bg-cyan-600 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cyan-500 transition-colors">Synchronize</button>
            </div>
          </div>
        </Modal>

        <Modal open={attModalOpen} theme={theme} title="Log Entry Details" onClose={()=> setAttModalOpen(false)}>
          <div className="space-y-4">
            <select className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} value={attForm.employeeId} onChange={(e)=> setAttForm({...attForm, employeeId: e.target.value})}>
              <option value="">Select Target</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
            <input type="month" className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} value={attForm.month} onChange={(e)=> setAttForm({...attForm, month: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} placeholder="Present" value={attForm.presentDays} onChange={(e)=> setAttForm({...attForm, presentDays: e.target.value})} />
              <input type="number" className={`px-4 py-2.5 w-full rounded-xl border focus:outline-none focus:ring-2 transition-all shadow-inner ${inputStyle}`} placeholder="Total" value={attForm.totalDays} onChange={(e)=> setAttForm({...attForm, totalDays: e.target.value})} />
            </div>
            <button onClick={saveAttendance} className="w-full bg-cyan-600 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cyan-500 transition-colors">Update Log</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}