/**
 * Hook para detectar dirección de scroll
 * Útil para mostrar/ocultar navegación
 */

import { useState, useEffect } from 'react';
import { throttle } from '../lib/utils/performance';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection(threshold: number = 10): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = throttle(() => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      // Solo actualizar si hay cambio significativo
      if (Math.abs(scrollY - lastScrollY) > threshold) {
        setScrollDirection(direction);
      }
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
    }, 100);

    window.addEventListener('scroll', updateScrollDirection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [threshold]);

  return scrollDirection;
}

/**
 * Hook para detectar si se ha scrolleado más allá de cierto punto
 */
export function useScrollPast(threshold: number = 100): boolean {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const updateScrollPast = throttle(() => {
      setIsPast(window.scrollY > threshold);
    }, 100);

    updateScrollPast(); // Check inicial

    window.addEventListener('scroll', updateScrollPast, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollPast);
    };
  }, [threshold]);

  return isPast;
}

/**
 * Hook para obtener posición de scroll
 */
export function useScrollPosition(): { x: number; y: number } {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = throttle(() => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    }, 100);

    window.addEventListener('scroll', updatePosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return scrollPosition;
}
