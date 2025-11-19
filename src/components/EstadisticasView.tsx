/**
 * EstadisticasView - Vista de Estadísticas Profesionales
 * Disponible para: Estilista y Empresa
 */

import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Users, Star, Calendar, Award, Target, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useState, useEffect } from 'react';
import { StatsSkeleton } from './LoadingState';

interface EstadisticasViewProps {
  userRole: 'estilista' | 'empresa';
  stylistLevel?: 'junior' | 'senior' | 'master';
}

export function EstadisticasView({ userRole, stylistLevel }: EstadisticasViewProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Stats según rol
  const stats = userRole === 'estilista' 
    ? [
        { label: 'Clientas Atendidas', value: '24', icon: Users, color: '#FF2D95', change: '+12%' },
        { label: 'Rating Promedio', value: '4.9', icon: Star, color: '#C9A24F', change: '+0.2' },
        { label: 'Servicios Completados', value: '342', icon: Award, color: '#013220', change: '+18%' },
        { label: 'Ingresos Generados', value: '8.450€', icon: DollarSign, color: '#10b981', change: '+25%' }
      ]
    : [
        { label: 'Clientas Totales', value: '156', icon: Users, color: '#FF2D95', change: '+8%' },
        { label: 'Rating del Salón', value: '4.8', icon: Star, color: '#C9A24F', change: '+0.1' },
        { label: 'Citas del Mes', value: '542', icon: Calendar, color: '#013220', change: '+15%' },
        { label: 'Ingresos Mensuales', value: '42.300€', icon: DollarSign, color: '#10b981', change: '+22%' }
      ];

  // Servicios top
  const topServices = userRole === 'estilista'
    ? [
        { name: 'Balayage', count: 45, revenue: '3.150€', percentage: 35 },
        { name: 'Corte Moderno', count: 38, revenue: '1.900€', percentage: 28 },
        { name: 'Tinte Completo', count: 32, revenue: '2.400€', percentage: 24 },
        { name: 'Peinado Especial', count: 20, revenue: '1.000€', percentage: 13 }
      ]
    : [
        { name: 'Balayage', count: 125, revenue: '12.500€', percentage: 42 },
        { name: 'Corte + Peinado', count: 98, revenue: '6.860€', percentage: 32 },
        { name: 'Tinte Completo', count: 87, revenue: '10.440€', percentage: 28 },
        { name: 'Tratamientos', count: 65, revenue: '5.850€', percentage: 22 }
      ];

  // Metas
  const goals = userRole === 'estilista'
    ? [
        { title: 'Meta Mensual de Servicios', current: 342, target: 400, unit: 'servicios' },
        { title: 'Meta de Nuevas Clientas', current: 12, target: 15, unit: 'clientas' },
        { title: 'Meta de Ingresos', current: 8450, target: 10000, unit: '€' }
      ]
    : [
        { title: 'Meta Mensual de Clientas', current: 542, target: 600, unit: 'citas' },
        { title: 'Nuevas Afiliaciones', current: 12, target: 20, unit: 'afiliaciones' },
        { title: 'Meta de Ingresos', current: 42300, target: 50000, unit: '€' }
      ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F2E9] pt-24 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <StatsSkeleton />
        </div>
      </div>
    );
  }

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
                📊 Estadísticas
              </h1>
              <p className="text-[#6E7276]">
                {userRole === 'estilista' 
                  ? 'Tu rendimiento profesional'
                  : 'Rendimiento del salón'}
              </p>
            </div>
            {stylistLevel && (
              <Badge className="bg-gradient-to-r from-[#C9A24F] to-[#d4b366] text-white text-lg px-4 py-2">
                <Award className="w-5 h-5 mr-2" />
                {stylistLevel === 'master' ? 'Master' : stylistLevel === 'senior' ? 'Senior' : 'Junior'}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${stat.color}15`,
                    }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <Badge 
                    className="text-xs"
                    style={{ 
                      backgroundColor: stat.change.startsWith('+') ? '#10b98120' : '#ef444420',
                      color: stat.change.startsWith('+') ? '#10b981' : '#ef4444'
                    }}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-3xl mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </h3>
                <p className="text-sm text-[#6E7276]">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Servicios Top */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-white">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-6 h-6 text-[#013220]" />
                <h2 className="text-2xl" style={{ fontFamily: 'Playfair Display, serif', color: '#013220' }}>
                  Servicios Más Solicitados
                </h2>
              </div>
              <div className="space-y-6">
                {topServices.map((service, index) => (
                  <div key={service.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-base" style={{ color: '#101418' }}>
                          {service.name}
                        </h4>
                        <p className="text-sm text-[#6E7276]">
                          {service.count} servicios • {service.revenue}
                        </p>
                      </div>
                      <span className="text-lg text-[#013220]">{service.percentage}%</span>
                    </div>
                    <Progress 
                      value={service.percentage} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Metas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-white">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-6 h-6 text-[#C9A24F]" />
                <h2 className="text-2xl" style={{ fontFamily: 'Playfair Display, serif', color: '#013220' }}>
                  Metas del Mes
                </h2>
              </div>
              <div className="space-y-6">
                {goals.map((goal, index) => {
                  const percentage = Math.min((goal.current / goal.target) * 100, 100);
                  const isComplete = percentage >= 100;
                  
                  return (
                    <div key={goal.title}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="text-base mb-1" style={{ color: '#101418' }}>
                            {goal.title}
                          </h4>
                          <p className="text-sm text-[#6E7276]">
                            {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                          </p>
                        </div>
                        <Badge 
                          className={isComplete 
                            ? 'bg-[#10b981] text-white' 
                            : 'bg-[#C9A24F] text-white'
                          }
                        >
                          {Math.round(percentage)}%
                        </Badge>
                      </div>
                      <Progress 
                        value={percentage} 
                        className="h-2"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-[#01322005] to-[#C9A24F05] rounded-lg border border-[#01322020]">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#10b981] mt-0.5" />
                  <div>
                    <h4 className="text-sm mb-1" style={{ color: '#013220' }}>
                      Rendimiento Excelente
                    </h4>
                    <p className="text-xs text-[#6E7276]">
                      {userRole === 'estilista' 
                        ? 'Estás superando tus metas este mes. ¡Sigue así!'
                        : 'El salón está en camino de superar las metas mensuales'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Insights adicionales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card className="p-6 bg-gradient-to-r from-[#013220] to-[#0a4a30] text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {userRole === 'estilista' 
                    ? '¡Felicitaciones por tu excelente desempeño!'
                    : '¡El salón está creciendo constantemente!'}
                </h3>
                <p className="text-white/80 mb-4">
                  {userRole === 'estilista'
                    ? 'Tus clientas valoran tu trabajo. Tu rating ha mejorado un 4% este mes.'
                    : 'Las nuevas afiliaciones han aumentado un 8% comparado con el mes anterior.'}
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Promedio del sector:</span>
                    <span className="ml-2">4.2⭐</span>
                  </div>
                  <div>
                    <span className="text-white/60">Tu rating:</span>
                    <span className="ml-2">{userRole === 'estilista' ? '4.9⭐' : '4.8⭐'}</span>
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
