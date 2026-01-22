"use client"

import { MapPin, Clock, Phone, Mail } from "lucide-react"

interface WisataSidebarProps {
  location: string
  operationalHours: string
  contact: string
  ticketPrice: string
  ticketMotor: string
  ticketMobile: string
  whatsappNumber: string
  email: string
  mapEmbedUrl?: string
}

export default function WisataSidebar({
  location,
  operationalHours,
  contact,
  ticketPrice,
  ticketMotor,
  ticketMobile,
  email,
  whatsappNumber,
  mapEmbedUrl
}: WisataSidebarProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Halo, saya ingin bertanya tentang wisata ini")
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Informasi Wisata */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="font-bold text-slate-900 mb-4">Informasi Wisata</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 text-sm mb-1">Lokasi</p>
              <p className="text-sm text-slate-600">{location}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 text-sm mb-1">Jam Operasional</p>
              <p className="text-sm text-slate-600">{operationalHours}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 text-sm mb-1">Kontak</p>
              <p className="text-sm text-slate-600">{contact}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 text-sm mb-1">Email</p>
              <p className="text-sm text-slate-600">{email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tiket Masuk */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
  <h3 className="font-bold text-slate-900 mb-4">Tiket Masuk</h3>

  <div className="space-y-4 mb-6">
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-slate-800">Tiket Orang</p>
        <p className="text-sm text-slate-500">per orang</p>
      </div>
      <p className="text-xl font-bold text-blue-600">{ticketPrice}</p>
    </div>

    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-slate-800">Tiket Motor</p>
        <p className="text-sm text-slate-500">per motor</p>
      </div>
      <p className="text-xl font-bold text-blue-600">{ticketMotor}</p>
    </div>

    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-slate-800">Tiket Mobil</p>
        <p className="text-sm text-slate-500">per mobil</p>
      </div>
      <p className="text-xl font-bold text-blue-600">{ticketMobile}</p>
    </div>
  </div>

  <button
    onClick={handleWhatsAppClick}
    className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
  >
    Hubungi via WhatsApp
  </button>
</div>


      {/* Lokasi Map */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="font-bold text-slate-900 mb-4">Lokasi</h3>
        <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden">
          {mapEmbedUrl ? (
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Peta akan ditampilkan di sini</p>
              </div>
            </div>
          )}
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Lihat di Google Maps →
        </a>
      </div>
    </div>
  )
}
