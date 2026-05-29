import { useState, useEffect, useCallback, useMemo } from 'react'
import './Gallery.css'

const CATS = ['All', 'Bridal', 'Editorial', 'Glam', 'SFX']

// Image metadata with multiple resolutions and WebP support
const photos = [
  {
    id: 1,
    category: 'Bridal',
    title: 'Golden Hour Bridal',
    aspect: 'tall',
    image: {
      thumbnail: '/images/optimized/gallery/bridal/0A3A1127-600w.jpg',
      medium: '/images/optimized/gallery/bridal/0A3A1127-1200w.jpg',
      large: '/images/optimized/gallery/bridal/0A3A1127-1920w.jpg',
      alt: 'Bridal makeup - Golden Hour Bridal look with warm tones and detailed eye makeup'
    },
    webp: {
      thumbnail: '/images/webp/gallery/bridal/0A3A1127-600w.webp',
      medium: '/images/webp/gallery/bridal/0A3A1127-1200w.webp',
      large: '/images/webp/gallery/bridal/0A3A1127-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-20',
      techniques: ['contouring', 'blending', 'highlighting'],
    }
  },
  {
    id: 2,
    category: 'Editorial',
    title: 'Desert Editorial',
    aspect: 'wide',
    image: {
      thumbnail: '/images/optimized/gallery/editorial/CG7A0581-600w.jpg',
      medium: '/images/optimized/gallery/editorial/CG7A0581-1200w.jpg',
      large: '/images/optimized/gallery/editorial/CG7A0581-1920w.jpg',
      alt: 'Editorial makeup - Desert themed editorial look with earthy tones'
    },
    webp: {
      thumbnail: '/images/webp/gallery/editorial/CG7A0581-600w.webp',
      medium: '/images/webp/gallery/editorial/CG7A0581-1200w.webp',
      large: '/images/webp/gallery/editorial/CG7A0581-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-19',
      techniques: ['color grading', 'blending', 'contouring'],
    }
  },
  {
    id: 3,
    category: 'Glam',
    title: 'Smoky Glam',
    aspect: 'square',
    image: {
      thumbnail: '/images/optimized/gallery/glam/CG7A0588-600w.jpg',
      medium: '/images/optimized/gallery/glam/CG7A0588-1200w.jpg',
      large: '/images/optimized/gallery/glam/CG7A0588-1920w.jpg',
      alt: 'Glam makeup - Smoky glam look with dramatic eyeshadow'
    },
    webp: {
      thumbnail: '/images/webp/gallery/glam/CG7A0588-600w.webp',
      medium: '/images/webp/gallery/glam/CG7A0588-1200w.webp',
      large: '/images/webp/gallery/glam/CG7A0588-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-18',
      techniques: ['eyeshadow blending', 'highlighting', 'contouring'],
    }
  },
  {
    id: 4,
    category: 'SFX',
    title: 'Fantasy Character',
    aspect: 'tall',
    image: {
      thumbnail: '/images/optimized/gallery/sfx/CG7A4805-600w.jpg',
      medium: '/images/optimized/gallery/sfx/CG7A4805-1200w.jpg',
      large: '/images/optimized/gallery/sfx/CG7A4805-1920w.jpg',
      alt: 'Special effects makeup - Fantasy character design'
    },
    webp: {
      thumbnail: '/images/webp/gallery/sfx/CG7A4805-600w.webp',
      medium: '/images/webp/gallery/sfx/CG7A4805-1200w.webp',
      large: '/images/webp/gallery/sfx/CG7A4805-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-17',
      techniques: ['prosthetics', 'color blending', 'texture creation'],
    }
  },
  {
    id: 5,
    category: 'Bridal',
    title: 'Ivory Romance',
    aspect: 'square',
    image: {
      thumbnail: '/images/optimized/gallery/bridal/0A3A1356-600w.jpg',
      medium: '/images/optimized/gallery/bridal/0A3A1356-1200w.jpg',
      large: '/images/optimized/gallery/bridal/0A3A1356-1920w.jpg',
      alt: 'Bridal makeup - Ivory Romance look with soft, romantic tones'
    },
    webp: {
      thumbnail: '/images/webp/gallery/bridal/0A3A1356-600w.webp',
      medium: '/images/webp/gallery/bridal/0A3A1356-1200w.webp',
      large: '/images/webp/gallery/bridal/0A3A1356-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-16',
      techniques: ['soft contouring', 'blush blending', 'highlight placement'],
    }
  },
  {
    id: 6,
    category: 'Editorial',
    title: 'Clay & Terracotta',
    aspect: 'wide',
    image: {
      thumbnail: '/images/optimized/gallery/editorial/CG7A0598-600w.jpg',
      medium: '/images/optimized/gallery/editorial/CG7A0598-1200w.jpg',
      large: '/images/optimized/gallery/editorial/CG7A0598-1920w.jpg',
      alt: 'Editorial makeup - Clay and terracotta toned makeup look'
    },
    webp: {
      thumbnail: '/images/webp/gallery/editorial/CG7A0598-600w.webp',
      medium: '/images/webp/gallery/editorial/CG7A0598-1200w.webp',
      large: '/images/webp/gallery/editorial/CG7A0598-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-15',
      techniques: ['warm toning', 'blending', 'definition'],
    }
  },
  {
    id: 7,
    category: 'Glam',
    title: 'Golden Goddess',
    aspect: 'tall',
    image: {
      thumbnail: '/images/optimized/gallery/glam/CG7A4806-600w.jpg',
      medium: '/images/optimized/gallery/glam/CG7A4806-1200w.jpg',
      large: '/images/optimized/gallery/glam/CG7A4806-1920w.jpg',
      alt: 'Glam makeup - Golden goddess look with luxurious golden tones'
    },
    webp: {
      thumbnail: '/images/webp/gallery/glam/CG7A4806-600w.webp',
      medium: '/images/webp/gallery/glam/CG7A4806-1200w.webp',
      large: '/images/webp/gallery/glam/CG7A4806-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-14',
      techniques: ['golden highlighting', 'blending', 'eye definition'],
    }
  },
  {
    id: 8,
    category: 'Bridal',
    title: 'Soft Elegance',
    aspect: 'square',
    image: {
      thumbnail: '/images/optimized/gallery/bridal/0A3A1383-600w.jpg',
      medium: '/images/optimized/gallery/bridal/0A3A1383-1200w.jpg',
      large: '/images/optimized/gallery/bridal/0A3A1383-1920w.jpg',
      alt: 'Bridal makeup - Soft elegance look with delicate makeup'
    },
    webp: {
      thumbnail: '/images/webp/gallery/bridal/0A3A1383-600w.webp',
      medium: '/images/webp/gallery/bridal/0A3A1383-1200w.webp',
      large: '/images/webp/gallery/bridal/0A3A1383-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-13',
      techniques: ['soft blending', 'natural highlight', 'lip blending'],
    }
  },
  {
    id: 9,
    category: 'SFX',
    title: 'Avant-Garde Frost',
    aspect: 'wide',
    image: {
      thumbnail: '/images/optimized/gallery/sfx/CG7A4825-600w.jpg',
      medium: '/images/optimized/gallery/sfx/CG7A4825-1200w.jpg',
      large: '/images/optimized/gallery/sfx/CG7A4825-1920w.jpg',
      alt: 'Special effects makeup - Avant-garde frost themed makeup'
    },
    webp: {
      thumbnail: '/images/webp/gallery/sfx/CG7A4825-600w.webp',
      medium: '/images/webp/gallery/sfx/CG7A4825-1200w.webp',
      large: '/images/webp/gallery/sfx/CG7A4825-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-12',
      techniques: ['frost effects', 'texture creation', 'color blending'],
    }
  },
  {
    id: 10,
    category: 'Editorial',
    title: 'Nude Luxe',
    aspect: 'tall',
    image: {
      thumbnail: '/images/optimized/gallery/editorial/CG7A4867-600w.jpg',
      medium: '/images/optimized/gallery/editorial/CG7A4867-1200w.jpg',
      large: '/images/optimized/gallery/editorial/CG7A4867-1920w.jpg',
      alt: 'Editorial makeup - Nude luxe look with subtle sophistication'
    },
    webp: {
      thumbnail: '/images/webp/gallery/editorial/CG7A4867-600w.webp',
      medium: '/images/webp/gallery/editorial/CG7A4867-1200w.webp',
      large: '/images/webp/gallery/editorial/CG7A4867-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-11',
      techniques: ['nude blending', 'subtle contouring', 'natural finish'],
    }
  },
  {
    id: 11,
    category: 'Glam',
    title: 'Bronze & Copper',
    aspect: 'square',
    image: {
      thumbnail: '/images/optimized/gallery/glam/CG7A5592-600w.jpg',
      medium: '/images/optimized/gallery/glam/CG7A5592-1200w.jpg',
      large: '/images/optimized/gallery/glam/CG7A5592-1920w.jpg',
      alt: 'Glam makeup - Bronze and copper metallic look'
    },
    webp: {
      thumbnail: '/images/webp/gallery/glam/CG7A5592-600w.webp',
      medium: '/images/webp/gallery/glam/CG7A5592-1200w.webp',
      large: '/images/webp/gallery/glam/CG7A5592-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-10',
      techniques: ['metallic blending', 'warm toning', 'dimension creation'],
    }
  },
  {
    id: 12,
    category: 'Bridal',
    title: 'Timeless Veil',
    aspect: 'wide',
    image: {
      thumbnail: '/images/optimized/gallery/bridal/0A3A1407-600w.jpg',
      medium: '/images/optimized/gallery/bridal/0A3A1407-1200w.jpg',
      large: '/images/optimized/gallery/bridal/0A3A1407-1920w.jpg',
      alt: 'Bridal makeup - Timeless veil look with classic elegance'
    },
    webp: {
      thumbnail: '/images/webp/gallery/bridal/0A3A1407-600w.webp',
      medium: '/images/webp/gallery/bridal/0A3A1407-1200w.webp',
      large: '/images/webp/gallery/bridal/0A3A1407-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-09',
      techniques: ['classic blending', 'elegant contouring', 'timeless finish'],
    }
  },
  {
    id: 13,
    category: 'Editorial',
    title: 'Luminous Editorial',
    aspect: 'tall',
    image: {
      thumbnail: '/images/optimized/gallery/editorial/CG7A5614-600w.jpg',
      medium: '/images/optimized/gallery/editorial/CG7A5614-1200w.jpg',
      large: '/images/optimized/gallery/editorial/CG7A5614-1920w.jpg',
      alt: 'Editorial makeup - Luminous editorial look with glowing finish'
    },
    webp: {
      thumbnail: '/images/webp/gallery/editorial/CG7A5614-600w.webp',
      medium: '/images/webp/gallery/editorial/CG7A5614-1200w.webp',
      large: '/images/webp/gallery/editorial/CG7A5614-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-08',
      techniques: ['luminous blending', 'glow creation', 'highlight placement'],
    }
  },
  {
    id: 14,
    category: 'Glam',
    title: 'Copper & Clay Glam',
    aspect: 'square',
    image: {
      thumbnail: '/images/optimized/gallery/glam/CG7A5616-600w.jpg',
      medium: '/images/optimized/gallery/glam/CG7A5616-1200w.jpg',
      large: '/images/optimized/gallery/glam/CG7A5616-1920w.jpg',
      alt: 'Glam makeup - Copper and clay combination glam look'
    },
    webp: {
      thumbnail: '/images/webp/gallery/glam/CG7A5616-600w.webp',
      medium: '/images/webp/gallery/glam/CG7A5616-1200w.webp',
      large: '/images/webp/gallery/glam/CG7A5616-1920w.webp',
    },
    metadata: {
      makeup_artist: 'Mohit Kumar',
      date: '2024-05-07',
      techniques: ['warm blending', 'earth tone creation', 'dimension'],
    }
  },
]

