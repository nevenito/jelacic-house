import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HouseProps {
  onRoomClick: (room: string) => void;
}

export function House({ onRoomClick }: HouseProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  // Color based on hover state
  const getColor = (id: string, base: string, hover: string) => 
    hovered === id ? hover : base;

  return (
    <group ref={groupRef}>
      {/* ═══════════════════════════════════════════════════════════
          MAIN BUILDING - Central Hall
          ═══════════════════════════════════════════════════════════ */}
      <mesh
        position={[0, 3, 0]}
        castShadow
        receiveShadow
        onClick={() => onRoomClick('main-hall')}
        onPointerOver={() => setHovered('main-hall')}
        onPointerOut={() => setHovered(null)}
      >
        <boxGeometry args={[8, 6, 10]} />
        <meshStandardMaterial 
          color={getColor('main-hall', '#d4cfc5', '#e8e0d0')} 
          roughness={0.75} 
        />
      </mesh>

      {/* Main Roof */}
      <mesh position={[0, 7.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[7, 3, 4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.85} />
      </mesh>

      {/* ═══════════════════════════════════════════════════════════
          LEFT TOWER - Library
          ═══════════════════════════════════════════════════════════ */}
      <group position={[-6, 0, -3]}>
        <mesh 
          position={[0, 5, 0]} 
          castShadow 
          receiveShadow
          onClick={() => onRoomClick('library')}
          onPointerOver={() => setHovered('library')}
          onPointerOut={() => setHovered(null)}
        >
          <cylinderGeometry args={[2.5, 2.5, 10, 16]} />
          <meshStandardMaterial 
            color={getColor('library', '#d4cfc5', '#e8e0d0')} 
            roughness={0.75} 
          />
        </mesh>
        
        {/* Tower Roof */}
        <mesh position={[0, 11.5, 0]} castShadow>
          <coneGeometry args={[3, 3, 16]} />
          <meshStandardMaterial color="#8B4513" roughness={0.85} />
        </mesh>
        
        {/* Flag Pole + Flag */}
        <mesh position={[0, 14, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 2.5]} />
          <meshStandardMaterial color="#333" metalness={0.7} />
        </mesh>
        <mesh position={[0.6, 14.2, 0]}>
          <boxGeometry args={[1, 0.7, 0.02]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
      </group>

      {/* ═══════════════════════════════════════════════════════════
          RIGHT TOWER - War Room
          ═══════════════════════════════════════════════════════════ */}
      <group position={[6, 0, -3]}>
        <mesh 
          position={[0, 5, 0]} 
          castShadow 
          receiveShadow
          onClick={() => onRoomClick('war-room')}
          onPointerOver={() => setHovered('war-room')}
          onPointerOut={() => setHovered(null)}
        >
          <cylinderGeometry args={[2.5, 2.5, 10, 16]} />
          <meshStandardMaterial 
            color={getColor('war-room', '#d4cfc5', '#e8e0d0')} 
            roughness={0.75} 
          />
        </mesh>
        
        <mesh position={[0, 11.5, 0]} castShadow>
          <coneGeometry args={[3, 3, 16]} />
          <meshStandardMaterial color="#8B4513" roughness={0.85} />
        </mesh>
      </group>

      {/* ═══════════════════════════════════════════════════════════
          FRONT EXTENSION - Entry Hall
          ═══════════════════════════════════════════════════════════ */}
      <mesh
        position={[0, 2, 6]}
        castShadow
        receiveShadow
        onClick={() => onRoomClick('entry')}
        onPointerOver={() => setHovered('entry')}
        onPointerOut={() => setHovered(null)}
      >
        <boxGeometry args={[6, 4, 4]} />
        <meshStandardMaterial 
          color={getColor('entry', '#d4cfc5', '#e8e0d0')} 
          roughness={0.75} 
        />
      </mesh>

      {/* Entry Columns */}
      {[-1.5, 1.5].map((x) => (
        <mesh key={x} position={[x, 2, 8.2]} castShadow>
          <cylinderGeometry args={[0.3, 0.35, 4, 12]} />
          <meshStandardMaterial color="#c0b8a8" roughness={0.6} />
        </mesh>
      ))}

      {/* ═══════════════════════════════════════════════════════════
          DECORATIVE ELEMENTS
          ═══════════════════════════════════════════════════════════ */}
      
      {/* Windows (glowing) */}
      {[
        [-2, 3, 5.02], [2, 3, 5.02], 
        [-2, 5, 5.02], [2, 5, 5.02]
      ].map((pos, i) => (
        <mesh key={`window-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[1.1, 1.7, 0.08]} />
          <meshStandardMaterial
            color="#1a1a2e"
            emissive="#D4A84B"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {/* Door */}
      <mesh position={[0, 1.5, 8.02]}>
        <boxGeometry args={[1.4, 2.8, 0.08]} />
        <meshStandardMaterial color="#3d2d1f" roughness={0.8} />
      </mesh>

      {/* Gold Trim */}
      <mesh position={[0, 6.02, 5]}>
        <boxGeometry args={[10, 0.15, 0.25]} />
        <meshStandardMaterial color="#D4A84B" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Coat of Arms */}
      <group position={[0, 4.5, 8.1]}>
        <mesh>
          <boxGeometry args={[1.1, 1.1, 0.15]} />
          <meshStandardMaterial color="#D4A84B" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Croatian checkered pattern */}
        <mesh position={[-0.22, 0.22, 0.09]}>
          <boxGeometry args={[0.3, 0.3, 0.02]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
        <mesh position={[0.22, -0.22, 0.09]}>
          <boxGeometry args={[0.3, 0.3, 0.02]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
      </group>

      {/* Glowing orbs */}
      {[
        [-7, 13, -3], 
        [7, 13, -3], 
        [0, 9.5, 0]
      ].map((pos, i) => (
        <mesh key={`orb-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial
            color="#B8A9C8"
            emissive="#B8A9C8"
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  );
}
