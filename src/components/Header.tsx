import React from 'react';
import { 
  Menu,
  PhoneCall, 
  Clock, 
  Building2, 
  ShieldCheck,
  KeyRound,
  UserCheck,
  LogOut
} from 'lucide-react';
import { AuthSession } from '../types';

interface HeaderProps {
  onOpenMenu: () => void;
  onScrollToSearch: () => void;
  isAdmin?: boolean;
  isUserLoggedIn?: boolean;
  currentUser?: AuthSession | null;
  onOpenLogin?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenMenu, 
  onScrollToSearch,
  isAdmin = false,
  isUserLoggedIn = false,
  currentUser,
  onOpenLogin,
  onLogout,
}) => {
  // Simple check for Indonesian public office hours (WIB is UTC+7)
  const [currentWibTime, setCurrentWibTime] = React.useState<string>('');
  const [isOpenNow, setIsOpenNow] = React.useState<boolean>(false);

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Get UTC time and add 7 hours for WIB
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const wibDate = new Date(utc + 3600000 * 7);
      
      const hours = wibDate.getHours();
      const minutes = wibDate.getMinutes();
      const day = wibDate.getDay(); // 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat

      const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} WIB`;
      setCurrentWibTime(timeStr);

      // Senin - Kamis: 08:00 - 15:00
      // Jumat: 08:00 - 14:00
      // Sabtu: 08:00 - 12:00
      let open = false;
      const totalMinutes = hours * 60 + minutes;

      if (day >= 1 && day <= 4) {
        open = totalMinutes >= 8 * 60 && totalMinutes < 15 * 60;
      } else if (day === 5) {
        open = totalMinutes >= 8 * 60 && totalMinutes < 14 * 60;
      } else if (day === 6) {
        open = totalMinutes >= 8 * 60 && totalMinutes < 12 * 60;
      }
      setIsOpenNow(open);
    };

    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full bg-[#0B192C] text-white sticky top-0 z-40 shadow-md border-b border-slate-800 shrink-0">
      {/* Top Banner Bar */}
      <div className="bg-[#07111f] border-b border-slate-800/80 px-2.5 sm:px-4 py-1.5 text-[10px] sm:text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 font-bold text-amber-400 tracking-wide text-[10px] sm:text-xs">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>PORTAL RESMI</span>
              <span className="hidden sm:inline">PEMERINTAHAN</span>
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline text-slate-300">
              Lapas Perempuan Kelas III Pangkal Pinang
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-slate-300 shrink-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400 shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs">{currentWibTime || 'WIB'}</span>
              <span 
                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                  isOpenNow 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {isOpenNow ? 'Buka' : 'Tutup'}
              </span>
            </div>

            <a
              href="https://wa.me/6281274346822?text=Halo%20Humas%20Lapas%20Perempuan%20Kelas%20III%20Pangkalpinang,%20saya%20ingin%20berkonsultasi/mengajukan%20pengaduan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors hidden md:flex items-center gap-1 text-[11px]"
              title="Hubungi Layanan Pengaduan WhatsApp"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>0812-7434-6822</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left: Hamburger Button & Brand Identity */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-1 sm:mr-3 overflow-hidden">
          {/* Hamburger Menu Button */}
          <button
            type="button"
            onClick={onOpenMenu}
            className="p-1.5 sm:p-2 text-slate-200 hover:text-amber-300 bg-slate-800/80 hover:bg-slate-700/90 active:bg-slate-900 border border-slate-700 rounded-xl transition-all flex items-center justify-center shrink-0 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            aria-label="Buka Menu Navigasi"
            title="Menu Navigasi SILAPAS"
          >
            <Menu className="w-5 h-5 text-amber-400" />
          </button>

          <img 
            src="/logo.jpg" 
            alt="Logo Kementerian Imigrasi dan Pemasyarakatan" 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-amber-400/80 shadow-xs shrink-0"
          />
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base md:text-xl font-extrabold tracking-tight text-white truncate leading-tight">
                <span>SILAPAS</span><span className="text-amber-400">-INTEGRATED</span>
              </h1>
              <span className="bg-blue-900/60 text-blue-300 border border-blue-700/50 text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider hidden lg:inline-block shrink-0">
                Hub Informasi
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-300 truncate leading-tight mt-0.5 font-medium">
              Lapas Perempuan Kelas III Pangkalpinang
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onScrollToSearch}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-sky-400" />
            Cari Layanan
          </button>

          {/* User / Admin Authentication State Button */}
          {!isUserLoggedIn ? (
            <button
              type="button"
              onClick={onOpenLogin}
              className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 rounded-xl transition-all cursor-pointer shadow-2xs"
              title="Login Pegawai / Administrator Lapas"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Login <span className="hidden xs:inline">Pegawai</span></span>
            </button>
          ) : (
            <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-800/80 border border-slate-700 p-0.5 sm:px-2 sm:py-1 rounded-xl">
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                isAdmin 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {isAdmin ? <ShieldCheck className="w-3 h-3 text-amber-400" /> : <UserCheck className="w-3 h-3 text-emerald-400" />}
                <span className="max-w-[70px] sm:max-w-[100px] truncate">
                  {isAdmin ? 'Admin' : 'Pegawai'}
                </span>
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="p-1 sm:px-1.5 text-[10px] text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                title="Keluar / Logout"
                aria-label="Logout"
              >
                <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          )}

          {/* Call / Pengaduan Button (Clean and compact, no overlap on mobile) */}
          <a
            href="https://wa.me/6281274346822?text=Halo%20Lapas%20Perempuan%20Pangkal%20Pinang,%20saya%20ingin%20memperoleh%20informasi%20layanan."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 p-2 sm:px-3.5 sm:py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-xs transition-all hover:shadow shrink-0"
            title="Panggilan & Pengaduan WhatsApp Lapas: 0812-7434-6822"
            aria-label="Panggilan Pengaduan WhatsApp"
          >
            <PhoneCall className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Pengaduan</span>
          </a>
        </div>
      </div>
    </header>
  );
};
