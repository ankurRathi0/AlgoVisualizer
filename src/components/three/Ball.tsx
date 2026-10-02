"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export type BallRole = "idle" | "compare" | "swap" | "no-swap" | "locked";

const ROLE_STYLE: Record<BallRole, { color: string; emissive: string; intensity: number }> = {
  idle: { color: "#1c1917", emissive: "#f5c451", intensity: 0 },
  compare: { color: "#2a2520", emissive: "#f5c451", intensity: 0.5 },
  swap: { color: "#3a2f1a", emissive: "#ffcf5c", intensity: 1.3 },
  "no-swap": { color: "#211e1a", emissive: "#f5c451", intensity: 0.18 },
  locked: { color: "#27210f", emissive: "#f5c451", intensity: 0.55 },
};

const ARC_DURATION = 0.45; // seconds
const ARC_HEIGHT = 1.4;
const RADIUS = 0.55;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface Props {
  value: number;
  targetX: number;
  role: BallRole;
}

export function Ball({ value, targetX, role }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const fromX = useRef(targetX);
  const toX = useRef(targetX);
  const startTime = useRef(0);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      fromX.current = targetX;
      toX.current = targetX;
      return;
    }
    if (toX.current !== targetX) {
      fromX.current = toX.current;
      toX.current = targetX;
      startTime.current = performance.now() / 1000;
    }
  }, [targetX]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    const now = performance.now() / 1000;
    const elapsed = now - startTime.current;
    const t = Math.min(1, Math.max(0, elapsed / ARC_DURATION));
    const eased = easeInOutCubic(t);
    const x = THREE.MathUtils.lerp(fromX.current, toX.current, eased);
    const arc = Math.sin(Math.PI * t) * ARC_HEIGHT * (fromX.current === toX.current ? 0 : 1);
    group.position.x = x;
    group.position.y = arc;
  });

  const style = ROLE_STYLE[role];
  const scale = role === "swap" ? 1.12 : role === "compare" ? 1.05 : 1;

  return (
    <group ref={groupRef} position={[targetX, 0, 0]}>
      <mesh scale={scale} castShadow>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <meshStandardMaterial
          color={style.color}
          emissive={style.emissive}
          emissiveIntensity={style.intensity}
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>
      <Text
        position={[0, 0, RADIUS + 0.02]}
        fontSize={0.42}
        color={role === "idle" ? "#f5c451" : "#fff4d6"}
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>
    </group>
  );
}
