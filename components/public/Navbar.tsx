"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"


export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const linkClass = (href: string) => {
    const isActive =
      (href === "/" && pathname === "/") ||
      (href !== "/" && (pathname === href || pathname.startsWith(`${href}/`)))

    return isActive
      ? "text-blue-600 font-medium"
      : "text-slate-700 hover:text-blue-600 transition"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/Logo_Lampung_Selatan.ico" className="w-10 h-10" />
            <span className="text-xl font-bold">Way Kalam</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={linkClass("/")}>Beranda</Link>
            <Link href="/wisata" className={linkClass("/wisata")}>Wisata</Link>
            <Link href="/umkm" className={linkClass("/umkm")}>UMKM</Link>
            <Link href="/tim-kkn" className={linkClass("/tim-kkn")}>Tim KKN</Link>
            <Link
              href="https://waykalam-lamsel.desa.id/"
              target="_blank"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              SIPDesKel
            </Link>
          </div>

          {/* Burger Button (Mobile) */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-800"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="flex flex-col px-4 py-4 gap-4">
            <Link href="/" onClick={() => setOpen(false)}>Beranda</Link>
            <Link href="/wisata" onClick={() => setOpen(false)}>Wisata</Link>
            <Link href="/umkm" onClick={() => setOpen(false)}>UMKM</Link>
            <Link href="/tim-kkn" onClick={() => setOpen(false)}>Tim KKN</Link>
            <Link
              href="https://waykalam-lamsel.desa.id/"
              target="_blank"
              className="bg-blue-600 text-white text-center py-2 rounded-lg"
            >
              SIPDesKel
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
