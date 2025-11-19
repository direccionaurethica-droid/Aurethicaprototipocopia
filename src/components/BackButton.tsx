/**
 * BackButton - Botón de retroceso universal elegante
 * Diseño minimalista y lineal para todas las páginas
 */

import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  variant?: 'default' | 'light';
}

export function BackButton({ onClick, label = 'Atrás', className = '', variant = 'default' }: BackButtonProps) {
  const isLight = variant === 'light';
  
  return (
    <motion.button
      onClick={onClick}
      className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl ${
        isLight 
          ? 'bg-[#C9A24F]/10 border border-[#C9A24F]/40 hover:border-[#C9A24F]/70 hover:bg-[#C9A24F]/20' 
          : 'bg-white border border-[#6E7276]/20 hover:border-[#C9A24F]/40'
      } transition-all duration-300 hover:shadow-md ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02, x: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={{ x: [0, -2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronLeft className={`w-5 h-5 ${
          isLight 
            ? 'text-[#C9A24F] group-hover:text-[#d4ad5f]' 
            : 'text-[#6E7276] group-hover:text-[#C9A24F]'
        } transition-colors`} />
      </motion.div>
      <span 
        className={`text-sm ${
          isLight 
            ? 'text-[#C9A24F] group-hover:text-[#d4ad5f]' 
            : 'text-[#6E7276] group-hover:text-[#C9A24F]'
        } font-medium transition-colors`}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {label}
      </span>
    </motion.button>
  );
}