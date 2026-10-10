import React, { useState } from 'react';
import {
  FileText,
  Download,
  ThumbsUp,
  MessageSquare,
  Share2,
  Calendar,
  CreditCard,
  CheckCircle,
  HelpCircle,
  Send,
  User,
  Clock,
  Pin
} from 'lucide-react';

interface Props {
  studentName: string;
  admissionNo: string;
  onPayFee: () => void;
}

export const DigiiCampusFeed: React.FC<Props> = ({ studentName, admissionNo, onPayFee }) => {
  const [upvotes, setUpvotes] = useState<Record<string, number>>({ 'p-1': 24, 'p-2': 18 });
  const [userUpvoted, setUserUpvoted] = useState<Record<string, boolean>>({});
  const [postType, setPostType] = useState<'post' | 'question' | 'event'>('post');
  const [composerText, setComposerText] = useState('');

  const toggleUpvote = (id: string) => {
    setUserUpvoted((prev) => {
      const isUp = !prev[id];
      setUpvotes((uv) => ({
        ...uv,
        [id]: uv[id] + (isUp ? 1 : -1),
      }));
      return { ...prev, [id]: isUp };
    });
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto animate-fadeIn">
      {/* 1. Admission / Fee Process Card (Matching Digii Screenshot 1) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-3 font-heading">
          Admission & Enrollment Process
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Annual Registration Form Verified</div>
              <div className="text-[11px] text-slate-500">Completed for Academic Session 2026-27</div>
            </div>
          </div>

          <button
            onClick={onPayFee}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs rounded-xl shadow-md shadow-red-700/20 transition flex items-center justify-center gap-2"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pay Fee Online</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Digii Composer Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-xs font-semibold">
          <button
            onClick={() => setPostType('post')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              postType === 'post'
                ? 'bg-red-50 text-red-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>✏️ Post</span>
          </button>
          <button
            onClick={() => setPostType('question')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              postType === 'question'
                ? 'bg-red-50 text-red-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>❓ Ask Question</span>
          </button>
          <button
            onClick={() => setPostType('event')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              postType === 'event'
                ? 'bg-red-50 text-red-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>📅 Add Event</span>
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            placeholder={
              postType === 'question'
                ? 'Ask a question to subject teachers or administration...'
                : 'Share an update or academic note...'
            }
            className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-red-600"
          />
        </div>

        {composerText && (
          <div className="flex justify-end pt-1">
            <button
              onClick={() => {
                alert('Shared to campus community feed!');
                setComposerText('');
              }}
              className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-lg transition flex items-center gap-1.5"
            >
              <Send className="w-3 h-3" />
              <span>Broadcast</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Feed Filters */}
      <div className="flex justify-between items-center text-xs text-slate-500 px-1">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-red-600 focus:ring-red-500" />
            <span>Show all</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" />
            <span>Saved Posts</span>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold">Category:</span>
          <select className="bg-white border border-slate-200 text-slate-700 rounded-lg py-1 px-2 text-[11px] outline-none">
            <option>All Notifications</option>
            <option>Academics & CBSE</option>
            <option>Exams & Results</option>
            <option>Transport & Bus</option>
          </select>
        </div>
      </div>

      {/* 4. Digii Feed Post 1: Real-style Notice */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        {/* Author Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
              🏫
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <span>M.D. Children Academy</span>
                <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.2 rounded">Official</span>
              </div>
              <div className="text-[11px] text-slate-400">8 hrs ago • Vijaynagar Road Campus</div>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Notice #MDCA-2026/089</span>
        </div>

        {/* Notice Title */}
        <h4 className="font-extrabold text-sm text-slate-900 font-heading leading-snug">
          📢 Important: Notice for Senior Students : Scholarship & CBSE Registration Verification (Batch 2026-27) - Last Date Extended
        </h4>

        {/* Notice Body */}
        <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
          <p>Dear Students & Parents,</p>
          <p>
            Welcome to the academic term! Please submit your verified scholarship documents, Aadhaar linkage,
            and subject group confirmation to the Senior Academic Office by the extended deadline.
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium pl-1">
            <li>Submission Deadline: <strong>15th October 2026</strong></li>
            <li>Physical copies required: APAAR ID Card, Previous Marksheet copy, and Category certificate (if applicable).</li>
            <li>No extensions beyond this date will be entertained for CBSE LOC registration.</li>
          </ul>
          <p className="italic text-slate-500">Best of luck for your upcoming assessments!</p>
        </div>

        {/* Attachment Card (Matching Digii Screenshot 2) */}
        <div className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between transition cursor-pointer">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-800">Scholarship_Verification_Form_2026.pdf</div>
              <div className="text-[10px] text-slate-400">PDF Document • 420 KB</div>
            </div>
          </div>
          <button className="p-2 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition">
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Author Footer & Social Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
          <div className="text-slate-500 text-[11px]">
            Posted by <strong className="text-slate-800">Mr. Mohit Maan (Academic Coordinator)</strong>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => toggleUpvote('p-1')}
              className={`flex items-center gap-1.5 transition font-semibold ${
                userUpvoted['p-1'] ? 'text-red-600' : 'hover:text-slate-900'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Upvote ({upvotes['p-1']})</span>
            </button>

            <button className="flex items-center gap-1.5 hover:text-slate-900 transition">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Comment (3)</span>
            </button>

            <button className="flex items-center gap-1.5 hover:text-slate-900 transition">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Digii Feed Post 2 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              🏆
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">MDCA Sports & Extracurricular Club</div>
              <div className="text-[11px] text-slate-400">Yesterday at 11:25 am</div>
            </div>
          </div>
        </div>

        <h4 className="font-bold text-sm text-slate-900 font-heading">
          Rajasthan State CBSE Inter-School Science & Robotics Exhibition 2026
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          MDCA students of Class 10 and 12 are invited to register their science models and robotics projects.
          Mentorship sessions are ongoing daily after period 6 in the AI/Robotics laboratory.
        </p>

        <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
          <div className="text-slate-500 text-[11px]">
            Posted by <strong className="text-slate-800">Sunita Verma (PGT Science)</strong>
          </div>
          <button
            onClick={() => toggleUpvote('p-2')}
            className={`flex items-center gap-1.5 transition font-semibold ${
              userUpvoted['p-2'] ? 'text-red-600' : 'hover:text-slate-900'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Upvote ({upvotes['p-2']})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
