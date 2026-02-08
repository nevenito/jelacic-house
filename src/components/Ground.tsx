import { Plane, Circle } from '@react-three/drei';
import * as THREE from 'three';

export function Ground() {
  return (
    <group>
      {/* Main ground plane */}
      <Plane
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#1a1a1f"
          roughness={0.9}
          metalness={0.1}
        />
      </Plane>

      {/* Cobblestone path to the house */}
      <Plane
        args={[4, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 13]}
        receiveShadow
      >
        <meshStandardMaterial color="#2a2520" roughness={1} />
      </Plane>

      {/* Garden circles */}
      {[[-8, 8], [8, 8]].map(([x, z], i) => (
        <Circle
          key={i}
          args={[3, 32]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[x, 0.02, z]}
        >
          <meshStandardMaterial color="#1a2518" roughness={0.95} />
        </Circle>
      ))}

      {/* Decorative hedge outlines */}
      {[
        [-12, 0, 0, 0.5, 1, 20],
        [12, 0, 0, 0.5, 1, 20],
        [0, 0, -12, 20, 1, 0.5],
      ].map(([x, y, z, w, h, d], i) => (
        <mesh
          key={i}
          position={[x, y + 0.5, z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#1a2a18" roughness={0.9} />
        </mesh>
      ))}

      {/* Fountain base in front */}
      <group position={[0, 0, 15]}>
        <mesh position={[0, 0.3, 0]} receiveShadow>
          <cylinderGeometry args={[2, 2.5, 0.6, 24]} />
          <meshStandardMaterial color="#3a3530" roughness={0.7} />
        </mesh>
        {/* Water */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 0.2, 24]} />
          <meshStandardMaterial
            color="#1a2a3a"
            roughness={0.1}
            metalness={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Center piece */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 1.5, 12]} />
          <meshStandardMaterial color="#4a4540" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
