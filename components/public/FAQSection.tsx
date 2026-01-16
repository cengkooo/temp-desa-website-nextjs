"use client"

import { ChevronDown, HelpCircle } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "Bagaimana cara memesan penginapan di desa wisata?",
    answer: "Anda dapat memesan penginapan melalui website kami dengan mengklik tombol 'Hubungi Kami' atau menghubungi langsung via WhatsApp. Kami akan membantu Anda memilih akomodasi yang sesuai dengan kebutuhan dan budget Anda."
  },
  {
    question: "Apakah tersedia tour guide berbahasa Inggris?",
    answer: "Ya, kami menyediakan tour guide yang dapat berbahasa Inggris untuk membantu wisatawan asing. Mohon informasikan kebutuhan ini saat melakukan reservasi, minimal 3 hari sebelum kedatangan."
  },
  {
    question: "Berapa lama waktu ideal untuk berkunjung ke desa wisata?",
    answer: "Kami merekomendasikan minimal 2-3 hari untuk dapat menikmati semua aktivitas dan destinasi wisata di desa kami. Namun, kunjungan 1 hari pun tetap dapat memberikan pengalaman yang berkesan."
  },
  {
    question: "Apakah desa wisata cocok untuk dikunjungi bersama anak-anak?",
    answer: "Sangat cocok! Desa wisata kami memiliki berbagai aktivitas yang ramah keluarga dan aman untuk anak-anak, seperti berkebun, berinteraksi dengan hewan ternak, dan belajar kerajinan tradisional."
  },
  {
    question: "Bagaimana dengan fasilitas kesehatan dan keamanan?",
    answer: "Desa kami memiliki pos kesehatan (Puskesmas) yang beroperasi 24 jam dan petugas keamanan yang siaga. Untuk kasus darurat, rumah sakit terdekat dapat dijangkau dalam waktu 20 menit."
  },
  {
    question: "Apakah tersedia jaringan internet dan sinyal telepon?",
    answer: "Ya, tersedia sinyal telepon dari provider utama dan WiFi di area penginapan utama. Namun di beberapa spot wisata terpencil, sinyal mungkin terbatas - ini memberi kesempatan untuk digital detox!"
  },
  {
    question: "Metode pembayaran apa saja yang diterima?",
    answer: "Kami menerima pembayaran tunai, transfer bank, e-wallet (GoPay, OVO, Dana), dan QRIS. Untuk pemesanan paket wisata, tersedia opsi pembayaran dengan uang muka (DP) 30%."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-4 block flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Temukan jawaban untuk pertanyaan umum tentang desa wisata kami
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Masih Ada Pertanyaan?
          </h3>
          <p className="text-slate-600 mb-6">
            Tim kami siap membantu Anda dengan pertanyaan atau kebutuhan khusus lainnya
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  )
}
