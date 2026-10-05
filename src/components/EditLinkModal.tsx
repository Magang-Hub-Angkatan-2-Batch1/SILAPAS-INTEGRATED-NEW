import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Save, 
  RotateCcw, 
  Check, 
  Link as LinkIcon, 
  ShieldCheck, 
  HardDrive,
  Share2
} from 'lucide-react';
import { ServiceItem } from '../types';

interface EditLinkModalProps {
  isOpen: boolean;
  service: ServiceItem | null;
  onClose: () => void;
  onSave: (serviceId: string, newUrl: string, newSubTitle?: string) => void;
  onResetDefault: (serviceId: string) => void;
}

export const EditLinkModal: React.FC<EditLinkModalProps> = ({
  isOpen,
  service,
  onClose,
  onSave,
  onResetDefault,
}) => {
  const [url, setUrl] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (service) {
      setUrl(service.url || '');
      setSubTitle(service.subTitle || '');
      setIsSaved(false);
    }
  }, [service]);

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(service.id, url.trim(), subTitle.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    onResetDefault(service.id);
    onClose();
  };

  const isPegawai = service.category === 'pegawai';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-slide-in-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#0F2C59] to-[#1E3E62] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-amber-400/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              {isPegawai ? <HardDrive className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                <span>EDIT TAUTAN LAYANAN</span>
              </h3>
              <p className="text-[11px] text-sky-200">
                Mode Administrator &bull; {service.categoryLabel}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900">{service.title}</strong>
              <span>
                {isPegawai
                  ? 'Masukkan link folder Google Drive data informasi pegawai yang dapat diakses oleh aparatur pegawai Lapas.'
                  : 'Masukkan link tautan resmi profil akun media sosial Lapas Perempuan Kelas III Pangkal Pinang.'}
              </span>
            </div>
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isPegawai ? 'Tautan Link Google Drive' : 'Tautan Link URL'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <LinkIcon className="w-4 h-4" />
              </div>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={isPegawai ? 'https://drive.google.com/drive/folders/...' : 'https://...'}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Pastikan tautan diawali dengan <code>https://</code>
            </p>
          </div>

          {/* Subtitle / Label Input (optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Keterangan Singkat / Subtitle (Opsional)
            </label>
            <input
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Contoh: Repositori Arsip Google Drive / @lapasperempuanpangkalpinang"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Test Link Button */}
          {url && (
            <div className="pt-1">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-semibold"
              >
                <span>Uji Coba Buka Link Ini</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              title="Kembalikan tautan ke default sistem"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={isSaved}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] rounded-xl shadow transition-colors"
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tersimpan!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5 text-amber-400" />
                    <span>Simpan Tautan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
