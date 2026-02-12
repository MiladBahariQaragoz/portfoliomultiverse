import { useEffect, useRef, useState } from 'react'
import { useMultiverseStore } from '../../store/multiverseStore'

export const SoundController = () => {
  const currentTimeline = useMultiverseStore((state) => state.currentTimeline)
  const soundEnabled = useMultiverseStore((state) => state.soundEnabled)
  const toggleSound = useMultiverseStore((state) => state.toggleSound)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<{ [key: string]: OscillatorNode }>({})
  const gainNodesRef = useRef<{ [key: string]: GainNode }>({})

  useEffect(() => {
    if (!soundEnabled) return

    // Create Web Audio API context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const audioContext = audioContextRef.current

    // Stop all current sounds
    Object.values(oscillatorsRef.current).forEach(osc => {
      try {
        osc.stop()
      } catch (e) {
        // Oscillator might already be stopped
      }
    })
    oscillatorsRef.current = {}
    gainNodesRef.current = {}

    // Create timeline-specific soundscapes
    switch (currentTimeline) {
      case 'data':
        createDataSoundscape(audioContext)
        break
      case 'comic':
        createComicSoundscape(audioContext)
        break
      case 'web3':
        createWeb3Soundscape(audioContext)
        break
      case 'singularity':
        createSingularitySoundscape(audioContext)
        break
    }

    setIsPlaying(true)

    return () => {
      // Cleanup
      Object.values(oscillatorsRef.current).forEach(osc => {
        try {
          osc.stop()
        } catch (e) {
          // Already stopped
        }
      })
    }
  }, [currentTimeline, soundEnabled])

  const createDataSoundscape = (audioContext: AudioContext) => {
    // Ryoji Ikeda style - digital bleeps and data frequencies
    const frequencies = [220, 440, 880, 1760] // Clean harmonic series
    
    frequencies.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.type = 'sine'
      oscillator.frequency.value = freq
      
      // Pulse pattern
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      const pulseInterval = 0.1 + i * 0.05
      for (let t = 0; t < 60; t += pulseInterval) {
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime + t)
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + t + 0.02)
      }
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.start()
      
      oscillatorsRef.current[`data-${i}`] = oscillator
      gainNodesRef.current[`data-${i}`] = gainNode
    })
  }

  const createComicSoundscape = (audioContext: AudioContext) => {
    // Energetic lo-fi beats - simplified version
    const bassOsc = audioContext.createOscillator()
    const bassGain = audioContext.createGain()
    
    bassOsc.type = 'triangle'
    bassOsc.frequency.value = 110 // Bass note
    
    // Rhythmic bass pattern
    bassGain.gain.setValueAtTime(0, audioContext.currentTime)
    for (let t = 0; t < 60; t += 0.5) {
      bassGain.gain.setValueAtTime(0.15, audioContext.currentTime + t)
      bassGain.gain.setValueAtTime(0, audioContext.currentTime + t + 0.1)
    }
    
    bassOsc.connect(bassGain)
    bassGain.connect(audioContext.destination)
    bassOsc.start()
    
    oscillatorsRef.current['comic-bass'] = bassOsc
    gainNodesRef.current['comic-bass'] = bassGain

    // Add some high-frequency clicks
    const clickOsc = audioContext.createOscillator()
    const clickGain = audioContext.createGain()
    
    clickOsc.type = 'square'
    clickOsc.frequency.value = 2000
    
    clickGain.gain.setValueAtTime(0, audioContext.currentTime)
    for (let t = 0; t < 60; t += 0.25) {
      clickGain.gain.setValueAtTime(0.05, audioContext.currentTime + t)
      clickGain.gain.setValueAtTime(0, audioContext.currentTime + t + 0.02)
    }
    
    clickOsc.connect(clickGain)
    clickGain.connect(audioContext.destination)
    clickOsc.start()
    
    oscillatorsRef.current['comic-click'] = clickOsc
    gainNodesRef.current['comic-click'] = clickGain
  }

  const createWeb3Soundscape = (audioContext: AudioContext) => {
    // Ethereal synthesizer pads
    const padFrequencies = [130.81, 164.81, 196.00, 246.94] // C3, E3, G3, B3
    
    padFrequencies.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.type = 'sine'
      oscillator.frequency.value = freq
      
      // Slow fade in/out
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 3)
      
      // Subtle vibrato
      const lfo = audioContext.createOscillator()
      const lfoGain = audioContext.createGain()
      lfo.frequency.value = 0.5
      lfoGain.gain.value = 5
      lfo.connect(lfoGain)
      lfoGain.connect(oscillator.frequency)
      lfo.start()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.start()
      
      oscillatorsRef.current[`web3-${i}`] = oscillator
      gainNodesRef.current[`web3-${i}`] = gainNode
    })
  }

  const createSingularitySoundscape = (audioContext: AudioContext) => {
    // Chaotic mix - low rumble
    const rumble = audioContext.createOscillator()
    const rumbleGain = audioContext.createGain()
    
    rumble.type = 'sawtooth'
    rumble.frequency.value = 40
    
    rumbleGain.gain.setValueAtTime(0.1, audioContext.currentTime)
    
    rumble.connect(rumbleGain)
    rumbleGain.connect(audioContext.destination)
    rumble.start()
    
    oscillatorsRef.current['singularity-rumble'] = rumble
    gainNodesRef.current['singularity-rumble'] = rumbleGain
  }

  return (
    <button
      onClick={toggleSound}
      className={`
        fixed top-8 right-8 z-50
        w-12 h-12 rounded-full
        flex items-center justify-center
        border-2 border-white border-opacity-20
        bg-black bg-opacity-80 backdrop-blur-md
        transition-all duration-300
        hover:scale-110
        ${soundEnabled ? 'text-white' : 'text-gray-500'}
      `}
      title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
    >
      {soundEnabled ? (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 3.5a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v13a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-13zM13 7a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5h-2z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707l-4-4H2a1 1 0 01-1-1V8a1 1 0 011-1h2.293l4-4a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  )
}
