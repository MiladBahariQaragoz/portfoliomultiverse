import { create } from 'zustand'

export type Timeline = 'data' | 'comic' | 'web3' | 'singularity'

interface MultiverseState {
  currentTimeline: Timeline
  mousePosition: { x: number; y: number }
  isTransitioning: boolean
  cursorInfluence: { x: number; y: number }
  soundEnabled: boolean
  
  setTimeline: (timeline: Timeline) => void
  setMousePosition: (x: number, y: number) => void
  setTransitioning: (transitioning: boolean) => void
  setCursorInfluence: (x: number, y: number) => void
  toggleSound: () => void
}

export const useMultiverseStore = create<MultiverseState>((set) => ({
  currentTimeline: 'singularity',
  mousePosition: { x: 0, y: 0 },
  isTransitioning: false,
  cursorInfluence: { x: 0, y: 0 },
  soundEnabled: false,
  
  setTimeline: (timeline) => set({ currentTimeline: timeline }),
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  setCursorInfluence: (x, y) => set({ cursorInfluence: { x, y } }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}))
