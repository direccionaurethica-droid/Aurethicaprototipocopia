/**
 * GigiIntroPage - Introducción y calibración de Gigi
 * Experiencia inmersiva con la asistente IA
 */

import { motion } from 'motion/react';
import { Ventana0 } from '../components/Ventana0';
import type { CalibrationSelection } from '../lib/types';

interface GigiIntroPageProps {
  onCalibrationComplete: (selections: CalibrationSelection) => void;
  onBack: () => void;
}

export function GigiIntroPage({ onCalibrationComplete, onBack }: GigiIntroPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-black"
    >
      <Ventana0
        onContinue={() => {}}
        onCalibrationComplete={onCalibrationComplete}
        onBack={onBack}
      />
    </motion.div>
  );
}