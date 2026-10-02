import type { PseudocodeLine } from "@/lib/algorithms/types";

interface Props {
  lines: PseudocodeLine[];
  activeLines: number[];
}

export function PseudocodePanel({ lines, activeLines }: Props) {
  return (
    <div className="rounded-lg border border-amber-500/20 bg-zinc-950 p-4 font-mono text-sm">
      {lines.map((l) => {
        const active = activeLines.includes(l.line);
        return (
          <div
            key={l.line}
            className={`rounded px-2 py-0.5 transition-colors ${
              active
                ? "bg-amber-500/15 text-amber-300"
                : "text-zinc-400"
            }`}
          >
            <span className="mr-3 text-zinc-600">{l.line}</span>
            {l.text}
          </div>
        );
      })}
    </div>
  );
}
