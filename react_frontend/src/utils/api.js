/**
 * API helper utilities for backend proxy endpoints and Supabase CRUD.
 * Uses environment variables to resolve backend base URL.
 */
import { supabase } from './supabaseClient';

const backendBase =
  process.env.REACT_APP_BACKEND_BASE_URL?.replace(/\/$/, '') || '';

/**
 * Build a URL to the backend proxy. If backendBase is empty, falls back to relative path.
 */
const buildBackendUrl = (path) => {
  if (!path.startsWith('/')) path = `/${path}`;
  return backendBase ? `${backendBase}${path}` : path;
};

// PUBLIC_INTERFACE
export async function fetchRandomQuote() {
  /** Fetch a random quote from backend proxy */
  const res = await fetch(buildBackendUrl('/api/quotes/random'));
  if (!res.ok) throw new Error(`Quote request failed: ${res.status}`);
  return res.json();
}

// PUBLIC_INTERFACE
export async function searchRecipes(q, { includeRaw = false } = {}) {
  /** Search MealDB recipes via backend proxy */
  const url = new URL(buildBackendUrl('/api/recipes/search'), window.location.origin);
  url.searchParams.set('q', q);
  if (includeRaw) url.searchParams.set('include_raw', 'true');
  const res = await fetch(url.toString().replace(window.location.origin, ''));
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json(); // { count, recipes }
}

// PUBLIC_INTERFACE
export async function getRecipeById(mealId, { includeRaw = false } = {}) {
  /** Get a single recipe by MealDB id via backend proxy */
  const url = new URL(buildBackendUrl(`/api/recipes/${mealId}`), window.location.origin);
  if (includeRaw) url.searchParams.set('include_raw', 'true');
  const res = await fetch(url.toString().replace(window.location.origin, ''));
  if (!res.ok) throw new Error(`Get recipe failed: ${res.status}`);
  return res.json(); // Recipe
}

/**
 * Supabase CRUD for recipes table.
 * RLS requires authenticated user; we set user_id from auth context on insert.
 */

// PUBLIC_INTERFACE
export async function listMyRecipes(userId) {
  /** List recipes saved by the current user. */
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// PUBLIC_INTERFACE
export async function saveRecipe({ userId, mealId, title, thumbnail_url, category, area, tags, source_url, notes = null, rating = null }) {
  /**
   * Save a recipe for the current user. Uses upsert on (user_id, meal_id) uniqueness.
   * tags can be string[] or null. rating must be 1..5 or null.
   */
  const payload = {
    user_id: userId,
    meal_id: mealId,
    title,
    thumbnail_url: thumbnail_url ?? null,
    category: category ?? null,
    area: area ?? null,
    tags: Array.isArray(tags) ? tags : null,
    source_url: source_url ?? null,
    notes: notes ?? null,
    rating: rating ?? null
  };

  const { data, error } = await supabase
    .from('recipes')
    .upsert(payload, { onConflict: 'user_id,meal_id' }) // relies on unique index
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
export async function updateRecipeById(id, updates) {
  /**
   * Update a recipe by UUID id (notes, rating, etc.) for the current user.
   * RLS ensures only owner's row can be updated.
   */
  const safe = {};
  const fields = ['title', 'thumbnail_url', 'category', 'area', 'tags', 'source_url', 'notes', 'rating'];
  fields.forEach((k) => {
    if (updates.hasOwnProperty(k)) safe[k] = updates[k];
  });
  const { data, error } = await supabase.from('recipes').update(safe).eq('id', id).select('*').single();
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
export async function deleteRecipeById(id) {
  /** Delete a saved recipe by UUID id for current user. */
  const { error } = await supabase.from('recipes').delete().eq('id', id);
  if (error) throw error;
  return true;
}
