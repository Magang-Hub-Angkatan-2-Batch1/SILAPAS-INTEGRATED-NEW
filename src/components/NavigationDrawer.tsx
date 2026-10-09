import React, { useEffect } from 'react';
import { 
  X, 
  Home, 
  Building2, 
  Users, 
  PackageSearch, 
  FileText, 
  HardDrive,
  HelpCircle,
  PhoneCall, 
  ShieldCheck,
  KeyRound,
  Camera,
  FolderOpen,
  UserCheck,
  Lock
} from 'lucide-react';
import { AuthSession } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome: () => void;
  onOpenOfficeProfile: () => void;
  onOpenOfficialsProfile: () => void;
  onOpenBmn: () => void;
  onOpenJhp: () => void;
  onOpenPegawai: () => void;
  onOpenGDriveMenu?: () => void;
  onNavigateSosmed?: () => void;
  onNavigateKilasBalik?: () => void;
  onOpenFaq: () => void;
  isAdmin?: boolean;
  isUserLoggedIn?: boolean;
  currentUser?: AuthSession | null;
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
  onOpenGDriveMenu,
  onNavigateSosmed,
  onNavigateKilasBalik,
  onOpenFaq,
  isAdmin = false,
  isUserLoggedIn = false,
  currentUser,
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

          {/* 4. Struktur Organisasi */}
          <button
            onClick={() => {
              onOpenOfficialsProfile();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium"
          >
            <Users className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Struktur Organisasi</span>
          </button>

          <div className="my-2 border-t border-slate-800/80" />

          {/* 5. SI-BMN (Khusus User / Admin) */}
          <button
            onClick={() => {
              if (!isUserLoggedIn) {
                onOpenLogin?.();
                onClose();
                return;
              }
              onOpenBmn();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <PackageSearch className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>SI-BMN (Persediaan)</span>
            </div>
            {!isUserLoggedIn && (
              <span className="text-[9.5px] font-bold text-amber-300 bg-amber-500/15 border border-amber-400/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                <span>Kunci</span>
              </span>
            )}
          </button>

          {/* 6. JHP (Khusus User / Admin) */}
          <button
            onClick={() => {
              if (!isUserLoggedIn) {
                onOpenLogin?.();
                onClose();
                return;
              }
              onOpenJhp();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-sky-400 shrink-0" />
              <span>JHP (Jurnal Harian)</span>
            </div>
            {!isUserLoggedIn && (
              <span className="text-[9.5px] font-bold text-amber-300 bg-amber-500/15 border border-amber-400/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                <span>Kunci</span>
              </span>
            )}
          </button>

          {/* 7. Data Pegawai (Khusus User / Admin) */}
          <button
            onClick={() => {
              if (!isUserLoggedIn) {
                onOpenLogin?.();
                onClose();
                return;
              }
              if (onOpenGDriveMenu) {
                onOpenGDriveMenu();
              } else {
                onOpenPegawai();
              }
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-left font-medium cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <HardDrive className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Data Pegawai (GDrive)</span>
            </div>
            {!isUserLoggedIn ? (
              <span className="text-[9.5px] font-bold text-amber-300 bg-amber-500/15 border border-amber-400/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                <span>Kunci</span>
              </span>
            ) : (
              <FolderOpen className="w-3.5 h-3.5 text-teal-300 opacity-80" />
            )}
          </button>

          <div className="my-2 border-t border-slate-800/80" />

          {/* 8. FAQ & Bantuan */}
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
          {!isUserLoggedIn ? (
            <button
              type="button"
              onClick={() => {
                onOpenLogin?.();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Login Pegawai / Admin</span>
              </div>
              <span className="text-xs text-amber-400">&rarr;</span>
            </button>
          ) : (
            <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
              isAdmin 
                ? 'bg-amber-500/10 border-amber-400/40 text-amber-300' 
                : 'bg-emerald-500/10 border-emerald-400/40 text-emerald-300'
            }`}>
              <div className="flex items-center gap-2 min-w-0">
                {isAdmin ? <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" /> : <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />}
                <div className="min-w-0">
                  <span className="text-[11px] font-bold block leading-tight truncate">
                    {isAdmin ? 'Administrator' : 'Pegawai Lapas'}
                  </span>
                  <span className="text-[9.5px] text-slate-400 block truncate">
                    {currentUser?.email || (isAdmin ? 'Admin Aktif' : 'User Aktif')}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onLogout?.();
                  onClose();
                }}
                className="text-[11px] font-bold px-2 py-1 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors cursor-pointer shrink-0"
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
