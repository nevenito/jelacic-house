export function Ground() {
  return (
    <group>
      {/* Main ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#15151a" roughness={0.95} />
      </mesh>

      {/* Cobblestone path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 12]}>
        <planeGeometry args={[3.5, 18]} />
        <meshStandardMaterial color="#252018" roughness={1} />
      </mesh>

      {/* Garden circles */}
      {[[-7, 8], [7, 8]].map(([x, z], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, z]}>
          <circleGeometry args={[2.5, 24]} />
          <meshStandardMaterial color="#1a2518" roughness={0.95} />
        </mesh>
      ))}

      {/* Hedge borders */}
      {[
        [-10, 0.4, 0, 0.4, 0.8, 18],
        [10, 0.4, 0, 0.4, 0.8, 18],
        [0, 0.4, -10, 18, 0.8, 0.4],
      ].map(([x, y, z, w, h, d], i) => (
        <mesh key={`hedge-${i}`} position={[x, y, z]} castShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#1a2a18" roughness={0.9} />
        </mesh>
      ))}

      {/* Fountain */}
      <group position={[0, 0, 14]}>
        <mesh position={[0, 0.25, 0]} receiveShadow>
          <cylinderGeometry args={[1.8, 2.2, 0.5, 20]} />
          <meshStandardMaterial color="#3a3530" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.15, 20]} />
          <meshStandardMaterial 
            color="#1a2a3a" 
            roughness={0.2} 
            metalness={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.25, 0.35, 1.2, 10]} />
          <meshStandardMaterial color="#4a4540" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
