/**
 * Componente de toggle de tema
 * Switch elegante para alternar entre modo claro y oscuro
 */

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
          rotate: isDark ? 180 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-[#C9A24F]" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : -180,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-[#FF2D95]" />
      </motion.div>
    </button>
  );
}

/**
 * Variante más elegante con switch
 */
export function ThemeSwitch() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300"
      style={{
        backgroundColor: isDark ? '#013220' : '#C9A24F',
      }}
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
    >
      <motion.div
        className="flex items-center justify-center h-6 w-6 rounded-full bg-white shadow-md"
        animate={{
          x: isDark ? 36 : 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-[#013220]" />
        ) : (
          <Sun className="w-3 h-3 text-[#C9A24F]" />
        )}
      </motion.div>
    </button>
  );
}

/**
 * Variante compacta para móvil
 */
export function ThemeToggleCompact() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full"
      style={{
        backgroundColor: isDark ? 'rgba(255, 45, 149, 0.1)' : 'rgba(201, 162, 79, 0.1)',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
    >
      <motion.div
        animate={{
          rotate: isDark ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-[#FF2D95]" />
        ) : (
          <Sun className="w-5 h-5 text-[#C9A24F]" />
        )}
      </motion.div>
    </motion.button>
  );
}
