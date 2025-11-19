/**
 * Constantes centralizadas de Auréthica
 * Configuración, valores estáticos y enums
 */

import type { AppConfig, ThemeConfig } from '../types';

// ============= CONFIGURACIÓN DE LA APP =============

export const APP_CONFIG: AppConfig = {
  apiBaseUrl: import.meta.env?.VITE_API_URL || '/api',
  cdnUrl: import.meta.env?.VITE_CDN_URL || '',
  maxImageSize: 5 * 1024 * 1024, // 5MB
  supportedImageFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  paginationLimit: 10,
  animationDuration: 300, // ms
};

// ============= CONFIGURACIÓN DE TEMA =============

export const THEME_CONFIG: ThemeConfig = {
  colors: {
    ivory: '#F5F2E9',
    emerald: '#013220',
    gold: '#C9A24F',
    ink: '#101418',
    stone: '#6E7276',
    gigi: '#FF2D95',
  },
  fonts: {
    display: 'Playfair Display',
    body: 'Montserrat',
    handwriting: ['Kalam', 'Caveat', 'Dancing Script'],
  },
};

// ============= RUTAS Y NAVEGACIÓN =============

export const ROUTES = {
  HOME: '/',
  ONBOARDING: {
    HERO: '#hero-section',
    REGISTRATION: '#registration-section',
    HOW_IT_WORKS: '#how-it-works',
    GIGI: '#gigi-intro',
    TEST: '#aurethica-test',
    AVATAR: '#avatar-upload',
  },
  APP: {
    BLOG: '/app/blog',
    PROFILE: '/app/profile',
    SEARCH: '/app/search',
  },
} as const;

// ============= SECCIONES DE ONBOARDING =============

export const ONBOARDING_SECTIONS = [
  'hero-section',
  'registration-section',
  'how-it-works',
  'gigi-intro',
  'aurethica-test',
  'blog-section',
] as const;

// ============= CALIBRACIÓN DE GIGI =============

export const CALIBRATION_QUESTIONS = [
  {
    id: 'confianza',
    title: 'Confianza',
    description: '¿Cómo te sientes con tu estilo actual?',
  },
  {
    id: 'cambio',
    title: 'Cambio',
    description: '¿Qué tan dispuesta estás a experimentar?',
  },
  {
    id: 'seguridad',
    title: 'Seguridad',
    description: '¿Prefieres seguir tendencias o tu propio camino?',
  },
  {
    id: 'expresion',
    title: 'Expresión',
    description: '¿Cómo te gusta expresarte?',
  },
  {
    id: 'confirmacion',
    title: 'Confirmación',
    description: '¿Necesitas validación externa?',
  },
] as const;

export const CALIBRATION_OPTIONS = {
  neutro: {
    label: 'Neutro',
    description: 'Prefiero mantener el equilibrio',
    icon: '⚪',
  },
  suave: {
    label: 'Suave',
    description: 'Me gusta la sutileza',
    icon: '🌸',
  },
  equilibrado: {
    label: 'Equilibrado',
    description: 'Busco el balance perfecto',
    icon: '⚖️',
  },
  firme: {
    label: 'Firme',
    description: 'Tengo las cosas claras',
    icon: '💪',
  },
  intimo: {
    label: 'Íntimo',
    description: 'Prefiero lo personal',
    icon: '💝',
  },
} as const;

// ============= CONFIGURACIÓN DE IMÁGENES =============

export const IMAGE_CONFIG = {
  QUALITY: {
    thumbnail: 30,
    preview: 60,
    full: 85,
  },
  SIZES: {
    thumbnail: { width: 150, height: 150 },
    small: { width: 400, height: 400 },
    medium: { width: 800, height: 800 },
    large: { width: 1200, height: 1200 },
    hero: { width: 1920, height: 1080 },
  },
  LAZY_LOAD: {
    rootMargin: '50px',
    threshold: 0.01,
  },
} as const;

// ============= CONFIGURACIÓN DE ANIMACIONES =============

export const ANIMATION_CONFIG = {
  DURATIONS: {
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 1000,
  },
  EASINGS: {
    easeInOut: [0.43, 0.13, 0.23, 0.96],
    easeOut: [0.16, 1, 0.3, 1],
    easeIn: [0.9, 0, 1, 0.4],
    spring: [0.68, -0.55, 0.265, 1.55],
  },
  TRANSITIONS: {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },
  },
} as const;

