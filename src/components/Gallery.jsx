import { useState, useEffect, useCallback } from 'react'
import './Gallery.css'

const CATS = ['All', 'Bridal', 'Editorial', 'Glam', 'SFX']

const photos = [
  { id:  1, src: '/images/0A3A1127.jpg',  webp: '/images/0A3A1127.webp',  cat: 'Bridal',    title: 'Golden Hour Bridal',   aspect: 'tall'   },
  { id:  2, src: '/images/CG7A0581.JPG',  webp: '/images/CG7A0581.webp',  cat: 'Editorial', title: 'Desert Editorial',      aspect: 'wide'   },
  { id:  3, src: '/images/CG7A0588.JPG',  webp: '/images/CG7A0588.webp',  cat: 'Glam',      title: 'Smoky Glam',            aspect: 'square' },
  { id:  4, src: '/images/CG7A4805.JPG',  webp: '/images/CG7A4805.webp',  cat: 'SFX',       title: 'Fantasy Character',     aspect: 'tall'   },
  { id:  5, src: '/images/0A3A1356.jpg',  webp: '/images/0A3A1356.webp',  cat: 'Bridal',    title: 'Ivory Romance',         aspect: 'square' },
  { id:  6, src: '/images/CG7A0598.JPG',  webp: '/images/CG7A0598.webp',  cat: 'Editorial', title: 'Clay & Terracotta',     aspect: 'wide'   },
  { id:  7, src: '/images/CG7A4806.JPG',  webp: '/images/CG7A4806.webp',  cat: 'Glam',      title: 'Golden Goddess',        aspect: 'tall'   },
  { id:  8, src: '/images/0A3A1383.jpg',  webp: '/images/0A3A1383.webp',  cat: 'Bridal',    title: 'Soft Elegance',         aspect: 'square' },
  { id:  9, src: '/images/CG7A4825.JPG',  webp: '/images/CG7A4825.webp',  cat: 'SFX',       title: 'Avant-Garde Frost',     aspect: 'wide'   },
  { id: 10, src: '/images/CG7A4867.JPG',  webp: '/images/CG7A4867.webp',  cat: 'Editorial', title: 'Nude Luxe',             aspect: 'tall'   },
  { id: 11, src: '/images/CG7A5592.JPG',  webp: '/images/CG7A5592.webp',  cat: 'Glam',      title: 'Bronze & Copper',       aspect: 'square' },
  { id: 12, src: '/images/0A3A1407.jpg',  webp: '/images/0A3A1407.webp',  cat: 'Bridal',    title: 'Timeless Veil',         aspect: 'wide'   },
  { id: 13, src: '/images/CG7A5614.JPG',  webp: '/images/CG7A5614.webp',  cat: 'Editorial', title: 'Luminous Editorial',    aspect: 'tall'   },
  { id: 14, src: '/images/CG7A5616.JPG',  webp: '/images/CG7A5616.webp',  cat: 'Glam',      title: 'Copper & Clay Glam',    aspect: 'square' },
]

export default function Gallery() {
  const [active,   setActive]   = useState('All')
  const [lightbox, setLightbox] = useState(null) // index in filtered list

  const filtered = active === 'All' ? photos : photos.filter(p => p.cat === active)

  const open  = i  => setLightbox(i)
  const close = () => setLightbox(null)
  const prev  = useCallback(() => setLightbox(i => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const next  = useCallback(() => setLightbox(i => (i + 1) % filtered.length),                   [filtered.length])

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return
    const onKey = e => {
      if (e.key === 'Escape')      close()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, prev, next])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="gallery__header">
          <p className="section-eyebrow reveal">Portfolio</p>
          <h2 className="section-title reveal">Every look,<br /><em>a story</em></h2>
          <p className="gallery__sub reveal">
            A curated selection spanning bridal, editorial, glam, and special effects artistry.
            Replace the placeholders with your own photos.
          </p>
        </div>

        {/* Category filters */}
        <div className="gallery__filters reveal" role="group" aria-label="Filter by category">
          {CATS.map(c => (
            <button
              key={c}
              className={`gallery__filter${active === c ? ' gallery__filter--active' : ''}`}
              onClick={() => { setActive(c); setLightbox(null) }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="gallery__grid">
          {filtered.map((p, i) => (
            <button
              key={p.id}
              className={`gallery__item gallery__item--${p.aspect} reveal`}
              onClick={() => open(i)}
              aria-label={`Open lightbox: ${p.title}`}
            >
              <picture className="gallery__picture">
                <source srcSet={p.webp} type="image/webp" />
                <img
                  src={p.src}
                  alt={p.title}
                  className="gallery__thumb"
                  loading={i < 10 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={i < 4 ? 'high' : 'auto'}
                  onLoad={e => e.currentTarget.classList.add('gallery__thumb--loaded')}
                  ref={el => { if (el?.complete) el.classList.add('gallery__thumb--loaded') }}
                />
              </picture>
              <div className="gallery__overlay">
                <span className="gallery__overlay-cat">{p.cat}</span>
                <span className="gallery__overlay-title">{p.title}</span>
                <span className="gallery__overlay-icon">⊕</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Photo lightbox">
          {/* Backdrop */}
          <div className="lb__backdrop" onClick={close} />

          {/* Close */}
          <button className="lb__close" onClick={close} aria-label="Close lightbox">✕</button>

          {/* Arrows */}
          <button className="lb__arrow lb__arrow--prev" onClick={prev} aria-label="Previous photo">‹</button>
          <button className="lb__arrow lb__arrow--next" onClick={next} aria-label="Next photo">›</button>

          {/* Image panel */}
          <div
            className="lb__panel"
            onClick={e => e.stopPropagation()}
          >
            <picture className="lb__picture">
              <source srcSet={filtered[lightbox].webp} type="image/webp" />
              <img
                src={filtered[lightbox].src}
                alt={filtered[lightbox].title}
                className="lb__img"
                decoding="async"
              />
            </picture>
          </div>

          {/* Caption */}
          <div className="lb__caption">
            <span className="lb__cat">{filtered[lightbox].cat}</span>
            <span className="lb__title">{filtered[lightbox].title}</span>
            <span className="lb__counter">{lightbox + 1} / {filtered.length}</span>
          </div>
        </div>
      )}
    </section>
  )
}
