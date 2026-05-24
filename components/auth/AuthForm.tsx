"use client";

import { FormEvent, useState } from "react";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
  nextPath?: string;
};

export function AuthForm({ mode, nextPath = "/miembros" }: AuthFormProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? "")
    };

    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = (await response.json()) as { message?: string };
      setError(data.message ?? "No pudimos completar la solicitud.");
      setLoading(false);
      return;
    }

    window.location.href = nextPath;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
      {mode === "register" ? (
        <label className="grid gap-2">
          <span className="font-semibold text-plum">Nombre</span>
          <input
            name="name"
            required
            className="min-h-12 rounded-full border border-blush/70 bg-ivory px-5 outline-none focus:border-gold"
            placeholder="Tu nombre"
          />
        </label>
      ) : null}
      <label className="grid gap-2">
        <span className="font-semibold text-plum">Correo electrónico</span>
        <input
          name="email"
          type="email"
          required
          className="min-h-12 rounded-full border border-blush/70 bg-ivory px-5 outline-none focus:border-gold"
          placeholder="tu@email.com"
        />
      </label>
      <label className="grid gap-2">
        <span className="font-semibold text-plum">Contraseña</span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className="min-h-12 rounded-full border border-blush/70 bg-ivory px-5 outline-none focus:border-gold"
          placeholder="Mínimo 8 caracteres"
        />
      </label>
      {error ? (
        <p className="rounded-2xl bg-blush/35 p-3 text-sm font-semibold text-rosewood">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-rosewood disabled:cursor-wait disabled:opacity-75"
      >
        {loading
          ? "Procesando..."
          : mode === "login"
            ? "Entrar a mi cuenta"
            : "Crear mi cuenta"}
      </button>
    </form>
  );
}
