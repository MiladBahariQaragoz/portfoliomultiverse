# Portfolio Multiverse - Technical Documentation

## Architecture Overview

This project implements a cinematic multiverse portfolio using React Three Fiber (R3F) and WebGL. The architecture is designed around the concept of colliding timelines with smooth transitions and immersive 3D effects.

## Core Concepts

### 1. State Management (Zustand)

The entire application state is managed through a single Zustand store located in `src/store/multiverseStore.ts`.

**Key State:**
- `currentTimeline`: Which universe the user is currently in ('singularity' | 'data' | 'comic' | 'web3')
- `mousePosition`: Normalized cursor position (-1 to 1 for both x and y)
- `isTransitioning`: Boolean flag for portal animations
- `cursorInfluence`: Smoothed cursor position for shader calculations
- `soundEnabled`: Toggle for procedural audio

### 2. Timeline System

Each timeline is a self-contained 3D scene:

#### Singularity (Landing Page)
- **File**: `src/components/Singularity.tsx`
- **Concept**: The chaos zone where all timelines collide
- **Interactivity**: Mouse position determines which timeline takes precedence
- **Visual Elements**:
  - Hero Object (glitching 3D head/bust)
  - Debris Field (floating objects from all three timelines)
  - Dynamic lighting that shifts based on mouse position

