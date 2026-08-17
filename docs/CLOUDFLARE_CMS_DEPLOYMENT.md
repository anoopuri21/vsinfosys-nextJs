# Cloudflare CMS deployment gate

## Implemented resources
- Worker: `vs-infosys-cms-api`
- D1 bindings: `DB`
- R2 bindings: `MEDIA`
- Migration: `workers/cms-api/migrations/0001_initial.sql`

## Manual ownership steps
1. Create D1 databases named `vsinfosys-content-prod` and `vsinfosys-content-preview`.
2. Replace `database_id` in `wrangler.jsonc` with the Cloudflare-issued production ID. Configure a preview environment with its own database ID before preview deployment.
3. Create R2 buckets `vsinfosys-media-prod` and `vsinfosys-media-preview`; bind the correct bucket for each environment.
4. Set `ADMIN_SHARED_SECRET` through `wrangler secret put ADMIN_SHARED_SECRET` only for trusted server-to-server automation. Do not store its value in Git or chat.
5. Configure Cloudflare Access for `admin.vsinfosys.in` and require it for every `/v1/admin/*` route. Set `CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUDIENCE` as Worker secrets/variables from the Access application configuration. The Worker verifies the signed `Cf-Access-Jwt-Assertion`; browser code never receives an admin secret.
6. Configure `NEXT_PUBLIC_CMS_API_ORIGIN` only in the protected admin-site build environment. For the recommended same-origin deployment, route the Worker at `admin.vsinfosys.in/v1/*` and set this value to `https://admin.vsinfosys.in`.

The temporary shared-secret gate is intentionally fail-closed when neither a valid Access JWT nor the server-to-server secret is available.
7. Run the migration remotely: `npx wrangler d1 execute vsinfosys-content-prod --remote --file=workers/cms-api/migrations/0001_initial.sql`.
8. Deploy: `npx wrangler deploy`.

## Validation before production
- Confirm unauthenticated `POST /v1/admin/content` returns 401.
- Confirm an authenticated draft save creates a revision and audit event.
- Confirm only `published` items resolve from `GET /v1/content/:type/:slug`.
- Confirm every publish increments `/v1/content-version` and that public content is refreshed by the configured cache/version strategy before promising real-time publishing.
- Configure `NEXT_PUBLIC_CONTENT_API_ORIGIN` in the public-site build only with the read-only API hostname. Never expose a write-capable route or secret in public environment variables.
- Confirm a valid Cloudflare Access JWT is accepted and an invalid JWT is rejected before enabling browser-based editorial access.
