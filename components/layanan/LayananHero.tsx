import Link from "next/link"
import { ArrowLeft, MapPin, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface LayananHeroProps {
  backHref?: string
  backLabel?: string
  categoryLabel: string
  CategoryIcon: LucideIcon
  title: string
  rating: number
  reviewCount: number
  location: string
}

export default function LayananHero({
  backHref = "/wisata",
  backLabel = "Kembali ke Wisata",
  categoryLabel,
  CategoryIcon,
  title,
  rating,
  reviewCount,
  location
}: LayananHeroProps) {
  return (
    <section className="pt-24 pb-10 bg-gradient-to-b from-slate-100 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
            <CategoryIcon className="w-4 h-4" />
            {categoryLabel}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-slate-600">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-slate-800">
              {rating.toFixed(1)}
            </span>
            <span>({reviewCount} ulasan)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
