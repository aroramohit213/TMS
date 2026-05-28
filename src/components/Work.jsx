import './Work.css'

const projects = [
  {
    id: 1,
    category: 'Brand Identity',
    title: 'Olea Wellness',
    desc: 'Complete visual identity for a holistic wellness brand — logomark, palette, and packaging system rooted in Mediterranean calm.',
    tags: ['Identity', 'Packaging', 'Print'],
    accent: '#C4A882',
  },
  {
    id: 2,
    category: 'Digital Design',
    title: 'Lune Studio',
    desc: 'Website design and art direction for a Parisian architecture studio, balancing editorial typography with spatial photography.',
    tags: ['Web Design', 'Art Direction', 'Typography'],
    accent: '#9B9188',
  },
  {
    id: 3,
    category: 'Brand Identity',
    title: 'Terroir Co.',
    desc: 'Brand system for an artisan food company celebrating provenance — from naming and wordmark through to label design.',
    tags: ['Naming', 'Identity', 'Labels'],
    accent: '#A97550',
  },
  {
    id: 4,
    category: 'Campaign',
    title: 'Dusk Collective',
    desc: 'Seasonal campaign for an independent fashion house — mood direction, lookbook layout, and social content strategy.',
    tags: ['Campaign', 'Editorial', 'Social'],
    accent: '#7A5538',
  },
  {
    id: 5,
    category: 'Digital Design',
    title: 'Pith & Stone',
    desc: 'E-commerce brand and UX for a slow-fashion label, with a design system built for warmth, clarity, and trust.',
    tags: ['UX/UI', 'Design System', 'Shopify'],
    accent: '#D9CEBB',
  },
  {
    id: 6,
    category: 'Brand Identity',
    title: 'Havre Café',
    desc: 'Identity and environmental graphics for a neighbourhood café — playful yet considered, hand-drawn and printed with care.',
    tags: ['Identity', 'Wayfinding', 'Print'],
    accent: '#C4A882',
  },
]

export default function Work() {
  return (
    <section id="work" className="work">
      <div className="container">
        <div className="work__header">
          <p className="section-eyebrow reveal">Selected Work</p>
          <h2 className="section-title reveal">
            Projects we're<br /><em>proud of</em>
          </h2>
          <p className="work__sub reveal">
            A curated selection spanning brand identity,
            digital design, and creative direction.
          </p>
        </div>

        <div className="work__grid">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className={`work-card reveal${i === 0 ? ' work-card--featured' : ''}`}
            >
              <div
                className="work-card__thumb"
                style={{ '--card-accent': p.accent }}
              >
                <span className="work-card__number">0{p.id}</span>
              </div>
              <div className="work-card__body">
                <p className="work-card__category">{p.category}</p>
                <h3 className="work-card__title">{p.title}</h3>
                <p className="work-card__desc">{p.desc}</p>
                <ul className="work-card__tags">
                  {p.tags.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <a href="#contact" className="work-card__link" aria-label={`View ${p.title}`}>
                <span>View Project →</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
