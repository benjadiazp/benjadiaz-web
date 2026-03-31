import type { ArticleMeta } from "@/lib/content-types";

export const meta = {
  slug: "perro-waton",
  title: {
    "en-US": "Perro Waton: Built in Two Hours, Finished in Ten Minutes",
    "es-CL": "Perro Waton: Hecho en Dos Horas, Terminado en Diez Minutos",
  },
  summary: {
    "en-US":
      "How I built a complete top-down chase game in Construct in a single afternoon — MS Paint sprites, mouth sound effects, and all.",
    "es-CL":
      "Cómo hice un juego completo de persecución en vista cenital en Construct en una tarde — sprites en MS Paint, efectos de sonido con la boca, y todo.",
  },
  coverImage: "/img/games/perro-waton.png",
  tags: ["Construct", "Game Dev"],
  date: "2023-12-18",
  type: "blog",
  author: "Benjamín Díaz",
  featured: false,
  order: 3,
  links: [
    {
      type: "itchio",
      url: "https://benjadiaz.itch.io/perro-waton",
      label: "Play on itch.io",
    },
  ],
  relatedProjects: ["perro-waton"],
} satisfies ArticleMeta;
