import { getWisataBySlug } from "@/lib/data/wisata-data"
import { WisataHero, WisataInfo, WisataGallery, WisataFacilities, WisataRelatedInfo, WisataSidebar } from "@/components/wisata"
import Footer from "@/components/public/Footer"

export default function WisataPage() {
  // Langsung ambil data Air Terjun Pelangi
  const wisata = getWisataBySlug("air-terjun-pelangi")!

  return (
    <div className="min-h-screen bg-slate-50">
      <WisataHero
        title={wisata.title}
        subtitle={wisata.subtitle}
        backgroundImage={wisata.backgroundImage}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <WisataInfo description={wisata.description} />
            <WisataGallery images={wisata.gallery} />
            <WisataFacilities facilities={wisata.facilities} />
            <WisataRelatedInfo {...wisata.relatedInfo} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <WisataSidebar
                location={wisata.location}
                operationalHours={wisata.operationalHours}
                contact={wisata.contact}
                ticketPrice={wisata.ticketPrice}
                ticketMotor={wisata.ticketMotor}
                ticketMobile={wisata.ticketMobile}
                whatsappNumber={wisata.whatsappNumber}
                email={wisata.email}
                mapEmbedUrl={wisata.mapEmbedUrl}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Air Terjun Way Kalam - Desa Way Kalam",
  description: "Keajaiban alam tersembunyi di desa kami",
}
