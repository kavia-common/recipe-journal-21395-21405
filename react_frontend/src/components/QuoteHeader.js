import React, { useEffect, useState } from 'react';
import { fetchRandomQuote } from '../utils/api';

/**
 * PUBLIC_INTERFACE
 * Displays a random inspirational quote from the backend proxy.
 */
export default function QuoteHeader() {
  const [quote, setQuote] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const q = await fetchRandomQuote();
        if (!alive) return;
        setQuote(q);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Failed to load quote', e);
        if (alive) setErr('Could not load quote.');
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="w-full mb-6">
      <div className="card p-4 bg-gradient-to-r from-primary/10 to-background">
        <div className="text-sm text-primary font-semibold">Today’s Inspiration</div>
        <div className="mt-1 text-base text-text">
          {quote ? `“${quote.text}”` : err || '...'}
        </div>
        <div className="mt-1 text-sm text-gray-500">
          {quote?.author ? `— ${quote.author}` : null}
        </div>
      </div>
    </div>
  );
}
