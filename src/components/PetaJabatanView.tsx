import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

interface OfficerData {
  title: string;
  name: string;
  nip: string;
  initials: string;
  color: string;
}

// Data exactly matching Gambar 2 (Struktur Organisasi Lapas Perempuan Kelas III Pangkalpinang)
const KEPALA_LAPAS: OfficerData = {
  title: 'KEPALA LAPAS',
  name: 'RINA SETIARI',
  nip: '198304102003122001',
  initials: 'RS',
  color: 'from-amber-400 to-amber-600',
};

const KAUR_TU: OfficerData = {
  title: 'KAUR TU',
  name: 'EVI ASWANI',
  nip: '198404082005012001',
  initials: 'EA',
  color: 'from-blue-500 to-blue-700',
};

const SUBSEKSI_LIST: OfficerData[] = [
  {
    title: 'KEPALA SUBSEKSI ADMISI & ORIENTASI',
    name: 'AYU ANNISA PEMBER',
    nip: '199111152010122002',
    initials: 'AP',
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    title: 'KEPALA SUBSEKSI PEMBINAAN',
    name: 'MIA CAHYANI',
    nip: '198307242008012001',
    initials: 'MC',
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    title: 'KEPALA SUBSEKSI KEAMANAN & KETERTIBAN',
    name: 'YISTARATI',
    nip: '198005172005012002',
    initials: 'YS',
    color: 'from-rose-500 to-rose-700',
  },
];

// Officer Avatar SVG component representing the official uniformed female officer with hijab
const OfficerAvatar: React.FC<{ name: string }> = ({ name }) => (
  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-slate-900 bg-gradient-to-b from-sky-100 to-slate-200 shadow-sm shrink-0 flex items-center justify-center">
    <svg 
      viewBox="0 0 100 100" 
      className="w-full h-full"
      role="img"
      aria-label={`Foto Pejabat: ${name}`}
    >
      {/* Background Soft Glow */}
      <circle cx="50" cy="50" r="50" fill="#f1f5f9" />
      
      {/* Dark Hijab Background Silhouette */}
      <path 
        d="M 50 15 C 32 15 26 30 26 50 C 26 68 34 85 34 95 L 66 95 C 66 85 74 68 74 50 C 74 30 68 15 50 15 Z" 
        fill="#1e293b" 
      />

      {/* Face */}
      <ellipse cx="50" cy="46" rx="16" ry="19" fill="#fde68a" />
      
      {/* Face Shadow / Chin */}
      <path d="M 40 56 Q 50 63 60 56" stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Eyes & Eyebrows */}
      <ellipse cx="44" cy="44" rx="2" ry="1.2" fill="#0f172a" />
      <ellipse cx="56" cy="44" rx="2" ry="1.2" fill="#0f172a" />
      <path d="M 41 40 Q 44 38 47 40" stroke="#0f172a" strokeWidth="1.2" fill="none" />
      <path d="M 53 40 Q 56 38 59 40" stroke="#0f172a" strokeWidth="1.2" fill="none" />

      {/* Smile */}
      <path d="M 46 54 Q 50 57 54 54" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Hijab front wrap around chin */}
      <path 
        d="M 33 48 C 33 65 42 70 50 70 C 58 70 67 65 67 48 C 67 36 64 26 50 26 C 36 26 33 36 33 48 Z" 
        fill="none" 
        stroke="#0f172a" 
        strokeWidth="3.5" 
      />

      {/* White Official Uniform (PDH Putih Kemenkumham / Kemenimipas) */}
      <path d="M 24 95 C 24 78 36 72 50 72 C 64 72 76 78 76 95 Z" fill="#ffffff" />
      <path d="M 24 95 C 24 78 36 72 50 72 C 64 72 76 78 76 95" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />

      {/* Uniform V-collar */}
      <path d="M 43 72 L 50 82 L 57 72" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <path d="M 50 82 L 50 95" stroke="#94a3b8" strokeWidth="1" />

      {/* Gold Rank Insignia on shoulders (Tanda Pangkat Emas) */}
      <rect x="29" y="77" width="7" height="4" rx="1" fill="#f59e0b" transform="rotate(-20 29 77)" />
      <rect x="64" y="74" width="7" height="4" rx="1" fill="#f59e0b" transform="rotate(20 64 74)" />

      {/* Gold Name Tag / Lencana Dada */}
      <rect x="36" y="86" width="9" height="3" rx="0.5" fill="#1e293b" stroke="#f59e0b" strokeWidth="0.5" />
      <rect x="55" y="86" width="9" height="3" rx="0.5" fill="#f59e0b" />
    </svg>
  </div>
);

