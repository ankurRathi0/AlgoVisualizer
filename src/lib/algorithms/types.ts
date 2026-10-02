// Shared contracts every algorithm + narration template relies on.
// Algorithms emit StepEvents (facts only). Narration templates turn
// events into prose. Keeping these separate is what lets one event
// log support multiple explanation styles and custom input for free.

export type NarrationStyle = "mathy" | "intuitive" | "story";

/** Base fields every step event carries, regardless of algorithm. */
export interface BaseStepEvent {
  op: string;
  /** Invariant the algorithm guarantees is upheld after this step. */
  invariantMaintained?: string;
  /** What this step contributes toward the overall goal. */
  progressNote?: string;
}

export interface CompareEvent extends BaseStepEvent {
  op: "compare";
  i: number;
  j: number;
  a: number;
  b: number;
}

export interface SwapEvent extends BaseStepEvent {
  op: "swap";
  i: number;
  j: number;
  a: number;
  b: number;
  reason: "local-order-violation";
}

export interface NoSwapEvent extends BaseStepEvent {
  op: "no-swap";
  i: number;
  j: number;
  a: number;
  b: number;
}

export interface PassCompleteEvent extends BaseStepEvent {
  op: "pass-complete";
  pass: number;
  sortedTailFrom: number;
}

export type BubbleSortStepEvent =
  | CompareEvent
  | SwapEvent
  | NoSwapEvent
  | PassCompleteEvent;

/** Pairs a step event with the pseudocode line(s) it corresponds to and
 * a snapshot of the data structure's state right after the step runs. */
export interface Step<TEvent extends BaseStepEvent, TState> {
  stepNumber: number;
  event: TEvent;
  pseudocodeLines: number[];
  state: TState;
}

export interface PseudocodeLine {
  line: number;
  text: string;
}

export interface AlgorithmRun<TEvent extends BaseStepEvent, TState> {
  steps: Step<TEvent, TState>[];
  pseudocode: PseudocodeLine[];
  result: TState;
}
