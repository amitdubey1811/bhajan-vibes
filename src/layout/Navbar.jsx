import { NavLink } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/memory-machine', label: 'Memory Machine' },
  { to: '/album', label: 'The Album' },
  { to: '/doordarshan', label: 'Doordarshan' },
  { to: '/radio', label: 'Radio' },
  { to: '/bhajans', label: 'Bhajans' },
  { to: '/drawer', label: 'The Drawer' },
  { to: '/letters', label: 'Letters' },
  { to: '/about', label: 'The Archive' },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand" aria-label="Nostalgia home">
        <span className="navbar__wordmark">NOSTALGIA</span>
        <span className="navbar__hindi">बचपन की यादें</span>
      </NavLink>

      <div className="navbar__links">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `navbar__link${isActive ? ' navbar__link--active' : ''}`
            }
            end={to === '/'}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
