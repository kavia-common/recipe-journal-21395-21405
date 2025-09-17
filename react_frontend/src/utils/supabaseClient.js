import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client initialization for the browser.
 * Reads URL and anon key from environment variables.
 *
 * Required env variables:
 * - REACT_APP_SUPABASE_URL
 * - REACT_APP_SUPABASE_ANON_KEY
 *
 * Security note: Do NOT use or expose the Service Role Key in the browser.
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase URL or anon key is not set. Please configure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in your .env file.'
  );
}

// PUBLIC_INTERFACE
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
