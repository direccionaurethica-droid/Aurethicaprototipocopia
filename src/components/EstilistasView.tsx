/**
 * EstilistasView - Vista de Gestión de Estilistas
 * Exclusivo para: Empresa/Salón
 */

import { motion } from 'motion/react';
import { Scissors, Star, Award, TrendingUp, Users, Calendar, Mail, Phone, Plus, Settings } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useState, useEffect } from 'react';
import { StylistListSkeleton } from './LoadingState';
import { EmptyState } from './EmptyState';

interface StylistData {
  id: string;
  name: string;
  level: 'junior' | 'senior' | 'master';
  email: string;
  phone: string;
  specialties: string[];
  rating: number;
  clientsThisMonth: number;
  servicesCompleted: number;
  revenue: string;
  status: 'active' | 'vacation' | 'inactive';
}

export function EstilistasView() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // Mock stylists data
  const stylists: StylistData[] = [
    {
      id: '1',
      name: 'Marta López',
      level: 'senior',
      email: 'marta.lopez@aurethica.com',
      phone: '+34 666 111 222',
      specialties: ['Balayage', 'Cortes de Precisión', 'Color Avanzado'],
      rating: 4.9,
      clientsThisMonth: 24,
      servicesCompleted: 342,
      revenue: '8.450€',
      status: 'active'
    },
    {
      id: '2',
      name: 'Carlos Ruiz',
      level: 'master',
      email: 'carlos.ruiz@aurethica.com',
      phone: '+34 677 333 444',
      specialties: ['Tintes Complejos', 'Mechas', 'Tratamientos Premium'],
      rating: 5.0,
      clientsThisMonth: 28,
      servicesCompleted: 456,
      revenue: '12.300€',
      status: 'active'
    },
    {
      id: '3',
      name: 'Laura Sánchez',
      level: 'junior',
      email: 'laura.sanchez@aurethica.com',
      phone: '+34 688 555 666',
      specialties: ['Cortes Básicos', 'Peinados', 'Tintes Simples'],
      rating: 4.6,
      clientsThisMonth: 15,
      servicesCompleted: 124,
      revenue: '3.200€',
      status: 'active'
    }
  ];

  const getLevelColor = (level: string) => {
    const colors = {
      junior: '#6E7276',
      senior: '#C9A24F',
      master: '#013220'
    };
    return colors[level as keyof typeof colors];
  };

  const getLevelLabel = (level: string) => {
    const labels = {
      junior: 'Junior',
      senior: 'Senior',
      master: 'Master'
    };
    return labels[level as keyof typeof labels];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: '#10b981',
      vacation: '#C9A24F',
      inactive: '#6E7276'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: 'Activo',
      vacation: 'Vacaciones',
      inactive: 'Inactivo'
    };
    return labels[status as keyof typeof labels];
  };

  return (
    <div className="min-h-screen bg-[#F5F2E9] pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#101418' }}>
                ✂️ Mi Equipo
              </h1>
              <p className="text-[#6E7276]">
                Gestiona tu equipo de estilistas profesionales
              </p>
            </div>
            <Button className="bg-gradient-to-r from-[#013220] to-[#0a4a30] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Estilista
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Estilistas', value: '8', icon: Scissors, color: '#013220' },
            { label: 'Rating Promedio', value: '4.8', icon: Star, color: '#C9A24F' },
            { label: 'Servicios del Mes', value: '542', icon: Calendar, color: '#FF2D95' },
            { label: 'Ingresos Totales', value: '42.300€', icon: TrendingUp, color: '#10b981' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                  <span className="text-2xl" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm text-[#6E7276]">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stylists List */}
        {isLoading ? (
          <StylistListSkeleton />
        ) : stylists.length === 0 ? (
          <EmptyState
            icon={<Scissors className="w-12 h-12" />}
            title="No hay estilistas en el equipo"
            description="Comienza agregando tu primer estilista profesional"
            action={{
              label: "Agregar Estilista",
              onClick: () => {}
            }}
          />
        ) : (
          <div className="space-y-4">
            {stylists.map((stylist, index) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <Card className="p-6 bg-white hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Avatar */}
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl"
                      style={{ 
                        background: `linear-gradient(135deg, ${getLevelColor(stylist.level)}, ${getLevelColor(stylist.level)}dd)`
                      }}
                    >
                      <Scissors className="w-10 h-10" />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl" style={{ color: '#101418' }}>
                          {stylist.name}
                        </h3>
                        <Badge 
                          style={{ 
                            backgroundColor: getLevelColor(stylist.level),
                            color: 'white'
                          }}
                        >
                          <Award className="w-3 h-3 mr-1" />
                          {getLevelLabel(stylist.level)}
                        </Badge>
                        <Badge 
                          style={{ 
                            backgroundColor: getStatusColor(stylist.status),
                            color: 'white'
                          }}
                        >
                          {getStatusLabel(stylist.status)}
                        </Badge>
                      </div>

                      {/* Contact Info */}
                      <div className="grid md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-[#6E7276]">
                          <Mail className="w-4 h-4" />
                          <span>{stylist.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#6E7276]">
                          <Phone className="w-4 h-4" />
                          <span>{stylist.phone}</span>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div className="mb-4">
                        <span className="text-xs text-[#6E7276] mb-2 block">Especialidades:</span>
                        <div className="flex flex-wrap gap-2">
                          {stylist.specialties.map((specialty) => (
                            <Badge 
                              key={specialty}
                              variant="outline"
                              className="border-[#C9A24F] text-[#C9A24F]"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-[#C9A24F]" />
                            <span className="text-xs text-[#6E7276]">Rating</span>
                          </div>
                          <p className="text-lg text-[#013220]">{stylist.rating}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Users className="w-4 h-4 text-[#FF2D95]" />
                            <span className="text-xs text-[#6E7276]">Clientas/Mes</span>
                          </div>
                          <p className="text-lg text-[#013220]">{stylist.clientsThisMonth}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Calendar className="w-4 h-4 text-[#013220]" />
                            <span className="text-xs text-[#6E7276]">Servicios</span>
                          </div>
                          <p className="text-lg text-[#013220]">{stylist.servicesCompleted}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <TrendingUp className="w-4 h-4 text-[#10b981]" />
                            <span className="text-xs text-[#6E7276]">Ingresos</span>
                          </div>
                          <p className="text-lg text-[#013220]">{stylist.revenue}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" variant="outline" className="text-[#013220] border-[#013220]">
                      <Calendar className="w-4 h-4 mr-1" />
                      Ver Agenda
                    </Button>
                    <Button size="sm" variant="outline" className="text-[#6E7276] border-[#6E7276]">
                      <Settings className="w-4 h-4 mr-1" />
                      Configurar
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
            ))}
          </div>
        )}

        {/* Team Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-r from-[#013220] to-[#0a4a30] text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Excelente trabajo en equipo
                </h3>
                <p className="text-white/80 mb-4">
                  Tu equipo mantiene un rating promedio de 4.8⭐, superando el estándar de la industria.
                  Los servicios completados han aumentado un 18% este mes.
                </p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-white/60">Estilistas activos:</span>
                    <span className="ml-2">8</span>
                  </div>
                  <div>
                    <span className="text-white/60">Nivel promedio:</span>
                    <span className="ml-2">Senior</span>
                  </div>
                  <div>
                    <span className="text-white/60">Satisfacción:</span>
                    <span className="ml-2">96%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
