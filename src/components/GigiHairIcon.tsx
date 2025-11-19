/**
 * GigiHairIcon - Ícono distintivo de Gigi formado por mechones de cabello en círculo
 * Representa la identidad de la asistente IA con un símbolo elegante y minimalista
 */

import { motion } from 'motion/react';

interface GigiHairIconProps {
  size?: number;
  animate?: boolean;
  className?: string;
  color?: string;
}

export function GigiHairIcon({ 
  size = 24, 
  animate = true, 
  className = '',
  color = '#FF2D95'
}: GigiHairIconProps) {
  // Número de mechones de cabello que forman el círculo
  const hairStrands = 12;
  const radius = size / 2 - 2;
  const centerX = size / 2;
  const centerY = size / 2;

  // Generar posiciones de mechones alrededor del círculo
  const strands = Array.from({ length: hairStrands }, (_, i) => {
    const angle = (i * 360) / hairStrands;
    const rad = (angle * Math.PI) / 180;
    
    // Posición base del mechón
    const x = centerX + radius * Math.cos(rad);
    const y = centerY + radius * Math.sin(rad);
    
    // Punto de control para curva Bezier (efecto ondulado del cabello)
    const controlX = centerX + (radius * 1.3) * Math.cos(rad);
    const controlY = centerY + (radius * 1.3) * Math.sin(rad);
    
    // Punto final (más alejado, simula punta del cabello)
    const endX = centerX + (radius * 1.5) * Math.cos(rad);
    const endY = centerY + (radius * 1.5) * Math.sin(rad);
    
    return {
      angle,
      path: `M ${centerX},${centerY} Q ${controlX},${controlY} ${endX},${endY}`,
      delay: i * 0.03,
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Ícono de Gigi"
    >
      {/* Gradiente para efecto cromado */}
      <defs>
        <radialGradient id="gigiHairGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="50%" stopColor="#C9A24F" stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </radialGradient>
        
        <linearGradient id="gigiHairShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="50%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C9A24F" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Círculo base suave (representa el cuero cabelludo/raíz) */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius * 0.3}
        fill="url(#gigiHairGradient)"
        opacity="0.6"
      />

      {/* Mechones de cabello formando el círculo */}
      {strands.map((strand, index) => (
        <motion.path
          key={index}
          d={strand.path}
          stroke="url(#gigiHairShine)"
          strokeWidth={size / 16}
          strokeLinecap="round"
          fill="none"
          initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animate ? { 
            pathLength: 1, 
            opacity: [0.5, 0.8, 0.5],
          } : undefined}
          transition={{
            pathLength: { duration: 1.5, delay: strand.delay, ease: 'easeOut' },
            opacity: { 
              duration: 3, 
              delay: strand.delay,
              repeat: Infinity, 
              ease: 'easeInOut' 
            },
          }}
        />
      ))}

      {/* Círculo interior decorativo (brillo central) */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={radius * 0.15}
        fill="white"
        opacity="0.6"
        animate={animate ? {
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        } : undefined}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}

/**
 * Versión simplificada para espacios reducidos
 */
export function GigiHairIconSimple({ 
  size = 16, 
  className = '',
  color = '#FF2D95'
}: Omit<GigiHairIconProps, 'animate'>) {
  const radius = size / 2;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Ícono de Gigi"
    >
      <defs>
        <radialGradient id={`gigiSimple-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} />
          <stop offset="50%" stopColor="#C9A24F" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      
      {/* Círculo sólido con gradiente cromado */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius - 1}
        fill={`url(#gigiSimple-${size})`}
      />
      
      {/* Pequeños destellos que sugieren mechones */}
      <circle cx={centerX} cy={centerY - radius * 0.6} r={radius * 0.15} fill="white" opacity="0.5" />
      <circle cx={centerX + radius * 0.5} cy={centerY + radius * 0.3} r={radius * 0.12} fill="white" opacity="0.4" />
      <circle cx={centerX - radius * 0.5} cy={centerY + radius * 0.3} r={radius * 0.12} fill="white" opacity="0.4" />
    </svg>
  );
}
