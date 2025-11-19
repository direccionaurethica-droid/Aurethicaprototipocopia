/**
 * JourneyContext - Contexto para tracking del journey del usuario
 * Gestiona el progreso a través del onboarding
 */

import { createContext, useContext, useState, ReactNode } from 'react';

export type JourneyStep = {
  id: string;
  label: string;
  description?: string;
};

export const JOURNEY_STEPS: JourneyStep[] = [
  { id: 'hero', label: 'Inicio', description: 'Bienvenida' },
  { id: 'register', label: 'Registro', description: 'Crea tu cuenta' },
  { id: 'intro', label: 'Gigi', description: 'Conoce y calibra' },
  { id: 'test', label: 'Test', description: 'Descubre tu estilo' },
  { id: 'avatar', label: 'Avatar', description: 'Tu imagen personal' },
  { id: 'app', label: '¡Listo!', description: 'Explora la app' }
];

interface JourneyContextType {
  currentStepId: string;
  currentStepIndex: number;
  setCurrentStep: (stepId: string) => void;
  steps: JourneyStep[];
  isOnboarding: boolean;
  completeOnboarding: () => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [currentStepId, setCurrentStepId] = useState<string>('hero');
  const [isOnboarding, setIsOnboarding] = useState(true);

  const currentStepIndex = JOURNEY_STEPS.findIndex(step => step.id === currentStepId);

  const setCurrentStep = (stepId: string) => {
    const stepExists = JOURNEY_STEPS.some(step => step.id === stepId);
    if (stepExists) {
      setCurrentStepId(stepId);
    }
  };

  const completeOnboarding = () => {
    setIsOnboarding(false);
  };

  return (
    <JourneyContext.Provider
      value={{
        currentStepId,
        currentStepIndex,
        setCurrentStep,
        steps: JOURNEY_STEPS,
        isOnboarding,
        completeOnboarding
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
}