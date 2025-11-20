import { ImageWithFallback } from './figma/ImageWithFallback';
import gigiLogoSimple from '../assets/gigi-logo.png';
import { useState } from 'react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CalibrationOption = 'neutro' | 'suave' | 'equilibrado' | 'firme' | 'intimo';

interface CalibrationSelection {
  confianza: CalibrationOption | null;
  cambio: CalibrationOption | null;
  seguridad: CalibrationOption | null;
  expresion: CalibrationOption | null;
  confirmacion: CalibrationOption | null;
}

const gigiPersonality = {
  sinceridad: {
    1: "Te hablaré con total claridad.",
    2: "Seré directa y honesta, sin rodeos.",
    3: "Prefiero decirte lo que pienso de forma abierta.",
    4: "Puedo ser transparente, incluso si no siempre coincide contigo.",
    5: "Te diré la verdad aunque pueda incomodar."
  },
  suavidad: {
    1: "Podemos tomar decisiones poco a poco.",
    2: "Te hablaré con calma, sin prisa.",
    3: "Prefiero mantener un tono ligero y amable.",
    4: "Seré muy cuidadosa al acompañarte.",
    5: "Te hablaré con ternura, sin imponer nada."
  },
  firmeza: {
    1: "Te ofreceré una guía clara y concreta.",
    2: "Podría ser más precisa en mis recomendaciones.",
    3: "Puedo expresarme con más seguridad si lo prefieres.",
    4: "Te hablaré con determinación y confianza.",
    5: "Seré contundente al orientarte, si eso te hace sentir más segura."
  },
  empatia: {
    1: "Puedo acompañarte desde la comprensión.",
    2: "Te hablaré desde lo que sientes, no solo desde lo técnico.",
    3: "Quiero entenderte antes de recomendarte.",
    4: "Te escucharé con atención antes de responder.",
    5: "Voy a sentir contigo cada paso del proceso."
  },
  proximidad_emocional: {
    1: "Puedo mantener cierta distancia si prefieres objetividad.",
    2: "Te hablaré con naturalidad, sin forzar confianza.",
    3: "Podría acercarme un poco más para acompañarte mejor.",
    4: "Seré cercana y abierta si eso te hace sentir cómoda.",
    5: "Te hablaré como si te conociera de siempre, con total confianza."
  }
};

const calibrationToLevel = (option: CalibrationOption | null): number => {
  const map = { neutro: 1, suave: 2, equilibrado: 3, firme: 4, intimo: 5 };
  return option ? map[option] : 3;
};

const getGigiMessages = (calibration: CalibrationSelection | null | undefined) => {
  if (!calibration) {
    return {
      sinceridad: gigiPersonality.sinceridad[3],
      suavidad: gigiPersonality.suavidad[3],
      firmeza: gigiPersonality.firmeza[3],
      empatia: gigiPersonality.empatia[3],
      proximidad: gigiPersonality.proximidad_emocional[3],
      welcomeMessage: "Hola, soy Gigi. Te acompañaré en este test para descubrir tu estilo de cabello único.",
      completionMessage: "¡Increíble!",
      encouragementMessages: [
        "Vamos muy bien",
        "Perfecto, continuemos",
        "Excelente elección"
      ]
    };
  }

  const confianzaLevel = calibrationToLevel(calibration.confianza);
  const cambioLevel = calibrationToLevel(calibration.cambio);
  const seguridadLevel = calibrationToLevel(calibration.seguridad);
  const expresionLevel = calibrationToLevel(calibration.expresion);
  const confirmacionLevel = calibrationToLevel(calibration.confirmacion);
  
  const sinceridad = gigiPersonality.sinceridad[confianzaLevel as keyof typeof gigiPersonality.sinceridad];
  const suavidad = gigiPersonality.suavidad[cambioLevel as keyof typeof gigiPersonality.suavidad];
  const firmeza = gigiPersonality.firmeza[seguridadLevel as keyof typeof gigiPersonality.firmeza];
  const empatia = gigiPersonality.empatia[expresionLevel as keyof typeof gigiPersonality.empatia];
  const proximidad = gigiPersonality.proximidad_emocional[confirmacionLevel as keyof typeof gigiPersonality.proximidad_emocional];

  const welcomeMessage = confirmacionLevel >= 4 
    ? "¡Hola! Soy Gigi y vamos a conectar profundamente con tu estilo de cabello 💕" 
    : confirmacionLevel <= 2
    ? "Hola, soy Gigi. Te guiaré de forma objetiva en este test."
    : "Hola, soy Gigi. Te acompañaré en este test para descubrir tu estilo de cabello único.";

  const completionMessage = cambioLevel >= 4
    ? "¡Lo lograste con mucha calma! 🌸"
    : confianzaLevel >= 4
    ? "¡Completado! Has sido muy clara en tus respuestas."
    : "¡Increíble trabajo!";

  const encouragementMessages = seguridadLevel >= 4
    ? ["Decisión firme, me gusta", "Muy clara tu respuesta", "Perfecto, sigamos con determinación"]
    : cambioLevel >= 4
    ? ["Tómate tu tiempo", "Sin prisa, vamos bien", "Respira, vamos poco a poco"]
    : ["Excelente", "Perfecto", "Vamos muy bien"];

  return {
    sinceridad,
    suavidad,
    firmeza,
    empatia,
    proximidad,
    welcomeMessage,
    completionMessage,
    encouragementMessages
  };
};

