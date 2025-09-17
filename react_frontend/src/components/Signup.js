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
    <div className="container max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-text mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="grid gap-3">
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
          Create Account
        </button>

        {status && <div className="text-sm text-primary">{status}</div>}
        {errorMsg && <div className="text-sm text-error">{errorMsg}</div>}
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Already have an account? <a href="#/login" className="App-link">Log in</a>
      </p>
    </div>
  );
}