// ============= CATEGORÍAS DE BLOG =============

export const BLOG_CATEGORIES = {
  tutorial: {
    label: 'Tutorial',
    color: THEME_CONFIG.colors.emerald,
    icon: '📚',
  },
  tendencias: {
    label: 'Tendencias',
    color: THEME_CONFIG.colors.gigi,
    icon: '✨',
  },
  cuidado: {
    label: 'Cuidado',
    color: THEME_CONFIG.colors.gold,
    icon: '💆‍♀️',
  },
  estilo: {
    label: 'Estilo',
    color: THEME_CONFIG.colors.ink,
    icon: '💅',
  },
} as const;

// ============= MENSAJES DEL SISTEMA =============

export const SYSTEM_MESSAGES = {
  LOADING: {
    default: 'Cargando...',
    registration: 'Preparando tu experiencia...',
    avatar: 'Generando tu avatar...',
    test: 'Analizando tus respuestas...',
    transition: 'Un momento...',
  },
  ERROR: {
    generic: 'Algo salió mal. Por favor, intenta de nuevo.',
    network: 'Error de conexión. Verifica tu internet.',
    validation: 'Por favor, completa todos los campos requeridos.',
    upload: 'Error al subir archivos. Verifica el formato y tamaño.',
  },
  SUCCESS: {
    registration: '¡Registro completado!',
    avatar: '¡Avatar generado con éxito!',
    test: '¡Test completado!',
    saved: 'Guardado correctamente',
  },
} as const;

// ============= LÍMITES Y VALIDACIONES =============

export const VALIDATION_RULES = {
  NAME: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  },
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    pattern: /^[+]?[\d\s()-]+$/,
    minLength: 9,
    maxLength: 15,
  },
  AVATAR: {
    minPhotos: 10,
    maxPhotos: 10,
    maxFileSize: APP_CONFIG.maxImageSize,
    acceptedFormats: APP_CONFIG.supportedImageFormats,
  },
} as const;

// ============= CONFIGURACIÓN DE PERFORMANCE =============

export const PERFORMANCE_CONFIG = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  INFINITE_SCROLL_THRESHOLD: 0.8, // 80% scroll
  IMAGE_PRELOAD_COUNT: 3,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
} as const;

// ============= BREAKPOINTS RESPONSIVE =============

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
} as const;

// ============= KEYS DE LOCAL STORAGE =============

export const STORAGE_KEYS = {
  USER_DATA: 'aurethica_user_data',
  GIGI_CALIBRATION: 'aurethica_gigi_calibration',
  THEME_PREFERENCE: 'aurethica_theme',
  LANGUAGE_PREFERENCE: 'aurethica_language',
  ONBOARDING_COMPLETED: 'aurethica_onboarding_completed',
  BOOKMARKED_POSTS: 'aurethica_bookmarked_posts',
} as const;

// ============= EVENTOS DE ANALYTICS =============

export const ANALYTICS_EVENTS = {
  ONBOARDING: {
    STARTED: 'onboarding_started',
    COMPLETED: 'onboarding_completed',
    STEP_COMPLETED: 'onboarding_step_completed',
  },
  GIGI: {
    CALIBRATION_STARTED: 'gigi_calibration_started',
    CALIBRATION_COMPLETED: 'gigi_calibration_completed',
    INTERACTION: 'gigi_interaction',
  },
  BLOG: {
    POST_VIEWED: 'blog_post_viewed',
    POST_LIKED: 'blog_post_liked',
    POST_BOOKMARKED: 'blog_post_bookmarked',
    POST_SHARED: 'blog_post_shared',
    COMMENT_ADDED: 'blog_comment_added',
  },
  USER: {
    PROFILE_VIEWED: 'user_profile_viewed',
    PROFILE_EDITED: 'user_profile_edited',
    SEARCH_PERFORMED: 'user_search_performed',
  },
} as const;

// ============= CONFIGURACIÓN DE i18n =============

export const SUPPORTED_LANGUAGES = {
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
  },
  ca: {
    code: 'ca',
    name: 'Català',
    flag: '🏴',
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
  },
} as const;

export const DEFAULT_LANGUAGE = 'es';
