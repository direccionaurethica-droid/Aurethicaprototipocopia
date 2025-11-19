/**
 * AvatarPage - Subida de fotos para avatar
 * Experiencia de upload premium
 */

import { motion } from 'motion/react';
import { useEffect } from 'react';
import { AvatarUpload } from '../components/AvatarUpload';
import { ProgressStepper } from '../components/ProgressStepper';
import { useJourney } from '../contexts/JourneyContext';

interface AvatarPageProps {
  onComplete: (photos: File[]) => void;
  onBack: () => void;
}

export function AvatarPage({ onComplete, onBack }: AvatarPageProps) {
  const { setCurrentStep, steps, currentStepIndex } = useJourney();

  useEffect(() => {
    setCurrentStep('avatar');
  }, [setCurrentStep]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-black"
    >
      {/* Progress Stepper */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-[#D4AF37]/20 py-4">
        <div className="container mx-auto px-6">
          <ProgressStepper
            steps={steps}
            currentStep={currentStepIndex}
            variant="minimal"
          />
        </div>
      </div>

      {/* Contenido con padding-top */}
      <div className="pt-20">
        <AvatarUpload
          onComplete={onComplete}
          onBack={onBack}
        />
      </div>
    </motion.div>
  );
}