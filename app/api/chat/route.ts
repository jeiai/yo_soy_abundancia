import { NextRequest, NextResponse } from "next/server";
import { chatSystemPrompt } from "@/lib/chat-system-prompt";
import { PRODUCT_ACCESS, hasProductAccess } from "@/lib/product-access";
import { rateLimit } from "@/lib/rate-limit";
import { getCurrentUser } from "@/lib/session";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, {
    namespace: "chat",
    limit: 30,
    windowMs: 60 * 60 * 1000
  });

  if (limited) {
    return limited;
  }

  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Necesitas iniciar sesión para usar el acompañamiento." },
      { status: 401 }
    );
  }

  const canAccessJournal = await hasProductAccess(user, PRODUCT_ACCESS.journal);

  if (!canAccessJournal) {
    return NextResponse.json(
      { message: "El acompañamiento requiere una compra aprobada." },
      { status: 403 }
    );
  }

  const body = (await request.json()) as { messages?: ChatMessage[] };
  const lastUserMessage =
    body.messages?.filter((message) => message.role === "user").at(-1)?.content ?? "";

  // Punto de integración para OpenAI u otro proveedor de IA.
  // El prompt base está en chatSystemPrompt para mantener el tono consistente.
  const reply = buildDemoReply(lastUserMessage);

  return NextResponse.json({ reply, systemPrompt: chatSystemPrompt.trim() });
}

function buildDemoReply(message: string) {
  const topic = message.length > 0 ? message : "lo que estás sintiendo";

  return `Gracias por compartirlo. Respira profundo y reconoce esto con amor: ${topic}. Pregúntate: ¿qué necesito soltar, qué puedo agradecer hoy y cuál es el paso más pequeño que sí puedo dar? Te propongo escribir tres gratitudes, hacer una oración sencilla y elegir una acción de 10 minutos. No tienes que resolver toda tu vida hoy; solo volver a tu centro y avanzar con fe.`;
}
