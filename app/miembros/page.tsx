import type { Metadata } from "next";
import { ChatAssistant } from "@/components/chat/ChatAssistant";
import { JournalDayCard } from "@/components/journal/JournalDayCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { journalDays } from "@/data/journal-days";

export const metadata: Metadata = {
  title: "Área de Miembros"
};

export default function MembersPage() {
  return (
    <div className="bg-ivory">
      <section className="soft-band px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Área de miembros"
            title="Tu recorrido de 21 días"
            description="Esta versión funcional usa datos locales. La estructura ya está lista para guardar progreso, respuestas y compras en una base de datos."
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
