import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Store, Package, TrendingUp } from 'lucide-react'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch statistics from Supabase
  const { data: products, error } = await supabase
    .from('umkm_products')
    .select('rating, name')
    .eq('is_active', true)

  // Calculate statistics
  const totalProducts = products?.length || 0
  
  // Count unique UMKM (assuming each unique product name is a different UMKM)
  const uniqueUmkm = products 
    ? new Set(products.map(p => p.name.split(' ')[0])).size 
    : 0
  
  // Calculate average rating
  const avgRating = products && products.length > 0
    ? (products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1)
    : '0.0'

  if (error) {
    console.error('Error fetching dashboard stats:', error)
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">
          Welcome back, <span className="font-semibold">{user?.email}</span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Produk</p>
              <p className="text-4xl font-bold mt-2">{totalProducts}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Package className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total UMKM</p>
              <p className="text-4xl font-bold mt-2">{uniqueUmkm}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Store className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Rata-rata Rating</p>
              <p className="text-4xl font-bold mt-2">{avgRating}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/umkm"
            className="group p-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 group-hover:bg-blue-500 p-3 rounded-lg transition-colors">
                <Store className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Kelola UMKM
                </h3>
                <p className="text-sm text-slate-600 mt-1">Tambah & edit produk UMKM</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/umkm"
            className="group p-6 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 group-hover:bg-green-500 p-3 rounded-lg transition-colors">
                <Package className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                  Lihat Produk
                </h3>
                <p className="text-sm text-slate-600 mt-1">Lihat semua produk UMKM</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
