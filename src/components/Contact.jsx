import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    // Replace with your preferred form handler / API call
    setSent(true)
  }

  const socials = [
    { name: 'Instagram', url: 'https://instagram.com/themagicsmudge' },
    // { name: 'Behance', url: 'https://behance.net/yourprofile' },
    { name: 'Facebook', url: 'https://facebook.com/in/themagicsmudge' },
    { name: 'WhatsApp', url: 'https://wa.me/919971326772?text=Hi%2C%20I%20would%20like%20to%20discuss%20a%20project' }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">

        <div className="contact__left">
          <p className="section-eyebrow reveal">Contact</p>
          <h2 className="section-title reveal">
            Let's make<br /><em>something great</em>
          </h2>
          <p className="contact__sub reveal">
            Ready to book a session or have a project in mind?
            I'd love to hear from you — drop a message and I'll
            respond within 24 hours.
          </p>

          <div className="contact__details reveal">
            <a href="mailto:juhikalra72@gmail.com" className="contact__detail">
              <span className="contact__detail-icon">✉</span>
              juhikalra72@gmail.com
            </a>
            <a href="tel:+919971326772" className="contact__detail">
              <span className="contact__detail-icon">☏</span>
              +91 9971326772
            </a>
          </div>

          <div className="contact__socials reveal">
            {socials.map(social => (
              <a 
                key={social.name} 
                href={social.url} 
                className="contact__social"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="contact__right reveal">
          {sent ? (
            <div className="contact__success">
              <span className="contact__success-icon">✦</span>
              <h3>Message sent!</h3>
              <p>Thank you for reaching out. I'll be in touch soon.</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your query..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn--solid contact__submit">
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