// Image component with WebP fallback and error handling
const ImageWithFallback = ({ src, webpSrc, alt, className, loading = 'lazy', onError, onLoad }) => {
  const [imageError, setImageError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleError = (e) => {
    setImageError(true)
    onError?.(e)
  }

  const handleLoad = (e) => {
    setIsLoaded(true)
    onLoad?.(e)
  }

  return (
    <picture>
      {/* WebP for modern browsers */}
      <source srcSet={webpSrc} type="image/webp" />
      {/* JPG fallback */}
      <img
        src={imageError ? '/images/placeholder-error.jpg' : src}
        alt={alt}
        className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
        loading={loading}
        decoding="async"
        onError={handleError}
        onLoad={handleLoad}
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />
    </picture>
  )
}

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const [failedImages, setFailedImages] = useState(new Set())

  // Memoize filtered results
  const filtered = useMemo(
    () => active === 'All' ? photos : photos.filter(p => p.category === active),
    [active]
  )

  const open = useCallback((i) => setLightbox(i), [])
  const close = useCallback(() => setLightbox(null), [])
  const prev = useCallback(
    () => setLightbox(i => (i - 1 + filtered.length) % filtered.length),
    [filtered.length]
  )
  const next = useCallback(
    () => setLightbox(i => (i + 1) % filtered.length),
    [filtered.length]
  )

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return
    const onKey = e => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, prev, next, close])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  // Preload next/prev images in lightbox
  useEffect(() => {
    if (lightbox === null) return
    
    const nextIdx = (lightbox + 1) % filtered.length
    const prevIdx = (lightbox - 1 + filtered.length) % filtered.length
    
    // Preload next image
    const nextImg = new Image()
    nextImg.src = filtered[nextIdx].image.large
    
    // Preload prev image
    const prevImg = new Image()
    prevImg.src = filtered[prevIdx].image.large
  }, [lightbox, filtered])

  const handleImageError = (photoId) => {
    setFailedImages(prev => new Set([...prev, photoId]))
  }

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="gallery__header">
          <p className="section-eyebrow reveal">Portfolio</p>
          <h2 className="section-title reveal">
            Every look,<br /><em>a story</em>
          </h2>
          <p className="gallery__sub reveal">
            Explore our curated selection spanning bridal, editorial, glam, and special effects artistry.
            Each image showcases detailed makeup techniques and transformations.
          </p>
        </div>

        {/* Category filters */}
        <div className="gallery__filters reveal" role="group" aria-label="Filter by category">
          {CATS.map(c => (
            <button
              key={c}
              className={`gallery__filter${active === c ? ' gallery__filter--active' : ''}`}
              onClick={() => { setActive(c); setLightbox(null) }}
              aria-pressed={active === c}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="gallery__grid">
          {filtered.map((photo, i) => (
            <button
              key={photo.id}
              className={`gallery__item gallery__item--${photo.aspect} reveal`}
              onClick={() => open(i)}
              aria-label={`Open ${photo.title} - ${photo.category} makeup`}
              disabled={failedImages.has(photo.id)}
              title={photo.title}
            >
              <ImageWithFallback
                src={photo.image.medium}
                webpSrc={photo.webp.medium}
                alt={photo.image.alt}
                className="gallery__thumb"
                loading="lazy"
                onError={() => handleImageError(photo.id)}
              />
              <div className="gallery__overlay">
                <span className="gallery__overlay-cat">{photo.category}</span>
                <span className="gallery__overlay-title">{photo.title}</span>
                <span className="gallery__overlay-icon">⊕</span>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="gallery__empty">
            <p>No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Photo lightbox">
          <div className="lb__backdrop" onClick={close} />

          {/* Close button */}
          <button 
            className="lb__close" 
            onClick={close} 
            aria-label="Close lightbox"
            title="Close (Esc)"
          >
            ✕
          </button>

          {/* Navigation arrows */}
          <button 
            className="lb__arrow lb__arrow--prev" 
            onClick={prev} 
            aria-label="Previous photo"
            title="Previous (←)"
          >
            ‹
          </button>
          <button 
            className="lb__arrow lb__arrow--next" 
            onClick={next} 
            aria-label="Next photo"
            title="Next (→)"
          >
            ›
          </button>

          {/* Image panel */}
          <div className="lb__panel" onClick={e => e.stopPropagation()}>
            <ImageWithFallback
              src={filtered[lightbox].image.large}
              webpSrc={filtered[lightbox].webp.large}
              alt={filtered[lightbox].image.alt}
              className="lb__img"
              loading="eager"
            />
          </div>

          {/* Caption with metadata */}
          <div className="lb__caption">
            <div className="lb__caption-content">
              <span className="lb__cat">{filtered[lightbox].category}</span>
              <span className="lb__title">{filtered[lightbox].title}</span>
              <span className="lb__counter">
                {lightbox + 1} / {filtered.length}
              </span>
            </div>
            
            {/* Makeup details */}
            <details className="lb__metadata">
              <summary>Makeup Details</summary>
              <div className="lb__metadata-content">
                <p><strong>Techniques:</strong> {filtered[lightbox].metadata.techniques.join(', ')}</p>
                <p><strong>Date:</strong> {filtered[lightbox].metadata.date}</p>
              </div>
            </details>
          </div>
        </div>
      )}
    </section>
  )
}
