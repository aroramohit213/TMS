import { useState } from 'react'
import './BeforeAfter.css'

/**
 * BeforeAfter Component
 * Displays before/after makeup transformations with an interactive slider
 */
export default function BeforeAfter() {
  const transformations = [
    {
      id: 1,
      category: 'Bridal',
      title: 'Bridal Transformation',
      before: '/images/optimized/before-after/bridal-before-600w.jpg',
      beforeWebp: '/images/webp/before-after/bridal-before-600w.webp',
      after: '/images/optimized/before-after/bridal-after-600w.jpg',
      afterWebp: '/images/webp/before-after/bridal-after-600w.webp',
      description: 'Professional bridal makeup transformation',
    },
    {
      id: 2,
      category: 'Glam',
      title: 'Glam Makeover',
      before: '/images/optimized/before-after/glam-before-600w.jpg',
      beforeWebp: '/images/webp/before-after/glam-before-600w.webp',
      after: '/images/optimized/before-after/glam-after-600w.jpg',
      afterWebp: '/images/webp/before-after/glam-after-600w.webp',
      description: 'Glam makeup transformation',
    },
    {
      id: 3,
      category: 'Editorial',
      title: 'Editorial Look',
      before: '/images/optimized/before-after/editorial-before-600w.jpg',
      beforeWebp: '/images/webp/before-after/editorial-before-600w.webp',
      after: '/images/optimized/before-after/editorial-after-600w.jpg',
      afterWebp: '/images/webp/before-after/editorial-after-600w.webp',
      description: 'Editorial makeup transformation',
    },
  ]

  return (
    <section id="before-after" className="before-after">
      <div className="container">
        <div className="before-after__header">
          <p className="section-eyebrow reveal">Transformations</p>
          <h2 className="section-title reveal">
            See the<br /><em>magic</em>
          </h2>
          <p className="before-after__sub reveal">
            Explore stunning before and after transformations showcasing our makeup artistry.
          </p>
        </div>

        <div className="before-after__grid">
          {transformations.map(transform => (
            <BeforeAfterSlider
              key={transform.id}
              {...transform}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function BeforeAfterSlider({
  id,
  category,
  title,
  description,
  before,
  beforeWebp,
  after,
  afterWebp,
}) {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  const handleMouseMove = (e) => {
    if (!isDragging && e.type !== 'click') return

    const rect = e.currentTarget.getBoundingClientRect()
    const newPos = ((e.clientX - rect.left) / rect.width) * 100
    setSliderPos(Math.min(Math.max(newPos, 0), 100))
  }

  const handleTouchMove = (e) => {
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const newPos = ((touch.clientX - rect.left) / rect.width) * 100
    setSliderPos(Math.min(Math.max(newPos, 0), 100))
  }

  return (
    <div className="before-after__item reveal">
      <h3 className="before-after__title">{title}</h3>
      <p className="before-after__category">{category}</p>

      <div
        className="before-after-slider"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        role="img"
        aria-label={`Before and after: ${title}`}
      >
        {/* Before image */}
        <picture className="before-after-image before">
          <source srcSet={beforeWebp} type="image/webp" />
          <img src={before} alt={`Before: ${description}`} />
        </picture>

        {/* After image (clipped) */}
        <picture className="before-after-image after" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          <source srcSet={afterWebp} type="image/webp" />
          <img src={after} alt={`After: ${description}`} />
        </picture>

        {/* Handle */}
        <div className="before-after-handle" style={{ left: `${sliderPos}%` }}>
          <span className="before-after-label">After</span>
          <div className="before-after-arrows">
            <span>‹</span>
            <span>›</span>
          </div>
        </div>
      </div>
    </div>
  )
}
