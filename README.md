# M.D. Children Academy (MDCA) — School ERP, Website & Mobile App

> **Comprehensive Enterprise Platform Blueprint & Working Implementation**  
> Developed for **M.D. Children Academy (MDCA)**, Vijaynagar Road, Raisinghnagar, Rajasthan - 335051  
> CBSE Affiliation No: **1730999** | School Code: **1142**

---

## 📌 Architecture Overview

This project implements the architecture outlined in the **MDCA School ERP Project Blueprint**:

1. **Modular Monolith Backend (`/backend`)**:
   * **Node.js, Express, TypeScript, Prisma ORM**.
   * **Multi-tenant by design**: Every table has `school_id` from day one for seamless multi-branch scalability.
   * **Integer Paise Precision**: All monetary values (`amount_due_paise`, `concession_paise`, `amount_paid_paise`) are stored as integers to prevent rounding loss.
   * **Receipt Sequencing**: Sequential numbering (`MDCA-YYYY-XXXXX`) generated within database transactions.
   * **Security**: Helmet, CORS, Argon2/Bcrypt password hashing, short-lived JWTs (15 min) + Refresh Tokens (30 days), and RBAC.

2. **Web ERP & Public Website (`/frontend`)**:
   * **React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons**.
   * **Integrated Public Portal**: Hero banner, Admissions 2026-27 notice ticker, CBSE Mandatory Public Disclosure (Appendix IX), and live Admission Enquiry form connected to the ERP CRM.
   * **Administrative ERP Panel**:
     * 📊 **Executive Dashboard**: Live student counts, attendance rates, daily/monthly collections, defaulter tracking.
     * 🎓 **Student Information System (SIS)**: Directory with search/filters and 360° student drawer (Personal info, Fee Ledger, Attendance %, CBSE Marks).
     * 💰 **Fee Collection Counter**: Keyboard-friendly collection, concession discounts, payment modes (UPI with dynamic QR, Cash, Cheque), and **printable official fee receipt**.
     * 📅 **Daily Attendance Register**: One-tap Present/Absent/Late marking, class rate calculations, and automated parent absence alert triggers.
     * 📝 **Examinations & Report Cards**: Fast spreadsheet marks entry grid (Max marks 20/80) with automatic CBSE 9-point grading (A1–E2) and printable report cards.
     * 📢 **Notice Board & Broadcasts**: Live notice composition and multi-channel broadcast feed.

---

## 🚀 Quick Start Guide

### 1. Backend API (`/backend`)

The backend comes preconfigured with zero-config SQLite for instant local development, while keeping [schema.postgresql.prisma](file:///c:/Users/rahul/OneDrive/Desktop/Projects/MDCA/backend/prisma/schema.postgresql.prisma) ready for PostgreSQL production deployments.

```powershell
cd backend
npm install
npx prisma generate
npx prisma db push
npm run seed      # Populates MDCA School, Staff, Class 10, Students & Ledgers
npm run dev       # Starts API server on http://localhost:5000
```

* **Health Check**: `GET http://localhost:5000/health`
* **Sample Accounts** (Password: `Admin@123`):
  * **Principal**: Mobile `9876543210` (`Dr. Ramesh Sharma`)
  * **Accountant**: Mobile `9876543211` (`Vikram Singh`)
  * **Teacher**: Mobile `9876543212` (`Sunita Verma`)

### 2. Frontend Web App (`/frontend`)

```powershell
cd frontend
npm install
npm run dev       # Starts Vite dev server on http://localhost:3000
```

Open **[http://localhost:3000/](http://localhost:3000/)** in your browser.
* Switch between the **Public Website** and the **ERP Portal** anytime via the top bar button.
* Test different role views (**Principal**, **Accounts**, **Teacher**) via the role toggle in the ERP header.

---

## 🗄️ Database Schemas & Models

| Model | Primary Purpose | Key Columns |
| :--- | :--- | :--- |
| `School` | School profile & branding | `name`, `code`, `board_affiliation_no`, `settings_json` |
| `AcademicYear` | Session management | `name (2026-2027)`, `start_date`, `end_date`, `is_current` |
| `User` | Authentication & RBAC | `mobile`, `email`, `password_hash`, `role`, `is_active` |
| `Student` | Student demographics (SIS) | `admission_no`, `sr_no`, `apaar_id`, `name`, `dob`, `status` |
| `Class` & `Section` | Academic structure | `name`, `display_order`, `stream (PCM/PCB/Commerce/Arts)` |
| `StudentFeeLedger`| Student quarterly billing | `period_label`, `amount_due_paise`, `amount_paid_paise`, `status` |
| `Payment` | Append-only fee transactions | `receipt_no`, `total_amount_paise`, `mode`, `paid_at` |
| `AttendanceSession`| Daily class attendance | `section_id`, `date`, `locked_at`, `taken_by_id` |
| `Exam` & `Mark` | CBSE examinations | `max_marks`, `marks_obtained`, `grade (A1-E2)`, `locked` |
| `Enquiry` | Website CRM admissions | `child_name`, `parent_name`, `mobile`, `class_sought`, `status` |
| `AuditLog` | Security & compliance audit | `user_id`, `action`, `entity`, `old_value`, `new_value`, `timestamp` |

---

## 📂 Project Directory Structure

```
MDCA/
├── MDCA_School_ERP_Project_Blueprint (1).pdf
├── README.md
├── backend/
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   ├── schema.prisma           # Active local schema
│   │   ├── schema.postgresql.prisma# Production PostgreSQL schema
│   │   └── seed.ts                 # Idempotent MDCA seed script
│   └── src/
│       ├── index.ts                # Express entry point
│       ├── middleware/             # Auth, RBAC, ErrorHandler
│       ├── modules/
│       │   ├── auth/               # Login, tokens, /me
│       │   ├── students/           # SIS, 360 profile
│       │   ├── attendance/         # Register & batch sync
│       │   ├── fees/               # Ledgers & counter collection
│       │   ├── reports/            # Executive analytics
│       │   └── notices/            # Notices & Enquiry CRM
│       └── utils/                  # Prisma client singleton
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── index.html
    └── src/
        ├── App.tsx                 # View & Role routing
        ├── data/mockData.ts        # Seed mock data
        └── components/
            ├── PublicWebsite.tsx   # Landing page & admissions
            ├── ErpDashboard.tsx    # Executive KPIs
            ├── StudentModule.tsx   # SIS with 360° drawer
            ├── FeeCounterModule.tsx# Fee billing counter
            ├── AttendanceModule.tsx# One-tap attendance register
            ├── ExamsModule.tsx     # Marks entry & report cards
            ├── NoticeBoardModule.tsx# Broadcasts & circulars
            ├── ReceiptModal.tsx    # Printable official receipt
            └── AdmissionEnquiryModal.tsx # CRM enquiry form
```

---

## 📋 Next Phases (from Roadmap)

1. **Phase 2 Integrations**:
   * Razorpay online checkout modal and server webhook listener for instant automated receipt SMS.
   * Trai DLT-registered SMS & WhatsApp Business API templates for automated absence triggers.
   * Student ID cards bulk print generation with dynamic QR codes.
2. **Mobile App**:
   * Flutter or React Native app for Parent/Student & Teacher daily attendance and marks review.
