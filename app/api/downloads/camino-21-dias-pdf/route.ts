import { existsSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { isMayPromoActive } from "@/lib/may-promo";

const pdfPublicPath = "/descargas/camino-de-abundancia-21-dias.pdf";

export async function GET(request: NextRequest) {
  if (!isMayPromoActive()) {
    return NextResponse.json(
      { message: "La descarga gratuita de mayo ya terminó." },
      { status: 403 }
    );
  }

  const pdfPath = path.join(
    process.cwd(),
    "public",
    "descargas",
    "camino-de-abundancia-21-dias.pdf"
  );

  if (!existsSync(pdfPath)) {
    return NextResponse.json(
      {
        message:
          "El PDF aún no está cargado. Agrega el archivo en public/descargas/camino-de-abundancia-21-dias.pdf."
      },
      { status: 404 }
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin;

  return NextResponse.redirect(new URL(pdfPublicPath, appUrl));
}
