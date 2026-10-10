import React from 'react';
import {
  GraduationCap,
  Bell,
  Search,
  UserCheck,
  ChevronDown,
  Globe,
  ShieldCheck,
  LogOut
} from 'lucide-react';

export type PortalRole = 'PRINCIPAL' | 'ACCOUNTS' | 'TEACHER' | 'PARENT' | 'STUDENT';

interface Props {
  currentRole: PortalRole;
  onRoleChange: (role: PortalRole) => void;
  onOpenWebsite: () => void;
}

export const PortalNavbar: React.FC<Props> = ({ currentRole, onRoleChange, onOpenWebsite }) => {
  const roleLabels: Record<PortalRole, { title: string; subtitle: string; badge: string; color: string }> = {
    PRINCIPAL: {
      title: 'Dr. Ramesh Sharma',
      subtitle: 'Principal & Director',
      badge: 'Executive Oversight',
      color: 'bg-purple-900 text-purple-200 border-purple-700',
    },
    ACCOUNTS: {
      title: 'Vikram Singh',
      subtitle: 'Chief Accountant',
      badge: 'Fee & Billing Desk',
      color: 'bg-emerald-900 text-emerald-200 border-emerald-700',
    },
    TEACHER: {
      title: 'Sunita Verma',
      subtitle: 'Class Teacher (10-A) & PGT Physics',
      badge: 'Academic In-Charge',
      color: 'bg-blue-900 text-blue-200 border-blue-700',
    },
    PARENT: {
      title: 'Sunil Verma',
      subtitle: 'Parent of Aarav (10-A) & Ananya (6-B)',
      badge: 'Parent & Ward Portal',
      color: 'bg-amber-900 text-amber-200 border-amber-700',
    },
    STUDENT: {
      title: 'Aarav Sharma',
      subtitle: 'Class 10-A • Roll 01 (Senior Wing)',
      badge: 'Student Portal (Class 9-12)',
      color: 'bg-red-900 text-red-200 border-red-700',
    },
  };

  const currentInfo = roleLabels[currentRole];

  return (
    <header className="sticky top-0 z-40 bg-navy-900 text-white shadow-soft-2 border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left School Crest */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2.5 bg-ivory-100 text-navy-900 px-3 py-1.5 rounded-md shadow-sm border border-brass-500/20">
            <GraduationCap className="w-5 h-5 text-brass-600" />
            <div>
              <div className="font-heading font-black text-xs leading-none text-navy-950 uppercase tracking-tight">
                M.D. CHILDREN ACADEMY
              </div>
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                CBSE • RAISINGHNAGAR (1730999)
              </div>
            </div>
          </div>
        </div>

        {/* Center Universal Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative mx-4">
          <input
            type="text"
            placeholder="Search student, admission number, fee receipt, or circular..."
            className="w-full text-xs py-2 pl-9 pr-4 bg-white/95 text-slate-800 placeholder-slate-400 rounded-full outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Right Role-Switcher Selector (Interactive Simulation of Multiple Logins) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/15">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider hidden sm:inline">
              Login View:
            </span>
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as PortalRole)}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer pr-1"
            >
              <option value="PRINCIPAL" className="text-slate-900 font-semibold">
                👑 Principal Portal (Executive)
              </option>
              <option value="ACCOUNTS" className="text-slate-900 font-semibold">
                💰 Fees Department (Counter & Dues)
              </option>
              <option value="TEACHER" className="text-slate-900 font-semibold">
                👩‍🏫 Class & Subject Teacher (Class 10-A)
              </option>
              <option value="PARENT" className="text-slate-900 font-semibold">
                👨‍👩‍👧 Parent Portal (Multi-Child)
              </option>
              <option value="STUDENT" className="text-slate-900 font-semibold">
                🎓 Senior Student (Class 9-12)
              </option>
            </select>
          </div>

          {/* Website Button */}
          <button
            onClick={onOpenWebsite}
            title="Open School Public Website"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition"
          >
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>Public Website</span>
          </button>

          {/* Notification Alert */}
          <button className="relative p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1.5 right-1.5 ring-2 ring-red-700"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
