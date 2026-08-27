import { NavLink } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/album', label: 'The Album' },
  { to: '/doordarshan', label: 'Doordarshan' },
  { to: '/radio', label: 'Radio' },
  { to: '/bhajans', label: 'Bhajans' },
  { to: '/drawer', label: 'The Drawer' },
  { to: '/memory-machine', label: 'Memory Machine' },
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

      <div className="navbar__icon" aria-hidden="true">
        <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="26" height="16" rx="2" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="7" cy="9" r="3.5" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="21" cy="9" r="3.5" stroke="currentColor" strokeWidth="0.7" />
          <line x1="10.5" y1="9" x2="17.5" y2="9" stroke="currentColor" strokeWidth="0.5" />
          <line x1="10.5" y1="7.5" x2="17.5" y2="7.5" stroke="currentColor" strokeWidth="0.3" />
          <line x1="10.5" y1="10.5" x2="17.5" y2="10.5" stroke="currentColor" strokeWidth="0.3" />
        </svg>
      </div>
    </nav>
  )
}
