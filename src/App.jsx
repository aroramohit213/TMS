import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Reels from './components/Reels'
// import Videos  from './components/Videos'
// import Skills  from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/react';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function App() {
  useScrollReveal()

  return (
    <>
      <Analytics />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Reels />
        {/* <Videos  /> */}
        {/* <Skills  /> */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}

