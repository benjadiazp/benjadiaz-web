import type { Metadata } from "next";
import type { Locale } from "@/lib/content-types";
import { buildUrl, buildAlternates } from "@/lib/seo";
import { personSchema, breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

const descriptions: Record<Locale, string> = {
  "en-US":
    "Meet Benjamín Díaz — software engineer, game developer, and content creator from Chile.",
  "es-CL":
    "Conoce a Benjamín Díaz — ingeniero de software, desarrollador de videojuegos y creador de contenido de Chile.",
};

const titles: Record<Locale, string> = {
  "en-US": "About",
  "es-CL": "Acerca de",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;

  return {
    title: titles[loc] ?? titles["en-US"],
    description: descriptions[loc] ?? descriptions["en-US"],
    alternates: buildAlternates("/about", loc),
  };
}

export default async function AboutLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: buildUrl("/", loc) },
          {
            name: titles[loc] ?? titles["en-US"],
            url: buildUrl("/about", loc),
          },
        ])}
      />
      {children}
    </>
  );
}
