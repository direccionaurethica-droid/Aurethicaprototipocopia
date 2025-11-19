/**
 * Utilidades de optimización de performance
 * Debounce, throttle, lazy loading, memoization
 */

import { PERFORMANCE_CONFIG } from '../constants';

/**
 * Debounce: Retrasa la ejecución hasta que pasen X ms sin llamadas
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = PERFORMANCE_CONFIG.DEBOUNCE_DELAY
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Throttle: Limita la ejecución a una vez cada X ms
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number = PERFORMANCE_CONFIG.THROTTLE_DELAY
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * RequestAnimationFrame optimizado para animaciones
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    if (rafId !== null) return;
    
    rafId = requestAnimationFrame(() => {
      func.apply(this, args);
      rafId = null;
    });
  };
}

/**
 * Preload de imágenes
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload múltiple de imágenes
 */
export async function preloadImages(srcs: string[]): Promise<void> {
  await Promise.all(srcs.map(src => preloadImage(src)));
}

/**
 * Lazy loading con IntersectionObserver
 */
export function createLazyLoader(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.01,
  };

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry);
        }
      });
    },
    { ...defaultOptions, ...options }
  );
}

/**
 * Detectar si el usuario tiene preferencia por animaciones reducidas
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Obtener duración de animación ajustada según preferencias
 */
export function getAnimationDuration(baseDuration: number): number {
  return prefersReducedMotion() ? 0 : baseDuration;
}

/**
 * Memoización simple para funciones puras
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = keyGenerator 
      ? keyGenerator(...args)
      : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Detectar tipo de dispositivo
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Detectar si el dispositivo soporta touch
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Optimizar scroll performance
 */
export function optimizeScroll(
  element: HTMLElement,
  callback: () => void
): () => void {
  const throttledCallback = throttle(callback, 100);
  
  element.addEventListener('scroll', throttledCallback, { passive: true });
  
  return () => {
    element.removeEventListener('scroll', throttledCallback);
  };
}

/**
 * Detectar scroll hacia abajo o arriba
 */
export function createScrollDirectionDetector(
  callback: (direction: 'up' | 'down', position: number) => void
): () => void {
  let lastScroll = window.scrollY;
  
  const handleScroll = throttle(() => {
    const currentScroll = window.scrollY;
    const direction = currentScroll > lastScroll ? 'down' : 'up';
    
    callback(direction, currentScroll);
    lastScroll = currentScroll;
  }, 100);
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * Detectar cuando el usuario está cerca del final del scroll
 */
export function detectInfiniteScrollTrigger(
  callback: () => void,
  threshold: number = PERFORMANCE_CONFIG.INFINITE_SCROLL_THRESHOLD
): () => void {
  const handleScroll = throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
    
    if (scrollPercentage >= threshold) {
      callback();
    }
  }, 200);
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * Cache simple con expiración
 */
export class SimpleCache<T> {
  private cache = new Map<string, { value: T; expires: number }>();
  private defaultTTL: number;

  constructor(defaultTTL: number = PERFORMANCE_CONFIG.CACHE_DURATION) {
    this.defaultTTL = defaultTTL;
  }

  set(key: string, value: T, ttl?: number): void {
    const expires = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { value, expires });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  clearExpired(): void {
    const now = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key);
      }
    }
  }
}

/**
 * Batch de operaciones para reducir reflows
 */
export function batchDOMOperations(operations: (() => void)[]): void {
  requestAnimationFrame(() => {
    operations.forEach(op => op());
  });
}

/**
 * Optimizar imágenes con srcset
 */
export function generateSrcSet(
  baseUrl: string,
  widths: number[]
): string {
  return widths
    .map(width => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * Generar sizes attribute para responsive images
 */
export function generateSizes(
  breakpoints: Array<{ width: number; size: string }>
): string {
  return breakpoints
    .map(bp => `(max-width: ${bp.width}px) ${bp.size}`)
    .join(', ');
}
