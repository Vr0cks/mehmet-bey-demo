/* data.js */
export const WHATSAPP_NUMBER = "905551234567";
export const ROUTE_SPEED = 1.2;
export const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbz7U02dKCpkmuTOnlo45SP81zL8rIO4ZAfWoJ7NFeKFK6YRWeRUFf6VQR_m5e795kaB0A/exec"; // Google Script URL buraya

export const LOCATIONS = [
    // ✈️ HAVALİMANI
    { id: 'adb', category: 'Havalimanı', name: { tr: 'Adnan Menderes Havalimanı (ADB)', en: 'Adnan Menderes Airport (ADB)' }, km: 0, lat: 38.2924, lng: 27.1570 },

    // 🏙️ MERKEZ & İLÇELER
    { id: 'alsancak', category: 'Merkez', name: { tr: 'Alsancak Merkez', en: 'Alsancak Center' }, km: 18, lat: 38.4382, lng: 27.1418 },
    { id: 'karsiyaka', category: 'Merkez', name: { tr: 'Karşıyaka İskele', en: 'Karsiyaka Pier' }, km: 32, lat: 38.4570, lng: 27.1190 },
    { id: 'cesme_merkez', category: 'Çeşme', name: { tr: 'Çeşme Merkez', en: 'Cesme Center' }, km: 85, lat: 38.3233, lng: 26.3040 },
    { id: 'alacati_merkez', category: 'Çeşme', name: { tr: 'Alaçatı Çarşı', en: 'Alacati Downtown' }, km: 85, lat: 38.2825, lng: 26.3756 },

    // 🏨 ÇEŞME OTELLERİ (C Harfi testi için bolca C ekledim)
    { id: 'calacati', category: 'Çeşme Otelleri', name: { tr: 'Cigdem Hotel Alaçatı', en: 'Cigdem Hotel Alacati' }, km: 85, lat: 38.2830, lng: 26.3740 },
    { id: 'cairaba', category: 'Çeşme Otelleri', name: { tr: 'Cairaba Aqua Hotel', en: 'Cairaba Aqua Hotel' }, km: 88, lat: 38.3120, lng: 26.3330 },
    { id: 'reges', category: 'Çeşme Otelleri', name: { tr: 'Reges, a Luxury Collection Resort', en: 'Reges, a Luxury Collection Resort' }, km: 90, lat: 38.3305, lng: 26.3312 },
    { id: 'sheraton', category: 'Çeşme Otelleri', name: { tr: 'Sheraton Çeşme Hotel', en: 'Sheraton Cesme Hotel' }, km: 88, lat: 38.3116, lng: 26.3328 },
    { id: 'biblos', category: 'Çeşme Otelleri', name: { tr: 'Biblos Resort Alaçatı', en: 'Biblos Resort Alacati' }, km: 87, lat: 38.2562, lng: 26.3801 },
    { id: 'ilica', category: 'Çeşme Otelleri', name: { tr: 'Ilıca Hotel Spa & Wellness', en: 'Ilica Hotel Spa & Wellness' }, km: 85, lat: 38.3129, lng: 26.3478 },
    { id: 'boyalik', category: 'Çeşme Otelleri', name: { tr: 'Boyalık Beach Hotel', en: 'Boyalik Beach Hotel' }, km: 88, lat: 38.3245, lng: 26.3195 },
    { id: 'altinyunus', category: 'Çeşme Otelleri', name: { tr: 'Altın Yunus Hotel', en: 'Altin Yunus Hotel' }, km: 86, lat: 38.3190, lng: 26.3460 },
    { id: 'radisson', category: 'Çeşme Otelleri', name: { tr: 'Radisson Blu Resort & Spa', en: 'Radisson Blu Resort & Spa' }, km: 85, lat: 38.3150, lng: 26.3500 },

    // 🏛️ ŞEHİR OTELLERİ
    { id: 'swiss', category: 'Şehir Otelleri', name: { tr: 'Swissôtel Büyük Efes', en: 'Swissôtel Buyuk Efes' }, km: 17, lat: 38.4258, lng: 27.1363 },
    { id: 'renaissance', category: 'Şehir Otelleri', name: { tr: 'Renaissance İzmir Hotel', en: 'Renaissance Izmir Hotel' }, km: 17, lat: 38.4239, lng: 27.1378 },
    { id: 'hilton', category: 'Şehir Otelleri', name: { tr: 'Hilton Garden Inn Bayraklı', en: 'Hilton Garden Inn Bayrakli' }, km: 22, lat: 38.4552, lng: 27.1724 },
    { id: 'key', category: 'Şehir Otelleri', name: { tr: 'The Key Hotel', en: 'The Key Hotel' }, km: 17, lat: 38.4208, lng: 27.1293 },
    { id: 'marriott', category: 'Şehir Otelleri', name: { tr: 'Izmir Marriott Hotel', en: 'Izmir Marriott Hotel' }, km: 17, lat: 38.4231, lng: 27.1311 },
    { id: 'movenpick', category: 'Şehir Otelleri', name: { tr: 'Mövenpick Hotel İzmir', en: 'Mövenpick Hotel Izmir' }, km: 18, lat: 38.4246, lng: 27.1345 },
    { id: 'wyndham', category: 'Şehir Otelleri', name: { tr: 'Wyndham Grand İzmir Özdilek', en: 'Wyndham Grand Izmir Ozdilek' }, km: 25, lat: 38.4085, lng: 27.0392 },
    { id: 'ramada', category: 'Şehir Otelleri', name: { tr: 'Ramada Encore by Wyndham', en: 'Ramada Encore by Wyndham' }, km: 20, lat: 38.3980, lng: 27.0500 },
];

