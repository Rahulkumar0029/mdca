import React, { useState } from 'react';
import {
  Search,
  Filter,
  UserPlus,
  Eye,
  X,
  CreditCard,
  CalendarCheck2,
  BookOpen,
  Phone,
  MapPin,
  Shield,
  Download
} from 'lucide-react';
import { StudentData } from '../data/mockData';

interface Props {
  students: StudentData[];
  onSelectForPayment: (student: StudentData) => void;
}

export const StudentModule: React.FC<Props> = ({ students, onSelectForPayment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [activeProfile, setActiveProfile] = useState<StudentData | null>(null);
  const [profileTab, setProfileTab] = useState<'overview' | 'fees' | 'attendance' | 'marks'>('overview');

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'ALL' || s.class.includes(selectedClass);
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Student Information System (SIS)
          </h2>
          <p className="text-xs text-slate-500">
            Official pupil register, CBSE enrollment, sibling linking & 360° academic profile
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition">
            <Download className="w-3.5 h-3.5" />
            <span>Export Excel</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition">
            <UserPlus className="w-4 h-4" />
            <span>New Admission Entry</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by student name, admission number, SR no, or parent mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="ALL">All Classes (Nursery - 12th)</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 12">Class 12</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 6">Class 6</option>
          </select>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Admission No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Class & Section</th>
                <th className="py-3 px-4">Roll</th>
                <th className="py-3 px-4">Parent / Mobile</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Fee Balance</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-blue-50/40 transition">
                  <td className="py-3 px-4 font-mono font-medium text-blue-900">{s.admissionNo}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{s.name}</div>
                    <div className="text-[10px] text-slate-400">SR: {s.srNo}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                      {s.class} - {s.section}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">{s.rollNo}</td>
                  <td className="py-3 px-4">
                    <div>{s.parentName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{s.mobile}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${
                        s.attendancePercent >= 90
                          ? 'text-emerald-600'
                          : s.attendancePercent >= 75
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {s.attendancePercent}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {s.feeDue > 0 ? (
                      <span className="text-rose-600 font-bold font-mono">
                        ₹{s.feeDue.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-semibold">Cleared</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setActiveProfile(s)}
                        className="px-2.5 py-1 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>360° View</span>
                      </button>
                      {s.feeDue > 0 && (
                        <button
                          onClick={() => onSelectForPayment(s)}
                          className="px-2.5 py-1 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition"
                        >
                          Pay
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 360-Degree Student Profile Drawer / Modal */}
      {activeProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-950 to-indigo-900 text-white p-6 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold font-heading text-amber-300">
                  {activeProfile.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{activeProfile.name}</h3>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase font-bold">
                      {activeProfile.status}
                    </span>
                  </div>
                  <p className="text-xs text-blue-200">
                    {activeProfile.class} - {activeProfile.section} | Admission No: {activeProfile.admissionNo} | Roll No: {activeProfile.rollNo}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveProfile(null)}
                className="text-white/60 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 text-xs font-semibold text-slate-600">
              <button
                onClick={() => setProfileTab('overview')}
                className={`py-3 px-4 border-b-2 transition ${
                  profileTab === 'overview'
                    ? 'border-blue-900 text-blue-900 font-bold bg-white'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Personal & Family
              </button>
              <button
                onClick={() => setProfileTab('fees')}
                className={`py-3 px-4 border-b-2 transition ${
                  profileTab === 'fees'
                    ? 'border-blue-900 text-blue-900 font-bold bg-white'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Fee Ledger ({activeProfile.feeDue > 0 ? `₹${activeProfile.feeDue} Due` : 'Clear'})
              </button>
              <button
                onClick={() => setProfileTab('attendance')}
                className={`py-3 px-4 border-b-2 transition ${
                  profileTab === 'attendance'
                    ? 'border-blue-900 text-blue-900 font-bold bg-white'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Attendance ({activeProfile.attendancePercent}%)
              </button>
              <button
                onClick={() => setProfileTab('marks')}
                className={`py-3 px-4 border-b-2 transition ${
                  profileTab === 'marks'
                    ? 'border-blue-900 text-blue-900 font-bold bg-white'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                CBSE Marks & Grades
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 text-xs text-slate-700 min-h-[260px]">
              {profileTab === 'overview' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 text-[11px]">Father / Guardian:</span>
                    <div className="font-bold text-slate-900">{activeProfile.parentName}</div>
                    <div className="text-slate-500 font-mono">{activeProfile.mobile}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 text-[11px]">Date of Birth & Gender:</span>
                    <div className="font-bold text-slate-900">{activeProfile.dob}</div>
                    <div className="text-slate-500">{activeProfile.gender}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 text-[11px]">Govt. Identifiers:</span>
                    <div className="font-bold text-slate-900">SR: {activeProfile.srNo}</div>
                    <div className="text-slate-500 font-mono">APAAR ID: Verified / Linked</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 text-[11px]">School Location / Bus:</span>
                    <div className="font-bold text-slate-900">Raisinghnagar Campus</div>
                    <div className="text-slate-500">Route 3 (Vijaynagar Road Stop)</div>
                  </div>
                </div>
              )}

              {profileTab === 'fees' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm text-slate-900">Q2 Quarterly Tuition & Activity</div>
                      <div className="text-slate-500 text-[11px]">Due Date: 15 Oct 2026</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-rose-600 font-mono">
                        ₹{activeProfile.feeDue.toLocaleString('en-IN')}
                      </div>
                      <button
                        onClick={() => {
                          onSelectForPayment(activeProfile);
                          setActiveProfile(null);
                        }}
                        className="mt-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
                      >
                        Collect at Counter
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {profileTab === 'attendance' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="font-semibold text-emerald-900">Current Session Attendance Ratio</span>
                    <span className="font-bold text-lg text-emerald-700">{activeProfile.attendancePercent}%</span>
                  </div>
                  <p className="text-slate-500 text-xs">
                    Satisfies CBSE minimum 75% attendance criteria for board examination eligibility.
                  </p>
                </div>
              )}

              {profileTab === 'marks' && (
                <div className="space-y-2">
                  <table className="w-full text-left border">
                    <thead className="bg-slate-100 uppercase text-[10px]">
                      <tr>
                        <th className="p-2">Subject</th>
                        <th className="p-2">Periodic Test (20)</th>
                        <th className="p-2">Mid-Term (80)</th>
                        <th className="p-2">Total Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-xs">
                      <tr>
                        <td className="p-2 font-medium">Mathematics</td>
                        <td className="p-2">19 / 20</td>
                        <td className="p-2">74 / 80</td>
                        <td className="p-2 font-bold text-emerald-600">A1</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Science</td>
                        <td className="p-2">18 / 20</td>
                        <td className="p-2">71 / 80</td>
                        <td className="p-2 font-bold text-emerald-600">A2</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">English Core</td>
                        <td className="p-2">19 / 20</td>
                        <td className="p-2">76 / 80</td>
                        <td className="p-2 font-bold text-emerald-600">A1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t flex justify-end">
              <button
                onClick={() => setActiveProfile(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
