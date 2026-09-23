import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { services } from "@/lib/site-data";
export const metadata = { title: "Digital services" };
export default function Services() {
  return (
    <>
      <SiteHeader />
      <main className="listing">
        <section className="detailHero">
          <div className="shell">
            <p className="eyebrow">Services</p>
            <h1>
              Digital capability, <em>connected by purpose.</em>
            </h1>
            <p>
              From a high-performance website to a commerce platform, mobile
              product or growth system, every engagement starts with the
              business outcome.
            </p>
          </div>
        </section>
        <section className="shell cards lightCards">
          {services.map((s, i) => (
            <article key={s.slug}>
              <small>0{i + 1}</small>
              <h2>{s.title}</h2>
              <p>{s.summary}</p>
              <Link href={`/services/${s.slug}/`}>Explore service ↗</Link>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
