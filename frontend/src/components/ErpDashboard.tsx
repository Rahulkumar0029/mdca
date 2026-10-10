import React from 'react';
import {
  Users,
  CreditCard,
  CalendarCheck2,
  TrendingUp,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { StudentData } from '../data/mockData';

interface Props {
  students: StudentData[];
  onNavigate: (module: string) => void;
}

export const ErpDashboard: React.FC<Props> = ({ students, onNavigate }) => {
  const totalStudents = students.length * 250; // realistic school volume multiplier for MDCA (approx 1500 students)
  const defaulterCount = students.filter((s) => s.feeDue > 0).length * 40;
  const totalFeeCollectedToday = 145000;
  const totalFeeCollectedMonth = 1845000;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>Academic Session 2026-2027 • Term 2 Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
            M.D. Children Academy Administration
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Real-time operations portal for Attendance, Fee Accounting, CBSE Examination Records & Parent Communication.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 relative z-10">
          <button
            onClick={() => onNavigate('fees')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md transition flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Fee Collection Counter</span>
          </button>
          <button
            onClick={() => onNavigate('attendance')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs backdrop-blur-md border border-white/20 transition flex items-center gap-2"
          >
            <CalendarCheck2 className="w-4 h-4" />
            <span>Mark Attendance</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Students */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enrolled Students
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-heading">1,500+</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Nursery to Class 12</span>
            </div>
          </div>
        </div>

        {/* Today's Attendance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Today's Attendance
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-heading">94.8%</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 font-medium">
              <span>Class attendance verified by teachers</span>
            </div>
          </div>
        </div>

        {/* Fees Collected Today */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Fee Collected Today
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-heading">
              ₹{totalFeeCollectedToday.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-blue-600 font-medium">
              <span>This Month: ₹{(totalFeeCollectedMonth / 100000).toFixed(2)} Lakhs</span>
            </div>
          </div>
        </div>

        {/* Outstanding Dues */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Quarter Defaulters
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-rose-600 font-heading">{defaulterCount} Students</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 font-medium">
              <span>Automated WhatsApp alert ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Operational Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quick Actions & Pending Work */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 font-heading">Recent Administrative Activity</h3>
            <button
              onClick={() => onNavigate('students')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900"
            >
              View Student Database
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Class 10-A Daily Attendance locked
                  </div>
                  <div className="text-[11px] text-slate-500">By Sunita Verma (Class Teacher) • 9:15 AM</div>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Logged
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Fee Receipt #MDCA-2026-00108 issued
                  </div>
                  <div className="text-[11px] text-slate-500">Aarav Sharma (Class 10-A) • ₹7,500 via UPI</div>
                </div>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                Verified
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Periodic Assessment 2 Marks window opened
                  </div>
                  <div className="text-[11px] text-slate-500">Physics, Mathematics & Chemistry Class 12</div>
                </div>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                In Progress
              </span>
            </div>
          </div>
        </div>

        {/* Right: School Quick Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 font-heading">System & Server Health</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-emerald-900">PostgreSQL Database</div>
                <div className="text-emerald-700 text-[11px]">Primary online • Auto PITR backups active</div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-blue-900">Payment Gateway</div>
                <div className="text-blue-700 text-[11px]">Razorpay Webhooks synced</div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-purple-900">SMS / WhatsApp Service</div>
                <div className="text-purple-700 text-[11px]">DLT Principal entity registered</div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('fees')}
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-xs transition"
            >
              Open Fee Accounting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
