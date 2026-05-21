import type { Metadata } from "next";
import { AnnualAgenda } from "@/components/agenda/AnnualAgenda";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Agenda Anual"
};

export default async function AgendaPage() {
  const user = await requireUser("/agenda");
  const dateKey = new Date().toISOString().slice(0, 10);
  const start = new Date(`${dateKey}T00:00:00.000Z`);
  const end = new Date(`${dateKey}T23:59:59.999Z`);
  const year = new Date().getFullYear();
  const [dailyEntry, monthlyGoals] = await Promise.all([
    prisma.agendaEntry.findFirst({
      where: {
        userId: user.id,
        date: {
          gte: start,
          lte: end
        }
      }
    }),
    prisma.monthlyGoal.findMany({
      where: {
        userId: user.id,
        year
      }
    })
  ]);

  return (
    <div className="bg-ivory">
      <section className="lavender-band px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Agenda anual"
            title="Planifica tus días desde gratitud, propósito y constancia"
            description="Guarda tu gratitud diaria, hábitos, acción de abundancia y metas mensuales en tu cuenta."
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <AnnualAgenda
          dateKey={dateKey}
          year={year}
          initialDailyEntry={{
            gratitude: dailyEntry?.gratitude ?? "",
            intention: dailyEntry?.intention ?? "",
            action: dailyEntry?.action ?? "",
            habits: parseList(dailyEntry?.habits ?? null)
          }}
          initialMonthlyGoals={Object.fromEntries(
            monthlyGoals.map((goal) => [goal.month, goal.goal ?? ""])
          )}
        />
      </section>
    </div>
  );
}

function parseList(value: string | null) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}
