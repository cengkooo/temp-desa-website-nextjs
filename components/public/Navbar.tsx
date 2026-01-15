"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mountain } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const linkClass = (href: string) => {
    const isActive =
      (href === "/" && pathname === "/") ||
      (href !== "/" && (pathname === href || pathname.startsWith(`${href}/`)))

    return isActive
      ? "text-blue-600 font-medium hover:text-blue-700 transition"
      : "text-slate-700 hover:text-blue-600 transition"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo_lamsel.png" alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-slate-900">Way Kalam</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={linkClass("/")}> 
              Beranda
            </Link>
            <Link href="/wisata" className={linkClass("/wisata")}>
              Wisata
            </Link>
            <Link href="/umkm" className={linkClass("/umkm")}>
              UMKM
            </Link>
            <Link 
              href="https://waykalam-lamsel.desa.id/" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition" target="_blank" rel="noopener noreferrer">
              SIPDesKel Way Kalam
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
