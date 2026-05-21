"use client";

import { CheckCircle2, HeartHandshake, ListChecks, PenLine, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import type { JournalDay } from "@/data/journal-days";

export type JournalProgress = {
  day: number;
  gratitude: string;
  reflection: string;
  actions: string[];
  completed: boolean;
};

type JournalDayCardProps = {
  day: JournalDay;
  initialProgress?: JournalProgress;
};

export function JournalDayCard({ day, initialProgress }: JournalDayCardProps) {
  const [gratitude, setGratitude] = useState(initialProgress?.gratitude ?? "");
  const [reflection, setReflection] = useState(initialProgress?.reflection ?? "");
  const [selectedActions, setSelectedActions] = useState<string[]>(
    initialProgress?.actions ?? []
  );
  const [completed, setCompleted] = useState(initialProgress?.completed ?? false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function toggleAction(action: string) {
    setSelectedActions((current) =>
      current.includes(action)
        ? current.filter((item) => item !== action)
        : [...current, action]
    );
  }

  async function saveProgress() {
    setStatus("saving");

    const response = await fetch(`/api/journal/${day.day}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gratitude,
        reflection,
        actions: selectedActions,
        completed
      })
    });

    setStatus(response.ok ? "saved" : "error");
  }

  return (
    <article className="rounded-3xl border border-gold/20 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Día {day.day}
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-plum">
            {day.title}
          </h2>
        </div>
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linen text-rosewood">
          <Sparkles className="h-5 w-5" />
        </span>
      </div>

      <p className="rounded-2xl bg-ivory p-4 font-semibold leading-7 text-plum">
        {day.opening}
      </p>

      <div className="mt-5 grid gap-4">
        <section>
          <div className="mb-2 flex items-center gap-2 font-bold text-plum">
            <HeartHandshake className="h-5 w-5 text-gold" />
            Oración
          </div>
          <p className="leading-7 text-plum/75">{day.prayer}</p>
        </section>
        <section>
          <div className="mb-2 flex items-center gap-2 font-bold text-plum">
            <CheckCircle2 className="h-5 w-5 text-gold" />
            Gratitud
          </div>
          <p className="mb-3 leading-7 text-plum/75">{day.gratitude}</p>
          <textarea
            value={gratitude}
            onChange={(event) => setGratitude(event.target.value)}
            className="min-h-24 w-full resize-y rounded-2xl border border-blush/60 bg-ivory p-4 text-plum outline-none transition placeholder:text-plum/40 focus:border-gold"
            placeholder="Escribe aquí tus gratitudes de hoy."
          />
        </section>
        <section>
          <div className="mb-2 flex items-center gap-2 font-bold text-plum">
            <PenLine className="h-5 w-5 text-gold" />
            Reflexión escrita
          </div>
          <textarea
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
            className="min-h-28 w-full resize-y rounded-2xl border border-blush/60 bg-ivory p-4 text-plum outline-none transition placeholder:text-plum/40 focus:border-gold"
            placeholder={day.reflection}
          />
        </section>
        <section>
          <div className="mb-2 flex items-center gap-2 font-bold text-plum">
            <ListChecks className="h-5 w-5 text-gold" />
            Acciones prácticas
          </div>
          <div className="grid gap-2">
            {day.actions.map((action) => (
              <label key={action} className="flex items-center gap-3 rounded-2xl bg-linen p-3 text-plum/78">
                <input
                  type="checkbox"
                  checked={selectedActions.includes(action)}
                  onChange={() => toggleAction(action)}
                  className="h-4 w-4 accent-rosewood"
                />
                <span>{action}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <p className="mt-5 rounded-2xl bg-plum p-4 font-semibold text-white">
        {day.affirmation}
      </p>

      <div className="mt-5 flex flex-col gap-3 border-t border-gold/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3 font-semibold text-plum">
          <input
            type="checkbox"
            checked={completed}
            onChange={(event) => setCompleted(event.target.checked)}
            className="h-4 w-4 accent-rosewood"
          />
          Marcar día como completado
        </label>
        <div className="flex flex-col gap-2 sm:items-end">
          <button
            type="button"
            onClick={saveProgress}
            disabled={status === "saving"}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-plum px-5 py-2 text-sm font-semibold text-white transition hover:bg-rosewood disabled:cursor-wait disabled:opacity-75"
          >
            <Save className="h-4 w-4" />
            {status === "saving" ? "Guardando..." : "Guardar progreso"}
          </button>
          {status === "saved" ? (
            <p className="text-sm font-semibold text-sage">Progreso guardado.</p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm font-semibold text-rosewood">
              No se pudo guardar. Inicia sesión de nuevo.
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
