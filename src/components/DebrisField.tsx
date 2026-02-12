import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DebrisFieldProps {
  dominantTimeline: string
}

export const DebrisField = ({ dominantTimeline }: DebrisFieldProps) => {
  const dataDebrisRef = useRef<THREE.InstancedMesh>(null)
  const comicDebrisRef = useRef<THREE.InstancedMesh>(null)
  const web3DebrisRef = useRef<THREE.InstancedMesh>(null)

  const debrisCount = 50

  // Create random positions for debris
  const debrisData = useMemo(() => {
    const positions: THREE.Vector3[] = []
    const rotations: THREE.Euler[] = []
    const scales: number[] = []

    for (let i = 0; i < debrisCount; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        )
      )
      rotations.push(
        new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        )
      )
      scales.push(Math.random() * 0.3 + 0.1)
    }

    return { positions, rotations, scales }
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    // Animate each debris type differently
    const animateDebris = (mesh: THREE.InstancedMesh | null, speedMultiplier: number) => {
      if (!mesh) return

      const matrix = new THREE.Matrix4()
      const position = new THREE.Vector3()
      const rotation = new THREE.Euler()
      const quaternion = new THREE.Quaternion()
      const scale = new THREE.Vector3()

      for (let i = 0; i < debrisCount; i++) {
        position.copy(debrisData.positions[i])
        
        // Floating animation
        position.y += Math.sin(time * speedMultiplier + i) * 0.02
        position.x += Math.cos(time * speedMultiplier * 0.5 + i) * 0.01

        rotation.copy(debrisData.rotations[i])
        rotation.x += delta * speedMultiplier * 0.5
        rotation.y += delta * speedMultiplier * 0.3

        quaternion.setFromEuler(rotation)
        scale.setScalar(debrisData.scales[i])

        matrix.compose(position, quaternion, scale)
        mesh.setMatrixAt(i, matrix)
      }

      mesh.instanceMatrix.needsUpdate = true
    }

    animateDebris(dataDebrisRef.current, 1.0)
    animateDebris(comicDebrisRef.current, 1.5)
    animateDebris(web3DebrisRef.current, 0.8)
  })

  const getOpacity = (timeline: string) => {
    if (dominantTimeline === 'singularity') return 0.3
    return dominantTimeline === timeline ? 0.8 : 0.1
  }

  return (
    <>
      {/* Data debris: Server racks / Grid cubes */}
      <instancedMesh ref={dataDebrisRef} args={[undefined, undefined, debrisCount]}>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial
          color="#00ff41"
          emissive="#008F11"
          emissiveIntensity={0.5}
          transparent
          opacity={getOpacity('data')}
          wireframe
        />
      </instancedMesh>

      {/* Comic debris: Pop-art clouds */}
      <instancedMesh ref={comicDebrisRef} args={[undefined, undefined, debrisCount]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshToonMaterial
          color="#FF6B35"
          transparent
          opacity={getOpacity('comic')}
        />
      </instancedMesh>

      {/* Web3 debris: Crystals */}
      <instancedMesh ref={web3DebrisRef} args={[undefined, undefined, debrisCount]}>
        <octahedronGeometry args={[0.25, 0]} />
        <meshPhysicalMaterial
          color="#7B2CBF"
          emissive="#C77DFF"
          emissiveIntensity={0.3}
          transparent
          opacity={getOpacity('web3')}
          metalness={0.9}
          roughness={0.1}
        />
      </instancedMesh>
    </>
  )
}
