import { Link } from 'react-router-dom'
import heroBg from '../../assets/home/home-page-bg-1.png'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <div className="home__hero">
        <img
          className="home__bg"
          src={heroBg}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
        <div className="home__grain" aria-hidden="true" />
        <div className="home__vignette" aria-hidden="true" />
        <div className="home__scrim" aria-hidden="true" />

        <div className="home__content">
          <p className="home__eyebrow">ARCHIVE EXCLUSIVE · VOL. 01</p>
          <h1 className="home__headline">
            Before everything became digital, there was childhood.
          </h1>
          <p className="home__sub">
            A little corner of the internet for the places, sounds, songs,
            television, games and little things we thought we'd never forget.
          </p>
          <div className="home__ctas">
            <Link to="/memory-machine" className="home__cta home__cta--primary">
              ENTER YOUR CHILDHOOD →
            </Link>
            <Link to="/bhajans" className="home__cta home__cta--secondary">
              HEAR THE BHAJANS →
            </Link>
          </div>
        </div>

        <div className="home__sidebar" aria-hidden="true">
          <span className="home__sidebar-text">ARCHIVE EXCLUSIVE · VOL. 01</span>
        </div>
      </div>

      <div className="home__values">
        <div className="home__value">
          <span className="home__value-label">REAL MEMORIES</span>
          <span className="home__value-desc">Restored from tapes, albums & family archives</span>
        </div>
        <div className="home__value">
          <span className="home__value-label">NO ALGORITHMS</span>
          <span className="home__value-desc">No endless scroll. Just meaningful recall.</span>
        </div>
        <div className="home__value">
          <span className="home__value-label">MADE IN INDIA</span>
          <span className="home__value-desc">For every heart that still remembers home.</span>
        </div>
        <div className="home__value">
          <span className="home__value-label">MADE WITH LOVE</span>
          <span className="home__value-desc">For you. For us. For the memories.</span>
        </div>
      </div>
    </div>
  )
}
