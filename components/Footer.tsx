import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className={"w-full px-4 py-4 sm:mx-auto sm:max-w-screen-2xl"}>
      <p className={"text-center"}>{"🐻🐧"}</p>
      <div className={"flex flex-col items-center justify-center gap-4"}>
        <Link href={"/privacy"} className={"text-center hover:underline"}>
          {t("privacy")}
        </Link>
      </div>

      <div className={"flex flex-col items-center justify-center gap-4"}>
        <p className={"text-center"}>{"© 2023 Benjamín Díaz P."}</p>
      </div>
    </footer>
  );
}
