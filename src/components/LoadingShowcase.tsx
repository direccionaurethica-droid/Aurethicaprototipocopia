/**
 * LoadingShowcase - Demostración de todas las variantes de carga
 * Muestra los diferentes estados del logo de Auréthica
 */

import { AurethicaSpinner } from './AurethicaSpinner';
import { LoadingState } from './LoadingState';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function LoadingShowcase() {
  const [progress, setProgress] = useState(0);

  // Simular progreso para el loader de progreso
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl text-[#D4AF37] mb-12 text-center"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Estados de Carga - Auréthica
        </motion.h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* SPINNER - Rotación + Pulsación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0a0a0a] rounded-2xl p-8 border border-[#D4AF37]/20"
          >
            <h3 className="text-xl text-[#D4AF37] mb-6 text-center">
              Spinner
            </h3>
            <p className="text-sm text-gray-400 mb-6 text-center">
              Rotación continua + pulsación<br/>
              Uso: Carga indefinida general
            </p>
            <div className="flex items-center justify-center min-h-[200px]">
              <AurethicaSpinner size="lg" variant="spinner" />
            </div>
          </motion.div>

          {/* DOTS - Puntos orbitales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] rounded-2xl p-8 border border-[#D4AF37]/20"
          >
            <h3 className="text-xl text-[#D4AF37] mb-6 text-center">
              Dots
            </h3>
            <p className="text-sm text-gray-400 mb-6 text-center">
              3 puntos orbitales pulsantes<br/>
              Uso: Inline/pequeñas cargas
            </p>
            <div className="flex items-center justify-center min-h-[200px]">
              <AurethicaSpinner size="lg" variant="dots" />
            </div>
          </motion.div>

          {/* PROGRESS - Círculo de progreso */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0a0a0a] rounded-2xl p-8 border border-[#D4AF37]/20"
          >
            <h3 className="text-xl text-[#D4AF37] mb-6 text-center">
              Progress
            </h3>
            <p className="text-sm text-gray-400 mb-6 text-center">
              Círculo que se llena + partícula de luz<br/>
              Uso: Subidas/descargas
            </p>
            <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
              <AurethicaSpinner variant="progress" progress={progress} />
              <span className="text-[#D4AF37] text-sm">{progress}%</span>
            </div>
          </motion.div>

          {/* PULSE - Ondas expansivas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0a0a0a] rounded-2xl p-8 border border-[#D4AF37]/20"
          >
            <h3 className="text-xl text-[#D4AF37] mb-6 text-center">
              Pulse
            </h3>
            <p className="text-sm text-gray-400 mb-6 text-center">
              Ondas expansivas + respiración<br/>
              Uso: Carga de página completa
            </p>
            <div className="flex items-center justify-center min-h-[200px]">
              <AurethicaSpinner size="lg" variant="pulse" />
            </div>
          </motion.div>

          {/* SKELETON - Shimmer deslizante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#0a0a0a] rounded-2xl p-8 border border-[#D4AF37]/20"
          >
            <h3 className="text-xl text-[#D4AF37] mb-6 text-center">
              Skeleton
            </h3>
            <p className="text-sm text-gray-400 mb-6 text-center">
              Brillo deslizante (shimmer)<br/>
              Uso: Placeholders de contenido
            </p>
            <div className="flex items-center justify-center min-h-[200px]">
              <AurethicaSpinner size="lg" variant="skeleton" />
            </div>
          </motion.div>

          {/* EXIT - Animación de salida */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#0a0a0a] rounded-2xl p-8 border border-[#FF2D95]/20"
          >
            <h3 className="text-xl text-[#FF2D95] mb-6 text-center">
              Exit Animation
            </h3>
            <p className="text-sm text-gray-400 mb-6 text-center">
              Explosión 3x + fade out<br/>
              Uso: Splash screen
            </p>
            <div className="flex items-center justify-center min-h-[200px]">
              <ExitDemo />
            </div>
          </motion.div>
        </div>

        {/* LoadingState variants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-[#0a0a0a] rounded-2xl p-8 border border-[#D4AF37]/20"
        >
          <h2 className="text-2xl text-[#D4AF37] mb-8 text-center">
            LoadingState Components
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">type="spinner"</p>
              <LoadingState type="spinner" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">type="dots"</p>
              <LoadingState type="dots" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">type="progress"</p>
              <LoadingState type="progress" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">type="pulse"</p>
              <LoadingState type="pulse" />
            </div>
          </div>
        </motion.div>

        {/* Color palette reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <h3 className="text-lg text-gray-400 mb-4">Paleta de colores</h3>
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50" />
              <span className="text-xs text-gray-400">#D4AF37</span>
              <span className="text-xs text-[#D4AF37]">Dorado</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-[#FFD700] shadow-lg shadow-[#FFD700]/50" />
              <span className="text-xs text-gray-400">#FFD700</span>
              <span className="text-xs text-[#FFD700]">Oro brillante</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-[#FF2D95] shadow-lg shadow-[#FF2D95]/50" />
              <span className="text-xs text-gray-400">#FF2D95</span>
              <span className="text-xs text-[#FF2D95]">Fucsia Gigi</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-[#D4AF37]/30" />
              <span className="text-xs text-gray-400">#000000</span>
              <span className="text-xs text-gray-400">Negro puro</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Componente demo para la animación de salida
function ExitDemo() {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <AurethicaSpinner size="lg" variant="spinner" isExiting={isExiting} />
      {isExiting && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-[#FF2D95] whitespace-nowrap"
        >
          ¡Explosión!
        </motion.p>
      )}
    </div>
  );
}
