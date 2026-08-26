import { stations } from './stations'
import './Radio.css'

function Hero() {
  return (
    <section className="radio-hero">
      <div className="radio-hero__content">
        <div className="radio-hero__radio">
          <div className="radio-hero__cabinet">
            <div className="radio-hero__grille">
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} className="radio-hero__grille-line" />
              ))}
            </div>
            <div className="radio-hero__dial">
              <div className="radio-hero__dial-info">
                <span className="radio-hero__dial-band">AM BAND TUNING</span>
                <span className="radio-hero__dial-station">Vividh Bharati</span>
              </div>
              <div className="radio-hero__dial-freq">
                <span className="radio-hero__dial-needle" />
                <span className="radio-hero__dial-mhz">104.2 MHz</span>
              </div>
            </div>
          </div>
        </div>

        <div className="radio-hero__text">
          <div className="radio-hero__badge">
            SHORTWAVE MULTICAST · BROADCASTING IN REAL-TIME
          </div>
          <h1 className="radio-hero__title">Tune into yesterday</h1>
          <p className="radio-hero__subtitle">
            Before digital streams and instant skips, we waited by the mahogany
            box, adjusting the wire antenna on the terrace for that perfect,
            crisp evening static.
          </p>
          <button className="radio-hero__play-btn" type="button">
            <svg className="radio-hero__play-icon" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22" cy="22" r="21" stroke="currentColor" strokeWidth="2" />
              <path d="M17 14l14 8-14 8V14z" fill="currentColor" />
            </svg>
            <span>Listen to Live Shortwave Stream</span>
          </button>
        </div>
      </div>
    </section>
  )
}

function StationCard({ station }) {
  return (
    <article className="radio-station">
      <div className="radio-station__header">
        <h3 className="radio-station__name">{station.name}</h3>
        <span className="radio-station__format">FMT: {station.format}</span>
      </div>
      <p className="radio-station__desc">{station.description}</p>
      <div className="radio-station__on-air">
        ON AIR: {station.onAir}
      </div>
    </article>
  )
}

function LiveStations() {
  return (
    <section className="radio-stations">
      <div className="radio-stations__header">
        <span className="radio-stations__label">THE DIAL DIRECTORY</span>
        <h2 className="radio-stations__heading">Retro Indian Live Stations</h2>
      </div>
      <div className="radio-stations__grid">
        {stations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}
      </div>
    </section>
  )
}

export default function Radio() {
  return (
    <div className="radio">
      <Hero />
      <LiveStations />
    </div>
  )
}
