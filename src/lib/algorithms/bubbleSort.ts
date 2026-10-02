import type {
  AlgorithmRun,
  BubbleSortStepEvent,
  PseudocodeLine,
  Step,
} from "./types";

export const BUBBLE_SORT_PSEUDOCODE: PseudocodeLine[] = [
  { line: 1, text: "for pass = 0 to n-2:" },
  { line: 2, text: "  for j = 0 to n-pass-2:" },
  { line: 3, text: "    if arr[j] > arr[j+1]:" },
  { line: 4, text: "      swap(arr[j], arr[j+1])" },
  { line: 5, text: "  // pass complete, tail is sorted" },
];

export function runBubbleSort(
  input: number[],
): AlgorithmRun<BubbleSortStepEvent, number[]> {
  const arr = [...input];
  const steps: Step<BubbleSortStepEvent, number[]>[] = [];
  let stepNumber = 0;

  const pushStep = (event: BubbleSortStepEvent, pseudocodeLines: number[]) => {
    stepNumber += 1;
    steps.push({ stepNumber, event, pseudocodeLines, state: [...arr] });
  };

  const n = arr.length;
  for (let pass = 0; pass < n - 1; pass++) {
    for (let j = 0; j < n - pass - 1; j++) {
      const a = arr[j];
      const b = arr[j + 1];

      pushStep(
        {
          op: "compare",
          i: j,
          j: j + 1,
          a,
          b,
          progressNote: `Checking whether index ${j} and ${j + 1} are in order.`,
        },
        [2, 3],
      );

      if (a > b) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        pushStep(
          {
            op: "swap",
            i: j,
            j: j + 1,
            a: arr[j],
            b: arr[j + 1],
            reason: "local-order-violation",
            invariantMaintained: `Everything before index ${j} is untouched and still correctly ordered.`,
            progressNote: `The larger value is pushed one step closer to its final sorted position.`,
          },
          [3, 4],
        );
      } else {
        pushStep(
          {
            op: "no-swap",
            i: j,
            j: j + 1,
            a,
            b,
            invariantMaintained: `Order between index ${j} and ${j + 1} already holds.`,
          },
          [3],
        );
      }
    }

    pushStep(
      {
        op: "pass-complete",
        pass,
        sortedTailFrom: n - pass - 1,
        progressNote: `Pass ${pass + 1} finished: the largest remaining value is now in its final spot.`,
      },
      [5],
    );
  }

  return { steps, pseudocode: BUBBLE_SORT_PSEUDOCODE, result: arr };
}
