import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { vertexShader, fragmentShader } from '../shaders/heroShader'

interface HeroObjectProps {
  timelineInfluence: {
    data: number
    comic: number
    web3: number
  }
  onClick: () => void
}

export const HeroObject = ({ timelineInfluence, onClick }: HeroObjectProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const timeRef = useRef(0)

  // Create a complex geometry (head bust approximation)
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.5, 3)
    
    // Modify vertices to create a more head-like shape
    const positions = geo.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i)
      const x = positions.getX(i)
      const z = positions.getZ(i)
      
      // Elongate top (head)
      if (y > 0) {
        positions.setY(i, y * 1.2)
      }
      
      // Narrow bottom (neck)
      if (y < -0.5) {
        const scale = 0.6
        positions.setX(i, x * scale)
        positions.setZ(i, z * scale)
      }
    }
    
    geo.computeVertexNormals()
    return geo
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDataInfluence: { value: 0 },
      uComicInfluence: { value: 0 },
      uWeb3Influence: { value: 0 },
      uDataColor: { value: new THREE.Color('#00ff41') },
      uComicColor: { value: new THREE.Color('#FF6B35') },
      uWeb3Color: { value: new THREE.Color('#C77DFF') },
      uGlitchIntensity: { value: 0.1 },
    }),
    []
  )

  useFrame((state, delta) => {
    timeRef.current += delta

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current
      materialRef.current.uniforms.uDataInfluence.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uDataInfluence.value,
        timelineInfluence.data,
        0.1
      )
      materialRef.current.uniforms.uComicInfluence.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uComicInfluence.value,
        timelineInfluence.comic,
        0.1
      )
      materialRef.current.uniforms.uWeb3Influence.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uWeb3Influence.value,
        timelineInfluence.web3,
        0.1
      )

      // Increase glitch when strong influence is present
      const maxInfluence = Math.max(
        timelineInfluence.data,
        timelineInfluence.comic,
        timelineInfluence.web3
      )
      materialRef.current.uniforms.uGlitchIntensity.value = 0.1 + maxInfluence * 0.4
    }

    if (meshRef.current) {
      // Continuous subtle rotation
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onClick={onClick}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'none'
      }}
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  )
}
