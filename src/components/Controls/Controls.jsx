import { usePlayer } from '../../context/PlayerContext'
import './Controls.css'

// YouTube/iOS ignores programmatic volume on iPhone & iPadOS — hide the
// control there rather than show a dead slider.
const IS_IOS = (() => {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const iPhone = /iPad|iPhone|iPod/.test(ua)
  const iPadOS = navigator.maxTouchPoints > 1 && /Macintosh/.test(ua)
  return iPhone || iPadOS
})()

export default function Controls() {
  const { prev, next, volume, setVolume, trackCount, isReady, isPlaying, togglePlay } =
    usePlayer()

  const openPlaylist = () => {
    // Playlist panel is out of Phase-1 scope; the trigger exists per spec.
  }

  return (
    <div className="controls">
      <button
        type="button"
        className="controls__knob"
        onClick={prev}
        disabled={!isReady}
        aria-label="Previous bhajan"
      >
        <span className="controls__icon controls__icon--prev" aria-hidden="true" />
      </button>

      <button
        type="button"
        className="controls__knob controls__knob--play"
        onClick={togglePlay}
        disabled={!isReady}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <span className="controls__icon--pause" aria-hidden="true">
            <span />
            <span />
          </span>
        ) : (
          <span className="controls__icon controls__icon--play" aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        className="controls__knob"
        onClick={next}
        disabled={!isReady}
        aria-label="Next bhajan"
      >
        <span className="controls__icon controls__icon--next" aria-hidden="true" />
      </button>

      {!IS_IOS && (
        <label className="controls__volume">
          <span className="controls__label">VOLUME</span>
          <input
            className="controls__slider"
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
          />
        </label>
      )}

      <button
        type="button"
        className="controls__playlist"
        onClick={openPlaylist}
        aria-label={`Open playlist, ${trackCount} bhajans`}
      >
        <span className="controls__ring" aria-hidden="true" />
        <span className="controls__label controls__label--hi" lang="hi">
          {trackCount} भजन
        </span>
      </button>
    </div>
  )
}
