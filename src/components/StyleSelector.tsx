import type { NarrationStyle } from "@/lib/algorithms/types";

const OPTIONS: { value: NarrationStyle; label: string }[] = [
  { value: "intuitive", label: "Intuitive" },
  { value: "mathy", label: "Mathy" },
  { value: "story", label: "Story" },
];

interface Props {
  value: NarrationStyle;
  onChange: (style: NarrationStyle) => void;
}

export function StyleSelector({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-lg border border-zinc-800 bg-zinc-900 p-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
            value === opt.value
              ? "bg-emerald-500 text-zinc-950"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
