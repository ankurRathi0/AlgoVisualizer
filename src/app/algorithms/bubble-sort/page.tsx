"use client";

import { useState } from "react";
import Link from "next/link";
import { ConceptSlides } from "@/components/ConceptSlides";
import { BubbleSortSimulator } from "@/components/BubbleSortSimulator";
import { BUBBLE_SORT_CONCEPT } from "@/lib/algorithms/concepts/bubbleSortConcept";

export default function BubbleSortPage() {
  const [showSimulator, setShowSimulator] = useState(false);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300">
        ← Back
      </Link>
      <h1 className="text-2xl font-bold text-zinc-100">Bubble Sort</h1>

      {!showSimulator ? (
        <ConceptSlides slides={BUBBLE_SORT_CONCEPT} onDone={() => setShowSimulator(true)} />
      ) : (
        <>
          <button
            type="button"
            onClick={() => setShowSimulator(false)}
            className="self-start text-xs text-zinc-500 underline hover:text-zinc-300"
          >
            ← Back to explanation
          </button>
          <BubbleSortSimulator />
        </>
      )}
    </main>
  );
}
