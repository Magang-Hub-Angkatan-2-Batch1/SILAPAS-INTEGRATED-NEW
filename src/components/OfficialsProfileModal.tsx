import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Award, 
  Shield, 
  Briefcase, 
  FileText, 
  Building, 
  CheckCircle, 
  ChevronRight,
  UserCheck,
  Quote
} from 'lucide-react';

interface OfficialsProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialsProfileModal: React.FC<OfficialsProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedSection, setSelectedSection] = useState<'kepala' | 'struktural' | 'struktur'>('kepala');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
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
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  PROFIL PEJABAT
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full">
                  Pimpinan &amp; Struktural
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

        {/* Tab Switcher */}
        <div className="bg-slate-100 px-4 sm:px-6 py-2.5 border-b border-slate-200 flex gap-2 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedSection('kepala')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedSection === 'kepala'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Kepala Lapas</span>
          </button>

          <button
            onClick={() => setSelectedSection('struktural')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedSection === 'struktural'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Pejabat Struktural</span>
          </button>

          <button
            onClick={() => setSelectedSection('struktur')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedSection === 'struktur'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Bagan Struktur Organisasi</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
          {/* TAB 1: KEPALA LAPAS */}
          {selectedSection === 'kepala' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0F2C59] to-[#0B192C] text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center md:items-start gap-5 relative z-10">
                  <div className="relative shrink-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-amber-400 to-sky-400 p-1 shadow-lg">
                      <div className="w-full h-full rounded-[14px] bg-[#0B192C] flex flex-col items-center justify-center p-3 text-center overflow-hidden">
                        <img 
                          src="/logo.jpg" 
                          alt="LPP Pangkalpinang"
                          className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 mb-1"
                        />
                        <span className="text-[10px] font-bold text-amber-300">Pimpinan UPT</span>
                      </div>
                    </div>
                    <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-900 shadow">
                      <CheckCircle className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="text-center md:text-left space-y-2">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold tracking-wide">
                      KEPALA LEMBAGA PEMASYARAKATAN
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Rina Setiari
                    </h4>
                    <p className="text-xs font-mono text-amber-300">
                      NIP. 19830410 200312 2 001
                    </p>
                    <p className="text-xs sm:text-sm text-sky-200">
                      Kepala Lapas Perempuan Kelas III Pangkal Pinang
                    </p>
                    <p className="text-xs text-slate-300 max-w-xl">
                      Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia &bull; Kantor Wilayah Kepulauan Bangka Belitung
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-700/80 flex items-start gap-3 text-xs text-slate-200">
                  <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="italic leading-relaxed">
                    &ldquo;Kami berkomitmen menghadirkan tata kelola pemasyarakatan yang bersih, transparan, dan berlandaskan keadilan humanis. Melalui portal terintegrasi SILAPAS, kami memastikan pelayanan terhadap masyarakat, optimalisasi pengelolaan BMN, dan pencatatan kinerja SDM pegawai berjalan secara akuntabel dan modern.&rdquo;
                  </p>
                </div>
              </div>

              {/* Tupoksi Kalapas */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-700" />
                  <span>Fungsi &amp; Tanggung Jawab Kepala Lapas</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                  <li>Memimpin penyelenggaraan seluruh tugas dan fungsi Lapas Perempuan Kelas III Pangkal Pinang.</li>
                  <li>Mengkoordinasikan program pembinaan kepribadian, kemandirian, dan pelayanan medis WBP.</li>
                  <li>Mengawasi stabilitas keamanan ketertiban serta menegakkan integritas aparatur pegawai.</li>
                  <li>Membina hubungan kerja sama lintas sektoral dengan APH (Aparat Penegak Hukum), Pemda, dan stakeholder terkait.</li>
                  <li>Mendorong inovasi digitalisasi layanan publik dan transparansi birokrasi pemerintahan.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: PEJABAT STRUKTURAL */}
          {selectedSection === 'struktural' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 mb-2">
                Unsur kepemimpinan operasional yang bertugas membantu Kepala Lapas dalam pelaksanaan tugas administratif, pembinaan narapidana, dan keamanan sesuai Surat Keputusan resmi:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Kaur TU */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0">
                      TU
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">
                        Evi Aswani
                      </h5>
                      <div className="text-[10px] font-mono text-slate-500">NIP. 19840408 200501 2 001</div>
                      <span className="text-[11px] text-blue-700 font-semibold">Kaur Tata Usaha (Kaur TU)</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Mengelola urusan kepegawaian (JHP), pembukuan keuangan dan DIPA, pencatatan persediaan dan aset Barang Milik Negara (SI-BMN), urusan persuratan dinas, dan kehumasan.
                  </p>
                </div>

                {/* 2. Kasubsi Admisi & Orientasi */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                      AO
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">
                        Ayu Annisa Pember
                      </h5>
                      <div className="text-[10px] font-mono text-slate-500">NIP. 19911115 201012 2 002</div>
                      <span className="text-[11px] text-amber-700 font-semibold">Kepala Subseksi Admisi &amp; Orientasi</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Penyelenggaraan penerimaan tahanan dan narapidana baru, registrasi berkas perkara, penilaian tingkat resiko (asesmen), serta program masa pengenalan lingkungan (Mapenaling).
                  </p>
                </div>

                {/* 3. Kasubsi Pembinaan */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs shrink-0">
                      BIN
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">
                        Mia Cahyani
                      </h5>
                      <div className="text-[10px] font-mono text-slate-500">NIP. 19830724 200801 2 001</div>
                      <span className="text-[11px] text-emerald-700 font-semibold">Kepala Subseksi Pembinaan</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Menyusun dan mengeksekusi program pembinaan mental spiritual keagamaan, pelatihan kemandirian vokasional (tata boga, kerajinan tangan, hidroponik), serta integrasi remisi dan PB/CB.
                  </p>
                </div>

                {/* 4. Kasubsi Kamtib */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-xs shrink-0">
                      KAMTIB
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">
                        Yistarati
                      </h5>
                      <div className="text-[10px] font-mono text-slate-500">NIP. 19800517 200501 2 002</div>
                      <span className="text-[11px] text-rose-700 font-semibold">Kepala Subseksi Keamanan &amp; Ketertiban</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Mengatur jadwal pengamanan regu jaga (Rupam), pengawasan pos komando, Penjaga Pintu Utama (P2U), razia penggeledahan blok hunian wanita, serta pemeliharaan sarana pengamanan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BAGAN STRUKTUR ORGANISASI */}
          {selectedSection === 'struktur' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm mb-4 text-center uppercase tracking-wide">
                  BAGAN STRUKTUR ORGANISASI LEMBAGA PEMASYARAKATAN PEREMPUAN KELAS III PANGKALPINANG
                </h5>

                {/* Visual Tree matching Official Document Image 1 */}
                <div className="max-w-2xl mx-auto flex flex-col items-center w-full">
                  {/* Puncak: Kepala Lapas */}
                  <div className="w-full max-w-[280px] p-3 sm:p-3.5 rounded-xl bg-[#0B192C] text-white text-center shadow-lg border-2 border-amber-400">
                    <span className="text-[10px] uppercase font-bold text-amber-300 block">Pimpinan UPT</span>
                    <strong className="text-xs sm:text-sm block">KEPALA LAPAS</strong>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">Rina Setiari</div>
                    <span className="text-[10px] font-mono text-slate-300">NIP: 198304102003122001</span>
                  </div>

                  {/* Vertical line down to Kaur TU */}
                  <div className="w-0.5 h-4 sm:h-6 bg-slate-400" />

                  {/* Kaur TU */}
                  <div className="w-full flex justify-center sm:justify-end sm:pr-8 relative">
                    <div className="w-full max-w-[240px] p-2.5 sm:p-3 rounded-xl bg-blue-900 text-white text-center shadow border border-blue-400">
                      <strong className="text-[11px] sm:text-xs block">KAUR TU</strong>
                      <div className="text-xs font-semibold text-white">Evi Aswani</div>
                      <span className="text-[10px] font-mono text-blue-200">NIP: 198404082005012001</span>
                    </div>
                  </div>

                  {/* Vertical line down */}
                  <div className="w-0.5 h-4 sm:h-6 bg-slate-400" />

                  {/* Horizontal connecting line for 3 Subsections (desktop) */}
                  <div className="w-full max-w-lg h-0.5 bg-slate-400 relative hidden sm:block">
                    <div className="absolute left-0 -top-1 w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <div className="absolute right-0 -top-1 w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <div className="absolute left-1/2 -top-1 w-2.5 h-2.5 rounded-full bg-slate-600 -translate-x-1/2" />
                  </div>

                  {/* 3 Subsections matching Image 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full pt-2 sm:pt-4">
                    {/* Admisi & Orientasi */}
                    <div className="p-3 rounded-xl bg-white border-2 border-slate-300 text-center shadow-xs">
                      <strong className="text-[10px] sm:text-[11px] text-slate-800 block leading-tight">
                        KEPALA SUBSEKSI ADMISI &amp; ORIENTASI
                      </strong>
                      <div className="text-xs font-bold text-slate-900 mt-1">Ayu Annisa Pember</div>
                      <span className="text-[10px] font-mono text-slate-500 block">NIP: 199111152010122002</span>
                    </div>

                    {/* Pembinaan */}
                    <div className="p-3 rounded-xl bg-white border-2 border-slate-300 text-center shadow-xs">
                      <strong className="text-[10px] sm:text-[11px] text-slate-800 block leading-tight">
                        KEPALA SUBSEKSI PEMBINAAN
                      </strong>
                      <div className="text-xs font-bold text-slate-900 mt-1">Mia Cahyani</div>
                      <span className="text-[10px] font-mono text-slate-500 block">NIP: 198307242008012001</span>
                    </div>

                    {/* Keamanan & Ketertiban */}
                    <div className="p-3 rounded-xl bg-white border-2 border-slate-300 text-center shadow-xs">
                      <strong className="text-[10px] sm:text-[11px] text-slate-800 block leading-tight">
                        KEPALA SUBSEKSI KEAMANAN &amp; KETERTIBAN
                      </strong>
                      <div className="text-xs font-bold text-slate-900 mt-1">Yistarati</div>
                      <span className="text-[10px] font-mono text-slate-500 block">NIP: 198005172005012002</span>
                    </div>
                  </div>
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
            className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
