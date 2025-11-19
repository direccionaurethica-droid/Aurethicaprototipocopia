/**
 * LandingPage - Página de aterrizaje premium
 * Diseño limpio y moderno estilo Zara
 */

import { motion } from 'motion/react';
import { Hero } from '../components/Hero';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onSalonAccess?: () => void;
  onStylistAccess?: () => void;
}

export function LandingPage({ onGetStarted, onLogin, onSalonAccess, onStylistAccess }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black"
    >
      <Hero 
        onRegistration={onGetStarted}
        onLogin={onLogin}
        onSalonAccess={onSalonAccess}
        onStylistAccess={onStylistAccess}
      />
    </motion.div>
  );
}