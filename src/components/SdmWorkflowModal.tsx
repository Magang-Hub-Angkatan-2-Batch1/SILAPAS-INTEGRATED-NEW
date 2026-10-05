import React, { useState } from 'react';
import { 
  X, 
  Workflow, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  FileSpreadsheet, 
  FileText, 
  Database, 
  ClipboardList, 
  SearchCheck, 
  FileCheck, 
  ExternalLink,
  Sparkles,
  Info,
  Clock,
  UserCheck,
  Award
} from 'lucide-react';
import { SDM_WORKFLOW_STEPS } from '../data/services';

interface SdmWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SdmWorkflowModal: React.FC<SdmWorkflowModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'simulation'>('diagram');
  
  // Interactive simulation state
  const [namaPegawai, setNamaPegawai] = useState('Nurul Hidayah, S.Tr.Pas');
  const [nip, setNip] = useState('19950412 201901 2 001');
  const [unitKerja, setUnitKerja] = useState('Seksi Pembinaan Narapidana & Kegiatan Kerja');
  const [kegiatan, setKegiatan] = useState('Pengawasan & Pendampingan Pelatihan Kemandirian Tata Busana WBP');
  const [volume, setVolume] = useState('1 Laporan Kegiatan');
  const [durasi, setDurasi] = useState('4 Jam Pelaksanaan');
  const [status, setStatus] = useState<'pending' | 'submitted' | 'approved' | 'rejected'>('pending');
  const [logHistory, setLogHistory] = useState<string[]>([
    'Sistem Kepegawaian: Siap menerima pelaporan Jurnal Harian Pegawai hari ini.',
  ]);

  if (!isOpen) return null;

  const handleKirimLaporan = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitted');
    setLogHistory((prev) => [
      `[${new Date().toLocaleTimeString()}] Laporan Jurnal Harian terkirim oleh ${namaPegawai} (NIP: ${nip}). Tugas: "${kegiatan}". Menunggu verifikasi atasan langsung.`,
      ...prev,
    ]);
  };

  const handleVerifikasiAtasan = (isApproved: boolean) => {
    if (isApproved) {
      setStatus('approved');
      setLogHistory((prev) => [
        `[${new Date().toLocaleTimeString()}] Status: DISETUJUI oleh Kasubag TU / Kasi. Skor Produktivitas: 100%. Data masuk ke Rekapitulasi Excel & dokumen LCKH (Laporan Capaian Kinerja Harian) PDF siap cetak.`,
        ...prev,
      ]);
    } else {
      setStatus('rejected');
      setLogHistory((prev) => [
        `[${new Date().toLocaleTimeString()}] Status: PERBAIKAN / DITOLAK. Catatan Atasan: Uraian hasil kegiatan perlu dilengkapi rincian dokumentasi foto evidence.`,
        ...prev,
      ]);
    }
  };

  const resetSimulation = () => {
    setStatus('pending');
    setLogHistory(['Sistem Kepegawaian: Simulasi direset. Siap menerima pelaporan baru.']);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#0F2C59] to-[#1E3E62] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-400/20 text-sky-300 border border-sky-400/30">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="text-xs text-sky-200">
                  Lapas Perempuan Kelas III Pangkal Pinang
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                JURNAL HARIAN PEGAWAI
              </h2>
              <p className="text-xs text-slate-300">
                Alur SOP Digitalisasi Pelaporan Kinerja Harian, Monitoring Disiplin, Evaluasi Atasan, hingga Rekapitulasi SKP &amp; Tukin
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title="Tutup Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 pt-3 flex gap-4 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'diagram'
                ? 'border-blue-700 text-blue-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Workflow className="w-4 h-4" />
            Bagan Alur 6 Tahap
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'simulation'
                ? 'border-blue-700 text-blue-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            Simulasi Interaktif Jurnal Kinerja
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Google Form Live Info Banner */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-blue-950 via-sky-900 to-[#0F2C59] text-white rounded-xl border border-sky-500/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-sky-500/20 rounded-lg text-sky-300 border border-sky-400/30">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-400 text-slate-950 px-2 py-0.5 rounded">
                    Formulir Aktif
                  </span>
                  <span className="text-xs text-sky-200">Google Form Presensi &amp; Kinerja</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  Formulir Jurnal Harian Pegawai Siap Diisi Setiap Hari Dinas
                </h3>
              </div>
            </div>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSczR96TJlFq2dgl5CjutF-hiFrhwXSCqkqifrRo66SJS34B4g/viewform?usp=send_form"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs rounded-lg shadow transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Buka Google Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {activeTab === 'diagram' ? (
            <div>
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl mb-6 text-xs sm:text-sm text-sky-900 flex items-start gap-3">
                <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <p>
                  SOP Jurnal Harian Pegawai memastikan seluruh aktivitas kedinasan, tugas pengamanan, pembinaan WBP, 
                  maupun administrasi ketatausahaan terdokumentasi secara transparan, terukur, dan terhubung langsung 
                  dengan pemenuhan Sasaran Kinerja Pegawai (SKP) serta evaluasi Tunjangan Kinerja (Tukin).
                </p>
              </div>

              {/* Step by step grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SDM_WORKFLOW_STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-sky-400 hover:shadow-md transition-all relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-7 h-7 rounded-full bg-[#0F2C59] text-white flex items-center justify-center font-bold text-xs">
                          {step.step}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {step.actor}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium text-sky-700 flex items-center gap-1">
                      {step.step === 1 && <ClipboardList className="w-3.5 h-3.5" />}
                      {step.step === 2 && <Database className="w-3.5 h-3.5" />}
                      {step.step === 3 && <SearchCheck className="w-3.5 h-3.5" />}
                      {step.step === 4 && <FileCheck className="w-3.5 h-3.5" />}
                      {step.step === 5 && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {step.step === 6 && <FileSpreadsheet className="w-3.5 h-3.5" />}
                      <span>Tahap Prosedur #{step.step}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Output specifications */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Dokumen &amp; Integrasi Keluaran Kepegawaian:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="text-slate-800">Rekapitulasi Kinerja Excel:</strong>
                      <span className="text-slate-500 block">Daftar kehadiran &amp; pemenuhan jurnal harian seluruh pegawai bulanan.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <strong className="text-slate-800">Dokumen LCKH (PDF):</strong>
                      <span className="text-slate-500 block">Laporan Capaian Kinerja Harian sah yang telah diverifikasi atasan langsung.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Simulation Tab */
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Input Side */}
                <div className="lg:col-span-6 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <ClipboardList className="w-4 h-4 text-sky-700" />
                      1. Form Input Jurnal (Simulasi)
                    </h4>
                    <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-semibold">
                      Mode Pelaporan
                    </span>
                  </div>

                  <form onSubmit={handleKirimLaporan} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Nama Pegawai:</label>
                        <input 
                          type="text" 
                          value={namaPegawai}
                          onChange={(e) => setNamaPegawai(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">NIP Pegawai:</label>
                        <input 
                          type="text" 
                          value={nip}
                          onChange={(e) => setNip(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Unit / Seksi Kerja:</label>
                      <select 
                        value={unitKerja}
                        onChange={(e) => setUnitKerja(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Seksi Pembinaan Narapidana & Kegiatan Kerja">Seksi Pembinaan Narapidana & Kegiatan Kerja</option>
                        <option value="Seksi Administrasi Keamanan & Tata Tertib">Seksi Administrasi Keamanan & Tata Tertib</option>
                        <option value="Kesatuan Pengamanan Lapas (KPLP)">Kesatuan Pengamanan Lapas (KPLP)</option>
                        <option value="Sub Bagian Tata Usaha (Kepegawaian & Keuangan)">Sub Bagian Tata Usaha (Kepegawaian & Keuangan)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Uraian Tugas / Aktivitas Harian:</label>
                      <select 
                        value={kegiatan}
                        onChange={(e) => setKegiatan(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Pengawasan & Pendampingan Pelatihan Kemandirian Tata Busana WBP">Pengawasan &amp; Pendampingan Pelatihan Kemandirian Tata Busana WBP</option>
                        <option value="Pemeriksaan Keliling Blok Hunian & Kontrol Sanitasi Kamar WBP">Pemeriksaan Keliling Blok Hunian &amp; Kontrol Sanitasi Kamar WBP</option>
                        <option value="Penyusunan & Penginputan Berkas Usulan Remisi / Pembebasan Bersyarat WBP">Penyusunan &amp; Penginputan Berkas Usulan Remisi / Pembebasan Bersyarat WBP</option>
                        <option value="Pelayanan Kunjungan Tatap Muka & Penggeledahan Barang Bawaan Titipan">Pelayanan Kunjungan Tatap Muka &amp; Penggeledahan Barang Bawaan Titipan</option>
                        <option value="Penyusunan Laporan Administrasi & Rekapitulasi Data Kepegawaian">Penyusunan Laporan Administrasi &amp; Rekapitulasi Data Kepegawaian</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Volume Hasil Output:</label>
                        <input 
                          type="text" 
                          value={volume}
                          onChange={(e) => setVolume(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Durasi Pelaksanaan:</label>
                        <input 
                          type="text" 
                          value={durasi}
                          onChange={(e) => setDurasi(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
                      <span className="text-slate-600 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Bukti Dukung (Evidence Foto):
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300">
                        Terlampir &amp; Sah
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitted'}
                      className="w-full mt-2 py-2.5 px-4 bg-[#0F2C59] hover:bg-[#1E3E62] text-white rounded-lg font-bold shadow transition-colors flex items-center justify-center gap-2"
                    >
                      <ClipboardList className="w-4 h-4" />
                      Kirim Laporan Jurnal Harian
                    </button>
                  </form>
                </div>

                {/* Workflow Simulation Box */}
                <div className="lg:col-span-6 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-sky-700" />
                        2. Verifikasi &amp; Evaluasi Kinerja
                      </h4>
                      <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded border border-sky-300">
                        Disiplin SKP Kemenimipas
                      </span>
                    </div>

                    {/* Status card */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Status Laporan:</span>
                        {status === 'pending' && (
                          <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            Menunggu Pengisian
                          </span>
                        )}
                        {status === 'submitted' && (
                          <span className="font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded animate-pulse">
                            Menunggu Verifikasi Atasan Langsung
                          </span>
                        )}
                        {status === 'approved' && (
                          <span className="font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Disetujui &amp; Rekap Terbit
                          </span>
                        )}
                        {status === 'rejected' && (
                          <span className="font-semibold text-rose-600 bg-rose-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Dikembalikan untuk Perbaikan
                          </span>
                        )}
                      </div>

                      {/* Approval buttons when submitted */}
                      {status === 'submitted' && (
                        <div className="pt-2 border-t border-slate-100 space-y-2">
                          <p className="text-xs text-slate-600 font-medium">
                            Tindakan Kasubag TU / Kasi atas laporan kinerja harian:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleVerifikasiAtasan(true)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Setujui Capaian
                            </button>
                            <button
                              onClick={() => handleVerifikasiAtasan(false)}
                              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Minta Perbaikan
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Output action buttons when approved */}
                    {status === 'approved' && (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2">
                        <div className="font-bold text-emerald-900 flex items-center gap-1">
                          <Award className="w-4 h-4 text-emerald-600" />
                          Hasil Evaluasi Kinerja Pegawai:
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-white rounded-lg border border-emerald-200">
                            <span className="text-slate-500 block text-[10px]">Capaian Kinerja:</span>
                            <span className="font-bold text-emerald-700 text-xs">100% Tercapai</span>
                          </div>
                          <div className="p-2 bg-white rounded-lg border border-emerald-200">
                            <span className="text-slate-500 block text-[10px]">Status Disiplin:</span>
                            <span className="font-bold text-emerald-700 text-xs">Tepat Waktu</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-emerald-300 rounded font-medium text-emerald-800">
                            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                            Rekap_Jurnal_SDM.xlsx
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-blue-300 rounded font-medium text-blue-800">
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                            LCKH_{namaPegawai.split(' ')[0]}.pdf
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reset button */}
                  <button
                    onClick={resetSimulation}
                    className="text-xs text-slate-500 hover:text-slate-800 underline self-start"
                  >
                    Reset Ulang Simulasi
                  </button>
                </div>
              </div>

              {/* Log History */}
              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-1 max-h-40 overflow-y-auto">
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Log Audit Trail Presensi &amp; Kinerja SDM:</span>
                  <span className="text-sky-400">Live Recording</span>
                </div>
                {logHistory.map((log, i) => (
                  <div key={i} className="leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Lembaga Pemasyarakatan Perempuan Kelas III Pangkal Pinang
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
            >
              Tutup
            </button>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSczR96TJlFq2dgl5CjutF-hiFrhwXSCqkqifrRo66SJS34B4g/viewform?usp=send_form"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow transition-all flex items-center gap-1.5"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Buka Google Form Jurnal</span>
              <ExternalLink className="w-3 h-3 text-sky-100" />
            </a>

            <a
              href="https://wa.me/6281274346822?text=Halo%20Pengelola%20Kepegawaian%20Lapas%20Perempuan%20Pangkalpinang,%20saya%20ingin%20berkonsultasi%20mengenai%20Jurnal%20Harian%20Pegawai."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] rounded-lg shadow transition-all flex items-center gap-1.5"
            >
              <span>Hubungi Pengelola SDM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
