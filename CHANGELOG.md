# Changelog

All notable changes to Nostalgia — बचपन की यादें are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/). Phases map to major feature milestones.

---

## [Unreleased] — Phase 4 (continued)

### Added
- Professional `README.md` with project overview, tech stack, structure, routes, and design info
- `CLAUDE.md` with architecture guidelines, scaling rules, design language, and security constraints
- `CHANGELOG.md` to track version history across phases
- **Persistent bhajan player** — music continues playing across all route navigation
  - `PersistentPlayer` component with three modes: embedded (on /bhajans), mini floating player (other pages), hidden (when not playing)
  - Mini player at bottom-right with track title, play/pause, prev/next, and close controls
  - `PlayerProvider` lifted from Bhajans page to AppShell level
  - `pause()` method added to `useYouTubePlayer` hook
- **Audio coordination system** — `AudioManager.activate()` dispatches `'external-audio-start'` event, bhajan player auto-pauses when Memory Machine (or any future room) audio starts
- **Doordarshan TV page** (`/doordarshan`) — full nostalgic DD National experience
  - Dark hero section with CRT TV test card, DD branding, Hindi subtitle
  - 9-category filter (ALL, Patriotic, Community, Fiction, Drama, News, Songs, Epic Myth, Sign-Off)
  - 12 classic show cards (Malgudi Days, Shaktimaan, Mahabharat, Ramayan, etc.) with VHS-style gradient covers, Hindi titles, and descriptions
  - "The Hindustan Transmission" newspaper-style TV schedule with 17 time slots
  - Test Card & Sign-Off section with color bars and sign-off description
  - Self-contained data in `shows.js` (shows, categories, schedule)
- **Radio page** (`/radio`) — nostalgic AM/FM radio experience
  - Teak radio cabinet hero with grille lines, tuning dial, and frequency needle
  - 3 retro Indian live stations (AIR, Vividh Bharati, FM Rainbow) with on-air badges
  - Self-contained data in `stations.js`
- **Album page** (`/album`) — family photo album archive
  - Full-bleed hero with Yashica camera desk background and sepia overlay
  - Browse Albums grid with 6 album cards (Life in the 90s, Family Times, School Days, etc.)
  - Cream background browse section with gold-framed album cards
  - Self-contained data in `albums.js`
- **The Drawer page** (`/drawer`) — interactive forgotten treasures drawer
  - Table scene background with warm afternoon light, dust particles, and sepia filter
  - Wooden drawer with brass knob — click to open with 3D rotateX animation
  - Green velvet-lined drawer interior with 7 childhood objects scattered inside
  - Objects: Papa's cassette (TDK D90), inland letter (Kanpur 1996), school photograph, UPSRTC bus ticket, KV report card, 50 paise coin, Camlin fountain pen
  - Click any object for a detail overlay with image, Hindi label, and nostalgic memory text
  - Backdrop blur overlay with fade-in animation
  - Self-contained data in `objects.js`

### Changed
- `AppShell.jsx` — now wraps children in `PlayerProvider` and renders `PersistentPlayer`
- `Player.jsx` — renders visual brass frame only; iframe lives in `PersistentPlayer`
- `Bhajans.jsx` — removed `PlayerProvider` wrapper (now at app level)
- `PlayerContext.jsx` — added `slotRef` for iframe positioning, listens for external audio events
- `App.jsx` — Radio, Album, and Drawer routes now load actual pages instead of ComingSoon
- Home page hero overlay brightened to preserve original image warmth
- Album hero overlay balanced for nostalgia feel with text readability

---

## [Phase 4] — Memory Machine — 2026-08-23

### Added
- **Memory Machine** interactive room (`/memory-machine`) with full-bleed room photograph
- 7 hotspot overlays (Bhajans, Photo Wall, Doordarshan, Radio Corner, The Drawer, Courtyard, Letters Desk) with pulsing pin animations and hover labels
- `AudioManager` singleton for Web Audio API — manages ambient loops and one-shot hover sounds
- 5 ambient audio files: ceiling fan, village ambience, temple bell, radio crackle, TV static
- Dust particles in sunlight (66 particles, concentrated in window light area)
- Sparrow bird sprite animation — flies in from window, perches, flies away
- Mute/unmute toggle for ambient audio
- Location badge, time badge ("Sunday 4:32 PM 1997"), archive stamp, nostalgia tip overlay
- Ken Burns drift, sunlight rays, TV glow, film grain, and vignette layers

### Fixed
- Hover sounds stop immediately on mouse leave (oneshot tracking in AudioManager)
- Mute button kills all active audio sources instantly (no fade leak)
- Audio cleanup on page leave — `deactivate()` suspends AudioContext entirely

---

## [Phase 4] — Nostalgia Platform & Homepage — 2026-08-20

### Added
- **Nostalgia homepage** (`/`) with full-bleed hero image of an old Indian house
- Multi-route architecture with React Router v6 (`createBrowserRouter`)
- `AppShell` layout with `Navbar` + `Outlet` + `Footer`
- Navbar with 9 route links and nostalgic branding (NOSTALGIA बचपन की यादें)
- Footer with archive sections, route links, and archival stamp
- "Coming Soon" placeholder page for unbuilt routes
- New hex-based color palette alongside legacy RGB triplets in `tokens.css`
- 4 feature cards on homepage (Real Memories, No Algorithms, Made in India, Made with Love)

### Changed
- Bhajan player moved from root to `/bhajans` route
- Lazy loading for all routes except Home

---

## [Phase 3] — High-Res Scene Backdrops — 2026-08-17

### Changed
- Replaced 10 placeholder-resolution scene images with high-res 1024x1536 versions
- Added scene-11 (cow-lane dawn scene) — rotation now wraps across dawn + 11 scenes
- Regenerated all LQIP (Low Quality Image Placeholder) data
- Removed `<Mist>` overlay from scene (photographs carry their own atmosphere)

---

## [Phase 2] — Scene Cycling & Extended Playlist — 2026-08-16

### Added
- Scene image registry (dawn + 10 scenes) that cycles with track index
- 3 additional bhajans to the playlist

### Changed
- Scene backdrop changes automatically when track advances
- Background wraps when tracks outnumber images (`trackIndex % length`)

---

## [Phase 1] — "Lit Window" Bhajan Player — 2026-08-15

### Added
- Full-viewport dawn scene (Vite + React 19, plain CSS with design tokens)
- YouTube IFrame Player API integration via `useYouTubePlayer` hook
  - No API key, no Data API
  - No autoplay (first play requires user gesture)
  - Auto-advances on track end, skips on error with full-cycle guard
- Brass-framed player window (>=240px, unobstructed at all breakpoints)
- Plaster wall with wooden sill, diya lamp with flame animation
- Play/pause, prev/next, volume slider controls (volume hidden on iOS)
- `NowPlaying` display with Devanagari title, singer, and year
- Design token system (`tokens.css`) — colors, typography, spacing, shadows, motion
- `playlistSource` data abstraction (swappable to HTTP later)
- LQIP lazy-image loading via `SceneImage`
- Mobile-first responsive layout, keyboard accessible, `prefers-reduced-motion` support
- Mist drift, glow pulse, film grain ambient animations
