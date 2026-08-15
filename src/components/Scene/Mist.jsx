import './Mist.css'

/** Drifting mist bands + slow dust motes over the image. Decorative. */
export default function Mist() {
  return (
    <div className="mist" aria-hidden="true">
      <div className="mist__band mist__band--a" />
      <div className="mist__band mist__band--b" />
      <span className="mist__dust mist__dust--1" />
      <span className="mist__dust mist__dust--2" />
    </div>
  )
}
