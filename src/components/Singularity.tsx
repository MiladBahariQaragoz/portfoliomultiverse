import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMultiverseStore } from '../store/multiverseStore'
import * as THREE from 'three'
import { GlitchEffect } from './Effects/GlitchEffect'
import { DebrisField } from './DebrisField'
import { HeroObject } from './HeroObject'

export const Singularity = () => {
  const mousePosition = useMultiverseStore((state) => state.mousePosition)
  const setCursorInfluence = useMultiverseStore((state) => state.setCursorInfluence)
  const setTimeline = useMultiverseStore((state) => state.setTimeline)
  
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  // Calculate which timeline the user is gravitating towards
  const dominantTimeline = useMemo(() => {
    const threshold = 0.3
    if (mousePosition.x < -threshold) return 'data'
    if (mousePosition.x > threshold) return 'web3'
    if (mousePosition.y > threshold) return 'comic'
    return 'singularity'
  }, [mousePosition])

  useFrame((_, delta) => {
    timeRef.current += delta

    if (groupRef.current) {
      // Subtle rotation based on mouse
      groupRef.current.rotation.y = mousePosition.x * 0.3
      groupRef.current.rotation.x = mousePosition.y * 0.2
    }

    // Update cursor influence for shaders
    setCursorInfluence(
      THREE.MathUtils.lerp(mousePosition.x, mousePosition.x, 0.1),
      THREE.MathUtils.lerp(mousePosition.y, mousePosition.y, 0.1)
    )
  })

  const handleCommit = () => {
    if (dominantTimeline !== 'singularity') {
      setTimeline(dominantTimeline)
    }
  }

  return (
    <>
      {/* Ambient lighting that changes with mouse position */}
      <ambientLight intensity={0.2} />
      
      {/* Directional lights from different timelines */}
      <directionalLight
        position={[-5, 0, 0]}
        intensity={Math.max(0, -mousePosition.x)}
        color="#00ff41"
      />
      <directionalLight
        position={[5, 0, 0]}
        intensity={Math.max(0, mousePosition.x)}
        color="#7B2CBF"
      />
      <directionalLight
        position={[0, 5, 0]}
        intensity={Math.max(0, mousePosition.y)}
        color="#FF6B35"
      />

      <group ref={groupRef}>
        <HeroObject
          timelineInfluence={{
            data: Math.max(0, -mousePosition.x),
            comic: Math.max(0, mousePosition.y),
            web3: Math.max(0, mousePosition.x),
          }}
          onClick={handleCommit}
        />
      </group>

      <DebrisField dominantTimeline={dominantTimeline} />
      <GlitchEffect intensity={dominantTimeline !== 'singularity' ? 0.5 : 0.2} />
    </>
  )
}
