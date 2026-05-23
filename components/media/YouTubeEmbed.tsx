type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
};

export function YouTubeEmbed({ videoId, title, className = "" }: YouTubeEmbedProps) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-gold/20 bg-plum shadow-soft ${className}`}
    >
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
