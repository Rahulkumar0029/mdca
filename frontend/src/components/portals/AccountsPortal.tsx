import React, { useState } from 'react';
import {
  CreditCard,
  Receipt,
  QrCode,
  DollarSign,
  AlertCircle,
  Download,
  Search,
  CheckCircle,
  Send,
  Printer
} from 'lucide-react';
import { StudentData } from '../../data/mockData';

interface Props {
  students: StudentData[];
  onReceiptGenerated: (receipt: any) => void;
  onPaymentSuccess: (studentId: string, amount: number) => void;
}

export const AccountsPortal: React.FC<Props> = ({
  students,
  onReceiptGenerated,
  onPaymentSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'counter' | 'defaulters' | 'daybook'>('counter');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [feeCategory, setFeeCategory] = useState('Tuition & Composite Fee');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'CASH' | 'CHEQUE'>('UPI');
  const [concession, setConcession] = useState<number>(0);
  const [remindersSent, setRemindersSent] = useState(false);

  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const grossDue = currentStudent.feeDue > 0 ? currentStudent.feeDue : 7500;
  const netAmount = Math.max(0, grossDue - concession);

  const defaulters = students.filter((s) => s.feeDue > 0);

  const handleCollect = () => {
    const receiptNo = `MDCA-2026-REC-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReceipt = {
      receiptNo,
      studentName: currentStudent.name,
      admissionNo: currentStudent.admissionNo,
      classSection: `${currentStudent.class} - ${currentStudent.section}`,
      amount: netAmount,
      mode: paymentMode,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      period: 'Q2 (July - Sept 2026)',
      feeHead: feeCategory,
    };

    onPaymentSuccess(currentStudent.id, netAmount);
    onReceiptGenerated(newReceipt);
  };

  const handleSendReminders = () => {
    setRemindersSent(true);
    setTimeout(() => {
      setRemindersSent(false);
      alert(`Automated WhatsApp & SMS fee reminders dispatched to parents of ${defaulters.length} students!`);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest">
              Accounts & Fee Desk • Vikram Singh
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading mt-2">
              Fee Accounting, Billing Counter & Day-Book
            </h2>
            <p className="text-xs text-emerald-200 mt-1">
              Paise-precision ledger system with instant computerized receipt issuance and audit compliance.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('counter')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'counter' ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Cashier Counter
            </button>
            <button
              onClick={() => setActiveTab('defaulters')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'defaulters' ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Defaulters List ({defaulters.length})
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Counter Screen */}
      {activeTab === 'counter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Student Selection & Billing */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 font-heading">
              Step 1: Select Student & Billing Head
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Search Student</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.admissionNo}) — {s.class} {s.section} — Due: ₹{s.feeDue}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border text-xs">
              <div>
                <span className="text-slate-400">Student: </span>
                <strong className="text-slate-900">{currentStudent.name}</strong>
              </div>
              <div>
                <span className="text-slate-400">Class: </span>
                <strong>{currentStudent.class} - {currentStudent.section}</strong>
              </div>
              <div>
                <span className="text-slate-400">Admission No: </span>
                <strong className="font-mono text-emerald-800">{currentStudent.admissionNo}</strong>
              </div>
              <div>
                <span className="text-slate-400">Guardian Contact: </span>
                <strong className="font-mono">{currentStudent.mobile}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fee Head</label>
                <select
                  value={feeCategory}
                  onChange={(e) => setFeeCategory(e.target.value)}
                  className="w-full p-2 text-xs border border-slate-300 rounded-lg outline-none bg-white"
                >
                  <option>Tuition & Composite Fee</option>
                  <option>Transport Bus Fee</option>
                  <option>Science & Computer Lab Fee</option>
                  <option>Annual Development & Sports</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sibling / Concession (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={concession}
                  onChange={(e) => setConcession(Number(e.target.value))}
                  className="w-full p-2 text-xs border border-slate-300 rounded-lg outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Mode</label>
              <div className="grid grid-cols-3 gap-2">
                {(['UPI', 'CASH', 'CHEQUE'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMode(m)}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      paymentMode === m
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary Card & Instant Receipt Trigger */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-emerald-950 text-white p-6 rounded-2xl shadow-xl space-y-5">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Payment Summary
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-emerald-200">
                MDCA Accounts Verified
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Fee Ledger Demand:</span>
                <span className="font-mono">₹{grossDue.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Approved Concession:</span>
                <span className="font-mono text-emerald-400">- ₹{concession.toLocaleString('en-IN')}.00</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/15">
              <span className="text-xs text-slate-300">Net Amount to Collect</span>
              <div className="text-3xl font-black text-amber-300 font-heading mt-1">
                ₹{netAmount.toLocaleString('en-IN')}.00
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Saved in ledger as {netAmount * 100} Paise
              </div>
            </div>

            {paymentMode === 'UPI' && (
              <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-3">
                <QrCode className="w-8 h-8 text-amber-400 shrink-0" />
                <div className="text-[11px]">
                  <div className="font-semibold text-white">MDCA Dynamic Cashier QR</div>
                  <div className="text-slate-300">Scan via BHIM UPI, PhonePe, Paytm, or GPay</div>
                </div>
              </div>
            )}

            <button
              onClick={handleCollect}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Receipt className="w-4 h-4" />
              <span>Collect Fee & Issue Official Receipt</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Defaulters List */}
      {activeTab === 'defaulters' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                Outstanding Fee Defaulters (Session 2026-27)
              </h3>
              <p className="text-xs text-slate-500">Students with unpaid quarter dues</p>
            </div>

            <button
              onClick={handleSendReminders}
              disabled={remindersSent}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{remindersSent ? 'Sending...' : 'Send WhatsApp & SMS Reminders'}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 uppercase text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Admission No</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Class & Sec</th>
                  <th className="py-2.5 px-3">Parent Mobile</th>
                  <th className="py-2.5 px-3 text-right">Pending Dues</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {defaulters.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-mono font-medium text-blue-900">{s.admissionNo}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{s.name}</td>
                    <td className="py-2.5 px-3">{s.class} - {s.section}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{s.mobile}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-black text-rose-600">
                      ₹{s.feeDue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedStudentId(s.id);
                          setActiveTab('counter');
                        }}
                        className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs"
                      >
                        Collect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
