import React, { useState } from 'react';
import {
  Home,
  User,
  Award,
  BookOpen,
  Calendar,
  CreditCard,
  Bell,
  Search,
  Menu,
  X,
  Globe,
  Shield,
  Layers,
  LogOut,
  ChevronDown,
  DoorOpen,
  FileText,
  Clock,
  Sparkles,
  GraduationCap
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

// New Digii Campus Modules (from screenshots)
import { DigiiCampusFeed } from './components/DigiiCampusFeed';
import { DigiiStudentProfile } from './components/DigiiStudentProfile';
import { DigiiExamResults } from './components/DigiiExamResults';
import { DigiiGatePass } from './components/DigiiGatePass';

type MainView = 'digii' | 'erp' | 'website';
type DigiiNav = 'feed' | 'profile' | 'result' | 'gatepass' | 'payments' | 'attendance';
type ErpModule = 'dashboard' | 'students' | 'fees' | 'attendance' | 'exams' | 'notices';

export default function App() {
  const [mainView, setMainView] = useState<MainView>('digii');
  const [digiiNav, setDigiiNav] = useState<DigiiNav>('feed');
  const [erpModule, setErpModule] = useState<ErpModule>('dashboard');
  const [students, setStudents] = useState<StudentData[]>(INITIAL_STUDENTS);

  // Modals state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<any | null>(null);
  const [selectedStudentForPayment, setSelectedStudentForPayment] = useState<StudentData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePaymentSuccess = (studentId: string, amount: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, feeDue: Math.max(0, s.feeDue - amount) } : s))
    );
  };

  const handleSelectStudentForPayment = (student: StudentData) => {
    setSelectedStudentForPayment(student);
    setErpModule('fees');
    setMainView('erp');
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      {/* ------------------------------------------------------------- */}
      {/* GLOBAL TOP NAVIGATION (Matches Digii Screenshots 1, 2, 3, 5)   */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-red-700 via-red-800 to-rose-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Left Brand Crest */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white/80 hover:text-white p-1"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow-sm">
              <GraduationCap className="w-6 h-6 text-red-700" />
              <div>
                <div className="font-heading font-black text-xs leading-none text-red-950 uppercase tracking-tight">
                  M.D. CHILDREN ACADEMY
                </div>
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  CBSE • MDCA CAMPUS
                </div>
              </div>
            </div>
          </div>

          {/* Center Digii Search Bar (Matching Digii Screenshot 1) */}
          <div className="hidden md:flex flex-1 max-w-md relative mx-4">
            <input
              type="text"
              placeholder="Search MDCA Digiicampus (students, circulars, marks)..."
              className="w-full text-xs py-2 pl-9 pr-4 bg-white/95 text-slate-800 placeholder-slate-400 rounded-full outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* Right Action Icons & View Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Switcher Pills */}
            <div className="bg-black/20 backdrop-blur-md p-1 rounded-xl flex items-center text-xs">
              <button
                onClick={() => setMainView('digii')}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                  mainView === 'digii' ? 'bg-white text-red-800 shadow' : 'text-white/80 hover:text-white'
                }`}
              >
                Digii Portal
              </button>
              <button
                onClick={() => setMainView('erp')}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                  mainView === 'erp' ? 'bg-white text-red-800 shadow' : 'text-white/80 hover:text-white'
                }`}
              >
                Admin ERP
              </button>
              <button
                onClick={() => setMainView('website')}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                  mainView === 'website' ? 'bg-white text-red-800 shadow' : 'text-white/80 hover:text-white'
                }`}
              >
                Website
              </button>
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1.5 right-1.5 ring-2 ring-red-700"></span>
            </button>

            {/* Profile Avatar */}
            <button
              onClick={() => {
                setMainView('digii');
                setDigiiNav('profile');
              }}
              className="w-8 h-8 rounded-full border-2 border-white/60 overflow-hidden shrink-0 hover:ring-2 hover:ring-white transition"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                alt="Rahul Kumar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as any).src = 'https://ui-avatars.com/api/?name=Rahul+Kumar&background=b91c1c&color=fff';
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* VIEW 1: DIGII CAMPUS STUDENT & PARENT EXPERIENCE              */}
      {/* ------------------------------------------------------------- */}
      {mainView === 'digii' && (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar (Matching Digii Screenshots 1, 2) */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 lg:static lg:w-full lg:col-span-3 lg:border lg:rounded-2xl lg:shadow-sm overflow-hidden flex flex-col transition-transform duration-200 ease-in-out ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            {/* Mobile Close Button */}
            <div className="p-3 border-b flex justify-end lg:hidden">
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Student Profile Card (Matching Digii Screenshot 1 Header) */}
            <div className="p-5 text-center bg-gradient-to-b from-red-50/70 to-white border-b border-slate-100">
              <div className="w-20 h-20 rounded-full border-2 border-red-600 p-0.5 mx-auto mb-3 shadow-md bg-white">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Rahul Kumar"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    (e.target as any).src = 'https://ui-avatars.com/api/?name=Rahul+Kumar&background=b91c1c&color=fff';
                  }}
                />
              </div>

              <h3 className="font-heading font-black text-sm text-slate-900">Rahul Kumar</h3>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                23240507 • 230160223017
              </div>
              <div className="text-[10px] font-semibold text-slate-600 mt-1 uppercase tracking-tight px-2 leading-tight">
                Class 12 - Senior Secondary (PCM & AI)
              </div>
              <button
                onClick={() => setDigiiNav('profile')}
                className="mt-2 text-[11px] font-bold text-red-700 hover:text-red-800 flex items-center justify-center gap-1 mx-auto"
              >
                <span>✎ View & Edit Profile</span>
              </button>
            </div>

            {/* Digii Navigation Links */}
            <nav className="p-3 space-y-1 text-xs font-semibold text-slate-700 overflow-y-auto">
              <button
                onClick={() => {
                  setDigiiNav('feed');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  digiiNav === 'feed'
                    ? 'bg-red-50 text-red-700 font-bold shadow-sm'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Home className="w-4 h-4 text-red-600" />
                <span>Home (Feed)</span>
              </button>

              <button
                onClick={() => {
                  setDigiiNav('profile');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  digiiNav === 'profile'
                    ? 'bg-red-50 text-red-700 font-bold shadow-sm'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>Profile & Records</span>
              </button>

              <button
                onClick={() => {
                  setDigiiNav('result');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  digiiNav === 'result'
                    ? 'bg-red-50 text-red-700 font-bold shadow-sm'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>Result & SGPA</span>
              </button>

              <button
                onClick={() => {
                  setDigiiNav('gatepass');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  digiiNav === 'gatepass'
                    ? 'bg-red-50 text-red-700 font-bold shadow-sm'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <DoorOpen className="w-4 h-4 text-purple-500" />
                <span>Gate Pass</span>
              </button>

              <button
                onClick={() => {
                  setDigiiNav('payments');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  digiiNav === 'payments'
                    ? 'bg-red-50 text-red-700 font-bold shadow-sm'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-500" />
                <span>Fee Payments & Dues</span>
              </button>

              <button
                onClick={() => {
                  setDigiiNav('attendance');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  digiiNav === 'attendance'
                    ? 'bg-red-50 text-red-700 font-bold shadow-sm'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-4 h-4 text-cyan-500" />
                <span>Attendance Log (94%)</span>
              </button>

              <div className="pt-3 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => setMainView('erp')}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-[11px] font-bold text-slate-700 hover:bg-slate-100"
                >
                  <span>Switch to Admin ERP</span>
                  <span className="text-[9px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded">Staff</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            {digiiNav === 'feed' && (
              <DigiiCampusFeed
                studentName="Rahul Kumar"
                admissionNo="23240507"
                onPayFee={() => setDigiiNav('payments')}
              />
            )}

            {digiiNav === 'profile' && (
              <DigiiStudentProfile />
            )}

            {digiiNav === 'result' && (
              <DigiiExamResults />
            )}

            {digiiNav === 'gatepass' && (
              <DigiiGatePass />
            )}

            {digiiNav === 'payments' && (
              <FeeCounterModule
                students={students}
                selectedStudent={students[0]}
                onReceiptGenerated={(r) => setReceiptData(r)}
                onPaymentSuccess={handlePaymentSuccess}
              />
            )}

            {digiiNav === 'attendance' && (
              <AttendanceModule students={students} />
            )}
          </main>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VIEW 2: SCHOOL ADMINISTRATIVE ERP PANEL                       */}
      {/* ------------------------------------------------------------- */}
      {mainView === 'erp' && (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">ERP Navigation:</span>
              {(['dashboard', 'students', 'fees', 'attendance', 'exams', 'notices'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setErpModule(m)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                    erpModule === m
                      ? 'bg-red-700 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMainView('digii')}
              className="text-xs font-bold text-red-700 hover:underline"
            >
              ← Return to Digii Student View
            </button>
          </div>

          {erpModule === 'dashboard' && (
            <ErpDashboard
              students={students}
              onNavigate={(m) => setErpModule(m as ErpModule)}
            />
          )}

          {erpModule === 'students' && (
            <StudentModule
              students={students}
              onSelectForPayment={handleSelectStudentForPayment}
            />
          )}

          {erpModule === 'fees' && (
            <FeeCounterModule
              students={students}
              selectedStudent={selectedStudentForPayment}
              onReceiptGenerated={(r) => setReceiptData(r)}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}

          {erpModule === 'attendance' && (
            <AttendanceModule students={students} />
          )}

          {erpModule === 'exams' && (
            <ExamsModule students={students} />
          )}

          {erpModule === 'notices' && (
            <NoticeBoardModule />
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VIEW 3: PUBLIC SCHOOL WEBSITE                                 */}
      {/* ------------------------------------------------------------- */}
      {mainView === 'website' && (
        <PublicWebsite
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
          onOpenErp={() => setMainView('digii')}
        />
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
