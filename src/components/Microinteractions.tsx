/**
 * Componentes de microinteracciones
 * Botones animados, efectos hover, feedback visual
 */

import { motion, AnimatePresence } from 'motion/react';
import { Heart, Bookmark, Share2, MessageCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';

/**
 * Botón de Like con animación
 */
interface LikeButtonProps {
  isLiked: boolean;
  count: number;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function LikeButton({ isLiked, count, onToggle, size = 'md' }: LikeButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggle();
    setTimeout(() => setIsAnimating(false), 600);
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`relative inline-flex items-center gap-2 ${sizeClasses[size]} rounded-full transition-colors`}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="relative"
        animate={isAnimating ? {
          scale: [1, 1.3, 1],
        } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          size={iconSizes[size]}
          className={`transition-colors ${
            isLiked ? 'fill-[#FF2D95] text-[#FF2D95]' : 'text-[#6E7276]'
          }`}
        />

        {/* Partículas al hacer like */}
        <AnimatePresence>
          {isAnimating && isLiked && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * Math.PI * 2) / 8) * 30,
                    y: Math.sin((i * Math.PI * 2) / 8) * 30,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#FF2D95' }}
                  />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 1 }}
          animate={{ scale: isAnimating ? [1, 1.2, 1] : 1 }}
          className="text-sm text-[#6E7276]"
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  );
}

/**
 * Botón de Bookmark con animación
 */
interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function BookmarkButton({ isBookmarked, onToggle, size = 'md' }: BookmarkButtonProps) {
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <motion.button
      onClick={onToggle}
      className="relative inline-flex items-center justify-center"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        animate={isBookmarked ? {
          rotate: [0, -10, 10, -10, 0],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <Bookmark
          size={iconSizes[size]}
          className={`transition-colors ${
            isBookmarked ? 'fill-[#C9A24F] text-[#C9A24F]' : 'text-[#6E7276]'
          }`}
        />
      </motion.div>
    </motion.button>
  );
}

/**
 * Botón de Share con efecto ripple
 */
interface ShareButtonProps {
  onShare: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function ShareButton({ onShare, size = 'md' }: ShareButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    onShare();
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <motion.button
      onClick={handleClick}
      className="relative inline-flex items-center justify-center overflow-hidden rounded-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Share2 size={iconSizes[size]} className="text-[#6E7276] z-10" />

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-[#C9A24F]"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 100, height: 100, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </motion.button>
  );
}

/**
 * Botón con efecto de brillo al hacer hover
 */
interface ShimmerButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
}

export function ShimmerButton({ children, onClick, variant = 'primary' }: ShimmerButtonProps) {
  const variants = {
    primary: 'bg-[#013220] text-white hover:shadow-[0_0_30px_rgba(1,50,32,0.4)]',
    secondary: 'bg-[#C9A24F] text-white hover:shadow-[0_0_30px_rgba(201,162,79,0.4)]',
    accent: 'bg-[#FF2D95] text-white hover:shadow-[0_0_30px_rgba(255,45,149,0.4)]',
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden px-8 py-4 rounded-full transition-all duration-300 ${variants[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          translateX: ['100%', '-100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: 'linear',
        }}
      />
    </motion.button>
  );
}

/**
 * Badge animado con pulso
 */
interface PulseBadgeProps {
  children: React.ReactNode;
  color?: string;
}

export function PulseBadge({ children, color = '#FF2D95' }: PulseBadgeProps) {
  return (
    <div className="relative inline-flex items-center gap-2">
      {/* Pulso */}
      <motion.div
        className="absolute -inset-1 rounded-full opacity-30"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Badge */}
      <div
        className="relative px-3 py-1 rounded-full text-sm text-white"
        style={{ backgroundColor: color }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Card con efecto de elevación al hover
 */
interface FloatingCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FloatingCard({ children, onClick, className = '' }: FloatingCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,45,149,0.1), rgba(201,162,79,0.1))',
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/**
 * Texto con efecto de escritura
 */
interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypewriterText({ text, speed = 50, className = '' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useState(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  });

  return <span className={className}>{displayText}</span>;
}

/**
 * Contador animado
 */
interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 1000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useState(() => {
    const start = 0;
    const end = value;
    const increment = (end - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  });

  return <motion.span>{count}</motion.span>;
}

/**
 * Icono con partículas sparkle
 */
export function SparkleIcon() {
  return (
    <div className="relative inline-block">
      <Sparkles className="w-5 h-5 text-[#C9A24F]" />
      
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#C9A24F]"
          style={{
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [0, Math.cos((i * Math.PI) / 2) * 20, 0],
            y: [0, Math.sin((i * Math.PI) / 2) * 20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
