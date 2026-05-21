import { NextRequest, NextResponse } from "next/server";
import { createCheckoutUrl } from "@/lib/payments";
import { getCurrentUser } from "@/lib/session";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("product") ?? "journal-21-dias";
  const provider = request.nextUrl.searchParams.get("provider") ?? "demo";
  const publicAppUrl = process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin;
  const user = await getCurrentUser();
  const normalizedProvider =
    provider === "stripe" || provider === "mercado-pago" ? provider : "demo";

  try {
    const checkoutUrl = await createCheckoutUrl({
      productId,
      provider: normalizedProvider,
      appUrl: publicAppUrl,
      userEmail: user?.email,
      userId: user?.id
    });

    return NextResponse.redirect(checkoutUrl);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo iniciar el pago.";

    return NextResponse.redirect(
      `${publicAppUrl}/producto?checkout=error&provider=${normalizedProvider}&message=${encodeURIComponent(message)}`
    );
  }
}
