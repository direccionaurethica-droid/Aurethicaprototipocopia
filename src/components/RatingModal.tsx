/**
 * RatingModal - Sistema de valoraciones post-cita
 * Permite a las usuarias valorar servicios y estilistas
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Send, Sparkles, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from './PremiumToast';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: {
    service: string;
    stylist: string;
    date: string;
    salonName: string;
  };
  onSubmit?: (rating: RatingData) => void;
}

interface RatingData {
  serviceRating: number;
  stylistRating: number;
  ambientRating: number;
  comment: string;
  wouldRecommend: boolean;
}

export function RatingModal({ isOpen, onClose, appointmentData, onSubmit }: RatingModalProps) {
  const [serviceRating, setServiceRating] = useState(0);
  const [stylistRating, setStylistRating] = useState(0);
  const [ambientRating, setAmbientRating] = useState(0);
  const [comment, setComment] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [hoverService, setHoverService] = useState(0);
  const [hoverStylist, setHoverStylist] = useState(0);
  const [hoverAmbient, setHoverAmbient] = useState(0);

  const handleSubmit = () => {
    if (serviceRating === 0 || stylistRating === 0 || ambientRating === 0 || wouldRecommend === null) {
      toast.error('Por favor completa todas las valoraciones');
      return;
    }

    const ratingData: RatingData = {
      serviceRating,
      stylistRating,
      ambientRating,
      comment,
      wouldRecommend
    };

    onSubmit?.(ratingData);

    toast.success('¡Gracias por tu valoración!', {
      description: 'Tu opinión nos ayuda a mejorar nuestros servicios',
      duration: 5000
    });

    onClose();
  };

  const renderStars = (
    rating: number,
    setRating: (n: number) => void,
    hover: number,
    setHover: (n: number) => void
  ) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <Star
              className={`w-8 h-8 transition-all duration-200 ${
                star <= (hover || rating)
                  ? 'fill-[#FFD700] stroke-[#FFD700]'
                  : 'fill-none stroke-gray-300'
              }`}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  const getRatingLabel = (rating: number) => {
    const labels = ['', 'Muy Malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
    return labels[rating] || '';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] p-6 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
                backgroundSize: '200% 100%'
              }}
            />
            
            <div className="relative flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-white" />
                  <h2 className="text-2xl text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ¿Cómo fue tu experiencia?
                  </h2>
                </div>
                <p className="text-white/90 text-sm">
                  {appointmentData.service} • {appointmentData.stylist}
                </p>
                <p className="text-white/80 text-xs">
                  {appointmentData.date} • {appointmentData.salonName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center group"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)] space-y-8">
            {/* Valoración del Servicio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg mb-3 text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Calidad del Servicio
              </h3>
              <div className="flex items-center gap-4">
                {renderStars(serviceRating, setServiceRating, hoverService, setHoverService)}
                {(hoverService || serviceRating) > 0 && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-medium text-[#013220]"
                  >
                    {getRatingLabel(hoverService || serviceRating)}
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* Valoración del Estilista */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg mb-3 text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Atención del Estilista
              </h3>
              <div className="flex items-center gap-4">
                {renderStars(stylistRating, setStylistRating, hoverStylist, setHoverStylist)}
                {(hoverStylist || stylistRating) > 0 && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-medium text-[#013220]"
                  >
                    {getRatingLabel(hoverStylist || stylistRating)}
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* Valoración del Ambiente */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg mb-3 text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Ambiente y Limpieza
              </h3>
              <div className="flex items-center gap-4">
                {renderStars(ambientRating, setAmbientRating, hoverAmbient, setHoverAmbient)}
                {(hoverAmbient || ambientRating) > 0 && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-medium text-[#013220]"
                  >
                    {getRatingLabel(hoverAmbient || ambientRating)}
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* ¿Recomendarías? */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg mb-3 text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                ¿Recomendarías este salón?
              </h3>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWouldRecommend(true)}
                  className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all duration-300 ${
                    wouldRecommend === true
                      ? 'border-[#10b981] bg-[#10b981]/10 text-[#10b981]'
                      : 'border-gray-200 text-gray-600 hover:border-[#10b981]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Heart className={`w-5 h-5 ${wouldRecommend === true ? 'fill-current' : ''}`} />
                    <span className="font-medium">Sí, definitivamente</span>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWouldRecommend(false)}
                  className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all duration-300 ${
                    wouldRecommend === false
                      ? 'border-[#ef4444] bg-[#ef4444]/10 text-[#ef4444]'
                      : 'border-gray-200 text-gray-600 hover:border-[#ef4444]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <X className="w-5 h-5" />
                    <span className="font-medium">No</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Comentario */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg mb-3 text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Cuéntanos más (opcional)
              </h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comparte tu experiencia con nosotros y con la comunidad..."
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#C9A24F] focus:outline-none resize-none text-[#101418]"
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-[#6E7276] mt-2 text-right">
                {comment.length}/500 caracteres
              </p>
            </motion.div>

            {/* Incentivo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-4 bg-gradient-to-r from-[#FF2D95]/10 to-[#C9A24F]/10 border-[#FF2D95]/20">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#FF2D95] mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-[#013220] mb-1">
                      ¡Gana 50 puntos Auréthica!
                    </p>
                    <p className="text-[#6E7276]">
                      Por compartir tu opinión, acumula puntos para descuentos en tus próximas citas
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-[#F5F2E9] border-t border-gray-200 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Ahora no
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={serviceRating === 0 || stylistRating === 0 || ambientRating === 0 || wouldRecommend === null}
              className="px-8 bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] text-white hover:from-[#ff4da8] hover:to-[#d4b366] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Valoración
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
