# 70mai Voice Companion — Offline-First PWA

An independent, mobile-first offline Progressive Web App (PWA) designed to help drivers reference, learn, and practice hands-free voice commands across the full lineup of **70mai Smart Dash Cams** (including M-series, Omni 360°, S500 Mirror, A-series, and T-series).

> **Important Notice:** This application is an independent voice reference and pronunciation companion. It **does not directly control or connect to dash cam hardware**. Furthermore, according to official 70mai product manuals, voice control on physical dash cams is temporarily **paused while the device is actively connected to the 70mai smartphone app**.

---

## 🛠 Technology Stack

- **Framework:** React 19 + TypeScript (Strict mode, no `any`)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`, CSS variables, `bg-linear-to-*` gradient utilities)
- **Package Manager:** Yarn + NVM (Node.js 22 LTS)
- **Routing:** React Router v7
- **PWA & Offline:** `vite-plugin-pwa` with Workbox runtime caching
- **Icons:** `lucide-react`
- **Linting:** ESLint 9 + typescript-eslint (0 warnings, 0 errors)
- **Hosting / Deploy Target:** Deployable to Vercel via included `vercel.json`

---

## 🚙 Multi-Model Support Matrix (13 Distinct Models)

The companion supports 13 individual 70mai dash cam models organized by series taxonomy:

### 1. M-Series
- **70mai Dash Cam M310** (1296P • Universal 6-command set)
- **M310 Plus 2K** (1440P • High-bitrate voice capture)
- **M310 Plus 3K** (1620P • Wide FOV acoustic tuning)

### 2. Omni Series (360° Motorized PTZ)
- **70mai Omni (X200)** (1080P 60FPS • Stepper-motor panning triggers)
- **4K Omni** (2160P UHD • Ultra-high resolution 360° capture)
- **Omni X800** (4K Dual HDR • Advanced cabin surveillance)
- *Specialized Voice Triggers:* `Shoot left` (向左拍), `Shoot right` (向右拍), `Take selfie` (拍自拍), `Shoot Vlog` (拍短视频).

### 3. Rearview Mirror Series
- **70mai S500** (3K Full-Touch Streaming Rearview Mirror)
- *Specialized Voice Triggers:* `Show front camera` (显示前路), `Show rear camera` (显示后路), `Turn on screen` (打开屏幕), `Turn off screen` (关闭屏幕).

### 4. A-Series (Ultra-HD Flagship Dash Cams)
- **70mai A810S** (4K HDR Sony STARVIS 2 IMX678)
- **A810 Lite** (2.5K Compact Sony sensor)
- **A800SE** (4K Classic Road Recorder)

### 5. T-Series (Multi-Channel Commercial & Fleet)
- **70mai T800** (Triple Channel 4K + 1080P Cabin + 1080P Rear)
- **T800E** (Dual Channel 4K Commercial Edition)
- **T400** (Dual Channel 2.5K Standard Fleet)
- *Specialized Voice Triggers:* `Switch camera` (切换摄像头).

---

## 🏎 Design System & Automotive Aesthetic

- **Pure Light Cream Mode:** Soft warm cream parchment background (`#F7F4EE`), crisp white cards (`#FFFFFF`), warm ivory surfaces (`#FAF7F2`), and delicate stone dividers (`#E2D8C9`). No dark mode toggles; purpose-built for daylight automotive cabin readability.
- **High-Contrast Typography:** Deep rich charcoal black (`#0C0A09` / `#1C1917`) and warm stone gray (`#44403C` / `#6B6256`) meeting WCAG AAA contrast standards.
- **Automotive Accents:** Vibrant cobalt & electric blue (`#0284C7`), automotive emergency amber (`#B45309`), signal red (`#DC2626`), and status emerald (`#047857`).
- **Tactile Feedback:** Local audio pronunciations (dual `.mp3` and `.wav` fallback) and Web Audio API synthesized sounds.
- **Mobile First:** Designed with high touch targets (48px+), safe-area insets for modern mobile displays, and a centered floating automotive dock.

---

## 🔍 Model Comparison Matrix (`/compare`)

