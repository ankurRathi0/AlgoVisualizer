"use client";

import { useMemo, useState } from "react";
import { runBubbleSort } from "@/lib/algorithms/bubbleSort";
import { narrate } from "@/lib/algorithms/narration/bubbleSortNarration";
import type { NarrationStyle } from "@/lib/algorithms/types";
import { ArrayView } from "./ArrayView";
import { PseudocodePanel } from "./PseudocodePanel";
import { StyleSelector } from "./StyleSelector";

const DEFAULT_INPUT = [5, 2, 8, 1, 9, 3];

function parseInput(raw: string): number[] | null {
  const parts = raw
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (parts.length < 2 || parts.length > 15) return null;
  const nums = parts.map(Number);
  if (nums.some((n) => Number.isNaN(n))) return null;
  return nums;
}

export function BubbleSortSimulator() {
  const [input, setInput] = useState<number[]>(DEFAULT_INPUT);
  const [inputText, setInputText] = useState(DEFAULT_INPUT.join(", "));
  const [inputError, setInputError] = useState<string | null>(null);
  const [style, setStyle] = useState<NarrationStyle>("intuitive");
  const [stepIndex, setStepIndex] = useState(0);

  const run = useMemo(() => runBubbleSort(input), [input]);
  const totalSteps = run.steps.length;
  const current = run.steps[stepIndex];

  const applyCustomInput = () => {
    const parsed = parseInput(inputText);
    if (!parsed) {
      setInputError("Enter 2-15 comma-separated numbers, e.g. 5, 2, 8, 1");
      return;
    }
    setInputError(null);
    setInput(parsed);
    setStepIndex(0);
  };

  const goTo = (idx: number) => {
    setStepIndex(Math.max(0, Math.min(totalSteps - 1, idx)));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">
            Custom input (comma-separated numbers)
          </label>
          <div className="flex gap-2">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-72 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-sm text-zinc-100 outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={applyCustomInput}
              className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-100 hover:bg-zinc-700"
            >
              Run
            </button>
          </div>
          {inputError && <span className="text-xs text-red-400">{inputError}</span>}
        </div>
        <StyleSelector value={style} onChange={setStyle} />
      </div>

      <ArrayView values={current.state} event={current.event} />

      <PseudocodePanel lines={run.pseudocode} activeLines={current.pseudocodeLines} />

      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <p className="text-sm text-zinc-200">{narrate(current.event, style)}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>
            Step {current.stepNumber} of {totalSteps}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={totalSteps - 1}
          value={stepIndex}
          onChange={(e) => goTo(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(0)}
            disabled={stepIndex === 0}
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800 disabled:opacity-30"
          >
            ⏮ First
          </button>
          <button
            type="button"
            onClick={() => goTo(stepIndex - 1)}
            disabled={stepIndex === 0}
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800 disabled:opacity-30"
          >
            ◀ Prev
          </button>
          <button
            type="button"
            onClick={() => goTo(stepIndex + 1)}
            disabled={stepIndex === totalSteps - 1}
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800 disabled:opacity-30"
          >
            Next ▶
          </button>
          <button
            type="button"
            onClick={() => goTo(totalSteps - 1)}
            disabled={stepIndex === totalSteps - 1}
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800 disabled:opacity-30"
          >
            Last ⏭
          </button>
        </div>
      </div>
    </div>
  );
}
