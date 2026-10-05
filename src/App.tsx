/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceCard } from './components/ServiceCard';
import { BmnWorkflowModal } from './components/BmnWorkflowModal';
import { SdmWorkflowModal } from './components/SdmWorkflowModal';
import { SingleFileCodeModal } from './components/SingleFileCodeModal';
import { Footer } from './components/Footer';
import { SERVICES_DATA } from './data/services';
import { STANDALONE_HTML_CODE } from './data/singleFileCode';
import { ServiceCategory, ServiceItem } from './types';
import { 
  Building2, 
  Share2, 
  SearchX, 
  Sparkles, 
  ShieldCheck, 
  FileCheck2, 
  Layers
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [isBmnModalOpen, setIsBmnModalOpen] = useState(false);
  const [isSdmModalOpen, setIsSdmModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Filter services based on query and active category
  const filteredServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SERVICES_DATA.filter((item) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      if (!matchesCategory) return false;

      // Search keyword filter
      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const subTitleMatch = item.subTitle?.toLowerCase().includes(q) || false;
      const descMatch = item.description.toLowerCase().includes(q);
      const categoryMatch = item.categoryLabel.toLowerCase().includes(q);
      const tagsMatch = item.tags.some((t) => t.toLowerCase().includes(q));

      return titleMatch || subTitleMatch || descMatch || categoryMatch || tagsMatch;
    });
  }, [searchQuery, activeCategory]);

  // Group filtered services by category for clean sectioning
  const layananServices = useMemo(
    () => filteredServices.filter((s) => s.category === 'layanan'),
    [filteredServices]
  );

  const sosmedServices = useMemo(
    () => filteredServices.filter((s) => s.category === 'sosmed'),
    [filteredServices]
  );

  const handleOpenWorkflow = (service: ServiceItem) => {
    if (service.id === 'sdm-jurnal-harian') {
      setIsSdmModalOpen(true);
    } else if (service.id === 'bmn-persediaan' || service.hasWorkflow) {
      setIsBmnModalOpen(true);
    } else if (service.url && service.url !== '#') {
      window.open(service.url, '_blank', 'noopener,noreferrer');
    }
  };

  const scrollToSearch = () => {
    const el = document.getElementById('pencarian');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-900 selection:text-white">
      {/* 1. Header */}
      <Header
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onScrollToSearch={scrollToSearch}
      />

      {/* 2. Hero with Search and Category Filter */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        totalCount={SERVICES_DATA.length}
        filteredCount={filteredServices.length}
      />

      {/* 3. Main Services Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* If no services matched the filter */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Layanan Tidak Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Tidak ada tautan atau sistem yang sesuai dengan kata kunci &ldquo;{searchQuery}&rdquo;.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 bg-[#0F2C59] hover:bg-[#1E3E62] text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                Tampilkan Semua Layanan
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* SECTION 1: Layanan & Website Lapas */}
            {(activeCategory === 'all' || activeCategory === 'layanan') &&
              layananServices.length > 0 && (
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] flex items-center gap-2.5">
                        <Building2 className="w-6 h-6 text-blue-700" />
                        <span>Layanan &amp; Website Lapas</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Inovasi digital internal: pengelolaan Barang Milik Negara (BMN) dan pelaporan kinerja SDM
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-900 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
                        {layananServices.length} Sistem Tersedia
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {layananServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onOpenWorkflow={handleOpenWorkflow}
                      />
                    ))}
                  </div>
                </section>
              )}

            {/* SECTION 2: Media Sosial Resmi */}
            {(activeCategory === 'all' || activeCategory === 'sosmed') &&
              sosmedServices.length > 0 && (
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] flex items-center gap-2.5">
                        <Share2 className="w-6 h-6 text-blue-700" />
                        <span>Media Sosial Resmi</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Kanal komunikasi publik, siaran berita pemasyarakatan, dan transparansi kehumasan Lapas
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                        {sosmedServices.length} Kanal Aktif
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sosmedServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onOpenWorkflow={handleOpenWorkflow}
                      />
                    ))}
                  </div>
                </section>
              )}
          </div>
        )}

        {/* Quick Informational Notice on Integrated Procedures */}
        <div className="mt-14 p-5 sm:p-6 bg-gradient-to-r from-blue-900/5 via-amber-500/5 to-blue-900/5 rounded-2xl border border-blue-100 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-blue-900 text-white rounded-xl shadow-xs mt-0.5 md:mt-0">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  Komitmen Pelayanan Publik Prima &amp; Terintegrasi
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl mt-0.5">
                  Setiap layanan pada portal SILAPAS-INTEGRATED diawasi secara langsung oleh Sub Bagian Tata Usaha 
                  dan Kehumasan Lapas Perempuan Kelas III Pangkal Pinang sesuai Standar Operasional Prosedur (SOP) 
                  Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setIsBmnModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl shadow-xs transition-colors"
              >
                <FileCheck2 className="w-4 h-4 text-amber-600" />
                <span>Lihat SOP BMN</span>
              </button>
              <button
                onClick={() => setIsSdmModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl shadow-xs transition-colors"
              >
                <FileCheck2 className="w-4 h-4 text-sky-600" />
                <span>Lihat SOP SDM</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Modals */}
      <BmnWorkflowModal
        isOpen={isBmnModalOpen}
        onClose={() => setIsBmnModalOpen(false)}
      />

      <SdmWorkflowModal
        isOpen={isSdmModalOpen}
        onClose={() => setIsSdmModalOpen(false)}
      />

      <SingleFileCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        singleFileCode={STANDALONE_HTML_CODE}
      />

      {/* 5. Footer */}
      <Footer onOpenCodeModal={() => setIsCodeModalOpen(true)} />
    </div>
  );
}
