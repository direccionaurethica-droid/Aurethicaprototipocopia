/**
 * EmpresaDashboardPage - Dashboard para empresas/salones
 * Gestión de encuestas 360º y análisis de equipo
 */

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { SurveyComponent, Question } from '../components/diagnostico/SurveyComponent';
import * as diagnosticoAPI from '../lib/api/diagnostico';

interface EmpresaDashboardPageProps {
    userEmail: string;
    userName?: string;
    onBack?: () => void;
}

const PREGUNTAS_EMPRESA: Question[] = [
    {
        id: "1",
        text: "¿Cómo calificarías la comunicación interna en tu equipo?",
        options: [
            { id: "a", label: "Excelente - Fluida y transparente" },
            { id: "b", label: "Buena - Funcional con pequeñas mejoras" },
            { id: "c", label: "Regular - Necesita mejoras significativas" },
            { id: "d", label: "Deficiente - Requiere intervención urgente" },
        ],
    },
    {
        id: "2",
        text: "¿El equipo cuenta con las herramientas y productos necesarios para ofrecer servicios de calidad?",
        options: [
            { id: "a", label: "Sí, completamente equipados" },
            { id: "b", label: "Mayormente, faltan algunos elementos" },
            { id: "c", label: "Parcialmente, necesitamos inversión" },
            { id: "d", label: "No, hay carencias importantes" },
        ],
    },
    {
        id: "3",
        text: "¿Con qué frecuencia se realizan capacitaciones o actualizaciones de técnicas?",
        options: [
            { id: "a", label: "Mensualmente o más" },
            { id: "b", label: "Trimestralmente" },
            { id: "c", label: "Semestralmente o anualmente" },
            { id: "d", label: "Raramente o nunca" },
        ],
    },
    {
        id: "4",
        text: "¿Cómo describirías el ambiente laboral y la moral del equipo?",
        options: [
            { id: "a", label: "Excelente - Alta motivación y cohesión" },
            { id: "b", label: "Bueno - Positivo en general" },
            { id: "c", label: "Regular - Tensiones ocasionales" },
            { id: "d", label: "Problemático - Conflictos frecuentes" },
        ],
    },
    {
        id: "5",
        text: "¿Los clientes repiten y recomiendan vuestros servicios?",
        options: [
            { id: "a", label: "Sí, tenemos alta fidelización" },
            { id: "b", label: "Mayormente, con buenas recomendaciones" },
            { id: "c", label: "A veces, pero necesitamos mejorar retención" },
            { id: "d", label: "No, tenemos baja recurrencia" },
        ],
    },
    {
        id: "6",
        text: "¿Existe un sistema claro de objetivos y seguimiento de resultados?",
        options: [
            { id: "a", label: "Sí, con métricas claras y revisiones regulares" },
            { id: "b", label: "Sí, pero podría ser más estructurado" },
            { id: "c", label: "Parcialmente, es informal" },
            { id: "d", label: "No, no hay seguimiento formal" },
        ],
    },
    {
        id: "7",
        text: "¿Cómo gestionáis las quejas o sugerencias de los clientes?",
        options: [
            { id: "a", label: "Sistema formal de feedback y mejora continua" },
            { id: "b", label: "Las atendemos pero sin protocolo específico" },
            { id: "c", label: "De manera reactiva cuando surgen" },
            { id: "d", label: "No tenemos un proceso definido" },
        ],
    },
    {
        id: "8",
        text: "¿El equipo está alineado con la visión y valores del salón?",
        options: [
            { id: "a", label: "Totalmente - Cultura compartida fuerte" },
            { id: "b", label: "Mayormente - Buena alineación" },
            { id: "c", label: "Parcialmente - Falta cohesión" },
            { id: "d", label: "No - Desconexión entre equipo y visión" },
        ],
    },
];

type ViewMode = 'list' | 'create-empresa' | 'results';

