/**
 * Hook para precargar imágenes
 * Mejora la UX cargando imágenes antes de mostrarlas
 */

import { useState, useEffect } from 'react';

interface UseImagePreloadResult {
  loaded: boolean;
  error: boolean;
}

export function useImagePreload(src: string): UseImagePreloadResult {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setLoaded(false);
      setError(false);
      return;
    }

    const img = new Image();

    const handleLoad = () => {
      setLoaded(true);
      setError(false);
    };

    const handleError = () => {
      setLoaded(false);
      setError(true);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    img.src = src;

    // Si la imagen ya está en caché, se dispara inmediatamente
    if (img.complete) {
      handleLoad();
    }

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  return { loaded, error };
}

/**
 * Hook para precargar múltiples imágenes
 */
export function useImagesPreload(srcs: string[]): {
  loaded: boolean;
  progress: number;
} {
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (!srcs || srcs.length === 0) {
      setLoadedCount(0);
      return;
    }

    let mounted = true;
    let completed = 0;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        
        const handleComplete = () => {
          if (mounted) {
            completed++;
            setLoadedCount(completed);
          }
          resolve();
        };

        img.addEventListener('load', handleComplete);
        img.addEventListener('error', handleComplete); // Contar también errores
        img.src = src;

        if (img.complete) {
          handleComplete();
        }
      });
    };

    Promise.all(srcs.map(src => preloadImage(src)));

    return () => {
      mounted = false;
    };
  }, [srcs]);

  const loaded = srcs.length > 0 && loadedCount === srcs.length;
  const progress = srcs.length > 0 ? (loadedCount / srcs.length) * 100 : 0;

  return { loaded, progress };
}
