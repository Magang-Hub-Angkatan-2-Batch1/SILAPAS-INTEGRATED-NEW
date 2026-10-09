import { createClient } from '@supabase/supabase-js';
import { KilasBalikItem, OfficeProfileData, PetaJabatanData, GDriveOption, AuthSession } from '../types';
import { KILAS_BALIK_DATA } from '../data/kilasBalik';

function getCredentials() {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL || '').trim();
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || '').trim();

  let localUrl = '';
  let localKey = '';
  if (typeof window !== 'undefined') {
    try {
      localUrl = (localStorage.getItem('silapas_supabase_url') || '').trim();
      localKey = (localStorage.getItem('silapas_supabase_anon_key') || '').trim();
    } catch {
      // ignore
    }
  }

  const url = envUrl || localUrl;
  const key = envKey || localKey;

  const isConfigured = Boolean(
    url &&
    key &&
    url.startsWith('https://') &&
    !url.includes('your-project')
  );

  return { url, key, isConfigured };
}

const creds = getCredentials();
export const isSupabaseConfigured = creds.isConfigured;

export const supabase = creds.isConfigured
  ? createClient(creds.url, creds.key)
  : null;

export interface DbCustomLink {
  id: string;
  url: string;
  sub_title?: string | null;
  updated_at?: string;
}

export interface DbKilasBalik {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image_url: string;
  link_url?: string | null;
  updated_at?: string;
}

/**
 * Fetch all custom links from Supabase cloud database
 * Falls back to localStorage if Supabase is not configured or fails
 */
export async function fetchCustomLinksFromCloud(): Promise<Record<string, { url: string; subTitle?: string }> | null> {
  if (!supabase || !isSupabaseConfigured) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('custom_links')
      .select('id, url, sub_title');

    if (error) {
      console.warn('Supabase fetch error, fallback to local:', error.message);
      return null;
    }

    if (data && Array.isArray(data)) {
      const map: Record<string, { url: string; subTitle?: string }> = {};
      data.forEach((row: DbCustomLink) => {
        if (row.id && row.url) {
          map[row.id] = {
            url: row.url,
            subTitle: row.sub_title || undefined,
          };
        }
      });
      return map;
    }
  } catch (err) {
    console.warn('Failed to query Supabase cloud:', err);
  }

  return null;
}

/**
 * Save custom link to Supabase cloud database
 */
export async function saveCustomLinkToCloud(
  serviceId: string, 
  url: string, 
  subTitle?: string
): Promise<{ success: boolean; error?: string }> {
  if (!supabase || !isSupabaseConfigured) {
    return { 
      success: false, 
      error: 'Supabase belum terhubung di website ini. Tautan hanya tersimpan di memori browser lokal perangkat ini.' 
    };
  }

  try {
    const { error } = await supabase
      .from('custom_links')
      .upsert({
        id: serviceId,
        url,
        sub_title: subTitle || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) {
      console.error('Supabase upsert error:', error);
      let userFriendly = error.message;
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        userFriendly = 'Tabel "custom_links" belum dibuat di Supabase. Silakan buat tabel melalui menu SQL Editor Supabase.';
      } else if (error.message.includes('row-level security') || error.message.includes('policy')) {
        userFriendly = 'Izin RLS Supabase memblokir penulisan. Tambahkan Policy atau matikan RLS pada tabel custom_links di Supabase.';
      }
      return { success: false, error: userFriendly };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Koneksi ke Supabase gagal';
    console.error('Failed to save to Supabase:', err);
    return { success: false, error: msg };
  }
}

/**
 * Reset a custom link from Supabase cloud database
 */
export async function deleteCustomLinkFromCloud(serviceId: string): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('custom_links')
      .delete()
      .eq('id', serviceId);

    if (error) {
      console.error('Supabase delete error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to delete from Supabase:', err);
    return false;
  }
}

/**
 * Fetch all Kilas Balik posts from Supabase cloud database
 */
