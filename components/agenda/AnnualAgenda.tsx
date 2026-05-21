"use client";

import { CalendarDays, CheckCircle2, Save, Target } from "lucide-react";
import { useMemo, useState } from "react";
import { dailyPhrases, habitSuggestions } from "@/data/agenda-prompts";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

const gratitudeExamples = [
  "Agradezco tener un hogar donde puedo respirar y volver a empezar.",
  "Agradezco la oportunidad de aprender algo nuevo hoy.",
  "Agradezco a mi cuerpo por sostenerme con paciencia.",
  "Agradezco una conversación, señal o gesto que me dio calma.",
  "Agradezco el dinero que sí ha llegado y lo que me ha permitido resolver.",
  "Agradezco mi capacidad de elegir un pensamiento más amoroso.",
  "Agradezco las puertas que se están abriendo aunque todavía no las vea completas.",
  "Agradezco a las personas que me acompañan con amor y respeto.",
  "Agradezco este momento para ordenar mi mente y mi corazón.",
  "Agradezco una bendición pequeña que antes habría pasado por alto."
];

const intentionExamples = [
  "Hoy elijo actuar desde la paz, no desde la prisa.",
  "Hoy quiero recibir con confianza y responder con claridad.",
  "Hoy sostengo mi enfoque en lo que sí puedo hacer.",
  "Hoy me permito avanzar sin exigirme perfección.",
  "Hoy cuido mi energía y pongo límites con amor.",
  "Hoy escucho mi intuición antes de tomar decisiones.",
  "Hoy honro mi proceso y celebro cada paso pequeño.",
  "Hoy abro espacio para soluciones simples y bendecidas.",
  "Hoy practico merecimiento en mis palabras y acciones.",
  "Hoy camino con fe, gratitud y responsabilidad."
];

const actionExamples = [
  "Revisar mis gastos por 10 minutos y elegir un ajuste amable.",
  "Enviar un mensaje pendiente con gratitud o claridad.",
  "Ordenar un espacio pequeño para abrir energía nueva.",
  "Separar 15 minutos para una tarea que he postergado.",
  "Hacer una oración breve antes de una decisión importante.",
  "Preparar una lista de tres prioridades reales para hoy.",
  "Cuidar mi cuerpo con agua, descanso o movimiento suave.",
  "Dar seguimiento a una oportunidad, cliente, trámite o idea.",
  "Compartir una palabra de ánimo con alguien.",
  "Guardar una cantidad simbólica como acto de confianza."
];

type DailyEntry = {
  gratitude: string;
  intention: string;
  action: string;
  habits: string[];
};

type AnnualAgendaProps = {
  dateKey: string;
  year: number;
  initialDailyEntry: DailyEntry;
  initialMonthlyGoals: Record<number, string>;
};

