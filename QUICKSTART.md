# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will be available at **http://localhost:3000**

### Step 3: Experience the Multiverse

1. **Move your mouse** around the screen in the Singularity view:
   - **Move LEFT** → Green grid appears (Data timeline)
   - **Move RIGHT** → Purple crystals appear (Web3 timeline)
   - **Move UP** → Orange comic elements appear (Comic timeline)

2. **Click** when a timeline is dominant to enter that world

3. **Enable sound** by clicking the speaker icon (top-right)

4. **Switch timelines** using the Multiverse Watch (bottom-right corner)

## 🎨 Customize Your Portfolio

### 1. Add Your Information

Edit the timeline components to add your actual skills and projects:

**For Data Science/Engineering** - Edit `src/components/timelines/TimelineData.tsx`:
```tsx
// Around line 55
<Text
  position={[0, -0.3, 0.1]}
  fontSize={0.08}
  color="#008F11"
  maxWidth={2.5}
  textAlign="center"
  font="/fonts/CourierPrime-Regular.ttf"
>
  {`YOUR ACTUAL SKILLS HERE
Second Line
Third Line`}
</Text>
```

**For Web Development** - Edit `src/components/timelines/TimelineComic.tsx`:
```tsx
// Around line 50
const panels = [
  { title: 'YOUR TITLE!', subtitle: 'Your Skill', position: [-3, 1, 0] },
  { title: 'YOUR TITLE!', subtitle: 'Your Skill', position: [0, 0.5, -1] },
  { title: 'YOUR TITLE!', subtitle: 'Your Skill', position: [3, 1, 0] },
]
```

**For Web3/Blockchain** - Edit `src/components/timelines/TimelineWeb3.tsx`:
```tsx
// Around line 40
<Text
  position={[0, 0, 0]}
  fontSize={0.6}
  color="#C77DFF"
>
  YOUR NAME OR TITLE
</Text>
```

### 2. Update Skills Catalog

Edit `skills/CATALOG.md` to list all your actual skills, projects, and experience.

### 3. Change Colors (Optional)

Edit `tailwind.config.js`:
```js
colors: {
  data: {
    primary: '#YOUR_COLOR',    // Main color
    secondary: '#YOUR_COLOR',  // Accent color
    glow: '#YOUR_COLOR',       // Glow/highlight color
  },
  // ... same for comic and web3
}
```

## 📦 Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm run preview
```

The build output will be in the `dist/` folder, ready to deploy to:
- **Vercel**: Just connect your GitHub repo
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Push the `dist` folder to a `gh-pages` branch
- **Any static host**: Upload the `dist` folder

## 🎯 Next Steps

1. **Read the full docs**: Check `TECHNICAL_DOCS.md` for deep customization
2. **Add project details**: Create interactive elements that show your work
3. **Optimize**: Reduce particle counts if performance is an issue
4. **Deploy**: Share your multiverse with the world!

## 💡 Tips

- **Performance**: If it's laggy, reduce particle counts in timeline files
- **Mobile**: Works on mobile but may need performance tuning
- **Browser**: Works best in Chrome/Firefox/Edge
- **Sound**: Must be enabled by user click (browser policy)

## 🆘 Need Help?

Check `TECHNICAL_DOCS.md` for detailed documentation on:
- Architecture overview
- Customization guide
- Performance optimization
- Common issues & solutions

---

**Have fun building your multiverse! 🌌✨**
