import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const AUTH_COOKIE = "ysa_session";
const SESSION_DAYS = 30;

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt
    }
  });

  return { token, expiresAt };
}

export async function getCurrentUser() {
  const token = cookies().get(AUTH_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session.user;
}

export async function requireUser(nextPath = "/miembros") {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser("/admin");

  if (user.role !== "admin") {
    redirect("/miembros");
  }

  return user;
}
