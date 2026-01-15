import Image from "next/image"

const galleryImages = [
  {
    src: "/img1.jpeg",
    alt: "Gallery 1",
    className: "md:col-span-2 md:row-span-2 relative h-[500px]"
  },
  {
    src: "/img2.jpeg",
    alt: "Gallery 2",
    className: "relative h-[240px]"
  },
  {
    src: "/img3.png",
    alt: "Gallery 3",
    className: "relative h-[240px]"
  },
  {
    src: "/p9.png",
    alt: "Gallery 4",
    className: "relative h-[240px]"
  }
]

export default function GallerySection() {
  return (
    <section id="galeri" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold mb-4 block">GALERI FOTO</span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Keindahan yang Memukau
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Lihat berbagai momen indah dan pemandangan menakjubkan dari desa kami
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className={`${image.className} rounded-2xl overflow-hidden group`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {index === 0 && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
