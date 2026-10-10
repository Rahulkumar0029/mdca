import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  DollarSign,
  Receipt,
  CheckCircle,
  AlertCircle,
  User,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { StudentData } from '../data/mockData';

interface Props {
  students: StudentData[];
  selectedStudent: StudentData | null;
  onReceiptGenerated: (receipt: any) => void;
  onPaymentSuccess: (studentId: string, amount: number) => void;
}

export const FeeCounterModule: React.FC<Props> = ({
  students,
  selectedStudent: initialStudent,
  onReceiptGenerated,
  onPaymentSuccess,
}) => {
  const [activeStudentId, setActiveStudentId] = useState<string>(
    initialStudent ? initialStudent.id : students[0].id
  );
  const [feeHead, setFeeHead] = useState('Tuition & Composite Term Fee');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'CASH' | 'CARD' | 'CHEQUE'>('UPI');
  const [concession, setConcession] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentStudent = students.find((s) => s.id === activeStudentId) || students[0];
  const baseAmount = currentStudent.feeDue > 0 ? currentStudent.feeDue : 7500;
  const netPayable = Math.max(0, baseAmount - concession);

  const handleCollect = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const receiptNo = `MDCA-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      const newReceipt = {
        receiptNo,
        studentName: currentStudent.name,
        admissionNo: currentStudent.admissionNo,
        classSection: `${currentStudent.class} - ${currentStudent.section}`,
        amount: netPayable,
        mode: paymentMode,
        date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        period: 'Q2 (July - Sept 2026)',
        feeHead,
      };

      onPaymentSuccess(currentStudent.id, netPayable);
      onReceiptGenerated(newReceipt);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Fee Collection Counter & Cashier Desk
          </h2>
          <p className="text-xs text-slate-500">
            Instant fee collection, DLT SMS/WhatsApp billing alert & computerized receipt generation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-semibold">
            Cashier Shift Active • Counter #1
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Student Selection & Dues */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="font-bold text-sm text-slate-900 font-heading">
            Step 1: Select Student & Review Dues
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Student (by Name or Admission No)
            </label>
            <select
              value={activeStudentId}
              onChange={(e) => setActiveStudentId(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.admissionNo}) - {s.class} {s.section} - Due: ₹{s.feeDue}
                </option>
              ))}
            </select>
          </div>

          {/* Student mini card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400">Student: </span>
              <strong className="text-slate-800">{currentStudent.name}</strong>
            </div>
            <div>
              <span className="text-slate-400">Class/Sec: </span>
              <strong>{currentStudent.class} - {currentStudent.section}</strong>
            </div>
            <div>
              <span className="text-slate-400">Admission No: </span>
              <strong className="font-mono text-blue-900">{currentStudent.admissionNo}</strong>
            </div>
            <div>
              <span className="text-slate-400">Parent Mobile: </span>
              <strong className="font-mono">{currentStudent.mobile}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fee Category / Head</label>
              <select
                value={feeHead}
                onChange={(e) => setFeeHead(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg outline-none bg-white"
              >
                <option value="Tuition & Composite Term Fee">Tuition & Composite Term Fee</option>
                <option value="Transport Bus Fee">Transport Bus Fee</option>
                <option value="Science & Computer Lab Fee">Science & Computer Lab Fee</option>
                <option value="Annual Activity & Sports Fee">Annual Activity & Sports Fee</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Concession / Sibling Discount (₹)</label>
              <input
                type="number"
                min="0"
                step="500"
                value={concession}
                onChange={(e) => setConcession(Number(e.target.value))}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg outline-none"
                placeholder="0"
              />
            </div>
          </div>

          {/* Payment Mode Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Payment Collection Mode</label>
            <div className="grid grid-cols-4 gap-2">
              {(['UPI', 'CASH', 'CARD', 'CHEQUE'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPaymentMode(mode)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition text-center ${
                    paymentMode === mode
                      ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Net Calculation & Confirmation */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-blue-950 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Billing Summary
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-blue-200">
                Paise-Precision Engine
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Gross Ledger Demand:</span>
                <span className="font-mono">₹{baseAmount.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Approved Concession:</span>
                <span className="font-mono text-emerald-400">- ₹{concession.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Late Fee / Penalties:</span>
                <span className="font-mono text-slate-400">₹0.00</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15">
              <span className="text-xs text-slate-300">Net Payable Amount</span>
              <div className="text-3xl font-black text-amber-300 font-heading tracking-tight mt-1">
                ₹{netPayable.toLocaleString('en-IN')}.00
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Equivalent to {(netPayable * 100).toLocaleString('en-IN')} Paise stored in ledger
              </div>
            </div>

            {paymentMode === 'UPI' && (
              <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-3">
                <QrCode className="w-8 h-8 text-amber-400" />
                <div className="text-[11px]">
                  <div className="font-semibold text-white">MDCA Dynamic UPI QR</div>
                  <div className="text-slate-300">Scan via GPay, PhonePe or Paytm</div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6">
            <button
              onClick={handleCollect}
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Generating Receipt & Syncing Ledger...</span>
              ) : (
                <>
                  <Receipt className="w-4 h-4" />
                  <span>Confirm Payment & Print Receipt</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
