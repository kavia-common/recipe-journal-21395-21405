import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * SearchBar triggers onSearch(query). Debounces handled by parent if needed.
 */
export default function SearchBar({ initial = '', onSearch, placeholder = 'Search recipes...' }) {
  const [q, setQ] = useState(initial);

  const submit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(q.trim());
  };

  return (
    <form onSubmit={submit} className="flex gap-2 w-full">
      <input
        className="input flex-1"
        type="text"
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button type="submit" className="btn bg-primary hover:bg-primary-700">Search</button>
    </form>
  );
}
