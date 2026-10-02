import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-3">
        <span className="font-mono text-sm text-emerald-400">$ algovisualizer --init</span>
        <h1 className="text-3xl font-bold text-zinc-100">
          Learn algorithms one step at a time.
        </h1>
        <p className="max-w-xl text-zinc-400">
          No autoplay you can&apos;t pause. Every run is a numbered list of
          steps you control — scrub to any step, read the synced pseudocode,
          and pick how you want it explained.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Algorithms
        </h2>
        <Link
          href="/algorithms/bubble-sort"
          className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 transition-colors hover:border-emerald-500"
        >
          <div>
            <p className="font-medium text-zinc-100">Bubble Sort</p>
            <p className="text-sm text-zinc-500">Sorting · O(n²)</p>
          </div>
          <span className="text-zinc-500">→</span>
        </Link>
      </div>
    </main>
  );
}
