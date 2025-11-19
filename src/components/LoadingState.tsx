/**
 * LoadingState - Estados de carga premium
 * Skeleton screens y spinners personalizados
 */

import { motion } from 'motion/react';
import { AurethicaSpinner } from './AurethicaSpinner';

interface LoadingStateProps {
  type?: 'skeleton' | 'spinner' | 'progress' | 'dots' | 'pulse';
  variant?: 'card' | 'list' | 'grid' | 'inline';
  count?: number;
  className?: string;
  message?: string;
}

export function LoadingState({
  type = 'skeleton',
  variant = 'card',
  count = 3,
  className = '',
  message
}: LoadingStateProps) {

  const renderSkeleton = () => {
    if (variant === 'card') {
      return (
        <div className={`space-y-4 ${className}`}>
          {[...Array(count)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                {/* Avatar skeleton */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                
                {/* Content skeleton */}
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-1/2" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    if (variant === 'list') {
      return (
        <div className={`space-y-2 ${className}`}>
          {[...Array(count)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-2/3" />
                <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-1/3" />
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    if (variant === 'grid') {
      return (
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
          {[...Array(count)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm"
            >
              <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
                <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-2/3" />
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    // Inline skeleton
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-1/3" />
        </div>
      </div>
    );
  };

  const renderSpinner = () => (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <AurethicaSpinner size="md" variant="spinner" />
      
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-[#6E7276] mt-4"
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  const renderProgress = () => (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <AurethicaSpinner variant="progress" progress={50} />
      
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-[#6E7276] mt-6"
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  const renderDots = () => (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <AurethicaSpinner size="md" variant="dots" />
      
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-[#6E7276] mt-4"
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  const renderPulse = () => (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <AurethicaSpinner size="lg" variant="pulse" />
      
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-sm text-[#6E7276]"
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  switch (type) {
    case 'spinner':
      return renderSpinner();
    case 'progress':
      return renderProgress();
    case 'dots':
      return renderDots();
    case 'pulse':
      return renderPulse();
    default:
      return renderSkeleton();
  }
}

// Componentes específicos pre-configurados
export const AppointmentsSkeleton = () => (
  <LoadingState type="skeleton" variant="card" count={3} />
);

export const BlogSkeleton = () => (
  <LoadingState type="skeleton" variant="grid" count={6} />
);

export const ListSkeleton = () => (
  <LoadingState type="skeleton" variant="list" count={5} />
);

export const PageLoader = ({ message }: { message?: string }) => (
  <LoadingState type="pulse" message={message || "Cargando..."} />
);

export const InlineLoader = () => (
  <LoadingState type="dots" variant="inline" />
);

// Skeletons específicos para vistas profesionales
export const ClientListSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-start gap-4">
          {/* Avatar skeleton */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF2D95]/20 via-gray-100 to-[#C9A24F]/20 animate-pulse" />
          
          {/* Content skeleton */}
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-1/3" />
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-1/2" />
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export const StylistListSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-start gap-4">
          {/* Avatar skeleton */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#013220]/20 via-gray-100 to-[#C9A24F]/20 animate-pulse" />
          
          {/* Content skeleton */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-1/4" />
              <div className="h-5 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex gap-2 mt-4">
              <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse" />
              <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse" />
              <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export const StatsSkeleton = () => (
  <div className="space-y-6">
    {/* Stats cards skeleton */}
    <div className="grid md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            <div className="h-8 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-2/3" />
        </motion.div>
      ))}
    </div>

    {/* Chart skeleton */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-1/4 mb-6" />
      <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
    </motion.div>
  </div>
);