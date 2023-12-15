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
      <main className="relative w-full">
        <section id={"home"} className={"w-full scroll-mt-24 px-4 sm:mx-auto"}>
          <div
            className={
              "mx-auto px-4 pt-4 sm:max-w-screen-lg sm:px-16 sm:pb-6 sm:pt-16"
            }
          >
            <h1 className={"text-4xl font-normal md:text-5xl"}>{t("title")}</h1>
            <h2
              className={
                "background-animate mt-2 inline-block bg-gradient-to-r from-red-500  to-orange-500 bg-clip-text text-2xl font-medium text-transparent md:text-3xl"
              }
            >
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
    </>
  );
}
