/**
 * EstilistaDashboardPage - Dashboard para estilistas/peluqueros
 * Gestión de encuestas 360º y evaluación de habilidades
 */

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { SurveyComponent, Question } from '../components/diagnostico/SurveyComponent';
import * as diagnosticoAPI from '../lib/api/diagnostico';

interface EstilistaDashboardPageProps {
    userEmail: string;
    userName?: string;
    onBack?: () => void;
}

const PREGUNTAS_ESTILISTA: Question[] = [
    {
        id: "1",
        text: "¿Cómo evaluarías tus habilidades técnicas actuales?",
        options: [
            { id: "a", label: "Expertas - Dominio completo de técnicas avanzadas" },
            { id: "b", label: "Sólidas - Buen nivel con margen de mejora" },
            { id: "c", label: "Básicas - Necesito formación continua" },
            { id: "d", label: "En desarrollo - Requiero capacitación intensiva" },
        ],
    },
    {
        id: "2",
        text: "¿Con qué frecuencia actualizas tus conocimientos y técnicas?",
        options: [
            { id: "a", label: "Mensualmente - Cursos y tendencias constantes" },
            { id: "b", label: "Trimestralmente - Formación regular" },
            { id: "c", label: "Anualmente - Actualización esporádica" },
            { id: "d", label: "Raramente - Sin formación continua" },
        ],
    },
    {
        id: "3",
        text: "¿Cómo manejas las consultas personalizadas de cada cliente?",
        options: [
            { id: "a", label: "Análisis profundo - Diagnóstico completo siempre" },
            { id: "b", label: "Consulta básica - Preguntas clave" },
            { id: "c", label: "Informal - Conversación general" },
            { id: "d", label: "Directa - Sin análisis previo" },
        ],
    },
    {
        id: "4",
        text: "¿Qué tan segura/o te sientes manejando colorimetría avanzada?",
        options: [
            { id: "a", label: "Muy segura/o - Técnicas complejas y corrección" },
            { id: "b", label: "Segura/o - Colores convencionales" },
            { id: "c", label: "Insegura/o - Necesito supervisión" },
            { id: "d", label: "No capacitada/o - Requiero formación" },
        ],
    },
    {
        id: "5",
        text: "¿Utilizas productos profesionales de calidad de manera consistente?",
        options: [
            { id: "a", label: "Siempre - Marcas premium y especializadas" },
            { id: "b", label: "Mayormente - Buenos productos con excepciones" },
            { id: "c", label: "A veces - Depende del presupuesto" },
            { id: "d", label: "Raramente - Productos básicos" },
        ],
    },
    {
        id: "6",
        text: "¿Recibes feedback regular de tus clientes?",
        options: [
            { id: "a", label: "Sí, constantemente positivo y testimonios" },
            { id: "b", label: "Sí, buenas reseñas en general" },
            { id: "c", label: "Ocasionalmente, mixto" },
            { id: "d", label: "Poco o negativo" },
        ],
    },
    {
        id: "7",
        text: "¿Cómo gestionas tu agenda y tiempos de servicio?",
        options: [
            { id: "a", label: "Sistema digital organizado - Siempre puntual" },
            { id: "b", label: "Agenda manual efectiva - Generalmente puntual" },
            { id: "c", label: "Informal - A veces hay retrasos" },
            { id: "d", label: "Desorganizada - Retrasos frecuentes" },
        ],
    },
    {
        id: "8",
        text: "¿Te sientes motivada/o y satisfecha/o con tu carrera actual?",
        options: [
            { id: "a", label: "Muy motivada/o - En constante crecimiento" },
            { id: "b", label: "Satisfecha/o - Disfruto mi trabajo" },
            { id: "c", label: "Desmotivada/o - Necesito cambios" },
            { id: "d", label: "Insatisfecha/o - Considerando alternativas" },
        ],
    },
];

type ViewMode = 'list' | 'create-empleado' | 'results';

export function EstilistaDashboardPage({ userEmail, userName, onBack }: EstilistaDashboardPageProps) {
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
                                Auréthica · Dashboard Estilista
                            </p>
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                                {userName ? `Hola, ${userName}` : 'Mi Panel Profesional'}
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
                            <h2 className="text-xl font-semibold">Mis Evaluaciones 360º</h2>
                            <button
                                onClick={() => setViewMode('create-empleado')}
                                className="px-5 py-2.5 rounded-full text-sm font-medium bg-emerald-400 text-neutral-950 hover:bg-emerald-300 transition-colors"
                            >
                                + Nueva Autoevaluación
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-12 text-neutral-400">Cargando...</div>
                        ) : encuestas.length === 0 ? (
                            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 text-center">
                                <p className="text-neutral-400 mb-4">
                                    Aún no has realizado ninguna autoevaluación.
                                </p>
                                <p className="text-sm text-neutral-500 mb-6">
                                    Las evaluaciones 360º te ayudan a identificar áreas de mejora y potenciar tu carrera profesional.
                                </p>
                                <button
                                    onClick={() => setViewMode('create-empleado')}
                                    className="px-5 py-2.5 rounded-full text-sm font-medium bg-emerald-400 text-neutral-950 hover:bg-emerald-300 transition-colors"
                                >
                                    Comenzar evaluación
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
                                                    Realizada el {new Date(enc.creado_en!).toLocaleDateString('es-ES')}
                                                </p>
                                                <span
                                                    className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${enc.activa
                                                            ? 'bg-emerald-400/10 text-emerald-400'
                                                            : 'bg-neutral-700 text-neutral-400'
                                                        }`}
                                                >
                                                    {enc.activa ? 'Activa' : 'Completada'}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleViewResults(enc.id!)}
                                                className="px-4 py-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                                            >
                                                Ver análisis →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {viewMode === 'create-empleado' && (
                    <div>
                        <button
                            onClick={() => setViewMode('list')}
                            className="mb-4 text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                        >
                            ← Volver al listado
                        </button>
                        <SurveyComponent
                            title="Evaluación 360º Personal"
                            subtitle="Análisis de habilidades y desarrollo profesional"
                            surveyType="empleado"
                            questions={PREGUNTAS_ESTILISTA}
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
                                Realizada el {new Date(selectedEncuesta.creado_en!).toLocaleDateString('es-ES')}
                            </p>

                            <div className="space-y-4">
                                <h3 className="font-medium text-lg">Análisis de Resultados</h3>
                                <div className="bg-neutral-800/50 rounded-lg p-4">
                                    <p className="text-sm text-neutral-300 mb-4">
                                        Gigi está analizando tus respuestas para generar un plan personalizado...
                                    </p>
                                    {selectedEncuesta.respuestas && selectedEncuesta.respuestas.length > 0 && (
                                        <pre className="text-xs text-neutral-400 overflow-auto">
                                            {JSON.stringify(selectedEncuesta.respuestas[0].respuestas, null, 2)}
                                        </pre>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
