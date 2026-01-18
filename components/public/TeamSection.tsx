"use client"

import Image from "next/image"
import { useState } from "react"

type TeamMember = {
  name: string
  role: string
  division: string
  image?: string
}

const teamMembers = [
  {
    name: "Alsa Trianta Bastanta Sembiring",
    role: "Ketua",
    division: "Teknik Sipil, Institut Teknologi Sumatera",
    image: "/Personil/alsaa.jpg",
  },
  {
    name: "Cornelius Pebrianta Brahmana",
    role: "Sekretaris Jendral",
    division: "Teknik Elektro, Institut Teknologi Sumatera",
    image: "/Personil/cornell.jpg",
  },
  {
    name: "Jesika Filosovi Br Perangin Angin",
    role: "Sekretaris 1",
    division: "Teknik Informatika, Institut Teknologi Sumatera",
    image: "/Personil/jesii.jpg",
  },
  {
    name: "Nadya Grasya Br Sinuhaji",
    role: "Sekretaris 2",
    division: "Teknik Biomedis, Institut Teknologi Sumatera",
    image: "/Personil/nadyaa.jpg",
  },
  {
    name: "Sukma Vinesia Br Ginting",
    role: "Bendahara 1",
    division: "Rekayasa Kehutanan, Institut Teknologi Sumatera",
    image: "/Personil/sukmaa.jpg",
  },
  {
    name: "Eirene Gita Ginting",
    role: "Bendahara 2",
    division: "Perencanaan Wilayah dan Kota, Institut Teknologi Sumatera",
    image: "/Personil/eirenn.jpg",
  },
  {
    name: "Lim Gus Aspuri Hutabarat",
    role: "Kepala Divisi Acara",
    division: "Teknik Geologi, Institut Teknologi Sumatera",
    image: "/Personil/limguss.jpg",
  },
  {
    name: "Rani Pagetha Br Ginting",
    role: "Staff Divisi Acara",
    division: "Rekayasa Kehutanan, Institut Teknologi Sumatera",
    image: "/Personil/ranii.jpg",
  },
  {
    name: "Audy Olivya Br Gurusinga",
    role: "Staff Divisi Acara",
    division: "Teknik Informatika, Institut Teknologi Sumatera",
    image: "/Personil/audyy.jpg",
  },
  {
    name: "Windry Meidi E Br Tinambunan",
    role: "Staff Divisi Acara",
    division: "Teknik Pertambangan, Institut Teknologi Sumatera",
    image: "/Personil/windryy.jpg",
  },
  {
    name: "Asti Agustin",
    role: "Kepala Divisi Konsumsi",
    division: "Teknik Biomedis, Institut Teknologi Sumatera",
    image: "/Personil/astii.jpg",
  },
  {
    name: "Tri Putri Sormin",
    role: "Staff Divisi Konsumsi",
    division: "Teknik Informatika, Institut Teknologi Sumatera",
    image: "/Personil/sorminn.jpg",
  },
  {
    name: "Emia Hosana br Ginting",
    role: "Staff Divisi Konsumsi",
    division: "Perencanaan Wilayah dan Kota, Institut Teknologi Sumatera",
    image: "/Personil/emiaa.jpg",
  },
  {
    name: "Putri Windari Sitohang",
    role: "Staff Divisi Konsumsi",
    division: "Rekayasa Kehutanan, Institut Teknologi Sumatera",
    image: "/Personil/putrii.jpg",
  },
  {
    name: "Salsabila Thahirah",
    role: "Staff Divisi Konsumsi",
    division: "Teknik Biomedis, Institut Teknologi Sumatera",
    image: "/Personil/salsabilaa.jpg",
  },
  {
    name: "Ivan Oktavianus Bangun",
    role: "Kepala Divisi Humas",
    division: "Teknik Industri, Institut Teknologi Sumatera",
    image: "/Personil/ivann.jpg",
  },
  {
    name: "Frandy Jonathan Ginting",
    role: "Staff Divisi Humas",
    division: "Teknik Sipil, Institut Teknologi Sumatera",
    image: "/Personil/natann.jpg",
  },
  {
    name: "Elfrita Andriyanti Hutabarat",
    role: "Staff Divisi Humas",
    division: "Teknik Biomedis, Institut Teknologi Sumatera",
    image: "/Personil/elfritaa.jpg",
  },
  {
    name: "Mika Alemina Ginting",
    role: "Staff Divisi Humas",
    division: "Teknik Geologi, Institut Teknologi Sumatera",
    image: "/Personil/mikaa.jpg",
  },
  {
    name: "Juliani Leony Putri Melati Manalu",
    role: "Kepala Divisi PDD",
    division: "Teknik Informatika, Institut Teknologi Sumatera",
    image: "/Personil/leonyy.jpg",
  },
  {
    name: "Virgin Hillsky Br Bukit",
    role: "Staff Divisi PDD",
    division: "Perencanaan Wilayah dan Kota, Institut Teknologi Sumatera",
    image: "/personil/virginn.jpg",
  },
  {
    name: "Widia Salsalina Br Singarimbun",
    role: "Staff Divisi PDD",
    division: "Teknik Informatika, Institut Teknologi Sumatera",
    image: "/Personil/widiaa.jpg",
  },
  {
    name: "Via Cinta Simamora",
    role: "Staff Divisi PDD",
    division: "Teknik Pertambangan, Institut Teknologi Sumatera",
    image: "/Personil/viaa.jpg",
  },
  {
    name: "Ari Trigimanta Ginting",
    role: "Kepala Divisi Operasional",
    division: "Teknik Geofisika, Institut Teknologi Sumatera",
    image: "/Personil/arii.jpg",
  },
  {
    name: "Lukman Deni Pasaribu",
    role: "Staff Divisi Operasional",
    division: "Teknik Pertambangan, Institut Teknologi Sumatera",
    image: "/Personil/lukemann.jpg",
  },
  {
    name: "Triya Wulandari",
    role: "Staff Divisi Operasional",
    division: "Teknik Biomedis, Institut Teknologi Sumatera",
    image: "/Personil/triyaa.jpg",
  },
  {
    name: "Muhamad Rafi Ilham",
    role: "Staff Divisi Operasional",
    division: "Teknik Informatika, Institut Teknologi Sumatera",
    image: "/Personil/rapii.jpg",
  },
  {
    name: "Jefri Wahyu Fernando Sembiring",
    role: "Staff Divisi Operasional",
    division: "Teknik Informatika, Institut Teknologi Sumatera",
    image: "/Personil/jeptoll.jpg",
  },
  {
    name: "Kevin Sebayang",
    role: "Staff Divisi Operasional",
    division: "Rekayasa Kehutanan, Institut Teknologi Sumatera",
    image: "/Personil/kevinn.jpg",
  },
  {
    name: "Andryano Shevchenko Limbong",
    role: "Staff Divisi Operasional",
    division: "Teknik Informatika, Institut Teknologi Sumatera",
    image: "/Personil/andryanoo.jpg",
  },
]


