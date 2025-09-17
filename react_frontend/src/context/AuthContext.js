import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { getURL } from '../utils/getURL';

const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  signUp: async (_email, _password) => {},
  signInWithPassword: async (_email, _password) => {},
  signOut: async () => {},
});

// PUBLIC_INTERFACE
export const useAuth = () => {
  /** Hook to access auth state and actions. */
  return useContext(AuthContext);
};

// PUBLIC_INTERFACE
export const AuthProvider = ({ children }) => {
  /**
   * Provides authentication state (user, session, loading)
   * and actions (signUp, signInWithPassword, signOut).
   * Manages Supabase onAuthStateChange subscription.
   */
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!isMounted) return;
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error loading initial session:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    init();

    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  // PUBLIC_INTERFACE
  const signUp = async (email, password) => {
    /** Sign up user with email/password. Sends confirmation email with redirect to /auth/callback */
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${getURL()}auth/callback` },
    });
    return { data, error };
  };

  // PUBLIC_INTERFACE
  const signInWithPassword = async (email, password) => {
    /** Sign in user with email/password. */
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  // PUBLIC_INTERFACE
  const signOut = async () => {
    /** Sign out current user. */
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value = useMemo(
    () => ({ user, session, loading, signUp, signInWithPassword, signOut }),
    [user, session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
