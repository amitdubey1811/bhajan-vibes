import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hotspot.css'

export default function Hotspot({ id, label, icon, description, route, x, y, onHover, onLeave }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  const align = x < 20 ? 'left' : x > 80 ? 'right' : 'center'
  const vpos = y < 35 ? 'below' : 'above'

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev)
    onHover?.(id)
  }, [id, onHover])

  const handleNavigate = useCallback((e) => {
    e.stopPropagation()
    navigate(route)
  }, [navigate, route])

  const handleMouseEnter = () => {
    setExpanded(true)
    onHover?.(id)
  }

  const handleMouseLeave = () => {
    setExpanded(false)
    onLeave?.(id)
  }

  return (
    <div
      className={`hotspot${expanded ? ' hotspot--active' : ''} hotspot--align-${align} hotspot--${vpos}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Clickable pin area — toggles card on tap, hovers on desktop */}
      <button
        className="hotspot__trigger"
        onClick={handleToggle}
        aria-label={`${label} — ${description}`}
        aria-expanded={expanded}
      >
        <span className="hotspot__pin" aria-hidden="true" />
        <span className="hotspot__pulse" aria-hidden="true" />
        <span className="hotspot__mini-label" aria-hidden="true">{label}</span>
      </button>

      {/* Expanded card with description + navigate action */}
      <div className="hotspot__card" aria-hidden={!expanded}>
        <div className="hotspot__card-head">
          <span className="hotspot__icon">{icon}</span>
          <span className="hotspot__label">{label}</span>
        </div>
        <p className="hotspot__desc">{description}</p>
        <button className="hotspot__action" onClick={handleNavigate}>
          ENTER →
        </button>
      </div>
    </div>
  )
}
