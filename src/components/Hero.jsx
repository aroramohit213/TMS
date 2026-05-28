import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero">

      {/* ── Background image layer ── */}
      <div
        className="hero__bg"
        style={{ backgroundImage: "url('/images/CG7A5570.JPG')" }}
        aria-hidden="true"
      />

      {/* ── Warm cinematic overlay ── */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* ── Noise grain texture ── */}
      <div className="hero__grain" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="container hero__inner">
        <div className="hero__content">

          <p className="hero__eyebrow">Makeup Artist &amp; Beauty Director</p>

          <h1 className="hero__title">
            Artistry that<br />
            speaks <em>before</em><br />
            words do
          </h1>

          <div className="hero__divider" aria-hidden="true" />

          <p className="hero__sub">
            Bridal · Editorial · Glam · SFX
          </p>

          <div className="hero__actions">
            <a href="#gallery" className="btn hero__btn--primary">View Portfolio</a>
            <a href="#contact" className="btn hero__btn--ghost">Book a Session</a>
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="hero__scroll">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>

    </section>
  )
}
