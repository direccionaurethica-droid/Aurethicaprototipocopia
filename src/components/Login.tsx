import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { AccessibleInput } from './AccessibleInput';
import { BackButton } from './BackButton';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin?: (email: string, password: string) => void;
  onBack?: () => void;
  onForgotPassword?: () => void;
}

export function Login({ onLogin, onBack, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);

    if (onLogin) {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efecto de fondo animado */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, #D4AF37 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, #D4AF37 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, #D4AF37 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Botón de volver */}
      {onBack && (
        <div className="absolute top-6 left-6 z-10">
          <BackButton onClick={onBack} />
        </div>
      )}

      {/* Formulario */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 
            className="text-[#D4AF37] mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Bienvenida de nuevo
          </h1>
          <p className="text-[#A8A6A3] text-sm">
            Inicia sesión para acceder a tu cuenta
          </p>
        </motion.div>

        {/* Card del formulario */}
        <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-lg p-8 relative overflow-hidden">
          {/* Brillo de fondo sutil */}
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none"
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

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Campo Email */}
            <div>
              <label className="block text-[#E8E6E3] mb-2 text-sm">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                <AccessibleInput
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="tu@email.com"
                  className="pl-11 bg-[#1a1a1a] border-[#D4AF37]/20 text-[#E8E6E3] placeholder:text-[#A8A6A3]/40"
                  error={errors.email}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-[#FF6F61] text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-[#E8E6E3] mb-2 text-sm">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                <AccessibleInput
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  placeholder="••••••••"
                  className="pl-11 pr-11 bg-[#1a1a1a] border-[#D4AF37]/20 text-[#E8E6E3] placeholder:text-[#A8A6A3]/40"
                  error={errors.password}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#FF6F61] text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Olvidé mi contraseña */}
            <div className="text-right">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-[#D4AF37] text-sm hover:underline transition-all"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Botón de login */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gap-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <LogIn className="w-5 h-5" />
                  </motion.div>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Iniciar sesión
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Link registro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-[#A8A6A3] text-sm mt-6"
        >
          ¿No tienes cuenta?{' '}
          <button 
            onClick={onBack}
            className="text-[#D4AF37] hover:underline transition-all"
          >
            Regístrate aquí
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
