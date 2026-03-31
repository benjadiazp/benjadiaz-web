import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 — Page not found</title>
      </head>
      <body className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 font-mono text-black">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-lg">Page not found</p>
        <Link
          href="/"
          className="mt-6 underline underline-offset-4 hover:opacity-70"
        >
          Go back home
        </Link>
      </body>
    </html>
  );
}
