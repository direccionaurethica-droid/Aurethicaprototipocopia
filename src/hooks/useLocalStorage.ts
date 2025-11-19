/**
 * Hook de localStorage
 * Sincroniza estado con localStorage automáticamente
 */

import { useState, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from '../lib/utils/storage';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State para almacenar nuestro valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getLocalStorage<T>(key);
    return item !== null ? item : initialValue;
  });

  // Función para actualizar el valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que value sea una función para tener la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      setLocalStorage(key, valueToStore);
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  // Escuchar cambios en otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          // Si no es JSON válido, ignorar
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
