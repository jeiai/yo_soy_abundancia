import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { AUTH_COOKIE, createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
    adminCode?: string;
  };

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  if (!name || !email || password.length < 8) {
    return NextResponse.json(
      { message: "Escribe nombre, correo y una contraseña de al menos 8 caracteres." },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { message: "Ese correo ya está registrado. Inicia sesión." },
      { status: 409 }
    );
  }

  const userCount = await prisma.user.count();
  const adminCode = process.env.ADMIN_INVITE_CODE;
  const role =
    userCount === 0 || (adminCode && body.adminCode === adminCode) ? "admin" : "member";

  const user = await prisma.user.create({
    data: {
      name,
      email,
      role,
      passwordHash: hashPassword(password)
    }
  });

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
