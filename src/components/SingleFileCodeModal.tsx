import React, { useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, Code2, FileCode } from 'lucide-react';

interface SingleFileCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  singleFileCode: string;
}

export const SingleFileCodeModal: React.FC<SingleFileCodeModalProps> = ({
  isOpen,
  onClose,
  singleFileCode,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(singleFileCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([singleFileCode], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'silapas-integrated.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Kode Single-File HTML (HTML + Tailwind CSS CDN + JavaScript)
              </h3>
              <p className="text-xs text-slate-300">
                File mandiri lengkap siap pakai tanpa build tool, dapat langsung dibuka di browser atau diupload ke hosting web manapun.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title="Tutup Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600 font-medium">
            Format: <span className="font-bold text-slate-800">Single HTML File</span> &bull; CDN: <span className="font-mono text-blue-700 font-semibold">Tailwind CSS + Lucide Icons</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span>Salin Semua Kode</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] rounded-lg shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Unduh silapas-integrated.html</span>
            </button>

            <a
              href="/silapas-single-file.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:text-blue-900 transition-colors"
            >
              <span>Buka Mandiri</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 bg-slate-950 overflow-y-auto flex-1 font-mono text-xs leading-relaxed text-slate-200">
          <pre className="overflow-x-auto whitespace-pre">
            <code>{singleFileCode}</code>
          </pre>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 text-xs text-slate-500 flex justify-between items-center">
          <span>Humas Lapas Perempuan Kelas III Pangkal Pinang</span>
          <span>Ukuran: ~{Math.round(singleFileCode.length / 1024)} KB</span>
        </div>
      </div>
    </div>
  );
};
