import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Save, 
  RotateCcw, 
  Check, 
  Link as LinkIcon, 
  Calendar, 
  Tag, 
  Sparkles,
  ExternalLink,
  Database,
  Cloud
} from 'lucide-react';
import { KilasBalikItem } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';

interface EditKilasBalikModalProps {
  isOpen: boolean;
  item: KilasBalikItem | null;
  onClose: () => void;
  onSave: (updatedItem: KilasBalikItem) => Promise<{ success: boolean; error?: string }> | void;
  onResetDefault: (itemId: string) => void;
}

export const EditKilasBalikModal: React.FC<EditKilasBalikModalProps> = ({
  isOpen,
  item,
  onClose,
  onSave,
  onResetDefault,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');
  const [fileError, setFileError] = useState<string | null>(null);
  const [saveFeedback, setSaveFeedback] = useState<{ type: 'success' | 'warn'; text: string } | null>(null);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDate(item.date);
      setCategory(item.category);
      setDescription(item.description);
      setImageUrl(item.imageUrl);
      setLinkUrl(item.linkUrl || '');
      setIsSaved(false);
      setFileError(null);
      setSaveFeedback(null);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  // Handle local file upload with auto-resizing & compression (optimized for 1080x1350)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('File yang dipilih harus berupa format gambar (JPG, PNG, WebP).');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawResult = event.target?.result as string;
        if (!rawResult) {
          setFileError('Gagal membaca gambar.');
          return;
        }

        const img = new Image();
        img.onload = () => {
          // Resize to max 1080x1350 portrait ratio while preserving aspect ratio
          const maxWidth = 1080;
          const maxHeight = 1350;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            setImageUrl(rawResult);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG 85% - light weight (<200KB), super sharp, fast cloud sync
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setImageUrl(compressed);
        };
        img.onerror = () => {
          setImageUrl(rawResult);
        };
        img.src = rawResult;
      };
      reader.onerror = () => {
        setFileError('Gagal membaca file gambar.');
      };
      reader.readAsDataURL(file);
    } catch {
      setFileError('Terjadi kesalahan saat memproses gambar.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    setSaveFeedback(null);

    let cleanLink = linkUrl.trim();
    if (cleanLink && !cleanLink.startsWith('http://') && !cleanLink.startsWith('https://')) {
      cleanLink = `https://${cleanLink}`;
    }

    const updated: KilasBalikItem = {
      ...item,
      title: title.trim(),
      date: date.trim(),
      category: category.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim() || item.imageUrl,
      linkUrl: cleanLink || undefined,
    };

    const result = await onSave(updated);

    if (result && result.success) {
      setSaveFeedback({
        type: 'success',
        text: '✅ Berhasil disimpan ke Supabase Cloud! Postingan akan terlihat oleh semua pengunjung.',
      });
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        setSaveFeedback(null);
        onClose();
      }, 1500);
    } else if (result && !result.success) {
      setSaveFeedback({
        type: 'warn',
        text: `⚠️ Catatan: ${result.error}`,
      });
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 3500);
    } else {
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 700);
    }
  };

  const handleReset = () => {
    onResetDefault(item.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-slide-in-left max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#0F2C59] to-[#1E3E62] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-amber-400/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                <span>EDIT KILAS BALIK KEGIATAN</span>
              </h3>
              <p className="text-[11px] text-sky-200">
                Dokumentasi &amp; Sorotan 1 Bulan Terakhir
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Cloud Sync Status Indicator */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-medium border bg-slate-50 border-slate-200">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="text-slate-700 font-semibold">Status Database Cloud:</span>
            </div>
            {isSupabaseConfigured ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold">
                <Cloud className="w-3 h-3 text-emerald-600" />
                <span>Supabase Terhubung</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full text-[10px] font-semibold" title="Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY telah dimasukkan di Cloudflare Pages dan di-redeploy">
                <span>Belum Terhubung (Lokal Browser)</span>
              </span>
            )}
          </div>

          {/* Feedback Message Banner */}
          {saveFeedback && (
            <div className={`p-3 rounded-xl flex items-start gap-2 text-xs animate-fade-in ${
              saveFeedback.type === 'success'
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-800 font-medium'
                : 'bg-amber-50 border border-amber-300 text-amber-900 leading-relaxed'
            }`}>
              <span>{saveFeedback.text}</span>
            </div>
          )}

          {/* Live Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Pratinjau Foto Kegiatan:
              </label>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Format Portrait
              </span>
            </div>
            <div className="relative w-full max-w-[220px] mx-auto aspect-[4/5] rounded-xl overflow-hidden border-2 border-slate-300 bg-slate-900 shadow-md flex items-center justify-center group">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt="Pratinjau Kegiatan" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if URL is invalid
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              ) : (
                <div className="text-center p-4 text-slate-400">
                  <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                  <span className="text-xs">Belum ada foto</span>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                {category || 'Kategori'}
              </div>
            </div>
          </div>

          {/* Photo Source Tabs */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Ganti Foto Postingan:
              </label>
              <div className="flex gap-1 text-[11px] font-medium">
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`px-2.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                    imageTab === 'upload' 
                      ? 'bg-blue-900 text-white font-bold' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Unggah dari HP/Laptop
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`px-2.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                    imageTab === 'url' 
                      ? 'bg-blue-900 text-white font-bold' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tautan URL
                </button>
              </div>
            </div>

            {imageTab === 'upload' ? (
              <div className="space-y-1.5">
                <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl bg-slate-50 hover:bg-blue-50/50 cursor-pointer transition-colors">
                  <Upload className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-xs font-bold text-slate-700">Pilih Foto dari Galeri / Dokumen</span>
                  <span className="text-[10px] text-slate-500">Mendukung format JPG, PNG, WEBP (Rekomendasi rasio portrait 1080 × 1350 px)</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                </label>
                {fileError && (
                  <p className="text-[11px] text-rose-600 font-medium">{fileError}</p>
                )}
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... atau tautan gambar"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Masukkan tautan langsung ke file gambar berformat https://...
                </p>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Judul Kegiatan:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Pelatihan Kemandirian Tata Boga WBP"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-semibold"
            />
          </div>

          {/* Category & Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                <span>Kategori / Label:</span>
              </label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Pembinaan Kemandirian"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Waktu / Minggu:</span>
              </label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Minggu I - 02 Oktober 2026"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Singkat Kegiatan:
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan ringkasan kegiatan, tujuan, serta pihak yang terlibat..."
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all leading-relaxed"
            />
          </div>

          {/* Optional Documentation Link */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-pink-600" />
              <span>Link Dokumentasi / Instagram (Opsional):</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/... atau link berita"
                className="w-full pl-3 pr-8 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-mono"
              />
              {linkUrl && (
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                  title="Buka link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Kembalikan postingan ke default awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Default</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={isSaved}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] rounded-xl shadow transition-colors cursor-pointer"
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tersimpan!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5 text-amber-400" />
                    <span>Simpan Postingan</span>
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
