import { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { usePlayer } from '../../context/PlayerContext'
import './PersistentPlayer.css'

export default function PersistentPlayer() {
  const {
    mountId,
    isPlaying,
    isReady,
    slotRef,
    togglePlay,
    currentTrack,
    next,
    prev,
  } = usePlayer()
  const location = useLocation()
  const containerRef = useRef(null)
  const [slotRect, setSlotRect] = useState(null)
  const [dismissed, setDismissed] = useState(false)
  const [miniVisible, setMiniVisible] = useState(false)

  const onBhajans = location.pathname === '/bhajans'

  // Reset dismissed when navigating to a new page
  useEffect(() => {
    setDismissed(false)
  }, [location.pathname])

  // Show mini player when playing on a non-bhajans page; keep it visible even when paused
  useEffect(() => {
    if (onBhajans) {
      setMiniVisible(false)
      return
    }
    if (isPlaying && !dismissed) {
      setMiniVisible(true)
    }
  }, [isPlaying, onBhajans, dismissed])

  // Track the slot element's bounding rect when on /bhajans
  useEffect(() => {
    if (!onBhajans) {
      setSlotRect(null)
      return
    }

    const checkSlot = () => {
      const el = slotRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const scrollTop = window.scrollY || 0
      const scrollLeft = window.scrollX || 0
      setSlotRect((prev) => {
        const top = r.top + scrollTop
        const left = r.left + scrollLeft
        if (prev && prev.top === top && prev.left === left && prev.width === r.width && prev.height === r.height) return prev
        return { top, left, width: r.width, height: r.height }
      })
    }

    // Slot might not be mounted yet — poll briefly
    checkSlot()
    const interval = setInterval(checkSlot, 100)
    const timeout = setTimeout(() => clearInterval(interval), 2000)

    const el = slotRef.current
    let ro
    if (el) {
      ro = new ResizeObserver(checkSlot)
      ro.observe(el)
    }

    window.addEventListener('resize', checkSlot, { passive: true })

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      ro?.disconnect()
      window.removeEventListener('resize', checkSlot)
    }
  }, [onBhajans, slotRef])

  const handleDismiss = useCallback(() => {
    if (isPlaying) togglePlay()
    setDismissed(true)
    setMiniVisible(false)
  }, [isPlaying, togglePlay])

  // Determine display mode
  let mode = 'hidden'
  if (onBhajans && slotRect) {
    mode = 'embedded'
  } else if (!onBhajans && miniVisible && !dismissed) {
    mode = 'mini'
  }

  let style = {}
  if (mode === 'embedded') {
    style = {
      position: 'absolute',
      top: slotRect.top,
      left: slotRect.left,
      width: slotRect.width,
      height: slotRect.height,
      zIndex: 10,
      borderRadius: 0,
    }
  }

  return (
    <div
      ref={containerRef}
      className={`persistent-player persistent-player--${mode}`}
      style={mode === 'embedded' ? style : undefined}
    >
      <div className="persistent-player__iframe" id={mountId} />

      {mode === 'mini' && (
        <div className="persistent-player__bar">
          <span className="persistent-player__track">
            {currentTrack?.titleDevanagari || currentTrack?.title || ''}
          </span>
          <div className="persistent-player__actions">
            <button
              className="persistent-player__btn"
              onClick={prev}
              disabled={!isReady}
              aria-label="Previous"
            >
              &#9664;&#9664;
            </button>
            <button
              className="persistent-player__btn persistent-player__btn--play"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              className="persistent-player__btn"
              onClick={next}
              disabled={!isReady}
              aria-label="Next"
            >
              &#9654;&#9654;
            </button>
            <button
              className="persistent-player__btn persistent-player__btn--close"
              onClick={handleDismiss}
              aria-label="Close mini player"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
