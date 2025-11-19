/**
 * ProgressStepper - Indicador de progreso premium
 * Ayuda al usuario a entender dónde está en su journey
 */

import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  variant?: 'minimal' | 'elegant' | 'bold';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function ProgressStepper({
  steps,
  currentStep,
  variant = 'elegant',
  orientation = 'horizontal',
  className = ''
}: ProgressStepperProps) {
  
  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'upcoming';
  };

  const renderMinimalVariant = () => (
    <div className={`flex items-center gap-2 ${className}`}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${
                  status === 'completed' ? 'bg-[#013220]' :
                  status === 'current' ? 'bg-[#C9A24F]' :
                  'bg-transparent'
                }`}
                initial={{ width: '0%' }}
                animate={{ 
                  width: status === 'completed' ? '100%' : 
                         status === 'current' ? '50%' : '0%' 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderElegantVariant = () => (
    <div className={`${orientation === 'horizontal' ? 'flex items-center' : 'flex flex-col'} ${className}`}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isLast = index === steps.length - 1;
        
        return (
          <div 
            key={step.id} 
            className={`flex ${orientation === 'horizontal' ? 'flex-col items-center flex-1' : 'flex-row items-start'}`}
          >
            {/* Step Circle */}
            <div className={`flex ${orientation === 'horizontal' ? 'flex-col' : 'flex-row'} items-center`}>
              <motion.div
                className={`
                  relative flex items-center justify-center
                  ${status === 'completed' ? 'w-10 h-10' : status === 'current' ? 'w-12 h-12' : 'w-8 h-8'}
                  rounded-full transition-all duration-300
                  ${status === 'completed' ? 'bg-gradient-to-r from-[#013220] to-[#0a4a30]' :
                    status === 'current' ? 'bg-gradient-to-r from-[#FF2D95] to-[#C9A24F]' :
                    'bg-gray-200'}
                `}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
              >
                {status === 'completed' ? (
                  <Check className="w-5 h-5 text-white" />
                ) : status === 'current' ? (
                  <motion.div
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                ) : (
                  <span className="text-xs text-gray-500">{index + 1}</span>
                )}
                
                {/* Pulse effect for current step */}
                {status === 'current' && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF2D95] to-[#C9A24F]"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                )}
              </motion.div>

              {/* Connector Line */}
              {!isLast && (
                <div className={`
                  ${orientation === 'horizontal' ? 'w-full h-0.5 mx-2' : 'h-12 w-0.5 my-2 ml-4'}
                  bg-gray-200 overflow-hidden
                `}>
                  <motion.div
                    className={`
                      ${orientation === 'horizontal' ? 'h-full' : 'w-full'}
                      ${status === 'completed' ? 'bg-[#013220]' : 'bg-transparent'}
                    `}
                    initial={{ [orientation === 'horizontal' ? 'width' : 'height']: '0%' }}
                    animate={{ 
                      [orientation === 'horizontal' ? 'width' : 'height']: 
                        status === 'completed' ? '100%' : '0%' 
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  />
                </div>
              )}
            </div>

            {/* Step Label */}
            <motion.div
              className={`
                ${orientation === 'horizontal' ? 'text-center mt-3' : 'ml-4'}
                ${status === 'current' ? 'text-[#013220]' : 'text-gray-500'}
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.1 }}
            >
              <p className={`text-sm ${status === 'current' ? 'font-medium' : ''}`}>
                {step.label}
              </p>
              {step.description && status === 'current' && (
                <p className="text-xs text-gray-400 mt-1">
                  {step.description}
                </p>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );

  const renderBoldVariant = () => (
    <div className={`flex flex-col gap-3 ${className}`}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        
        return (
          <motion.div
            key={step.id}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-300
              ${status === 'completed' ? 'border-[#013220] bg-[#013220]/5' :
                status === 'current' ? 'border-[#FF2D95] bg-gradient-to-r from-[#FF2D95]/10 to-[#C9A24F]/10' :
                'border-gray-200 bg-gray-50'}
            `}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4">
              {/* Number/Check */}
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-full
                ${status === 'completed' ? 'bg-[#013220]' :
                  status === 'current' ? 'bg-gradient-to-r from-[#FF2D95] to-[#C9A24F]' :
                  'bg-gray-300'}
              `}>
                {status === 'completed' ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span className={`text-lg ${status === 'current' ? 'text-white' : 'text-gray-600'}`}>
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h4 className={`font-medium ${status === 'current' ? 'text-[#013220]' : 'text-gray-700'}`}>
                  {step.label}
                </h4>
                {step.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {step.description}
                  </p>
                )}
              </div>

              {/* Status Badge */}
              <div className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${status === 'completed' ? 'bg-green-100 text-green-700' :
                  status === 'current' ? 'bg-[#FF2D95]/20 text-[#FF2D95]' :
                  'bg-gray-200 text-gray-600'}
              `}>
                {status === 'completed' ? 'Completado' :
                 status === 'current' ? 'En progreso' :
                 'Pendiente'}
              </div>
            </div>

            {/* Progress bar for current step */}
            {status === 'current' && (
              <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF2D95] to-[#C9A24F]"
                  initial={{ width: '0%' }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );

  if (variant === 'minimal') return renderMinimalVariant();
  if (variant === 'bold') return renderBoldVariant();
  return renderElegantVariant();
}
