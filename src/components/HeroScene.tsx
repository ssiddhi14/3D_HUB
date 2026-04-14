import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";

const AnimatedSphere = () => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <mesh scale={2.2}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#f97316"
        roughness={0.1}
        metalness={0.8}
        distort={0.3}
        speed={2}
      />
    </mesh>
  </Float>
);

const HeroScene = () => (
  <div className="absolute inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#f97316" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ff6b00" />
      <Suspense fallback={null}>
        <AnimatedSphere />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  </div>
);

export default HeroScene;
