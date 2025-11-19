/**
 * StylistRegistration - Formulario de registro para Estilistas
 * Se asocian a un salón existente mediante código
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Scissors, User, Mail, Phone, Lock, Building2, Award, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export interface StylistRegistrationData {
  // Datos personales
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Datos profesionales
  salonCode: string; // Código para asociarse al salón
  experience: string; // años de experiencia
  specializations: string[]; // especialidades
  
  // Credenciales
  password: string;
  confirmPassword: string;
  
  // Términos
  acceptTerms: boolean;
}

interface StylistRegistrationProps {
  onComplete: (data: StylistRegistrationData) => void;
  onBack: () => void;
}

const SPECIALIZATIONS = [
  'Corte',
  'Color',
  'Balayage',
  'Mechas',
  'Peinados',
  'Tratamientos',
  'Extensiones',
  'Maquillaje',
];

const EXPERIENCE_LEVELS = [
  { value: '0-2', label: 'Menos de 2 años' },
  { value: '2-5', label: '2-5 años' },
  { value: '5-10', label: '5-10 años' },
  { value: '10+', label: 'Más de 10 años' },
];

export function StylistRegistration({ onComplete, onBack }: StylistRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<StylistRegistrationData>>({
    specializations: [],
  });
  const [salonVerified, setSalonVerified] = useState(false);

  const updateField = (field: keyof StylistRegistrationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSpecialization = (spec: string) => {
    const current = formData.specializations || [];
    if (current.includes(spec)) {
      updateField('specializations', current.filter(s => s !== spec));
    } else {
      updateField('specializations', [...current, spec]);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleVerifySalon = () => {
    // Simular verificación de código de salón
    if (formData.salonCode && formData.salonCode.length >= 6) {
      setSalonVerified(true);
      setTimeout(() => {
        alert('✓ Código verificado: Salón Auréthica - Madrid');
      }, 500);
    } else {
      alert('⚠ Código inválido. Pide el código a tu salón.');
    }
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!formData.acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    if (!salonVerified) {
      alert('Debes verificar el código de tu salón');
      return;
    }
    onComplete(formData as StylistRegistrationData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d4e9dc] to-[#e8f4ed] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#C9A24F] to-[#d4b366] flex items-center justify-center shadow-xl">
            <Scissors className="w-10 h-10 text-white" />
          </div>
          <h1
            className="text-[#013220] mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Registro Estilista
          </h1>
          <p
            className="text-[#6E7276]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Únete a tu salón en Auréthica
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map(num => (
            <div
              key={num}
              className={`h-2 rounded-full transition-all duration-300 ${
                num === step ? 'w-12 bg-[#C9A24F]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Form */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          {/* Step 1: Datos personales */}
          {step === 1 && (
            <div className="space-y-6">
              <h3
                className="text-[#013220] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Datos Personales
              </h3>

              {/* Nombre */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Nombre
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.firstName || ''}
                      onChange={e => updateField('firstName', e.target.value)}
                      placeholder="María"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Apellidos
                  </label>
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={e => updateField('lastName', e.target.value)}
                    placeholder="García López"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={e => updateField('email', e.target.value)}
                    placeholder="maria@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={e => updateField('phone', e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Código de salón y experiencia */}
          {step === 2 && (
            <div className="space-y-6">
              <h3
                className="text-[#013220] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Datos Profesionales
              </h3>

              {/* Código de salón */}
              <div>
                <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Código de Salón
                </label>
                <p className="text-xs text-[#6E7276] mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Solicita este código al responsable de tu salón
                </p>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.salonCode || ''}
                      onChange={e => updateField('salonCode', e.target.value.toUpperCase())}
                      placeholder="SALON123"
                      disabled={salonVerified}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${
                        salonVerified
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20'
                      } outline-none`}
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                    {salonVerified && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {!salonVerified && (
                    <button
                      onClick={handleVerifySalon}
                      className="px-6 py-3 bg-[#C9A24F]/20 backdrop-blur-md border-2 border-[#C9A24F]/30 text-[#013220] rounded-xl hover:bg-[#C9A24F]/30 hover:shadow-lg transition-all whitespace-nowrap"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Verificar
                    </button>
                  )}
                </div>
                {salonVerified && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-sm text-green-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      ✓ Salón verificado: <span className="font-medium">Salón Auréthica - Madrid</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Experiencia */}
              <div>
                <label className="block text-sm text-[#6E7276] mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Años de experiencia
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {EXPERIENCE_LEVELS.map(level => (
                    <button
                      key={level.value}
                      onClick={() => updateField('experience', level.value)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                        formData.experience === level.value
                          ? 'border-[#C9A24F] bg-[#C9A24F]/5'
                          : 'border-gray-200 hover:border-[#C9A24F]/50'
                      }`}
                    >
                      <Award className={`w-5 h-5 mx-auto mb-1 ${
                        formData.experience === level.value ? 'text-[#C9A24F]' : 'text-gray-400'
                      }`} />
                      <span className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {level.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Especializaciones */}
              <div>
                <label className="block text-sm text-[#6E7276] mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Especialidades (selecciona todas las que apliquen)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SPECIALIZATIONS.map(spec => (
                    <button
                      key={spec}
                      onClick={() => toggleSpecialization(spec)}
                      className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                        formData.specializations?.includes(spec)
                          ? 'border-[#C9A24F] bg-[#C9A24F] text-white'
                          : 'border-gray-200 text-gray-600 hover:border-[#C9A24F]/50'
                      }`}
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <span className="text-xs">{spec}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Credenciales */}
          {step === 3 && (
            <div className="space-y-6">
              <h3
                className="text-[#013220] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Seguridad
              </h3>

              {/* Contraseña */}
              <div>
                <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password || ''}
                    onChange={e => updateField('password', e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>

              {/* Confirmar contraseña */}
              <div>
                <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword || ''}
                    onChange={e => updateField('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>

              {/* Resumen */}
              <div className="p-6 bg-[#F5F2E9] rounded-2xl space-y-3">
                <h4 className="text-sm font-medium text-[#013220] mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Resumen de tu perfil
                </h4>
                <div className="space-y-2 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <div className="flex justify-between">
                    <span className="text-[#6E7276]">Nombre:</span>
                    <span className="text-[#013220] font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E7276]">Email:</span>
                    <span className="text-[#013220]">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E7276]">Experiencia:</span>
                    <span className="text-[#013220]">
                      {EXPERIENCE_LEVELS.find(l => l.value === formData.experience)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E7276]">Especialidades:</span>
                    <span className="text-[#013220]">{formData.specializations?.length || 0} seleccionadas</span>
                  </div>
                </div>
              </div>

              {/* Términos */}
              <div className="flex items-start gap-3 p-4 bg-white border-2 border-[#C9A24F]/20 rounded-xl">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms || false}
                  onChange={e => updateField('acceptTerms', e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#C9A24F] focus:ring-[#C9A24F]"
                />
                <label className="text-sm text-[#6E7276]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Acepto los términos y condiciones y la política de privacidad de Auréthica
                </label>
              </div>
            </div>
          )}

          {/* Botones de navegación */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={step === 1 ? onBack : handlePrevious}
              className="flex items-center gap-2 px-6 py-3 text-[#6E7276] hover:text-[#013220] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-[#C9A24F]/20 backdrop-blur-md border-2 border-[#C9A24F]/30 text-[#013220] rounded-xl hover:bg-[#C9A24F]/30 hover:shadow-lg transition-all"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-[#C9A24F]/20 backdrop-blur-md border-2 border-[#C9A24F]/30 text-[#013220] rounded-xl hover:bg-[#C9A24F]/30 hover:shadow-lg transition-all"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Completar Registro
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}