/**
 * AuriStylistWelcome - Presentación de AURI para Estilistas
 * Sistema de inteligencia técnica como compañera de trabajo
 */

import { motion } from 'motion/react';
import { Sparkles, Lightbulb, Database, TrendingUp, Users, BookOpen, ArrowRight } from 'lucide-react';

interface AuriStylistWelcomeProps {
  stylistName: string;
  salonName: string;
  onComplete: () => void;
}

export function AuriStylistWelcome({ stylistName, salonName, onComplete }: AuriStylistWelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] py-12 px-4 auri-text">
      <div className="max-w-5xl mx-auto">
        {/* Header con logo AURI */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Logo AURI */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8974A] flex items-center justify-center shadow-2xl">
                <Sparkles className="w-10 h-10 text-[#1A1A1A]" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-30 blur-xl animate-pulse" />
            </div>
            <div className="text-left">
              <h1 className="text-6xl font-bold text-[#D4AF37] tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                AURI
              </h1>
              <p className="text-sm text-[#F5F5F2]/60 tracking-wide uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
                Stylist Companion
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-medium text-[#F5F5F2] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Hola, <span className="text-[#D4AF37]">{stylistName}</span>
            </h2>
            <p className="text-lg text-[#F5F5F2]/70 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Tu compañera de inteligencia técnica en <span className="text-[#D4AF37]">{salonName}</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Descripción principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-8 mb-8 shadow-2xl"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#F5F5F2] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                AURI Stylist: Tu asistente técnica diaria
              </h3>
              <p className="text-[#F5F5F2]/80 leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                AURI es tu compañera inteligente diseñada para apoyarte en tu trabajo diario. 
                Te ofrece acceso instantáneo a bases de datos técnicas, formación continua y 
                herramientas para ofrecer el mejor servicio a tus clientas.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Consulta Técnica
                </span>
                <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Bases de Datos
                </span>
                <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Formación Continua
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Módulos principales para estilistas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Módulo 1: Diagnóstico */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
              <Lightbulb className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-semibold text-[#F5F5F2] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Diagnóstico Inteligente
            </h4>
            <p className="text-sm text-[#F5F5F2]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Análisis capilar, compatibilidad de productos y construcción de fórmulas en tiempo real.
            </p>
          </motion.div>

          {/* Módulo 2: Base de Datos de Color */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
              <Database className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-semibold text-[#F5F5F2] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Base de Datos: Color
            </h4>
            <p className="text-sm text-[#F5F5F2]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Consulta rápida de tonos, fórmulas, técnicas de coloración y compatibilidades.
            </p>
          </motion.div>

          {/* Módulo 3: Base de Datos de Corte */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
              <Database className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-semibold text-[#F5F5F2] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Base de Datos: Corte
            </h4>
            <p className="text-sm text-[#F5F5F2]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Referencias de estilos, técnicas de corte y guías paso a paso visuales.
            </p>
          </motion.div>

          {/* Módulo 4: Gestión de Clientas */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
              <Users className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-semibold text-[#F5F5F2] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Mis Clientas
            </h4>
            <p className="text-sm text-[#F5F5F2]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Portfolio personal, historial de trabajos y seguimiento de evolución de resultados.
            </p>
          </motion.div>

          {/* Módulo 5: Mentorship */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
              <BookOpen className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-semibold text-[#F5F5F2] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Formación & Mentoría
            </h4>
            <p className="text-sm text-[#F5F5F2]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Ruta de aprendizaje, certificaciones y progreso en técnicas avanzadas.
            </p>
          </motion.div>

          {/* Módulo 6: Chat con AURI */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/30 transition-colors">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h4 className="text-lg font-semibold text-[#D4AF37] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Chat con AURI
              </h4>
              <p className="text-sm text-[#F5F5F2]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Consulta técnica instantánea sobre productos, fórmulas y procedimientos.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Características especiales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-[#D4AF37]/10 to-[#B8974A]/10 border border-[#D4AF37]/30 rounded-2xl p-6 mb-8"
        >
          <h4 className="text-lg font-semibold text-[#F5F5F2] mb-4 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            Tu progreso profesional
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-[#D4AF37] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>∞</p>
              <p className="text-sm text-[#F5F5F2]/60" style={{ fontFamily: 'Inter, sans-serif' }}>Consultas técnicas</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#D4AF37] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>24/7</p>
              <p className="text-sm text-[#F5F5F2]/60" style={{ fontFamily: 'Inter, sans-serif' }}>Disponibilidad</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#D4AF37] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>100%</p>
              <p className="text-sm text-[#F5F5F2]/60" style={{ fontFamily: 'Inter, sans-serif' }}>Precisión técnica</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <button
            onClick={onComplete}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8974A] text-[#1A1A1A] rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300 hover:scale-105"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span>Comenzar con AURI</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-[#F5F5F2]/50 mt-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Tu compañera técnica está lista para asistirte
          </p>
        </motion.div>
      </div>
    </div>
  );
}
