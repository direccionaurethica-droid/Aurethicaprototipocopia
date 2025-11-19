/**
 * SalonRegistrationPage - Página de registro para Salones y Autónomos
 */

import { motion } from 'motion/react';
import { SalonRegistration, SalonRegistrationData } from '../components/SalonRegistration';

interface SalonRegistrationPageProps {
  onComplete: (data: SalonRegistrationData) => void;
  onBack: () => void;
}

export function SalonRegistrationPage({ onComplete, onBack }: SalonRegistrationPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <SalonRegistration onComplete={onComplete} onBack={onBack} />
    </motion.div>
  );
}
