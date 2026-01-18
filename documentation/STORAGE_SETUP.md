# 🗂️ Supabase Storage Setup untuk Upload Gambar UMKM

## 📋 Setup Bucket di Supabase

### 1. Buka Dashboard Supabase
1. Login ke https://supabase.com
2. Pilih project Anda
3. Klik menu **Storage** di sidebar kiri

### 2. Buat Bucket `umkm-images`
1. Klik tombol **New bucket**
2. Nama bucket: `umkm-images`
3. **Public bucket**: ✅ **CENTANG** (agar gambar bisa diakses publik)
4. Klik **Create bucket**

### 3. Verifikasi Bucket
Pastikan bucket `umkm-images` muncul di daftar dengan status **Public**

## 🔧 Konfigurasi Upload

### Batasan File
- **Ukuran maksimal**: 1MB per file
- **Format yang didukung**: PNG, JPG, JPEG, WEBP
- **Validasi**: Otomatis di client & server

### Struktur Penyimpanan
```
umkm-images/
└── products/
    ├── 1736765432-abc123.jpg
    ├── 1736765433-def456.png
    └── ... (nama file: timestamp-random.ext)
```

## 📝 Cara Kerja Upload

### 1. **Upload Baru** (Admin Panel)
- User memilih gambar di form admin UMKM
- Validasi ukuran < 1MB
- File diupload ke Supabase Storage bucket `umkm-images`
- Database menyimpan **key** saja (contoh: `products/1736765432-abc123.jpg`)
- Saat render, key diubah jadi full URL: `https://xxx.supabase.co/storage/v1/object/public/umkm-images/products/1736765432-abc123.jpg`

### 2. **Edit Produk**
- Gambar lama tetap digunakan jika tidak diganti
- Jika upload gambar baru, gambar lama tidak otomatis dihapus (bisa implementasi di masa depan)

### 3. **Display Gambar**
- Semua komponen menggunakan `resolveUmkmImageUrl()` untuk konversi key → URL
- Next.js Image component sudah dikonfigurasi whitelist domain Supabase

## 🔒 Security Policies (RLS)

### Untuk Insert (Upload)
```sql
-- Hanya authenticated users yang bisa upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'umkm-images');
```

### Untuk Select (Read)
```sql
-- Semua orang bisa baca (public bucket)
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'umkm-images');
```

### Untuk Delete
```sql
-- Hanya authenticated users yang bisa hapus
CREATE POLICY "Allow authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'umkm-images');
```

## ✅ Checklist Setup

- [ ] Buat bucket `umkm-images` di Supabase dashboard
- [ ] Set bucket sebagai **Public**
- [ ] Test upload gambar < 1MB di admin panel
- [ ] Verifikasi gambar muncul di halaman UMKM public
- [ ] Test edit produk (gambar tetap ada)

## 🐛 Troubleshooting

### Gambar tidak tampil (ERR_FILE_NOT_FOUND)
**Penyebab**: Database masih menyimpan data URL (base64) atau key salah

**Solusi**:
1. Cek isi kolom `photo_url` di database
2. Jika isinya `data:image/...` (base64), artinya produk dibuat sebelum update → hapus dan buat ulang
3. Jika isinya cuma key (misal: `products/xxx.jpg`), pastikan file ada di bucket
4. Cek domain Supabase sudah di-whitelist di `next.config.ts`

### Upload gagal "Gagal mengupload gambar"
**Penyebab**: Bucket belum dibuat atau tidak public

**Solusi**:
1. Pastikan bucket `umkm-images` sudah ada
2. Pastikan status bucket = **Public**
3. Cek RLS policies sudah benar

### Ukuran file ditolak
**Penyebab**: File > 1MB

**Solusi**: Kompres gambar dulu sebelum upload (bisa pakai tools online atau Photoshop/GIMP)

## 📊 Monitoring Storage

### Cek Usage di Dashboard
1. Buka Supabase Dashboard
2. Menu **Storage** → **umkm-images**
3. Lihat daftar file yang sudah diupload
4. Cek total storage used

### Clean Up File Lama
Jika perlu hapus file yang tidak terpakai:
```sql
-- Query untuk cek file yang tidak ada di database
SELECT name FROM storage.objects 
WHERE bucket_id = 'umkm-images' 
AND name NOT IN (SELECT photo_url FROM umkm_products WHERE photo_url IS NOT NULL);
```

---

## 🎯 Best Practices

1. **Kompresi Gambar**: Gunakan tools seperti TinyPNG sebelum upload
2. **Naming**: Filename otomatis pakai timestamp + random string (collision-free)
3. **Backup**: Supabase Storage sudah otomatis backup
4. **CDN**: Supabase Storage sudah pakai CDN global

## 🚀 Fitur Tambahan (Future)

- [ ] Auto-compress gambar sebelum upload
- [ ] Delete gambar lama saat update produk
- [ ] Multiple images per produk
- [ ] Drag & drop upload interface
- [ ] Image cropping/editing before upload
