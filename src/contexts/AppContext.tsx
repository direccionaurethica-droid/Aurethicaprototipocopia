/**
 * Context principal de la aplicación
 * Gestiona el estado global del flujo de onboarding y navegación
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import type { 
  AppMode, 
  OnboardingStep, 
  AppView, 
  CalibrationSelection, 
  RegistrationData 
} from '../lib/types';
import { StorageAPI } from '../lib/utils/storage';

interface AppContextValue {
  // Estado de la app
  appMode: AppMode;
  onboardingStep: OnboardingStep;
  appView: AppView;
  isLoading: boolean;
  loadingMessage: string;
  showTest: boolean;
  openSections: string[];

  // Datos de usuario
  gigiCalibration: CalibrationSelection | null;
  registrationData: RegistrationData | null;
  avatarPhotos: File[];

  // Acciones
  setAppMode: (mode: AppMode) => void;
  setOnboardingStep: (step: OnboardingStep) => void;
  setAppView: (view: AppView) => void;
  setIsLoading: (loading: boolean, message?: string) => void;
  setShowTest: (show: boolean) => void;
  setOpenSections: (sections: string[]) => void;
  setGigiCalibration: (calibration: CalibrationSelection) => void;
  setRegistrationData: (data: RegistrationData) => void;
  setAvatarPhotos: (photos: File[]) => void;
  
  // Helpers
  toggleSection: (sectionId: string, isOpen: boolean) => void;
  completeOnboarding: () => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Estados principales
  const [appMode, setAppMode] = useState<AppMode>('onboarding');
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('hero');
  const [appView, setAppView] = useState<AppView>('blog');
  const [isLoading, setIsLoadingState] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Cargando...');
  const [showTest, setShowTest] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(['hero-section']);

  // Datos de usuario
  const [gigiCalibration, setGigiCalibrationState] = useState<CalibrationSelection | null>(null);
  const [registrationData, setRegistrationDataState] = useState<RegistrationData | null>(null);
  const [avatarPhotos, setAvatarPhotos] = useState<File[]>([]);

  // Wrapper para setIsLoading con mensaje opcional
  const setIsLoading = (loading: boolean, message?: string) => {
    setIsLoadingState(loading);
    if (message) {
      setLoadingMessage(message);
    }
  };

  // Guardar calibración con persistencia
  const setGigiCalibration = (calibration: CalibrationSelection) => {
    setGigiCalibrationState(calibration);
    StorageAPI.saveGigiCalibration(calibration);
  };

  // Guardar datos de registro con persistencia
  const setRegistrationData = (data: RegistrationData) => {
    setRegistrationDataState(data);
    StorageAPI.saveUserData(data);
  };

  // Toggle de secciones
  const toggleSection = (sectionId: string, isOpen: boolean) => {
    setOpenSections(prev => {
      if (isOpen) {
        return [sectionId];
      } else {
        return prev.filter(id => id !== sectionId);
      }
    });
  };

  // Completar onboarding
  const completeOnboarding = () => {
    StorageAPI.markOnboardingComplete();
    setAppMode('app');
    setAppView('blog');
  };

  // Reset completo de la app
  const resetApp = () => {
    setAppMode('onboarding');
    setOnboardingStep('hero');
    setAppView('blog');
    setIsLoadingState(false);
    setShowTest(false);
    setOpenSections(['hero-section']);
    setGigiCalibrationState(null);
    setRegistrationDataState(null);
    setAvatarPhotos([]);
    StorageAPI.clearAllData();
  };

  const value: AppContextValue = {
    // Estado
    appMode,
    onboardingStep,
    appView,
    isLoading,
    loadingMessage,
    showTest,
    openSections,
    gigiCalibration,
    registrationData,
    avatarPhotos,

    // Setters
    setAppMode,
    setOnboardingStep,
    setAppView,
    setIsLoading,
    setShowTest,
    setOpenSections,
    setGigiCalibration,
    setRegistrationData,
    setAvatarPhotos,

    // Helpers
    toggleSection,
    completeOnboarding,
    resetApp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Hook para usar el contexto de la app
 */
export function useApp() {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
}
