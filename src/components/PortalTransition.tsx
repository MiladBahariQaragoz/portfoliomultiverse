import { useEffect, useState } from 'react'
import { useMultiverseStore } from '../store/multiverseStore'

export const PortalTransition = () => {
  const isTransitioning = useMultiverseStore((state) => state.isTransitioning)
  const currentTimeline = useMultiverseStore((state) => state.currentTimeline)
  const [portalStyle, setPortalStyle] = useState('')

  useEffect(() => {
    if (isTransitioning) {
      // Determine portal style based on target timeline
      switch (currentTimeline) {
        case 'data':
          setPortalStyle('data')
          break
        case 'comic':
          setPortalStyle('comic')
          break
        case 'web3':
          setPortalStyle('web3')
          break
        default:
          setPortalStyle('default')
      }
    }
  }, [isTransitioning, currentTimeline])

  if (!isTransitioning) return null

  const getPortalClass = () => {
    switch (portalStyle) {
      case 'data':
        return 'border-data-primary bg-data-primary'
      case 'comic':
        return 'border-comic-primary bg-comic-primary'
      case 'web3':
        return 'border-web3-primary bg-web3-primary'
      default:
        return 'border-white bg-white'
    }
  }

  const getPortalAnimation = () => {
    switch (portalStyle) {
      case 'data':
        return 'portal-data'
      case 'comic':
        return 'portal-comic'
      case 'web3':
        return 'portal-web3'
      default:
        return 'portal-default'
    }
  }

  return (
    <>
      {/* Main portal container */}
      <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
        {/* Portal opening effect */}
        <div className={`portal-container ${getPortalAnimation()}`}>
          {portalStyle === 'data' && (
            // Geometric grid expansion
            <div className="portal-grid">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-data-primary"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          )}

          {portalStyle === 'comic' && (
            // Jagged comic rift
            <div className="portal-comic-rift">
              <svg
                viewBox="0 0 800 600"
                className="absolute inset-0 w-full h-full"
              >
                <path
                  d="M 400 0 L 420 50 L 450 40 L 480 100 L 500 90 L 550 150 L 600 300 L 550 450 L 500 510 L 480 500 L 450 560 L 420 550 L 400 600 L 380 550 L 350 560 L 320 500 L 300 510 L 250 450 L 200 300 L 250 150 L 300 90 L 320 100 L 350 40 L 380 50 Z"
                  fill="currentColor"
                  stroke="#000000"
                  strokeWidth="8"
                  className="text-comic-primary animate-portal-expand"
                />
              </svg>
              
              {/* Comic action words */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl font-bold text-black -rotate-12 animate-pulse">
                  WHRRRIP!
                </div>
              </div>
            </div>
          )}

          {portalStyle === 'web3' && (
            // Fractal mirror fold
            <div className="portal-web3-fold">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * 360
                return (
                  <div
                    key={i}
                    className="absolute inset-0 border-2 border-web3-primary"
                    style={{
                      transform: `rotate(${angle}deg) scale(${1 - i * 0.1})`,
                      opacity: 1 - i * 0.1,
                      animation: `portal-fold 0.6s ease-out ${i * 0.05}s forwards`,
                    }}
                  />
                )
              })}
            </div>
          )}
        </div>

        {/* Fullscreen flash overlay */}
        <div className={`portal-flash ${getPortalClass()}`} />
      </div>

      {/* CSS animations */}
      <style>{`
        .portal-container {
          position: relative;
          width: 100vw;
          height: 100vh;
        }

        .portal-grid {
          animation: expand-grid 0.6s ease-out forwards;
        }

        .portal-comic-rift {
          animation: expand-rift 0.5s ease-out forwards;
        }

        .portal-web3-fold {
          animation: expand-fold 0.7s ease-out forwards;
        }

        .portal-flash {
          position: absolute;
          inset: 0;
          animation: flash 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes expand-grid {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        @keyframes expand-rift {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(2) rotate(10deg);
            opacity: 0;
          }
        }

        @keyframes expand-fold {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes portal-fold {
          0% {
            transform: rotate(0deg) scale(1);
          }
          100% {
            transform: rotate(45deg) scale(2);
            opacity: 0;
          }
        }

        @keyframes flash {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-portal-expand {
          animation: portal-expand 0.5s ease-out forwards;
        }

        @keyframes portal-expand {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1.5);
          }
        }
      `}</style>
    </>
  )
}
