import React, { useState, useEffect } from 'react';
import { 
  X, 
  Home, 
  Building2, 
  Users, 
  PackageSearch, 
  FileText, 
  HardDrive,
  Share2, 
  HelpCircle,
  ChevronDown, 
  ChevronRight, 
  PhoneCall, 
  ShieldCheck,
  Landmark
} from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome: () => void;
  onOpenOfficeProfile: () => void;
  onOpenOfficialsProfile: () => void;
  onOpenBmn: () => void;
  onOpenJhp: () => void;
  onOpenPegawai: () => void;
  onNavigateSosmed: () => void;
  onOpenFaq: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateHome,
  onOpenOfficeProfile,
  onOpenOfficialsProfile,
  onOpenBmn,
  onOpenJhp,
  onOpenPegawai,
  onNavigateSosmed,
  onOpenFaq,
}) => {
  // Profil submenu state (expanded by default so user sees Profil Kantor & Profil Pejabat)
  const [isProfileOpen, setIsProfileOpen] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div 
        className="relative w-80 max-w-[85vw] bg-[#0B192C] text-white shadow-2xl flex flex-col z-50 border-r border-slate-700/80 animate-slide-in-left h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-b from-[#07111f] to-[#0B192C] border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="Logo Lapas Perempuan Kelas III Pangkal Pinang"
              className="w-10 h-10 rounded-full border-2 border-amber-400 object-cover shadow-sm shrink-0" 
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white">
                  SILAPAS<span className="text-amber-400">-INTEGRATED</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-300 line-clamp-1">
                LPP Kelas III Pangkal Pinang
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 text-sm">
          {/* 1. Beranda */}
          <button
            onClick={() => {
              onNavigateHome();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-slate-200 hover:text-white hover:bg-slate-800/90 transition-all text-left group"
          >
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-sky-400 group-hover:bg-blue-500/20 transition-colors">
              <Home className="w-4 h-4" />
            </div>
            <span className="flex-1">Beranda</span>
          </button>

          {/* 2. Profil (Collapsible / Submenu) */}
          <div className="rounded-xl overflow-hidden bg-slate-900/40 border border-slate-800/80">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 font-bold text-slate-200 hover:text-white hover:bg-slate-800/90 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                  <Landmark className="w-4 h-4" />
                </div>
                <span>Profil</span>
              </div>
              <div className="text-slate-400 group-hover:text-white transition-transform">
                {isProfileOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </button>

            {/* Submenu Items */}
            {isProfileOpen && (
              <div className="pl-4 pr-2 pb-2 pt-1 space-y-1 border-t border-slate-800/60 bg-[#07111f]/60">
                {/* 2a. Profil Kantor */}
                <button
                  onClick={() => {
                    onOpenOfficeProfile();
                    onClose();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-amber-300 hover:bg-slate-800/80 transition-all text-left group"
                >
                  <Building2 className="w-3.5 h-3.5 text-sky-400 group-hover:text-amber-400 shrink-0" />
                  <span>Profil Kantor</span>
                </button>

                {/* 2b. Profil Pejabat */}
                <button
                  onClick={() => {
                    onOpenOfficialsProfile();
                    onClose();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-amber-300 hover:bg-slate-800/80 transition-all text-left group"
                >
                  <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Profil Pejabat</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. SI-BMN */}
          <button
            onClick={() => {
              onOpenBmn();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-slate-200 hover:text-white hover:bg-slate-800/90 transition-all text-left group"
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <PackageSearch className="w-4 h-4" />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span>SI-BMN</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Persediaan
              </span>
            </div>
          </button>

          {/* 4. JHP (Jurnal Harian Pegawai) */}
          <button
            onClick={() => {
              onOpenJhp();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-slate-200 hover:text-white hover:bg-slate-800/90 transition-all text-left group"
          >
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-sky-400 group-hover:bg-blue-500/20 transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span>JHP (Jurnal Harian Pegawai)</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-500/30">
                SDM
              </span>
            </div>
          </button>

          {/* 5. Data Informasi Pegawai */}
          <button
            onClick={() => {
              onOpenPegawai();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-slate-200 hover:text-white hover:bg-slate-800/90 transition-all text-left group"
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <HardDrive className="w-4 h-4" />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span>Data Informasi Pegawai</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Google Drive
              </span>
            </div>
          </button>

          {/* 6. Sosial Media */}
          <button
            onClick={() => {
              onNavigateSosmed();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-slate-200 hover:text-white hover:bg-slate-800/90 transition-all text-left group"
          >
            <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 transition-colors">
              <Share2 className="w-4 h-4" />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span>Sosial Media</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Resmi
              </span>
            </div>
          </button>

          {/* 7. FAQ (Dipaling Bawah Sesuai Permintaan) */}
          <div className="pt-2">
            <button
              onClick={() => {
                onOpenFaq();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all text-left group"
            >
              <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-400 group-hover:bg-amber-400/30 transition-colors">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span>FAQ Inovasi</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Magang Hub
                </span>
              </div>
            </button>
          </div>
        </nav>

        {/* Drawer Footer Information */}
        <div className="p-4 bg-[#07111f] border-t border-slate-800 space-y-3 shrink-0">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Sistem Terintegrasi Lapas</span>
            </div>
            <p className="leading-tight">
              Kementerian Imigrasi &amp; Pemasyarakatan RI &bull; Kanwil Kep. Bangka Belitung
            </p>
          </div>

          <a
            href="https://wa.me/6281274346822?text=Halo%20Humas%20Lapas%20Perempuan%20Kelas%20III%20Pangkalpinang"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Pengaduan: 0812-7434-6822</span>
          </a>
        </div>
      </div>
    </div>
  );
};
