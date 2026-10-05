export const STANDALONE_HTML_CODE = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SILAPAS-INTEGRATED - Lapas Perempuan Kelas III Pangkal Pinang</title>
  <meta name="description" content="Sistem Informasi Layanan Kehumasan, BMN, dan SDM Lapas Perempuan Kelas III Pangkal Pinang" />
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            govNavy: '#0B192C',
            govDeep: '#0F2C59',
            govBlue: '#1E3E62',
            govGold: '#D4AF37',
            govSky: '#38BDF8',
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .card-transition { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .card-transition:hover { transform: translateY(-5px); }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col">

  <!-- TOP BAR -->
  <div class="bg-[#07111f] border-b border-slate-800 text-xs text-slate-300 px-4 py-1.5">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1 font-bold text-amber-400">
          <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
          PORTAL RESMI PEMERINTAHAN
        </span>
        <span class="text-slate-600 hidden sm:inline">|</span>
        <span class="hidden sm:inline text-slate-300">Lapas Perempuan Kelas III Pangkal Pinang</span>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1.5">
          <i data-lucide="clock" class="w-3.5 h-3.5 text-sky-400"></i>
          <span id="liveClock">WIB</span>
        </div>
        <a href="https://wa.me/6281274346822" target="_blank" class="hover:text-emerald-400 text-[11px] hidden sm:flex items-center gap-1">
          <i data-lucide="phone-call" class="w-3 h-3 text-emerald-400"></i>
          <span>Pengaduan: 0812-7434-6822</span>
        </a>
      </div>
    </div>
  </div>

  <!-- NAVBAR -->
  <header class="bg-[#0B192C] text-white sticky top-0 z-40 shadow-md border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
      <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <img src="/logo.jpg" alt="Logo Kemenimipas" class="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-amber-400 object-cover shrink-0" />
        <div class="min-w-0">
          <h1 class="text-sm sm:text-lg md:text-xl font-extrabold tracking-tight text-white whitespace-nowrap leading-tight">
            SILAPAS<span class="text-amber-400">-INTEGRATED</span>
          </h1>
          <p class="text-[10px] sm:text-xs text-slate-300 truncate max-w-[170px] xs:max-w-[240px] sm:max-w-none leading-tight mt-0.5">
            Lapas Perempuan Kelas III Pangkal Pinang
          </p>
        </div>
      </div>
      <a href="https://wa.me/6281274346822?text=Halo%20Humas%20Lapas%20Perempuan%20Pangkalpinang" target="_blank" class="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow transition-colors shrink-0">
        <i data-lucide="phone-call" class="w-3.5 h-3.5 shrink-0"></i>
        <span>Pengaduan</span>
      </a>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="relative bg-gradient-to-b from-[#0B192C] via-[#0F2C59] to-[#1E3E62] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-700/60">
    <div class="max-w-4xl mx-auto">
      <div class="inline-block p-1.5 rounded-full bg-gradient-to-tr from-amber-400/40 via-blue-500/30 to-amber-300/40 shadow-xl mb-3">
        <img src="/logo.jpg" alt="Logo Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia" class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#0B192C]" />
      </div>

      <div class="inline-block px-3 py-1 rounded-full bg-slate-800/80 border border-amber-400/40 text-[11px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
        Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia
      </div>
      <p class="text-xs sm:text-sm text-slate-300 mb-4">
        Kantor Wilayah Kepulauan Bangka Belitung &bull; Lapas Perempuan Kelas III Pangkal Pinang
      </p>

      <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
        SILAPAS<span class="text-amber-400">-INTEGRATED</span>
      </h1>
      <p class="text-base sm:text-lg md:text-xl text-sky-200 font-medium mb-3">
        (Sistem Informasi Layanan Kehumasan, BMN, dan SDM Lapas)
      </p>
      <p class="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
        Pusat terpadu informasi dan gerbang akses satu pintu untuk inovasi pengelolaan Barang Milik Negara (BMN), 
        pelaporan jurnal harian SDM pegawai, serta saluran media sosial resmi publikasi pemasyarakatan.
      </p>

      <!-- SEARCH BAR -->
      <div class="max-w-2xl mx-auto mb-6">
        <div class="relative flex items-center bg-white rounded-xl shadow-2xl p-2 border-2 border-slate-200">
          <i data-lucide="search" class="w-5 h-5 text-slate-400 ml-2"></i>
          <input
            id="searchInput"
            type="text"
            placeholder="Cari layanan, inovasi BMN, form SDM, atau medsos resmi..."
            class="w-full px-3 py-1.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
          />
          <button id="clearSearchBtn" class="hidden text-slate-400 hover:text-slate-600 px-2 py-1">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
        <div class="mt-2 text-xs text-slate-300 flex justify-between px-2">
          <span id="resultCount">Menampilkan semua tautan</span>
          <button id="resetSearchLink" class="hidden text-amber-300 underline">Reset</button>
        </div>
      </div>

      <!-- FILTER TABS -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <button onclick="filterCategory('all')" id="tab-all" class="tab-btn active px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-amber-400 text-slate-950 shadow">
          Semua Layanan
        </button>
        <button onclick="filterCategory('layanan')" id="tab-layanan" class="tab-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-slate-800/80 text-slate-200 border border-slate-700">
          Layanan &amp; Website Lapas
        </button>
        <button onclick="filterCategory('sosmed')" id="tab-sosmed" class="tab-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-slate-800/80 text-slate-200 border border-slate-700">
          Media Sosial Resmi
        </button>
      </div>
    </div>
  </section>

  <!-- MAIN SERVICES CONTAINER -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
    
    <!-- CATEGORY: LAYANAN & WEBSITE LAPAS -->
    <div id="section-layanan" class="category-section mb-12">
      <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="building" class="w-5 h-5 text-blue-700"></i>
            Layanan &amp; Website Lapas
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">Inovasi digital internal pengelolaan BMN dan pelaporan SDM</p>
        </div>
        <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">2 Sistem</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- CARD 1: SISTEM PENGAJUAN PERSEDIAAN -->
        <div class="service-card card-transition bg-white rounded-2xl border border-blue-200 shadow-md p-6 flex flex-col justify-between" 
             data-category="layanan" 
             data-keywords="bmn sistem pengajuan persediaan form excel pdf barang milik negara verifikasi stok project-lpp.pages.dev">
          <div>
            <div class="flex items-start justify-between gap-3 mb-4">
              <div class="p-3 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-200">
                <i data-lucide="package-search" class="w-6 h-6"></i>
              </div>
            </div>

            <h3 class="text-lg font-bold text-slate-900 mb-1">SISTEM PENGAJUAN PERSEDIAAN</h3>
            <p class="text-xs font-semibold text-slate-500 mb-3">Pengelolaan &amp; Distribusi Barang Milik Negara</p>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Sistem alur pengajuan persediaan berbasis web digital terintegrasi (project-lpp.pages.dev): pengisian form, 
              verifikasi persetujuan pimpinan, pemotongan otomatis database persediaan, pencatatan log aktivitas, 
              hingga penerbitan rekapitulasi Excel dan dokumen PDF.
            </p>

            <div class="flex flex-wrap gap-1.5 mb-4">
              <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">#BMN</span>
              <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">#Persediaan</span>
              <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">#project-lpp.pages.dev</span>
              <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">#Excel</span>
              <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">#PDF</span>
            </div>
          </div>

          <div>
            <a href="https://project-lpp.pages.dev/" target="_blank" class="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] shadow flex items-center justify-center gap-2">
              <span>Buka Website BMN</span>
              <i data-lucide="external-link" class="w-4 h-4 ml-auto text-sky-300"></i>
            </a>
            <button onclick="openBmnModal()" class="w-full mt-2 py-1 text-center text-[11px] font-medium text-slate-500 hover:text-blue-900 hover:underline flex items-center justify-center gap-1">
              <i data-lucide="workflow" class="w-3.5 h-3.5 text-amber-600"></i>
              <span>Lihat Alur SOP &amp; Simulasi</span>
            </button>
          </div>
        </div>

        <!-- CARD 2: JURNAL HARIAN PEGAWAI -->
        <div class="service-card card-transition bg-white rounded-2xl border border-blue-200 shadow-md p-6 flex flex-col justify-between" 
             data-category="layanan" 
             data-keywords="sdm jurnal harian pegawai kinerja laporan google form kepegawaian">
          <div>
            <div class="flex items-start justify-between gap-3 mb-4">
              <div class="p-3 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-200">
                <i data-lucide="file-text" class="w-6 h-6"></i>
              </div>
            </div>

            <h3 class="text-lg font-bold text-slate-900 mb-1">JURNAL HARIAN PEGAWAI</h3>
            <p class="text-xs font-semibold text-slate-500 mb-3">Laporan Kinerja &amp; Aktivitas Harian Pegawai</p>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Platform pencatatan rekapitulasi jurnal harian aktivitas, capaian tugas kedisiplinan, dan monitoring kinerja pegawai 
              Lapas Perempuan Kelas III Pangkal Pinang secara online dan terstruktur melalui Google Form resmi.
            </p>

            <div class="flex flex-wrap gap-1.5 mb-4">
              <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">#SDM</span>
              <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">#JurnalHarian</span>
              <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">#GoogleForm</span>
            </div>
          </div>

          <div>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSczR96TJlFq2dgl5CjutF-hiFrhwXSCqkqifrRo66SJS34B4g/viewform?usp=send_form" 
               target="_blank" 
               class="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] shadow flex items-center justify-center gap-2">
              <span>Isi Jurnal Harian</span>
              <i data-lucide="external-link" class="w-4 h-4 ml-auto text-sky-300"></i>
            </a>
            <button onclick="openSdmModal()" class="w-full mt-2 py-1 text-center text-[11px] font-medium text-slate-500 hover:text-blue-900 hover:underline flex items-center justify-center gap-1">
              <i data-lucide="workflow" class="w-3.5 h-3.5 text-sky-600"></i>
              <span>Lihat Alur SOP &amp; Simulasi</span>
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- CATEGORY: MEDIA SOSIAL RESMI -->
    <div id="section-sosmed" class="category-section">
      <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="share-2" class="w-5 h-5 text-blue-700"></i>
            Media Sosial Resmi
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">Saluran publikasi, berita, dan komunikasi publik resmi Lapas</p>
        </div>
        <span class="text-xs font-semibold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full">5 Akun</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- INSTAGRAM -->
        <div class="service-card card-transition bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between" 
             data-category="sosmed" 
             data-keywords="instagram foto kegiatan galeri pembinaan berita lpp lapas perempuan pangkalpinang">
          <div>
            <div class="flex items-start justify-between mb-4">
              <div class="p-3 rounded-xl bg-pink-500/10 text-pink-600 border border-pink-200">
                <i data-lucide="instagram" class="w-6 h-6"></i>
              </div>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-pink-100 text-pink-900">Instagram</span>
            </div>
            <h3 class="text-base font-bold text-slate-900">Instagram Resmi</h3>
            <p class="text-xs text-slate-500 mb-2 font-medium">@lapasperempuanpangkalpinang</p>
            <p class="text-xs text-slate-600 mb-4">Publikasi dokumentasi visual kegiatan pembinaan kemandirian WBP, pelayanan publik, siaran pers, dan infografis.</p>
          </div>
          <a href="https://www.instagram.com/lapasperempuanpangkalpinang?stkn=eGFlZno1ZWoxcTg2" target="_blank" class="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] flex items-center justify-center gap-2">
            <span>Akses Sekarang</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5 ml-auto"></i>
          </a>
        </div>

        <!-- FACEBOOK -->
        <div class="service-card card-transition bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between" 
             data-category="sosmed" 
             data-keywords="facebook berita artikel publikasi siaran pers lapas perempuan pangkalpinang">
          <div>
            <div class="flex items-start justify-between mb-4">
              <div class="p-3 rounded-xl bg-blue-600/10 text-blue-700 border border-blue-200">
                <i data-lucide="facebook" class="w-6 h-6"></i>
              </div>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 text-blue-900">Facebook</span>
            </div>
            <h3 class="text-base font-bold text-slate-900">Facebook Page Resmi</h3>
            <p class="text-xs text-slate-500 mb-2 font-medium">Lapas Perempuan Pangkalpinang</p>
            <p class="text-xs text-slate-600 mb-4">Kanal komunikasi dan sosialisasi publik, pembaruan rilis berita pemasyarakatan, serta interaksi keterbukaan informasi.</p>
          </div>
          <a href="https://www.facebook.com/share/1Ltj6AkW4Q/" target="_blank" class="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] flex items-center justify-center gap-2">
            <span>Akses Sekarang</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5 ml-auto"></i>
          </a>
        </div>

        <!-- YOUTUBE -->
        <div class="service-card card-transition bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between" 
             data-category="sosmed" 
             data-keywords="youtube video podcast profil liputan film dokumenter wbp lapas perempuan pangkalpinang">
          <div>
            <div class="flex items-start justify-between mb-4">
              <div class="p-3 rounded-xl bg-red-500/10 text-red-600 border border-red-200">
                <i data-lucide="youtube" class="w-6 h-6"></i>
              </div>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-100 text-red-900">YouTube</span>
            </div>
            <h3 class="text-base font-bold text-slate-900">YouTube Channel Resmi</h3>
            <p class="text-xs text-slate-500 mb-2 font-medium">@lapasperempuanpangkalpinan1027</p>
            <p class="text-xs text-slate-600 mb-4">Liputan video program inovasi pembinaan warga binaan, galeri prestasi, video profil instansi, dan podcast edukatif.</p>
          </div>
          <a href="https://youtube.com/@lapasperempuanpangkalpinan1027?si=9cR5dRN3_dDZVK0K" target="_blank" class="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] flex items-center justify-center gap-2">
            <span>Akses Sekarang</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5 ml-auto"></i>
          </a>
        </div>

        <!-- X / TWITTER -->
        <div class="service-card card-transition bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between" 
             data-category="sosmed" 
             data-keywords="twitter x tweet pengumuman update cepat info lpp pkpinang1">
          <div>
            <div class="flex items-start justify-between mb-4">
              <div class="p-3 rounded-xl bg-slate-700/10 text-slate-800 border border-slate-300">
                <i data-lucide="twitter" class="w-6 h-6"></i>
              </div>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-800">X / Twitter</span>
            </div>
            <h3 class="text-base font-bold text-slate-900">X / Twitter Resmi</h3>
            <p class="text-xs text-slate-500 mb-2 font-medium">@lpp_pkpinang1</p>
            <p class="text-xs text-slate-600 mb-4">Penyampaian informasi ringkas real-time, pengumuman agenda kedinasan, dan kanal interaktif pelayanan kehumasan.</p>
          </div>
          <a href="https://x.com/lpp_pkpinang1" target="_blank" class="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] flex items-center justify-center gap-2">
            <span>Akses Sekarang</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5 ml-auto"></i>
          </a>
        </div>

        <!-- TIKTOK -->
        <div class="service-card card-transition bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between" 
             data-category="sosmed" 
             data-keywords="tiktok video pendek konten kreatif karya wbp lapasperempuanpkp">
          <div>
            <div class="flex items-start justify-between mb-4">
              <div class="p-3 rounded-xl bg-neutral-800/10 text-neutral-900 border border-neutral-300">
                <i data-lucide="share-2" class="w-6 h-6"></i>
              </div>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-neutral-100 text-neutral-900">TikTok</span>
            </div>
            <h3 class="text-base font-bold text-slate-900">TikTok Resmi</h3>
            <p class="text-xs text-slate-500 mb-2 font-medium">@lapasperempuanpkp</p>
            <p class="text-xs text-slate-600 mb-4">Konten kreatif video pendek menampilkan hasil karya keterampilan WBP perempuan, tips, dan kegiatan positif petugas.</p>
          </div>
          <a href="https://www.tiktok.com/@lapasperempuanpkp?_r=1&_t=ZS-99pAuUMCHdU" target="_blank" class="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] flex items-center justify-center gap-2">
            <span>Akses Sekarang</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5 ml-auto"></i>
          </a>
        </div>

      </div>
    </div>

  </main>

  <!-- BMN WORKFLOW MODAL -->
  <div id="bmnModal" class="hidden fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
    <div class="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <div class="bg-[#0B192C] text-white p-5 flex items-start justify-between">
        <div>
          <span class="text-xs text-sky-200">Lapas Perempuan Kelas III Pangkal Pinang</span>
          <h3 class="text-lg font-bold text-white mt-1">SISTEM PENGAJUAN PERSEDIAAN</h3>
          <p class="text-xs text-slate-300">Alur Standar Operasional Prosedur (SOP) Digital</p>
        </div>
        <button onclick="closeBmnModal()" class="text-slate-300 hover:text-white p-1">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
      </div>

      <div class="p-6 overflow-y-auto space-y-4 text-xs">
        <div class="p-3.5 bg-gradient-to-r from-emerald-950 to-teal-900 text-white rounded-xl flex items-center justify-between gap-3 border border-emerald-500/30">
          <div class="flex items-center gap-2">
            <i data-lucide="globe" class="w-4 h-4 text-emerald-300"></i>
            <div>
              <span class="font-bold block text-white">Website Resmi BMN Aktif</span>
              <span class="text-[11px] text-emerald-200">project-lpp.pages.dev</span>
            </div>
          </div>
          <a href="https://project-lpp.pages.dev/" target="_blank" class="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 shadow">
            <span>Buka Website BMN</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        </div>

        <div class="space-y-3">
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">1. Mengisi Form Pengajuan</strong>
            <p class="text-slate-600">Pemohon mengajukan kebutuhan barang operasional melalui menu Google Form resmi.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">2. Mengecek Form Pengajuan</strong>
            <p class="text-slate-600">Admin pengelola BMN mengecek ketersediaan stok fisik di gudang persediaan.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">3. Sistem Pengecekan: Ditolak / Disetujui</strong>
            <p class="text-slate-600">Verifikasi status kelayakan pengajuan oleh pimpinan / Kasubag TU.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">4. Menyetujui Form Pengajuan</strong>
            <p class="text-slate-600">Penerbitan surat persetujuan pengeluaran barang persediaan resmi.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">5. Mengurangi Persediaan (Database Stok)</strong>
            <p class="text-slate-600">Database otomatis terpotong sesuai kuantitas yang disetujui guna akurasi saldo pembukuan.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">6. Mencatat Aktivitas &amp; Dokumen Excel &amp; PDF</strong>
            <p class="text-slate-600">Audit trail aktivitas tercatat, terintegrasi ke rekap spreadsheet Excel dan Berita Acara siap cetak PDF.</p>
          </div>
        </div>
      </div>

      <div class="bg-slate-50 border-t border-slate-200 p-4 flex justify-between items-center">
        <span class="text-xs text-slate-500">Lapas Perempuan Kelas III Pangkal Pinang</span>
        <button onclick="closeBmnModal()" class="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold">
          Tutup
        </button>
      </div>
    </div>
  </div>

  <!-- SDM MODAL -->
  <div id="sdmModal" class="hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <div class="bg-gradient-to-r from-[#0B192C] via-[#0F2C59] to-[#1E3E62] text-white p-5 flex items-start justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-sky-400/20 text-sky-300">
            <i data-lucide="file-text" class="w-6 h-6"></i>
          </div>
          <div>
            <span class="text-xs text-sky-200">Lapas Perempuan Kelas III Pangkal Pinang</span>
            <h3 class="text-lg font-bold text-white mt-0.5">JURNAL HARIAN PEGAWAI</h3>
            <p class="text-xs text-slate-300">Alur SOP Pelaporan Kinerja Harian, Monitoring Disiplin, &amp; Evaluasi SKP</p>
          </div>
        </div>
        <button onclick="closeSdmModal()" class="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
      </div>

      <div class="p-6 overflow-y-auto space-y-4 text-xs">
        <div class="p-3.5 bg-gradient-to-r from-blue-950 to-sky-900 text-white rounded-xl flex items-center justify-between gap-3 border border-sky-500/30">
          <div class="flex items-center gap-2">
            <i data-lucide="clipboard-list" class="w-4 h-4 text-sky-300"></i>
            <div>
              <span class="font-bold block text-white">Google Form Jurnal Aktif</span>
              <span class="text-[11px] text-sky-200">Presensi &amp; Kinerja Harian</span>
            </div>
          </div>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSczR96TJlFq2dgl5CjutF-hiFrhwXSCqkqifrRo66SJS34B4g/viewform?usp=send_form" target="_blank" class="px-3.5 py-1.5 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 shadow">
            <span>Isi Jurnal Harian</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        </div>

        <div class="space-y-3">
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">1. Pengisian Form Jurnal Harian</strong>
            <p class="text-slate-600">Pegawai mengisi Google Form dengan uraian tugas, volume hasil, satuan, dan durasi pelaksanaan kerja dinas harian.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">2. Perekaman &amp; Validasi Data Otomatis</strong>
            <p class="text-slate-600">Sistem merekam data secara realtime ke cloud kepegawaian dengan pencatatan timestamp akurat.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">3. Verifikasi Pengelola Kepegawaian</strong>
            <p class="text-slate-600">Urusan Kepegawaian &amp; TU memverifikasi ketepatan waktu pengisian (cut-off) dan kesesuaian dengan absensi fisik.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">4. Pemeriksaan &amp; Evaluasi Atasan Langsung</strong>
            <p class="text-slate-600">Kasubag TU / Kasi menelaah substansi capaian kerja harian bawahan, memberi arahan pembinaan, dan mengesahkan jurnal.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">5. Akumulasi Capaian &amp; Penilaian Disiplin</strong>
            <p class="text-slate-600">Perhitungan skor produktivitas harian dan persentase kedisiplinan sebagai indikator capaian SKP bulanan.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <strong class="text-blue-950 text-sm block mb-1">6. Penerbitan Rekapitulasi Laporan &amp; Arsip</strong>
            <p class="text-slate-600">Data direkapitulasi berkala menjadi spreadsheet Excel dan berkas cetak PDF Laporan Capaian Kinerja Harian (LCKH).</p>
          </div>
        </div>
      </div>

      <div class="bg-slate-50 border-t border-slate-200 p-4 flex justify-between items-center">
        <span class="text-xs text-slate-500">Lapas Perempuan Kelas III Pangkal Pinang</span>
        <button onclick="closeSdmModal()" class="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold">
          Tutup
        </button>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="bg-[#0B192C] text-slate-300 border-t-4 border-amber-400 mt-auto">
    <div class="bg-[#0F2C59] border-b border-slate-700/80 py-5 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span class="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Kanal Aspirasi &amp; Pengaduan Masyarakat</span>
          <h4 class="text-base font-bold text-white">Layanan Pengaduan Lapas Perempuan Kelas III Pangkal Pinang</h4>
        </div>
        <a href="https://wa.me/6281274346822?text=Halo%20Humas%20Lapas%20Perempuan%20Pangkalpinang" target="_blank" class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow">
          <i data-lucide="message-square" class="w-4 h-4"></i>
          <span>Chat WhatsApp 0812-7434-6822</span>
        </a>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <img src="/logo.jpg" alt="Logo Kemenimipas" class="w-12 h-12 rounded-full border-2 border-amber-400 object-cover" />
            <div>
              <h5 class="text-sm font-bold text-white">SILAPAS-INTEGRATED</h5>
              <p class="text-[11px] text-slate-400">Lapas Perempuan Kelas III Pangkal Pinang</p>
            </div>
          </div>
          <p class="text-slate-400 leading-relaxed">
            Portal integrasi layanan kehumasan, inovasi BMN, dan SDM menuju pemasyarakatan yang transparan dan akuntabel.
          </p>
        </div>

        <div class="space-y-2">
          <h5 class="text-xs font-bold text-white uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
            <i data-lucide="clock" class="w-3.5 h-3.5"></i>
            Jam Layanan Publik
          </h5>
          <div class="p-2 rounded bg-slate-800/60 border border-slate-700/50 flex justify-between">
            <span>Senin - Kamis</span>
            <span class="text-amber-300 font-bold">08:00 - 15:00 WIB</span>
          </div>
          <div class="p-2 rounded bg-slate-800/60 border border-slate-700/50 flex justify-between">
            <span>Jum'at</span>
            <span class="text-amber-300 font-bold">08:00 - 14:00 WIB</span>
          </div>
          <div class="p-2 rounded bg-slate-800/60 border border-slate-700/50 flex justify-between">
            <span>Sabtu</span>
            <span class="text-amber-300 font-bold">08:00 - 12:00 WIB</span>
          </div>
        </div>

        <div class="space-y-2">
          <h5 class="text-xs font-bold text-white uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
            Alamat &amp; Kontak
          </h5>
          <p class="text-slate-300 leading-relaxed">
            Jl. Sanggul Dewa No.1, Batin Tikal, Kota Pangkal Pinang, Kepulauan Bangka Belitung, Indonesia
          </p>
          <p class="text-slate-300">
            Layanan Pengaduan (WhatsApp): <a href="https://wa.me/6281274346822" class="text-emerald-400 font-bold">081274346822</a>
          </p>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-slate-800 text-center sm:flex sm:justify-between text-[11px] text-slate-400">
        <p>Hak cipta &copy; 2026 Humas Lapas Perempuan Kelas III Pangkal Pinang</p>
        <p class="text-amber-400/90 font-medium">Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia</p>
      </div>
    </div>
  </footer>

  <script>
    lucide.createIcons();
    function updateClock() {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const wib = new Date(utc + (3600000 * 7));
      const hh = String(wib.getHours()).padStart(2, '0');
      const mm = String(wib.getMinutes()).padStart(2, '0');
      const el = document.getElementById('liveClock');
      if (el) el.textContent = \`\${hh}:\${mm} WIB\`;
    }
    updateClock();
    setInterval(updateClock, 30000);

    let currentCategory = 'all';
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const resetSearchLink = document.getElementById('resetSearchLink');
    const resultCount = document.getElementById('resultCount');
    const cards = document.querySelectorAll('.service-card');

    function applyFilter() {
      const query = (searchInput.value || '').trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
        const text = card.innerText.toLowerCase();

        const matchCat = (currentCategory === 'all') || (cat === currentCategory);
        const matchQuery = !query || text.includes(query) || keywords.includes(query);

        if (matchCat && matchQuery) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      ['layanan', 'sosmed'].forEach(sec => {
        const secEl = document.getElementById('section-' + sec);
        if (secEl) {
          const visibleCards = secEl.querySelectorAll('.service-card:not(.hidden)');
          secEl.style.display = (visibleCards.length > 0) ? 'block' : 'none';
        }
      });

      if (resultCount) resultCount.textContent = \`Menampilkan \${visibleCount} dari \${cards.length} layanan\`;
      if (query) {
        clearSearchBtn.classList.remove('hidden');
        resetSearchLink.classList.remove('hidden');
      } else {
        clearSearchBtn.classList.add('hidden');
        resetSearchLink.classList.add('hidden');
      }
    }

    if (searchInput) searchInput.addEventListener('input', applyFilter);
    if (clearSearchBtn) clearSearchBtn.addEventListener('click', () => { searchInput.value = ''; applyFilter(); });
    if (resetSearchLink) resetSearchLink.addEventListener('click', resetSearch);

    function resetSearch() {
      if (searchInput) searchInput.value = '';
      currentCategory = 'all';
      updateTabStyles();
      applyFilter();
    }

    function filterCategory(cat) {
      currentCategory = cat;
      updateTabStyles();
      applyFilter();
    }

    function updateTabStyles() {
      ['all', 'layanan', 'sosmed'].forEach(c => {
        const btn = document.getElementById('tab-' + c);
        if (btn) {
          if (c === currentCategory) {
            btn.className = 'tab-btn active px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-amber-400 text-slate-950 shadow';
          } else {
            btn.className = 'tab-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-slate-800/80 text-slate-200 border border-slate-700';
          }
        }
      });
    }

    function openBmnModal() { document.getElementById('bmnModal').classList.remove('hidden'); }
    function closeBmnModal() { document.getElementById('bmnModal').classList.add('hidden'); }
    function openSdmModal() { document.getElementById('sdmModal').classList.remove('hidden'); }
    function closeSdmModal() { document.getElementById('sdmModal').classList.add('hidden'); }
  </script>
</body>
</html>`;
