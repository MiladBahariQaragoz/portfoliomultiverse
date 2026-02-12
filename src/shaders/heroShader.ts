export const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  uniform float uTime;
  uniform float uGlitchIntensity;
  uniform float uDataInfluence;
  uniform float uComicInfluence;
  uniform float uWeb3Influence;
  
  // Pseudo-random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    
    vec3 pos = position;
    
    // Glitch effect: random displacement
    float glitch = random(vec2(uTime * 10.0, position.y)) * uGlitchIntensity;
    if (mod(uTime * 10.0, 1.0) > 0.9) {
      pos.x += glitch * 0.3;
      pos.z += glitch * 0.2;
    }
    
    // Data influence: make it more geometric/wireframe
    if (uDataInfluence > 0.3) {
      float gridSize = 0.5;
      pos += normal * sin(position.y * 10.0 + uTime * 2.0) * 0.02 * uDataInfluence;
    }
    
    // Comic influence: cel-shaded quantization
    if (uComicInfluence > 0.3) {
      pos += normal * step(0.5, fract(uTime + position.y * 5.0)) * 0.05 * uComicInfluence;
    }
    
    // Web3 influence: liquid chrome distortion
    if (uWeb3Influence > 0.3) {
      float wave = sin(position.y * 3.0 + uTime * 2.0) * cos(position.x * 3.0 + uTime * 1.5);
      pos += normal * wave * 0.1 * uWeb3Influence;
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

export const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  uniform float uTime;
  uniform float uDataInfluence;
  uniform float uComicInfluence;
  uniform float uWeb3Influence;
  uniform vec3 uDataColor;
  uniform vec3 uComicColor;
  uniform vec3 uWeb3Color;
  
  // Pseudo-random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    
    // Base color mixing
    vec3 baseColor = vec3(0.5);
    baseColor = mix(baseColor, uDataColor, uDataInfluence);
    baseColor = mix(baseColor, uComicColor, uComicInfluence);
    baseColor = mix(baseColor, uWeb3Color, uWeb3Influence);
    
    // Lighting
    float fresnel = pow(1.0 - dot(viewDirection, normal), 3.0);
    float diffuse = max(dot(normal, vec3(0.0, 1.0, 0.0)), 0.0);
    
    vec3 color = baseColor;
    
    // Data style: wireframe edges
    if (uDataInfluence > 0.3) {
      float edge = abs(sin(vPosition.x * 20.0)) * abs(sin(vPosition.y * 20.0)) * abs(sin(vPosition.z * 20.0));
      if (edge < 0.1) {
        color = uDataColor;
      }
      color += uDataColor * fresnel * 0.5;
    }
    
    // Comic style: cel-shading
    if (uComicInfluence > 0.3) {
      float quantize = floor(diffuse * 4.0) / 4.0;
      color *= quantize + 0.3;
      
      // Add halftone dots
      float dots = step(0.5, random(floor(vUv * 40.0)));
      color *= 0.8 + dots * 0.2 * uComicInfluence;
      
      // Outline
      if (fresnel > 0.7) {
        color = vec3(0.0);
      }
    }
    
    // Web3 style: metallic chrome
    if (uWeb3Influence > 0.3) {
      vec3 reflected = reflect(-viewDirection, normal);
      float metallic = fresnel;
      color = mix(color, uWeb3Color * 2.0, metallic * uWeb3Influence);
      
      // Add golden highlights
      color += vec3(1.0, 0.84, 0.0) * pow(fresnel, 5.0) * uWeb3Influence;
    }
    
    // RGB split glitch
    float glitchAmount = max(max(uDataInfluence, uComicInfluence), uWeb3Influence);
    if (mod(uTime * 10.0, 1.0) > 0.95 && glitchAmount > 0.5) {
      color.r = mix(color.r, color.g, 0.5);
      color.b = mix(color.b, color.r, 0.5);
    }
    
    gl_FragColor = vec4(color, 1.0);
  }
`
