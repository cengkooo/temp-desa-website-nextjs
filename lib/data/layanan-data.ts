export type LayananCategoryKey =
  | "penginapan"

export const layananCategoryMeta: Record<
  LayananCategoryKey,
  { label: string; relatedTitle: string }
> = {
  "penginapan": {
    label: "Penginapan",
    relatedTitle: "Penginapan Lainnya"
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
  location: string
  mapEmbedUrl?: string
  whatsappNumber: string
  contactNumber: string
  features: string[]
}

const defaultMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63512.74043759416!2d105.61624610037542!3d-5.7782175162480085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e410c395e3394db%3A0xb326936886be8154!2sWay%20Kalam%2C%20Penengahan%2C%20South%20Lampung%20Regency%2C%20Lampung!5e0!3m2!1sen!2sid!4v1768900078110!5m2!1sen!2sid"

export const layananData: LayananData[] = [
  {
    slug: "homestay-sawah-indah",
    title: "Homestay Bu Isah",
    category: "penginapan",
    shortDescription: "Penginapan nyaman dengan lokasi strategis dekat air terjun",
    description:
      "Homestay Desa Wisata Way Kalam Syariah adalah pilihan akomodasi hemat dengan fasilitas standar yang memberikan pengalaman terbaik. Terletak di jantung Desa Way Kalam, Kabupaten Lampung, homestay ini menawarkan akses mudah ke berbagai destinasi wisata utama. Sejak dibuka pada 31 Maret 2022, Homestay Desa Wisata Way Kalam Syariah telah menjadi tempat yang memanjakan tamu dengan kenyamanan dan layanan prima. Kini, Anda dapat melakukan pemesanan kamar secara online melalui aplikasi OYO, Traveloka, atau Agoda dengan kata kunci \"Way Kalam\",",
    image: "/uploaded_image_0_1768037972713.png",
    price: "Rp 100.000",
    priceUnit: "per malam",

    location: "Desa Way Kalam, Kaki Gunung Rajabasa, Lampung Selatan",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567891",
    contactNumber: "+62 812 3456 7891",
    features: [
      "Kamar Bersih dan Nyaman",
      "Kamar Mandi dengan Air Mengalir",
      "Area Komunal/Teras untuk Bersantai",
      "Gazebo",
      "Parkir Aman",
      "Sarapan Pagi",
      "Tour Guide"
    ]
  },
  {
    slug: "vila-pegunungan",
    title: "Homestay Pak Suri",
    category: "penginapan",
    shortDescription: "Pengianapan nyaman dengan lokasi tenang di desa",
    description:
      "Homestay Desa Wisata Way Kalam Syariah adalah pilihan akomodasi hemat dengan fasilitas standar yang memberikan pengalaman terbaik. Terletak di jantung Desa Way Kalam, Kabupaten Lampung, homestay ini menawarkan akses mudah ke berbagai destinasi wisata utama. Sejak dibuka pada 31 Maret 2022, Homestay Desa Wisata Way Kalam Syariah telah menjadi tempat yang memanjakan tamu dengan kenyamanan dan layanan prima. Kini, Anda dapat melakukan pemesanan kamar secara online melalui aplikasi OYO, Traveloka, atau Agoda dengan kata kunci \"Way Kalam\".",
    image: "/uploaded_image_2_1768037972713.png",
    price: "Rp 100.000",
    priceUnit: "per malam",
    location: "Desa Way Kalam, Kaki Gunung Rajabasa, Lampung Selatan",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567892",
    contactNumber: "+62 812 3456 7892",
    features: [
      "Kamar Mandi Bersama",
      "Televisi",
      "Sarapan Pagi",
      "Kipas Angin",
      "Wifi Area",
      "Televisi"
    ]
  },
  {
    slug: "camping-ground-alam",
    title: "Homestay Bu Srie",
    category: "penginapan",
    shortDescription: "Penginapan asri dengan lokasi tenang di desa",
    description:
      "Homestay Desa Wisata Way Kalam Syariah adalah pilihan akomodasi hemat dengan fasilitas standar yang memberikan pengalaman terbaik. Terletak di jantung Desa Way Kalam, Kabupaten Lampung, homestay ini menawarkan akses mudah ke berbagai destinasi wisata utama. Sejak dibuka pada 31 Maret 2022, Homestay Desa Wisata Way Kalam Syariah telah menjadi tempat yang memanjakan tamu dengan kenyamanan dan layanan prima. Kini, Anda dapat melakukan pemesanan kamar secara online melalui aplikasi OYO, Traveloka, atau Agoda dengan kata kunci \"Way Kalam\".",
    image: "/uploaded_image_3_1768037972713.png",
    price: "Rp 100.000",
    priceUnit: "per malam",
    location: "Desa Way Kalam, Kaki Gunung Rajabasa, Lampung Selatan",
    mapEmbedUrl: defaultMapEmbedUrl,
    whatsappNumber: "6281234567893",
    contactNumber: "+62 812 3456 7893",
    features: [
      "Kamar Mandi Bersama",
      "Televisi",
      "Sarapan Pagi",
      "Kipas Angin",
      "Wifi Area",
      "Televisi"
    ]
  },
]

export function getLayananBySlug(slug: string): LayananData | null {
  return layananData.find((item) => item.slug === slug) || null
}

export function getLayananByCategory(category: LayananCategoryKey): LayananData[] {
  return layananData.filter((item) => item.category === category)
}
