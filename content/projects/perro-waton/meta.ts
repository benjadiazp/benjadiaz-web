import type { ProjectMeta } from "@/lib/content-types";

export const meta = {
  slug: "perro-waton",
  title: { "en-US": "Perro Waton", "es-CL": "Perro Waton" },
  subtitle: {
    "en-US": "Video game",
    "es-CL": "Videojuego",
  },
  summary: {
    "en-US":
      "A top-down game where you play as a dog trying to eat as many completos (Chilean hot dogs) as possible before the angry vendor catches you.",
    "es-CL":
      "Un juego de vista cenital donde juegas como un perro que intenta comerse la mayor cantidad de completos antes de que el vendedor enojado te atrape.",
  },
  coverImage: "/img/games/perro-waton.png",
  tags: ["Construct", "Game Dev"],
  links: [
    {
      type: "itchio",
      url: "https://benjadiaz.itch.io/perro-waton",
      label: "Play on itch.io",
    },
  ],
  featured: false,
  order: 4,
  date: "2023-12-18",
  relatedArticles: ["perro-waton"],
} satisfies ProjectMeta;
