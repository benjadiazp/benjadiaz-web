import Image from "next/image";
import { useTranslations } from "next-intl";
import Links from "@/components/Links";
import Navigation from "@/components/Navigation";
import Toggles from "@/components/Toggles";
import Projects from "@/components/Projects";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";
import Contact from "@/components/Contact";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("Home");
  return (
    <>
      <header
        className={
          "sticky inset-0 z-50 mx-auto flex w-full flex-col flex-wrap items-center justify-center justify-center gap-4 px-4 py-4 backdrop-blur-lg sm:max-w-screen-2xl md:flex-row md:justify-between"
        }
      >
        <Toggles />
        <Navigation />
      </header>
      <main className="relative w-full">
        <section id={"home"} className={"w-full scroll-mt-24 px-4 sm:mx-auto"}>
          <div
            className={
              "mx-auto px-4 pt-4 sm:max-w-screen-lg sm:px-16 sm:pb-6 sm:pt-16"
            }
          >
            <h1 className={"text-4xl md:text-5xl"}>{t("title")}</h1>
            <h2 className={"mt-2 text-2xl text-red-500 md:text-3xl"}>
              {t("subtitle")}
            </h2>
            <p className={"mt-4 max-w-3xl text-lg md:text-xl"}>
              {t("description")}
            </p>
          </div>
          <div className={"mt-4 w-full"}>
            <Links />
          </div>
          <Link
            href={"#projects"}
            className={
              "mt-10 flex scroll-mt-32 flex-col items-center justify-center gap-4"
            }
          >
            <p>{t("moreInfo")}</p>
            <ChevronDoubleDownIcon className={"h-10 w-10 animate-bounce"} />
          </Link>
        </section>
        <section
          id={"projects"}
          className={
            "mt-10 w-full scroll-mt-24 px-4 sm:mx-auto sm:max-w-screen-lg"
          }
        >
          <Projects />
        </section>
        <section
          id={"contact"}
          className={
            "mt-10 w-full scroll-mt-24 px-4 sm:mx-auto sm:max-w-screen-lg"
          }
        >
          <Contact />
        </section>
      </main>
      <footer className={"w-full px-4 py-4 sm:mx-auto sm:max-w-screen-2xl"}>
        <div className={"flex flex-col items-center justify-center gap-4"}>
          <p className={"text-center"}>{"🐻🐧"}</p>
          <p className={"text-center"}>{"© 2023 Benjamín Díaz P."}</p>
        </div>
      </footer>
    </>
  );
}
