import Link from "next/link";
import { useTranslations } from "next-intl";

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link className={"text-md hover:underline"} href={href}>
      {children}
    </Link>
  );
};

export default function Navigation() {
  const t = useTranslations("Navigation");
  return (
    <nav className={"flex justify-end gap-4"}>
      <NavItem href={"/#home"}>{t("home")}</NavItem>
      <NavItem href={"/#projects"}>{t("projects")}</NavItem>
      <NavItem href={"/#contact"}>{t("contact")}</NavItem>
    </nav>
  );
}
