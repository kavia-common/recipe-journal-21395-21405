import React, { useState } from 'react';
import { saveRecipe, deleteRecipeById, updateRecipeById } from '../utils/api';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Card to display recipe info. Supports:
 * - Save to journal (if not saved)
 * - Remove from journal (if saved)
 * - Edit notes/rating when saved
 *
 * Props:
 * - mode: 'discover' | 'saved'
 * - recipe: normalized recipe from backend OR saved row from Supabase
 * - savedMap: Map of meal_id -> saved row (for discover mode)
 * - onRefresh: callback to re-fetch parent list after save/update/delete
 */
export default function RecipeCard({ mode = 'discover', recipe, savedMap, onRefresh }) {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState(recipe?.notes ?? '');
  const [rating, setRating] = useState(recipe?.rating ?? '');

  const isSaved = mode === 'discover'
    ? !!savedMap?.get(recipe?.id)
    : true;

  const savedRow = mode === 'discover' ? savedMap?.get(recipe?.id) : recipe;

  const meal = {
    id: recipe?.id || savedRow?.meal_id,
    title: recipe?.title || savedRow?.title,
    category: recipe?.category || savedRow?.category,
    area: recipe?.area || savedRow?.area,
    thumbnail_url: recipe?.thumbnail_url || savedRow?.thumbnail_url,
    tags: recipe?.tags || savedRow?.tags,
    source_url: recipe?.source_url || savedRow?.source_url
  };

  const handleSave = async () => {
    if (!user) {
      window.location.assign('#/login');
      return;
    }
    try {
      await saveRecipe({
        userId: user.id,
        mealId: meal.id,
        title: meal.title,
        thumbnail_url: meal.thumbnail_url,
        category: meal.category,
        area: meal.area,
        tags: Array.isArray(meal.tags) ? meal.tags : [],
        source_url: meal.source_url
      });
      if (onRefresh) onRefresh();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Save failed', e);
      alert(`Save failed: ${e.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRecipeById(savedRow.id);
      if (onRefresh) onRefresh();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Delete failed', e);
      alert(`Delete failed: ${e.message}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const r = rating === '' ? null : Number(rating);
      if (r !== null && (isNaN(r) || r < 1 || r > 5)) {
        alert('Rating must be between 1 and 5');
        return;
      }
      await updateRecipeById(savedRow.id, { notes: notes || null, rating: r });
      setEditing(false);
      if (onRefresh) onRefresh();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Update failed', e);
      alert(`Update failed: ${e.message}`);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex gap-4 p-4">
        {meal.thumbnail_url && (
          <img
            src={meal.thumbnail_url}
            alt={meal.title}
            className="h-24 w-24 object-cover rounded-lg border border-[var(--border-color)]"
          />
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">{meal.title}</h3>
              <div className="text-sm text-gray-500">
                {[meal.category, meal.area].filter(Boolean).join(' • ')}
              </div>
              {Array.isArray(meal.tags) && meal.tags.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {meal.tags.map((t) => (
                    <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {mode === 'discover' && !isSaved && (
                <button className="btn bg-primary hover:bg-primary-700" onClick={handleSave}>
                  Save
                </button>
              )}
              {isSaved && (
                <button className="btn bg-error hover:bg-red-600" onClick={handleDelete}>
                  Remove
                </button>
              )}
              {meal.source_url && (
                <a className="btn bg-secondary hover:bg-amber-600" href={meal.source_url} target="_blank" rel="noreferrer">
                  Source
                </a>
              )}
            </div>
          </div>

          {isSaved && (
            <div className="mt-3">
              {!editing ? (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    {savedRow?.notes ? (
                      <>
                        <span className="font-semibold">Notes:</span> {savedRow.notes}
                      </>
                    ) : (
                      <span className="italic text-gray-500">No notes yet</span>
                    )}
                    {savedRow?.rating ? (
                      <span className="ml-3">
                        <span className="font-semibold">Rating:</span> {savedRow.rating}/5
                      </span>
                    ) : null}
                  </div>
                  <button className="btn bg-primary hover:bg-primary-700" onClick={() => {
                    setEditing(true);
                    setNotes(savedRow?.notes || '');
                    setRating(savedRow?.rating ?? '');
                  }}>
                    Edit
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="grid gap-2">
                  <label className="text-sm text-gray-600" htmlFor={`notes-${savedRow?.id || meal.id}`}>Notes</label>
                  <textarea
                    id={`notes-${savedRow?.id || meal.id}`}
                    className="input min-h-[80px]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <label className="text-sm text-gray-600" htmlFor={`rating-${savedRow?.id || meal.id}`}>Rating (1-5)</label>
                  <input
                    id={`rating-${savedRow?.id || meal.id}`}
                    className="input max-w-[120px]"
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="btn bg-primary hover:bg-primary-700">Save</button>
                    <button type="button" className="btn bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={() => setEditing(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
