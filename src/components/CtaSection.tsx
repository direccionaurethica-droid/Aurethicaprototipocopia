import { Button } from "./ui/button";

interface CtaSectionProps {
  onStartTest?: () => void;
}

export function CtaSection({ onStartTest }: CtaSectionProps) {
  return (
    <section className="py-20 px-6 bg-[#F5F2E9]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="mb-8 text-[#101418]">
          Tu cambio empieza con una decisión clara
        </h2>
        <Button 
          size="lg" 
          onClick={onStartTest}
          className="bg-[#C9A24F] hover:bg-[#C9A24F]/90 text-white px-12 py-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Comenzar mi transformación
        </Button>
      </div>
    </section>
  );
}