import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("product") ?? "journal-21-dias";
  const publicAppUrl = process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin;
  const message =
    "Los pagos están pausados durante mayo. Puedes acceder gratis hasta el 31 de mayo de 2026 a las 11:59pm hora centro de México.";

  return NextResponse.redirect(
    `${publicAppUrl}/producto?checkout=error&product=${productId}&message=${encodeURIComponent(message)}`
  );
}
