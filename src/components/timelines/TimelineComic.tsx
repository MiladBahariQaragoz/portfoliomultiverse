import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export const TimelineComic = () => {
  const groupRef = useRef<THREE.Group>(null)
  const comicPanelsRef = useRef<THREE.Group>(null)
  const frameCount = useRef(0)

  // Spider-Verse style: Variable frame rate effect
  const targetFPS = 12
  const frameInterval = 1 / targetFPS

  useFrame((state, delta) => {
    frameCount.current += delta

    // Only update every frameInterval for choppy animation effect
    if (frameCount.current >= frameInterval) {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.02
      }

      if (comicPanelsRef.current) {
        comicPanelsRef.current.children.forEach((child, i) => {
          child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.5
          child.rotation.z = Math.sin(state.clock.elapsedTime + i) * 0.1
        })
      }

      frameCount.current = 0
    }
  })

  // Comic panels data
  const panels = [
    { title: 'POW!', subtitle: 'Frontend Mastery', position: [-3, 1, 0] },
    { title: 'WHAM!', subtitle: 'Creative Dev', position: [0, 0.5, -1] },
    { title: 'ZAP!', subtitle: 'UI/UX Design', position: [3, 1, 0] },
  ]

  return (
    <>
      {/* Lighting with color pop */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FF6B35" />
      <directionalLight position={[-5, 3, 2]} intensity={0.8} color="#F7931E" />

      {/* Background halftone pattern */}
      <mesh position={[0, 0, -8]} scale={[20, 20, 1]}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <meshBasicMaterial color="#FBD1A2" />
      </mesh>

      {/* Main group with comic elements */}
      <group ref={groupRef}>
        {/* Central hero text */}
        <group position={[0, 2, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.8}
            color="#FF6B35"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#000000"
            font="/fonts/Bangers-Regular.ttf"
          >
            THE ANOMALY
          </Text>

          {/* Swoosh lines */}
          {[-1, 1].map((dir, i) => (
            <mesh key={i} position={[dir * 2, 0, -0.1]} rotation={[0, 0, dir * 0.3]}>
              <planeGeometry args={[1.5, 0.1]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
          ))}
        </group>

        {/* Comic panels */}
        <group ref={comicPanelsRef}>
          {panels.map((panel, i) => (
            <group key={i} position={panel.position as [number, number, number]}>
              {/* Panel border (thick black outline) */}
              <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[2.2, 1.7]} />
                <meshBasicMaterial color="#000000" />
              </mesh>

              {/* Panel background */}
              <mesh>
                <planeGeometry args={[2, 1.5]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>

              {/* Panel title */}
              <Text
                position={[0, 0.3, 0.01]}
                fontSize={0.4}
                color="#FF6B35"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.03}
                outlineColor="#000000"
                font="/fonts/Bangers-Regular.ttf"
              >
                {panel.title}
              </Text>

              {/* Subtitle */}
              <Text
                position={[0, -0.2, 0.01]}
                fontSize={0.15}
                color="#000000"
                anchorX="center"
                anchorY="middle"
                font="/fonts/ComicNeue-Bold.ttf"
              >
                {panel.subtitle}
              </Text>

              {/* Ben-Day dots effect */}
              {Array.from({ length: 20 }).map((_, j) => (
                <mesh
                  key={j}
                  position={[
                    (Math.random() - 0.5) * 1.8,
                    (Math.random() - 0.5) * 1.3,
                    0.02,
                  ]}
                >
                  <circleGeometry args={[0.05, 16]} />
                  <meshBasicMaterial color="#F7931E" transparent opacity={0.3} />
                </mesh>
              ))}
            </group>
          ))}
        </group>

        {/* Floating speech bubbles */}
        {[
          { text: 'React.js', pos: [-4, -1, 1] },
          { text: 'Three.js', pos: [4, -1.5, 0.5] },
          { text: 'WebGL', pos: [-3, -2, -1] },
        ].map((bubble, i) => (
          <group key={i} position={bubble.pos as [number, number, number]}>
            <mesh>
              <sphereGeometry args={[0.6, 32, 32]} />
              <meshToonMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[-0.4, -0.4, 0]} scale={[0.3, 0.3, 0.3]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshToonMaterial color="#FFFFFF" />
            </mesh>
            <Text
              position={[0, 0, 0.61]}
              fontSize={0.2}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              font="/fonts/ComicNeue-Bold.ttf"
            >
              {bubble.text}
            </Text>
          </group>
        ))}
      </group>

      {/* Chromatic aberration effect - simulated with offset planes */}
      <mesh position={[0, 0, -7.9]} scale={[20, 20, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#FF0000" transparent opacity={0.03} />
      </mesh>
      <mesh position={[0.05, 0, -7.95]} scale={[20, 20, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#00FF00" transparent opacity={0.03} />
      </mesh>
    </>
  )
}
