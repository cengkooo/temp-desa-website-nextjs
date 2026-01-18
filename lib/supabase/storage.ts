import { readSupabaseEnv } from './env'
import { createClient } from './client'

export const UMKM_IMAGES_BUCKET = 'umkm-images'
export const MAX_IMAGE_SIZE = 1 * 1024 * 1024 // 1MB in bytes

export function resolveUmkmImageUrl(value: unknown) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim().replace(/^['"]|['"]$/g, '')
  if (!trimmed) return undefined
  if (trimmed.startsWith('blob:')) return undefined

  // Already a usable URL or local path
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:image/')
  ) {
    return trimmed
  }

  // Treat as a storage object path/key inside our bucket
  const env = readSupabaseEnv({ allowMissing: true })
  if (!env) return undefined

  return `${env.supabaseUrl}/storage/v1/object/public/${UMKM_IMAGES_BUCKET}/${trimmed}`
}

/**
 * Check if bucket exists by trying to list files in it
 * @returns true if bucket exists, false otherwise
 */
export async function checkBucketExists(): Promise<boolean> {
  try {
    const supabase = createClient()
    // Try to list files in bucket instead of listing all buckets
    const { error } = await supabase.storage
      .from(UMKM_IMAGES_BUCKET)
      .list('', { limit: 1 })
    
    if (error) {
      console.error('Error checking bucket:', error)
      return false
    }
    
    return true
  } catch (err) {
    console.error('Error checking bucket:', err)
    return false
  }
}

/**
 * Upload image to Supabase Storage and return the object key
 * @param file - Image file to upload (max 1MB)
 * @returns Object key (path) to store in database
 */
export async function uploadUmkmImage(file: File): Promise<string> {
  // Validate file size (1MB max)
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Ukuran file maksimal 1MB')
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File harus berupa gambar')
  }

  const supabase = createClient()
  
  // Check if bucket exists
  const bucketExists = await checkBucketExists()
  if (!bucketExists) {
    throw new Error(
      `Bucket '${UMKM_IMAGES_BUCKET}' belum dibuat di Supabase. ` +
      `Silakan buat bucket di Supabase Dashboard: Storage → New Bucket → ` +
      `Nama: ${UMKM_IMAGES_BUCKET} → Public ✓`
    )
  }
  
  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `products/${fileName}`

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(UMKM_IMAGES_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Upload error:', error)
    
    // Provide more specific error messages
    if (error.message?.includes('Bucket not found')) {
      throw new Error(
        `Bucket '${UMKM_IMAGES_BUCKET}' tidak ditemukan. ` +
        `Buat bucket di Supabase Dashboard (Storage → New Bucket) dengan nama: ${UMKM_IMAGES_BUCKET}`
      )
    }
    
    throw new Error(`Gagal mengupload gambar: ${error.message || 'Unknown error'}`)
  }

  // Return the path (key) to store in database
  return data.path
}

/**
 * Delete image from Supabase Storage
 * @param path - Object key (path) stored in database
 */
export async function deleteUmkmImage(path: string): Promise<void> {
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return // Skip deletion for external URLs or data URLs
  }

  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(UMKM_IMAGES_BUCKET)
    .remove([path])

  if (error) {
    console.error('Delete error:', error)
  }
}
