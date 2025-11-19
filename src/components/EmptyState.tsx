/**
 * EmptyState - Estados vacíos con personalidad
 * Convierte momentos vacíos en oportunidades de engagement
 */

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { Button } from './ui/button';

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: ReactNode;
}

interface EmptyStateProps {
  illustration?: ReactNode;
  icon?: ReactNode;
  title: string;
  description: string;
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
  variant?: 'default' | 'minimal' | 'playful';
  className?: string;
}

export function EmptyState({
  illustration,
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'default',
  className = ''
}: EmptyStateProps) {

  const renderIllustration = () => {
    if (illustration) {
      return (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="mb-6"
        >
          {illustration}
        </motion.div>
      );
    }

    if (icon) {
      return (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="mb-6 w-20 h-20 rounded-full bg-gradient-to-r from-[#FF2D95]/20 to-[#C9A24F]/20 flex items-center justify-center"
        >
          <div className="text-[#013220]">
            {icon}
          </div>
        </motion.div>
      );
    }

    return null;
  };

  const renderDefaultVariant = () => (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}>
      {renderIllustration()}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-md"
      >
        <h3 
          className="text-2xl mb-3 text-[#013220]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {title}
        </h3>
        
        <p className="text-[#6E7276] mb-8">
          {description}
        </p>

        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {primaryAction && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={primaryAction.onClick}
                  className="bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] text-white hover:from-[#ff4da8] hover:to-[#d4b366] px-6 py-6"
                >
                  {primaryAction.icon && <span className="mr-2">{primaryAction.icon}</span>}
                  {primaryAction.label}
                </Button>
              </motion.div>
            )}

            {secondaryAction && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={secondaryAction.onClick}
                  variant="outline"
                  className="border-2 border-[#013220] text-[#013220] hover:bg-[#013220] hover:text-white px-6 py-6"
                >
                  {secondaryAction.icon && <span className="mr-2">{secondaryAction.icon}</span>}
                  {secondaryAction.label}
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderMinimalVariant = () => (
    <div className={`flex flex-col items-center justify-center text-center py-8 px-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {icon && (
          <div className="mb-4 text-gray-400">
            {icon}
          </div>
        )}
        
        <h4 className="text-lg mb-2 text-[#101418]">{title}</h4>
        <p className="text-sm text-[#6E7276] mb-4">{description}</p>

        {primaryAction && (
          <Button
            onClick={primaryAction.onClick}
            size="sm"
            className="bg-[#013220] text-white hover:bg-[#0a4a30]"
          >
            {primaryAction.icon && <span className="mr-2">{primaryAction.icon}</span>}
            {primaryAction.label}
          </Button>
        )}
      </motion.div>
    </div>
  );

  const renderPlayfulVariant = () => (
    <div className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}>
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {renderIllustration()}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="max-w-lg"
      >
        <h3 
          className="text-3xl mb-4 bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] bg-clip-text text-transparent"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {title}
        </h3>
        
        <p className="text-lg text-[#6E7276] mb-10">
          {description}
        </p>

        {primaryAction && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={primaryAction.onClick}
              className="bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] text-white hover:from-[#ff4da8] hover:to-[#d4b366] px-8 py-6 text-lg shadow-2xl"
            >
              {primaryAction.icon && <span className="mr-3">{primaryAction.icon}</span>}
              {primaryAction.label}
            </Button>
          </motion.div>
        )}

        {secondaryAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4"
          >
            <button
              onClick={secondaryAction.onClick}
              className="text-[#013220] hover:text-[#C9A24F] transition-colors underline"
            >
              {secondaryAction.label}
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#C9A24F]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );

  if (variant === 'minimal') return renderMinimalVariant();
  if (variant === 'playful') return renderPlayfulVariant();
  return renderDefaultVariant();
}

// Pre-built empty states for common scenarios
export const NoAppointmentsEmpty = ({ onCreateAppointment }: { onCreateAppointment: () => void }) => (
  <EmptyState
    icon={
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    }
    title="Tu agenda está esperándote"
    description="Agenda tu primera cita de belleza y comienza tu transformación con Auréthica"
    primaryAction={{
      label: 'Agendar Mi Primera Cita',
      onClick: onCreateAppointment,
      icon: <span>📅</span>
    }}
    variant="playful"
  />
);

export const NoResultsEmpty = ({ onClearFilters }: { onClearFilters: () => void }) => (
  <EmptyState
    icon={
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    }
    title="No encontramos resultados"
    description="Intenta ajustar tus filtros o busca con otros términos"
    primaryAction={{
      label: 'Limpiar Filtros',
      onClick: onClearFilters
    }}
    variant="minimal"
  />
);

export const NoFavoritesEmpty = ({ onExplore }: { onExplore: () => void }) => (
  <EmptyState
    icon={
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    }
    title="Aún no tienes favoritos"
    description="Guarda tus salones y estilistas preferidos para encontrarlos fácilmente"
    primaryAction={{
      label: 'Explorar Salones',
      onClick: onExplore,
      icon: <span>🔍</span>
    }}
    variant="default"
  />
);
