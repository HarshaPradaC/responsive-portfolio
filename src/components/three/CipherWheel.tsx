import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const OUTER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const INNER_CHARS = '0123456789ZYXWVUTSRQPONMLK';

function Ring({
  radius,
  chars,
  speed,
  color,
}: {
  radius: number;
  chars: string;
  speed: number;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += speed * delta;
    }
  });

  const letters = useMemo(() => {
    return chars.split('').map((char, i) => {
      const angle = (i / chars.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { char, x, y, angle };
    });
  }, [chars, radius]);

  return (
    <group ref={groupRef}>
      {/* Ring circle */}
      <mesh>
        <ringGeometry args={[radius - 0.15, radius + 0.15, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>

      {/* Letters */}
      {letters.map((l, i) => (
        <Text
          key={i}
          position={[l.x, l.y, 0]}
          rotation={[0, 0, l.angle - Math.PI / 2]}
          fontSize={0.25}
          color={color}
          font="https://fonts.gstatic.com/s/ibmplexmono/v19/-F63fjptAgt5VM-kVkqdyU8n5ig.woff2"
          anchorX="center"
          anchorY="middle"
        >
          {l.char}
        </Text>
      ))}
    </group>
  );
}

function CipherWheelScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Ring radius={2.8} chars={OUTER_CHARS} speed={0.15} color="#d4a843" />
      <Ring radius={2.0} chars={INNER_CHARS} speed={-0.1} color="#39ff6b" />
      <Ring radius={1.3} chars="HPC-2025-042" speed={0.08} color="#8a8070" />

      {/* Center dot */}
      <mesh>
        <circleGeometry args={[0.15, 32]} />
        <meshBasicMaterial color="#d4a843" />
      </mesh>

      {/* Crosshairs */}
      <mesh>
        <planeGeometry args={[0.02, 1]} />
        <meshBasicMaterial color="#d4a843" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[0.02, 1]} />
        <meshBasicMaterial color="#d4a843" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function CipherWheel() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <CipherWheelScene />
    </Canvas>
  );
}
