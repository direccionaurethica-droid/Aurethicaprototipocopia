/**
 * AgendaView - Vista de Agenda/Calendario
 * Disponible para: Usuaria, Estilista y Empresa
 * - Usuarias: Ven sus propias citas y pueden agendar nuevas
 * - Estilistas: Ven todas sus citas con clientas
 * - Empresas: Ven todas las citas del salón
 */

import { motion } from 'motion/react';
import { Calendar, Clock, User, Scissors, CheckCircle, XCircle, Edit2, Plus, MapPin, Phone, Mail, Download, Star, MessageCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Calendar as CalendarComponent } from './ui/calendar';
import { AppointmentModal } from './AppointmentModal';
import { RatingModal } from './RatingModal';
import { ChatWidget } from './ChatWidget';
import { ChatWidgetTutorial } from './ChatWidgetTutorial';
import { NoAppointmentsEmpty } from './EmptyState';
import { AppointmentsSkeleton } from './LoadingState';
import { useState } from 'react';
import { toast } from './PremiumToast';
import type { UserRole } from '../lib/types';

interface AppointmentData {
  id: string;
  clientName: string;
  service: string;
  stylist: string;
  salonName?: string;
  salonAddress?: string;
  time: string;
  duration: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: string;
}

interface AgendaViewProps {
  userRole: UserRole;
  stylistName?: string;
  userName?: string;
}