// Individual Job Box Component
const JobBox: React.FC<{ officer: OfficerData; className?: string; isCompact?: boolean }> = ({ 
  officer, 
  className = '',
  isCompact = false 
}) => (
  <div className={`flex flex-col rounded-xl overflow-hidden shadow-md border-2 border-[#0B192C] bg-white transition-transform hover:-translate-y-0.5 ${className}`}>
    {/* Dark Navy Header Title */}
    <div className="bg-[#0B192C] text-white text-center px-2 py-1.5 font-black text-[11px] sm:text-xs tracking-wider uppercase leading-tight select-none">
      {officer.title}
    </div>

    {/* Body with Avatar and Text Details */}
    <div className={`p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 bg-white ${isCompact ? 'min-h-[64px]' : 'min-h-[72px]'}`}>
      <OfficerAvatar name={officer.name} />
      
      <div className="min-w-0 flex-1 text-left">
        <h6 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight uppercase truncate">
          {officer.name}
        </h6>
        <p className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-600 tracking-tight mt-0.5">
          NIP: {officer.nip}
        </p>
      </div>
    </div>
  </div>
);

export const PetaJabatanView: React.FC = () => {
  return (
    <div className="relative w-full rounded-2xl bg-white border border-slate-300 shadow-xl overflow-hidden p-4 sm:p-6 md:p-8 select-none">
      {/* Decorative Golden Navy Ribbon Wave in Corners matching Gambar 2 */}
      {/* Top-Left Ribbon */}
      <div className="absolute top-0 left-0 w-24 h-24 sm:w-36 sm:h-36 pointer-events-none overflow-hidden z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 0 0 L 100 0 C 70 20 40 40 30 70 C 20 85 10 100 0 100 Z" fill="#0B192C" />
          <path d="M 0 15 L 85 0 C 60 18 35 38 25 68 C 15 82 5 95 0 95 Z" fill="#1E3E62" />
          <path d="M 0 25 C 25 25 45 45 35 75 C 25 90 0 100 0 100" fill="none" stroke="#D4AF37" strokeWidth="3" />
        </svg>
      </div>

      {/* Top-Right Ribbon */}
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-36 sm:h-36 pointer-events-none overflow-hidden z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 100 0 L 0 0 C 30 20 60 40 70 70 C 80 85 90 100 100 100 Z" fill="#0B192C" />
          <path d="M 100 15 L 15 0 C 40 18 65 38 75 68 C 85 82 95 95 100 95 Z" fill="#1E3E62" />
          <path d="M 100 25 C 75 25 55 45 65 75 C 75 90 100 100 100 100" fill="none" stroke="#D4AF37" strokeWidth="3" />
        </svg>
      </div>

      {/* Bottom Wave Border */}
      <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-6 bg-gradient-to-r from-[#0B192C] via-[#D4AF37] to-[#0B192C] pointer-events-none" />

      {/* Header with Official Logos & Typography matching Gambar 2 */}
      <div className="relative z-10 text-center mb-6 sm:mb-8">
        {/* Dual Logos */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
          <img 
            src="/logo.jpg" 
            alt="Logo Kementerian Imigrasi dan Pemasyarakatan" 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm"
          />
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-sm">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Title Exactly as in Poster Gambar 2 */}
        <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-[#0B192C] tracking-wide leading-tight">
          STRUKTUR ORGANISASI
        </h3>
        <p className="text-xs sm:text-sm md:text-base font-extrabold text-[#0B192C] tracking-wider mt-0.5">
          LEMBAGA PEMASYARAKATAN PEREMPUAN
        </p>
        <p className="text-xs sm:text-sm md:text-base font-extrabold text-amber-600 tracking-widest mt-0.5">
          KELAS III PANGKALPINANG
        </p>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP / TABLET TREE DIAGRAM (Exactly matching the layout in Gambar 2)   */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto hidden md:block overflow-x-auto pb-4">
        <div className="min-w-[720px]">
          {/* Row 1: KEPALA LAPAS (Top Center) */}
          <div className="flex justify-center">
            <div className="w-80">
              <JobBox officer={KEPALA_LAPAS} />
            </div>
          </div>

          {/* Vertical line from Kepala Lapas */}
          <div className="flex justify-center">
            <div className="w-1 bg-[#0B192C] h-8" />
          </div>

          {/* Row 2: Branch Line to KAUR TU (On the right) */}
          <div className="relative w-full h-24">
            {/* Main vertical trunk continuing down in center */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-[#0B192C]" />

            {/* Horizontal branch line to the right */}
            <div className="absolute left-1/2 top-10 h-1 bg-[#0B192C] w-24 sm:w-28" />

            {/* KAUR TU Box positioned to the right */}
            <div className="absolute left-[calc(50%+6rem)] sm:left-[calc(50%+7rem)] top-0 w-72">
              <JobBox officer={KAUR_TU} />
            </div>
          </div>

          {/* Vertical trunk continuing to horizontal distributor */}
          <div className="flex justify-center">
            <div className="w-1 bg-[#0B192C] h-6" />
          </div>

          {/* Horizontal Connector Line for 3 Subsections */}
          <div className="relative w-full px-12">
            {/* Main Horizontal Bar */}
            <div className="w-full h-1 bg-[#0B192C] relative">
              {/* Left drop line */}
              <div className="absolute left-[16%] top-0 w-1 h-6 bg-[#0B192C]" />
              {/* Center drop line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1 h-6 bg-[#0B192C]" />
              {/* Right drop line */}
              <div className="absolute right-[16%] top-0 w-1 h-6 bg-[#0B192C]" />
            </div>
          </div>

          {/* Row 3: 3 SUBSEKSI BOXES */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            {SUBSEKSI_LIST.map((officer, idx) => (
              <div key={idx} className="w-full">
                <JobBox officer={officer} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE RESPONSIVE TREE DIAGRAM (Tailored for vertical smartphone screens) */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex flex-col items-center w-full md:hidden space-y-2">
        {/* 1. Kepala Lapas */}
        <div className="w-full max-w-sm">
          <JobBox officer={KEPALA_LAPAS} />
        </div>

        {/* Vertical Connecting Line */}
        <div className="w-1 bg-[#0B192C] h-5" />

        {/* 2. Kaur TU */}
        <div className="w-full max-w-sm relative">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
            Tata Usaha
          </div>
          <JobBox officer={KAUR_TU} />
        </div>

        {/* Vertical Connecting Line */}
        <div className="w-1 bg-[#0B192C] h-5" />

        {/* Subseksi Divider Header */}
        <div className="w-full max-w-sm flex items-center gap-2 my-1">
          <div className="h-0.5 flex-1 bg-slate-300" />
          <span className="text-[10px] font-black uppercase text-slate-600 tracking-wider">
            Subseksi Teknis Operasional
          </span>
          <div className="h-0.5 flex-1 bg-slate-300" />
        </div>

        {/* 3. Three Subsections stacked with vertical hierarchy */}
        <div className="w-full max-w-sm space-y-3">
          {SUBSEKSI_LIST.map((officer, idx) => (
            <div key={idx} className="relative">
              <JobBox officer={officer} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Information Notice */}
      <div className="relative z-10 mt-8 pt-4 border-t border-slate-200 text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          Ditetapkan berdasarkan Struktur Baku Organisasi Satuan Kerja Pemasyarakatan &bull; Kementerian Imigrasi dan Pemasyarakatan RI
        </p>
      </div>
    </div>
  );
};
