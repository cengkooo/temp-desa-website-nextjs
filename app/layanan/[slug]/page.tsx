import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Car,
  CheckCircle2,
  Home,
  LucideIcon,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Users
} from "lucide-react"
import Footer from "@/components/public/Footer"
import Navbar from "@/components/public/Navbar"
import {
  getLayananByCategory,
  getLayananBySlug,
  layananCategoryMeta,
  LayananCategoryKey
} from "@/lib/data/layanan-data"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

const categoryIconMap: Record<LayananCategoryKey, LucideIcon> = {
  "penginapan": Home,
  "tour-guide": Users,
  "rental": Car,
  "wisata-lainnya": MapPin
}

export default async function LayananDetailPage({ params }: PageProps) {
  const { slug } = await params
  const layanan = getLayananBySlug(slug)

  if (!layanan) {
    notFound()
  }

  const categoryMeta = layananCategoryMeta[layanan.category]
  const CategoryIcon = categoryIconMap[layanan.category]
  const relatedItems = getLayananByCategory(layanan.category).filter(
    (item) => item.slug !== layanan.slug
  )
  const whatsappMessage = encodeURIComponent(
    `Halo, saya tertarik dengan ${layanan.title}`
  )
  const whatsappLink = `https://wa.me/${layanan.whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="pt-24 pb-10 bg-gradient-to-b from-slate-100 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/wisata"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Wisata
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
              <CategoryIcon className="w-4 h-4" />
              {categoryMeta.label}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {layanan.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-slate-800">
                {layanan.rating.toFixed(1)}
              </span>
              <span>({layanan.reviewCount} ulasan)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{layanan.location}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-80 md:h-[420px] bg-slate-200 rounded-2xl overflow-hidden">
              <Image
                src={layanan.image}
                alt={layanan.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Deskripsi
              </h2>
              <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {layanan.description}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fasilitas & Fitur
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {layanan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-slate-700">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Lokasi
              </h2>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{layanan.location}</span>
              </div>
              <div className="mt-4 h-72 bg-slate-100 rounded-xl overflow-hidden">
                {layanan.mapEmbedUrl ? (
                  <iframe
                    src={layanan.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    Peta akan ditampilkan di sini
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <p className="text-sm text-slate-500">Mulai dari</p>
                <p className="text-3xl font-bold text-blue-600">
                  {layanan.price}
                </p>
                {layanan.priceUnit ? (
                  <p className="text-sm text-slate-500">/ {layanan.priceUnit}</p>
                ) : null}

                <div className="mt-4 bg-slate-100 rounded-lg px-4 py-3 flex items-center gap-2 text-slate-700">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">
                    {layanan.rating.toFixed(1)}
                  </span>
                  <span className="text-slate-500">- {layanan.reviewCount} ulasan</span>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Hubungi via WhatsApp
                </a>

                <div className="mt-4 flex items-center gap-2 text-slate-600 text-sm">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>{layanan.contactNumber}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedItems.length > 0 ? (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {categoryMeta.relatedTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/layanan/${item.slug}`}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CategoryIcon className="w-5 h-5 text-blue-600" />
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.shortDescription}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-bold text-blue-600">{item.price}</p>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const layanan = getLayananBySlug(slug)

  if (!layanan) {
    return {
      title: "Layanan Tidak Ditemukan"
    }
  }

  return {
    title: `${layanan.title} - Desa Wisata`,
    description: layanan.shortDescription
  }
}
