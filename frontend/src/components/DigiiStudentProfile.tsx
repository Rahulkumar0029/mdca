import React, { useState } from 'react';
import {
  User,
  RefreshCw,
  Edit2,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface Props {
  studentName?: string;
  registrationId?: string;
  applicationNumber?: string;
  email?: string;
  phone?: string;
}

export const DigiiStudentProfile: React.FC<Props> = ({
  studentName = 'Rahul Kumar',
  registrationId = '230160223017',
  applicationNumber = '23240507',
  email = 'rahulkumarbishnoipb@gmail.com',
  phone = '91-9602670029',
}) => {
  const [activeTab, setActiveTab] = useState<
    'e-portfolio' | 'official-record' | 'posts' | 'academics' | 'mentor' | 'certificates'
  >('official-record');

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Profile Banner (Matching Digii Screenshot 3 & 4) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Red / Crimson Header Strip */}
        <div className="h-32 bg-gradient-to-r from-red-600 via-red-700 to-rose-800 relative">
          <div className="absolute top-3 right-4 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-white text-xs font-semibold">
            Academic Session 2026-27
          </div>
        </div>

        {/* Profile Avatar & Title */}
        <div className="px-8 pb-6 relative pt-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 sm:-mt-14 mb-4">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-200 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
                alt={studentName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as any).src = 'https://ui-avatars.com/api/?name=Rahul+Kumar&background=b91c1c&color=fff';
                }}
              />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-black text-slate-900 font-heading">{studentName}</h2>
              <div className="text-xs text-slate-500 font-medium">
                4th Year Student • Roll / App No: <span className="font-mono text-slate-800 font-bold">{applicationNumber}</span>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-slate-200 text-xs font-semibold text-slate-600 space-x-6">
            <button
              onClick={() => setActiveTab('e-portfolio')}
              className={`py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === 'e-portfolio'
                  ? 'border-red-600 text-red-600 font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              E-portfolio
            </button>
            <button
              onClick={() => setActiveTab('official-record')}
              className={`py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === 'official-record'
                  ? 'border-red-600 text-red-600 font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Official Record
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === 'posts'
                  ? 'border-red-600 text-red-600 font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('academics')}
              className={`py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === 'academics'
                  ? 'border-red-600 text-red-600 font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Academics
            </button>
            <button
              onClick={() => setActiveTab('mentor')}
              className={`py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === 'mentor'
                  ? 'border-red-600 text-red-600 font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Mentor Details
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === 'certificates'
                  ? 'border-red-600 text-red-600 font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Certificates
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Official Record (Matching Digii Screenshot 4) */}
      {activeTab === 'official-record' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-base text-slate-900 font-heading">
              Basic Details
            </h3>
            <button
              title="Refresh Records"
              className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Photo Frame */}
            <div className="md:col-span-3 flex flex-col items-center">
              <div className="w-36 h-44 rounded-xl border border-slate-300 overflow-hidden shadow-sm bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                  alt="Official Photo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as any).src = 'https://ui-avatars.com/api/?name=Rahul+Kumar&background=b91c1c&color=fff';
                  }}
                />
              </div>
              <span className="text-xs text-slate-500 font-semibold mt-2">Official Photo</span>
            </div>

            {/* Right Information Key-Values */}
            <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs text-slate-700">
              <div className="space-y-0.5">
                <span className="text-slate-400">Full Name</span>
                <div className="font-bold text-slate-900 text-sm">{studentName}</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Registration ID</span>
                <div className="font-bold text-slate-900 font-mono text-sm">{registrationId}</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Application Number</span>
                <div className="font-bold text-slate-900 font-mono">{applicationNumber}</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Email Address</span>
                <div className="font-semibold text-slate-900">{email}</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Phone Number</span>
                <div className="font-semibold text-slate-900 font-mono">{phone}</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Programme / Stream</span>
                <div className="font-bold text-slate-900">
                  BACHELOR OF TECHNOLOGY - COMPUTER SCIENCE AND ENGINEERING (AI AND ML)
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Department / Wing</span>
                <div className="font-medium text-slate-900">School Of Engineering & Sciences</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Batch Year</span>
                <div className="font-medium text-slate-900">2023</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Academic Status</span>
                <div className="font-bold text-emerald-700">Regular</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Current Year</span>
                <div className="font-medium text-slate-900">4th Year</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Current Term</span>
                <div className="font-medium text-slate-900">7th Semester</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Quota</span>
                <div className="font-medium text-slate-900">General</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Admission Type</span>
                <div className="font-medium text-slate-900">Regular</div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400">Section</span>
                <div className="font-bold text-slate-900">A_Group 2</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: E-portfolio (Matching Digii Screenshot 3) */}
      {activeTab === 'e-portfolio' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="font-bold text-sm text-slate-900">Short Bio</h3>
            <button className="text-slate-400 hover:text-slate-700 p-1">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-600 italic">
            Computer science scholar specializing in Machine Learning, modern web development, and educational technologies.
          </p>

          <div className="flex justify-between items-center border-b pb-3 pt-2">
            <h3 className="font-bold text-sm text-slate-900">Education Qualifications</h3>
            <button className="text-slate-400 hover:text-slate-700 p-1">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="py-6 text-center text-slate-400 space-y-2">
            <FileText className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-xs">No records found</p>
          </div>

          <div className="flex justify-between items-center border-b pb-3 pt-2">
            <h3 className="font-bold text-sm text-slate-900">Experience</h3>
            <button className="text-slate-400 hover:text-slate-700 p-1">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="py-6 text-center text-slate-400 space-y-2">
            <FileText className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-xs">No records found</p>
          </div>
        </div>
      )}
    </div>
  );
};
