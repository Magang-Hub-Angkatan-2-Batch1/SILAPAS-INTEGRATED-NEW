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
  Printer,
  Download,
  Building,
  Sparkles,
  Info,
  Globe
} from 'lucide-react';
import { BMN_WORKFLOW_STEPS } from '../data/services';

interface BmnWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BmnWorkflowModal: React.FC<BmnWorkflowModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'simulation'>('diagram');
  
  // Interactive simulation state
  const [namaPemohon, setNamaPemohon] = useState('Siti Rahmawati, S.Tr.Pas');
  const [unitKerja, setUnitKerja] = useState('Seksi Bimbingan Narapidana/Anak Didik');
  const [namaBarang, setNamaBarang] = useState('Kertas A4 70gr (Rim)');
  const [jumlah, setJumlah] = useState<number>(3);
  const [stokAwal, setStokAwal] = useState<number>(25);
  const [status, setStatus] = useState<'pending' | 'checking' | 'approved' | 'rejected'>('pending');
  const [logHistory, setLogHistory] = useState<string[]>([
    'Sistem: Database persediaan BMN siap. Stok Kertas A4: 25 Rim.',
  ]);

  if (!isOpen) return null;

  const handleAjukan = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('checking');
    setLogHistory((prev) => [
      `[${new Date().toLocaleTimeString()}] Pengajuan baru dicatat oleh ${namaPemohon} (${jumlah} unit ${namaBarang}). Menunggu verifikasi fisik & pimpinan.`,
      ...prev,
    ]);
  };

  const handleVerifikasi = (isApproved: boolean) => {
    if (isApproved) {
      const sisa = stokAwal - jumlah;
      setStokAwal(sisa);
      setStatus('approved');
      setLogHistory((prev) => [
        `[${new Date().toLocaleTimeString()}] Status: DISETUJUI oleh Kasubag TU / PPK. Database terpotong: Sisa stok menjadi ${sisa} unit. Dokumen Berita Acara PDF dan baris Excel terbit.`,
        ...prev,
      ]);
    } else {
      setStatus('rejected');
      setLogHistory((prev) => [
        `[${new Date().toLocaleTimeString()}] Status: DITOLAK. Keterangan: Stok dialokasikan untuk prioritas mendesak lainnya. Form dikembalikan ke pemohon.`,
        ...prev,
      ]);
    }
  };

  const resetSimulation = () => {
    setStatus('pending');
    setStokAwal(25);
    setJumlah(3);
    setLogHistory(['Sistem: Simulasi direset. Stok Kertas A4: 25 Rim.']);
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
            <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="text-xs text-sky-200">
                  Lapas Perempuan Kelas III Pangkal Pinang
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                SISTEM PENGAJUAN PERSEDIAAN
              </h2>
              <p className="text-xs text-slate-300">
                Alur Digital dari Google Form, Pengecekan, Pengurangan Database Stok, Log Aktivitas, hingga Output Excel &amp; PDF
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
            Simulasi Interaktif Alur Sistem
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Active Web Application Banner */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-emerald-950 via-teal-900 to-[#0F2C59] text-white rounded-xl border border-emerald-500/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/20 rounded-lg text-emerald-300 border border-emerald-400/30">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-400 text-slate-950 px-2 py-0.5 rounded">
                    Website Aktif
                  </span>
                  <span className="text-xs text-emerald-200 font-mono">project-lpp.pages.dev</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  Portal Sistem Pengajuan Persediaan BMN Telah Live
                </h3>
              </div>
            </div>

            <a
              href="https://project-lpp.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg shadow transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Kunjungi Website BMN</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {activeTab === 'diagram' ? (
            <div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6 text-xs sm:text-sm text-blue-900 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  Sistem inovasi BMN ini memastikan setiap permohonan persediaan tercatat secara transparan, 
                  terverifikasi secara akurat oleh penanggung jawab, otomatis memutakhirkan saldo database stok, 
                  dan terdokumentasi dalam laporan berkala format Excel dan PDF Berita Acara Serah Terima (BAST).
                </p>
              </div>

              {/* Step by step grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BMN_WORKFLOW_STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-md transition-all relative flex flex-col justify-between"
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

                    <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium text-blue-700 flex items-center gap-1">
                      {step.step === 1 && <ClipboardList className="w-3.5 h-3.5" />}
                      {step.step === 2 && <SearchCheck className="w-3.5 h-3.5" />}
                      {step.step === 3 && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {step.step === 4 && <FileCheck className="w-3.5 h-3.5" />}
                      {step.step === 5 && <Database className="w-3.5 h-3.5" />}
                      {step.step === 6 && <FileSpreadsheet className="w-3.5 h-3.5" />}
                      <span>Tahap Operasional #{step.step}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Output specifications */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Dokumen &amp; Integrasi Keluaran:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="text-slate-800">Database &amp; Rekap Excel:</strong>
                      <span className="text-slate-500 block">Tabel mutasi masuk/keluar otomatis tercatat harian.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                    <FileText className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <strong className="text-slate-800">Dokumen PDF Berita Acara:</strong>
                      <span className="text-slate-500 block">Surat bukti penyerahan barang resmi untuk arsip fisik.</span>
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
                      <ClipboardList className="w-4 h-4 text-blue-700" />
                      1. Formulir Pengajuan (Simulasi)
                    </h4>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
                      Google Form Mode
                    </span>
                  </div>

                  <form onSubmit={handleAjukan} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Nama Pegawai Pemohon:</label>
                      <input 
                        type="text" 
                        value={namaPemohon}
                        onChange={(e) => setNamaPemohon(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Unit / Seksi Kerja:</label>
                      <input 
                        type="text" 
                        value={unitKerja}
                        onChange={(e) => setUnitKerja(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Nama Barang:</label>
                        <select 
                          value={namaBarang}
                          onChange={(e) => setNamaBarang(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Kertas A4 70gr (Rim)">Kertas A4 70gr (Rim)</option>
                          <option value="Tinta Printer Epson Black (Botol)">Tinta Printer Epson Black (Botol)</option>
                          <option value="Map Odner Plastik (Pcs)">Map Odner Plastik (Pcs)</option>
                          <option value="Pulpen Standard Hitam (Kotak)">Pulpen Standard Hitam (Kotak)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Jumlah Permintaan:</label>
                        <input 
                          type="number" 
                          min={1}
                          max={stokAwal}
                          value={jumlah}
                          onChange={(e) => setJumlah(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'checking'}
                      className="w-full mt-2 py-2.5 px-4 bg-[#0F2C59] hover:bg-[#1E3E62] text-white rounded-lg font-bold shadow transition-colors flex items-center justify-center gap-2"
                    >
                      <ClipboardList className="w-4 h-4" />
                      Kirim Formulir Pengajuan
                    </button>
                  </form>
                </div>

                {/* Workflow Simulation Box */}
                <div className="lg:col-span-6 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <Database className="w-4 h-4 text-emerald-700" />
                        2. Database Stok Persediaan
                      </h4>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        Saldo: {stokAwal} Unit
                      </span>
                    </div>

                    {/* Status card */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Status Alur Saat Ini:</span>
                        {status === 'pending' && (
                          <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            Menunggu Pengajuan
                          </span>
                        )}
                        {status === 'checking' && (
                          <span className="font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded animate-pulse">
                            Tahap 2 &amp; 3: Pengecekan Kasubag TU
                          </span>
                        )}
                        {status === 'approved' && (
                          <span className="font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Disetujui &amp; Database Terpotong
                          </span>
                        )}
                        {status === 'rejected' && (
                          <span className="font-semibold text-rose-600 bg-rose-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Ditolak
                          </span>
                        )}
                      </div>

                      {/* Approval buttons when checking */}
                      {status === 'checking' && (
                        <div className="pt-2 border-t border-slate-100 space-y-2">
                          <p className="text-xs text-slate-600 font-medium">
                            Aksi Pejabat / Admin BMN untuk pengajuan {jumlah} {namaBarang}:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleVerifikasi(true)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Setujui Permohonan
                            </button>
                            <button
                              onClick={() => handleVerifikasi(false)}
                              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Tolak Permohonan
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Output action buttons when approved */}
                    {status === 'approved' && (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2">
                        <div className="font-bold text-emerald-900 flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                          Output Terbit Otomatis:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-emerald-300 rounded font-medium text-emerald-800">
                            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                            Log Masuk di Rekap.xlsx
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-rose-300 rounded font-medium text-rose-800">
                            <FileText className="w-3.5 h-3.5 text-rose-600" />
                            BAST_Persediaan_LPP.pdf
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
                  <span>Log Aktivitas Sistem Persediaan BMN (Audit Trail):</span>
                  <span className="text-emerald-400">Live Recording</span>
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
              href="https://project-lpp.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow transition-all flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Buka Website BMN</span>
              <ExternalLink className="w-3 h-3 text-emerald-100" />
            </a>

            <a
              href="https://wa.me/6281274346822?text=Halo%20Admin%20BMN%20Lapas%20Perempuan%20Pangkalpinang,%20saya%20ingin%20berkonsultasi%20mengenai%20Pengajuan%20Persediaan."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] rounded-lg shadow transition-all flex items-center gap-1.5"
            >
              <span>Hubungi Pengelola BMN</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
