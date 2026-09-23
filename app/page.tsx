import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CmsHomeHero } from "@/components/cms-home-hero";
import { industries, services, technologies } from "@/lib/site-data";
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "VS Infosys",
    url: "https://vsinfosys.in",
    areaServed: "Delhi, India",
    serviceType: services.map((s) => s.title),
  };
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="glow" />
          <div className="shell">
            <p className="eyebrow">Digital technology studio · Delhi</p>
            <CmsHomeHero />
            <div className="heroActions">
              <Link className="button primary" href="/start-a-project/">
                Start a project <span>↗</span>
              </Link>
              <Link className="textLink" href="#services">
                Explore our capabilities ↓
              </Link>
            </div>
          </div>
          <div className="orbital" aria-hidden="true">
            <i />
            <b />
            <span />
          </div>
        </section>
        <section className="statement shell">
          <p className="eyebrow">What we believe</p>
          <h2>
            A digital presence should do more than <em>exist.</em>
          </h2>
          <p>
            It should explain, persuade, convert, simplify and create room to
            grow.
          </p>
        </section>
        <section className="dark" id="services">
          <div className="shell sectionHead">
            <p className="eyebrow">Priority services</p>
            <h2>
              Build the experience.
              <br />
              <em>Connect the growth.</em>
            </h2>
            <p>
              Start with the outcome you need. We shape the right combination of
              strategy, design, technology and content around it.
            </p>
          </div>
          <div className="shell cards">
            {services.map((s, i) => (
              <article key={s.slug}>
                <small>0{i + 1}</small>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <Link href={`/services/${s.slug}/`}>
                  Explore service <span>↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className="industry shell">
          <div className="sectionHead">
            <p className="eyebrow">Industries</p>
            <h2>
              Different industries.
              <br />
              <em>Clearer digital journeys.</em>
            </h2>
            <p>
              We design around the information, trust and workflow needs that
              make each sector distinct.
            </p>
          </div>
          <div className="industryGrid">
            {industries.map((i) => (
              <Link href={`/industries/${i.slug}/`} key={i.slug}>
                <small>{i.eyebrow}</small>
                <h3>{i.title}</h3>
                <p>{i.summary}</p>
                <span>Explore industry ↗</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="process">
          <div className="shell">
            <p className="eyebrow">A connected method</p>
            <h2>
              Clarity before code.
              <br />
              <em>Momentum after launch.</em>
            </h2>
            <ol>
              <li>
                <b>01</b>
                <div>
                  <h3>Understand</h3>
                  <p>
                    Find the real business friction and the action that should
                    become easier.
                  </p>
                </div>
              </li>
              <li>
                <b>02</b>
                <div>
                  <h3>Design</h3>
                  <p>
                    Make the offer, interface, content and system work as one
                    connected journey.
                  </p>
                </div>
              </li>
              <li>
                <b>03</b>
                <div>
                  <h3>Build & grow</h3>
                  <p>
                    Launch a manageable platform with a strong technical and
                    search foundation.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>
        <section className="technology dark">
          <div className="shell">
            <p className="eyebrow">Technology with a reason</p>
            <h2>
              Choose tools for the job—<em>not a logo wall.</em>
            </h2>
            <div className="techList">
              {technologies.map((t) => (
                <Link href="/technologies/" key={t}>
                  {t} <span>↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="closing">
          <p className="eyebrow">A useful next step</p>
          <h2>
            Tell us what should
            <br />
            <em>work better.</em>
          </h2>
          <Link href="/start-a-project/" className="button primary">
            Start a project <span>↗</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
