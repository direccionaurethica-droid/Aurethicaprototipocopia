import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { LegalTerms } from './LegalTerms';
import { AccessibleInput } from './AccessibleInput';
import { BackButton } from './BackButton';
import { AurethicaSpinner } from './AurethicaSpinner';
import { UserPlus, Mail, Phone, User, CheckCircle2, Check } from 'lucide-react';

interface RegistrationFormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  acceptTerms: boolean;
  acceptNewsletter: boolean;
}

interface RegistrationProps {
  onComplete?: (data: { 
    nombre: string; 
    apellido: string;
    email: string; 
    telefono: string;
    aceptaTerminos: boolean;
    aceptaNewsletter: boolean;
  }) => void;
  onBack?: () => void;
}

export function Registration({ onComplete, onBack }: RegistrationProps = {}) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    acceptTerms: false,
    acceptNewsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [showLegalTerms, setShowLegalTerms] = useState(false);

  const handleInputChange = (field: keyof RegistrationFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
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

    // Simular registro y envío de email de verificación
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Datos de registro:', formData);
    console.log('Email de verificación enviado a:', formData.email);
    
    setIsSubmitting(false);
    setIsSuccess(true);

    // Llamar a onComplete con los datos del registro
    if (onComplete) {
      onComplete({ 
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email, 
        telefono: formData.telefono,
        aceptaTerminos: formData.acceptTerms,
        aceptaNewsletter: formData.acceptNewsletter,
      });
    }
  };

  return (
    <section id="registration-section" className="min-h-screen py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-black relative overflow-hidden">
      {/* Efectos de fondo decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        
        {/* Círculo dorado difuso */}
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Partículas flotantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#D4AF37]"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Botón de atrás */}
        {onBack && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 md:mb-10"
          >
            <BackButton onClick={onBack} />
          </motion.div>
        )}
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 relative"
            style={{
              background: 'linear-gradient(135deg, #FF2D95 0%, #C9A24F 100%)',
              boxShadow: '0 10px 40px rgba(255, 45, 149, 0.3), 0 0 60px rgba(201, 162, 79, 0.2)'
            }}
          >
            <UserPlus className="w-10 h-10 text-white" />
            
            {/* Anillo pulsante */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: 'rgba(255, 45, 149, 0.4)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 0, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.div>

          <h1 
            className="text-5xl md:text-6xl lg:text-7xl text-[#D4AF37] mb-4" 
            style={{ 
              fontFamily: 'Playfair Display, serif',
              textShadow: '0 0 40px rgba(212, 175, 55, 0.3)'
            }}
          >
            Únete a Auréthica
          </h1>
          
          {/* Línea decorativa */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '150px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-[#FF2D95] to-transparent mx-auto mt-6"
          />
        </motion.div>

        {/* Formulario */}
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Card 
                className="p-6 md:p-10 lg:p-12 border-2 border-[#D4AF37]/20 shadow-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Brillo sutil en el borde */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, transparent 50%, rgba(255, 45, 149, 0.05) 100%)',
                  }}
                />

                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                  
                  {/* Grid de 2 columnas para Nombre y Apellido en desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Nombre */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <AccessibleInput
                        id="nombre"
                        label="Nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        placeholder="Tu nombre"
                        leftIcon={<User className="w-4 h-4" />}
                        error={errors.nombre}
                        required
                      />
                    </motion.div>

                    {/* Apellido */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                    >
                      <AccessibleInput
                        id="apellido"
                        label="Apellido"
                        type="text"
                        value={formData.apellido}
                        onChange={(e) => handleInputChange('apellido', e.target.value)}
                        placeholder="Tu apellido"
                        leftIcon={<User className="w-4 h-4" />}
                        error={errors.apellido}
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <AccessibleInput
                      id="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="tu@email.com"
                      leftIcon={<Mail className="w-4 h-4" />}
                      error={errors.email}
                      required
                    />
                  </motion.div>

                  {/* Teléfono */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                  >
                    <AccessibleInput
                      id="telefono"
                      label="Teléfono"
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      placeholder="+34 600 000 000"
                      leftIcon={<Phone className="w-4 h-4" />}
                      hint="Opcional - Para comunicaciones importantes"
                    />
                  </motion.div>

                  {/* Separador visual */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.38 }}
                    className="relative py-4"
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
                    </div>
                  </motion.div>

                  {/* Términos y condiciones */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="space-y-4"
                  >
                    <div 
                      className={`relative flex items-start gap-4 p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none ${
                        formData.acceptTerms 
                          ? 'bg-[#FF2D95]/10 border-[#FF2D95] shadow-lg shadow-[#FF2D95]/20' 
                          : errors.acceptTerms 
                            ? 'bg-red-500/5 border-red-500 shadow-sm animate-pulse'
                            : 'bg-[#0a0a0a] border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:shadow-md'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleInputChange('acceptTerms', !formData.acceptTerms);
                      }}
                    >
                      {/* Checkbox Visual Premium */}
                      <div 
                        className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                          formData.acceptTerms
                            ? 'bg-[#FF2D95] border-[#FF2D95] scale-100'
                            : 'bg-transparent border-[#D4AF37] scale-95 hover:scale-100 hover:border-[#D4AF37]'
                        }`}
                        style={{
                          boxShadow: formData.acceptTerms ? '0 4px 15px rgba(255, 45, 149, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)' : 'inset 0 1px 2px rgba(212, 175, 55, 0.1)'
                        }}
                      >
                        <Check 
                          className={`w-5 h-5 text-white transition-all duration-200 ${
                            formData.acceptTerms ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                          }`}
                          strokeWidth={3}
                        />
                      </div>
                      
                      <div className="flex-1 pt-0.5">
                        <p className="text-sm md:text-base text-[#E8E6E3] leading-relaxed">
                          Acepto los{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowLegalTerms(true);
                            }}
                            className="text-[#FF2D95] hover:text-[#D4AF37] underline underline-offset-2 transition-colors duration-200 font-medium"
                          >
                            Términos y Condiciones
                          </button>
                          {' '}de Auréthica <span className="text-[#FF2D95] font-semibold">*</span>
                        </p>
                      </div>
                    </div>
                    
                    {errors.acceptTerms && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg"
                      >
                        <p className="text-sm text-red-400 flex items-center gap-2">
                          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span>{errors.acceptTerms}</span>
                        </p>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Newsletter */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.45 }}
                  >
                    <div 
                      className={`relative flex items-start gap-4 p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none ${
                        formData.acceptNewsletter
                          ? 'bg-gradient-to-r from-[#D4AF37]/10 to-[#FF2D95]/5 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                          : 'bg-gradient-to-r from-[#FF2D95]/5 to-[#D4AF37]/5 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:shadow-md'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleInputChange('acceptNewsletter', !formData.acceptNewsletter);
                      }}
                    >
                      {/* Checkbox Visual Premium */}
                      <div 
                        className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                          formData.acceptNewsletter
                            ? 'bg-[#D4AF37] border-[#D4AF37] scale-100'
                            : 'bg-transparent border-[#D4AF37] scale-95 hover:scale-100'
                        }`}
                        style={{
                          boxShadow: formData.acceptNewsletter ? '0 4px 15px rgba(212, 175, 55, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)' : 'inset 0 1px 2px rgba(212, 175, 55, 0.1)'
                        }}
                      >
                        <Check 
                          className={`w-5 h-5 text-black transition-all duration-200 ${
                            formData.acceptNewsletter ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                          }`}
                          strokeWidth={3}
                        />
                      </div>
                      
                      <div className="flex-1 pt-0.5">
                        <p className="text-sm md:text-base text-[#E8E6E3] leading-relaxed">
                          Quiero recibir novedades, tendencias y contenido exclusivo de Auréthica
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Botón submit */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="pt-4"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full h-16 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, #FF2D95 0%, #C9A24F 100%)',
                        boxShadow: '0 10px 40px rgba(255, 45, 149, 0.3), 0 0 60px rgba(201, 162, 79, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      {/* Capa de brillo hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(201, 162, 79, 0.3) 100%)',
                        }}
                      />
                      
                      {/* Reflejo metálico animado */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        style={{
                          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                          backgroundSize: '200% 100%',
                        }}
                      />

                      {/* Contenido del botón */}
                      <div className="relative flex items-center justify-center gap-3 text-white font-semibold text-lg">
                        {isSubmitting ? (
                          <>
                            <AurethicaSpinner className="w-6 h-6" variant="spinner" />
                            <span style={{ fontFamily: 'Montserrat, sans-serif' }}>Creando tu perfil...</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-6 h-6" />
                            <span style={{ fontFamily: 'Montserrat, sans-serif' }}>Continuar</span>
                          </>
                        )}
                      </div>

                      {/* Borde cromado */}
                      <div 
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.5), inset 0 -1px 2px rgba(0, 0, 0, 0.3)',
                        }}
                      />
                    </button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-8 relative"
                style={{
                  background: 'linear-gradient(135deg, #FF2D95 0%, #C9A24F 100%)',
                  boxShadow: '0 15px 50px rgba(255, 45, 149, 0.4), 0 0 80px rgba(201, 162, 79, 0.3)'
                }}
              >
                <CheckCircle2 className="w-14 h-14 text-white" />
                
                {/* Anillos pulsantes */}
                {[0, 1].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      borderColor: i === 0 ? 'rgba(255, 45, 149, 0.4)' : 'rgba(212, 175, 55, 0.4)',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.5
                    }}
                  />
                ))}
              </motion.div>

              <h2 
                className="text-4xl md:text-5xl text-[#D4AF37] mb-6" 
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  textShadow: '0 0 40px rgba(212, 175, 55, 0.3)'
                }}
              >
                ¡Bienvenida!
              </h2>
              
              {/* Línea decorativa */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-0.5 bg-gradient-to-r from-transparent via-[#FF2D95] to-transparent mx-auto mb-6"
              />
              
              <p 
                className="text-xl text-[#A0A0A0]"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Tu perfil está siendo creado...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de términos legales */}
        {showLegalTerms && (
          <LegalTerms onClose={() => setShowLegalTerms(false)} />
        )}
      </div>
    </section>
  );
}