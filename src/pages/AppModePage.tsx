/**
 * AppModePage - Modo aplicación (Blog/Perfil/Búsqueda/Vistas Profesionales)
 * Experiencia completa post-onboarding con funcionalidades por rol
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useJourney } from '../contexts/JourneyContext';
import { NavigationBarApp, type AppViewType } from '../components/NavigationBarApp';
import { BlogSection } from '../components/BlogSection';
import { UserProfile } from '../components/UserProfile';
import { SearchView } from '../components/SearchView';
import { AgendaView } from '../components/AgendaView';
import { ClientasView } from '../components/ClientasView';
import { EstadisticasView } from '../components/EstadisticasView';
import { EstilistasView } from '../components/EstilistasView';
import { Footer } from '../components/Footer';

interface AppModePageProps {
  userData: any;
}

export function AppModePage({ userData }: AppModePageProps) {
  const [currentView, setCurrentView] = useState<AppViewType>('blog');
  const { setCurrentStep, completeOnboarding } = useJourney();
  
  const userRole = userData?.userRole || 'usuaria';
  const stylistName = userData?.name;
  const stylistLevel = userData?.stylistLevel;

  useEffect(() => {
    setCurrentStep('app');
    completeOnboarding();
  }, [setCurrentStep, completeOnboarding]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black"
    >
      {/* Navegación fija top */}
      <NavigationBarApp 
        currentView={currentView}
        onViewChange={setCurrentView}
        userRole={userRole}
      />

      {/* Contenido principal con transiciones premium */}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {currentView === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <BlogSection />
            </motion.div>
          )}
          
          {currentView === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <UserProfile userData={userData} />
            </motion.div>
          )}
          
          {currentView === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <SearchView />
            </motion.div>
          )}
          
          {currentView === 'agenda' && (
            <motion.div
              key="agenda"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <AgendaView 
                userRole={userRole} 
                stylistName={stylistName}
                userName={userData?.nombre || userData?.name}
              />
            </motion.div>
          )}
          
          {currentView === 'clientas' && (
            <motion.div
              key="clientas"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ClientasView />
            </motion.div>
          )}
          
          {currentView === 'estadisticas' && (
            <motion.div
              key="estadisticas"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <EstadisticasView 
                userRole={userRole as 'estilista' | 'empresa'}
                stylistLevel={stylistLevel}
              />
            </motion.div>
          )}
          
          {currentView === 'estilistas' && (
            <motion.div
              key="estilistas"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <EstilistasView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}