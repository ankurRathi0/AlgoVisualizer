import type { BubbleSortStepEvent, Step } from "./types";

/**
 * Sorting swaps exchange elements by index, not by value (duplicates must
 * stay visually distinct balls). Replaying swap events from the start
 * recovers "which original element currently sits at slot k" so the 3D
 * scene can animate a ball travelling between slots instead of two slots
 * silently relabeling their numbers.
 */
export function elementIdsAtStep(
  steps: Step<BubbleSortStepEvent, number[]>[],
  stepIndex: number,
): number[] {
  const n = steps.length > 0 ? steps[0].state.length : 0;
  const ids = Array.from({ length: n }, (_, i) => i);

  for (let s = 0; s <= stepIndex; s++) {
    const event = steps[s].event;
    if (event.op === "swap") {
      const { i, j } = event;
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
  }

  return ids;
}

/** Earliest slot index that's part of the sorted tail as of this step. */
export function lockedFromAtStep(
  steps: Step<BubbleSortStepEvent, number[]>[],
  stepIndex: number,
): number {
  const n = steps.length > 0 ? steps[0].state.length : 0;
  let lockedFrom = n;
  for (let s = 0; s <= stepIndex; s++) {
    const event = steps[s].event;
    if (event.op === "pass-complete") {
      lockedFrom = Math.min(lockedFrom, event.sortedTailFrom);
    }
  }
  return lockedFrom;
}
