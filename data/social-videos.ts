export type SocialVideo = {
  id: string;
  platform: "youtube";
  title: string;
  description: string;
  url: string;
  videoId?: string;
  thumbnail: string;
  order: number;
  visible: boolean;
  embedEnabled: boolean;
};

const youtubeThumbnail = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

export const socialVideos: SocialVideo[] = [
  {
    id: "domingo-mi-hpya-nyu3y",
    platform: "youtube",
    title: "Domingo: Meditación de abundancia",
    description:
      "Inicia la semana conectando con gratitud, presencia y caminos abiertos.",
    url: "https://youtu.be/MiHPyaNyu3Y?si=q1xI7K4wpG4V9zAm",
    videoId: "MiHPyaNyu3Y",
    thumbnail: youtubeThumbnail("MiHPyaNyu3Y"),
    order: 1,
    visible: true,
    embedEnabled: true
  },
  {
    id: "lunes-rbqf6wntsxs",
    platform: "youtube",
    title: "Lunes: Enfoque y abundancia",
    description:
      "Una práctica para volver al centro y comenzar con intención clara.",
    url: "https://youtu.be/RBqF6WnTSxs?si=R7a0D1HxWtm9tvsZ",
    videoId: "RBqF6WnTSxs",
    thumbnail: youtubeThumbnail("RBqF6WnTSxs"),
    order: 2,
    visible: true,
    embedEnabled: true
  },
  {
    id: "martes-oic3nf0cyg0",
    platform: "youtube",
    title: "Martes: Abre caminos con fe",
    description:
      "Un momento para sostener tu práctica espiritual con calma y confianza.",
    url: "https://youtu.be/Oic3NF0CyG0?si=DGLv_1e9RakYonJ8",
    videoId: "Oic3NF0CyG0",
    thumbnail: youtubeThumbnail("Oic3NF0CyG0"),
    order: 3,
    visible: true,
    embedEnabled: true
  },
  {
    id: "miercoles-4rch-wuwvmik",
    platform: "youtube",
    title: "Miércoles: Presencia y gratitud",
    description:
      "Una pausa para respirar, agradecer y recordar que la abundancia se practica.",
    url: "https://youtu.be/4rcHWUwvMik?si=pskoKI9EsyxXkkX0",
    videoId: "4rcHWUwvMik",
    thumbnail: youtubeThumbnail("4rcHWUwvMik"),
    order: 4,
    visible: true,
    embedEnabled: true
  },
  {
    id: "jueves-4rch-wuwvmik",
    platform: "youtube",
    title: "Jueves: Repetición para profundizar",
    description:
      "Vuelve a esta meditación para reforzar la intención de abundancia en tu semana.",
    url: "https://youtu.be/4rcHWUwvMik?si=zs0NMW6nvXuGl3Wn",
    videoId: "4rcHWUwvMik",
    thumbnail: youtubeThumbnail("4rcHWUwvMik"),
    order: 5,
    visible: true,
    embedEnabled: true
  },
  {
    id: "viernes-dqnzcam9cbg",
    platform: "youtube",
    title: "Viernes: Cierre con intención",
    description:
      "Acompaña el cierre de la semana con una práctica de claridad y merecimiento.",
    url: "https://youtu.be/DqnzCaM9CBg?si=-6gqIiR5i3aW4eEf",
    videoId: "DqnzCaM9CBg",
    thumbnail: youtubeThumbnail("DqnzCaM9CBg"),
    order: 6,
    visible: true,
    embedEnabled: true
  },
  {
    id: "sabado-r9qcynruij8",
    platform: "youtube",
    title: "Sábado: Descanso y expansión",
    description:
      "Una meditación para integrar la semana desde paz, apertura y gratitud.",
    url: "https://youtu.be/R9qCyNruIj8?si=8fPFJuSmY_t-xiPc",
    videoId: "R9qCyNruIj8",
    thumbnail: youtubeThumbnail("R9qCyNruIj8"),
    order: 7,
    visible: true,
    embedEnabled: true
  },
  {
    id: "extra-i6j39yhgvww",
    platform: "youtube",
    title: "Video extra: Camino de abundancia",
    description:
      "Contenido adicional para seguir fortaleciendo tu camino de abundancia.",
    url: "https://youtu.be/i6j39YHGVWw?si=iEjpws6BiicXlDAu",
    videoId: "i6j39YHGVWw",
    thumbnail: youtubeThumbnail("i6j39YHGVWw"),
    order: 8,
    visible: true,
    embedEnabled: true
  }
];

export function getVisibleSocialVideos() {
  return socialVideos
    .filter((video) => video.visible)
    .sort((first, second) => first.order - second.order);
}
