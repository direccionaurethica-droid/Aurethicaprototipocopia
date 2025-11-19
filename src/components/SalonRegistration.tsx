/**
 * SalonRegistration - Formulario de registro para Salones y Autónomos
 * Incluye datos fiscales y de negocio
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, MapPin, FileText, Mail, Phone, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';

export interface SalonRegistrationData {
  // Datos del negocio
  businessName: string;
  businessType: 'salon' | 'autonomo';
  
  // Datos fiscales
  taxId: string; // CIF/NIF
  fiscalAddress: string;
  city: string;
  postalCode: string;
  country: string;
  
  // Datos de contacto
  email: string;
  phone: string;
  website?: string;
  
  // Datos del responsable
  ownerName: string;
  ownerLastName: string;
  
  // Credenciales
  password: string;
  confirmPassword: string;
  
  // Términos
  acceptTerms: boolean;
}

interface SalonRegistrationProps {
  onComplete: (data: SalonRegistrationData) => void;
  onBack: () => void;
}

export function SalonRegistration({ onComplete, onBack }: SalonRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SalonRegistrationData>>({
    businessType: 'salon',
    country: 'España',
  });

  const updateField = (field: keyof SalonRegistrationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
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
    onComplete(formData as SalonRegistrationData);
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#013220] to-[#0a4a30] flex items-center justify-center shadow-xl">
            <Building2 className="w-10 h-10 text-[#C9A24F]" />
          </div>
          <h1
            className="text-[#013220] mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Registro Profesional
          </h1>
          <p
            className="text-[#6E7276]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {formData.businessType === 'salon' ? 'Salón de Belleza' : 'Profesional Autónomo'}
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
          {/* Step 1: Tipo de negocio y datos básicos */}
          {step === 1 && (
            <div className="space-y-6">
              <h3
                className="text-[#013220] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Datos del Negocio
              </h3>

              {/* Tipo de negocio */}
              <div>
                <label className="block text-sm text-[#6E7276] mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Tipo de negocio
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'salon', label: 'Salón de Belleza', icon: Building2 },
                    { value: 'autonomo', label: 'Profesional Autónomo', icon: User },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateField('businessType', option.value)}
                      className={`p-4 rounded-xl border-2 backdrop-blur-md transition-all duration-300 ${
                        formData.businessType === option.value
                          ? 'border-[#013220]/30 bg-[#013220]/10'
                          : 'border-[#013220]/10 bg-white/40 hover:border-[#013220]/20 hover:bg-[#013220]/5'
                      }`}
                    >
                      <option.icon className={`w-6 h-6 mx-auto mb-2 ${
                        formData.businessType === option.value ? 'text-[#013220]' : 'text-gray-400'
                      }`} />
                      <span className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nombre del negocio */}
              <div>
                <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Nombre del {formData.businessType === 'salon' ? 'Salón' : 'Negocio'}
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.businessName || ''}
                    onChange={e => updateField('businessName', e.target.value)}
                    placeholder="Ej: Salón Auréthica"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>

              {/* Nombre del responsable */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Nombre del responsable
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName || ''}
                    onChange={e => updateField('ownerName', e.target.value)}
                    placeholder="Nombre"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Apellidos
                  </label>
                  <input
                    type="text"
                    value={formData.ownerLastName || ''}
                    onChange={e => updateField('ownerLastName', e.target.value)}
                    placeholder="Apellidos"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Datos fiscales */}
          {step === 2 && (
            <div className="space-y-6">
              <h3
                className="text-[#013220] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Datos Fiscales
              </h3>

              {/* CIF/NIF */}
              <div>
                <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  CIF / NIF
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.taxId || ''}
                    onChange={e => updateField('taxId', e.target.value)}
                    placeholder="B12345678"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>

              {/* Dirección fiscal */}
              <div>
                <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Dirección fiscal
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fiscalAddress || ''}
                    onChange={e => updateField('fiscalAddress', e.target.value)}
                    placeholder="Calle, número, piso"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>

              {/* Ciudad y código postal */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={e => updateField('city', e.target.value)}
                    placeholder="Madrid"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Código Postal
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode || ''}
                    onChange={e => updateField('postalCode', e.target.value)}
                    placeholder="28001"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A24F] focus:ring-2 focus:ring-[#C9A24F]/20 outline-none transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contacto y credenciales */}
          {step === 3 && (
            <div className="space-y-6">
              <h3
                className="text-[#013220] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Contacto y Acceso
              </h3>

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
                    placeholder="salon@example.com"
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

              {/* Contraseña */}
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm text-[#6E7276] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Confirmar
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
              </div>

              {/* Términos */}
              <div className="flex items-start gap-3 p-4 bg-[#F5F2E9] rounded-xl">
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
                className="flex items-center gap-2 px-8 py-3 bg-[#013220]/20 backdrop-blur-md border-2 border-[#013220]/30 text-[#013220] rounded-xl hover:bg-[#013220]/30 hover:shadow-lg transition-all"
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