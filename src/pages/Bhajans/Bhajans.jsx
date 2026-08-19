import { PlayerProvider } from '../../context/PlayerContext'
import Scene from '../../components/Scene/Scene'

export default function Bhajans() {
  return (
    <PlayerProvider>
      <Scene />
    </PlayerProvider>
  )
}
