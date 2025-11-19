/**
 * GigiColorReference - Tarjeta de referencia rápida del sistema cromático de Gigi
 * Componente compacto para desarrolladores que muestra los colores y estilos clave
 */

import { Sparkles } from 'lucide-react';
import { Card } from './ui/card';

export function GigiColorReference() {
  return (
    <Card className="p-6 max-w-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#FF2D95]" />
        <h3 
          style={{ fontFamily: 'Playfair Display, serif' }}
          className="text-[#FF2D95] text-lg"
        >
          Referencia Rápida: Colores de Gigi
        </h3>
      </div>

      <div className="space-y-4">
        {/* Fucsia Principal */}
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-lg shadow-md"
            style={{ background: '#FF2D95' }}
          />
          <div>
            <p className="text-sm font-semibold text-[#101418]">Fucsia Gigi</p>
            <p className="text-xs text-[#6E7276] font-mono">#FF2D95</p>
            <p className="text-xs text-[#6E7276]">Títulos, iconos, indicadores</p>
          </div>
        </div>

        {/* Gradiente Cromado */}
        <div>
          <p className="text-sm font-semibold text-[#101418] mb-2">Gradiente Cromado</p>
          <div 
            className="h-16 rounded-lg shadow-lg relative overflow-hidden flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)',
              boxShadow: '0 4px 20px rgba(201, 162, 79, 0.5)',
            }}
          >
            <span className="text-[#013220] font-semibold drop-shadow-lg">Gigi</span>
          </div>
          <p className="text-xs text-[#6E7276] mt-2 font-mono break-all">
            linear-gradient(135deg, #C9A24F 0%, #FF2D95 50%, #C9A24F 100%)<br/>
            <span className="text-[#013220] font-semibold">Texto: #013220 (Verde)</span>
          </p>
        </div>

        {/* Clases Tailwind */}
        <div className="pt-3 border-t border-gray-200">
          <p className="text-sm font-semibold text-[#101418] mb-2">Clases Tailwind</p>
          <div className="space-y-1 text-xs">
            <code className="block bg-gray-50 px-2 py-1 rounded text-[#6E7276]">
              text-[#FF2D95] → Texto fucsia
            </code>
            <code className="block bg-gray-50 px-2 py-1 rounded text-[#6E7276]">
              border-[#FF2D95]/20 → Borde fucsia 20%
            </code>
            <code className="block bg-gray-50 px-2 py-1 rounded text-[#6E7276]">
              bg-[#FF2D95]/5 → Fondo fucsia 5%
            </code>
            <code className="block bg-gray-50 px-2 py-1 rounded text-[#6E7276]">
              shadow-[#FF2D95]/30 → Sombra fucsia
            </code>
          </div>
        </div>

        {/* Uso Componentes */}
        <div className="pt-3 border-t border-gray-200">
          <p className="text-sm font-semibold text-[#101418] mb-2">Componentes</p>
          <div className="space-y-1 text-xs">
            <code className="block bg-gray-50 px-2 py-1 rounded text-[#6E7276]">
              <ChromeButton variant="gigi">
            </code>
            <code className="block bg-gray-50 px-2 py-1 rounded text-[#6E7276]">
              <Sparkles className="text-[#FF2D95]" />
            </code>
          </div>
        </div>

        {/* Link a documentación */}
        <div className="pt-3 border-t border-gray-200">
          <p className="text-xs text-[#6E7276]">
            📖 Documentación completa en <code className="bg-gray-50 px-1 py-0.5 rounded">/guidelines/GigiDesignSystem.md</code>
          </p>
        </div>
      </div>
    </Card>
  );
}
