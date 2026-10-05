import React from 'react';
import { Search, X, Layers, Sparkles, Building, HardDrive, Share2 } from 'lucide-react';
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
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0B192C] via-[#0F2C59] to-[#1E3E62] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-700/60 shadow-inner">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Subtle gold accent glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Official Logo & Header Badges */}
        <div className="inline-flex flex-col items-center mb-5 sm:mb-6">
          <div className="relative group p-1.5 rounded-full bg-gradient-to-tr from-amber-400/40 via-blue-500/30 to-amber-300/40 shadow-xl shadow-blue-950/50 mb-2.5 sm:mb-3">
            <img
              src="/logo.jpg"
              alt="Logo Resmi Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia"
              className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#0B192C] shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute bottom-0.5 right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 border-2 border-[#0B192C] rounded-full flex items-center justify-center text-[9px] sm:text-[10px] text-white" title="Terverifikasi Resmi">
              ✓
            </span>
          </div>

          <div className="space-y-1 px-2">
            <div className="inline-block px-2.5 sm:px-3 py-1 rounded-full bg-slate-800/80 border border-amber-400/40 text-[10px] xs:text-[11px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider shadow-sm">
              Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia
            </div>
            <p className="text-[11px] xs:text-xs sm:text-sm text-slate-300 font-medium">
              Kantor Wilayah Kepulauan Bangka Belitung &bull; Lapas Perempuan Kelas III Pangkal Pinang
            </p>
          </div>
        </div>

        {/* Hero Title and Subtitle */}
        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">
            SILAPAS<span className="text-amber-400">-INTEGRATED</span>
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-sky-200 font-medium max-w-3xl mx-auto leading-relaxed">
            (Sistem Informasi Layanan Kehumasan, BMN, dan SDM Lapas)
          </p>
          <p className="text-xs sm:text-sm text-slate-300/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Pusat terpadu informasi dan gerbang akses satu pintu untuk inovasi pengelolaan Barang Milik Negara (BMN), 
            pelaporan jurnal harian SDM pegawai, serta saluran media sosial resmi publikasi pemasyarakatan.
          </p>
        </div>

        {/* Search Bar Container */}
        <div id="pencarian" className="max-w-2xl mx-auto mb-6 px-1">
          <div className="relative flex items-center bg-white rounded-xl shadow-2xl p-1.5 sm:p-2 border-2 border-slate-200/80 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/20 transition-all">
            <div className="pl-2 sm:pl-3 text-slate-400">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari inovasi BMN, form SDM, gdrive, medsos..."
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-base sm:text-sm text-slate-900 placeholder-slate-400 placeholder:text-xs sm:placeholder:text-sm bg-transparent focus:outline-none"
              aria-label="Pencarian Layanan"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 sm:p-1.5 mr-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                title="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0F2C59] hover:bg-[#1E3E62] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <span>Cari</span>
            </button>
          </div>

          {/* Quick Result Counter */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] sm:text-xs text-slate-300 px-2">
            <span>
              Menampilkan <strong className="text-white font-bold">{filteredCount}</strong> dari{' '}
              <strong className="text-white">{totalCount}</strong> link &amp; layanan
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-amber-300 hover:text-amber-200 underline font-medium"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto px-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Semua Layanan</span>
          </button>

          <button
            onClick={() => setActiveCategory('layanan')}
            className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'layanan'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
            }`}
          >
            <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Layanan &amp; Website</span>
          </button>

          <button
            onClick={() => setActiveCategory('pegawai')}
            className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'pegawai'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Data Informasi Pegawai</span>
          </button>

          <button
            onClick={() => setActiveCategory('sosmed')}
            className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'sosmed'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Media Sosial Resmi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
