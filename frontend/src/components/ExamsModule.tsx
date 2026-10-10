import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  FileCheck,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  Download
} from 'lucide-react';
import { StudentData } from '../data/mockData';

interface Props {
  students: StudentData[];
}

export const ExamsModule: React.FC<Props> = ({ students }) => {
  const [selectedExam, setSelectedExam] = useState('PA-2 (Periodic Assessment 2)');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [reportCardStudent, setReportCardStudent] = useState<StudentData | null>(null);

  // Spreadsheet marks state
  const [marksState, setMarksState] = useState<Record<string, number>>({
    's-101': 19,
    's-102': 20,
    's-103': 17,
    's-104': 18,
    's-105': 19,
    's-106': 15,
  });

  const handleMarkChange = (id: string, val: string) => {
    const num = Math.min(20, Math.max(0, parseInt(val) || 0));
    setMarksState((prev) => ({ ...prev, [id]: num }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Examinations & CBSE Report Cards
          </h2>
          <p className="text-xs text-slate-500">
            CBSE 9-Point grading system (A1-E2), marks entry window lock, and bulk PDF report card generation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReportCardStudent(students[0])}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Preview Sample CBSE Report Card</span>
          </button>
        </div>
      </div>

      {/* Selector Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap gap-4 text-xs">
        <div>
          <label className="block text-slate-500 font-semibold mb-1">Active Examination</label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="p-2 border border-slate-300 rounded-lg outline-none bg-white font-medium"
          >
            <option value="PA-2 (Periodic Assessment 2)">Periodic Assessment 2 (PA-2) - 20 Marks</option>
            <option value="Mid-Term Half Yearly">Mid-Term Half Yearly Examination - 80 Marks</option>
            <option value="Annual Final Board Mock">Annual Final Mock Examination</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="p-2 border border-slate-300 rounded-lg outline-none bg-white font-medium"
          >
            <option value="Mathematics">Mathematics (041)</option>
            <option value="Science">Science (086)</option>
            <option value="Social Science">Social Science (087)</option>
            <option value="English Language">English Language & Literature (184)</option>
            <option value="Hindi Course-A">Hindi Course-A (002)</option>
          </select>
        </div>

        <div className="flex items-end">
          <span className="p-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg font-semibold flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Marks Entry Window: OPEN (Subject Teacher)</span>
          </span>
        </div>
      </div>

      {/* Spreadsheet Marks Entry Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
          <div className="font-bold text-xs text-slate-800 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-blue-900" />
            <span>Fast Spreadsheet Grid: {selectedSubject} — Max Marks: 20</span>
          </div>
          <span className="text-[11px] text-slate-500">Auto-calculated Grades (A1: 19-20, A2: 17-18, B1: 15-16)</span>
        </div>

        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 text-slate-600 uppercase border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-4">Roll</th>
              <th className="py-2.5 px-4">Student</th>
              <th className="py-2.5 px-4">Admission No</th>
              <th className="py-2.5 px-4">Marks Obtained (/ 20)</th>
              <th className="py-2.5 px-4">CBSE Grade</th>
              <th className="py-2.5 px-4 text-right">Individual Card</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((s) => {
              const currentMarks = marksState[s.id] ?? 18;
              const grade =
                currentMarks >= 19
                  ? 'A1'
                  : currentMarks >= 17
                  ? 'A2'
                  : currentMarks >= 15
                  ? 'B1'
                  : currentMarks >= 12
                  ? 'B2'
                  : 'C1';

              return (
                <tr key={s.id} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-4 font-mono font-bold">{s.rollNo}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{s.name}</td>
                  <td className="py-2.5 px-4 font-mono text-blue-900">{s.admissionNo}</td>
                  <td className="py-2.5 px-4">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={currentMarks}
                      onChange={(e) => handleMarkChange(s.id, e.target.value)}
                      className="w-20 p-1.5 border border-slate-300 rounded font-bold font-mono text-center outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 rounded font-black text-emerald-700 bg-emerald-100 font-mono">
                      {grade}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={() => setReportCardStudent(s)}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded-lg transition"
                    >
                      View Report Card
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CBSE Report Card Modal */}
      {reportCardStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-100 border-b flex justify-between items-center print:hidden">
              <span className="font-bold text-xs text-slate-700">CBSE Automated Report Card Preview</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-blue-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Card</span>
                </button>
                <button
                  onClick={() => setReportCardStudent(null)}
                  className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Official Report Card Body */}
            <div className="p-8 space-y-4 bg-white text-slate-900 text-xs">
              <div className="text-center border-b pb-4">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Affiliated to CBSE, New Delhi (Affiliation No: 1730999)
                </div>
                <h3 className="text-2xl font-black text-blue-950 font-heading">
                  M.D. CHILDREN ACADEMY
                </h3>
                <p className="text-xs text-slate-600">
                  Vijaynagar Road, Raisinghnagar, Rajasthan - 335051
                </p>
                <div className="mt-2 py-1 px-4 bg-blue-900 text-amber-300 font-bold text-xs rounded uppercase tracking-wider inline-block">
                  Academic Performance Profile • Session 2026-2027
                </div>
              </div>

              {/* Student Demographics */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div><strong>Student Name:</strong> {reportCardStudent.name}</div>
                <div><strong>Roll No:</strong> {reportCardStudent.rollNo}</div>
                <div><strong>Admission / SR No:</strong> {reportCardStudent.admissionNo}</div>
                <div><strong>Class & Section:</strong> {reportCardStudent.class} - {reportCardStudent.section}</div>
                <div><strong>Father's Name:</strong> {reportCardStudent.parentName}</div>
                <div><strong>Attendance:</strong> {reportCardStudent.attendancePercent}%</div>
              </div>

              {/* Scholastic Table */}
              <table className="w-full border text-left">
                <thead className="bg-slate-100 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-2 border">Subject</th>
                    <th className="p-2 border text-center">PA-1 (20)</th>
                    <th className="p-2 border text-center">PA-2 (20)</th>
                    <th className="p-2 border text-center">Term Total (100)</th>
                    <th className="p-2 border text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs">
                  <tr>
                    <td className="p-2 border font-medium">Mathematics</td>
                    <td className="p-2 border text-center">19</td>
                    <td className="p-2 border text-center">19</td>
                    <td className="p-2 border text-center font-bold">95</td>
                    <td className="p-2 border text-center font-bold text-emerald-600">A1</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">Science</td>
                    <td className="p-2 border text-center">18</td>
                    <td className="p-2 border text-center">18</td>
                    <td className="p-2 border text-center font-bold">92</td>
                    <td className="p-2 border text-center font-bold text-emerald-600">A1</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">Social Science</td>
                    <td className="p-2 border text-center">17</td>
                    <td className="p-2 border text-center">18</td>
                    <td className="p-2 border text-center font-bold">88</td>
                    <td className="p-2 border text-center font-bold text-emerald-600">A2</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">English Core</td>
                    <td className="p-2 border text-center">19</td>
                    <td className="p-2 border text-center">20</td>
                    <td className="p-2 border text-center font-bold">96</td>
                    <td className="p-2 border text-center font-bold text-emerald-600">A1</td>
                  </tr>
                </tbody>
              </table>

              {/* Remarks and Signatures */}
              <div className="pt-4 border-t flex justify-between items-end text-xs">
                <div>
                  <strong>Class Teacher's Remarks:</strong>
                  <p className="text-slate-600 italic">"Outstanding academic discipline and sincere participation."</p>
                </div>
                <div className="flex gap-8 text-center text-[10px] text-slate-500 font-semibold">
                  <div>
                    <div className="w-24 border-b border-slate-400 mb-1"></div>
                    <span>Class Teacher</span>
                  </div>
                  <div>
                    <div className="w-24 border-b border-slate-400 mb-1"></div>
                    <span>Principal (MDCA)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
