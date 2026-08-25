# Nostalgia — बचपन की यादें

A nostalgic web experience recreating the warmth of growing up in 1990s India. Explore childhood memories through bhajans, Doordarshan shows, radio sounds, family photo albums, and an interactive Memory Machine room.

## Tech Stack

- **React 19** with Vite
- **React Router v6** — client-side routing with lazy-loaded pages
- **Web Audio API** — ambient soundscapes in the Memory Machine
- **YouTube IFrame API** — bhajan player (no API key required)
- **Plain CSS** — custom properties, no CSS framework

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── assets/            # Images, sprites, scene data
├── audio/             # AudioManager (Web Audio API singleton)
├── components/        # Shared components (Player, Controls, Scene, NowPlaying)
├── context/           # React context providers (PlayerContext)
├── hooks/             # Custom hooks (useYouTubePlayer)
├── layout/            # App shell, Navbar, Footer
├── lib/               # Data utilities (playlistSource)
├── pages/             # Route pages
│   ├── Home/          # Landing page with hero + paper strip
│   ├── Bhajans/       # Bhajan player with YouTube integration
│   └── MemoryMachine/ # Interactive room with hotspots + ambient audio
├── styles/            # Design tokens + global styles
├── App.jsx            # Router configuration
└── main.jsx           # Entry point
```

## Routes

| Path | Page | Status |
|------|------|--------|
| `/` | Homepage | Live |
| `/bhajans` | Bhajan Player | Live |
| `/memory-machine` | Interactive Memory Room | Live |
| `/album` | Photo Wall | Coming Soon |
| `/doordarshan` | Doordarshan TV | Coming Soon |
| `/radio` | Vividh Bharati Dial | Coming Soon |
| `/drawer` | Cassettes & Treasures | Coming Soon |
| `/letters` | Inland Letter Box | Coming Soon |

## Design

- **Color palette**: Warm sepia tones — deep brown, ivory, terracotta, accent orange
- **Typography**: Cormorant Garamond (headings), Libre Baskerville (body), IBM Plex Mono (labels), Noto Serif Devanagari (Hindi)
- **Aesthetic**: Old Indian family archive from the late 1980s–1990s

## Build

```bash
npm run build
npm run preview
```

## License

Private project.
