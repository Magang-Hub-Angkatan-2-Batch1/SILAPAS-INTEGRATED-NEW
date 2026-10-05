import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Landmark, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Award, 
  CheckCircle2, 
  Sparkles,
  HeartHandshake,
  Activity,
  FileText
} from 'lucide-react';

interface OfficeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficeProfileModal: React.FC<OfficeProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'profil' | 'visimisi' | 'tusi' | 'fasilitas'>('profil');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#0F2C59] to-[#1E3E62] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-amber-400/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Landmark className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  PROFIL KANTOR
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full">
                  UPT Resmi
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

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-4 sm:px-6 py-2.5 border-b border-slate-200 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('profil')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'profil'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Gambaran Umum</span>
          </button>

          <button
            onClick={() => setActiveTab('visimisi')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'visimisi'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Visi, Misi &amp; Nilai</span>
          </button>

          <button
            onClick={() => setActiveTab('tusi')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'tusi'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Tugas Pokok &amp; Fungsi</span>
          </button>

          <button
            onClick={() => setActiveTab('fasilitas')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'fasilitas'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fasilitas &amp; Layanan</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
          {/* TAB 1: GAMBARAN UMUM */}
          {activeTab === 'profil' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-amber-50/50 border border-blue-100">
                <img
                  src="/logo.jpg"
                  alt="Logo Kementerian Imigrasi dan Pemasyarakatan"
                  className="w-20 h-20 rounded-full border-2 border-amber-400 object-cover shadow-sm shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase block">
                    Unit Pelaksana Teknis (UPT) Pemasyarakatan
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-[#0B192C]">
                    Lapas Perempuan Kelas III Pangkal Pinang
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Berada di bawah Kantor Wilayah Direktorat Jenderal Pemasyarakatan / Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia di Provinsi Kepulauan Bangka Belitung.
                  </p>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Tentang Lembaga Pemasyarakatan</span>
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 text-justify">
                  Lembaga Pemasyarakatan Perempuan (LPP) Kelas III Pangkalpinang merupakan instansi penegakan hukum dan pembinaan pemasyarakatan yang berdedikasi khusus bagi warga binaan pemasyarakatan (WBP) dan tahanan wanita di wilayah Bangka Belitung. Institusi ini bertekad menyelenggarakan sistem pemasyarakatan yang berorientasi pada pemulihan budi pekerti, peningkatan kemandirian, dan reintegrasi sosial secara bermartabat.
                </p>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-xs mb-1">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>Alamat Instansi</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Jl. Sanggul Dewa No.1, Kel. Batin Tikal, Kec. Taman Sari, Kota Pangkal Pinang, Kepulauan Bangka Belitung, 33115
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-xs mb-1">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Kontak &amp; WhatsApp Humas</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Layanan Aspirasi &amp; Pengaduan: <strong className="text-slate-800">0812-7434-6822</strong>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Email: lppkelasiiipkp@gmail.com
                  </p>
                </div>
              </div>

              {/* Map Button */}
              <div className="flex justify-end pt-1">
                <a
                  href="https://maps.google.com/?q=Lapas+Perempuan+Kelas+III+Pangkalpinang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  <span>Buka Peta Lokasi di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: VISI, MISI & TATA NILAI */}
          {activeTab === 'visimisi' && (
            <div className="space-y-6">
              {/* Visi */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-950 font-black text-sm mb-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>VISI LAPAS PEREMPUAN PANGKALPINANG</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold italic">
                  &ldquo;Pulihnya kesatuan hubungan hidup, kehidupan dan penghidupan warga binaan pemasyarakatan sebagai individu, anggota masyarakat dan makhluk Tuhan YME.&rdquo;
                </p>
              </div>

              {/* Misi */}
              <div>
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>MISI RESMI</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    &ldquo;Melaksanakan perawatan tahanan, pembinaan dan pembimbingan warga binaan pemasyarakatan dalam kerangka penegakan hukum, pencegahan dan penanggulangan kejahatan serta pemajuan dan perlindungan hak asasi manusia.&rdquo;
                  </p>
                </div>
              </div>

              {/* Tata Nilai */}
              <div className="pt-2">
                <h6 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Tata Nilai Kemenimipas: PASTI &amp; BerAKHLAK
                </h6>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { term: 'Profesional', desc: 'Bekerja tepat dan tuntas' },
                    { term: 'Akuntabel', desc: 'Dapat dipertanggungjawabkan' },
                    { term: 'Sinergi', desc: 'Kolaborasi lintas sektor' },
                    { term: 'Transparan', desc: 'Terbuka dan jujur' },
                    { term: 'Inovatif', desc: 'Solusi digital SILAPAS' },
                  ].map((val, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <div className="text-xs font-black text-blue-900">{val.term}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{val.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TUGAS POKOK & FUNGSI */}
          {activeTab === 'tusi' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                  Tugas Pokok Lapas Perempuan Kelas III Pangkal Pinang
                </h5>
                <p className="text-xs text-slate-600">
                  Melaksanakan pemasyarakatan narapidana dan anak didik pemasyarakatan serta pengelolaan tahanan wanita berdasarkan peraturan perundang-undangan Republik Indonesia.
                </p>
              </div>

              <div>
                <h6 className="font-bold text-slate-900 text-xs sm:text-sm mb-3">
                  Fungsi-Fungsi Utama Organisasi:
                </h6>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                    <span className="text-xs font-bold text-blue-900 block mb-1">
                      1. Pelayanan &amp; Pembinaan WBP
                    </span>
                    <p className="text-xs text-slate-600">
                      Penyelenggaraan pembinaan kepribadian, pendidikan budi pekerti, bimbingan mental spiritual, serta program pembinaan kemandirian vokasional.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                    <span className="text-xs font-bold text-blue-900 block mb-1">
                      2. Pemeliharaan Keamanan &amp; Ketertiban
                    </span>
                    <p className="text-xs text-slate-600">
                      Pengawasan pintu utama (P2U), patroli keliling, penggeledahan berkala, penegakan tata tertib hunian, dan penanggulangan potensi kerawanan.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                    <span className="text-xs font-bold text-blue-900 block mb-1">
                      3. Layanan Kesehatan &amp; Perawatan
                    </span>
                    <p className="text-xs text-slate-600">
                      Pelayanan medis promotif, preventif, kuratif, penyediaan obat-obatan, penjaminan gizi makanan higienis, dan sanitasi lingkungan hunian.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                    <span className="text-xs font-bold text-blue-900 block mb-1">
                      4. Tata Usaha, SDM &amp; BMN
                    </span>
                    <p className="text-xs text-slate-600">
                      Pengelolaan administrasi kepegawaian (JHP), pembukuan keuangan negara, pencatatan persediaan dan aset Barang Milik Negara (SI-BMN), serta kehumasan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FASILITAS & SARPRAS */}
          {activeTab === 'fasilitas' && (
            <div className="space-y-4">
              {/* Data Blok Hunian dari Dokumen Resmi */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h6 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Kapasitas Blok &amp; Kamar Hunian (Total 141 Orang / 23 Kamar)
                  </h6>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                    Total Luas: 791 M²
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <strong className="block text-slate-900">DEWI SARTIKA</strong>
                    <span className="text-slate-500 text-[11px]">Luas: 292,5 M²</span>
                    <div className="text-blue-900 font-bold mt-1">Kapasitas: 60 Org</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <strong className="block text-slate-900">KARTINI</strong>
                    <span className="text-slate-500 text-[11px]">Luas: 156 M²</span>
                    <div className="text-blue-900 font-bold mt-1">Kapasitas: 28 Org</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <strong className="block text-slate-900">CUT NYAK DIEN</strong>
                    <span className="text-slate-500 text-[11px]">Luas: 273 M²</span>
                    <div className="text-blue-900 font-bold mt-1">Kapasitas: 48 Org</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <strong className="block text-slate-900">STRAPSEL</strong>
                    <span className="text-slate-500 text-[11px]">Luas: 69 M²</span>
                    <div className="text-rose-700 font-bold mt-1">Kapasitas: 5 Org</div>
                  </div>
                </div>
              </div>

              {/* Rincian Bangunan Kantor */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-900">Luas Bangunan Kantor (Total 1.012 M²)</span>
                  <span className="text-slate-500 text-[11px]">Sesuai APBNP Revitalisasi</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
                  <div className="p-2 bg-white rounded border border-slate-200">🏢 Gedung Kantor 2 Lantai: <strong>352 M²</strong></div>
                  <div className="p-2 bg-white rounded border border-slate-200">🛠️ BLK dan KPLP: <strong>378 M²</strong></div>
                  <div className="p-2 bg-white rounded border border-slate-200">🍲 Dapur, BAMA, R.MKN: <strong>180 M²</strong></div>
                  <div className="p-2 bg-white rounded border border-slate-200">🕌 Musholla: <strong>36 M²</strong></div>
                  <div className="p-2 bg-white rounded border border-slate-200">🚨 Pos Jaga Atas: <strong>36 M²</strong></div>
                  <div className="p-2 bg-white rounded border border-slate-200">🛡️ Pos Jaga Bawah: <strong>30 M²</strong></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-800 mb-1">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>Klinik Pratama Terakreditasi</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Fasilitas medis berizin resmi dengan tenaga dokter dan perawat, melayani pemeriksaan kesehatan harian warga binaan perempuan.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-xs text-amber-800 mb-1">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Bengkel Kerja Kemandirian (Bimker)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Sentra pelatihan tata boga, salon kecantikan, kerajinan tangan khas, rajut sulam, dan budidaya tanaman hidroponik.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                💡 <strong>Informasi:</strong> Seluruh fasilitas dan sarana prasarana Lapas Perempuan Kelas III Pangkal Pinang dioperasikan dengan pengawasan standar keamanan tinggi dan pemenuhan hak-hak asasi manusia.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
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
