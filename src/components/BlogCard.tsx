import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { GigiHairIconSimple } from './GigiHairIcon';

export interface BlogPost {
  id: string;
  author: string;
  avatar: string;
  images: string[];
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onAskGigi?: (postId: string) => void;
}

/**
 * BlogCard - Tarjeta de post estilo Instagram
 * Incluye: gestos táctiles, animaciones de feedback, estados interactivos
 * Accesibilidad: ARIA labels, keyboard navigation, contraste WCAG AA
 */
export function BlogCard({ post, onLike, onComment, onShare, onBookmark, onAskGigi }: BlogCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    if (newLikedState) {
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 1000);
    }
    
    onLike?.(post.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(post.id);
  };

  const handleDoubleTap = () => {
    if (!isLiked) {
      handleLike();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      role="article"
      aria-label={`Post de ${post.author}`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={post.avatar} 
            alt={`Avatar de ${post.author}`}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#C9A24F]/20"
          />
          <div>
            <h3 className="font-medium text-[#101418]">{post.author}</h3>
            <time className="text-sm text-[#6E7276]" dateTime={post.timestamp}>
              {post.timestamp}
            </time>
          </div>
        </div>
        
        <button
          className="p-2 hover:bg-[#F5F2E9] rounded-full transition-colors"
          aria-label="Más opciones"
        >
          <MoreHorizontal className="w-5 h-5 text-[#6E7276]" />
        </button>
      </div>

      {/* Carrusel de imágenes */}
      <div 
        className="relative aspect-square bg-[#F5F2E9] overflow-hidden cursor-pointer"
        onDoubleClick={handleDoubleTap}
        role="button"
        tabIndex={0}
        aria-label="Doble toque para dar me gusta"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleDoubleTap();
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={post.images[currentImageIndex]}
            alt={`Imagen ${currentImageIndex + 1} de ${post.images.length} del post`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Animación de corazón al dar like */}
        <AnimatePresence>
          {showLikeAnimation && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-24 h-24 text-white fill-[#FF2D95]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicadores de carrusel */}
        {post.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" role="tablist">
            {post.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/50'
                }`}
                aria-label={`Ver imagen ${index + 1}`}
                role="tab"
                aria-selected={index === currentImageIndex}
              />
            ))}
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="p-4 space-y-3">
        {/* Iconos de acción */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <motion.button
              onClick={handleLike}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D95] rounded-full p-1"
              whileTap={{ scale: 0.9 }}
              aria-label={isLiked ? 'Quitar me gusta' : 'Me gusta'}
              aria-pressed={isLiked}
            >
              <Heart 
                className={`w-6 h-6 transition-colors ${
                  isLiked 
                    ? 'fill-[#FF2D95] text-[#FF2D95]' 
                    : 'text-[#101418] group-hover:text-[#6E7276]'
                }`}
              />
            </motion.button>

            <motion.button
              onClick={() => onComment?.(post.id)}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#013220] rounded-full p-1"
              whileTap={{ scale: 0.9 }}
              aria-label={`${post.comments} comentarios`}
            >
              <MessageCircle className="w-6 h-6 text-[#101418] group-hover:text-[#6E7276] transition-colors" />
            </motion.button>

            <motion.button
              onClick={() => onShare?.(post.id)}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#013220] rounded-full p-1"
              whileTap={{ scale: 0.9 }}
              aria-label="Compartir"
            >
              <Share2 className="w-6 h-6 text-[#101418] group-hover:text-[#6E7276] transition-colors" />
            </motion.button>
          </div>

          <motion.button
            onClick={handleBookmark}
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24F] rounded-full p-1"
            whileTap={{ scale: 0.9 }}
            aria-label={isBookmarked ? 'Quitar de guardados' : 'Guardar'}
            aria-pressed={isBookmarked}
          >
            <Bookmark 
              className={`w-6 h-6 transition-colors ${
                isBookmarked 
                  ? 'fill-[#C9A24F] text-[#C9A24F]' 
                  : 'text-[#101418] group-hover:text-[#6E7276]'
              }`}
            />
          </motion.button>
        </div>

        {/* Likes */}
        {likesCount > 0 && (
          <p className="font-medium text-[#101418]">
            {likesCount.toLocaleString('es-ES')} {likesCount === 1 ? 'me gusta' : 'me gusta'}
          </p>
        )}

        {/* Caption */}
        {post.caption && (
          <p className="text-[#101418]">
            <span className="font-medium mr-2">{post.author}</span>
            <span className="text-[#6E7276]">{post.caption}</span>
          </p>
        )}

        {/* Ver comentarios */}
        {post.comments > 0 && (
          <button
            onClick={() => onComment?.(post.id)}
            className="text-[#6E7276] hover:text-[#101418] transition-colors text-sm focus:outline-none focus-visible:underline"
          >
            Ver los {post.comments} comentarios
          </button>
        )}

        {/* Botón Preguntar a Gigi - Estilo cromado premium dorado */}
        <motion.button
          onClick={() => onAskGigi?.(post.id)}
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
      </div>
    </motion.article>
  );
}
