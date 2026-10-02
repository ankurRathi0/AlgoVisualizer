"use client";

import { Stars } from "@react-three/drei";

interface Peak {
  x: number;
  z: number;
  scale: number;
  color: string;
}

const PEAKS: Peak[] = [
  { x: -6, z: -9, scale: 3.2, color: "#0c0a08" },
  { x: -2.5, z: -11, scale: 4, color: "#090705" },
  { x: 1.5, z: -10, scale: 3.6, color: "#0b0906" },
  { x: 5.5, z: -9.5, scale: 3, color: "#0c0a08" },
  { x: 0, z: -13, scale: 5, color: "#070605" },
];

export function Backdrop() {
  return (
    <>
      <Stars radius={60} depth={30} count={1500} factor={2} fade speed={0.3} />
      {PEAKS.map((peak, idx) => (
        <mesh key={idx} position={[peak.x, -0.75, peak.z]} rotation={[0, idx, 0]}>
          <coneGeometry args={[peak.scale, peak.scale * 1.6, 5]} />
          <meshStandardMaterial
            color={peak.color}
            emissive="#f5c451"
            emissiveIntensity={0.05}
            roughness={0.9}
            metalness={0}
          />
        </mesh>
      ))}
    </>
  );
}
