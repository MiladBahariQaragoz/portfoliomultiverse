# Project Overview Diagram

```
Portfolio Multiverse Architecture
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                         USER INTERACTION                     │
│  Mouse Movement → Reality Anchor Cursor → Timeline Influence │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    ZUSTAND STORE (State)                     │
│  • currentTimeline   • mousePosition   • isTransitioning    │
│  • cursorInfluence   • soundEnabled                          │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
        ┌──────────────────┐   ┌──────────────────┐
        │   App.tsx        │   │  UI Components   │
        │  (Canvas Setup)  │   │  - RealityAnchor │
        └──────────────────┘   │  - MultiverseWatch
                    │          │  - PortalTransition
                    │          │  - SoundController│
                    ▼          └──────────────────┘
        ┌──────────────────┐
        │  Timeline Router │
        └──────────────────┘
                    │
        ┌───────────┼───────────┬────────────┐
        ▼           ▼           ▼            ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
   │Singular-│ │Timeline │ │Timeline │ │Timeline │
   │ ity     │ │  Data   │ │  Comic  │ │  Web3   │
   │ (Start) │ │ (Green) │ │ (Orange)│ │ (Purple)│
   └─────────┘ └─────────┘ └─────────┘ └─────────┘
        │           │           │            │
        └───────────┴───────────┴────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
   ┌─────────────┐      ┌──────────────┐
   │ 3D Objects  │      │   Effects    │
   │ - HeroObject│      │ - Glitch     │
   │ - Debris    │      │ - Chromatic  │
   │ - Particles │      │ - Bloom      │
   │ - Lights    │      │ (Post-Proc)  │
   └─────────────┘      └──────────────┘
        │
        ▼
   ┌─────────────────────┐
   │   GLSL Shaders      │
   │ - Vertex Shader     │
   │ - Fragment Shader   │
   │ - Uniforms          │
   └─────────────────────┘
```

## Component Flow

```
User Action Flow
════════════════

1. LANDING (Singularity)
   ↓
   Move mouse LEFT → Data influence increases
   Move mouse RIGHT → Web3 influence increases  
   Move mouse UP → Comic influence increases
   ↓
   HeroObject glitches between 3 states
   Debris from all timelines floats
   Lighting shifts dynamically
   ↓
   Click when dominant timeline > 30%
   ↓
   Portal opens

2. TRANSITION
   ↓
   PortalTransition component renders
   - Data: Grid expansion
   - Comic: Jagged rift
   - Web3: Fractal fold
   ↓
   Flash effect at 50%
   ↓
   Timeline switches internally
   ↓
   Portal fades out

3. TIMELINE WORLD
   ↓
   Full 3D scene loads
   - Custom geometries
   - Unique materials
   - Timeline-specific effects
   - Themed colors
   ↓
   MultiverseWatch appears
   SoundController plays audio
   ↓
   User can switch timelines via watch
   (Portal opens, no "back to home")
```

## Data Flow

```
Mouse Movement
     ↓
App.tsx (mousemove listener)
     ↓
setMousePosition(x, y)  → Store
     ↓
All components re-render with new mousePosition
     ↓
┌──────────────────────────────────┐
│ Singularity.tsx                  │
│  - Calculates dominant timeline  │
│  - Updates lighting              │
│  - Passes to HeroObject          │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ HeroObject.tsx                   │
│  - Updates shader uniforms       │
│  - Morphs between states         │
│  - Glitch intensity increases    │
└──────────────────────────────────┘
     ↓
┌──────────────────────────────────┐
│ RealityAnchor.tsx                │
│  - Changes cursor color          │
│  - Shows inner pulse             │
└──────────────────────────────────┘
```

## File Dependencies

```
main.tsx
  └── App.tsx
       ├── store/multiverseStore.ts (State)
       ├── components/Singularity.tsx
       │    ├── components/HeroObject.tsx
       │    │    └── shaders/heroShader.ts
       │    ├── components/DebrisField.tsx
       │    └── components/Effects/GlitchEffect.tsx
       ├── components/timelines/TimelineData.tsx
       ├── components/timelines/TimelineComic.tsx
       ├── components/timelines/TimelineWeb3.tsx
       ├── components/UI/RealityAnchor.tsx
       ├── components/UI/MultiverseWatch.tsx
       ├── components/PortalTransition.tsx
       └── components/Sound/SoundController.tsx
```

