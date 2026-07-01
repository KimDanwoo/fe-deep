export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12" aria-busy="true" aria-label="불러오는 중">
      <div className="animate-pulse space-y-6">
        <div className="h-9 w-2/3 rounded-lg bg-muted" />
        <div className="h-5 w-1/2 rounded bg-muted" />
        <div className="space-y-3 pt-4">
          <div className="h-16 rounded-xl bg-muted" />
          <div className="h-16 rounded-xl bg-muted" />
          <div className="h-16 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}
