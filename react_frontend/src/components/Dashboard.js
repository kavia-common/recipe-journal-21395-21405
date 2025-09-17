import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Minimal dashboard placeholder that requires authentication.
 */
export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="container" style={{ padding: 24 }}>
      <h2 className="title">Dashboard</h2>
      <p className="description">You are logged in as: {user?.email}</p>
      <button className="theme-toggle" style={{ position: 'static' }} onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}
