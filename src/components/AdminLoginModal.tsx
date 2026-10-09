import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound,
  UserCheck,
  Shield,
  Database,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { 
  saveStoredAuthSession, 
  authenticateUserWithCloud,
  isSupabaseConfigured,
  SUPABASE_SQL_SCHEMA
} from '../lib/supabase';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: 'user' | 'admin', email: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSqlHelp, setShowSqlHelp] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Reset fields whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setErrorMsg('');
      setIsSuccess(false);
      setIsSubmitting(false);
      setShowSqlHelp(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Silakan masukkan alamat email yang valid.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await authenticateUserWithCloud(email, password, selectedRole);
      if (result.success && result.role) {
        setIsSuccess(true);
        const resolvedRole = result.role;
        saveStoredAuthSession({
          email: email.trim(),
          role: resolvedRole,
          name: result.name || (resolvedRole === 'admin' ? 'Administrator Lapas' : 'Pegawai Lapas'),
          loginTime: new Date().toISOString(),
        });

        setTimeout(() => {
          setIsSuccess(false);
          setIsSubmitting(false);
          onLoginSuccess(resolvedRole, email.trim());
          onClose();
        }, 600);
      } else {
        setIsSubmitting(false);
        setErrorMsg(result.error || 'Autentikasi gagal. Silakan periksa kembali data Anda.');
      }
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Terjadi kendala saat memverifikasi kredensial.');
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-slide-in-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#0F2C59] to-[#1E3E62] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-amber-400/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight text-white uppercase flex items-center gap-1.5">
                <span>LOGIN PORTAL SILAPAS</span>
              </h3>
              <p className="text-[11px] text-sky-200">
                Akses Layanan &amp; Repositori Data Pegawai Lapas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup Login"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Switcher Tabs */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('user');
              setErrorMsg('');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              selectedRole === 'user'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>1. Pegawai (User)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole('admin');
              setErrorMsg('');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              selectedRole === 'admin'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>2. Administrator</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {selectedRole === 'user' ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-950">
              <UserCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Mode Pengguna Pegawai:</strong>
                <span>Membuka akses penuh ke Layanan &amp; Website Lapas serta Google Drive Data Pegawai (Hanya Akses Tautan, tanpa izin edit).</span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2.5 text-xs text-blue-950">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Mode Administrator:</strong>
                <span>Izin penuh untuk mengedit tautan layanan, mengubah struktur &amp; logo, menambah/mengurangi opsi Google Drive, dan mengelola kilas balik.</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-700 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                Login berhasil! Masuk sebagai {selectedRole === 'admin' ? 'Administrator' : 'Pegawai'}...
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alamat Email {selectedRole === 'admin' ? 'Administrator' : 'Pegawai'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedRole === 'admin' ? 'Masukkan email admin Anda' : 'Masukkan email pegawai Anda'}
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all placeholder:text-slate-400 placeholder:text-xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={selectedRole === 'admin' ? 'Masukkan kata sandi administrator' : 'Masukkan kata sandi pegawai'}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all placeholder:text-slate-400 placeholder:text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {selectedRole === 'admin' 
                  ? 'Gunakan kata sandi administrator SILAPAS'
                  : 'Kata sandi pegawai Lapas (Bawaan: pegawai123 atau lapas3pkp)'}
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSuccess || isSubmitting}
                className={`w-full py-2.5 px-4 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 ${
                  selectedRole === 'admin'
                    ? 'bg-[#0B192C] hover:bg-[#1E3E62] shadow-blue-950/20'
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? 'Memverifikasi...'
                    : isSuccess 
                      ? 'Berhasil Masuk!' 
                      : selectedRole === 'admin' 
                        ? 'Masuk Administrator' 
                        : 'Masuk sebagai Pegawai'}
                </span>
              </button>
            </div>
          </form>

          {/* Supabase Schema & Database Help Accordion */}
          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowSqlHelp(!showSqlHelp)}
              className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-600 hover:text-blue-900 py-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-700" />
                <span>Informasi Database Supabase &amp; SQL Schema</span>
              </span>
              <span className="text-[10px] text-blue-600 font-bold">
                {showSqlHelp ? 'Tutup' : 'Lihat SQL'}
              </span>
            </button>

            {showSqlHelp && (
              <div className="mt-2 p-3 bg-slate-900 text-slate-100 rounded-xl text-xs space-y-2 animate-fade-in font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-amber-400">
                    Skema Tabel Supabase (custom_links, kilas_balik, peta_jabatan, gdrive_options, app_users)
                  </span>
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white rounded text-[10px] flex items-center gap-1 cursor-pointer font-sans"
                  >
                    {copiedSql ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSql ? 'Tersalin' : 'Salin SQL'}</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-300 font-sans leading-tight">
                  Salin dan jalankan di SQL Editor dashboard Supabase untuk mengaktifkan sinkronisasi cloud real-time:
                </p>
                <div className="bg-slate-950 p-2 rounded text-[10px] text-sky-300 max-h-32 overflow-y-auto whitespace-pre leading-relaxed select-all">
                  {SUPABASE_SQL_SCHEMA}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 text-center text-[10px] text-slate-500">
          Sistem Informasi Layanan Terpadu &bull; Lapas Perempuan Kelas III Pangkal Pinang
        </div>
      </div>
    </div>
  );
};
