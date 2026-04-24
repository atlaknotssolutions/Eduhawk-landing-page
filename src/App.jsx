import React, { useRef, useState, useEffect } from "react";
import {
  DollarSign,
  Landmark,
  TrendingDown,
  GraduationCap,
  Plane,
  Users,
  Target,
  ClipboardList,
  Home,
  Star,
  X,
} from "lucide-react";
import Eduhawk from "./assets/Eduhawk.png";
import ReCAPTCHA from "react-google-recaptcha";



const NAV_LINKS = [
  "Home",
  "Countries",
  "Process",
  "Benefits",
  "Testimonials",
  "FAQ",
  "Contact",
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1920&q=85",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1920&q=85",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=85",
];

const COUNTRIES = [
  {
    name: "Russia",
    seats: "500+",
    rank: "#1 Choice",
    color: "#06b6d4",
    university: "Sechenov University / Peoples' Friendship University",
    uniImage:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=85",
  },
  {
    name: "Kazakhstan",
    seats: "300+",
    rank: "Top Rated",
    color: "#22d3ee",
    university: "Kazakh National Medical University",
    uniImage:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=85",
  },
  {
    name: "Georgia",
    seats: "250+",
    rank: "EU Standard",
    color: "#0ea5e9",
    university: "Tbilisi State Medical University",
    uniImage:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=85",
  },
  {
    name: "Bangladesh",
    seats: "350+",
    rank: "NMC Approved",
    color: "#06b6d4",
    university: "Dhaka Medical College",
    uniImage:
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/2.%E0%A6%B6%E0%A6%BE%E0%A6%AA%E0%A6%B2%E0%A6%BE_%E0%A6%9A%E0%A6%A4%E0%A7%8D%E0%A6%AC%E0%A6%B0.jpg",
  },
  {
    name: "Nepal",
    seats: "200+",
    rank: "Affordable",
    color: "#10b981",
    university: "Kathmandu Medical College",
    uniImage:
      "https://images.unsplash.com/photo-1580130684518-9d2d4b4e2a2e?w=800&q=85",
  },
  {
    name: "Kyrgyzstan",
    seats: "250+",
    rank: "Low Cost",
    color: "#eab308",
    university: "Kyrgyz State Medical Academy",
    uniImage:
      "https://images.unsplash.com/photo-1580130684518-9d2d4b4e2a2e?w=800&q=85",
  },
  {
    name: "Uzbekistan",
    seats: "300+",
    rank: "Emerging",
    color: "#8b5cf6",
    university: "Tashkent Medical Academy",
    uniImage:
      "https://images.unsplash.com/photo-1580130684518-9d2d4b4e2a2e?w=800&q=85",
  },
  {
    name: "Tajikistan",
    seats: "150+",
    rank: "Budget Friendly",
    color: "#ec4899",
    university: "Tajik State Medical University",
    uniImage:
      "https://images.unsplash.com/photo-1580130684518-9d2d4b4e2a2e?w=800&q=85",
  },
  {
    name: "Egypt",
    seats: "300+",
    rank: "Ancient Legacy",
    color: "#f59e0b",
    university: "Cairo University Faculty of Medicine",
    uniImage:
      "https://images.unsplash.com/photo-1580130684518-9d2d4b4e2a2e?w=800&q=85",
  },
  {
    name: "Vietnam",
    seats: "200+",
    rank: "Fast Growing",
    color: "#22c55e",
    university: "Hanoi Medical University",
    uniImage:
      "https://images.unsplash.com/photo-1580130684518-9d2d4b4e2a2e?w=800&q=85",
  },
];

const BENEFITS = [
  {
    icon: DollarSign,
    title: "No Donation",
    desc: "Zero hidden donation or capitation fees",
  },
  {
    icon: Landmark,
    title: "NMC/MCI Approved",
    desc: "All universities are NMC & WHO recognized",
  },
  {
    icon: TrendingDown,
    title: "Low Fees",
    desc: "Complete package starting from ₹18 Lakh",
  },
  {
    icon: GraduationCap,
    title: "English Medium",
    desc: "Full English medium + FMGE coaching support",
  },
  {
    icon: Plane,
    title: "100% Visa Assistance",
    desc: "High visa success rate with full documentation help",
  },
  {
    icon: Users,
    title: "Post Admission Support",
    desc: "Hostel, airport pickup & ongoing student support",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Free Counseling",
    desc: "Personalized guidance based on your NEET score & budget",
    icon: Target,
  },
  {
    num: "02",
    title: "Document Preparation",
    desc: "We handle all documents including NEET scorecard & transcripts",
    icon: ClipboardList,
  },
  {
    num: "03",
    title: "University Selection & Admission",
    desc: "Secure admission in best NMC-approved university",
    icon: Landmark,
  },
  {
    num: "04",
    title: "Visa & Travel",
    desc: "Complete visa processing and pre-departure orientation",
    icon: Plane,
  },
  {
    num: "05",
    title: "Post Landing Support",
    desc: "Airport pickup, accommodation & 24×7 student support",
    icon: Home,
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    city: "Bhopal, MP",
    text: "Edu-Hawk helped me get admission in Russia. The entire process was smooth and stress-free!",
    avatar: "PS",
    year: "MBBS 3rd Year, Russia",
  },
  {
    name: "Arjun Patel",
    city: "Bhopal, MP",
    text: "Best consultancy in Bhopal! Got admission in Georgia without any tension.",
    avatar: "AP",
    year: "MBBS 2nd Year, Georgia",
  },
  {
    name: "Sneha Reddy",
    city: "Bhopal, MP",
    text: "Very honest and professional team. Highly recommended for MBBS abroad.",
    avatar: "SR",
    year: "MBBS 1st Year, Philippines",
  },
];

