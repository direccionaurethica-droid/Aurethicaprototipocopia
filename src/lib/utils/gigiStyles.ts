/**
 * gigiStyles - Utilidades para aplicar estilos consistentes de Gigi
 * Centraliza los estilos cromáticos de la asistente IA
 */

// Colores de Gigi
export const GIGI_COLORS = {
  fucsia: '#FF2D95',
  dorado: '#C9A24F',
  verde: '#013220',
  fucsiaRgb: 'rgb(255, 45, 149)',
  doradoRgb: 'rgb(201, 162, 79)',
  verdeRgb: 'rgb(1, 50, 32)',
} as const;

// Gradiente cromado de Gigi - Dorado/Fucsia/Dorado (efecto espejo cromado)
export const GIGI_GRADIENT = {
  background: 'linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)',
  backgroundSimple: 'linear-gradient(135deg, #FF2D95 0%, #C9A24F 100%)',
  backgroundReverse: 'linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)',
  textColor: '#013220',
} as const;

// Sombras de Gigi
export const GIGI_SHADOWS = {
  glow: '0 4px 20px rgba(255, 45, 149, 0.4), 0 0 40px rgba(255, 45, 149, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
  soft: '0 2px 10px rgba(255, 45, 149, 0.2)',
  medium: '0 4px 15px rgba(255, 45, 149, 0.3)',
  strong: '0 8px 25px rgba(255, 45, 149, 0.5)',
} as const;

// Clases Tailwind predefinidas para Gigi
export const GIGI_CLASSES = {
  // Títulos
  titleLarge: 'text-[#FF2D95] text-2xl md:text-3xl',
  titleMedium: 'text-[#FF2D95] text-xl md:text-2xl',
  titleSmall: 'text-[#FF2D95] text-lg',
  
  // Textos
  textEmphasis: 'text-[#FF2D95] font-semibold',
  textNormal: 'text-[#FF2D95]',
  
  // Fondos
  bgSubtle: 'bg-[#FF2D95]/5',
  bgLight: 'bg-[#FF2D95]/10',
  bgMedium: 'bg-[#FF2D95]/20',
  
  // Bordes
  borderSubtle: 'border-[#FF2D95]/20',
  borderLight: 'border-[#FF2D95]/30',
  borderMedium: 'border-[#FF2D95]/50',
  borderStrong: 'border-[#FF2D95]',
  
  // Tarjetas
  card: 'bg-gradient-to-r from-[#FF2D95]/5 via-white to-[#C9A24F]/5 rounded-2xl border border-[#FF2D95]/20',
  cardHover: 'hover:border-[#FF2D95]/40 hover:shadow-md transition-all duration-300',
  
  // Indicadores
  progressActive: 'bg-[#FF2D95] shadow-md shadow-[#FF2D95]/30',
  progressCompleted: 'bg-[#C9A24F]',
  progressPending: 'bg-[#6E7276]/20',
  
  // Radio Buttons
  radioSelected: 'border-[#FF2D95] bg-[#FF2D95]',
  radioHover: 'group-hover:border-[#FF2D95]/60',
  radioDefault: 'border-[#6E7276]/40',
  
  // Focus states
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-[#FF2D95] focus:ring-offset-2',
} as const;

/**
 * Genera un estilo inline para el gradiente cromado de Gigi
 */
export const getGigiGradientStyle = (variant: 'normal' | 'reverse' = 'normal'): React.CSSProperties => {
  return {
    background: variant === 'normal' ? GIGI_GRADIENT.background : GIGI_GRADIENT.backgroundReverse,
    boxShadow: GIGI_SHADOWS.glow,
  };
};

/**
 * Genera un estilo inline para el efecto de brillo hover
 */
export const getGigiBrilloHoverStyle = (): React.CSSProperties => {
  return {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, transparent 50%, rgba(255, 45, 149, 0.4) 100%)',
  };
};

/**
 * Genera un estilo inline para el reflejo metálico animado
 */
export const getGigiReflejoMetalicoStyle = (): React.CSSProperties => {
  return {
    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
    backgroundSize: '200% 100%',
    opacity: 0.4,
  };
};

/**
 * Helper para combinar clases de Gigi
 */
export const combineGigiClasses = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Retorna las clases apropiadas para un título de Gigi según el tamaño
 */
export const getGigiTitleClasses = (size: 'sm' | 'md' | 'lg' = 'md', withIcon: boolean = false): string => {
  const sizeClass = {
    sm: GIGI_CLASSES.titleSmall,
    md: GIGI_CLASSES.titleMedium,
    lg: GIGI_CLASSES.titleLarge,
  }[size];

  return combineGigiClasses(
    sizeClass,
    withIcon && 'flex items-center gap-2'
  );
};

/**
 * Retorna las clases apropiadas para una tarjeta de Gigi
 */
export const getGigiCardClasses = (interactive: boolean = false): string => {
  return combineGigiClasses(
    GIGI_CLASSES.card,
    interactive && GIGI_CLASSES.cardHover
  );
};

/**
 * Retorna las clases apropiadas para un indicador de progreso de Gigi
 */
export const getGigiProgressClasses = (state: 'active' | 'completed' | 'pending'): string => {
  const stateClass = {
    active: GIGI_CLASSES.progressActive,
    completed: GIGI_CLASSES.progressCompleted,
    pending: GIGI_CLASSES.progressPending,
  }[state];

  return combineGigiClasses(
    'h-2 rounded-full transition-all duration-500',
    state === 'active' ? 'w-12' : 'w-2',
    stateClass
  );
};

/**
 * Retorna las clases apropiadas para un radio button de Gigi
 */
export const getGigiRadioClasses = (selected: boolean, hover: boolean = true): string => {
  return combineGigiClasses(
    'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300',
    selected ? GIGI_CLASSES.radioSelected : GIGI_CLASSES.radioDefault,
    !selected && hover && GIGI_CLASSES.radioHover
  );
};

/**
 * Retorna el color fucsia de Gigi con opacidad opcional
 */
export const getGigiFucsia = (opacity: number = 1): string => {
  if (opacity === 1) return GIGI_COLORS.fucsia;
  return `rgba(255, 45, 149, ${opacity})`;
};

/**
 * Verifica si un elemento está relacionado con Gigi basado en props o contexto
 */
export const isGigiContext = (props: { variant?: string; theme?: string }): boolean => {
  return props.variant === 'gigi' || props.theme === 'gigi';
};

// Exportar todo como objeto para importación limpia
export const GigiStyles = {
  colors: GIGI_COLORS,
  gradient: GIGI_GRADIENT,
  shadows: GIGI_SHADOWS,
  classes: GIGI_CLASSES,
  getGradientStyle: getGigiGradientStyle,
  getBrilloHoverStyle: getGigiBrilloHoverStyle,
  getReflejoMetalicoStyle: getGigiReflejoMetalicoStyle,
  getTitleClasses: getGigiTitleClasses,
  getCardClasses: getGigiCardClasses,
  getProgressClasses: getGigiProgressClasses,
  getRadioClasses: getGigiRadioClasses,
  getFucsia: getGigiFucsia,
  isContext: isGigiContext,
  combine: combineGigiClasses,
};

export default GigiStyles;
