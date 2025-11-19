import { motion } from 'motion/react';
import { 
  User, Mail, Calendar, Palette, Scissors, Sparkles, Edit, 
  Phone, Building2, Users, TrendingUp, Settings, Award,
  Briefcase, Clock, Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import type { UserRole } from '../lib/types';

interface UserData {
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  avatarUrl?: string;
  gigiTone: string;
  beautyProfile: {
    estilo: string;
    colorimetria: string;
    preferencias: string[];
  };
  userRole: UserRole;
  salonName?: string;
  salonId?: string;
  stylistLevel?: 'junior' | 'senior' | 'master';
  permissions?: string;
}

interface UserProfileProps {
  userData: UserData;
  onEdit?: () => void;
}

export function UserProfile({ userData, onEdit }: UserProfileProps) {
  const initials = userData.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Configuración de colores y etiquetas por rol - TODO DORADO
  const roleConfig = {
    usuaria: {
      color: 'from-[#FF2D95] to-[#ff5db1]',
      label: 'Clienta',
      icon: User,
    },
    estilista: {
      color: 'from-[#C9A24F] to-[#d4b366]',
      label: 'Estilista',
      icon: Scissors,
    },
    empresa: {
      color: 'from-[#C9A24F] to-[#d4b366]',
      label: 'Salón',
      icon: Building2,
    },
  };

  const config = roleConfig[userData.userRole];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-[#FEFEFE] py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 
            style={{ fontFamily: 'Playfair Display, serif' }} 
            className="text-[#C9A24F] mb-6"
          >
            Mi Perfil
          </h1>
          <p className="text-[#6E7276] max-w-2xl mx-auto">
            {userData.userRole === 'usuaria' && 'Tu espacio personal en Auréthica'}
            {userData.userRole === 'estilista' && 'Panel profesional de estilista'}
            {userData.userRole === 'empresa' && 'Panel de gestión del salón'}
          </p>
        </motion.div>

        {/* Avatar y Datos Principales */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 mb-6 shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-32 h-32 ring-4 ring-[#C9A24F]/20">
                <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                <AvatarFallback className={`text-3xl bg-gradient-to-br ${config.color} text-white`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              {/* Badge de rol */}
              <div className={`
                absolute -bottom-2 left-1/2 -translate-x-1/2
                px-3 py-1 rounded-full
                bg-gradient-to-r ${config.color}
                text-white text-xs font-medium
                shadow-lg flex items-center gap-1
              `}>
                <Icon className="w-3 h-3" />
                {config.label}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 
                style={{ fontFamily: 'Playfair Display, serif' }}
                className="text-3xl text-[#C9A24F] mb-2"
              >
                {userData.name}
              </h2>
              
              {userData.salonName && (
                <p className="text-[#6E7276] mb-3 flex items-center gap-2 justify-center md:justify-start">
                  <Building2 className="w-4 h-4" />
                  {userData.salonName}
                </p>
              )}

              {userData.stylistLevel && (
                <Badge 
                  variant="outline"
                  className="mb-3 border-[#C9A24F] text-[#C9A24F]"
                >
                  <Award className="w-3 h-3 mr-1" />
                  {userData.stylistLevel === 'master' && 'Estilista Master'}
                  {userData.stylistLevel === 'senior' && 'Estilista Senior'}
                  {userData.stylistLevel === 'junior' && 'Estilista Junior'}
                </Badge>
              )}

              <div className="flex flex-wrap gap-2 justify-center md:justify-start text-sm text-[#6E7276]">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {userData.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {userData.phone}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Desde {userData.registrationDate}
                </div>
              </div>
            </div>

            {onEdit && (
              <Button
                onClick={onEdit}
                variant="outline"
                className="border-[#C9A24F] text-[#C9A24F] hover:bg-[#C9A24F] hover:text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            )}
          </div>
        </motion.div>

        {/* VISTA ESPECÍFICA POR ROL */}
        
        {/* ========== VISTA USUARIA ========== */}
        {userData.userRole === 'usuaria' && (
          <>
            {/* Tono Gigi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-[#FF2D95]/10 to-[#C9A24F]/10 rounded-2xl p-6 mb-6 border-2 border-[#FF2D95]/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF2D95] to-[#C9A24F] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif' }} className="text-xl text-[#C9A24F]">
                  Tu Tono Gigi
                </h3>
              </div>
              <p className="text-2xl font-medium text-[#FF2D95] mb-2">{userData.gigiTone}</p>
              <p className="text-sm text-[#6E7276]">
                Gigi adapta su comunicación a tu estilo personal
              </p>
            </motion.div>

            {/* Perfil de Belleza */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-2xl p-6 mb-6 shadow-lg border border-[#C9A24F]/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A24F] to-[#d4b366] flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif' }} className="text-xl text-[#C9A24F]">
                  Tu Perfil de Belleza
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-[#6E7276] mb-2">Estilo</p>
                  <p className="text-lg font-medium text-[#C9A24F]">{userData.beautyProfile.estilo}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6E7276] mb-2">Colorimetría</p>
                  <p className="text-lg font-medium text-[#C9A24F]">{userData.beautyProfile.colorimetria}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-[#6E7276] mb-3">Preferencias</p>
                <div className="flex flex-wrap gap-2">
                  {userData.beautyProfile.preferencias.map((pref, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-white/80 text-[#C9A24F] border border-[#C9A24F]/30"
                    >
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Salón Afiliado (si tiene) */}
            {userData.salonName && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-2xl p-6 shadow-lg border border-[#C9A24F]/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A24F] to-[#d4b366] flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif' }} className="text-xl text-[#C9A24F]">
                    Tu Salón
                  </h3>
                </div>
                <p className="text-lg font-medium text-[#C9A24F] mb-2">{userData.salonName}</p>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="border-[#C9A24F] text-[#C9A24F] hover:bg-[#C9A24F] hover:text-white">
                    <Clock className="w-4 h-4 mr-2" />
                    Solicitar cita
                  </Button>
                  <Button variant="outline" size="sm" className="border-[#C9A24F] text-[#C9A24F] hover:bg-[#C9A24F] hover:text-white">
                    <User className="w-4 h-4 mr-2" />
                    Ver estilistas
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* ========== VISTA ESTILISTA ========== */}
        {userData.userRole === 'estilista' && (
          <>
            {/* Estadísticas */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-xl p-6 shadow-md border border-[#C9A24F]/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#FF2D95]/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#FF2D95]" />
                  </div>
                  <p className="text-sm text-[#6E7276]">Clientas este mes</p>
                </div>
                <p className="text-3xl font-bold text-[#C9A24F]">24</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-xl p-6 shadow-md border border-[#C9A24F]/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#C9A24F]/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#C9A24F]" />
                  </div>
                  <p className="text-sm text-[#6E7276]">Valoración</p>
                </div>
                <p className="text-3xl font-bold text-[#C9A24F]">4.9</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-xl p-6 shadow-md border border-[#C9A24F]/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#C9A24F]/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#C9A24F]" />
                  </div>
                  <p className="text-sm text-[#6E7276]">Servicios totales</p>
                </div>
                <p className="text-3xl font-bold text-[#C9A24F]">342</p>
              </motion.div>
            </div>

            {/* Accesos rápidos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-2xl p-6 shadow-lg mb-6 border border-[#C9A24F]/20"
            >
              <h3 style={{ fontFamily: 'Playfair Display, serif' }} className="text-xl text-[#C9A24F] mb-4">
                Accesos Rápidos
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="bg-gradient-to-r from-[#C9A24F] to-[#d4b366] text-white h-auto py-4 hover:opacity-90">
                  <Clock className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <p className="font-medium">Mi Agenda</p>
                    <p className="text-xs opacity-80">Ver y gestionar citas</p>
                  </div>
                </Button>
                <Button variant="outline" className="border-[#C9A24F] text-[#C9A24F] hover:bg-[#C9A24F] hover:text-white h-auto py-4">
                  <Briefcase className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <p className="font-medium">Técnicas</p>
                    <p className="text-xs opacity-80">Guías y procedimientos</p>
                  </div>
                </Button>
              </div>
              <p className="text-xs text-[#6E7276] mt-4 italic">
                * El sistema técnico completo está en la interfaz de gestión
              </p>
            </motion.div>

            {/* Especialidades */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-2xl p-6 shadow-lg border border-[#C9A24F]/20"
            >
              <h3 style={{ fontFamily: 'Playfair Display, serif' }} className="text-xl text-[#C9A24F] mb-4">
                Especialidades
              </h3>
              <div className="flex flex-wrap gap-2">
                {userData.beautyProfile.preferencias.map((pref, index) => (
                  <Badge
                    key={index}
                    className="bg-white/80 text-[#C9A24F] border border-[#C9A24F]/30"
                  >
                    <Scissors className="w-3 h-3 mr-1" />
                    {pref}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* ========== VISTA EMPRESA ========== */}
        {userData.userRole === 'empresa' && (
          <>
            {/* Estadísticas del salón */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-xl p-6 shadow-md border border-[#C9A24F]/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#FF2D95]/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#FF2D95]" />
                  </div>
                  <p className="text-sm text-[#6E7276]">Clientas</p>
                </div>
                <p className="text-3xl font-bold text-[#C9A24F]">156</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-xl p-6 shadow-md border border-[#C9A24F]/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#C9A24F]/10 flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-[#C9A24F]" />
                  </div>
                  <p className="text-sm text-[#6E7276]">Estilistas</p>
                </div>
                <p className="text-3xl font-bold text-[#C9A24F]">8</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-xl p-6 shadow-md border border-[#C9A24F]/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#C9A24F]/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#C9A24F]" />
                  </div>
                  <p className="text-sm text-[#6E7276]">Citas hoy</p>
                </div>
                <p className="text-3xl font-bold text-[#C9A24F]">42</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-xl p-6 shadow-md border border-[#C9A24F]/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#FF2D95]/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#FF2D95]" />
                  </div>
                  <p className="text-sm text-[#6E7276]">Valoración</p>
                </div>
                <p className="text-3xl font-bold text-[#C9A24F]">4.8</p>
              </motion.div>
            </div>

            {/* Panel de gestión */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-2xl p-6 shadow-lg mb-6 border border-[#C9A24F]/20"
            >
              <h3 style={{ fontFamily: 'Playfair Display, serif' }} className="text-xl text-[#C9A24F] mb-4">
                Panel de Gestión
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="bg-gradient-to-r from-[#C9A24F] to-[#d4b366] text-white h-auto py-4 hover:opacity-90">
                  <Clock className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <p className="font-medium">Agenda General</p>
                    <p className="text-xs opacity-80">Todas las citas</p>
                  </div>
                </Button>
                <Button variant="outline" className="border-[#FF2D95] text-[#FF2D95] hover:bg-[#FF2D95] hover:text-white h-auto py-4">
                  <Users className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <p className="font-medium">Clientas</p>
                    <p className="text-xs opacity-80">Gestión y mensajes</p>
                  </div>
                </Button>
                <Button variant="outline" className="border-[#C9A24F] text-[#C9A24F] hover:bg-[#C9A24F] hover:text-white h-auto py-4">
                  <Scissors className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <p className="font-medium">Estilistas</p>
                    <p className="text-xs opacity-80">Equipo y permisos</p>
                  </div>
                </Button>
              </div>
              <p className="text-xs text-[#6E7276] mt-4 italic">
                * TPV, sistema de cobro y gestión avanzada en interfaz separada
              </p>
            </motion.div>

            {/* Servicios del salón */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-gradient-to-br from-[#F5EFE6] to-white rounded-2xl p-6 shadow-lg border border-[#C9A24F]/20"
            >
              <h3 style={{ fontFamily: 'Playfair Display, serif' }} className="text-xl text-[#C9A24F] mb-4">
                Servicios Destacados
              </h3>
              <div className="flex flex-wrap gap-2">
                {userData.beautyProfile.preferencias.map((pref, index) => (
                  <Badge
                    key={index}
                    className="bg-white/80 text-[#C9A24F] border border-[#C9A24F]/30"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {pref}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
