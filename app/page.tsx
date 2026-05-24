import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  Package,
  PlayCircle,
  Sparkles,
  Users
} from "lucide-react";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SocialVideoCarousel } from "@/components/video/SocialVideoCarousel";
import { getVisibleSocialVideos } from "@/data/social-videos";

const meditationHref = "/meditacion-del-dia";
const caminoHref = "/camino-de-abundancia-en-21-dias";
const merchHref = "/merch";

type HomeSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  text: string;
  primary: {
    label: string;
    href: string;
  };
  secondary?: {
    label: string;
    href: string;
  };
  Icon?: typeof Sparkles;
  tone?: "white" | "soft" | "lavender";
};

const toneClass = {
  white: "bg-white",
  soft: "bg-ivory",
  lavender: "lavender-band"
};

export default function HomePage() {
  const socialVideos = getVisibleSocialVideos();

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start">
      <div className="min-w-0">
      <section className="soft-band px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-rosewood ring-1 ring-gold/30">
              <Sparkles className="h-4 w-4 text-gold" />
              Meditación, guía y comunidad
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[1.04] text-plum md:text-7xl">
              Yo Soy Abundancia nace de una verdad vivida.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-plum/78">
              La abundancia y la plenitud pueden cultivarse cada día. Este
              sitio comparte meditaciones, guía y comunidad para acompañar ese
              camino contigo.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#empieza-aqui">
                Empezar hoy
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="#meditacion-del-dia" variant="secondary">
                Ver Meditación del Día
                <PlayCircle className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[2rem] border border-gold/20 bg-white/82 p-5 shadow-soft">
            <div className="rounded-[1.5rem] bg-linen p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                Meditación del Día
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-plum">
                Un momento para volver a ti
              </h2>
              <p className="mt-4 leading-7 text-plum/72">
                Acompaña la transmisión en vivo o vuelve a la repetición más
                reciente cuando necesites calma, enfoque y presencia.
              </p>
              <ButtonLink href="#meditacion-del-dia" className="mt-6">
                Ver Meditación del Día
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 lg:px-8">
        <p className="mx-auto max-w-4xl text-center font-display text-3xl font-semibold leading-tight text-plum md:text-4xl">
          Un espacio para reconectar contigo, fortalecer tu paz interior y
          caminar en comunidad a través de la práctica diaria.
        </p>
      </section>

      <HomeSection
        eyebrow="Empieza aquí"
        title="Empieza con un paso diario"
        text="No hace falta tenerlo todo resuelto para comenzar. Yo Soy Abundancia es una invitación a volver cada día a una práctica de conciencia, presencia y plenitud."
        primary={{ label: "Escuchar la meditación de hoy", href: "#meditacion-del-dia" }}
        secondary={{ label: "Conocer la comunidad", href: "/comunidad" }}
        Icon={PlayCircle}
        tone="soft"
      />

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Historia
          </p>
          <h2 className="font-display text-4xl font-semibold leading-tight text-plum md:text-5xl">
            Una verdad vivida en primera persona
          </h2>
          <p className="mt-6 text-lg leading-9 text-plum/76">
            Yo Soy Abundancia nace de una filosofía de vida hecha práctica
            diaria. A través de la meditación cotidiana, la reflexión y el
            compartir constante, este camino fue tomando forma como una
            comunidad viva de acompañamiento, esperanza y transformación
            interior.
          </p>
        </div>
      </section>

      <div className="grid bg-ivory lg:grid-cols-2">
        <HomeSection
          eyebrow="Producto digital"
          title="Camino de abundancia en 21 días"
          subtitle="21 días para abrir caminos de abundancia"
          text={`Un recorrido digital de 21 días para acompañar tu práctica y abrir caminos de abundancia con intención, reflexión y constancia.\n\nCada día ofrece un espacio para volver a ti, fortalecer tu enfoque interior y dar un paso más hacia una vida vivida en plenitud.`}
          primary={{ label: "Comenzar el camino", href: caminoHref }}
          secondary={{ label: "Conocer el camino", href: caminoHref }}
          Icon={Sparkles}
          tone="soft"
        />
        <HomeSection
          eyebrow="Producto digital"
          title="Agenda anual"
          subtitle="Planifica tus días desde gratitud, propósito y constancia"
          text={`Consulta cualquier día guardado desde que empezaste tu agenda, y sigue registrando gratitud, hábitos, acción de abundancia y metas mensuales.\n\nUn espacio para dar seguimiento a tu camino día con día y sostener una práctica de abundancia con intención y claridad.`}
          primary={{ label: "Conocer Agenda", href: "/agenda" }}
          secondary={{ label: "Adquirir Agenda", href: "/agenda" }}
          Icon={CalendarDays}
          tone="white"
        />
      </div>

      <HomeSection
        eyebrow="Merch"
        title="Merch"
        subtitle="Lleva contigo un recordatorio de abundancia"
        text={`Una colección de productos pensados para acompañar tu camino y mantener presente, en tu día a día, la práctica de vivir con intención, gratitud y plenitud.\n\nMerch es una extensión tangible de la comunidad: piezas que no solo se usan, sino que también recuerdan quién eres y cómo eliges vivir.`}
        primary={{ label: "Ver merch", href: merchHref }}
        secondary={{ label: "Comprar ahora", href: merchHref }}
        Icon={Package}
        tone="lavender"
      />

      <div className="grid bg-white lg:grid-cols-2">
        <HomeSection
          eyebrow="Comunidad"
          title="Comunidad"
          subtitle="Un espacio para caminar en abundancia junto a otros"
          text={`Yo Soy Abundancia también vive en la conexión con otras personas que buscan paz, claridad, plenitud y transformación interior.\n\nLa comunidad es un lugar para compartir el camino, fortalecer la práctica diaria y recordar que la abundancia también se cultiva en compañía.`}
          primary={{ label: "Conocer la comunidad", href: "/comunidad" }}
          secondary={{ label: "Unirme", href: "/comunidad" }}
          Icon={Users}
          tone="white"
        />
        <HomeSection
          eyebrow="Miembros"
          title="Miembros"
          subtitle="Tu espacio para profundizar en el camino"
          text={`Un área pensada para quienes desean dar seguimiento a su proceso, acceder a contenidos especiales y vivir más de cerca la experiencia de Yo Soy Abundancia.\n\nAquí la práctica puede continuar con mayor constancia, profundidad y acompañamiento.`}
          primary={{ label: "Iniciar sesión", href: "/login" }}
          secondary={{ label: "Registrarse", href: "/registro" }}
          Icon={HeartHandshake}
          tone="soft"
        />
      </div>

      <section id="meditacion-del-dia" className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
              Meditación del Día
            </p>
            <h2 className="font-display text-4xl font-semibold leading-tight text-plum md:text-5xl">
              Acompaña la transmisión en vivo o vuelve a verla cuando la necesites
            </h2>
            <p className="mt-5 text-lg leading-8 text-plum/75">
              Cada día tendrás un espacio para conectar con la meditación del
              día, ya sea en vivo o en repetición, para seguir fortaleciendo tu
              práctica desde donde estés.
            </p>
            <p className="mt-4 text-lg leading-8 text-plum/75">
              Este acceso puede llevar directamente a la transmisión activa o,
              cuando no haya transmisión en ese momento, a la repetición más
              reciente alojada en YouTube.
            </p>
            <ButtonLink href={meditationHref} className="mt-7">
              Ver Meditación del Día
              <PlayCircle className="h-4 w-4" />
            </ButtonLink>
          </div>
          <YouTubeEmbed
            videoId="jfKfPfyJRdk"
            title="Meditación del Día de Yo Soy Abundancia"
          />
        </div>
      </section>

      <section className="soft-band px-5 py-20 text-center lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl font-semibold leading-tight text-plum md:text-6xl">
            La abundancia también se practica.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-plum/75">
            Vuelve cada día, toma un momento para ti y sigue este camino en
            comunidad.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="#meditacion-del-dia">Ver Meditación del Día</ButtonLink>
            <ButtonLink href="#empieza-aqui" variant="secondary">
              Explorar el sitio
            </ButtonLink>
          </div>
        </div>
      </section>
      </div>
      <aside className="hidden border-l border-gold/15 bg-ivory/70 px-5 py-8 lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
        <SocialVideoCarousel videos={socialVideos} compact />
      </aside>
    </div>
  );
}

function HomeSection({
  eyebrow,
  title,
  subtitle,
  text,
  primary,
  secondary,
  Icon = Sparkles,
  tone = "white"
}: HomeSectionProps) {
  return (
    <section
      id={title === "Empieza con un paso diario" ? "empieza-aqui" : undefined}
      className={`${toneClass[tone]} px-5 py-20 lg:px-8`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-rosewood shadow-sm ring-1 ring-gold/20">
          <Icon className="h-6 w-6" />
        </div>
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-4xl font-semibold leading-tight text-plum md:text-5xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 text-xl font-semibold text-rosewood">{subtitle}</p>
        ) : null}
        <div className="mt-5 max-w-3xl space-y-4 text-lg leading-8 text-plum/75">
          {text.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
          {secondary ? (
            <ButtonLink href={secondary.href} variant="secondary">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
