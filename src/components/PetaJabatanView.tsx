import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Edit3, 
  Save, 
  RotateCcw, 
  Check, 
  Upload, 
  Image as ImageIcon, 
  X, 
  CloudUpload,
  Eye,
  Layers
} from 'lucide-react';
import { OfficerData, PetaJabatanData } from '../types';
import { savePetaJabatanToCloud, fetchPetaJabatanFromCloud } from '../lib/supabase';

// Re-export types for consumers
export type { OfficerData, PetaJabatanData };

// Default Data matching Gambar 2 (Struktur Organisasi Lapas Perempuan Kelas III Pangkalpinang)
export const DEFAULT_PETA_JABATAN: PetaJabatanData = {
  structureImageUrl: '',
  logoKiriUrl: '/logo.jpg',
  logoKananUrl: '/logo_pemasyarakatan.svg',
  kepalaLapas: {
    title: 'KEPALA LAPAS',
    name: 'RINA SETIARI',
    nip: '198304102003122001',
    initials: 'RS',
    color: 'from-amber-400 to-amber-600',
    photoUrl: '',
    quote: 'Kami berkomitmen menghadirkan tata kelola pemasyarakatan yang bersih, transparan, dan berlandaskan keadilan humanis. Melalui portal terintegrasi SILAPAS, kami memastikan pelayanan terhadap masyarakat, optimalisasi pengelolaan BMN, dan pencatatan kinerja SDM pegawai berjalan secara akuntabel dan modern.',
    duties: [
      'Memimpin penyelenggaraan seluruh tugas dan fungsi Lapas Perempuan Kelas III Pangkal Pinang.',
      'Mengkoordinasikan program pembinaan kepribadian, kemandirian, dan pelayanan medis WBP.',
      'Mengawasi stabilitas keamanan ketertiban serta menegakkan integritas aparatur pegawai.',
      'Membina hubungan kerja sama lintas sektoral dengan APH (Aparat Penegak Hukum), Pemda, dan stakeholder terkait.',
      'Mendorong inovasi digitalisasi layanan publik dan transparansi birokrasi pemerintahan.'
    ]
  },
  kaurTu: {
    title: 'Kepala Urusan TU',
    name: 'EVI ASWANI',
    nip: '198404082005012001',
    initials: 'EA',
    color: 'from-blue-500 to-blue-700',
    photoUrl: '',
    description: 'Mengelola urusan kepegawaian (JHP), pembukuan keuangan dan DIPA, pencatatan persediaan dan aset Barang Milik Negara (SI-BMN), urusan persuratan dinas, dan kehumasan.'
  },
  subseksi: [
    {
      title: 'KEPALA SUBSEKSI ADMISI & ORIENTASI',
      name: 'AYU ANNISA PEMBER',
      nip: '199111152010122002',
      initials: 'AP',
      color: 'from-emerald-500 to-emerald-700',
      photoUrl: '',
      description: 'Penyelenggaraan penerimaan tahanan dan narapidana baru, registrasi berkas perkara, penilaian tingkat resiko (asesmen), serta program masa pengenalan lingkungan (Mapenaling).'
    },
    {
      title: 'KEPALA SUBSEKSI PEMBINAAN',
      name: 'MIA CAHYANI',
      nip: '198307242008012001',
      initials: 'MC',
      color: 'from-indigo-500 to-indigo-700',
      photoUrl: '',
      description: 'Menyusun dan mengeksekusi program pembinaan mental spiritual keagamaan, pelatihan kemandirian vokasional (tata boga, kerajinan tangan, hidroponik), serta integrasi remisi dan PB/CB.'
    },
    {
      title: 'KEPALA SUBSEKSI KEAMANAN & KETERTIBAN',
      name: 'YISTARATI',
      nip: '198005172005012002',
      initials: 'YS',
      color: 'from-rose-500 to-rose-700',
      photoUrl: '',
      description: 'Mengatur jadwal pengamanan regu jaga (Rupam), pengawasan pos komando, Penjaga Pintu Utama (P2U), razia penggeledahan blok hunian wanita, serta pemeliharaan sarana pengamanan.'
    },
  ],
};

