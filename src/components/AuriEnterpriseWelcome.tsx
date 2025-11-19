/**
 * AuriEnterpriseWelcome - Presentación de AURI para Salones/Autónomos
 * Sistema de inteligencia técnica para gestión empresarial
 */

import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Users, Package, GraduationCap, BarChart3, ArrowRight } from 'lucide-react';

interface AuriEnterpriseWelcomeProps {
  businessName: string;
  businessType: 'salon' | 'autonomo';
  onComplete: () => void;
}

export function AuriEnterpriseWelcome({ businessName, businessType, onComplete }: AuriEnterpriseWelcomeProps) {
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
                Enterprise Intelligence
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-medium text-[#F5F5F2] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Bienvenido, <span className="text-[#D4AF37]">{businessName}</span>
            </h2>
            <p className="text-lg text-[#F5F5F2]/70 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Tu asistente de inteligencia técnica para gestión empresarial
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
                AURI Enterprise: Tu cerebro estratégico
              </h3>
              <p className="text-[#F5F5F2]/80 leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                AURI es tu sistema de inteligencia técnica diseñado específicamente para {businessType === 'salon' ? 'salones de belleza' : 'profesionales autónomos'}. 
                Combina análisis de negocio, gestión de equipos y formación técnica en una única plataforma luminosa y minimalista.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Marketing & Business
                </span>
                <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Recursos Humanos
                </span>
                <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Base de Datos Técnica
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Módulos principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Módulo 1: Dashboard de Equipo */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
              <Users className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-semibold text-[#F5F5F2] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Gestión de Equipo
            </h4>
            <p className="text-sm text-[#F5F5F2]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Visualiza el rendimiento de tu equipo, asigna tareas y coordina horarios de forma eficiente.
            </p>
          </motion.div>

          {/* Módulo 2: Stock & Supply */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
              <Package className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-semibold text-[#F5F5F2] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Inventario Inteligente
            </h4>
            <p className="text-sm text-[#F5F5F2]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Controla tu stock, predice consumos y mantén trazabilidad completa de productos.
            </p>
          </motion.div>

          {/* Módulo 3: Education Hub */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
              <GraduationCap className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-semibold text-[#F5F5F2] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Academia & Formación
            </h4>
            <p className="text-sm text-[#F5F5F2]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Cursos, progreso de certificaciones y base de datos completa de técnicas.
            </p>
          </motion.div>

          {/* Módulo 4: Analytics */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
              <BarChart3 className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-semibold text-[#F5F5F2] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Análisis & Métricas
            </h4>
            <p className="text-sm text-[#F5F5F2]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              KPIs, tendencias y visualización de datos para decisiones estratégicas.
            </p>
          </motion.div>

          {/* Módulo 5: Marketing */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
              <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-semibold text-[#F5F5F2] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Estrategia & Marketing
            </h4>
            <p className="text-sm text-[#F5F5F2]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Campañas, análisis de mercado y estrategias de crecimiento personalizadas.
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
                Consulta en tiempo real sobre gestión, RRHH y estrategias de negocio.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <button
            onClick={onComplete}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8974A] text-[#1A1A1A] rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300 hover:scale-105"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span>Acceder a AURI Enterprise</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-[#F5F5F2]/50 mt-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Sistema optimizado para {businessType === 'salon' ? 'gestión de salones' : 'profesionales autónomos'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
