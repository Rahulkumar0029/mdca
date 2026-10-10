import React, { useState } from 'react';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Send,
  UserCheck,
  Smartphone
} from 'lucide-react';

interface GatePassItem {
  id: string;
  reason: string;
  date: string;
  outTime: string;
  expectedReturn: string;
  parentApproval: 'APPROVED' | 'PENDING' | 'REJECTED';
  guardStatus: 'CLEARED' | 'WAITING' | 'RETURNED';
}

export const DigiiGatePass: React.FC = () => {
  const [passes, setPasses] = useState<GatePassItem[]>([
    {
      id: 'GP-2026-081',
      reason: 'Medical checkup and dental appointment',
      date: '10 Oct 2026',
      outTime: '01:30 PM',
      expectedReturn: '04:00 PM',
      parentApproval: 'APPROVED',
      guardStatus: 'CLEARED',
    },
    {
      id: 'GP-2026-094',
      reason: 'Urgent family function out of town',
      date: '12 Oct 2026',
      outTime: '11:00 AM',
      expectedReturn: 'Next Day',
      parentApproval: 'PENDING',
      guardStatus: 'WAITING',
    },
  ]);

  const [showApply, setShowApply] = useState(false);
  const [newReason, setNewReason] = useState('');
  const [newOutTime, setNewOutTime] = useState('02:00 PM');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReason) return;

    const created: GatePassItem = {
      id: `GP-2026-0${Math.floor(100 + Math.random() * 900)}`,
      reason: newReason,
      date: 'Today',
      outTime: newOutTime,
      expectedReturn: '05:00 PM',
      parentApproval: 'PENDING',
      guardStatus: 'WAITING',
    };

    setPasses([created, ...passes]);
    setShowApply(false);
    setNewReason('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Campus Gate Pass & Parent Authorization
          </h2>
          <p className="text-xs text-slate-500">
            Real-time digital out-pass with two-way parent OTP / mobile app approval
          </p>
        </div>

        <button
          onClick={() => setShowApply(!showApply)}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Apply New Gate Pass</span>
        </button>
      </div>

      {showApply && (
        <form onSubmit={handleApply} className="bg-white rounded-2xl p-6 border border-red-200 shadow-lg space-y-4">
          <h3 className="font-bold text-sm text-red-950 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-700" />
            <span>Gate Pass Request Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Leaving Campus *</label>
              <input
                type="text"
                required
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                placeholder="e.g. Doctor appointment, family emergency"
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Requested Out Time *</label>
              <input
                type="text"
                required
                value={newOutTime}
                onChange={(e) => setNewOutTime(e.target.value)}
                placeholder="02:00 PM"
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2 text-xs text-red-900">
            <Smartphone className="w-4 h-4 text-red-700 shrink-0" />
            <span>
              An instant notification will be delivered to registered parent mobile (9602670029) for biometric or OTP approval before security clears gate exit.
            </span>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowApply(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Parent Approval</span>
            </button>
          </div>
        </form>
      )}

      {/* Gate Pass Cards */}
      <div className="space-y-4">
        {passes.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-red-700">{p.id}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">{p.date}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">{p.reason}</h4>
              <div className="text-xs text-slate-500">
                Out Time: <strong className="text-slate-800">{p.outTime}</strong> | Expected Return: <strong className="text-slate-800">{p.expectedReturn}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Parent Status</div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    p.parentApproval === 'APPROVED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : p.parentApproval === 'PENDING'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {p.parentApproval}
                </span>
              </div>

              <div className="text-right pl-3 border-l border-slate-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Gate Security</div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    p.guardStatus === 'CLEARED'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {p.guardStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
