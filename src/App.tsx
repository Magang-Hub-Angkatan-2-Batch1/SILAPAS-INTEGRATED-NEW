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
import { GDriveMenuModal } from './components/GDriveMenuModal';
import { EditLinkModal } from './components/EditLinkModal';
import { KilasBalik } from './components/KilasBalik';
import { EditKilasBalikModal } from './components/EditKilasBalikModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { Footer } from './components/Footer';
import { SERVICES_DATA } from './data/services';
import { KILAS_BALIK_DATA } from './data/kilasBalik';
import { ServiceCategory, ServiceItem, KilasBalikItem, AuthSession } from './types';
import { 
  fetchCustomLinksFromCloud, 
  saveCustomLinkToCloud, 
  deleteCustomLinkFromCloud,
  fetchKilasBalikFromCloud,
  saveKilasBalikItemToCloud,
  isSupabaseConfigured,
  getStoredAuthSession,
  saveStoredAuthSession,
  clearStoredAuthSession
} from './lib/supabase';
import { 
  Building2, 
  SearchX, 
  Sparkles, 
  ShieldCheck, 
  FileCheck2, 
  Layers,
  HardDrive,
  HelpCircle,
  Users,
  Camera,
  Lock,
  KeyRound,
  UserCheck
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
  const [isGDriveModalOpen, setIsGDriveModalOpen] = useState(false);

  // User & Admin authentication session state
  const [authSession, setAuthSession] = useState<AuthSession | null>(() => {
    return getStoredAuthSession();
  });
  const isAdmin = authSession?.role === 'admin';
  const isUserLoggedIn = Boolean(authSession);

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

  const handleLoginSuccess = (role: 'user' | 'admin', email: string) => {
    const session: AuthSession = {
      email,
      role,
      name: role === 'admin' ? 'Administrator Lapas' : 'Pegawai Lapas',
      loginTime: new Date().toISOString(),
    };
    setAuthSession(session);
    saveStoredAuthSession(session);
  };

  const handleLogout = () => {
    setAuthSession(null);
    clearStoredAuthSession();
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
      // Exclude social media services as requested
      if (item.category === 'sosmed') return false;

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

  // Active services count without sosmed
  const activeServicesList = useMemo(
    () => servicesList.filter((s) => s.category !== 'sosmed'),
    [servicesList]
  );

  // Group filtered services by category for clean sectioning
  const layananServices = useMemo(
    () => filteredServices.filter((s) => s.category === 'layanan'),
    [filteredServices]
  );

  const pegawaiServices = useMemo(
    () => filteredServices.filter((s) => s.category === 'pegawai'),
    [filteredServices]
  );

  const handleOpenWorkflow = (service: ServiceItem) => {
    if (service.id === 'data-pegawai-gdrive') {
      setIsGDriveModalOpen(true);
    } else if (service.id === 'sdm-jurnal-harian') {
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
    if (!isUserLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setActiveCategory('pegawai');
    setTimeout(() => {
      const el = document.getElementById('data-pegawai');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-900 selection:text-white">
      {/* 1. Full-Screen Blue Portal Section (Header + Hero together full 1 viewport) */}
      <section className="min-h-screen min-h-[100dvh] flex flex-col bg-gradient-to-b from-[#0B192C] via-[#0F2C59] to-[#1E3E62] border-b border-slate-700/60 shadow-inner relative overflow-hidden">
        <Header
          onOpenMenu={() => setIsDrawerOpen(true)}
          onScrollToSearch={scrollToSearch}
          isAdmin={isAdmin}
          isUserLoggedIn={isUserLoggedIn}
          currentUser={authSession}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
        />

        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          totalCount={activeServicesList.length}
          filteredCount={filteredServices.length}
          isUserLoggedIn={isUserLoggedIn}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />
      </section>

      {/* Navigation Drawer (Sidebar Hamburger Menu) */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigateHome={handleNavigateHome}
        onOpenOfficeProfile={() => setIsOfficeModalOpen(true)}
        onOpenOfficialsProfile={() => setIsOfficialsModalOpen(true)}
        onOpenBmn={() => {
          if (!isUserLoggedIn) {
            setIsLoginModalOpen(true);
          } else {
            setIsBmnModalOpen(true);
          }
        }}
        onOpenJhp={() => {
          if (!isUserLoggedIn) {
            setIsLoginModalOpen(true);
          } else {
            setIsSdmModalOpen(true);
          }
        }}
        onOpenPegawai={() => {
          if (!isUserLoggedIn) {
            setIsLoginModalOpen(true);
          } else {
            handleNavigatePegawai();
          }
        }}
        onOpenGDriveMenu={() => {
          if (!isUserLoggedIn) {
            setIsLoginModalOpen(true);
          } else {
            setIsGDriveModalOpen(true);
          }
        }}
        onNavigateKilasBalik={handleNavigateKilasBalik}
        onOpenFaq={() => setIsFaqModalOpen(true)}
        isAdmin={isAdmin}
        isUserLoggedIn={isUserLoggedIn}
        currentUser={authSession}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. Main Services Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* If user is NOT logged in: Layanan & Data Pegawai do NOT show, Kilas Balik directly appears */}
        {!isUserLoggedIn ? (
          <div className="space-y-6 sm:space-y-10">
            {/* Protected Gate Notice */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-900/10 via-amber-500/10 to-blue-900/10 rounded-2xl border border-blue-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 sm:p-3 bg-[#0B192C] text-amber-400 rounded-xl shadow-xs shrink-0 mt-0.5 md:mt-0">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-black text-slate-900">
                      Akses Khusus Pengguna: Layanan &amp; Repositori Google Drive
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      Perlu Login User
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    Seksi <span className="font-semibold text-slate-800">Layanan &amp; Website Lapas</span> serta <span className="font-semibold text-slate-800">Data Informasi Pegawai</span> diproteksi khusus bagi aparatur Lapas Perempuan Kelas III Pangkal Pinang. Silakan login akun pengguna (User Pegawai atau Administrator) untuk membuka tautan sistem dan repositori dokumen.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F2C59] hover:bg-[#1E3E62] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow transition-all shrink-0 cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Login Pegawai / Admin</span>
              </button>
            </div>

            {/* LANGSUNG MUNCUL KILASAN BALIK KEGIATAN LAPAS */}
            <KilasBalik
              items={kilasBalikList}
              isAdmin={isAdmin}
              isLoading={isKilasBalikLoading}
              onEditItem={handleOpenEditKilasBalik}
            />
          </div>
        ) : filteredServices.length === 0 ? (
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
          <div className="space-y-6 sm:space-y-12">
            {/* SECTION 1: Layanan & Website Lapas */}
            {(activeCategory === 'all' || activeCategory === 'layanan') &&
              layananServices.length > 0 && (
                <section id="layanan-lapas">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-slate-200 pb-2.5 sm:pb-3 mb-3.5 sm:mb-6">
                    <div>
                      <h2 className="text-lg sm:text-2xl font-black text-[#0B192C] flex items-center gap-2">
                        <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
                        <span>Layanan &amp; Website Lapas</span>
                      </h2>
                      <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none">
                        Inovasi digital internal: pengelolaan Barang Milik Negara (BMN) dan pelaporan kinerja SDM
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] sm:text-xs font-bold text-blue-900 bg-blue-100/80 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-blue-200">
                        {layananServices.length} Sistem Tersedia
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                    {layananServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onOpenWorkflow={handleOpenWorkflow}
                        isAdmin={isAdmin}
                        onEditLink={handleOpenEditLink}
                        onOpenGDriveMenu={() => setIsGDriveModalOpen(true)}
                      />
                    ))}
                  </div>
                </section>
              )}

            {/* SECTION 2: Data Informasi Pegawai (Google Drive) */}
            {(activeCategory === 'all' || activeCategory === 'pegawai') &&
              pegawaiServices.length > 0 && (
                <section id="data-pegawai">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-slate-200 pb-2.5 sm:pb-3 mb-3.5 sm:mb-6">
                    <div>
                      <h2 className="text-lg sm:text-2xl font-black text-[#0B192C] flex items-center gap-2">
                        <HardDrive className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                        <span>Data Informasi Pegawai</span>
                      </h2>
                      <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none">
                        Pusat penyimpanan digital dan repositori arsip berkas kepegawaian melalui Google Drive resmi
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] sm:text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-emerald-200">
                        {pegawaiServices.length} Repositori Aktif
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                    {pegawaiServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onOpenWorkflow={handleOpenWorkflow}
                        isAdmin={isAdmin}
                        onEditLink={handleOpenEditLink}
                        onOpenGDriveMenu={() => setIsGDriveModalOpen(true)}
                      />
                    ))}
                  </div>
                </section>
              )}

            {/* SECTION 3: Kilas Balik Kegiatan 1 Bulan Terakhir */}
            <KilasBalik
              items={kilasBalikList}
              isAdmin={isAdmin}
              isLoading={isKilasBalikLoading}
              onEditItem={handleOpenEditKilasBalik}
            />
          </div>
        )}

        {/* Quick Informational Notice on Integrated Procedures */}
        <div className="mt-8 sm:mt-14 p-3.5 sm:p-6 bg-gradient-to-r from-blue-900/5 via-amber-500/5 to-blue-900/5 rounded-xl sm:rounded-2xl border border-blue-100 shadow-2xs sm:shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-2.5 sm:gap-3.5">
              <div className="p-2 sm:p-2.5 bg-blue-900 text-white rounded-lg sm:rounded-xl shadow-xs mt-0.5 md:mt-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base font-bold text-slate-900">
                  Komitmen Pelayanan Publik Prima &amp; Terintegrasi
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-normal sm:leading-relaxed max-w-3xl mt-0.5 line-clamp-2 sm:line-clamp-none">
                  Setiap layanan pada portal SILAPAS-INTEGRATED diawasi secara langsung oleh Sub Bagian Tata Usaha 
                  dan Kehumasan Lapas Perempuan Kelas III Pangkal Pinang sesuai Standar Operasional Prosedur (SOP) 
                  Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={handleNavigateKilasBalik}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10.5px] sm:text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg sm:rounded-xl shadow-2xs transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                <span>Kilas Balik</span>
              </button>
              <button
                onClick={() => setIsOfficialsModalOpen(true)}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10.5px] sm:text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl shadow-2xs transition-colors"
              >
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
                <span>Struktur Organisasi</span>
              </button>
              <button
                onClick={() => setIsOfficeModalOpen(true)}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10.5px] sm:text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl shadow-2xs transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                <span>Profil Kantor</span>
              </button>
              <button
                onClick={() => setIsFaqModalOpen(true)}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10.5px] sm:text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg sm:rounded-xl shadow-2xs transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                <span>FAQ</span>
              </button>
              <button
                onClick={() => {
                  if (!isUserLoggedIn) {
                    setIsLoginModalOpen(true);
                  } else {
                    setIsBmnModalOpen(true);
                  }
                }}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10.5px] sm:text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl shadow-2xs transition-colors cursor-pointer"
              >
                {!isUserLoggedIn ? <Lock className="w-3.5 h-3.5 text-amber-600" /> : <FileCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />}
                <span>SOP BMN {!isUserLoggedIn && '(Login)'}</span>
              </button>
              <button
                onClick={() => {
                  if (!isUserLoggedIn) {
                    setIsLoginModalOpen(true);
                  } else {
                    setIsSdmModalOpen(true);
                  }
                }}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10.5px] sm:text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl shadow-2xs transition-colors cursor-pointer"
              >
                {!isUserLoggedIn ? <Lock className="w-3.5 h-3.5 text-amber-600" /> : <FileCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />}
                <span>SOP SDM {!isUserLoggedIn && '(Login)'}</span>
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
        isAdmin={isAdmin}
      />

      <OfficialsProfileModal
        isOpen={isOfficialsModalOpen}
        onClose={() => setIsOfficialsModalOpen(false)}
        isAdmin={isAdmin}
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

      <GDriveMenuModal
        isOpen={isGDriveModalOpen}
        onClose={() => setIsGDriveModalOpen(false)}
        isAdmin={isAdmin}
      />

      {/* 5. Footer */}
      <Footer onOpenLogin={() => setIsLoginModalOpen(true)} />
    </div>
  );
}
