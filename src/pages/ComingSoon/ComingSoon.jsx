import { useLocation, Link } from 'react-router-dom'
import './ComingSoon.css'

const routeNames = {
  '/memory-machine': { title: 'Memory Machine', hindi: 'स्मृति यंत्र' },
  '/album': { title: 'The Album', hindi: 'तस्वीरें' },
  '/doordarshan': { title: 'Doordarshan', hindi: 'दूरदर्शन' },
  '/radio': { title: 'Radio', hindi: 'रेडियो' },
  '/drawer': { title: 'The Drawer', hindi: 'दराज़' },
  '/letters': { title: 'Inland Letters', hindi: 'अंतर्देशीय पत्र' },
  '/about': { title: 'The Archive', hindi: 'संग्रह' },
}

export default function ComingSoon() {
  const { pathname } = useLocation()
  const route = routeNames[pathname] || { title: 'Coming Soon', hindi: '' }

  return (
    <div className="coming-soon">
      <div className="coming-soon__inner">
        <span className="coming-soon__eyebrow">ARCHIVE IN PROGRESS</span>
        <h1 className="coming-soon__title">{route.title}</h1>
        {route.hindi && (
          <p className="coming-soon__hindi">{route.hindi}</p>
        )}
        <p className="coming-soon__desc">
          This memory is still being restored from the archives.
          <br />
          Come back soon — some things are worth waiting for.
        </p>
        <Link to="/" className="coming-soon__back">← Return Home</Link>
      </div>
    </div>
  )
}
