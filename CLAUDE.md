# Nostalgia — बचपन की यादें

## What this project is

A nostalgic web experience recreating the warmth of growing up in 1990s India. Each route is a standalone "room" in a childhood memory — bhajans, Doordarshan TV, radio, photo albums, an interactive Memory Machine. The project is scaling to many more rooms and features over time.

## Philosophy

Every decision should feel like opening an old drawer. Warm, slow, analog. No modern SaaS patterns, no dashboards, no notifications. The UI should feel like a family archive — faded paper, brass, wood, sepia. If something feels "techy" or "startup-y", it's wrong.

## Tech stack

- **React 19** + **Vite** (JavaScript only — no TypeScript)
- **React Router v6** with `createBrowserRouter` and lazy-loaded routes
- **Plain CSS** with custom properties from `src/styles/tokens.css` — no CSS framework, no CSS-in-JS
- **Web Audio API** via `AudioManager` singleton for ambient soundscapes
- **YouTube IFrame Player API** for bhajan playback (no API key)

## Architecture rules

### Think ahead — this project will scale

- **Every new page/room should be a lazy-loaded route** under `src/pages/`. One folder per room, self-contained.
- **Shared UI goes in `src/components/`**, page-specific UI stays in the page folder.
- **No tight coupling between rooms.** A room should work independently. Cross-room communication happens through events (`CustomEvent` on `window`) or context — never direct imports between page folders.
- **Data sources must be swappable.** `src/lib/playlistSource.js` is the pattern — a single function that returns data. Today it's a local array, tomorrow it could be an API. Never scatter data-fetching logic across components. Each page's data file (e.g. `shows.js`, `playlistSource.js`) is the single source of truth for that page — when the backend API is ready, only the data file changes, not the components.
- **Backend API is coming.** Most hardcoded data (show listings, schedules, playlists, images/thumbnails) will eventually be served by an API. Design every data layer as: fetch function → returns array/object → components consume. Keep component props generic (don't couple to local data shape quirks). Images and thumbnails referenced today may be replaced by API-served URLs later — use `src` props or data fields, never inline paths in JSX.
- **AudioManager is a singleton** (`src/audio/AudioManager.js`). All Web Audio goes through it. If a new room needs sound, use `getAudioManager()` — don't create separate AudioContext instances.
- **PlayerProvider lives at AppShell level** so the bhajan player persists across navigation. The YouTube iframe must never be destroyed on route change.

### Hardcoding policy

- **Colors**: Always use tokens from `src/styles/tokens.css`. Never hardcode hex/rgb values in component CSS. If a new color is needed, add it to tokens first.
- **Fonts**: Use the `--font-*` tokens. The four families are Cormorant Garamond (display/headings), Libre Baskerville (body), IBM Plex Mono (labels/mono), Noto Serif Devanagari (Hindi text).
- **Spacing**: Use `--space-*` tokens (4px base scale).
- **Breakpoints**: Mobile-first. Key breakpoints: 768px (tablet), 1024px (desktop). Don't add new breakpoints without reason.
- **Routes**: Defined in `src/App.jsx`. Each new route gets a lazy import + Suspense wrapper.
- **Hotspot data**: `src/pages/MemoryMachine/hotspots.js` — positions and metadata are data, not embedded in JSX.

## Design language

- **Palette**: Deep browns, ivory, terracotta, sepia, brass gold. See `tokens.css` for the full set.
- **Aesthetic**: Late 1980s–2000s Indian family archive. Faded photographs, brass frames, wooden textures, film grain, warm lamplight.
- **Typography**: Serif-heavy. Hindi text uses Noto Serif Devanagari. Labels are monospace (IBM Plex Mono) in uppercase with letter-spacing.
- **Animations**: Slow, ambient. Dust particles, mist drift, flame flicker, film grain. Nothing should feel "bouncy" or "snappy" — movements are languid and organic.
- **Sound**: Ambient only. Ceiling fan hum, village sounds, temple bells. Sounds enhance atmosphere, never demand attention.

## Security constraints (non-negotiable)

- **No YouTube Data API** — no API key should exist anywhere in this project
- **YouTube player must be visibly rendered at minimum 240x240 CSS pixels** at every breakpoint. Never `display:none` it, never shrink below that
- **Nothing may overlap or cover the YouTube player** — no decorative elements, no gradients, no z-index layers on top
- **No autoplay before the player is in the viewport**
- **Do not set a Referrer-Policy that suppresses the Referer header**
- **No localStorage or sessionStorage** for now
- **No external analytics or tracking scripts**

## Audio coordination

- When `AudioManager.activate()` fires (e.g., entering Memory Machine), it dispatches `'external-audio-start'` on `window`. The bhajan player listens for this and pauses automatically.
- Bhajan player only stops on: manual pause by user, or `external-audio-start` event.
- Each room manages its own audio lifecycle: activate on mount, deactivate on unmount.

## File conventions

- **Components**: PascalCase folders and files (`Player/Player.jsx`, `Player/Player.css`)
- **Pages**: PascalCase (`Home/Home.jsx`, `MemoryMachine/MemoryMachine.jsx`)
- **Hooks**: camelCase with `use` prefix (`useYouTubePlayer.js`)
- **Data/config**: camelCase (`hotspots.js`, `playlistSource.js`)
- **CSS**: One CSS file per component, same name. No global styles except `tokens.css` and `global.css`.
- **Assets**: Organized by context (`assets/house/`, `assets/scenes/`)
- **Audio files**: Live in `public/audio/`. Keep them compressed — prefer MP3/OGG over WAV for anything over 1MB.

## Git conventions

- Do NOT add `Co-Authored-By` lines in commit messages
- Commit messages: short, imperative, lowercase ("add persistent bhajan player", "fix hotspot positioning")
- Branch naming: `phase-N/feature-name`
- **Update `CHANGELOG.md` before every push.** Add entries under `[Unreleased]` using Added/Changed/Fixed/Removed sections. When a phase ships to main, move unreleased entries under a dated phase heading.

## Performance considerations

- Lazy-load every route except Home
- Audio files should be loaded on-demand per room, not upfront
- Images: prefer WebP/AVIF with PNG fallback. Use LQIP (Low Quality Image Placeholder) pattern for hero images.
- Sprite sheets for animations (see `WindowBirds` pattern)
- `village-ambience.wav` is 28MB — convert to compressed format before production

## Adding a new room/page

1. Create `src/pages/YourRoom/YourRoom.jsx` and `YourRoom.css`
2. Add a lazy import in `src/App.jsx` and a route entry
3. Add a hotspot entry in `hotspots.js` if it should appear in Memory Machine
4. If the room has audio: use `getAudioManager()`, call `activate()` on mount, `deactivate()` on cleanup
5. If the room has media that should pause bhajans: AudioManager already dispatches the event on `activate()`
6. Keep the room self-contained — all its components, styles, and data in its own folder
