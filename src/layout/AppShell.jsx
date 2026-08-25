import { Outlet } from 'react-router-dom'
import { PlayerProvider } from '../context/PlayerContext'
import PersistentPlayer from '../components/PersistentPlayer/PersistentPlayer'
import Navbar from './Navbar'
import Footer from './Footer'

export default function AppShell() {
  return (
    <PlayerProvider>
      <Navbar />
      <Outlet />
      <PersistentPlayer />
      <Footer />
    </PlayerProvider>
  )
}
