"use client";

import { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";

export type BallRole = "idle" | "compare" | "swap" | "no-swap" | "locked";

const ROLE_STYLE: Record<BallRole, { color: string; emissive: string; intensity: number }> = {
  idle: { color: "#141210", emissive: "#f5c451", intensity: 0.45 },
  compare: { color: "#2a2520", emissive: "#f5c451", intensity: 1.1 },
  swap: { color: "#3a2f1a", emissive: "#ffcf5c", intensity: 2.2 },
  "no-swap": { color: "#211e1a", emissive: "#f5c451", intensity: 0.6 },
  locked: { color: "#27210f", emissive: "#f5c451", intensity: 1.3 },
};

const ARC_HEIGHT = 1.4;
const RADIUS = 0.55;

interface Props {
  value: number;
  targetX: number;
  role: BallRole;
}

export function Ball({ value, targetX, role }: Props) {
  const hasMounted = useRef(false);
  const [spring, api] = useSpring(() => ({
    x: targetX,
    y: 0,
    config: { tension: 260, friction: 20 },
  }));

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    api.start({
      to: async (next) => {
        await next({ x: targetX, y: ARC_HEIGHT, config: { tension: 300, friction: 12 } });
        await next({ y: 0, config: { tension: 220, friction: 16 } });
      },
    });
  }, [targetX, api]);

  const style = ROLE_STYLE[role];
  const scale = role === "swap" ? 1.12 : role === "compare" ? 1.05 : 1;

  return (
    <animated.group position-x={spring.x} position-y={spring.y}>
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
    </animated.group>
  );
}
