import React, { useState } from "react";

type Option = {
    id: string;
    label: string;
};

type Question = {
    id: string;
    text: string;
    options: Option[];
};

interface SurveyComponentProps {
    title: string;
    subtitle: string;
    surveyType: "empresa" | "empleado";
    questions: Question[];
    userEmail: string;
    onSubmitSuccess?: () => void;
}

export const SurveyComponent: React.FC<SurveyComponentProps> = ({
    title,
    subtitle,
    surveyType,
    questions,
    userEmail,
    onSubmitSuccess,
}) => {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "ok" | "error">(
        "idle",
    );

    const total = questions.length;
    const answered = Object.keys(answers).length;
    const progress = Math.round((answered / total) * 100);

    const handleSelect = (questionId: string, optionId: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
        setSubmitStatus("idle");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validación simple: todas contestadas
        if (Object.keys(answers).length < questions.length) {
            setSubmitStatus("error");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");
        try {
            const API_BASE_URL = (import.meta as any).env?.VITE_DIAGNOSTICO_API_URL || 'http://localhost:3000';

            await fetch(`${API_BASE_URL}/api/surveys/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    surveyType,
                    answers,
                    submittedAt: new Date().toISOString(),
                    email: userEmail,
                }),
            });
            setIsSubmitting(false);
            setSubmitStatus("ok");
            if (onSubmitSuccess) {
                setTimeout(onSubmitSuccess, 1500);
            }
        } catch (err) {
            console.error("Error enviando respuestas", err);
            setIsSubmitting(false);
            setSubmitStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl">
                <header className="mb-8">
                    <p className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-2">
                        Auréthica · Diagnóstico 360º
                    </p>
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                        {title}
                    </h1>
                    <p className="text-sm md:text-base text-neutral-400">{subtitle}</p>

                    <div className="mt-6">
                        <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                            <span>
                                Progreso: {answered}/{total} preguntas
                            </span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                            <div
                                className="h-full bg-emerald-400 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 md:p-8 shadow-xl shadow-black/50"
                >
                    {questions.map((q, index) => (
                        <section key={q.id} className="border-b border-neutral-800 pb-5 last:border-b-0 last:pb-0">
                            <div className="flex gap-3 items-baseline mb-3">
                                <span className="text-xs text-neutral-500">
                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}.
                                </span>
                                <p className="text-sm md:text-base text-neutral-100">
                                    {q.text}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {q.options.map((opt) => {
                                    const selected = answers[q.id] === opt.id;
                                    return (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => handleSelect(q.id, opt.id)}
                                            className={[
                                                "text-left text-xs md:text-sm px-3 py-2.5 rounded-xl border transition-all",
                                                "focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-1 focus:ring-offset-neutral-900",
                                                selected
                                                    ? "border-emerald-400 bg-emerald-400/10 text-emerald-100"
                                                    : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900",
                                            ].join(" ")}
                                        >
                                            <span className="font-mono mr-1 text-[0.7rem] uppercase text-neutral-500">
                                                {opt.id}.
                                            </span>
                                            {opt.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>
                    ))}

                    <div className="pt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-emerald-400 text-neutral-950 hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? "Enviando..." : "Enviar diagnóstico"}
                        </button>

                        {submitStatus === "ok" && (
                            <p className="text-xs text-emerald-300">
                                ✓ Respuestas enviadas. Gigi ya puede generar el plan de acción.
                            </p>
                        )}
                        {submitStatus === "error" && (
                            <p className="text-xs text-red-400">
                                ✗ Revisa que todas las preguntas estén respondidas o inténtalo de nuevo.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export type { Question, Option };
