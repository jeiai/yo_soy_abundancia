"use client";

import { ChevronLeft, ChevronRight, ExternalLink, PlayCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { SocialVideo } from "@/data/social-videos";

const weekDays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Mi\u00e9rcoles",
  "Jueves",
  "Viernes",
  "S\u00e1bado"
];

type MeditationDayResponse = {
  dayIndex?: number;
  dayLabel?: string;
  label?: string;
};

type SocialVideoCarouselProps = {
  videos: SocialVideo[];
  compact?: boolean;
  startAtToday?: boolean;
};

export function SocialVideoCarousel({
  videos,
  compact = false,
  startAtToday = true
}: SocialVideoCarouselProps) {
  const visibleVideos = useMemo(
    () => videos.filter((video) => video.visible).sort((a, b) => a.order - b.order),
    [videos]
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [todayLabel, setTodayLabel] = useState("");
  const isResolvingToday = startAtToday && activeIndex === null;

  useEffect(() => {
    let cancelled = false;

    if (startAtToday) {
      setActiveIndex(null);
      setTodayLabel("");

      fetch("/api/meditation-day", {
        cache: "no-store"
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo resolver la meditacion de hoy.");
          }

          return response.json() as Promise<MeditationDayResponse>;
        })
        .then((data) => {
          if (cancelled) {
            return;
          }

          const dayIndex = getSafeWeekdayIndex(data.dayIndex);
          const nextIndex = Math.min(dayIndex, Math.max(visibleVideos.length - 1, 0));

          setActiveIndex(nextIndex);
          setTodayLabel(data.dayLabel || data.label || weekDays[dayIndex] || "");
        })
        .catch(() => {
          if (cancelled) {
            return;
          }

          const dayIndex = getBrowserWeekdayIndex();
          const nextIndex = Math.min(dayIndex, Math.max(visibleVideos.length - 1, 0));

          setActiveIndex(nextIndex);
          setTodayLabel(weekDays[dayIndex] ?? "");
        });
    } else {
      setActiveIndex(0);
      setTodayLabel("");
    }

    return () => {
      cancelled = true;
    };
  }, [startAtToday, visibleVideos.length]);

  if (visibleVideos.length === 0) {
    return (
      <section className="rounded-3xl border border-gold/20 bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
          Videos
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-plum">
          Pr\u00f3ximamente
        </h2>
        <p className="mt-3 text-sm leading-6 text-plum/70">
          Estamos preparando una selecci\u00f3n de meditaciones y contenido social
          para acompa\u00f1ar tu camino.
        </p>
      </section>
    );
  }

  const resolvedActiveIndex = activeIndex ?? 0;
  const activeVideo = visibleVideos[resolvedActiveIndex] ?? visibleVideos[0];
  const canGoPrevious = visibleVideos.length > 1;
  const canGoNext = visibleVideos.length > 1;

  const goPrevious = () => {
    setActiveIndex((current) => {
      const currentIndex = current ?? 0;

      return currentIndex === 0 ? visibleVideos.length - 1 : currentIndex - 1;
    });
  };

  const goNext = () => {
    setActiveIndex((current) => {
      const currentIndex = current ?? 0;

      return currentIndex === visibleVideos.length - 1 ? 0 : currentIndex + 1;
    });
  };

  return (
    <section
      aria-label="Carrusel de videos sociales"
      className={`rounded-3xl border border-gold/20 bg-white shadow-soft ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Videos
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-plum">
            Insp\u00edrate con Yo Soy Abundancia
          </h2>
        </div>
        <span className="rounded-full bg-linen px-3 py-1 text-xs font-semibold text-rosewood">
          {todayLabel ? `Hoy: ${todayLabel}` : "Calculando d\u00eda"}
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-gold/15 bg-plum">
        {isResolvingToday ? (
          <div className="flex aspect-video w-full items-center justify-center bg-plum px-6 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                Calculando hoy
              </p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Estamos preparando la meditaci\u00f3n que corresponde a tu fecha.
              </p>
            </div>
          </div>
        ) : activeVideo.embedEnabled && activeVideo.videoId ? (
          <div className="aspect-video w-full">
            <iframe
              key={activeVideo.id}
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${activeVideo.videoId}`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <a
            href={activeVideo.url}
            target="_blank"
            rel="noreferrer"
            className="group relative block aspect-video w-full overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${activeVideo.thumbnail})` }}
            aria-label={`Abrir ${activeVideo.title} en YouTube`}
          >
            <span className="absolute inset-0 flex items-center justify-center bg-plum/35">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-plum shadow-soft">
                <PlayCircle className="h-7 w-7" />
              </span>
            </span>
          </a>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-base font-semibold leading-snug text-plum">
          {isResolvingToday ? "Meditaci\u00f3n del d\u00eda" : activeVideo.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-plum/70">
          {isResolvingToday
            ? "En unos segundos aparecer\u00e1 el video correcto para el d\u00eda de hoy."
            : activeVideo.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrevious}
            disabled={!canGoPrevious || isResolvingToday}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-linen text-plum transition hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Video anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext || isResolvingToday}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-linen text-plum transition hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Video siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs font-semibold text-plum/60">
          {isResolvingToday ? "--" : resolvedActiveIndex + 1} / {visibleVideos.length}
        </p>
      </div>

      {!isResolvingToday ? (
        <div className="mt-4 rounded-2xl bg-ivory p-3">
          <p className="text-xs leading-5 text-plum/65">
            Si el video no carga, puedes abrirlo directamente en YouTube.
          </p>
          <a
            href={activeVideo.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-rosewood hover:text-plum"
          >
            Abrir en YouTube
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      ) : null}
    </section>
  );
}

function getBrowserWeekdayIndex() {
  return new Date().getDay();
}

function getSafeWeekdayIndex(dayIndex: number | undefined) {
  return typeof dayIndex === "number" && dayIndex >= 0 && dayIndex <= 6
    ? dayIndex
    : getBrowserWeekdayIndex();
}
