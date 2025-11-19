/**
 * Sistema de tipos centralizado para Auréthica
 * Todos los tipos e interfaces de la aplicación
 */

// ============= TIPOS BASE =============

export type CalibrationOption = 
  | "neutro"
  | "suave"
  | "equilibrado"
  | "firme"
  | "intimo";

export type GigiTone = "Íntimo" | "Firme" | "Equilibrado" | "No definido";

export type AppMode = 'onboarding' | 'app';

export type OnboardingStep = 'hero' | 'registration' | 'gigi' | 'test' | 'avatar';

export type AppView = 'blog' | 'profile' | 'search';

export type PostCategory = 'tutorial' | 'tendencias' | 'cuidado' | 'estilo';

// ============= TIPOS DE ROLES DE USUARIO =============

export type UserRole = 'usuaria' | 'estilista' | 'empresa';

export type SalonPermissionLevel = 'completo' | 'limitado' | 'restringido';

// ============= INTERFACES DE DATOS =============

export interface CalibrationSelection {
  confianza: CalibrationOption | null;
  cambio: CalibrationOption | null;
  seguridad: CalibrationOption | null;
  expresion: CalibrationOption | null;
  confirmacion: CalibrationOption | null;
}

export interface RegistrationData {
  nombre: string;
  apellido?: string;
  email: string;
  telefono: string;
  userRole?: UserRole;
  salonName?: string;
  aceptaTerminos?: boolean;
  aceptaNewsletter?: boolean;
}

export interface BeautyProfile {
  estilo: string;
  colorimetria: string;
  preferencias: string[];
}

// ============= INTERFACES ESPECÍFICAS POR ROL =============

export interface SalonData {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  affiliatedClients: number;
  activeStylists: number;
  servicesOffered: string[];
  openingHours: {
    [key: string]: { open: string; close: string };
  };
}

export interface StylistData {
  id: string;
  name: string;
  level: 'junior' | 'senior' | 'master';
  specialties: string[];
  salonId: string;
  salonName: string;
  rating: number;
  completedServices: number;
  certifications: string[];
}

export interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  affiliatedSalonId?: string;
  affiliatedSalonName?: string;
  preferredStylistId?: string;
  preferredStylistName?: string;
  lastVisit?: string;
  nextAppointment?: string;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  avatarUrl?: string;
  gigiTone: GigiTone;
  beautyProfile: BeautyProfile;
  userRole: UserRole;
  salonName?: string;
  salonId?: string;
  stylistLevel?: 'junior' | 'senior' | 'master';
  permissions?: SalonPermissionLevel;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  category: PostCategory;
  imageUrl: string;
  images?: string[]; // Para carruseles
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  tags?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  authorAvatar?: string;
  content: string;
  date: string;
  likes: number;
}

// ============= INTERFACES DE COMPONENTES =============

export interface NavigationProps {
  showTest?: boolean;
  onSectionToggle?: (sectionId: string, isOpen: boolean) => void;
  openSections?: string[];
  currentView?: AppView;
  onViewChange?: (view: AppView) => void;
}

export interface CalibrationProps {
  onComplete: (selections: CalibrationSelection) => void;
}

export interface TestProps {
  gigiPersonality: CalibrationSelection | null;
  onComplete: () => void;
}

export interface RegistrationProps {
  onComplete: (data: RegistrationData) => void;
}

export interface AvatarUploadProps {
  onComplete: (photos: File[]) => void;
}

export interface LoadingScreenProps {
  message?: string;
}

// ============= TIPOS DE CONFIGURACIÓN =============

export interface AppConfig {
  apiBaseUrl: string;
  cdnUrl: string;
  maxImageSize: number;
  supportedImageFormats: string[];
  paginationLimit: number;
  animationDuration: number;
}

export interface ThemeConfig {
  colors: {
    ivory: string;
    emerald: string;
    gold: string;
    ink: string;
    stone: string;
    gigi: string;
  };
  fonts: {
    display: string;
    body: string;
    handwriting: string[];
  };
}

// ============= TIPOS DE ESTADO =============

export interface AppState {
  appMode: AppMode;
  onboardingStep: OnboardingStep;
  gigiCalibration: CalibrationSelection | null;
  registrationData: RegistrationData | null;
  avatarPhotos: File[];
  isLoading: boolean;
  loadingMessage: string;
  appView: AppView;
  showTest: boolean;
  openSections: string[];
}

// ============= TIPOS DE API =============

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============= TIPOS DE EVENTOS =============

export interface ScrollEvent {
  direction: 'up' | 'down';
  position: number;
  scrollPercent: number;
}

export interface InteractionEvent {
  type: 'like' | 'bookmark' | 'share' | 'comment';
  targetId: string;
  timestamp: number;
}

// ============= TIPOS DE ANÁLISIS =============

export interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
  userId?: string;
  timestamp: number;
}

export interface UserBehavior {
  scrollDepth: number;
  timeOnPage: number;
  interactions: InteractionEvent[];
  deviceType: 'mobile' | 'tablet' | 'desktop';
}
