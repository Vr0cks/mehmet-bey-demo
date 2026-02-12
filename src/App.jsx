import { useState, useEffect, useRef } from 'react';
import {
  LOCATIONS,
  VEHICLES,
  WHATSAPP_NUMBER,
  ROUTE_SPEED,
  WEBHOOK_URL,
  REVIEWS
} from './data';

/* 🎬 Hero video — uploaded to public/ */
const HERO_VIDEO = '/hero-video.mp4';
/* Fallback poster image if video hasn't loaded yet */
const HERO_POSTER = 'https://images.unsplash.com/photo-1622129990833-255d8f618641?auto=format&fit=crop&w=1920&q=80';

/* ════════════════════════════════════════════════════════════
   🌐 i18n TRANSLATIONS
   ════════════════════════════════════════════════════════════ */

const T = {
  tr: {
    nav: { home: 'Anasayfa', fleet: 'Araçlarımız', about: 'Hakkımızda', contact: 'İletişim', whatsapp: 'Hızlı Destek', agencyLogin: 'Acente Girişi' },
    hero: {
      headline: "İzmir'in En Prestijli VIP Transfer Hizmeti",
      subtitle: 'Havalimanından dilediğiniz noktaya konforla ulaşın.',
    },
    booking: {
      from: 'Nereden',
      to: 'Nereye',
      date: 'Tarih',
      passengers: 'Yolcu Sayısı',
      search: 'Fiyat Hesapla',
      selectVehicle: 'Araç Seçin',
      distance: 'Mesafe',
      back: 'Geri',
      confirm: 'Rezervasyon Yap',
      result: 'Rezervasyon Özeti',
      vehicle: 'Araç',
      route: 'Güzergah',
      price: 'Fiyat',
      whatsappBook: "WhatsApp ile Rezervasyon",
      passenger: 'yolcu',
      selectPlaceholder: 'Seçiniz...',
      step1: 'Transfer Bilgileri',
      step2: 'Araç Seçimi',
      step3: 'Onay',
      routeInfo: 'Güzergah Bilgisi',
      estimatedTime: 'Tahmini Süre',
      minutes: 'dk',
    },
    stats: {
      experience: 'Yıllık Tecrübe',
      customers: 'Mutlu Müşteri',
      support: 'Canlı Destek',
    },
    fleet: {
      title: 'Konforunuz İçin Seçkin Filomuz',
      subtitle: 'Her ihtiyaca uygun, birinci sınıf araç filomuzu keşfedin.',
      capacity: 'Kapasite',
      person: 'kişi',
      seeInterior: 'İçini Gör',
      closeModal: 'Kapat',
    },
    about: {
      title: 'Biz Kimiz?',
      p1: 'İzmir VIP Transfer olarak, sadece yolcu taşımıyoruz — sizlere unutulmaz bir seyahat deneyimi sunuyoruz. 20 yılı aşkın süredir İzmir ve çevresinde premium transfer hizmeti veriyoruz.',
      p2: 'Profesyonel şoför kadromuz, lüks araç filomuz ve 7/24 müşteri desteğimiz ile her yolculuğunuzu ayrıcalıklı kılıyoruz. Konforunuz ve güvenliğiniz bizim önceliğimizdir.',
      p3: 'Kurumsal müşterilerimize, turizm acentelerine ve bireysel misafirlerimize en yüksek standartta hizmet sunmaktan gurur duyuyoruz.',
    },
    testimonials: {
      title: 'Müşteri Yorumları',
      subtitle: 'Binlerce memnun müşterimizin deneyimlerini keşfedin.',
    },
    footer: {
      address: 'Adnan Menderes Havalimanı, Gaziemir, İzmir',
      rights: '© 2024 İzmir VIP Transfer. Tüm hakları saklıdır.',
      quickLinks: 'Hızlı Bağlantılar',
      contactTitle: 'İletişim',
      followUs: 'Bizi Takip Edin',
    },
  },
  en: {
    nav: { home: 'Home', fleet: 'Our Fleet', about: 'About Us', contact: 'Contact', whatsapp: 'Quick Support', agencyLogin: 'Agency Login' },
    hero: {
      headline: "Izmir's Most Prestigious VIP Transfer Service",
      subtitle: 'Travel in comfort from the airport to any destination.',
    },
    booking: {
      from: 'From',
      to: 'To',
      date: 'Date',
      passengers: 'Passengers',
      search: 'Calculate Price',
      selectVehicle: 'Select Vehicle',
      distance: 'Distance',
      back: 'Back',
      confirm: 'Book Now',
      result: 'Booking Summary',
      vehicle: 'Vehicle',
      route: 'Route',
      price: 'Price',
      whatsappBook: 'Book via WhatsApp',
      passenger: 'passengers',
      selectPlaceholder: 'Select...',
      step1: 'Transfer Details',
      step2: 'Vehicle Selection',
      step3: 'Confirmation',
      routeInfo: 'Route Info',
      estimatedTime: 'Estimated Time',
      minutes: 'min',
    },
    stats: {
      experience: 'Years Experience',
      customers: 'Happy Customers',
      support: 'Live Support',
    },
    fleet: {
      title: 'Our Premium Fleet',
      subtitle: 'Discover our first-class fleet tailored to every need.',
      capacity: 'Capacity',
      person: 'pax',
      seeInterior: 'See Interior',
      closeModal: 'Close',
    },
    about: {
      title: 'Who Are We?',
      p1: "At İzmir VIP Transfer, we don't just transport passengers — we deliver an unforgettable travel experience. For over 20 years, we've been providing premium transfer services in and around İzmir.",
      p2: 'With our professional chauffeur team, luxury fleet, and 24/7 customer support, we make every journey an exclusive experience. Your comfort and safety are our top priorities.',
      p3: 'We take pride in serving our corporate clients, tourism agencies, and individual guests at the highest standards.',
    },
    testimonials: {
      title: 'Customer Reviews',
      subtitle: 'Discover the experiences of our thousands of satisfied customers.',
    },
    footer: {
      address: 'Adnan Menderes Airport, Gaziemir, İzmir',
      rights: '© 2024 İzmir VIP Transfer. All rights reserved.',
      quickLinks: 'Quick Links',
      contactTitle: 'Contact',
      followUs: 'Follow Us',
    },
  },
};

