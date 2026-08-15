import { PlayerProvider } from './context/PlayerContext'
import Scene from './components/Scene/Scene'

export default function App() {
  return (
    <PlayerProvider>
      <Scene />
    </PlayerProvider>
  )
}