export async function fetchKilasBalikFromCloud(): Promise<KilasBalikItem[] | null> {
  if (!supabase || !isSupabaseConfigured) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('kilas_balik')
      .select('id, title, date, category, description, image_url, link_url')
      .order('id', { ascending: true });

    if (error) {
      console.warn('Supabase fetch kilas_balik error:', error.message);
      return null;
    }

    if (data && Array.isArray(data)) {
      if (data.length > 0) {
        return data.map((row: DbKilasBalik) => ({
          id: row.id,
          title: row.title,
          date: row.date,
          category: row.category,
          description: row.description,
          imageUrl: row.image_url,
          linkUrl: row.link_url || undefined,
          isFromCloud: true,
        }));
      } else {
        // Table exists in Supabase but has 0 rows. Auto-seed with default posts
        try {
          const seedPayload = KILAS_BALIK_DATA.map((item) => ({
            id: item.id,
            title: item.title,
            date: item.date,
            category: item.category,
            description: item.description,
            image_url: item.imageUrl,
            link_url: item.linkUrl || null,
            updated_at: new Date().toISOString(),
          }));
          await supabase.from('kilas_balik').insert(seedPayload);
          return KILAS_BALIK_DATA.map((item) => ({ ...item, isFromCloud: true }));
        } catch (seedErr) {
          console.warn('Auto-seed kilas_balik failed:', seedErr);
        }
      }
    }
  } catch (err) {
    console.warn('Failed to query Supabase kilas_balik:', err);
  }

  return null;
}

/**
 * Save / Update a Kilas Balik post in Supabase cloud database
 */
export async function saveKilasBalikItemToCloud(
  item: KilasBalikItem
): Promise<{ success: boolean; error?: string }> {
  if (!supabase || !isSupabaseConfigured) {
    return {
      success: false,
      error: 'Supabase belum terhubung di website ini. Postingan hanya tersimpan di memori browser lokal perangkat ini.',
    };
  }

  try {
    const { error } = await supabase
      .from('kilas_balik')
      .upsert(
        {
          id: item.id,
          title: item.title,
          date: item.date,
          category: item.category,
          description: item.description,
          image_url: item.imageUrl,
          link_url: item.linkUrl || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (error) {
      console.error('Supabase kilas_balik upsert error:', error);
      let userFriendly = error.message;
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        userFriendly = 'Tabel "kilas_balik" belum dibuat di Supabase. Silakan jalankan query pembuatan tabel di SQL Editor Supabase.';
      } else if (error.message.includes('row-level security') || error.message.includes('policy')) {
        userFriendly = 'Izin RLS Supabase memblokir penulisan. Tambahkan Policy atau izinkan akses pada tabel kilas_balik di Supabase.';
      }
      return { success: false, error: userFriendly };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Koneksi ke Supabase gagal';
    console.error('Failed to save kilas_balik to Supabase:', err);
    return { success: false, error: msg };
  }
}

/**
 * Fetch Office Profile from Supabase cloud database
 */
export async function fetchOfficeProfileFromCloud(): Promise<OfficeProfileData | null> {
  if (!supabase || !isSupabaseConfigured) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('office_profile')
      .select('data')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetch office_profile error:', error.message);
      return null;
    }

    if (data && data.data) {
      return typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
    }
  } catch (err) {
    console.warn('Failed to query Supabase office_profile:', err);
  }

  return null;
}

/**
 * Save Office Profile to Supabase cloud database
 */
export async function saveOfficeProfileToCloud(
  profile: OfficeProfileData
): Promise<{ success: boolean; error?: string }> {
  if (!supabase || !isSupabaseConfigured) {
    return {
      success: false,
      error: 'Supabase belum terhubung di website ini. Data tersimpan di memori browser lokal perangkat ini.',
    };
  }

  try {
    const { error } = await supabase
      .from('office_profile')
      .upsert(
        {
          id: 'default',
          data: profile,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (error) {
      console.error('Supabase office_profile upsert error:', error);
      let userFriendly = error.message;
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        userFriendly = 'Tabel "office_profile" belum dibuat di Supabase.';
      }
      return { success: false, error: userFriendly };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Koneksi ke Supabase gagal';
    return { success: false, error: msg };
  }
}

/**
 * Fetch Peta Jabatan & Pejabat from Supabase cloud database
 */
export async function fetchPetaJabatanFromCloud(): Promise<PetaJabatanData | null> {
  if (!supabase || !isSupabaseConfigured) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('peta_jabatan')
      .select('data')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetch peta_jabatan error:', error.message);
      return null;
    }

    if (data && data.data) {
      return typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
    }
  } catch (err) {
    console.warn('Failed to query Supabase peta_jabatan:', err);
  }

  return null;
}

/**
 * Save Peta Jabatan & Pejabat to Supabase cloud database
 */
