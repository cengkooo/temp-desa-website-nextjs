import { ArrowRight, LucideIcon, Star } from "lucide-react"

interface RelatedItem {
  title: string
  description: string
  price: string
  priceUnit?: string
  href: string
}

interface RelatedCategory {
  icon: LucideIcon
  title: string
  items: RelatedItem[]
}

interface WisataRelatedInfoProps {
  label: string
  title: string
  description?: string
  categories: RelatedCategory[]
}

export default function WisataRelatedInfo({
  label,
  title,
  description,
  categories
}: WisataRelatedInfoProps) {
  return (
    <section className="mb-12">
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 md:p-8">
        <div className="text-center mb-10">
          <span className="text-blue-600 font-semibold text-sm tracking-widest">{label}</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">{title}</h2>
          {description ? (
            <p className="text-lg text-slate-600 mt-3 max-w-2xl mx-auto">
              {description}
            </p>
          ) : null}
        </div>

        <div className="space-y-10">
          {categories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <div key={`${category.title}-${categoryIndex}`} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CategoryIcon className="w-5 h-5 text-blue-600" />
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={`${item.title}-${itemIndex}`}
                      className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3">
                          <span className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CategoryIcon className="w-5 h-5 text-blue-600" />
                          </span>
                          <div>
                            <p className="font-semibold text-slate-900">{item.title}</p>
                            <p className="text-sm text-slate-500">{item.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-blue-600">{item.price}</p>
                          {item.priceUnit ? (
                            <p className="text-xs text-slate-500">/ {item.priceUnit}</p>
                          ) : null}
                        </div>
                        <a
                          href={item.href}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
                        >
                          Lihat Detail
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
