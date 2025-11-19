/**
 * BlogSection - Feed estilo Instagram con infinite scroll
 * Integrado con BlogContext y microinteracciones
 * Mejoras: Skeleton loaders, accesibilidad WCAG AA, sistema de espaciado 8px
 */

import { useState } from 'react';
import { MoreHorizontal, ChevronLeft, ChevronRight, MapPin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GigiHairIconSimple, GigiHairIcon } from './GigiHairIcon';

// Contexts y hooks
import { useBlog } from '../contexts/BlogContext';
import { useTheme } from '../contexts/ThemeContext';

// Componentes
import { InfiniteScroll, ElegantLoader } from './InfiniteScroll';
import { 
  LikeButton, 
  BookmarkButton, 
  ShareButton,
  FloatingCard 
} from './Microinteractions';
import { SkeletonCard } from './SkeletonCard';
import { EmptyState } from './EmptyState';
import { GigiAdvisor } from './GigiAdvisor';

// Utils
import { formatRelativeTime, formatCompactNumber, copyToClipboard, shareContent, canShare } from '../lib/utils/helpers';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

/**
 * Componente de Post individual
 */
function InstagramPost({ post }: { post: any }) {
  const { toggleLike, toggleBookmark } = useBlog();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showGigiModal, setShowGigiModal] = useState(false);

  // Convertir media a formato esperado
  const media: MediaItem[] = post.images 
    ? post.images.map((url: string) => ({ type: 'image' as const, url, alt: post.title }))
    : [{ type: 'image' as const, url: post.imageUrl, alt: post.title }];

  const hasMultipleMedia = media.length > 1;

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    if (canShare()) {
      await shareContent(shareData);
    } else {
      await copyToClipboard(window.location.href);
      // Aquí podrías mostrar un toast
    }
  };

  // Truncar caption si es muy largo
  const caption = post.excerpt || post.title;
  const shouldTruncate = caption.length > 150;
  const displayCaption = showFullCaption || !shouldTruncate 
    ? caption 
    : caption.slice(0, 150) + '...';

  return (
    <FloatingCard className="bg-white dark:bg-card rounded-none border-b border-border">
      <article className="w-full max-w-[600px] mx-auto">
        {/* Header del post */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF2D95] via-[#C9A24F] to-[#013220] p-[2px]">
              <div className="w-full h-full rounded-full bg-white dark:bg-card flex items-center justify-center">
                <span className="text-sm">A</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm">{post.author}</span>
                <Check className="w-3 h-3 text-[#FF2D95]" />
              </div>
              {post.category && (
                <span className="text-xs text-muted-foreground">{post.category}</span>
              )}
            </div>
          </div>
          <button 
            className="p-2 hover:bg-muted rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#013220]"
            aria-label="Más opciones"
          >
            <MoreHorizontal className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Carrusel de imágenes */}
        <div className="relative aspect-square bg-muted">
          <motion.img
            key={currentMediaIndex}
            src={media[currentMediaIndex].url}
            alt={media[currentMediaIndex].alt || ''}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Navegación del carrusel */}
          {hasMultipleMedia && (
            <>
              <button
                onClick={prevMedia}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMedia}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1" role="tablist" aria-label="Indicadores de imagen">
                {media.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentMediaIndex
                        ? 'bg-white w-6'
                        : 'bg-white/50'
                    }`}
                    role="tab"
                    aria-selected={index === currentMediaIndex}
                    aria-label={`Imagen ${index + 1} de ${media.length}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Acciones del post */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <LikeButton
                isLiked={post.isLiked || false}
                count={post.likes}
                onToggle={() => toggleLike(post.id)}
                size="md"
              />
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {post.comments > 0 && (
                  <span className="text-sm">{formatCompactNumber(post.comments)}</span>
                )}
              </button>
              <ShareButton onShare={handleShare} size="md" />
            </div>
            <BookmarkButton
              isBookmarked={post.isBookmarked || false}
              onToggle={() => toggleBookmark(post.id)}
              size="md"
            />
          </div>

          {/* Likes */}
          {post.likes > 0 && (
            <div className="mb-2">
              <span className="text-sm">
                <strong>{formatCompactNumber(post.likes)}</strong> Me gusta
              </span>
            </div>
          )}

          {/* Caption */}
          <div className="text-sm mb-2">
            <span className="mr-2">
              <strong>{post.author}</strong>
            </span>
            <span className="text-foreground">
              {displayCaption}
            </span>
            {shouldTruncate && !showFullCaption && (
              <button
                onClick={() => setShowFullCaption(true)}
                className="text-muted-foreground ml-1 hover:text-foreground"
              >
                más
              </button>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {post.tags.map((tag: string, index: number) => (
                <span key={index} className="text-sm text-[#013220] dark:text-[#00ff88]">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Timestamp */}
          <div className="text-xs text-muted-foreground uppercase">
            {formatRelativeTime(post.date)}
          </div>

          {/* Botón Preguntar a Gigi - Estilo cromado premium dorado */}
          <motion.button
            onClick={() => setShowGigiModal(true)}
            className="group relative overflow-hidden w-full mt-4 px-4 py-3 rounded-2xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)',
              boxShadow: '0 4px 15px rgba(201, 162, 79, 0.4), 0 0 30px rgba(255, 45, 149, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            }}
            whileHover={{ boxShadow: '0 6px 20px rgba(201, 162, 79, 0.5), 0 0 40px rgba(255, 45, 149, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)' }}
            aria-label="Preguntar a Gigi sobre este estilo"
          >
            {/* Capa de brillo cromado */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, transparent 50%, rgba(255, 215, 0, 0.3) 100%)',
              }}
            />
            
            {/* Reflejo metálico animado */}
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                opacity: 0.4,
              }}
            />

            {/* Contenido del botón */}
            <div className="relative flex items-center justify-center gap-2 text-[#013220] font-medium">
              <GigiHairIconSimple size={20} color="#013220" className="drop-shadow-lg" />
              <span className="drop-shadow-lg tracking-wide">Preguntar a Gigi</span>
            </div>

            {/* Borde cromado */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.5), inset 0 -1px 2px rgba(0, 0, 0, 0.3)',
              }}
            />
          </motion.button>

          {/* Asesor de Gigi */}
          <AnimatePresence>
            {showGigiModal && (
              <GigiAdvisor
                postContext={{
                  id: post.id,
                  title: post.title,
                  category: post.category,
                  tags: post.tags
                }}
                userProfile={{
                  styleCategory: 'moda', // Esto vendría del contexto de usuario
                }}
                onClose={() => setShowGigiModal(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </article>
    </FloatingCard>
  );
}

/**
 * Filtro de categorías
 */
function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useBlog();
  
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'tutorial', label: 'Tutoriales' },
    { id: 'tendencias', label: 'Tendencias' },
    { id: 'cuidado', label: 'Cuidado' },
    { id: 'estilo', label: 'Estilo' },
  ];

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex gap-4 px-4 py-3 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#C9A24F] dark:bg-[#C9A24F] text-white dark:text-[#0f1114]'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * BlogSection Principal
 */
