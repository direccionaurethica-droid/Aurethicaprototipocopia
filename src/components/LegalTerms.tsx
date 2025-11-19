import { motion, AnimatePresence } from "motion/react";
import { X, Shield, FileText, Lock, Eye, Scale, Copyright } from "lucide-react";

interface LegalTermsProps {
  onClose: () => void;
}

export function LegalTerms({ onClose }: LegalTermsProps) {
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
          className="bg-[#F5F2E9] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-[#C9A24F]/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Fijo */}
          <div className="bg-gradient-to-r from-[#013220] to-[#013220]/90 p-6 flex items-center justify-between sticky top-0 z-10">
            <div>
              <h2 className="text-2xl text-[#F5F2E9] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Acuerdo Legal y Términos de Uso
              </h2>
              <p className="text-[#C9A24F] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Auréthica
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-[#F5F2E9]/10 hover:bg-[#FF2D95] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
              aria-label="Cerrar términos legales"
            >
              <X className="w-6 h-6 text-[#F5F2E9] group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Content Scrollable */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-8 space-y-8 scroll-smooth">
            {/* Aviso Legal */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#013220]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#013220]" />
                </div>
                <h3 className="text-xl text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Aviso Legal
                </h3>
              </div>
              <div className="pl-13 space-y-3 text-[#013220]/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <p>
                  El titular y creador de Auréthica es <strong>Joan Marc Roselló Garcia</strong> (DNI 47801605S). 
                  Este documento regula el uso de la aplicación y sitio web Auréthica. Al utilizar la plataforma, 
                  aceptas estas condiciones y asumes la responsabilidad del uso correcto de sus servicios y contenidos.
                </p>
              </div>
            </section>

            {/* Condiciones de Uso y Licencia */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#013220]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#013220]" />
                </div>
                <h3 className="text-xl text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Condiciones de Uso y Licencia (EULA)
                </h3>
              </div>
              <div className="pl-13 space-y-3 text-[#013220]/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <p>
                  La licencia de uso concedida es personal, limitada y no transferible. Queda prohibido descompilar, 
                  reproducir o distribuir la aplicación y su contenido sin la autorización expresa del titular.
                </p>
                <p>
                  Se prohíbe emplear la app para actividades ilegales o contrarias a la moral. El incumplimiento 
                  puede suponer la suspensión o cancelación de la cuenta del usuario.
                </p>
              </div>
            </section>

            {/* Política de Privacidad */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#013220]/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#013220]" />
                </div>
                <h3 className="text-xl text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Política de Privacidad (RGPD/LOPDGDD)
                </h3>
              </div>
              <div className="pl-13 space-y-3 text-[#013220]/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <p>
                  <strong>Responsable del tratamiento:</strong> Joan Marc Roselló Garcia.
                </p>
                <p>
                  <strong>Finalidades:</strong> Registro de usuarios, test emocional-estético, recomendaciones 
                  de estilo y comunicaciones relacionadas.
                </p>
                <p>
                  <strong>Base legal:</strong> Consentimiento del usuario, ejecución de contrato y obligación legal.
                </p>
                <p>
                  <strong>Derechos:</strong> Acceso, rectificación, supresión, oposición, limitación y portabilidad.
                </p>
                <p>
                  <strong>Conservación:</strong> Se conservarán los datos únicamente el tiempo necesario para 
                  cumplir la finalidad.
                </p>
                <p>
                  Las transferencias internacionales solo se realizarán con garantías adecuadas. Se implementan 
                  medidas de seguridad, cifrado y control de accesos.
                </p>
              </div>
            </section>

            {/* Política de Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#013220]/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#013220]" />
                </div>
                <h3 className="text-xl text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Política de Cookies
                </h3>
              </div>
              <div className="pl-13 space-y-3 text-[#013220]/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <p>
                  Auréthica utiliza cookies para mejorar la experiencia de usuario, analizar el tráfico y 
                  personalizar el contenido. El usuario puede gestionar sus preferencias a través de un banner 
                  de cookies, aceptando, rechazando o configurándolas.
                </p>
              </div>
            </section>

            {/* Política de Uso Aceptable */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#013220]/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#013220]" />
                </div>
                <h3 className="text-xl text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Política de Uso Aceptable
                </h3>
              </div>
              <div className="pl-13 space-y-3 text-[#013220]/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <p>
                  Se prohíbe la publicación de contenido ofensivo o protegido por derechos de terceros, la 
                  ingeniería inversa y cualquier uso indebido de la aplicación. El titular podrá bloquear o 
                  eliminar usuarios que incumplan estas normas.
                </p>
              </div>
            </section>

            {/* Accesibilidad y DSA */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#013220]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#013220]" />
                </div>
                <h3 className="text-xl text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Accesibilidad y DSA
                </h3>
              </div>
              <div className="pl-13 space-y-3 text-[#013220]/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <p>
                  Auréthica cumple con la Ley 11/2023 y el RD 193/2023 en materia de accesibilidad digital, 
                  proporcionando un diseño inclusivo.
                </p>
                <p>
                  Si la aplicación permite la publicación de contenidos de usuarios, se adoptan mecanismos de 
                  moderación de acuerdo con la Digital Services Act (DSA), respetando al mismo tiempo la normativa 
                  de protección de datos.
                </p>
              </div>
            </section>

            {/* Propiedad Intelectual */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#013220]/10 flex items-center justify-center">
                  <Copyright className="w-5 h-5 text-[#013220]" />
                </div>
                <h3 className="text-xl text-[#013220]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Propiedad Intelectual y Confidencialidad
                </h3>
              </div>
              <div className="pl-13 space-y-3 text-[#013220]/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <p>
                  Todo el contenido (prompts, algoritmos, imágenes y lógicas de estilo) es propiedad exclusiva 
                  de Joan Marc Roselló Garcia y está protegido por derechos de autor.
                </p>
                <p>
                  Los usuarios no pueden replicar ni divulgar el concepto de Auréthica sin autorización.
                </p>
              </div>
            </section>

            {/* Footer del Modal */}
            <div className="pt-6 border-t border-[#C9A24F]/20">
              <p className="text-center text-sm text-[#013220]/60" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Última actualización: Octubre 2025
              </p>
            </div>
          </div>

          {/* Bottom Action Fijo */}
          <div className="p-6 bg-[#F5F2E9] border-t border-[#C9A24F]/10 sticky bottom-0">
            <button
              onClick={onClose}
              className="w-full py-4 bg-gradient-to-r from-[#013220] to-[#013220]/90 hover:from-[#FF2D95] hover:to-[#C9A24F] text-[#F5F2E9] rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-lg"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Entendido, Cerrar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
