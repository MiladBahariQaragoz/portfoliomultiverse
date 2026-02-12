import { EffectComposer, Glitch, ChromaticAberration, Bloom } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'
import { Vector2 } from 'three'

interface GlitchEffectProps {
  intensity: number
}

export const GlitchEffect = ({ intensity }: GlitchEffectProps) => {
  return (
    <EffectComposer>
      <Glitch
        delay={new Vector2(1.5, 3.5)}
        duration={new Vector2(0.1, 0.3)}
        strength={new Vector2(intensity * 0.3, intensity * 0.5)}
        mode={GlitchMode.SPORADIC}
      />
      <ChromaticAberration
        offset={new Vector2(intensity * 0.002, intensity * 0.002)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Bloom
        intensity={intensity * 0.5}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.9}
      />
    </EffectComposer>
  )
}
