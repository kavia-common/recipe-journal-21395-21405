import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';
import { getURL } from '../utils/getURL';

/**
 * PUBLIC_INTERFACE
 * Basic login form for email/password and magic link OTP.
 */
export default function Login({ onSuccess }) {
  const { signInWithPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setStatus('Signing in...');
    setErrorMsg('');
    const { error } = await signInWithPassword(email, password);
    if (error) {
      setErrorMsg(error.message);
      setStatus('');
    } else {
      setStatus('Signed in!');
      if (onSuccess) onSuccess();
    }
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setStatus('Sending magic link...');
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${getURL()}auth/callback` },
    });
    if (error) {
      setErrorMsg(error.message);
      setStatus('');
    } else {
      setStatus('Magic link sent! Check your email.');
    }
  };

  return (
    <div className="container" style={{ padding: 24, maxWidth: 480, margin: '0 auto' }}>
      <h2 className="title">Login</h2>
      <form onSubmit={handlePasswordLogin} style={{ display: 'grid', gap: 12 }}>
        <label className="description" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border-color)' }}
        />

        <label className="description" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border-color)' }}
        />

        <button type="submit" className="theme-toggle" style={{ position: 'static' }}>
          Sign In
        </button>

        <button onClick={handleMagicLink} className="theme-toggle" style={{ position: 'static', backgroundColor: '#2563EB' }}>
          Send Magic Link
        </button>

        {status && <div className="description" style={{ color: '#2563EB' }}>{status}</div>}
        {errorMsg && <div className="description" style={{ color: '#EF4444' }}>{errorMsg}</div>}
      </form>

      <p className="description" style={{ marginTop: 16 }}>
        Don&apos;t have an account? <a href="#/signup" className="App-link">Sign up</a>
      </p>
    </div>
  );
}
