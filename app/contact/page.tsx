import { EnquiryForm } from "@/components/enquiry-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
export const metadata = {
  title: "Contact VS Infosys",
  description:
    "Start a conversation with VS Infosys about websites, e-commerce, mobile applications and digital marketing.",
};
export default function Contact() {
  return (
    <>
      <SiteHeader />
      <main className="detail">
        <section className="detailHero">
          <div className="shell">
            <p className="eyebrow">Contact</p>
            <h1>
              Start with the problem—<em>not a preset package.</em>
            </h1>
            <p>
              Tell us what feels unclear, slow, disconnected or difficult today.
              We will shape the right next conversation around the outcome you
              need.
            </p>
          </div>
        </section>
        <section className="shell formPlaceholder">
          <p className="eyebrow">Project enquiries</p>
          <h2>Describe the opportunity.</h2>
          <EnquiryForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
