import React, { useEffect, useState } from "react";
import { FileText, Download, ShieldCheck } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Required for doc.autoTable to work

export default function Payslips() {
  const user = JSON.parse(localStorage.getItem("loggedUser")) || { name: "Guest User", email: "guest@example.com" };
  const key = `payslips_${user.email || "guest"}`;

  const [payslips, setPayslips] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && saved.length) {
      setPayslips(saved);
    } else {
      const demo = [
        { id: 1, month: "November 2025", gross: 50000, net: 42000, deductions: 8000 },
        { id: 2, month: "October 2025", gross: 48000, net: 40300, deductions: 7700 },
        { id: 3, month: "September 2025", gross: 49000, net: 41000, deductions: 8000 },
      ];
      localStorage.setItem(key, JSON.stringify(demo));
      setPayslips(demo);
    }
  }, [key]);

  const downloadPDF = (p) => {
    try {
      const doc = new jsPDF();

      // PDF Header Styling
      doc.setFontSize(22);
      doc.setTextColor(40, 40, 40);
      doc.text("CORE EMS - OFFICIAL PAYSLIP", 105, 20, { align: "center" });
      
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Statement for: ${p.month}`, 20, 40);
      doc.text(`Employee Name: ${user.name}`, 20, 50);
      doc.text(`Employee Email: ${user.email || "N/A"}`, 20, 60);

      // Creating a professional table using the plugin
      doc.autoTable({
        startY: 70,
        head: [['Description', 'Amount (INR)']],
        body: [
          ['Gross Salary', `INR ${p.gross.toLocaleString()}`],
          ['Total Deductions', `INR ${(p.deductions || 0).toLocaleString()}`],
          ['Net Salary Payable', `INR ${p.net.toLocaleString()}`],
        ],
        theme: 'striped',
        headStyles: { fillColor: [59, 130, 246] }, // Blue header
        styles: { font: "helvetica", fontSize: 10 }
      });

      const finalY = doc.lastAutoTable.finalY || 100;
      doc.setFontSize(10);
      doc.text("Note: This is a system-generated document.", 20, finalY + 20);
      
      // Attempt to save
      doc.save(`Payslip_${p.month.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF. Make sure 'jspdf-autotable' is installed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-white">
              Financial <span className="text-blue-500">Statements</span>
            </h2>
            <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mt-1">Payroll Records Archive</p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/50 border border-white/5 px-6 py-3 rounded-2xl backdrop-blur-xl">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Authenticated</p>
              <h3 className="text-white font-bold leading-tight text-sm">{user.name}</h3>
            </div>
            <ShieldCheck className="text-blue-500" size={24} />
          </div>
        </div>

        {/* PAYSLIP GRID */}
        <div className="bg-slate-900/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none"></div>

          {payslips.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="mx-auto text-slate-700 mb-4" size={48} />
              <p className="text-slate-500 font-bold uppercase tracking-widest">No payroll history detected</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {payslips.map((p) => (
                <div 
                  key={p.id} 
                  className="group bg-slate-950/50 hover:bg-slate-900 transition-all duration-300 p-6 rounded-[2rem] border border-white/5 hover:border-blue-500/30 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-blue-600/10 rounded-2xl">
                        <FileText className="text-blue-500" size={24} />
                      </div>
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">Verified</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1">{p.month}</h3>
                    <div className="space-y-1 mb-6">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Net Disbursement</span>
                        <span className="text-emerald-400 font-mono font-bold">₹{p.net.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-600 font-medium uppercase tracking-tighter">Gross Figure</span>
                        <span className="text-slate-400 font-mono">₹{p.gross.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => downloadPDF(p)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white py-3 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest border border-blue-500/20 hover:border-blue-500 active:scale-95"
                  >
                    <Download size={14} /> Generate PDF
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}