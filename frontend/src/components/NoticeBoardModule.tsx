import React, { useState } from 'react';
import { Bell, Plus, Calendar, Tag, CheckCircle2, Megaphone, Send } from 'lucide-react';
import { INITIAL_NOTICES } from '../data/mockData';

export const NoticeBoardModule: React.FC = () => {
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [showCompose, setShowCompose] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'GENERAL',
    body: '',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.body) return;

    const created = {
      id: `n-${Date.now()}`,
      title: newNotice.title,
      category: newNotice.category,
      date: 'Today',
      body: newNotice.body,
      badge: 'Broadcast',
    };

    setNotices([created, ...notices]);
    setShowCompose(false);
    setNewNotice({ title: '', category: 'GENERAL', body: '' });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Notice Board, Circulars & Parent Broadcasts
          </h2>
          <p className="text-xs text-slate-500">
            Push notifications, WhatsApp alerts & official school event updates
          </p>
        </div>

        <button
          onClick={() => setShowCompose(!showCompose)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {showCompose && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-lg space-y-4">
          <h3 className="font-bold text-sm text-blue-950 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-blue-900" />
            <span>Compose Official Broadcast</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Title *</label>
              <input
                type="text"
                required
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                placeholder="e.g. Winter Uniform Guidelines"
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={newNotice.category}
                onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg outline-none bg-white"
              >
                <option value="GENERAL">General Notice</option>
                <option value="ACADEMICS">Academics & Tests</option>
                <option value="HOLIDAY">Holiday & Calendar</option>
                <option value="ADMISSIONS">Admissions</option>
                <option value="TRANSPORT">Transport & Bus</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Broadcast Message Body *</label>
            <textarea
              rows={3}
              required
              value={newNotice.body}
              onChange={(e) => setNewNotice({ ...newNotice, body: e.target.value })}
              placeholder="Full text of circular or notice..."
              className="w-full p-2.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowCompose(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast to Parents & App</span>
            </button>
          </div>
        </form>
      )}

      {/* Notice Feed */}
      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                  {n.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {n.date}
                </span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                Audience: All Parents & Students
              </span>
            </div>

            <h3 className="font-bold text-base text-slate-900 font-heading">{n.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
