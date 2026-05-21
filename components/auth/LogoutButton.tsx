"use client";

import { LogOut } from "lucide-react";

export function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-plum ring-1 ring-gold/30 transition hover:bg-linen"
    >
      <LogOut className="h-4 w-4" />
      Cerrar sesión
    </button>
  );
}