interface Question {
  id: number;
  question: string;
  options: string[];
  conditionalOptions?: {
    condition: number;
    optionsA: string[];
    optionsB: string[];
  };
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Usas tu cabello como un complemento más y lo ves una forma de expresión?",
    options: [
      "Sí, mi cabello es una forma de expresión para mí",
      "No, lo cuido de forma práctica"
    ]
  },
  {
    id: 2,
    question: "¿Qué priorizas con tu cabello?",
    options: [],
    conditionalOptions: {
      condition: 1,
      optionsA: [
        "Mi identidad y estado de ánimo",
        "Estilo y cuidado estético, sin carga emocional", 
        "Adecuación a cada ocasión"
      ],
      optionsB: [
        "Comodidad y rapidez",
        "Funcionalidad (que esté presentable)"
      ]
    }
  },
  {
    id: 3,
    question: "¿Qué lugar ocupan los accesorios para el cabello en tu día a día?",
    options: [],
    conditionalOptions: {
      condition: 1,
      optionsA: [
        "Imprescindibles: siempre elevan el look",
        "Clásica: horquillas, diademas o coleteros combinados",
        "Básico: llevo siempre lo mismo"
      ],
      optionsB: [
        "Importantes, pero sin robar protagonismo",
        "Nada o casi nada"
      ]
    }
  },
  {
    id: 4,
    question: "¿Estás satisfecha con el tiempo que dedicas a tu cabello?",
    options: [
      "Estoy satisfecha: tengo el tiempo que necesito",
      "Quiero ser más práctica (menos tiempo)",
      "Quiero dedicarme más tiempo"
    ]
  },
  {
    id: 5,
    question: "¿Cuánto tiempo le dedicas actualmente a tu cabello cada día?",
    options: [
      "Menos de 5 min",
      "5–15 min",
      "15–30 min", 
      "Más de 30 min"
    ]
  },
  {
    id: 6,
    question: "¿Cómo te sientes con tu gasto actual en cuidado capilar?",
    options: [
      "Gasto demasiado (mucho mantenimiento o tratamientos)",
      "Pago justo por la calidad que recibo",
      "Es económico para lo que me aporta"
    ]
  },
  {
    id: 7,
    question: "¿Qué presupuesto gastas mensualmente en tu cabello?",
    options: [
      "Menos de 30 €",
      "30–70 €",
      "70–150 €",
      "Más de 150 €"
    ]
  },
  {
    id: 8,
    question: "Si tu cabello quedara perfecto siempre… ¿aumentarías tu gasto mensual?",
    options: [
      "No, mantendría mi gasto actual",
      "Sí, hasta un 25% más",
      "Sí, hasta el doble",
      "Sí, incluso más del doble",
      "Sí, si fueran servicios o productos clave que duran"
    ]
  }
];

interface BeautyTestProps {
  gigiPersonality?: CalibrationSelection | null;
  onComplete?: () => void;
  onBack?: () => void;
}

