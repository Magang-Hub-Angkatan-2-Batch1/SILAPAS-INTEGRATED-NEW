import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  ExternalLink, 
  HeartHandshake, 
  Send, 
  MessageSquare,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Share2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B192C] text-slate-300 border-t-4 border-amber-400">
      {/* Top Banner - Layanan Pengaduan Cepat */}
      <div className="bg-[#0F2C59] border-b border-slate-700/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30 hidden sm:block">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
                Kanal Aspirasi &amp; Pengaduan Masyarakat
              </span>
              <h3 className="text-lg font-bold text-white">
                Punya Pertanyaan atau Keluhan Layanan?
              </h3>
              <p className="text-xs text-slate-300">
                Hubungi petugas humas dan layanan pengaduan terpadu melalui WhatsApp resmi.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/6281274346822?text=Halo%20Humas%20Lapas%20Perempuan%20Kelas%20III%20Pangkalpinang,%20saya%20ingin%20berkonsultasi/mengajukan%20pengaduan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-700/30 transition-all hover:scale-105"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat WhatsApp 0812-7434-6822</span>
            <Send className="w-4 h-4 text-emerald-200" />
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Identity Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Logo Kementerian Imigrasi dan Pemasyarakatan"
                className="w-14 h-14 rounded-full border-2 border-amber-400 object-cover shadow"
              />
              <div>
                <h4 className="text-base font-extrabold text-white tracking-tight">
                  SILAPAS<span className="text-amber-400">-INTEGRATED</span>
                </h4>
                <p className="text-xs text-sky-200 font-semibold leading-tight">
                  Lapas Perempuan Kelas III Pangkal Pinang
                </p>
                <p className="text-[10px] text-slate-400">
                  Kementerian Imigrasi dan Pemasyarakatan RI
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Sistem Informasi Layanan Kehumasan, BMN, dan SDM Lapas Perempuan Kelas III Pangkal Pinang 
              mewujudkan pelayanan publik yang PASTI (Profesional, Akuntabel, Sinergi, Transparan, Inovatif).
            </p>

            {/* Social Icons Strip */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Media Sosial Resmi:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/lapasperempuanpangkalpinang?stkn=eGFlZno1ZWoxcTg2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white transition-colors"
                  title="Instagram Resmi"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/share/1Ltj6AkW4Q/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                  title="Facebook Resmi"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@lapasperempuanpangkalpinan1027?si=9cR5dRN3_dDZVK0K"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors"
                  title="YouTube Resmi"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/lpp_pkpinang1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white transition-colors"
                  title="X / Twitter Resmi"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@lapasperempuanpkp?_r=1&_t=ZS-99pAuUMCHdU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="TikTok Resmi"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Jam Layanan Publik Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-2">
              <Clock className="w-4 h-4 text-sky-400" />
              Jam Layanan Publik
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <span className="font-semibold text-slate-200">Senin - Kamis</span>
                <span className="font-mono text-amber-300 font-bold">08:00 - 15:00 WIB</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <span className="font-semibold text-slate-200">Jum'at</span>
                <span className="font-mono text-amber-300 font-bold">08:00 - 14:00 WIB</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <span className="font-semibold text-slate-200">Sabtu</span>
                <span className="font-mono text-amber-300 font-bold">08:00 - 12:00 WIB</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900/40 text-slate-400 text-[11px]">
                <span>Minggu &amp; Libur Nasional</span>
                <span className="text-rose-400 font-semibold">Tutup</span>
              </div>
            </div>
          </div>

          {/* Alamat & Kontak Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Lokasi &amp; Kontak Resmi
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 leading-relaxed">
                    Jl. Sanggul Dewa No.1, Batin Tikal, Kota Pangkal Pinang, Kepulauan Bangka Belitung, Indonesia
                  </p>
                  <a
                    href="https://maps.google.com/?q=Lapas+Perempuan+Kelas+III+Pangkalpinang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 text-[11px] font-semibold mt-1"
                  >
                    <span>Petunjuk Arah Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Layanan Pengaduan (WhatsApp):</span>
                  <a
                    href="https://wa.me/6281274346822"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-mono font-bold text-sm tracking-wide"
                  >
                    0812-7434-6822
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            Hak cipta &copy; {currentYear} <strong className="text-slate-200">Humas Lapas Perempuan Kelas III Pangkal Pinang</strong>. Seluruh hak cipta dilindungi undang-undang.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-slate-500 text-[11px]">
            <span>SILAPAS-INTEGRATED v1.0</span>
            <span>&bull;</span>
            <span className="text-amber-400/90 font-medium">Pemasyarakatan PASTI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
