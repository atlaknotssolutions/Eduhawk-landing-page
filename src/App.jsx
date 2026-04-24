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
      "data:image/jpeg;base64,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",
  },
  {
    name: "Kyrgyzstan",
    seats: "250+",
    rank: "Low Cost",
    color: "#eab308",
    university: "Kyrgyz State Medical Academy",
    uniImage:
      "https://rmgoe.org/universities/Abroad/image/1735537684_kyrgyz-state-medical-academy.webp",
  },
  {
    name: "Uzbekistan",
    seats: "300+",
    rank: "Emerging",
    color: "#8b5cf6",
    university: "Tashkent Medical Academy",
    uniImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFC5qIm9jdlTqfCLroiFgRg-kzrz8xAjT4AA&s",
  },
  {
    name: "Tajikistan",
    seats: "150+",
    rank: "Budget Friendly",
    color: "#ec4899",
    university: "Tajik State Medical University",
    uniImage:
      "https://www.worldwidecolleges.com/wp-content/uploads/2021/11/atsmu-ori.jpg",
  },
  {
    name: "Egypt",
    seats: "300+",
    rank: "Ancient Legacy",
    color: "#f59e0b",
    university: "Cairo University Faculty of Medicine",
    uniImage:
      "https://medicine.cu.edu.eg/wp-content/uploads/FB_IMG_1696877122196.jpg",
  },
  {
    name: "Vietnam",
    seats: "200+",
    rank: "Fast Growing",
    color: "#22c55e",
    university: "Hanoi Medical University",
    uniImage:
      "https://www.worldwidecolleges.com/wp-content/uploads/classified-listing/2024/04/Hanoi-Medical-University-Vietnam-2.webp",
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

      {menuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-white/95 shadow-xl border-t border-slate-200 z-40">
          <div className="flex flex-col gap-4 px-5 py-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block text-lg font-medium text-slate-700 hover:text-cyan-600 transition-colors"
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                openCounseling();
              }}
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 text-white rounded-full font-semibold hover:scale-[1.02] transition-all"
            >
              Free Counseling
            </button>
          </div>
        </div>
      )}

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
