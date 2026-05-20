"use client";

import { CalendarDays, CheckCircle2, Target } from "lucide-react";
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

export function AnnualAgenda() {
  const todayPhrase = dailyPhrases[new Date().getDay() % dailyPhrases.length];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-3xl border border-gold/20 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <CalendarDays className="h-6 w-6 text-gold" />
          <h2 className="font-display text-3xl font-semibold text-plum">
            Agenda diaria
          </h2>
        </div>
        <p className="rounded-2xl bg-linen p-4 font-semibold leading-7 text-plum">
          {todayPhrase}
        </p>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2">
            <span className="font-semibold text-plum">Gratitud diaria</span>
            <textarea className="min-h-28 rounded-2xl border border-blush/70 bg-ivory p-4 outline-none focus:border-gold" />
          </label>
          <label className="grid gap-2">
            <span className="font-semibold text-plum">Intención del día</span>
            <input className="min-h-12 rounded-full border border-blush/70 bg-ivory px-5 outline-none focus:border-gold" />
          </label>
          <label className="grid gap-2">
            <span className="font-semibold text-plum">Acción de abundancia</span>
            <input className="min-h-12 rounded-full border border-blush/70 bg-ivory px-5 outline-none focus:border-gold" />
          </label>
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
              <input type="checkbox" className="h-4 w-4 accent-rosewood" />
              <span>{habit}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-gold/20 bg-white p-6 shadow-sm lg:col-span-2">
        <div className="mb-5 flex items-center gap-3">
          <Target className="h-6 w-6 text-gold" />
          <h2 className="font-display text-3xl font-semibold text-plum">
            Metas mensuales
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {months.map((month) => (
            <label key={month} className="grid gap-2 rounded-2xl bg-ivory p-4">
              <span className="font-semibold text-plum">{month}</span>
              <textarea
                className="min-h-24 rounded-2xl border border-blush/70 bg-white p-3 outline-none focus:border-gold"
                placeholder="Meta, hábito o intención del mes"
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
