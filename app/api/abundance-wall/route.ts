import { NextRequest, NextResponse } from "next/server";
import { isMayPromoActive } from "@/lib/may-promo";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { getCurrentUser } from "@/lib/session";

const MAX_INTENTION_LENGTH = 280;
const MAX_NAME_LENGTH = 70;

export async function GET() {
  const signatures = await prisma.abundanceWallSignature.findMany({
    orderBy: { createdAt: "desc" },
    take: 24
  });

  return NextResponse.json({
    promoActive: isMayPromoActive(),
    signatures: signatures.map((signature) => ({
      id: signature.id,
      displayName: signature.isAnonymous
        ? "Alma abundante"
        : signature.displayName || "Alma abundante",
      intention: signature.intention,
      isAnonymous: signature.isAnonymous,
      createdAt: signature.createdAt
    }))
  });
}

export async function POST(request: NextRequest) {
  if (!isMayPromoActive()) {
    return NextResponse.json(
      { message: "La promoción gratuita de mayo ya terminó." },
      { status: 403 }
    );
  }

  const user = await getCurrentUser();
  const body = (await request.json()) as {
    displayName?: string;
    website?: string;
    intention?: string;
    isAnonymous?: boolean;
  };
  const limited = rateLimit(request, {
    namespace: "abundance-wall:sign",
    limit: 8,
    windowMs: 60 * 60 * 1000
  });

  if (limited) {
    return limited;
  }

  if (body.website) {
    return NextResponse.json({ message: "Firma recibida." });
  }

  const isAnonymous = body.isAnonymous !== false;
  const displayName = body.displayName?.trim().slice(0, MAX_NAME_LENGTH) || null;
  const intention = body.intention?.trim().slice(0, MAX_INTENTION_LENGTH) ?? "";

  if (intention.length < 8) {
    return NextResponse.json(
      { message: "Escribe una petición o intención de abundancia un poco más clara." },
      { status: 400 }
    );
  }

  const recentDuplicate = await prisma.abundanceWallSignature.findFirst({
    where: {
      intention,
      createdAt: {
        gte: new Date(Date.now() - 10 * 60 * 1000)
      }
    }
  });

  if (recentDuplicate) {
    return NextResponse.json(
      { message: "Esta petición ya fue enviada recientemente." },
      { status: 409 }
    );
  }

  if (!isAnonymous && !displayName) {
    return NextResponse.json(
      { message: "Agrega tu nombre o firma de forma anónima." },
      { status: 400 }
    );
  }

  const signature = await prisma.abundanceWallSignature.create({
    data: {
      userId: user?.id,
      displayName,
      intention,
      isAnonymous
    }
  });

  return NextResponse.json({
    signature: {
      id: signature.id,
      displayName: signature.isAnonymous
        ? "Alma abundante"
        : signature.displayName || "Alma abundante",
      intention: signature.intention,
      isAnonymous: signature.isAnonymous,
      createdAt: signature.createdAt
    }
  });
}
