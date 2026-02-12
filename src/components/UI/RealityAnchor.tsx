import { useEffect, useState } from 'react'
import { useMultiverseStore } from '../../store/multiverseStore'

export const RealityAnchor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const mousePosition = useMultiverseStore((state) => state.mousePosition)
  const currentTimeline = useMultiverseStore((state) => state.currentTimeline)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Determine cursor color and style based on influence
  const getCursorStyle = () => {
    const threshold = 0.3
    
    if (currentTimeline !== 'singularity') {
      // Show timeline-specific cursor
      switch (currentTimeline) {
        case 'data':
          return 'border-data-primary shadow-data-glow'
        case 'comic':
          return 'border-comic-primary shadow-comic-accent'
        case 'web3':
          return 'border-web3-primary shadow-web3-gold'
        default:
          return 'border-white'
      }
    }

    // In singularity, show influence
    if (mousePosition.x < -threshold) {
      return 'border-data-primary shadow-data-glow'
    }
    if (mousePosition.x > threshold) {
      return 'border-web3-primary shadow-web3-gold'
    }
    if (mousePosition.y > threshold) {
      return 'border-comic-primary shadow-comic-accent'
    }
    
    return 'border-white'
  }

  const getInnerDot = () => {
    const threshold = 0.3
    
    if (currentTimeline !== 'singularity') {
      return currentTimeline
    }

    if (mousePosition.x < -threshold) return 'data'
    if (mousePosition.x > threshold) return 'web3'
    if (mousePosition.y > threshold) return 'comic'
    return 'none'
  }

  const innerDot = getInnerDot()

  return (
    <>
      {/* Main cursor ring */}
      <div
        className={`fixed w-8 h-8 border-2 rounded-full pointer-events-none z-50 transition-all duration-100 ${getCursorStyle()}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 20px currentColor`,
        }}
      >
        {/* Inner pulse */}
        {innerDot !== 'none' && (
          <div
            className={`absolute inset-0 rounded-full animate-ping ${
              innerDot === 'data' ? 'bg-data-primary' :
              innerDot === 'comic' ? 'bg-comic-primary' :
              'bg-web3-primary'
            }`}
            style={{ opacity: 0.6 }}
          />
        )}
      </div>

      {/* Trailing particles */}
      <div
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-40 opacity-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      />
    </>
  )
}
