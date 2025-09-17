import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthCallback from './components/AuthCallback';
import Dashboard from './components/Dashboard';

// Simple hash-based router to avoid adding dependencies.
const useHashRoute = () => {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return [route, setRoute];
};

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [route] = useHashRoute();
  const { user } = useAuth();

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const Nav = () => (
    <nav className="navbar" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
      <a className="App-link" href="#/">Home</a>
      {!user && <a className="App-link" href="#/login">Login</a>}
      {!user && <a className="App-link" href="#/signup">Sign Up</a>}
      <a className="App-link" href="#/dashboard">Dashboard</a>
    </nav>
  );

  const renderRoute = () => {
    switch (route) {
      case '/':
        return (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <p>
              Current theme: <strong>{theme}</strong>
            </p>
            <p className="description">
              {user ? `Logged in as ${user.email}` : 'You are not logged in.'}
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </>
        );
      case '/login':
        return <Login onSuccess={() => window.location.assign('#/dashboard')} />;
      case '/signup':
        return <Signup />;
      case '/auth/callback':
        return <AuthCallback />;
      case '/dashboard':
        return (
          <ProtectedRoute fallback={<div style={{ padding: 24 }}>Please <a className="App-link" href="#/login">log in</a> to access the Dashboard.</div>}>
            <Dashboard />
          </ProtectedRoute>
        );
      default:
        return <div style={{ padding: 24 }}>Not found</div>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <Nav />
        {renderRoute()}
      </header>
    </div>
  );
}

export default App;
