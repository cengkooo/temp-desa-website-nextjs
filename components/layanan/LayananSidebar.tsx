import { MessageCircle, Phone, Star } from "lucide-react"

interface LayananSidebarProps {
  title: string
  price: string
  priceUnit?: string
  whatsappNumber: string
  contactNumber: string
}

export default function LayananSidebar({
  title,
  price,
  priceUnit,
  whatsappNumber,
  contactNumber
}: LayananSidebarProps) {
  const message = encodeURIComponent(`Halo, saya tertarik dengan ${title}`)
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <p className="text-sm text-slate-500">Mulai dari</p>
      <p className="text-3xl font-bold text-blue-600">{price}</p>
      {priceUnit ? <p className="text-sm text-slate-500">/ {priceUnit}</p> : null}


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
        <span>{contactNumber}</span>
      </div>
    </div>
  )
}