#### Timeline A: The Architect (Data Science)
- **File**: `src/components/timelines/TimelineData.tsx`
- **Theme**: Matrix/Tron digital world
- **Key Features**:
  - Living particle system (5000 particles forming data structures)
  - Bioluminescent grid floor
  - Floating code blocks and server racks
  - Monospaced typography
  - Green (#00ff41) color scheme

#### Timeline B: The Anomaly (Web Development)
- **File**: `src/components/timelines/TimelineComic.tsx`
- **Theme**: Spider-Verse comic book aesthetic
- **Key Features**:
  - Variable frame rate (12fps) for choppy animation effect
  - Comic panels with thick black outlines
  - Speech bubbles
  - Ben-Day dots (halftone pattern)
  - Chromatic aberration effect
  - Orange (#FF6B35) color scheme

#### Timeline C: The Mirror Dimension (Web3)
- **File**: `src/components/timelines/TimelineWeb3.tsx`
- **Theme**: Doctor Strange impossible geometry
- **Key Features**:
  - Reflective floor using MeshReflectorMaterial
  - Volumetric lighting (god rays)
  - Rotating glass shard panels
  - Fractal background structure
  - Floating crystals with metallic materials
  - Purple/Gold (#7B2CBF / #FFD60A) color scheme

### 3. Hero Object & Shaders

**Files**: 
- `src/components/HeroObject.tsx`
- `src/shaders/heroShader.ts`

The hero object is a modified icosahedron that glitches between three visual states based on timeline influence.

**Shader Features:**
- **Vertex Shader**:
  - Random displacement for glitch effect
  - Geometric quantization (Data influence)
  - Cel-shaded stepping (Comic influence)
  - Liquid wave distortion (Web3 influence)

- **Fragment Shader**:
  - Dynamic color mixing based on timeline influence
  - Wireframe edges (Data)
  - Cel-shading with halftone dots (Comic)
  - Metallic chrome with fresnel (Web3)
  - RGB split glitch effect

**Uniforms:**
```glsl
uTime: Continuous time for animation
uDataInfluence: 0-1 strength of Data timeline
uComicInfluence: 0-1 strength of Comic timeline
uWeb3Influence: 0-1 strength of Web3 timeline
uGlitchIntensity: Overall chaos level
```

### 4. Reality Anchor (Custom Cursor)

**File**: `src/components/UI/RealityAnchor.tsx`

The custom cursor system provides visual feedback about which timeline is being influenced:
- Ring changes color based on dominant timeline
- Inner pulse when timeline is strongly activated
- Trailing particle effect
- Smooth lerp animation

### 5. Portal Transitions

**File**: `src/components/PortalTransition.tsx`

When switching timelines, a dramatic portal effect plays:

- **Data Portal**: Geometric grid that expands from center
- **Comic Portal**: Jagged rift with "WHRRRIP!" text
- **Web3 Portal**: Fractal mirror fold with rotating segments

Each portal is timed to:
1. Start animation (0-300ms)
2. Full flash at 50% (300ms)
3. Switch timeline internally (300ms)
4. Fade out (300-600ms)

### 6. Sound Design

**File**: `src/components/Sound/SoundController.tsx`

Procedural audio using Web Audio API (no external files needed):

- **Data**: Digital bleeps using sine waves at harmonic frequencies (220, 440, 880, 1760 Hz) with pulse patterns
- **Comic**: Triangular bass + square wave clicks for energetic rhythm
- **Web3**: Ethereal pads with LFO vibrato (130, 164, 196, 246 Hz)
- **Singularity**: Low rumble using sawtooth wave (40 Hz)

All sounds are generated in real-time using oscillators and gain nodes.

### 7. Effects & Post-Processing

**File**: `src/components/Effects/GlitchEffect.tsx`

Using @react-three/postprocessing:
- **Glitch**: Sporadic screen tearing (intensity varies by timeline)
- **Chromatic Aberration**: RGB color channel separation
- **Bloom**: Glow effect on bright elements

## File Structure Deep Dive

```
src/
├── App.tsx                          # Main app, handles timeline rendering
│   ├── Mouse tracking (normalized -1 to 1)
│   ├── Timeline switching logic
│   └── Canvas setup (camera, render settings)
│
├── store/
│   └── multiverseStore.ts           # Zustand state management
│
├── components/
│   ├── Singularity.tsx              # Landing page scene
│   │   ├── Dynamic lighting based on mouse
│   │   ├── HeroObject integration
│   │   └── DebrisField integration
│   │
│   ├── HeroObject.tsx               # Central 3D object
│   │   ├── Icosahedron geometry modification
│   │   ├── Shader material with custom uniforms
│   │   └── Timeline influence blending
│   │
│   ├── DebrisField.tsx              # Floating timeline objects
│   │   ├── Instanced meshes (50 each)
│   │   ├── Different geometries per timeline
│   │   └── Floating animation patterns
│   │
│   ├── PortalTransition.tsx         # Timeline switch effects
│   │   ├── Different portal styles
│   │   ├── CSS animations
│   │   └── Flash overlay
│   │
│   ├── Effects/
│   │   └── GlitchEffect.tsx         # Post-processing
│   │
│   ├── Sound/
│   │   └── SoundController.tsx      # Web Audio API
│   │
│   ├── UI/
│   │   ├── RealityAnchor.tsx        # Custom cursor
│   │   └── MultiverseWatch.tsx      # Navigation widget
│   │
│   └── timelines/
│       ├── TimelineData.tsx         # Data Science world
│       ├── TimelineComic.tsx        # Web Dev world
│       └── TimelineWeb3.tsx         # Web3 world
│
└── shaders/
    └── heroShader.ts                # GLSL vertex & fragment shaders
```

## Customization Guide

### Adding Your Own Projects

Each timeline component has placeholder text. Replace with real project data:

**Example (TimelineData.tsx):**
```tsx
<Text position={[0, -0.3, 0.1]} fontSize={0.08} ...>
  {`Your actual skills here\nLine 2\nLine 3`}
</Text>
```

Consider creating a data file:
```ts
// src/data/projects.ts
export const dataProjects = [
  { title: "ML Pipeline", description: "...", link: "..." },
  // ... more projects
]
```

### Changing Visual Styles

#### Colors (tailwind.config.js):
```js
data: {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  glow: '#YOUR_COLOR',
}
```

#### Materials:
```tsx
<meshStandardMaterial
  color="#YOUR_COLOR"
  emissive="#YOUR_EMISSIVE"
  emissiveIntensity={0.5}
  metalness={0.9}
  roughness={0.1}
/>
```

#### Particle Counts:
```tsx
// In DebrisField.tsx or timeline components
const debrisCount = 50 // Reduce for better performance
const particleCount = 5000 // Reduce for lower-end devices
```

### Modifying Shaders

The hero shader can be customized in `src/shaders/heroShader.ts`:

**Add a new effect:**
```glsl
// In fragment shader
if (uCustomInfluence > 0.3) {
  color = mix(color, vec3(1.0, 0.0, 0.0), uCustomInfluence);
}
```

**Add a new uniform:**
```tsx
// In HeroObject.tsx
const uniforms = useMemo(() => ({
  // ... existing uniforms
  uCustomInfluence: { value: 0 },
  uCustomColor: { value: new THREE.Color('#ff0000') },
}), [])
```

### Adding a Fourth Timeline

1. **Create the component**: `src/components/timelines/TimelineCustom.tsx`
2. **Add to store**:
```ts
export type Timeline = 'data' | 'comic' | 'web3' | 'singularity' | 'custom'
```
3. **Add to App.tsx**:
```tsx
case 'custom':
  return <TimelineCustom />
```
4. **Add to MultiverseWatch.tsx**:
```tsx
{ id: 'custom', label: 'The Custom', icon: '◆', color: 'custom' }
```
5. **Add colors to tailwind.config.js**

### Sound Customization

Modify frequencies in `SoundController.tsx`:

```tsx
const createCustomSoundscape = (audioContext: AudioContext) => {
  const osc = audioContext.createOscillator()
  const gain = audioContext.createGain()
  
  osc.type = 'sine' // 'sine' | 'square' | 'sawtooth' | 'triangle'
  osc.frequency.value = 440 // Hz
  
  // Your custom gain envelope
  gain.gain.setValueAtTime(0, audioContext.currentTime)
  gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 1)
  
  osc.connect(gain)
  gain.connect(audioContext.destination)
  osc.start()
}
```

## Performance Optimization

### For Lower-End Devices:

1. **Reduce particle counts**:
```tsx
const particleCount = 1000 // instead of 5000
const debrisCount = 20 // instead of 50
```

2. **Simplify geometry**:
```tsx
<IcosahedronGeometry args={[1.5, 1]} /> // instead of 3
```

3. **Disable post-processing**:
```tsx
// Comment out in Singularity.tsx
// <GlitchEffect intensity={...} />
```

4. **Lower render resolution**:
```tsx
<Canvas
  gl={{ antialias: false, pixelRatio: 1 }}
  ...
>
```

### Monitoring Performance:

Add React Three Fiber's `<Stats />` component:
```tsx
import { Stats } from '@react-three/drei'

// In timeline component
<Stats />
```

## Build & Deployment

```bash
# Production build
npm run build

# Test production build locally
npm run preview

# Deploy to Vercel/Netlify
# Just connect your repo, they'll auto-detect Vite
```

### Build optimization:
- Vite automatically code-splits
- Three.js tree-shaking removes unused geometry/materials
- All shaders are inlined
- No external audio files

### Environment Variables:
Create `.env` for API keys or config:
```
VITE_API_URL=https://your-api.com
```

Access in code:
```ts
const apiUrl = import.meta.env.VITE_API_URL
```

## Common Issues & Solutions

### Issue: "Cannot find module '@react-three/fiber'"
**Solution**: Run `npm install` again, restart TypeScript server

### Issue: Black screen
**Solution**: Check browser console. Ensure WebGL 2.0 is supported

### Issue: Glitchy performance
**Solution**: Reduce particle counts, disable post-processing, lower pixelRatio

### Issue: Sound not playing
**Solution**: User must click to enable (browser autoplay policy). Add a "Start Experience" button:
```tsx
<button onClick={() => {
  store.toggleSound()
  audioContext.resume()
}}>
  Enter
</button>
```

### Issue: TypeScript errors about THREE types
**Solution**: Make sure @types/three is installed:
```bash
npm install --save-dev @types/three
```

## Browser Compatibility

- **Chrome/Edge**: ✅ Full support
- **Firefox**: ✅ Full support
- **Safari**: ⚠️ WebGL works, some shader features may vary
- **Mobile**: ⚠️ Works but performance varies (reduce particle counts)

## Next Steps & Extensions

Ideas for enhancement:
1. **Content Management**: Connect to a CMS (Sanity, Contentful) for project data
2. **Analytics**: Track which timeline users explore most
3. **Scroll Sections**: Add scrollable project showcases within each timeline
4. **VR Support**: Use @react-three/xr for VR headset support
5. **Multiplayer**: Show other visitors as cursors using WebSockets
6. **Project Details**: Click objects to open modal with project details
7. **Loading Screen**: Add a cinematic loading sequence
8. **Mobile Gestures**: Implement touch/swipe controls for mobile

## Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Docs](https://threejs.org/docs/)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Postprocessing Effects](https://github.com/pmndrs/postprocessing)
- [GLSL Shader Reference](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)

## License

MIT - Do whatever you want with this code!
