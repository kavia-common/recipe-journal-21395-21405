import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Basic signup form for email/password. Sends confirmation email.
 */
export default function Signup() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus('Creating account...');
    setErrorMsg('');
    const { error } = await signUp(email, password);
    if (error) {
      setErrorMsg(error.message);
      setStatus('');
    } else {
      setStatus('Sign-up successful. Check your email to confirm your account.');
    }
  };

  return (
    <div className="container" style={{ padding: 24, maxWidth: 480, margin: '0 auto' }}>
      <h2 className="title">Sign Up</h2>
      <form onSubmit={handleSignup} style={{ display: 'grid', gap: 12 }}>
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
          Create Account
        </button>

        {status && <div className="description" style={{ color: '#2563EB' }}>{status}</div>}
        {errorMsg && <div className="description" style={{ color: '#EF4444' }}>{errorMsg}</div>}
      </form>

      <p className="description" style={{ marginTop: 16 }}>
        Already have an account? <a href="#/login" className="App-link">Log in</a>
      </p>
    </div>
  );
}
