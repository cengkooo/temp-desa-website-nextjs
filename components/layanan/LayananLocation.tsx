import { MapPin } from "lucide-react"

interface LayananLocationProps {
  location: string
  mapEmbedUrl?: string
}

export default function LayananLocation({
  location,
  mapEmbedUrl
}: LayananLocationProps) {
  return (
    <>
      <div className="flex items-center gap-2 text-slate-600">
        <MapPin className="w-4 h-4 text-blue-600" />
        <span>{location}</span>
      </div>
      <div className="mt-4 h-72 bg-slate-100 rounded-xl overflow-hidden">
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
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            Peta akan ditampilkan di sini
          </div>
        )}
      </div>
    </>
  )
}
