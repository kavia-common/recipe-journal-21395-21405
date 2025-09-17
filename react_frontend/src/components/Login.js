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
    <div className="container max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-text mb-4">Login</h2>
      <form onSubmit={handlePasswordLogin} className="grid gap-3">
        <label className="text-sm text-gray-600" htmlFor="email">Email</label>
        <input
          id="email"
          className="input"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label className="text-sm text-gray-600" htmlFor="password">Password</label>
        <input
          id="password"
          className="input"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit" className="btn">
          Sign In
        </button>

        <button onClick={handleMagicLink} type="button" className="btn bg-primary hover:bg-primary-700">
          Send Magic Link
        </button>

        {status && <div className="text-sm text-primary">{status}</div>}
        {errorMsg && <div className="text-sm text-error">{errorMsg}</div>}
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Don&apos;t have an account? <a href="#/signup" className="App-link">Sign up</a>
      </p>
    </div>
  );
}
