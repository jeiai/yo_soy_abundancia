import type { Metadata } from "next";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { ChatAssistant } from "@/components/chat/ChatAssistant";
import { JournalDayCard } from "@/components/journal/JournalDayCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { journalDays } from "@/data/journal-days";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Area de Miembros"
};

export default async function MembersPage() {
  const user = await requireUser("/miembros");
  const entries = await prisma.journalEntry.findMany({
    where: { userId: user.id }
  });
  const progressByDay = new Map(
    entries.map((entry) => [
      entry.day,
      {
        day: entry.day,
        gratitude: entry.gratitude ?? "",
        reflection: entry.reflection ?? "",
        actions: parseActions(entry.actions),
        completed: entry.completed
      }
    ])
  );
  const completedDays = entries.filter((entry) => entry.completed).length;

  return (
    <div className="bg-ivory">
      <section className="soft-band px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-plum ring-1 ring-gold/25">
              Bienvenido(a), {user.name ?? user.email}
            </p>
            <LogoutButton />
          </div>
          <SectionHeader
            eyebrow="Area de miembros"
            title="Tu recorrido de 21 dias"
            description={`Acceso privado al journal, chat de acompanamiento y herramientas para sostener tu camino de abundancia. Llevas ${completedDays} de 21 dias completados.`}
          />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="grid gap-6">
          {journalDays.map((day) => (
            <JournalDayCard
              key={day.day}
              day={day}
              initialProgress={progressByDay.get(day.day)}
            />
          ))}
        </div>
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <ChatAssistant />
        </aside>
      </section>
    </div>
  );
}

function parseActions(actions: string | null) {
  if (!actions) {
    return [];
  }

  try {
    const parsed = JSON.parse(actions);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}
