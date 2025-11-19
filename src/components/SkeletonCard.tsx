import { motion } from 'motion/react';

interface SkeletonCardProps {
  variant?: 'feed' | 'profile' | 'search';
}

/**
 * SkeletonCard - Placeholder animado para estados de carga
 * Mantiene la estructura visual mientras se cargan los datos reales
 * Mejora la percepción de rendimiento
 */
export function SkeletonCard({ variant = 'feed' }: SkeletonCardProps) {
  
  if (variant === 'feed') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl overflow-hidden shadow-md"
        role="status"
        aria-label="Cargando contenido..."
      >
        {/* Header del post */}
        <div className="p-4 flex items-center gap-3">
          {/* Avatar skeleton */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] animate-pulse" />
          <div className="flex-1">
            {/* Nombre skeleton */}
            <div className="h-4 bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] rounded-full w-32 mb-2 animate-pulse" />
            {/* Fecha skeleton */}
            <div className="h-3 bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] rounded-full w-20 animate-pulse" />
          </div>
        </div>

        {/* Imagen skeleton */}
        <div className="w-full aspect-square bg-gradient-to-br from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
            aria-hidden="true"
          />
        </div>

        {/* Footer skeleton */}
        <div className="p-4 space-y-3">
          {/* Iconos de acción */}
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] animate-pulse" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] animate-pulse" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] animate-pulse" />
          </div>
          
          {/* Texto skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] rounded-full w-full animate-pulse" />
            <div className="h-3 bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] rounded-full w-3/4 animate-pulse" />
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'profile') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl p-6 space-y-4"
        role="status"
        aria-label="Cargando perfil..."
      >
        {/* Avatar grande */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] animate-pulse mx-auto" />
        
        {/* Nombre */}
        <div className="h-6 bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] rounded-full w-48 mx-auto animate-pulse" />
        
        {/* Bio */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] rounded-full w-full animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] rounded-full w-5/6 animate-pulse" />
        </div>
      </motion.div>
    );
  }

  // Search variant
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-4 p-4"
      role="status"
      aria-label="Buscando..."
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] animate-pulse flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] rounded-full w-2/3 animate-pulse" />
        <div className="h-3 bg-gradient-to-r from-[#F5F2E9] via-[#e8e5dc] to-[#F5F2E9] rounded-full w-1/2 animate-pulse" />
      </div>
    </motion.div>
  );
}
