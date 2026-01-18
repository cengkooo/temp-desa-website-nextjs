# Public Components

Komponen-komponen reusable untuk landing page website Desa Wisata.

## Struktur Komponen

### 1. **Navbar.tsx**
Komponen navigasi utama yang fixed di bagian atas halaman.

**Fitur:**
- Logo dan nama brand
- Navigation links (Beranda, Wisata, UMKM)
- CTA button "Hubungi Kami"
- Responsive design dengan backdrop blur effect

---

### 2. **HeroSection.tsx**
Komponen hero section dengan background image fullscreen.

**Fitur:**
- Background image dengan overlay
- Welcome message dengan emoji
- Heading dan subheading
- Dual CTA buttons
- Scroll indicator dengan animasi

---

### 3. **AboutSection.tsx**
Komponen tentang desa dengan layout 2 kolom.

**Fitur:**
- Image dengan badge "25+ Tahun Melayani"
- Deskripsi tentang desa
- Grid 4 fitur dengan icon (Alam, Masyarakat, Budaya, Pengalaman)
- Responsive layout

---

### 4. **GallerySection.tsx**
Komponen galeri foto dengan grid layout.

**Fitur:**
- Masonry-style grid layout
- Hover effects dengan scale animation
- 1 large image + 3 small images
- Responsive design

---

### 5. **TeamSection.tsx**
Komponen tim KKN dengan card layout.

**Fitur:**
- Grid 6 kolom untuk team members
- Avatar dengan initial huruf pertama
- Informasi nama, role, dan divisi
- Hover shadow effect
- Footer info tentang tim

---

### 6. **Footer.tsx**
Komponen footer dengan 4 kolom informasi.

**Fitur:**
- Brand section dengan logo dan deskripsi
- Quick links navigation
- Contact information
- Social media links (Facebook, Instagram, YouTube)
- Copyright notice

---

## Cara Penggunaan

### Import Individual
```tsx
import Navbar from "@/components/public/Navbar"
import HeroSection from "@/components/public/HeroSection"
```

### Import dari Index (Recommended)
```tsx
import { Navbar, HeroSection, Footer } from "@/components/public"
```

### Contoh Implementasi
```tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <TeamSection />
      <Footer />
    </div>
  )
}
```

## Customization

Setiap komponen menggunakan data yang di-hardcode. Untuk membuat lebih dinamis, Anda bisa:

1. **Pass props** untuk data yang berubah-ubah
2. **Fetch dari API/Database** untuk konten dinamis
3. **Gunakan CMS** untuk manajemen konten

### Contoh dengan Props:
```tsx
// TeamSection.tsx
interface TeamSectionProps {
  members?: TeamMember[]
  title?: string
}

export default function TeamSection({ 
  members = defaultMembers,
  title = "Tim KKN Desa Sukamaju" 
}: TeamSectionProps) {
  // ... component code
}
```

## Design System

Komponen-komponen ini menggunakan:
- **Colors**: Blue (primary), Slate (neutral), dengan accent colors
- **Typography**: Tailwind default font stack
- **Spacing**: Consistent padding dan margin
- **Shadows**: Subtle shadows untuk depth
- **Transitions**: Smooth hover effects

## Best Practices

1. ✅ Semua komponen sudah responsive
2. ✅ Menggunakan semantic HTML
3. ✅ Accessible dengan proper alt text
4. ✅ Performance optimized dengan Next.js Image
5. ✅ Clean separation of concerns
