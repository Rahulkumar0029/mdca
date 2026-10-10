import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  Printer,
  ChevronRight,
  ExternalLink,
  Award
} from 'lucide-react';

interface CourseRecord {
  id: string;
  name: string;
  code: string;
  credits: number;
  type: string;
  marks: string;
  grade: string;
  gradePoint: number;
  remark: string;
}

const COURSES_TERM_1: CourseRecord[] = [
  {
    id: 'c-1',
    name: 'Communication Skills (COM1006)',
    code: 'COM1006',
    credits: 2,
    type: 'Regular',
    marks: '—',
    grade: 'A+',
    gradePoint: 10,
    remark: '—',
  },
  {
    id: 'c-2',
    name: 'Communication Skills Lab (COM1006L)',
    code: 'COM1006L',
    credits: 2,
    type: 'Regular',
    marks: '—',
    grade: 'A+',
    gradePoint: 10,
    remark: '—',
  },
  {
    id: 'c-3',
    name: 'IT Infra Landscape Overview',
    code: 'CSI1201',
    credits: 2,
    type: 'Regular',
    marks: '—',
    grade: 'B+',
    gradePoint: 8,
    remark: '—',
  },
  {
    id: 'c-4',
    name: 'Mathematics-I',
    code: 'MAT1707',
    credits: 4,
    type: 'Regular',
    marks: '—',
    grade: 'A+',
    gradePoint: 10,
    remark: '—',
  },
  {
    id: 'c-5',
    name: 'Innovation, Entrepreneurship and Sustainability',
    code: 'VAC002',
    credits: 2,
    type: 'Regular',
    marks: '—',
    grade: 'B+',
    gradePoint: 8,
    remark: '—',
  },
  {
    id: 'c-6',
    name: 'C and Data Structures',
    code: 'CSE1401',
    credits: 4,
    type: 'Regular',
    marks: '—',
    grade: 'A',
    gradePoint: 9,
    remark: '—',
  },
];

export const DigiiExamResults: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState('t-1');
  const [showGradeSheet, setShowGradeSheet] = useState(false);

  const terms = [
    { id: 't-1', name: 'Odd Term Examination 2023-24', status: 'Declared', sgpa: '9.23' },
    { id: 't-2', name: 'End Term Examination Even 2023-24', status: 'Declared', sgpa: '9.05' },
    { id: 't-3', name: 'End Term Examination Odd 2024-25', status: 'Declared', sgpa: '9.41' },
    { id: 't-4', name: 'End Term Examination Even 2024-25', status: 'Declared', sgpa: '9.18' },
    { id: 't-5', name: 'End Term Examination Odd Sem 2025-26', status: 'Declared', sgpa: '9.35' },
    { id: 't-6', name: 'End Term Examination Even Sem 2025-26', status: 'Declared', sgpa: '9.28' },
    { id: 't-7', name: 'End Term Examination Odd Sem 2026-27', status: 'Not Declared', sgpa: '—' },
  ];

  const currentTerm = terms.find((t) => t.id === selectedTerm) || terms[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 2-Column Digii Layout (Matching Screenshot 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Terms Switcher Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 space-y-3">
          <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider px-2">
            View Terms ({terms.length})
          </h4>

          <div className="space-y-1">
            {terms.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTerm(t.id)}
                className={`w-full text-left p-3 rounded-xl text-xs transition border flex flex-col gap-1 ${
                  selectedTerm === t.id
                    ? 'bg-red-50/60 border-red-500 text-red-900 font-bold shadow-sm'
                    : 'border-transparent text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="truncate">{t.name}</div>
                <div className="flex items-center gap-1.5 text-[10px]">
                  {t.status === 'Declared' ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Declared</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>Not Declared</span>
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Main Results View */}
        <div className="lg:col-span-9 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 font-heading">
                {currentTerm.name} Results
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-100">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Declared: 13 Jan 2024, 02:12 pm</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowGradeSheet(true)}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs rounded-xl shadow-md shadow-red-700/20 transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View E-GradeSheet</span>
            </button>
          </div>

          {/* SGPA Banner Card (Matching Screenshot 5 Light-Green Card) */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest">
                Semester Grade Point Average (SGPA)
              </div>
              <div className="text-3xl font-black text-emerald-900 font-heading mt-0.5">
                {currentTerm.sgpa}
              </div>
            </div>
            <div className="text-right text-xs text-emerald-800">
              <span className="font-semibold">Cumulative Standing: First Class with Distinction</span>
            </div>
          </div>

          {/* Courses Table (Matching Screenshot 5) */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Courses (6)</th>
                    <th className="py-3 px-4">Enrollment Type</th>
                    <th className="py-3 px-4">Marks</th>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Remark</th>
                    <th className="py-3 px-4 text-right">Course Breakdown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COURSES_TERM_1.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{c.name}</div>
                        <div className="text-[10px] text-slate-400">Credits: {c.credits}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium">
                          {c.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">{c.marks}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-bold">
                          <span className="text-emerald-700 text-sm font-black">{c.grade}</span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-bold">
                            GP: {c.gradePoint}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono">{c.remark}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-red-700 hover:text-red-900 font-semibold text-[11px] hover:underline">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* E-GradeSheet Printable Modal */}
      {showGradeSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-100 border-b flex justify-between items-center print:hidden">
              <span className="font-bold text-xs text-slate-800">Digii Campus Official Grade Sheet</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-red-700 text-white font-bold rounded-lg text-xs flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print GradeSheet</span>
                </button>
                <button
                  onClick={() => setShowGradeSheet(false)}
                  className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-8 space-y-4 bg-white text-slate-900 text-xs">
              <div className="text-center border-b pb-4">
                <h3 className="text-xl font-black text-red-700 font-heading">
                  OFFICIAL SEMESTER E-GRADESHEET
                </h3>
                <p className="text-xs text-slate-600 font-semibold">{currentTerm.name}</p>
                <div className="mt-2 text-sm font-bold text-slate-800">
                  SGPA: <span className="text-emerald-700 font-mono text-base">{currentTerm.sgpa}</span> / 10.00
                </div>
              </div>

              <table className="w-full border text-left">
                <thead className="bg-slate-100 uppercase text-[10px]">
                  <tr>
                    <th className="p-2 border">Subject / Course</th>
                    <th className="p-2 border text-center">Credits</th>
                    <th className="p-2 border text-center">Grade</th>
                    <th className="p-2 border text-center">Grade Point</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs">
                  {COURSES_TERM_1.map((c) => (
                    <tr key={c.id}>
                      <td className="p-2 border font-medium">{c.name}</td>
                      <td className="p-2 border text-center">{c.credits}</td>
                      <td className="p-2 border text-center font-bold text-emerald-700">{c.grade}</td>
                      <td className="p-2 border text-center font-mono">{c.gradePoint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-4 border-t flex justify-between text-[11px] text-slate-500">
                <span>Computerized verification hash: DIGII-GDGU-VERIFIED-2024</span>
                <span className="font-semibold text-slate-800">Controller of Examinations</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
