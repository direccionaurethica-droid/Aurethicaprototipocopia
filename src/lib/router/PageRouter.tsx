/**
 * PageRouter - Sistema de enrutamiento de páginas premium
 * Gestiona transiciones suaves entre vistas
 */

import { AnimatePresence } from 'motion/react';
import { LoadingScreen } from '../../components/LoadingScreen';
import {
  LandingPage,
  RegistrationPage,
  EmailVerificationPage,
  LoginPage,
  ProfileChoicePage,
  GigiIntroPage,
  TestPage,
  AvatarPage,
  AppModePage,
  SalonRegistrationPage,
  StylistRegistrationPage,
  EmpresaDashboardPage,
  EstilistaDashboardPage
} from '../../pages';

import type { CalibrationSelection, RegistrationData } from '../types';
import type { SalonRegistrationData } from '../../components/SalonRegistration';
import type { StylistRegistrationData } from '../../components/StylistRegistration';

export type PageRoute =
  | 'landing'
  | 'register'
  | 'email-verification'
  | 'login'
  | 'profile-choice'
  | 'gigi-intro'
  | 'test'
  | 'avatar'
  | 'app'
  | 'pro-access'
  | 'salon-registration'
  | 'stylist-registration'
  | 'empresa-dashboard'
  | 'estilista-dashboard';

interface PageRouterProps {
  currentPage: PageRoute;
  isLoading: boolean;
  loadingMessage: string;
  
  // Datos del flujo
  gigiCalibration: CalibrationSelection | null;
  registrationData: RegistrationData | null;
  userData: any;
  
  // Handlers de navegación
  onNavigate: (page: PageRoute) => void;
  onRegistrationComplete: (data: RegistrationData) => void;
  onLoginSubmit: (email: string, password: string) => void;
  onProfileChoiceUseExisting: () => void;
  onProfileChoiceCreateNew: () => void;
  onCalibrationComplete: (selections: CalibrationSelection) => void;
  onTestComplete: () => void;
  onAvatarComplete: (photos: File[]) => void;
  onSalonRegistrationComplete?: (data: SalonRegistrationData) => void;
  onStylistRegistrationComplete?: (data: StylistRegistrationData) => void;
}

export function PageRouter({
  currentPage,
  isLoading,
  loadingMessage,
  gigiCalibration,
  registrationData,
  userData,
  onNavigate,
  onRegistrationComplete,
  onLoginSubmit,
  onProfileChoiceUseExisting,
  onProfileChoiceCreateNew,
  onCalibrationComplete,
  onTestComplete,
  onAvatarComplete,
  onSalonRegistrationComplete,
  onStylistRegistrationComplete,
}: PageRouterProps) {
  
  // Mostrar loading screen si está activo
  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  // Renderizar página actual con transiciones
  return (
    <AnimatePresence mode="wait">
      {currentPage === 'landing' && (
        <LandingPage
          key="landing"
          onGetStarted={() => onNavigate('register')}
          onLogin={() => onNavigate('login')}
          onSalonAccess={() => onNavigate('salon-registration')}
          onStylistAccess={() => onNavigate('stylist-registration')}
        />
      )}

      {currentPage === 'register' && (
        <RegistrationPage
          key="registration"
          onComplete={onRegistrationComplete}
          onBack={() => onNavigate('landing')}
        />
      )}

      {currentPage === 'email-verification' && (
        <EmailVerificationPage
          key="email-verification"
          email={registrationData?.email || 'email@example.com'}
          onVerified={() => onNavigate('login')}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage
          key="login"
          onLogin={onLoginSubmit}
          onBack={() => onNavigate('landing')}
          onRegister={() => onNavigate('register')}
        />
      )}

      {currentPage === 'profile-choice' && (
        <ProfileChoicePage
          key="profile-choice"
          userName={userData?.name || 'Usuario'}
          onUseExisting={onProfileChoiceUseExisting}
          onCreateNew={onProfileChoiceCreateNew}
        />
      )}

      {currentPage === 'gigi-intro' && (
        <GigiIntroPage
          key="gigi-intro"
          onCalibrationComplete={onCalibrationComplete}
          onBack={() => onNavigate(registrationData ? 'profile-choice' : 'register')}
        />
      )}

      {currentPage === 'test' && (
        <TestPage
          key="test"
          gigiCalibration={gigiCalibration}
          onComplete={onTestComplete}
          onBack={() => onNavigate('gigi-intro')}
        />
      )}

      {currentPage === 'avatar' && (
        <AvatarPage
          key="avatar"
          onComplete={onAvatarComplete}
          onBack={() => onNavigate('test')}
        />
      )}

      {currentPage === 'app' && (
        <AppModePage
          key="app"
          userData={userData}
        />
      )}

      {currentPage === 'pro-access' && (
        <AppModePage
          key="app"
          userData={userData}
        />
      )}

      {currentPage === 'salon-registration' && (
        <SalonRegistrationPage
          key="salon-registration"
          onComplete={onSalonRegistrationComplete || (() => {})}
          onBack={() => onNavigate('landing')}
        />
      )}

      {currentPage === 'stylist-registration' && (
        <StylistRegistrationPage
          key="stylist-registration"
          onComplete={onStylistRegistrationComplete || (() => {})}
          onBack={() => onNavigate('landing')}
        />
      )}
    

      {currentPage === 'empresa-dashboard' && (
        <EmpresaDashboardPage
          key="empresa-dashboard"
          userEmail={userData?.email || ''}
          userName={userData?.name}
          onBack={() => onNavigate('landing')}
        />
      )}

      {currentPage === 'estilista-dashboard' && (
        <EstilistaDashboardPage
          key="estilista-dashboard"
          userEmail={userData?.email || ''}
          userName={userData?.name}
          onBack={() => onNavigate('landing')}
        />
      )}
    </AnimatePresence>
  );
}