import type { ProjectMeta } from "@/lib/content-types";

export const meta = {
  slug: "oso",
  title: { "en-US": "Oso Sigiloso", "es-CL": "Oso Sigiloso" },
  subtitle: {
    "en-US": "Video game",
    "es-CL": "Videojuego",
  },
  summary: {
    "en-US":
      "Video game developed as part of an undergraduate research to demonstrate a simple process to get started in game development.",
    "es-CL":
      "Videojuego desarrollado como parte de una investigaci\u00f3n de pregrado para demostrar un proceso sencillo para iniciarse en el desarrollo de videojuegos.",
  },
  coverImage: "/img/oso.jpg",
  tags: [
    "Unity",
    "C#",
    "Logic Pro X",
    "Affinity Designer",
    "Krita",
    "Blender",
  ],
  links: [
    {
      type: "itchio",
      url: "https://benjadiaz.itch.io/oso-sigiloso",
      label: "Play on itch.io",
    },
    {
      type: "github",
      url: "https://github.com/benjadiazp/OsoSigiloso",
      label: "Source code",
    },
  ],
  featured: true,
  order: 3,
  date: "2020-03-01",
  relatedArticles: ["oso-sigiloso"],
} satisfies ProjectMeta;
