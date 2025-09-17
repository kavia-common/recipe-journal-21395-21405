import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from './SearchBar';
import RecipeCard from './RecipeCard';
import { searchRecipes } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { listMyRecipes } from '../utils/api';

/**
 * PUBLIC_INTERFACE
 * Discover page: search recipes via backend, show results, allow saving.
 */
export default function Discover() {
  const { user } = useAuth();
  const [query, setQuery] = useState('chicken');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [err, setErr] = useState('');

  const [mySaved, setMySaved] = useState([]);
  const savedMap = useMemo(() => {
    const m = new Map();
    mySaved.forEach((row) => m.set(row.meal_id, row));
    return m;
  }, [mySaved]);

  const refreshSaved = async () => {
    if (!user) {
      setMySaved([]);
      return;
    }
    try {
      const rows = await listMyRecipes(user.id);
      setMySaved(rows);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load saved recipes', e);
    }
  };

  const doSearch = async (q) => {
    setLoading(true);
    setErr('');
    try {
      const data = await searchRecipes(q);
      setResults(Array.isArray(data?.recipes) ? data.recipes : []);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setErr(e.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doSearch(query);
    // also load saved if logged in
    refreshSaved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="container p-4 text-left">
      <h2 className="text-2xl font-bold text-text mb-3">Discover Recipes</h2>
      <SearchBar initial={query} onSearch={(q) => { setQuery(q); doSearch(q); }} />
      {loading && <div className="mt-4 text-gray-600">Searching...</div>}
      {err && <div className="mt-4 text-error">{err}</div>}
      <div className="grid gap-4 mt-4">
        {results.map((r) => (
          <RecipeCard
            key={r.id}
            mode="discover"
            recipe={r}
            savedMap={savedMap}
            onRefresh={refreshSaved}
          />
        ))}
        {!loading && results.length === 0 && (
          <div className="text-gray-600">No results for “{query}”. Try another term.</div>
        )}
      </div>
    </div>
  );
}
