/**
 * ClientasView - Vista de Gestión de Clientas
 * Exclusivo para: Empresa/Salón
 */

import { motion } from 'motion/react';
import { Search, User, Mail, Phone, Calendar, Heart, TrendingUp, Filter, UserPlus } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { useState, useEffect } from 'react';
import { ClientListSkeleton } from './LoadingState';
import { EmptyState } from './EmptyState';

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment: string | null;
  totalVisits: number;
  totalSpent: string;
  favoriteService: string;
  assignedStylist: string;
  status: 'active' | 'inactive';
}

export function ClientasView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock client data
  const clients: ClientData[] = [
    {
      id: '1',
      name: 'Ana Martínez',
      email: 'ana.martinez@example.com',
      phone: '+34 654 321 098',
      lastVisit: '15/10/2025',
      nextAppointment: '2/11/2025',
      totalVisits: 12,
      totalSpent: '1.450€',
      favoriteService: 'Balayage',
      assignedStylist: 'Marta López',
      status: 'active'
    },
    {
      id: '2',
      name: 'Lucía Fernández',
      email: 'lucia.fernandez@example.com',
      phone: '+34 667 890 123',
      lastVisit: '28/10/2025',
      nextAppointment: '5/11/2025',
      totalVisits: 8,
      totalSpent: '890€',
      favoriteService: 'Corte',
      assignedStylist: 'Carlos Ruiz',
      status: 'active'
    },
    {
      id: '3',
      name: 'Sofía García',
      email: 'sofia.garcia@example.com',
      phone: '+34 612 345 678',
      lastVisit: '20/09/2025',
      nextAppointment: null,
      totalVisits: 15,
      totalSpent: '2.100€',
      favoriteService: 'Tinte Completo',
      assignedStylist: 'Marta López',
      status: 'inactive'
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F5F2E9] pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#101418' }}>
            👥 Mis Clientas
          </h1>
          <p className="text-[#6E7276]">
            Gestiona la información de tus clientas afiliadas
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Clientas', value: '156', icon: User, color: '#013220' },
            { label: 'Activas', value: '142', icon: Heart, color: '#10b981' },
            { label: 'Este Mes', value: '12', icon: UserPlus, color: '#C9A24F' },
            { label: 'Ingresos Medio', value: '1.250€', icon: TrendingUp, color: '#FF2D95' }
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

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6E7276]" />
            <Input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              className={filterStatus === 'all' ? 'bg-[#013220]' : ''}
            >
              <Filter className="w-4 h-4 mr-2" />
              Todas
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('active')}
              className={filterStatus === 'active' ? 'bg-[#10b981]' : ''}
            >
              Activas
            </Button>
            <Button
              variant={filterStatus === 'inactive' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('inactive')}
              className={filterStatus === 'inactive' ? 'bg-[#6E7276]' : ''}
            >
              Inactivas
            </Button>
          </div>

          <Button className="bg-gradient-to-r from-[#013220] to-[#0a4a30] text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Nueva Clienta
          </Button>
        </motion.div>

        {/* Client List */}
        {isLoading ? (
          <ClientListSkeleton />
        ) : filteredClients.length === 0 ? (
          <EmptyState
            icon={<UserPlus className="w-12 h-12" />}
            title="No se encontraron clientas"
            description={searchQuery ? "Intenta con otros términos de búsqueda" : "Comienza agregando tu primera clienta"}
            action={{
              label: "Agregar Clienta",
              onClick: () => {}
            }}
          />
        ) : (
          <div className="space-y-4">
            {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <Card className="p-6 bg-white hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF2D95] to-[#ff5db1] flex items-center justify-center text-white text-xl">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl" style={{ color: '#101418' }}>
                          {client.name}
                        </h3>
                        <Badge 
                          className={client.status === 'active' 
                            ? 'bg-[#10b981] text-white' 
                            : 'bg-[#6E7276] text-white'
                          }
                        >
                          {client.status === 'active' ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-[#6E7276]">
                          <Mail className="w-4 h-4" />
                          <span>{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#6E7276]">
                          <Phone className="w-4 h-4" />
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#6E7276]">
                          <Calendar className="w-4 h-4" />
                          <span>Última visita: {client.lastVisit}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#6E7276]">
                          <User className="w-4 h-4" />
                          <span>Estilista: {client.assignedStylist}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-6 pt-4 border-t border-gray-100">
                        <div>
                          <span className="text-xs text-[#6E7276]">Total Visitas</span>
                          <p className="text-lg text-[#013220]">{client.totalVisits}</p>
                        </div>
                        <div>
                          <span className="text-xs text-[#6E7276]">Total Gastado</span>
                          <p className="text-lg text-[#013220]">{client.totalSpent}</p>
                        </div>
                        <div>
                          <span className="text-xs text-[#6E7276]">Servicio Favorito</span>
                          <p className="text-sm text-[#C9A24F]">{client.favoriteService}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 ml-4">
                    {client.nextAppointment ? (
                      <Badge className="bg-gradient-to-r from-[#C9A24F] to-[#d4b366] text-white">
                        Próxima: {client.nextAppointment}
                      </Badge>
                    ) : (
                      <Button size="sm" className="bg-[#013220] text-white">
                        Agendar Cita
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Ver Historial
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