export async function savePetaJabatanToCloud(
  peta: PetaJabatanData
): Promise<{ success: boolean; error?: string }> {
  if (!supabase || !isSupabaseConfigured) {
    return {
      success: false,
      error: 'Supabase belum terhubung di website ini. Data tersimpan di memori browser lokal perangkat ini.',
    };
  }

  try {
    const { error } = await supabase
      .from('peta_jabatan')
      .upsert(
        {
          id: 'default',
          data: peta,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (error) {
      console.error('Supabase peta_jabatan upsert error:', error);
      let userFriendly = error.message;
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        userFriendly = 'Tabel "peta_jabatan" belum dibuat di Supabase.';
      }
      return { success: false, error: userFriendly };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Koneksi ke Supabase gagal';
    return { success: false, error: msg };
  }
}

/**
 * Default GDrive Pegawai Folder Options
 */
export const DEFAULT_GDRIVE_OPTIONS: GDriveOption[] = [
  {
    id: 'gdrive-sk-pangkat-kgb',
    title: 'Arsip SK Kenaikan Pangkat & Kenaikan Gaji Berkala (KGB)',
    description: 'Dokumen petikan SK kenaikan pangkat reguler/struktural dan KGB seluruh ASN Lapas.',
    url: 'https://drive.google.com/drive/folders/1wzP_YlppPkpPegawaiDriveDocs',
    category: 'SK & Pangkat',
    order: 1,
  },
  {
    id: 'gdrive-profil-asn',
    title: 'Database Profil Pegawai & Daftar Susunan Pegawai (DSP)',
    description: 'Biodata lengkap, riwayat jabatan, kartu pegawai, dan matriks bezetting pegawai.',
    url: 'https://drive.google.com/drive/folders/1wzP_YlppPkpPegawaiDriveDocs',
    category: 'Profil & ASN',
    order: 2,
  },
  {
    id: 'gdrive-cuti-izin',
    title: 'Formulir & Rekapitulasi Cuti, Sakit, dan Izin Dinas',
    description: 'Format pengajuan permohonan cuti tahunan, cuti melahirkan, izin sakit, dan bukti presensi.',
    url: 'https://drive.google.com/drive/folders/1wzP_YlppPkpPegawaiDriveDocs',
    category: 'Cuti & Presensi',
    order: 3,
  },
  {
    id: 'gdrive-skp-kinerja',
    title: 'Dokumen Sasaran Kinerja Pegawai (SKP) & Penilaian Kinerja',
    description: 'Perjanjian kinerja tahunan, laporan capaian bulanan, dan evaluasi periodik pegawai.',
    url: 'https://drive.google.com/drive/folders/1wzP_YlppPkpPegawaiDriveDocs',
    category: 'SKP & Kinerja',
    order: 4,
  },
  {
    id: 'gdrive-sop-regulasi',
    title: 'Standar Operasional Prosedur (SOP) & Kode Etik Internal',
    description: 'Buku pedoman SOP pelaksanaan tugas pengamanan, pembinaan, tata usaha, dan kode etik ASN.',
    url: 'https://drive.google.com/drive/folders/1wzP_YlppPkpPegawaiDriveDocs',
    category: 'SOP & Regulasi',
    order: 5,
  },
  {
    id: 'gdrive-folder-utama',
    title: 'Folder Induk Utama Google Drive Kepegawaian',
    description: 'Direktori repositori Google Drive resmi induk Bagian Kepegawaian dan Tata Usaha.',
    url: 'https://drive.google.com/drive/folders/1wzP_YlppPkpPegawaiDriveDocs',
    category: 'Folder Utama',
    order: 6,
  },
];

/**
 * Fetch GDrive Pegawai options from Supabase cloud database
 */
export async function fetchGDriveOptionsFromCloud(): Promise<GDriveOption[] | null> {
  if (!supabase || !isSupabaseConfigured) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('gdrive_options')
      .select('data')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetch gdrive_options error:', error.message);
      return null;
    }

    if (data && data.data) {
      return typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
    }
  } catch (err) {
    console.warn('Failed to query Supabase gdrive_options:', err);
  }

  return null;
}

/**
 * Save GDrive Pegawai options to Supabase cloud database
 */
