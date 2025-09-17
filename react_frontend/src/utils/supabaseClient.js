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
 *
 * Note: After changing .env variables, you MUST restart the dev server (npm start).
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Debug logging to verify env variables at runtime (safe to log last 6 chars only)
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.log('[Supabase] REACT_APP_SUPABASE_URL:', supabaseUrl || '(not set)');
  // eslint-disable-next-line no-console
  console.log(
    '[Supabase] REACT_APP_SUPABASE_ANON_KEY:',
    supabaseAnonKey ? `***${supabaseAnonKey.slice(-6)}` : '(not set)'
  );
}

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase URL or anon key is not set. Please configure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in your .env file and restart the dev server.'
  );
}

// PUBLIC_INTERFACE
export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
