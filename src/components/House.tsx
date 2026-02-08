import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HouseProps {
  onRoomClick: (room: string) => void;
}

// Stylized Croatian palace/manor inspired building
export function House({ onRoomClick }: HouseProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Building - Central Hall */}
      <mesh
        position={[0, 3, 0]}
        castShadow
        receiveShadow
        onClick={() => onRoomClick('main-hall')}
      >
        <boxGeometry args={[8, 6, 10]} />
        <meshStandardMaterial color="#d4cfc5" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Roof - Main Building (pyramid shape) */}
      <mesh position={[0, 7.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[7, 3, 4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>

      {/* Left Tower */}
      <group position={[-6, 0, -3]}>
        <mesh position={[0, 5, 0]} castShadow receiveShadow onClick={() => onRoomClick('library')}>
          <cylinderGeometry args={[2.5, 2.5, 10, 16]} />
          <meshStandardMaterial color="#d4cfc5" roughness={0.8} />
        </mesh>
        {/* Tower Roof */}
        <mesh position={[0, 11.5, 0]} castShadow>
          <coneGeometry args={[3, 3, 16]} />
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </mesh>
        {/* Flag Pole */}
        <mesh position={[0, 14, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 2.5]} />
          <meshStandardMaterial color="#333" metalness={0.8} />
        </mesh>
        {/* Croatian Flag */}
        <mesh position={[0.7, 14, 0]}>
          <boxGeometry args={[1.2, 0.8, 0.02]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
      </group>

      {/* Right Tower */}
      <group position={[6, 0, -3]}>
        <mesh position={[0, 5, 0]} castShadow receiveShadow onClick={() => onRoomClick('war-room')}>
          <cylinderGeometry args={[2.5, 2.5, 10, 16]} />
          <meshStandardMaterial color="#d4cfc5" roughness={0.8} />
        </mesh>
        <mesh position={[0, 11.5, 0]} castShadow>
          <coneGeometry args={[3, 3, 16]} />
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </mesh>
      </group>

      {/* Front Extension - Entry Hall */}
      <mesh
        position={[0, 2, 6]}
        castShadow
        receiveShadow
        onClick={() => onRoomClick('entry')}
      >
        <boxGeometry args={[6, 4, 4]} />
        <meshStandardMaterial color="#d4cfc5" roughness={0.8} />
      </mesh>

      {/* Entry Columns */}
      {[-1.5, 1.5].map((x) => (
        <mesh key={x} position={[x, 2, 8.2]} castShadow>
          <cylinderGeometry args={[0.3, 0.4, 4]} />
          <meshStandardMaterial color="#c0b8a8" roughness={0.6} metalness={0.2} />
        </mesh>
      ))}

      {/* Windows - Main Building (glowing) */}
      {[[-2, 3, 5.05], [2, 3, 5.05], [-2, 5, 5.05], [2, 5, 5.05]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[1.2, 1.8, 0.1]} />
          <meshStandardMaterial
            color="#1a1a2e"
            emissive="#D4A84B"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Door */}
      <mesh position={[0, 1.5, 8.05]}>
        <boxGeometry args={[1.5, 3, 0.1]} />
        <meshStandardMaterial color="#4a3c2a" roughness={0.7} />
      </mesh>

      {/* Gold trim above door */}
      <mesh position={[0, 6.05, 5]}>
        <boxGeometry args={[10, 0.2, 0.3]} />
        <meshStandardMaterial color="#D4A84B" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Coat of Arms above door */}
      <group position={[0, 4.5, 8.15]}>
        <mesh>
          <boxGeometry args={[1.2, 1.2, 0.2]} />
          <meshStandardMaterial color="#D4A84B" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Checkered pattern hint */}
        <mesh position={[-0.25, 0.25, 0.12]}>
          <boxGeometry args={[0.35, 0.35, 0.02]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
        <mesh position={[0.25, -0.25, 0.12]}>
          <boxGeometry args={[0.35, 0.35, 0.02]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
      </group>

      {/* Glowing orbs for magical effect */}
      {[[-8, 9, 0], [8, 9, 0], [0, 13, 0]].map((pos, i) => (
        <mesh key={`orb-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color="#B8A9C8"
            emissive="#B8A9C8"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}