export const VEHICLES = [
    {
        id: 'vito',
        name: 'Mercedes-Benz Vito VIP',
        type: 'vip',
        capacity: 6,
        basePrice: 45,
        perKm: 1.2,
        image: '/vito-exterior.webp',
        interiorImage: '/vito.jpg',
        specs: { tr: ['Deri Koltuk', 'Buzdolabı', 'WiFi', 'Ara Bölme'], en: ['Leather Seats', 'Fridge', 'WiFi', 'Privacy Partition'] }
    },
    {
        id: 'sprinter',
        name: 'Mercedes-Benz Sprinter',
        type: 'bus',
        capacity: 12,
        basePrice: 70,
        perKm: 1.6,
        image: '/sprinter-exterior.jpg',
        interiorImage: '/sprinter.jpg',
        specs: { tr: ['Geniş Bagaj', 'Grup Transferi', 'Klima'], en: ['Large Luggage', 'Group Transfer', 'AC'] }
    },
    {
        id: 'eclass',
        name: 'Mercedes-Benz E-Class',
        type: 'sedan',
        capacity: 3,
        basePrice: 60,
        perKm: 1.4,

        image: '/e-class-exterior.jpg',
        interiorImage: '/eclass.avif',
        specs: { tr: ['Makam Aracı', 'Sessiz Kabin', 'Deri İç Mekan'], en: ['Executive Car', 'Silent Cabin', 'Leather Interior'] }
    }
];

export const REVIEWS = [
    { name: "Ahmet Y.", text: { tr: "Harika bir deneyimdi.", en: "Great experience." } },
    { name: "Selin K.", text: { tr: "Araç çok temizdi.", en: "Car was very clean." } },
    { name: "Mark D.", text: { tr: "Tam zamanında geldi.", en: "Arrived on time." } },
];

export const POPULAR_ROUTES = [
    { from: 'adb', to: 'cesme_merkez', name: "Havalimanı ⇄ Çeşme", price: 75, time: "55 dk", img: "/cesme.jpg" },
    { from: 'adb', to: 'alacati_merkez', name: "Havalimanı ⇄ Alaçatı", price: 80, time: "60 dk", img: "/alacati.jpg" },
    { from: 'adb', to: 'kusadasi', name: "Havalimanı ⇄ Kuşadası", price: 70, time: "65 dk", img: "/kusadasi.jpg" },
    { from: 'adb', to: 'alsancak', name: "Havalimanı ⇄ Şehir Merkezi", price: 35, time: "30 dk", img: "/sehir-merkezi.jpg" },
];

