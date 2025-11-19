/**
 * RegistrationPage - Página de registro pulida
 * Experiencia premium de registro de usuario
 */

import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Registration } from '../components/Registration';
import { ProgressStepper } from '../components/ProgressStepper';
import { useJourney } from '../contexts/JourneyContext';
import type { RegistrationData } from '../lib/types';

interface RegistrationPageProps {
  onComplete: (data: RegistrationData) => void;
  onBack: () => void;
}

export function RegistrationPage({ onComplete, onBack }: RegistrationPageProps) {
  const { setCurrentStep, steps, currentStepIndex } = useJourney();

  useEffect(() => {
    setCurrentStep('register');
  }, [setCurrentStep]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-black"
    >
      {/* Progress Stepper */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm py-4">
        <div className="container mx-auto px-6">
          <ProgressStepper
            steps={steps}
            currentStep={currentStepIndex}
            variant="minimal"
          />
        </div>
      </div>

      {/* Contenido con padding-top para el stepper */}
      <div className="pt-20">
        <Registration 
          onComplete={onComplete}
          onBack={onBack}
        />
      </div>
    </motion.div>
  );
}