## Timeline Features Matrix

```
┌──────────────┬────────────┬────────────┬───────────┐
│   Feature    │    Data    │   Comic    │   Web3    │
├──────────────┼────────────┼────────────┼───────────┤
│ Color        │ Green      │ Orange     │ Purple    │
│ Aesthetic    │ Matrix     │ Spider-V   │ Dr.Strange│
│ Geometry     │ Grid/Cubes │ Panels     │ Crystals  │
│ Material     │ Wireframe  │ Toon       │ Physical  │
│ Animation    │ Digital    │ 12fps      │ Fractal   │
│ Lighting     │ Biolum     │ Flat       │ Volumetric│
│ Sound        │ Bleeps     │ Lo-fi      │ Pads      │
│ FPS Target   │ 60         │ 12 (faux)  │ 60        │
└──────────────┴────────────┴────────────┴───────────┘
```

## Technology Stack Layers

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  React Components + Three.js/R3F    │
└─────────────────────────────────────┘
           ↕️
┌─────────────────────────────────────┐
│           Logic Layer               │
│  Zustand Store + useFrame hooks     │
└─────────────────────────────────────┘
           ↕️
┌─────────────────────────────────────┐
│          Graphics Layer             │
│  WebGL + GLSL Shaders + Materials   │
└─────────────────────────────────────┘
           ↕️
┌─────────────────────────────────────┐
│           Audio Layer               │
│       Web Audio API                 │
└─────────────────────────────────────┘
           ↕️
┌─────────────────────────────────────┐
│          Effects Layer              │
│   Post-Processing (Glitch/Bloom)    │
└─────────────────────────────────────┘
```

## Performance Optimization Points

```
1. Geometry Level
   - Use instanced meshes (DebrisField: 50 → 1 draw call)
   - Simplify icosahedron subdivision

2. Material Level
   - Share materials across instances
   - Use basic materials where possible

3. Render Level
   - Frustum culling (automatic)
   - Lower pixelRatio on mobile
   - Disable antialiasing on low-end

4. Code Level
   - Lazy load timeline components
   - Memoize expensive calculations
   - Use refs for non-reactive values

5. Bundle Level
   - Tree-shaking (automatic with Vite)
   - Code splitting by timeline
   - Gzip/Brotli compression (host-level)
```

## State Management Flow

```
User Action
     ↓
Event Handler (onClick, onMouseMove)
     ↓
Zustand Action (setTimeline, setMousePosition, etc.)
     ↓
Store Update
     ↓
All subscribed components re-render
     ↓
useFrame hooks run with new state
     ↓
Three.js objects update (position, rotation, material)
     ↓
WebGL renders new frame
     ↓
60 FPS (ideally)
```

## Shader Pipeline

```
JavaScript Side
     ↓
Create uniforms object with values
     ↓
Pass to shaderMaterial
     ↓
useFrame updates uniform values each frame
     ↓
GPU Side (GLSL)
     ↓
Vertex Shader
  - Receives position, normal, uv
  - Applies transformations
  - Outputs gl_Position
     ↓
Rasterization (GPU automatic)
     ↓
Fragment Shader
  - Receives interpolated values
  - Calculates final color
  - Outputs gl_FragColor
     ↓
Screen pixels
```

## Quick Reference

**Change Colors**: `tailwind.config.js`
**Modify 3D Objects**: Timeline components in `src/components/timelines/`  
**Edit Shaders**: `src/shaders/heroShader.ts`
**Adjust Sounds**: `src/components/Sound/SoundController.tsx`
**Add Projects**: Create `src/data/projects.ts` (see PROJECT_DATA_EXAMPLE.ts)
**Performance**: Reduce particle counts in timeline files
**Deploy**: See DEPLOYMENT.md

---

**This portfolio is a living multiverse—expand it infinitely! 🌌**
