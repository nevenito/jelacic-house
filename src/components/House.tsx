import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Cone, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface HouseProps {
  onRoomClick: (room: string) => void;
}

// Stylized Croatian palace/manor inspired building
export function House({ onRoomClick }: HouseProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const handleClick = (room: string) => {
    onRoomClick(room);
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Building - Central Hall */}
      <RoundedBox
        args={[8, 6, 10]}
        radius={0.2}
        smoothness={4}
        position={[0, 3, 0]}
        castShadow
        receiveShadow
        onClick={() => handleClick('main-hall')}
        onPointerOver={() => setHovered('main-hall')}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial
          color={hovered === 'main-hall' ? '#e8e0d0' : '#d4cfc5'}
          roughness={0.8}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Roof - Main Building */}
      <Cone
        args={[7, 4, 4]}
        position={[0, 8, 0]}
        rotation={[0, Math.PI / 4, 0]}
        castShadow
      >
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </Cone>

      {/* Left Tower */}
      <group position={[-6, 0, -3]}>
        <Cylinder
          args={[2.5, 2.5, 10, 16]}
          position={[0, 5, 0]}
          castShadow
          receiveShadow
          onClick={() => handleClick('library')}
          onPointerOver={() => setHovered('library')}
          onPointerOut={() => setHovered(null)}
        >
          <meshStandardMaterial
            color={hovered === 'library' ? '#e8e0d0' : '#d4cfc5'}
            roughness={0.8}
          />
        </Cylinder>
        {/* Tower Roof */}
        <Cone args={[3, 4, 16]} position={[0, 12, 0]} castShadow>
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </Cone>
        {/* Flag Pole */}
        <Cylinder args={[0.1, 0.1, 3]} position={[0, 15, 0]}>
          <meshStandardMaterial color="#333" metalness={0.8} />
        </Cylinder>
        {/* Croatian Flag */}
        <Box args={[1.5, 1, 0.05]} position={[0.8, 15, 0]}>
          <meshStandardMaterial color="#FF0000" />
        </Box>
      </group>

      {/* Right Tower */}
      <group position={[6, 0, -3]}>
        <Cylinder
          args={[2.5, 2.5, 10, 16]}
          position={[0, 5, 0]}
          castShadow
          receiveShadow
          onClick={() => handleClick('war-room')}
          onPointerOver={() => setHovered('war-room')}
          onPointerOut={() => setHovered(null)}
        >
          <meshStandardMaterial
            color={hovered === 'war-room' ? '#e8e0d0' : '#d4cfc5'}
            roughness={0.8}
          />
        </Cylinder>
        <Cone args={[3, 4, 16]} position={[0, 12, 0]} castShadow>
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </Cone>
      </group>

      {/* Front Extension - Entry Hall */}
      <RoundedBox
        args={[6, 4, 4]}
        radius={0.15}
        position={[0, 2, 6]}
        castShadow
        receiveShadow
        onClick={() => handleClick('entry')}
        onPointerOver={() => setHovered('entry')}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial
          color={hovered === 'entry' ? '#e8e0d0' : '#d4cfc5'}
          roughness={0.8}
        />
      </RoundedBox>

      {/* Entry Columns */}
      {[-1.5, 1.5].map((x) => (
        <Cylinder
          key={x}
          args={[0.3, 0.4, 4]}
          position={[x, 2, 8.2]}
          castShadow
        >
          <meshStandardMaterial color="#c0b8a8" roughness={0.6} metalness={0.2} />
        </Cylinder>
      ))}

      {/* Windows - Main Building */}
      {[[-2, 3, 5.1], [2, 3, 5.1], [-2, 5, 5.1], [2, 5, 5.1]].map((pos, i) => (
        <RoundedBox
          key={i}
          args={[1.2, 1.8, 0.1]}
          radius={0.1}
          position={pos as [number, number, number]}
        >
          <meshStandardMaterial
            color="#1a1a2e"
            emissive="#D4A84B"
            emissiveIntensity={0.3}
            roughness={0.1}
          />
        </RoundedBox>
      ))}

      {/* Door */}
      <RoundedBox args={[1.5, 3, 0.2]} radius={0.1} position={[0, 1.5, 8.1]}>
        <meshStandardMaterial color="#4a3c2a" roughness={0.7} />
      </RoundedBox>

      {/* Decorative Elements - Gold accents */}
      <Box args={[10, 0.2, 0.3]} position={[0, 6.1, 5]}>
        <meshStandardMaterial color="#D4A84B" metalness={0.9} roughness={0.1} />
      </Box>

      {/* Coat of Arms above door */}
      <group position={[0, 4.5, 8.2]}>
        <Box args={[1.2, 1.2, 0.3]}>
          <meshStandardMaterial color="#D4A84B" metalness={0.8} roughness={0.2} />
        </Box>
        {/* Checkered pattern hint */}
        <Box args={[0.4, 0.4, 0.05]} position={[-0.25, 0.25, 0.18]}>
          <meshStandardMaterial color="#FF0000" />
        </Box>
        <Box args={[0.4, 0.4, 0.05]} position={[0.25, -0.25, 0.18]}>
          <meshStandardMaterial color="#FF0000" />
        </Box>
      </group>

      {/* Glowing orbs for magical effect */}
      {[[-8, 8, 0], [8, 8, 0], [0, 14, 0]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.3, 16, 16]} />
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
