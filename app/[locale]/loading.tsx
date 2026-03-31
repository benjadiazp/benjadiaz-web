export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div role="status" aria-label="Loading">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span className="sr-only">Loading...</span>
      </div>
    </main>
  );
}
