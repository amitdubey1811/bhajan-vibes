import { usePlayer } from '../../context/PlayerContext'
import SceneImage from './SceneImage'
import NowPlaying from '../NowPlaying/NowPlaying'
import Player from '../Player/Player'
import Controls from '../Controls/Controls'
import { sceneImages } from '../../assets/scenes/scenes'
import './Scene.css'

/**
 * The full-viewport dawn scene. Left/top: the misty village image with
 * drifting mist and the now-playing title. Right/bottom: the plaster
 * wall holding the lamplit window (player), sill controls and a diya.
 */
export default function Scene() {
  const { index } = usePlayer()
  // Image follows the track; wraps when there are more tracks than images.
  const scene = sceneImages[index % sceneImages.length]

  return (
    <main className="scene">
      <div className="scene__image">
        <SceneImage src={scene.src} lqip={scene.lqip} alt="" />
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
