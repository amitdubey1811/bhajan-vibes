import { useState, useCallback } from 'react'
import { objects } from './objects'
import './Drawer.css'

function DustParticles() {
  return (
    <div className="drawer-page__dust" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="drawer-page__dust-mote" style={{
          left: `${10 + Math.random() * 80}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${6 + Math.random() * 8}s`,
        }} />
      ))}
    </div>
  )
}

function DrawerDustBurst() {
  return (
    <div className="drawer-dust-burst" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <span
          key={i}
          className="drawer-dust-burst__mote"
          style={{
            left: `${15 + Math.random() * 70}%`,
            animationDelay: `${Math.random() * 0.6}s`,
            animationDuration: `${1.5 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

function DrawerObject({ obj, onClick, index }) {
  return (
    <button
      className={`drawer-obj ${obj.id === 'coin' ? 'drawer-obj--small' : ''}`}
      onClick={() => onClick(obj)}
      type="button"
      aria-label={`Inspect ${obj.name}`}
      style={{ animationDelay: `${1.2 + index * 0.12}s` }}
    >
      <span className="drawer-obj__inner">
        <img
          className="drawer-obj__img"
          src={obj.image}
          alt={obj.name}
          loading="lazy"
          draggable="false"
        />
        <span className="drawer-obj__hint">{obj.nameHi}</span>
      </span>
    </button>
  )
}

function ObjectDetail({ obj, onClose }) {
  if (!obj) return null

  return (
    <div className="drawer-detail" onClick={onClose}>
      <div className="drawer-detail__card" onClick={(e) => e.stopPropagation()}>
        <button
          className="drawer-detail__close"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          ×
        </button>
        <div className="drawer-detail__image-wrap">
          <img
            className="drawer-detail__img"
            src={obj.image}
            alt={obj.name}
          />
        </div>
        <div className="drawer-detail__text">
          <span className="drawer-detail__label">{obj.nameHi}</span>
          <h2 className="drawer-detail__title">{obj.name}</h2>
          <p className="drawer-detail__memory">{obj.memory}</p>
        </div>
      </div>
    </div>
  )
}

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedObj, setSelectedObj] = useState(null)

  const handleOpen = useCallback(() => {
    if (!isOpen) setIsOpen(true)
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleObjectClick = useCallback((obj) => {
    setSelectedObj(obj)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setSelectedObj(null)
  }, [])

  return (
    <div className={`drawer-page ${isOpen ? 'drawer-page--open' : ''}`}>
      <div className="drawer-page__bg-wrap">
        <img
          className="drawer-page__bg"
          src="/images/drawer/table-scene.png"
          alt=""
          aria-hidden="true"
          draggable="false"
        />
      </div>
      <div className="drawer-page__overlay" aria-hidden="true" />
      <DustParticles />

      <div className="drawer-page__content">
        <div className="drawer-page__header">
          <span className="drawer-page__eyebrow">FORGOTTEN TREASURES</span>
          <h1 className="drawer-page__title">The Drawer</h1>
          <p className="drawer-page__subtitle">
            हर दराज़ में एक दुनिया छुपी है
          </p>
        </div>

        {/* Spacer to push handle down to the drawer area in the image */}
        <div className="drawer-page__spacer" />

        {/* Clickable hotspot positioned on the drawer knob */}
        {!isOpen && (
          <button
            className="drawer-handle"
            onClick={handleOpen}
            type="button"
            aria-label="Open the drawer"
          >
            <span className="drawer-handle__ring" />
            <span className="drawer-handle__label">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
              Pull to open
            </span>
          </button>
        )}

        {/* Open drawer with objects */}
        <div className={`drawer-open ${isOpen ? 'drawer-open--visible' : ''}`}>
          {isOpen && <DrawerDustBurst />}
          <div className="drawer-open__container">
            <button
              className="drawer-open__close-btn"
              onClick={handleClose}
              type="button"
              aria-label="Close the drawer"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 13V3M4 7l4-4 4 4" />
              </svg>
              Close drawer
            </button>
            <div className="drawer-open__interior">
              <img
                className="drawer-open__interior-img"
                src="/images/drawer/drawer-interior.png"
                alt="Inside the drawer"
                draggable="false"
              />
              <div className="drawer-open__objects">
                {objects.map((obj, i) => (
                  <DrawerObject
                    key={obj.id}
                    obj={obj}
                    onClick={handleObjectClick}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {!isOpen && (
          <p className="drawer-page__prompt">
            Click the drawer to discover what lies inside...
          </p>
        )}
      </div>

      <ObjectDetail obj={selectedObj} onClose={handleCloseDetail} />
    </div>
  )
}
