/**
 * Context de búsqueda
 * Gestiona búsqueda con debounce, filtros, historial
 */

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import type { BlogPost, PostCategory } from '../lib/types';
import { StorageAPI, setLocalStorage, getLocalStorage } from '../lib/utils/storage';

interface SearchResult {
  type: 'post' | 'tag' | 'author';
  item: any;
  relevance: number;
}

interface SearchContextValue {
  // Estado
  query: string;
  debouncedQuery: string;
  results: SearchResult[];
  isSearching: boolean;
  recentSearches: string[];
  filters: {
    category?: PostCategory;
    dateRange?: 'week' | 'month' | 'year';
    sortBy?: 'relevance' | 'date' | 'popular';
  };

  // Acciones
  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
  clearSearch: () => void;
  addToRecent: (query: string) => void;
  clearRecent: () => void;
  setFilters: (filters: any) => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

const RECENT_SEARCHES_KEY = 'aurethica_recent_searches';
const MAX_RECENT = 10;

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    return getLocalStorage<string[]>(RECENT_SEARCHES_KEY) || [];
  });
  const [filters, setFilters] = useState<any>({
    sortBy: 'relevance',
  });

  // Debounce para búsqueda automática
  const debouncedQuery = useDebounce(query, 300);

  // Función de búsqueda mock (luego conectar con API)
  const performSearch = useCallback(async (searchQuery: string): Promise<SearchResult[]> => {
    if (!searchQuery.trim()) return [];

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock: buscar en posts
    const mockResults: SearchResult[] = [];

    // Buscar posts que coincidan
    for (let i = 0; i < 20; i++) {
      const title = `Post de Belleza ${i + 1}`;
      if (title.toLowerCase().includes(searchQuery.toLowerCase())) {
        mockResults.push({
          type: 'post',
          item: {
            id: `post-${i}`,
            title,
            excerpt: 'Resultado de búsqueda relevante...',
            category: 'tutorial',
            imageUrl: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=300&fit=crop`,
          },
          relevance: 1,
        });
      }
    }

    // Ordenar por relevancia
    return mockResults.sort((a, b) => b.relevance - a.relevance);
  }, []);

  // Buscar cuando cambia debouncedQuery
  useEffect(() => {
    if (debouncedQuery.trim()) {
      search(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const setQuery = (newQuery: string) => {
    setQueryState(newQuery);
  };

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      const searchResults = await performSearch(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [performSearch]);

  const clearSearch = () => {
    setQueryState('');
    setResults([]);
  };

  const addToRecent = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setRecentSearches(prev => {
      // Remover duplicados y añadir al principio
      const filtered = prev.filter(q => q !== searchQuery);
      const updated = [searchQuery, ...filtered].slice(0, MAX_RECENT);
      
      // Guardar en localStorage
      setLocalStorage(RECENT_SEARCHES_KEY, updated);
      
      return updated;
    });
  }, []);

  const clearRecent = () => {
    setRecentSearches([]);
    setLocalStorage(RECENT_SEARCHES_KEY, []);
  };

  const value: SearchContextValue = {
    query,
    debouncedQuery,
    results,
    isSearching,
    recentSearches,
    filters,
    setQuery,
    search,
    clearSearch,
    addToRecent,
    clearRecent,
    setFilters,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

/**
 * Hook para usar búsqueda
 */
export function useSearch() {
  const context = useContext(SearchContext);
  
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  
  return context;
}
