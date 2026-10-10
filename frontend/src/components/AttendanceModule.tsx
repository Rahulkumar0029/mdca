import React, { useState } from 'react';
import {
  CalendarCheck2,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  Save,
  Check,
  Smartphone
} from 'lucide-react';
import { StudentData } from '../data/mockData';

interface Props {
  students: StudentData[];
}

export const AttendanceModule: React.FC<Props> = ({ students }) => {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  // Local state for attendance records
  const [statusMap, setStatusMap] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE'>>({
    's-101': 'PRESENT',
    's-102': 'PRESENT',
    's-103': 'PRESENT',
    's-104': 'ABSENT',
    's-105': 'PRESENT',
    's-106': 'PRESENT',
  });

  const [isSaved, setIsSaved] = useState(false);

  const toggleStatus = (id: string, newStatus: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
    setIsSaved(false);
  };

  const markAllPresent = () => {
    const updated: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
    students.forEach((s) => {
      updated[s.id] = 'PRESENT';
    });
    setStatusMap(updated);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      alert('Attendance for Class ' + selectedClass + ' - ' + selectedSection + ' locked & synced! Parent absence notifications dispatched.');
    }, 200);
  };

  const total = students.length;
  const presentCount = Object.values(statusMap).filter((s) => s === 'PRESENT').length;
  const absentCount = Object.values(statusMap).filter((s) => s === 'ABSENT').length;
  const lateCount = Object.values(statusMap).filter((s) => s === 'LATE').length;
  const percent = total > 0 ? Math.round(((presentCount + lateCount) / total) * 100) : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Class Attendance Register & Sync
          </h2>
          <p className="text-xs text-slate-500">
            One-tap teacher attendance, offline-first sync & automatic parent absence alerts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllPresent}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md transition"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Attendance Locked' : 'Save & Notify Parents'}</span>
          </button>
        </div>
      </div>

      {/* Filter and KPI cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white font-medium"
            >
              <option value="Class 10">Class 10</option>
              <option value="Class 12">Class 12</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 6">Class 6</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white font-medium"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="PCM">PCM</option>
              <option value="Commerce">Commerce</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Date</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white font-medium"
            />
          </div>
        </div>

        {/* Live Counters */}
        <div className="lg:col-span-4 bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between text-xs">
          <div>
            <div className="text-slate-400">Class Rate</div>
            <div className="text-xl font-bold font-heading text-emerald-400">{percent}%</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400">Present</div>
            <div className="text-xl font-bold font-heading text-white">{presentCount}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400">Absent</div>
            <div className="text-xl font-bold font-heading text-rose-400">{absentCount}</div>
          </div>
          <div className="text-right">
            <div className="text-slate-400">Late</div>
            <div className="text-xl font-bold font-heading text-amber-400">{lateCount}</div>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-600 uppercase border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Roll</th>
              <th className="py-3 px-4">Admission No</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Parent Mobile</th>
              <th className="py-3 px-4 text-center">Mark Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((s) => {
              const currentStatus = statusMap[s.id] || 'PRESENT';
              return (
                <tr key={s.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{s.rollNo}</td>
                  <td className="py-3 px-4 font-mono text-blue-900">{s.admissionNo}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{s.name}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{s.mobile}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleStatus(s.id, 'PRESENT')}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition ${
                          currentStatus === 'PRESENT'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Present</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleStatus(s.id, 'ABSENT')}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition ${
                          currentStatus === 'ABSENT'
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Absent</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleStatus(s.id, 'LATE')}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition ${
                          currentStatus === 'LATE'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Late</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Parent Alert Notice Box */}
      {absentCount > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-600" />
            <span>
              <strong>{absentCount} absent students detected:</strong> DLT-approved SMS template "Dear Parent, your ward was marked absent today at MDCA" will automatically fire upon lock.
            </span>
          </div>
          <span className="font-semibold text-amber-800">Ready to dispatch</span>
        </div>
      )}
    </div>
  );
};
