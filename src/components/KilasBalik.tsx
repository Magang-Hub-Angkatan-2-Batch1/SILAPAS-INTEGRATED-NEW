import React from 'react';
import { 
  Camera, 
  ExternalLink, 
  Edit3, 
  Calendar, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { KilasBalikItem } from '../types';

interface KilasBalikProps {
  items: KilasBalikItem[];
  isAdmin?: boolean;
  onEditItem?: (item: KilasBalikItem) => void;
}

export const KilasBalik: React.FC<KilasBalikProps> = ({
  items,
  isAdmin = false,
  onEditItem,
}) => {
  return (
    <section id="kilas-balik" className="scroll-mt-20 pt-2">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Sorotan Publikasi &bull; 1 Bulan Terakhir
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] flex items-center gap-2.5">
            <Camera className="w-6 h-6 text-amber-500" />
            <span>Kilas Balik Kegiatan Lapas</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Rangkuman 8 dokumentasi kegiatan pembinaan kemandirian WBP, pelayanan publik terpadu, 
            pemeriksaan kesehatan, dan penguatan kinerja pegawai Lapas Perempuan Kelas III Pangkalpinang.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            {items.length} Postingan Terpilih
          </span>
          <a
            href="https://www.instagram.com/lapasperempuanpangkalpinang?stkn=eGFlZno1ZWoxcTg2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors shadow-2xs"
          >
            <span>Instagram Resmi</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid of 8 Cards: 4 columns on large screens, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* Top Image Banner - Rasio Portrait 1080 x 1350 (4:5) */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-900 shrink-0">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

              {/* Number Badge (1 to 8) */}
              <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-black flex items-center justify-center border border-white/20 shadow-xs">
                {idx + 1}
              </div>

              {/* Category Pill */}
              <div className="absolute top-2.5 right-2.5 bg-blue-900/85 backdrop-blur-xs text-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-700/50 shadow-xs">
                {item.category}
              </div>

              {/* Aspect Ratio Tag */}
              <div className="absolute bottom-2 right-2.5 bg-black/60 backdrop-blur-xs text-slate-300 text-[9px] font-mono px-1.5 py-0.5 rounded border border-white/10">
                1080×1350
              </div>

              {/* Date Stamp */}
              <div className="absolute bottom-2 left-2.5 flex items-center gap-1 bg-slate-950/75 backdrop-blur-xs text-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/10">
                <Calendar className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate max-w-[150px]">{item.date}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-900 transition-colors leading-snug line-clamp-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                {/* External Documentation Link */}
                {item.linkUrl && (
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group/btn"
                  >
                    <span>Dokumentasi Lengkap</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-blue-700 transition-colors" />
                  </a>
                )}

                {/* Admin Edit Button */}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => onEditItem?.(item)}
                    className="w-full py-1.5 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    title="Ganti foto atau teks postingan kilas balik"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Edit Postingan</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
