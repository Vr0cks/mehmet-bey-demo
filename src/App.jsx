import { useState, useEffect, useRef } from 'react';
import {
  LOCATIONS,
  VEHICLES,
  WHATSAPP_NUMBER,
  ROUTE_SPEED,
  WEBHOOK_URL,
  REVIEWS,
  POPULAR_ROUTES,
  BLOG_POSTS,
  DAILY_TOURS
} from './data';

/* 🎬 Hero video — uploaded to public/ */
const HERO_VIDEO = '/hero-video.mp4';
/* Fallback poster image */
const HERO_POSTER = 'https://images.unsplash.com/photo-1622129990833-255d8f618641?auto=format&fit=crop&w=1920&q=80';

// ─── RATES & SYMBOLS ───────────────────────────────────────
const RATES = { EUR: 1, USD: 1.08, GBP: 0.85, TRY: 34.50 };
const SYMBOLS = { EUR: '€', USD: '$', GBP: '£', TRY: '₺' };

/* ════════════════════════════════════════════════════════════
   🌐 i18n TRANSLATIONS
   ════════════════════════════════════════════════════════════ */

const T = {
  tr: {
    lang: 'tr',
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
    faq: {
      title: 'Sıkça Sorulan Sorular',
      subtitle: 'Transfer süreci hakkında merak edilenler.',
      items: [
        { q: "Uçağım rötar yaparsa ne olur?", a: "Hiç endişelenmeyin. Uçuş kodunuzla iniş saatinizi anlık takip ediyoruz. Rötar durumunda şoförümüz sizi beklemeye devam eder ve ek ücret talep edilmez." },
        { q: "Araçlarda çocuk koltuğu mevcut mu?", a: "Evet, aile güvenliği önceliğimizdir. Rezervasyon formunda belirtmeniz durumunda her yaş grubuna uygun çocuk koltuğunu ücretsiz temin ediyoruz." },
        { q: "Ödemeyi nasıl yapabilirim?", a: "Ödemenizi transfer sonunda şoförümüze nakit olarak (TL, Dolar, Euro) veya rezervasyon sırasında havale yöntemi ile güvenle yapabilirsiniz." },
        { q: "Havalimanında sizi nasıl bulacağım?", a: "Şoförümüz, isminizin yazılı olduğu bir tabela ile sizi gelen yolcu çıkış kapısında (Vodafone standı önü) karşılıyor olacak." }
      ]
    },
    footer: {
      address: 'Adnan Menderes Havalimanı, Gaziemir, İzmir',
      rights: '© 2002 - 2026 İzmir VIP Transfer. All rights reserved.',
      quickLinks: 'Hızlı Bağlantılar',
      contactTitle: 'İletişim',
      followUs: 'Bizi Takip Edin',
    },
  },
  en: {
    lang: 'en',
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
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about the transfer process.',
      items: [
        { q: "What happens if my flight is delayed?", a: "Don't worry. We monitor your flight status instantly. In case of delay, our chauffeur will continue to wait for you at no extra cost." },
        { q: "Are child seats available?", a: "Yes, family safety is our priority. Upon request, we provide child seats suitable for all age groups free of charge." },
        { q: "How can I make the payment?", a: "You can pay in cash (TL, USD, EUR) to our chauffeur at the end of the transfer or via bank transfer during booking." },
        { q: "How will I find you at the airport?", a: "Our chauffeur will be waiting for you at the arrival gate with a sign bearing your name." }
      ]
    },
    footer: {
      address: 'Adnan Menderes Airport, Gaziemir, Izmir',
      rights: '© 2002 - 2026 Izmir VIP Transfer. All rights reserved.',
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
function Navbar({ lang, setLang, t, currency, setCurrency }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-dark-900/90 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-bold text-dark-900 text-xl shadow-lg shadow-gold-500/20">V</div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">İzmir</span>
              <span className="text-gold-400 font-bold text-xl ml-1">VIP</span>
              <p className="text-[10px] text-neutral-400 tracking-[0.2em] uppercase hidden sm:block">Premium Transfer Service</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="text-sm font-medium text-white hover:text-gold-400 transition-colors uppercase tracking-wider">{t.nav.home}</a>
            <a href="#fleet" className="text-sm font-medium text-neutral-300 hover:text-gold-400 transition-colors uppercase tracking-wider">{t.nav.fleet}</a>
            <a href="#about" className="text-sm font-medium text-neutral-300 hover:text-gold-400 transition-colors uppercase tracking-wider">{t.nav.about}</a>
            <a href="#contact" className="text-sm font-medium text-neutral-300 hover:text-gold-400 transition-colors uppercase tracking-wider">{t.nav.contact}</a>

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
              {/* Language Switcher */}
              <div className="flex bg-white/5 rounded-lg p-1">
                <button onClick={() => setLang('tr')} className={`px-2 py-1 rounded text-xs font-bold transition-all ${lang === 'tr' ? 'bg-gold-400 text-dark-900 shadow-lg' : 'text-neutral-400 hover:text-white'}`}>TR</button>
                <button onClick={() => setLang('en')} className={`px-2 py-1 rounded text-xs font-bold transition-all ${lang === 'en' ? 'bg-gold-400 text-dark-900 shadow-lg' : 'text-neutral-400 hover:text-white'}`}>EN</button>
              </div>

              {/* Currency Switcher */}
              <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                {['EUR', 'USD', 'TRY'].map(c => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`text-[10px] font-bold px-2 py-1 rounded transition-all ${currency === c ? 'bg-gold-400 text-dark-900 shadow-lg' : 'text-neutral-400 hover:text-white'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/20 text-sm flex items-center gap-2">
              <WhatsAppIcon className="w-4 h-4" />
              <span>{t.nav.whatsapp}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Mobile Currency Switcher (Compact) */}
            <div className="flex bg-white/5 rounded-lg p-1 gap-1 mr-3">
              {['EUR', 'TRY'].map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`text-[10px] font-bold px-2 py-1 rounded ${currency === c ? 'bg-gold-400 text-dark-900' : 'text-neutral-400'}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-gold-400 transition-colors p-2">
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-900 border-t border-white/10 absolute w-full left-0 animate-fadeIn shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-xl">{t.nav.home}</a>
            <a href="#fleet" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-xl">{t.nav.fleet}</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-xl">{t.nav.about}</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-xl">{t.nav.contact}</a>

            <div className="flex items-center justify-between px-4 py-4 border-t border-white/5 mt-4">
              <span className="text-neutral-400 text-sm">Dil / Language</span>
              <div className="flex bg-dark-800 rounded-lg p-1">
                <button onClick={() => setLang('tr')} className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${lang === 'tr' ? 'bg-gold-400 text-dark-900' : 'text-neutral-400'}`}>TR</button>
                <button onClick={() => setLang('en')} className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${lang === 'en' ? 'bg-gold-400 text-dark-900' : 'text-neutral-400'}`}>EN</button>
              </div>
            </div>

            <div className="px-4">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="w-full bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20">
                <WhatsAppIcon className="w-5 h-5" />
                {t.nav.whatsapp}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── BOOKING WIDGET ───────────────────────────────────────
// 🔍 AKILLI ARAMA BİLEŞENİ (AUTOCOMPLETE)
// 🔍 DÜZELTİLMİŞ AKILLI ARAMA BİLEŞENİ
function SearchableSelect({ label, value, onChange, options, placeholder, icon, lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dropdown açılınca inputa odaklan
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Seçili olanın ismini bul
  const selectedOption = options.find(o => o.id === value);
  const displayValue = selectedOption ? selectedOption.name[lang] : '';

  // Filtreleme
  const filteredOptions = options.filter(option =>
    option.name[lang].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative mb-4" ref={wrapperRef}>
      <label className="block text-xs text-neutral-400 mb-1.5 font-medium">{label}</label>

      {/* Tıklanabilir Alan */}
      <div
        className="w-full bg-dark-800/50 border border-white/10 text-white px-4 py-3 rounded-xl flex items-center justify-between cursor-pointer hover:border-gold-400/50 transition-all"
        onClick={() => { setIsOpen(!isOpen); setSearchTerm(''); }}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {icon && <span className="text-gold-400">{icon}</span>}
          <span className={`truncate ${!displayValue ? 'text-neutral-500' : ''}`}>
            {displayValue || placeholder}
          </span>
        </div>
        <svg className={`w-4 h-4 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Açılır Liste */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-dark-900 border border-gold-400/30 rounded-xl shadow-2xl max-h-60 overflow-hidden animate-fadeIn flex flex-col">
          {/* Arama Inputu (En üstte sabit) */}
          <div className="p-2 border-b border-white/10 bg-dark-800">
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-black/40 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-400 placeholder-neutral-500"
              placeholder={lang === 'tr' ? "Otel veya bölge ara..." : "Search..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Liste */}
          <div className="overflow-y-auto flex-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.id}
                  className={`px-4 py-3 hover:bg-white/5 cursor-pointer text-sm flex flex-col border-b border-white/5 last:border-0 ${value === opt.id ? 'bg-gold-400/10' : ''}`}
                  onClick={() => {
                    onChange(opt.id);
                    setIsOpen(false);
                  }}
                >
                  <span className="text-white font-medium">{opt.name[lang]}</span>
                  {opt.category && <span className="text-[10px] text-gold-400/70 uppercase font-bold tracking-wider mt-0.5">{opt.category}</span>}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-neutral-500 text-sm text-center">
                {lang === 'tr' ? "Sonuç yok" : "No results"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BOOKING WIDGET ───────────────────────────────────────
function BookingWidget({ lang, t, currency, convertPrice }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    name: '',
    phone: '',
    email: '',
    flightCode: ''
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [distance, setDistance] = useState(0);

  // Mesafe hesaplama (Öklid)
  const calcDistance = (fromId, toId) => {
    const a = LOCATIONS.find(l => l.id === fromId);
    const b = LOCATIONS.find(l => l.id === toId);
    if (!a || !b) return 0;

    // Basit kuş uçuşu hesaba %20 yol payı ekleyelim ki gerçekçi olsun
    const rawDist = Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2));
    // 1 derece enlem yaklaşık 111km. Bu basit bir hack, google maps api masrafı olmasın diye.
    return Math.round(rawDist * 111 * 1.3) || 15;
  };

  const getPrice = (vehicle, dist) => {
    let price = vehicle.basePrice + (vehicle.perKm * dist);

    // 🌙 GECE TARİFESİ / UZUN YOL İNDİRİMİ
    // Eğer mesafe 150km üzerindeyse %10 indirim
    if (dist > 150) {
      price = price * 0.90;
    }

    return Math.round(price);
  };

  // GPS BUTONU - Mesafe Kontrolü ile
  const findNearestLocation = () => {
    if (!navigator.geolocation) {
      alert("Tarayıcı konumu desteklemiyor.");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      // İzmir Merkezi (Kabaca)
      const izmirLat = 38.42;
      const izmirLng = 27.14;

      // Merkeze uzaklık (Derece cinsinden basit hesap)
      const distFromCenter = Math.sqrt(Math.pow(latitude - izmirLat, 2) + Math.pow(longitude - izmirLng, 2));

      // Eğer kullanıcı İzmir merkezden yaklaşık 200km (2 derece) uzaktaysa
      if (distFromCenter > 2.5) {
        alert(lang === 'tr'
          ? "Konumunuz hizmet bölgemiz (İzmir ve çevresi) dışında görünüyor. Varsayılan olarak Havalimanı seçildi."
          : "You seem to be outside our service area. Defaulted to Airport.");
        setFormData(prev => ({ ...prev, from: 'adb' })); // Havalimanına at
        return;
      }

      // Yakındaysa en yakın noktayı bul
      let nearest = null;
      let minDist = Infinity;
      LOCATIONS.forEach(loc => {
        const d = Math.sqrt(Math.pow(loc.lat - latitude, 2) + Math.pow(loc.lng - longitude, 2));
        if (d < minDist) { minDist = d; nearest = loc; }
      });

      if (nearest) {
        setFormData(prev => ({ ...prev, from: nearest.id }));
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.date) return;
    const dist = calcDistance(formData.from, formData.to);
    setDistance(dist);
    setStep(2);
  };

  // Input class'ı
  const inputClass = "w-full bg-dark-800/50 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all placeholder-neutral-500 shadow-inner";

  return (
    <div className="bg-dark-800/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-visible relative z-20"> {/* z-20 dropdown için önemli */}

      {/* Step Indicator */}
      <div className="flex border-b border-white/5">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`flex-1 h-1 ${step >= s ? 'bg-gold-400' : 'bg-white/10'}`} />
        ))}
      </div>

      <div className="p-5 sm:p-6">
        {step === 1 && (
          <form onSubmit={handleSearch} className="space-y-1">

            {/* Konum Bul Butonu */}
            <div className="flex justify-end mb-1">
              <button type="button" onClick={findNearestLocation} className="text-[10px] text-gold-400 hover:text-white flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {lang === 'tr' ? 'Konumumu Bul' : 'Find my location'}
              </button>
            </div>

            {/* YENİ SEARCHABLE SELECT BİLEŞENLERİ */}
            <SearchableSelect
              label={t.booking.from}
              options={LOCATIONS}
              value={formData.from}
              onChange={(val) => setFormData({ ...formData, from: val })}
              placeholder={t.booking.selectPlaceholder}
              lang={lang}
              icon={<MapPinIcon />} // MapPinIcon componentini kullanıyoruz
            />

            <SearchableSelect
              label={t.booking.to}
              options={LOCATIONS.filter(l => l.id !== formData.from)} // Seçilen hariç diğerleri
              value={formData.to}
              onChange={(val) => setFormData({ ...formData, to: val })}
              placeholder={t.booking.selectPlaceholder}
              lang={lang}
              icon={<MapPinIcon />}
            />

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-medium">{t.booking.date}</label>
                <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-medium">{t.booking.passengers}</label>
                <select value={formData.passengers} onChange={e => setFormData({ ...formData, passengers: Number(e.target.value) })} className={inputClass}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-dark-900 font-bold py-3.5 rounded-xl mt-4 transition-all shadow-lg hover:shadow-gold-500/20 text-sm tracking-wide">
              {t.booking.search}
            </button>
          </form>
        )}

        {/* Step 2, 3, 4 (İçerikleri aynı kalabilir, sadece step flow korunmalı) */}
        {step === 2 && (
          <div className="space-y-3">
            <button onClick={() => setStep(1)} className="text-xs text-gold-400 mb-2">← {t.booking.back}</button>
            {VEHICLES.map(v => (
              <button key={v.id} onClick={() => { setSelectedVehicle(v); setStep(3); }} className="w-full bg-dark-700 p-3 rounded-xl flex items-center justify-between hover:bg-dark-600 border border-white/5 hover:border-gold-400/50 group text-left">
                <div className="flex items-center gap-3">
                  <img src={v.image} className="w-16 h-12 object-cover rounded" />
                  <div>
                    <p className="text-white font-bold text-sm">{v.name}</p>
                    <p className="text-xs text-neutral-400">{v.capacity} Kişi</p>
                  </div>
                </div>
                <span className="text-gold-400 font-bold">{SYMBOLS[currency]}{convertPrice(getPrice(v, distance))}</span>
              </button>
            ))}
          </div>
        )}

        {/* İletişim Formu (Step 3) */}
        {step === 3 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="space-y-3">
            <button type="button" onClick={() => setStep(2)} className="text-xs text-gold-400 mb-2">← {t.booking.back}</button>
            <input type="text" placeholder="Ad Soyad" required className={inputClass} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input type="tel" placeholder="Telefon" required className={inputClass} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            <input type="email" placeholder="Email" required className={inputClass} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <div className="relative">
              <input type="text" placeholder="Uçuş Kodu (Opsiyonel)" className={inputClass} onChange={e => setFormData({ ...formData, flightCode: e.target.value })} />
              <p className="text-[10px] text-neutral-500 mt-1">Uçuşunuzu canlı takip ediyoruz, rötar olursa ek ücret ödemezsiniz.</p>
            </div>

            {/* "İsminizle Karşılama" Simülasyonu */}
            {formData.name.length > 2 && (
              <div className="mt-6 animate-fadeIn">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-2 text-center">Havalimanı Karşılama Ekranı Önizlemesi</p>

                {/* Tablet Çerçevesi */}
                <div className="mx-auto max-w-[280px] bg-neutral-800 rounded-xl p-2 shadow-2xl border border-neutral-700">
                  {/* Ekran */}
                  <div className="bg-white h-32 rounded-lg flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
                    {/* Logo Filigranı */}
                    <div className="absolute inset-0 opacity-5 flex items-center justify-center">
                      <span className="text-6xl font-bold text-black">VIP</span>
                    </div>

                    {/* Karşılama Yazısı */}
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-1">Welcome / Hoşgeldiniz</p>
                    <h3 className="text-2xl font-black text-black leading-tight break-words w-full font-playfair">
                      {formData.name === '' ? 'MİSAFİR İSMİ' : formData.name.toUpperCase()}
                    </h3>
                    <div className="mt-2 w-12 h-1 bg-gold-400 rounded-full"></div>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-500 text-center mt-2">Şoförümüz sizi gelen yolcu kapısında bu şekilde karşılayacaktır.</p>
              </div>
            )}

            <button type="submit" className="w-full bg-gold-500 text-dark-900 font-bold py-3 rounded-xl">Önizleme</button>
          </form>
        )}

        {/* Onay (Step 4) */}
        {step === 4 && (
          <div className="text-center space-y-4">
            <h3 className="text-white font-bold">Özet</h3>
            <div className="bg-white/5 p-4 rounded-xl text-left text-sm space-y-2">
              <p className="flex justify-between text-neutral-400"><span>Araç:</span> <span className="text-white">{selectedVehicle?.name}</span></p>
              <p className="flex justify-between text-neutral-400"><span>Tutar:</span> <span className="text-gold-400 font-bold">{SYMBOLS[currency]}{convertPrice(getPrice(selectedVehicle, distance))}</span></p>
            </div>
            <button
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Rezervasyon: ${formData.name}`, '_blank')}
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <WhatsAppIcon /> WhatsApp ile Onayla
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────
function HeroSection({ lang, t, currency, convertPrice }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 scale-105">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-transparent to-dark-900/90" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left pt-10 lg:pt-0">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 rounded-full px-4 py-1.5 text-gold-400 text-xs font-bold tracking-widest uppercase animate-slideDown">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            {lang === 'tr' ? 'İzmir Transfer Uzmanı' : 'Izmir Transfer Specialist'}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight font-playfair animate-slideUp">
            {t.hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">{t.hero.highlight}</span>
          </h1>
          <p className="text-neutral-300 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-slideUp delay-100">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-slideUp delay-200">
            <div className="flex items-center gap-2 bg-dark-800/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-dark-900 flex items-center justify-center text-[10px] text-white overflow-hidden"><img src={`https://i.pravatar.cc/100?img=${i + 10}`} /></div>)}
              </div>
              <div className="text-left">
                <div className="text-white text-xs font-bold">5000+</div>
                <div className="text-[10px] text-neutral-400">{lang === 'tr' ? 'Mutlu Müşteri' : 'Happy Clients'}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gold-400">
              ★★★★★ <span className="text-white text-sm font-bold ml-1">4.9/5</span>
            </div>
          </div>
        </div>

        {/* Right Content - Booking Widget */}
        <div className="animate-slideUp delay-300 w-full max-w-md mx-auto lg:ml-auto">
          <BookingWidget lang={lang} t={t} currency={currency} convertPrice={convertPrice} />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
        <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" /></svg>
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

// ─── FLEET SECTION ──────────────────────────────────────
function FleetSection({ lang, t, onShowInterior, currency, convertPrice }) {
  return (
    <section id="fleet" className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase">{t.fleet.subtitle}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-playfair">{t.fleet.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {VEHICLES.map(v => (
            <div key={v.id} className="group bg-dark-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/5 hover:-translate-y-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold text-white">Available</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{v.name}</h3>
                    <p className="text-neutral-500 text-xs uppercase tracking-wider">{v.type === 'vip' ? 'VIP Van' : v.type === 'sedan' ? 'Luxury Sedan' : 'VIP Sprinter'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold-400 text-xl font-bold">{SYMBOLS[currency]}{convertPrice(v.basePrice)}</p>
                    <p className="text-neutral-600 text-[10px] uppercase">Base Price</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-neutral-400">Capacity</span>
                    <span className="text-white font-medium">{v.capacity} Passengers</span>
                  </div>
                  {v.specs[lang].map((spec, i) => (
                    <div key={i} className="flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0">
                      <span className="text-neutral-400">Feature</span>
                      <span className="text-white font-medium">{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => onShowInterior(v)} className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-colors border border-white/5">
                    {lang === 'tr' ? 'İncele' : 'View'}
                  </button>
                  <a href="#hero" className="w-full py-3 bg-gold-400 hover:bg-gold-500 text-dark-900 rounded-xl text-sm font-bold transition-colors text-center shadow-lg shadow-gold-500/20">
                    {t.booking.search}
                  </a>
                </div>
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 h-full">
              <img
                src="/assets/biz kimiz.png"
                alt="İzmir VIP Transfer"
                /* 🖼️ IMAGE FIX: Ensure it covers full height without distortion */
                className="w-full aspect-[4/5] md:h-full object-cover object-center"
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

// ─── FAQ SECTION (NEW 🆕) ─────────────────────────────────
function FAQSection({ t }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-dark-800 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">{t.faq.title}</h2>
          <p className="text-neutral-400">{t.faq.subtitle}</p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((item, index) => (
            <div
              key={index}
              className={`bg-dark-900/50 border rounded-2xl transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-gold-400/30 bg-dark-900 shadow-lg shadow-black/20' : 'border-white/5 hover:border-white/10'}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
              >
                <span className={`font-medium transition-colors duration-300 ${openIndex === index ? 'text-gold-400' : 'text-white group-hover:text-gold-200'}`}>
                  {item.q}
                </span>
                <span className={`ml-4 flex-shrink-0 text-gold-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-6 pb-6 text-neutral-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {item.a}
                </p>
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
    <footer id="contact" className="bg-dark-900 border-t border-white/5">
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
            <p className="text-neutral-400 text-sm leading-relaxed">{t.about.p1}</p>
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
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-neutral-500 text-sm">{t.footer.rights}</p>
            <p className="text-neutral-600 text-xs flex items-center gap-1">
              developed by <a href="https://vr0cks.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">vr0cks</a>
            </p>
          </div>
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

// ─── PROCESS SECTION (Nasıl Çalışır?) ─────────────────
function ProcessSection({ lang }) {
  const steps = [
    {
      num: "01",
      title: { tr: "Rezervasyon Yap", en: "Book Online" },
      desc: { tr: "Gideceğiniz yeri seçin, aracınızı belirleyin ve saniyeler içinde rezervasyonu tamamlayın.", en: "Choose your destination, select your vehicle and complete your booking in seconds." },
      icon: (
        <svg className="w-8 h-8 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      num: "02",
      title: { tr: "Onay Alın", en: "Get Confirmation" },
      desc: { tr: "Rezervasyonunuz anında onaylanır ve şoför bilgileriniz size SMS/WhatsApp ile iletilir.", en: "Your booking is instantly confirmed and driver details are sent via SMS/WhatsApp." },
      icon: (
        <svg className="w-8 h-8 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      num: "03",
      title: { tr: "Keyfini Çıkarın", en: "Enjoy the Ride" },
      desc: { tr: "Tam zamanında gelen VIP aracınızla, konforlu ve güvenli yolculuğun tadını çıkarın.", en: "Enjoy a comfortable and safe journey with your VIP vehicle arriving right on time." },
      icon: (
        <svg className="w-8 h-8 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gold-400 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-2">
            {lang === 'tr' ? 'Nasıl Çalışır?' : 'How It Works'}
          </p>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">
            {lang === 'tr' ? '3 Adımda VIP Transfer' : 'VIP Transfer in 3 Steps'}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-gold-400/30 to-transparent z-0" />

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 group text-center">
              <div className="w-24 h-24 mx-auto bg-dark-900 border border-gold-400/30 rounded-full flex items-center justify-center mb-6 group-hover:border-gold-400 group-hover:shadow-[0_0_30px_-5px_rgba(212,168,82,0.3)] transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                {step.title[lang]}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed px-4">
                {step.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TRUST BADGES (Partner Logos — SVG) ───────────────

function TrustBadges() {
  return (
    <div className="py-12 bg-dark-900 border-t border-white/5 relative overflow-hidden">
      {/* Arkaplan ışıltısı */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_3s_infinite]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Değişiklik: 'opacity-60 grayscale hover:...' kısımlarını sildik. Artık hep renkli. */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500">

          {/* VISA */}
          <svg className="h-8 w-auto text-white" viewBox="0 0 50 16" fill="currentColor">
            <path d="M19.4 0.6H13.1L9.1 10.3L8.9 10.3L6.3 0.6H0.1C0.1 0.6 -0.1 0.9 0.1 1.2L4.8 23.3L19.4 0.6ZM36.5 0.6H31.3L27.6 10.3L27.4 10.3L23.7 0.6H18.2L25.6 16.8L21.4 26.5H27.1L42.2 0.6H36.5ZM49.9 0.6H44.6C44.3 0.6 42.1 1.1 41.3 2.9L35.2 17.5L41.6 17.5C42.2 17.5 42.7 17.2 42.9 16.6L43.4 15.3H48.8L49.3 17.5H54.4L49.9 0.6ZM44.7 11.9L46.1 5.3L47.5 11.9H44.7Z" />
          </svg>

          {/* MASTERCARD (Renkli) */}
          <svg className="h-10 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0">
            <path fill="#EB001B" d="M12 12a7.33 7.33 0 0 0-2.8 5.8A7.34 7.34 0 0 0 12 24a7.34 7.34 0 0 0 2.8-6.2A7.33 7.33 0 0 0 12 12z" />
            <path fill="#F79E1B" d="M12 12A7.33 7.33 0 0 1 9.2 6.2 7.34 7.34 0 0 1 12 0a7.34 7.34 0 0 1 2.8 6.2A7.33 7.33 0 0 1 12 12z" />
          </svg>

          {/* TÜRSAB (Renkli) */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-blue-900 border-2 border-gold-400 flex items-center justify-center relative overflow-hidden">
              {/* Demo için renkli daire, gerçek logo URL'si buraya gelir */}
              <span className="text-gold-400 font-bold text-xs">TR</span>
            </div>
            <div className="text-left">
              <p className="text-[10px] text-neutral-400 leading-none">MEMBER OF</p>
              <p className="text-lg font-bold text-white tracking-wide">TÜRSAB</p>
            </div>
          </div>

          {/* MERCEDES-BENZ */}
          <svg className="h-10 w-auto text-white" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0zm0 2c7.73 0 14 6.27 14 14s-6.27 14-14 14S2 23.73 2 16 8.27 2 16 2zm0 3.5l-4.5 9 4.5 2.5 4.5-2.5-4.5-9zm-1.5 10.5l-5 8.5 6.5-3.5-1.5-5zm3 0l1.5 5 6.5 3.5-5-8.5z" />
          </svg>

        </div>
      </div>
    </div>
  );
}

// ─── LIVE BOOKING NOTIFICATION ──────────────────────────
function LiveBookingNotification() {
  const [show, setShow] = useState(false);
  const [booking, setBooking] = useState(null);

  const bookings = [
    { name: "Ahmet Y.", route: "Havalimanı - Çeşme", time: "şimdi" },
    { name: "Ayşe K.", route: "Havalimanı - Alaçatı", time: "5 dk önce" },
    { name: "Mehmet D.", route: "Havalimanı - Kuşadası", time: "10 dk önce" },
    { name: "Zeynep S.", route: "Havalimanı - Şehir Merkezi", time: "15 dk önce" },
    { name: "Can B.", route: "Havalimanı - Urla", time: "20 dk önce" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomBooking = bookings[Math.floor(Math.random() * bookings.length)];
      setBooking(randomBooking);
      setShow(true);

      const hideTimer = setTimeout(() => setShow(false), 5000); // Show for 5 seconds
      return () => clearTimeout(hideTimer);
    }, 600000); // Change booking every 10 minutes

    return () => clearInterval(interval);
  }, []);

  if (!show || !booking) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-dark-800 border border-gold-400/30 rounded-xl p-4 shadow-lg flex items-center gap-3 animate-slideInUp">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-900 font-bold text-lg">
        {booking.name.charAt(0)}
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{booking.name}</p>
        <p className="text-neutral-400 text-xs">{booking.route} için {booking.time} rezervasyon yaptı!</p>
      </div>
      <button onClick={() => setShow(false)} className="text-neutral-500 hover:text-white transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   🚀 APP (root)
   ════════════════════════════════════════════════════════════ */

// 🔥 POPÜLER ROTALAR BİLEŞENİ (Bunu Hero'nun altına koy)
function PopularRoutes({ t, currency, convertPrice }) {
  const routes = POPULAR_ROUTES;

  return (
    <section className="py-16 bg-dark-900 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <span className="text-gold-400">🔥</span>
          {t?.lang === 'en' ? 'Popular Destinations' : 'Popüler Rotalar'}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {routes.map((route, i) => (
            <div
              key={i}
              // Bu fonksiyon formdaki "nereden-nereye"yi otomatik doldurabilir (state yönetimi gerekir)
              // Şimdilik WhatsApp'a yönlendiriyoruz
              onClick={() => window.open(`https://wa.me/905551234567?text=Merhaba, ${route.name} (${currency} ${convertPrice(route.price)}) için rezervasyon yapmak istiyorum.`, '_blank')}
              className="group relative h-48 rounded-xl overflow-hidden border border-white/10 hover:border-gold-400 transition-all cursor-pointer hover:shadow-xl hover:shadow-gold-400/10"
            >
              <img src={route.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={route.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-bold text-sm leading-tight mb-1">{route.name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gold-400 font-bold">{SYMBOLS[currency]}{convertPrice(route.price)}</span>
                  <span className="text-[10px] text-neutral-300 bg-white/10 px-2 py-0.5 rounded backdrop-blur">~{route.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 📖 GÜNCELLENMİŞ BLOG BİLEŞENİ (MODAL İÇERİR)
function TravelGuide({ t }) {
  const [selectedPost, setSelectedPost] = useState(null);

  // Zengin içerikli blog verisi
  const posts = BLOG_POSTS;

  return (
    <section className="py-20 bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-2">Blog</p>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">
            {t.lang === 'tr' ? 'İzmir Seyahat Rehberi' : 'Izmir Travel Guide'}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} onClick={() => setSelectedPost(post)} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video border border-white/10">
                <img
                  src={post.image}
                  alt={post.title.tr}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute top-3 left-3 bg-dark-900/80 backdrop-blur px-3 py-1 rounded-full text-[10px] text-white font-medium border border-white/10">
                  {post.date}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                {post.title[t.lang === 'en' ? 'en' : 'tr']}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                {post.short[t.lang === 'en' ? 'en' : 'tr']}
              </p>
              <div className="mt-4 flex items-center text-gold-400 text-sm font-semibold gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                {t.lang === 'en' ? 'Read Article' : 'Yazıyı Oku'} →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BLOG MODAL (POPUP) */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedPost(null)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <div className="relative bg-dark-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={selectedPost.image} className="w-full h-64 object-cover" />
            <button onClick={() => setSelectedPost(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-gold-400 hover:text-black transition-colors">✕</button>
            <div className="p-8">
              <h2 className="text-3xl font-playfair font-bold text-white mb-6">{selectedPost.title[t.lang === 'en' ? 'en' : 'tr']}</h2>
              <div
                className="prose prose-invert prose-gold text-neutral-300"
                dangerouslySetInnerHTML={{ __html: selectedPost.content[t.lang === 'en' ? 'en' : 'tr'] }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── DAILY TOURS (VIP PACKAGES) ──────────────────────────
// ─── DAILY TOURS (VIP PACKAGES) ──────────────────────────
function DailyTours({ t, currency, convertPrice, lang }) {
  const tours = DAILY_TOURS;

  return (
    <section className="py-16 bg-dark-800 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-gold-400">★</span>
            {lang === 'tr' ? 'Şoförlü Günlük Turlar' : 'Daily Chauffeur Service'}
          </h3>
          <span className="text-xs font-bold bg-gold-400 text-dark-900 px-2 py-1 rounded">VIP</span>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {tours.map((tour, i) => (
            <div key={i} className="bg-dark-900 border border-white/10 rounded-2xl overflow-hidden hover:border-gold-400/50 transition-all group flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={tour.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur px-3 py-1 rounded-lg text-white font-bold text-sm">
                  {tour.time[lang]}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-lg font-bold text-white mb-2 leading-tight">{tour.name[lang]}</h4>
                <p className="text-neutral-400 text-xs mb-4 flex-1">{tour.desc[lang]}</p>
                <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Paket Fiyatı</span>
                    {tour.price === 'ASK' ? (
                      <span className="text-xl font-bold text-gold-400">{lang === 'tr' ? 'Sorunuz' : 'Ask Us'}</span>
                    ) : (
                      <span className="text-xl font-bold text-gold-400">{SYMBOLS[currency]}{convertPrice(tour.price)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => window.open(`https://wa.me/905551234567?text=Merhaba, ${tour.name[lang]} paketi hakkında bilgi almak istiyorum.`, '_blank')}
                    className="bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Bilgi Al →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CALLBACK SECTION (FOOTER ÜSTÜ) ───────────────────────
function CallBackSection({ t, lang }) {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);

    // 1. Google Sheets'e Kaydet (Webhook)
    fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Script CORS hatası vermemesi için
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'CALLBACK', phone: phone, date: new Date().toLocaleString() })
    }).catch(err => console.error("Webhook Error:", err));

    // 2. WhatsApp Bildirimi (Yedek) - Yeni sekmede açılır
    // Müşteri "beni ara" dediğinde senin telefonuna mesaj düşer.
    const message = lang === 'tr'
      ? `Merhaba, numaram: ${phone}. Sizi Arayalım formundan ulaştım, dönüş yapar mısınız?`
      : `Hi, my number is: ${phone}. I reached out via Call Me Back form, please call me.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-gold-500 to-gold-600 relative overflow-hidden">
      {/* Dekoratif Arkaplan */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-dark-900 mb-2 font-playfair">
          {lang === 'tr' ? 'Karar veremediniz mi?' : 'Can\'t decide?'}
        </h2>
        <p className="text-dark-900/80 mb-8 font-medium">
          {lang === 'tr'
            ? 'Numaranızı bırakın, transfer uzmanımız sizi 5 dakika içinde arasın.'
            : 'Leave your number, our transfer expert will call you in 5 minutes.'}
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="tel"
              placeholder="0555 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="flex-1 bg-white/90 border-0 text-dark-900 px-6 py-4 rounded-xl focus:ring-2 focus:ring-dark-900 placeholder-neutral-500 shadow-xl"
            />
            <button
              type="submit"
              className="bg-dark-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 whitespace-nowrap"
            >
              {lang === 'tr' ? 'Beni Arayın' : 'Call Me Back'}
            </button>
          </form>
        ) : (
          <div className="bg-white/20 backdrop-blur rounded-xl p-4 inline-block animate-fadeIn">
            <p className="text-dark-900 font-bold flex items-center gap-2">
              <span className="text-xl">✓</span>
              {lang === 'tr' ? 'Talebiniz alındı! Birazdan arıyoruz.' : 'Request received! Calling you shortly.'}
            </p>
          </div>
        )}

        <p className="text-dark-900/60 text-xs mt-4">
          * {lang === 'tr' ? 'Mesai saatleri içinde (08:00 - 22:00)' : 'During business hours (08:00 - 22:00)'}
        </p>
      </div>
    </section>
  );
}

// ─── EXIT INTENT POPUP ───────────────────────
function ExitIntentPopup({ t }) {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Eğer mouse viewport'un üstünden çıkarsa (tab kapatma/URL barına gitme hareketi)
      if (e.clientY <= 0 && !closed) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [closed]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShow(false)} />
      <div className="relative bg-dark-800 w-full max-w-md rounded-2xl border border-gold-400/30 shadow-2xl overflow-hidden animate-fadeInScale">
        <button onClick={() => { setShow(false); setClosed(true); }} className="absolute top-3 right-3 text-neutral-400 hover:text-white transition-colors">✕</button>

        <div className="bg-gradient-to-r from-gold-400 to-gold-600 p-6 text-center">
          <h3 className="text-2xl font-black text-dark-900 uppercase tracking-tight">Wait! Don't Go!</h3>
          <p className="text-dark-900 font-bold opacity-80 mt-1">{t.lang === 'tr' ? 'Gitmeden önce size özel bir teklifimiz var.' : 'Before you go, we have a special offer for you.'}</p>
        </div>

        <div className="p-8 text-center bg-dark-900">
          <div className="text-6xl mb-4">🎁</div>
          <h4 className="text-white text-xl font-bold mb-2">
            {t.lang === 'tr' ? 'Anında %10 İndirim Kazan' : 'Get 10% Discount Instantly'}
          </h4>
          <p className="text-neutral-400 text-sm mb-6">
            {t.lang === 'tr'
              ? 'Rezervasyon adımında "Merhaba" derseniz %10 indirim kazanın.'
              : 'Say "Hello" during booking to get 10% off.'}
          </p>

          <button
            onClick={() => {
              window.open(`https://wa.me/905551234567?text=Merhaba, siteden çıkarken gördüm. %10 indirim alabilir miyim?`, '_blank');
              setShow(false);
              setClosed(true);
            }}
            className="w-full bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold py-3 rounded-xl transition-all shadow-lg shadow-gold-500/20"
          >
            {t.lang === 'tr' ? 'İndirimi Al' : 'Claim Discount'}
          </button>
          <button onClick={() => { setShow(false); setClosed(true); }} className="mt-4 text-xs text-neutral-500 hover:text-white">
            {t.lang === 'tr' ? 'Hayır, teşekkürler' : 'No, thanks'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   🚀 APP (root)
   ════════════════════════════════════════════════════════════ */

export default function App() {
  const [lang, setLang] = useState('tr');
  const [interiorVehicle, setInteriorVehicle] = useState(null);

  // 💱 PARA BİRİMİ SİSTEMİ
  const [currency, setCurrency] = useState('EUR');

  // Fiyat dönüştürücü
  const convertPrice = (priceInEuro) => {
    return Math.round(priceInEuro * RATES[currency]);
  };

  // YENİ: Otomatik Dil Algılama
  useEffect(() => {
    // Tarayıcı dilini al (örn: "en-US" veya "tr-TR")
    const userLang = navigator.language || navigator.userLanguage;

    // Eğer dil "tr" ile başlamıyorsa İngilizce yap
    if (!userLang.startsWith('tr')) {
      setLang('en');
    }
  }, []); // Sadece sayfa ilk açıldığında çalışır

  const t = T[lang];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-dark-900 flex items-center justify-center">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-gold-500/20">
            <span className="text-4xl font-bold text-dark-900">V</span>
          </div>
          <div className="space-y-1">
            <p className="text-white text-xl font-playfair font-bold tracking-wider">İzmir VIP Transfer</p>
            <p className="text-gold-400 text-xs tracking-[0.3em] uppercase">Premium Service</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white font-inter">
      <Navbar lang={lang} setLang={setLang} t={t} currency={currency} setCurrency={setCurrency} />
      <HeroSection lang={lang} t={t} currency={currency} convertPrice={convertPrice} />
      <PopularRoutes t={t} currency={currency} convertPrice={convertPrice} />
      <DailyTours t={t} currency={currency} convertPrice={convertPrice} lang={lang} />
      <CallBackSection t={t} lang={lang} />
      <ExitIntentPopup t={t} />
      <StatsBanner t={t} />
      <FleetSection lang={lang} t={t} onShowInterior={setInteriorVehicle} currency={currency} convertPrice={convertPrice} />

      {/* Blog/Rehber Bölümünü Buraya Ekledik */}
      <TravelGuide lang={lang} t={t} />

      <AboutSection t={t} />
      <ProcessSection lang={lang} />
      <TestimonialsSection lang={lang} t={t} />
      {/* FAQ Section Added Here */}
      <FAQSection t={t} />
      <TrustBadges />
      <Footer t={t} />
      <InteriorModal vehicle={interiorVehicle} onClose={() => setInteriorVehicle(null)} t={t} />

      {/* 🔔 LIVE NOTIFICATION */}
      <LiveBookingNotification />

      {/* Mobile Sticky Action Bar (Sadece mobilde görünür) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-900/90 backdrop-blur-lg border-t border-white/10 p-4 pb-6 safe-area-bottom">
        <div className="grid grid-cols-2 gap-3">
          <a href="tel:+905551234567" className="flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 text-white py-3 rounded-xl font-semibold text-sm transition-colors border border-white/5">
            <PhoneIcon /> Hemen Ara
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-emerald-900/20">
            <WhatsAppIcon className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}