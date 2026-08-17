import Link from "next/link";
export function SiteFooter() {
  return (
    <footer className="footer">
      <div>
        <Link className="logo" href="/">
          VS infosys<span>.</span>
        </Link>
        <p>
          Websites, commerce, mobile products and growth systems—built with
          clarity from Delhi.
        </p>
      </div>
      <div>
        <small>Explore</small>
        <Link href="/services/">Services</Link>
        <Link href="/industries/">Industries</Link>
        <Link href="/technologies/">Technology</Link>
      </div>
      <div>
        <small>Connect</small>
        <Link href="/contact/">Contact</Link>
        <Link href="/start-a-project/">Start a project</Link>
        <span>Contact details on launch</span>
      </div>
      <div className="footerBottom">
        © {new Date().getFullYear()} VS Infosys <span>Delhi, India</span>
      </div>
    </footer>
  );
}