const STATS = [
  { value: "4500+", label: "Students Placed" },
  { value: "12+", label: "Countries" },
  { value: "97%", label: "Visa Success" },
  { value: "8+", label: "Years Experience" },
];

export default function EduHawkLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "MBBS Abroad Inquiry",
    message: "",
    country: "",
  });

  // Hero Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: false });

    const captchaToken = recaptchaRef.current?.getValue();
    if (!captchaToken) {
      setStatus({
        loading: false,
        message: "Please complete the reCAPTCHA verification",
        error: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/contact/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || undefined,
          subject: formData.subject,
          country: formData.country || undefined,
          message:
            formData.message.trim() +
            (formData.country
              ? `\n\nPreferred Country: ${formData.country}`
              : ""),
          captcha: captchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          loading: false,
          message: "Thank you! Your message has been sent successfully.",
          error: false,
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "MBBS Abroad Inquiry",
          message: "",
          preferredCountry: "",
        });
        recaptchaRef.current?.reset();
      } else {
        setStatus({
          loading: false,
          message: data.message || "Failed to send message. Please try again.",
          error: true,
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        message: "Network error. Please check your internet connection.",
        error: true,
      });
    }
  };

  const openCounseling = () => setShowModal(true);

  return (
    <div className="font-['Sora'] bg-slate-50 text-slate-950 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');
        .glass {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(6,182,212,0.15);
        }
        .hero-bg { transition: opacity 1.5s ease-in-out; }
        .country-card:hover { transform: translateY(-12px); box-shadow: 0 25px 50px rgba(0,0,0,0.1); }
        .benefit-card:hover { transform: translateY(-8px); }
        .uni-image { height: 180px; object-fit: cover; border-radius: 16px; }
      `}</style>

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-5 lg:px-10 transition-all duration-300 ${scrolled ? "shadow-md bg-white/95" : "bg-white/90 shadow-sm"}`}
      >
        <div className="flex items-center gap-3">
          <img src={Eduhawk} alt="Eduhawk Logo" className="h-12 w-auto" />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-cyan-600 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
          <button
            onClick={openCounseling}
            className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            Free Counseling
          </button>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-slate-700"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="min-h-screen relative flex items-center pt-20 overflow-hidden"
      >
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className="hero-bg absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
              opacity: currentBgIndex === index ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 z-10" />
        <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-semibold mb-6 border border-white/30">
            2026-27 ADMISSIONS OPEN
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-6 text-white">
            Your Dream of{" "}
            <span className="font-['Playfair_Display'] italic bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
              MBBS Abroad
            </span>{" "}
            Starts Here
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-10">
            India's trusted MBBS abroad consultancy. NMC approved universities •
            Low fees • No donation
          </p>
          <button
            onClick={openCounseling}
            className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-violet-600 text-white rounded-2xl font-semibold text-lg hover:scale-105 transition-all shadow-2xl"
          >
            Get Free Counseling Now →
          </button>
        </div>
      </section>

      {/* COUNTRIES SECTION */}
      <section id="countries" className="py-24 px-6 lg:px-10 bg-white">
        <div className="text-center mb-16">
          <p className="text-cyan-600 text-sm font-bold tracking-widest mb-3">
            POPULAR DESTINATIONS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Top Countries for MBBS Abroad
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {COUNTRIES.map((country) => (
            <div
              key={country.name}
              className="country-card glass rounded-3xl overflow-hidden group"
            >
              <img
                src={country.uniImage}
                alt={country.name}
                className="uni-image w-full"
              />
              <div className="p-8">
                <div
                  className="inline-block px-4 py-1 rounded-full text-xs font-bold mb-2"
                  style={{
                    backgroundColor: `${country.color}15`,
                    color: country.color,
                  }}
                >
                  {country.rank}
                </div>
                <h3 className="text-3xl font-bold">{country.name}</h3>
                <p className="text-sm text-slate-600 mt-3">
                  {country.university}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section id="benefits" className="py-24 px-6 lg:px-10 bg-slate-50">
        <div className="text-center mb-16">
          <p className="text-cyan-600 text-sm font-bold tracking-widest mb-3">
            WHY EDU-HAWK
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            What You Get With Us
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {BENEFITS.map((benefit, i) => (
            <div
              key={i}
              className="benefit-card glass rounded-3xl p-8 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600 mb-6">
                <benefit.icon size={42} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-slate-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-24 px-6 lg:px-10 bg-white">
        <div className="text-center mb-16">
          <p className="text-cyan-600 text-sm font-bold tracking-widest mb-3">
            HOW IT WORKS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Simple 5-Step Process
          </h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="glass rounded-3xl p-8 flex gap-8 items-start hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600 flex-shrink-0">
                <step.icon size={42} strokeWidth={2} />
              </div>
              <div>
                <div className="text-cyan-600 font-bold text-sm tracking-widest">
                  STEP {step.num}
                </div>
                <h3 className="text-2xl font-semibold mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 px-6 lg:px-10 bg-slate-50">
        <div className="text-center mb-16">
          <p className="text-cyan-600 text-sm font-bold tracking-widest mb-3">
            SUCCESS STORIES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">Our Happy Students</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="glass rounded-3xl p-8">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={22} fill="#fbbf24" stroke="#fbbf24" />
                ))}
              </div>
              <p className="italic text-slate-700 leading-relaxed mb-8">
                “{t.text}”
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white font-bold flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-slate-500">
                    {t.year} • {t.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-600 text-sm font-bold tracking-widest mb-3">
              COMMON QUESTIONS
            </p>
            <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "Is NEET mandatory for MBBS abroad?",
                a: "Yes, NEET qualification is mandatory as per NMC guidelines.",
              },
              {
                q: "What is the total fee structure?",
                a: "Total package ranges between ₹18 Lakh to ₹55 Lakh depending on country and university.",
              },
              {
                q: "Do you provide visa assistance?",
                a: "Yes, we provide complete visa documentation support with high success rate.",
              },
              {
                q: "Is FMGE coaching included?",
                a: "Yes, we provide guidance and support for FMGE preparation.",
              },
            ].map((faq, i) => (
              <div key={i} className="glass rounded-3xl p-8">
                <h3 className="font-semibold text-xl mb-4">Q. {faq.q}</h3>
                <p className="text-slate-600">Ans. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-24 px-6 lg:px-10 bg-gradient-to-br from-cyan-600 to-violet-700 text-white"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your MBBS Journey Abroad?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Get free personalized counseling from our experts today.
            </p>
            <div className="space-y-6 text-lg">
              <div className="flex gap-4 items-center">📞 +91 7632949984</div>
              <div className="flex gap-4 items-center">✉️ info@eduhawk.in</div>
              <div className="flex gap-4 items-center">
                📍 Bhopal, Madhya Pradesh
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-10 text-slate-950">
            <h3 className="text-2xl font-bold mb-8">
              Book Your Free Counseling
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name *"
                required
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-cyan-500 outline-none"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number *"
                required
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-cyan-500 outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                required
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-cyan-500 outline-none"
              />

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-cyan-500 outline-none"
              >
                <option value="">Preferred Country (Optional)</option>
                {COUNTRIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="NEET Score, Budget or any query..."
                required
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-cyan-500 outline-none resize-y"
              />

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lf6cY4sAAAAAE1CYlnILZ9OJYWn6wK8ieq_2awj"
                theme="light"
              />

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-5 bg-gradient-to-r from-cyan-500 to-violet-600 text-white rounded-2xl font-semibold text-lg hover:scale-[1.02] disabled:opacity-70 transition-all"
              >
                {status.loading ? "Sending..." : "Submit & Get Free Guidance →"}
              </button>

              {status.message && (
                <p
                  className={`text-center font-medium ${status.error ? "text-red-600" : "text-green-600"}`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <img src={Eduhawk} alt="Eduhawk Logo" className="h-12 mx-auto mb-4" />
          <p className="text-sm">© 2026 Edu-Hawk. All Rights Reserved.</p>
          <p className="text-xs mt-4 text-slate-500">
            Best MBBS Abroad Consultant in Bhopal, Madhya Pradesh
          </p>
        </div>
      </footer>

      {/* COUNSELING MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
          <div className="glass w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="flex justify-between items-center border-b p-6">
              <h3 className="text-2xl font-bold text-slate-900">
                Free MBBS Counseling
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-500 hover:text-slate-900"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name *"
                required
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-cyan-500 outline-none"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number *"
                required
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-cyan-500 outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-cyan-500 outline-none"
              />

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-cyan-500 outline-none"
              >
                <option value="">Preferred Country</option>
                {COUNTRIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="NEET Score, Budget or any query..."
                required
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-cyan-500 outline-none resize-y"
              />

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lf6cY4sAAAAAE1CYlnILZ9OJYWn6wK8ieq_2awj"
                theme="light"
              />

              <button
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-cyan-500 to-violet-600 text-white rounded-2xl font-semibold text-lg"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
