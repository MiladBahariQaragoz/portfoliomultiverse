# Portfolio Multiverse 🌌

A Marvel-cinematic-universe-style portfolio landing page featuring three distinct timelines that collide at a singularity. Users navigate through different professional personas using an interactive 3D experience built with React Three Fiber and WebGL.

## 🎬 The Concept

This isn't a typical portfolio menu—it's a **Singularity**. The user arrives at the exact moment three timelines are crashing into each other:

- **Timeline A: The Architect** (Data Science & Engineering) - Matrix/Tron aesthetic
- **Timeline B: The Anomaly** (Web Development) - Spider-Verse comic style  
- **Timeline C: The Mirror Dimension** (Web3 & Blockchain) - Doctor Strange fractals

## ✨ Key Features

### The Opening Shot (Landing Page)
- 3D WebGL void with a glitching "Hero Object"
- Object morphs between three states: wireframe (Data), cel-shaded (Comic), liquid chrome (Web3)
- Floating debris from all three timelines
- Mouse cursor acts as a "Reality Anchor" that pulls different timelines forward

### The Three Worlds
Each timeline has a distinct visual language:

#### Timeline A: The Architect
- **Visual**: Bioluminescent UI, living data particles, system boot aesthetics
- **Tech**: Grid systems, floating equations, monospaced typography
- **Sound**: Ryoji Ikeda-style digital bleeps and data frequencies

#### Timeline B: The Anomaly  
- **Visual**: Mixed media 3D-to-2D rendering, chromatic aberration
- **Tech**: Comic panels, speech bubbles, Ben-Day dots, 12fps animation
- **Sound**: Lo-fi beats with rhythmic energy

#### Timeline C: The Mirror Dimension
- **Visual**: Impossible geometry, volumetric lighting, metallic surfaces
- **Tech**: Glass shards, fractal backgrounds, reflective floors
- **Sound**: Ethereal synthesizer pads and drones

### The Jump (Navigation)
- **Multiverse Watch**: Persistent navigation widget for timeline switching
- **Portal Transitions**: No "back to home" — portals tear open on the current page
	- Data: Geometric grid expansion
	- Comic: Jagged rift with "WHRRRIP!" effect
	- Web3: Fractal mirror fold

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers
- **@react-three/postprocessing** - Effects
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **Web Audio API** - Procedural sound design

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

1. The app will be available at `http://localhost:3000`
2. Enable sound by clicking the speaker icon (top-right)
3. **Singularity Mode**: Move your mouse to explore different timeline influences
	 - Left: Data timeline (green matrix grid)
	 - Right: Web3 timeline (purple fractals)
	 - Up: Comic timeline (orange pop-art)
4. Click when a timeline is dominant to commit and enter that world
5. Use the **Multiverse Watch** (bottom-right) to switch between timelines

## 📁 Project Structure

```
portfoliomultiverse/
├── src/
│   ├── components/
│   │   ├── HeroObject.tsx          # Central glitching 3D object
│   │   ├── Singularity.tsx         # Landing page scene
│   │   ├── DebrisField.tsx         # Floating timeline debris
│   │   ├── PortalTransition.tsx    # Timeline switch animations
│   │   ├── Effects/
│   │   │   └── GlitchEffect.tsx    # Post-processing effects
│   │   ├── Sound/
│   │   │   └── SoundController.tsx # Procedural audio
│   │   ├── UI/
│   │   │   ├── RealityAnchor.tsx   # Custom cursor
│   │   │   └── MultiverseWatch.tsx # Navigation widget
│   │   └── timelines/
│   │       ├── TimelineData.tsx    # The Architect world
│   │       ├── TimelineComic.tsx   # The Anomaly world
│   │       └── TimelineWeb3.tsx    # The Mirror Dimension
│   ├── shaders/
│   │   └── heroShader.ts           # GLSL shaders for hero object
│   ├── store/
│   │   └── multiverseStore.ts      # Zustand state management
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── skills/
│   └── CATALOG.md                   # Skills database
└── package.json
```

## 🎨 Customization

### Adding Your Own Skills

Edit `skills/CATALOG.md` to add your actual projects and skills for each timeline.

### Changing Colors

Modify the color palette in `tailwind.config.js`:

```js
colors: {
	data: { primary: '#00ff41', ... },
	comic: { primary: '#FF6B35', ... },
	web3: { primary: '#7B2CBF', ... },
}
```

### Adjusting Sounds

Edit frequency patterns in `src/components/Sound/SoundController.tsx` for each timeline.

### Custom Shaders

Modify GLSL code in `src/shaders/heroShader.ts` to change the hero object's appearance.

## 🎯 Performance Tips

- The WebGL scenes are optimized for 60fps
- Particle counts can be adjusted in each timeline component
- Post-processing effects can be toggled for lower-end devices
- Sound is opt-in to save resources

## 🐛 Troubleshooting

**Black screen on load**: Check browser console for WebGL errors. Ensure your browser supports WebGL 2.0.

**Performance issues**: Reduce particle counts in `DebrisField.tsx` and timeline components.

**No sound**: Click the speaker icon (top-right) to enable. Some browsers require user interaction first.

**Fonts not loading**: The project uses fallback system fonts. For custom fonts, add them to `/public/fonts/`.

## 📝 License

MIT License - feel free to use this as a template for your own portfolio!

## 🙏 Credits

Inspired by:
- The Marvel Cinematic Universe (multiverse concept)
- Spider-Man: Across the Spider-Verse (visual style)
- Doctor Strange (impossible geometry)
- The Matrix (digital aesthetics)
- Ryoji Ikeda (sound design)

Built with love and Three.js ✨

---

**Note**: This is a creative portfolio template. Customize the skills, projects, and personal information in the timeline components to make it your own!