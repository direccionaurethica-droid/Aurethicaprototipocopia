import { Separator } from "./ui/separator";
import { useState } from "react";
import { LegalTerms } from "./LegalTerms";
import { AnimatePresence } from "motion/react";

export function Footer() {
  const [showLegalTerms, setShowLegalTerms] = useState(false);

  return (
    <>
      <footer className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Separator className="mb-8 bg-gray-200" />
          
          <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-2xl text-[#101418] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Auréthica
              </h3>
              <p className="text-sm text-[#6E7276] mb-4">
                Belleza auténtica para cada persona
              </p>
              
              {/* Botones de beneficios en horizontal */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start max-w-md">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#FF2D95]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">✨</span>
                  </div>
                  <p className="text-[10px] text-[#013220]">Contenido Exclusivo</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#C9A24F]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">📧</span>
                  </div>
                  <p className="text-[10px] text-[#013220]">Newsletter Mensual</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#013220]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">👥</span>
                  </div>
                  <p className="text-[10px] text-[#013220]">Comunidad</p>
                </div>
              </div>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
              <button
                onClick={() => setShowLegalTerms(true)}
                className="text-sm text-[#6E7276] hover:text-[#101418] transition-colors duration-200"
              >
                Términos y Condiciones
              </button>
              <button
                onClick={() => setShowLegalTerms(true)}
                className="text-sm text-[#6E7276] hover:text-[#101418] transition-colors duration-200"
              >
                Política de Privacidad
              </button>
              <button
                onClick={() => setShowLegalTerms(true)}
                className="text-sm text-[#6E7276] hover:text-[#101418] transition-colors duration-200"
              >
                Aviso Legal
              </button>
            </nav>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-[#6E7276]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              © 2025 Auréthica. Todos los derechos reservados. <br className="md:hidden" />
              Creado por Joan Marc Roselló Garcia
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de Términos Legales */}
      <AnimatePresence>
        {showLegalTerms && <LegalTerms onClose={() => setShowLegalTerms(false)} />}
      </AnimatePresence>
    </>
  );
}