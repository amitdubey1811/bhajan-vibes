import roomBase from '../../assets/house/room-base.png'
import Hotspot from './Hotspot'
import DustParticles from './DustParticles'
import WindowBirds from './WindowBirds'
import { hotspots } from './hotspots'
import './RoomScene.css'

export default function RoomScene({ revealed, onHotspotHover, onHotspotLeave }) {
  return (
    <div className={`room${revealed ? ' room--revealed' : ''}`}>
      {/* Layer 0: Base room image */}
      <img
        className="room__base"
        src={roomBase}
        alt="An old Indian home interior with wooden doors open to a sunlit courtyard"
        decoding="async"
      />

      {/* Layer: Slow Ken Burns drift */}
      <div className="room__drift" aria-hidden="true" />

      {/* Layer: Sunlight rays through doorway */}
      <div className="room__sunlight" aria-hidden="true" />

      {/* Layer: TV glow / flicker */}
      <div className="room__tv-glow" aria-hidden="true" />

      {/* Layer: Dust particles in sunlight */}
      <DustParticles />

      {/* Layer: Sparrows visiting the window */}
      {revealed && <WindowBirds />}

      {/* Layer: Film grain */}
      <div className="room__grain" aria-hidden="true" />

      {/* Layer: Vignette */}
      <div className="room__vignette" aria-hidden="true" />

      {/* Layer: Interactive hotspots */}
      <div className="room__hotspots">
        {hotspots.map((h) => (
          <Hotspot
            key={h.id}
            {...h}
            onHover={onHotspotHover}
            onLeave={onHotspotLeave}
          />
        ))}
      </div>

      {/* UI: Location badge */}
      <div className="room__badge room__badge--location">
        <span className="room__badge-text">
          You are in the <strong>Memory House</strong>
        </span>
        <span className="room__badge-sub">Explore. Click. Relive.</span>
      </div>

      {/* UI: Time badge */}
      <div className="room__badge room__badge--time">
        <span className="room__badge-day">Sunday</span>
        <span className="room__badge-clock">4:32 PM</span>
        <span className="room__badge-year">1997</span>
      </div>

      {/* UI: Archive stamp */}
      <div className="room__stamp" aria-hidden="true">
        MEMORY MACHINE<br />
        HOUSE NO. 01<br />
        INDIA · 1989–2004
      </div>

      {/* UI: Nostalgia tip */}
      <div className="room__tip">
        <span className="room__tip-label">NOSTALGIA TIP</span>
        <p className="room__tip-text">
          Take your time. There is no rush here. Every corner has a story.
        </p>
      </div>
    </div>
  )
}
