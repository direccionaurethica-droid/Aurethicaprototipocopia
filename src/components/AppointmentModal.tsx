/**
 * AppointmentModal - Modal profesional para agendar, editar y gestionar citas
 * Funcionalidad completa para todos los roles
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Scissors, MapPin, CreditCard, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Select } from './ui/select';
import type { UserRole } from '../lib/types';
import { toast } from './PremiumToast';
import { StyleCatalog } from './StyleCatalog';

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
}

interface Stylist {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit' | 'reschedule';
  userRole: UserRole;
  appointmentData?: any;
  onConfirm?: (data: any) => void;
}

export function AppointmentModal({ 
  isOpen, 
  onClose, 
  mode, 
  userRole,
  appointmentData,
  onConfirm 
}: AppointmentModalProps) {
  const [step, setStep] = useState<'date' | 'service' | 'stylist' | 'time' | 'confirm'>(
    mode === 'reschedule' ? 'date' : 'service'
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [showStyleCatalog, setShowStyleCatalog] = useState(false);

  // Mock data
  const services: Service[] = [
    {
      id: '1',
      name: 'Balayage + Corte',
      duration: '2h 30min',
      price: '145€',
      description: 'Técnica de iluminación natural con corte personalizado'
    },
    {
      id: '2',
      name: 'Corte y Peinado',
      duration: '1h 15min',
      price: '65€',
      description: 'Corte de cabello profesional con peinado de salón'
    },
    {
      id: '3',
      name: 'Tinte Completo',
      duration: '2h',
      price: '120€',
      description: 'Coloración completa con tratamiento acondicionador'
    },
    {
      id: '4',
      name: 'Manicura + Pedicura',
      duration: '1h 30min',
      price: '55€',
      description: 'Cuidado completo de manos y pies'
    },
    {
      id: '5',
      name: 'Tratamiento Capilar',
      duration: '1h',
      price: '45€',
      description: 'Tratamiento hidratante y reparador profundo'
    }
  ];

  const stylists: Stylist[] = [
    {
      id: '1',
      name: 'Marta López',
      specialty: 'Coloración y Balayage',
      avatar: '👩‍🦰',
      rating: 4.9
    },
    {
      id: '2',
      name: 'Carlos Ruiz',
      specialty: 'Corte y Estilismo',
      avatar: '👨‍🦱',
      rating: 4.8
    },
    {
      id: '3',
      name: 'Laura Sánchez',
      specialty: 'Tratamientos y Manicura',
      avatar: '👩‍🦱',
      rating: 4.9
    },
    {
      id: '4',
      name: 'Ana García',
      specialty: 'Coloración Avanzada',
      avatar: '👩',
      rating: 5.0
    }
  ];

  const timeSlots: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '12:00', available: true },
    { time: '13:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
    { time: '17:00', available: true },
    { time: '18:00', available: false },
    { time: '19:00', available: true },
    { time: '20:00', available: true }
  ];

  const handleNext = () => {
    const steps: ('date' | 'service' | 'stylist' | 'time' | 'confirm')[] = ['service', 'stylist', 'date', 'time', 'confirm'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: ('date' | 'service' | 'stylist' | 'time' | 'confirm')[] = ['service', 'stylist', 'date', 'time', 'confirm'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleConfirm = () => {
    const appointmentData = {
      date: selectedDate,
      service: selectedService,
      stylist: selectedStylist,
      time: selectedTime,
      notes: notes
    };

    onConfirm?.(appointmentData);
    
    toast.success('¡Cita agendada con éxito!', {
      description: `${selectedService?.name} con ${selectedStylist?.name} el ${selectedDate?.toLocaleDateString('es-ES')} a las ${selectedTime}`,
      duration: 5000
    });

    onClose();
  };

  const canProceed = () => {
    switch (step) {
      case 'service':
        return selectedService !== null;
      case 'stylist':
        return selectedStylist !== null;
      case 'date':
        return selectedDate !== undefined;
      case 'time':
        return selectedTime !== '';
      case 'confirm':
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Style Catalog Modal */}
      <StyleCatalog
        isOpen={showStyleCatalog}
        onClose={() => setShowStyleCatalog(false)}
        onSelectStyle={(style) => {
          // Crear servicio basado en el estilo seleccionado
          const newService: Service = {
            id: `style-${style.id}`,
            name: style.name,
            duration: style.duration,
            price: style.price,
            description: style.description
          };
          setSelectedService(newService);
          setShowStyleCatalog(false);
        }}
      />

      {/* Appointment Modal */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#013220] to-[#0a4a30] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {mode === 'create' && 'Agendar Nueva Cita'}
                  {mode === 'edit' && 'Editar Cita'}
                  {mode === 'reschedule' && 'Reprogramar Cita'}
                </h2>
                <p className="text-[#C9A24F] text-sm">
                  Paso {['service', 'stylist', 'date', 'time', 'confirm'].indexOf(step) + 1} de 5
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF2D95] to-[#C9A24F]"
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${(['service', 'stylist', 'date', 'time', 'confirm'].indexOf(step) + 1) * 20}%` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              <AnimatePresence mode="wait">
                {/* Step 1: Seleccionar Servicio */}
                {step === 'service' && (
                  <motion.div
                    key="service"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                        ¿Qué servicio deseas?
                      </h3>
                      <Button
                        onClick={() => setShowStyleCatalog(true)}
                        className="bg-gradient-to-r from-[#D4AF37] to-[#C9A24F] text-black hover:from-[#E8C76A] hover:to-[#D4AF37] flex items-center gap-2"
                        size="sm"
                      >
                        <Sparkles className="w-4 h-4" />
                        Catálogo de Estilos
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <motion.div
                          key={service.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`p-5 cursor-pointer transition-all duration-300 ${
                              selectedService?.id === service.id
                                ? 'border-2 border-[#FF2D95] bg-[#FF2D95]/5 shadow-lg'
                                : 'border-2 border-gray-200 hover:border-[#C9A24F] hover:shadow-md'
                            }`}
                            onClick={() => setSelectedService(service)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#C9A24F] to-[#FF2D95] flex items-center justify-center">
                                  <Scissors className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-[#101418]">{service.name}</h4>
                                  <p className="text-sm text-[#6E7276]">{service.duration}</p>
                                </div>
                              </div>
                              {selectedService?.id === service.id && (
                                <CheckCircle className="w-6 h-6 text-[#FF2D95]" />
                              )}
                            </div>
                            <p className="text-sm text-[#6E7276] mb-3">{service.description}</p>
                            <p className="text-xl text-[#013220]">{service.price}</p>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Seleccionar Estilista */}
                {step === 'stylist' && (
                  <motion.div
                    key="stylist"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl mb-6 text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Elige tu estilista
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {stylists.map((stylist) => (
                        <motion.div
                          key={stylist.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`p-5 cursor-pointer transition-all duration-300 ${
                              selectedStylist?.id === stylist.id
                                ? 'border-2 border-[#FF2D95] bg-[#FF2D95]/5 shadow-lg'
                                : 'border-2 border-gray-200 hover:border-[#C9A24F] hover:shadow-md'
                            }`}
                            onClick={() => setSelectedStylist(stylist)}
                          >
                            <div className="flex items-center gap-4 mb-3">
                              <div className="text-4xl">{stylist.avatar}</div>
                              <div className="flex-1">
                                <h4 className="font-medium text-[#101418] mb-1">{stylist.name}</h4>
                                <p className="text-sm text-[#6E7276]">{stylist.specialty}</p>
                              </div>
                              {selectedStylist?.id === stylist.id && (
                                <CheckCircle className="w-6 h-6 text-[#FF2D95]" />
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm font-medium text-[#101418]">{stylist.rating}</span>
                              <span className="text-sm text-[#6E7276]">(120+ reseñas)</span>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Seleccionar Fecha */}
                {step === 'date' && (
                  <motion.div
                    key="date"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl mb-6 text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Selecciona la fecha
                    </h3>
                    <div className="flex justify-center">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-xl border-2 border-gray-200 shadow-lg"
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Seleccionar Hora */}
                {step === 'time' && (
                  <motion.div
                    key="time"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl mb-6 text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Elige la hora
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <motion.button
                          key={slot.time}
                          whileHover={slot.available ? { scale: 1.05 } : {}}
                          whileTap={slot.available ? { scale: 0.95 } : {}}
                          disabled={!slot.available}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                            selectedTime === slot.time
                              ? 'bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] text-white shadow-lg'
                              : slot.available
                                ? 'bg-white border-2 border-gray-200 text-[#101418] hover:border-[#C9A24F] hover:shadow-md'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                          }`}
                        >
                          {slot.time}
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-[#F5F2E9] rounded-xl">
                      <p className="text-sm text-[#6E7276] flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Duración estimada: {selectedService?.duration}</span>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Confirmar */}
                {step === 'confirm' && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl mb-6 text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Confirma tu cita
                    </h3>
                    
                    <Card className="p-6 bg-gradient-to-br from-[#F5F2E9] to-white">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Scissors className="w-5 h-5 text-[#013220] mt-1" />
                          <div>
                            <p className="text-sm text-[#6E7276]">Servicio</p>
                            <p className="font-medium text-[#101418]">{selectedService?.name}</p>
                            <p className="text-sm text-[#6E7276]">{selectedService?.duration}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-[#013220] mt-1" />
                          <div>
                            <p className="text-sm text-[#6E7276]">Estilista</p>
                            <p className="font-medium text-[#101418]">{selectedStylist?.name}</p>
                            <p className="text-sm text-[#6E7276]">{selectedStylist?.specialty}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-[#013220] mt-1" />
                          <div>
                            <p className="text-sm text-[#6E7276]">Fecha y Hora</p>
                            <p className="font-medium text-[#101418]">
                              {selectedDate?.toLocaleDateString('es-ES', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                            <p className="text-sm text-[#6E7276]">{selectedTime}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 text-[#013220] mt-1" />
                          <div>
                            <p className="text-sm text-[#6E7276]">Precio</p>
                            <p className="text-2xl text-[#013220]">{selectedService?.price}</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Notas adicionales */}
                    <div>
                      <label className="block text-sm font-medium text-[#101418] mb-2">
                        Notas adicionales (opcional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="¿Algo que debamos saber? Preferencias, alergias, etc."
                        className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#C9A24F] focus:outline-none resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-900">
                        <p className="font-medium mb-1">Política de cancelación</p>
                        <p>Puedes cancelar o reprogramar tu cita hasta 24 horas antes sin cargo.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-[#F5F2E9] border-t border-gray-200 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={step === 'service' ? onClose : handleBack}
                className="px-6"
              >
                {step === 'service' ? 'Cancelar' : 'Atrás'}
              </Button>

              <Button
                onClick={step === 'confirm' ? handleConfirm : handleNext}
                disabled={!canProceed()}
                className="px-8 bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] text-white hover:from-[#ff4da8] hover:to-[#d4b366] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 'confirm' ? 'Confirmar Cita' : 'Siguiente'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}