/**
 * ProfileChoicePage - Elección de perfil existente o nuevo
 * Diseño minimalista con logo neón de Auréthica y efectos metálicos
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { BackButton } from '../components/BackButton';
import { AurethicaSpinner } from '../components/AurethicaSpinner';
import { MetallicText } from '../components/MetallicText';
import { MetallicButton } from '../components/MetallicButton';
import auréthicaLogoNeon from '../assets/aurethica-logo.png';

interface ProfileChoicePageProps {
  userName: string;
  onUseExisting: () => void;
  onCreateNew: () => void;
  onBack?: () => void;
}

export function ProfileChoicePage({ 
  userName, 
  onUseExisting, 
  onCreateNew,
  onBack
}: ProfileChoicePageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: '#000000'
      }}
    >
      {/* Rastros fucsia de Gigi flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Partículas fucsia flotantes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#FF2D95]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Estelas fucsia */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`trail-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#FF2D95] to-transparent"
            style={{
              width: `${100 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 200, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'linear'
            }}
          />
        ))}

        {/* Brillos fucsia sutiles */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, rgba(255, 45, 149, 0.08) 0%, transparent 40%)',
              'radial-gradient(circle at 70% 60%, rgba(255, 45, 149, 0.12) 0%, transparent 40%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 45, 149, 0.1) 0%, transparent 40%)',
              'radial-gradient(circle at 30% 40%, rgba(255, 45, 149, 0.08) 0%, transparent 40%)',
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Botón de retroceso */}
      {onBack && (
        <div className="absolute top-6 left-6 z-20">
          <BackButton onClick={onBack} variant="light" />
        </div>
      )}

      {/* Contenedor principal */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10">
        
        {/* Logo central con transición desde spinner */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            filter: isLoading ? 'blur(10px)' : 'blur(0px)'
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
          onAnimationComplete={() => {
            setTimeout(() => setIsLoading(false), 800);
          }}
          className="relative mb-16"
        >
          {/* Spinner que desaparece */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <AurethicaSpinner />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo que aparece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: isLoading ? 0 : 1,
              scale: isLoading ? 0.9 : 1
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-72 h-72 md:w-96 md:h-96 relative"
          >
            <img
              src={auréthicaLogoNeon}
              alt="Auréthica"
              className="w-full h-full object-contain"
              style={{
                mixBlendMode: 'screen',
                filter: 'brightness(1.25) saturate(1.2) drop-shadow(0 0 50px rgba(212, 175, 55, 0.4))',
                maskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 85%, rgba(0,0,0,0.01) 92%, rgba(0,0,0,0) 100%)',
              }}
            />
            
            {/* Resplandor dorado metálico animado */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 60px rgba(212, 175, 55, 0.4), 0 0 100px rgba(212, 175, 55, 0.2)',
                  '0 0 80px rgba(232, 200, 120, 0.6), 0 0 120px rgba(212, 175, 55, 0.3)',
                  '0 0 60px rgba(212, 175, 55, 0.4), 0 0 100px rgba(212, 175, 55, 0.2)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Halo fucsia sutil de Gigi */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 40px rgba(255, 45, 149, 0.15)',
                  '0 0 60px rgba(255, 45, 149, 0.25)',
                  '0 0 40px rgba(255, 45, 149, 0.15)',
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.5
              }}
            />
          </motion.div>
        </motion.div>

        {/* Nombre del usuario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <MetallicText 
            size="xl" 
            className="text-3xl md:text-4xl text-center"
          >
            <h1 style={{ fontFamily: 'Playfair Display, serif' }}>
              {userName}
            </h1>
          </MetallicText>
        </motion.div>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="w-full max-w-md space-y-4"
        >
          {/* Botón principal: Continuar con el mismo perfil */}
          <MetallicButton
            onClick={onUseExisting}
            size="lg"
            fullWidth
          >
            Continuar con el mismo perfil
          </MetallicButton>

          {/* Botón secundario: Crear nuevo avatar */}
          <MetallicButton
            onClick={onCreateNew}
            size="md"
            variant="secondary"
            fullWidth
          >
            Crear nuevo avatar
          </MetallicButton>
        </motion.div>

        {/* Texto inferior: Crear perfil de nuevo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 text-center"
        >
          <MetallicText size="sm" className="text-xs">
            <p style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Crear perfil de nuevo
            </p>
          </MetallicText>
        </motion.div>
      </div>
    </motion.div>
  );
}

