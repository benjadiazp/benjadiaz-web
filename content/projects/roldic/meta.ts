import type { ProjectMeta } from "@/lib/content-types";

export const meta = {
  slug: "roldic",
  title: {
    "en-US": "Roldic Commerce SpA",
    "es-CL": "Roldic Commerce SpA",
  },
  subtitle: {
    "en-US": "Software development project",
    "es-CL": "Proyecto de desarrollo de software",
  },
  summary: {
    "en-US":
      "Complete E-Commerce platform for a bicycle store, including storefront, backoffice and API.",
    "es-CL":
      "Plataforma E-Commerce completa para una tienda de bicicletas, incluyendo storefront, backoffice y API.",
  },
  coverImage: "/img/roldic.png",
  tags: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Express",
    "MongoDB",
    "Segment",
    "AWS",
    "Vercel",
    "MercadoPago",
    "Transbank",
  ],
  links: [{ type: "website", url: "https://roldic.cl", label: "roldic.cl" }],
  featured: true,
  order: 2,
  date: "2022-09-01",
} satisfies ProjectMeta;
