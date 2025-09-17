import React, { useState, useEffect } from 'react';
import './App.css';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthCallback from './components/AuthCallback';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import QuoteHeader from './components/QuoteHeader';
import Discover from './components/Discover';
import MyRecipes from './components/MyRecipes';

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

  const renderRoute = () => {
    switch (route) {
      case '/':
        return (
          <div className="text-left">
            <h1 className="text-3xl font-bold mb-2">Welcome{user ? `, ${user.email}` : ''}</h1>
            <p className="text-gray-600">Discover, save, and manage your favorite recipes.</p>
            <div className="mt-4 flex gap-3">
              <a className="btn bg-primary hover:bg-primary-700" href="#/discover">Start Discovering</a>
              {user ? <a className="btn bg-secondary hover:bg-amber-600" href="#/my-recipes">View My Recipes</a> : null}
            </div>
          </div>
        );
      case '/login':
        return <Login onSuccess={() => window.location.assign('#/discover')} />;
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
      case '/discover':
        return <Discover />;
      case '/my-recipes':
        return (
          <ProtectedRoute fallback={<div style={{ padding: 24 }}>Please <a className="App-link" href="#/login">log in</a> to view your recipes.</div>}>
            <MyRecipes />
          </ProtectedRoute>
        );
      default:
        return <div style={{ padding: 24 }}>Not found</div>;
    }
  };

  return (
    <div className="App">
      <header className="App-header min-h-screen bg-ocean-gradient bg-[length:100%_100%]">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className="container mx-auto px-4 py-6">
          <div className="mx-auto max-w-4xl">
            <Navbar />
            <QuoteHeader />
            <div className="card p-6">
              {renderRoute()}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
