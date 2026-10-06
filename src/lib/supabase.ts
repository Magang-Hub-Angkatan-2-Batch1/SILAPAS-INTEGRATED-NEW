import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase (can be configured in .env or Cloudflare Pages)
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface DbCustomLink {
  id: string;
  url: string;
  sub_title?: string | null;
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
