import Image from "next/image"

interface LayananCoverImageProps {
  src: string
  alt: string
}

export default function LayananCoverImage({ src, alt }: LayananCoverImageProps) {
  return (
    <div className="relative h-80 md:h-[420px] bg-slate-200 rounded-2xl overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" priority />
    </div>
  )
}
