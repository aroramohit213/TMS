import './Skills.css'

const services = [
  {
    icon: '◈',
    title: 'Bridal Makeup',
    desc: 'Soft, luminous, and camera-perfect bridal looks built to last from ceremony to reception — with a calm, unhurried morning experience.',
  },
  {
    icon: '◉',
    title: 'Editorial & Fashion',
    desc: 'High-concept looks for magazines, lookbooks, campaigns, and creative shoots — bold, considered, and photographically precise.',
  },
  {
    icon: '◍',
    title: 'SFX & Avant-Garde',
    desc: 'Prosthetics, sculpted textures, body painting, and experimental techniques for film, theatre, and artistic projects.',
  },
  {
    icon: '◎',
    title: 'Glam & Events',
    desc: 'Evening glam, red carpet, and event makeup that photographs beautifully and feels effortlessly you — from concept to final look.',
  },
]

const tools = [
  'Charlotte Tilbury', 'MAC', 'NARS', 'Hourglass',
  'Airbrush', 'Prosthetics', 'Body Art', 'Film & TV',
]

export default function Skills() {
  return (
    <section id="services" className="skills">
      <div className="container skills__inner">

        <div className="skills__left">
          <p className="section-eyebrow reveal">Services</p>
          <h2 className="section-title reveal">
            What I<br /><em>specialise in</em>
          </h2>
          <p className="skills__intro reveal">
            From intimate bridal mornings to full-scale editorial productions —
            every service is delivered with the same attentiveness,
            skill, and respect for your vision.
          </p>

          <div className="skills__tools reveal">
            <p className="skills__tools-label">Brands &amp; Techniques</p>
            <ul className="skills__tool-list">
              {tools.map(t => (
                <li key={t} className="skills__tool-chip">{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="skills__right">
          {services.map((s, i) => (
            <div key={s.title} className="service-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="service-card__icon">{s.icon}</span>
              <div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
