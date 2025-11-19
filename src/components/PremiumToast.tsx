/**
 * PremiumToast - Sistema de notificaciones mejorado
 * Wrapper premium sobre Sonner con animaciones Auréthica
 */

import { toast as sonnerToast, Toaster } from 'sonner';
import { CheckCircle, XCircle, AlertCircle, Info, Sparkles } from 'lucide-react';
import { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'premium';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  icon?: ReactNode;
}

class PremiumToast {
  success(message: string, options?: ToastOptions) {
    return sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      icon: options?.icon || <CheckCircle className="w-5 h-5 text-green-500" />,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined,
      cancel: options?.cancel ? {
        label: options.cancel.label,
        onClick: options.cancel.onClick
      } : undefined,
      className: 'premium-toast-success',
      style: {
        background: 'linear-gradient(to right, #10b981, #059669)',
        border: 'none',
        color: 'white',
        boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)',
      }
    });
  }

  error(message: string, options?: ToastOptions) {
    return sonnerToast.error(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      icon: options?.icon || <XCircle className="w-5 h-5 text-red-500" />,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined,
      className: 'premium-toast-error',
      style: {
        background: 'linear-gradient(to right, #ef4444, #dc2626)',
        border: 'none',
        color: 'white',
        boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.3)',
      }
    });
  }

  warning(message: string, options?: ToastOptions) {
    return sonnerToast.warning(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      icon: options?.icon || <AlertCircle className="w-5 h-5 text-amber-500" />,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined,
      className: 'premium-toast-warning',
      style: {
        background: 'linear-gradient(to right, #f59e0b, #d97706)',
        border: 'none',
        color: 'white',
        boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.3)',
      }
    });
  }

  info(message: string, options?: ToastOptions) {
    return sonnerToast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      icon: options?.icon || <Info className="w-5 h-5 text-blue-500" />,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined,
      className: 'premium-toast-info',
      style: {
        background: 'linear-gradient(to right, #3b82f6, #2563eb)',
        border: 'none',
        color: 'white',
        boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
      }
    });
  }

  premium(message: string, options?: ToastOptions) {
    return sonnerToast(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      icon: options?.icon || <Sparkles className="w-5 h-5 text-[#C9A24F]" />,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined,
      className: 'premium-toast-aurethica',
      style: {
        background: 'linear-gradient(135deg, #FF2D95, #C9A24F)',
        border: 'none',
        color: 'white',
        boxShadow: '0 20px 40px -10px rgba(255, 45, 149, 0.4)',
        backdropFilter: 'blur(10px)',
      }
    });
  }

  loading(message: string, options?: Omit<ToastOptions, 'duration'>) {
    return sonnerToast.loading(message, {
      description: options?.description,
      className: 'premium-toast-loading',
      style: {
        background: 'linear-gradient(to right, #013220, #0a4a30)',
        border: 'none',
        color: 'white',
        boxShadow: '0 10px 25px -5px rgba(1, 50, 32, 0.3)',
      }
    });
  }

  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) {
    return sonnerToast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      className: 'premium-toast-promise',
    });
  }

  dismiss(toastId?: string | number) {
    sonnerToast.dismiss(toastId);
  }
}

// Export singleton instance
export const toast = new PremiumToast();

// Export Toaster component with Auréthica styling
export function PremiumToastProvider({ 
  position = 'top-right' 
}: { 
  position?: ToastPosition 
}) {
  return (
    <Toaster
      position={position}
      toastOptions={{
        duration: 4000,
        style: {
          fontFamily: 'Montserrat, sans-serif',
          borderRadius: '12px',
          padding: '16px 20px',
          fontSize: '14px',
          fontWeight: 500,
        },
        className: 'premium-toast',
      }}
      theme="light"
      richColors
      closeButton
      expand={false}
      gap={12}
    />
  );
}

// CSS para animaciones personalizadas
export const toastStyles = `
  .premium-toast {
    animation: slideInFromTop 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .premium-toast[data-dismissed="true"] {
    animation: slideOutToTop 0.2s cubic-bezier(0.4, 0, 1, 1) forwards;
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-100%) scale(0.95);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  @keyframes slideOutToTop {
    from {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    to {
      transform: translateY(-100%) scale(0.95);
      opacity: 0;
    }
  }

  .premium-toast-aurethica {
    animation: premiumPulse 2s ease-in-out infinite;
  }

  @keyframes premiumPulse {
    0%, 100% {
      box-shadow: 0 20px 40px -10px rgba(255, 45, 149, 0.4);
    }
    50% {
      box-shadow: 0 25px 50px -10px rgba(255, 45, 149, 0.6);
    }
  }
`;
