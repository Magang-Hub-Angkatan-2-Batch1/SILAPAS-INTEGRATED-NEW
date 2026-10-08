import React from 'react';
import { Search, X, Layers, Building, HardDrive, Camera, ChevronDown } from 'lucide-react';
import { ServiceCategory } from '../types';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: ServiceCategory;
  setActiveCategory: (cat: ServiceCategory) => void;
  totalCount: number;
  filteredCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="relative flex-1 flex flex-col justify-between pt-2 sm:pt-6 pb-2 sm:pb-4 px-3 sm:px-6 lg:px-8 overflow-hidden w-full">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Subtle gold accent glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center w-full my-auto flex flex-col justify-center py-1 sm:py-3">
        {/* Official Logo & Header Badges */}
        <div className="inline-flex flex-col items-center mb-2.5 sm:mb-5">
          <div className="relative group p-1 sm:p-1.5 rounded-full bg-gradient-to-tr from-amber-400/40 via-blue-500/30 to-amber-300/40 shadow-xl shadow-blue-950/50 mb-1.5 sm:mb-2.5">
            <img
              src="/logo.jpg"
              alt="Logo Resmi Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia"
              className="w-14 h-14 xs:w-16 xs:h-16 sm:w-24 sm:h-24 rounded-full object-cover border-2 sm:border-4 border-[#0B192C] shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 bg-emerald-500 border-2 border-[#0B192C] rounded-full flex items-center justify-center text-[8px] sm:text-[9px] text-white font-bold" title="Terverifikasi Resmi">
              ✓
            </span>
          </div>

          <div className="space-y-0.5 sm:space-y-1 px-2">
            <div className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-800/80 border border-amber-400/40 text-[9px] xs:text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider shadow-sm">
              Kementerian Imigrasi dan Pemasyarakatan RI
            </div>
            <p className="text-[10px] xs:text-[11px] sm:text-sm text-slate-300 font-medium">
              Kanwil Kep. Bangka Belitung &bull; Lapas Perempuan Kelas III Pangkalpinang
            </p>
          </div>
        </div>

        {/* Hero Title and Subtitle */}
        <div className="space-y-0.5 sm:space-y-2 mb-3.5 sm:mb-6 px-2">
          <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">
            SILAPAS<span className="text-amber-400">-INTEGRATED</span>
          </h1>
          <p className="text-xs xs:text-sm sm:text-lg md:text-xl text-sky-200 font-semibold max-w-3xl mx-auto leading-snug">
            (Sistem Layanan Kehumasan, BMN, dan SDM Lapas)
          </p>
          <p className="text-[10px] xs:text-[11px] sm:text-sm text-slate-300/90 max-w-2xl mx-auto leading-relaxed font-normal mt-1 px-1">
            Pusat terpadu informasi dan gerbang akses satu pintu untuk inovasi pengelolaan Barang Milik Negara (BMN), 
            pelaporan jurnal harian SDM pegawai, serta dokumentasi kegiatan Lapas.
          </p>
        </div>

        {/* Search Bar Container */}
        <div id="pencarian" className="max-w-2xl mx-auto mb-2.5 sm:mb-5 px-1">
          <div className="relative flex items-center bg-white rounded-xl shadow-xl p-1 sm:p-1.5 border-2 border-slate-200/80 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/20 transition-all">
            <div className="pl-2 sm:pl-3 text-slate-400">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari inovasi BMN, form SDM, data pegawai..."
              className="w-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 placeholder:text-[11px] sm:placeholder:text-sm bg-transparent focus:outline-none"
              aria-label="Pencarian Layanan"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 sm:p-1.5 mr-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                title="Hapus pencarian"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
            <button
              type="button"
              className="px-2.5 sm:px-4 py-1 sm:py-1.5 bg-[#0F2C59] hover:bg-[#1E3E62] text-white text-[11px] sm:text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-sm shrink-0 cursor-pointer"
            >
              <span>Cari</span>
            </button>
          </div>

          {/* Quick Result Counter */}
          <div className="mt-1 sm:mt-2 flex items-center justify-between text-[10px] sm:text-xs text-slate-300 px-1.5 sm:px-2">
            <span>
              Menampilkan <strong className="text-white font-bold">{filteredCount}</strong> dari{' '}
              <strong className="text-white">{totalCount}</strong> link &amp; layanan
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-amber-300 hover:text-amber-200 underline font-medium cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-3xl mx-auto px-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
            }`}
          >
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Semua Layanan</span>
          </button>

          <button
            onClick={() => setActiveCategory('layanan')}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'layanan'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-bold'
                : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
            }`}
          >
            <Building className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Layanan &amp; Web</span>
          </button>

          <button
            onClick={() => setActiveCategory('pegawai')}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'pegawai'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-bold'
                : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
            }`}
          >
            <HardDrive className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Data Pegawai</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('kilas-balik');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/35 cursor-pointer shadow-2xs"
          >
            <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span>Kilas Balik</span>
          </button>
        </div>
      </div>

      {/* Subtle Bottom Scroll Prompt for Full-Screen Landing */}
      <div className="pt-1 sm:pt-3 pb-1 flex flex-col items-center justify-center text-slate-400 select-none shrink-0">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('layanan-lapas') || document.getElementById('data-pegawai');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex flex-col items-center gap-0.5 text-[10px] sm:text-xs font-semibold text-sky-200/90 hover:text-amber-300 transition-colors cursor-pointer"
          aria-label="Gulir ke Layanan Lapas"
        >
          <span className="tracking-widest uppercase text-[9px] sm:text-[10px] text-sky-300/90 group-hover:text-amber-300">
            Jelajahi Layanan
          </span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-bounce" />
        </button>
      </div>
    </div>
  );
};
