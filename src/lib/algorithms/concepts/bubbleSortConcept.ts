export interface ConceptSlide {
  title: string;
  body: string;
}

export const BUBBLE_SORT_CONCEPT: ConceptSlide[] = [
  {
    title: "What is Bubble Sort?",
    body: "Bubble Sort repeatedly steps through a list, comparing adjacent pairs and swapping them if they're in the wrong order. Larger values 'bubble up' toward the end of the list with each full pass, like bubbles rising to the surface of water — hence the name.",
  },
  {
    title: "The core invariant",
    body: "After the 1st pass, the single largest element is guaranteed to be in its final position (the last slot).\nAfter the 2nd pass, the two largest elements are in their final positions (the last two slots).\nAfter the kth pass, the k largest elements occupy the last k slots, correctly ordered.\n\nThis is the invariant that proves correctness: each pass strictly grows the sorted tail by exactly one element, so after n-1 passes, the entire array of n elements must be sorted.",
  },
  {
    title: "Deriving the time complexity — worst case",
    body: "Count the comparisons. Pass 1 scans n-1 adjacent pairs. Pass 2 scans n-2 pairs (the last slot is already locked in). Pass 3 scans n-3 pairs, and so on, down to the final pass which scans just 1 pair.\n\nTotal comparisons = (n-1) + (n-2) + ... + 2 + 1 = n(n-1)/2.\n\nThat's a sum of consecutive integers, which is always a quadratic in n. Drop constants and lower-order terms: n(n-1)/2 = (n² - n)/2, and as n grows large the -n becomes insignificant next to n². That's where O(n²) comes from — not a rule to memorize, but the direct result of nested loops where the inner loop's bound shrinks linearly with the outer loop's progress.",
  },
  {
    title: "Best case — and why it needs a tweak",
    body: "If the input is already sorted, every comparison in a pass results in 'no swap'. The textbook version above still runs all n-1 passes regardless — it doesn't know it's done early, so it stays O(n²) even on sorted input.\n\nThe fix: add a flag that tracks whether any swap happened during a pass. If a full pass completes with zero swaps, the array is sorted — exit immediately. With this optimization, best case (already-sorted input) drops to O(n): one pass of n-1 comparisons, no swaps, done.",
  },
  {
    title: "Space complexity",
    body: "Bubble Sort sorts in place — it only swaps elements within the original array and uses a constant number of extra variables (loop counters, a temp for swapping, the optional flag). No auxiliary array proportional to n is ever allocated.\n\nSpace complexity: O(1) — constant, regardless of input size.",
  },
  {
    title: "When is it actually used?",
    body: "Almost never in production code — Merge Sort, Quick Sort, and Tim Sort (Python/Java's built-in sorts) all achieve O(n log n) average case, which beats O(n²) decisively as n grows.\n\nBubble Sort earns its place in teaching because its mechanics — pairwise comparison, swap, and a provable per-pass invariant — are the simplest possible introduction to reasoning about why a sorting algorithm is correct and how to derive its complexity from first principles, skills that transfer directly to analyzing every other algorithm you'll meet.",
  },
];