/* ===== Utils: Auto Avatar Color ===== */
function getAvatarColor(name: string) {
  const colors = [
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-emerald-400 to-emerald-600",
    "from-pink-400 to-pink-600",
    "from-indigo-400 to-indigo-600",
  ]

  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}

/* ===== Avatar Component ===== */
function Avatar({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false)
  const gradient = getAvatarColor(member.name)

  return (
    <div className="relative w-20 h-20 mx-auto mb-4 group">
      {member.image && !imgError ? (
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="80px"
          className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient}
          flex items-center justify-center text-white text-2xl font-bold`}
        >
          {member.name.charAt(0)}
        </div>
      )}

      {/* Hover Ring */}
      <div className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-blue-400 transition"></div>
    </div>
  )
}

export default function TeamSection() {
  return (
    <section id="tim" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold block mb-3">
            TIM PENGABDIAN
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Tim KKN Desa Way Kalam
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Mahasiswa yang berdedikasi untuk pengabdian dan pemberdayaan masyarakat desa.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center
              shadow-sm hover:shadow-xl hover:-translate-y-2
              transition-all duration-300"
            >
              <Avatar member={member} />

              <h3 className="font-semibold text-slate-900 mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-blue-600 mb-2">
                {member.role}
              </p>
              <p className="text-xs text-slate-500">
                {member.division}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-600">
          <p>30 Mahasiswa • Institut Teknologi Sumatera • Tahun 2026</p>
        </div>

      </div>
    </section>
  )
}
