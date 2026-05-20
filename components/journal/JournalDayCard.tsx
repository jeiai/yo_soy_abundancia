import { CheckCircle2, HeartHandshake, ListChecks, PenLine, Sparkles } from "lucide-react";
import type { JournalDay } from "@/data/journal-days";

type JournalDayCardProps = {
  day: JournalDay;
};

export function JournalDayCard({ day }: JournalDayCardProps) {
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
          <p className="leading-7 text-plum/75">{day.gratitude}</p>
        </section>
        <section>
          <div className="mb-2 flex items-center gap-2 font-bold text-plum">
            <PenLine className="h-5 w-5 text-gold" />
            Reflexión escrita
          </div>
          <textarea
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
                <input type="checkbox" className="h-4 w-4 accent-rosewood" />
                <span>{action}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <p className="mt-5 rounded-2xl bg-plum p-4 font-semibold text-white">
        {day.affirmation}
      </p>
    </article>
  );
}
