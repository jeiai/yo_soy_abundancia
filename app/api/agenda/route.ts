import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function PUT(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Necesitas iniciar sesión para guardar la agenda." },
      { status: 401 }
    );
  }

  const body = (await request.json()) as {
    date?: string;
    gratitude?: string;
    intention?: string;
    action?: string;
    habits?: string[];
  };

  const dateKey = body.date ?? todayKey();
  const start = new Date(`${dateKey}T00:00:00.000Z`);
  const end = new Date(`${dateKey}T23:59:59.999Z`);
  const existingEntry = await prisma.agendaEntry.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: start,
        lte: end
      }
    }
  });
  const data = {
    date: start,
    gratitude: body.gratitude?.trim() || null,
    intention: body.intention?.trim() || null,
    action: body.action?.trim() || null,
    habits: JSON.stringify(body.habits ?? [])
  };
  const entry = existingEntry
    ? await prisma.agendaEntry.update({
        where: { id: existingEntry.id },
        data
      })
    : await prisma.agendaEntry.create({
        data: {
          userId: user.id,
          ...data
        }
      });

  return NextResponse.json({
    entry: {
      date: dateKey,
      gratitude: entry.gratitude,
      intention: entry.intention,
      action: entry.action,
      habits: safeParseList(entry.habits)
    }
  });
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function safeParseList(value: string | null) {
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
