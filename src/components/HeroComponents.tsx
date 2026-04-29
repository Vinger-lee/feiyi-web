import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { stableNoise } from './three/globeUtils';

export function HeritageConstellation({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const frameCountRef = useRef(0);

  const { positions, colors } = useMemo(() => {
    const count = 200;
    const particlePositions = new Float32Array(count * 3);
    const particleColors = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color('#f5d994'),
      new THREE.Color('#d44a28'),
      new THREE.Color('#6fd0a1'),
      new THREE.Color('#fff7e8'),
    ];

    for (let index = 0; index < count; index += 1) {
      const radius = 1.4 + stableNoise(index + 1) * 2.9;
      const angle = stableNoise(index + 81) * Math.PI * 2;
      const spiral = Math.sin(radius * 2.6 + angle) * 0.42;
      particlePositions[index * 3] = Math.cos(angle) * radius;
      particlePositions[index * 3 + 1] = Math.sin(angle) * radius * 0.52 + spiral;
      particlePositions[index * 3 + 2] = (stableNoise(index + 161) - 0.5) * 2.4;

      const color = colorChoices[index % colorChoices.length];
      particleColors[index * 3] = color.r;
      particleColors[index * 3 + 1] = color.g;
      particleColors[index * 3 + 2] = color.b;
    }

    return { positions: particlePositions, colors: particleColors };
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    frameCountRef.current += 1;
    if (frameCountRef.current % 2 !== 0) return;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.045;
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.12;
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.34) * 0.12;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.024}
          vertexColors
          transparent
          opacity={0.86}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={ringsRef} rotation={[0.9, 0.15, 0.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.12, 0.006, 12, 220]} />
          <meshBasicMaterial
            color="#d44a28"
            transparent
            opacity={0.38}
          />
        </mesh>
      </group>
    </group>
  );
}

export function HeroWebglScene() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1]}
      >
        <HeritageConstellation reducedMotion={reducedMotion || false} />
      </Canvas>
    </div>
  );
}
