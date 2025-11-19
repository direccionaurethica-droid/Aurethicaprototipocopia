import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface AccessibleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 * AccessibleInput - Input con etiquetas, errores y estados accesibles
 * Cumple con WCAG 2.1 AA
 * Sistema de espaciado base 8px
 */
export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ label, error, success, hint, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const successId = success ? `${inputId}-success` : undefined;

    const hasError = !!error;
    const hasSuccess = !!success;

    return (
      <div className="w-full space-y-2">
        {/* Label */}
        <label 
          htmlFor={inputId}
          className="block font-medium text-[#101418] dark:text-[#e8e9ea]"
        >
          {label}
          {props.required && (
            <span className="text-[#FF2D95] ml-1" aria-label="requerido">*</span>
          )}
        </label>

        {/* Hint text */}
        {hint && !error && !success && (
          <p id={hintId} className="text-sm text-[#6E7276] dark:text-[#9ca3af]">
            {hint}
          </p>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7276]" aria-hidden="true">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-3 rounded-2xl
              bg-white dark:bg-[#1a1d21]
              border-2 transition-all duration-200
              ${hasError ? 'border-[#d4183d] focus:border-[#d4183d] focus:ring-[#d4183d]' : ''}
              ${hasSuccess ? 'border-[#00C853] focus:border-[#00C853] focus:ring-[#00C853]' : ''}
              ${!hasError && !hasSuccess ? 'border-[#F5F2E9] dark:border-[#2a2d31] focus:border-[#013220] dark:focus:border-[#00ff88] focus:ring-[#013220] dark:focus:ring-[#00ff88]' : ''}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon || hasError || hasSuccess ? 'pr-10' : ''}
              focus:outline-none focus:ring-2 focus:ring-opacity-50
              placeholder:text-[#6E7276] dark:placeholder:text-[#9ca3af]
              text-[#101418] dark:text-[#e8e9ea]
              disabled:opacity-50 disabled:cursor-not-allowed
              ${className}
            `}
            aria-describedby={[hintId, errorId, successId].filter(Boolean).join(' ') || undefined}
            aria-invalid={hasError}
            {...props}
          />

          {/* Right icon / Status icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {hasError && (
              <AlertCircle className="w-5 h-5 text-[#d4183d]" aria-hidden="true" />
            )}
            {hasSuccess && (
              <CheckCircle2 className="w-5 h-5 text-[#00C853]" aria-hidden="true" />
            )}
            {!hasError && !hasSuccess && rightIcon && (
              <span className="text-[#6E7276]" aria-hidden="true">{rightIcon}</span>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-[#d4183d] flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}

        {/* Success message */}
        {success && !error && (
          <motion.p
            id={successId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-[#00C853] flex items-center gap-1"
            role="status"
          >
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {success}
          </motion.p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';
