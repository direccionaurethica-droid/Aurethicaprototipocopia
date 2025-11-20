/**
 * Cliente API para el servicio de diagnóstico 360º
 * Conecta con aurethica-proyecto (Next.js API)
 */

const API_BASE_URL = (import.meta as any).env?.VITE_DIAGNOSTICO_API_URL || 'http://localhost:3000';

export interface Encuesta {
    id?: number;
    creador_email: string;
    titulo: string;
    tipo: 'empleado' | 'empresa';
    creado_en?: string;
    activa: boolean;
}

export interface RespuestaEncuesta {
    encuesta_id: number;
    respondedor_email: string;
    respuestas: Record<string, any>;
    completada_en?: string;
}

export interface EncuestaDetalle extends Encuesta {
    respuestas?: RespuestaEncuesta[];
}

/**
 * Crear nueva encuesta 360º
 */
export async function crearEncuesta(data: {
    creador_email: string;
    titulo: string;
    tipo: 'empleado' | 'empresa';
}): Promise<Encuesta> {
    const response = await fetch(`${API_BASE_URL}/api/surveys/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error al crear encuesta');
    }

    return response.json();
}

/**
 * Obtener encuestas del usuario
 */
export async function obtenerEncuestas(email: string): Promise<Encuesta[]> {
    const response = await fetch(`${API_BASE_URL}/api/surveys?email=${encodeURIComponent(email)}`);

    if (!response.ok) {
        throw new Error('Error al obtener encuestas');
    }

    return response.json();
}

/**
 * Obtener detalle de encuesta con respuestas
 */
export async function obtenerEncuestaDetalle(id: number): Promise<EncuestaDetalle> {
    const response = await fetch(`${API_BASE_URL}/api/surveys/${id}`);

    if (!response.ok) {
        throw new Error('Error al obtener detalle de encuesta');
    }

    return response.json();
}

/**
 * Enviar respuesta a encuesta
 */
export async function enviarRespuesta(data: {
    encuesta_id: number;
    respondedor_email: string;
    respuestas: Record<string, any>;
}): Promise<RespuestaEncuesta> {
    const response = await fetch(`${API_BASE_URL}/api/surveys/${data.encuesta_id}/responder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error al enviar respuesta');
    }

    return response.json();
}

/**
 * Desactivar encuesta
 */
export async function desactivarEncuesta(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/surveys/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error al desactivar encuesta');
    }
}
