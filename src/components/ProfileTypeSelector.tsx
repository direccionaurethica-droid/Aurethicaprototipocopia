/**
 * ProfileTypeSelector - Selector de tipo de perfil premium
 * Permite elegir entre Usuaria, Estilista o Empresa
 */

import { motion } from 'motion/react';
import { User, Scissors, Building2 } from 'lucide-react';
import type { UserRole } from '../lib/types';

interface ProfileTypeSelectorProps {
  selectedType: UserRole | null;
  onSelect: (type: UserRole) => void;
}

const profileTypes = [
  {
    role: 'usuaria' as UserRole,
    icon: User,
    title: 'Soy Clienta',
    description: 'Descubre tu estilo, agenda citas y conecta con salones',
    color: 'from-[#FF2D95] to-[#ff5db1]',
    borderColor: 'border-[#FF2D95]/40',
    hoverBorder: 'hover:border-[#FF2D95]',
  },
  {
    role: 'estilista' as UserRole,
    icon: Scissors,
    title: 'Soy Estilista',
    description: 'Gestiona tu agenda, servicios y técnicas de belleza',
    color: 'from-[#C9A24F] to-[#d4b366]',
    borderColor: 'border-[#C9A24F]/40',
    hoverBorder: 'hover:border-[#C9A24F]',
  },
  {
    role: 'empresa' as UserRole,
    icon: Building2,
    title: 'Soy Salón',
    description: 'Gestiona clientas, estilistas y servicios de tu negocio',
    color: 'from-[#013220] to-[#0a4a30]',
    borderColor: 'border-[#013220]/40',
    hoverBorder: 'hover:border-[#013220]',
  },
];

export function ProfileTypeSelector({ selectedType, onSelect }: ProfileTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 
          className="text-2xl text-[#013220] mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          ¿Cómo te defines?
        </h3>
        <p 
          className="text-[#6E7276] text-sm"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Selecciona el tipo de perfil que mejor te representa
        </p>
      </div>

      <div className="grid gap-4">
        {profileTypes.map((type, index) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.role;

          return (
            <motion.button
              key={type.role}
              onClick={() => onSelect(type.role)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                group relative overflow-hidden
                p-5 rounded-2xl
                border-2 transition-all duration-300
                ${isSelected 
                  ? 'border-current shadow-xl scale-[1.02]' 
                  : `${type.borderColor} ${type.hoverBorder} shadow-md hover:shadow-lg`
                }
              `}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background gradient cuando está seleccionado */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`absolute inset-0 bg-gradient-to-r ${type.color} opacity-10`}
                />
              )}

              <div className="relative flex items-center gap-4">
                {/* Icono */}
                <div className={`
                  w-14 h-14 rounded-xl
                  flex items-center justify-center
                  transition-all duration-300
                  ${isSelected 
                    ? `bg-gradient-to-br ${type.color} shadow-lg scale-110` 
                    : 'bg-[#F5F2E9] group-hover:scale-105'
                  }
                `}>
                  <Icon 
                    className={`w-7 h-7 transition-colors ${isSelected ? 'text-white' : 'text-[#013220]'}`}
                  />
                </div>

                {/* Contenido */}
                <div className="flex-1 text-left">
                  <h4 
                    className={`text-lg mb-1 transition-colors ${isSelected ? 'text-[#013220]' : 'text-[#101418]'}`}
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {type.title}
                  </h4>
                  <p 
                    className="text-sm text-[#6E7276] leading-relaxed"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {type.description}
                  </p>
                </div>

                {/* Checkmark cuando está seleccionado */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`
                      w-8 h-8 rounded-full
                      bg-gradient-to-br ${type.color}
                      flex items-center justify-center
                      shadow-lg
                    `}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </div>

              {/* Brillo hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${type.color} opacity-5`} />
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Nota informativa */}
      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-[#F5F2E9] border border-[#C9A24F]/20"
        >
          <p className="text-xs text-[#6E7276] text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {selectedType === 'usuaria' && '✨ Tendrás acceso completo al test de belleza, blog y búsqueda de salones'}
            {selectedType === 'estilista' && '💼 Tendrás acceso a agenda, técnicas y gestión de servicios'}
            {selectedType === 'empresa' && '🏢 Tendrás acceso completo a gestión de clientas, estilistas y servicios'}
          </p>
        </motion.div>
      )}
    </div>
  );
}
