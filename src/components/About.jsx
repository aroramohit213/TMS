import './About.css'

const stats = [
  { value: '5+',   label: 'Years of artistry'  },
  { value: '500+', label: 'Looks created'       },
  { value: '50+',  label: 'Weddings'            },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about__inner">
        <div className="about__image-col reveal">
          <div className="about__frame">
            <img
              src="/images/0A3A1105.jpg"
              alt="Makeup artist portrait"
              className="about__img"
            />
            <div className="about__frame-accent" />
          </div>
        </div>

        <div className="about__text-col">
          <p className="section-eyebrow reveal">About</p>
          <h2 className="section-title reveal">
            Beauty rooted in<br /><em>honest craft</em>
          </h2>
          <p className="about__body reveal">
            I'm a makeup artist and beauty director with over eight years
            of experience working across bridal, editorial, film, and special
            effects. My work is guided by one belief: <em>every face tells
            a story worth telling beautifully.</em>
          </p>
          <p className="about__body reveal">
            Whether it's a once-in-a-lifetime wedding morning or a bold
            fashion editorial, I bring the same level of care, precision,
            and warmth to every chair.
          </p>

          <div className="about__stats reveal">
            {stats.map(s => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
