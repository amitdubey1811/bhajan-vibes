import { usePlayer } from '../../context/PlayerContext'
import './NowPlaying.css'

export default function NowPlaying() {
  const { currentTrack, hasError } = usePlayer()

  if (!currentTrack) return null

  return (
    <div className="now-playing">
      <p className="now-playing__eyebrow">Now Playing</p>
      <h1 className="now-playing__title" lang="hi">
        {currentTrack.titleDevanagari}
      </h1>
      <p className="now-playing__singer">
        {currentTrack.singer} · {currentTrack.year}
      </p>
      {hasError && (
        <p className="now-playing__note" role="status">
          Tracks unavailable — replace the placeholder YouTube IDs.
        </p>
      )}
    </div>
  )
}
