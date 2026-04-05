import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float circuit(vec2 uv, float time) {
    vec2 grid = floor(uv * 12.0);
    float h = hash(grid);

    // Horizontal and vertical traces
    vec2 f = fract(uv * 12.0);
    float line = 0.0;

    // Horizontal trace
    if (h > 0.3) {
      float progress = fract(time * 0.15 + h);
      float traceX = smoothstep(0.48, 0.5, f.y) * smoothstep(0.52, 0.5, f.y);
      line += traceX * step(f.x, progress) * 3.0;
    }

    // Vertical trace
    if (h > 0.5) {
      float progress = fract(time * 0.12 + h * 0.7);
      float traceY = smoothstep(0.48, 0.5, f.x) * smoothstep(0.52, 0.5, f.x);
      line += traceY * step(f.y, progress) * 3.0;
    }

    // Junction dots
    if (h > 0.7) {
      float dot = length(f - 0.5);
      float pulse = 0.5 + 0.5 * sin(time * 2.0 + h * 6.28);
      line += smoothstep(0.08, 0.04, dot) * pulse * 2.0;
    }

    return line;
  }

  void main() {
    float c = circuit(vUv, uTime);
    vec3 col = uColor * c * 0.4;

    // Vignette
    float vignette = 1.0 - length(vUv - 0.5) * 0.8;
    col *= vignette;

    gl_FragColor = vec4(col, c * 0.6);
  }
`;

function CircuitPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-0.5, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[16, 10, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#d4a843') },
        }}
      />
    </mesh>
  );
}

export function CircuitBoard() {
  return (
    <Canvas
      camera={{ position: [0, 3, 6], fov: 50 }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <CircuitPlane />
    </Canvas>
  );
}
