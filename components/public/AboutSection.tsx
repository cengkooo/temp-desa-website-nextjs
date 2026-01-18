import Image from "next/image"
import { MapPin, Users, Home as HomeIcon, Sparkles } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Alam yang Asri",
    description: "Dikelilingi pegunungan dan persawahan hijau yang menenangkan",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: Users,
    title: "Masyarakat Ramah",
    description: "Penduduk lokal yang hangat menyambut setiap pengunjung",
    bgColor: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    icon: HomeIcon,
    title: "Budaya Autentik",
    description: "Tradisi dan adat istiadat yang masih terjaga dengan baik",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: Sparkles,
    title: "Pengalaman Unik",
    description: "Aktivitas wisata yang tak terlupakan untuk semua usia",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600"
  }
]

export default function AboutSection() {
  return (
    <section id="tentang" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/p2.png"
                alt="Tentang Desa"
                fill
                className="object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute bottom-8 right-8 bg-blue-600 text-white px-6 py-4 rounded-xl shadow-lg">
              <div className="text-4xl font-bold">25+</div>
              <div className="text-sm">Tahun Melayani</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-blue-600 font-semibold mb-4 block">TENTANG KAMI</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Desa yang Kaya akan Keindahan dan Budaya
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Desa Wisata kami terletak di dataran tinggi yang dikelilingi oleh pemandangan alam yang memukau. Dengan sejarah panjang dan budaya yang kental, desa ini menjadi destinasi sempurna untuk melepas diri dari hiruk pikuk kota. Kami menawarkan pengalaman wisata autentik yang menggabungkan keindahan alam, kekayaan budaya, dan keramahan masyarakat lokal.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
