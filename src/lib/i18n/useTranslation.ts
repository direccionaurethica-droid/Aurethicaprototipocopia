/**
 * Hook de traducción
 * Gestiona el idioma actual y proporciona función de traducción
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, Translations } from './translations';
import { DEFAULT_LANGUAGE } from '../constants';
import { StorageAPI } from '../utils/storage';

interface TranslationContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const TranslationContext = createContext<TranslationContextValue | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Intentar cargar idioma guardado
    const saved = StorageAPI.getLanguagePreference();
    if (saved && (saved === 'es' || saved === 'ca' || saved === 'en')) {
      return saved as Language;
    }
    
    // Detectar idioma del navegador
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es' || browserLang === 'ca' || browserLang === 'en') {
      return browserLang as Language;
    }
    
    return DEFAULT_LANGUAGE as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    StorageAPI.saveLanguagePreference(lang);
    // Actualizar atributo lang del documento
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    // Establecer idioma inicial en el documento
    document.documentElement.lang = language;
  }, [language]);

  const value: TranslationContextValue = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * Hook para usar traducciones
 */
export function useTranslation() {
  const context = useContext(TranslationContext);
  
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  return context;
}

/**
 * Componente HOC para agregar traducciones
 */
export function withTranslation<P extends object>(
  Component: React.ComponentType<P & { t: Translations; language: Language }>
) {
  return function TranslatedComponent(props: P) {
    const { t, language } = useTranslation();
    return <Component {...props} t={t} language={language} />;
  };
}
