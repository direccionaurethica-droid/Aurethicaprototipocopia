/**
 * PageFlowDemo - Demostración visual del flujo de páginas
 * Herramienta para diseñadores y desarrolladores
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Home, UserPlus, Sparkles, ClipboardList, Camera, Layout } from 'lucide-react';
import { Card } from './ui/card';

type DemoPage = 'landing' | 'registration' | 'gigi' | 'test' | 'avatar' | 'app';

const pages = [
  { id: 'landing', name: 'Landing', icon: Home, color: '#F5F2E9', textColor: '#013220' },
  { id: 'registration', name: 'Registro', icon: UserPlus, color: '#FFFFFF', textColor: '#013220' },
  { id: 'gigi', name: 'Gigi Intro', icon: Sparkles, color: 'linear-gradient(to bottom, #F5F2E9, #FFFFFF)', textColor: '#FF2D95' },
  { id: 'test', name: 'Test', icon: ClipboardList, color: '#FFFFFF', textColor: '#013220' },
  { id: 'avatar', name: 'Avatar', icon: Camera, color: '#F5F2E9', textColor: '#C9A24F' },
  { id: 'app', name: 'App Mode', icon: Layout, color: '#F5F2E9', textColor: '#013220' },
] as const;

export function PageFlowDemo() {
  const [currentPage, setCurrentPage] = useState<DemoPage>('landing');
  
  const currentPageData = pages.find(p => p.id === currentPage);
  const currentIndex = pages.findIndex(p => p.id === currentPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="text-4xl text-[#013220] mb-4"
          >
            Flujo de Páginas Premium
          </h1>
          <p className="text-[#6E7276] text-lg">
            Demostración interactiva de la arquitectura de Auréthica
          </p>
        </div>

        {/* Navegación de páginas */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center justify-center gap-2 min-w-max pb-4">
            {pages.map((page, index) => {
              const Icon = page.icon;
              const isActive = page.id === currentPage;
              const isPast = index < currentIndex;
              
              return (
                <div key={page.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentPage(page.id as DemoPage)}
                    className={`
                      relative px-6 py-3 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-white shadow-lg scale-105' 
                        : isPast
                        ? 'bg-white/50 hover:bg-white/80'
                        : 'bg-white/30 hover:bg-white/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        className="w-5 h-5"
                        style={{ color: isActive ? page.textColor : '#6E7276' }}
                      />
                      <span 
                        className={`text-sm font-medium ${
                          isActive ? '' : 'text-[#6E7276]'
                        }`}
                        style={{ color: isActive ? page.textColor : undefined }}
                      >
                        {page.name}
                      </span>
                    </div>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          border: `2px solid ${page.textColor}`,
                          opacity: 0.3,
                        }}
                      />
                    )}
                  </button>
                  
                  {index < pages.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-[#6E7276] mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Vista previa de página */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card 
              className="p-8 shadow-2xl border-2"
              style={{
                background: currentPageData?.color,
                borderColor: currentPageData?.textColor + '40',
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                {currentPageData && (
                  <>
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ 
                        background: currentPageData.textColor + '20',
                      }}
                    >
                      <currentPageData.icon 
                        className="w-8 h-8"
                        style={{ color: currentPageData.textColor }}
                      />
                    </div>
                    <div>
                      <h2 
                        style={{ 
                          fontFamily: 'Playfair Display, serif',
                          color: currentPageData.textColor 
                        }}
                        className="text-3xl mb-1"
                      >
                        {currentPageData.name}
                      </h2>
                      <p className="text-[#6E7276]">
                        Paso {currentIndex + 1} de {pages.length}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Contenido específico por página */}
              <div className="space-y-4">
                {currentPage === 'landing' && (
                  <>
                    <p className="text-[#6E7276] leading-relaxed">
                      <strong>Página de aterrizaje</strong> con hero impactante. Presenta la propuesta de valor de Auréthica.
                    </p>
                    <div className="p-4 bg-white/50 rounded-lg">
                      <p className="text-sm text-[#6E7276]">
                        <strong>Transición:</strong> Fade in suave (600ms)<br/>
                        <strong>Fondo:</strong> Marfil cálido #F5F2E9<br/>
                        <strong>CTA:</strong> "Comenzar" → Registro
                      </p>
                    </div>
                  </>
                )}

                {currentPage === 'registration' && (
                  <>
                    <p className="text-[#6E7276] leading-relaxed">
                      <strong>Formulario de registro</strong> elegante con validación en tiempo real.
                    </p>
                    <div className="p-4 bg-white/50 rounded-lg">
                      <p className="text-sm text-[#6E7276]">
                        <strong>Transición:</strong> Slide horizontal (500ms)<br/>
                        <strong>Fondo:</strong> Blanco puro<br/>
                        <strong>Loading:</strong> "Preparando tu experiencia..." (2s)
                      </p>
                    </div>
                  </>
                )}

                {currentPage === 'gigi' && (
                  <>
                    <p className="text-[#FF2D95] leading-relaxed">
                      <strong>Presentación de Gigi</strong> seguida de calibración de personalidad (5 preguntas).
                    </p>
                    <div className="p-4 bg-white/50 rounded-lg">
                      <p className="text-sm text-[#6E7276]">
                        <strong>Transición:</strong> Scale + fade (600ms)<br/>
                        <strong>Fondo:</strong> Gradiente marfil → blanco<br/>
                        <strong>Loading:</strong> "Configurando Gigi..." (1.5s)
                      </p>
                    </div>
                  </>
                )}

                {currentPage === 'test' && (
                  <>
                    <p className="text-[#6E7276] leading-relaxed">
                      <strong>Test de Auréthica</strong> con preguntas sobre preferencias de ropa (no belleza).
                    </p>
                    <div className="p-4 bg-white/50 rounded-lg">
                      <p className="text-sm text-[#6E7276]">
                        <strong>Transición:</strong> Slide vertical (500ms)<br/>
                        <strong>Fondo:</strong> Blanco puro<br/>
                        <strong>Loading:</strong> "Analizando respuestas..." (1.5s)
                      </p>
                    </div>
                  </>
                )}

                {currentPage === 'avatar' && (
                  <>
                    <p className="text-[#C9A24F] leading-relaxed">
                      <strong>Subida de 10 fotos</strong> para generar avatar personalizado con IA.
                    </p>
                    <div className="p-4 bg-white/50 rounded-lg">
                      <p className="text-sm text-[#6E7276]">
                        <strong>Transición:</strong> Scale zoom (600ms)<br/>
                        <strong>Fondo:</strong> Marfil cálido<br/>
                        <strong>Loading:</strong> "Generando avatar..." (3s)
                      </p>
                    </div>
                  </>
                )}

                {currentPage === 'app' && (
                  <>
                    <p className="text-[#6E7276] leading-relaxed">
                      <strong>Modo aplicación</strong> con feed tipo Instagram, perfil de usuario y búsqueda.
                    </p>
                    <div className="p-4 bg-white/50 rounded-lg">
                      <p className="text-sm text-[#6E7276]">
                        <strong>Transición:</strong> Slide horizontal suave (400ms)<br/>
                        <strong>Navegación:</strong> Bottom nav (Blog/Perfil/Búsqueda)<br/>
                        <strong>Persistente:</strong> Usuario permanece aquí
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Botones de navegación */}
              <div className="flex gap-4 mt-8">
                {currentIndex > 0 && (
                  <button
                    onClick={() => setCurrentPage(pages[currentIndex - 1].id as DemoPage)}
                    className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-[#6E7276] border border-gray-200 transition-all"
                  >
                    ← Anterior
                  </button>
                )}
                {currentIndex < pages.length - 1 && (
                  <button
                    onClick={() => setCurrentPage(pages[currentIndex + 1].id as DemoPage)}
                    className="px-6 py-3 rounded-xl text-white transition-all hover:scale-105"
                    style={{
                      background: currentPageData?.textColor,
                    }}
                  >
                    Siguiente →
                  </button>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Información adicional */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="text-[#013220] font-semibold mb-2">✨ Transiciones Premium</h3>
            <p className="text-sm text-[#6E7276]">
              Easing cubic-bezier personalizado para movimientos suaves y naturales
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-[#013220] font-semibold mb-2">🎨 Paleta Coherente</h3>
            <p className="text-sm text-[#6E7276]">
              Cada página usa colores específicos de la paleta Auréthica
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-[#013220] font-semibold mb-2">⚡ Performance</h3>
            <p className="text-sm text-[#6E7276]">
              Code splitting y lazy loading para tiempos de carga óptimos
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
