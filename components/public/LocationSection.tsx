"use client"

import { MapPin, Navigation, Store } from "lucide-react"
import { useState } from "react"

const filterOptions = [
  { id: "wisata", label: "Wisata", icon: MapPin, color: "blue" }
]

export default function LocationSection() {
  const [activeFilter, setActiveFilter] = useState("wisata")

  return (
    <section id="lokasi" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-4 block flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            PETA LOKASI
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Jelajahi Destinasi Kami
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Temukan lokasi wisata, penginapan, dan UMKM di desa kami melalui peta interaktif
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {filterOptions.map((option) => {
            const Icon = option.icon
            const isActive = activeFilter === option.id
            return (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  isActive
                    ? option.color === "blue"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : option.color === "green"
                      ? "bg-green-600 text-white shadow-lg shadow-green-200"
                      : "bg-orange-600 text-white shadow-lg shadow-orange-200"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {option.label}
              </button>
            )
          })}
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <div className="relative h-[500px] bg-slate-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18882.97805057842!2d105.6666235630672!3d-5.762382970833746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e410c395e3394db%3A0xb326936886be8154!2sWay%20Kalam%2C%20Penengahan%2C%20South%20Lampung%20Regency%2C%20Lampung!5e0!3m2!1sen!2sid!4v1768895617434!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
          
          {/* Map Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Way Kalam, Rajabasa, Lampung Selatan</span>
            </div>
            <a
              href="https://goo.gl/maps/your-location"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Buka di Google Maps
              <Navigation className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
