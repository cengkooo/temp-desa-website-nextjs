import { createClient } from "@/lib/supabase/server"
import { UmkmHero } from "@/components/umkm"
import UmkmClient from "@/components/umkm/UmkmClient"
import Footer from "@/components/public/Footer"
import { resolveUmkmImageUrl } from "@/lib/supabase/storage"

export const metadata = {
  title: "Produk UMKM Desa - Desa Wisata",
  description: "Temukan berbagai produk berkualitas dari pengrajin dan pengusaha lokal desa kami",
}

// Map database categories to display categories
const categoryMap: Record<string, string> = {
  "Makanan": "Makanan & Minuman",
  "Minuman": "Makanan & Minuman",
  "Kerajinan": "Kerajinan",
  "Lainnya": "Kerajinan"
}

export default async function UmkmPage() {
  const supabase = await createClient()
  
  // Fetch products from Supabase
  const { data: products, error } = await supabase
    .from('umkm_products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error.message || error)
  }

  // Transform products to match our interface
  const transformedProducts = (products || []).map((product) => ({
    id: String(product.id),
    name: product.name,
    description: product.description ?? '',
    price: Number(product.price),
    category: categoryMap[product.category] || product.category,
    rating: Number(product.rating ?? 0),
    image: resolveUmkmImageUrl(product.photo_url) || '',
    whatsapp: product.whatsapp,
    createdAt: new Date(product.created_at),
    updatedAt: new Date(product.updated_at),
  }))

  // Get unique categories from products
  const uniqueCategories = Array.from(
    new Set(transformedProducts.map(p => p.category))
  )
  const categories = ["Semua", ...uniqueCategories]

  return (
    <div className="min-h-screen bg-slate-50">
      <UmkmHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <UmkmClient 
          initialProducts={transformedProducts} 
          categories={categories}
        />
      </div>

      <Footer />
    </div>
  )
}
