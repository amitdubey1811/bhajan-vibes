import { usePlayer } from '../../context/PlayerContext'
import Diya from '../Scene/Diya'
import './Player.css'

/**
 * The lamplit window: brass frame + dark recess holding the YouTube
 * iframe, with a wooden sill below. Per YouTube's terms nothing is ever
 * layered over the player — the glow sits strictly behind it.
 */
export default function Player() {
  const { mountId } = usePlayer()

  return (
    <div className="player">
      <div className="player__glow" aria-hidden="true" />

      <div className="player__window">
        <div className="player__recess">
          <div className="player__screen">
            {/* YT.Player replaces this node with the <iframe>. */}
            <div id={mountId} />
          </div>
        </div>
      </div>

      <div className="player__sill" aria-hidden="true" />

      {/* Lamp seated on the sill, kept left of the screen so it never
          overlaps the player. */}
      <div className="player__diya">
        <Diya />
      </div>
    </div>
  )
}