export function AnnualAgenda({
  dateKey,
  year,
  initialDailyEntry,
  initialMonthlyGoals
}: AnnualAgendaProps) {
  const todayPhrase = dailyPhrases[new Date().getDay() % dailyPhrases.length];
  const [gratitude, setGratitude] = useState(initialDailyEntry.gratitude);
  const [intention, setIntention] = useState(initialDailyEntry.intention);
  const [action, setAction] = useState(initialDailyEntry.action);
  const [habits, setHabits] = useState<string[]>(initialDailyEntry.habits);
  const [goals, setGoals] = useState<Record<number, string>>(initialMonthlyGoals);
  const [dailyStatus, setDailyStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [goalsStatus, setGoalsStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const currentDateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(new Date(`${dateKey}T12:00:00`)),
    [dateKey]
  );
  const exampleIndex = getDayOfYear(dateKey);
  const userContext = `${gratitude} ${intention} ${action}`;
  const examples = {
    gratitude: contextualizeExample(
      gratitudeExamples[exampleIndex % gratitudeExamples.length],
      userContext,
      "gratitude"
    ),
    intention: contextualizeExample(
      intentionExamples[(exampleIndex + 3) % intentionExamples.length],
      userContext,
      "intention"
    ),
    action: contextualizeExample(
      actionExamples[(exampleIndex + 6) % actionExamples.length],
      userContext,
      "action"
    )
  };

  function toggleHabit(habit: string) {
    setHabits((current) =>
      current.includes(habit)
        ? current.filter((item) => item !== habit)
        : [...current, habit]
    );
  }

  async function saveDailyEntry() {
    setDailyStatus("saving");

    const response = await fetch("/api/agenda", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: dateKey,
        gratitude,
        intention,
        action,
        habits
      })
    });

    setDailyStatus(response.ok ? "saved" : "error");
  }

  async function saveMonthlyGoals() {
    setGoalsStatus("saving");

    const response = await fetch("/api/agenda/monthly-goals", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year,
        goals: months.map((_, index) => ({
          month: index + 1,
          goal: goals[index + 1] ?? ""
        }))
      })
    });

    setGoalsStatus(response.ok ? "saved" : "error");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-3xl border border-gold/20 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <CalendarDays className="h-6 w-6 text-gold" />
          <div>
            <h2 className="font-display text-3xl font-semibold text-plum">
              Agenda diaria
            </h2>
            <p className="text-sm font-semibold text-plum/60">{currentDateLabel}</p>
          </div>
        </div>
        <p className="rounded-2xl bg-linen p-4 font-semibold leading-7 text-plum">
          {todayPhrase}
        </p>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2">
            <span className="font-semibold text-plum">Gratitud diaria</span>
            <textarea
              value={gratitude}
              onChange={(event) => setGratitude(event.target.value)}
              className="min-h-28 rounded-2xl border border-blush/70 bg-ivory p-4 outline-none focus:border-gold"
              placeholder="Escribe una gratitud concreta de hoy."
            />
            <ExampleHint text={examples.gratitude} />
          </label>
          <label className="grid gap-2">
            <span className="font-semibold text-plum">Intención del día</span>
            <input
              value={intention}
              onChange={(event) => setIntention(event.target.value)}
              className="min-h-12 rounded-full border border-blush/70 bg-ivory px-5 outline-none focus:border-gold"
              placeholder="Define cómo quieres vivir este día."
            />
            <ExampleHint text={examples.intention} />
          </label>
          <label className="grid gap-2">
            <span className="font-semibold text-plum">Acción de abundancia</span>
            <input
              value={action}
              onChange={(event) => setAction(event.target.value)}
              className="min-h-12 rounded-full border border-blush/70 bg-ivory px-5 outline-none focus:border-gold"
              placeholder="Elige una acción pequeña y posible."
            />
            <ExampleHint text={examples.action} />
          </label>
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:items-end">
          <button
            type="button"
            onClick={saveDailyEntry}
            disabled={dailyStatus === "saving"}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-plum px-5 py-2 text-sm font-semibold text-white transition hover:bg-rosewood disabled:cursor-wait disabled:opacity-75"
          >
            <Save className="h-4 w-4" />
            {dailyStatus === "saving" ? "Guardando..." : "Guardar agenda diaria"}
          </button>
          {dailyStatus === "saved" ? (
            <p className="text-sm font-semibold text-sage">Agenda diaria guardada.</p>
          ) : null}
          {dailyStatus === "error" ? (
            <p className="text-sm font-semibold text-rosewood">
              No se pudo guardar la agenda.
            </p>
          ) : null}
        </div>
      </section>

      <section className="rounded-3xl border border-gold/20 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-gold" />
          <h2 className="font-display text-3xl font-semibold text-plum">
            Seguimiento de hábitos
          </h2>
        </div>
        <div className="grid gap-3">
          {habitSuggestions.map((habit) => (
            <label key={habit} className="flex items-center gap-3 rounded-2xl bg-ivory p-4 text-plum">
              <input
                type="checkbox"
                checked={habits.includes(habit)}
                onChange={() => toggleHabit(habit)}
                className="h-4 w-4 accent-rosewood"
              />
              <span>{habit}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-gold/20 bg-white p-6 shadow-sm lg:col-span-2">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-gold" />
            <div>
              <h2 className="font-display text-3xl font-semibold text-plum">
                Metas mensuales
              </h2>
              <p className="text-sm font-semibold text-plum/60">{year}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={saveMonthlyGoals}
            disabled={goalsStatus === "saving"}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-plum px-5 py-2 text-sm font-semibold text-white transition hover:bg-rosewood disabled:cursor-wait disabled:opacity-75"
          >
            <Save className="h-4 w-4" />
            {goalsStatus === "saving" ? "Guardando..." : "Guardar metas"}
          </button>
        </div>
        {goalsStatus === "saved" ? (
          <p className="mb-4 text-sm font-semibold text-sage">Metas guardadas.</p>
        ) : null}
        {goalsStatus === "error" ? (
          <p className="mb-4 text-sm font-semibold text-rosewood">
            No se pudieron guardar las metas.
          </p>
        ) : null}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {months.map((month, index) => {
            const monthNumber = index + 1;

            return (
              <label key={month} className="grid gap-2 rounded-2xl bg-ivory p-4">
                <span className="font-semibold text-plum">{month}</span>
                <textarea
                  value={goals[monthNumber] ?? ""}
                  onChange={(event) =>
                    setGoals((current) => ({
                      ...current,
                      [monthNumber]: event.target.value
                    }))
                  }
                  className="min-h-24 rounded-2xl border border-blush/70 bg-white p-3 outline-none focus:border-gold"
                  placeholder="Meta, hábito o intención del mes"
                />
              </label>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ExampleHint({ text }: { text: string }) {
  return (
    <p className="rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-plum/68 ring-1 ring-gold/20">
      <span className="font-semibold text-rosewood">Ejemplo de hoy: </span>
      {text}
    </p>
  );
}

function getDayOfYear(dateKey: string) {
  const date = new Date(`${dateKey}T12:00:00`);
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();

  return Math.floor(diff / 86400000);
}

function contextualizeExample(
  fallback: string,
  userText: string,
  field: "gratitude" | "intention" | "action"
) {
  const text = userText.toLowerCase();

  if (text.includes("dinero") || text.includes("deuda") || text.includes("finanza")) {
    return field === "gratitude"
      ? "Agradezco cada recurso que llega a mí y la sabiduría para administrarlo con paz."
      : field === "intention"
        ? "Hoy elijo mirar mi dinero con claridad, responsabilidad y confianza."
        : "Revisar una cuenta, pago o presupuesto durante 10 minutos sin juzgarme.";
  }

  if (text.includes("familia") || text.includes("pareja") || text.includes("hijo")) {
    return field === "gratitude"
      ? "Agradezco los vínculos que me enseñan amor, paciencia y límites sanos."
      : field === "intention"
        ? "Hoy elijo comunicarme con amor, honestidad y calma."
        : "Enviar un mensaje claro o tener una conversación breve desde la paz.";
  }

  if (text.includes("salud") || text.includes("cuerpo") || text.includes("cans")) {
    return field === "gratitude"
      ? "Agradezco a mi cuerpo por sostenerme y pedirme cuidado con amor."
      : field === "intention"
        ? "Hoy escucho mi cuerpo y elijo cuidarlo sin culpa."
        : "Tomar agua, respirar profundo y hacer una pausa consciente de 10 minutos.";
  }

  if (text.includes("trabajo") || text.includes("negocio") || text.includes("cliente")) {
    return field === "gratitude"
      ? "Agradezco mis dones, mi trabajo y las oportunidades que se están formando."
      : field === "intention"
        ? "Hoy trabajo con enfoque, dignidad y apertura a nuevas oportunidades."
        : "Dar seguimiento a una oportunidad, propuesta o tarea prioritaria.";
  }

  if (text.includes("miedo") || text.includes("ansiedad") || text.includes("bloque")) {
    return field === "gratitude"
      ? "Agradezco poder reconocer lo que siento y acompañarme con compasión."
      : field === "intention"
        ? "Hoy elijo avanzar con suavidad aunque todavía sienta miedo."
        : "Escribir el miedo, respirar y dar un paso pequeño de 5 minutos.";
  }

  return fallback;
}
