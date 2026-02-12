import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Grid } from '@react-three/drei'
import * as THREE from 'three'

export const TimelineData = () => {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const gridRef = useRef<THREE.Group>(null)

  // Create particle system for "living data"
  const particleCount = 5000
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20
    positions[i + 1] = (Math.random() - 0.5) * 20
    positions[i + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05
      
      // Animate particles to form patterns
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const time = state.clock.elapsedTime
        positions[i + 1] += Math.sin(time + positions[i]) * 0.01
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (gridRef.current) {
      gridRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 10, 5]} intensity={1} color="#00ff41" />

      {/* Bioluminescent grid background */}
      <Grid
        position={[0, -3, 0]}
        args={[50, 50]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#008F11"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#00ff41"
        fadeDistance={30}
        fadeStrength={1}
        infiniteGrid
      />

      {/* Living data particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#00ff41"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating 3D data structures */}
      <group ref={groupRef}>
        {/* Central console */}
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshStandardMaterial
              color="#000000"
              emissive="#00ff41"
              emissiveIntensity={0.2}
            />
          </mesh>
          
          <Text
            position={[0, 0.5, 0.1]}
            fontSize={0.2}
            color="#00ff41"
            anchorX="center"
            anchorY="middle"
            font="/fonts/CourierPrime-Regular.ttf"
          >
            {'> THE ARCHITECT_'}
          </Text>

          <Text
            position={[0, 0, 0.1]}
            fontSize={0.1}
            color="#00ff41"
            anchorX="center"
            anchorY="middle"
            font="/fonts/CourierPrime-Regular.ttf"
          >
            {'SYSTEM.BOOT [OK]'}
          </Text>

          <Text
            position={[0, -0.3, 0.1]}
            fontSize={0.08}
            color="#008F11"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.5}
            textAlign="center"
            font="/fonts/CourierPrime-Regular.ttf"
          >
            {`Machine Learning • Data Science\nCloud Architecture • Systems Engineering`}
          </Text>
        </group>

        {/* Floating code blocks */}
        {[-4, -2, 2, 4].map((x, i) => (
          <mesh key={i} position={[x, Math.sin(i) * 2, -3]}>
            <boxGeometry args={[0.8, 1.2, 0.1]} />
            <meshStandardMaterial
              color="#001100"
              emissive="#00ff41"
              emissiveIntensity={0.3}
              wireframe
            />
          </mesh>
        ))}
      </group>

      {/* Rotating geometric grid */}
      <group ref={gridRef} position={[0, 0, -5]}>
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={i} position={[0, 0, i * 2 - 10]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3 + i * 0.5, 3.1 + i * 0.5, 64]} />
            <meshBasicMaterial color="#00ff41" transparent opacity={0.2} />
          </mesh>
        ))}
      </group>
    </>
  )
}