export function EmpresaDashboardPage({ userEmail, userName, onBack }: EmpresaDashboardPageProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [encuestas, setEncuestas] = useState<diagnosticoAPI.Encuesta[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEncuesta, setSelectedEncuesta] = useState<diagnosticoAPI.EncuestaDetalle | null>(null);

    useEffect(() => {
        cargarEncuestas();
    }, [userEmail]);

    const cargarEncuestas = async () => {
        try {
            setLoading(true);
            const data = await diagnosticoAPI.obtenerEncuestas(userEmail);
            setEncuestas(data);
        } catch (error) {
            console.error('Error cargando encuestas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSuccess = () => {
        setViewMode('list');
        cargarEncuestas();
    };

    const handleViewResults = async (encuestaId: number) => {
        try {
            const detalle = await diagnosticoAPI.obtenerEncuestaDetalle(encuestaId);
            setSelectedEncuesta(detalle);
            setViewMode('results');
        } catch (error) {
            console.error('Error cargando detalle:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-neutral-950 text-neutral-50"
        >
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <header className="mb-8 border-b border-neutral-800 pb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-2">
                                Auréthica · Dashboard Empresarial
                            </p>
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                                {userName ? `Hola, ${userName}` : 'Panel de Gestión'}
                            </h1>
                            <p className="text-sm text-neutral-400 mt-2">{userEmail}</p>
                        </div>
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="px-4 py-2 text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                            >
                                ← Volver
                            </button>
                        )}
                    </div>
                </header>

                {/* Content */}
                {viewMode === 'list' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Diagnósticos 360º</h2>
                            <button
                                onClick={() => setViewMode('create-empresa')}
                                className="px-5 py-2.5 rounded-full text-sm font-medium bg-emerald-400 text-neutral-950 hover:bg-emerald-300 transition-colors"
                            >
                                + Nueva Evaluación de Equipo
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-12 text-neutral-400">Cargando...</div>
                        ) : encuestas.length === 0 ? (
                            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 text-center">
                                <p className="text-neutral-400 mb-4">
                                    Aún no has creado ninguna evaluación de equipo.
                                </p>
                                <button
                                    onClick={() => setViewMode('create-empresa')}
                                    className="px-5 py-2.5 rounded-full text-sm font-medium bg-emerald-400 text-neutral-950 hover:bg-emerald-300 transition-colors"
                                >
                                    Crear primera evaluación
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {encuestas.map((enc) => (
                                    <div
                                        key={enc.id}
                                        className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-lg">{enc.titulo}</h3>
                                                <p className="text-sm text-neutral-400 mt-1">
                                                    Creada el {new Date(enc.creado_en!).toLocaleDateString('es-ES')}
                                                </p>
                                                <span
                                                    className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${enc.activa
                                                            ? 'bg-emerald-400/10 text-emerald-400'
                                                            : 'bg-neutral-700 text-neutral-400'
                                                        }`}
                                                >
                                                    {enc.activa ? 'Activa' : 'Finalizada'}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleViewResults(enc.id!)}
                                                className="px-4 py-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                                            >
                                                Ver resultados →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {viewMode === 'create-empresa' && (
                    <div>
                        <button
                            onClick={() => setViewMode('list')}
                            className="mb-4 text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                        >
                            ← Volver al listado
                        </button>
                        <SurveyComponent
                            title="Evaluación 360º del Equipo"
                            subtitle="Diagnóstico completo para optimizar el rendimiento de tu salón"
                            surveyType="empresa"
                            questions={PREGUNTAS_EMPRESA}
                            userEmail={userEmail}
                            onSubmitSuccess={handleCreateSuccess}
                        />
                    </div>
                )}

                {viewMode === 'results' && selectedEncuesta && (
                    <div>
                        <button
                            onClick={() => setViewMode('list')}
                            className="mb-4 text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                        >
                            ← Volver al listado
                        </button>
                        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8">
                            <h2 className="text-2xl font-semibold mb-4">{selectedEncuesta.titulo}</h2>
                            <p className="text-neutral-400 mb-6">
                                Creada el {new Date(selectedEncuesta.creado_en!).toLocaleDateString('es-ES')}
                            </p>

                            {selectedEncuesta.respuestas && selectedEncuesta.respuestas.length > 0 ? (
                                <div className="space-y-4">
                                    <h3 className="font-medium text-lg">Respuestas recibidas: {selectedEncuesta.respuestas.length}</h3>
                                    {selectedEncuesta.respuestas.map((resp, idx) => (
                                        <div key={idx} className="bg-neutral-800/50 rounded-lg p-4">
                                            <p className="text-sm text-neutral-400">
                                                {resp.respondedor_email} - {new Date(resp.completada_en!).toLocaleDateString('es-ES')}
                                            </p>
                                            <pre className="text-xs mt-2 text-neutral-300 overflow-auto">
                                                {JSON.stringify(resp.respuestas, null, 2)}
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-neutral-400">Aún no hay respuestas para esta evaluación.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
