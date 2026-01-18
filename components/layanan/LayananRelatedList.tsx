import Link from "next/link"
import { Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface RelatedItem {
  slug: string
  title: string
  shortDescription: string
  price: string
  rating: number
}

interface LayananRelatedListProps {
  title: string
  CategoryIcon: LucideIcon
  items: RelatedItem[]
}

export default function LayananRelatedList({
  title,
  CategoryIcon,
  items
}: LayananRelatedListProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/layanan/${item.slug}`}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CategoryIcon className="w-5 h-5 text-blue-600" />
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.shortDescription}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-bold text-blue-600">{item.price}</p>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
