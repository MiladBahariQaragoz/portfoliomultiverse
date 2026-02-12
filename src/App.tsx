import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Singularity } from './components/Singularity'
import { TimelineData } from './components/timelines/TimelineData'
import { TimelineComic } from './components/timelines/TimelineComic'
import { TimelineWeb3 } from './components/timelines/TimelineWeb3'
import { MultiverseWatch } from './components/UI/MultiverseWatch'
import { RealityAnchor } from './components/UI/RealityAnchor'
import { PortalTransition } from './components/PortalTransition'
import { useMultiverseStore } from './store/multiverseStore'
import { SoundController } from './components/Sound/SoundController'

function App() {
  const currentTimeline = useMultiverseStore((state) => state.currentTimeline)
  const setMousePosition = useMultiverseStore((state) => state.setMousePosition)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition(x, y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [setMousePosition])

  const renderTimeline = () => {
    switch (currentTimeline) {
      case 'singularity':
        return <Singularity />
      case 'data':
        return <TimelineData />
      case 'comic':
        return <TimelineComic />
      case 'web3':
        return <TimelineWeb3 />
      default:
        return <Singularity />
    }
  }

  return (
    <div className="cursor-reality-anchor" style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
      >
        {renderTimeline()}
      </Canvas>
      
      <RealityAnchor />
      <MultiverseWatch />
      <PortalTransition />
      <SoundController />
    </div>
  )
}

export default App
