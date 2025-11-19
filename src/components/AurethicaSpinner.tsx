/**
 * AurethicaSpinner - Logo animado de Auréthica usado como spinner
 * Reemplaza los spinners tradicionales con el branding de la marca
 * Incluye múltiples variantes para diferentes estados de carga
 */

import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import auréthicaLogoNeon from 'figma:asset/fed00b8fb99f1d60d734c20b6fc58a96b6148a96.png';

interface AurethicaSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isExiting?: boolean;
  variant?: 'spinner' | 'dots' | 'progress' | 'pulse' | 'skeleton';
  progress?: number; // Para variant="progress"
}

export function AurethicaSpinner({ 
  size = 'md', 
  className = '', 
  isExiting = false,
  variant = 'spinner',
  progress = 0
}: AurethicaSpinnerProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  // Detectar si se especifica un tamaño personalizado en className
  const isCustomSize = className.includes('w-') || className.includes('h-');
  const sizeClass = isCustomSize ? '' : sizes[size];

  // Logo base con efectos neon
  const LogoBase = ({ animate = true }: { animate?: boolean }) => (
    <motion.div
      animate={isExiting ? {
        scale: 3,
        opacity: 0,
        rotate: 360
      } : animate ? {
        rotate: 360,
        scale: [1, 1.3, 1]
      } : {}}
      transition={isExiting ? {
        duration: 0.6,
        ease: "easeInOut"
      } : animate ? {
        rotate: {
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        },
        scale: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      } : {}}
      className={`relative ${sizeClass}`}
    >
      <ImageWithFallback
        src={auréthicaLogoNeon}
        alt="Logo de Auréthica"
        className="w-full h-full object-contain"
        style={{
          mixBlendMode: 'screen',
          filter: 'brightness(1.25) saturate(1.2) drop-shadow(0 0 50px rgba(212, 175, 55, 0.4))',
          maskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Resplandor pulsante dorado */}
      <motion.div
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [0.9, 1.1, 0.9]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(212, 175, 55, 0.2) 50%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
    </motion.div>
  );

  // VARIANT: Spinner con rotación y pulsación (default)
  if (variant === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <LogoBase />
      </div>
    );
  }

  // VARIANT: Dots - Logo con 3 puntos orbitales pulsantes
  if (variant === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className={`relative ${sizeClass}`}>
          {/* Logo central estático */}
          <ImageWithFallback
            src={auréthicaLogoNeon}
            alt="Logo de Auréthica"
            className="w-full h-full object-contain"
            style={{
              mixBlendMode: 'screen',
              filter: 'brightness(1.25) saturate(1.2) drop-shadow(0 0 50px rgba(212, 175, 55, 0.4))',
              maskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
            }}
          />
          
          {/* 3 puntos orbitales */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.33
              }}
              style={{
                transformOrigin: '0 0'
              }}
            >
              <motion.div
                className="rounded-full"
                style={{
                  background: 'radial-gradient(circle, #D4AF37 0%, #FF2D95 100%)',
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
                  transform: `translate(${size === 'lg' ? '48px' : size === 'md' ? '32px' : '16px'}, 0)`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // VARIANT: Progress - Logo con círculo de progreso que se llena
  if (variant === 'progress') {
    const circumference = 2 * Math.PI * 44; // Radio del círculo
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="relative w-24 h-24">
          {/* SVG círculo de progreso */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            {/* Círculo de fondo */}
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="rgba(212, 175, 55, 0.15)"
              strokeWidth="3"
              fill="none"
            />
            {/* Círculo de progreso dorado con brillo */}
            <motion.circle
              cx="48"
              cy="48"
              r="44"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))'
              }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FF2D95" />
              </linearGradient>
            </defs>
          </svg>

          {/* Logo en el centro con pulsación suave */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-14 h-14 relative">
              <ImageWithFallback
                src={auréthicaLogoNeon}
                alt="Logo de Auréthica"
                className="w-full h-full object-contain"
                style={{
                  mixBlendMode: 'screen',
                  filter: 'brightness(1.25) saturate(1.2) drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))',
                  maskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
                }}
              />
            </div>
          </motion.div>

          {/* Partículas de luz que siguen el progreso */}
          {progress > 0 && (
            <motion.div
              className="absolute inset-0"
              style={{
                transform: `rotate(${(progress / 100) * 360 - 90}deg)`
              }}
            >
              <motion.div
                className="absolute top-0 left-1/2 w-2 h-2 -ml-1 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #FFD700 0%, #D4AF37 100%)',
                  boxShadow: '0 0 15px rgba(255, 215, 0, 0.9)',
                  transform: 'translateY(4px)'
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // VARIANT: Pulse - Logo con ondas expansivas de luz
  if (variant === 'pulse') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className={`relative ${sizeClass}`}>
          {/* Ondas expansivas */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: 'rgba(212, 175, 55, 0.4)',
              }}
              animate={{
                scale: [1, 2.5],
                opacity: [0.6, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: index * 0.6
              }}
            />
          ))}

          {/* Logo central con respiración */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <ImageWithFallback
              src={auréthicaLogoNeon}
              alt="Logo de Auréthica"
              className="w-full h-full object-contain"
              style={{
                mixBlendMode: 'screen',
                filter: 'brightness(1.25) saturate(1.2) drop-shadow(0 0 50px rgba(212, 175, 55, 0.4))',
                maskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
              }}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  // VARIANT: Skeleton - Logo con efecto shimmer/brillo deslizante
  if (variant === 'skeleton') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className={`relative ${sizeClass} overflow-hidden`}>
          {/* Logo con opacidad reducida */}
          <ImageWithFallback
            src={auréthicaLogoNeon}
            alt="Logo de Auréthica"
            className="w-full h-full object-contain opacity-30"
            style={{
              mixBlendMode: 'screen',
              filter: 'brightness(1.25) saturate(1.2) drop-shadow(0 0 30px rgba(212, 175, 55, 0.2))',
              maskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
            }}
          />

          {/* Efecto shimmer deslizante */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.4) 50%, transparent 100%)',
            }}
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <LogoBase />
    </div>
  );
}