The application features a dedicated side-by-side hardware comparison studio allowing drivers to:
- Compare any two 70mai models across resolution, command availability, and firmware notes.
- Automatically calculate shared commands compatible across both models.
- Highlight exclusive hardware-specific voice commands (e.g., Omni PTZ rotational triggers vs. S500 mirror display toggles).
- Inspect official firmware documentation and verification status.

---

## 🚗 In-Car Driving HUD Mode (`/hud`)

An in-cabin, hands-free flashcard view tailored for dashboard-mounted smartphones:
- **Massive Typography:** Extra-large Chinese characters, colored Pinyin tones, and English translations easily legible from the driver seat.
- **Hands-Free Auto-Play Slideshow:** Automatically cycles through verified model commands with spoken native audio triggers every 5s or 8s, allowing passive memorization at stoplights or while parked.
- **Audio Language Toggle:** Instant toggle between Chinese and English voice triggers.
- **Large Touch Targets:** 48px+ touch controls designed for minimal distraction.

---

## 📄 Lockscreen & Visor Cheat Sheet Generator (`/cheat-sheet`)

A 100% on-device visual asset generator:
- **9:16 Mobile Lockscreen Wallpaper (1080x1920 PNG):** Dynamically rendered using the HTML5 Canvas API with top clearance for phone clock/widgets, formatted with all commands for the active dash cam model. Available in Dark HUD and Warm Cream styles.
- **Sun-Visor Pocket Card (Printable PDF):** Compact card designed to be printed, cut out, and clipped onto the car's sun visor for quick reference.

---

## 🎙 Offline Voice Practice Engine

The app includes an in-cabin acoustic practice studio with a multi-tier offline architecture:

1. **Microphone Capture & RMS Waveform Meter:** Uses `navigator.mediaDevices.getUserMedia` and Web Audio API `AnalyserNode` to display live speech energy.
2. **Audio Playback:** User recordings are captured locally into memory Blobs so drivers can replay their speech attempt and compare it with the reference pronunciation.
3. **Fuzzy Syllable Matching & Scoring:** A Levenshtein and syllable-phonetic comparison engine calculates a 0–100% confidence score, evaluates each syllable, and gives automotive acoustic guidance (e.g., tone pitch, cabin volume, cadence).
4. **Speech Recognition Fallback:** Uses standard Web Speech API where available, with an explicit disclaimer that browser speech recognition might require an internet connection depending on the OS/browser vendor.
5. **Offline Manual Checklist Fallback:** Allows drivers to practice without microphone permissions by verifying phonetic tokens and syllable stress patterns offline.

---

## 📁 Architecture & File Layout

Adheres strictly to clean architecture with clear separation of UI, domain logic, and infrastructure:

