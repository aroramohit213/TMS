import { useState, useRef, useEffect, useCallback } from 'react'
import './Reels.css'

const reels = [
  {
    id: 1,
    file: '/videos/engagement look reel.mp4',
    title: 'Engagement Look',
    label: 'Engagement',
  },
  {
    id: 2,
    file: '/videos/wedding look reel.mp4',
    title: 'Wedding Look',
    label: 'Wedding',
  },
  {
    id: 3,
    file: '/videos/wedding look reel 2.mp4',
    title: 'Wedding Look',
    label: 'Wedding',
  },
  {
    id: 4,
    file: '/videos/haldi look reel.mp4',
    title: 'Haldi Look',
    label: 'Haldi',
  },
  {
    id: 5,
    file: '/videos/mehandi look reel.mp4',
    title: 'Mehandi Look',
    label: 'Mehandi',
  },
  {
    id: 6,
    file: '/videos/wedding look reel 3.mp4',
    title: 'Wedding Look',
    label: 'Wedding',
  },
]

/* ── Single card — visibility-based playback ── */
function ReelCard({ reel, onOpen, isModalOpen }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Intersection Observer for scroll-based visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        const v = videoRef.current
        if (v) {
          if (entry.isIntersecting && !isModalOpen) {
            v.play().catch(() => {}) // Play when visible
          } else {
            v.pause()
            v.currentTime = 0
          }
        }
      },
      { threshold: 0.5 } // Video plays when 50% visible
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [isModalOpen])

  // Stop playing when modal opens
  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isModalOpen])

  const playPreview = () => {
    setHovered(true)
    // On hover, play if visible (for desktop experience)
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const pausePreview = () => {
    setHovered(false)
  }

  return (
    <button
      ref={cardRef}
      className="reel-card reveal"
      onMouseEnter={playPreview}
      onMouseLeave={pausePreview}
      onClick={() => onOpen(reel)}
      aria-label={`Play reel: ${reel.title}`}
    >
      <div className="reel-card__media">
        <video
          ref={videoRef}
          src={reel.file}
          muted
          playsInline
          loop
          preload="metadata"
          className="reel-card__video"
        />

        {/* Play icon — fades out on hover */}
        <div className={`reel-card__play-icon${hovered ? ' reel-card__play-icon--hidden' : ''}`}>
          <span>▶</span>
        </div>

        {/* Bottom label */}
        <div className="reel-card__label">
          <span className="reel-card__tag">{reel.label}</span>
        </div>
      </div>
    </button>
  )
}

/* ── Modal — full audio playback ── */
function ReelModal({ reel, onClose }) {
  const videoRef = useRef(null)

  // Autoplay with sound when modal opens
  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.muted = false
      v.play().catch(() => { v.muted = true; v.play() })
    }
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Keyboard close
  const handleKey = useCallback(e => {
    if (e.key === 'Escape') onClose()
  }, [onClose])
  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <div className="reel-modal" role="dialog" aria-modal="true" aria-label={reel.title}>
      <div className="reel-modal__backdrop" onClick={onClose} />

      <div className="reel-modal__box" onClick={e => e.stopPropagation()}>
        <button className="reel-modal__close" onClick={onClose} aria-label="Close">✕</button>

        <video
          ref={videoRef}
          src={reel.file}
          controls
          playsInline
          className="reel-modal__video"
        />

        <div className="reel-modal__info">
          <span className="reel-modal__tag">{reel.label}</span>
        </div>
      </div>
    </div>
  )
}

/* ── Section ── */
export default function Reels() {
  const [active, setActive] = useState(null)

  return (
    <section id="reels" className="reels">
      <div className="container">
        <div className="reels__header">
          <p className="section-eyebrow reveal">Reels</p>
          <h2 className="section-title reveal">
            Transformations<br /><em>in motion</em>
          </h2>
          <p className="reels__sub reveal">
            Scroll to preview · Click to watch with sound
          </p>
        </div>

        <div className="reels__grid">
          {reels.map(r => (
            <ReelCard key={r.id} reel={r} onOpen={setActive} isModalOpen={!!active} />
          ))}
        </div>
      </div>

      {active && <ReelModal reel={active} onClose={() => setActive(null)} />}
    </section>
  )
}
