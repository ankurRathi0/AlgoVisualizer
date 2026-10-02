export interface ConceptSlide {
  title: string;
  body: string;
}

export const BUBBLE_SORT_CONCEPT: ConceptSlide[] = [
  {
    title: "What is Bubble Sort?",
    body: "Bubble Sort repeatedly steps through a list, comparing adjacent pairs and swapping them if they're in the wrong order. Larger values 'bubble up' toward the end with each pass.",
  },
  {
    title: "Why does it work?",
    body: "Each full pass guarantees the largest remaining unsorted value reaches its correct final position. After k passes, the last k elements are guaranteed sorted — that's the invariant driving correctness.",
  },
  {
    title: "Complexity",
    body: "Worst and average case: O(n²) comparisons/swaps, since every pass scans the remaining unsorted region. Best case (already sorted): O(n) if you add an early-exit check. Space: O(1), sorts in place.",
  },
  {
    title: "When is it used?",
    body: "Rarely in production — it's outperformed by O(n log n) sorts. It's taught because its mechanics (comparisons, swaps, invariants) are the simplest possible introduction to how sorting algorithms reason about correctness.",
  },
];
