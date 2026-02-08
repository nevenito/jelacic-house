import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Stars,
  Sparkles,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { House } from './components/House';
import { Ground } from './components/Ground';
import { InfoPanel } from './components/InfoPanel';
import { LoadingScreen } from './components/LoadingScreen';
import { HUD } from './components/HUD';

// Simple 3D Title component
function Title3D() {
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={[0, 10, 0]}>
        <boxGeometry args={[8, 1.5, 0.5]} />
        <meshStandardMaterial 
          color="#D4A84B" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#D4A84B"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  return (
    <div className="w-full h-full relative">
      {/* Loading Screen */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [15, 8, 15], fov: 50 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#B8A9C8" />
          <pointLight position={[0, 5, 10]} intensity={0.3} color="#D4A84B" />

          {/* Environment */}
          <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
          <Sparkles count={50} scale={20} size={2} speed={0.3} color="#D4A84B" />
          
          {/* Fog for atmosphere */}
          <fog attach="fog" args={['#0a0a0f', 25, 100]} />

          {/* Main Scene */}
          <House onRoomClick={setActiveRoom} />
          <Ground />
          <Title3D />

          {/* Post-processing */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.9} intensity={0.3} levels={5} />
            <Vignette eskil={false} offset={0.1} darkness={0.4} />
          </EffectComposer>

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            minDistance={10}
            maxDistance={50}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate
            autoRotateSpeed={0.3}
          />

          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <HUD />
      
      {/* Info Panel */}
      <AnimatePresence>
        {activeRoom && (
          <InfoPanel room={activeRoom} onClose={() => setActiveRoom(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
