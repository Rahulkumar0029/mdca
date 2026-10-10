import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

interface ReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData: {
    receiptNo: string;
    studentName: string;
    admissionNo: string;
    classSection: string;
    amount: number;
    mode: string;
    date: string;
    period: string;
    feeHead: string;
  } | null;
}

export const ReceiptModal: React.FC<ReceiptProps> = ({ isOpen, onClose, receiptData }) => {
  if (!isOpen || !receiptData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden print:m-0 print:p-0 print:border-none print:shadow-none">
        {/* Top actions (hidden in print) */}
        <div className="flex justify-between items-center px-6 py-3 bg-slate-100 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Transaction Verified</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-8 space-y-6 bg-white text-slate-800">
          {/* School Header */}
          <div className="text-center border-b pb-4 border-slate-200">
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-900 text-xs font-bold rounded-full mb-1 uppercase tracking-wider">
              CBSE Affiliation No: 1730999 | School Code: 1142
            </div>
            <h2 className="text-2xl font-extrabold text-blue-950 font-heading">
              M.D. CHILDREN ACADEMY
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Vijaynagar Road, Raisinghnagar, Dist. Sri Ganganagar, Rajasthan - 335051
            </p>
            <p className="text-xs font-medium text-slate-500">Phone: +91 94140-00000 | Email: office@mdcarsnr.in</p>
            <div className="mt-3 py-1 px-4 bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest inline-block rounded">
              Official Fee Receipt (Student Copy)
            </div>
          </div>

          {/* Receipt Meta */}
          <div className="grid grid-cols-2 text-xs gap-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div>
              <span className="text-slate-500">Receipt No: </span>
              <strong className="text-slate-900 font-mono text-sm">{receiptData.receiptNo}</strong>
            </div>
            <div className="text-right">
              <span className="text-slate-500">Date & Time: </span>
              <strong>{receiptData.date}</strong>
            </div>
            <div>
              <span className="text-slate-500">Student Name: </span>
              <strong className="text-sm">{receiptData.studentName}</strong>
            </div>
            <div className="text-right">
              <span className="text-slate-500">Admission / SR No: </span>
              <strong>{receiptData.admissionNo}</strong>
            </div>
            <div>
              <span className="text-slate-500">Class & Section: </span>
              <strong>{receiptData.classSection}</strong>
            </div>
            <div className="text-right">
              <span className="text-slate-500">Payment Mode: </span>
              <strong className="text-blue-700 uppercase">{receiptData.mode}</strong>
            </div>
          </div>

          {/* Fee Breakdown Table */}
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 uppercase border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2 px-3">S.No</th>
                <th className="py-2 px-3">Fee Particulars</th>
                <th className="py-2 px-3">Billing Quarter</th>
                <th className="py-2 px-3 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-3">1.</td>
                <td className="py-2.5 px-3 font-medium">{receiptData.feeHead}</td>
                <td className="py-2.5 px-3 text-slate-600">{receiptData.period}</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold">
                  ₹{receiptData.amount.toLocaleString('en-IN')}.00
                </td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-900">
              <tr>
                <td colSpan={3} className="py-2.5 px-3 text-right uppercase">
                  Total Paid (Paise Rounded)
                </td>
                <td className="py-2.5 px-3 text-right text-sm text-blue-900 font-mono">
                  ₹{receiptData.amount.toLocaleString('en-IN')}.00
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Security & Verification Footer */}
          <div className="pt-4 flex justify-between items-end border-t border-slate-200 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Computerized Audit Verified</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Non-transferable receipt. Fees once paid are subject to school rules.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 border-b border-dashed border-slate-400 mb-1"></div>
              <span className="text-[11px] text-slate-600 font-medium">Authorized Cashier / Accounts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
