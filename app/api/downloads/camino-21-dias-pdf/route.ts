import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { isMayPromoActive } from "@/lib/may-promo";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const limited = rateLimit(request, {
    namespace: "download:camino-21-dias-pdf",
    limit: 12,
    windowMs: 60 * 60 * 1000
  });

  if (limited) {
    return limited;
  }

  if (!isMayPromoActive()) {
    return NextResponse.json(
      { message: "La descarga gratuita de mayo ya terminó." },
      { status: 403 }
    );
  }

  const pdfPath = path.join(
    process.cwd(),
    "storage",
    "downloads",
    "camino-de-abundancia-21-dias.pdf"
  );

  if (!existsSync(pdfPath)) {
    return NextResponse.json(
      {
        message:
          "El PDF aún no está cargado. Agrega el archivo en storage/downloads/camino-de-abundancia-21-dias.pdf."
      },
      { status: 404 }
    );
  }

  const file = await readFile(pdfPath);

  return new NextResponse(file, {
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      "Content-Disposition": 'attachment; filename="camino-de-abundancia-21-dias.pdf"',
      "Content-Type": "application/pdf",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
