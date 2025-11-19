/**
 * Sistema de traducciones i18n
 * Soporte multiidioma (ES, CA, EN)
 */

export type Language = 'es' | 'ca' | 'en';

export interface Translations {
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    back: string;
    next: string;
    save: string;
    delete: string;
    edit: string;
    share: string;
    close: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  registration: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    submit: string;
    termsAccept: string;
  };
  gigi: {
    intro: string;
    calibrationTitle: string;
    ready: string;
    questions: {
      confianza: string;
      cambio: string;
      seguridad: string;
      expresion: string;
      confirmacion: string;
    };
    options: {
      neutro: string;
      suave: string;
      equilibrado: string;
      firme: string;
      intimo: string;
    };
  };
  blog: {
    title: string;
    featured: string;
    latest: string;
    categories: {
      tutorial: string;
      tendencias: string;
      cuidado: string;
      estilo: string;
    };
    readMore: string;
    likes: string;
    comments: string;
    share: string;
    bookmark: string;
  };
  profile: {
    title: string;
    editProfile: string;
    settings: string;
    logout: string;
    stats: {
      posts: string;
      followers: string;
      following: string;
    };
  };
  search: {
    placeholder: string;
    noResults: string;
    recent: string;
    trending: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      back: 'Volver',
      next: 'Siguiente',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      share: 'Compartir',
      close: 'Cerrar',
    },
    hero: {
      title: 'Descubre tu estilo único',
      subtitle: 'Con Gigi, tu asistente de belleza personal',
      cta: 'Comenzar ahora',
    },
    registration: {
      title: 'Únete a Auréthica',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre completo',
      emailLabel: 'Email',
      emailPlaceholder: 'tu@email.com',
      phoneLabel: 'Teléfono',
      phonePlaceholder: '+34 600 000 000',
      submit: 'Continuar',
      termsAccept: 'Acepto los términos y condiciones',
    },
    gigi: {
      intro: '¡Hola! Soy Gigi, tu asistente personal de belleza',
      calibrationTitle: 'Vamos a conocernos mejor',
      ready: '¿Estás lista?',
      questions: {
        confianza: '¿Cómo te sientes con tu estilo actual?',
        cambio: '¿Qué tan dispuesta estás a experimentar?',
        seguridad: '¿Prefieres seguir tendencias o tu propio camino?',
        expresion: '¿Cómo te gusta expresarte?',
        confirmacion: '¿Necesitas validación externa?',
      },
      options: {
        neutro: 'Neutro',
        suave: 'Suave',
        equilibrado: 'Equilibrado',
        firme: 'Firme',
        intimo: 'Íntimo',
      },
    },
    blog: {
      title: 'Inspiración',
      featured: 'Destacados',
      latest: 'Últimas publicaciones',
      categories: {
        tutorial: 'Tutoriales',
        tendencias: 'Tendencias',
        cuidado: 'Cuidado',
        estilo: 'Estilo',
      },
      readMore: 'Leer más',
      likes: 'Me gusta',
      comments: 'Comentarios',
      share: 'Compartir',
      bookmark: 'Guardar',
    },
    profile: {
      title: 'Mi Perfil',
      editProfile: 'Editar perfil',
      settings: 'Configuración',
      logout: 'Cerrar sesión',
      stats: {
        posts: 'Publicaciones',
        followers: 'Seguidores',
        following: 'Siguiendo',
      },
    },
    search: {
      placeholder: 'Buscar...',
      noResults: 'No se encontraron resultados',
      recent: 'Recientes',
      trending: 'Tendencias',
    },
  },
  ca: {
    common: {
      loading: 'Carregant...',
      error: 'Error',
      success: 'Èxit',
      cancel: 'Cancel·lar',
      confirm: 'Confirmar',
      back: 'Tornar',
      next: 'Següent',
      save: 'Desar',
      delete: 'Eliminar',
      edit: 'Editar',
      share: 'Compartir',
      close: 'Tancar',
    },
    hero: {
      title: 'Descobreix el teu estil únic',
      subtitle: 'Amb Gigi, el teu assistent de bellesa personal',
      cta: 'Començar ara',
    },
    registration: {
      title: "Uneix-te a Auréthica",
      nameLabel: 'Nom',
      namePlaceholder: 'El teu nom complet',
      emailLabel: 'Email',
      emailPlaceholder: 'el-teu@email.com',
      phoneLabel: 'Telèfon',
      phonePlaceholder: '+34 600 000 000',
      submit: 'Continuar',
      termsAccept: 'Accepto els termes i condicions',
    },
    gigi: {
      intro: 'Hola! Sóc Gigi, el teu assistent personal de bellesa',
      calibrationTitle: 'Anem a conèixer-nos millor',
      ready: 'Estàs preparada?',
      questions: {
        confianza: 'Com et sents amb el teu estil actual?',
        cambio: 'Quant de disposada estàs a experimentar?',
        seguridad: 'Prefereixes seguir tendències o el teu propi camí?',
        expresion: 'Com t\'agrada expressar-te?',
        confirmacion: 'Necessites validació externa?',
      },
      options: {
        neutro: 'Neutre',
        suave: 'Suau',
        equilibrado: 'Equilibrat',
        firme: 'Ferm',
        intimo: 'Íntim',
      },
    },
    blog: {
      title: 'Inspiració',
      featured: 'Destacats',
      latest: 'Últimes publicacions',
      categories: {
        tutorial: 'Tutorials',
        tendencias: 'Tendències',
        cuidado: 'Cura',
        estilo: 'Estil',
      },
      readMore: 'Llegir més',
      likes: 'M\'agrada',
      comments: 'Comentaris',
      share: 'Compartir',
      bookmark: 'Desar',
    },
    profile: {
      title: 'El meu Perfil',
      editProfile: 'Editar perfil',
      settings: 'Configuració',
      logout: 'Tancar sessió',
      stats: {
        posts: 'Publicacions',
        followers: 'Seguidors',
        following: 'Seguint',
      },
    },
    search: {
      placeholder: 'Cercar...',
      noResults: 'No s\'han trobat resultats',
      recent: 'Recents',
      trending: 'Tendències',
    },
  },
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      share: 'Share',
      close: 'Close',
    },
    hero: {
      title: 'Discover your unique style',
      subtitle: 'With Gigi, your personal beauty assistant',
      cta: 'Start now',
    },
    registration: {
      title: 'Join Auréthica',
      nameLabel: 'Name',
      namePlaceholder: 'Your full name',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      phoneLabel: 'Phone',
      phonePlaceholder: '+1 555 000 0000',
      submit: 'Continue',
      termsAccept: 'I accept the terms and conditions',
    },
    gigi: {
      intro: 'Hi! I\'m Gigi, your personal beauty assistant',
      calibrationTitle: 'Let\'s get to know each other better',
      ready: 'Are you ready?',
      questions: {
        confianza: 'How do you feel about your current style?',
        cambio: 'How willing are you to experiment?',
        seguridad: 'Do you prefer following trends or your own path?',
        expresion: 'How do you like to express yourself?',
        confirmacion: 'Do you need external validation?',
      },
      options: {
        neutro: 'Neutral',
        suave: 'Soft',
        equilibrado: 'Balanced',
        firme: 'Firm',
        intimo: 'Intimate',
      },
    },
    blog: {
      title: 'Inspiration',
      featured: 'Featured',
      latest: 'Latest posts',
      categories: {
        tutorial: 'Tutorials',
        tendencias: 'Trends',
        cuidado: 'Care',
        estilo: 'Style',
      },
      readMore: 'Read more',
      likes: 'Likes',
      comments: 'Comments',
      share: 'Share',
      bookmark: 'Save',
    },
    profile: {
      title: 'My Profile',
      editProfile: 'Edit profile',
      settings: 'Settings',
      logout: 'Log out',
      stats: {
        posts: 'Posts',
        followers: 'Followers',
        following: 'Following',
      },
    },
    search: {
      placeholder: 'Search...',
      noResults: 'No results found',
      recent: 'Recent',
      trending: 'Trending',
    },
  },
};
