/**
 * Utilidades de validación
 * Validación de formularios, datos de usuario, etc.
 */

import { VALIDATION_RULES } from '../constants';

/**
 * Validar nombre
 */
export function validateName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'El nombre es requerido' };
  }

  if (name.length < VALIDATION_RULES.NAME.minLength) {
    return { 
      valid: false, 
      error: `El nombre debe tener al menos ${VALIDATION_RULES.NAME.minLength} caracteres` 
    };
  }

  if (name.length > VALIDATION_RULES.NAME.maxLength) {
    return { 
      valid: false, 
      error: `El nombre no debe exceder ${VALIDATION_RULES.NAME.maxLength} caracteres` 
    };
  }

  if (!VALIDATION_RULES.NAME.pattern.test(name)) {
    return { 
      valid: false, 
      error: 'El nombre solo debe contener letras y espacios' 
    };
  }

  return { valid: true };
}

/**
 * Validar email
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: 'El email es requerido' };
  }

  if (!VALIDATION_RULES.EMAIL.pattern.test(email)) {
    return { valid: false, error: 'El email no es válido' };
  }

  return { valid: true };
}

/**
 * Validar teléfono
 */
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  if (!phone || phone.trim().length === 0) {
    return { valid: false, error: 'El teléfono es requerido' };
  }

  const cleanPhone = phone.replace(/\s/g, '');

  if (cleanPhone.length < VALIDATION_RULES.PHONE.minLength) {
    return { 
      valid: false, 
      error: `El teléfono debe tener al menos ${VALIDATION_RULES.PHONE.minLength} dígitos` 
    };
  }

  if (cleanPhone.length > VALIDATION_RULES.PHONE.maxLength) {
    return { 
      valid: false, 
      error: `El teléfono no debe exceder ${VALIDATION_RULES.PHONE.maxLength} dígitos` 
    };
  }

  if (!VALIDATION_RULES.PHONE.pattern.test(phone)) {
    return { valid: false, error: 'El formato del teléfono no es válido' };
  }

  return { valid: true };
}

/**
 * Validar archivo de imagen
 */
export function validateImageFile(
  file: File
): { valid: boolean; error?: string } {
  // Validar formato
  if (!VALIDATION_RULES.AVATAR.acceptedFormats.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Formato de archivo no soportado. Usa JPG, PNG, WEBP o AVIF' 
    };
  }

  // Validar tamaño
  if (file.size > VALIDATION_RULES.AVATAR.maxFileSize) {
    const maxSizeMB = VALIDATION_RULES.AVATAR.maxFileSize / (1024 * 1024);
    return { 
      valid: false, 
      error: `El archivo es demasiado grande. Máximo ${maxSizeMB}MB` 
    };
  }

  return { valid: true };
}

/**
 * Validar array de archivos de avatar
 */
export function validateAvatarFiles(
  files: File[]
): { valid: boolean; error?: string } {
  if (files.length < VALIDATION_RULES.AVATAR.minPhotos) {
    return { 
      valid: false, 
      error: `Debes subir al menos ${VALIDATION_RULES.AVATAR.minPhotos} fotos` 
    };
  }

  if (files.length > VALIDATION_RULES.AVATAR.maxPhotos) {
    return { 
      valid: false, 
      error: `No puedes subir más de ${VALIDATION_RULES.AVATAR.maxPhotos} fotos` 
    };
  }

  // Validar cada archivo
  for (const file of files) {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return validation;
    }
  }

  return { valid: true };
}

/**
 * Sanitizar string (remover caracteres peligrosos)
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '') // Remover < >
    .replace(/javascript:/gi, '') // Remover javascript:
    .trim();
}

/**
 * Sanitizar HTML básico
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Validar URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validar que una cadena sea un email válido (versión simple)
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION_RULES.EMAIL.pattern.test(email);
}

/**
 * Formatear teléfono para display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  
  return phone;
}

/**
 * Validar datos de registro completos
 */
export function validateRegistrationData(data: {
  nombre: string;
  email: string;
  telefono: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const nameValidation = validateName(data.nombre);
  if (!nameValidation.valid && nameValidation.error) {
    errors.nombre = nameValidation.error;
  }

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.valid && emailValidation.error) {
    errors.email = emailValidation.error;
  }

  const phoneValidation = validatePhone(data.telefono);
  if (!phoneValidation.valid && phoneValidation.error) {
    errors.telefono = phoneValidation.error;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
