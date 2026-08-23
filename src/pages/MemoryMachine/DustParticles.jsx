import { useMemo } from 'react'
import './DustParticles.css'

const GENERAL_COUNT = 38
const SUNLIGHT_COUNT = 28

export default function DustParticles() {
  const particles = useMemo(() => {
    const general = Array.from({ length: GENERAL_COUNT }, (_, i) => ({
      id: i,
      left: `${15 + Math.random() * 55}%`,
      top: `${10 + Math.random() * 60}%`,
      size: 1.5 + Math.random() * 2.5,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * -20,
      drift: -15 + Math.random() * 30,
      opacity: 0.15 + Math.random() * 0.35,
    }))

    const sunlight = Array.from({ length: SUNLIGHT_COUNT }, (_, i) => ({
      id: GENERAL_COUNT + i,
      left: `${3 + Math.random() * 22}%`,
      top: `${8 + Math.random() * 55}%`,
      size: 2 + Math.random() * 3,
      duration: 10 + Math.random() * 14,
      delay: Math.random() * -15,
      drift: -8 + Math.random() * 16,
      opacity: 0.3 + Math.random() * 0.45,
    }))

    return [...general, ...sunlight]
  }, [])

  return (
    <div className="dust" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="dust__mote"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
