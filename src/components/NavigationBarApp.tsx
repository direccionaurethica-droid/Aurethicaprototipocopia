import { motion } from 'motion/react';
import { Search, Sparkles, User, Calendar, Users, BarChart3, Scissors, Building2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import type { UserRole } from '../lib/types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import gigiLogoSimple from "figma:asset/d6b411d972cd0bf19ef7521b7b038f43509e5335.png";

export type AppViewType = 'blog' | 'profile' | 'search' | 'agenda' | 'clientas' | 'estadisticas' | 'estilistas';

interface NavigationBarAppProps {
  currentView: AppViewType;
  onViewChange: (view: AppViewType) => void;
  userRole?: UserRole;
}

export function NavigationBarApp({ currentView, onViewChange, userRole = 'usuaria' }: NavigationBarAppProps) {
  // Navigation items base para todos
  const baseNavItems = [
    {
      id: 'search',
      icon: Search,
      label: 'Buscar',
      color: '#C9A24F',
      roles: ['usuaria', 'estilista', 'empresa'] as UserRole[]
    },
    {
      id: 'blog',
      icon: Sparkles,
      label: 'Blog',
      color: '#C9A24F',
      roles: ['usuaria', 'estilista', 'empresa'] as UserRole[]
    },
    {
      id: 'profile',
      icon: User,
      label: 'Mi Perfil',
      color: '#6E7276',
      roles: ['usuaria', 'estilista', 'empresa'] as UserRole[]
    }
  ];

  // Navigation items profesionales
  const professionalNavItems = [
    {
      id: 'agenda',
      icon: Calendar,
      label: 'Agenda',
      color: '#C9A24F',
      roles: ['usuaria', 'estilista', 'empresa'] as UserRole[] // Ahora todas pueden ver su agenda
    },
    {
      id: 'estadisticas',
      icon: BarChart3,
      label: 'Estadísticas',
      color: '#FF2D95',
      roles: ['estilista', 'empresa'] as UserRole[]
    },
    {
      id: 'clientas',
      icon: Users,
      label: 'Clientas',
      color: '#C9A24F',
      roles: ['empresa'] as UserRole[]
    },
    {
      id: 'estilistas',
      icon: Scissors,
      label: 'Estilistas',
      color: '#C9A24F',
      roles: ['empresa'] as UserRole[]
    }
  ];

  // Combinar y filtrar items según el rol
  const allNavItems = [...baseNavItems, ...professionalNavItems];
  const navItems = allNavItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      {/* Desktop - Barra superior */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#C9A24F] to-[#FF2D95] flex items-center justify-center">
              <span className="text-white text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>A</span>
            </div>
            <span className="text-xl text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
              Auréthica
            </span>
          </div>

          {/* Navegación central */}
          <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-full p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onViewChange(item.id as AppViewType)}
                  className={`relative px-6 py-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'chrome-gold-button' 
                      : 'hover:bg-[#1a1a1a]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    <Icon 
                      className="w-5 h-5"
                      style={{ color: isActive ? '#000000' : '#A8A6A3' }}
                    />
                    <span 
                      className={`text-sm ${isActive ? 'text-black' : 'text-[#A8A6A3]'}`}
                      style={{ 
                        fontWeight: isActive ? 500 : 400
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Gigi Helper */}
            <motion.button
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Hablar con Gigi"
            >
            {/* Logo de Gigi con efectos cromados */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              {/* Brillo sutil dorado-fucsia de fondo */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.6) 0%, rgba(255, 45, 149, 0.5) 50%, transparent 100%)',
                    'radial-gradient(circle at 70% 70%, rgba(255, 45, 149, 0.6) 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)',
                    'radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.6) 0%, rgba(255, 45, 149, 0.5) 50%, transparent 100%)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Reflejo metálico sutil giratorio */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.7) 25%, rgba(255, 45, 149, 0.6) 50%, rgba(212, 175, 55, 0.7) 75%, transparent 100%)',
                  opacity: 0.8,
                }}
              />

              {/* Logo de Gigi */}
              <ImageWithFallback
                src={gigiLogoSimple}
                alt="Logo de Gigi"
                className="relative z-10 w-full h-full object-cover"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 40px rgba(255, 45, 149, 0.4))',
                }}
              />
              
              {/* Borde brillante animado */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(255, 45, 149, 0.3), inset 0 0 30px rgba(212, 175, 55, 0.2)',
                    '0 0 30px rgba(255, 45, 149, 0.4), 0 0 50px rgba(212, 175, 55, 0.3), inset 0 0 40px rgba(255, 45, 149, 0.2)',
                    '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(255, 45, 149, 0.3), inset 0 0 30px rgba(212, 175, 55, 0.2)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Notificación (opcional) */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF2D95] rounded-full border-2 border-background">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-full h-full rounded-full bg-[#FF2D95]"
                />
              </div>
            </div>
          </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile - Barra inferior */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border lg:hidden">
        <div className="flex items-center justify-around py-3 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.id as AppViewType)}
                className="flex flex-col items-center gap-1 min-w-[60px]"
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#C9A24F] to-[#FF2D95] shadow-lg' 
                      : 'bg-muted'
                  }`}
                >
                  <Icon 
                    className="w-5 h-5"
                    style={{ color: isActive ? 'white' : '#6E7276' }}
                  />
                </div>
                <span 
                  className="text-xs"
                  style={{ 
                    color: isActive ? item.color : '#6E7276',
                    fontWeight: isActive ? 500 : 400
                  }}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
          
          {/* Gigi Button - Mobile */}
          <motion.button
            className="flex flex-col items-center gap-1 min-w-[60px]"
            whileTap={{ scale: 0.95 }}
            aria-label="Hablar con Gigi"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              {/* Brillo sutil dorado-fucsia de fondo */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.6) 0%, rgba(255, 45, 149, 0.5) 50%, transparent 100%)',
                    'radial-gradient(circle at 70% 70%, rgba(255, 45, 149, 0.6) 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)',
                    'radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.6) 0%, rgba(255, 45, 149, 0.5) 50%, transparent 100%)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Reflejo metálico sutil giratorio */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.7) 25%, rgba(255, 45, 149, 0.6) 50%, rgba(212, 175, 55, 0.7) 75%, transparent 100%)',
                  opacity: 0.8,
                }}
              />

              {/* Logo de Gigi */}
              <ImageWithFallback
                src={gigiLogoSimple}
                alt="Logo de Gigi"
                className="relative z-10 w-full h-full object-cover"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.5)) drop-shadow(0 0 30px rgba(255, 45, 149, 0.3))',
                }}
              />
              
              {/* Borde brillante animado */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(212, 175, 55, 0.4), 0 0 30px rgba(255, 45, 149, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.2)',
                    '0 0 25px rgba(255, 45, 149, 0.4), 0 0 40px rgba(212, 175, 55, 0.3), inset 0 0 30px rgba(255, 45, 149, 0.2)',
                    '0 0 15px rgba(212, 175, 55, 0.4), 0 0 30px rgba(255, 45, 149, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.2)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <span className="text-xs text-[#FF2D95]">Gigi</span>
          </motion.button>
        </div>
      </div>
    </>
  );
}