/**
 * DATA TOPI ADAT DAYAK KENYAH
 * Ganti nilai `gambar` dengan path gambar Anda.
 * Contoh: "assets/images/topi/tapung-udeng.svg"
 */
const TOPI_DATA = [
  {
    id: 1,
    slug: "bluko-laki",
    nama: "Bluko Laki",
    hatFile: "hat7.glb",
    gambar: "assets/images/topi/bluko-laki.svg",
    gambarDetail: "assets/images/topi/bluko-laki-detail.webp",
    bahan: "Bulu burung Enggang (Terga) dan bulu kambing",
    pengguna: "Laki-laki dan perempuan",
    fungsi: "Digunakan dalam upacara adat besar, ritual resmi (pernikahan adat), dan menari",
    makna: "Melambangkan kepemimpinan. Jumlah Terga (bulu Enggang) mencerminkan status sosial: Panyen (rakyat biasa) 3–4 helai; Paren (bangsawan) 5–8 helai. Burung Enggang adalah simbol kebesaran dan kemuliaan.",
    kategori: "Bluko",
    warna: "#2C4A8C"
  },
  {
    id: 2,
    slug: "tapung-pek",
    nama: "Tapung Pek",
    hatFile: "hat5.glb",
    gambar: "assets/images/topi/tapung-pek.svg",
    gambarDetail: "assets/images/topi/tapung-pek-detail.webp",
    bahan: "Hiasan Ujap (rumbai) dan Kirip (bulu burung Enggang)",
    pengguna: "Laki-laki dan perempuan (varian perempuan dengan pola daun di belakang)",
    fungsi: "Dikenakan saat acara adat dan menari",
    makna: "Melambangkan kesederhanaan dan ketidaksempurnaan manusia. Letak Ujap mencerminkan fase kepemimpinan: Ujap depan-belakang (pemimpin aktif), Ujap hanya di belakang (sesepuh/penasihat).",
    kategori: "Tapung",
    warna: "#B8860B"
  },
  {
    id: 3,

    slug: "bluko-leto",
    nama: "Bluko Leto",
    hatFile: "hat8.glb",
    gambar: "assets/images/topi/bluko-leto.svg",
    gambarDetail: "assets/images/topi/bluko-leto-detail.webp",
    bahan: "Manik-manik dan bulu kambing",
    pengguna: "Perempuan",
    fungsi: "Digunakan dalam konteks menari dan rangkaian acara adat",
    makna: "Melambangkan kepemimpinan perempuan dalam masyarakat Dayak Kenyah. Hiasan manik-manik yang kaya mencerminkan status, kecantikan, dan peran penting perempuan dalam upacara adat.",
    kategori: "Bluko",
    warna: "#8C2C5E"
  },
  {
    id: 4,
   
     slug: "tapung-udeng",
    nama: "Tapung Udeng",
    hatFile: "hat1.glb",
    gambar: "assets/images/topi/tapung-udeng.svg",  
    gambarDetail: "assets/images/topi/tapung-udeng-detail.webp", 
    bahan: "Manik-manik dan taring macan",
    pengguna: "Perempuan",
    fungsi: "Dikenakan saat menari dan pada acara-acara adat",
    makna: "Macan melambangkan kelemahlembutan, kesetiaan, kesabaran, dan keperkasaan. Topi ini mencerminkan sifat-sifat mulia yang diharapkan dari perempuan Dayak Kenyah.",
    kategori: "Tapung",
    warna: "#8B5E3C"
  },
  {
    id: 5,
    slug: "tapung-aban",
    nama: "Tapung Aban",
    hatFile: "hat6.glb",
    gambar: "assets/images/topi/tapung-aban.svg",
    gambarDetail: "assets/images/topi/tapung-aban-detail.webp",
    bahan: "Rangkaian benang dan manik-manik",
    pengguna: "Laki-laki",
    fungsi: "Dikenakan saat acara adat dan menari",
    makna: "Melambangkan keseimbangan hidup dan persatuan: tidak terlalu longgar, tidak terlalu kaku. Filosofi ini mencerminkan cara hidup masyarakat Dayak Kenyah yang harmonis.",
    kategori: "Tapung",
    warna: "#7B5EA7"
  },
  {
    id: 6,
    
    slug: "tapung-sekeduq",
    nama: "Tapung Sekeduq",
    hatFile: "hat3.glb",
    gambar: "assets/images/topi/tapung-sekeduq.svg",
    gambarDetail: "assets/images/topi/tapung-sekeduq-detail.webp",
    bahan: "Daun pandan hutan",
    pengguna: "Perempuan berusia di atas 40 tahun",
    fungsi: "Penggunaan sehari-hari, menari, dan acara adat",
    makna: "Melambangkan kesederhanaan. Dibuat dari bahan alam yang mudah didapat, mencerminkan kearifan lokal dan keselarasan dengan alam.",
    kategori: "Tapung",
    warna: "#6B8C42"
  },
  {
    id: 7,
 slug: "tapung-uwai",
    nama: "Tapung Uwai",
    hatFile: "hat4.glb",
    gambar: "assets/images/topi/tapung-uwai.svg",
    gambarDetail: "assets/images/topi/tapung-uwai-detail.webp",
    bahan: "Rotan",
    pengguna: "Wanita muda (perempuan yang lebih tua juga dapat memakainya)",
    fungsi: "Penggunaan sehari-hari maupun acara adat",
    makna: "Melambangkan ketidaksempurnaan yang indah namun belum sempurna. Pemakai masih membutuhkan bimbingan dalam perjalanan hidup, layaknya rotan yang lentur namun terus tumbuh menguat.",
    kategori: "Tapung",
    warna: "#A0784A"
  },
  {
    id: 8,
     slug: "tapung-longe",
    nama: "Tapung Longe",
    hatFile: "hat2.glb",
    gambar: "assets/images/topi/tapung-longe.svg",
    gambarDetail: "assets/images/topi/tapung-longe-detail.webp",
    bahan: "Rangkaian manik-manik dan benang",
    pengguna: "Perempuan",
    fungsi: "Dikenakan saat menari atau pada acara adat",
    makna: "Melambangkan kesabaran dan keindahan. Rangkaian manik-manik yang indah mencerminkan kehalusan budi dan kecantikan jiwa perempuan Dayak Kenyah.",
    kategori: "Tapung",
    warna: "#C0874F"   
  }
];

// Helper: cari topi berdasarkan slug
function getTopiBySlug(slug) {
  return TOPI_DATA.find(t => t.slug === slug) || null;
}

// Helper: cari topi berdasarkan id
function getTopiById(id) {
  return TOPI_DATA.find(t => t.id === parseInt(id)) || null;
}
