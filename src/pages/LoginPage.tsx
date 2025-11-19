/**
 * LoginPage - Inicio de sesión premium
 * Diseño elegante estilo Zara
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { AccessibleInput } from '../components/AccessibleInput';
import { BackButton } from '../components/BackButton';
import { AurethicaSpinner } from '../components/AurethicaSpinner';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onBack: () => void;
  onRegister?: () => void;
}

export function LoginPage({ onLogin, onBack, onRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Validar email
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar contraseña
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simular petición
    setTimeout(() => {
      onLogin(email, password);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-black flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-md">
        {/* Botón atrás */}
        <div className="mb-8">
          <BackButton onClick={onBack} label="Volver" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 
            className="text-4xl text-[#D4AF37] mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Bienvenido de nuevo
          </h1>
          <p className="text-[#E8E6E3] text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Inicia sesión para continuar tu experiencia personalizada
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Email */}
          <div>
            <label 
              htmlFor="email"
              className="block text-sm font-medium text-[#E8E6E3] mb-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A24F]" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={`
                  w-full pl-12 pr-4 py-3.5 rounded-xl
                  border-2 transition-all duration-200
                  bg-[#0a0a0a] text-[#E8E6E3]
                  ${errors.email 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                  }
                  focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10
                  placeholder:text-[#6E7276]
                `}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                placeholder="tu@email.com"
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-2"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label 
              htmlFor="password"
              className="block text-sm font-medium text-[#E8E6E3] mb-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A24F]" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                className={`
                  w-full pl-12 pr-12 py-3.5 rounded-xl
                  border-2 transition-all duration-200
                  bg-[#0a0a0a] text-[#E8E6E3]
                  ${errors.password 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                  }
                  focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10
                  placeholder:text-[#6E7276]
                `}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A24F] hover:text-[#D4AF37] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-2"
              >
                {errors.password}
              </motion.p>
            )}
          </div>

          {/* Olvidé mi contraseña */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-[#C9A24F] hover:text-[#D4AF37] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Botón submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-4 rounded-xl
              bg-gradient-to-r from-[#D4AF37] to-[#C9A24F]
              text-black font-medium
              shadow-lg hover:shadow-xl
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-3
              hover:from-[#E8C76A] hover:to-[#D4AF37]
            `}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            whileHover={!isSubmitting ? { scale: 1.01, y: -1 } : {}}
            whileTap={!isSubmitting ? { scale: 0.99 } : {}}
          >
            {isSubmitting ? (
              <>
                <AurethicaSpinner className="w-5 h-5" />
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Iniciar sesión</span>
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#D4AF37]/20" />
          <span className="text-sm text-[#E8E6E3]">o</span>
          <div className="flex-1 h-px bg-[#D4AF37]/20" />
        </div>

        {/* Link a registro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-[#E8E6E3]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => onRegister ? onRegister() : onBack()}
              className="text-[#D4AF37] font-medium hover:text-[#FF2D95] transition-colors"
            >
              Regístrate aquí
            </button>
          </p>
        </motion.div>

        {/* Usuarios de prueba */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 rounded-xl bg-[#0a0a0a] border border-[#D4AF37]/30"
        >
          <p className="text-xs text-[#C9A24F] mb-2 font-medium">
            Usuario de prueba:
          </p>
          <p className="text-xs text-[#E8E6E3] font-mono">
            Email: ana.martinez@example.com<br />
            Contraseña: 123456
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}