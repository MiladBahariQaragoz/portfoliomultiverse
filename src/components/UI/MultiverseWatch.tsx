import { useMultiverseStore, Timeline } from '../../store/multiverseStore'

export const MultiverseWatch = () => {
  const currentTimeline = useMultiverseStore((state) => state.currentTimeline)
  const setTimeline = useMultiverseStore((state) => state.setTimeline)
  const setTransitioning = useMultiverseStore((state) => state.setTransitioning)

  const timelines: { id: Timeline; label: string; icon: string; color: string }[] = [
    { id: 'data', label: 'The Architect', icon: '⟨⟩', color: 'data' },
    { id: 'comic', label: 'The Anomaly', icon: '✦', color: 'comic' },
    { id: 'web3', label: 'The Mirror', icon: '◈', color: 'web3' },
  ]

  const handleTimelineSwitch = (newTimeline: Timeline) => {
    if (newTimeline === currentTimeline) return
    
    setTransitioning(true)
    setTimeout(() => {
      setTimeline(newTimeline)
      setTimeout(() => setTransitioning(false), 500)
    }, 300)
  }

  if (currentTimeline === 'singularity') {
    return null // Don't show watch in singularity state
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        {/* Watch container */}
        <div className="bg-black bg-opacity-80 backdrop-blur-md rounded-full p-4 border border-white border-opacity-20">
          <div className="flex gap-3">
            {timelines.map((timeline) => {
              const isActive = timeline.id === currentTimeline
              const colorClass = 
                timeline.color === 'data' ? 'text-data-primary border-data-primary' :
                timeline.color === 'comic' ? 'text-comic-primary border-comic-primary' :
                'text-web3-primary border-web3-primary'

              return (
                <button
                  key={timeline.id}
                  onClick={() => handleTimelineSwitch(timeline.id)}
                  className={`
                    w-12 h-12 rounded-full border-2 
                    flex items-center justify-center
                    transition-all duration-300
                    hover:scale-110
                    ${isActive 
                      ? `${colorClass} shadow-lg` 
                      : 'text-gray-500 border-gray-700 hover:border-gray-500'
                    }
                  `}
                  style={{
                    boxShadow: isActive ? `0 0 20px currentColor` : 'none',
                  }}
                  title={timeline.label}
                >
                  <span className="text-xl font-bold">{timeline.icon}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Current timeline label */}
        <div
          className={`
            absolute -top-12 right-0 
            px-4 py-2 rounded-lg
            bg-black bg-opacity-80 backdrop-blur-md
            border border-white border-opacity-20
            whitespace-nowrap
            ${currentTimeline === 'data' ? 'timeline-data' : 
              currentTimeline === 'comic' ? 'timeline-comic' : 
              'timeline-web3'}
          `}
        >
          {timelines.find(t => t.id === currentTimeline)?.label}
        </div>
      </div>
    </div>
  )
}
