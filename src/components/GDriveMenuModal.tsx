import React, { useState, useEffect } from 'react';
import { 
  X, 
  HardDrive, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  RotateCcw, 
  Check, 
  FolderGit2, 
  ShieldCheck, 
  CloudUpload,
  Search,
  FileText,
  FolderOpen
} from 'lucide-react';
import { GDriveOption } from '../types';
import { 
  DEFAULT_GDRIVE_OPTIONS, 
  fetchGDriveOptionsFromCloud, 
  saveGDriveOptionsToCloud 
} from '../lib/supabase';

interface GDriveMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export const GDriveMenuModal: React.FC<GDriveMenuModalProps> = ({
  isOpen,
  onClose,
  isAdmin = false,
}) => {
  const [options, setOptions] = useState<GDriveOption[]>(() => {
    try {
      const stored = localStorage.getItem('silapas_gdrive_options');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return DEFAULT_GDRIVE_OPTIONS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingOption, setIsEditingOption] = useState<GDriveOption | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formOption, setFormOption] = useState<Partial<GDriveOption>>({
    title: '',
    description: '',
    url: '',
    category: 'Arsip Pegawai',
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [isSavingCloud, setIsSavingCloud] = useState(false);

  // Sync from Supabase cloud on open
  useEffect(() => {
    if (isOpen) {
      let isMounted = true;
      try {
        const stored = localStorage.getItem('silapas_gdrive_options');
        if (stored) {
          setOptions(JSON.parse(stored));
        }
      } catch {
        // ignore
      }

      fetchGDriveOptionsFromCloud().then((cloudData) => {
        if (cloudData && isMounted && cloudData.length > 0) {
          setOptions(cloudData);
          try {
            localStorage.setItem('silapas_gdrive_options', JSON.stringify(cloudData));
          } catch {
            // ignore
          }
        }
      });

      return () => {
        isMounted = false;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartAdd = () => {
    setFormOption({
      title: '',
      description: '',
      url: 'https://drive.google.com/drive/folders/',
      category: 'Arsip Pegawai',
    });
    setIsAddingNew(true);
    setIsEditingOption(null);
  };

  const handleStartEdit = (option: GDriveOption) => {
    setFormOption({ ...option });
    setIsEditingOption(option);
    setIsAddingNew(false);
  };

  const handleCancelForm = () => {
    setIsAddingNew(false);
    setIsEditingOption(null);
    setFormOption({});
  };

  const handleSaveOption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formOption.title || !formOption.url) return;

    let updatedList: GDriveOption[];
    if (isAddingNew) {
      const newOption: GDriveOption = {
        id: `gdrive-opt-${Date.now()}`,
        title: formOption.title.trim(),
        description: formOption.description?.trim() || 'Folder Google Drive Kepegawaian',
        url: formOption.url.trim(),
        category: formOption.category || 'Arsip Pegawai',
        order: options.length + 1,
      };
      updatedList = [...options, newOption];
    } else if (isEditingOption) {
      updatedList = options.map((opt) =>
        opt.id === isEditingOption.id
          ? {
              ...opt,
              title: formOption.title!.trim(),
              description: formOption.description?.trim() || opt.description,
              url: formOption.url!.trim(),
              category: formOption.category || opt.category,
            }
          : opt
      );
    } else {
      return;
    }

    setOptions(updatedList);
    try {
      localStorage.setItem('silapas_gdrive_options', JSON.stringify(updatedList));
    } catch {
      // ignore
    }

    setIsSavingCloud(true);
    await saveGDriveOptionsToCloud(updatedList);
    setIsSavingCloud(false);

    setSuccessMsg(isAddingNew ? 'Opsi folder baru berhasil ditambahkan ke database!' : 'Opsi folder berhasil diperbarui!');
    setTimeout(() => setSuccessMsg(''), 3000);
    handleCancelForm();
  };

  const handleDeleteOption = async (id: string, title: string) => {
    if (!window.confirm(`Hapus opsi "${title}" dari daftar menu Google Drive?`)) return;

    const updatedList = options.filter((opt) => opt.id !== id);
    setOptions(updatedList);
    try {
      localStorage.setItem('silapas_gdrive_options', JSON.stringify(updatedList));
    } catch {
      // ignore
    }

    setIsSavingCloud(true);
    await saveGDriveOptionsToCloud(updatedList);
    setIsSavingCloud(false);

    setSuccessMsg('Opsi berhasil dihapus dari database!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('Reset seluruh daftar opsi Google Drive ke pengaturan awal resmi?')) return;

    setOptions(DEFAULT_GDRIVE_OPTIONS);
    try {
      localStorage.setItem('silapas_gdrive_options', JSON.stringify(DEFAULT_GDRIVE_OPTIONS));
    } catch {
      // ignore
    }
    await saveGDriveOptionsToCloud(DEFAULT_GDRIVE_OPTIONS);
    setSuccessMsg('Daftar opsi berhasil direset ke standar resmi!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const filteredOptions = options.filter((opt) => {
    const q = searchQuery.toLowerCase();
    return (
      opt.title.toLowerCase().includes(q) ||
      opt.description.toLowerCase().includes(q) ||
      (opt.category && opt.category.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-3 sm:my-6 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#0F2C59] to-[#047857] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-emerald-400/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
              <HardDrive className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
                  REPOSITORI GOOGLE DRIVE PEGAWAI
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold bg-emerald-400 text-slate-950 rounded-full">
                  Resmi SDM
                </span>
              </div>
              <p className="text-xs text-sky-200">
                Pilih folder berkas kepegawaian Lapas Perempuan Kelas III Pangkalpinang
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Bar */}
        {isAdmin && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 sm:px-6 py-2 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Mode Admin: Anda dapat menambah, mengubah, atau menghapus opsi tautan Google Drive.</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold shrink-0">
              Database Supabase Aktif
            </span>
          </div>
        )}

        {/* Global Success Alert */}
        {successMsg && (
          <div className="bg-emerald-50 border-b border-emerald-300 px-4 py-2 flex items-center justify-center gap-2 text-xs font-bold text-emerald-800 animate-fade-in shrink-0">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Search & Actions Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari opsi berkas, SK, cuti..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {isAdmin && !isAddingNew && !isEditingOption && (
              <>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Reset ke opsi standar"
                >
                  <RotateCcw className="w-3 h-3 text-slate-500" />
                  <span className="hidden xs:inline">Reset</span>
                </button>
                <button
                  type="button"
                  onClick={handleStartAdd}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Opsi Folder</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
          {/* Add / Edit Form */}
          {(isAddingNew || isEditingOption) && (
            <form onSubmit={handleSaveOption} className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/90 border border-emerald-300 space-y-3 animate-fade-in text-left">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                <div className="flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4 text-emerald-800" />
                  <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                    {isAddingNew ? 'Tambah Opsi Menu Google Drive Baru' : 'Edit Opsi Menu Google Drive'}
                  </h5>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  Simpan ke Supabase
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Judul Menu / Nama Dokumen
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Arsip SK Kenaikan Pangkat..."
                    value={formOption.title || ''}
                    onChange={(e) => setFormOption({ ...formOption, title: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Kategori / Label Singkat
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: SK & Pangkat, Cuti, dsb."
                    value={formOption.category || ''}
                    onChange={(e) => setFormOption({ ...formOption, category: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Deskripsi Ringkas
                  </label>
                  <input
                    type="text"
                    placeholder="Keterangan isi berkas di folder..."
                    value={formOption.description || ''}
                    onChange={(e) => setFormOption({ ...formOption, description: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Tautan URL Google Drive (Folder / Berkas)
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/..."
                    value={formOption.url || ''}
                    onChange={(e) => setFormOption({ ...formOption, url: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-emerald-200">
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingCloud}
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-70"
                >
                  {isSavingCloud ? (
                    <>
                      <CloudUpload className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan ke Cloud...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Simpan Opsi</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* List of Options */}
          {filteredOptions.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
              <FolderOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold">Tidak ada opsi menu Google Drive yang cocok.</p>
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleStartAdd}
                  className="mt-3 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                >
                  Tambah Opsi Baru
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredOptions.map((opt) => (
                <div
                  key={opt.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-emerald-100/80 text-emerald-800 shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        {opt.category && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {opt.category}
                          </span>
                        )}
                      </div>

                      {isAdmin && (
                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(opt)}
                            className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-blue-700 transition-colors"
                            title="Edit Opsi"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteOption(opt.id, opt.title)}
                            className="p-1 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Hapus Opsi"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-800 leading-snug mb-1">
                      {opt.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 mb-3">
                      {opt.description}
                    </p>
                  </div>

                  <a
                    href={opt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors"
                  >
                    <span>Buka di Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Menampilkan {filteredOptions.length} menu dokumen Google Drive</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
