import type { ProjectMeta } from "@/lib/content-types";

export const meta = {
  slug: "drizip",
  title: { "en-US": "Drizip SpA", "es-CL": "Drizip SpA" },
  subtitle: {
    "en-US": "Software Engineer",
    "es-CL": "Ingeniero de Software",
  },
  summary: {
    "en-US":
      "Platform that allows car owners to rent their cars to other people, available in Chile and M\u00e9xico.",
    "es-CL":
      "Plataforma que permite a propietarios de autos arrendar sus veh\u00edculos a otras personas, disponible en Chile y M\u00e9xico.",
  },
  coverImage: "/img/drizip.png",
  tags: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Meteor",
    "AWS",
  ],
  links: [{ type: "website", url: "https://drizip.com", label: "drizip.com" }],
  featured: true,
  order: 1,
  date: "2020-01-01",
} satisfies ProjectMeta;
