import type { Metadata } from "next";
import { AnnualAgenda } from "@/components/agenda/AnnualAgenda";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Agenda Anual"
};

export default function AgendaPage() {
  return (
    <div className="bg-ivory">
      <section className="lavender-band px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Agenda anual"
            title="Planifica tus días desde gratitud, propósito y constancia"
            description="Una vista funcional para metas mensuales, seguimiento de hábitos, frase positiva diaria y gratitud cotidiana."
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <AnnualAgenda />
      </section>
    </div>
  );
}
