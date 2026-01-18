"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Image as ImageIcon, MessageCircle } from 'lucide-react'
import { StarRating } from '@/components/umkm'
import { resolveUmkmImageUrl } from '@/lib/supabase/storage'

interface UmkmProduct {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  whatsapp: string
  rating: number
  photo_url: string | null
  is_active: boolean
}

export default function ProductCard({ product }: { product: UmkmProduct }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleWhatsAppClick = () => {
    const cleanNumber = product.whatsapp.replace(/\D/g, '')
    const message = encodeURIComponent(`Halo, saya tertarik dengan produk ${product.name}`)
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank')
  }

  const normalizedImage = resolveUmkmImageUrl(product.photo_url) || ''
  const isValidImageSrc = !!normalizedImage

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow group">
      {/* Product Image */}
      <div className="relative h-64 bg-slate-100">
        {isValidImageSrc ? (
          <Image
            src={normalizedImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            <ImageIcon className="w-10 h-10" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Rating */}
        <div className="mb-2">
          <StarRating rating={product.rating} size="sm" showValue={false} showCount={false} />
        </div>

        {/* Name */}
        <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{product.name}</h3>
        
        {/* Description */}
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
          {product.description || 'Produk berkualitas dari UMKM lokal'}
        </p>

        {/* Category Badge */}
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mb-3">
          {product.category}
        </span>

        {/* Price */}
        <p className="text-xl font-bold text-blue-600 mb-4">{formatPrice(product.price)}</p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/umkm/${product.id}`}
            className="flex-1 px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:border-blue-600 hover:text-blue-600 transition text-center"
          >
            Detail
          </Link>
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WA
          </button>
        </div>
      </div>
    </div>
  )
}
