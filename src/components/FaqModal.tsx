import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  GraduationCap, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Laptop, 
  HardDrive,
  Users,
  PackageSearch,
  FileText
} from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
  category: 'magang' | 'sistem' | 'akses';
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs: FaqItem[] = [
    {
      category: 'magang',
      question: 'Apakah latar belakang dan tujuan pembuatan proyek SILAPAS-INTEGRATED ini?',
      answer: (
        <div className="space-y-2.5">
          <p className="leading-relaxed">
            Proyek portal terintegrasi <strong className="text-slate-900">SILAPAS-INTEGRATED (Sistem Informasi Layanan Kehumasan, BMN, dan SDM Lapas)</strong> ini dibangun dan dikembangkan secara khusus untuk <span className="font-semibold text-blue-900">memenuhi kewajiban pembuatan program inovasi teknologi digital selama proses pelaksanaan Magang Hub (Magang Hub Angkatan 2 Batch 1)</span> di Lembaga Pemasyarakatan Perempuan Kelas III Pangkal Pinang.
          </p>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
            💡 <strong>Tujuan Inovasi:</strong> Mengintegrasikan sistem pelaporan mandiri internal (Pengelolaan Persediaan BMN &amp; Jurnal Harian Pegawai SDM), repositori data kepegawaian Google Drive, serta etalase media sosial dan layanan informasi pengaduan masyarakat ke dalam satu pintu akses terpadu yang efisien, transparan, dan akuntabel.
          </div>
        </div>
      ),
    },
    {
      category: 'magang',
      question: 'Apa saja fitur dan inovasi yang dihasilkan dalam program magang ini?',
      answer: (
        <div className="space-y-2">
          <p>Selama proses magang, terdapat beberapa pilar inovasi yang diintegrasikan:</p>
          <ul className="space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="p-1 rounded bg-blue-100 text-blue-800 shrink-0 mt-0.5">
                <PackageSearch className="w-3.5 h-3.5" />
              </span>
              <span><strong>SI-BMN (Sistem Persediaan BMN):</strong> Digitalisasi pengajuan barang persediaan kantor, verifikasi berjenjang pimpinan, pemotongan stok otomatis, hingga rekapitulasi data Excel &amp; Berita Acara PDF.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="p-1 rounded bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                <FileText className="w-3.5 h-3.5" />
              </span>
              <span><strong>JHP (Jurnal Harian Pegawai):</strong> Formulir pencatatan online presensi dan uraian capaian tugas harian ASN demi kedisiplinan dan evaluasi kinerja SDM.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="p-1 rounded bg-sky-100 text-sky-800 shrink-0 mt-0.5">
                <HardDrive className="w-3.5 h-3.5" />
              </span>
              <span><strong>Data Informasi Pegawai (Google Drive):</strong> Integrasi satu pintu menuju cloud repositori arsip digital kepegawaian, SK dinas, dan dokumen kedinasan.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="p-1 rounded bg-pink-100 text-pink-800 shrink-0 mt-0.5">
                <Users className="w-3.5 h-3.5" />
              </span>
              <span><strong>Hub Media Sosial Resmi &amp; Profil UPT:</strong> Sentralisasi publikasi kehumasan (Instagram, Facebook, YouTube, X, TikTok) dan keterbukaan profil satuan kerja serta pejabat.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      category: 'sistem',
      question: 'Siapa saja pihak yang menjadi pengguna (user) dari portal SILAPAS ini?',
      answer: (
        <p>
          Pengguna portal terbagi menjadi dua segmen utama: 
          <strong> (1) Pegawai &amp; Pejabat Internal Lapas:</strong> Menggunakan SI-BMN untuk permintaan persediaan ATK/alat kantor, pengisian JHP untuk laporan kinerja harian, dan akses data pegawai di Google Drive. 
          <strong> (2) Masyarakat Umum &amp; Keluarga Warga Binaan:</strong> Memperoleh informasi profil kantor, program pembinaan narapidana, kanal media sosial resmi, serta nomor WhatsApp pengaduan terpadu.
        </p>
      ),
    },
    {
      category: 'akses',
      question: 'Bagaimana cara mengakses link Google Drive Data Informasi Pegawai?',
      answer: (
        <p>
          Anda dapat memilih tab kategori <strong>&ldquo;Data Informasi Pegawai&rdquo;</strong> di halaman utama atau memilih menu &ldquo;Data Informasi Pegawai&rdquo; melalui navigasi Hamburger Menu di kiri atas. Klik tombol &ldquo;Buka Google Drive Pegawai&rdquo; untuk langsung diarahkan ke folder repositori cloud dokumen dinas.
        </p>
      ),
    },
    {
      category: 'sistem',
      question: 'Apakah sistem ini terhubung dengan Standar Operasional Prosedur (SOP) resmi?',
      answer: (
        <p>
          Ya, sistem telah disesuaikan dengan SOP Tata Usaha dan Kehumasan Lapas Perempuan Kelas III Pangkal Pinang serta ketentuan Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia. Pada setiap kartu layanan inovasi tersedia tombol interaktif untuk melihat bagan diagram alur SOP 6 langkah secara mendalam.
        </p>
      ),
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#0F2C59] to-[#1E3E62] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-amber-400/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  TANYA JAWAB (FAQ)
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full">
                  Inovasi Magang Hub
                </span>
              </div>
              <p className="text-xs text-sky-200">
                Informasi &amp; Penjelasan Proyek Inovasi SILAPAS-INTEGRATED
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

        {/* Hero Banner inside FAQ */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900/10 via-amber-500/10 to-blue-900/10 border-b border-slate-200 shrink-0">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#0B192C] text-amber-400 rounded-xl shadow-xs shrink-0 mt-0.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm">
              <h4 className="font-extrabold text-[#0B192C]">
                Proyek Inovasi Digital Magang Hub Angkatan 2 Batch 1
              </h4>
              <p className="text-slate-600 mt-0.5 leading-relaxed">
                Aplikasi ini dikembangkan sebagai karya inovasi selama masa penugasan magang di <strong>Lembaga Pemasyarakatan Perempuan Kelas III Pangkal Pinang</strong>, di bawah naungan Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`rounded-xl border transition-all ${
                  isOpen 
                    ? 'border-blue-400 bg-blue-50/20 shadow-xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-slate-900"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs flex items-center justify-center font-extrabold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-700" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 sm:px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-slate-500">
            SILAPAS-INTEGRATED &bull; Magang Hub Angkatan 2 Batch 1
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Tutup FAQ
          </button>
        </div>
      </div>
    </div>
  );
};
