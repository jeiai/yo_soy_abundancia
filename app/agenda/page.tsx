import type { Metadata } from "next";
import { AnnualAgenda } from "@/components/agenda/AnnualAgenda";
import { LockedProductAccess } from "@/components/product/LockedProductAccess";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PRODUCT_ACCESS, hasProductAccess } from "@/lib/product-access";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Agenda Anual"
};

export default async function AgendaPage() {
  const user = await requireUser("/agenda");
  const canAccessAgenda = await hasProductAccess(user, PRODUCT_ACCESS.agenda);

  if (!canAccessAgenda) {
    return (
      <LockedProductAccess
        eyebrow="Agenda digital"
        title="La agenda anual requiere compra activa"
        description="Este producto digital queda protegido hasta que exista una compra aprobada. Administradores y usuarios registrados antes del corte especial conservan acceso."
        productId="agenda-anual"
      />
    );
  }

  const todayKey = new Date().toISOString().slice(0, 10);
  const year = new Date().getFullYear();
  const [dailyEntries, monthlyGoals] = await Promise.all([
    prisma.agendaEntry.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" }
    }),
    prisma.monthlyGoal.findMany({
      where: {
        userId: user.id,
        year
      }
    })
  ]);
  const entriesByDate = Object.fromEntries(
    dailyEntries.map((entry) => [
      entry.date.toISOString().slice(0, 10),
      {
        gratitude: entry.gratitude ?? "",
        intention: entry.intention ?? "",
        action: entry.action ?? "",
        habits: parseList(entry.habits)
      }
    ])
  );

  return (
    <div className="bg-ivory">
      <section className="lavender-band px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Agenda anual"
            title="Planifica tus días desde gratitud, propósito y constancia"
            description="Consulta cualquier día guardado desde que empezaste tu agenda, y sigue registrando gratitud, hábitos, acción de abundancia y metas mensuales."
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <AnnualAgenda
          todayKey={todayKey}
          year={year}
          dailyEntriesByDate={entriesByDate}
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
