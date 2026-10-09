import React, { useState, useEffect } from 'react';
import { 
  X, 
  Users, 
  Award, 
  Briefcase, 
  Building, 
  CheckCircle,
  Quote,
  Edit3,
  ShieldCheck,
  Save,
  RotateCcw,
  Check,
  CloudUpload
} from 'lucide-react';
import { PetaJabatanView, DEFAULT_PETA_JABATAN, ImageUploadField } from './PetaJabatanView';
import { PetaJabatanData } from '../types';
import { savePetaJabatanToCloud, fetchPetaJabatanFromCloud } from '../lib/supabase';

interface OfficialsProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export const OfficialsProfileModal: React.FC<OfficialsProfileModalProps> = ({
  isOpen,
  onClose,
  isAdmin = false,
}) => {
  // Tab Order: 1. Struktur Organisasi -> 2. Profil Kalapas dulu -> 3. Baru Pejabat Struktural
  const [selectedSection, setSelectedSection] = useState<'struktur' | 'kepala' | 'struktural'>('struktur');
  const [petaData, setPetaData] = useState<PetaJabatanData>(() => {
    try {
      const stored = localStorage.getItem('silapas_peta_jabatan');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.kaurTu && (parsed.kaurTu.title === 'KAUR TU' || !parsed.kaurTu.title)) {
          parsed.kaurTu.title = 'Kepala Urusan TU';
        }
        if (!parsed.logoKananUrl) {
          parsed.logoKananUrl = '/logo_pemasyarakatan.svg';
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_PETA_JABATAN;
  });

  // State for Kalapas Editing
  const [isEditingKalapas, setIsEditingKalapas] = useState(false);
  const [kalapasForm, setKalapasForm] = useState(petaData.kepalaLapas);

  // State for Struktural Editing
  const [isEditingStruktural, setIsEditingStruktural] = useState(false);
  const [kaurTuForm, setKaurTuForm] = useState(petaData.kaurTu);
  const [subseksiForm, setSubseksiForm] = useState(petaData.subseksi);

  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [isSavingCloud, setIsSavingCloud] = useState(false);

  // Re-read from Supabase & storage when opened
  useEffect(() => {
    if (isOpen) {
      let isMounted = true;
      try {
        const stored = localStorage.getItem('silapas_peta_jabatan');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.kaurTu && (parsed.kaurTu.title === 'KAUR TU' || !parsed.kaurTu.title)) {
            parsed.kaurTu.title = 'Kepala Urusan TU';
          }
          if (!parsed.logoKananUrl) {
            parsed.logoKananUrl = '/logo_pemasyarakatan.svg';
          }
          setPetaData(parsed);
          setKalapasForm(parsed.kepalaLapas);
          setKaurTuForm(parsed.kaurTu);
          setSubseksiForm(parsed.subseksi);
        }
      } catch {
        // ignore
      }

      fetchPetaJabatanFromCloud().then((cloudData) => {
        if (cloudData && isMounted) {
          if (cloudData.kaurTu && (cloudData.kaurTu.title === 'KAUR TU' || !cloudData.kaurTu.title)) {
            cloudData.kaurTu.title = 'Kepala Urusan TU';
          }
          if (!cloudData.logoKananUrl) {
            cloudData.logoKananUrl = '/logo_pemasyarakatan.svg';
          }
          setPetaData(cloudData);
          setKalapasForm(cloudData.kepalaLapas);
          setKaurTuForm(cloudData.kaurTu);
          setSubseksiForm(cloudData.subseksi);
          try {
            localStorage.setItem('silapas_peta_jabatan', JSON.stringify(cloudData));
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

  // Save Kalapas Profile
  const handleSaveKalapas = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PetaJabatanData = {
      ...petaData,
      kepalaLapas: kalapasForm,
    };
    setPetaData(updated);
    try {
      localStorage.setItem('silapas_peta_jabatan', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setIsSavingCloud(true);
    await savePetaJabatanToCloud(updated);
    setIsSavingCloud(false);

    setSaveSuccessMsg('Profil Kepala Lapas berhasil diperbarui!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
    setIsEditingKalapas(false);
  };

  // Save Pejabat Struktural
  const handleSaveStruktural = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PetaJabatanData = {
      ...petaData,
      kaurTu: kaurTuForm,
      subseksi: subseksiForm,
    };
    setPetaData(updated);
    try {
      localStorage.setItem('silapas_peta_jabatan', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setIsSavingCloud(true);
    await savePetaJabatanToCloud(updated);
    setIsSavingCloud(false);

    setSaveSuccessMsg('Detail Pejabat Struktural berhasil diperbarui!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
    setIsEditingStruktural(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 xs:p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-2 sm:my-6 max-h-[96vh] sm:max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#0F2C59] to-[#1E3E62] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-amber-400/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
                  STRUKTUR ORGANISASI
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full">
                  Resmi
                </span>
              </div>
              <p className="text-xs text-sky-200">
                Lembaga Pemasyarakatan Perempuan Kelas III Pangkal Pinang
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Notification Bar */}
        {isAdmin && (
          <div className="bg-amber-500/10 border-b border-amber-300/40 px-4 sm:px-6 py-2 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Mode Admin: Anda dapat mengedit struktur, foto Kalapas, dan pejabat struktural.</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold shrink-0">
              Cloud Sync Aktif
            </span>
          </div>
        )}

        {/* Global Save Alert */}
        {saveSuccessMsg && (
          <div className="bg-emerald-50 border-b border-emerald-300 px-4 py-2 flex items-center justify-center gap-2 text-xs font-bold text-emerald-800 animate-fade-in shrink-0">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Tab Switcher: ORDER: 1. STRUKTUR ORGANISASI -> 2. PROFIL KALAPAS DULU -> 3. BARU PEJABAT STRUKTURAL */}
        <div className="bg-slate-100 px-4 sm:px-6 py-2.5 border-b border-slate-200 flex gap-2 shrink-0 overflow-x-auto scrollbar-none">
          {/* TAB 1: STRUKTUR ORGANISASI */}
          <button
            onClick={() => setSelectedSection('struktur')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedSection === 'struktur'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Struktur Organisasi</span>
          </button>

          {/* TAB 2: PROFIL KALAPAS (SETELAH STRUKTUR ORGANISASI) */}
          <button
            onClick={() => setSelectedSection('kepala')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedSection === 'kepala'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Profil Kepala Lapas (Kalapas)</span>
          </button>

          {/* TAB 3: DETAIL PEJABAT STRUKTURAL (SETELAH KALAPAS) */}
          <button
            onClick={() => setSelectedSection('struktural')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedSection === 'struktural'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>3. Detail Pejabat Struktural</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-2.5 xs:p-3 sm:p-5 md:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-slate-700 text-sm leading-relaxed">
          {/* ========================================================================= */}
          {/* TAB 1: PETA JABATAN / STRUKTUR ORGANISASI                                 */}
          {/* ========================================================================= */}
          {selectedSection === 'struktur' && (
            <div className="space-y-4">
              <PetaJabatanView 
                isAdmin={isAdmin} 
                onUpdate={(newPeta) => {
                  setPetaData(newPeta);
                  setKalapasForm(newPeta.kepalaLapas);
                  setKaurTuForm(newPeta.kaurTu);
                  setSubseksiForm(newPeta.subseksi);
                }} 
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: PROFIL KEPALA LAPAS (DULUAN SETELAH STRUKTUR ORGANISASI)           */}
          {/* ========================================================================= */}
          {selectedSection === 'kepala' && (
            <div className="space-y-6">
              {/* Admin Edit Kalapas Button */}
              {isAdmin && !isEditingKalapas && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setKalapasForm(petaData.kepalaLapas);
                      setIsEditingKalapas(true);
                    }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profil &amp; Foto Kalapas</span>
                  </button>
                </div>
              )}

              {/* Edit Kalapas Form */}
              {isEditingKalapas && (
                <form onSubmit={handleSaveKalapas} className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 space-y-4 animate-fade-in text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-amber-800" />
                      <h5 className="font-extrabold text-sm text-slate-900">
                        Formulir Edit Profil &amp; Foto Kepala Lapas
                      </h5>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      Kalapas
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nama Lengkap Kepala Lapas
                      </label>
                      <input
                        type="text"
                        required
                        value={kalapasForm.name}
                        onChange={(e) => setKalapasForm({ ...kalapasForm, name: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-bold bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        NIP Kepala Lapas
                      </label>
                      <input
                        type="text"
                        required
                        value={kalapasForm.nip}
                        onChange={(e) => setKalapasForm({ ...kalapasForm, nip: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono bg-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <ImageUploadField
                        label="Foto Profil Resmi Kepala Lapas (Upload file atau tautan URL)"
                        currentUrl={kalapasForm.photoUrl}
                        onUrlChange={(url) => setKalapasForm({ ...kalapasForm, photoUrl: url })}
                        placeholder="Masukkan link gambar atau upload file foto kalapas..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Kata Sambutan / Kutipan Resmi
                      </label>
                      <textarea
                        rows={3}
                        value={kalapasForm.quote || ''}
                        onChange={(e) => setKalapasForm({ ...kalapasForm, quote: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white leading-relaxed"
                        placeholder="Kutipan pesan sambutan Kepala Lapas..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-200">
                    <button
                      type="button"
                      onClick={() => setIsEditingKalapas(false)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingCloud}
                      className="px-4 py-1.5 rounded-lg bg-[#0B192C] hover:bg-[#1E3E62] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-70"
                    >
                      {isSavingCloud ? (
                        <>
                          <CloudUpload className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                          <span>Menyimpan ke Cloud...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5 text-amber-400" />
                          <span>Simpan Profil Kalapas</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Display Kalapas Profile Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0F2C59] to-[#0B192C] text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center md:items-start gap-5 relative z-10">
                  {/* Kalapas Photo Box */}
                  <div className="relative shrink-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-amber-400 to-sky-400 p-1 shadow-lg">
                      <div className="w-full h-full rounded-[14px] bg-[#0B192C] flex flex-col items-center justify-center overflow-hidden">
                        {petaData.kepalaLapas.photoUrl ? (
                          <img 
                            src={petaData.kepalaLapas.photoUrl} 
                            alt={`Kepala Lapas: ${petaData.kepalaLapas.name}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-2 text-center">
                            <img 
                              src="/logo.jpg" 
                              alt="LPP Pangkalpinang"
                              className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 mb-1"
                            />
                            <span className="text-[10px] font-bold text-amber-300">Pimpinan UPT</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-900 shadow">
                      <CheckCircle className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="text-center md:text-left space-y-2 flex-1">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold tracking-wide">
                      KEPALA LEMBAGA PEMASYARAKATAN
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                      {petaData.kepalaLapas.name}
                    </h4>
                    <p className="text-xs font-mono text-amber-300">
                      NIP. {petaData.kepalaLapas.nip}
                    </p>
                    <p className="text-xs sm:text-sm text-sky-200">
                      Kepala Lapas Perempuan Kelas III Pangkal Pinang
                    </p>
                    <p className="text-xs text-slate-300 max-w-xl">
                      Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia &bull; Kantor Wilayah Kepulauan Bangka Belitung
                    </p>
                  </div>
                </div>

                {petaData.kepalaLapas.quote && (
                  <div className="mt-5 pt-4 border-t border-slate-700/80 flex items-start gap-3 text-xs text-slate-200">
                    <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <p className="italic leading-relaxed">
                      &ldquo;{petaData.kepalaLapas.quote}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Tupoksi Kalapas */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-700" />
                  <span>Fungsi &amp; Tanggung Jawab Kepala Lapas</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                  {(petaData.kepalaLapas.duties || DEFAULT_PETA_JABATAN.kepalaLapas.duties || []).map((duty, idx) => (
                    <li key={idx}>{duty}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: DETAIL PEJABAT STRUKTURAL                                          */}
          {/* ========================================================================= */}
          {selectedSection === 'struktural' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-xs text-slate-600">
                  Unsur kepemimpinan operasional yang bertugas membantu Kepala Lapas dalam pelaksanaan tugas administratif, pembinaan narapidana, dan keamanan:
                </p>

                {isAdmin && !isEditingStruktural && (
                  <button
                    type="button"
                    onClick={() => {
                      setKaurTuForm(petaData.kaurTu);
                      setSubseksiForm(petaData.subseksi);
                      setIsEditingStruktural(true);
                    }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Edit Pejabat Struktural</span>
                  </button>
                )}
              </div>

              {/* Edit Pejabat Struktural Form */}
              {isEditingStruktural && (
                <form onSubmit={handleSaveStruktural} className="p-4 sm:p-5 rounded-2xl bg-blue-50/90 border-2 border-blue-300 space-y-4 animate-fade-in text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-blue-800" />
                      <h5 className="font-extrabold text-sm text-slate-900">
                        Formulir Edit Pejabat Struktural, NIP, &amp; Foto
                      </h5>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                      Pejabat Struktural
                    </span>
                  </div>

                  {/* 1. Kepala Urusan TU */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-blue-800 uppercase block">
                      1. Kepala Urusan Tata Usaha (Kepala Urusan TU)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Nama Kepala Urusan TU"
                        value={kaurTuForm.name}
                        onChange={(e) => setKaurTuForm({ ...kaurTuForm, name: e.target.value.toUpperCase() })}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-bold"
                      />
                      <input
                        type="text"
                        required
                        placeholder="NIP"
                        value={kaurTuForm.nip}
                        onChange={(e) => setKaurTuForm({ ...kaurTuForm, nip: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-mono"
                      />
                    </div>
                    <ImageUploadField
                      label="Foto Kepala Urusan TU"
                      currentUrl={kaurTuForm.photoUrl}
                      onUrlChange={(url) => setKaurTuForm({ ...kaurTuForm, photoUrl: url })}
                    />
                    <textarea
                      rows={2}
                      placeholder="Tugas pokok Kepala Urusan TU..."
                      value={kaurTuForm.description || ''}
                      onChange={(e) => setKaurTuForm({ ...kaurTuForm, description: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 leading-normal"
                    />
                  </div>

                  {/* Subseksi 1: AO */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-amber-800 uppercase block">
                      2. Kasubsi Admisi &amp; Orientasi
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Nama"
                        value={subseksiForm[0]?.name || ''}
                        onChange={(e) => {
                          const updated = [...subseksiForm];
                          updated[0] = { ...updated[0], name: e.target.value.toUpperCase() };
                          setSubseksiForm(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-bold"
                      />
                      <input
                        type="text"
                        required
                        placeholder="NIP"
                        value={subseksiForm[0]?.nip || ''}
                        onChange={(e) => {
                          const updated = [...subseksiForm];
                          updated[0] = { ...updated[0], nip: e.target.value };
                          setSubseksiForm(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-mono"
                      />
                    </div>
                    <ImageUploadField
                      label="Foto Kasubsi Admisi & Orientasi"
                      currentUrl={subseksiForm[0]?.photoUrl}
                      onUrlChange={(url) => {
                        const updated = [...subseksiForm];
                        updated[0] = { ...updated[0], photoUrl: url };
                        setSubseksiForm(updated);
                      }}
                    />
                    <textarea
                      rows={2}
                      placeholder="Tugas pokok Kasubsi AO..."
                      value={subseksiForm[0]?.description || ''}
                      onChange={(e) => {
                        const updated = [...subseksiForm];
                        updated[0] = { ...updated[0], description: e.target.value };
                        setSubseksiForm(updated);
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 leading-normal"
                    />
                  </div>

                  {/* Subseksi 2: Pembinaan */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-emerald-800 uppercase block">
                      3. Kasubsi Pembinaan
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Nama"
                        value={subseksiForm[1]?.name || ''}
                        onChange={(e) => {
                          const updated = [...subseksiForm];
                          updated[1] = { ...updated[1], name: e.target.value.toUpperCase() };
                          setSubseksiForm(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-bold"
                      />
                      <input
                        type="text"
                        required
                        placeholder="NIP"
                        value={subseksiForm[1]?.nip || ''}
                        onChange={(e) => {
                          const updated = [...subseksiForm];
                          updated[1] = { ...updated[1], nip: e.target.value };
                          setSubseksiForm(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-mono"
                      />
                    </div>
                    <ImageUploadField
                      label="Foto Kasubsi Pembinaan"
                      currentUrl={subseksiForm[1]?.photoUrl}
                      onUrlChange={(url) => {
                        const updated = [...subseksiForm];
                        updated[1] = { ...updated[1], photoUrl: url };
                        setSubseksiForm(updated);
                      }}
                    />
                    <textarea
                      rows={2}
                      placeholder="Tugas pokok Kasubsi Pembinaan..."
                      value={subseksiForm[1]?.description || ''}
                      onChange={(e) => {
                        const updated = [...subseksiForm];
                        updated[1] = { ...updated[1], description: e.target.value };
                        setSubseksiForm(updated);
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 leading-normal"
                    />
                  </div>

                  {/* Subseksi 3: Kamtib */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-rose-800 uppercase block">
                      4. Kasubsi Keamanan &amp; Ketertiban
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Nama"
                        value={subseksiForm[2]?.name || ''}
                        onChange={(e) => {
                          const updated = [...subseksiForm];
                          updated[2] = { ...updated[2], name: e.target.value.toUpperCase() };
                          setSubseksiForm(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-bold"
                      />
                      <input
                        type="text"
                        required
                        placeholder="NIP"
                        value={subseksiForm[2]?.nip || ''}
                        onChange={(e) => {
                          const updated = [...subseksiForm];
                          updated[2] = { ...updated[2], nip: e.target.value };
                          setSubseksiForm(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-mono"
                      />
                    </div>
                    <ImageUploadField
                      label="Foto Kasubsi Kamtib"
                      currentUrl={subseksiForm[2]?.photoUrl}
                      onUrlChange={(url) => {
                        const updated = [...subseksiForm];
                        updated[2] = { ...updated[2], photoUrl: url };
                        setSubseksiForm(updated);
                      }}
                    />
                    <textarea
                      rows={2}
                      placeholder="Tugas pokok Kasubsi Kamtib..."
                      value={subseksiForm[2]?.description || ''}
                      onChange={(e) => {
                        const updated = [...subseksiForm];
                        updated[2] = { ...updated[2], description: e.target.value };
                        setSubseksiForm(updated);
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 leading-normal"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-200">
                    <button
                      type="button"
                      onClick={() => setIsEditingStruktural(false)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingCloud}
                      className="px-4 py-1.5 rounded-lg bg-[#0B192C] hover:bg-[#1E3E62] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-70"
                    >
                      {isSavingCloud ? (
                        <>
                          <CloudUpload className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                          <span>Menyimpan ke Cloud...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5 text-amber-400" />
                          <span>Simpan Pejabat Struktural</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Grid of 4 Officers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Kepala Urusan TU */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2.5">
                    {petaData.kaurTu.photoUrl ? (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-blue-500 shrink-0">
                        <img src={petaData.kaurTu.photoUrl} alt={petaData.kaurTu.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0">
                        TU
                      </div>
                    )}
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 uppercase">
                        {petaData.kaurTu.name}
                      </h5>
                      <div className="text-[10px] font-mono text-slate-500">NIP. {petaData.kaurTu.nip}</div>
                      <span className="text-[11px] text-blue-700 font-semibold">Kepala Urusan Tata Usaha (Kepala Urusan TU)</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {petaData.kaurTu.description || DEFAULT_PETA_JABATAN.kaurTu.description}
                  </p>
                </div>

                {/* 2. Kasubsi Admisi & Orientasi */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2.5">
                    {petaData.subseksi[0]?.photoUrl ? (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-500 shrink-0">
                        <img src={petaData.subseksi[0]?.photoUrl} alt={petaData.subseksi[0]?.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                        AO
                      </div>
                    )}
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 uppercase">
                        {petaData.subseksi[0]?.name}
                      </h5>
                      <div className="text-[10px] font-mono text-slate-500">NIP. {petaData.subseksi[0]?.nip}</div>
                      <span className="text-[11px] text-amber-700 font-semibold">Kepala Subseksi Admisi &amp; Orientasi</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {petaData.subseksi[0]?.description || DEFAULT_PETA_JABATAN.subseksi[0]?.description}
                  </p>
                </div>

                {/* 3. Kasubsi Pembinaan */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2.5">
                    {petaData.subseksi[1]?.photoUrl ? (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-500 shrink-0">
                        <img src={petaData.subseksi[1]?.photoUrl} alt={petaData.subseksi[1]?.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs shrink-0">
                        BIN
                      </div>
                    )}
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 uppercase">
                        {petaData.subseksi[1]?.name}
                      </h5>
                      <div className="text-[10px] font-mono text-slate-500">NIP. {petaData.subseksi[1]?.nip}</div>
                      <span className="text-[11px] text-emerald-700 font-semibold">Kepala Subseksi Pembinaan</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {petaData.subseksi[1]?.description || DEFAULT_PETA_JABATAN.subseksi[1]?.description}
                  </p>
                </div>

                {/* 4. Kasubsi Kamtib */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2.5">
                    {petaData.subseksi[2]?.photoUrl ? (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-rose-500 shrink-0">
                        <img src={petaData.subseksi[2]?.photoUrl} alt={petaData.subseksi[2]?.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-xs shrink-0">
                        KAMTIB
                      </div>
                    )}
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 uppercase">
                        {petaData.subseksi[2]?.name}
                      </h5>
                      <div className="text-[10px] font-mono text-slate-500">NIP. {petaData.subseksi[2]?.nip}</div>
                      <span className="text-[11px] text-rose-700 font-semibold">Kepala Subseksi Keamanan &amp; Ketertiban</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {petaData.subseksi[2]?.description || DEFAULT_PETA_JABATAN.subseksi[2]?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 sm:px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-slate-500">
            SILAPAS-INTEGRATED &bull; Lapas Perempuan Kelas III Pangkal Pinang
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
