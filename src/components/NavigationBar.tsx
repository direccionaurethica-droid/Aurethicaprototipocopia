import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { ThemeToggleCompact } from './ThemeToggle';

interface NavigationBarProps {
  showTest: boolean;
  onSectionToggle: (sectionId: string, isOpen: boolean) => void;
  openSections: string[];
}

// Iconos SVG ilustrativos para cada sección
const SectionIcons = {
  hero: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A24F" />
          <stop offset="100%" stopColor="#FF2D95" />
        </linearGradient>
      </defs>
      {/* Estrella brillante */}
      <path d="M50 10 L55 40 L85 40 L60 60 L70 90 L50 70 L30 90 L40 60 L15 40 L45 40 Z" 
            fill="url(#heroGradient)" 
            stroke="#013220" 
            strokeWidth="2"/>
      <circle cx="50" cy="50" r="3" fill="#FFF" opacity="0.8">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  ),
  
  howItWorks: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Engranajes/proceso */}
      <circle cx="35" cy="50" r="20" fill="none" stroke="#013220" strokeWidth="3"/>
      <circle cx="65" cy="50" r="20" fill="none" stroke="#C9A24F" strokeWidth="3"/>
      <path d="M35 30 L35 25 M35 70 L35 75 M15 50 L10 50 M55 50 L60 50" 
            stroke="#013220" 
            strokeWidth="3" 
            strokeLinecap="round"/>
      <path d="M65 30 L65 25 M65 70 L65 75 M85 50 L90 50 M45 50 L40 50" 
            stroke="#C9A24F" 
            strokeWidth="3" 
            strokeLinecap="round"/>
      <circle cx="35" cy="50" r="8" fill="#F5F2E9"/>
      <circle cx="65" cy="50" r="8" fill="#F5F2E9"/>
      <animateTransform attributeName="transform" 
                        type="rotate" 
                        from="0 50 50" 
                        to="360 50 50" 
                        dur="4s" 
                        repeatCount="indefinite"/>
    </svg>
  ),
  
  gigi: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Corazón de Gigi */}
      <path d="M50 85 C20 60, 15 40, 15 30 C15 15, 30 10, 40 20 C45 15, 50 12, 50 12 C50 12, 55 15, 60 20 C70 10, 85 15, 85 30 C85 40, 80 60, 50 85 Z" 
            fill="#FF2D95" 
            stroke="#013220" 
            strokeWidth="2">
        <animate attributeName="d" 
                 values="M50 85 C20 60, 15 40, 15 30 C15 15, 30 10, 40 20 C45 15, 50 12, 50 12 C50 12, 55 15, 60 20 C70 10, 85 15, 85 30 C85 40, 80 60, 50 85 Z;
                         M50 87 C20 62, 15 42, 15 32 C15 17, 30 12, 40 22 C45 17, 50 14, 50 14 C50 14, 55 17, 60 22 C70 12, 85 17, 85 32 C85 42, 80 62, 50 87 Z;
                         M50 85 C20 60, 15 40, 15 30 C15 15, 30 10, 40 20 C45 15, 50 12, 50 12 C50 12, 55 15, 60 20 C70 10, 85 15, 85 30 C85 40, 80 60, 50 85 Z" 
                 dur="1.5s" 
                 repeatCount="indefinite"/>
      </path>
      <ellipse cx="40" cy="35" rx="4" ry="6" fill="white" opacity="0.7"/>
    </svg>
  ),
  
  test: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Lista de verificación */}
      <rect x="20" y="20" width="60" height="70" rx="5" fill="#F5F2E9" stroke="#013220" strokeWidth="2"/>
      <path d="M30 35 L40 45 L55 30" stroke="#C9A24F" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="30" y1="55" x2="70" y2="55" stroke="#6E7276" strokeWidth="2"/>
      <line x1="30" y1="65" x2="70" y2="65" stroke="#6E7276" strokeWidth="2"/>
      <line x1="30" y1="75" x2="70" y2="75" stroke="#6E7276" strokeWidth="2"/>
      <circle cx="75" cy="25" r="8" fill="#FF2D95">
        <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  ),
  
  registration: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Persona con corazón (registro) */}
      <circle cx="50" cy="35" r="15" fill="#F5F2E9" stroke="#013220" strokeWidth="2"/>
      <path d="M30 55 Q30 45, 50 45 Q70 45, 70 55 L70 85 Q70 90, 65 90 L35 90 Q30 90, 30 85 Z" 
            fill="#F5F2E9" 
            stroke="#013220" 
            strokeWidth="2"/>
      <circle cx="45" cy="35" r="3" fill="#013220"/>
      <circle cx="55" cy="35" r="3" fill="#013220"/>
      <path d="M45 40 Q50 43, 55 40" stroke="#013220" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Corazón flotante */}
      <path d="M80 30 C80 25, 75 22, 72 25 C70 23, 68 23, 68 25 C68 28, 75 35, 75 35 C75 35, 82 28, 82 25 C82 23, 80 22, 78 25" 
            fill="#FF2D95">
        <animateTransform attributeName="transform" 
                          type="translate" 
                          values="0 0; 0 -5; 0 0" 
                          dur="2s" 
                          repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite"/>
      </path>
    </svg>
  ),
  
  blog: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Libro abierto */}
      <path d="M20 30 L20 80 L48 75 L48 25 Z" fill="#F5F2E9" stroke="#013220" strokeWidth="2"/>
      <path d="M80 30 L80 80 L52 75 L52 25 Z" fill="#F5F2E9" stroke="#013220" strokeWidth="2"/>
      <line x1="50" y1="25" x2="50" y2="75" stroke="#C9A24F" strokeWidth="2"/>
      <line x1="30" y1="40" x2="42" y2="40" stroke="#6E7276" strokeWidth="1.5"/>
      <line x1="30" y1="50" x2="42" y2="50" stroke="#6E7276" strokeWidth="1.5"/>
      <line x1="30" y1="60" x2="42" y2="60" stroke="#6E7276" strokeWidth="1.5"/>
      <line x1="58" y1="40" x2="70" y2="40" stroke="#6E7276" strokeWidth="1.5"/>
      <line x1="58" y1="50" x2="70" y2="50" stroke="#6E7276" strokeWidth="1.5"/>
      <line x1="58" y1="60" x2="70" y2="60" stroke="#6E7276" strokeWidth="1.5"/>
      <path d="M35 15 L45 22 L55 15" stroke="#FF2D95" strokeWidth="2" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" 
                          type="translate" 
                          values="0 0; 0 -3; 0 0" 
                          dur="2s" 
                          repeatCount="indefinite"/>
      </path>
    </svg>
  )
};

