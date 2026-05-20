import { NextRequest, NextResponse } from "next/server";
import { createCheckoutUrl } from "@/lib/payments";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("product") ?? "journal-21-dias";
  const provider = request.nextUrl.searchParams.get("provider") ?? "demo";
  const checkoutUrl = await createCheckoutUrl(
    productId,
    provider === "stripe" || provider === "mercado-pago" ? provider : "demo"
  );

  return NextResponse.redirect(new URL(checkoutUrl, request.url));
}
