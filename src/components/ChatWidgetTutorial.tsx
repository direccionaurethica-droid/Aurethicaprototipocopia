/**
 * ChatWidgetTutorial - Tutorial para el widget de chat draggable
 * Se muestra solo la primera vez
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Move, X } from 'lucide-react';

export function ChatWidgetTutorial() {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Verificar si ya se mostró el tutorial
    const tutorialShown = localStorage.getItem('chatWidgetTutorialShown');
    
    if (!tutorialShown) {
      // Mostrar el tutorial después de 2 segundos
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowTutorial(false);
    localStorage.setItem('chatWidgetTutorialShown', 'true');
  };

  return (
    <AnimatePresence>
      {showTutorial && (
        <>
          {/* Overlay semi-transparente */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={handleClose}
          />

          {/* Tutorial flotante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-32 left-32 z-[10000] bg-white rounded-2xl shadow-2xl p-6 max-w-sm"
          >
            {/* Botón cerrar */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Contenido */}
            <div className="pr-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] flex items-center justify-center">
                  <Move className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ¡Chat Movible!
                  </h3>
                  <p className="text-xs text-[#6E7276]">Nueva funcionalidad</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-[#6E7276]">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#FF2D95]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-[#FF2D95]">1</span>
                  </div>
                  <p>
                    <strong className="text-[#013220]">Arrastra el botón</strong> del chat a cualquier parte de la pantalla
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#C9A24F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-[#C9A24F]">2</span>
                  </div>
                  <p>
                    <strong className="text-[#013220]">Arrastra la ventana</strong> desde el encabezado para reposicionarla
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#013220]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-[#013220]">3</span>
                  </div>
                  <p>
                    <strong className="text-[#013220]">Encuentra tu posición ideal</strong> para no tapar contenido importante
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full mt-6 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] text-white font-medium hover:from-[#ff4da8] hover:to-[#d4b366] transition-all"
              >
                ¡Entendido!
              </button>
            </div>

            {/* Flecha apuntando al botón */}
            <motion.div
              className="absolute -bottom-3 left-8"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