```
src/
├── app/                  # Application root, providers, and main entry
│   ├── app.tsx
│   └── main.tsx
├── components/           # Reusable atomic UI components
│   ├── disclaimer-banner.tsx
│   ├── header.tsx
│   ├── icon-renderer.tsx
│   ├── navigation-bar.tsx
│   ├── network-status-badge.tsx
│   └── pwa-update-banner.tsx
├── data/
│   ├── commands/         # Normalized voice command definitions
│   │   ├── all-commands.ts
│   │   ├── base-commands.ts
│   │   ├── m310-commands.ts
│   │   ├── mirror-hardware-commands.ts
│   │   ├── omni-commands.ts
│   │   └── specialized-commands.ts
│   └── models/           # Multi-model registries & specs
│       ├── models-m-omni.ts
│       ├── models-mirror-a-t.ts
│       └── models-registry.ts
├── domain/
│   ├── models/           # Domain contracts and models
│   │   ├── command-model.ts
│   │   ├── dash-cam-model.ts
│   │   ├── device-model.ts
│   │   ├── practice-model.ts
│   │   └── voice-command.ts
│   └── services/         # Pure business logic (outside UI components)
│       ├── command-service.ts
│       ├── model-service.ts
│       └── practice-evaluator-service.ts
├── features/
│   ├── commands/         # Voice command library feature
│   │   ├── command-card.tsx
│   │   ├── command-filter-bar.tsx
│   │   └── commands-view.tsx
│   ├── dashboard/        # Dashboard view & device profile
│   │   ├── dashboard-view.tsx
│   │   ├── device-specs-card.tsx
│   │   └── quick-actions-card.tsx
│   ├── models/           # Multi-model components & comparison view
│   │   └── components/
│   │       ├── model-active-card.tsx
│   │       ├── model-compare-docs-card.tsx
│   │       ├── model-compare-view.tsx
│   │       └── model-selector-modal.tsx
│   ├── settings/         # Diagnostics, manual guide & cache status
│   │   └── settings-view.tsx
│   └── voice-practice/   # Acoustic microphone studio feature
│       ├── practice-feedback-card.tsx
│       ├── practice-manual-fallback.tsx
│       ├── practice-recorder-card.tsx
│       ├── practice-selector.tsx
│       └── voice-practice-view.tsx
├── hooks/                # Custom React hooks
│   ├── use-network-status.ts
│   ├── use-pwa-install.ts
│   ├── use-selected-model.ts
│   ├── use-voice-commands.ts
│   └── use-voice-practice.ts
├── infrastructure/       # Platform implementations
│   ├── audio/            # Web Audio API and local sound players
│   │   ├── audio-player-service.ts
│   │   └── synthesized-sound-generator.ts
│   ├── offline/          # PWA updates & network event listeners
│   │   ├── network-status-service.ts
│   │   └── pwa-update-service.ts
│   └── speech/           # Microphone, audio recording & speech recognition
│       ├── acoustic-matcher-service.ts
│       └── speech-recognition-service.ts
├── routes/               # Declarative client-side routing
│   └── app-router.tsx
└── styles/
    └── index.css         # Tailwind v4 @theme and cream styling
```

> **Coding Standard Adherence:** Every single file is kept strictly under the 150–200 line maximum (the largest file is 196 lines), filenames follow kebab-case, and business logic is strictly separated from UI.

---

## 🚀 Setup & Development

### Prerequisites
- Node.js version 22+ (configured via `.nvmrc`)
- Yarn (v1.22+)

### 1. Switch to Node 22
```bash
nvm use
# Node version should be >= v22.0.0
node -v
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Start Development Server
```bash
yarn dev
```
Open `http://localhost:5173` in your browser.

---

## 🔨 Production Build & Code Quality

### Run TypeScript & Vite Production Build
```bash
yarn build
```
The output will be generated in `dist/`, including service worker scripts (`sw.js`, `workbox-*.js`), web app manifest, precached audio assets, and optimized chunks.

### Run Strict ESLint Check
```bash
yarn lint
```

### Preview the Built Application
```bash
yarn preview
```

---

## ✈️ Offline Testing Instructions

### Method 1: Chrome / Edge DevTools
1. Build and preview the app (`yarn build && yarn preview`).
2. Open Chrome DevTools (`F12` or `Cmd + Option + I`).
3. Navigate to the **Application** tab &rarr; **Service Workers**.
4. Check that `sw.js` is active and running.
5. In the **Network** tab or **Application > Service Workers**, check the **Offline** checkbox.
6. Refresh the page: the entire app shell, 13 model profiles, command matrix, audio clips, and practice UI will load seamlessly offline.
7. Observe the **"Offline Ready"** indicator badge in the header.

### Method 2: Physical Device (PWA Installation)
1. Deploy to HTTPS (e.g. Vercel) or run on local Wi-Fi with HTTPS.
2. Open in Safari (iOS) or Chrome (Android).
3. Tap **"Add to Home Screen"** or the in-app **"Install"** button.
4. Turn on **Airplane Mode**.
5. Launch "70mai Voice" from your home screen. All 13 models, audio references, and acoustic practice remain fully functional without internet access.

---

## 🌐 Deployment to Vercel

The repository includes a ready-to-deploy [`vercel.json`](file:///Users/sophanith.mey/Personal/70mai-voice/vercel.json) configured with SPA route rewrites and PWA cache control headers:

```bash
# Deploy with Vercel CLI
vercel
```
Or import this repository directly in the Vercel Dashboard. The build preset is **Vite**, with build command `yarn build` and output directory `dist`.
