import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'

export const TimelineWeb3 = () => {
  const crystalRefs = useRef<THREE.Mesh[]>([])
  const mirrorPanelsRef = useRef<THREE.Group>(null)
  const fractalRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    // Rotate crystals in different directions
    crystalRefs.current.forEach((crystal, i) => {
      if (crystal) {
        crystal.rotation.x += delta * 0.3 * (i % 2 === 0 ? 1 : -1)
        crystal.rotation.y += delta * 0.5
        crystal.position.y = Math.sin(time + i) * 0.2
      }
    })

    // Fractal rotation - non-linear movement
    if (fractalRef.current) {
      fractalRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
      fractalRef.current.rotation.y += delta * 0.2
      fractalRef.current.rotation.z = Math.cos(time * 0.4) * 0.1
    }

    // Mirror panels fold and unfold
    if (mirrorPanelsRef.current) {
      mirrorPanelsRef.current.children.forEach((child, i) => {
        const offset = i * Math.PI * 0.4
        child.rotation.y = Math.sin(time * 0.5 + offset) * 0.5
      })
    }
  })

  return (
    <>
      {/* Moody volumetric lighting */}
      <ambientLight intensity={0.1} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#C77DFF"
        castShadow
      />
      <pointLight position={[-5, 5, 5]} intensity={1} color="#FFD60A" />
      <pointLight position={[5, 5, -5]} intensity={1} color="#7B2CBF" />

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a0a"
          metalness={0.8}
        />
      </mesh>

      {/* Central title with impossible geometry */}
      <group position={[0, 2, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.6}
          color="#C77DFF"
          anchorX="center"
          anchorY="middle"
          font="/fonts/OrbitronBlack.ttf"
        >
          THE MIRROR DIMENSION
        </Text>
        
        {/* Golden accent line */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[4, 0.05, 0.05]} />
          <meshStandardMaterial
            color="#FFD60A"
            emissive="#FFD60A"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>

      {/* Floating glass shard panels */}
      <group ref={mirrorPanelsRef}>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2
          const radius = 3
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(i) * 0.5,
                Math.sin(angle) * radius,
              ]}
              rotation={[0, -angle, 0]}
            >
              <planeGeometry args={[1.5, 2.5]} />
              <meshPhysicalMaterial
                color="#1a1a2e"
                metalness={1}
                roughness={0.1}
                transmission={0.9}
                thickness={0.5}
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>
          )
        })}
      </group>

      {/* Impossible geometric crystals */}
      {[
        { pos: [-4, 0, -2], color: '#7B2CBF' },
        { pos: [4, 0.5, -2], color: '#C77DFF' },
        { pos: [-3, -1, 2], color: '#FFD60A' },
        { pos: [3, -0.5, 2], color: '#9D4EDD' },
      ].map((crystal, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) crystalRefs.current[i] = el
          }}
          position={crystal.pos as [number, number, number]}
          castShadow
        >
          <octahedronGeometry args={[0.8, 0]} />
          <meshPhysicalMaterial
            color={crystal.color}
            metalness={0.9}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0}
            reflectivity={1}
            envMapIntensity={2}
          />
        </mesh>
      ))}

      {/* Fractal background structure */}
      <group ref={fractalRef} position={[0, 0, -8]}>
        {Array.from({ length: 5 }).map((_, depth) => (
          <group key={depth} scale={1 / (depth + 1)}>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2
              const radius = 2
              return (
                <mesh
                  key={i}
                  position={[
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    -depth,
                  ]}
                >
                  <boxGeometry args={[0.2, 0.2, 0.2]} />
                  <meshStandardMaterial
                    color="#7B2CBF"
                    emissive="#C77DFF"
                    emissiveIntensity={0.5}
                    wireframe
                  />
                </mesh>
              )
            })}
          </group>
        ))}
      </group>

      {/* Ethereum-style floating rings */}
      <group position={[0, 0, 0]}>
        {[1, 1.5, 2].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshStandardMaterial
              color="#FFD60A"
              emissive="#FFD60A"
              emissiveIntensity={1}
              metalness={1}
              roughness={0}
            />
          </mesh>
        ))}
      </group>

      {/* Volumetric light god rays effect */}
      <mesh position={[0, 5, -10]} scale={[20, 20, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#7B2CBF"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  )
}
