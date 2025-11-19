/**
 * TestPage - Test de Auréthica
 * Experiencia de cuestionario premium
 */

import { motion } from 'motion/react';
import { BeautyTest } from '../components/BeautyTest';
import type { CalibrationSelection } from '../lib/types';

interface TestPageProps {
  gigiCalibration: CalibrationSelection | null;
  onComplete: () => void;
  onBack: () => void;
}

export function TestPage({ gigiCalibration, onComplete, onBack }: TestPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-black"
    >
      <BeautyTest
        gigiPersonality={gigiCalibration}
        onComplete={onComplete}
        onBack={onBack}
      />
    </motion.div>
  );
}