"use client";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const ThemeSwitch = ({
  labels,
}: {
  labels?: {
    light: string;
    dark: string;
  };
}) => {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return <span role="status">loading...</span>;
  }

  return (
    <button
      className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-orange-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-orange-400"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={
        theme === "light"
          ? labels?.dark ?? "Switch to dark mode"
          : labels?.light ?? "Switch to light mode"
      }
      aria-pressed={theme === "dark"}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
};
