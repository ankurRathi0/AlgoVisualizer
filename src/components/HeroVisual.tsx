"use client";

import dynamic from "next/dynamic";
import type { CompareEvent } from "@/lib/algorithms/types";

const ArrayScene3D = dynamic(
  () => import("./three/ArrayScene3D").then((m) => m.ArrayScene3D),
  { ssr: false },
);

const HERO_VALUES = [4, 8, 15, 16, 23, 42];

const HERO_EVENT: CompareEvent = {
  op: "compare",
  i: 2,
  j: 3,
  a: HERO_VALUES[2],
  b: HERO_VALUES[3],
};

export function HeroVisual() {
  return (
    <ArrayScene3D
      originalValues={HERO_VALUES}
      ids={HERO_VALUES.map((_, idx) => idx)}
      event={HERO_EVENT}
      lockedFrom={HERO_VALUES.length - 1}
    />
  );
}
