import { Plane, Train, Bus, Car, Clock, MapPin } from "lucide-react"

const travelRoutes = [
  {
    city: "Jakarta",
    duration: "3 jalur rute",
    icon: Plane,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    routes: [
      {
        type: "Pesawat + Rental",
        icon: Plane,
        duration: "3-4 jam",
        description: "Bandara Soekarno-Hatta → Bandara Aril Soemardjan → Rental mobil ke desa (1 jam)"
      },
      {
        type: "Kereta Api",
        icon: Train,
        duration: "10-12 jam",
        description: "Stasiun Gambir → Stasiun Solo Balapan → Lanjut angkutan ke desa"
      },
      {
        type: "Bus",
        icon: Bus,
        duration: "10-12 jam",
        description: "Terminal Kampung Rambutan → Rajabasa → Angkutan ke desa"
      }
    ]
  },
  {
    city: "Surabaya",
    duration: "2 jalur rute",
    icon: Car,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    routes: [
      {
        type: "Kereta Api",
        icon: Train,
        duration: "4-5 jam",
        description: "Stasiun Gubeng → Stasiun Solo Balapan → Lanjut angkutan ke desa"
      },
      {
        type: "Bus",
        icon: Bus,
        duration: "5-6 jam",
        description: "Terminal Purabaya → Terminal Tirtonadi → Angkutan ke desa"
      }
    ]
  },
  {
    city: "Yogyakarta",
    duration: "2 jalur rute",
    icon: Bus,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    routes: [
      {
        type: "Bus / Travel",
        icon: Bus,
        duration: "2-3 jam",
        description: "Terminal Giwangan → Langsung ke lokasi desa wisata"
      },
      {
        type: "Rental Mobil",
        icon: Car,
        duration: "2 jam",
        description: "Sewa mobil langsung menuju desa melalui jalan raya Solo"
      }
    ]
  },
  {
    city: "Semarang",
    duration: "2 jalur rute",
    icon: Bus,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    routes: [
      {
        type: "Bus / Travel",
        icon: Bus,
        duration: "3-4 jam",
        description: "Terminal Terboyo → Terminal Tirtonadi → Angkutan ke desa"
      },
      {
        type: "Rental Mobil",
        icon: Car,
        duration: "2-3 jam",
        description: "Sewa mobil via tol Trans Jawa menuju desa"
      }
    ]
  }
]

const travelTips = [
  "Pesan tiket kereta/pesawat H-7 untuk harga terbaik",
  "Hubungi kami untuk layanan penjemputan dari stasiun/bandara",
  "Gunakan aplikasi travel untuk perbandingan harga",
  "Bawa jaket karena suhu desa cukup sejuk (18-25°C)"
]

export default function TravelGuideSection() {
  return (
    <section id="panduan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-4 block flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            PANDUAN TRANSPORTASI
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Cara Menuju Desa Kami
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Panduan lengkap transportasi dari berbagai kota besar menuju Desa Wisata kami
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {travelRoutes.map((route, index) => {
            const CityIcon = route.icon
            return (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                {/* City Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 ${route.iconBg} rounded-xl flex items-center justify-center`}>
                    <CityIcon className={`w-6 h-6 ${route.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Dari {route.city}</h3>
                    <p className="text-sm text-slate-600">{route.duration}</p>
                  </div>
                </div>

                {/* Routes */}
                <div className="space-y-4">
                  {route.routes.map((item, idx) => {
                    const RouteIcon = item.icon
                    return (
                      <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                            <RouteIcon className="w-5 h-5 text-slate-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900">{item.type}</h4>
                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock className="w-3 h-3" />
                              {item.duration}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Travel Tips */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">💡</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Tips Perjalanan</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {travelTips.map((tip, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-slate-700 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
