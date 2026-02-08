import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { House } from './components/House';
import { Ground } from './components/Ground';
import { InfoPanel } from './components/InfoPanel';
import { LoadingScreen } from './components/LoadingScreen';
import { HUD } from './components/HUD';

// Error fallback component
function WebGLFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-background)] text-center px-6">
      <div className="text-6xl mb-4">🏰</div>
      <h1 className="text-2xl font-bold text-white mb-2">Jelačićeva Kuća</h1>
      <p className="text-[var(--color-text-secondary)] mb-4">
        3D experience requires WebGL support
      </p>
      <p className="text-sm text-[var(--color-text-secondary)]">
        Try opening on a desktop browser
      </p>
    </div>
  );
}

// Check WebGL support
function useWebGLSupport() {
  const [supported, setSupported] = useState(true);
  
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  
  return supported;
}

// 3D Scene component - separated for cleaner error handling
function Scene({ onRoomClick }: { onRoomClick: (room: string) => void }) {
  return (
    <>
      {/* Lighting - simplified */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 10]} intensity={1.2} castShadow />
      <pointLight position={[-5, 8, 5]} intensity={0.4} color="#D4A84B" />

      {/* Background */}
      <Stars radius={80} depth={40} count={1500} factor={3} fade speed={0.5} />
      <fog attach="fog" args={['#0a0a0f', 30, 120]} />

      {/* Main Scene */}
      <House onRoomClick={onRoomClick} />
      <Ground />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        minDistance={12}
        maxDistance={45}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate
        autoRotateSpeed={0.4}
        enableDamping
        dampingFactor={0.05}
      />

      <Environment preset="night" />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const webglSupported = useWebGLSupport();

  // Show fallback if WebGL not supported
  if (!webglSupported) {
    return <WebGLFallback />;
  }

  // Show fallback if canvas error
  if (hasError) {
    return <WebGLFallback />;
  }

  return (
    <div className="w-full h-full relative">
      {/* Loading Screen */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [18, 10, 18], fov: 45 }}
        shadows
        dpr={[1, 1.5]} // Lower DPR for mobile performance
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={(state) => {
          // Force a render
          state.gl.setClearColor('#0a0a0f', 1);
        }}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={null}>
          <Scene onRoomClick={setActiveRoom} />
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
