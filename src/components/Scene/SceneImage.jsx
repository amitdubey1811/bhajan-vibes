import { useEffect, useRef, useState } from 'react'
import './SceneImage.css'

/**
 * The dawn-village image layer. Two stacked <img> slots crossfade on
 * change: the incoming image is preloaded via new Image() (so it's fully
 * decoded — no cached-onLoad race), painted into the hidden slot, then the
 * visible slot is flipped, fading the new one in over the old (~1.1s).
 * Each slot also runs a slow Ken Burns zoom so the scene never feels
 * static. Both effects collapse to an instant swap / still frame under
 * prefers-reduced-motion (handled by the global rule).
 */
export default function SceneImage({ src = null, lqip = null, alt = '' }) {
  const [slots, setSlots] = useState([
    { src, lqip },
    { src: null, lqip: null },
  ])
  const [active, setActive] = useState(0)
  // Non-reactive view of what's currently shown, for the effect below.
  const stateRef = useRef({ active: 0, currentSrc: src })

  useEffect(() => {
    if (!src || stateRef.current.currentSrc === src) return
    let cancelled = false
    let done = false

    const showNext = () => {
      if (cancelled || done) return
      done = true
      const inactive = stateRef.current.active ^ 1
      setSlots((prev) => {
        const nextSlots = [...prev]
        nextSlots[inactive] = { src, lqip }
        return nextSlots
      })
      // Let the incoming slot paint (still hidden), then flip to fade it in.
      // setTimeout (not rAF) so the flip still happens if the tab is
      // backgrounded — rAF is paused while hidden.
      window.setTimeout(() => {
        if (cancelled) return
        stateRef.current = { active: inactive, currentSrc: src }
        setActive(inactive)
      }, 40)
    }

    const img = new Image()
    img.onload = showNext
    img.onerror = showNext // don't get stuck if one image fails
    img.src = src
    if (img.complete && img.naturalWidth > 0) showNext() // already cached

    return () => {
      cancelled = true
    }
  }, [src, lqip])

  return (
    <div className="scene-image">
      <div
        className="scene-image__lqip"
        style={lqip ? { backgroundImage: `url(${lqip})` } : undefined}
        aria-hidden="true"
      />

      {slots.map((slot, i) =>
        slot.src ? (
          <img
            key={i}
            className={`scene-image__full${i === active ? ' is-shown' : ''}`}
            src={slot.src}
            alt={i === active ? alt : ''}
            aria-hidden={i === active ? undefined : 'true'}
            decoding="async"
          />
        ) : null,
      )}

      <div className="scene-image__grade" aria-hidden="true" />
      <div className="scene-image__scrim" aria-hidden="true" />
    </div>
  )
}
