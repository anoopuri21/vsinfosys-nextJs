import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { technologies } from "@/lib/site-data";
export const metadata = { title: "Technology choices" };
export default function Technologies() {
  return (
    <>
      <SiteHeader />
      <main className="listing">
        <section className="detailHero">
          <div className="shell">
            <p className="eyebrow">Technology</p>
            <h1>
              Choose the stack for the <em>work ahead.</em>
            </h1>
            <p>
              We use technology as a practical decision: around the user
              journey, operating team, content needs, security and future
              change.
            </p>
          </div>
        </section>
        <section className="shell techPage">
          {technologies.map((t, i) => (
            <article key={t}>
              <small>0{i + 1}</small>
              <h2>{t}</h2>
              <p>
                Selected when it creates a clearer, maintainable and appropriate
                foundation for the product or digital experience.
              </p>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
