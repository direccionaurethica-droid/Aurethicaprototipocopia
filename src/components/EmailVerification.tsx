import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Mail, CheckCircle2, RefreshCw } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onVerified?: () => void;
}

export function EmailVerification({ email, onVerified }: EmailVerificationProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    setIsResending(true);
    
    // Simular envío de email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsResending(false);
    setResendCooldown(60); // 60 segundos de cooldown
    
    console.log('Email de verificación reenviado a:', email);
  };

  // Simular verificación automática después de 5 segundos (para demo)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onVerified) {
        onVerified();
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onVerified]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Card principal */}
        <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-lg p-8 text-center relative overflow-hidden">
          {/* Efecto de brillo de fondo */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                'radial-gradient(circle at 30% 30%, #D4AF37 0%, transparent 70%)',
                'radial-gradient(circle at 70% 70%, #D4AF37 0%, transparent 70%)',
                'radial-gradient(circle at 30% 30%, #D4AF37 0%, transparent 70%)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Contenido */}
          <div className="relative z-10">
            {/* Icono animado */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[#D4AF37]/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Mail className="w-10 h-10 text-[#D4AF37]" />
              </div>
            </motion.div>

            {/* Título */}
            <h2 
              className="text-[#E8E6E3] mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Verifica tu email
            </h2>

            {/* Descripción */}
            <p className="text-[#A8A6A3] mb-2 text-sm">
              Hemos enviado un correo de verificación a:
            </p>
            <p className="text-[#D4AF37] mb-6 break-all">
              {email}
            </p>

            {/* Instrucciones */}
            <div className="bg-[#1a1a1a] border border-[#D4AF37]/10 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <p className="text-[#E8E6E3] text-sm">
                  Revisa tu bandeja de entrada y haz clic en el enlace de verificación
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <p className="text-[#E8E6E3] text-sm">
                  Si no lo encuentras, revisa tu carpeta de spam
                </p>
              </div>
            </div>

            {/* Botón reenviar */}
            <Button
              onClick={handleResendEmail}
              disabled={isResending || resendCooldown > 0}
              variant="outline"
              className="w-full gap-2"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Reenviando...
                </>
              ) : resendCooldown > 0 ? (
                <>Reenviar en {resendCooldown}s</>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Reenviar correo de verificación
                </>
              )}
            </Button>

            {/* Nota adicional */}
            <p className="text-[#A8A6A3] text-xs mt-6">
              Una vez verificado, serás redirigido automáticamente al inicio de sesión
            </p>
          </div>
        </div>

        {/* Mensaje de ayuda */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-[#A8A6A3] text-sm mt-6"
        >
          ¿Problemas con la verificación?{' '}
          <button className="text-[#D4AF37] hover:underline">
            Contacta con soporte
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
