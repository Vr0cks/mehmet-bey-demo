/* 
   ⚙️ AYARLAR VE VERİ DOSYASI
   Buradaki bilgileri değiştirerek sitedeki içerikleri güncelleyebilirsiniz.
   Kod bilmenize gerek yoktur, sadece tırnak işaretlerine dikkat edin.
*/

/* 📞 İletişim & Bildirim Ayarları */
export const WHATSAPP_NUMBER = '905462961848';

/* 📧 Google Apps Script Webhook URL (Rezervasyonların gideceği yer) */
export const WEBHOOK_URL = ''; // Buraya Google Script'ten aldığınız URL'i yapıştırın

/* 📍 Rota Hesaplama Hızı (Dakika/Km) */
export const ROUTE_SPEED = 1.1;

/* 🗺️ Transfer Noktaları ve Mesafeler (Adnan Menderes Havalimanı '0' kabul edilir) */
export const LOCATIONS = [
    { id: 'adb', name: { tr: 'Adnan Menderes Havalimanı', en: 'Adnan Menderes Airport' }, km: 0 },
    { id: 'alsancak', name: { tr: 'Alsancak', en: 'Alsancak' }, km: 18 },
    { id: 'karsiyaka', name: { tr: 'Karşıyaka', en: 'Karsiyaka' }, km: 25 },
    { id: 'cesme', name: { tr: 'Çeşme', en: 'Cesme' }, km: 85 },
    { id: 'kusadasi', name: { tr: 'Kuşadası', en: 'Kusadasi' }, km: 95 },
    { id: 'selcuk', name: { tr: 'Selçuk / Efes', en: 'Selcuk / Ephesus' }, km: 60 },
    { id: 'alacati', name: { tr: 'Alaçatı', en: 'Alacati' }, km: 80 },
    { id: 'konak', name: { tr: 'Konak', en: 'Konak' }, km: 20 },
    { id: 'bornova', name: { tr: 'Bornova', en: 'Bornova' }, km: 22 },
    { id: 'buca', name: { tr: 'Buca', en: 'Buca' }, km: 15 },
    // Yeni bir yer eklemek için yukarıdaki satırı kopyalayıp buraya yapıştırın
];

/* 🚗 Araç Filosu
   - image: Dış fotoğraf (public klasöründe olmalı)
   - interiorImage: İç fotoğraf (public klasöründe olmalı)
   - basePrice: Açılış ücreti (€)
   - perKm: Kilometre başına ücret (€)
*/
export const VEHICLES = [
    {
        id: 'vito',
        name: 'Mercedes Vito VIP',
        capacity: 6,
        basePrice: 75,
        perKm: 1.8,
        image: '/vito dış.webp',
        interiorImage: '/vito.jpg',
        specs: {
            tr: ['Deri Koltuk', 'Ücretsiz WiFi', 'Klima', 'USB Şarj'],
            en: ['Leather Seats', 'Free WiFi', 'AC', 'USB Charging']
        },
    },
    {
        id: 'sprinter',
        name: 'Mercedes Sprinter VIP',
        capacity: 12,
        basePrice: 120,
        perKm: 2.4,
        image: '/sprinter dış.jpg',
        interiorImage: '/sprinter.jpg',
        specs: {
            tr: ['Grup Transferi', 'Geniş Bagaj', 'Klima', 'Ücretsiz WiFi'],
            en: ['Group Transfer', 'Large Luggage', 'AC', 'Free WiFi']
        },
    },
    {
        id: 'sedan',
        name: 'Mercedes E-Class',
        capacity: 3,
        basePrice: 60,
        perKm: 2.0,
        image: '/e class dış.jpg',
        interiorImage: '/assets/eclass.avif',
        specs: {
            tr: ['Lüks Sedan', 'Deri İç Mekan', 'Klima', 'Özel Şoför'],
            en: ['Luxury Sedan', 'Leather Interior', 'AC', 'Private Chauffeur']
        },
    },
];

/* ⭐ Müşteri Yorumları */
export const REVIEWS = [
    {
        name: 'Ahmet Yılmaz',
        text: {
            tr: 'Havalimanından otele transfer sürecinde harika bir deneyim yaşadık. Araç tertemiz, şoför çok kibar ve profesyoneldi.',
            en: 'We had an amazing experience with the airport-to-hotel transfer. The vehicle was spotless, and the driver was very kind and professional.'
        }
    },
    {
        name: 'Elif Demir',
        text: {
            tr: 'Çeşme tatilimiz için transfer hizmeti aldık. Zamanında geldiler, çok konforlu bir yolculuktu. Fiyatlar da gayet makul.',
            en: "We used the transfer service for our Cesme vacation. They arrived on time, and it was a very comfortable ride. Prices are reasonable."
        }
    },
    {
        name: 'Mehmet Kaya',
        text: {
            tr: 'İş seyahatlerimde düzenli olarak kullanıyorum. Kurumsal hizmet anlayışları gerçekten üst düzey.',
            en: "I regularly use their service for business trips. Their corporate service approach is truly top-notch."
        }
    },
];
