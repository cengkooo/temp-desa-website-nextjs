'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageFile {
  id: string
  file: File
  preview: string
}

interface ImageUploadProps {
  images: ImageFile[]
  onImagesChange: (images: ImageFile[]) => void
  maxFiles?: number
}

export default function ImageUpload({ 
  images, 
  onImagesChange,
  maxFiles = 10 
}: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)

    // Check if adding these files would exceed the limit
    if (images.length + acceptedFiles.length > maxFiles) {
      setError(`Maksimal ${maxFiles} foto`)
      return
    }

    // Validate file sizes (max 1MB per file)
    const invalidFiles = acceptedFiles.filter(file => file.size > 1 * 1024 * 1024)
    if (invalidFiles.length > 0) {
      setError('Beberapa file melebihi 1MB')
      return
    }

    // Create image objects with previews
    const newImages: ImageFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }))

    onImagesChange([...images, ...newImages])
  }, [images, maxFiles, onImagesChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: maxFiles - images.length,
    disabled: images.length >= maxFiles
  })

  const removeImage = (id: string) => {
    const imageToRemove = images.find(img => img.id === id)
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview)
    }
    onImagesChange(images.filter(img => img.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {images.length < maxFiles && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
            }
            ${images.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <div className="bg-blue-100 p-4 rounded-full">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                {isDragActive ? 'Drop foto di sini...' : 'Upload Foto'}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Drag & drop atau klik untuk pilih foto
              </p>
              <p className="text-xs text-slate-500 mt-2">
                PNG, JPG, WEBP (max 1MB per file) • {images.length}/{maxFiles} foto
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group aspect-square bg-slate-100 rounded-lg overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-all"
            >
              <Image
                src={image.preview}
                alt={image.file.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button
                  onClick={() => removeImage(image.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-xs truncate">{image.file.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Belum ada foto yang diupload</p>
        </div>
      )}
    </div>
  )
}
