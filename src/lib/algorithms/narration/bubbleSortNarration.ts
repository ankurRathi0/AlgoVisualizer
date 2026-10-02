import type { BubbleSortStepEvent, NarrationStyle } from "../types";

type Narrator = (event: BubbleSortStepEvent) => string;

const mathy: Narrator = (event) => {
  switch (event.op) {
    case "compare":
      return `A[${event.i}]=${event.a} vs A[${event.j}]=${event.b}. Testing A[${event.i}] > A[${event.j}].`;
    case "swap":
      return `A[${event.j - 1}] > A[${event.j}] held, so swap to enforce A[${event.i}] ≤ A[${event.j}]. ${event.invariantMaintained ?? ""}`;
    case "no-swap":
      return `A[${event.i}] ≤ A[${event.j}] already holds; no mutation required. ${event.invariantMaintained ?? ""}`;
    case "pass-complete":
      return `Pass ${event.pass + 1} complete. Invariant: A[${event.sortedTailFrom}..n-1] is sorted and ≥ all earlier elements.`;
  }
};

const intuitive: Narrator = (event) => {
  switch (event.op) {
    case "compare":
      return `Comparing index ${event.i} (${event.a}) with index ${event.j} (${event.b}).`;
    case "swap":
      return `${event.b} and ${event.a} were out of order, so we swapped them. ${event.progressNote ?? ""}`;
    case "no-swap":
      return `${event.a} ≤ ${event.b}, already in the right order — nothing to do here.`;
    case "pass-complete":
      return event.progressNote ?? `Pass ${event.pass + 1} finished.`;
  }
};

const story: Narrator = (event) => {
  switch (event.op) {
    case "compare":
      return `We peek at the two neighbors standing at spots ${event.i} and ${event.j}: ${event.a} and ${event.b}.`;
    case "swap":
      return `${event.b} is cutting in line ahead of smaller ${event.a} — not allowed! They trade places.`;
    case "no-swap":
      return `${event.a} politely lets ${event.b} stay ahead — they're already in the right order.`;
    case "pass-complete":
      return `End of the lap: the biggest troublemaker has been marched all the way to the back, into its final seat.`;
  }
};

const NARRATORS: Record<NarrationStyle, Narrator> = { mathy, intuitive, story };

export function narrate(event: BubbleSortStepEvent, style: NarrationStyle): string {
  return NARRATORS[style](event);
}
