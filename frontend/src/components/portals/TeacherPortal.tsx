import React, { useState } from 'react';
import {
  BookOpen,
  CalendarCheck2,
  FileSpreadsheet,
  Upload,
  Plus,
  Send,
  CheckCircle2,
  XCircle,
  FileText,
  Users,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';
import { StudentData } from '../../data/mockData';

interface Props {
  students: StudentData[];
}

interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  assignedBy: string;
  description: string;
}

export const TeacherPortal: React.FC<Props> = ({ students }) => {
  const [activeRoleMode, setActiveRoleMode] = useState<'class-teacher' | 'subject-teacher'>('class-teacher');

  // Homework list uploaded by teachers
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>([
    {
      id: 'hw-1',
      subject: 'Science (Physics)',
      title: 'Light - Reflection & Refraction Numerical Practice',
      dueDate: '14 Oct 2026',
      assignedBy: 'Sunita Verma (PGT Physics)',
      description: 'Complete NCERT Exercise Questions 1 to 12 in the homework notebook.',
    },
    {
      id: 'hw-2',
      subject: 'Mathematics',
      title: 'Quadratic Equations Worksheet - Section 4.2',
      dueDate: '15 Oct 2026',
      assignedBy: 'Rakesh Sharma (TGT Math)',
      description: 'Solve the 10 quadratic word problems attached in the student drive.',
    },
    {
      id: 'hw-3',
      subject: 'English Language',
      title: 'Letter to the Editor - Environmental Cleanliness',
      dueDate: '16 Oct 2026',
      assignedBy: 'Priya Joshi (TGT English)',
      description: 'Write a formal letter format in 120-150 words following CBSE guidelines.',
    },
  ]);

  // Homework Upload state
  const [hwTitle, setHwTitle] = useState('');
  const [hwSubject, setHwSubject] = useState('Science (Physics)');
  const [hwDueDate, setHwDueDate] = useState('18 Oct 2026');
  const [hwDescription, setHwDescription] = useState('');
  const [showHwModal, setShowHwModal] = useState(false);

  // Subject mapping for Class 10-A
  const subjectTeachersMapping = [
    { subject: 'Science (Physics & Chem)', teacher: 'Sunita Verma (PGT)', syllabusStatus: '78% Covered', lastExamAvg: '84%' },
    { subject: 'Mathematics (041)', teacher: 'Rakesh Sharma (TGT)', syllabusStatus: '80% Covered', lastExamAvg: '81%' },
    { subject: 'Social Science (087)', teacher: 'Kavita Bishnoi (TGT)', syllabusStatus: '75% Covered', lastExamAvg: '79%' },
    { subject: 'English Language (184)', teacher: 'Priya Joshi (TGT)', syllabusStatus: '85% Covered', lastExamAvg: '88%' },
    { subject: 'Hindi Course-A (002)', teacher: 'Dr. Suresh Chandra', syllabusStatus: '82% Covered', lastExamAvg: '86%' },
    { subject: 'Artificial Intelligence (417)', teacher: 'Mohit Maan (PGT CS)', syllabusStatus: '90% Covered', lastExamAvg: '92%' },
  ];

  const handlePostHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle || !hwDescription) return;

    const newHw: HomeworkItem = {
      id: `hw-${Date.now()}`,
      subject: hwSubject,
      title: hwTitle,
      dueDate: hwDueDate,
      assignedBy: 'Sunita Verma (PGT Physics)',
      description: hwDescription,
    };

    setHomeworkList([newHw, ...homeworkList]);
    setShowHwModal(false);
    setHwTitle('');
    setHwDescription('');
    alert('Homework assigned and immediately published to Student & Parent Portals!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Teacher Top Header */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-widest">
              Faculty Desk • Sunita Verma
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading mt-2">
              Class Teacher & Subject Teacher Portal
            </h2>
            <p className="text-xs text-blue-200 mt-1">
              Class 10-A In-Charge | PGT Physics & Science | Term 2 Session 2026-27
            </p>
          </div>

          {/* Toggle between Class Teacher and Subject Teacher */}
          <div className="flex bg-black/25 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 text-xs font-bold">
            <button
              onClick={() => setActiveRoleMode('class-teacher')}
              className={`px-4 py-2 rounded-xl transition ${
                activeRoleMode === 'class-teacher'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Class 10-A Master View
            </button>
            <button
              onClick={() => setActiveRoleMode('subject-teacher')}
              className={`px-4 py-2 rounded-xl transition ${
                activeRoleMode === 'subject-teacher'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Upload Homework & Notes
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: CLASS TEACHER MASTER VIEW (Has all details of all subjects) */}
      {activeRoleMode === 'class-teacher' && (
        <div className="space-y-6">
          {/* Class 10-A Overview Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-400 font-bold uppercase">Class Assigned</span>
              <div className="text-xl font-black text-slate-900 mt-1 font-heading">Class 10 - Section A</div>
              <div className="text-xs text-slate-500 mt-1">45 Enrolled Students • Room 204</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-400 font-bold uppercase">Class Attendance Today</span>
              <div className="text-xl font-black text-emerald-700 mt-1 font-heading">95.6% Present</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">43 Present • 2 Absent (Parents notified)</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-400 font-bold uppercase">Consolidated Class GPA</span>
              <div className="text-xl font-black text-blue-900 mt-1 font-heading">84.2% Class Avg</div>
              <div className="text-xs text-blue-600 font-semibold mt-1">Periodic Assessment 1 Verified</div>
            </div>
          </div>

          {/* All Subjects Details for Class 10-A */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                  Class 10-A: All Subjects Academic Progress & Teacher Roster
                </h3>
                <p className="text-xs text-slate-500">
                  Class teacher master overview across all 6 CBSE scholastic subjects
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-800">
                CBSE Curriculum Synced
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Subject Faculty</th>
                    <th className="py-3 px-4">Syllabus Covered</th>
                    <th className="py-3 px-4">Last Exam Average</th>
                    <th className="py-3 px-4 text-right">Homework / Updates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subjectTeachersMapping.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{s.subject}</td>
                      <td className="py-3 px-4 text-slate-700">{s.teacher}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-emerald-700">{s.syllabusStatus}</span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-900">{s.lastExamAvg}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                          Active on Portal
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Class Students Roster & Report Remarks */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 font-heading">
              Class 10-A Student Academic Performance & Report Card Remarks
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Roll</th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Admission No</th>
                    <th className="py-2.5 px-3">Attendance %</th>
                    <th className="py-2.5 px-3">PA-1 Grade</th>
                    <th className="py-2.5 px-3">Class Teacher Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.slice(0, 4).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition">
                      <td className="py-2.5 px-3 font-mono font-bold">{s.rollNo}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">{s.name}</td>
                      <td className="py-2.5 px-3 font-mono text-blue-900">{s.admissionNo}</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">{s.attendancePercent}%</td>
                      <td className="py-2.5 px-3 font-mono font-black text-blue-900">A1 (95%)</td>
                      <td className="py-2.5 px-3 text-slate-600 italic">
                        "Consistently diligent and disciplined in all subjects."
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SUBJECT TEACHER WORKSPACE (Upload details visible to students and parents) */}
      {activeRoleMode === 'subject-teacher' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                Subject Teacher Homework & Study Material Uploads
              </h3>
              <p className="text-xs text-slate-500">
                All assignments published here are pushed directly to Student & Parent Portals
              </p>
            </div>

            <button
              onClick={() => setShowHwModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>Assign New Homework</span>
            </button>
          </div>

          {/* Homework Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {homeworkList.map((hw) => (
              <div key={hw.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                      {hw.subject}
                    </span>
                    <span className="text-[11px] font-semibold text-rose-600">
                      Due: {hw.dueDate}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-2">{hw.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{hw.description}</p>
                </div>

                <div className="pt-3 border-t text-[11px] text-slate-400 flex justify-between items-center">
                  <span>Assigned by {hw.assignedBy}</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Visible to Parents
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Modal to Upload Homework */}
          {showHwModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h4 className="font-bold text-base text-slate-900">Assign Subject Homework</h4>
                  <button onClick={() => setShowHwModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>

                <form onSubmit={handlePostHomework} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                    <select
                      value={hwSubject}
                      onChange={(e) => setHwSubject(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg outline-none bg-white"
                    >
                      <option>Science (Physics)</option>
                      <option>Mathematics</option>
                      <option>English Language</option>
                      <option>Social Science</option>
                      <option>Artificial Intelligence</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Assignment Title *</label>
                    <input
                      type="text"
                      required
                      value={hwTitle}
                      onChange={(e) => setHwTitle(e.target.value)}
                      placeholder="e.g. Chapter 5 Worksheet Exercises"
                      className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Submission Due Date *</label>
                    <input
                      type="text"
                      required
                      value={hwDueDate}
                      onChange={(e) => setHwDueDate(e.target.value)}
                      placeholder="e.g. 18 Oct 2026"
                      className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Detailed Instructions *</label>
                    <textarea
                      rows={3}
                      required
                      value={hwDescription}
                      onChange={(e) => setHwDescription(e.target.value)}
                      placeholder="Mention page numbers, questions to solve, or format..."
                      className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowHwModal(false)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-900 text-white font-bold rounded-lg flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish Homework</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
