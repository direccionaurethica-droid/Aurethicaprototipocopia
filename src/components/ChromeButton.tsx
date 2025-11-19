import { motion, HTMLMotionProps } from 'motion/react';
import { ReactNode } from 'react';
import { AurethicaSpinner } from './AurethicaSpinner';

interface ChromeButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gigi';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
}

/**
 * ChromeButton - Botón reutilizable con efecto cromado premium
 * Estados: normal, hover, active, disabled, loading
 * Variantes: primary (gradiente completo), secondary (outline), ghost (transparente)
 * Tamaños: sm, md, lg
 */
export function ChromeButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  ariaLabel,
  className = '',
  ...props 
}: ChromeButtonProps) {
  
  // Configuración de tamaños según sistema de espaciado 8px
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl min-h-[2.5rem]',  /* 40px */
    md: 'px-6 py-3 text-base rounded-2xl min-h-[3rem]', /* 48px */
    lg: 'px-8 py-4 text-lg rounded-2xl min-h-[3.5rem]'  /* 56px */
  };

  // Estilos base según variante
  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)',
      boxShadow: '0 4px 15px rgba(201, 162, 79, 0.4), 0 0 30px rgba(255, 45, 149, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
    },
    gigi: {
      background: 'linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)',
      boxShadow: '0 4px 20px rgba(201, 162, 79, 0.5), 0 0 40px rgba(255, 45, 149, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    },
    secondary: {
      background: 'transparent',
      border: '2px solid #013220',
      color: '#013220',
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      color: '#013220',
      boxShadow: 'none',
    }
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      className={`
        group relative overflow-hidden
        transition-all duration-500
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${variant === 'primary' || variant === 'gigi' ? 'text-[#013220]' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        ${className}
      `}
      style={variantStyles[variant]}
      disabled={isDisabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={isLoading}
      {...props}
    >
      {/* Capa de brillo cromado - solo en primary y gigi */}
      {(variant === 'primary' || variant === 'gigi') && !isDisabled && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: variant === 'gigi' 
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, transparent 50%, rgba(201, 162, 79, 0.4) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(201, 162, 79, 0.3) 100%)',
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Reflejo metálico animado - solo en primary y gigi */}
      {(variant === 'primary' || variant === 'gigi') && !isDisabled && (
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: variant === 'gigi' ? 2.5 : 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            background: variant === 'gigi'
              ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            opacity: variant === 'gigi' ? 0.4 : 1,
          }}
          aria-hidden="true"
        />
      )}

      {/* Contenido del botón */}
      <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
        {isLoading && (
          <AurethicaSpinner className="w-4 h-4" aria-hidden="true" />
        )}
        {children}
      </span>
    </motion.button>
  );
}