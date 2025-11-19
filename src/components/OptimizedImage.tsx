/**
 * Componente de imagen optimizada
 * Lazy loading, placeholder, srcset responsive, y fallback
 */

import { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // Si es true, carga inmediata sin lazy loading
  placeholder?: string; // URL de placeholder (imagen borrosa pequeña)
  srcSet?: string;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder,
  srcSet,
  sizes,
  objectFit = 'cover',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder || '');
  
  const [ref, isVisible] = useIntersectionObserver({
    freezeOnceVisible: true,
    rootMargin: '50px',
  });

  // Si es priority o está visible, cargar imagen real
  useEffect(() => {
    if (priority || isVisible) {
      setCurrentSrc(src);
    }
  }, [priority, isVisible, src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    setIsLoaded(false);
    onError?.();
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
      }}
    >
      {/* Placeholder mientras carga */}
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full blur-sm scale-110"
          style={{ objectFit }}
          aria-hidden="true"
        />
      )}

      {/* Skeleton loader si no hay placeholder */}
      {!isLoaded && !placeholder && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Imagen real */}
      {currentSrc && (
        <ImageWithFallback
          src={currentSrc}
          alt={alt}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
          srcSet={srcSet}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Mensaje de error */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500 p-4">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Error al cargar imagen</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Componente de imagen de fondo optimizada
 */
interface OptimizedBackgroundImageProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
  priority?: boolean;
}

export function OptimizedBackgroundImage({
  src,
  className = '',
  children,
  overlay = false,
  overlayOpacity = 0.3,
  priority = false,
}: OptimizedBackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  
  const [ref, isVisible] = useIntersectionObserver({
    freezeOnceVisible: true,
  });

  useEffect(() => {
    if (priority || isVisible) {
      setCurrentSrc(src);
    }
  }, [priority, isVisible, src]);

  useEffect(() => {
    if (!currentSrc) return;

    const img = new Image();
    img.src = currentSrc;
    img.onload = () => setIsLoaded(true);
  }, [currentSrc]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative ${className}`}
    >
      {/* Background image */}
      {isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{
            backgroundImage: `url(${currentSrc})`,
            opacity: isLoaded ? 1 : 0,
          }}
        />
      )}

      {/* Skeleton mientras carga */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      {/* Overlay opcional */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Contenido */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
