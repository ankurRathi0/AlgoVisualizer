"use client";

import { useState } from "react";
import type { ConceptSlide } from "@/lib/algorithms/concepts/bubbleSortConcept";

interface Props {
  slides: ConceptSlide[];
  onDone: () => void;
}

export function ConceptSlides({ slides, onDone }: Props) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500">
          {index + 1} / {slides.length}
        </span>
        <button
          type="button"
          onClick={onDone}
          className="text-xs text-zinc-500 underline hover:text-zinc-300"
        >
          Skip to simulator
        </button>
      </div>
      <h3 className="text-lg font-semibold text-zinc-100">{slide.title}</h3>
      <p className="text-sm leading-relaxed text-zinc-300">{slide.body}</p>
      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800 disabled:opacity-30"
        >
          ◀ Back
        </button>
        <button
          type="button"
          onClick={() => (isLast ? onDone() : setIndex((i) => i + 1))}
          className="rounded-md bg-emerald-500 px-4 py-1.5 text-sm font-medium text-zinc-950 hover:bg-emerald-400"
        >
          {isLast ? "Start simulator" : "Next ▶"}
        </button>
      </div>
    </div>
  );
}
