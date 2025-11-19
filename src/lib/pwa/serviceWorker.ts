/**
 * Service Worker registration y gestión
 * PWA - Capacidad offline y cache
 */

const CACHE_NAME = 'aurethica-v1';
const RUNTIME_CACHE = 'aurethica-runtime';

// Rutas que se cachearán inmediatamente
const PRECACHE_URLS = [
  '/',
  '/styles/globals.css',
  '/manifest.json',
];

/**
 * Registrar Service Worker
 */
export function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
          
          // Verificar actualizaciones periódicamente
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // Cada hora
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    });
  }
}

/**
 * Desregistrar Service Worker
 */
export function unregisterServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error('Error unregistering SW:', error);
      });
  }
}

/**
 * Verificar si hay actualizaciones del SW
 */
export function checkForUpdates(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.update();
    });
  }
}

/**
 * Limpiar caches antiguas
 */
export async function clearOldCaches(): Promise<void> {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
        .map((name) => caches.delete(name))
    );
  }
}

/**
 * Obtener tamaño total del cache
 */
export async function getCacheSize(): Promise<number> {
  if (!('caches' in window)) return 0;

  let totalSize = 0;
  const cacheNames = await caches.keys();

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();

    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }

  return totalSize;
}

/**
 * Formatear tamaño de cache
 */
export function formatCacheSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Detectar si la app está instalada como PWA
 */
export function isAppInstalled(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

/**
 * Detectar si el navegador soporta PWA
 */
export function canInstallApp(): boolean {
  return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
}

/**
 * Manejar evento de instalación de PWA
 */
let deferredPrompt: any = null;

export function setupInstallPrompt(): void {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
}

/**
 * Mostrar prompt de instalación
 */
export async function promptInstall(): Promise<boolean> {
  if (!deferredPrompt) {
    return false;
  }

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;

  return outcome === 'accepted';
}

/**
 * Verificar si hay una actualización disponible
 */
export function listenForUpdates(callback: () => void): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', callback);
  }
}

/**
 * Forzar actualización inmediata
 */
export function forceUpdate(): void {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
  }
  window.location.reload();
}
