/**
 * Context del Blog
 * Gestiona posts, infinite scroll, likes, bookmarks
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { BlogPost, PostCategory } from '../lib/types';
import { StorageAPI } from '../lib/utils/storage';

interface BlogContextValue {
  // Estado
  posts: BlogPost[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  selectedCategory: PostCategory | 'all';
  
  // Acciones
  loadMorePosts: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  toggleLike: (postId: string) => void;
  toggleBookmark: (postId: string) => void;
  setSelectedCategory: (category: PostCategory | 'all') => void;
  getPostById: (id: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextValue | undefined>(undefined);

interface BlogProviderProps {
  children: ReactNode;
  initialPosts?: BlogPost[];
}

// Mock data generator (luego conectar con API real)
function generateMockPosts(page: number, limit: number): BlogPost[] {
  const categories: PostCategory[] = ['tutorial', 'tendencias', 'cuidado', 'estilo'];
  const posts: BlogPost[] = [];

  for (let i = 0; i < limit; i++) {
    const index = (page - 1) * limit + i;
    posts.push({
      id: `post-${index}`,
      title: `Post de Belleza ${index + 1}`,
      author: `Autor ${(index % 5) + 1}`,
      date: new Date(Date.now() - index * 86400000).toISOString(),
      excerpt: 'Descubre los secretos de belleza más exclusivos con consejos personalizados de expertos.',
      category: categories[index % categories.length],
      imageUrl: `https://images.unsplash.com/photo-${1500000000000 + index}?w=800&h=600&fit=crop`,
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      isLiked: false,
      isBookmarked: false,
      tags: ['belleza', 'estilo', 'cuidado'],
    });
  }

  return posts;
}

export function BlogProvider({ children, initialPosts = [] }: BlogProviderProps) {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    if (initialPosts.length > 0) return initialPosts;
    // Cargar posts iniciales
    return generateMockPosts(1, 10);
  });
  
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | 'all'>('all');

  // Cargar más posts (infinite scroll)
  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const nextPage = page + 1;
    const newPosts = generateMockPosts(nextPage, 10);

    // Aplicar likes y bookmarks guardados
    const bookmarkedIds = StorageAPI.getBookmarkedPosts();
    const enrichedPosts = newPosts.map(post => ({
      ...post,
      isBookmarked: bookmarkedIds.includes(post.id),
    }));

    setPosts(prev => [...prev, ...enrichedPosts]);
    setPage(nextPage);
    setLoading(false);

    // Simular fin de posts
    if (nextPage >= 5) {
      setHasMore(false);
    }
  }, [loading, hasMore, page]);

  // Refrescar posts (pull to refresh)
  const refreshPosts = useCallback(async () => {
    setLoading(true);
    setPage(1);
    setHasMore(true);

    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const freshPosts = generateMockPosts(1, 10);
    const bookmarkedIds = StorageAPI.getBookmarkedPosts();
    
    const enrichedPosts = freshPosts.map(post => ({
      ...post,
      isBookmarked: bookmarkedIds.includes(post.id),
    }));

    setPosts(enrichedPosts);
    setLoading(false);
  }, []);

  // Toggle like
  const toggleLike = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newIsLiked = !post.isLiked;
        return {
          ...post,
          isLiked: newIsLiked,
          likes: post.likes + (newIsLiked ? 1 : -1),
        };
      }
      return post;
    }));
  }, []);

  // Toggle bookmark
  const toggleBookmark = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newIsBookmarked = !post.isBookmarked;
        
        // Guardar en storage
        if (newIsBookmarked) {
          StorageAPI.saveBookmarkedPost(postId);
        } else {
          StorageAPI.removeBookmarkedPost(postId);
        }
        
        return {
          ...post,
          isBookmarked: newIsBookmarked,
        };
      }
      return post;
    }));
  }, []);

  // Obtener post por ID
  const getPostById = useCallback((id: string) => {
    return posts.find(post => post.id === id);
  }, [posts]);

  const value: BlogContextValue = {
    posts: selectedCategory === 'all' 
      ? posts 
      : posts.filter(p => p.category === selectedCategory),
    loading,
    hasMore,
    page,
    selectedCategory,
    loadMorePosts,
    refreshPosts,
    toggleLike,
    toggleBookmark,
    setSelectedCategory,
    getPostById,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

/**
 * Hook para usar el blog
 */
export function useBlog() {
  const context = useContext(BlogContext);
  
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  
  return context;
}
