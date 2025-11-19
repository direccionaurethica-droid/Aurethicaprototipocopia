/**
 * MetallicButton - Botón con efecto metálico dorado premium
 * Para acciones principales con apariencia de oro pulido
 */

import { ReactNode, useState } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface MetallicButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export function MetallicButton({ 
  children, 
  size = 'md', 
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props 
}: MetallicButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #C9A24F 0%, #D4AF37 25%, #E8C878 50%, #D4AF37 75%, #C9A24F 100%)',
      color: '#1a1410',
      textShadow: '0 1px 2px rgba(255, 255, 255, 0.3)',
    },
    secondary: {
      background: 'transparent',
      color: '#D4AF37',
      border: '2px solid rgba(212, 175, 55, 0.4)',
    },
  };

  return (
    <motion.button
      {...props}
      className={`
        relative overflow-hidden rounded-xl font-semibold
        transition-all duration-300
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        ...variants[variant],
        backgroundSize: variant === 'primary' ? '200% auto' : undefined,
        boxShadow: variant === 'primary' 
          ? isHovered
            ? `
              0 1px 0 rgba(255, 255, 255, 0.6) inset,
              0 -1px 0 rgba(0, 0, 0, 0.2) inset,
              0 6px 12px rgba(201, 162, 79, 0.4),
              0 12px 24px rgba(212, 175, 55, 0.3),
              0 0 30px rgba(232, 200, 120, 0.25)
            `
            : `
              0 1px 0 rgba(255, 255, 255, 0.5) inset,
              0 -1px 0 rgba(0, 0, 0, 0.2) inset,
              0 4px 8px rgba(201, 162, 79, 0.3),
              0 8px 16px rgba(212, 175, 55, 0.2),
              0 0 20px rgba(232, 200, 120, 0.15)
            `
          : isHovered
            ? 'inset 0 0 20px rgba(212, 175, 55, 0.1)'
            : 'inset 0 0 20px rgba(212, 175, 55, 0.05)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        backgroundPosition: variant === 'primary' 
          ? isHovered ? ['0% center', '100% center'] : '0% center'
          : undefined,
      }}
      transition={{
        backgroundPosition: { duration: 0.3 },
      }}
    >
      {/* Brillo superior metálico - solo en primary */}
      {variant === 'primary' && (
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 opacity-30 pointer-events-none rounded-t-xl"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4), transparent)',
          }}
        />
      )}

      {/* Contenido del botón */}
      <span className="relative z-10 block text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
        {children}
      </span>

      {/* Rastro fucsia en hover */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none rounded-xl"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 45, 149, 0.15), transparent 70%)',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow externo en hover */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(255, 45, 149, 0.2)',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
