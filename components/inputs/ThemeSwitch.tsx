"use client";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

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
      className="rounded-2xl px-4 py-2 font-mono text-xs font-medium hover:underline sm:text-sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={
        theme === "light"
          ? labels?.dark ?? "Switch to dark mode"
          : labels?.light ?? "Switch to light mode"
      }
    >
      {theme === "light" ? labels?.dark ?? "dark" : labels?.light ?? "light"}
    </button>
  );
};
