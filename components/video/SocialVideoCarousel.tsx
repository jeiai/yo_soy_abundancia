"use client";

import { ChevronLeft, ChevronRight, ExternalLink, PlayCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { SocialVideo } from "@/data/social-videos";

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
  const [activeIndex, setActiveIndex] = useState(() =>
    startAtToday ? getTodayVideoIndex(videos) : 0
  );

  useEffect(() => {
    if (startAtToday) {
      setActiveIndex(getTodayVideoIndex(videos));
    }
  }, [startAtToday, videos]);

  if (visibleVideos.length === 0) {
    return (
      <section className="rounded-3xl border border-gold/20 bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
          Videos
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-plum">
          Próximamente
        </h2>
        <p className="mt-3 text-sm leading-6 text-plum/70">
          Estamos preparando una selección de meditaciones y contenido social
          para acompañar tu camino.
        </p>
      </section>
    );
  }

  const activeVideo = visibleVideos[activeIndex] ?? visibleVideos[0];
  const canGoPrevious = visibleVideos.length > 1;
  const canGoNext = visibleVideos.length > 1;

  const goPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? visibleVideos.length - 1 : current - 1
    );
  };

  const goNext = () => {
    setActiveIndex((current) =>
      current === visibleVideos.length - 1 ? 0 : current + 1
    );
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
            Inspírate con Yo Soy Abundancia
          </h2>
        </div>
        <span className="rounded-full bg-linen px-3 py-1 text-xs font-semibold text-rosewood">
          YouTube
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-gold/15 bg-plum">
        {activeVideo.embedEnabled && activeVideo.videoId ? (
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
          {activeVideo.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-plum/70">
          {activeVideo.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrevious}
            disabled={!canGoPrevious}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-linen text-plum transition hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Video anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-linen text-plum transition hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Video siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs font-semibold text-plum/60">
          {activeIndex + 1} / {visibleVideos.length}
        </p>
      </div>

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
    </section>
  );
}

function getTodayVideoIndex(videos: SocialVideo[]) {
  const visibleVideos = videos
    .filter((video) => video.visible)
    .sort((a, b) => a.order - b.order);

  if (visibleVideos.length === 0) {
    return 0;
  }

  const dayIndex = new Date().getDay();
  return Math.min(dayIndex, visibleVideos.length - 1);
}
