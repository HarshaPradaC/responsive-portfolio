import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  speed: number;
  char: string;
  offset: number;
}

function Particles() {
  const groupRef = useRef<THREE.Group>(null);

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 80 }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 5
      ),
      speed: 0.2 + Math.random() * 0.4,
      char: Math.random() > 0.5 ? '0' : '1',
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const children = groupRef.current.children;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < children.length; i++) {
      const p = particles[i];
      const child = children[i];

      child.position.y += p.speed * 0.01;
      child.position.x = p.position.x + Math.sin(time * 0.5 + p.offset) * 0.5;

      // Reset when going off screen
      if (child.position.y > 7) {
        child.position.y = -7;
      }

      // Fade based on y position
      const material = (child as THREE.Mesh).material;
      if (material && 'opacity' in material) {
        const dist = Math.abs(child.position.y) / 7;
        (material as THREE.MeshBasicMaterial).opacity = (1 - dist) * 0.3;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Text
          key={i}
          position={p.position}
          fontSize={0.3}
          color="#d4a843"
          font="https://fonts.gstatic.com/s/ibmplexmono/v19/-F63fjptAgt5VM-kVkqdyU8n5ig.woff2"
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={0.2}
        >
          {p.char}
        </Text>
      ))}
    </group>
  );
}

export function BinaryParticles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <Particles />
    </Canvas>
  );
}
