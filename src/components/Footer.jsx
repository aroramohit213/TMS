import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#hero" className="footer__logo">
            <span className="footer__logo-mark">✦</span>
            Studio
          </a>
          <p className="footer__tagline">Brand &amp; Creative Direction</p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <a href="#about"   className="footer__link">About</a>
          <a href="#work"    className="footer__link">Work</a>
          {/* <a href="#skills"  className="footer__link">Skills</a>
          <a href="#contact" className="footer__link">Contact</a> */}
        </nav>

        <p className="footer__copy">
          © {year} The Magic Smudge. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
