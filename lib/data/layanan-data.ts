export type LayananCategoryKey =
  | "penginapan"
  | "tour-guide"
  | "rental"
  | "wisata-lainnya"

export const layananCategoryMeta: Record<
  LayananCategoryKey,
  { label: string; relatedTitle: string }
> = {
  "penginapan": {
    label: "Penginapan",
    relatedTitle: "Penginapan Lainnya"
  },
  "tour-guide": {
    label: "Tour Guide",
    relatedTitle: "Tour Guide Lainnya"
  },
  "rental": {
    label: "Rental Mobil & Motor",
    relatedTitle: "Rental Lainnya"
  },
  "wisata-lainnya": {
    label: "Wisata Lainnya",
    relatedTitle: "Wisata Lainnya"
  }
}

export interface LayananData {
  slug: string
  title: string
  category: LayananCategoryKey
  shortDescription: string
  description: string
  image: string
  price: string
  priceUnit?: string
  rating: number
  reviewCount: number
  location: string
  mapEmbedUrl?: string
  whatsappNumber: string
  contactNumber: string
  features: string[]
}

const defaultMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1751171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonas!5e0!3m2!1sen!2sid!4v1234567890"

export const layananData: LayananData[] = [
  {
    slug: "homestay-sawah-indah",
    title: "Homestay Sawah Indah",
    category: "penginapan",
    shortDescription: "Penginapan nyaman dengan pemandangan sawah",
    description:
      "Homestay Sawah Indah menawarkan pengalaman menginap yang unik dengan pemandangan hamparan sawah. Dilengkapi fasilitas modern namun tetap mempertahankan nuansa tradisional desa.\n\nCocok untuk keluarga atau rombongan kecil yang ingin merasakan kehidupan pedesaan dengan suasana tenang dan udara segar.",
    image: "/uploaded_image_0_1768037972713.png",
    price: "Rp 250.000",
    priceUnit: "per malam",
    rating: 4.8,
    reviewCount: 124,
    location: "Dusun Sekar RT 01/RW 02, Desa Sukamaju",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567891",
    contactNumber: "+62 812 3456 7891",
    features: [
      "AC",
      "WiFi Gratis",
      "Kamar Mandi Dalam",
      "Parkir Gratis",
      "Sarapan",
      "Pemandangan Sawah"
    ]
  },
  {
    slug: "vila-pegunungan",
    title: "Vila Pegunungan",
    category: "penginapan",
    shortDescription: "Vila mewah di atas bukit dengan view spektakuler",
    description:
      "Vila Pegunungan menghadirkan suasana privat dengan panorama perbukitan. Cocok untuk pasangan atau keluarga yang ingin menikmati udara sejuk dan matahari terbit dari balkon vila.",
    image: "/uploaded_image_2_1768037972713.png",
    price: "Rp 750.000",
    priceUnit: "per malam",
    rating: 4.9,
    reviewCount: 76,
    location: "Bukit Harapan, Desa Sukamaju",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567892",
    contactNumber: "+62 812 3456 7892",
    features: [
      "Kamar Deluxe",
      "Balkon Panorama",
      "Sarapan",
      "Kamar Mandi Dalam",
      "WiFi Cepat",
      "Parkir Luas"
    ]
  },
  {
    slug: "camping-ground-alam",
    title: "Camping Ground Alam",
    category: "penginapan",
    shortDescription: "Area camping dengan fasilitas lengkap",
    description:
      "Camping Ground Alam menyediakan area perkemahan yang aman dan nyaman. Nikmati pengalaman outdoor dengan fasilitas lengkap seperti toilet, area api unggun, dan titik listrik.",
    image: "/uploaded_image_3_1768037972713.png",
    price: "Rp 50.000",
    priceUnit: "per tenda",
    rating: 4.6,
    reviewCount: 89,
    location: "Lembah Hijau, Desa Sukamaju",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567893",
    contactNumber: "+62 812 3456 7893",
    features: [
      "Area Api Unggun",
      "Toilet Bersih",
      "Air Bersih",
      "Listrik",
      "Area Parkir",
      "Pemandangan Alam"
    ]
  },
  {
    slug: "pak-slamet-pemandu-wisata",
    title: "Pak Slamet - Pemandu Wisata",
    category: "tour-guide",
    shortDescription: "Pemandu berpengalaman 15 tahun",
    description:
      "Pak Slamet adalah pemandu wisata berpengalaman dengan spesialisasi wisata alam dan budaya. Ia dikenal ramah, detail, dan mampu menyesuaikan rute sesuai kebutuhan rombongan.",
    image: "/uploaded_image_1_1768037972713.png",
    price: "Rp 150.000",
    priceUnit: "per hari",
    rating: 5,
    reviewCount: 210,
    location: "Pos Informasi Wisata, Desa Sukamaju",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567894",
    contactNumber: "+62 812 3456 7894",
    features: [
      "Trekking Alam",
      "Tur Budaya",
      "Pemandu Lokal",
      "Bahasa Indonesia",
      "Rute Fleksibel",
      "Dokumentasi Foto"
    ]
  },
  {
    slug: "bu-yanti-guide-kuliner",
    title: "Bu Yanti - Guide Kuliner",
    category: "tour-guide",
    shortDescription: "Spesialis tur kuliner dan budaya",
    description:
      "Bu Yanti mengajak wisatawan mengenal kuliner khas desa sekaligus cerita budaya setempat. Cocok untuk wisata keluarga atau kelompok yang ingin pengalaman rasa yang autentik.",
    image: "/uploaded_image_4_1768037972713.png",
    price: "Rp 100.000",
    priceUnit: "per hari",
    rating: 4.9,
    reviewCount: 156,
    location: "Pasar Desa Sukamaju",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567895",
    contactNumber: "+62 812 3456 7895",
    features: [
      "Tur Kuliner",
      "Cerita Budaya",
      "Rekomendasi Menu",
      "Bahasa Indonesia",
      "Jadwal Fleksibel",
      "Cocok Keluarga"
    ]
  },
  {
    slug: "rental-motor-jaya",
    title: "Rental Motor Jaya",
    category: "rental",
    shortDescription: "Sewa motor harian kondisi prima",
    description:
      "Rental Motor Jaya menyediakan motor harian dengan kondisi terawat. Tersedia berbagai pilihan motor matik yang nyaman untuk berkeliling desa dan area sekitar.",
    image: "/uploaded_image_1768034786191.png",
    price: "Rp 75.000",
    priceUnit: "per hari",
    rating: 4.7,
    reviewCount: 98,
    location: "Jalan Raya Sukamaju No. 12",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567896",
    contactNumber: "+62 812 3456 7896",
    features: [
      "Motor Matik",
      "Helm Gratis",
      "Bensin Cukup",
      "Pemesanan Cepat",
      "Harga Terjangkau",
      "Asuransi Ringan"
    ]
  },
  {
    slug: "rental-mobil-berkah",
    title: "Rental Mobil Berkah",
    category: "rental",
    shortDescription: "Sewa mobil + driver berpengalaman",
    description:
      "Rental Mobil Berkah menawarkan layanan sewa mobil dengan driver berpengalaman. Cocok untuk keluarga atau rombongan yang ingin perjalanan nyaman dan aman.",
    image: "/uploaded_image_2_1768037972713.png",
    price: "Rp 400.000",
    priceUnit: "per hari",
    rating: 4.8,
    reviewCount: 64,
    location: "Terminal Desa Sukamaju",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567897",
    contactNumber: "+62 812 3456 7897",
    features: [
      "Mobil Keluarga",
      "Driver Berpengalaman",
      "AC Nyaman",
      "Rute Fleksibel",
      "BBM Termasuk",
      "Bersih & Terawat"
    ]
  },
  {
    slug: "curug-biru",
    title: "Curug Biru",
    category: "wisata-lainnya",
    shortDescription: "Air terjun dengan kolam biru alami",
    description:
      "Curug Biru terkenal dengan kolam berwarna biru alami yang segar. Jalur trekkingnya ringan sehingga cocok untuk semua usia dan memberikan pengalaman yang menyenangkan.",
    image: "/uploaded_image_4_1768037972713.png",
    price: "Rp 10.000",
    priceUnit: "per orang",
    rating: 4.7,
    reviewCount: 142,
    location: "Dusun Sumber, Desa Sukamaju",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567898",
    contactNumber: "+62 812 3456 7898",
    features: [
      "Kolam Alami",
      "Spot Foto",
      "Trekking Ringan",
      "Area Istirahat",
      "Warung Lokal",
      "Petunjuk Jalur"
    ]
  },
  {
    slug: "bukit-sunrise",
    title: "Bukit Sunrise",
    category: "wisata-lainnya",
    shortDescription: "Spot terbaik melihat sunrise dan lautan awan",
    description:
      "Bukit Sunrise adalah lokasi favorit untuk menikmati matahari terbit dan lautan awan. Waktu terbaik berkunjung adalah subuh dengan akses kendaraan yang mudah.",
    image: "/uploaded_image_1_1768037972713.png",
    price: "Rp 5.000",
    priceUnit: "per orang",
    rating: 4.9,
    reviewCount: 201,
    location: "Puncak Harapan, Desa Sukamaju",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567899",
    contactNumber: "+62 812 3456 7899",
    features: [
      "Spot Sunrise",
      "Lautan Awan",
      "Area Foto",
      "Akses Kendaraan",
      "Warung Kopi",
      "Area Parkir"
    ]
  },
  {
    slug: "desa-budaya-tradisional",
    title: "Desa Budaya Tradisional",
    category: "wisata-lainnya",
    shortDescription: "Pengalaman budaya dan tradisi lokal",
    description:
      "Desa Budaya Tradisional menghadirkan pertunjukan seni, kerajinan, dan kuliner khas. Cocok untuk wisata edukasi dan pengalaman budaya lokal yang autentik.",
    image: "/uploaded_image_3_1768037972713.png",
    price: "Rp 25.000",
    priceUnit: "per orang",
    rating: 4.8,
    reviewCount: 167,
    location: "Balai Adat, Desa Sukamaju",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567800",
    contactNumber: "+62 812 3456 7800",
    features: [
      "Pertunjukan Seni",
      "Workshop Kerajinan",
      "Kuliner Tradisional",
      "Pemandu Lokal",
      "Area Foto",
      "Toko Cendera Mata"
    ]
  }
]

export function getLayananBySlug(slug: string): LayananData | null {
  return layananData.find((item) => item.slug === slug) || null
}

export function getLayananByCategory(category: LayananCategoryKey): LayananData[] {
  return layananData.filter((item) => item.category === category)
}
