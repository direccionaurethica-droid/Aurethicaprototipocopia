import { motion } from 'motion/react';
import { useState } from 'react';
import { GigiCalibration } from './GigiCalibration';
import { ChevronLeft } from 'lucide-react';
import gigiLogo from 'figma:asset/d6b411d972cd0bf19ef7521b7b038f43509e5335.png';

type CalibrationOption = 'neutro' | 'suave' | 'equilibrado' | 'firme' | 'intimo';

interface CalibrationSelection {
  confianza: CalibrationOption | null;
  cambio: CalibrationOption | null;
  seguridad: CalibrationOption | null;
  expresion: CalibrationOption | null;
  confirmacion: CalibrationOption | null;
}

interface Ventana0Props {
  onContinue: () => void;
  onCalibrationComplete: (selections: CalibrationSelection) => void;
  onBack?: () => void;
}

export function Ventana0({ onContinue, onCalibrationComplete, onBack }: Ventana0Props) {
  const [showCalibration, setShowCalibration] = useState(false);

  const handleStartCalibration = () => {
    setShowCalibration(true);
    setTimeout(() => {
      const section = document.getElementById('gigi-calibration');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCalibrationComplete = (selections: CalibrationSelection) => {
    onCalibrationComplete(selections);
    onContinue();
  };

  return (
    <div className="min-h-screen relative bg-black">
      {/* Botón de atrás */}
      {onBack && !showCalibration && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-30"
        >
          <button
            onClick={onBack}
            className="group relative overflow-hidden px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #FF2D95 50%, #D4AF37 100%)',
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
            }}
          >
            <div className="relative flex items-center gap-2 text-white/95">
              <ChevronLeft className="w-5 h-5" />
              <span className="tracking-wide">Atrás</span>
            </div>
          </button>
        </motion.div>
      )}

      {/* Pantalla inicial */}
      {!showCalibration && (
        <section className="h-screen w-screen fixed inset-0 flex items-center justify-center overflow-hidden bg-black">
          
          {/* Contenedor de contenido - PERFECTAMENTE CENTRADO */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 py-16 gap-6 min-h-screen">

            {/* Botón redondo con logo de Gigi - ARRIBA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <button
                onClick={handleStartCalibration}
                className="group relative overflow-hidden w-28 h-28 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                style={{
                  boxShadow: '0 8px 32px rgba(255, 45, 149, 0.4)',
                }}
              >
                {/* Logo de Gigi */}
                <img
                  src={gigiLogo}
                  alt="Gigi"
                  className="w-full h-full object-contain"
                />
              </button>
            </motion.div>

            {/* Textos sobre el hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 max-w-xl text-center"
            >
              <p
                className="text-[clamp(1.5rem,3.5vw,2.25rem)] text-white leading-[1.3] drop-shadow-2xl"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontStyle: 'italic',
                  textShadow: '0 4px 20px rgba(0,0,0,0.6)'
                }}
              >
                Antes de empezar, quiero asegurarme de que hacemos buen match.
              </p>
              
              <p
                className="text-[clamp(1rem,2vw,1.25rem)] text-white/90 leading-[1.6] drop-shadow-lg"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  textShadow: '0 2px 12px rgba(0,0,0,0.5)'
                }}
              >
                Quiero entenderte y que este sea tu espacio seguro, sin juicios y con un poco de brillo.
              </p>
            </motion.div>

            {/* Separador */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="w-20 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />

            {/* Firmas editoriales */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex items-end justify-center gap-10 pb-2"
            >
              {/* Gigi */}
              <div className="flex flex-col items-center">
                <div 
                  className="text-[#FF2D95] drop-shadow-xl"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                    letterSpacing: '0.02em',
                    textShadow: '0 4px 16px rgba(255, 45, 149, 0.5)'
                  }}
                >
                  Gigi
                </div>
                <div 
                  className="text-white/80 uppercase tracking-[0.2em] drop-shadow-md"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.7rem',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}
                >
                  Asistente Personal
                </div>
              </div>

              {/* Separador minimalista */}
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/50 to-transparent mb-2" />

              {/* Auréthica */}
              <div className="flex flex-col items-center">
                <div 
                  className="text-[#D4AF37] drop-shadow-xl"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                    letterSpacing: '0.02em',
                    textShadow: '0 4px 16px rgba(212, 175, 55, 0.6)'
                  }}
                >
                  Auréthica
                </div>
                <div 
                  className="text-white/80 uppercase tracking-[0.2em] drop-shadow-md"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.7rem',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}
                >
                  Belleza Inclusiva
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Calibración de Gigi */}
      {showCalibration && (
        <section id="gigi-calibration" className="min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <GigiCalibration onComplete={handleCalibrationComplete} />
          </motion.div>
        </section>
      )}
    </div>
  );
}