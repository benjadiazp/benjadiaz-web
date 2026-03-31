import type { ArticleMeta } from "@/lib/content-types";

export const meta = {
  slug: "oso-sigiloso",
  title: {
    "en-US": "Oso Sigiloso: Building a 3D Game from Scratch for My Undergraduate Research",
    "es-CL": "Oso Sigiloso: Haciendo un Videojuego 3D desde Cero para mi Investigación de Pregrado",
  },
  summary: {
    "en-US":
      "How I researched, designed, and built a complete 3D stealth game as an undergraduate research project — covering the full pipeline from concept and 3D modeling to AI, audio, and deployment.",
    "es-CL":
      "Cómo investigué, diseñé y construí un videojuego de sigilo en 3D completo como proyecto de investigación de pregrado — cubriendo el pipeline completo desde el concepto y el modelado 3D hasta la IA, el audio y el despliegue.",
  },
  coverImage: "/img/oso.jpg",
  tags: ["Unity", "C#", "Game Dev", "3D Modeling", "Research"],
  date: "2020-03-20",
  type: "blog",
  author: "Benjamín Díaz",
  featured: false,
  order: 2,
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
  relatedProjects: ["oso"],
} satisfies ArticleMeta;
