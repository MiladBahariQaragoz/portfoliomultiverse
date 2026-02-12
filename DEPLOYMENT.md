# Deployment Guide

Quick guide to deploying your Portfolio Multiverse to various platforms.

## 📦 Build Your Project

First, create a production build:

```bash
npm run build
```

This creates an optimized bundle in the `dist/` folder.

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Automatic deployment from GitHub:**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

**Manual deployment:**

```bash
npm install -g vercel
vercel
```

**Environment Variables (if needed):**
- Dashboard → Settings → Environment Variables
- Add `VITE_*` prefixed variables

### Option 2: Netlify

**Drag & Drop:**

1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/` folder to the upload area
4. Done!

**Continuous Deployment:**

1. Push to GitHub/GitLab
2. New Site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/portfoliomultiverse"
}
```

3. Update `vite.config.ts`:
```ts
export default defineConfig({
  base: '/portfoliomultiverse/', // Your repo name
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages:
   - Repo Settings → Pages
   - Source: gh-pages branch

### Option 4: Cloudflare Pages

1. Push code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Create a new project
4. Connect to your repository
5. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18
6. Deploy

### Option 5: AWS S3 + CloudFront

**1. Build:**
```bash
npm run build
```

**2. Create S3 Bucket:**
```bash
aws s3 mb s3://your-portfolio-bucket
```

**3. Upload:**
```bash
aws s3 sync dist/ s3://your-portfolio-bucket --delete
```

**4. Enable Static Website Hosting:**
- S3 Console → Properties → Static Website Hosting
- Index document: `index.html`
- Error document: `index.html` (for SPA routing)

**5. Setup CloudFront (optional but recommended):**
- Create CloudFront distribution
- Origin: Your S3 bucket
- Default root object: `index.html`

### Option 6: Digital Ocean App Platform

1. Push to GitHub
2. Create new App on Digital Ocean
3. Select repository
4. Settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy

## ⚙️ Configuration

### Custom Domain

**Vercel/Netlify:**
- Dashboard → Domains → Add custom domain
- Update DNS records at your registrar

**GitHub Pages:**
- Create `CNAME` file in `public/` folder with your domain
- Update DNS: `CNAME` record pointing to `yourusername.github.io`

### Environment Variables

Create `.env.production`:
```
VITE_API_URL=https://your-api.com
VITE_ANALYTICS_ID=your-analytics-id
```

Access in code:
```ts
const apiUrl = import.meta.env.VITE_API_URL
```

**Note**: All `VITE_*` variables are publicly visible in the client bundle.

## 🔧 Performance Optimization

Before deploying, optimize for production:

### 1. Reduce Bundle Size

Check bundle size:
```bash
npm run build
```

Analyze with:
```bash
npm install --save-dev rollup-plugin-visualizer
```

Add to `vite.config.ts`:
```ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    // ... other plugins
    visualizer({ open: true }),
  ],
})
```

### 2. Enable Compression

**Vercel/Netlify**: Automatic Brotli/Gzip compression

**Manual (Express server)**:
```js
const compression = require('compression')
app.use(compression())
```

### 3. CDN Caching

Add cache headers in `dist/_headers` (Netlify):
```
/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

### 4. Lazy Loading

Implement code splitting for timelines:
```tsx
const TimelineData = lazy(() => import('./components/timelines/TimelineData'))
const TimelineComic = lazy(() => import('./components/timelines/TimelineComic'))
const TimelineWeb3 = lazy(() => import('./components/timelines/TimelineWeb3'))
```

Wrap in Suspense:
```tsx
<Suspense fallback={<LoadingScreen />}>
  <TimelineData />
</Suspense>
```

## 📊 Analytics

### Google Analytics

1. Install:
```bash
npm install react-ga4
```

2. Initialize in `main.tsx`:
```tsx
import ReactGA from 'react-ga4'

ReactGA.initialize('G-XXXXXXXXXX')
ReactGA.send('pageview')
```

### Vercel Analytics

Add to `App.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      {/* Your app */}
      <Analytics />
    </>
  )
}
```

## 🔒 Security

### Content Security Policy

Add `_headers` file in `public/`:
```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### HTTPS

All modern hosts (Vercel, Netlify, etc.) provide free SSL certificates automatically.

## 🐛 Troubleshooting

### "404 on page refresh"

**Solution**: Configure SPA redirect

**Netlify** - Create `public/_redirects`:
```
/*  /index.html  200
```

**Vercel** - Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### "WebGL not working on mobile"

**Solution**: Add fallback in `App.tsx`:
```tsx
import { Canvas } from '@react-three/fiber'

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

<Canvas gl={{ antialias: !isMobile, pixelRatio: isMobile ? 1 : 2 }}>
```

### "Build fails - out of memory"

**Solution**: Increase Node memory:
```json
// package.json
{
  "scripts": {
    "build": "NODE_OPTIONS=--max-old-space-size=4096 vite build"
  }
}
```

## ✅ Pre-Deployment Checklist

- [ ] Test production build locally (`npm run preview`)
- [ ] Check console for errors
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Optimize images (if you added any)
- [ ] Update meta tags in `index.html` (title, description, OG tags)
- [ ] Add favicon
- [ ] Test WebGL performance
- [ ] Enable analytics
- [ ] Setup custom domain (if applicable)
- [ ] Test all timeline transitions
- [ ] Verify sound works after user interaction

## 📱 PWA (Progressive Web App) - Optional

Turn your portfolio into a PWA:

1. Install plugin:
```bash
npm install vite-plugin-pwa -D
```

2. Update `vite.config.ts`:
```ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Portfolio Multiverse',
        short_name: 'Portfolio',
        description: 'My multiverse portfolio',
        theme_color: '#000000',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
```

## 🎉 You're Ready!

Your Portfolio Multiverse is now live! Share it with the world:
- Add to LinkedIn
- Share on Twitter
- Include in job applications
- Send to potential clients

---

**Need help?** Check the main README.md and TECHNICAL_DOCS.md
