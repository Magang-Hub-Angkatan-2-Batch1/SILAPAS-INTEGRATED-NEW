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
import { OfficeProfileModal } from './components/OfficeProfileModal';
import { OfficialsProfileModal } from './components/OfficialsProfileModal';
import { FaqModal } from './components/FaqModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { EditLinkModal } from './components/EditLinkModal';
import { KilasBalik } from './components/KilasBalik';
import { EditKilasBalikModal } from './components/EditKilasBalikModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { Footer } from './components/Footer';
import { SERVICES_DATA } from './data/services';
import { KILAS_BALIK_DATA } from './data/kilasBalik';
import { ServiceCategory, ServiceItem, KilasBalikItem } from './types';
import { 
  fetchCustomLinksFromCloud, 
  saveCustomLinkToCloud, 
  deleteCustomLinkFromCloud,
  fetchKilasBalikFromCloud,
  saveKilasBalikItemToCloud,
  isSupabaseConfigured
} from './lib/supabase';
import { 
  Building2, 
  Share2, 
  SearchX, 
  Sparkles, 
  ShieldCheck, 
  FileCheck2, 
  Layers,
  HardDrive,
  HelpCircle,
  Users,
  Camera
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [isBmnModalOpen, setIsBmnModalOpen] = useState(false);
  const [isSdmModalOpen, setIsSdmModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOfficeModalOpen, setIsOfficeModalOpen] = useState(false);
  const [isOfficialsModalOpen, setIsOfficialsModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('silapas_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Edit Link Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Kilas Balik 8 activities state with localStorage persistence
  const [kilasBalikList, setKilasBalikList] = useState<KilasBalikItem[]>(() => {
    try {
      const stored = localStorage.getItem('silapas_kilas_balik');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return KILAS_BALIK_DATA;
  });
  // Track cloud loading state so initial placeholder images do not flash on refresh
  const [isKilasBalikLoading, setIsKilasBalikLoading] = useState<boolean>(true);
  const [editingKilasBalik, setEditingKilasBalik] = useState<KilasBalikItem | null>(null);
  const [isEditKilasBalikOpen, setIsEditKilasBalikOpen] = useState(false);

  // Dynamic services list with localStorage persistence for customized links
  const [servicesList, setServicesList] = useState<ServiceItem[]>(() => {
    try {
      const stored = localStorage.getItem('silapas_custom_links');
      if (stored) {
        const parsed = JSON.parse(stored);
        return SERVICES_DATA.map((item) => {
          if (parsed[item.id]) {
            return {
              ...item,
              url: parsed[item.id].url || item.url,
              subTitle: parsed[item.id].subTitle !== undefined ? parsed[item.id].subTitle : item.subTitle,
            };
          }
          return item;
        });
      }
    } catch {
      // fallback to initial data
    }
    return SERVICES_DATA;
  });

  // Sync with Supabase cloud database on mount if configured
  React.useEffect(() => {
    let isMounted = true;

    async function loadCloudLinks() {
      try {
        if (isSupabaseConfigured) {
          const cloudLinks = await fetchCustomLinksFromCloud();
          if (cloudLinks && isMounted) {
            setServicesList((prev) =>
              prev.map((item) => {
                if (cloudLinks[item.id]) {
                  return {
                    ...item,
                    url: cloudLinks[item.id].url || item.url,
                    subTitle: cloudLinks[item.id].subTitle !== undefined ? cloudLinks[item.id].subTitle : item.subTitle,
                  };
                }
                return item;
              })
            );
            // Cache to localStorage
            try {
              localStorage.setItem('silapas_custom_links', JSON.stringify(cloudLinks));
            } catch {
              // ignore
            }
          }

          // Sync Kilas Balik posts from Supabase cloud
          const cloudPosts = await fetchKilasBalikFromCloud();
          if (cloudPosts && isMounted && cloudPosts.length > 0) {
            setKilasBalikList((prev) => {
              const cloudMap = new Map(cloudPosts.map((p) => [p.id, p]));
              const merged = prev.map((item) => {
                const cloudItem = cloudMap.get(item.id);
                if (cloudItem) {
                  return { ...cloudItem, isFromCloud: true };
                }
                return item;
              });
              try {
                localStorage.setItem('silapas_kilas_balik', JSON.stringify(merged));
              } catch {
                // ignore
              }
              return merged;
            });
          }
        }
      } catch (err) {
        console.warn('Error syncing cloud data:', err);
      } finally {
        if (isMounted) {
          setIsKilasBalikLoading(false);
        }
      }
    }

    loadCloudLinks();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    try {
      localStorage.setItem('silapas_admin_auth', 'true');
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('silapas_admin_auth');
    } catch {
      // ignore
    }
  };

  const handleOpenEditLink = (service: ServiceItem) => {
    setEditingService(service);
    setIsEditModalOpen(true);
  };

  const handleSaveLink = async (serviceId: string, newUrl: string, newSubTitle?: string) => {
    let cleanUrl = newUrl.trim();
    if (cleanUrl && !cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    setServicesList((prev) => {
      const updated = prev.map((s) => {
        if (s.id === serviceId) {
          return {
            ...s,
            url: cleanUrl,
            subTitle: newSubTitle !== undefined && newSubTitle !== '' ? newSubTitle : s.subTitle,
          };
        }
        return s;
      });

      // Save to localStorage as quick local cache
      try {
        const stored = localStorage.getItem('silapas_custom_links');
        const parsed = stored ? JSON.parse(stored) : {};
        parsed[serviceId] = { url: cleanUrl, subTitle: newSubTitle };
        localStorage.setItem('silapas_custom_links', JSON.stringify(parsed));
      } catch {
        // ignore
      }

      return updated;
    });

    // Save to Supabase Cloud Database (so other users see it too)
    return await saveCustomLinkToCloud(serviceId, cleanUrl, newSubTitle);
  };

  const handleResetDefault = (serviceId: string) => {
    const original = SERVICES_DATA.find((s) => s.id === serviceId);
    if (!original) return;

    setServicesList((prev) => {
      const updated = prev.map((s) => (s.id === serviceId ? { ...original } : s));
      try {
        const stored = localStorage.getItem('silapas_custom_links');
        if (stored) {
          const parsed = JSON.parse(stored);
          delete parsed[serviceId];
          localStorage.setItem('silapas_custom_links', JSON.stringify(parsed));
        }
      } catch {
        // ignore
      }
      return updated;
    });

    // Remove from Supabase Cloud Database
    deleteCustomLinkFromCloud(serviceId);
  };

  // Kilas Balik Action Handlers
  const handleOpenEditKilasBalik = (item: KilasBalikItem) => {
    setEditingKilasBalik(item);
    setIsEditKilasBalikOpen(true);
  };

  const handleSaveKilasBalik = async (updated: KilasBalikItem) => {
    setKilasBalikList((prev) => {
      const newList = prev.map((item) => (item.id === updated.id ? updated : item));
      try {
        localStorage.setItem('silapas_kilas_balik', JSON.stringify(newList));
      } catch {
        // ignore
      }
      return newList;
    });

    return await saveKilasBalikItemToCloud(updated);
  };

  const handleResetKilasBalikDefault = (itemId: string) => {
    const original = KILAS_BALIK_DATA.find((item) => item.id === itemId);
    if (!original) return;
    setKilasBalikList((prev) => {
      const newList = prev.map((item) => (item.id === itemId ? { ...original } : item));
      try {
        localStorage.setItem('silapas_kilas_balik', JSON.stringify(newList));
      } catch {
        // ignore
      }
      return newList;
    });
  };

  const handleNavigateKilasBalik = () => {
    setTimeout(() => {
      const el = document.getElementById('kilas-balik');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Filter services based on query and active category
  const filteredServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return servicesList.filter((item) => {
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
  }, [searchQuery, activeCategory, servicesList]);

  // Group filtered services by category for clean sectioning
  const layananServices = useMemo(
    () => filteredServices.filter((s) => s.category === 'layanan'),
    [filteredServices]
  );

  const pegawaiServices = useMemo(
    () => filteredServices.filter((s) => s.category === 'pegawai'),
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

  const handleNavigateHome = () => {
    setSearchQuery('');
    setActiveCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigatePegawai = () => {
    setActiveCategory('pegawai');
    setTimeout(() => {
      const el = document.getElementById('data-pegawai');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigateSosmed = () => {
    setActiveCategory('sosmed');
    setTimeout(() => {
      const el = document.getElementById('media-sosial');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-900 selection:text-white">
      {/* 1. Header with Hamburger Menu Button and Admin Login Button */}
      <Header
        onOpenMenu={() => setIsDrawerOpen(true)}
        onScrollToSearch={scrollToSearch}
        isAdmin={isAdmin}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Navigation Drawer (Sidebar Hamburger Menu) */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigateHome={handleNavigateHome}
        onOpenOfficeProfile={() => setIsOfficeModalOpen(true)}
        onOpenOfficialsProfile={() => setIsOfficialsModalOpen(true)}
        onOpenBmn={() => setIsBmnModalOpen(true)}
        onOpenJhp={() => setIsSdmModalOpen(true)}
        onOpenPegawai={handleNavigatePegawai}
        onNavigateSosmed={handleNavigateSosmed}
        onNavigateKilasBalik={handleNavigateKilasBalik}
        onOpenFaq={() => setIsFaqModalOpen(true)}
        isAdmin={isAdmin}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. Hero with Search and Category Filter */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        totalCount={servicesList.length}
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
                <section id="layanan-lapas">
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
                        isAdmin={isAdmin}
                        onEditLink={handleOpenEditLink}
                      />
                    ))}
                  </div>
                </section>
              )}

            {/* SECTION 2: Data Informasi Pegawai (Google Drive) */}
            {(activeCategory === 'all' || activeCategory === 'pegawai') &&
              pegawaiServices.length > 0 && (
                <section id="data-pegawai">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] flex items-center gap-2.5">
                        <HardDrive className="w-6 h-6 text-emerald-600" />
                        <span>Data Informasi Pegawai</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Pusat penyimpanan digital dan repositori arsip berkas kepegawaian melalui Google Drive resmi
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
                        {pegawaiServices.length} Repositori Aktif
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pegawaiServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onOpenWorkflow={handleOpenWorkflow}
                        isAdmin={isAdmin}
                        onEditLink={handleOpenEditLink}
                      />
                    ))}
                  </div>
                </section>
              )}

            {/* SECTION 3: Media Sosial Resmi */}
            {(activeCategory === 'all' || activeCategory === 'sosmed') &&
              sosmedServices.length > 0 && (
                <section id="media-sosial">
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
                        isAdmin={isAdmin}
                        onEditLink={handleOpenEditLink}
                      />
                    ))}
                  </div>
                </section>
              )}

            {/* SECTION 4: Kilas Balik Kegiatan 1 Bulan Terakhir */}
            <KilasBalik
              items={kilasBalikList}
              isAdmin={isAdmin}
              isLoading={isKilasBalikLoading}
              onEditItem={handleOpenEditKilasBalik}
            />
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
                onClick={handleNavigateKilasBalik}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4 text-amber-600" />
                <span>Kilas Balik (8 Kegiatan)</span>
              </button>
              <button
                onClick={() => setIsOfficialsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl shadow-xs transition-colors"
              >
                <Users className="w-4 h-4 text-sky-600" />
                <span>Peta Jabatan</span>
              </button>
              <button
                onClick={() => setIsOfficeModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl shadow-xs transition-colors"
              >
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Profil Kantor</span>
              </button>
              <button
                onClick={() => setIsFaqModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl shadow-xs transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>FAQ Magang Hub</span>
              </button>
              <button
                onClick={() => setIsBmnModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl shadow-xs transition-colors"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>SOP SI-BMN</span>
              </button>
              <button
                onClick={() => setIsSdmModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl shadow-xs transition-colors"
              >
                <FileCheck2 className="w-4 h-4 text-sky-600" />
                <span>SOP SDM / JHP</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Modals */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <EditLinkModal
        isOpen={isEditModalOpen}
        service={editingService}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveLink}
        onResetDefault={handleResetDefault}
      />

      <EditKilasBalikModal
        isOpen={isEditKilasBalikOpen}
        item={editingKilasBalik}
        onClose={() => setIsEditKilasBalikOpen(false)}
        onSave={handleSaveKilasBalik}
        onResetDefault={handleResetKilasBalikDefault}
      />

      <OfficeProfileModal
        isOpen={isOfficeModalOpen}
        onClose={() => setIsOfficeModalOpen(false)}
      />

      <OfficialsProfileModal
        isOpen={isOfficialsModalOpen}
        onClose={() => setIsOfficialsModalOpen(false)}
      />

      <FaqModal
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
      />

      <BmnWorkflowModal
        isOpen={isBmnModalOpen}
        onClose={() => setIsBmnModalOpen(false)}
      />

      <SdmWorkflowModal
        isOpen={isSdmModalOpen}
        onClose={() => setIsSdmModalOpen(false)}
      />

      {/* 5. Footer */}
      <Footer onOpenLogin={() => setIsLoginModalOpen(true)} />
    </div>
  );
}
