import Toggles from "@/components/Toggles";
import Navigation from "@/components/Navigation";

export default function Header() {
  return (
    <header
      className={
        "sticky inset-0 z-50 w-full border-b border-b-slate-50 bg-white bg-opacity-70  shadow-md backdrop-blur-lg dark:border-b-slate-700 dark:bg-slate-800 dark:bg-opacity-20"
      }
    >
      <div
        className={
          "mx-auto flex w-full flex-col flex-wrap items-center justify-center justify-center gap-2 px-2 py-2 sm:max-w-screen-2xl  sm:gap-4 sm:px-4  sm:py-4 md:flex-row md:justify-between"
        }
      >
        <Toggles />
        <Navigation />
      </div>
    </header>
  );
}
