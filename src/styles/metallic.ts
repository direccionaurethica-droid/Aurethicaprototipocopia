/**
 * Utilidades de estilos metálicos para Auréthica
 * Efectos dorados premium con brillos y sombras realistas
 */

export const metallicStyles = {
  // Gradiente dorado metálico para textos
  textGradient: {
    background: 'linear-gradient(135deg, #C9A24F 0%, #E8C878 25%, #F5E6C8 50%, #E8C878 75%, #C9A24F 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    backgroundSize: '200% auto',
  },

  // Sombra metálica dorada para textos
  textShadow: {
    textShadow: `
      0 1px 1px rgba(0, 0, 0, 0.2),
      0 2px 4px rgba(201, 162, 79, 0.3),
      0 4px 8px rgba(212, 175, 55, 0.2),
      0 0 12px rgba(232, 200, 120, 0.4)
    `,
  },

  // Sombra de caja metálica para botones
  boxShadow: {
    boxShadow: `
      0 1px 0 rgba(255, 255, 255, 0.5) inset,
      0 -1px 0 rgba(0, 0, 0, 0.2) inset,
      0 4px 8px rgba(201, 162, 79, 0.3),
      0 8px 16px rgba(212, 175, 55, 0.2),
      0 0 20px rgba(232, 200, 120, 0.15)
    `,
  },

  // Gradiente de fondo metálico para botones
  buttonGradient: {
    background: 'linear-gradient(135deg, #C9A24F 0%, #D4AF37 25%, #E8C878 50%, #D4AF37 75%, #C9A24F 100%)',
    backgroundSize: '200% auto',
  },

  // Brillo superior metálico
  topShine: {
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
  },

  // Borde metálico con gradiente
  border: {
    border: '1px solid rgba(232, 200, 120, 0.3)',
    boxShadow: '0 0 0 1px rgba(201, 162, 79, 0.1) inset',
  },

  // Resplandor dorado animado
  glow: {
    filter: 'drop-shadow(0 0 8px rgba(232, 200, 120, 0.6)) drop-shadow(0 0 16px rgba(212, 175, 55, 0.4))',
  },
};

// Clases CSS inline para texto metálico
export const getMetallicTextStyle = (size: 'sm' | 'md' | 'lg' = 'md') => {
  const sizes = {
    sm: {
      fontSize: '14px',
      textShadow: `
        0 1px 1px rgba(0, 0, 0, 0.2),
        0 2px 3px rgba(201, 162, 79, 0.2),
        0 0 8px rgba(232, 200, 120, 0.3)
      `,
    },
    md: {
      fontSize: '16px',
      textShadow: `
        0 1px 1px rgba(0, 0, 0, 0.2),
        0 2px 4px rgba(201, 162, 79, 0.3),
        0 4px 8px rgba(212, 175, 55, 0.2),
        0 0 12px rgba(232, 200, 120, 0.4)
      `,
    },
    lg: {
      fontSize: '24px',
      textShadow: `
        0 2px 2px rgba(0, 0, 0, 0.3),
        0 4px 6px rgba(201, 162, 79, 0.4),
        0 6px 12px rgba(212, 175, 55, 0.3),
        0 0 20px rgba(232, 200, 120, 0.5)
      `,
    },
  };

  return {
    ...metallicStyles.textGradient,
    ...sizes[size],
  };
};

// Clase Tailwind combinada para botones metálicos
export const metallicButtonClass = 'relative overflow-hidden transition-all duration-300';

// Estilos inline para botones metálicos
export const getMetallicButtonStyle = (hover: boolean = false) => ({
  background: 'linear-gradient(135deg, #C9A24F 0%, #D4AF37 25%, #E8C878 50%, #D4AF37 75%, #C9A24F 100%)',
  backgroundSize: '200% auto',
  backgroundPosition: hover ? '100% center' : '0% center',
  boxShadow: hover
    ? `
      0 1px 0 rgba(255, 255, 255, 0.6) inset,
      0 -1px 0 rgba(0, 0, 0, 0.2) inset,
      0 6px 12px rgba(201, 162, 79, 0.4),
      0 12px 24px rgba(212, 175, 55, 0.3),
      0 0 30px rgba(232, 200, 120, 0.25)
    `
    : `
      0 1px 0 rgba(255, 255, 255, 0.5) inset,
      0 -1px 0 rgba(0, 0, 0, 0.2) inset,
      0 4px 8px rgba(201, 162, 79, 0.3),
      0 8px 16px rgba(212, 175, 55, 0.2),
      0 0 20px rgba(232, 200, 120, 0.15)
    `,
  border: '1px solid rgba(232, 200, 120, 0.3)',
  transition: 'all 0.3s ease',
});
