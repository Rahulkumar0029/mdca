import React, { useState } from 'react';
import {
  Users,
  CreditCard,
  CalendarCheck2,
  AlertTriangle,
  Award,
  Megaphone,
  CheckCircle,
  Clock,
  Send,
  Building,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { StudentData } from '../../data/mockData';

interface Props {
  students: StudentData[];
  onBroadcastSuccess?: () => void;
}

export const PrincipalPortal: React.FC<Props> = ({ students }) => {
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [targetAudience, setTargetAudience] = useState('ALL');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastTitle('');
      setBroadcastBody('');
      alert('Official Principal Notice broadcasted to Mobile Apps and Parent SMS portals!');
    }, 1200);
  };

  const classAttendanceData = [
    { class: 'Class 12 (PCM/PCB)', strength: 78, present: 74, absent: 4, rate: 94.8, status: 'Normal' },
    { class: 'Class 12 (Commerce/Arts)', strength: 65, present: 60, absent: 5, rate: 92.3, status: 'Normal' },
    { class: 'Class 10 (A & B)', strength: 92, present: 88, absent: 4, rate: 95.6, status: 'Normal' },
    { class: 'Class 9 (A & B)', strength: 88, present: 79, absent: 9, rate: 89.7, status: 'Review' },
    { class: 'Class 6 - 8 (Middle)', strength: 260, present: 247, absent: 13, rate: 95.0, status: 'Normal' },
    { class: 'Class 1 - 5 (Primary)', strength: 380, present: 361, absent: 19, rate: 95.0, status: 'Normal' },
    { class: 'Nursery - UKG', strength: 220, present: 202, absent: 18, rate: 91.8, status: 'Normal' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Principal Welcome & Executive Overview */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>Principal Office • Dr. Ramesh Sharma • Session 2026-27</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
            Executive Operations & School Oversight
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
            Real-time administrative telemetry for M.D. Children Academy (Raisinghnagar).
            Monitoring academic performance, daily attendance registers, fee accounting, and CBSE compliance.
          </p>
        </div>
      </div>

      {/* Top 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Total Enrolled</span>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-heading">1,500+</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">100% CBSE Enrolled • Nursery-12</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Today's Attendance</span>
            <CalendarCheck2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-heading">94.4%</div>
          <div className="text-xs text-slate-500 mt-1">All 14 class teachers marked & synced</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Fee Collection (Oct)</span>
            <CreditCard className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-heading">₹18.45 L</div>
          <div className="text-xs text-blue-600 font-semibold mt-1">Today's Counter: ₹1,45,000</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Staff On Duty</span>
            <Building className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-heading">58 / 60</div>
          <div className="text-xs text-amber-600 font-semibold mt-1">2 on approved medical leave</div>
        </div>
      </div>

      {/* Main Grid: Class-Wise Attendance Monitor & Broadcast Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Class Attendance Monitor */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                Class-by-Class Real-Time Attendance
              </h3>
              <p className="text-[11px] text-slate-400">Synced from Class Teacher mobile & web registers</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Live Verified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Class Wing</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Present</th>
                  <th className="py-2.5 px-3">Absent</th>
                  <th className="py-2.5 px-3 text-right">Attendance %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classAttendanceData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{row.class}</td>
                    <td className="py-2.5 px-3 font-mono">{row.strength}</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold">{row.present}</td>
                    <td className="py-2.5 px-3 font-mono text-rose-600 font-bold">{row.absent}</td>
                    <td className="py-2.5 px-3 text-right font-bold font-mono">
                      <span className={row.rate >= 93 ? 'text-emerald-700' : 'text-amber-600'}>
                        {row.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Principal Circular Broadcaster */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Megaphone className="w-4 h-4 text-purple-700" />
            <h3 className="font-extrabold text-sm text-slate-900 font-heading">
              Principal Official Notice Broadcaster
            </h3>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Notice Headline *</label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. Winter Schedule Revision or CBSE Practical Dates"
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg outline-none bg-white"
              >
                <option value="ALL">All School (Teachers, Parents & Students)</option>
                <option value="SENIOR">Senior Wing (Classes 9th to 12th)</option>
                <option value="PARENTS">All Parents (Push Notification + WhatsApp)</option>
                <option value="TEACHERS">Teaching Staff Only</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Message Body *</label>
              <textarea
                rows={3}
                required
                value={broadcastBody}
                onChange={(e) => setBroadcastBody(e.target.value)}
                placeholder="Official instruction from Principal's desk..."
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <button
              type="submit"
              disabled={broadcastSent}
              className="w-full py-2.5 bg-gradient-to-r from-purple-800 to-indigo-900 hover:from-purple-900 hover:to-indigo-950 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{broadcastSent ? 'Broadcasting...' : 'Publish Official Order'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
