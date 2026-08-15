import './Diya.css'

/** Oil lamp on the sill: clay bowl, flickering flame, warm glow. */
export default function Diya() {
  return (
    <div className="diya" aria-hidden="true">
      <div className="diya__glow" />
      <div className="diya__flame" />
      <div className="diya__base" />
    </div>
  )
}
