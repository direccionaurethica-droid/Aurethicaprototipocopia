import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft } from 'lucide-react';
import gigiLogoSimple from 'figma:asset/d6b411d972cd0bf19ef7521b7b038f43509e5335.png';

type CalibrationOption = 'neutro' | 'suave' | 'equilibrado' | 'firme' | 'intimo';

interface CalibrationSelection {
  confianza: CalibrationOption | null;
  cambio: CalibrationOption | null;
  seguridad: CalibrationOption | null;
  expresion: CalibrationOption | null;
  confirmacion: CalibrationOption | null;
}

interface CalibrationQuestion {
  id: keyof CalibrationSelection;
  title: string;
  description: string;
  options: {
    value: CalibrationOption;
    label: string;
    description: string;
  }[];
}

const questions: CalibrationQuestion[] = [
  {
    id: 'confianza',
    title: 'Confianza',
    description: '¿Cómo prefieres que Gigi te acompañe en tus decisiones?',
    options: [
      {
        value: 'neutro',
        label: 'Neutro',
        description: 'Puedo orientarte para que tomes la mejor decisión sobre tu estilo.'
      },
      {
        value: 'suave',
        label: 'Suave',
        description: 'Quiero que sientas que puedes confiar y decidir sin presión.'
      },
      {
        value: 'equilibrado',
        label: 'Equilibrado',
        description: 'Estoy aquí para ayudarte a decidir desde la calma y la seguridad.'
      },
      {
        value: 'firme',
        label: 'Firme',
        description: 'Voy a ayudarte a decidir con confianza y determinación.'
      },
      {
        value: 'intimo',
        label: 'Íntimo',
        description: 'Quiero que confíes en ti, y que sientas que no estás sola en esta elección.'
      }
    ]
  },
  {
    id: 'cambio',
    title: 'Cambio',
    description: '¿Cómo quieres que Gigi aborde los cambios en tu imagen?',
    options: [
      {
        value: 'neutro',
        label: 'Neutro',
        description: 'Los cambios son parte natural de tu evolución estética.'
      },
      {
        value: 'suave',
        label: 'Suave',
        description: 'Podemos probar algo nuevo sin perder lo que te representa.'
      },
      {
        value: 'equilibrado',
        label: 'Equilibrado',
        description: 'El cambio es una forma de avanzar sin dejar de ser tú.'
      },
      {
        value: 'firme',
        label: 'Firme',
        description: 'Atrévete a cambiar; el cambio también revela tu fuerza.'
      },
      {
        value: 'intimo',
        label: 'Íntimo',
        description: 'Estoy aquí para sostenerte si el cambio te da miedo, pero también para celebrarlo contigo.'
      }
    ]
  },
  {
    id: 'seguridad',
    title: 'Seguridad / Autoimagen',
    description: '¿Cómo prefieres que Gigi te hable sobre tu imagen?',
    options: [
      {
        value: 'neutro',
        label: 'Neutro',
        description: 'Puedo mostrarte opciones que se ajusten a tus rasgos y estilo.'
      },
      {
        value: 'suave',
        label: 'Suave',
        description: 'Quiero que vuelvas a mirarte con amabilidad.'
      },
      {
        value: 'equilibrado',
        label: 'Equilibrado',
        description: 'Te ayudaré a reconocer tu belleza real y sentirte en equilibrio.'
      },
      {
        value: 'firme',
        label: 'Firme',
        description: 'Mírate con seguridad: tu imagen puede proyectar exactamente quién eres.'
      },
      {
        value: 'intimo',
        label: 'Íntimo',
        description: 'Voy a recordarte que tu valor no depende del espejo.'
      }
    ]
  },
  {
    id: 'expresion',
    title: 'Expresión Personal',
    description: '¿Cómo quieres que Gigi te ayude a expresarte?',
    options: [
      {
        value: 'neutro',
        label: 'Neutro',
        description: 'Puedo ayudarte a definir un estilo coherente con tu forma de vida.'
      },
      {
        value: 'suave',
        label: 'Suave',
        description: 'Vamos a encontrar una forma sutil de mostrar lo que te hace única.'
      },
      {
        value: 'equilibrado',
        label: 'Equilibrado',
        description: 'Te ayudaré a expresar lo que eres a través de tu imagen.'
      },
      {
        value: 'firme',
        label: 'Firme',
        description: 'Haz que tu estilo hable por ti con fuerza y autenticidad.'
      },
      {
        value: 'intimo',
        label: 'Íntimo',
        description: 'Quiero que tu imagen se convierta en un lenguaje propio, libre y sincero.'
      }
    ]
  },
  {
    id: 'confirmacion',
    title: 'Confirmación',
    description: 'Antes de avanzar, ¿cómo te gustaría que Gigi confirme esto?',
    options: [
      {
        value: 'neutro',
        label: 'Neutro',
        description: 'Puedo mantener cierta distancia si prefieres objetividad.'
      },
      {
        value: 'suave',
        label: 'Suave',
        description: 'Te hablaré con naturalidad, sin forzar confianza.'
      },
      {
        value: 'equilibrado',
        label: 'Equilibrado',
        description: 'Podría acercarme un poco más para acompañarte mejor.'
      },
      {
        value: 'firme',
        label: 'Firme',
        description: 'Seré cercana y abierta si eso te hace sentir cómoda.'
      },
      {
        value: 'intimo',
        label: 'Íntimo',
        description: 'Te hablaré como si te conociera de siempre, con total confianza y cercanía.'
      }
    ]
  }
];

