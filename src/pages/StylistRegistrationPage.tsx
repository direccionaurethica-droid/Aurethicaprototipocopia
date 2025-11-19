/**
 * StylistRegistrationPage - Página de registro para Estilistas
 */

import { motion } from 'motion/react';
import { StylistRegistration, StylistRegistrationData } from '../components/StylistRegistration';

interface StylistRegistrationPageProps {
  onComplete: (data: StylistRegistrationData) => void;
  onBack: () => void;
}

export function StylistRegistrationPage({ onComplete, onBack }: StylistRegistrationPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <StylistRegistration onComplete={onComplete} onBack={onBack} />
    </motion.div>
  );
}
