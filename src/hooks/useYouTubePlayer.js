import { useCallback, useEffect, useRef, useState } from 'react'

const IFRAME_API_SRC = 'https://www.youtube.com/iframe_api'

/**
 * Loads the YouTube IFrame Player API exactly once, no matter how many
 * times this hook runs. Resolves with the global `YT` namespace.
 */
let apiPromise = null
function loadYouTubeIframeAPI() {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT)
      return
    }
    // YouTube calls this global once the script finishes loading.
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === 'function') previous()
      resolve(window.YT)
    }
    const tag = document.createElement('script')
    tag.src = IFRAME_API_SRC
    document.head.appendChild(tag)
  })
  return apiPromise
}

/**
 * Owns a single YT.Player mounted onto the element with id `mountId`,
 * and drives it across a list of tracks.
 *
 * @param {object}   opts
 * @param {Array}    opts.tracks         playlist (may start empty while loading)
 * @param {string}   opts.mountId        id of the div the player replaces
 * @param {number}   [opts.initialVolume]
 * @returns player state + imperative controls
 */
export function useYouTubePlayer({ tracks, mountId, initialVolume = 80 }) {
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false) // every track failed
  const [index, setIndex] = useState(0)
  const [volume, setVolume] = useState(initialVolume)

  const playerRef = useRef(null)
  const indexRef = useRef(0) // source of truth inside YT callbacks
  const startedRef = useRef(false) // has playback ever begun (a user gesture)?
  const errorStreakRef = useRef(0) // consecutive onError count
  const volumeRef = useRef(initialVolume)
  const tracksRef = useRef(tracks)
  tracksRef.current = tracks

  // Move to an index; cue (silent) or load (plays) based on `autoplay`.
  const goTo = useCallback((nextIndex, { autoplay }) => {
    const list = tracksRef.current
    if (!list.length) return
    const wrapped = ((nextIndex % list.length) + list.length) % list.length
    indexRef.current = wrapped
    setIndex(wrapped)
    const player = playerRef.current
    if (!player) return
    const ytId = list[wrapped].youtubeId
    if (autoplay) player.loadVideoById(ytId)
    else player.cueVideoById(ytId)
  }, [])

  const next = useCallback(() => {
    startedRef.current = true
    errorStreakRef.current = 0
    goTo(indexRef.current + 1, { autoplay: true })
  }, [goTo])

  const prev = useCallback(() => {
    startedRef.current = true
    errorStreakRef.current = 0
    goTo(indexRef.current - 1, { autoplay: true })
  }, [goTo])

  const changeVolume = useCallback((value) => {
    const clamped = Math.max(0, Math.min(100, Math.round(value)))
    volumeRef.current = clamped
    setVolume(clamped)
    if (playerRef.current) playerRef.current.setVolume(clamped)
  }, [])

  const handleStateChange = useCallback(
    (event) => {
      const YT = window.YT
      if (event.data === YT.PlayerState.PLAYING) {
        startedRef.current = true
        errorStreakRef.current = 0
      } else if (event.data === YT.PlayerState.ENDED) {
        goTo(indexRef.current + 1, { autoplay: true })
      }
    },
    [goTo],
  )

  const handleError = useCallback(
    (event) => {
      const list = tracksRef.current
      const failed = list[indexRef.current]
      console.warn(
        `[youtube] error ${event?.data} on "${failed?.id}" (${failed?.youtubeId}); skipping`,
      )
      errorStreakRef.current += 1
      if (errorStreakRef.current >= list.length) {
        // Whole playlist is unplayable — stop skipping, surface it.
        setHasError(true)
        return
      }
      // Preserve the no-autoplay rule: only keep playing if we already were.
      goTo(indexRef.current + 1, { autoplay: startedRef.current })
    },
    [goTo],
  )

  // Create the player once tracks are available and the mount exists.
  useEffect(() => {
    if (!tracks.length) return undefined
    let cancelled = false

    loadYouTubeIframeAPI().then((YT) => {
      if (cancelled || !document.getElementById(mountId)) return
      playerRef.current = new YT.Player(mountId, {
        width: '100%',
        height: '100%',
        videoId: tracksRef.current[indexRef.current].youtubeId,
        playerVars: {
          autoplay: 0,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            if (cancelled) return
            e.target.setVolume(volumeRef.current)
            setIsReady(true)
          },
          onStateChange: handleStateChange,
          onError: handleError,
        },
      })
    })

    return () => {
      cancelled = true
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }
      playerRef.current = null
      setIsReady(false)
    }
  }, [tracks, mountId, handleStateChange, handleError])

  return {
    isReady,
    hasError,
    index,
    currentTrack: tracks[index] ?? null,
    trackCount: tracks.length,
    next,
    prev,
    volume,
    setVolume: changeVolume,
  }
}
