/**
 * ProAccessModal - Modal para elegir tipo de acceso profesional
 * Dos opciones: Salones/Autónomos o Estilistas
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Scissors } from 'lucide-react';

interface ProAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSalonAccess: () => void;
  onStylistAccess: () => void;
}

export function ProAccessModal({
  isOpen,
  onClose,
  onSalonAccess,
  onStylistAccess,
}: ProAccessModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-[#e8f4ed] rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden"
            >
              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[#013220]/10 flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5 text-[#013220]" />
              </button>

              {/* Header */}
              <div className="text-center pt-12 pb-8 px-8 bg-gradient-to-b from-[#d4e9dc] to-transparent">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2
                    className="text-[#013220] mb-3"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Acceso Profesional
                  </h2>
                  <p
                    className="text-[#6E7276] text-lg"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Selecciona tu tipo de acceso
                  </p>
                </motion.div>
              </div>

              {/* Opciones */}
              <div className="grid md:grid-cols-2 gap-6 p-8">
                {/* Opción 1: Salones/Autónomos */}
                <motion.button
                  onClick={onSalonAccess}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden bg-[#013220]/10 backdrop-blur-md hover:bg-[#013220]/15 border-2 border-[#013220]/20 hover:border-[#013220]/30 rounded-2xl p-8 text-left shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {/* Icono */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#013220]/20 to-[#0a4a30]/30 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Building2 className="w-8 h-8 text-[#013220]" />
                  </div>

                  {/* Contenido */}
                  <h3
                    className="text-[#013220] mb-3"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Salones / Autónomos
                  </h3>
                  <p
                    className="text-[#6E7276] text-sm mb-4 leading-relaxed"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Registra tu salón o negocio independiente. Gestiona tu equipo y servicios.
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {['Datos fiscales', 'Gestión de equipo', 'Panel de control'].map(
                      (feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-[#6E7276] text-xs"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#013220]" />
                          {feature}
                        </li>
                      )
                    )}
                  </ul>

                  {/* Flecha */}
                  <motion.div
                    className="flex items-center gap-2 text-[#013220]"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Comenzar
                    </span>
                    <span>→</span>
                  </motion.div>

                  {/* Brillo hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>

                {/* Opción 2: Estilistas */}
                <motion.button
                  onClick={onStylistAccess}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden bg-[#C9A24F]/10 backdrop-blur-md hover:bg-[#C9A24F]/15 border-2 border-[#C9A24F]/20 hover:border-[#C9A24F]/30 rounded-2xl p-8 text-left shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {/* Icono */}
                  <div className="w-16 h-16 rounded-2xl bg-[#C9A24F]/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Scissors className="w-8 h-8 text-[#C9A24F]" />
                  </div>

                  {/* Contenido */}
                  <h3
                    className="text-[#013220] mb-3"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Estilistas
                  </h3>
                  <p
                    className="text-[#6E7276] text-sm mb-4 leading-relaxed"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Únete a un salón existente. Gestiona tus clientes y agenda.
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {['Asóciate a salón', 'Gestión de clientas', 'Agenda personal'].map(
                      (feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-[#6E7276] text-xs"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24F]" />
                          {feature}
                        </li>
                      )
                    )}
                  </ul>

                  {/* Flecha */}
                  <motion.div
                    className="flex items-center gap-2 text-[#C9A24F]"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Comenzar
                    </span>
                    <span>→</span>
                  </motion.div>

                  {/* Brillo hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </div>

              {/* Footer */}
              <div className="text-center pb-8 px-8">
                <p
                  className="text-[#6E7276] text-xs"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  ¿Ya tienes cuenta?{' '}
                  <button
                    onClick={onClose}
                    className="text-[#C9A24F] hover:underline font-medium"
                  >
                    Inicia sesión
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}