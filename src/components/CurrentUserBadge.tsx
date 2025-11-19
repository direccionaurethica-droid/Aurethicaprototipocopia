/**
 * CurrentUserBadge - Badge que muestra el usuario actual logueado
 * Visible en todas las páginas para saber qué perfil estás usando
 * Ahora es movible y minimizable
 */

import { motion, AnimatePresence } from 'motion/react';
import { User, Scissors, Building2, X, Minimize2, Maximize2, GripVertical } from 'lucide-react';
import type { UserRole } from '../lib/types';
import { useState } from 'react';

interface CurrentUserBadgeProps {
  userName?: string;
  userEmail?: string;
  userRole?: UserRole;
  onLogout?: () => void;
}

export function CurrentUserBadge({ 
  userName, 
  userEmail, 
  userRole,
  onLogout 
}: CurrentUserBadgeProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 24 });
  const [isDragging, setIsDragging] = useState(false);

  if (!userName || !userEmail || !userRole) return null;

  const roleConfig = {
    usuaria: {
      color: 'from-[#FF2D95] to-[#ff5db1]',
      label: 'Clienta',
      icon: User,
      textColor: 'text-[#FF2D95]',
    },
    estilista: {
      color: 'from-[#C9A24F] to-[#d4b366]',
      label: 'Estilista',
      icon: Scissors,
      textColor: 'text-[#C9A24F]',
    },
    empresa: {
      color: 'from-[#013220] to-[#0a4a30]',
      label: 'Salón',
      icon: Building2,
      textColor: 'text-[#013220]',
    },
  };

  const config = roleConfig[userRole];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          setPosition({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y,
          });
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed z-50"
        style={{
          left: position.x,
          top: position.y,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <motion.div
          animate={{
            width: isMinimized ? '64px' : 'auto',
            height: isMinimized ? '64px' : 'auto',
          }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border-2 border-[#C9A24F]/20 overflow-hidden"
        >
          {isMinimized ? (
            // Vista minimizada - Solo icono
            <button
              onClick={() => setIsMinimized(false)}
              className={`
                w-16 h-16 rounded-2xl
                bg-gradient-to-br ${config.color}
                flex items-center justify-center
                hover:scale-105 transition-transform
                relative
              `}
            >
              <Icon className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#C9A24F] border-2 border-white" />
            </button>
          ) : (
            // Vista expandida
            <div className="p-4 max-w-xs">
              <div className="flex items-start gap-3">
                {/* Handle de arrastre */}
                <div className="pt-2">
                  <GripVertical className="w-4 h-4 text-[#6E7276]/40" />
                </div>

                {/* Avatar/Icon */}
                <div className={`
                  w-12 h-12 rounded-xl
                  bg-gradient-to-br ${config.color}
                  flex items-center justify-center
                  flex-shrink-0
                  shadow-lg
                `}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-[#013220] text-sm truncate">
                      {userName}
                    </p>
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full
                      bg-gradient-to-r ${config.color}
                      text-white
                      flex-shrink-0
                    `}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#6E7276] truncate">
                    {userEmail}
                  </p>
                </div>

                {/* Controles */}
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6E7276] transition-colors"
                    title="Minimizar"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </button>
                  {onLogout && (
                    <button
                      onClick={onLogout}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-[#6E7276] hover:text-red-500 transition-colors"
                      title="Cerrar sesión"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
