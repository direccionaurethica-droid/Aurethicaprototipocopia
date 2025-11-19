/**
 * DevTools - Herramientas de desarrollo
 * Navegación entre páginas y etiquetas de identificación
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Menu, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DevToolsProps {
  currentPage: string;
  onNavigate?: (direction: 'prev' | 'next') => void;
  pages?: string[];
  getPageName?: (page: string) => string;
}

export function DevTools({ currentPage, onNavigate, pages = [], getPageName }: DevToolsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Etiqueta de página - Pie de página */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white py-2 px-4 z-[99999] backdrop-blur-sm border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Code className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-mono">
              Página actual: <span className="text-[#D4AF37] font-semibold">{currentPage}</span>
            </span>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 rounded text-xs font-mono transition-colors flex items-center gap-2"
          >
            {isExpanded ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
            {isExpanded ? 'Cerrar' : 'DevTools'}
          </button>
        </div>
      </div>

      {/* Panel expandido de herramientas */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-12 left-4 right-4 bg-black/95 backdrop-blur-md rounded-xl shadow-2xl z-[99999] border border-white/10 max-w-2xl mx-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                    <Code className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Herramientas de Desarrollo</h3>
                    <p className="text-white/50 text-xs font-mono">{currentPage}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>

              {/* Navegación */}
              <div className="space-y-4">
                <div>
                  <label className="text-white/70 text-xs font-mono mb-2 block">Navegación</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigate?.('prev')}
                      className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-white text-sm font-mono group"
                    >
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Anterior
                    </button>
                    <button
                      onClick={() => onNavigate?.('next')}
                      className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-white text-sm font-mono group"
                    >
                      Siguiente
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Lista de páginas disponibles */}
                {pages.length > 0 && (
                  <div>
                    <label className="text-white/70 text-xs font-mono mb-2 block">Páginas disponibles ({pages.length})</label>
                    <div className="max-h-48 overflow-y-auto space-y-1 bg-black/30 rounded-lg p-2">
                      {pages.map((page, index) => (
                        <div
                          key={index}
                          className={`px-3 py-2 rounded text-xs font-mono transition-colors ${
                            page === currentPage
                              ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                              : 'text-white/50 hover:bg-white/5'
                          }`}
                        >
                          {index + 1}. {getPageName ? getPageName(page) : page}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Atajos de teclado */}
                <div className="pt-4 border-t border-white/10">
                  <label className="text-white/70 text-xs font-mono mb-2 block">Atajos de teclado</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-white/10 rounded text-white/70 font-mono">←</kbd>
                      <span className="text-white/50">Anterior</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-white/10 rounded text-white/70 font-mono">→</kbd>
                      <span className="text-white/50">Siguiente</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botones flotantes de navegación rápida */}
      {!isExpanded && (
        <div className="fixed bottom-16 right-4 flex gap-2 z-[99998]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate?.('prev')}
            className="w-12 h-12 rounded-full bg-black/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black shadow-xl"
            title="Página anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate?.('next')}
            className="w-12 h-12 rounded-full bg-black/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black shadow-xl"
            title="Página siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      )}
    </>
  );
}