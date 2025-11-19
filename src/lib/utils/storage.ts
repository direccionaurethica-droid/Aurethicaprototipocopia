/**
 * Utilidades de almacenamiento local
 * LocalStorage y SessionStorage con tipado
 */

import { STORAGE_KEYS } from '../constants';

/**
 * Guardar en localStorage con manejo de errores
 */
export function setLocalStorage<T>(key: string, value: T): boolean {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

/**
 * Obtener de localStorage con tipado
 */
export function getLocalStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue || null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue || null;
  }
}

/**
 * Remover de localStorage
 */
export function removeLocalStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
}

/**
 * Limpiar todo el localStorage
 */
export function clearLocalStorage(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

/**
 * Verificar si localStorage está disponible
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Guardar en sessionStorage
 */
export function setSessionStorage<T>(key: string, value: T): boolean {
  try {
    const serialized = JSON.stringify(value);
    sessionStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
    return false;
  }
}

/**
 * Obtener de sessionStorage
 */
export function getSessionStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const item = sessionStorage.getItem(key);
    if (item === null) {
      return defaultValue || null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error('Error reading from sessionStorage:', error);
    return defaultValue || null;
  }
}

/**
 * Funciones específicas para los datos de Auréthica
 */

export const StorageAPI = {
  // Usuario
  saveUserData(data: any) {
    return setLocalStorage(STORAGE_KEYS.USER_DATA, data);
  },
  
  getUserData<T>(): T | null {
    return getLocalStorage<T>(STORAGE_KEYS.USER_DATA);
  },

  // Calibración de Gigi
  saveGigiCalibration(calibration: any) {
    return setLocalStorage(STORAGE_KEYS.GIGI_CALIBRATION, calibration);
  },

  getGigiCalibration<T>(): T | null {
    return getLocalStorage<T>(STORAGE_KEYS.GIGI_CALIBRATION);
  },

  // Tema
  saveThemePreference(theme: 'light' | 'dark') {
    return setLocalStorage(STORAGE_KEYS.THEME_PREFERENCE, theme);
  },

  getThemePreference(): 'light' | 'dark' | null {
    return getLocalStorage<'light' | 'dark'>(STORAGE_KEYS.THEME_PREFERENCE);
  },

  // Idioma
  saveLanguagePreference(lang: string) {
    return setLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE, lang);
  },

  getLanguagePreference(): string | null {
    return getLocalStorage<string>(STORAGE_KEYS.LANGUAGE_PREFERENCE);
  },

  // Onboarding completado
  markOnboardingComplete() {
    return setLocalStorage(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
  },

  isOnboardingComplete(): boolean {
    return getLocalStorage<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED) || false;
  },

  // Posts guardados
  saveBookmarkedPost(postId: string) {
    const bookmarks = this.getBookmarkedPosts();
    if (!bookmarks.includes(postId)) {
      bookmarks.push(postId);
      return setLocalStorage(STORAGE_KEYS.BOOKMARKED_POSTS, bookmarks);
    }
    return true;
  },

  removeBookmarkedPost(postId: string) {
    const bookmarks = this.getBookmarkedPosts();
    const filtered = bookmarks.filter(id => id !== postId);
    return setLocalStorage(STORAGE_KEYS.BOOKMARKED_POSTS, filtered);
  },

  getBookmarkedPosts(): string[] {
    return getLocalStorage<string[]>(STORAGE_KEYS.BOOKMARKED_POSTS) || [];
  },

  isPostBookmarked(postId: string): boolean {
    return this.getBookmarkedPosts().includes(postId);
  },

  // Limpiar todos los datos de Auréthica
  clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      removeLocalStorage(key);
    });
    return true;
  },
};

/**
 * Hook de localStorage con listener de cambios
 */
export function createStorageListener(
  key: string,
  callback: (newValue: any) => void
): () => void {
  const handler = (e: StorageEvent) => {
    if (e.key === key && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        callback(parsed);
      } catch {
        callback(e.newValue);
      }
    }
  };

  window.addEventListener('storage', handler);

  return () => {
    window.removeEventListener('storage', handler);
  };
}
