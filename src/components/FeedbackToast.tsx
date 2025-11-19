import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface FeedbackToastProps {
  show: boolean;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle2,
    bgColor: 'bg-white dark:bg-[#1a1d21]',
    borderColor: 'border-[#00C853]',
    iconColor: 'text-[#00C853]',
    textColor: 'text-[#101418] dark:text-[#e8e9ea]',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-white dark:bg-[#1a1d21]',
    borderColor: 'border-[#d4183d]',
    iconColor: 'text-[#d4183d]',
    textColor: 'text-[#101418] dark:text-[#e8e9ea]',
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-white dark:bg-[#1a1d21]',
    borderColor: 'border-[#C9A24F]',
    iconColor: 'text-[#C9A24F]',
    textColor: 'text-[#101418] dark:text-[#e8e9ea]',
  },
  info: {
    icon: Info,
    bgColor: 'bg-white dark:bg-[#1a1d21]',
    borderColor: 'border-[#013220] dark:border-[#00ff88]',
    iconColor: 'text-[#013220] dark:text-[#00ff88]',
    textColor: 'text-[#101418] dark:text-[#e8e9ea]',
  },
};

/**
 * FeedbackToast - Toast notification accesible
 * Proporciona feedback inmediato de acciones del usuario
 * Sistema de espaciado 8px, WCAG AA
 */
export function FeedbackToast({ 
  show, 
  type, 
  message, 
  description,
  duration = 3000,
  onClose 
}: FeedbackToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-4 right-4 z-[100] max-w-md"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div 
            className={`
              ${config.bgColor}
              border-l-4 ${config.borderColor}
              rounded-2xl shadow-2xl p-4
              flex items-start gap-3
            `}
          >
            {/* Icono */}
            <div className="flex-shrink-0 mt-0.5">
              <Icon className={`w-5 h-5 ${config.iconColor}`} aria-hidden="true" />
            </div>

            {/* Contenido */}
            <div className="flex-1 min-w-0">
              <p className={`font-medium ${config.textColor}`}>
                {message}
              </p>
              {description && (
                <p className="text-sm text-[#6E7276] dark:text-[#9ca3af] mt-1">
                  {description}
                </p>
              )}
            </div>

            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className={`
                flex-shrink-0 p-1 rounded-full
                hover:bg-[#F5F2E9] dark:hover:bg-[#2a2d31]
                transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#013220]
              `}
              aria-label="Cerrar notificación"
            >
              <X className="w-4 h-4 text-[#6E7276]" aria-hidden="true" />
            </button>
          </div>

          {/* Barra de progreso (opcional) */}
          {duration > 0 && (
            <motion.div
              className={`h-1 ${config.borderColor.replace('border-', 'bg-')} rounded-full mt-2`}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              aria-hidden="true"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook para usar toasts fácilmente
 */
export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: ToastType;
    message: string;
    description?: string;
  }>>([]);

  const showToast = (type: ToastType, message: string, description?: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message, description }]);
  };

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    showToast,
    hideToast,
    success: (message: string, description?: string) => showToast('success', message, description),
    error: (message: string, description?: string) => showToast('error', message, description),
    warning: (message: string, description?: string) => showToast('warning', message, description),
    info: (message: string, description?: string) => showToast('info', message, description),
  };
}

// Para usar: importar useState desde react
import { useState } from 'react';
