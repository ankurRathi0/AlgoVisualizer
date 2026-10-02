"use client";

import { useState } from "react";
import type { ConceptSlide } from "@/lib/algorithms/concepts/bubbleSortConcept";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface Props {
  slides: ConceptSlide[];
  onDone: () => void;
}

export function ConceptSlides({ slides, onDone }: Props) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  return (
    <Card className="border border-amber-500/20">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {index + 1} / {slides.length}
          </span>
          <Button type="button" variant="link" onClick={onDone} className="h-auto p-0 text-xs">
            Skip to simulator
          </Button>
        </div>
        <h3 className="text-lg font-semibold text-primary">{slide.title}</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/80">
          {slide.body}
        </p>
        <div className="flex justify-between pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            ◀ Back
          </Button>
          <Button type="button" onClick={() => (isLast ? onDone() : setIndex((i) => i + 1))}>
            {isLast ? "Start simulator" : "Next ▶"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
