import Hero from "@/components/Hero";
import Links from "@/components/Links";
import Projects from "@/components/Projects";
import Articles from "@/components/Articles";
import Contact from "@/components/Contact";
import { personSchema, websiteSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <main id="main-content" className="relative w-full">
      <JsonLd data={personSchema()} />
      <JsonLd data={websiteSchema()} />
      <Hero />
      <div className="animate-fade-in-up stagger-4 mt-6 w-full">
        <Links />
      </div>
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="mt-10 w-full scroll-mt-24 px-4 sm:mx-auto sm:max-w-screen-lg"
      >
        <Projects />
      </section>
      <section
        id="blog"
        aria-labelledby="blog-heading"
        className="mt-10 w-full scroll-mt-24 px-4 sm:mx-auto sm:max-w-screen-lg"
      >
        <Articles />
      </section>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="mt-10 w-full scroll-mt-24 px-4 sm:mx-auto sm:max-w-screen-lg"
      >
        <Contact />
      </section>
    </main>
  );
}
