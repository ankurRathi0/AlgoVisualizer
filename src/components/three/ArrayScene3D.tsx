"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Ball, type BallRole } from "./Ball";
import type { BubbleSortStepEvent } from "@/lib/algorithms/types";

const SPACING = 1.5;

interface Props {
  originalValues: number[];
  ids: number[]; // slot index -> element id, current step
  event: BubbleSortStepEvent | undefined;
  lockedFrom: number; // slots >= this index are part of the sorted tail
}

function roleForSlot(
  slot: number,
  event: BubbleSortStepEvent | undefined,
  lockedFrom: number,
): BallRole {
  if (slot >= lockedFrom) return "locked";
  if (!event) return "idle";
  if ("i" in event && "j" in event && (slot === event.i || slot === event.j)) {
    if (event.op === "compare") return "compare";
    if (event.op === "swap") return "swap";
    if (event.op === "no-swap") return "no-swap";
  }
  return "idle";
}

export function ArrayScene3D({ originalValues, ids, event, lockedFrom }: Props) {
  const n = ids.length;
  const centerOffset = ((n - 1) * SPACING) / 2;

  return (
    <div className="h-80 w-full overflow-hidden rounded-lg border border-amber-500/20 bg-black">
      <Canvas camera={{ position: [0, 3.2, 7.5], fov: 45 }} shadows>
        <color attach="background" args={["#030201"]} />
        <fog attach="fog" args={["#030201", 8, 18]} />
        <ambientLight intensity={0.25} color="#3a2f1a" />
        <pointLight position={[0, 5, 4]} intensity={60} color="#ffcf5c" castShadow />
        <pointLight position={[-4, 2, -3]} intensity={15} color="#8a6a1f" />

        <Grid
          position={[0, -0.75, 0]}
          args={[30, 30]}
          cellColor="#2a1f0a"
          sectionColor="#f5c451"
          sectionThickness={0.6}
          cellThickness={0.3}
          fadeDistance={14}
          infiniteGrid
        />

        {ids.map((elementId, slot) => (
          <Ball
            key={elementId}
            value={originalValues[elementId]}
            targetX={slot * SPACING - centerOffset}
            role={roleForSlot(slot, event, lockedFrom)}
          />
        ))}

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={-Math.PI / 5}
          maxAzimuthAngle={Math.PI / 5}
        />

        <EffectComposer>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.15} darkness={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
