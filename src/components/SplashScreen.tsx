/**
 * SplashScreen - Pantalla de carga premium
 * Primera impresión de la aplicación
 */

import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useEffect, useState } from 'react';
import { AurethicaSpinner } from './AurethicaSpinner';

interface SplashScreenProps {
  logo?: ReactNode;
  tagline?: string;
  progress?: number;
  minimumDuration?: number;
  onComplete?: () => void;
  variant?: 'default' | 'gradient' | 'minimal';
}

export function SplashScreen({
  logo,
  tagline = "Una belleza que ilumina sin excluir",
  progress = 0,
  minimumDuration = 2000,
  onComplete,
  variant = 'gradient'
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate progress if not provided
    if (progress === 0) {
      const interval = setInterval(() => {
        setCurrentProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setCurrentProgress(progress);
    }
  }, [progress]);

  useEffect(() => {
    if (currentProgress >= 100) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        // Esperar a que termine la animación de salida antes de ocultar
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 600); // Duración de la animación de salida
      }, minimumDuration);

      return () => clearTimeout(timer);
    }
  }, [currentProgress, minimumDuration, onComplete]);

  const renderLogo = () => {
    if (logo) return logo;
    
    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          type: 'spring',
          stiffness: 200,
          damping: 20
        }}
        className="mb-8"
      >
        <h1 
          className="text-6xl md:text-7xl text-[#013220] mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Auréthica
        </h1>
        <motion.div
          className="h-1 bg-gradient-to-r from-[#FF2D95] via-[#C9A24F] to-[#013220] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    );
  };

  const renderDefaultVariant = () => (
    <div className="fixed inset-0 z-[99999] bg-[#F5F2E9] flex flex-col items-center justify-center">
      {renderLogo()}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-[#6E7276] mb-12 max-w-md text-center px-6"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {tagline}
      </motion.p>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF2D95] to-[#C9A24F]"
          initial={{ width: '0%' }}
          animate={{ width: `${currentProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-[#6E7276] mt-4"
      >
        Cargando experiencia premium...
      </motion.p>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#FF2D95' : i % 3 === 1 ? '#C9A24F' : '#013220',
              opacity: 0.2
            }}
            animate={{
              y: [0, -100],
              opacity: [0.2, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );

  const renderGradientVariant = () => (
    <div className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 1.2, 
          type: 'spring',
          stiffness: 150,
          damping: 20
        }}
        className="relative mb-12"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, #D4AF37 0%, #FF2D95 50%, #D4AF37 100%)'
          }}
          animate={isExiting ? {
            scale: 3,
            opacity: 0
          } : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={isExiting ? {
            duration: 0.6,
            ease: 'easeInOut'
          } : {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        {/* Logo de Auréthica como spinner */}
        <AurethicaSpinner size="lg" isExiting={isExiting} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isExiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={isExiting ? { duration: 0.3 } : { delay: 0.6 }}
        className="text-xl text-[#D4AF37] mb-16 max-w-xl text-center px-6"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        {tagline}
      </motion.p>

      {/* Circular Progress */}
      <motion.div 
        className="relative w-24 h-24"
        animate={isExiting ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
        transition={isExiting ? { duration: 0.3 } : {}}
      >
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="44"
            stroke="rgba(212, 175, 55, 0.2)"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="48"
            cy="48"
            r="44"
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: currentProgress / 100 }}
            transition={{ duration: 0.3 }}
            style={{
              pathLength: currentProgress / 100,
              strokeDasharray: '0 1'
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#FF2D95" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-medium text-[#D4AF37]">
            {Math.round(currentProgress)}%
          </span>
        </div>
      </motion.div>
    </div>
  );

  const renderMinimalVariant = () => (
    <div className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-8">
          <motion.div
            className="w-3 h-3 rounded-full bg-[#FF2D95]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0
            }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-[#C9A24F]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.2
            }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-[#013220]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4
            }}
          />
        </div>

        <p className="text-sm text-gray-400">Cargando...</p>
      </motion.div>
    </div>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {variant === 'minimal' && renderMinimalVariant()}
          {variant === 'gradient' && renderGradientVariant()}
          {variant === 'default' && renderDefaultVariant()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}