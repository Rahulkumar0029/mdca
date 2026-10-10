import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  CalendarCheck2,
  Award,
  Bell,
  Globe,
  LogOut,
  Sparkles,
  GraduationCap,
  ChevronDown,
  Menu,
  X,
  Shield,
  Layers
} from 'lucide-react';
import { INITIAL_STUDENTS, StudentData } from './data/mockData';
import { PublicWebsite } from './components/PublicWebsite';
import { ErpDashboard } from './components/ErpDashboard';
import { StudentModule } from './components/StudentModule';
import { FeeCounterModule } from './components/FeeCounterModule';
import { AttendanceModule } from './components/AttendanceModule';
import { ExamsModule } from './components/ExamsModule';
import { NoticeBoardModule } from './components/NoticeBoardModule';
import { AdmissionEnquiryModal } from './components/AdmissionEnquiryModal';
import { ReceiptModal } from './components/ReceiptModal';

type AppView = 'website' | 'erp';
type ErpModule = 'dashboard' | 'students' | 'fees' | 'attendance' | 'exams' | 'notices';
type UserRole = 'PRINCIPAL' | 'ACCOUNTANT' | 'TEACHER' | 'PARENT';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('website');
  const [activeModule, setActiveModule] = useState<ErpModule>('dashboard');
  const [activeRole, setActiveRole] = useState<UserRole>('PRINCIPAL');
  const [students, setStudents] = useState<StudentData[]>(INITIAL_STUDENTS);

  // Modals state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<any | null>(null);
  const [selectedStudentForPayment, setSelectedStudentForPayment] = useState<StudentData | null>(null);

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handler when payment is completed
  const handlePaymentSuccess = (studentId: string, amount: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, feeDue: Math.max(0, s.feeDue - amount) } : s))
    );
  };

  const navigateToModule = (mod: ErpModule) => {
    setActiveModule(mod);
    setMobileMenuOpen(false);
  };

  const handleSelectStudentForPayment = (student: StudentData) => {
    setSelectedStudentForPayment(student);
    setActiveModule('fees');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* View 1: Public School Website */}
      {currentView === 'website' && (
        <PublicWebsite
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
          onOpenErp={() => setCurrentView('erp')}
        />
      )}

      {/* View 2: School Web ERP Portal */}
      {currentView === 'erp' && (
        <div className="flex h-screen overflow-hidden bg-slate-100">
          {/* ERP Left Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-white flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-0 -translate-x-full'
            }`}
          >
            {/* Sidebar Brand Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center font-bold text-amber-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="font-heading font-extrabold text-sm tracking-tight text-white">
                    MDCA ERP
                  </h1>
                  <p className="text-[10px] text-slate-400">Raisinghnagar, Raj.</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Academic Year Pill */}
            <div className="px-5 py-3 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Academic Session</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">
                2026-2027
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
              <button
                onClick={() => navigateToModule('dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeModule === 'dashboard'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-blue-400" />
                <span>Executive Dashboard</span>
              </button>

              <button
                onClick={() => navigateToModule('students')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeModule === 'students'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Student Directory (SIS)</span>
              </button>

              <button
                onClick={() => navigateToModule('fees')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeModule === 'fees'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Fee Collection Counter</span>
              </button>

              <button
                onClick={() => navigateToModule('attendance')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeModule === 'attendance'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <CalendarCheck2 className="w-4 h-4 text-cyan-400" />
                <span>Daily Class Attendance</span>
              </button>

              <button
                onClick={() => navigateToModule('exams')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeModule === 'exams'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4 text-purple-400" />
                <span>Exams & CBSE Reports</span>
              </button>

              <button
                onClick={() => navigateToModule('notices')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeModule === 'notices'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Bell className="w-4 h-4 text-rose-400" />
                <span>Notice Board & Broadcasts</span>
              </button>
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => setCurrentView('website')}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium rounded-xl transition"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Visit Public Website</span>
              </button>
            </div>
          </aside>

          {/* ERP Main Right Content Area */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            {/* Top Bar */}
            <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-30">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="font-extrabold text-base text-slate-900 font-heading">
                    M.D. Children Academy (MDCA)
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    CBSE Affiliation: 1730999 | Vijaynagar Road, Raisinghnagar
                  </p>
                </div>
              </div>

              {/* Top Controls: Role Switcher Demo */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs">
                  <span className="text-[11px] font-semibold text-slate-500 px-2">Role:</span>
                  {(['PRINCIPAL', 'ACCOUNTANT', 'TEACHER'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setActiveRole(r)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                        activeRole === r
                          ? 'bg-blue-900 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {r === 'PRINCIPAL' ? 'Principal' : r === 'ACCOUNTANT' ? 'Accounts' : 'Teacher'}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentView('website')}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Website</span>
                </button>
              </div>
            </header>

            {/* Scrollable Main View Container */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-100">
              <div className="max-w-7xl mx-auto">
                {activeModule === 'dashboard' && (
                  <ErpDashboard
                    students={students}
                    onNavigate={(m) => setActiveModule(m as ErpModule)}
                  />
                )}

                {activeModule === 'students' && (
                  <StudentModule
                    students={students}
                    onSelectForPayment={handleSelectStudentForPayment}
                  />
                )}

                {activeModule === 'fees' && (
                  <FeeCounterModule
                    students={students}
                    selectedStudent={selectedStudentForPayment}
                    onReceiptGenerated={(r) => setReceiptData(r)}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                )}

                {activeModule === 'attendance' && (
                  <AttendanceModule students={students} />
                )}

                {activeModule === 'exams' && (
                  <ExamsModule students={students} />
                )}

                {activeModule === 'notices' && (
                  <NoticeBoardModule />
                )}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <AdmissionEnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />

      <ReceiptModal
        isOpen={Boolean(receiptData)}
        onClose={() => setReceiptData(null)}
        receiptData={receiptData}
      />
    </div>
  );
}
