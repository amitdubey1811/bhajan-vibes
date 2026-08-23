import { Link } from 'react-router-dom'
import heroBg from '../../assets/home/home-page-bg-1.png'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <img
          className="hero__bg"
          src={heroBg}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__vignette" aria-hidden="true" />
        <div className="hero__grain" aria-hidden="true" />

        <div className="hero__content">
          <div className="hero__eyebrow-wrap">
            <span className="hero__eyebrow-line" aria-hidden="true" />
            <span className="hero__eyebrow">ARCHIVE EXCLUSIVE · VOL. 01</span>
          </div>

          <h1 className="hero__headline">
            Before<br />
            everything<br />
            became digital,<br />
            there was<br />
            childhood.
          </h1>

          <p className="hero__sub">
            A little corner of the internet for the places, sounds, songs,
            television, games and little things we thought we'd never forget.
          </p>

          <div className="hero__ctas">
            <Link to="/memory-machine" className="hero__cta hero__cta--primary">
              Enter Your Childhood →
            </Link>
            <Link to="/bhajans" className="hero__cta hero__cta--secondary">
              Open the Archive →
            </Link>
          </div>
        </div>

        <div className="hero__sidebar" aria-hidden="true">
          <span className="hero__sidebar-text">ARCHIVE EXCLUSIVE · VOL. 81</span>
        </div>
      </section>

      <section className="paper-strip">
        <div className="paper-strip__torn paper-strip__torn--top" aria-hidden="true" />
        <div className="paper-strip__texture" aria-hidden="true" />
        <div className="paper-strip__inner">
          <div className="paper-strip__item">
            <div className="paper-strip__icon" aria-hidden="true">
              <svg width="36" height="24" viewBox="0 0 36 24" fill="none">
                <rect x="1" y="1" width="34" height="22" rx="2" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="10" cy="12" r="5" stroke="currentColor" strokeWidth="0.7" />
                <circle cx="26" cy="12" r="5" stroke="currentColor" strokeWidth="0.7" />
                <line x1="15" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="0.5" />
                <line x1="15" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="0.3" />
                <line x1="15" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="0.3" />
              </svg>
            </div>
            <span className="paper-strip__label">Real Memories</span>
            <span className="paper-strip__desc">
              Restored from tapes,<br />albums & family archives
            </span>
          </div>

          <div className="paper-strip__item">
            <div className="paper-strip__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="2" width="24" height="24" rx="1" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="0.7" />
                <line x1="14" y1="6" x2="14" y2="8" stroke="currentColor" strokeWidth="0.5" />
                <line x1="14" y1="20" x2="14" y2="22" stroke="currentColor" strokeWidth="0.5" />
                <line x1="6" y1="14" x2="8" y2="14" stroke="currentColor" strokeWidth="0.5" />
                <line x1="20" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            <span className="paper-strip__label">No Algorithms</span>
            <span className="paper-strip__desc">
              No endless scroll.<br />Just meaningful recall.
            </span>
          </div>

          <div className="paper-strip__item">
            <div className="paper-strip__icon" aria-hidden="true">
              <svg width="28" height="30" viewBox="0 0 28 30" fill="none">
                <rect x="2" y="4" width="24" height="18" rx="1" stroke="currentColor" strokeWidth="0.8" />
                <rect x="4" y="6" width="20" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="28" x2="28" y2="28" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="6" cy="28" r="1" fill="currentColor" />
                <circle cx="22" cy="28" r="1" fill="currentColor" />
                <line x1="8" y1="2" x2="8" y2="4" stroke="currentColor" strokeWidth="0.5" />
                <line x1="20" y1="2" x2="20" y2="4" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            <span className="paper-strip__label">Made in India</span>
            <span className="paper-strip__desc">
              For every heart that<br />still remembers home.
            </span>
          </div>

          <div className="paper-strip__item">
            <div className="paper-strip__icon" aria-hidden="true">
              <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
                <path d="M13 22C13 22 2 15 2 8.5C2 5 4.5 2 8 2C10 2 11.8 3.2 13 5C14.2 3.2 16 2 18 2C21.5 2 24 5 24 8.5C24 15 13 22 13 22Z" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </div>
            <span className="paper-strip__label">Made with Love</span>
            <span className="paper-strip__desc">
              For you. For us.<br />For the memories.
            </span>
          </div>

          <div className="paper-strip__stamp" aria-hidden="true">
            NOSTALGIA ARCHIVE<br />
            ROLL NO. 001<br />
            INDIA · 1989–2004
          </div>
        </div>
        <div className="paper-strip__torn paper-strip__torn--bottom" aria-hidden="true" />
      </section>
    </div>
  )
}
