import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react"

const relatedLinks = [
  { name: "e-Prodskel", logo: "/prodeskel.png", href: "https://prodeskel.binapemdes.kemendagri.go.id/app_Login/" },
  { name: "SID Kemendesa", logo: "/SID.png", href: "https://sid.kemendesa.go.id/" },
  { name: "BUMDes", logo: "/Bumdes.png", href: "https://bumdes.kemendesa.go.id/" },
  { name: "Desaku Maju", logo: "/Logo_Desaku_Maju_128.png", href: "#" },
]

const socialMedia = [
  {
    href: "https://web.facebook.com/deswita.waykalam?_rdc=1&_rdr#",
    icon: Facebook,
    hover: "hover:text-blue-700",
  },
  {
    href: "https://www.instagram.com/airterjun_waykalam/",
    icon: Instagram,
    hover: "hover:text-pink-600",
  },
  {
    href: "https://www.youtube.com/@WAYKALAMTVOFFICIAL",
    icon: Youtube,
    hover: "hover:text-red-600",
  },

]


export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white">


      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">


        <div>
          <h3 className="font-semibold mb-4 border-b border-white/40 pb-2">
            Link Terkait
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {relatedLinks.map((item, i) => (
              <Link
                  key={i}
                  href={item.href}
                  className="bg-white text-blue-700 rounded-lg p-4 flex flex-col items-center hover:shadow-md transition"
                >
                  {/* LOGO WRAPPER */}
                  <div className="w-16 h-16 flex items-center justify-center">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>

                  <span className="text-xs mt-3 text-center font-medium">
                    {item.name}
                  </span>
              </Link>

            ))}
          </div>
        </div>

        {/* HUBUNGI KAMI */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-white/40 pb-2">
            Hubungi Kami
          </h3>

          <div className="flex gap-3 mb-4">
            <Image
              src="/Logo_Lampung_Selatan.png"
              alt="Logo Desa"
              width={55}
              height={55}
            />
            <div className="text-sm">
              <p className="font-semibold">Desa Way Kalam</p>
              <p className="opacity-90 leading-relaxed">
                Kec. Penengahan<br />
                Kab. Lampung Selatan<br />
                Provinsi Lampung
              </p>
            </div>
          </div>

          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <Phone size={16} /> 0823-7282-5801
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> pemdeswaykalam@gmail.com
            </li>
          </ul>

            <div className="flex gap-3 mt-4">
              {socialMedia.map((item, i) => {
                const Icon = item.icon
                return (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-white/20 rounded-md hover:bg-white ${item.hover} transition`}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>

        </div>

        {/* LOKASI BALAI DESA */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-white/40 pb-2">
            Lokasi Balai Desa
          </h3>
          <div className="overflow-hidden rounded-lg border border-white/30">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d417.25847504504753!2d105.66362837395172!3d-5.7628348460259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e410de67c7d2147%3A0x2690919fb5482f1b!2sBALAI%20DESA%20WA%20KALAM!5e0!3m2!1sid!2sid!4v1768723776430!5m2!1sid!2sid"
              width="100%"
              height="220"
              loading="lazy"
            />
          </div>
        </div>

      </div>

      {/* ===== FOOTER BAWAH ===== */}
      <div className="border-t border-white/30 py-6 text-center px-4 text-sm">
        <p className="font-medium">
          Portal Resmi Sistem Informasi Pemerintahan Desa
        </p>
        <p className="opacity-90">
          Desa Way Kalam, Kecamatan Penengahan, Kabupaten Lampung Selatan
        </p>

        
        <p className="mt-4 opacity-70">
          © 2026 • Dikembangkan oleh Tim KKN
        </p>
      </div>
    </footer>
  )
}