export const BLOG_POSTS = [
    {
        id: 1,
        title: { tr: "Çeşme ve Alaçatı Transfer Rehberi", en: "Cesme & Alacati Transfer Guide" },
        short: { tr: "İzmir Havalimanı'ndan Çeşme'ye ulaşımın en konforlu yolu.", en: "The most comfortable way to reach Cesme from ADB." },
        content: {
            tr: `
          <h3>Çeşme'ye Nasıl Gidilir?</h3>
          <p>İzmir Adnan Menderes Havalimanı ile Çeşme arası yaklaşık 85 kilometredir. Özellikle yaz aylarında otobüs ve Havaş servislerinde uzun kuyruklar oluşabilmektedir. VIP transfer hizmetimizle bu mesafeyi yaklaşık 50-55 dakikada, hiç beklemeden ve konforla aşabilirsiniz.</p>
          <h3>Alaçatı'da Neler Yapılır?</h3>
          <p>Rüzgar sörfü ile ünlü Alaçatı, taş evleri ve dar sokaklarıyla büyüler. Akşam yemeği için önceden rezervasyon yaptırmanızı öneririz. Dönüş transferinizi de gelmeden planlayarak tatilinizi stressiz bitirebilirsiniz.</p>
        `,
            en: `
          <h3>How to get to Cesme?</h3>
          <p>The distance between Izmir Airport and Cesme is about 85 km. With our VIP transfer service, you can cover this distance in about 50-55 minutes.</p>
        `
        },
        image: "/cesme.jpg",
        date: "Haziran 2024"
    },
    {
        id: 2,
        title: { tr: "Efes Antik Kenti Turu", en: "Ephesus Ancient City Tour" },
        short: { tr: "Tarihin kalbine yolculuk. Efes ve Meryem Ana evi.", en: "Journey to history. Ephesus and House of Virgin Mary." },
        content: {
            tr: `
          <h3>Tarihe Yolculuk</h3>
          <p>Dünyanın en büyük açık hava müzelerinden biri olan Efes, İzmir merkeze yaklaşık 1 saat uzaklıktadır. Celsus Kütüphanesi ve Büyük Tiyatro mutlaka görülmelidir.</p>
          <h3>Özel Şoförlü Tur Avantajı</h3>
          <p>Efes turunda araçlarımız sizi bir kapıdan bırakıp diğer kapıdan alır. Böylece sıcakta geri yürümek zorunda kalmazsınız. Eşyalarınızı araçta güvenle bırakabilirsiniz.</p>
        `,
            en: `<h3>Journey to History</h3><p>Ephesus is one of the largest open-air museums in the world.</p>`
        },
        image: "/efes.jpg",
        date: "Mayıs 2024"
    },
    {
        id: 3,
        title: { tr: "Havalimanı Karşılama Hizmeti", en: "Airport Meet & Greet" },
        short: { tr: "Uçağınız indiği an isminizle karşılanın.", en: "Be greeted with your name as soon as you land." },
        content: {
            tr: `
          <h3>VIP Karşılama Nedir?</h3>
          <p>Uçağınız indiğinde şoförümüz sizi gelen yolcu çıkış kapısında (Vodafone standı önü) isminizin yazılı olduğu bir tabela ile bekler.</p>
          <p>Bagajlarınıza yardımcı olur ve sizi otoparkta bekleyen aracımıza kadar eşlik eder. Uçağınız rötar yapsa bile sistemden takip ettiğimiz için sizi beklemeye devam ederiz.</p>
        `,
            en: `<h3>What is VIP Greeting?</h3><p>Our driver waits for you at the arrival gate with a sign bearing your name.</p>`
        },
        image: "/adb-transfer.jpg",
        date: "Nisan 2024"
    }
];

export const DAILY_TOURS = [
    {
        name: { tr: "Tam Gün Çeşme & Alaçatı", en: "Full Day Cesme & Alacati" },
        time: { tr: "8 Saat", en: "8 Hours" },
        price: 250,
        desc: { tr: "Plajlar, Alaçatı sokakları ve akşam yemeği transferi dahil.", en: "Includes beaches, Alacati streets and dinner transfer." },
        img: "/cesme.jpg"
    },
    {
        name: { tr: "Efes & Meryem Ana Tarih Turu", en: "Ephesus & Virgin Mary Tour" },
        time: { tr: "6 Saat", en: "6 Hours" },
        price: 200,
        desc: { tr: "Özel şoförle tarih turu. Sizi kapıda bekler, dilediğinizde hareket eder.", en: "Historical tour with private chauffeur. Waits for you at the gate." },
        img: "/efes.jpg"
    },
    {
        name: { tr: "İzmir Şehir & Shopping Turu", en: "Izmir City & Shopping Tour" },
        time: { tr: "5 Saat", en: "5 Hours" },
        price: 180,
        desc: { tr: "AVM'ler, Kordon ve Kemeraltı. Alışveriş poşetlerinizi taşıma derdi yok.", en: "Malls, Kordon and Kemeralti. No hassle carrying shopping bags." },
        img: "/sehir-merkezi.jpg"
    },
    {
        name: { tr: "Kişiye Özel Şoför Tahsis", en: "Private Chauffeur Hire" },
        time: { tr: "10 Saat / 100km", en: "10 Hours / 100km" },
        price: 'ASK',
        desc: { tr: "Kendi rotanızı oluşturun. Şoförümüz tüm gün emrinizde olsun. İstediğiniz yere gidin.", en: "Create your own route. Our chauffeur is at your disposal all day. Go wherever you want." },
        img: "/vito-exterior.webp"
    },
];