export function AgendaView({ userRole, stylistName, userName = 'Ana' }: AgendaViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentModalMode, setAppointmentModalMode] = useState<'create' | 'edit' | 'reschedule'>('create');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedAppointmentForRating, setSelectedAppointmentForRating] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock appointments para usuarias (sus citas como clienta)
  const usuariaAppointments: AppointmentData[] = [
    {
      id: '1',
      clientName: userName,
      service: 'Balayage + Corte',
      stylist: 'Marta López',
      salonName: 'Auréthica Madrid Centro',
      salonAddress: 'Calle Serrano 45, Madrid',
      time: '10:00',
      duration: '2h 30min',
      status: 'confirmed',
      price: '145€'
    },
    {
      id: '2',
      clientName: userName,
      service: 'Manicura + Pedicura',
      stylist: 'Laura Sánchez',
      salonName: 'Auréthica Chamberí',
      salonAddress: 'Calle Ponzano 88, Madrid',
      time: '16:00',
      duration: '1h 30min',
      status: 'pending',
      price: '55€'
    }
  ];

  // Mock appointments para profesionales
  const professionalAppointments: AppointmentData[] = [
    {
      id: '1',
      clientName: 'Ana Martínez',
      service: 'Balayage + Corte',
      stylist: stylistName || 'Marta López',
      time: '10:00',
      duration: '2h 30min',
      status: 'confirmed',
      price: '145€'
    },
    {
      id: '2',
      clientName: 'Lucía Fernández',
      service: 'Corte y Peinado',
      stylist: stylistName || 'Carlos Ruiz',
      time: '13:00',
      duration: '1h 15min',
      status: 'confirmed',
      price: '65€'
    },
    {
      id: '3',
      clientName: 'Sofía García',
      service: 'Tinte Completo',
      stylist: stylistName || 'Marta López',
      time: '16:30',
      duration: '2h',
      status: 'pending',
      price: '120€'
    }
  ];

  const appointments = userRole === 'usuaria' ? usuariaAppointments : professionalAppointments;

  const getStatusColor = (status: string) => {
    const colors = {
      pending: '#C9A24F',
      confirmed: '#D4AF37',
      completed: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status as keyof typeof colors] || '#6E7276';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getHeaderTitle = () => {
    switch (userRole) {
      case 'usuaria':
        return 'Mis Citas';
      case 'estilista':
        return 'Agenda';
      case 'empresa':
        return 'Agenda del Salón';
      default:
        return 'Agenda';
    }
  };

  const getHeaderDescription = () => {
    switch (userRole) {
      case 'usuaria':
        return 'Tus próximas citas de belleza';
      case 'estilista':
        return 'Tus citas programadas';
      case 'empresa':
        return 'Gestiona las citas de todo el salón';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl mb-2 text-[#D4AF37]" style={{ fontFamily: 'Playfair Display, serif' }}>
            📅 {getHeaderTitle()}
          </h1>
          <p className="text-[#E8E6E3]">
            {getHeaderDescription()}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 bg-[#0a0a0a] border-[#D4AF37]/30">
              <div className="mb-4">
                <h2 className="text-xl mb-4 text-[#D4AF37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Selecciona Fecha
                </h2>
                <div className="flex gap-2 mb-4">
                  <Button
                    size="sm"
                    variant={viewMode === 'day' ? 'default' : 'outline'}
                    onClick={() => setViewMode('day')}
                    className={viewMode === 'day' ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A24F] text-black border-0' : 'border-[#D4AF37]/30 text-[#E8E6E3] hover:bg-[#D4AF37]/10'}
                  >
                    Día
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === 'week' ? 'default' : 'outline'}
                    onClick={() => setViewMode('week')}
                    className={viewMode === 'week' ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A24F] text-black border-0' : 'border-[#D4AF37]/30 text-[#E8E6E3] hover:bg-[#D4AF37]/10'}
                  >
                    Semana
                  </Button>
                </div>
              </div>
              
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />

              {/* Botón de nueva cita */}
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] text-white hover:from-[#ff4da8] hover:to-[#d4b366]"
                onClick={() => {
                  setAppointmentModalMode('create');
                  setShowAppointmentModal(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                {userRole === 'usuaria' ? 'Agendar Cita' : 'Nueva Cita'}
              </Button>
            </Card>

            {/* Resumen del día */}
            <Card className="p-6 bg-[#0a0a0a] border-[#D4AF37]/30 mt-4">
              <h3 className="text-lg mb-4 text-[#D4AF37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Resumen del Día
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#E8E6E3]">
                    {userRole === 'usuaria' ? 'Mis citas' : 'Total citas'}
                  </span>
                  <span className="font-medium text-[#D4AF37]">{userRole === 'usuaria' ? appointments.length : '8'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#E8E6E3]">Confirmadas</span>
                  <span className="font-medium text-[#10b981]">
                    {appointments.filter(a => a.status === 'confirmed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#E8E6E3]">Pendientes</span>
                  <span className="font-medium text-[#C9A24F]">
                    {appointments.filter(a => a.status === 'pending').length}
                  </span>
                </div>
                {userRole !== 'usuaria' && (
                  <>
                    <div className="h-px bg-[#D4AF37]/20 my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#E8E6E3]">Ingresos estimados</span>
                      <span className="text-lg text-[#D4AF37]">890€</span>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Lista de citas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-[#D4AF37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {userRole === 'usuaria' ? 'Próximas Citas' : 'Citas de Hoy'}
              </h2>
              <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#C9A24F] text-black border-0">
                {appointments.length} citas
              </Badge>
            </div>

            {/* Loading state */}
            {isLoading && <AppointmentsSkeleton />}

            {/* Empty state */}
            {!isLoading && appointments.length === 0 && (
              <NoAppointmentsEmpty 
                onCreateAppointment={() => {
                  setAppointmentModalMode('create');
                  setShowAppointmentModal(true);
                }}
              />
            )}

            {/* Lista de citas */}
            {!isLoading && appointments.length > 0 && (
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Card className="p-6 bg-[#0a0a0a] border-[#D4AF37]/30 hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C9A24F] to-[#FF2D95] flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-[#C9A24F]/30">
                          <User className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg mb-1 text-[#E8E6E3]">
                            {userRole === 'usuaria' ? appointment.service : appointment.clientName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-[#C9A24F] mb-2">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time} • {appointment.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#E8E6E3]/80 mb-2">
                            <Scissors className="w-4 h-4" />
                            <span>{userRole === 'usuaria' ? `Con ${appointment.stylist}` : appointment.service}</span>
                          </div>
                          
                          {/* Info adicional para usuarias */}
                          {userRole === 'usuaria' && appointment.salonName && (
                            <>
                              <div className="flex items-center gap-2 text-sm text-[#E8E6E3]/80 mb-1">
                                <MapPin className="w-4 h-4" />
                                <span>{appointment.salonName}</span>
                              </div>
                              {appointment.salonAddress && (
                                <div className="pl-6 text-xs text-[#E8E6E3]/60">
                                  {appointment.salonAddress}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      
                      <Badge 
                        style={{ 
                          backgroundColor: getStatusColor(appointment.status),
                          color: 'white'
                        }}
                        className="flex-shrink-0 shadow-lg"
                      >
                        {getStatusLabel(appointment.status)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20">
                      <div className="flex items-center gap-4">
                        {userRole === 'empresa' && (
                          <span className="text-sm text-[#E8E6E3]/80">
                            Estilista: <span className="text-[#D4AF37]">{appointment.stylist}</span>
                          </span>
                        )}
                        <span className="text-lg text-[#D4AF37]">
                          {appointment.price}
                        </span>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {userRole === 'usuaria' ? (
                          // Botones para usuarias
                          <>
                            {appointment.status === 'pending' && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-[#10b981] border-[#10b981] hover:bg-[#10b981] hover:text-white"
                                onClick={() => {
                                  toast.success('Cita confirmada exitosamente');
                                }}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Confirmar
                              </Button>
                            )}
                            {appointment.status === 'confirmed' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-[#C9A24F] border-[#C9A24F] hover:bg-[#C9A24F] hover:text-white"
                                  onClick={() => {
                                    setAppointmentModalMode('reschedule');
                                    setShowAppointmentModal(true);
                                  }}
                                >
                                  <Edit2 className="w-4 h-4 mr-1" />
                                  Reprogramar
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-[#FF2D95] border-[#FF2D95] hover:bg-[#FF2D95] hover:text-white"
                                  onClick={() => {
                                    const appointData = {
                                      service: appointment.service,
                                      stylist: appointment.stylist,
                                      date: new Date().toLocaleDateString('es-ES'),
                                      salonName: appointment.salonName || 'Auréthica'
                                    };
                                    setSelectedAppointmentForRating(appointData);
                                    setShowRatingModal(true);
                                  }}
                                >
                                  <Star className="w-4 h-4 mr-1" />
                                  Valorar
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-[#013220] border-[#013220] hover:bg-[#013220] hover:text-white"
                                  onClick={() => {
                                    const event = {
                                      title: appointment.service,
                                      description: `Con ${appointment.stylist} en ${appointment.salonName}`,
                                      location: appointment.salonAddress || '',
                                      startTime: new Date(),
                                      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 horas después
                                    };
                                    toast.success('Añadido a tu calendario');
                                  }}
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  Exportar
                                </Button>
                              </>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-[#ef4444] border-[#ef4444] hover:bg-[#ef4444] hover:text-white"
                              onClick={() => {
                                if (confirm('¿Estás segura de que quieres cancelar esta cita?')) {
                                  toast.success('Cita cancelada correctamente');
                                }
                              }}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancelar
                            </Button>
                          </>
                        ) : (
                          // Botones para profesionales
                          <>
                            {appointment.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-[#10b981] border-[#10b981] hover:bg-[#10b981] hover:text-white"
                                  onClick={() => toast.success('Cita confirmada')}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Confirmar
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-[#ef4444] border-[#ef4444] hover:bg-[#ef4444] hover:text-white"
                                  onClick={() => {
                                    if (confirm('¿Cancelar esta cita?')) {
                                      toast.success('Cita cancelada');
                                    }
                                  }}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Cancelar
                                </Button>
                              </>
                            )}
                            {userRole === 'empresa' && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-[#C9A24F] border-[#C9A24F] hover:bg-[#C9A24F] hover:text-white"
                                onClick={() => {
                                  setAppointmentModalMode('edit');
                                  setShowAppointmentModal(true);
                                }}
                              >
                                <Edit2 className="w-4 h-4 mr-1" />
                                Editar
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modales */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        mode={appointmentModalMode}
        userRole={userRole}
        onConfirm={(data) => {
          console.log('Cita agendada:', data);
        }}
      />

      {showRatingModal && selectedAppointmentForRating && (
        <RatingModal
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          appointmentData={selectedAppointmentForRating}
          onSubmit={(rating) => {
            console.log('Valoración enviada:', rating);
          }}
        />
      )}

      {/* Chat Widget - Solo para usuarias */}
      {userRole === 'usuaria' && (
        <>
          <ChatWidget />
          <ChatWidgetTutorial />
        </>
      )}
    </div>
  );
}