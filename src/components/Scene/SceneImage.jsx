import { useState } from 'react'
import './SceneImage.css'

/**
 * The dawn-village image layer. Renders a low-res/gradient placeholder
 * immediately and (when `src` is supplied) fades the full image in over
 * it. Swapping in the real asset is a props change, not a restructure.
 */
export default function SceneImage({ src = null, lqip = null, alt = '' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="scene-image">
      <div
        className="scene-image__lqip"
        style={lqip ? { backgroundImage: `url(${lqip})` } : undefined}
        aria-hidden="true"
      />

      {src && (
        <img
          className={`scene-image__full${loaded ? ' is-loaded' : ''}`}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      )}

      <div className="scene-image__grade" aria-hidden="true" />
      <div className="scene-image__scrim" aria-hidden="true" />
    </div>
  )
}
