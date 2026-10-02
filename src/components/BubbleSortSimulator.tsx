"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { runBubbleSort } from "@/lib/algorithms/bubbleSort";
import { narrate } from "@/lib/algorithms/narration/bubbleSortNarration";
import { elementIdsAtStep, lockedFromAtStep } from "@/lib/algorithms/elementIdentity";
import type { NarrationStyle } from "@/lib/algorithms/types";
import { PseudocodePanel } from "./PseudocodePanel";
import { StyleSelector } from "./StyleSelector";
import { Button } from "./ui/button";

const Array3D = dynamic(
  () => import("./three/Array3D").then((m) => m.Array3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-80 w-full items-center justify-center rounded-lg border border-amber-500/20 bg-black text-sm text-amber-500/60">
        Loading scene…
      </div>
    ),
  },
);

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
  const ids = useMemo(
    () => elementIdsAtStep(run.steps, stepIndex),
    [run, stepIndex],
  );
  const lockedFrom = useMemo(
    () => lockedFromAtStep(run.steps, stepIndex),
    [run, stepIndex],
  );

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
              className="w-72 rounded-md border border-amber-500/20 bg-zinc-900 px-3 py-1.5 font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
            />
            <Button type="button" onClick={applyCustomInput}>
              Run
            </Button>
          </div>
          {inputError && <span className="text-xs text-red-400">{inputError}</span>}
        </div>
        <StyleSelector value={style} onChange={setStyle} />
      </div>

      <Array3D
        originalValues={input}
        ids={ids}
        event={current.event}
        lockedFrom={lockedFrom}
      />

      <PseudocodePanel lines={run.pseudocode} activeLines={current.pseudocodeLines} />

      <div className="rounded-lg border border-amber-500/20 bg-zinc-900 p-4">
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
          className="w-full accent-amber-500"
        />
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => goTo(0)} disabled={stepIndex === 0}>
            ⏮ First
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => goTo(stepIndex - 1)}
            disabled={stepIndex === 0}
          >
            ◀ Prev
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => goTo(stepIndex + 1)}
            disabled={stepIndex === totalSteps - 1}
          >
            Next ▶
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => goTo(totalSteps - 1)}
            disabled={stepIndex === totalSteps - 1}
          >
            Last ⏭
          </Button>
        </div>
      </div>
    </div>
  );
}
