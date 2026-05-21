import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

type RouteContext = {
  params: {
    day: string;
  };
};

export async function PUT(request: NextRequest, context: RouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Necesitas iniciar sesion para guardar tu progreso." },
      { status: 401 }
    );
  }

  const day = Number(context.params.day);

  if (!Number.isInteger(day) || day < 1 || day > 21) {
    return NextResponse.json(
      { message: "Dia de journal invalido." },
      { status: 400 }
    );
  }

  const body = (await request.json()) as {
    gratitude?: string;
    reflection?: string;
    actions?: string[];
    completed?: boolean;
  };

  const entry = await prisma.journalEntry.upsert({
    where: {
      userId_day: {
        userId: user.id,
        day
      }
    },
    create: {
      userId: user.id,
      day,
      gratitude: body.gratitude?.trim() || null,
      reflection: body.reflection?.trim() || null,
      actions: JSON.stringify(body.actions ?? []),
      completed: Boolean(body.completed)
    },
    update: {
      gratitude: body.gratitude?.trim() || null,
      reflection: body.reflection?.trim() || null,
      actions: JSON.stringify(body.actions ?? []),
      completed: Boolean(body.completed)
    }
  });

  return NextResponse.json({
    entry: {
      day: entry.day,
      gratitude: entry.gratitude,
      reflection: entry.reflection,
      actions: safeParseActions(entry.actions),
      completed: entry.completed,
      updatedAt: entry.updatedAt
    }
  });
}

function safeParseActions(actions: string | null) {
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
