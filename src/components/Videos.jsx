import { useState, useEffect } from 'react'
import './Videos.css'

const videos = [
  {
    id: 1,
    title: 'Bridal Transformation',
    cat: 'Bridal',
    duration: '4:32',
    desc: 'Full bridal prep from base to final look — soft, luminous, lasting all day.',
    youtubeId: null, // ← paste your YouTube video ID here e.g. "dQw4w9WgXcQ"
    bg: 'linear-gradient(155deg,#EDE0CF,#C4A882)',
  },
  {
    id: 2,
    title: 'Editorial SFX Look',
    cat: 'SFX',
    duration: '6:15',
    desc: 'Behind the scenes of a high-fashion editorial with avant-garde special effects.',
    youtubeId: null,
    bg: 'linear-gradient(155deg,#3D2E26,#A97550)',
  },
  {
    id: 3,
    title: 'Full Glam Tutorial',
    cat: 'Glam',
    duration: '12:40',
    desc: 'Step-by-step smoky eye and sculpted glow — products, techniques, tips.',
    youtubeId: null,
    bg: 'linear-gradient(155deg,#C4A882,#7A5538)',
  },
  {
    id: 4,
    title: 'Behind the Scenes',
    cat: 'Editorial',
    duration: '3:20',
    desc: 'A fly-on-the-wall look at a full editorial shoot from mood board to final frame.',
    youtubeId: null,
    bg: 'linear-gradient(155deg,#D9CEBB,#9B9188)',
  },
  {
    id: 5,
    title: 'Wedding Day Coverage',
    cat: 'Bridal',
    duration: '8:55',
    desc: 'Capturing the emotion and artistry of a real wedding morning, start to finish.',
    youtubeId: null,
    bg: 'linear-gradient(155deg,#FAF8F4,#DDD5C8)',
  },
  {
    id: 6,
    title: 'Avant-Garde Colour',
    cat: 'SFX',
    duration: '9:10',
    desc: 'Pushing boundaries with vivid pigments, texture, and unconventional techniques.',
    youtubeId: null,
    bg: 'linear-gradient(155deg,#A97550,#4A3728)',
  },
]

export default function Videos() {
  const [active, setActive] = useState(null)

  // Lock scroll & keyboard close
  useEffect(() => {
    document.body.style.overflow = active !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  useEffect(() => {
    if (active === null) return
    const onKey = e => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <section id="videos" className="videos">
      <div className="container">
        <div className="videos__header">
          <p className="section-eyebrow reveal">Watch</p>
          <h2 className="section-title reveal">
            The art in<br /><em>motion</em>
          </h2>
          <p className="videos__sub reveal">
            Transformations, tutorials, and behind-the-scenes — watch the craft up close.
          </p>
        </div>

        <div className="videos__grid">
          {videos.map((v, i) => (
            <button
              key={v.id}
              className={`vcard reveal${i === 0 ? ' vcard--featured' : ''}`}
              onClick={() => setActive(v)}
              aria-label={`Play video: ${v.title}`}
            >
              {/* Thumbnail */}
              <div className="vcard__thumb" style={{ background: v.bg }}>
                <span className="vcard__play" aria-hidden="true">▶</span>
                <span className="vcard__duration">{v.duration}</span>
              </div>

              {/* Info */}
              <div className="vcard__body">
                <span className="vcard__cat">{v.cat}</span>
                <h3 className="vcard__title">{v.title}</h3>
                <p className="vcard__desc">{v.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Video Modal ── */}
      {active && (
        <div className="vmodal" role="dialog" aria-modal="true" aria-label={active.title}>
          <div className="vmodal__backdrop" onClick={() => setActive(null)} />
          <div className="vmodal__box" onClick={e => e.stopPropagation()}>
            <button
              className="vmodal__close"
              onClick={() => setActive(null)}
              aria-label="Close video"
            >✕</button>

            <div className="vmodal__player">
              {active.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="vmodal__placeholder" style={{ background: active.bg }}>
                  <p>Add your YouTube video ID in <code>Videos.jsx</code></p>
                  <p className="vmodal__placeholder-hint">youtubeId: "YOUR_ID_HERE"</p>
                </div>
              )}
            </div>

            <div className="vmodal__info">
              <span className="vmodal__cat">{active.cat}</span>
              <h3 className="vmodal__title">{active.title}</h3>
              <p className="vmodal__desc">{active.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
