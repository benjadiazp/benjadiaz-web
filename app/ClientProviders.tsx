"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider attribute="class" enableSystem defaultTheme="system">
      {children}
    </NextThemesProvider>
  );
}
