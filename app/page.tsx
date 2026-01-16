import Navbar from "@/components/public/Navbar"
import HeroSection from "@/components/public/HeroSection"
import AboutSection from "@/components/public/AboutSection"
import HistorySection from "@/components/public/HistorySection"
import LocationSection from "@/components/public/LocationSection"
import TravelGuideSection from "@/components/public/TravelGuideSection"
import FAQSection from "@/components/public/FAQSection"
import GallerySection from "@/components/public/GallerySection"
import Footer from "@/components/public/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HistorySection />
      <GallerySection />
      <LocationSection />
      <TravelGuideSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
