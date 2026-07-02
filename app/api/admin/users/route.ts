import { NextRequest, NextResponse } from "next/server";
import {
  adminUserStatusFilters,
  getAdminUsers,
  type AdminUserStatusFilter
} from "@/lib/admin-users";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Necesitas iniciar sesión." }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ message: "No tienes permiso de administrador." }, { status: 403 });
  }

  const searchParams = request.nextUrl.searchParams;
  const status = normalizeStatus(searchParams.get("status"));
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "10");

  const data = await getAdminUsers({
    query: searchParams.get("q") ?? "",
    status,
    page: Number.isFinite(page) ? page : 1,
    pageSize: Number.isFinite(pageSize) ? pageSize : 10
  });

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate"
    }
  });
}

function normalizeStatus(status: string | null): AdminUserStatusFilter {
  return adminUserStatusFilters.includes(status as AdminUserStatusFilter)
    ? (status as AdminUserStatusFilter)
    : "all";
}
