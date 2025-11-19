/**
 * DevQuickAccess - Panel de acceso rápido a perfiles de prueba
 * Para desarrollo y testing - acceso directo a todos los tipos de usuario
 * Atajo de teclado: Ctrl/Cmd + K
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Scissors, Building2, ChevronDown, Sparkles, Lock, Unlock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface QuickAccessUser {
  email: string;
  name: string;
  role: 'usuaria' | 'estilista' | 'empresa';
  label: string;
  description: string;
  color: string;
  icon: any;
}

interface DevQuickAccessProps {
  onQuickLogin: (email: string, password: string) => void;
}

const quickAccessUsers: QuickAccessUser[] = [
  // Usuarias
  {
    email: 'ana.martinez@example.com',
    name: 'Ana Martínez',
    role: 'usuaria',
    label: 'Natural y sofisticado',
    description: 'Salón Madrid Centro',
    color: 'from-[#FF2D95] to-[#ff5db1]',
    icon: User,
  },
  {
    email: 'lucia.fernandez@example.com',
    name: 'Lucía Fernández',
    role: 'usuaria',
    label: 'Audaz y creativo',
    description: 'Salón Barcelona Gótico',
    color: 'from-[#FF2D95] to-[#ff5db1]',
    icon: User,
  },
  {
    email: 'sofia.garcia@example.com',
    name: 'Sofía García',
    role: 'usuaria',
    label: 'Clásico y elegante',
    description: 'Sin salón afiliado',
    color: 'from-[#FF2D95] to-[#ff5db1]',
    icon: User,
  },
  // Estilistas
  {
    email: 'marta.lopez@aurethica.com',
    name: 'Marta López',
    role: 'estilista',
    label: 'Estilista Senior',
    description: 'Salón Madrid Centro',
    color: 'from-[#C9A24F] to-[#d4b366]',
    icon: Scissors,
  },
  {
    email: 'carlos.ruiz@aurethica.com',
    name: 'Carlos Ruiz',
    role: 'estilista',
    label: 'Estilista Master',
    description: 'Salón Barcelona Gótico',
    color: 'from-[#C9A24F] to-[#d4b366]',
    icon: Scissors,
  },
  // Empresas
  {
    email: 'salon.madrid@aurethica.com',
    name: 'Auréthica Madrid',
    role: 'empresa',
    label: 'Salón Premium',
    description: '156 clientas • 8 estilistas',
    color: 'from-[#013220] to-[#0a4a30]',
    icon: Building2,
  },
  {
    email: 'salon.barcelona@aurethica.com',
    name: 'Auréthica Barcelona',
    role: 'empresa',
    label: 'Salón Premium',
    description: '142 clientas • 6 estilistas',
    color: 'from-[#013220] to-[#0a4a30]',
    icon: Building2,
  },
];

export function DevQuickAccess({ onQuickLogin }: DevQuickAccessProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Atajo de teclado: Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setShowTooltip(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Ocultar tooltip después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleQuickLogin = (email: string) => {
    if (isLocked) return;
    setShowTooltip(false);
    onQuickLogin(email, '123456');
    // Cerrar el panel después del login
    setTimeout(() => setIsOpen(false), 300);
  };

  const usuarias = quickAccessUsers.filter(u => u.role === 'usuaria');
  const estilistas = quickAccessUsers.filter(u => u.role === 'estilista');
  const empresas = quickAccessUsers.filter(u => u.role === 'empresa');

  return (
    <div className="fixed top-6 right-6 z-[9996]">
      {/* Botón principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative overflow-hidden
          w-14 h-14 rounded-full
          shadow-2xl
          transition-all duration-300
          ${isOpen ? 'scale-110' : 'hover:scale-105'}
        `}
        style={{
          background: 'linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)',
        }}
        whileHover={{ rotate: isOpen ? 0 : 5 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Capa de brillo */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(255, 45, 149, 0.3) 100%)',
          }}
        />
        
        {/* Icono */}
        <div className="relative flex items-center justify-center w-full h-full">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-6 h-6 text-white drop-shadow-lg" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="w-6 h-6 text-white drop-shadow-lg" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Borde cromado */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.3)',
          }}
        />

        {/* Pulse animation cuando cerrado */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.button>

      {/* Panel de accesos rápidos */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-20 right-0 w-96 max-h-[calc(100vh-120px)] overflow-hidden"
          >
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#C9A24F]/20 overflow-hidden">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-[#F5F2E9] to-white p-4 border-b-2 border-[#C9A24F]/20">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 
                      className="text-lg text-[#013220]"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Acceso Rápido
                    </h3>
                    <p className="text-xs text-[#6E7276]">
                      Atajo: <kbd className="px-1.5 py-0.5 bg-[#F5F2E9] rounded border border-[#C9A24F]/20 font-mono">⌘K</kbd>
                    </p>
                  </div>
                  <button
                    onClick={() => setIsLocked(!isLocked)}
                    className="p-2 rounded-lg hover:bg-[#F5F2E9] transition-colors"
                    title={isLocked ? 'Desbloquear panel' : 'Bloquear panel'}
                  >
                    {isLocked ? (
                      <Lock className="w-4 h-4 text-red-500" />
                    ) : (
                      <Unlock className="w-4 h-4 text-[#C9A24F]" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-[#6E7276]">
                  Click en cualquier perfil para login instantáneo
                </p>
              </div>

              {/* Lista de usuarios */}
              <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-220px)]">
                
                {/* Usuarias */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF2D95] to-[#ff5db1] flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="text-sm font-medium text-[#013220]">Clientas</h4>
                  </div>
                  <div className="space-y-2">
                    {usuarias.map((user, index) => {
                      const Icon = user.icon;
                      return (
                        <motion.button
                          key={user.email}
                          onClick={() => handleQuickLogin(user.email)}
                          disabled={isLocked}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`
                            w-full p-3 rounded-xl
                            border-2 transition-all duration-200
                            text-left
                            ${isLocked 
                              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' 
                              : 'border-[#FF2D95]/20 hover:border-[#FF2D95] hover:bg-gradient-to-r hover:from-[#FF2D95]/5 hover:to-transparent hover:shadow-lg cursor-pointer'
                            }
                          `}
                          whileHover={!isLocked ? { x: 4 } : {}}
                          whileTap={!isLocked ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${user.color} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-[#013220] text-sm truncate">
                                {user.name}
                              </p>
                              <p className="text-xs text-[#6E7276] truncate">
                                {user.label}
                              </p>
                              <p className="text-xs text-[#6E7276]/60 truncate">
                                {user.description}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Estilistas */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C9A24F] to-[#d4b366] flex items-center justify-center">
                      <Scissors className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="text-sm font-medium text-[#013220]">Estilistas</h4>
                  </div>
                  <div className="space-y-2">
                    {estilistas.map((user, index) => {
                      const Icon = user.icon;
                      return (
                        <motion.button
                          key={user.email}
                          onClick={() => handleQuickLogin(user.email)}
                          disabled={isLocked}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (usuarias.length + index) * 0.05 }}
                          className={`
                            w-full p-3 rounded-xl
                            border-2 transition-all duration-200
                            text-left
                            ${isLocked 
                              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' 
                              : 'border-[#C9A24F]/20 hover:border-[#C9A24F] hover:bg-gradient-to-r hover:from-[#C9A24F]/5 hover:to-transparent hover:shadow-lg cursor-pointer'
                            }
                          `}
                          whileHover={!isLocked ? { x: 4 } : {}}
                          whileTap={!isLocked ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${user.color} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-[#013220] text-sm truncate">
                                {user.name}
                              </p>
                              <p className="text-xs text-[#6E7276] truncate">
                                {user.label}
                              </p>
                              <p className="text-xs text-[#6E7276]/60 truncate">
                                {user.description}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Empresas */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#013220] to-[#0a4a30] flex items-center justify-center">
                      <Building2 className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="text-sm font-medium text-[#013220]">Salones</h4>
                  </div>
                  <div className="space-y-2">
                    {empresas.map((user, index) => {
                      const Icon = user.icon;
                      return (
                        <motion.button
                          key={user.email}
                          onClick={() => handleQuickLogin(user.email)}
                          disabled={isLocked}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (usuarias.length + estilistas.length + index) * 0.05 }}
                          className={`
                            w-full p-3 rounded-xl
                            border-2 transition-all duration-200
                            text-left
                            ${isLocked 
                              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' 
                              : 'border-[#013220]/20 hover:border-[#013220] hover:bg-gradient-to-r hover:from-[#013220]/5 hover:to-transparent hover:shadow-lg cursor-pointer'
                            }
                          `}
                          whileHover={!isLocked ? { x: 4 } : {}}
                          whileTap={!isLocked ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${user.color} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-[#013220] text-sm truncate">
                                {user.name}
                              </p>
                              <p className="text-xs text-[#6E7276] truncate">
                                {user.label}
                              </p>
                              <p className="text-xs text-[#6E7276]/60 truncate">
                                {user.description}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Info footer */}
                <div className="pt-2 border-t border-[#C9A24F]/20">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-[#FF2D95]/5 to-[#C9A24F]/5 border border-[#C9A24F]/20">
                    <p className="text-xs text-[#6E7276] leading-relaxed">
                      <strong className="text-[#013220]">Contraseña para todos:</strong> 123456
                      <br />
                      <span className="text-[#6E7276]/60">
                        {isLocked ? '🔒 Panel bloqueado' : '✨ Click para login instantáneo'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicator badge */}
      {!isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-2 -left-2 bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] text-white text-xs px-2 py-1 rounded-full shadow-lg"
          >
            DEV
          </motion.div>

          {/* Tooltip informativo */}
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute top-20 right-0 bg-[#013220] text-white px-4 py-3 rounded-xl shadow-2xl max-w-xs pointer-events-none"
            >
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Acceso Rápido DEV</p>
                  <p className="text-xs opacity-80">
                    Click aquí o presiona <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">⌘K</kbd> para login instantáneo
                  </p>
                </div>
              </div>
              {/* Arrow */}
              <div 
                className="absolute -top-2 right-6 w-4 h-4 bg-[#013220] transform rotate-45"
              />
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
