"use client"

import { useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment } from "@react-three/drei"
import type * as THREE from "three"

function ShoeModel() {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef}>
      {/* Shoe body - simplified geometric representation */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.5, 2]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Shoe sole */}
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.1, 2.1]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Shoe toe cap */}
      <mesh position={[0, 0.1, 1.1]} castShadow receiveShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#A0522D" metalness={0.2} roughness={0.5} />
      </mesh>

      {/* Accent stripe */}
      <mesh position={[0.65, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.4, 1.8]} />
        <meshStandardMaterial color="#FF6B35" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Heel */}
      <mesh position={[0, -0.2, -0.9]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.1} roughness={0.8} />
      </mesh>
    </group>
  )
}

export default function ShoeViewer3D() {
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }} shadows dpr={[1, 2]} className="w-full h-full">
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow shadow-mapSize={2048} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />

        {/* Environment */}
        <Environment preset="studio" />

        {/* Model with controls */}
        <PresentationControls
          speed={1.5}
          global
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[0, Math.PI / 2]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <ShoeModel />
        </PresentationControls>

        {/* Orbit controls for manual interaction */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={autoRotate}
          autoRotateSpeed={4}
          minDistance={2}
          maxDistance={8}
        />
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/50 backdrop-blur px-4 py-2 rounded-lg">
        <p className="text-white text-sm">Drag to rotate • Scroll to zoom</p>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="bg-accent text-accent-foreground px-3 py-1 rounded text-sm hover:bg-accent/90 transition"
        >
          {autoRotate ? "Pause" : "Auto Rotate"}
        </button>
      </div>
    </div>
  )
}
