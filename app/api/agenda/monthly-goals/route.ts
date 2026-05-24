import { NextRequest, NextResponse } from "next/server";
import { PRODUCT_ACCESS, hasProductAccess } from "@/lib/product-access";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function PUT(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Necesitas iniciar sesión para guardar metas." },
      { status: 401 }
    );
  }

  const canAccessAgenda = await hasProductAccess(user, PRODUCT_ACCESS.agenda);

  if (!canAccessAgenda) {
    return NextResponse.json(
      { message: "La agenda requiere una compra aprobada." },
      { status: 403 }
    );
  }

  const body = (await request.json()) as {
    year?: number;
    goals?: Array<{ month: number; goal: string }>;
  };

  const year = Number(body.year ?? new Date().getFullYear());

  if (!Number.isInteger(year) || year < 2020 || year > 2100) {
    return NextResponse.json({ message: "Año inválido." }, { status: 400 });
  }

  const goals = (body.goals ?? []).filter(
    (item) => Number.isInteger(item.month) && item.month >= 1 && item.month <= 12
  );

  const savedGoals = await Promise.all(
    goals.map(async (item) => {
      const existingGoal = await prisma.monthlyGoal.findFirst({
        where: {
          userId: user.id,
          year,
          month: item.month
        }
      });
      const data = {
        year,
        month: item.month,
        goal: item.goal.trim() || null
      };

      return existingGoal
        ? prisma.monthlyGoal.update({
            where: { id: existingGoal.id },
            data
          })
        : prisma.monthlyGoal.create({
            data: {
              userId: user.id,
              ...data
            }
          });
    })
  );

  return NextResponse.json({
    goals: savedGoals.map((goal) => ({
      month: goal.month,
      goal: goal.goal ?? ""
    }))
  });
}
