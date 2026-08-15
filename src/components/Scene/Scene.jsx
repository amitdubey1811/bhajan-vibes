import SceneImage from './SceneImage'
import Mist from './Mist'
import NowPlaying from '../NowPlaying/NowPlaying'
import Player from '../Player/Player'
import Controls from '../Controls/Controls'
import './Scene.css'

/**
 * The full-viewport dawn scene. Left/top: the misty village image with
 * drifting mist and the now-playing title. Right/bottom: the plaster
 * wall holding the lamplit window (player), sill controls and a diya.
 */
export default function Scene() {
  return (
    <main className="scene">
      <div className="scene__image">
        <SceneImage />
        <Mist />
        <div className="scene__now">
          <NowPlaying />
        </div>
      </div>

      <div className="scene__wall">
        <div className="scene__wall-texture" aria-hidden="true" />
        <div className="scene__wall-content">
          <Player />
          <Controls />
        </div>
      </div>
    </main>
  )
}
