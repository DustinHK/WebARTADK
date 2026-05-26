# 🎩 Topi Adat Dayak Kenyah — WebAR

Aplikasi Web-based Augmented Reality untuk visualisasi 8 jenis topi adat Dayak Kenyah menggunakan teknologi face tracking.

---

## 📁 Struktur File

```
topi-adat-dayak/
│
├── index.html          ← Splash screen + Halaman Utama
├── ar.html             ← Halaman AR (try-on topi virtual)
├── informasi.html      ← Daftar 8 topi adat (grid + filter)
├── detail-topi.html    ← Detail informasi topi (dinamis via URL)
├── panduan.html        ← Panduan penggunaan aplikasi
├── tentang.html        ← Tentang aplikasi & pengembang
│
├── css/
│   └── style.css       ← Global stylesheet (tema coklat & emas)
│
├── js/
│   ├── data.js         ← ⭐ DATA 8 TOPI ADAT (edit di sini!)
│   └── app.js          ← Fungsi utilitas bersama
│
├── assets/
│   └── images/
│       ├── topi/       ← ⭐ LETAKKAN GAMBAR TOPI DI SINI
│       └── ui/         ← Gambar antarmuka (opsional)
│
├── hat1.glb            ← Model 3D Tapung Udeng
├── hat2.glb            ← Model 3D Tapung Longe
├── hat3.glb            ← Model 3D Tapung Sekeduq
├── hat4.glb            ← Model 3D Tapung Uwai
├── hat5.glb            ← Model 3D Tapung Pek
├── hat6.glb            ← Model 3D Tapung Aban
├── hat7.glb            ← Model 3D Bluko Laki
├── hat8.glb            ← Model 3D Bluko Leto
└── headOccluder.glb    ← Model occluder kepala (opsional)
```

---

## 🖼️ Cara Menambahkan Gambar Topi

### Langkah 1 — Siapkan Gambar

Letakkan file gambar Anda di folder `assets/images/topi/`.

**Format yang disarankan:** JPG atau WebP, ukuran ≤ 500KB per gambar.

**Rasio aspek:**
- Gambar thumbnail (grid): **4:3** (misal 400×300px)
- Gambar detail (halaman detail): bebas, tapi **landscape** lebih bagus

### Langkah 2 — Edit `js/data.js`

Buka file `js/data.js` dan ganti nilai `gambar` dan `gambarDetail` untuk setiap topi:

```javascript
{
  id: 1,
  nama: "Tapung Udeng",
  gambar: "assets/images/topi/tapung-udeng.jpg",       // ← ganti ini
  gambarDetail: "assets/images/topi/tapung-udeng-detail.jpg", // ← dan ini
  // ... data lainnya tetap sama
}
```

### Contoh Nama File yang Disarankan

| Topi | `gambar` | `gambarDetail` |
|------|----------|----------------|
| Tapung Udeng | `tapung-udeng.jpg` | `tapung-udeng-detail.jpg` |
| Tapung Longe | `tapung-longe.jpg` | `tapung-longe-detail.jpg` |
| Tapung Sekeduq | `tapung-sekeduq.jpg` | `tapung-sekeduq-detail.jpg` |
| Tapung Uwai | `tapung-uwai.jpg` | `tapung-uwai-detail.jpg` |
| Tapung Pek | `tapung-pek.jpg` | `tapung-pek-detail.jpg` |
| Tapung Aban | `tapung-aban.jpg` | `tapung-aban-detail.jpg` |
| Bluko Laki | `bluko-laki.jpg` | `bluko-laki-detail.jpg` |
| Bluko Leto | `bluko-leto.jpg` | `bluko-leto-detail.jpg` |

> **Catatan:** Jika gambar tidak ditemukan, aplikasi otomatis menampilkan placeholder dengan nama topi.

---

## 🤖 Cara Menambahkan Model 3D GLB

1. Ekspor model dari Blender dalam format **GLTF/GLB**
2. Letakkan di root folder dengan nama `hat1.glb` s/d `hat8.glb`
3. Letakkan `headOccluder.glb` di root folder (opsional, untuk efek occluder kepala)

---

## ✏️ Cara Edit Data Topi

Semua data topi (nama, bahan, pengguna, fungsi, makna) ada di **`js/data.js`**.
Edit file tersebut untuk memperbarui informasi tanpa menyentuh file HTML.

---

## ✏️ Cara Edit Info Pengembang

Buka `tentang.html` dan cari bagian `<!-- GANTI DATA DI BAWAH INI -->`.
Ganti `[Nama Anda]`, `[NIM Anda]`, dan `[email@example.com]` dengan data asli Anda.

---

## 🌐 Cara Menjalankan

Aplikasi ini memerlukan **web server** (tidak bisa dibuka langsung sebagai file lokal karena A-Frame memerlukan HTTP).

**Cara termudah (VS Code):**
1. Install ekstensi **Live Server**
2. Klik kanan `index.html` → Open with Live Server

**Atau gunakan Python:**
```bash
cd topi-adat-dayak
python -m http.server 8080
# buka http://localhost:8080
```

**Atau deploy ke hosting** (Netlify, Vercel, GitHub Pages, dll.)

---

## 📋 Halaman

| File | Deskripsi |
|------|-----------|
| `index.html` | Splash screen (2.4 detik) → Halaman utama dengan 4 menu |
| `ar.html` | Halaman AR: kamera + face tracking + 8 topi + slider penyesuaian |
| `informasi.html` | Grid 8 topi dengan filter (Semua / Tapung / Bluko / Gender) |
| `detail-topi.html` | Detail per topi: gambar hero, gambar detail, info lengkap, navigasi prev/next |
| `panduan.html` | 8 langkah penggunaan + tips + persyaratan perangkat |
| `tentang.html` | Info aplikasi, pengembang, narasumber, teknologi, metode |

---

© 2025 · Universitas Mulawarman · Fakultas Teknik Informatika
