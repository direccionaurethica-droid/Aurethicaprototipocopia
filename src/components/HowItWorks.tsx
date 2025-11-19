import { Card } from "./ui/card";
import { Sparkles, Search, CheckCircle } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-[#C9A24F]" />,
      title: "Responde el test",
      description: "Contesta preguntas sobre tu tipo de piel, estilo de vida y preferencias de belleza."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#C9A24F]" />,
      title: "Análisis personalizado",
      description: "Nuestro algoritmo analiza tus respuestas para crear tu perfil único de belleza."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-[#C9A24F]" />,
      title: "Recibe tu rutina",
      description: "Obtén recomendaciones personalizadas de productos y rutinas adaptadas a ti."
    }
  ];

  return (
    <section className="relative">
      {/* Gradiente natural desde el banner hacia el marfil */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C9A24F] via-[#C9A24F]/70 via-10% to-[#F5F2E9] to-40%"></div>
      
      {/* Contenido de la sección */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-white drop-shadow-lg">
              Cómo funciona
            </h2>
            <p className="max-w-2xl mx-auto text-white/95 drop-shadow-md">
              Tres pasos simples para descubrir tu belleza auténtica
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-8 text-center bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="flex justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl mb-4 text-[#101418]">
                  {step.title}
                </h3>
                <p className="text-[#6E7276] leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}