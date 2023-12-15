import Toggles from "@/components/Toggles";
import Navigation from "@/components/Navigation";

export default function Header() {
  return (
    <header
      className={
        "sticky inset-0 z-50 mx-auto flex w-full flex-col flex-wrap items-center justify-center justify-center gap-4 border-b border-b-slate-50 bg-white bg-opacity-70 px-4 py-4 shadow-md backdrop-blur-lg dark:border-b-slate-700 dark:bg-slate-800 dark:bg-opacity-20 sm:max-w-screen-2xl md:flex-row md:justify-between"
      }
    >
      <Toggles />
      <Navigation />
    </header>
  );
}
