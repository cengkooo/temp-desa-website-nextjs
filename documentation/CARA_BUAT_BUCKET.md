# 🚨 URGENT: Buat Bucket Storage Dulu!

## ❌ Error yang Muncul:
```
Upload error: StorageApiError: Bucket not found
Gagal mengupload gambar
```

## ✅ Solusi: Buat Bucket `umkm-images` di Supabase

### 📋 Langkah-langkah WAJIB (5 menit):

#### 1️⃣ Buka Supabase Dashboard
- **URL**: https://supabase.com/dashboard
- Login dengan akun Supabase kamu

#### 2️⃣ Pilih Project
- Klik project: **hfftjrdfcvrjwnqjfoax** (atau project kamu)

#### 3️⃣ Buka Menu Storage
- Di sidebar kiri, klik **Storage** (ikon folder)

#### 4️⃣ Buat Bucket Baru
Klik tombol **"New bucket"** (atau "+ Create a new bucket")

#### 5️⃣ Isi Form Bucket
```
Name: umkm-images
Public bucket: ✅ CENTANG INI! (PENTING!)
File size limit: (biarkan default atau set 1MB)
Allowed MIME types: (biarkan kosong = allow all images)
```

#### 6️⃣ Klik "Create bucket"

#### 7️⃣ Verifikasi
- Pastikan bucket **umkm-images** muncul di list
- Badge/label harus menunjukkan **"Public"**

---

## 🎯 Setelah Bucket Dibuat:

### Test Upload Langsung:
1. Refresh halaman admin (`http://localhost:3000/admin/umkm`)
2. Klik "Tambah Produk"
3. Upload gambar < 1MB
4. Klik "Tambah Produk"
5. ✅ Seharusnya berhasil sekarang!

### Cek di Dashboard Storage:
1. Buka Supabase Dashboard → Storage → umkm-images
2. Kamu akan lihat folder `products/`
3. Di dalamnya ada file gambar yang baru diupload
4. Format nama: `1736765432-abc123.jpg` (timestamp-random)

---

## 🔧 Jika Masih Error:

### Error: "Access denied" atau "Not authorized"
**Penyebab**: Bucket belum public atau RLS terlalu ketat

**Solusi**:
1. Klik bucket `umkm-images` di dashboard
2. Tab **Policies**
3. Pastikan ada policy untuk **INSERT** dan **SELECT**
4. Atau klik **"New Policy"** → Template: **"Allow public uploads"**

### Error: "File too large"
**Penyebab**: File > 1MB

**Solusi**: Kompres gambar dulu
- Online: https://tinypng.com atau https://squoosh.app
- Atau resize di Photoshop/GIMP/Paint

### Error: "Invalid file type"
**Penyebab**: Bukan file gambar

**Solusi**: Pastikan file berformat:
- ✅ PNG
- ✅ JPG/JPEG
- ✅ WEBP
- ❌ PDF, GIF, SVG, video → tidak support

---

## 📞 Butuh Bantuan?

### Check Bucket Status (via code):
```typescript
import { checkBucketExists } from '@/lib/supabase/storage'

const exists = await checkBucketExists()
console.log('Bucket exists:', exists)
```

### Manual Test Upload via Dashboard:
1. Buka Storage → umkm-images
2. Klik "Upload file"
3. Pilih gambar kecil
4. Jika berhasil upload via dashboard tapi gagal via app → berarti ada issue di code
5. Jika gagal upload via dashboard juga → berarti ada issue di setup Supabase

---

## ⚠️ CATATAN PENTING:

1. **Bucket HARUS public** agar gambar bisa diakses tanpa auth
2. **Nama bucket HARUS persis**: `umkm-images` (huruf kecil, pakai dash)
3. **Jangan pakai space** di nama bucket
4. **Setelah buat bucket, refresh browser** sebelum test upload lagi

---

## 🎉 Selesai!

Setelah bucket dibuat dan berstatus **Public**, upload seharusnya langsung jalan! 🚀

File yang diupload akan otomatis:
- ✅ Tersimpan di `umkm-images/products/`
- ✅ Bisa diakses publik via URL
- ✅ Ter-cache di CDN Supabase
- ✅ Muncul di halaman UMKM

**Happy uploading!** 📸
