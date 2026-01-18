import Navbar from "@/components/public/Navbar"
import TeamSection from "@/components/public/TeamSection"
import Footer from "@/components/public/Footer"

export const metadata = {
  title: "Tim KKN Way Kalam - Desa Wisata",
  description: "Kenali para mahasiswa yang berdedikasi dalam program Kuliah Kerja Nyata (KKN) untuk membantu pengembangan desa dan memberdayakan masyarakat lokal.",
}

export default function TimKKNPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <TeamSection />
      </div>
      <Footer />
    </div>
  )
}
