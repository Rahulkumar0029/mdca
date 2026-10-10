import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Bus,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Shield,
  FileText,
  Clock,
  Sparkles,
  Users,
  ChevronRight
} from 'lucide-react';
import { INITIAL_NOTICES } from '../data/mockData';

interface PublicWebsiteProps {
  onOpenEnquiry: () => void;
  onOpenErp: () => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ onOpenEnquiry, onOpenErp }) => {
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [notices, setNotices] = useState(INITIAL_NOTICES);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/v1/notices')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            date: new Date(item.publishedAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
            body: item.body,
            badge: 'Broadcast',
          }));
          setNotices(mapped);
        }
      })
      .catch(() => null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Banner Notice Ticker */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white text-xs py-2 px-4 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full animate-pulse">
              Admissions 2026-27
            </span>
            <span className="truncate">
              Registrations Open for Nursery to Class 12 (Science PCM/PCB, Commerce & Arts)
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-xs">
            <a href="tel:+919414000000" className="flex items-center gap-1 hover:text-white transition">
              <Phone className="w-3 h-3 text-amber-400" /> +91 94140 00000
            </a>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-amber-400" /> Vijaynagar Road, Raisinghnagar (Raj.)
            </span>
          </div>
        </div>
      </div>

      {/* Main Public Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-900/20">
              <GraduationCap className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-xl tracking-tight text-blue-950">
                  M.D. CHILDREN ACADEMY
                </h1>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                  CBSE
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Raisinghnagar, Dist. Sri Ganganagar (Affiliation No: 1730999)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDisclosure(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Mandatory Disclosure</span>
            </button>
            <button
              onClick={onOpenEnquiry}
              className="text-xs sm:text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Admission Enquiry</span>
            </button>
            <button
              onClick={onOpenErp}
              className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white px-4 py-2 rounded-xl shadow-md shadow-blue-950/20 transition flex items-center gap-1.5"
            >
              <span>ERP Portal Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Top Ranked CBSE School in Raisinghnagar Region</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading leading-tight tracking-tight">
              Empowering Minds, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-orange-400">
                Inspiring Futures.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              M.D. Children Academy delivers holistic, values-driven CBSE education from
              Nursery through Class 12th. Featuring specialized science laboratories,
              digital smart classrooms, computer centers, and competitive exam coaching.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onOpenEnquiry}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition"
              >
                <span>Apply for Admission 2026-27</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenErp}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl transition flex items-center gap-2"
              >
                <span>Open ERP Web Panel</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading">100%</div>
                <div className="text-xs text-slate-300">Board Pass Rate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading">18+</div>
                <div className="text-xs text-slate-300">Years of Legacy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading">1500+</div>
                <div className="text-xs text-slate-300">Active Students</div>
              </div>
            </div>
          </div>

          {/* Right Hero Card: School ERP & Portal Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-xl border border-white/20 shadow-2xl space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="text-xs font-semibold tracking-wide">MDCA Smart Campus ERP</span>
                </div>
                <span className="text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full">
                  Real-time Sync
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-white">Student & Parent Portal</div>
                    <div className="text-slate-300">Live attendance, marks, fees & notices</div>
                  </div>
                </div>

                <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-white">CBSE Curriculum & Report Cards</div>
                    <div className="text-slate-300">Continuous grading, automated marksheets</div>
                  </div>
                </div>

                <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center">
                    <Bus className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-white">Safe School Transport</div>
                    <div className="text-slate-300">GPS verified routes across Raisinghnagar</div>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenErp}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs transition"
              >
                Access ERP Demo Workspace
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Academics & Streams Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Academic Excellence
          </span>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-2 font-heading">
            Comprehensive CBSE Wings & Senior Streams
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Tailored pedagogical approaches for early childhood to senior secondary education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-1">Pre-Primary (Nursery - UKG)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Activity-based playway curriculum nurturing curiosity, communication, and cognitive foundations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-1">Primary & Middle (Class 1-8)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strong mathematical logic, scientific inquiry, bilingual proficiency, and co-scholastic growth.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-1">Secondary (Class 9-10)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rigorous CBSE board orientation, lab practicals, periodic assessments, and career counseling.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-1">Sr. Secondary (Class 11-12)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Specialized streams in Science (PCM & PCB), Commerce, and Humanities/Arts with NEET/JEE orientation.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities & Campus */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
                Infrastructure
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 font-heading mt-1">
                World-Class Campus Facilities
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md mt-2 md:mt-0">
              Built on Vijaynagar Road, Raisinghnagar with spacious sports grounds, CCTV surveillance, and modern amenities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Modern Science & AI Labs
              </h5>
              <p className="text-xs text-slate-600">
                Dedicated Physics, Chemistry, Biology and high-speed Computer labs equipped with interactive projectors.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Rich Library & Digital Media
              </h5>
              <p className="text-xs text-slate-600">
                Over 5,000+ reference volumes, educational periodicals, competitive exam guides, and digital e-readers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Safe GPS Bus Fleet
              </h5>
              <p className="text-xs text-slate-600">
                Extensive bus connectivity covering all sectors of Raisinghnagar, surrounding villages, and transport points.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Notices Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">Latest Notices & Circulars</h3>
            <p className="text-xs text-slate-500">Live feed synced directly from school admin</p>
          </div>
          <button
            onClick={onOpenErp}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          >
            <span>View all in ERP</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map((n) => (
            <div key={n.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                    {n.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {n.date}
                  </span>
                </div>
                <h5 className="font-bold text-sm text-slate-900 mb-2">{n.title}</h5>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{n.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-950 text-white text-xs py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span className="font-bold font-heading text-sm text-white">M.D. Children Academy</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Co-educational CBSE English Medium School committed to academic rigor, discipline, and holistic growth.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-3">Quick Links</h5>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={onOpenEnquiry} className="hover:text-amber-400">Online Admission Enquiry</button></li>
              <li><button onClick={() => setShowDisclosure(true)} className="hover:text-amber-400">CBSE Mandatory Disclosure</button></li>
              <li><button onClick={onOpenErp} className="hover:text-amber-400">Staff & Student Login</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-3">Campus Address</h5>
            <p className="text-slate-400 leading-relaxed">
              Vijaynagar Road, Raisinghnagar,<br />
              District Sri Ganganagar, Rajasthan 335051
            </p>
            <p className="mt-2 text-slate-400">Email: office@mdcarsnr.in</p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-3">Admissions Desk</h5>
            <p className="text-slate-400">Monday - Saturday: 8:00 AM - 2:00 PM</p>
            <div className="mt-3">
              <button
                onClick={onOpenEnquiry}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition"
              >
                Apply Online Now
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between text-slate-500 text-[11px]">
          <div>© {new Date().getFullYear()} M.D. Children Academy (MDCA). All rights reserved.</div>
          <div className="mt-2 sm:mt-0">Powered by MDCA Enterprise School ERP Platform</div>
        </div>
      </footer>

      {/* Mandatory Public Disclosure Modal */}
      {showDisclosure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-900" />
                CBSE Mandatory Public Disclosure (Appendix IX)
              </h4>
              <button onClick={() => setShowDisclosure(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-700 max-h-96 overflow-y-auto pr-2">
              <div className="p-3 bg-slate-50 rounded-lg">
                <strong>School Name:</strong> M.D. Children Academy, Raisinghnagar
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <strong>CBSE Affiliation Number:</strong> 1730999 (Valid & Active)
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <strong>School Code:</strong> 1142
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <strong>Society / Trust Registration:</strong> Registered Educational Society Rajasthan
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <strong>Campus Land Area:</strong> Over 2 Acres with sports ground and dedicated laboratories
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <strong>NOC and Recognition Certificate:</strong> Issued by Department of School Education, Govt. of Rajasthan
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => setShowDisclosure(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Close Disclosure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
