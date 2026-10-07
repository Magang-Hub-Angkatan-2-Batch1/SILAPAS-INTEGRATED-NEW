import { createClient } from '@supabase/supabase-js';
import { KilasBalikItem } from '../types';
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

