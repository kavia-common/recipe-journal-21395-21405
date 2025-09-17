import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

/**
 * PUBLIC_INTERFACE
 * Processes the Supabase auth callback by extracting session from URL.
 */
export default function AuthCallback() {
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const handler = async () => {
      try {
        const { data, error } = await supabase.auth.getSessionFromUrl({
          storeSession: true,
        });
        if (error) {
          // eslint-disable-next-line no-console
          console.error('Auth callback error:', error);
          setStatus('Authentication failed. You can close this tab and try again.');
          return;
        }
        if (data?.session) {
          setStatus('Authentication successful! You can close this tab or return to the app.');
          // In a router-based app we could redirect to a dashboard route.
          // Here we simply inform the user; the main window now has an active session.
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Unexpected error in auth callback:', err);
        setStatus('Unexpected error during authentication.');
      }
    };
    handler();
  }, []);

  return (
    <div className="container" style={{ padding: 24 }}>
      <h2 className="title">Auth Callback</h2>
      <p className="description">{status}</p>
      <a href="#/" className="App-link">Return to Home</a>
    </div>
  );
}
