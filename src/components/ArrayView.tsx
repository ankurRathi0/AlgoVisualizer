import type { BubbleSortStepEvent } from "@/lib/algorithms/types";

interface Props {
  values: number[];
  event: BubbleSortStepEvent | undefined;
}

export function ArrayView({ values, event }: Props) {
  const highlight = (idx: number): string => {
    if (!event) return "";
    if ("i" in event && "j" in event) {
      if (idx !== event.i && idx !== event.j) return "";
      if (event.op === "swap") return "border-amber-400 bg-amber-400/10";
      if (event.op === "compare") return "border-sky-400 bg-sky-400/10";
      if (event.op === "no-swap") return "border-emerald-500 bg-emerald-500/10";
    }
    if (event.op === "pass-complete" && idx >= event.sortedTailFrom) {
      return "border-emerald-600 bg-emerald-600/10";
    }
    return "";
  };

  return (
    <div className="flex flex-wrap items-end gap-2">
      {values.map((v, idx) => (
        <div key={idx} className="flex flex-col items-center gap-1">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-md border-2 border-zinc-800 bg-zinc-900 font-mono text-lg text-zinc-100 transition-colors ${highlight(idx)}`}
          >
            {v}
          </div>
          <span className="text-xs text-zinc-600">{idx}</span>
        </div>
      ))}
    </div>
  );
}