/* ════════════════════════════════════════════════════════════
   🧩 COMPONENTS
   ════════════════════════════════════════════════════════════ */

// ─── ICONS ────────────────────────────────────────────────
const StarIcon = () => (
  <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-gold-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-gold-400/30" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
  </svg>
);

// ─── ANIMATED COUNTER ─────────────────────────────────────
function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── NAVBAR ───────────────────────────────────────────────
function Navbar({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#hero', label: t.nav.home },
    { href: '#fleet', label: t.nav.fleet },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-dark-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-bold text-dark-900 text-lg group-hover:scale-110 transition-transform">V</div>
            <div className="hidden sm:block">
              <span className="text-white font-semibold text-lg tracking-tight">İzmir</span>
              <span className="text-gold-400 font-semibold text-lg ml-1">VIP Transfer</span>
            </div>
          </a>

          {/* Center Links — Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-neutral-300 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide uppercase">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold tracking-widest text-neutral-300 hover:border-gold-400 hover:text-gold-400 transition-all bg-white/5"
            >
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-emerald-900/30"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {t.nav.whatsapp}
            </a>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-dark-900/98 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-4 space-y-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-neutral-300 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide uppercase py-2">
                {l.label}
              </a>
            ))}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-full text-sm font-semibold w-fit mt-3">
              <WhatsAppIcon className="w-4 h-4" /> {t.nav.whatsapp}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── BOOKING WIDGET ───────────────────────────────────────
function BookingWidget({ lang, t }) {
  const [step, setStep] = useState(1);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [distance, setDistance] = useState(0);

  const calcDistance = (fromId, toId) => {
    const a = LOCATIONS.find(l => l.id === fromId);
    const b = LOCATIONS.find(l => l.id === toId);
    if (!a || !b) return 0;
    return Math.abs(a.km - b.km) || 15;
  };

  const getPrice = (vehicle, dist) => Math.round(vehicle.basePrice + vehicle.perKm * dist);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to || !date) return;
    const dist = calcDistance(from, to);
    setDistance(dist);
    setStep(2);
  };

  const handleSelectVehicle = (v) => {
    setSelectedVehicle(v);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setFrom('');
    setTo('');
    setDate('');
    setPassengers(1);
    setSelectedVehicle(null);
  };

  /* 📧 Silent reservation webhook — invisible to customers */
  const sendReservation = (vehicle, dist) => {
    if (!WEBHOOK_URL) return; // skip if not configured
    const payload = {
      timestamp: new Date().toISOString(),
      from: LOCATIONS.find(l => l.id === from)?.name.tr || from,
      to: LOCATIONS.find(l => l.id === to)?.name.tr || to,
      date,
      passengers,
      vehicle: vehicle.name,
      distance: dist + ' km',
      price: '€' + getPrice(vehicle, dist),
    };
    // Fire-and-forget — no await, no UI feedback
    fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => { }); // silently fail
  };

  const tb = t.booking;
  const fromLoc = LOCATIONS.find(l => l.id === from);
  const toLoc = LOCATIONS.find(l => l.id === to);

  const stepLabels = [tb.step1, tb.step2, tb.step3];

  return (
    <div className="bg-dark-800/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
      {/* Step Indicator */}
      <div className="flex border-b border-white/5">
        {stepLabels.map((label, i) => (
          <div key={i} className={`flex-1 text-center py-3 text-xs font-semibold tracking-wide transition-all ${step === i + 1 ? 'text-gold-400 bg-gold-400/5 border-b-2 border-gold-400' : 'text-neutral-500'}`}>
            {i + 1}. {label}
          </div>
        ))}
      </div>

      <div className="p-5 sm:p-6">
        {/* STEP 1 — Search */}
        {step === 1 && (
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-1.5 font-medium">{tb.from}</label>
              <select value={from} onChange={e => setFrom(e.target.value)} required
                className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all appearance-none cursor-pointer">
                <option value="">{tb.selectPlaceholder}</option>
                {LOCATIONS.map(l => <option key={l.id} value={l.id}>{l.name[lang]}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1.5 font-medium">{tb.to}</label>
              <select value={to} onChange={e => setTo(e.target.value)} required
                className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all appearance-none cursor-pointer">
                <option value="">{tb.selectPlaceholder}</option>
                {LOCATIONS.filter(l => l.id !== from).map(l => <option key={l.id} value={l.id}>{l.name[lang]}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-medium">{tb.date}</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all" />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-medium">{tb.passengers}</label>
                <select value={passengers} onChange={e => setPassengers(Number(e.target.value))}
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all appearance-none cursor-pointer">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => <option key={n} value={n}>{n} {tb.passenger}</option>)}
                </select>
              </div>
            </div>
            {/* Route Intelligence — live preview */}
            {from && to && from !== to && (() => {
              const previewDist = calcDistance(from, to);
              const previewTime = Math.round(previewDist * ROUTE_SPEED);
              const fromName = LOCATIONS.find(l => l.id === from)?.name[lang];
              const toName = LOCATIONS.find(l => l.id === to)?.name[lang];
              return (
                <div className="bg-gold-400/5 border border-gold-400/20 rounded-xl p-3 flex items-center gap-3 animate-fadeIn">
                  <div className="w-9 h-9 rounded-full bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gold-400 font-semibold tracking-wide">{tb.routeInfo}</p>
                    <p className="text-xs text-neutral-300 truncate">{fromName} → {toName}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{tb.distance}: {previewDist}km &nbsp;|&nbsp; {tb.estimatedTime}: ~{previewTime}{tb.minutes}</p>
                  </div>
                </div>
              );
            })()}
            <button type="submit"
              className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-dark-900 font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-gold-500/20 text-sm tracking-wide">
              {tb.search}
            </button>
          </form>
        )}

        {/* STEP 2 — Select Vehicle */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-neutral-400">{tb.distance}: <span className="text-white font-semibold">{distance} km</span></p>
              <button onClick={() => setStep(1)} className="text-xs text-gold-400 hover:underline">&larr; {tb.back}</button>
            </div>
            {VEHICLES.filter(v => v.capacity >= passengers).map(v => (
              <button key={v.id} onClick={() => handleSelectVehicle(v)}
                className="w-full flex items-center gap-4 bg-dark-700/60 hover:bg-dark-600 border border-white/5 hover:border-gold-400/30 rounded-xl p-3 transition-all group text-left">
                <img src={v.image} alt={v.name} className="w-20 h-14 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm group-hover:text-gold-400 transition-colors">{v.name}</p>
                  <p className="text-xs text-neutral-500">{v.capacity} {t.fleet.person} • {v.specs[lang][0]}</p>
                </div>
                <div className="text-right">
                  <p className="text-gold-400 font-bold text-lg">€{getPrice(v, distance)}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* STEP 3 — Confirmation */}
        {step === 3 && selectedVehicle && (
          <div className="space-y-4">
            <button onClick={() => setStep(2)} className="text-xs text-gold-400 hover:underline">&larr; {tb.back}</button>
            <div className="text-center space-y-1">
              <p className="text-xs text-neutral-400 uppercase tracking-widest">{tb.result}</p>
              <p className="text-4xl font-bold text-gold-400">€{getPrice(selectedVehicle, distance)}</p>
            </div>
            <div className="bg-dark-700/50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-neutral-400">{tb.vehicle}</span><span className="text-white font-medium">{selectedVehicle.name}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">{tb.route}</span><span className="text-white font-medium">{fromLoc?.name[lang]} → {toLoc?.name[lang]}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">{tb.date}</span><span className="text-white font-medium">{date}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">{tb.passengers}</span><span className="text-white font-medium">{passengers}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">{tb.distance}</span><span className="text-white font-medium">{distance} km</span></div>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `${lang === 'tr' ? 'Merhaba! Rezervasyon yapmak istiyorum.' : 'Hello! I would like to book.'}\n${fromLoc?.name[lang]} → ${toLoc?.name[lang]}\n${tb.date}: ${date}\n${tb.vehicle}: ${selectedVehicle.name}\n${tb.passengers}: ${passengers}\n${tb.price}: €${getPrice(selectedVehicle, distance)}`
              )}`}
              target="_blank" rel="noopener noreferrer"
              onClick={() => sendReservation(selectedVehicle, distance)}
              className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/20 text-sm"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {tb.whatsappBook}
            </a>
            <button onClick={handleReset} className="w-full text-center text-xs text-neutral-500 hover:text-neutral-300 transition-colors py-1">
              {tb.back}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────
function HeroSection({ lang, t }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        {/* 🎬 LOCAL VIDEO: Replace HERO_VIDEO path in the constant above with your .mp4 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_POSTER}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Heavy dark overlays for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/60 to-dark-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/20 rounded-full px-4 py-1.5">
                <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                <span className="text-gold-400 text-xs font-semibold tracking-widest uppercase">Premium Transfer</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-playfair">
                {t.hero.headline}
              </h1>
              <p className="text-lg text-neutral-300 max-w-lg leading-relaxed">
                {t.hero.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-neutral-400">
              <div className="flex items-center gap-2"><CheckIcon /><span>Mercedes Fleet</span></div>
              <div className="flex items-center gap-2"><CheckIcon /><span>24/7 Service</span></div>
              <div className="flex items-center gap-2"><CheckIcon /><span>Professional Chauffeurs</span></div>
            </div>
          </div>

          {/* Right — Booking Widget */}
          <div className="lg:justify-self-end w-full max-w-md">
            <BookingWidget lang={lang} t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── STATS BANNER ─────────────────────────────────────────
function StatsBanner({ t }) {
  const stats = [
    { value: 20, suffix: '+', label: t.stats.experience, icon: '🏆' },
    { value: 50000, suffix: '+', label: t.stats.customers, icon: '👥' },
    { value: 24, suffix: '/7', label: t.stats.support, icon: '💬' },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl mb-3">{s.icon}</div>
              <p className="text-4xl sm:text-5xl font-bold text-white mb-2">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </p>
              <p className="text-neutral-400 text-sm font-medium tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FLEET SECTION ────────────────────────────────────────
function FleetSection({ lang, t, onShowInterior }) {
  return (
    <section id="fleet" className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase">{t.nav.fleet}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-playfair">{t.fleet.title}</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">{t.fleet.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {VEHICLES.map(v => (
            <div key={v.id} className="group bg-dark-800 border border-white/5 rounded-2xl overflow-hidden hover:border-gold-400/20 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-400/5 hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img src={v.image} alt={v.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-gold-400/90 text-dark-900 text-xs font-bold px-3 py-1 rounded-full">
                  {t.fleet.capacity}: {v.capacity} {t.fleet.person}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">{v.name}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {v.specs[lang].map((spec, i) => (
                    <div key={i} className="flex items-center text-sm text-neutral-400">
                      <CheckIcon /><span>{spec}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 uppercase tracking-wide">
                    {lang === 'tr' ? 'Başlangıç Fiyatı' : 'Starting at'}
                  </span>
                  <span className="text-2xl font-bold text-gold-400">€{v.basePrice}</span>
                </div>
                {/* Interior Lightbox Button */}
                <button
                  onClick={() => onShowInterior(v)}
                  className="w-full py-2.5 rounded-xl border border-white/10 hover:border-gold-400/40 text-neutral-300 hover:text-gold-400 text-sm font-medium transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {t.fleet.seeInterior}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INTERIOR MODAL (LIGHTBOX) ─────────────────────────
function InteriorModal({ vehicle, onClose, t }) {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      {/* Modal */}
      <div
        className="relative bg-dark-800 border border-white/10 rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl animate-scaleIn"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={vehicle.interiorImage}
          alt={`${vehicle.name} Interior`}
          className="w-full h-[400px] sm:h-[500px] object-cover"
        />
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-lg">{vehicle.name}</p>
            <p className="text-neutral-400 text-sm">{vehicle.specs.tr.join(' • ')}</p>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-gold-400/40 text-neutral-300 hover:text-white text-sm font-semibold transition-all"
          >
            {t.fleet.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────
function AboutSection({ t }) {
  return (
    <section id="about" className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase">{t.nav.about}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-playfair">{t.about.title}</h2>
            </div>
            <div className="space-y-5 text-neutral-300 leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#hero" className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-dark-900 font-bold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-gold-500/20 text-sm">
                {t.booking.search}
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/10 hover:border-gold-400/30 text-white px-8 py-3.5 rounded-xl transition-all text-sm font-semibold">
                <WhatsAppIcon className="w-4 h-4" />
                {t.nav.whatsapp}
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <img
                src="/assets/biz kimiz.png"
                alt="İzmir VIP Transfer"
                className="w-full aspect-[4/5] object-cover object-center"
                style={{ imageRendering: 'auto', filter: 'brightness(1.05) contrast(1.05)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-gold-400 text-dark-900 rounded-2xl p-5 shadow-xl">
              <p className="text-3xl font-bold">20+</p>
              <p className="text-xs font-semibold uppercase tracking-wide">{t.stats.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS SECTION ─────────────────────────────────
function TestimonialsSection({ lang, t }) {
  return (
    <section className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase">{t.testimonials.title}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-playfair">{t.testimonials.title}</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-dark-800 border border-white/5 rounded-2xl p-8 hover:border-gold-400/20 transition-all duration-300 relative group hover:-translate-y-1">
              <QuoteIcon />
              <div className="flex gap-1 my-4">
                {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
              </div>
              <p className="text-neutral-300 leading-relaxed mb-6 text-sm">{r.text[lang]}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-900 font-bold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-neutral-500 text-xs">{lang === 'tr' ? 'Doğrulanmış Müşteri' : 'Verified Customer'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer id="contact" className="bg-dark-800 border-t border-white/5">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-bold text-dark-900 text-lg">V</div>
              <div>
                <span className="text-white font-semibold text-lg">İzmir</span>
                <span className="text-gold-400 font-semibold text-lg ml-1">VIP</span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">{t.about.p1.substring(0, 120)}...</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{t.footer.quickLinks}</h4>
            <div className="space-y-2">
              {[
                { href: '#hero', label: t.nav.home },
                { href: '#fleet', label: t.nav.fleet },
                { href: '#about', label: t.nav.about },
                { href: '#contact', label: t.nav.contact },
              ].map(l => (
                <a key={l.href} href={l.href} className="block text-neutral-400 hover:text-gold-400 transition-colors text-sm">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{t.footer.contactTitle}</h4>
            <div className="space-y-3">
              <a href="tel:+905551234567" className="flex items-center gap-3 text-neutral-400 hover:text-gold-400 transition-colors text-sm">
                <PhoneIcon /> +90 555 123 45 67
              </a>
              <a href="mailto:info@izmirviptransfer.com" className="flex items-center gap-3 text-neutral-400 hover:text-gold-400 transition-colors text-sm">
                <MailIcon /> info@izmirviptransfer.com
              </a>
              <div className="flex items-start gap-3 text-neutral-400 text-sm">
                <MapPinIcon />
                <span>{t.footer.address}</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{t.nav.contact}</h4>
            <div className="rounded-xl overflow-hidden border border-white/10 h-48">
              <iframe
                title="Adnan Menderes Airport"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.7!2d27.157!3d38.292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862e8e77985%3A0x39e3392990fb5e8c!2zQWRuYW4gTWVuZGVyZXMgSGF2YWxpbWFuxLE!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">{t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-emerald-400 transition-colors">
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <a href="tel:+905551234567" className="text-neutral-500 hover:text-gold-400 transition-colors">
              <PhoneIcon />
            </a>
            <a href="mailto:info@izmirviptransfer.com" className="text-neutral-500 hover:text-gold-400 transition-colors">
              <MailIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── FLOATING WHATSAPP CONCIERGE ──────────────────────
function FloatingWhatsApp({ lang }) {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const bubbleText = lang === 'tr'
    ? 'Merhaba, İzmir transferi için yardımcı olabilir miyim?'
    : 'Hello, can I help you with an Izmir transfer?';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Speech Bubble */}
      {showBubble && !dismissed && (
        <div className="relative bg-white text-dark-900 rounded-2xl rounded-br-sm px-4 py-3 shadow-xl max-w-[220px] animate-fadeIn">
          <button
            onClick={(e) => { e.preventDefault(); setDismissed(true); }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-dark-700 text-white rounded-full text-xs flex items-center justify-center hover:bg-dark-600"
          >×</button>
          <p className="text-xs font-medium leading-relaxed">{bubbleText}</p>
        </div>
      )}
      {/* Pulsing WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-emerald-500 hover:bg-emerald-400 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-900/40 hover:scale-110 transition-all"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
        <span className="absolute inset-[-4px] rounded-full border-2 border-emerald-400/30 animate-pulse" />
        <WhatsAppIcon className="w-7 h-7 relative z-10" />
      </a>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   🚀 APP (root)
   ════════════════════════════════════════════════════════════ */

export default function App() {
  const [lang, setLang] = useState('tr');
  const [interiorVehicle, setInteriorVehicle] = useState(null);
  const t = T[lang];

  return (
    <div className="min-h-screen bg-dark-900 text-white font-inter">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <HeroSection lang={lang} t={t} />
      <StatsBanner t={t} />
      <FleetSection lang={lang} t={t} onShowInterior={setInteriorVehicle} />
      <AboutSection t={t} />
      <TestimonialsSection lang={lang} t={t} />
      <Footer t={t} />
      <FloatingWhatsApp lang={lang} />
      <InteriorModal vehicle={interiorVehicle} onClose={() => setInteriorVehicle(null)} t={t} />
    </div>
  );
}
