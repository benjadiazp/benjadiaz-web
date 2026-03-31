"use client";

import dynamic from "next/dynamic";

const AlgorithmicBackground = dynamic(
  () => import("@/components/AlgorithmicBackground"),
  { ssr: false },
);

export default function AlgorithmicBackgroundLoader() {
  return <AlgorithmicBackground />;
}
