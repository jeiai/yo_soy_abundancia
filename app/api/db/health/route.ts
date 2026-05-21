import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      ok: true,
      provider: "postgresql",
      message: "Base de datos conectada"
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        provider: "postgresql",
        message: "No se pudo conectar a la base de datos",
        error: error instanceof Error ? error.message : "Error desconocido"
      },
      { status: 500 }
    );
  }
}
