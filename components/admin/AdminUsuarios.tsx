"use client";

import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import type {
  AdminUserRow,
  AdminUsersResponse,
  AdminUserStatusFilter
} from "@/lib/admin-users";

const statusOptions: Array<{ value: AdminUserStatusFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "registered", label: "Solo registrados" },
  { value: "purchased", label: "Compraron cuaderno digital" },
  { value: "activity", label: "Completaron actividad" },
  { value: "ready", label: "Listos para versión impresa" }
];

const pageSize = 10;

export function AdminUsuarios() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [status, setStatus] = useState<AdminUserStatusFilter>("all");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<AdminUsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      q: debouncedQuery,
      status,
      page: String(page),
      pageSize: String(pageSize)
    });

    setLoading(true);
    setError("");

    fetch(`/api/admin/users?${params.toString()}`, {
      cache: "no-store",
      signal: controller.signal
    })
      .then(async (response) => {
        const body = (await response.json()) as AdminUsersResponse | { message?: string };

        if (!response.ok) {
          throw new Error("message" in body ? body.message : "No se pudo cargar la tabla.");
        }

        return body as AdminUsersResponse;
      })
      .then(setData)
      .catch((nextError: Error) => {
        if (nextError.name !== "AbortError") {
          setError(nextError.message || "No se pudo cargar la tabla.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [debouncedQuery, status, page]);

  const counters = data?.counters;
  const users = data?.users ?? [];
  const pagination = data?.pagination;

  const summaryCards = useMemo(
    () => [
      { label: "Total de usuarios", value: counters?.totalUsers ?? 0 },
      {
        label: "Compraron cuaderno digital",
        value: counters?.purchasedDigitalJournal ?? 0
      },
      {
        label: "Completaron actividad",
        value: counters?.completedPrintActivity ?? 0
      },
      {
        label: "Listos para versión impresa",
        value: counters?.readyForPrintedVersion ?? 0
      }
    ],
    [counters]
  );

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article key={card.label} className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-3xl font-bold text-plum">{card.value}</p>
            <p className="mt-1 text-sm font-semibold text-plum/65">{card.label}</p>
          </article>
        ))}
      </div>

      <section className="rounded-3xl bg-white p-5 shadow-sm lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
              AdminUsuarios
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-plum">
              Usuarios y progreso comercial
            </h2>
            <p className="mt-2 max-w-3xl leading-7 text-plum/70">
              Consulta compras del cuaderno digital, actividad del muro de abundancia y
              preparación para la versión impresa.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:min-w-[34rem]">
            <label className="relative flex-1">
              <span className="sr-only">Buscar por nombre o email</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/45" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar nombre o email"
                className="min-h-12 w-full rounded-full border border-gold/25 bg-ivory py-2 pl-11 pr-4 text-sm font-medium text-plum outline-none transition focus:border-gold focus:bg-white"
              />
            </label>
            <label>
              <span className="sr-only">Filtrar por estado</span>
              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value as AdminUserStatusFilter);
                  setPage(1);
                }}
                className="min-h-12 w-full rounded-full border border-gold/25 bg-ivory px-4 text-sm font-semibold text-plum outline-none transition focus:border-gold focus:bg-white sm:w-72"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-gold/15">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1060px] border-collapse text-left">
              <thead className="bg-linen text-sm text-plum/70">
                <tr>
                  <th className="px-4 py-3">Usuario</th>
                  <th className="px-4 py-3">Registro</th>
                  <th className="px-4 py-3">Cuaderno digital</th>
                  <th className="px-4 py-3">Fecha compra</th>
                  <th className="px-4 py-3">Actividad impresa</th>
                  <th className="px-4 py-3">Fecha actividad</th>
                  <th className="px-4 py-3">Estado general</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <LoadingRows />
                ) : error ? (
                  <TableMessage
                    icon={<AlertCircle className="h-5 w-5" />}
                    title="No se pudo cargar la información"
                    message={error}
                  />
                ) : users.length === 0 ? (
                  <TableMessage
                    icon={<Search className="h-5 w-5" />}
                    title="Sin usuarios para mostrar"
                    message="Ajusta la búsqueda o cambia el filtro para ver otros resultados."
                  />
                ) : (
                  users.map((user) => <UserRow key={user.id} user={user} />)
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-plum/65">
            {pagination
              ? `${pagination.totalMatching} resultado(s), página ${pagination.page} de ${pagination.totalPages}`
              : "Cargando resultados..."}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              disabled={loading || !pagination || pagination.page <= 1}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-linen px-4 text-sm font-semibold text-plum transition hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>
            <button
              type="button"
              onClick={() =>
                setPage((current) =>
                  pagination ? Math.min(current + 1, pagination.totalPages) : current
                )
              }
              disabled={loading || !pagination || pagination.page >= pagination.totalPages}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-linen px-4 text-sm font-semibold text-plum transition hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-ivory p-4 text-sm leading-6 text-plum/65">
          <p>
            Supuestos actuales: compra válida del producto{" "}
            <strong>{data?.assumptions.digitalJournalProductId ?? "journal-21-dias"}</strong>{" "}
            y actividad completada cuando existe firma persistida en{" "}
            <strong>{data?.assumptions.printActivityModel ?? "AbundanceWallSignature"}</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}

function UserRow({ user }: { user: AdminUserRow }) {
  return (
    <tr className="border-t border-gold/10 align-top">
      <td className="px-4 py-4">
        <p className="font-semibold text-plum">{user.name || "Sin nombre"}</p>
        <p className="mt-1 text-sm text-plum/62">{user.email}</p>
      </td>
      <td className="px-4 py-4 text-sm text-plum/72">{formatDate(user.registeredAt)}</td>
      <td className="px-4 py-4">
        <BooleanBadge value={user.purchasedDigitalJournal} />
      </td>
      <td className="px-4 py-4 text-sm text-plum/72">
        {formatOptionalDate(user.digitalJournalPurchasedAt)}
      </td>
      <td className="px-4 py-4">
        <BooleanBadge value={user.completedPrintActivity} />
      </td>
      <td className="px-4 py-4 text-sm text-plum/72">
        {formatOptionalDate(user.printActivityCompletedAt)}
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={user.status} />
      </td>
    </tr>
  );
}

function BooleanBadge({ value }: { value: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
        value ? "bg-emerald-50 text-emerald-700" : "bg-linen text-plum/62"
      }`}
    >
      {value ? <CheckCircle2 className="h-4 w-4" /> : null}
      {value ? "Sí" : "No"}
    </span>
  );
}

function StatusBadge({ status }: { status: AdminUserRow["status"] }) {
  const ready = status === "Listo para versión impresa";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
        ready ? "bg-gold/20 text-rosewood" : "bg-ivory text-plum"
      }`}
    >
      {status}
    </span>
  );
}

function LoadingRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="border-t border-gold/10">
          {Array.from({ length: 7 }).map((__, cellIndex) => (
            <td key={cellIndex} className="px-4 py-4">
              <div className="h-4 w-full max-w-36 animate-pulse rounded-full bg-linen" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function TableMessage({
  icon,
  title,
  message
}: {
  icon: ReactNode;
  title: string;
  message: string;
}) {
  return (
    <tr>
      <td colSpan={7} className="px-4 py-12 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-linen text-rosewood">
            {icon}
          </span>
          <p className="mt-3 font-semibold text-plum">{title}</p>
          <p className="mt-1 text-sm leading-6 text-plum/65">{message}</p>
        </div>
      </td>
    </tr>
  );
}

function formatOptionalDate(value: string | null) {
  return value ? formatDate(value) : "Sin fecha";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
