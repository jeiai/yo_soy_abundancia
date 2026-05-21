import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AUTH_COOKIE } from "@/lib/session";

export async function POST(request: Request) {
  const token = request.headers
    .get("cookie")
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${AUTH_COOKIE}=`))
    ?.split("=")[1];

  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });

  return response;
}
