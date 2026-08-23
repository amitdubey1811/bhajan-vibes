import { useState, useEffect, useCallback } from 'react'
import RoomScene from './RoomScene'
import { getAudioManager } from '../../audio/AudioManager'
import { hotspots } from './hotspots'
import './MemoryMachine.css'

const HOVER_SOUND_MAP = {
  bell: 'temple-bell',
  tv: 'tv-static',
  radio: 'radio-crackle',
}

export default function MemoryMachine() {
  const [phase, setPhase] = useState('entering')
  const [muted, setMuted] = useState(() => getAudioManager().isMuted)

  useEffect(() => {
    const timer = setTimeout(() => setPhase('revealed'), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let cancelled = false
    const am = getAudioManager()
    am.init()
    am.activate()

    async function loadAudio() {
      await am.loadSound('ceiling-fan', '/audio/ceiling-fan.wav')
      if (!cancelled) am.playLoop('ceiling-fan', { volume: 0.12, fadeIn: 3 })

      await am.loadSound('village-ambience', '/audio/village-ambience.wav')
      if (!cancelled) am.playLoop('village-ambience', { volume: 0.1, fadeIn: 4 })

      am.loadSound('temple-bell', '/audio/temple-bell.wav')
      am.loadSound('radio-crackle', '/audio/radio-crackle.mp3')
      am.loadSound('tv-static', '/audio/tv-static.m4a')
    }

    loadAudio()

    return () => {
      cancelled = true
      am.deactivate()
    }
  }, [])

  const handleMuteToggle = useCallback(() => {
    const am = getAudioManager()
    const nowMuted = am.toggleMute()
    setMuted(nowMuted)
  }, [])

  const handleHotspotHover = useCallback((id) => {
    const am = getAudioManager()
    const hotspot = hotspots.find(h => h.id === id)
    const soundName = hotspot?.hoverSound && HOVER_SOUND_MAP[hotspot.hoverSound]
    if (soundName) am.playOnce(soundName, { volume: 0.25 })
  }, [])

  const handleHotspotLeave = useCallback((id) => {
    const am = getAudioManager()
    const hotspot = hotspots.find(h => h.id === id)
    const soundName = hotspot?.hoverSound && HOVER_SOUND_MAP[hotspot.hoverSound]
    if (soundName) am.stopOneshot(soundName)
  }, [])

  return (
    <div className="memory-machine">
      <div
        className={`memory-machine__blackout${phase === 'revealed' ? ' memory-machine__blackout--gone' : ''}`}
        aria-hidden="true"
      />

      <RoomScene
        revealed={phase === 'revealed'}
        onHotspotHover={handleHotspotHover}
        onHotspotLeave={handleHotspotLeave}
      />

      <button
        className="memory-machine__mute"
        onClick={handleMuteToggle}
        aria-label={muted ? 'Unmute ambient sound' : 'Mute ambient sound'}
      >
        <span className="memory-machine__mute-icon" aria-hidden="true">
          {muted ? '🔇' : '🔊'}
        </span>
      </button>
    </div>
  )
}