// Compact Officer Avatar component
export const OfficerAvatar: React.FC<{ name: string; photoUrl?: string }> = ({ name, photoUrl }) => {
  if (photoUrl) {
    return (
      <div className="relative w-7 h-7 xs:w-8 xs:h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-slate-900 sm:border-2 bg-slate-100 shadow-2xs shrink-0 flex items-center justify-center">
        <img 
          src={photoUrl} 
          alt={`Foto: ${name}`} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-7 h-7 xs:w-8 xs:h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-slate-900 sm:border-2 bg-gradient-to-b from-sky-100 to-slate-200 shadow-2xs shrink-0 flex items-center justify-center">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        role="img"
        aria-label={`Foto: ${name}`}
      >
        <circle cx="50" cy="50" r="50" fill="#f1f5f9" />
        <path 
          d="M 50 15 C 32 15 26 30 26 50 C 26 68 34 85 34 95 L 66 95 C 66 85 74 68 74 50 C 74 30 68 15 50 15 Z" 
          fill="#1e293b" 
        />
        <ellipse cx="50" cy="46" rx="16" ry="19" fill="#fde68a" />
        <path d="M 40 56 Q 50 63 60 56" stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.6" />
        <ellipse cx="44" cy="44" rx="2" ry="1.2" fill="#0f172a" />
        <ellipse cx="56" cy="44" rx="2" ry="1.2" fill="#0f172a" />
        <path d="M 41 40 Q 44 38 47 40" stroke="#0f172a" strokeWidth="1.2" fill="none" />
        <path d="M 53 40 Q 56 38 59 40" stroke="#0f172a" strokeWidth="1.2" fill="none" />
        <path d="M 46 54 Q 50 57 54 54" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path 
          d="M 33 48 C 33 65 42 70 50 70 C 58 70 67 65 67 48 C 67 36 64 26 50 26 C 36 26 33 36 33 48 Z" 
          fill="none" 
          stroke="#0f172a" 
          strokeWidth="3.5" 
        />
        <path d="M 24 95 C 24 78 36 72 50 72 C 64 72 76 78 76 95 Z" fill="#ffffff" />
        <path d="M 24 95 C 24 78 36 72 50 72 C 64 72 76 78 76 95" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
        <path d="M 43 72 L 50 82 L 57 72" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M 50 82 L 50 95" stroke="#94a3b8" strokeWidth="1" />
        <rect x="29" y="77" width="7" height="4" rx="1" fill="#f59e0b" transform="rotate(-20 29 77)" />
        <rect x="64" y="74" width="7" height="4" rx="1" fill="#f59e0b" transform="rotate(20 64 74)" />
        <rect x="36" y="86" width="9" height="3" rx="0.5" fill="#1e293b" stroke="#f59e0b" strokeWidth="0.5" />
        <rect x="55" y="86" width="9" height="3" rx="0.5" fill="#f59e0b" />
      </svg>
    </div>
  );
};

// Reusable Image Upload & Preview Helper Component
export const ImageUploadField: React.FC<{
  label: string;
  currentUrl?: string;
  onUrlChange: (url: string) => void;
  placeholder?: string;
  isCover?: boolean;
}> = ({ label, currentUrl, onUrlChange, placeholder = 'https://...', isCover = false }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 2MB. Silakan pilih foto dengan ukuran lebih kecil.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUrlChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-1">
      <label className="block text-[10.5px] sm:text-xs font-bold text-slate-700">
        {label}
      </label>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Thumbnail Preview */}
        {currentUrl ? (
          <div className="relative group shrink-0">
            <div className={`overflow-hidden rounded-lg border border-amber-400 bg-slate-100 ${isCover ? 'w-12 h-8 sm:w-16 sm:h-10' : 'w-8 h-8 sm:w-10 sm:h-10'}`}>
              <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <button
              type="button"
              onClick={() => onUrlChange('')}
              className="absolute -top-1 -right-1 p-0.5 rounded-full bg-rose-600 text-white shadow-xs hover:bg-rose-700 transition-colors cursor-pointer"
              title="Hapus Foto"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ) : (
          <div className={`rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 ${isCover ? 'w-12 h-8 sm:w-16 sm:h-10' : 'w-8 h-8 sm:w-10 sm:h-10'}`}>
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        )}

        {/* URL Input */}
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={currentUrl || ''}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-2 py-1 text-[11px] sm:text-xs rounded-lg border border-slate-300 bg-white placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
          />
        </div>

        {/* Upload File Button */}
        <label className="px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10.5px] sm:text-xs flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs">
          <Upload className="w-3 h-3" />
          <span className="hidden xs:inline">Upload</span>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

// Compact, Scaled Job Box Component (Never cut off)
export const JobBox: React.FC<{ officer: OfficerData; className?: string }> = ({ 
  officer, 
  className = '' 
}) => {
  // Normalize KAUR TU to Kepala Urusan TU
  const displayTitle = (officer.title === 'KAUR TU' || officer.title === 'Kepala Urusan TU') 
    ? 'Kepala Urusan TU' 
    : officer.title;

  return (
    <div className={`flex flex-col rounded-lg sm:rounded-xl overflow-hidden shadow-2xs sm:shadow-md border border-[#0B192C] sm:border-2 bg-white transition-transform hover:-translate-y-0.5 ${className}`}>
      {/* Dark Navy Header Title */}
      <div className="bg-[#0B192C] text-white text-center px-0.5 xs:px-1.5 py-0.5 xs:py-1 font-black text-[6.5px] xs:text-[7.5px] sm:text-[9.5px] md:text-[10.5px] tracking-tight sm:tracking-wide uppercase leading-tight select-none truncate">
        {displayTitle}
      </div>

      {/* Body with Avatar and Text Details */}
      <div className="p-0.5 xs:p-1.5 sm:p-2.5 flex items-center gap-1 xs:gap-1.5 sm:gap-2 bg-white min-h-[38px] xs:min-h-[44px] sm:min-h-[58px]">
        <OfficerAvatar name={officer.name} photoUrl={officer.photoUrl} />
        
        <div className="min-w-0 flex-1 text-left">
          <h6 className="font-extrabold text-[8px] xs:text-[9px] sm:text-xs md:text-sm text-slate-900 leading-tight uppercase truncate">
            {officer.name}
          </h6>
          <p className="text-[6.5px] xs:text-[7px] sm:text-[8.5px] font-mono font-bold text-slate-600 tracking-tight mt-0.5 truncate">
            NIP: {officer.nip}
          </p>
        </div>
      </div>
    </div>
  );
};

interface PetaJabatanViewProps {
  isAdmin?: boolean;
  onUpdate?: (data: PetaJabatanData) => void;
}

export const PetaJabatanView: React.FC<PetaJabatanViewProps> = ({ isAdmin = false, onUpdate }) => {
  const [petaData, setPetaData] = useState<PetaJabatanData>(() => {
    try {
      const stored = localStorage.getItem('silapas_peta_jabatan');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.kaurTu && (parsed.kaurTu.title === 'KAUR TU' || !parsed.kaurTu.title)) {
          parsed.kaurTu.title = 'Kepala Urusan TU';
        }
        if (!parsed.logoKiriUrl) {
          parsed.logoKiriUrl = '/logo.jpg';
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

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PetaJabatanData>(petaData);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSavingCloud, setIsSavingCloud] = useState(false);
  const [showCustomImage, setShowCustomImage] = useState(Boolean(petaData.structureImageUrl));

  // Sync from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCloud() {
      try {
        const cloudData = await fetchPetaJabatanFromCloud();
        if (cloudData && isMounted) {
          if (cloudData.kaurTu && (cloudData.kaurTu.title === 'KAUR TU' || !cloudData.kaurTu.title)) {
            cloudData.kaurTu.title = 'Kepala Urusan TU';
          }
          if (!cloudData.logoKiriUrl) {
            cloudData.logoKiriUrl = '/logo.jpg';
          }
          if (!cloudData.logoKananUrl) {
            cloudData.logoKananUrl = '/logo_pemasyarakatan.svg';
          }
          setPetaData(cloudData);
          setFormData(cloudData);
          if (cloudData.structureImageUrl) {
            setShowCustomImage(true);
          }
          try {
            localStorage.setItem('silapas_peta_jabatan', JSON.stringify(cloudData));
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.warn('Error loading peta_jabatan from cloud:', err);
      }
    }
    loadCloud();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleStartEdit = () => {
    setFormData(petaData);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPetaData(formData);
    if (formData.structureImageUrl) {
      setShowCustomImage(true);
    }
    try {
      localStorage.setItem('silapas_peta_jabatan', JSON.stringify(formData));
    } catch {
      // ignore
    }
    onUpdate?.(formData);

    setIsSavingCloud(true);
    await savePetaJabatanToCloud(formData);
    setIsSavingCloud(false);

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    setIsEditing(false);
  };

  const handleReset = async () => {
    if (window.confirm('Reset seluruh struktur organisasi dan foto pejabat ke data bawaan resmi?')) {
      setPetaData(DEFAULT_PETA_JABATAN);
      setFormData(DEFAULT_PETA_JABATAN);
      setShowCustomImage(false);
      try {
        localStorage.removeItem('silapas_peta_jabatan');
      } catch {
        // ignore
      }
      onUpdate?.(DEFAULT_PETA_JABATAN);
      await savePetaJabatanToCloud(DEFAULT_PETA_JABATAN);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative w-full rounded-xl sm:rounded-2xl bg-white border border-slate-300 shadow-md sm:shadow-xl overflow-hidden p-2.5 xs:p-3 sm:p-5 md:p-6 select-none">
      {/* Decorative Golden Navy Ribbon Wave in Corners */}
      <div className="absolute top-0 left-0 w-16 h-16 sm:w-28 sm:h-28 pointer-events-none overflow-hidden z-0 opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 0 0 L 100 0 C 70 20 40 40 30 70 C 20 85 10 100 0 100 Z" fill="#0B192C" />
          <path d="M 0 15 L 85 0 C 60 18 35 38 25 68 C 15 82 5 95 0 95 Z" fill="#1E3E62" />
          <path d="M 0 25 C 25 25 45 45 35 75 C 25 90 0 100 0 100" fill="none" stroke="#D4AF37" strokeWidth="3" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-16 h-16 sm:w-28 sm:h-28 pointer-events-none overflow-hidden z-0 opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 100 0 L 0 0 C 30 20 60 40 70 70 C 80 85 90 100 100 100 Z" fill="#0B192C" />
          <path d="M 100 15 L 15 0 C 40 18 65 38 75 68 C 85 82 95 95 100 95 Z" fill="#1E3E62" />
          <path d="M 100 25 C 75 25 55 45 65 75 C 75 90 100 100 100 100" fill="none" stroke="#D4AF37" strokeWidth="3" />
        </svg>
      </div>

      {/* Bottom Wave Border */}
      <div className="absolute bottom-0 left-0 right-0 h-2.5 sm:h-4 bg-gradient-to-r from-[#0B192C] via-[#D4AF37] to-[#0B192C] pointer-events-none" />

      {/* Header with Official Logos & Typography */}
      <div className="relative z-10 text-center mb-3 sm:mb-5">
        {/* Admin Edit & View Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
          {petaData.structureImageUrl ? (
            <button
              type="button"
              onClick={() => setShowCustomImage(!showCustomImage)}
              className="px-2 py-0.5 rounded-lg text-[10.5px] sm:text-xs font-bold transition-all flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 cursor-pointer shadow-2xs"
            >
              {showCustomImage ? (
                <>
                  <Layers className="w-3 h-3 text-blue-700" />
                  <span>Bagan Diagram</span>
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3 text-amber-600" />
                  <span>Lihat Poster</span>
                </>
              )}
            </button>
          ) : <div />}

          {isAdmin && (
            <button
              type="button"
              onClick={() => {
                if (!isEditing) handleStartEdit();
                else setIsEditing(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-[10.5px] sm:text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ml-auto ${
                isEditing
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditing ? 'Tutup Edit' : 'Edit Struktur Organisasi'}</span>
            </button>
          )}
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="mb-2.5 p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 animate-fade-in">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Struktur Organisasi berhasil disimpan!</span>
          </div>
        )}

        {/* Dual Logos: Kemenimipas (Kiri) & Pemasyarakatan (Kanan) Sesuai GANDENG (1).webp */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-2 sm:mb-3">
          {/* Logo Kiri: Kemenimipas */}
          <div className="relative group flex items-center justify-center">
            <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-3 border-amber-400 shadow-md transition-transform hover:scale-105 bg-[#0B192C] overflow-hidden flex items-center justify-center">
              <img 
                src={petaData.logoKiriUrl || '/logo.jpg'} 
                alt="Logo Kementerian Imigrasi dan Pemasyarakatan" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.jpg';
                }}
              />
            </div>
          </div>

          {/* Logo Kanan: Direktorat Jenderal Pemasyarakatan (Logo Resmi Pemasyarakatan) */}
          <div className="relative group flex items-center justify-center">
            <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 rounded-full bg-slate-900 border-2 sm:border-3 border-amber-400 p-0.5 flex items-center justify-center shadow-md transition-transform hover:scale-105 overflow-hidden">
              <img 
                src={petaData.logoKananUrl || '/logo_pemasyarakatan.svg'} 
                alt="Logo Resmi Pemasyarakatan" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo_pemasyarakatan.svg';
                }}
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm xs:text-base sm:text-xl md:text-2xl font-black text-[#0B192C] tracking-wide leading-tight">
          STRUKTUR ORGANISASI
        </h3>
        <p className="text-[9.5px] xs:text-[10.5px] sm:text-xs md:text-sm font-extrabold text-[#0B192C] tracking-wider mt-0.5">
          LEMBAGA PEMASYARAKATAN PEREMPUAN
        </p>
        <p className="text-[9.5px] xs:text-[10.5px] sm:text-xs md:text-sm font-extrabold text-amber-600 tracking-widest mt-0.5">
          KELAS III PANGKALPINANG
        </p>
      </div>

      {/* Admin Edit Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="relative z-20 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/95 border border-amber-300 space-y-3 mb-4 text-left animate-fade-in">
          <div className="flex items-center justify-between pb-1.5 border-b border-amber-200">
            <div className="flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5 text-amber-800" />
              <h5 className="font-extrabold text-xs sm:text-sm text-slate-900">
                Formulir Edit Struktur Organisasi &amp; Pejabat
              </h5>
            </div>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
              Admin Mode &bull; Supabase Sync
            </span>
          </div>

          {/* Section: Logo Kiri, Logo Kanan, & Poster Bagan Struktur */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <div className="p-2.5 bg-white rounded-lg border border-amber-200 shadow-2xs">
              <ImageUploadField
                label="Logo Sebelah Kiri (Kemenimipas)"
                currentUrl={formData.logoKiriUrl || '/logo.jpg'}
                onUrlChange={(url) => setFormData({ ...formData, logoKiriUrl: url })}
                placeholder="Bawaan: /logo.jpg atau upload..."
              />
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-amber-200 shadow-2xs">
              <ImageUploadField
                label="Logo Sebelah Kanan (Pemasyarakatan)"
                currentUrl={formData.logoKananUrl || '/logo_pemasyarakatan.svg'}
                onUrlChange={(url) => setFormData({ ...formData, logoKananUrl: url })}
                placeholder="Bawaan: /logo_pemasyarakatan.svg atau upload..."
              />
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-amber-200 shadow-2xs">
              <ImageUploadField
                label="Poster Bagan Struktur Organisasi (Opsional)"
                currentUrl={formData.structureImageUrl}
                onUrlChange={(url) => setFormData({ ...formData, structureImageUrl: url })}
                placeholder="Link gambar atau upload poster bagan..."
                isCover
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {/* 1. Kepala Lapas */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-amber-700 block mb-1 uppercase">
                1. Kepala Lapas
              </span>
              <div className="space-y-1.5">
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Kalapas"
                  value={formData.kepalaLapas.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kepalaLapas: { ...formData.kepalaLapas, name: e.target.value.toUpperCase() },
                    })
                  }
                  className="w-full px-2 py-1 text-xs rounded border border-slate-300 font-bold"
                />
                <input
                  type="text"
                  required
                  placeholder="NIP"
                  value={formData.kepalaLapas.nip}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kepalaLapas: { ...formData.kepalaLapas, nip: e.target.value },
                    })
                  }
                  className="w-full px-2 py-1 text-xs rounded border border-slate-300 font-mono"
                />
                <ImageUploadField
                  label="Foto Profil Kalapas"
                  currentUrl={formData.kepalaLapas.photoUrl}
                  onUrlChange={(url) =>
                    setFormData({
                      ...formData,
                      kepalaLapas: { ...formData.kepalaLapas, photoUrl: url },
                    })
                  }
                  placeholder="URL foto atau klik upload..."
                />
              </div>
            </div>

            {/* 2. Kepala Urusan TU */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-blue-700 block mb-1 uppercase">
                2. Kepala Urusan Tata Usaha (Kepala Urusan TU)
              </span>
              <div className="space-y-1.5">
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Kepala Urusan TU"
                  value={formData.kaurTu.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kaurTu: { ...formData.kaurTu, name: e.target.value.toUpperCase() },
                    })
                  }
                  className="w-full px-2 py-1 text-xs rounded border border-slate-300 font-bold"
                />
                <input
                  type="text"
                  required
                  placeholder="NIP"
                  value={formData.kaurTu.nip}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kaurTu: { ...formData.kaurTu, nip: e.target.value },
                    })
                  }
                  className="w-full px-2 py-1 text-xs rounded border border-slate-300 font-mono"
                />
                <ImageUploadField
                  label="Foto Profil Kepala Urusan TU"
                  currentUrl={formData.kaurTu.photoUrl}
                  onUrlChange={(url) =>
                    setFormData({
                      ...formData,
                      kaurTu: { ...formData.kaurTu, photoUrl: url },
                    })
                  }
                  placeholder="URL foto atau klik upload..."
                />
              </div>
            </div>

            {/* 3. Kasubsi Admisi & Orientasi */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-emerald-700 block mb-1 uppercase">
                3. Kasubsi Admisi &amp; Orientasi
              </span>
              <div className="space-y-1.5">
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={formData.subseksi[0]?.name || ''}
                  onChange={(e) => {
                    const updated = [...formData.subseksi];
                    updated[0] = { ...updated[0], name: e.target.value.toUpperCase() };
                    setFormData({ ...formData, subseksi: updated });
                  }}
                  className="w-full px-2 py-1 text-xs rounded border border-slate-300 font-bold"
                />
                <input
                  type="text"
                  required
                  placeholder="NIP"
                  value={formData.subseksi[0]?.nip || ''}
                  onChange={(e) => {
                    const updated = [...formData.subseksi];
                    updated[0] = { ...updated[0], nip: e.target.value };
                    setFormData({ ...formData, subseksi: updated });
                  }}
                  className="w-full px-2 py-1 text-xs rounded border border-slate-300 font-mono"
                />
                <ImageUploadField
                  label="Foto Kasubsi AO"
                  currentUrl={formData.subseksi[0]?.photoUrl}
                  onUrlChange={(url) => {
                    const updated = [...formData.subseksi];
                    updated[0] = { ...updated[0], photoUrl: url };
                    setFormData({ ...formData, subseksi: updated });
                  }}
                />
              </div>
            </div>

            {/* 4. Kasubsi Pembinaan */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-indigo-700 block mb-1 uppercase">
                4. Kasubsi Pembinaan
              </span>
              <div className="space-y-1.5">
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={formData.subseksi[1]?.name || ''}
                  onChange={(e) => {
                    const updated = [...formData.subseksi];
                    updated[1] = { ...updated[1], name: e.target.value.toUpperCase() };
                    setFormData({ ...formData, subseksi: updated });
                  }}
                  className="w-full px-2 py-1 text-xs rounded border border-slate-300 font-bold"
                />
                <input
                  type="text"
                  required
                  placeholder="NIP"
                  value={formData.subseksi[1]?.nip || ''}
                  onChange={(e) => {
                    const updated = [...formData.subseksi];
                    updated[1] = { ...updated[1], nip: e.target.value };
                    setFormData({ ...formData, subseksi: updated });
                  }}
                  className="w-full px-2 py-1 text-xs rounded border border-slate-300 font-mono"
                />
                <ImageUploadField
                  label="Foto Kasubsi Pembinaan"
                  currentUrl={formData.subseksi[1]?.photoUrl}
                  onUrlChange={(url) => {
                    const updated = [...formData.subseksi];
                    updated[1] = { ...updated[1], photoUrl: url };
                    setFormData({ ...formData, subseksi: updated });
                  }}
                />
              </div>
            </div>

            {/* 5. Kasubsi Kamtib */}
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs md:col-span-2">
              <span className="text-[10px] font-bold text-rose-700 block mb-1 uppercase">
                5. Kasubsi Keamanan &amp; Ketertiban
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={formData.subseksi[2]?.name || ''}
                  onChange={(e) => {
                    const updated = [...formData.subseksi];
                    updated[2] = { ...updated[2], name: e.target.value.toUpperCase() };
                    setFormData({ ...formData, subseksi: updated });
                  }}
                  className="w-full px-2 py-1 text-xs rounded border border-slate-300 font-bold"
                />
                <input
                  type="text"
                  required
                  placeholder="NIP"
                  value={formData.subseksi[2]?.nip || ''}
                  onChange={(e) => {
                    const updated = [...formData.subseksi];
                    updated[2] = { ...updated[2], nip: e.target.value };
                    setFormData({ ...formData, subseksi: updated });
                  }}
                  className="w-full px-2 py-1 text-xs rounded border border-slate-300 font-mono"
                />
              </div>
              <div className="mt-1.5">
                <ImageUploadField
                  label="Foto Kasubsi Kamtib"
                  currentUrl={formData.subseksi[2]?.photoUrl}
                  onUrlChange={(url) => {
                    const updated = [...formData.subseksi];
                    updated[2] = { ...updated[2], photoUrl: url };
                    setFormData({ ...formData, subseksi: updated });
                  }}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSavingCloud}
                className="px-3.5 py-1 rounded-lg bg-[#0B192C] hover:bg-[#1E3E62] text-white font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer disabled:opacity-70"
              >
                {isSavingCloud ? (
                  <>
                    <CloudUpload className="w-3 h-3 text-amber-400 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3 h-3 text-amber-400" />
                    <span>Simpan Perubahan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* OPTION A: Custom Image Poster (if uploaded by admin) */}
      {showCustomImage && petaData.structureImageUrl && !isEditing ? (
        <div className="relative z-10 max-w-2xl mx-auto rounded-lg sm:rounded-xl overflow-hidden border border-[#0B192C] shadow-sm mb-3 bg-slate-100">
          <img 
            src={petaData.structureImageUrl} 
            alt="Bagan Struktur Organisasi Resmi Lapas Perempuan Kelas III Pangkalpinang"
            className="w-full h-auto object-contain max-h-[500px] mx-auto"
          />
        </div>
      ) : (
        /* OPTION B: UNIFIED COMPACT TREE DIAGRAM (NEVER CUT OFF ON MOBILE OR DESKTOP) */
        <div className="relative z-10 w-full max-w-2xl mx-auto px-0.5 sm:px-2">
          {/* Row 1: KEPALA LAPAS (Top Center) */}
          <div className="flex justify-center">
            <div className="w-48 xs:w-56 sm:w-64 max-w-[85%]">
              <JobBox officer={petaData.kepalaLapas} />
            </div>
          </div>

          {/* Vertical line from Kepala Lapas */}
          <div className="flex justify-center">
            <div className="w-0.5 bg-[#0B192C] h-3 xs:h-4 sm:h-5" />
          </div>

          {/* Row 2: Branch Line to KAUR TU (On the right of central trunk, zero overflow) */}
          <div className="relative w-full h-14 xs:h-16 sm:h-20 flex items-center">
            {/* Main vertical trunk continuing down in exact center */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#0B192C]" />

            {/* Horizontal branch line from center to right */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-[#0B192C] w-4 xs:w-6 sm:w-10" />

            {/* KAUR TU Box positioned to the right of central trunk */}
            <div className="absolute left-[calc(50%+1rem)] xs:left-[calc(50%+1.5rem)] sm:left-[calc(50%+2.5rem)] top-1/2 -translate-y-1/2 w-40 xs:w-48 sm:w-56 max-w-[46%]">
              <JobBox officer={petaData.kaurTu} />
            </div>
          </div>

          {/* Vertical trunk continuing to horizontal distributor */}
          <div className="flex justify-center">
            <div className="w-0.5 bg-[#0B192C] h-3 xs:h-3.5 sm:h-4" />
          </div>

          {/* Horizontal Connector Line for 3 Subsections */}
          <div className="relative w-full px-5 xs:px-7 sm:px-12">
            <div className="w-full h-0.5 bg-[#0B192C] relative">
              {/* Left drop line directly into center of column 1 */}
              <div className="absolute left-[16.6%] top-0 w-0.5 h-2.5 xs:h-3 sm:h-3.5 bg-[#0B192C]" />
              {/* Center drop line directly into center of column 2 */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-2.5 xs:h-3 sm:h-3.5 bg-[#0B192C]" />
              {/* Right drop line directly into center of column 3 */}
              <div className="absolute right-[16.6%] top-0 w-0.5 h-2.5 xs:h-3 sm:h-3.5 bg-[#0B192C]" />
            </div>
          </div>

          {/* Row 3: 3 SUBSEKSI BOXES (Fits naturally within container width!) */}
          <div className="grid grid-cols-3 gap-1 xs:gap-1.5 sm:gap-3 pt-2.5 xs:pt-3 sm:pt-3.5">
            {petaData.subseksi.map((officer, idx) => (
              <div key={idx} className="w-full min-w-0">
                <JobBox officer={officer} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Information Notice */}
      <div className="relative z-10 mt-4 sm:mt-5 pt-2 border-t border-slate-200 text-center">
        <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
          Ditetapkan berdasarkan Struktur Baku Satuan Kerja &bull; Kemenimipas RI
        </p>
      </div>
    </div>
  );
};
