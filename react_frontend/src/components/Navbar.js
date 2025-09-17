import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Top navigation bar with links to Discover, My Recipes, and Auth actions.
 */
export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-3">
        <a href="#/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">RJ</div>
          <span className="text-lg font-semibold">Recipe Journal</span>
        </a>
        <div className="flex items-center gap-4">
          <a className="App-link font-semibold" href="#/discover">Discover</a>
          {user && <a className="App-link font-semibold" href="#/my-recipes">My Recipes</a>}
          {!user && (
            <>
              <a className="App-link font-semibold" href="#/login">Login</a>
              <a className="App-link font-semibold" href="#/signup">Sign Up</a>
            </>
          )}
          {user && (
            <button className="btn bg-primary hover:bg-primary-700" onClick={() => signOut()}>
              Sign out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
