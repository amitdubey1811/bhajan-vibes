import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__torn" aria-hidden="true" />
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__wordmark">Nostalgia</span>
          <p className="footer__desc">
            An archival corner of the internet for the places, sounds, songs,
            television, games and little things we thought we'd never forget.
          </p>
          <span className="footer__division">CLARITY AUDIO DIVISION</span>
        </div>

        <div className="footer__col">
          <span className="footer__heading">Archives</span>
          <Link to="/album" className="footer__link">The Album</Link>
          <Link to="/doordarshan" className="footer__link">Doordarshan TV</Link>
          <Link to="/drawer" className="footer__link">Cassette Tapes</Link>
          <Link to="/drawer" className="footer__link">Childhood Games</Link>
        </div>

        <div className="footer__col">
          <span className="footer__heading">Interactive</span>
          <Link to="/memory-machine" className="footer__link">Memory Machine</Link>
          <Link to="/bhajans" className="footer__link">Bhajan Player</Link>
          <Link to="/radio" className="footer__link">Vividh Bharati Dial</Link>
        </div>

        <div className="footer__col">
          <span className="footer__stamp">
            NOSTALGIA ARCHIVE<br />
            ROLL NO. 001<br />
            INDIA · 1989–2004
          </span>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Nostalgia — बचपन की यादें</span>
      </div>
    </footer>
  )
}
