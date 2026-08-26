import { albums } from './albums'
import './Album.css'

function Hero() {
  return (
    <section className="album-hero">
      <div className="album-hero__bg" aria-hidden="true" />
      <div className="album-hero__overlay" aria-hidden="true" />
      <div className="album-hero__content">
        <div className="album-hero__text">
          <span className="album-hero__label">PHOTO ALBUM ARCHIVE</span>
          <h1 className="album-hero__title">
            Pages of<br />a simpler time.
          </h1>
          <p className="album-hero__subtitle">
            Before pixels and filters, we captured memories on film and kept
            them close to our hearts.
          </p>
          <button className="album-hero__cta" type="button">
            <svg className="album-hero__cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            OPEN MY ALBUM
          </button>
        </div>
      </div>
    </section>
  )
}

function AlbumCard({ album }) {
  return (
    <article className="album-card">
      <div className="album-card__frame">
        {album.image ? (
          <img
            className="album-card__img"
            src={album.image}
            alt={album.title}
            loading="lazy"
          />
        ) : (
          <div className="album-card__placeholder">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="album-card__placeholder-icon">
              <rect x="6" y="6" width="36" height="36" rx="4" />
              <circle cx="17" cy="17" r="4" />
              <path d="M42 30l-10-10L8 44" />
            </svg>
          </div>
        )}
      </div>
      <h3 className="album-card__title">{album.title}</h3>
      <p className="album-card__desc">{album.description}</p>
      <span className="album-card__count">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="album-card__count-icon">
          <rect x="2" y="2" width="12" height="12" rx="1.5" />
          <circle cx="5.5" cy="5.5" r="1" />
          <path d="M14 10l-3.5-3.5L4 13" />
        </svg>
        {album.photos} PHOTOS
      </span>
    </article>
  )
}

function BrowseAlbums() {
  return (
    <section className="album-browse">
      <div className="album-browse__header">
        <div>
          <span className="album-browse__label">BROWSE ALBUMS</span>
          <p className="album-browse__sub">
            Explore handpicked collections from different chapters of life.
          </p>
        </div>
        <div className="album-browse__sort">
          <span>Sort by: Newest</span>
        </div>
      </div>
      <div className="album-browse__grid">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </section>
  )
}

export default function Album() {
  return (
    <div className="album">
      <Hero />
      <BrowseAlbums />
    </div>
  )
}
