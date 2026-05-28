import { useState, useEffect } from 'react'
import './Navbar.css'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Gallery',  href: '#gallery'  },
  { label: 'Reels',    href: '#reels'    },
  // { label: 'Videos',   href: '#videos'   },
  // { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__logo" onClick={close}>
          <span className="navbar__logo-mark">✦</span>
          <span className="navbar__logo-name">Studio</span>
        </a>

        <nav className={`navbar__nav${open ? ' navbar__nav--open' : ''}`} aria-label="Main navigation">
          <ul className="navbar__list">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className="navbar__link" onClick={close}>{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn--outline navbar__cta" onClick={close}>
            Let's talk
          </a>
        </nav>

        <button
          className={`navbar__burger${open ? ' navbar__burger--open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {open && <div className="navbar__overlay" onClick={close} />}
    </header>
  )
}
