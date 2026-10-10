import React, { useState } from 'react';
import { INITIAL_STUDENTS, StudentData } from './data/mockData';
import { PortalNavbar, PortalRole } from './components/portals/PortalNavbar';
import { PrincipalPortal } from './components/portals/PrincipalPortal';
import { AccountsPortal } from './components/portals/AccountsPortal';
import { TeacherPortal } from './components/portals/TeacherPortal';
import { ParentPortal } from './components/portals/ParentPortal';
import { SeniorStudentPortal } from './components/portals/SeniorStudentPortal';
import { PublicWebsite } from './components/PublicWebsite';
import { AdmissionEnquiryModal } from './components/AdmissionEnquiryModal';
import { ReceiptModal } from './components/ReceiptModal';

export default function App() {
  const [currentRole, setCurrentRole] = useState<PortalRole>('PRINCIPAL');
  const [isWebsiteView, setIsWebsiteView] = useState(false);
  const [students, setStudents] = useState<StudentData[]>(INITIAL_STUDENTS);

  // Modals state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<any | null>(null);

  const handlePaymentSuccess = (studentId: string, amount: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, feeDue: Math.max(0, s.feeDue - amount) } : s))
    );
  };

  const handleParentPayFee = (childName: string, amount: number) => {
    const student = students.find((s) => s.name.toLowerCase().includes(childName.toLowerCase().split(' ')[0])) || students[0];
    const receiptNo = `MDCA-2026-UPI-${Math.floor(10000 + Math.random() * 90000)}`;

    const newReceipt = {
      receiptNo,
      studentName: student.name,
      admissionNo: student.admissionNo,
      classSection: `${student.class} - ${student.section}`,
      amount,
      mode: 'UPI',
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      period: 'Q2 (July - Sept 2026)',
      feeHead: 'Tuition & Composite Term Fee',
    };

    handlePaymentSuccess(student.id, amount);
    setReceiptData(newReceipt);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      {/* If Public Website View is Active */}
      {isWebsiteView ? (
        <div className="relative">
          <div className="bg-slate-900 text-white text-xs px-4 py-2 flex justify-between items-center border-b border-slate-800">
            <span>You are viewing the Public Website of M.D. Children Academy</span>
            <button
              onClick={() => setIsWebsiteView(false)}
              className="px-3 py-1 bg-amber-400 text-slate-950 font-bold rounded-lg text-xs hover:bg-amber-300 transition"
            >
              ← Back to School ERP Portals
            </button>
          </div>
          <PublicWebsite
            onOpenEnquiry={() => setIsEnquiryOpen(true)}
            onOpenErp={() => setIsWebsiteView(false)}
          />
        </div>
      ) : (
        <>
          {/* Top Universal Navbar with Quick Role Switcher */}
          <PortalNavbar
            currentRole={currentRole}
            onRoleChange={(r) => setCurrentRole(r)}
            onOpenWebsite={() => setIsWebsiteView(true)}
          />

          {/* Main Role-Specific Portal Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {/* 1. PRINCIPAL / DIRECTOR PORTAL */}
            {currentRole === 'PRINCIPAL' && (
              <PrincipalPortal students={students} />
            )}

            {/* 2. FEES & ACCOUNTS DEPARTMENT PORTAL */}
            {currentRole === 'ACCOUNTS' && (
              <AccountsPortal
                students={students}
                onReceiptGenerated={(r) => setReceiptData(r)}
                onPaymentSuccess={handlePaymentSuccess}
              />
            )}

            {/* 3. CLASS TEACHER & SUBJECT TEACHER PORTAL */}
            {currentRole === 'TEACHER' && (
              <TeacherPortal students={students} />
            )}

            {/* 4. PARENT PORTAL (Multi-ward switcher: Aarav Class 10 & Ananya Class 6) */}
            {currentRole === 'PARENT' && (
              <ParentPortal onPayFeeForChild={handleParentPayFee} />
            )}

            {/* 5. SENIOR STUDENT PORTAL (Class 9 to 12) */}
            {currentRole === 'STUDENT' && (
              <SeniorStudentPortal
                studentName="Aarav Sharma"
                admissionNo="MDCA-2026-0042"
                className="Class 10 - Section A"
              />
            )}
          </main>
        </>
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
