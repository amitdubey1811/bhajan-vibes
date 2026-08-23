import { useState, useEffect, useRef } from 'react'
import spriteSheet from '../../assets/house/bird-sparrow.png'
import './WindowBirds.css'

export default function WindowBirds() {
  const [phase, setPhase] = useState('hidden')
  const timers = useRef([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    const t1 = setTimeout(() => setPhase('flying-in'), 3500)
    const t2 = setTimeout(() => setPhase('perched'), 5500)
    const t3 = setTimeout(() => setPhase('flying-out'), 9000)
    const t4 = setTimeout(() => setPhase('gone'), 11000)

    timers.current = [t1, t2, t3, t4]

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [])

  if (phase === 'hidden' || phase === 'gone') return null

  return (
    <div className="window-birds" aria-hidden="true">
      <div
        className={`window-birds__bird window-birds__bird--1 window-birds__bird--${phase}`}
        style={{ backgroundImage: `url(${spriteSheet})` }}
      />
    </div>
  )
}
