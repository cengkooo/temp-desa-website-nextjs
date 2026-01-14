# Wisata Components

Komponen-komponen reusable untuk halaman detail wisata.

## Struktur Komponen

### 1. **WisataHero.tsx**
Hero section dengan navbar dan background image.

**Props:**
- `title`: Judul wisata
- `subtitle`: Deskripsi singkat
- `backgroundImage`: Path gambar background

**Fitur:**
- Navbar terintegrasi dengan navigasi ke halaman utama
- Hero section dengan overlay gelap
- Responsive design

---

### 2. **WisataInfo.tsx**
Section informasi tentang wisata.

**Props:**
- `description`: Array of paragraphs

**Fitur:**
- Multi-paragraph support
- Clean typography
- Responsive text layout

---

### 3. **WisataGallery.tsx**
Galeri foto dengan grid layout.

**Props:**
- `images`: Array of `{ src, alt }`

**Fitur:**
- 3-column responsive grid
- Hover zoom effect
- Smooth transitions

---

### 4. **WisataFacilities.tsx**
Grid fasilitas yang tersedia.

**Props:**
- `facilities`: Array of `{ icon, name }`

**Fitur:**
- Icon dari lucide-react
- Card hover effects
- 3-column responsive grid

---

### 5. **WisataRelatedInfo.tsx**
Section informasi terkait layanan pendukung wisata.

**Props:**
- `label`: Label kecil di atas judul
- `title`: Judul section
- `description`: Deskripsi singkat (optional)
- `categories`: Array kategori layanan dengan item detail

**Fitur:**
- Multi kategori layanan
- Card list dengan rating dan harga
- Layout responsive dengan grid

---

### 6. **WisataSidebar.tsx**
Sticky sidebar dengan informasi penting.

**Props:**
- `location`: Alamat lokasi
- `operationalHours`: Jam operasional
- `contact`: Nomor kontak
- `ticketPrice`: Harga tiket
- `whatsappNumber`: Nomor WhatsApp (format: 628xxx)
- `mapEmbedUrl`: URL embed Google Maps (optional)

**Fitur:**
- 3 card sections (Info, Tiket, Lokasi)
- WhatsApp integration
- Google Maps embed
- Sticky positioning

---

## Cara Penggunaan

### Data Structure

Buat data wisata di `lib/data/wisata-data.ts`:

```typescript
export const wisataData: Record<string, WisataData> = {
  "slug-wisata": {
    slug: "slug-wisata",
    title: "Nama Wisata",
    subtitle: "Deskripsi singkat",
    backgroundImage: "/path/to/image.jpg",
    description: ["Paragraph 1", "Paragraph 2"],
    gallery: [
      { src: "/image1.jpg", alt: "Description" }
    ],
    facilities: [
      { icon: Car, name: "Parkir Luas" }
    ],
    relatedInfo: {
      label: "LAYANAN WISATA",
      title: "Fasilitas Pendukung Wisata",
      description: "Nikmati berbagai layanan pendukung",
      categories: [
        {
          icon: Hotel,
          title: "Penginapan",
          items: [
            {
              title: "Homestay Sawah Indah",
              description: "Penginapan nyaman dengan pemandangan sawah",
              price: "Rp 250.000",
              priceUnit: "per malam",
              rating: 4.8,
              href: "#"
            }
          ]
        }
      ]
    },
    location: "Alamat lengkap",
    operationalHours: "Senin - Minggu: 07.00 - 17.00",
    contact: "+62 xxx",
    ticketPrice: "Rp 15.000",
    whatsappNumber: "628xxx",
    mapEmbedUrl: "https://..."
  }
}
```

### Page Implementation

```typescript
import { getWisataBySlug } from "@/lib/data/wisata-data"
import { WisataHero, WisataInfo, WisataGallery, WisataFacilities, WisataRelatedInfo, WisataSidebar } from "@/components/wisata"

export default function WisataDetailPage({ params }: PageProps) {
  const wisata = getWisataBySlug(params.slug)
  
  return (
    <div>
      <WisataHero {...wisata} />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WisataInfo description={wisata.description} />
          <WisataGallery images={wisata.gallery} />
          <WisataFacilities facilities={wisata.facilities} />
          <WisataRelatedInfo {...wisata.relatedInfo} />
        </div>
        <div className="lg:col-span-1">
          <WisataSidebar {...wisata} />
        </div>
      </div>
    </div>
  )
}
```

## URL Structure

- `/wisata/air-terjun-pelangi` - Detail Air Terjun Pelangi
- `/wisata/[slug]` - Dynamic route untuk wisata lainnya

## Customization

### Menambah Wisata Baru

1. Tambahkan data di `wisata-data.ts`
2. Upload gambar ke folder `public/`
3. Akses via `/wisata/[slug-baru]`

### Styling

Semua komponen menggunakan Tailwind CSS dengan:
- Primary color: Blue (#0EA5E9)
- Background: Slate-50
- Cards: White dengan border slate-200
- Shadows: Subtle untuk depth