export function BeautyTest({ gigiPersonality: calibrationData, onComplete, onBack }: BeautyTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const gigiMessages = getGigiMessages(calibrationData);

  const getCurrentOptions = () => {
    const question = questions[currentQuestion];
    
    if (question.conditionalOptions) {
      const firstAnswer = answers[question.conditionalOptions.condition];
      if (firstAnswer === "Sí, mi cabello es una forma de expresión para mí") {
        return question.conditionalOptions.optionsA;
      } else if (firstAnswer === "No, lo cuido de forma práctica") {
        return question.conditionalOptions.optionsB;
      }
    }
    
    return question.options;
  };

  const handleAnswer = (answer: string) => {
    const questionId = questions[currentQuestion].id;
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => setCurrentQuestion(nextQuestion), 300);
    } else {
      setTimeout(() => {
        setIsCompleted(true);
        if (onComplete) onComplete();
      }, 300);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      const questionId = questions[currentQuestion].id;
      const newAnswers = { ...answers };
      delete newAnswers[questionId];
      setAnswers(newAnswers);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isCompleted) {
    const isExpressive = answers[1] === "Sí, mi cabello es una forma de expresión para mí";
    
    return (
      <section className="min-h-screen py-12 px-6 bg-[#FEFEFE]">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A24F]/10 mb-6">
                <span className="text-3xl">✨</span>
              </div>
              <h2 className="text-3xl md:text-4xl mb-3 text-[#D4AF37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Tu perfil está completo
              </h2>
              <p className="text-[#6E7276]">
                {gigiMessages.completionMessage}
              </p>
            </div>

            <div className="space-y-4 mb-10">
              <div className="p-5 bg-[#FEFEFE] rounded-xl border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-[#6E7276]">Enfoque del cabello</span>
                  <span className="text-[#D4AF37]">
                    {isExpressive ? "Expresión personal" : "Uso práctico"}
                  </span>
                </div>
              </div>

              {calibrationData && (
                <div className="p-6 bg-[#FEFEFE] rounded-xl border border-[#C9A24F]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C9A24F]/10 flex items-center justify-center">
                      <span className="text-xl">💕</span>
                    </div>
                    <h4 className="text-[#FF2D95]" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Tu Gigi Personalizada
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm text-[#6E7276] leading-relaxed">
                    <p>{gigiMessages.sinceridad}</p>
                    <p>{gigiMessages.suavidad}</p>
                    <p>{gigiMessages.firmeza}</p>
                    <p>{gigiMessages.empatia}</p>
                    <p>{gigiMessages.proximidad}</p>
                  </div>
                </div>
              )}
            </div>

            <Button 
              className="w-full bg-[#C9A24F] hover:bg-[#C9A24F]/90 text-white py-6 rounded-xl"
            >
              Continuar
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  const currentOptions = getCurrentOptions();
  const question = questions[currentQuestion];

  return (
    <section className="min-h-screen bg-[#FEFEFE] flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Mensaje de bienvenida de Gigi - Solo primera pregunta */}
        {currentQuestion === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 p-5 bg-white rounded-xl border border-gray-100 flex items-start gap-4"
          >
            <div className="w-12 h-16 flex-shrink-0">
              <ImageWithFallback
                src={gigiLogoSimple}
                alt="Gigi"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#FF2D95] mb-1">Gigi te acompaña</p>
              <p className="text-sm text-[#6E7276] leading-relaxed">{gigiMessages.welcomeMessage}</p>
            </div>
          </motion.div>
        )}

        {/* Pregunta */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100"
          >
            {/* Contador de progreso */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm text-[#6E7276]">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <div className="flex gap-1.5">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className="w-8 h-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: index < currentQuestion 
                        ? '#C9A24F' 
                        : index === currentQuestion 
                        ? '#FF2D95' 
                        : '#E5E7EB'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Pregunta */}
            <h3 className="text-xl md:text-2xl mb-8 text-[#E8E6E3] leading-relaxed">
              {question.question}
            </h3>

            {/* Opciones */}
            <div className="space-y-3 mb-8">
              {currentOptions.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full p-4 text-left border border-gray-200 rounded-xl hover:border-[#C9A24F] hover:bg-[#FEFEFE] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-[#C9A24F] transition-colors duration-200 flex-shrink-0" />
                    <span className="text-[#101418] text-base">
                      {option}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Botones de navegación */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={currentQuestion === 0 ? onBack : handlePreviousQuestion}
                className="flex items-center gap-2 text-[#6E7276] hover:text-[#D4AF37] transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Atrás</span>
              </button>

              <span className="text-sm text-[#6E7276]">
                {Math.round(progress)}% completado
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

