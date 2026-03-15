import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Hash } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// ── Category badge colors ─────────────────────────────────────────────────
const categoryColor = {
  Navigation:   'text-blue-400   border-blue-400/30   bg-blue-400/10',
  Hero:         'text-purple-400 border-purple-400/30 bg-purple-400/10',
  Puzzles:      'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  'AI Services':'text-[#D4AF37]  border-[#D4AF37]/30  bg-[#D4AF37]/10',
  Tools:        'text-orange-400 border-orange-400/30 bg-orange-400/10',
  System:       'text-gray-400   border-gray-400/30   bg-gray-400/10',
  Contact:      'text-rose-400   border-rose-400/30   bg-rose-400/10',
};

// ── Quick suggestions ─────────────────────────────────────────────────────
const suggestions = [
  { label: 'Neural Networks', query: 'neural' },
  { label: 'ROI Calculator',  query: 'roi' },
  { label: 'Puzzles',         query: 'puzzle' },
  { label: 'Quantum',         query: 'quantum' },
  { label: 'Automation',      query: 'automation' },
  { label: 'Contact',         query: 'contact' },
];

const OPENAI_API_KEY = 'TU_OPENAI_API_KEY';

// ── Genera embedding de la query ──────────────────────────────────────────
async function getQueryEmbedding(text) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });
  const data = await response.json();
  return data.data[0].embedding;
}

// ── Búsqueda semántica en Supabase ────────────────────────────────────────
async function semanticSearch(query) {
  const embedding = await getQueryEmbedding(query);
  const { data, error } = await supabase.rpc('match_items', {
    query_embedding: embedding,
    match_count: 8,
  });
  if (error) {
    console.error('Search error:', error.message);
    return [];
  }
  return data;
}

// ── Main component ────────────────────────────────────────────────────────
const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery]       = useState('');
  const [results, setResults]   = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef  = useRef(null);
  const debounceRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery('');
      setResults([]);
      setActiveIdx(0);
    }
  }, [isOpen]);

  // Búsqueda con debounce
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setActiveIdx(0);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      const hits = await semanticSearch(query.trim());
      setResults(hits);
      setActiveIdx(0);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, results.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && results[activeIdx]) {
      window.location.hash = results[activeIdx].href;
      onClose();
    }
  }, [results, activeIdx, onClose]);

  useEffect(() => {
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const handleResultClick = (href) => {
    window.location.hash = href;
    onClose();
  };

  const handleSuggestion = (q) => {
    setQuery(q);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[#050505]/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="search-modal"
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,   scale: 1    }}
            exit={{   opacity: 0, y: -16,  scale: 0.97 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="fixed top-[10vh] left-1/2 -translate-x-1/2 z-[70] w-full max-w-2xl px-4"
          >
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/25 shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden">

              {/* Top gold line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

              {/* Input row */}
              <div className="flex items-center px-5 py-4 border-b border-[#D4AF37]/10">
                <Search className="w-5 h-5 text-[#D4AF37]/60 flex-shrink-0 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search anything on this site…"
                  className="flex-1 bg-transparent text-white placeholder-gray-600 font-['Inter'] text-base outline-none"
                />
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mr-2" />
                )}
                {query && !isLoading && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-gray-600 hover:text-[#D4AF37] transition-colors ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="ml-4 text-gray-600 hover:text-[#D4AF37] transition-colors font-['Inter'] text-xs border border-gray-700 px-2 py-1"
                >
                  ESC
                </button>
              </div>

              {/* Body */}
              <div className="max-h-[60vh] overflow-y-auto">

                {/* No query → suggestions */}
                {!query && (
                  <div className="px-5 py-5">
                    <p className="font-['Inter'] text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/40 mb-3">
                      Quick searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map(s => (
                        <button
                          key={s.query}
                          onClick={() => handleSuggestion(s.query)}
                          className="flex items-center gap-1.5 px-3 py-1.5 border border-[#D4AF37]/15 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 font-['Inter'] text-xs transition-all duration-200"
                        >
                          <Hash className="w-3 h-3" />
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Query too short */}
                {query.length === 1 && (
                  <div className="px-5 py-8 text-center">
                    <p className="font-['Inter'] text-gray-600 text-sm">Keep typing…</p>
                  </div>
                )}

                {/* Loading */}
                {isLoading && (
                  <div className="px-5 py-8 text-center">
                    <p className="font-['Inter'] text-gray-500 text-sm">Searching semantically…</p>
                  </div>
                )}

                {/* No results */}
                {!isLoading && query.length >= 2 && results.length === 0 && (
                  <div className="px-5 py-10 text-center">
                    <p className="font-['Playfair_Display'] text-gray-500 text-lg mb-1">No results found</p>
                    <p className="font-['Inter'] text-gray-600 text-sm">Try a different keyword</p>
                  </div>
                )}

                {/* Results list */}
                {!isLoading && results.length > 0 && (
                  <div className="py-2">
                    <p className="font-['Inter'] text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/40 px-5 pt-3 pb-2">
                      {results.length} result{results.length !== 1 ? 's' : ''}
                    </p>
                    {results.map((item, idx) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        onClick={() => handleResultClick(item.href)}
                        className={`w-full text-left px-5 py-4 flex items-start gap-4 transition-all duration-150 group border-l-2 ${
                          idx === activeIdx
                            ? 'bg-[#D4AF37]/8 border-[#D4AF37]'
                            : 'border-transparent hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/40'
                        }`}
                        style={idx === activeIdx ? { backgroundColor: 'rgba(212,175,55,0.06)' } : {}}
                        onMouseEnter={() => setActiveIdx(idx)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-['Playfair_Display'] text-white text-base font-medium">
                              {item.title}
                            </span>
                            <span className={`font-['Inter'] text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 border ${categoryColor[item.category] || categoryColor.System}`}>
                              {item.category}
                            </span>
                            {item.meta && (
                              <span className="font-['Inter'] text-[10px] text-gray-600">
                                {item.meta}
                              </span>
                            )}
                          </div>
                          <p className="font-['Inter'] text-gray-500 text-sm leading-relaxed truncate">
                            {item.description}
                          </p>
                          {/* Similarity score */}
                          <p className="font-['Inter'] text-[10px] text-[#D4AF37]/30 mt-1">
                            {Math.round(item.similarity * 100)}% match
                          </p>
                        </div>
                        <ArrowRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-all duration-200 ${
                          idx === activeIdx ? 'text-[#D4AF37] translate-x-1' : 'text-gray-700 group-hover:text-[#D4AF37]/60'
                        }`} />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-[#D4AF37]/10 flex items-center justify-between">
                <div className="flex items-center gap-4 font-['Inter'] text-[10px] text-gray-700">
                  <span className="flex items-center gap-1">
                    <kbd className="border border-gray-700 px-1.5 py-0.5 text-gray-600">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="border border-gray-700 px-1.5 py-0.5 text-gray-600">↵</kbd>
                    go
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="border border-gray-700 px-1.5 py-0.5 text-gray-600">esc</kbd>
                    close
                  </span>
                </div>
                <span className="font-['Inter'] text-[10px] text-[#D4AF37]/30 tracking-widest uppercase">
                  AI Semantic Search
                </span>
              </div>

              {/* Bottom gold line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;