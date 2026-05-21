import type { Metadata } from "next";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { ChatAssistant } from "@/components/chat/ChatAssistant";
import { JournalDayCard } from "@/components/journal/JournalDayCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { journalDays } from "@/data/journal-days";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Area de Miembros"
};

export default async function MembersPage() {
  const user = await requireUser("/miembros");

  return (
    <div className="bg-ivory">
      <section className="soft-band px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-plum ring-1 ring-gold/25">
              Bienvenida, {user.name ?? user.email}
            </p>
            <LogoutButton />
          </div>
          <SectionHeader
            eyebrow="Area de miembros"
            title="Tu recorrido de 21 dias"
            description="Acceso privado al journal, chat de acompanamiento y herramientas para sostener tu camino de abundancia."
          />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="grid gap-6">
          {journalDays.map((day) => (
            <JournalDayCard key={day.day} day={day} />
          ))}
        </div>
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <ChatAssistant />
        </aside>
      </section>
    </div>
  );
}
