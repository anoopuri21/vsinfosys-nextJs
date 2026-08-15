# VS Infosys

Static cinematic homepage prototype for VS Infosys, a Delhi-based IT services company.

## Prototype stack

- Semantic HTML5
- Custom CSS architecture
- Vanilla JavaScript ES modules
- No Node.js, Next.js or MongoDB
- No Tailwind CSS or Bootstrap
- No third-party animation library

## Run locally

The site is static. Serve the repository with any static HTTP server, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Website scope

The workspace now contains 31 static HTML pages: the cinematic homepage, services overview, six capability hubs, thirteen detailed service pages, About, Contact, Start a Project, Insights, three original guides, legal drafts and a custom 404.

## Architecture

- [Implementation Status](./IMPLEMENTATION_STATUS.md)
- [Autonomous Page Inventory](./project-management/PAGE_INVENTORY.md)
- [Static Prototype Architecture](./STATIC_ARCHITECTURE.md)
- [Production Conversion Checklist](./PRODUCTION_CHECKLIST.md)

## Build-time utilities

```bash
python3 tools/build_pages.py
python3 tools/build_content_pages.py
python3 tools/check_site.py
```

Python is used only to generate and validate static files. It is not required by the production website.

## Planning documents

- [Phased Execution and Autonomous SEO Roadmap](./EXECUTION_ROADMAP.md)
- [Homepage Master Plan](./HOMEPAGE_PLAN.md)
- [Digital Experience Design Bible](./DESIGN_BIBLE.md)

## Prototype safety

The prototype uses `noindex,nofollow` and a blocking `robots.txt`. These must be replaced only after the official domain, business details and production content are confirmed.
