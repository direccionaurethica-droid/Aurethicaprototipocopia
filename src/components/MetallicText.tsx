/**
 * MetallicText - Componente de texto con efecto metálico dorado
 * Para títulos y textos destacados con apariencia premium
 */

import { CSSProperties, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface MetallicTextProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  animated?: boolean;
  className?: string;
}

export function MetallicText({ 
  children, 
  size = 'md', 
  as: Component = 'div',
  animated = true,
  className = '',
  ...props 
}: MetallicTextProps) {
  const textShadows = {
    sm: `
      0 1px 1px rgba(0, 0, 0, 0.2),
      0 2px 3px rgba(201, 162, 79, 0.2),
      0 0 8px rgba(232, 200, 120, 0.3)
    `,
    md: `
      0 1px 1px rgba(0, 0, 0, 0.2),
      0 2px 4px rgba(201, 162, 79, 0.3),
      0 4px 8px rgba(212, 175, 55, 0.2),
      0 0 12px rgba(232, 200, 120, 0.4)
    `,
    lg: `
      0 2px 2px rgba(0, 0, 0, 0.3),
      0 4px 6px rgba(201, 162, 79, 0.4),
      0 6px 12px rgba(212, 175, 55, 0.3),
      0 0 20px rgba(232, 200, 120, 0.5)
    `,
    xl: `
      0 3px 3px rgba(0, 0, 0, 0.3),
      0 6px 10px rgba(201, 162, 79, 0.5),
      0 10px 20px rgba(212, 175, 55, 0.4),
      0 0 30px rgba(232, 200, 120, 0.6)
    `,
  };

  const baseStyle: CSSProperties = {
    background: 'linear-gradient(135deg, #C9A24F 0%, #E8C878 25%, #F5E6C8 50%, #E8C878 75%, #C9A24F 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    backgroundSize: '200% auto',
    textShadow: textShadows[size],
    filter: 'drop-shadow(0 0 8px rgba(232, 200, 120, 0.3))',
  };

  const animationProps = animated ? {
    animate: {
      backgroundPosition: ['0% center', '100% center', '0% center'],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'linear',
    },
  } : {};

  return (
    <motion.div
      {...animationProps}
      {...props}
      className={`inline-block ${className}`}
      style={{
        ...baseStyle,
        ...props.style,
      }}
    >
      {children}
    </motion.div>
  );
}
