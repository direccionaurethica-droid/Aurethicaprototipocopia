/**
 * GigiAdvisor - Componente de asesoría personalizada con Gigi
 * Proporciona consejos de estilo adaptados al perfil y calibración de la usuaria
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GigiHairIcon } from './GigiHairIcon';
import gigiLogoSimple from '../assets/gigi-logo.png';

interface Message {
  id: string;
  sender: 'user' | 'gigi';
  text: string;
  timestamp: Date;
}

interface GigiAdvisorProps {
  postContext?: {
    id: string;
    title?: string;
    category?: string;
    tags?: string[];
  };
  userProfile?: {
    name?: string;
    styleCategory?: 'moda' | 'sencillas';
    gigiCalibration?: any;
  };
  onClose?: () => void;
}

export function GigiAdvisor({ postContext, userProfile, onClose }: GigiAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'gigi',
      text: `¡Hola! 💕 Vi que te interesa este estilo. Basándome en tu perfil${userProfile?.styleCategory === 'moda' ? ' de looks elaborados' : ' de looks naturales'}, puedo ayudarte a adaptarlo a tu estilo personal. ¿Qué te gustaría saber?`,
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Respuestas inteligentes de Gigi basadas en contexto
  const getGigiResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('adaptar') || lowerMessage.includes('personalizar')) {
      return `Perfecto, te ayudo a personalizar este look 🎨 Dado tu estilo${userProfile?.styleCategory === 'moda' ? ' más elaborado' : ' natural'}, te recomendaría empezar por ${userProfile?.styleCategory === 'moda' ? 'añadir accesorios statement que reflejen tu personalidad' : 'mantener la base simple y agregar un toque distintivo sutil'}. ¿Quieres que profundice en algo específico?`;
    }
    
    if (lowerMessage.includes('producto') || lowerMessage.includes('usar')) {
      return `Para lograr este look, necesitarías productos de fijación media y textura. Te haré una lista personalizada según tu tipo de cabello cuando lo tengamos en tu perfil completo. ¿Hay algún producto específico que ya uses y te guste?`;
    }
    
    if (lowerMessage.includes('ocasión') || lowerMessage.includes('cuando')) {
      return `Este estilo es versátil! 💫 Lo puedes llevar tanto en ${userProfile?.styleCategory === 'moda' ? 'eventos creativos, exposiciones de arte o encuentros sociales donde quieras destacar' : 'el día a día, reuniones casuales o salidas informales'}. ¿Tienes una ocasión específica en mente?`;
    }
    
    if (lowerMessage.includes('similar') || lowerMessage.includes('parecido') || lowerMessage.includes('otro')) {
      return `Me encanta tu curiosidad ✨ Tengo varios estilos similares que creo que te fascinarían. Cuando explores más el feed, te señalaré los que mejor van con tu perfil. ¿Quieres que te explique qué buscar?`;
    }
    
    if (lowerMessage.includes('gracias') || lowerMessage.includes('perfecto')) {
      return `¡De nada! 💕 Me encanta ayudarte a descubrir tu mejor versión. Si tienes más preguntas sobre este u otro estilo, aquí estoy. Recuerda que mientras más interactúes conmigo, mejor te conoceré.`;
    }
    
    // Respuesta por defecto
    return `Entiendo tu pregunta 💭 Este estilo tiene muchas posibilidades. Puedo ayudarte con: adaptarlo a tu ocasión, recomendarte productos, mostrarte variaciones${userProfile?.styleCategory === 'moda' ? ' más atrevidas' : ' más sutiles'}, o explicarte la técnica. ¿Por dónde empezamos?`;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simular que Gigi está escribiendo
    setIsTyping(true);
    setTimeout(() => {
      const gigiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'gigi',
        text: getGigiResponse(newMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, gigiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Sugerencias rápidas
  const quickSuggestions = [
    '¿Cómo adapto este look a mi estilo?',
    '¿Qué productos necesito?',
    '¿Para qué ocasiones sirve?',
    'Muéstrame estilos similares'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-card rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl h-[90vh] sm:h-[600px] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-[#FF2D95]/5 via-white to-[#C9A24F]/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-16 relative rounded-full overflow-hidden">
              {/* Brillo sutil dorado-fucsia de fondo */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.6) 0%, rgba(255, 45, 149, 0.5) 50%, transparent 100%)',
                    'radial-gradient(circle at 70% 70%, rgba(255, 45, 149, 0.6) 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)',
                    'radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.6) 0%, rgba(255, 45, 149, 0.5) 50%, transparent 100%)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Reflejo metálico sutil giratorio */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.7) 25%, rgba(255, 45, 149, 0.6) 50%, rgba(212, 175, 55, 0.7) 75%, transparent 100%)',
                  opacity: 0.8,
                }}
              />

              {/* Logo de Gigi */}
              <ImageWithFallback
                src={gigiLogoSimple}
                alt="Gigi"
                className="relative z-10 w-full h-full object-contain gigi-breathing"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.5)) drop-shadow(0 0 30px rgba(255, 45, 149, 0.3))',
                }}
              />
              
              {/* Borde brillante animado */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(212, 175, 55, 0.4), 0 0 30px rgba(255, 45, 149, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.2)',
                    '0 0 25px rgba(255, 45, 149, 0.4), 0 0 40px rgba(212, 175, 55, 0.3), inset 0 0 30px rgba(255, 45, 149, 0.2)',
                    '0 0 15px rgba(212, 175, 55, 0.4), 0 0 30px rgba(255, 45, 149, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.2)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <div>
              <h3 className="font-medium flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                <GigiHairIcon size={20} animate={true} />
                Gigi
              </h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-xs text-muted-foreground">Tu asistente personal</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-[#FCFCFB]">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-[#013220] text-white rounded-br-sm'
                    : 'bg-gradient-to-br from-[#FF2D95]/10 to-[#C9A24F]/10 text-foreground border border-[#FF2D95]/20 rounded-bl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              </div>
            </motion.div>
          ))}

          {/* Indicador de escritura */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gradient-to-br from-[#FF2D95]/10 to-[#C9A24F]/10 px-4 py-3 rounded-2xl rounded-bl-sm border border-[#FF2D95]/20">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-[#FF2D95] rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-[#C9A24F] rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-[#013220] rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Sugerencias rápidas - Solo si hay pocos mensajes */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 border-t border-border bg-[#FCFCFB]">
            <p className="text-xs text-muted-foreground mb-2">Sugerencias:</p>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setNewMessage(suggestion);
                    inputRef.current?.focus();
                  }}
                  className="text-xs px-3 py-1.5 bg-white hover:bg-[#FF2D95]/10 border border-[#FF2D95]/20 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input de mensaje */}
        <div className="p-4 border-t border-border bg-white">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pregúntale a Gigi..."
              className="flex-1 px-4 py-2 border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#C9A24F]/50 bg-white"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <motion.button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)',
              }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

