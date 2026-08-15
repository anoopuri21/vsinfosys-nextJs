# Production Conversion Checklist

The current build is a noindex prototype. Before publishing on the official domain:

- [ ] Replace placeholder email and WhatsApp links.
- [ ] Confirm public Delhi address/service-area wording.
- [ ] Remove prototype `noindex,nofollow`.
- [ ] Replace `robots.txt` with production rules.
- [ ] Add an absolute canonical using the official HTTPS domain.
- [ ] Add the production `og:url` and Open Graph image.
- [ ] Generate `sitemap.xml` with canonical production URLs.
- [ ] Add verified Organization or LocalBusiness JSON-LD.
- [ ] Connect the form to a secure PHP endpoint with server validation, rate limiting and spam protection.
- [ ] Publish only completed insight articles; remove “Guide planned” states.
- [ ] Test the real Apache/PHP hosting environment.
- [ ] Run Lighthouse, keyboard, screen-reader and reduced-motion checks.
- [ ] Verify Google Search Console and submit the sitemap.
- [ ] Measure field Core Web Vitals after launch.
