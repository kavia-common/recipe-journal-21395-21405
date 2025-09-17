import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Minimal dashboard placeholder that requires authentication.
 */
export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="container p-6 text-left">
      <h2 className="text-2xl font-bold text-text mb-2">Dashboard</h2>
      <p className="text-gray-600 mb-4">You are logged in as: {user?.email}</p>
      <button className="btn" style={{ position: 'static' }} onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}
