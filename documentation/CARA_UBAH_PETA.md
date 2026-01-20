# Panduan Mengubah Lokasi Peta Google Maps

## Cara Mendapatkan Koordinat Lokasi Baru

### Metode 1: Dari Google Maps Website
1. Buka [Google Maps](https://www.google.com/maps)
2. Cari lokasi yang ingin Anda tampilkan atau klik kanan pada titik di peta
3. Pilih koordinat (angka lat/long) yang muncul - klik untuk menyalin
   - Contoh: `-5.447380, 105.267728`
4. Simpan koordinat ini untuk langkah berikutnya

### Metode 2: Mendapatkan Embed Code Langsung
1. Buka [Google Maps](https://www.google.com/maps)
2. Cari lokasi yang ingin ditampilkan
3. Klik tombol **Share** (Bagikan)
4. Pilih tab **Embed a map**
5. Salin kode iframe yang diberikan
6. Dari kode tersebut, ambil URL yang ada di atribut `src="..."`

## Cara Mengubah Peta di Website

### File yang Perlu Diubah
File: `components/public/LocationSection.tsx`

### Langkah-langkah:

1. **Buka file LocationSection.tsx**

2. **Cari bagian iframe** (sekitar baris 60-69):
```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!..."
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="w-full h-full"
/>
```

3. **Ganti URL di atribut `src`** dengan salah satu cara:

#### Cara A: Menggunakan Koordinat Langsung (Sederhana)
Ganti dengan format:
```tsx
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d105.26772834335936!3d-5.447380899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c31df8c5e7e9%3A0xca0260d85c2ee9d0!2sWay%20Kalam%2C%20Kec.%20Rajabasa%2C%20Kabupaten%20Lampung%20Selatan%2C%20Lampung!5e0!3m2!1sid!2sid!4v1737037000000!5m2!1sid!2sid"
```

**Cara mengubah koordinat:**
- Cari bagian `!3d-5.447380899999999!` → ganti `-5.447380899999999` dengan latitude Anda
- Cari bagian `!2d105.26772834335936!` → ganti `105.26772834335936` dengan longitude Anda

Contoh untuk lokasi baru (lat: -6.200000, long: 106.816666):
```tsx
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d106.816666!3d-6.200000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c31df8c5e7e9%3A0xca0260d85c2ee9d0!2sNama%20Lokasi%20Baru!5e0!3m2!1sid!2sid!4v1737037000000!5m2!1sid!2sid"
```

#### Cara B: Menggunakan Embed Code dari Google Maps (Recommended)
1. Dapatkan embed code dari Google Maps (lihat Metode 2 di atas)
2. Salin URL lengkap dari atribut `src` dalam embed code
3. Ganti URL di file LocationSection.tsx dengan URL baru tersebut

4. **Ubah juga teks alamat** di bagian Map Footer (sekitar baris 73-75):
```tsx
<div className="flex items-center gap-2 text-sm text-slate-600">
  <MapPin className="w-4 h-4 text-blue-600" />
  <span>Way Kalam, Rajabasa, Lampung Selatan</span> {/* UBAH INI */}
</div>
```

5. **Ubah link "Buka di Google Maps"** (opsional, sekitar baris 77-82):
```tsx
<a
  href="https://goo.gl/maps/your-location" {/* UBAH INI */}
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
>
```

**Cara mendapatkan Google Maps short link:**
1. Buka lokasi di Google Maps
2. Klik tombol Share
3. Klik "Copy link"
4. Gunakan link tersebut

## Contoh Lengkap Perubahan

### Sebelum:
```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d105.26772834335936!3d-5.447380899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c31df8c5e7e9%3A0xca0260d85c2ee9d0!2sWay%20Kalam%2C%20Kec.%20Rajabasa%2C%20Kabupaten%20Lampung%20Selatan%2C%20Lampung!5e0!3m2!1sid!2sid!4v1737037000000!5m2!1sid!2sid"
  ...
/>
```

### Sesudah (contoh untuk Jakarta):
```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d106.816666!3d-6.200000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sid!2sid!4v1737037000000!5m2!1sid!2sid"
  ...
/>
```

## Keamanan Saat Deploy

### ✅ Apakah Peta Aman Saat Deploy?
**Ya, 100% aman!** Berikut alasannya:

1. **Tidak Butuh API Key untuk Embed**
   - Google Maps embed iframe GRATIS dan tidak memerlukan API key
   - Tidak ada batasan penggunaan untuk embed iframe
   - Website Anda tidak akan dikenakan biaya

2. **Peta Akan Tetap Berfungsi di Production**
   - URL embed bersifat publik dan permanen
   - Tidak terpengaruh oleh deployment (Vercel, Netlify, dll)
   - Tidak perlu konfigurasi tambahan

3. **Performa Tetap Optimal**
   - Google Maps di-load langsung dari server Google
   - Menggunakan `loading="lazy"` untuk optimasi
   - Tidak membebani server Anda

4. **Update Otomatis**
   - Jika Google memperbarui peta, perubahan akan otomatis terlihat
   - Tidak perlu update manual di website

### ⚠️ Catatan Penting:
- Pastikan koordinat yang Anda masukkan sudah benar sebelum deploy
- Test di localhost dulu sebelum push ke production
- Jika peta tidak muncul, cek browser console untuk error

### 🔍 Troubleshooting:
**Peta tidak muncul?**
1. Cek apakah URL embed sudah benar
2. Pastikan tidak ada karakter yang hilang saat copy-paste
3. Cek browser console (F12) untuk error messages
4. Coba buka URL embed langsung di browser baru

**Peta muncul di localhost tapi tidak di production?**
1. Clear browser cache
2. Tunggu beberapa menit untuk propagasi
3. Cek apakah build berhasil tanpa error

## Tips Tambahan

### Zoom Level
Untuk mengubah zoom level peta, ubah nilai setelah `!4f`:
- `!4f10!` = Zoom lebih jauh (kota)
- `!4f13.1!` = Zoom sedang (default)
- `!4f16!` = Zoom lebih dekat (jalan)

### Menampilkan Marker Spesifik
Jika ingin menampilkan marker tertentu, gunakan format:
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...&q=Nama+Tempat
```

Tambahkan `&q=` diikuti nama tempat (gunakan + untuk spasi).

### Mode Tampilan
- Tambahkan `&t=k` untuk satelit view
- Tambahkan `&t=h` untuk hybrid view
- Default (tidak ada) adalah roadmap

---

**Dibuat:** 16 Januari 2026  
**File Terkait:** `components/public/LocationSection.tsx`  
**Butuh Bantuan?** Hubungi tim development
