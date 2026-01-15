import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/uploaded_image_0_1768037972713.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-sm">👋</span>
          </div>
          <span className="text-blue-300 font-medium">SELAMAT DATANG</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Jelajahi Keindahan<br />
          <span className="text-blue-400">Desa Way Kalam Kami</span>
        </h1>
        
        <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
          Temukan pesona alam yang memukau, budaya yang kaya, dan produk lokal berkualitas dari UMKM desa kami.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link 
            href="#wisata"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
          >
            Jelajahi Wisata
          </Link>
          <Link 
            href="#umkm"
            className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg transition border border-white/30"
          >
            Lihat Produk UMKM
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-sm text-slate-300">SCROLL</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
