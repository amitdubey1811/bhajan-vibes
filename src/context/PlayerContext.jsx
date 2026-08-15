import { createContext, useContext, useEffect, useState } from 'react'
import { getPlaylist } from '../lib/playlistSource'
import { useYouTubePlayer } from '../hooks/useYouTubePlayer'

// The element the YT.Player replaces. Shared so Player renders the mount
// and the hook targets the same id.
const PLAYER_MOUNT_ID = 'yt-player'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [tracks, setTracks] = useState([])

  // Single data-access point (swappable to HTTP in Phase 2).
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

  const value = { ...player, mountId: PLAYER_MOUNT_ID }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) {
    throw new Error('usePlayer must be used within <PlayerProvider>')
  }
  return ctx
}
