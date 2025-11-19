/**
 * Componente de Infinite Scroll
 * Carga automática de contenido al hacer scroll
 */

import { ReactNode, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { AurethicaSpinner } from './AurethicaSpinner';

interface InfiniteScrollProps {
  children: ReactNode;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  loader?: ReactNode;
  endMessage?: ReactNode;
}

export function InfiniteScroll({
  children,
  hasMore,
  loading,
  onLoadMore,
  threshold = 0.8,
  loader,
  endMessage,
}: InfiniteScrollProps) {
  const [sentinelRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px',
  });

  const loadingRef = useRef(false);

  useEffect(() => {
    if (isVisible && hasMore && !loading && !loadingRef.current) {
      loadingRef.current = true;
      onLoadMore();
      
      // Reset después de un delay
      setTimeout(() => {
        loadingRef.current = false;
      }, 1000);
    }
  }, [isVisible, hasMore, loading, onLoadMore]);

  return (
    <div>
      {children}

      {/* Sentinel element para detectar cuando llegamos al final */}
      {hasMore && (
        <div
          ref={sentinelRef as React.RefObject<HTMLDivElement>}
          className="w-full py-8 flex items-center justify-center"
        >
          {loading && (
            loader || (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <AurethicaSpinner size="md" />
                <p className="text-sm text-[#6E7276]">Cargando más...</p>
              </motion.div>
            )
          )}
        </div>
      )}

      {/* Mensaje de fin */}
      {!hasMore && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full py-12 flex flex-col items-center gap-2"
        >
          {endMessage || (
            <>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C9A24F] to-transparent" />
              <p className="text-sm text-[#6E7276] mt-4">
                Has llegado al final
              </p>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}

/**
 * Loader personalizado elegante
 */
export function ElegantLoader() {
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <AurethicaSpinner size="md" variant="pulse" />
      
      {/* Text */}
      <motion.p
        className="text-sm text-[#6E7276]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Cargando contenido inspirador...
      </motion.p>
    </div>
  );
}

/**
 * Spinner circular elegante
 */
export function SpinnerLoader() {
  return <AurethicaSpinner size="lg" variant="spinner" />;
}