import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { listMyRecipes } from '../utils/api';
import RecipeCard from './RecipeCard';

/**
 * PUBLIC_INTERFACE
 * My Recipes page: shows saved recipes for the current user with edit/delete.
 */
export default function MyRecipes() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState('');

  const refresh = async () => {
    if (!user) return;
    setLoading(true);
    setErr('');
    try {
      const data = await listMyRecipes(user.id);
      setRows(data);
    } catch (e) {
      setErr(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="container p-4 text-left">
      <h2 className="text-2xl font-bold text-text mb-3">My Recipes</h2>
      {loading && <div className="text-gray-600">Loading...</div>}
      {err && <div className="text-error">{err}</div>}
      <div className="grid gap-4 mt-4">
        {rows.map((row) => (
          <RecipeCard
            key={row.id}
            mode="saved"
            recipe={row}
            onRefresh={refresh}
          />
        ))}
      </div>
      {!loading && rows.length === 0 && (
        <div className="text-gray-600">You haven’t saved any recipes yet. Go to Discover to find some!</div>
      )}
    </div>
  );
}
