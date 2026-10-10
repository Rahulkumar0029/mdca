# M.D. Children Academy (MDCA) — Enterprise School ERP & Portals

> **Complete School Operating System & Multi-Role Educational Platform**  
> M.D. Children Academy (MDCA), Vijaynagar Road, Raisinghnagar, Rajasthan - 335051  
> CBSE Affiliation No: **1730999** | School Code: **1142**

---

## 🏛️ Distinct Role-Based Portals

Unlike generic university LMS platforms, MDCA provides **strictly scoped, tailored operational portals** for each role in the school ecosystem:

| Portal | Primary User | Core Capabilities & Scoping |
| :--- | :--- | :--- |
| **👑 Principal / Director Portal** | Dr. Ramesh Sharma | School-wide enrollment telemetry, real-time class attendance matrix (Nursery to 12th), fee collection vs monthly target, staff duty list, and school-wide push broadcast. |
| **💰 Fees & Accounts Department** | Vikram Singh | Fast counter cashier desk with paise precision, sequential receipts (`MDCA-YYYY-XXXXX`), concession rules (sibling, EWS/RTE, staff ward), quarter defaulters list with one-click WhatsApp/SMS reminders. |
| **👩‍🏫 Class Teacher Portal (Class 10-A)** | Sunita Verma | **Master section overview**: Details of all 6 CBSE subjects, subject faculty roster, consolidated class marksheet & grade analysis, daily attendance register, and report card remarks. |
| **📚 Subject Teacher Workspace** | All Teachers | Upload daily homework with instructions and submission deadlines, share study notes and question banks, submit periodic assessment marks. **Instantly visible to students and parents.** |
| **👨‍👩‍👧 Parent Portal (Multi-Ward)** | Parents (e.g. Sunil Verma) | **Sibling Switcher** (toggle between Aarav in 10-A and Ananya in 6-B), daily attendance calendar, pending dues with instant online UPI payment & receipt download, homework diary, digital gate pass approval. |
| **🎓 Senior Student Portal (Classes 9–12)** | Senior Students (9th to 12th) | Student login with admission ID, daily 6-period timetable with room numbers, online homework solution upload, PA-1 / PA-2 scorecards, CBSE LOC board candidate registration, and APAAR ID cards. |
| **🌐 Public School Website** | Prospective Parents | Admissions 2026-27 notice ticker, CBSE Mandatory Public Disclosure (Appendix IX), campus facilities, and live Admission Enquiry form connected to ERP CRM. |

---

## 🛠️ Architecture & Tech Stack

Following the **MDCA Pro Build Plan**:

* **Backend**: Node.js, Express, TypeScript, Prisma ORM, Helmet, CORS, Morgan, JWT Access & Refresh tokens, RBAC, and Zod validation.
* **Database**: PostgreSQL (Production) & SQLite (Zero-config local dev). Storing all currency in **integer paise** to prevent floating-point rounding errors. Multi-tenant ready with `school_id` on all tables.
* **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide icons, and modern typography (Space Grotesk & Plus Jakarta Sans).
* **CI/CD**: GitHub Actions workflow (`.github/workflows/ci.yml`) running automated builds, linting, and typechecks on every commit.

---

## 🚀 Running Locally

### 1. Backend Service (`/backend`)

```powershell
cd backend
npm install
npx prisma generate
npx prisma db push
npm run seed      # Seeds MDCA School, Staff, Class 10, Students & Ledgers
npm run dev       # Starts API server on http://localhost:5000
```

* **Health Check**: `GET http://localhost:5000/health`
* **Local Accounts**: Local development accounts are seeded via `npm run seed` using hashed development passwords defined in local `.env` (never committed to repository). Production instances enforce MFA and strict role policies.

### 2. Frontend Web Application (`/frontend`)

```powershell
cd frontend
npm install
npm run dev       # Starts Vite dev server on http://localhost:3000
```

Open **[http://localhost:3000/](http://localhost:3000/)** in your browser.
* Use the **Role Selector** in the top navigation bar to switch between the **Principal**, **Accounts Desk**, **Class Teacher (10-A)**, **Parent**, and **Senior Student (Class 9-12)** portals.
* Click **"Public Website"** to visit the public school admissions landing page.

---

## 📂 Project Structure

```
MDCA/
├── docs/
│   ├── MDCA_School_ERP_Project_Blueprint.pdf  # Comprehensive 31-page system blueprint
│   └── MDCA_Pro_Build_Plan.pdf                # Production engineering & motion guide
├── .github/
│   └── workflows/
│       └── ci.yml                             # Automated GitHub Actions CI pipeline
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma                      # Active schema (SQLite local dev)
│   │   ├── schema.postgresql.prisma           # Production PostgreSQL schema
│   │   └── seed.ts                            # Idempotent MDCA seed script
│   └── src/
│       ├── index.ts                           # Express server entry point
│       ├── middleware/                        # Auth, RBAC, and error handlers
│       └── modules/                           # Auth, Students, Attendance, Fees, Reports, Notices
└── frontend/
    └── src/
        ├── App.tsx                            # Root application & modal coordinator
        ├── data/mockData.ts                   # Seed student and notice data
        └── components/
            ├── portals/
            │   ├── PortalNavbar.tsx           # Role selector header & school crest
            │   ├── PrincipalPortal.tsx        # School oversight & circular broadcaster
            │   ├── AccountsPortal.tsx         # Cashier desk, paise precision & receipts
            │   ├── TeacherPortal.tsx          # Class 10-A master view & homework uploads
            │   ├── ParentPortal.tsx           # Sibling switcher, fee pay & gate pass
            │   └── SeniorStudentPortal.tsx    # Classes 9-12 timetable, homework & CBSE
            ├── PublicWebsite.tsx              # SEO public school website
            ├── ReceiptModal.tsx               # Official computerized printable fee receipt
            └── AdmissionEnquiryModal.tsx      # CRM admission intake form
```
