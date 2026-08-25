import { usePlayer } from '../../context/PlayerContext'
import Diya from '../Scene/Diya'
import './Player.css'

export default function Player() {
  const { slotRef } = usePlayer()

  return (
    <div className="player">
      <div className="player__glow" aria-hidden="true" />

      <div className="player__window">
        <div className="player__recess">
          <div className="player__screen" ref={slotRef} />
        </div>
      </div>

      <div className="player__sill" aria-hidden="true" />

      <div className="player__diya">
        <Diya />
      </div>
    </div>
  )
}