interface GigiCalibrationProps {
  onComplete: (selections: CalibrationSelection) => void;
  onBack?: () => void;
}

export function GigiCalibration({ onComplete, onBack }: GigiCalibrationProps) {
  const [selections, setSelections] = useState<CalibrationSelection>({
    confianza: null,
    cambio: null,
    seguridad: null,
    expresion: null,
    confirmacion: null
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelection = (questionId: keyof CalibrationSelection, option: CalibrationOption) => {
    setSelections(prev => ({
      ...prev,
      [questionId]: option
    }));

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        onComplete({
          ...selections,
          [questionId]: option
        });
      }
    }, 300);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <section className="min-h-screen bg-black relative overflow-hidden px-6 py-16 flex flex-col">
      {/* Fondo sutil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 45, 149, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center mb-16"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-24 h-24">
            <motion.div
              className="absolute inset-0 rounded-full blur-[60px]"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: 'radial-gradient(circle, rgba(255, 45, 149, 0.5) 0%, rgba(212, 175, 55, 0.3) 50%, transparent 70%)',
              }}
            />
            
            <ImageWithFallback
              src={gigiLogoSimple}
              alt="Gigi"
              className="relative z-10 w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[clamp(1.75rem,4vw,2.5rem)] text-[#FF2D95] mb-3"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
          }}
        >
          Calibración de Gigi
        </motion.h2>

        {/* Línea decorativa */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#FF2D95]/50 to-transparent mx-auto mb-6"
        />

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[clamp(0.875rem,2vw,1rem)] text-[#A0A0A0] max-w-lg mx-auto"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Ayúdame a conocerte mejor para personalizar tu experiencia
        </motion.p>
      </motion.div>

      {/* Contenedor pregunta */}
      <div className="relative z-10 max-w-2xl w-full mx-auto flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow flex flex-col"
          >
            <div 
              className="bg-[#0a0a0a]/90 rounded-3xl p-8 md:p-12 border border-[#FF2D95]/15 backdrop-blur-sm relative overflow-hidden flex-grow flex flex-col"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 45, 149, 0.08)',
              }}
            >
              <div className="relative z-10 flex flex-col flex-grow">
                {/* Progreso */}
                <div className="flex items-center justify-between mb-10">
                  <span 
                    className="text-sm text-[#A0A0A0]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {currentQuestionIndex + 1} de {questions.length}
                  </span>
                  <div className="flex gap-2">
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        className="w-8 h-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: index < currentQuestionIndex 
                            ? '#D4AF37' 
                            : index === currentQuestionIndex 
                            ? '#FF2D95' 
                            : 'rgba(160, 160, 160, 0.15)'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Pregunta */}
                <h3 
                  className="text-[clamp(1.5rem,3.5vw,2rem)] mb-12 text-white/95 leading-[1.4]"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {currentQuestion.description}
                </h3>

                {/* Opciones */}
                <div className="space-y-3 mb-10 flex-grow">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selections[currentQuestion.id] === option.value;
                    
                    return (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        onClick={() => handleSelection(currentQuestion.id, option.value)}
                        className={`w-full p-5 text-left border rounded-2xl transition-all duration-300 ${
                          isSelected
                            ? 'border-[#FF2D95] bg-[#FF2D95]/8'
                            : 'border-[#D4AF37]/15 bg-[#0a0a0a]/30 hover:border-[#FF2D95]/40 hover:bg-[#FF2D95]/5'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border transition-all duration-300 flex-shrink-0 flex items-center justify-center ${
                            isSelected 
                              ? 'border-[#FF2D95] bg-[#FF2D95]' 
                              : 'border-[#D4AF37]/40'
                          }`}>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="w-2.5 h-2.5 rounded-full bg-white"
                              />
                            )}
                          </div>
                          <span 
                            className="text-white/90 text-[clamp(0.875rem,2vw,1rem)] leading-[1.6]"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                          >
                            {option.description}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Separador */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent mb-6" />

                {/* Navegación */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={currentQuestionIndex === 0 ? onBack : handlePreviousQuestion}
                    className="flex items-center gap-2 text-[#A0A0A0] hover:text-[#FF2D95] transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span 
                      className="text-sm"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Atrás
                    </span>
                  </button>

                  <span 
                    className="text-sm text-[#A0A0A0]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer con firmas editoriales */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-10 mt-16 flex items-end justify-center gap-12"
      >
        {/* Gigi */}
        <div className="flex flex-col items-center">
          <div 
            className="text-[#FF2D95] mb-1"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              letterSpacing: '0.02em',
            }}
          >
            Gigi
          </div>
          <div 
            className="text-[#6E7276] text-xs uppercase tracking-[0.2em]"
            style={{
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Asistente Personal
          </div>
        </div>

        {/* Separador */}
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent mb-2" />

        {/* Auréthica */}
        <div className="flex flex-col items-center">
          <div 
            className="text-[#D4AF37] mb-1"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              letterSpacing: '0.02em',
            }}
          >
            Auréthica
          </div>
          <div 
            className="text-[#6E7276] text-xs uppercase tracking-[0.2em]"
            style={{
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Belleza Inclusiva
          </div>
        </div>
      </motion.div>
    </section>
  );
}
