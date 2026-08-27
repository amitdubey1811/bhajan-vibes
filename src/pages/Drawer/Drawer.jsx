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

function DrawerObject({ obj, onClick }) {
  return (
    <button
      className="drawer-obj"
      onClick={() => onClick(obj)}
      type="button"
      aria-label={`Inspect ${obj.name}`}
    >
      <img
        className="drawer-obj__img"
        src={obj.image}
        alt={obj.name}
        loading="lazy"
        draggable="false"
      />
      <span className="drawer-obj__hint">{obj.nameHi}</span>
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

  const handleObjectClick = useCallback((obj) => {
    setSelectedObj(obj)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setSelectedObj(null)
  }, [])

  return (
    <div className="drawer-page">
      <img
        className="drawer-page__bg"
        src="/images/drawer/table-scene.png"
        alt=""
        aria-hidden="true"
        draggable="false"
      />
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

        <div className={`drawer-unit ${isOpen ? 'drawer-unit--open' : ''}`}>
          <div className="drawer-unit__interior">
            <img
              className="drawer-unit__interior-img"
              src="/images/drawer/drawer-interior.png"
              alt="Inside the drawer"
              draggable="false"
            />
            <div className="drawer-unit__objects">
              {objects.map((obj) => (
                <DrawerObject
                  key={obj.id}
                  obj={obj}
                  onClick={handleObjectClick}
                />
              ))}
            </div>
          </div>

          <button
            className="drawer-unit__front"
            onClick={handleOpen}
            type="button"
            aria-label={isOpen ? 'Drawer is open' : 'Click to open the drawer'}
          >
            <img
              className="drawer-unit__front-img"
              src="/images/drawer/drawer-front.png"
              alt="Wooden drawer"
              draggable="false"
            />
            {!isOpen && (
              <span className="drawer-unit__pull-hint">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
                Pull to open
              </span>
            )}
          </button>
        </div>

        {!isOpen && (
          <p className="drawer-page__prompt">
            Click the drawer handle to discover what lies inside...
          </p>
        )}
      </div>

      <ObjectDetail obj={selectedObj} onClose={handleCloseDetail} />
    </div>
  )
}
