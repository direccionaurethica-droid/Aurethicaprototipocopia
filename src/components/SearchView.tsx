/**
 * SearchView - Vista de búsqueda con contexto integrado
 * Usa SearchContext para gestión de estado
 */

import { motion } from 'motion/react';
import { Search, Sparkles, TrendingUp, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AurethicaSpinner } from './AurethicaSpinner';
import { useSearch } from '../contexts/SearchContext';
import { useTheme } from '../contexts/ThemeContext';
import { FloatingCard } from './Microinteractions';
import { formatCompactNumber } from '../lib/utils/helpers';

export function SearchView() {
  const {
    query,
    results,
    isSearching,
    recentSearches,
    setQuery,
    clearSearch,
    addToRecent,
    clearRecent,
  } = useSearch();

  const { isDark } = useTheme();

  const trendingTopics = [
    { id: 1, text: 'Balayage natural', count: 2300 },
    { id: 2, text: 'Bob moderno', count: 1800 },
    { id: 3, text: 'Flequillo cortina', count: 1500 },
    { id: 4, text: 'Coloración sin amoníaco', count: 1200 },
    { id: 5, text: 'Peinados para eventos', count: 980 },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addToRecent(query);
    }
  };

  const handleTopicClick = (topic: string) => {
    setQuery(topic);
    addToRecent(topic);
  };

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24 pb-24 lg:pb-8 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Card
              type="input"
              placeholder="Buscar estilos, tutoriales, productos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-12 py-6 bg-card border-border focus:border-accent rounded-full"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>
        </motion.div>

        {/* Estado de búsqueda */}
        <AnimatePresence mode="wait">
          {isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <AurethicaSpinner size="md" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resultados de búsqueda */}
        {results.length > 0 && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h3 className="text-foreground mb-4">
              Resultados ({results.length})
            </h3>
            <div className="space-y-4">
              {results.map((result) => (
                <FloatingCard key={result.item.id} className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex gap-4">
                    {result.item.imageUrl && (
                      <img
                        src={result.item.imageUrl}
                        alt={result.item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="text-foreground mb-1">{result.item.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {result.item.excerpt}
                      </p>
                      {result.item.category && (
                        <span className="inline-block mt-2 px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                          {result.item.category}
                        </span>
                      )}
                    </div>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* Trending Topics */}
        {!query && !isSearching && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h3 className="flex items-center gap-2 text-foreground mb-4">
                <TrendingUp className="w-5 h-5 text-accent" />
                Tendencias
              </h3>
              <div className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <motion.button
                    key={topic.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    onClick={() => handleTopicClick(topic.text)}
                    className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted rounded-lg transition-colors border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-sm text-accent">{index + 1}</span>
                      </div>
                      <span className="text-foreground">{topic.text}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatCompactNumber(topic.count)} posts
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center gap-2 text-foreground">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    Búsquedas recientes
                  </h3>
                  <button
                    onClick={clearRecent}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Limpiar
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + index * 0.05 }}
                      className="flex items-center justify-between p-3 bg-card hover:bg-muted rounded-lg transition-colors border border-border group"
                    >
                      <button
                        onClick={() => setQuery(search)}
                        className="flex-1 text-left text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        {search}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Remove individual search
                          const newSearches = recentSearches.filter((_, i) => i !== index);
                          // Aquí necesitaríamos agregar un método al contexto
                        }}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Empty state */}
        {query && results.length === 0 && !isSearching && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-foreground mb-2">No se encontraron resultados</h3>
            <p className="text-muted-foreground max-w-md">
              Intenta con otros términos de búsqueda o explora las tendencias
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}