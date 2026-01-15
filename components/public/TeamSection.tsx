const teamMembers = [
  { name: "Alsa Trianta Bastanta Sembiring", role: "Ketua", division: "Teknik Sipil, Institut Teknologi Sumatera" },
  { name: "Cornelius Pebrianta Brahmana", role: "Sekretaris Jendral", division: "Teknik Elektro, Institut Teknologi Sumatera" },
  { name: "Jesika Filosovi Br Perangin Angin", role: "Sekretaris 1", division: "Teknik Informatika, Institut Teknologi Sumatera" },
  { name: "Nadya Grasya Br Sinuhaji", role: "Sekretaris 2", division: "Teknik Biomedis, Institut Teknologi Sumatera" },
  { name: "Sukma Vinesia Br Ginting", role: "Bendahara 1", division: "Rekayasa Kehutanan, Institut Teknologi Sumatera" },
  { name: "Eirene Gita Ginting", role: "Bendahara 2", division: "Perencanaan Wilayah dan Kota, Institut Teknologi Sumatera" },
  { name: "Lim Gus Aspuri Hutabarat", role: "Kepala Divisi Acara", division: "Teknik Geologi, Institut Teknologi Sumatera"},
  { name: "Rani Pagetha Br Ginting", role: "Staff Divisi Acara", division: "Rekayasa Kehutanan, Institut Teknologi Sumatera"},
  { name: "Audy Olivya Br Gurusinga", role: "Staff Divisi Acara", division: "Teknik Informatika, Institut Teknologi Sumatera"},
  { name: "Windry Meidi E Br Tinambunan", role: "Staff Divisi Acara", division: "Teknik Pertambangan, Institut Teknologi Sumatera" },
  { name: "Asti Agustin", role: "Kepala Divisi Konsumsi", division: "Teknik Biomedis, Institut Teknologi Sumatera" },
  { name: "Tri Putri Sormin", role: "Staff Divisi Konsumsi", division: "Teknik Informatika, Institut Teknologi Sumatera" },
  { name: "Emia Hosana br Ginting", role: "Staff Divisi Konsumsi", division: "Perencanaan Wilayah dan Kota, Institut Teknologi Sumatera" },
  { name: "Putri Windari Sitohang", role: "Staff Divisi Konsumsi", division: "Rekayasa Kehutanan, Institut Teknologi Sumatera" },
  { name: "Salsabila Thahirah ", role: "Staff Divisi Konsumsi", division: "Teknik Biomedis, Institut Teknologi Sumatera" },
  { name: "Ivan Oktavianus Bangun", role: "Kepala Divisi Humas", division: "Teknik Industri, Institut Teknologi Sumatera" },
  { name: "Frandy Jonathan Ginting", role: "Staff Divisi Humas", division: "Teknik Sipil, Institut Teknologi Sumatera" },
  { name: "Elfrita Andriyanti Hutabarat", role: "Staff Divisi Humas", division: "Teknik Biomedis, Institut Teknologi Sumatera" },
  { name: "Mika Alemina Ginting", role: "Staff Divisi Humas", division: "Teknik Geologi, Institut Teknologi Sumatera" },
  { name: "Juliani Leony Putri Melati Manalu", role: "Kepala Divisi PDD", division: "Teknik Informatika, Institut Teknologi Sumatera" },
  { name: "Virgin Hillsky Br Bukit", role: "Staff Divisi PDD", division: "Perencanaan Wilayah dan Kota, Institut Teknologi Sumatera" },
  { name: "Widia Salsalina Br Singarimbun", role: "Staff Divisi PDD", division: "Teknik Informatika, Institut Teknologi Sumatera" },
  { name: "Via Cinta Simamora", role: "Staff Divisi PDD", division: "Teknik Pertambangan, Institut Teknologi Sumatera" },
  { name: "Ari trigimanta Ginting", role: "Kepala Divisi Operasional", division: "Teknik Geofisika, Institut Teknologi Sumatera" },
  { name: "Lukman Deni Pasaribu", role: "Staff Divisi Operasional", division: "Teknik Pertambangan, Institut Teknologi Sumatera" },
  { name: "Triya Wulandari", role: "Staff Divisi Operasional", division: "Teknik Biomedis, Institut Teknologi Sumatera" },
  { name: "Muhamad Rafi Ilham", role: "Staff Divisi Operasional", division: "Teknik Informatika, Institut Teknologi Sumatera" },
  { name: "Jefri wahyu Fernando Sembiring", role: "Staff Divisi Operasional", division: "Teknik Informatika, Institut Teknologi Sumatera" },
  { name: "Kevin Sebayang", role: "Staff Divisi Operasional", division: "Rekayasa Kehutanan, Institut Teknologi Sumatera" },
  { name: "Andryano Limbong", role: "Staff Divisi Operasional", division: "Teknik Informatika, Institut Teknologi Sumatera" },

]

export default function TeamSection() {
  return (
    <section id="tim" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold mb-4 block">TIM PENGABDIAN</span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Tim KKN Desa Way Kalam
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kenali para mahasiswa yang berdedikasi dalam program Kuliah Kerja Nyata (KKN) untuk membantu pengembangan desa dan memberdayakan masyarakat lokal.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{member.name}</h3>
              <p className="text-sm text-blue-600 mb-2">{member.role}</p>
              <p className="text-xs text-slate-500">{member.division}</p>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-slate-600">
          <p>30 Mahasiswa • Institut Teknologi Sumatera • Tahun 2026</p>
        </div>
      </div>
    </section>
  )
}
