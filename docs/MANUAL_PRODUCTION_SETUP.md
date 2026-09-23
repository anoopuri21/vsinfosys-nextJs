# VS Infosys — manual production setup

Complete these tasks after code is deployed. Do not paste credentials, tokens, passwords, or OTPs into Git or chat.

## 1. Central environment values
1. Copy `.env.example` to `.env.local` for local development.
2. Put browser-safe values only in `NEXT_PUBLIC_*` variables.
3. Add Worker secrets with `npx wrangler secret put <NAME>`; never place them in a public Next.js environment variable.

## 2. Cloudflare account and domain
1. Add `vsinfosys.in` to Cloudflare and update domain registrar nameservers.
2. Deploy the static `out/` directory to Cloudflare Pages.
3. Add `vsinfosys.in`, `www.vsinfosys.in`, `admin.vsinfosys.in`, and `api.vsinfosys.in` as required.
4. Set SSL/TLS to Full (strict); verify HTTPS redirects and headers.

## 3. Data and CMS resources
1. Create production and preview D1 databases.
2. Replace placeholder D1 IDs in `wrangler.jsonc`.
3. Create production and preview R2 buckets.
4. Run migrations in order: `0001_initial.sql`, `0002_content_versions.sql`, `0003_enquiries.sql`, `0004_enquiry_rate_limit.sql`.
5. Deploy the Worker only after D1/R2 bindings are verified.

## 4. Admin protection
1. Create a Cloudflare Access application for `admin.vsinfosys.in`.
2. Require approved editor emails or an approved identity provider.
3. Set `CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUDIENCE` on the Worker.
4. Route `/v1/admin/*` through the protected Worker hostname.
5. Test unauthenticated requests return 401 before allowing editors access.

## 5. Enquiry protection and delivery
1. Create Cloudflare Turnstile site and secret keys.
2. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in the public build environment.
3. Set `TURNSTILE_SECRET_KEY` as a Worker secret.
4. Configure approved transactional email provider values (`RESEND_API_KEY`, `ENQUIRY_NOTIFICATION_EMAIL`) only when email notification integration is implemented and verified.
5. Test valid submission, invalid token, rate limit, consent failure, and email delivery.

## 6. SEO and business verification
1. Confirm business name, address/service-area policy, phone, email, business hours, and legal details.
2. Verify Google Search Console domain property and submit `https://vsinfosys.in/sitemap.xml`.
3. Configure Google Business Profile only with verified visible business information.
4. Use Keyword Planner, Google Trends, SERP review, and post-launch Search Console data to approve page-specific keyword maps.
5. Do not publish pages, schema, reviews, results, clients, or industry claims that cannot be verified.

## 7. Pre-launch gate
1. Run `npm ci && npm run check && npm run worker:dry-run`.
2. Run production route, mobile, keyboard, screen-reader, form, schema, and Core Web Vitals checks.
3. Confirm admin, preview, staging and thin pages are noindexed.
4. Confirm backups/rollback and D1 export procedures.
