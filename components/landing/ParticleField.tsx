"use client";

import { useRef, useEffect, Suspense, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Mouse tracker (outside React, no re-renders) ────────────────────────────
const mouse = { x: 0, y: 0 };

// ─── Particle system ─────────────────────────────────────────────────────────
interface ParticlesProps {
  count?: number;
}

const Particles = memo(function Particles({ count = 160 }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const { size } = useThree();

  // Build geometry once
  const [positions, velocities, originalPositions] = (() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8 - 4;
      pos[i * 3] = orig[i * 3] = x;
      pos[i * 3 + 1] = orig[i * 3 + 1] = y;
      pos[i * 3 + 2] = orig[i * 3 + 2] = z;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = 0;
    }
    return [pos, vel, orig];
  })();

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const geo = meshRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;

    // Map mouse NDC [-1,1] to world space
    const aspect = size.width / size.height;
    const mx = mouse.x * 10 * aspect;
    const my = mouse.y * 6;

    for (let i = 0; i < count; i++) {
      const xi = i * 3;
      const yi = xi + 1;

      // Current position drift
      posAttr.array[xi] = (posAttr.array[xi] as number) + velocities[xi];
      posAttr.array[yi] = (posAttr.array[yi] as number) + velocities[yi];

      // Soft attraction toward mouse (Antigravity core)
      const dx = mx - (posAttr.array[xi] as number);
      const dy = my - (posAttr.array[yi] as number);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const attraction = Math.max(0, 1 - dist / 6) * 0.0015;
      posAttr.array[xi] = (posAttr.array[xi] as number) + dx * attraction;
      posAttr.array[yi] = (posAttr.array[yi] as number) + dy * attraction;

      // Gentle spring back to origin
      posAttr.array[xi] = (posAttr.array[xi] as number) +
        (originalPositions[xi] - (posAttr.array[xi] as number)) * 0.003;
      posAttr.array[yi] = (posAttr.array[yi] as number) +
        (originalPositions[yi] - (posAttr.array[yi] as number)) * 0.003;

      // Wrap bounds
      if ((posAttr.array[xi] as number) > 11) posAttr.array[xi] = -11;
      if ((posAttr.array[xi] as number) < -11) posAttr.array[xi] = 11;
      if ((posAttr.array[yi] as number) > 7) posAttr.array[yi] = -7;
      if ((posAttr.array[yi] as number) < -7) posAttr.array[yi] = 7;
    }

    posAttr.needsUpdate = true;

    // Slow global rotation
    meshRef.current.rotation.z += delta * 0.005;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#60a5fa"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
});

// ─── Connection lines ─────────────────────────────────────────────────────────
const Connections = memo(function Connections() {
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = clock.getElapsedTime() * 0.03;
    lineRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
  });

  const linePositions = (() => {
    const pts: number[] = [];
    const n = 18;
    const nodes: [number, number, number][] = Array.from({ length: n }, () => [
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
    ]);

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 6) {
          pts.push(...nodes[i], ...nodes[j]);
        }
      }
    }
    return new Float32Array(pts);
  })();

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
          count={linePositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#818cf8"
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </lineSegments>
  );
});

// ─── Main export ─────────────────────────────────────────────────────────────
export default memo(function ParticleField() {
  // Track mouse in plain ref — no React state, no re-renders
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Particles count={160} />
          <Connections />
        </Suspense>
      </Canvas>
    </div>
  );
});
