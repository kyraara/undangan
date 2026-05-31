export const weddingConfig = {
  groom: {
    name: "Refki Saputra",
    nameShort: "Putra",
    nameDisplay: "Ahmad Fauzi, S.T.",
    father: "Bapak H. Hendra Wijaya",
    mother: "Ibu Hj. Ratna Sari",
    childOrder: "Putra pertama",
    photo: "/images/couple/groom.png",
    bio: "\"Bersamamu, setiap hari terasa seperti puisi yang tak ingin selesai dibaca.\"",
  },
  bride: {
    name: "Fajria Ramadanty Putri",
    nameShort: "Putri",
    nameDisplay: "Siti Rahayu, S.Pd.",
    father: "Bapak H. Wahyu Pratama",
    mother: "Ibu Hj. Dewi Anggraini",
    childOrder: "Putri kedua",
    photo: "/images/couple/bride.jpg",
    bio: "\"Cinta yang baik adalah yang tumbuh perlahan, lalu mengakar dalam doa.\"",
  },
  events: [
  {
    "id": "akad",
    "title": "Akad Nikah",
    "day": "Jum'at",
    "date": "2026-07-03",
    "dateDisplay": "03 Juli 2026",
    "time": "08:00",
    "timeEnd": "10:00",
    "timeDisplay": "08:00 WIB",
    "venue": "Tobong",
    "address": "Jl. Desa Kedaton",
    "mapsUrl": "https://maps.google.com/?q=Masjid+Al-Ikhlas+Jakarta",
    "mapsEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273!2d106.819!3d-6.224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1"
  },
  {
    "id": "resepsi",
    "title": "Resepsi Pernikahan",
    "day": "Sabtu",
    "date": "2026-07-04",
    "dateDisplay": "04 Juli 2026",
    "time": "11:00",
    "timeEnd": "15:00",
    "timeDisplay": "11:00 – 15:00 WIB",
    "venue": "Tobong",
    "address": "Jl. Kedaton",
    "mapsUrl": "https://maps.google.com/?q=Hotel+Mulia+Jakarta",
    "mapsEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273!2d106.819!3d-6.224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1"
  }
],
  hashtag: "#Kyra&Nero",
  rsvpDeadline: "2026-07-05",
  rsvpDeadlineDays: 7,
  bankAccounts: [
  {
    "bank": "BCA",
    "number": "1234567890",
    "holder": "Refki Saputra"
  },
  {
    "bank": "Mandiri",
    "number": "0987654321",
    "holder": "Putri"
  }
],
  music: {
    src: "/audio/1.mp3",
    title: "A Thousand Years — Piano Cover",
    autoplay: true,
  },
  gallery: [
  {
    "src": "/images/gallery/1.jpg",
    "alt": "Prewedding di ladang bunga"
  },
  {
    "src": "/images/gallery/2.jpg",
    "alt": "Potret intim pasangan"
  },
  {
    "src": "/images/gallery/3.jpg",
    "alt": "Taman botani"
  },
  {
    "src": "/images/gallery/4.jpg",
    "alt": "Detail cincin & tangan"
  },
  {
    "src": "/images/gallery/5.jpg",
    "alt": "Bawah pelaminan bunga"
  },
  {
    "src": "/images/gallery/6.jpg",
    "alt": "Flat lay undangan"
  },
  {
    "src": "/images/gallery/7.png",
    "alt": "Foto galeri"
  }
],
  hero: {
    image: "/images/gallery/hero.jpg",
    videoMobile: "/Vidio/1.mp4",
    tagline: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri",
  },
  story: [
  {
    "year": "2019",
    "title": "Pertemuan Pertama",
    "text": "Bertemu di sebuah kafe kecil di pusat kota. Hujan turun, dan obrolan kami mengalir hingga lupa waktu."
  },
  {
    "year": "2021",
    "title": "Hubungan Resmi",
    "text": "Setelah dua tahun saling mengenal, kami memutuskan untuk melangkah bersama dalam sebuah komitmen."
  },
  {
    "year": "2025",
    "title": "Lamaran",
    "text": "Di bawah langit senja, sebuah janji disampaikan. Dengan restu kedua keluarga, kami bersiap menuju babak baru."
  },
  {
    "year": "2026",
    "title": "Hari Bahagia",
    "text": "Hari yang dinanti tiba. Dengan rahmat-Nya, kami menyempurnakan separuh agama dalam ikatan suci."
  }
],
  concept: "A",
  socialMedia: {
    groom: [
      {
        "platform": "instagram",
        "handle": "@refki.saputra",
        "url": "https://instagram.com/refki.saputra"
      }
    ],
    bride: [
      {
        "platform": "instagram",
        "handle": "@fajria.ramadanty.putri",
        "url": "https://instagram.com/fajria.ramadanty.putri"
      }
    ]
  }
} as const

export type WeddingConfig = typeof weddingConfig
