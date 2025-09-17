import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * ProtectedRoute renders children only when a user is authenticated.
 * If not authenticated, it renders a fallback (by default, a simple message).
 */
export default function ProtectedRoute({ children, fallback = null }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!user) {
    if (fallback) return fallback;
    return (
      <div style={{ padding: 24 }}>
        You must be logged in to view this page. Go to the login page.
      </div>
    );
  }
  return children;
}
