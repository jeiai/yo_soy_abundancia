import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { AUTH_COOKIE, createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  if (!email || !password) {
    return NextResponse.json(
      { message: "Escribe tu correo y contraseña." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user?.passwordHash || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json(
      { message: "Correo o contraseña incorrectos." },
      { status: 401 }
    );
  }

  const session = await createSession(user.id);
  const response = NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });

  response.cookies.set(AUTH_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: session.expiresAt
  });

  return response;
}
