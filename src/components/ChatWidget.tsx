/**
 * ChatWidget - Widget de chat flotante para comunicación con salones/estilistas
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'motion/react';
import { MessageCircle, X, Send, Paperclip, Image as ImageIcon, Smile, Phone, Video, MoreVertical, Move } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Message {
  id: string;
  sender: 'user' | 'salon';
  text: string;
  timestamp: Date;
  read: boolean;
}

interface ChatWidgetProps {
  salonName?: string;
  stylistName?: string;
  stylistAvatar?: string;
}

export function ChatWidget({ 
  salonName = 'Auréthica Madrid Centro',
  stylistName = 'Marta López',
  stylistAvatar = '👩‍🦰'
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'salon',
      text: '¡Hola! Soy Marta de Auréthica Madrid Centro 👋 ¿En qué puedo ayudarte?',
      timestamp: new Date(Date.now() - 60000),
      read: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
      read: true
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    // Simular respuesta automática
    setIsTyping(true);
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'salon',
        text: 'Gracias por tu mensaje. Un miembro de nuestro equipo te responderá en breve. ¿Necesitas agendar una cita?',
        timestamp: new Date(),
        read: false
      };
      setMessages(prev => [...prev, autoReply]);
      setIsTyping(false);
      
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    '¿Precios?',
    'Agendar cita',
    'Cancelar cita',
    'Horarios',
    'Ubicación'
  ];

  return (
    <>
      {/* Botón flotante - DRAGGABLE */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={{
              top: -window.innerHeight + 200,
              left: -window.innerWidth + 200,
              right: 100,
              bottom: 100,
            }}
            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
            animate={{ scale: 1, opacity: 1, x: position.x, y: position.y }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onDragEnd={(event, info) => {
              setPosition({ x: position.x + info.offset.x, y: position.y + info.offset.y });
            }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-[9997] w-16 h-16 bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] rounded-full shadow-2xl flex items-center justify-center group cursor-grab active:cursor-grabbing"
          >
            <MessageCircle className="w-7 h-7 text-white" />
            
            {/* Icono de arrastrar */}
            <motion.div 
              className="absolute top-1 right-1 w-5 h-5 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              title="Arrastrar para mover"
            >
              <Move className="w-3 h-3 text-white" />
            </motion.div>

            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
              >
                {unreadCount}
              </motion.div>
            )}
            
            {/* Pulse animation */}
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
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana de chat - DRAGGABLE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={{
              top: -window.innerHeight + 200,
              left: -window.innerWidth + 450,
              right: 50,
              bottom: 50,
            }}
            dragListener={false}
            dragControls={dragControls}
            initial={{ opacity: 0, y: 20, scale: 0.9, x: 0 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              x: position.x,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-6 z-[9998] w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header - Draggable area */}
            <div 
              className="bg-gradient-to-r from-[#013220] to-[#0a4a30] p-4 flex items-center justify-between cursor-move"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="flex items-center gap-2">
                <Move className="w-4 h-4 text-white/60" title="Arrastrar para mover" />
              </div>
              <div className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <div className="text-2xl">{stylistAvatar}</div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{stylistName}</h3>
                  <p className="text-xs text-white/80">{salonName}</p>
                  <p className="text-xs text-green-300">En línea</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Quick Actions */}
                <div className="p-3 bg-[#F5F2E9] border-b border-gray-200 flex gap-2 overflow-x-auto">
                  <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-white text-sm text-[#013220] hover:bg-[#013220] hover:text-white transition-colors whitespace-nowrap">
                    <Phone className="w-4 h-4" />
                    Llamar
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-white text-sm text-[#013220] hover:bg-[#013220] hover:text-white transition-colors whitespace-nowrap">
                    <Video className="w-4 h-4" />
                    Videollamada
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white to-[#F5F2E9]/30">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] text-white rounded-br-none'
                            : 'bg-white text-[#101418] rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p className="text-sm break-words">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white rounded-2xl px-4 py-3 rounded-bl-none shadow-sm">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div className="p-3 border-t border-gray-200 bg-white">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => {
                          setNewMessage(reply);
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1.5 rounded-full bg-[#F5F2E9] text-xs text-[#013220] hover:bg-[#013220] hover:text-white transition-colors whitespace-nowrap"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 flex items-center gap-2 bg-[#F5F2E9] rounded-2xl px-4 py-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 bg-transparent border-none outline-none text-[#101418] placeholder:text-gray-400"
                      />
                      <button className="text-gray-400 hover:text-[#C9A24F] transition-colors">
                        <Smile className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-[#C9A24F] transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
