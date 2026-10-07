import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  ExternalLink, 
  Edit3, 
  Calendar, 
  Sparkles,
  ArrowUpRight,
  Loader2,
  ImageOff
} from 'lucide-react';
import { KilasBalikItem } from '../types';

interface KilasBalikProps {
  items: KilasBalikItem[];
  isAdmin?: boolean;
  isLoading?: boolean;
  onEditItem?: (item: KilasBalikItem) => void;
}

// Dedicated Skeleton Loading Animation component for KilasBalik images preventing layout shift
export const KilasBalikImageSkeleton: React.FC<{
  idx?: number;
  category?: string;
  label?: string;
}> = ({ idx, category, label = 'Memuat Foto dari Supabase...' }) => {
  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-950 shrink-0 select-none flex flex-col items-center justify-center p-4 text-center">
      {/* 1. Deep blue-gold gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070F2B] via-[#0B192C] to-[#1B1A55]" />
      
      {/* 2. Soft golden radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.18),transparent_70%)] animate-pulse" />

      {/* 3. Smooth animated shimmer sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />

      {/* Number Badge if idx is present */}
      {idx !== undefined && (
        <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-slate-950/80 backdrop-blur-xs text-amber-300 text-[11px] font-black flex items-center justify-center border border-amber-400/30 shadow-xs z-20">
          {idx + 1}
        </div>
      )}

      {/* Category Pill if category is present */}
      {category && (
        <div className="absolute top-2.5 right-2.5 bg-blue-900/85 backdrop-blur-xs text-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-700/50 shadow-xs z-20">
          {category}
        </div>
      )}

      {/* 4. Center Camera Icon with Golden Rotating Spinner */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative w-14 h-14 flex items-center justify-center mb-3">
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 border-t-amber-400 border-r-amber-400/60 animate-spin" />
          <div className="w-10 h-10 rounded-full bg-slate-900/90 border border-amber-400/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <Camera className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Loading label */}
        <div className="flex items-center justify-center gap-1.5 text-amber-300 font-bold text-xs tracking-wide">
          <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>{label}</span>
        </div>

        <span className="text-[10px] text-sky-200/80 mt-1 font-medium">
          Sinkronisasi gambar cloud
        </span>
      </div>

      {/* 5. Bottom shimmer progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 overflow-hidden z-20">
        <div className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 animate-[shimmer_1.5s_infinite] w-full" />
      </div>
    </div>
  );
};

// Sub-component for individual card image with animated skeleton loading state
const KilasBalikCardImage: React.FC<{
  imageUrl: string;
  title: string;
  idx: number;
  category: string;
  isParentLoading?: boolean;
  isFromCloud?: boolean;
}> = ({ imageUrl, title, idx, category, isParentLoading = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // When imageUrl changes (e.g. Supabase data resolves), reset loaded state
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [imageUrl]);

  const showSkeleton = (!isLoaded || isParentLoading) && !hasError;

  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-950 shrink-0 select-none">
      {/* 1. Skeleton Loading Animation in place of image preventing layout shift */}
      {showSkeleton && (
        <div className="absolute inset-0 z-10">
          <KilasBalikImageSkeleton idx={idx} category={category} label="Memuat Foto dari Supabase..." />
        </div>
      )}

      {/* 2. Error Fallback State if image link fails or not found */}
      {hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900 p-4 text-center text-slate-400">
          <div className="p-3 rounded-2xl bg-slate-800 text-slate-500 mb-2">
            <ImageOff className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-300">Foto Belum Tersedia</span>
          <span className="text-[10px] text-slate-500 mt-0.5">Admin dapat mengunggah foto baru</span>
        </div>
      )}

      {/* 3. Actual Image (Only rendered visibly when fully loaded from server/Supabase) */}
      <img
        src={imageUrl}
        alt={title}
        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${
          isLoaded && !isParentLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25 pointer-events-none" />

      {/* Number Badge (1 to 8) */}
      <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-black flex items-center justify-center border border-white/20 shadow-xs z-20">
        {idx + 1}
      </div>

      {/* Category Pill */}
      <div className="absolute top-2.5 right-2.5 bg-blue-900/85 backdrop-blur-xs text-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-700/50 shadow-xs z-20">
        {category}
      </div>
    </div>
  );
};

// Skeleton Card component with exact 4:5 aspect ratio preventing layout shift
export const KilasBalikCardSkeleton: React.FC<{ idx: number }> = ({ idx }) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Image Skeleton - exact aspect ratio (4:5) */}
      <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#070F2B] via-[#0B192C] to-[#1E293B] overflow-hidden flex flex-col items-center justify-center p-4">
        {/* Shimmer sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]" />
        
        {/* Number Badge Skeleton */}
        <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-slate-800/90 border border-slate-700 text-slate-400 text-[11px] font-bold flex items-center justify-center z-10">
          {idx + 1}
        </div>

        {/* Category Pill Skeleton */}
        <div className="absolute top-2.5 right-2.5 w-20 h-5 bg-slate-800/80 rounded-md border border-slate-700/50 z-10 animate-pulse" />

        {/* Center Icon & Pulse */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-slate-800/90 border border-amber-400/25 flex items-center justify-center mb-2.5 shadow-lg">
            <Camera className="w-5 h-5 text-amber-400/70 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5 text-amber-300/80 text-[11px] font-bold">
            <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
            <span>Memuat dari Supabase...</span>
          </div>
          <div className="w-24 h-2 bg-slate-800 rounded-full mt-2 animate-pulse" />
        </div>

        {/* Bottom Shimmer Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
          <div className="h-full bg-amber-400/40 w-full animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>

      {/* Card Body Skeleton */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title skeleton */}
          <div className="h-4 bg-slate-200 rounded-md w-11/12 mb-2 animate-pulse" />
          <div className="h-4 bg-slate-200 rounded-md w-3/4 mb-3 animate-pulse" />

          {/* Description skeleton */}
          <div className="space-y-1.5">
            <div className="h-3 bg-slate-100 rounded w-full animate-pulse" />
            <div className="h-3 bg-slate-100 rounded w-5/6 animate-pulse" />
            <div className="h-3 bg-slate-100 rounded w-2/3 animate-pulse" />
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="pt-3 border-t border-slate-100">
          <div className="h-8 bg-slate-100 rounded-lg w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export const KilasBalik: React.FC<KilasBalikProps> = ({
  items,
  isAdmin = false,
  isLoading = false,
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
          {isLoading ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 shadow-2xs animate-pulse">
              <Loader2 className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>Memuat dari Supabase...</span>
            </span>
          ) : (
            <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              {items.length} Postingan Terpilih
            </span>
          )}
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
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <KilasBalikCardSkeleton key={`skeleton-${idx}`} idx={idx} />
          ))
        ) : (
          items.map((item, idx) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Top Image Banner with Loading State */}
              <KilasBalikCardImage
                imageUrl={item.imageUrl}
                title={item.title}
                idx={idx}
                category={item.category}
                isParentLoading={isLoading}
                isFromCloud={item.isFromCloud}
              />

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
        ))
      )}
    </div>
  </section>
);
};
