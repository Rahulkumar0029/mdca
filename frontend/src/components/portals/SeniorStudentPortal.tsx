import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  ExternalLink,
  Download,
  ShieldCheck,
  Send
} from 'lucide-react';

interface Props {
  studentName?: string;
  admissionNo?: string;
  className?: string;
}

export const SeniorStudentPortal: React.FC<Props> = ({
  studentName = 'Aarav Sharma',
  admissionNo = 'MDCA-2026-0042',
  className = 'Class 10 - Section A',
}) => {
  const [activeTab, setActiveTab] = useState<'academics' | 'timetable' | 'homework' | 'cbse'>('academics');

  const [submittedHw, setSubmittedHw] = useState<Record<string, boolean>>({});

  const handleSubmitHw = (id: string) => {
    setSubmittedHw((prev) => ({ ...prev, [id]: true }));
    alert('Assignment submission uploaded to Subject Teacher for grading!');
  };

  const timetable = [
    { period: 1, time: '08:30 - 09:15', subject: 'Science (Physics)', teacher: 'Sunita Verma', room: 'Lab 2' },
    { period: 2, time: '09:15 - 10:00', subject: 'Mathematics', teacher: 'Rakesh Sharma', room: 'Room 204' },
    { period: 3, time: '10:00 - 10:45', subject: 'English Language', teacher: 'Priya Joshi', room: 'Room 204' },
    { period: 4, time: '11:05 - 11:50', subject: 'Social Science', teacher: 'Kavita Bishnoi', room: 'Room 204' },
    { period: 5, time: '11:50 - 12:35', subject: 'Hindi Course-A', teacher: 'Dr. Suresh Chandra', room: 'Room 204' },
    { period: 6, time: '12:35 - 01:20', subject: 'Artificial Intelligence', teacher: 'Mohit Maan', room: 'Computer Lab 1' },
  ];

  const seniorAssignments = [
    {
      id: 'asg-1',
      subject: 'Science (Physics)',
      title: 'Light Reflection Ray Diagrams Practice',
      due: '14 Oct 2026',
      teacher: 'Sunita Verma',
    },
    {
      id: 'asg-2',
      subject: 'Mathematics',
      title: 'Quadratic Equations Exercise 4.2',
      due: '15 Oct 2026',
      teacher: 'Rakesh Sharma',
    },
    {
      id: 'asg-3',
      subject: 'Artificial Intelligence',
      title: 'Python Decision Trees Project Draft',
      due: '18 Oct 2026',
      teacher: 'Mohit Maan',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Senior Wing Header Card */}
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-500/20 text-amber-300 border border-red-500/30 uppercase tracking-widest">
              Senior Student Portal • Classes 9 to 12
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading">
              {studentName} ({className})
            </h2>
            <p className="text-xs text-rose-200">
              Admission ID: <span className="font-mono font-bold text-white">{admissionNo}</span> • Roll No: 01 • CBSE Board Prep
            </p>
          </div>

          <div className="flex bg-black/30 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 text-xs font-bold gap-1">
            <button
              onClick={() => setActiveTab('academics')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'academics' ? 'bg-amber-400 text-slate-950 font-black' : 'text-white/80'
              }`}
            >
              My Grades
            </button>
            <button
              onClick={() => setActiveTab('timetable')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'timetable' ? 'bg-amber-400 text-slate-950 font-black' : 'text-white/80'
              }`}
            >
              Timetable
            </button>
            <button
              onClick={() => setActiveTab('homework')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'homework' ? 'bg-amber-400 text-slate-950 font-black' : 'text-white/80'
              }`}
            >
              Submit Homework
            </button>
            <button
              onClick={() => setActiveTab('cbse')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'cbse' ? 'bg-amber-400 text-slate-950 font-black' : 'text-white/80'
              }`}
            >
              CBSE & APAAR
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Grades & Scorecards */}
      {activeTab === 'academics' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                Periodic Assessment 1 (PA-1) Scholastic Scorecard
              </h3>
              <p className="text-xs text-slate-500">Official CBSE 9-Point Grade Scheme</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Standing: Top 5% in Class 10
            </span>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Max Marks</th>
                <th className="py-2.5 px-3">Marks Scored</th>
                <th className="py-2.5 px-3">CBSE Grade</th>
                <th className="py-2.5 px-3">Subject Teacher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Mathematics (041)</td>
                <td className="py-2.5 px-3 font-mono">20</td>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-900">19</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">A1</td>
                <td className="py-2.5 px-3 text-slate-500">Rakesh Sharma</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Science (086)</td>
                <td className="py-2.5 px-3 font-mono">20</td>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-900">19</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">A1</td>
                <td className="py-2.5 px-3 text-slate-500">Sunita Verma</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">English Language (184)</td>
                <td className="py-2.5 px-3 font-mono">20</td>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-900">18</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">A2</td>
                <td className="py-2.5 px-3 text-slate-500">Priya Joshi</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Social Science (087)</td>
                <td className="py-2.5 px-3 font-mono">20</td>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-900">18</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">A2</td>
                <td className="py-2.5 px-3 text-slate-500">Kavita Bishnoi</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Timetable */}
      {activeTab === 'timetable' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 font-heading">
            Today's Schedule & Period Roster
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {timetable.map((t) => (
              <div key={t.period} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                  <span>Period {t.period}</span>
                  <span className="font-mono text-slate-600">{t.time}</span>
                </div>
                <div className="font-bold text-slate-900 text-sm">{t.subject}</div>
                <div className="text-slate-500">Teacher: {t.teacher}</div>
                <div className="text-[11px] font-semibold text-red-700">{t.room}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Submit Homework */}
      {activeTab === 'homework' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 font-heading">
            Pending Senior Assignments & Solution Uploads
          </h3>

          <div className="space-y-3">
            {seniorAssignments.map((a) => {
              const isDone = submittedHw[a.id];
              return (
                <div key={a.id} className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                      {a.subject}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{a.title}</h4>
                    <p className="text-slate-500 text-[11px]">Due Date: {a.due} • Teacher: {a.teacher}</p>
                  </div>

                  <div>
                    {isDone ? (
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl font-bold flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Submitted & Verified</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSubmitHw(a.id)}
                        className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shadow transition flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Solution (PDF/Photo)</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: CBSE & APAAR Identifiers */}
      {activeTab === 'cbse' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 text-xs text-slate-700">
          <h3 className="font-extrabold text-sm text-slate-900 font-heading">
            CBSE Board Registration & Govt. Education Identifiers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border space-y-1">
              <span className="text-slate-400 text-[11px]">APAAR ID (Automated Permanent Academic Account Registry):</span>
              <div className="font-mono font-bold text-sm text-slate-900">APAAR-9821-4402-1190</div>
              <div className="text-emerald-700 font-semibold text-[11px]">Verified with DigiLocker</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border space-y-1">
              <span className="text-slate-400 text-[11px]">PEN (Permanent Education Number):</span>
              <div className="font-mono font-bold text-sm text-slate-900">PEN-RAJ-2023-89104</div>
              <div className="text-emerald-700 font-semibold text-[11px]">Active in UDISE+ Registry</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border space-y-1">
              <span className="text-slate-400 text-[11px]">CBSE LOC Candidate Status:</span>
              <div className="font-bold text-slate-900">Regular Candidate • 2026 Board Examination</div>
              <div className="text-slate-500">M.D. Children Academy (School Code: 1142)</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border space-y-1">
              <span className="text-slate-400 text-[11px]">Subjects Registered for Board:</span>
              <div className="font-bold text-slate-900">
                Mathematics, Science, English Language, Social Science, Hindi, AI
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
