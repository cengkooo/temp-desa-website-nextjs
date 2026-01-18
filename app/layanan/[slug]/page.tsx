import { notFound } from "next/navigation"
import { Car, Home, LucideIcon, MapPin, Users } from "lucide-react"
import Footer from "@/components/public/Footer"
import Navbar from "@/components/public/Navbar"
import {
  LayananCoverImage,
  LayananFeatureList,
  LayananHero,
  LayananLocation,
  LayananRelatedList,
  LayananSectionCard,
  LayananSidebar
} from "@/components/layanan"
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <LayananHero
        categoryLabel={categoryMeta.label}
        CategoryIcon={CategoryIcon}
        title={layanan.title}
        rating={layanan.rating}
        reviewCount={layanan.reviewCount}
        location={layanan.location}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <LayananCoverImage src={layanan.image} alt={layanan.title} />

            <LayananSectionCard title="Deskripsi" titleClassName="mb-3">
              <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {layanan.description}
              </p>
            </LayananSectionCard>

            <LayananSectionCard title="Fasilitas & Fitur">
              <LayananFeatureList features={layanan.features} />
            </LayananSectionCard>

            <LayananSectionCard title="Lokasi" titleClassName="mb-3">
              <LayananLocation
                location={layanan.location}
                mapEmbedUrl={layanan.mapEmbedUrl}
              />
            </LayananSectionCard>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <LayananSidebar
                title={layanan.title}
                price={layanan.price}
                priceUnit={layanan.priceUnit}
                rating={layanan.rating}
                reviewCount={layanan.reviewCount}
                whatsappNumber={layanan.whatsappNumber}
                contactNumber={layanan.contactNumber}
              />
            </div>
          </aside>
        </div>
      </section>

      <LayananRelatedList
        title={categoryMeta.relatedTitle}
        CategoryIcon={CategoryIcon}
        items={relatedItems}
      />

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
