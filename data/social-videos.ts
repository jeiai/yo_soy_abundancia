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
    id: "meditacion-del-dia",
    platform: "youtube",
    title: "Meditación del Día",
    description:
      "Un espacio diario para volver a tu centro, respirar y caminar en abundancia.",
    url: "https://www.youtube.com/@yosoyabundancia222",
    videoId: "jfKfPfyJRdk",
    thumbnail: youtubeThumbnail("jfKfPfyJRdk"),
    order: 1,
    visible: true,
    embedEnabled: true
  },
  {
    id: "canal-youtube",
    platform: "youtube",
    title: "Más videos de Yo Soy Abundancia",
    description:
      "Visita el canal para ver las meditaciones, transmisiones y repeticiones disponibles.",
    url: "https://www.youtube.com/@yosoyabundancia222",
    thumbnail: "/brand/yo-soy-abundancia-logo.jpeg",
    order: 2,
    visible: true,
    embedEnabled: false
  }
];

export function getVisibleSocialVideos() {
  return socialVideos
    .filter((video) => video.visible)
    .sort((first, second) => first.order - second.order);
}
