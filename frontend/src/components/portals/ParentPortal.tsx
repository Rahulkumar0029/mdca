import React, { useState } from 'react';
import {
  Users,
  CreditCard,
  CalendarCheck2,
  BookOpen,
  Award,
  DoorOpen,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface Props {
  onPayFeeForChild: (childName: string, amount: number) => void;
}

export const ParentPortal: React.FC<Props> = ({ onPayFeeForChild }) => {
  const [selectedChildId, setSelectedChildId] = useState<'child-1' | 'child-2'>('child-1');

  const children = {
    'child-1': {
      id: 'child-1',
      name: 'Aarav Sharma',
      admissionNo: 'MDCA-2026-0042',
      class: 'Class 10 - Section A',
      rollNo: 1,
      classTeacher: 'Sunita Verma (PGT Physics)',
      attendanceRate: 94,
      feeDue: 7500,
      feePeriod: 'Q2 (July - Sept 2026)',
      gatePassStatus: 'Medical Checkup (Approved)',
      homework: [
        { subject: 'Science (Physics)', title: 'Numerical Exercises on Lens Formula', due: '14 Oct' },
        { subject: 'Mathematics', title: 'Quadratic Equations Exercise 4.2', due: '15 Oct' },
        { subject: 'English', title: 'Formal Letter to the Editor', due: '16 Oct' },
      ],
      examResult: {
        exam: 'Periodic Assessment 1 (PA-1)',
        marks: '95%',
        grade: 'A1',
      },
    },
    'child-2': {
      id: 'child-2',
      name: 'Ananya Verma',
      admissionNo: 'MDCA-2026-0188',
      class: 'Class 6 - Section B (Middle Wing)',
      rollNo: 14,
      classTeacher: 'Kavita Bishnoi (TGT Science)',
      attendanceRate: 98,
      feeDue: 0,
      feePeriod: 'All Dues Cleared',
      gatePassStatus: 'None Active',
      homework: [
        { subject: 'Science', title: 'Plant Reproduction Diagram and Notes', due: '13 Oct' },
        { subject: 'Mathematics', title: 'Fractions and Decimals Worksheet', due: '15 Oct' },
      ],
      examResult: {
        exam: 'Periodic Assessment 1 (PA-1)',
        marks: '98%',
        grade: 'A1',
      },
    },
  };

  const activeChild = children[selectedChildId];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Parent Welcome & Sibling Switcher Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-widest">
              Parent Portal • Sunil Verma
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading mt-2">
              My Wards & Academic Progress
            </h2>
            <p className="text-xs text-amber-200 mt-1">
              Select your child below to view homework, attendance, report cards, or pay school fees.
            </p>
          </div>

          {/* Sibling Switcher Buttons */}
          <div className="flex bg-black/30 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 gap-1.5">
            <button
              onClick={() => setSelectedChildId('child-1')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                selectedChildId === 'child-1'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <span>Aarav (Class 10-A)</span>
              {children['child-1'].feeDue > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              )}
            </button>
            <button
              onClick={() => setSelectedChildId('child-2')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                selectedChildId === 'child-2'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <span>Ananya (Class 6-B)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Child Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-black text-xl font-heading shadow-md">
            {activeChild.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900 font-heading">{activeChild.name}</h3>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-mono font-bold px-2 py-0.5 rounded">
                {activeChild.admissionNo}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeChild.class} • Roll No: {activeChild.rollNo} • Class Teacher: <strong>{activeChild.classTeacher}</strong>
            </p>
          </div>
        </div>

        {activeChild.feeDue > 0 ? (
          <button
            onClick={() => onPayFeeForChild(activeChild.name, activeChild.feeDue)}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Due Fee (₹{activeChild.feeDue})</span>
          </button>
        ) : (
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All Fees Paid</span>
          </span>
        )}
      </div>

      {/* Child Dashboard Grid: Attendance, Fee & Report Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Attendance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
            <span>Attendance Rate</span>
            <CalendarCheck2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700 font-heading mt-1">
            {activeChild.attendanceRate}%
          </div>
          <p className="text-xs text-slate-500">
            Satisfies CBSE mandatory 75% requirement. Marked Present today at 8:40 AM.
          </p>
        </div>

        {/* Academics / PA-1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
            <span>Latest Report Card</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-blue-900 font-heading mt-1">
            {activeChild.examResult.grade} <span className="text-base text-slate-500 font-normal">({activeChild.examResult.marks})</span>
          </div>
          <p className="text-xs text-slate-500">
            {activeChild.examResult.exam} • CBSE 9-point scale
          </p>
        </div>

        {/* Gate Pass & Safety */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
            <span>Digital Gate Pass</span>
            <DoorOpen className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-sm font-bold text-slate-800 mt-1">
            {activeChild.gatePassStatus}
          </div>
          <p className="text-xs text-slate-500">
            Parents receive two-way OTP authorization before campus exit.
          </p>
        </div>
      </div>

      {/* Live Homework Diary from Subject Teachers */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 font-heading">
              Daily Class Diary & Homework ({activeChild.name})
            </h3>
            <p className="text-xs text-slate-500">Directly posted by subject faculty</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
            Parent Signature Sync
          </span>
        </div>

        <div className="space-y-3">
          {activeChild.homework.map((hw, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-[10px] uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 mr-2">
                  {hw.subject}
                </span>
                <span className="font-semibold text-slate-900">{hw.title}</span>
              </div>
              <span className="font-bold text-rose-600 font-mono">Due: {hw.due}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
