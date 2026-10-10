export interface StudentData {
  id: string;
  admissionNo: string;
  srNo: string;
  name: string;
  class: string;
  section: string;
  rollNo: number;
  gender: 'Male' | 'Female';
  dob: string;
  parentName: string;
  mobile: string;
  status: 'Active' | 'TC_Issued';
  feeDue: number; // in Rupees
  attendancePercent: number;
}

export const INITIAL_STUDENTS: StudentData[] = [
  {
    id: 's-101',
    admissionNo: 'MDCA-2026-0042',
    srNo: 'SR-1142',
    name: 'Aarav Sharma',
    class: 'Class 10',
    section: 'A',
    rollNo: 1,
    gender: 'Male',
    dob: '2011-08-15',
    parentName: 'Ramesh Sharma',
    mobile: '9876543210',
    status: 'Active',
    feeDue: 7500,
    attendancePercent: 94,
  },
  {
    id: 's-102',
    admissionNo: 'MDCA-2026-0043',
    srNo: 'SR-1143',
    name: 'Ananya Verma',
    class: 'Class 10',
    section: 'A',
    rollNo: 2,
    gender: 'Female',
    dob: '2011-04-20',
    parentName: 'Sunil Verma',
    mobile: '9829012345',
    status: 'Active',
    feeDue: 0,
    attendancePercent: 98,
  },
  {
    id: 's-103',
    admissionNo: 'MDCA-2026-0089',
    srNo: 'SR-1189',
    name: 'Kabir Singh Rathore',
    class: 'Class 12',
    section: 'PCM',
    rollNo: 14,
    gender: 'Male',
    dob: '2009-11-02',
    parentName: 'Mahendra Singh',
    mobile: '9414267890',
    status: 'Active',
    feeDue: 12000,
    attendancePercent: 88,
  },
  {
    id: 's-104',
    admissionNo: 'MDCA-2026-0112',
    srNo: 'SR-1212',
    name: 'Priya Godara',
    class: 'Class 12',
    section: 'Commerce',
    rollNo: 5,
    gender: 'Female',
    dob: '2009-02-18',
    parentName: 'Rajendra Godara',
    mobile: '9460011223',
    status: 'Active',
    feeDue: 4500,
    attendancePercent: 91,
  },
  {
    id: 's-105',
    admissionNo: 'MDCA-2026-0156',
    srNo: 'SR-1256',
    name: 'Harmanpreet Kaur',
    class: 'Class 8',
    section: 'B',
    rollNo: 19,
    gender: 'Female',
    dob: '2013-06-12',
    parentName: 'Gurpreet Singh',
    mobile: '9982345678',
    status: 'Active',
    feeDue: 0,
    attendancePercent: 96,
  },
  {
    id: 's-106',
    admissionNo: 'MDCA-2026-0201',
    srNo: 'SR-1301',
    name: 'Devendra Meena',
    class: 'Class 6',
    section: 'A',
    rollNo: 8,
    gender: 'Male',
    dob: '2015-09-09',
    parentName: 'Mukesh Meena',
    mobile: '9784561230',
    status: 'Active',
    feeDue: 3500,
    attendancePercent: 82,
  },
];

export const INITIAL_NOTICES = [
  {
    id: 'n-1',
    title: 'Admissions Open for Session 2026-27 (Nursery to Class 12)',
    category: 'ADMISSIONS',
    date: '10 Oct 2026',
    body: 'Registration forms for admission in classes Nursery to 12th (Science PCM/PCB, Commerce & Arts) are now available online and at the school reception.',
    badge: 'Important',
  },
  {
    id: 'n-2',
    title: 'Schedule for Periodic Assessment 2 (PA-2)',
    category: 'ACADEMICS',
    date: '08 Oct 2026',
    body: 'The date sheet and syllabus for PA-2 examinations for classes 6th to 12th have been published on the student portal. Exams commence from 24th October.',
    badge: 'Exams',
  },
  {
    id: 'n-3',
    title: 'Parent-Teacher Meeting (PTM) Notification',
    category: 'EVENTS',
    date: '05 Oct 2026',
    body: 'PTM for term review is scheduled for this Saturday between 8:30 AM to 12:30 PM. Parents are requested to attend according to their designated roll slots.',
    badge: 'Meeting',
  },
];