export function NavigationBar({ showTest, onSectionToggle, openSections }: NavigationBarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Detectar si el Hero está visible para ocultar la navegación
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      const registrationSection = document.getElementById('registration-section');
      
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        // Ocultar navegación solo si el Hero ocupa la mayor parte del viewport
        const heroIsInView = heroRect.top >= -100 && heroRect.bottom >= window.innerHeight * 0.7;
        setIsHeroVisible(heroIsInView);
      } else if (registrationSection) {
        // Si estamos en registro sin Hero, mostrar navegación
        const regRect = registrationSection.getBoundingClientRect();
        const regIsInView = regRect.top < window.innerHeight * 0.3;
        setIsHeroVisible(!regIsInView);
      } else {
        // Si no hay ni hero ni registro, mostrar navegación
        setIsHeroVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Check inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'hero-section', label: 'Inicio', subtitle: 'Bienvenida', icon: SectionIcons.hero },
    { id: 'how-it-works', label: 'Cómo Funciona', subtitle: 'El proceso', icon: SectionIcons.howItWorks },
    { id: 'gigi-intro', label: 'Conoce a Gigi', subtitle: 'Tu asistente', icon: SectionIcons.gigi },
    ...(showTest ? [{ id: 'aurethica-test', label: 'Test', subtitle: 'Descúbrete', icon: SectionIcons.test }] : []),
    { id: 'registration-section', label: 'Registro', subtitle: 'Únete', icon: SectionIcons.registration },
    { id: 'blog-section', label: 'Blog', subtitle: 'Inspiración', icon: SectionIcons.blog }
  ];

  const handleSectionClick = (sectionId: string) => {
    // Si es la sección de registro o hero, solo hacer scroll (siempre visible)
    if (sectionId === 'registration-section' || sectionId === 'hero-section') {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    
    const isCurrentlyOpen = openSections.includes(sectionId);
    
    // Si la sección está cerrada, abrirla y hacer scroll
    if (!isCurrentlyOpen) {
      onSectionToggle(sectionId, true);
      // Esperar a que la animación de apertura comience antes de hacer scroll
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    } else {
      // Si ya está abierta, solo hacer scroll
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleIconHover = (sectionId: string) => {
    setExpandedSection(sectionId);
  };

  const handleIconLeave = () => {
    setExpandedSection(null);
  };

  return (
    <>
      {/* Barra de navegación vertical fija a la izquierda - Oculta cuando Hero está visible */}
      <AnimatePresence>
        {!isHeroVisible && (
          <motion.nav
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
          >
            <div className="bg-[#F5F2E9]/30 backdrop-blur-sm rounded-full shadow-lg border border-[#C9A24F]/10 p-2">
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const isOpen = openSections.includes(item.id);
                  const isExpanded = expandedSection === item.id;
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="relative"
                      onMouseEnter={() => handleIconHover(item.id)}
                      onMouseLeave={handleIconLeave}
                    >
                      <motion.button
                        onClick={() => handleSectionClick(item.id)}
                        aria-label={`Navegar a ${item.label}: ${item.subtitle}`}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 relative group border ${ 
                          isOpen
                            ? 'bg-[#013220] border-[#C9A24F] shadow-lg shadow-[#C9A24F]/20'
                            : 'bg-white/60 border-transparent hover:bg-white hover:border-[#C9A24F]/30 hover:shadow-md'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`w-7 h-7 transition-all duration-300 ${isOpen ? 'opacity-90' : 'opacity-60 group-hover:opacity-100'}`}>
                          <item.icon />
                        </div>
                        
                        {/* Indicador de estado abierto/cerrado - más discreto */}
                        <div className={`absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full border border-[#F5F2E9] transition-all duration-300 ${
                          isOpen ? 'bg-[#C9A24F]' : 'bg-[#6E7276]/50'
                        }`} />
                      </motion.button>

                      {/* Tooltip expandido al hacer hover */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-[#013220]/95 backdrop-blur-sm rounded-lg shadow-xl border border-[#C9A24F]/30 px-3 py-2 whitespace-nowrap pointer-events-none"
                          >
                            <p className="text-xs font-light text-[#F5F2E9] tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.label}</p>
                            <p className="text-[10px] text-[#C9A24F] font-light" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.subtitle}</p>
                            {/* Flecha del tooltip */}
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#013220]/95" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-4 flex justify-center"
            >
              <ThemeToggleCompact />
            </motion.div>

            {/* Logo Auréthica en la parte inferior - más fino */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-4 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#C9A24F] dark:from-[#C9A24F] to-[#d4b366] dark:to-[#ffd700] flex items-center justify-center shadow-lg border border-[#C9A24F]/30">
                <span className="text-white dark:text-[#0f1114] text-xs" style={{ fontFamily: 'Playfair Display, serif' }}>A</span>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Navegación móvil - Barra inferior - Oculta cuando Hero está visible */}
      <AnimatePresence>
        {!isHeroVisible && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          >
            <div className="bg-[#F5F2E9]/40 backdrop-blur-md border-t border-[#C9A24F]/20 shadow-lg">
              <div className="flex items-center justify-around px-2 py-2.5">
                {navItems.map((item, index) => {
                  const isOpen = openSections.includes(item.id);
                  
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.08 }}
                      onClick={() => handleSectionClick(item.id)}
                      className="flex flex-col items-center gap-1 relative"
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
                        isOpen
                          ? 'bg-[#013220] border-[#C9A24F] shadow-md shadow-[#C9A24F]/20'
                          : 'bg-white/60 border-transparent'
                      }`}>
                        <div className={`w-6 h-6 transition-opacity duration-300 ${isOpen ? 'opacity-90' : 'opacity-60'}`}>
                          <item.icon />
                        </div>
                      </div>
                      <span className={`text-[9px] font-light tracking-wide transition-colors ${
                        isOpen ? 'text-[#013220]' : 'text-[#6E7276]'
                      }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {item.label.split(' ')[0]}
                      </span>
                      
                      {/* Indicador de sección abierta */}
                      {isOpen && (
                        <motion.div
                          layoutId="activeMobileSection"
                          className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C9A24F]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}