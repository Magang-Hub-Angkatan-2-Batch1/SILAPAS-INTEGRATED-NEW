import React, { useEffect } from 'react';
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
  PhoneCall, 
  ShieldCheck,
  KeyRound,
  Camera
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
  onNavigateKilasBalik?: () => void;
  onOpenFaq: () => void;
  isAdmin?: boolean;
  onOpenLogin?: () => void;
  onLogout?: () => void;
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
  onNavigateKilasBalik,
  onOpenFaq,
  isAdmin = false,
  onOpenLogin,
  onLogout,
}) => {
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
      {/* Backdrop with soft blur */}
      <div 
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel - Clean, Minimalist & Spacious */}
      <div 
        className="relative w-72 max-w-[80vw] bg-[#0B192C]/95 backdrop-blur-xl text-white shadow-2xl flex flex-col z-50 border-r border-slate-700/60 animate-slide-in-left h-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header - Simple & Compact */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.jpg" 
              alt="Logo Lapas Perempuan Kelas III Pangkal Pinang"
              className="w-8 h-8 rounded-full border border-amber-400 object-cover shadow-xs shrink-0" 
            />
            <div>
              <span className="text-sm font-extrabold tracking-tight text-white block leading-tight">
                SILAPAS<span className="text-amber-400">-INTEGRATED</span>
              </span>
              <span className="text-[10px] text-slate-400 block leading-tight">
                LPP Kelas III Pangkalpinang
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup Menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items - Clean Single List */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1 text-xs sm:text-sm">
          {/* 1. Beranda */}
          <button
            onClick={() => {
              onNavigateHome();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium"
          >
            <Home className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Beranda</span>
          </button>

          {/* 2. Kilas Balik */}
          <button
            onClick={() => {
              onNavigateKilasBalik?.();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium"
          >
            <Camera className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Kilas Balik Kegiatan</span>
          </button>

          {/* 3. Profil Kantor */}
          <button
            onClick={() => {
              onOpenOfficeProfile();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium"
          >
            <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Profil Kantor</span>
          </button>

          {/* 4. Peta Jabatan */}
          <button
            onClick={() => {
              onOpenOfficialsProfile();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium"
          >
            <Users className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Peta Jabatan Organisasi</span>
          </button>

          <div className="my-2 border-t border-slate-800/80" />

          {/* 5. SI-BMN */}
          <button
            onClick={() => {
              onOpenBmn();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium"
          >
            <PackageSearch className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>SI-BMN (Persediaan)</span>
          </button>

          {/* 6. JHP */}
          <button
            onClick={() => {
              onOpenJhp();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium"
          >
            <FileText className="w-4 h-4 text-sky-400 shrink-0" />
            <span>JHP (Jurnal Harian)</span>
          </button>

          {/* 7. Data Pegawai */}
          <button
            onClick={() => {
              onOpenPegawai();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium"
          >
            <HardDrive className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Data Pegawai (GDrive)</span>
          </button>

          <div className="my-2 border-t border-slate-800/80" />

          {/* 8. Media Sosial */}
          <button
            onClick={() => {
              onNavigateSosmed();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium"
          >
            <Share2 className="w-4 h-4 text-pink-400 shrink-0" />
            <span>Media Sosial Resmi</span>
          </button>

          {/* 9. FAQ */}
          <button
            onClick={() => {
              onOpenFaq();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium"
          >
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>FAQ &amp; Bantuan</span>
          </button>
        </nav>

        {/* Drawer Footer - Clean & Uncluttered */}
        <div className="p-3 border-t border-slate-800 space-y-2 shrink-0 bg-slate-950/50">
          {!isAdmin ? (
            <button
              type="button"
              onClick={() => {
                onOpenLogin?.();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-amber-300 hover:bg-amber-400/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>Login Admin</span>
              </div>
              <span className="text-[10px] text-amber-400/80">&rarr;</span>
            </button>
          ) : (
            <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-400/30 flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-amber-300">Admin Aktif</span>
              <button
                type="button"
                onClick={() => {
                  onLogout?.();
                  onClose();
                }}
                className="text-[11px] font-bold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}

          <a
            href="https://wa.me/6281274346822?text=Halo%20Humas%20Lapas%20Perempuan%20Kelas%20III%20Pangkalpinang"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Pengaduan: 0812-7434-6822</span>
          </a>
        </div>
      </div>
    </div>
  );
};