export function BlogSection() {
  const { posts, loading, hasMore, loadMorePosts } = useBlog();
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background border-b border-border">
        <div className="max-w-[600px] mx-auto px-4 py-4">
          <h1 className="text-center text-2xl" style={{ fontFamily: 'Playfair Display' }}>
            Auréthica
          </h1>
        </div>
      </header>

      {/* Filtros de categoría */}
      <CategoryFilter />

      {/* Feed de posts con infinite scroll */}
      <InfiniteScroll
        hasMore={hasMore}
        loading={loading}
        onLoadMore={loadMorePosts}
        loader={<ElegantLoader />}
        endMessage={
          <div className="text-center py-12" role="status" aria-live="polite">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C9A24F] to-transparent mx-auto mb-4" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              Has visto todo por hoy ✨
            </p>
          </div>
        }
      >
        <div className="space-y-0">
          {/* Skeleton loaders cuando está cargando y no hay posts */}
          {loading && posts.length === 0 && (
            <>
              <SkeletonCard variant="feed" />
              <SkeletonCard variant="feed" />
              <SkeletonCard variant="feed" />
            </>
          )}
          
          {/* Empty state si no hay posts después de cargar */}
          {!loading && posts.length === 0 && (
            <EmptyState
              icon={<Sparkles className="w-12 h-12" />}
              title="No hay contenido aún"
              description="Sé la primera en compartir contenido inspirador de belleza"
              variant="minimal"
            />
          )}
          
          {/* Posts reales */}
          {posts.map((post) => (
            <InstagramPost key={post.id} post={post} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
