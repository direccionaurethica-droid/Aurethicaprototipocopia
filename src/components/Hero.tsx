import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { UserPlus, LogIn, Crown } from "lucide-react";
import { motion } from "motion/react";
import { ProAccessModal } from "./ProAccessModal";
import newHeroBanner from "figma:asset/8cb24d5ac69c65fe97935e0493f7d27cd4fea4f9.png";

interface HeroProps {
  onStartTest?: () => void;
  onRegistration?: () => void;
  onLogin?: () => void;
  onSalonAccess?: () => void;
  onStylistAccess?: () => void;
}

export function Hero({ onStartTest, onRegistration, onLogin, onSalonAccess, onStylistAccess }: HeroProps) {
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const handleRegistrationClick = () => {
    if (onRegistration) {
      onRegistration();
    } else if (onStartTest) {
      onStartTest();
    }
  };

  const handleLoginClick = () => {
    if (onLogin) {
      onLogin();
    }
  };

  const handleProAccessClick = () => {
    setIsProModalOpen(true);
  };

  const handleSalonAccess = () => {
    setIsProModalOpen(false);
    if (onSalonAccess) {
      onSalonAccess();
    }
  };

  const handleStylistAccess = () => {
    setIsProModalOpen(false);
    if (onStylistAccess) {
      onStylistAccess();
    }
  };

  return (
    <section className="h-screen relative overflow-hidden snap-start" style={{ margin: 0, padding: 0 }}>
      {/* Nuevo banner cinematográfico de Auréthica */}
      <div className="absolute inset-0" style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}>
        {/* Capa de movimiento sutil y atmosférico */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={newHeroBanner}
            alt="Auréthica - Una belleza que ilumina sin excluir"
            className="w-full h-full object-cover block"
            style={{ display: 'block', margin: 0, padding: 0, verticalAlign: 'top', border: 'none', objectPosition: 'center center' }}
          />
        </motion.div>

        {/* Overlay de brillo dorado pulsante muy sutil */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
          }}
        />

        {/* Partículas de luz flotantes */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 1px, transparent 1px),
              radial-gradient(circle at 60% 70%, rgba(255, 45, 149, 0.1) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%'
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative z-10 h-screen">
        {/* Botón principal en la parte inferior */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-32 md:bottom-40 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-md px-6"
        >
          {/* Botón principal: Iniciar sesión */}
          <motion.button
            onClick={handleLoginClick}
            className="group relative overflow-hidden w-full"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative px-8 py-4 rounded-2xl bg-black/40 backdrop-blur-md border-2 border-[#D4AF37]/50 shadow-2xl transition-all duration-300 group-hover:bg-black/50 group-hover:border-[#D4AF37]/80 group-hover:shadow-[#D4AF37]/30">
              <div className="flex items-center justify-center gap-3">
                {/* Icono */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[#D4AF37]/50">
                  <LogIn className="w-5 h-5 text-black" />
                </div>
                
                {/* Texto principal */}
                <div className="flex flex-col items-start">
                  <span className="text-base text-white/95 font-medium tracking-wide drop-shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    INICIA SESIÓN
                  </span>
                  <span className="text-xs text-[#D4AF37] font-light drop-shadow-md" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Accede a tu perfil de belleza
                  </span>
                </div>
                
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-[#D4AF37] ml-auto"
                >
                  →
                </motion.span>
              </div>
              
              {/* Brillo chrome premium */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
              </motion.div>
            </div>
          </motion.button>
        </motion.div>

        {/* Botón Acceso Pro - Estilo más integrado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <motion.button
            onClick={handleProAccessClick}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-sm border border-[#D4AF37]/40 hover:border-[#D4AF37]/70 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:bg-black/40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Crown className="w-4 h-4 text-[#D4AF37] group-hover:text-[#FFD700] transition-colors" />
            <span 
              className="text-xs text-[#D4AF37] group-hover:text-[#FFD700] font-medium tracking-wide transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Acceso Pro
            </span>
            <motion.span
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[#D4AF37] group-hover:text-[#FFD700] text-xs transition-colors"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Modal de Acceso Pro */}
      <ProAccessModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onSalonAccess={handleSalonAccess}
        onStylistAccess={handleStylistAccess}
      />
    </section>
  );
}