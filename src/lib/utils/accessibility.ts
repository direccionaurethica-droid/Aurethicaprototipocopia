/**
 * Utilidades de accesibilidad
 * Ayuda a mantener los estándares WCAG AA/AAA
 */

/**
 * Calcula el ratio de contraste entre dos colores hex
 * Siguiendo la fórmula WCAG 2.0
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const getLuminance = (hex: string): number => {
    // Convertir hex a RGB
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Convertir a sRGB
    const rsRGB = r / 255;
    const gsRGB = g / 255;
    const bsRGB = b / 255;

    // Aplicar fórmula de luminancia
    const toLinear = (val: number) => {
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    };

    const rLinear = toLinear(rsRGB);
    const gLinear = toLinear(gsRGB);
    const bLinear = toLinear(bsRGB);

    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
  };

  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Verifica si un contraste cumple con WCAG AA
 * Para texto normal: 4.5:1
 * Para texto grande (18pt+): 3:1
 */
export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  const minRatio = isLargeText ? 3 : 4.5;
  return ratio >= minRatio;
}

/**
 * Verifica si un contraste cumple con WCAG AAA
 * Para texto normal: 7:1
 * Para texto grande (18pt+): 4.5:1
 */
export function meetsWCAGAAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  const minRatio = isLargeText ? 4.5 : 7;
  return ratio >= minRatio;
}

/**
 * Paleta de colores Auréthica con sus ratios de contraste
 */
export const AURETHICA_COLORS = {
  ivory: '#F5F2E9',
  emerald: '#013220',
  gold: '#C9A24F',
  ink: '#101418',
  stone: '#6E7276',
  gigi: '#FF2D95',
  white: '#FFFFFF',
} as const;

/**
 * Combinaciones de colores validadas para WCAG AA
 */
export const ACCESSIBLE_COMBINATIONS = {
  // Texto oscuro sobre fondos claros
  inkOnIvory: { fg: AURETHICA_COLORS.ink, bg: AURETHICA_COLORS.ivory },
  emeraldOnIvory: { fg: AURETHICA_COLORS.emerald, bg: AURETHICA_COLORS.ivory },
  stoneOnIvory: { fg: AURETHICA_COLORS.stone, bg: AURETHICA_COLORS.ivory },
  
  // Texto claro sobre fondos oscuros
  ivoryOnEmerald: { fg: AURETHICA_COLORS.ivory, bg: AURETHICA_COLORS.emerald },
  whiteOnEmerald: { fg: AURETHICA_COLORS.white, bg: AURETHICA_COLORS.emerald },
  whiteOnInk: { fg: AURETHICA_COLORS.white, bg: AURETHICA_COLORS.ink },
  
  // Acentos
  gigiOnIvory: { fg: AURETHICA_COLORS.gigi, bg: AURETHICA_COLORS.ivory }, // Solo para elementos grandes
  goldOnEmerald: { fg: AURETHICA_COLORS.gold, bg: AURETHICA_COLORS.emerald },
} as const;

/**
 * Genera atributos ARIA para elementos interactivos
 */
export function getAriaProps(options: {
  label?: string;
  pressed?: boolean;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  live?: 'polite' | 'assertive' | 'off';
  busy?: boolean;
}) {
  const props: Record<string, any> = {};

  if (options.label) props['aria-label'] = options.label;
  if (options.pressed !== undefined) props['aria-pressed'] = options.pressed;
  if (options.expanded !== undefined) props['aria-expanded'] = options.expanded;
  if (options.selected !== undefined) props['aria-selected'] = options.selected;
  if (options.disabled) props['aria-disabled'] = true;
  if (options.live) props['aria-live'] = options.live;
  if (options.busy !== undefined) props['aria-busy'] = options.busy;

  return props;
}

/**
 * Agrega focus visible para navegación por teclado
 */
export const FOCUS_VISIBLE_CLASSES = 
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#013220] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2E9]';

/**
 * Estados de hover accesibles
 */
export const HOVER_ACCESSIBLE_CLASSES = 
  'transition-colors duration-200 hover:opacity-80';

/**
 * Verifica si el modo de contraste alto está activo
 */
export function isHighContrastMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Verifica si el usuario prefiere movimiento reducido
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
