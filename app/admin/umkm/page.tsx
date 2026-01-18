'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Plus, Search, Edit, Trash2, X, Upload, Star } from 'lucide-react'
import Image from 'next/image'
import { Product } from '@/lib/validations/umkm'
import { formatCurrency, formatWhatsApp } from '@/lib/utils/format'
import RatingInput from '@/components/admin/rating-input'
import { ToastProvider, useToast } from '@/lib/hooks/use-toast'
import { createClient } from '@/lib/supabase/client'
import { uploadUmkmImage, resolveUmkmImageUrl, MAX_IMAGE_SIZE } from '@/lib/supabase/storage'

type UmkmProductRow = {
  id: string
  name: string
  description: string
  category: 'Makanan' | 'Minuman' | 'Kerajinan' | 'Lainnya'
  price: number | string
  whatsapp: string
  rating: number | string | null
  photo_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

function UMKMContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  
  const { success, error } = useToast()
  const supabase = useMemo(() => createClient(), [])

  const fetchProducts = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from('umkm_products')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('Error fetching products:', fetchError)
      error('Gagal memuat produk')
    } else {
      const mapped: Product[] = ((data || []) as UmkmProductRow[]).map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        category: row.category,
        price: Number(row.price),
        whatsapp: row.whatsapp,
        rating: Number(row.rating ?? 0),
        image: resolveUmkmImageUrl(row.photo_url),
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      }))
      setProducts(mapped)
    }
  }, [error, supabase])

  // Fetch products from Supabase
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts()
  }, [fetchProducts])

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Makanan' as 'Makanan' | 'Minuman' | 'Kerajinan' | 'Lainnya',
    price: '',
    whatsapp: '',
    rating: 0,
  })
  const [imagePreview, setImagePreview] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const openCreateModal = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      description: '',
      category: 'Makanan',
      price: '',
      whatsapp: '',
      rating: 0,
    })
    setImagePreview('')
    setImageFile(null)
    setIsModalOpen(true)
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category,
      price: product.price.toString(),
      whatsapp: product.whatsapp,
      rating: product.rating,
    })
    setImagePreview(product.image || '')
    setImageFile(null)
    setIsModalOpen(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        error('Ukuran file maksimal 1MB')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.category || !formData.price || !formData.whatsapp || formData.rating === 0) {
      error('Mohon lengkapi semua field yang wajib diisi')
      return
    }

    if (!imagePreview && !editingProduct) {
      error('Mohon upload foto produk')
      return
    }

    let photoUrl: string | null = null

    try {
      // Upload new image if file selected
      if (imageFile) {
        photoUrl = await uploadUmkmImage(imageFile)
      } else if (editingProduct?.image) {
        // Keep existing image path (extract key from URL if needed)
        const existingUrl = editingProduct.image
        if (existingUrl.includes('/storage/v1/object/public/umkm-images/')) {
          photoUrl = existingUrl.split('/storage/v1/object/public/umkm-images/')[1]
        } else if (!existingUrl.startsWith('http')) {
          photoUrl = existingUrl
        }
      }
    } catch (uploadError) {
      error(uploadError instanceof Error ? uploadError.message : 'Gagal mengupload gambar')
      return
    }

    const productData = {
      name: formData.name,
      description: formData.description || '',
      category: formData.category,
      price: parseFloat(formData.price.replace(/[^0-9]/g, '')),
      whatsapp: formData.whatsapp,
      rating: formData.rating,
      photo_url: photoUrl,
      is_active: true,
    }

    if (editingProduct) {
      // Update product
      const { error: updateError } = await supabase
        .from('umkm_products')
        .update(productData)
        .eq('id', editingProduct.id)

      if (updateError) {
        console.error('Error updating product:', updateError)
        error('Gagal mengupdate produk')
        return
      }
      success('Produk berhasil diupdate!')
    } else {
      // Create new product
      const { error: insertError } = await supabase
        .from('umkm_products')
        .insert([productData])

      if (insertError) {
        console.error('Error creating product:', insertError)
        error('Gagal menambahkan produk')
        return
      }
      success('Produk berhasil ditambahkan!')
    }

    setIsModalOpen(false)
    fetchProducts() // Refresh products list
  }

  const handleDelete = async (id: string) => {
    const { error: deleteError } = await supabase
      .from('umkm_products')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Error deleting product:', deleteError)
      error('Gagal menghapus produk')
      return
    }

    setDeleteConfirm(null)
    success('Produk berhasil dihapus!')
    fetchProducts() // Refresh products list
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kelola UMKM</h1>
          <p className="text-slate-600 mt-2">
            Tambah, edit, dan hapus produk UMKM
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Tambah Produk
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          >
            <option value="all">Semua Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
            <option value="Kerajinan">Kerajinan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Belum ada produk</h3>
            <p className="text-slate-600 mb-6">Mulai tambahkan produk UMKM Anda</p>
            <button
              onClick={openCreateModal}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Tambah Produk Pertama
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b-2 border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Produk</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Harga</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">WhatsApp</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.image && (
                          <div className="relative w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          {product.description && (
                            <p className="text-sm text-slate-600 truncate max-w-xs">{product.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-slate-900">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {formatWhatsApp(product.whatsapp)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Product Image */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Foto Produk <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <div className="relative w-24 h-24 bg-slate-100 rounded-lg overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
                      <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {imagePreview ? 'Ganti Foto' : 'Upload Foto'}
                          </p>
                          <p className="text-xs text-slate-500">PNG, JPG (max 1MB)</p>
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Nama Produk <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Kopi Robusta Premium"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Deskripsi (Opsional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsikan produk Anda..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Category and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'Makanan' | 'Minuman' | 'Kerajinan' | 'Lainnya',
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="Makanan">Makanan</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Harga <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-medium">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '')
                        setFormData({ ...formData, price: value ? parseInt(value).toLocaleString('id-ID') : '' })
                      }}
                      placeholder="50.000"
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="081234567890 atau +6281234567890"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  Format: 08xx-xxxx-xxxx atau +62-xxx-xxxx-xxxx
                </p>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <RatingInput
                  value={formData.rating}
                  onChange={(value) => setFormData({ ...formData, rating: value })}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  {editingProduct ? 'Update Produk' : 'Tambah Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Hapus Produk?</h3>
            <p className="text-slate-600 mb-6">
              Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function UMKMPage() {
  return (
    <ToastProvider>
      <UMKMContent />
    </ToastProvider>
  )
}
