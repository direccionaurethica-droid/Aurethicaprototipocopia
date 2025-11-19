/**
 * GigiStyleShowcase - Componente de demostración del sistema cromático de Gigi
 * Este componente muestra todos los estilos, colores y efectos cromados de Gigi
 * Útil para diseñadores y desarrolladores como referencia visual
 */

import { motion } from 'motion/react';
import { Sparkles, Heart, Zap } from 'lucide-react';
import { ChromeButton } from './ChromeButton';
import { Card } from './ui/card';

export function GigiStyleShowcase() {
  return (
    <div className="min-h-screen bg-[#F5F2E9] p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="text-[#FF2D95] text-4xl md:text-5xl mb-4 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-12 h-12" />
            Sistema Cromático de Gigi
            <Sparkles className="w-12 h-12" />
          </h1>
          <p className="text-[#6E7276] text-lg">
            Paleta distintiva para la asistente de IA de Auréthica
          </p>
        </motion.div>

        {/* Paleta de Colores */}
        <Card className="p-8">
          <h2 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="text-[#FF2D95] text-2xl mb-6 flex items-center gap-2"
          >
            <Sparkles className="w-6 h-6" />
            Paleta de Colores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fucsia Gigi */}
            <div className="space-y-3">
              <div 
                className="h-32 rounded-xl shadow-lg border-2 border-white"
                style={{ background: '#FF2D95' }}
              />
              <div>
                <p className="font-semibold text-[#101418]">Fucsia Gigi</p>
                <p className="text-sm text-[#6E7276] font-mono">#FF2D95</p>
                <p className="text-xs text-[#6E7276] mt-1">
                  Títulos, iconos, indicadores
                </p>
              </div>
            </div>

            {/* Dorado */}
            <div className="space-y-3">
              <div 
                className="h-32 rounded-xl shadow-lg border-2 border-white"
                style={{ background: '#C9A24F' }}
              />
              <div>
                <p className="font-semibold text-[#101418]">Dorado Viejo</p>
                <p className="text-sm text-[#6E7276] font-mono">#C9A24F</p>
                <p className="text-xs text-[#6E7276] mt-1">
                  Acento intermedio del gradiente
                </p>
              </div>
            </div>

            {/* Verde Esmeralda */}
            <div className="space-y-3">
              <div 
                className="h-32 rounded-xl shadow-lg border-2 border-white"
                style={{ background: '#013220' }}
              />
              <div>
                <p className="font-semibold text-[#101418]">Verde Esmeralda</p>
                <p className="text-sm text-[#6E7276] font-mono">#013220</p>
                <p className="text-xs text-[#6E7276] mt-1">
                  Final del gradiente cromado
                </p>
              </div>
            </div>
          </div>

          {/* Gradiente Cromado */}
          <div className="mt-8">
            <p className="font-semibold text-[#101418] mb-3">Gradiente Cromado Gigi</p>
            <div 
              className="h-24 rounded-xl shadow-xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)',
                boxShadow: '0 4px 20px rgba(201, 162, 79, 0.5), 0 0 40px rgba(255, 45, 149, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  opacity: 0.4,
                }}
              />
            </div>
            <p className="text-xs text-[#6E7276] mt-2 font-mono">
              linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)<br/>
              <span className="text-[#013220] font-semibold">Texto: #013220 (Verde Esmeralda)</span>
            </p>
          </div>
        </Card>

        {/* Botones */}
        <Card className="p-8">
          <h2 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="text-[#FF2D95] text-2xl mb-6 flex items-center gap-2"
          >
            <Zap className="w-6 h-6" />
            Botones Cromados
          </h2>

          <div className="space-y-6">
            {/* Botón Gigi Grande */}
            <div>
              <p className="text-sm text-[#6E7276] mb-3">Tamaño Grande</p>
              <ChromeButton variant="gigi" size="lg" fullWidth>
                <Sparkles className="w-5 h-5" />
                Calibrar con Gigi
              </ChromeButton>
            </div>

            {/* Botón Gigi Medio */}
            <div>
              <p className="text-sm text-[#6E7276] mb-3">Tamaño Medio</p>
              <ChromeButton variant="gigi" size="md">
                <Heart className="w-4 h-4" />
                Continuar con Gigi
              </ChromeButton>
            </div>

            {/* Botón Gigi Pequeño */}
            <div>
              <p className="text-sm text-[#6E7276] mb-3">Tamaño Pequeño</p>
              <ChromeButton variant="gigi" size="sm">
                Siguiente
              </ChromeButton>
            </div>

            {/* Estado Loading */}
            <div>
              <p className="text-sm text-[#6E7276] mb-3">Estado Cargando</p>
              <ChromeButton variant="gigi" size="md" isLoading>
                Procesando...
              </ChromeButton>
            </div>

            {/* Estado Disabled */}
            <div>
              <p className="text-sm text-[#6E7276] mb-3">Estado Deshabilitado</p>
              <ChromeButton variant="gigi" size="md" disabled>
                No disponible
              </ChromeButton>
            </div>
          </div>
        </Card>

        {/* Títulos y Textos */}
        <Card className="p-8">
          <h2 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="text-[#FF2D95] text-2xl mb-6 flex items-center gap-2"
          >
            <Sparkles className="w-6 h-6" />
            Títulos y Textos
          </h2>

          <div className="space-y-6">
            {/* Título Principal */}
            <div>
              <p className="text-sm text-[#6E7276] mb-2">Título Principal (Playfair Display)</p>
              <h1 
                style={{ fontFamily: 'Playfair Display, serif' }}
                className="text-[#FF2D95] text-3xl md:text-4xl flex items-center gap-3"
              >
                <Sparkles className="w-8 h-8" />
                Calibración de Gigi
              </h1>
            </div>

            {/* Título Secundario */}
            <div>
              <p className="text-sm text-[#6E7276] mb-2">Título Secundario (Playfair Display)</p>
              <h2 
                style={{ fontFamily: 'Playfair Display, serif' }}
                className="text-[#FF2D95] text-2xl flex items-center gap-2"
              >
                <Sparkles className="w-6 h-6" />
                Tu Gigi Personalizada
              </h2>
            </div>

            {/* Texto con Énfasis */}
            <div>
              <p className="text-sm text-[#6E7276] mb-2">Texto con Énfasis</p>
              <p className="text-[#6E7276]">
                La asistente <span className="text-[#FF2D95] font-semibold">Gigi</span> te acompaña 
                en cada paso del proceso.
              </p>
            </div>

            {/* Contador */}
            <div>
              <p className="text-sm text-[#6E7276] mb-2">Contador de Progreso</p>
              <div className="inline-block bg-white px-5 py-2 rounded-full shadow-sm border border-[#FF2D95]/20">
                <p className="text-[#6E7276] text-sm font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF2D95]" />
                  Pregunta <span className="text-[#FF2D95] font-semibold">3</span> de 5
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tarjetas y Contenedores */}
        <Card className="p-8">
          <h2 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="text-[#FF2D95] text-2xl mb-6 flex items-center gap-2"
          >
            <Heart className="w-6 h-6" />
            Tarjetas y Contenedores
          </h2>

          <div className="space-y-6">
            {/* Tarjeta con Borde Fucsia */}
            <div>
              <p className="text-sm text-[#6E7276] mb-3">Tarjeta con Borde Fucsia</p>
              <div className="p-6 bg-gradient-to-r from-[#FF2D95]/5 via-white to-[#C9A24F]/5 rounded-2xl border border-[#FF2D95]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF2D95] to-[#C9A24F] flex items-center justify-center">
                    <span className="text-xl">💕</span>
                  </div>
                  <h4 style={{ fontFamily: 'Playfair Display, serif' }} className="text-lg text-[#FF2D95]">
                    Mensaje de Gigi
                  </h4>
                </div>
                <p className="text-[#6E7276] text-sm">
                  Este es un ejemplo de una tarjeta con el estilo visual de Gigi. 
                  El borde sutil y el fondo degradado crean una identidad distintiva.
                </p>
              </div>
            </div>

            {/* Indicador de Última Pregunta */}
            <div>
              <p className="text-sm text-[#6E7276] mb-3">Indicador "Última Pregunta"</p>
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-white to-[#FF2D95]/5 px-6 py-4 rounded-2xl shadow-lg border-2 border-[#FF2D95]/30">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF2D95] to-[#C9A24F] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[#FF2D95] font-medium flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      ¡Última pregunta!
                    </p>
                    <span className="text-xl">✨</span>
                  </div>
                  <p className="text-[#6E7276] text-sm">Gigi está casi lista para ti</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Indicadores de Progreso */}
        <Card className="p-8">
          <h2 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="text-[#FF2D95] text-2xl mb-6 flex items-center gap-2"
          >
            <Sparkles className="w-6 h-6" />
            Indicadores de Progreso
          </h2>

          <div className="space-y-8">
            {/* Barra de Progreso con Dots */}
            <div>
              <p className="text-sm text-[#6E7276] mb-4">Indicador de Puntos (Calibración)</p>
              <div className="flex justify-center space-x-3">
                <div className="w-12 h-2 rounded-full bg-[#FF2D95] shadow-md shadow-[#FF2D95]/30" />
                <div className="w-2 h-2 rounded-full bg-[#C9A24F]" />
                <div className="w-2 h-2 rounded-full bg-[#C9A24F]" />
                <div className="w-2 h-2 rounded-full bg-[#6E7276]/20" />
                <div className="w-2 h-2 rounded-full bg-[#6E7276]/20" />
              </div>
              <p className="text-xs text-center text-[#6E7276] mt-3">
                Activo: fucsia con sombra | Completado: dorado | Pendiente: gris
              </p>
            </div>

            {/* Radio Buttons */}
            <div>
              <p className="text-sm text-[#6E7276] mb-4">Radio Buttons</p>
              <div className="flex gap-6">
                {/* Seleccionado */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-[#FF2D95] bg-[#FF2D95] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                  <span className="text-sm text-[#101418] font-medium">Seleccionado</span>
                </div>

                {/* Hover */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-[#FF2D95]/60 flex items-center justify-center" />
                  <span className="text-sm text-[#6E7276]">Hover</span>
                </div>

                {/* Default */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-[#6E7276]/40 flex items-center justify-center" />
                  <span className="text-sm text-[#6E7276]">Default</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Animaciones */}
        <Card className="p-8">
          <h2 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="text-[#FF2D95] text-2xl mb-6 flex items-center gap-2"
          >
            <Zap className="w-6 h-6" />
            Animaciones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Breathing */}
            <div className="text-center">
              <p className="text-sm text-[#6E7276] mb-4">Breathing Animation</p>
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF2D95] to-[#C9A24F] flex items-center justify-center gigi-breathing">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            {/* Pulse */}
            <div className="text-center">
              <p className="text-sm text-[#6E7276] mb-4">Icon Pulse</p>
              <div className="flex justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-12 h-12 text-[#FF2D95]" />
                </motion.div>
              </div>
            </div>

            {/* Shimmer */}
            <div className="text-center">
              <p className="text-sm text-[#6E7276] mb-4">Shimmer Effect</p>
              <div className="flex justify-center">
                <div 
                  className="relative w-32 h-12 rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      opacity: 0.4,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-[#6E7276] text-sm">
            Sistema de Diseño Cromático de Gigi · Auréthica · 2025
          </p>
        </div>
      </div>
    </div>
  );
}
