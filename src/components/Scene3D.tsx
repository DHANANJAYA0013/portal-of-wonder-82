import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#00e5ff"
          attach="material"
          distort={0.35}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

interface Scene3DProps {
  className?: string;
  minimal?: boolean;
}

const Scene3D = ({ className = '', minimal = false }: Scene3DProps) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7c3aed" />
          {!minimal && <AnimatedSphere />}
          <Stars radius={80} depth={50} count={minimal ? 1500 : 2500} factor={4} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
