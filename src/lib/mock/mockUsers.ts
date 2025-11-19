/**
 * Mock de usuarios para testing
 * Usuarios de prueba con perfiles completos y roles diferenciados
 */

import type { RegistrationData, CalibrationSelection, UserRole } from '../types';

export interface MockUser {
  email: string;
  password: string;
  registrationData: RegistrationData;
  gigiCalibration: CalibrationSelection;
  beautyProfile: {
    estilo: string;
    colorimetria: string;
    preferencias: string[];
  };
  hasAvatar: boolean;
  registrationDate: string;
  userRole: UserRole;
  // Datos específicos por rol
  salonName?: string;
  salonId?: string;
  stylistLevel?: 'junior' | 'senior' | 'master';
  affiliatedSalonId?: string;
  affiliatedSalonName?: string;
}

export const mockUsers: Record<string, MockUser> = {
  // ============= USUARIAS / CLIENTAS =============
  
  'ana.martinez@example.com': {
    email: 'ana.martinez@example.com',
    password: '123456',
    userRole: 'usuaria',
    registrationData: {
      nombre: 'Ana',
      apellido: 'Martínez',
      email: 'ana.martinez@example.com',
      telefono: '+34 654 321 098',
      userRole: 'usuaria',
      aceptaTerminos: true,
      aceptaNewsletter: true,
    },
    gigiCalibration: {
      confianza: 'equilibrado',
      cambio: 'suave',
      seguridad: 'firme',
      expresion: 'equilibrado',
      confirmacion: 'suave',
    },
    beautyProfile: {
      estilo: 'Natural y sofisticado',
      colorimetria: 'Primavera cálida',
      preferencias: [
        'Balayage natural',
        'Cortes modernos con volumen',
        'Colores cálidos y luminosos',
        'Estilo minimalista',
        'Productos eco-friendly'
      ],
    },
    hasAvatar: true,
    registrationDate: 'Octubre 2025',
    affiliatedSalonId: 'salon-madrid-centro',
    affiliatedSalonName: 'Salón Auréthica Madrid Centro',
  },
  
  'lucia.fernandez@example.com': {
    email: 'lucia.fernandez@example.com',
    password: '123456',
    userRole: 'usuaria',
    registrationData: {
      nombre: 'Lucía',
      apellido: 'Fernández',
      email: 'lucia.fernandez@example.com',
      telefono: '+34 666 777 888',
      userRole: 'usuaria',
      aceptaTerminos: true,
      aceptaNewsletter: false,
    },
    gigiCalibration: {
      confianza: 'firme',
      cambio: 'firme',
      seguridad: 'suave',
      expresion: 'firme',
      confirmacion: 'neutro',
    },
    beautyProfile: {
      estilo: 'Audaz y creativo',
      colorimetria: 'Invierno profundo',
      preferencias: [
        'Cortes dramáticos',
        'Colores intensos',
        'Estilos statement',
        'Maquillaje bold',
        'Tendencias vanguardistas'
      ],
    },
    hasAvatar: true,
    registrationDate: 'Septiembre 2025',
    affiliatedSalonId: 'salon-barcelona-gotico',
    affiliatedSalonName: 'Salón Auréthica Barcelona Gótico',
  },
  
  'sofia.garcia@example.com': {
    email: 'sofia.garcia@example.com',
    password: '123456',
    userRole: 'usuaria',
    registrationData: {
      nombre: 'Sofía',
      apellido: 'García',
      email: 'sofia.garcia@example.com',
      telefono: '+34 699 888 777',
      userRole: 'usuaria',
      aceptaTerminos: true,
      aceptaNewsletter: true,
    },
    gigiCalibration: {
      confianza: 'suave',
      cambio: 'neutro',
      seguridad: 'neutro',
      expresion: 'suave',
      confirmacion: 'firme',
    },
    beautyProfile: {
      estilo: 'Clásico y elegante',
      colorimetria: 'Otoño cálido',
      preferencias: [
        'Peinados estructurados',
        'Tonos tierra y caramelo',
        'Estilos atemporales',
        'Belleza discreta',
        'Calidad sobre cantidad'
      ],
    },
    hasAvatar: true,
    registrationDate: 'Noviembre 2025',
  },

  // ============= ESTILISTAS =============
  
  'marta.lopez@aurethica.com': {
    email: 'marta.lopez@aurethica.com',
    password: '123456',
    userRole: 'estilista',
    registrationData: {
      nombre: 'Marta',
      apellido: 'López',
      email: 'marta.lopez@aurethica.com',
      telefono: '+34 655 444 333',
      userRole: 'estilista',
      aceptaTerminos: true,
      aceptaNewsletter: true,
    },
    gigiCalibration: {
      confianza: 'firme',
      cambio: 'equilibrado',
      seguridad: 'equilibrado',
      expresion: 'firme',
      confirmacion: 'equilibrado',
    },
    beautyProfile: {
      estilo: 'Profesional y creativo',
      colorimetria: 'Versátil',
      preferencias: [
        'Técnicas avanzadas de color',
        'Cortes de precisión',
        'Estilos contemporáneos',
        'Formación continua',
        'Innovación en tendencias'
      ],
    },
    hasAvatar: true,
    registrationDate: 'Agosto 2025',
    salonId: 'salon-madrid-centro',
    salonName: 'Salón Auréthica Madrid Centro',
    stylistLevel: 'senior',
  },
  
  'carlos.ruiz@aurethica.com': {
    email: 'carlos.ruiz@aurethica.com',
    password: '123456',
    userRole: 'estilista',
    registrationData: {
      nombre: 'Carlos',
      apellido: 'Ruiz',
      email: 'carlos.ruiz@aurethica.com',
      telefono: '+34 688 999 111',
      userRole: 'estilista',
      aceptaTerminos: true,
      aceptaNewsletter: true,
    },
    gigiCalibration: {
      confianza: 'firme',
      cambio: 'firme',
      seguridad: 'firme',
      expresion: 'firme',
      confirmacion: 'firme',
    },
    beautyProfile: {
      estilo: 'Maestro y vanguardista',
      colorimetria: 'Experto en todos los tonos',
      preferencias: [
        'Técnicas de alta colorimetría',
        'Cortes arquitectónicos',
        'Formación a equipos',
        'Estilos de pasarela',
        'Liderazgo creativo'
      ],
    },
    hasAvatar: true,
    registrationDate: 'Enero 2024',
    salonId: 'salon-barcelona-gotico',
    salonName: 'Salón Auréthica Barcelona Gótico',
    stylistLevel: 'master',
  },

  // ============= EMPRESAS / SALONES =============
  
  'salon.madrid@aurethica.com': {
    email: 'salon.madrid@aurethica.com',
    password: '123456',
    userRole: 'empresa',
    registrationData: {
      nombre: 'Auréthica Madrid',
      apellido: 'Centro',
      email: 'salon.madrid@aurethica.com',
      telefono: '+34 910 123 456',
      userRole: 'empresa',
      salonName: 'Salón Auréthica Madrid Centro',
      aceptaTerminos: true,
      aceptaNewsletter: true,
    },
    gigiCalibration: {
      confianza: 'firme',
      cambio: 'equilibrado',
      seguridad: 'firme',
      expresion: 'equilibrado',
      confirmacion: 'equilibrado',
    },
    beautyProfile: {
      estilo: 'Premium y acogedor',
      colorimetria: 'Servicios completos',
      preferencias: [
        'Atención personalizada',
        'Tecnología avanzada',
        'Formación constante',
        'Ambiente inclusivo',
        'Excelencia en servicio'
      ],
    },
    hasAvatar: true,
    registrationDate: 'Marzo 2024',
    salonId: 'salon-madrid-centro',
    salonName: 'Salón Auréthica Madrid Centro',
  },
  
  'salon.barcelona@aurethica.com': {
    email: 'salon.barcelona@aurethica.com',
    password: '123456',
    userRole: 'empresa',
    registrationData: {
      nombre: 'Auréthica Barcelona',
      apellido: 'Gótico',
      email: 'salon.barcelona@aurethica.com',
      telefono: '+34 933 222 111',
      userRole: 'empresa',
      salonName: 'Salón Auréthica Barcelona Gótico',
      aceptaTerminos: true,
      aceptaNewsletter: true,
    },
    gigiCalibration: {
      confianza: 'equilibrado',
      cambio: 'firme',
      seguridad: 'equilibrado',
      expresion: 'firme',
      confirmacion: 'equilibrado',
    },
    beautyProfile: {
      estilo: 'Moderno y urbano',
      colorimetria: 'Vanguardia en color',
      preferencias: [
        'Diseño contemporáneo',
        'Equipo multidisciplinar',
        'Innovación constante',
        'Ambiente cosmopolita',
        'Experiencia única'
      ],
    },
    hasAvatar: true,
    registrationDate: 'Abril 2024',
    salonId: 'salon-barcelona-gotico',
    salonName: 'Salón Auréthica Barcelona Gótico',
  },
};

/**
 * Función para verificar credenciales de login
 */
export function authenticateUser(email: string, password: string): MockUser | null {
  const user = mockUsers[email];
  
  if (!user) {
    return null;
  }
  
  if (user.password !== password) {
    return null;
  }
  
  return user;
}

/**
 * Función para obtener datos de usuario por email
 */
export function getUserByEmail(email: string): MockUser | null {
  return mockUsers[email] || null;
}

/**
 * Función para verificar si un email ya existe
 */
export function emailExists(email: string): boolean {
  return email in mockUsers;
}

/**
 * Obtener usuarios por rol
 */
export function getUsersByRole(role: UserRole): MockUser[] {
  return Object.values(mockUsers).filter(user => user.userRole === role);
}

/**
 * Obtener estilistas de un salón específico
 */
export function getStylistsBySalon(salonId: string): MockUser[] {
  return Object.values(mockUsers).filter(
    user => user.userRole === 'estilista' && user.salonId === salonId
  );
}

/**
 * Obtener clientas afiliadas a un salón
 */
export function getClientsBySalon(salonId: string): MockUser[] {
  return Object.values(mockUsers).filter(
    user => user.userRole === 'usuaria' && user.affiliatedSalonId === salonId
  );
}
