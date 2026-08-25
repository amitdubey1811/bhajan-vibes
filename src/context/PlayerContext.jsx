import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getPlaylist } from '../lib/playlistSource'
import { useYouTubePlayer } from '../hooks/useYouTubePlayer'

const PLAYER_MOUNT_ID = 'yt-player'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [tracks, setTracks] = useState([])
  const slotRef = useRef(null)

  useEffect(() => {
    let active = true
    getPlaylist().then((list) => {
      if (active) setTracks(list)
    })
    return () => {
      active = false
    }
  }, [])

  const player = useYouTubePlayer({ tracks, mountId: PLAYER_MOUNT_ID })

  useEffect(() => {
    const handler = () => player.pause()
    window.addEventListener('external-audio-start', handler)
    return () => window.removeEventListener('external-audio-start', handler)
  }, [player.pause])

  const value = { ...player, mountId: PLAYER_MOUNT_ID, slotRef }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) {
    throw new Error('usePlayer must be used within <PlayerProvider>')
  }
  return ctx
}