export async function saveGDriveOptionsToCloud(
  options: GDriveOption[]
): Promise<{ success: boolean; error?: string }> {
  if (!supabase || !isSupabaseConfigured) {
    return {
      success: false,
      error: 'Supabase belum terhubung di website ini. Data tersimpan di memori browser lokal perangkat ini.',
    };
  }

  try {
    const { error } = await supabase
      .from('gdrive_options')
      .upsert(
        {
          id: 'default',
          data: options,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (error) {
      console.error('Supabase gdrive_options upsert error:', error);
      let userFriendly = error.message;
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        userFriendly = 'Tabel "gdrive_options" belum dibuat di Supabase.';
      }
      return { success: false, error: userFriendly };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Koneksi ke Supabase gagal';
    return { success: false, error: msg };
  }
}

/**
 * Session storage helpers for User and Admin roles
 */
export function getStoredAuthSession(): AuthSession | null {
  try {
    const stored = localStorage.getItem('silapas_auth_user');
    if (stored) {
      return JSON.parse(stored);
    }
    // Check legacy admin session
    if (localStorage.getItem('silapas_admin_auth') === 'true') {
      return {
        email: 'lppkelasiiipkp@gmail.com',
        role: 'admin',
        name: 'Administrator',
      };
    }
  } catch {
    // ignore
  }
  return null;
}

export function saveStoredAuthSession(session: AuthSession): void {
  try {
    localStorage.setItem('silapas_auth_user', JSON.stringify(session));
    if (session.role === 'admin') {
      localStorage.setItem('silapas_admin_auth', 'true');
    } else {
      localStorage.removeItem('silapas_admin_auth');
    }
  } catch {
    // ignore
  }
}

export function clearStoredAuthSession(): void {
  try {
    localStorage.removeItem('silapas_auth_user');
    localStorage.removeItem('silapas_admin_auth');
  } catch {
    // ignore
  }
}

/**
 * Cloud and Local authentication verification
 */
export async function authenticateUserWithCloud(
  email: string,
  password: string,
  requestedRole: 'admin' | 'user'
): Promise<{ success: boolean; role?: 'admin' | 'user'; name?: string; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  // 1. If Supabase is connected, attempt check against app_users table
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('app_users')
        .select('id, email, password, role, name')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (!error && data) {
        if (data.password === cleanPassword) {
          const matchedRole: 'admin' | 'user' = data.role === 'admin' ? 'admin' : 'user';
          return {
            success: true,
            role: matchedRole,
            name: data.name || (matchedRole === 'admin' ? 'Administrator' : 'Pegawai Lapas'),
          };
        } else {
          return { 
            success: false, 
            error: 'Kata sandi tidak sesuai dengan akun di database Supabase.' 
          };
        }
      }
    } catch (err) {
      console.warn('Supabase app_users table query error, fallback to built-in auth:', err);
    }
  }

  // 2. Built-in credentials verification (ensures reliable access in all environments)
  const adminTargetPassword = 'lppkelas3pkp@#';
  const userValidPasswords = ['pegawai123', 'lapas3pkp', 'lppkelas3pkp', 'pegawai'];

  if (requestedRole === 'admin') {
    if (cleanPassword === adminTargetPassword) {
      return { 
        success: true, 
        role: 'admin', 
        name: 'Administrator Lapas' 
      };
    }
    return { 
      success: false, 
      error: 'Kata sandi administrator salah. Silakan periksa kembali.' 
    };
  } else {
    // User / Pegawai role check
    if (cleanPassword === adminTargetPassword) {
      // User entered admin password, login as admin
      return { 
        success: true, 
        role: 'admin', 
        name: 'Administrator Lapas' 
      };
    }
    if (userValidPasswords.includes(cleanPassword) || cleanPassword.length >= 6) {
      return { 
        success: true, 
        role: 'user', 
        name: 'Pegawai Lapas' 
      };
    }
    return { 
      success: false, 
      error: 'Kata sandi pegawai minimal 6 karakter (Contoh bawaan: pegawai123 atau lapas3pkp).' 
    };
  }
}

/**
 * SQL script for Supabase tables creation
 */
export const SUPABASE_SQL_SCHEMA = `-- SKEMA SQL SUPABASE SILAPAS INTEGRATED
-- Jalankan query ini di menu 'SQL Editor' pada dashboard Supabase Anda.

-- 1. Tabel Tautan Kustom Layanan & Website Lapas
CREATE TABLE IF NOT EXISTS custom_links (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  sub_title TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Kilas Balik Kegiatan Lapas
CREATE TABLE IF NOT EXISTS kilas_balik (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Struktur Organisasi & Peta Jabatan (Termasuk Logo Kiri & Logo Kanan)
CREATE TABLE IF NOT EXISTS peta_jabatan (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabel Menu Opsi Google Drive Dokumen Pegawai
CREATE TABLE IF NOT EXISTS gdrive_options (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabel Profil Kantor Lapas
CREATE TABLE IF NOT EXISTS office_profile (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabel Manajemen Akun Pengguna & Role (user & admin)
CREATE TABLE IF NOT EXISTS app_users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user', -- 'user' atau 'admin'
  name TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Data Pengguna Awal Bawaan
INSERT INTO app_users (id, email, password, role, name)
VALUES 
  ('usr-admin-1', 'lppkelasiiipkp@gmail.com', 'lppkelas3pkp@#', 'admin', 'Administrator Lapas'),
  ('usr-pegawai-1', 'pegawai@lapas.go.id', 'pegawai123', 'user', 'Pegawai Lapas')
ON CONFLICT (id) DO NOTHING;
`;

