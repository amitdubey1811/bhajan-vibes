import { useState } from 'react'
import { shows } from './shows'
import './Doordarshan.css'

function Hero() {
  const [channel, setChannel] = useState('national')

  return (
    <section className="dd-hero">
      <div className="dd-hero__grain" aria-hidden="true" />
      <div className="dd-hero__scanlines" aria-hidden="true" />
      <div className="dd-hero__content">
        <h1 className="dd-hero__title">
          DD National Live<br />Broadcast
        </h1>
        <p className="dd-hero__subtitle">
          For every national broadcast is lost. Before the original morning hymns
          of Pandit Ravi Shankar and the colorful morning spectra logo.
        </p>
        <div className="dd-hero__tv">
          <div className="dd-hero__tv-cabinet">
            <div className="dd-hero__tv-bezel">
              <div className="dd-hero__tv-screen">
                <img
                  className="dd-hero__tv-img"
                  src="/images/doordarshan/dd-logo.jpg"
                  alt="Doordarshan — दूरदर्शन — सत्यम् शिवम् सुन्दरम्"
                />
                <div className="dd-hero__tv-glare" aria-hidden="true" />
                <div className="dd-hero__tv-scanlines" aria-hidden="true" />
              </div>
              <div className="dd-hero__tv-knobs">
                <span className="dd-hero__tv-knob" />
                <span className="dd-hero__tv-knob" />
                <span className="dd-hero__tv-knob" />
              </div>
            </div>
            <div className="dd-hero__tv-body">
              <div className="dd-hero__tv-brand">
                <span className="dd-hero__tv-brand-name">CROWN TV</span>
                <span className="dd-hero__tv-brand-sub">SOLID STATE</span>
              </div>
              <div className="dd-hero__tv-toggle">
                <span className="dd-hero__tv-toggle-label">ON/OFF</span>
                <span className="dd-hero__tv-toggle-switch">
                  <span className="dd-hero__tv-toggle-knob" />
                </span>
              </div>
            </div>
          </div>
          <div className="dd-hero__tv-price">840 × 583 Hug</div>
        </div>
        <div className="dd-hero__channels">
          <span className="dd-hero__channels-label">Choose your frequency</span>
          <div className="dd-hero__channels-btns">
            <button
              className={`dd-hero__channel-btn ${channel === 'national' ? 'dd-hero__channel-btn--active' : ''}`}
              onClick={() => setChannel('national')}
            >
              DD NATIONAL (PRIMARY)
            </button>
            <button
              className={`dd-hero__channel-btn ${channel === 'metro' ? 'dd-hero__channel-btn--active' : ''}`}
              onClick={() => setChannel('metro')}
            >
              DD METRO (ENTERTAINMENT)
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ShowCard({ show }) {
  return (
    <article className="dd-show">
      <div className="dd-show__cover" style={show.image ? undefined : { background: show.gradient }}>
        {show.image && (
          <img className="dd-show__poster" src={show.image} alt={show.title} loading="lazy" />
        )}
        <span className="dd-show__tag">{show.category}</span>
        <div className="dd-show__vhs-label">
          <span className="dd-show__vhs-brand">VHS · E-180</span>
        </div>
      </div>
      <div className="dd-show__info">
        <h3 className="dd-show__title">{show.title}</h3>
        <span className="dd-show__title-hi">{show.titleHi}</span>
        <span className="dd-show__year">{show.year}</span>
        <p className="dd-show__desc">{show.description}</p>
      </div>
    </article>
  )
}

function ShowsGrid({ filteredShows }) {
  return (
    <section className="dd-shows">
      <div className="dd-shows__header">
        <span className="dd-shows__label">CLASSIC SHOWS ON VHS</span>
        <h2 className="dd-shows__heading">The Golden Collection</h2>
        <p className="dd-shows__sub">
          Every cassette in this rack is a time machine. Pick one, slide it in, and press play.
        </p>
      </div>
      <div className="dd-shows__grid">
        {filteredShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </section>
  )
}

export default function Doordarshan() {
  return (
    <div className="doordarshan">
      <Hero />
      <ShowsGrid filteredShows={shows} />
    </div>
  )
}
