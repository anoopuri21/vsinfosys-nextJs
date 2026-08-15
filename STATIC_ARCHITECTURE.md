# VS Infosys — Static Prototype Architecture

## Runtime

The prototype uses only technologies supported by inexpensive static or shared hosting:

- Semantic HTML5
- Custom CSS
- Vanilla JavaScript ES modules
- No Node.js runtime
- No Next.js
- No MongoDB
- No Tailwind CSS
- No Bootstrap
- No animation dependency

A production form can later use a small PHP endpoint on shared hosting. WordPress or a PHP/MySQL CMS can be added only if content editing is required.

## File structure

```text
/
├── index.html
├── 404.html
├── robots.txt
├── assets/
│   ├── css/
│   │   ├── reset.css       # browser normalization
│   │   ├── tokens.css      # color, type, spacing and motion tokens
│   │   ├── base.css        # global typography and shared layout
│   │   ├── components.css  # header, buttons, footer and common UI
│   │   ├── sections.css    # homepage section designs
│   │   ├── motion.css      # progressive motion and reduced-motion rules
│   │   └── responsive.css  # tablet and mobile behavior
│   └── js/
│       ├── main.js         # initialization only
│       └── modules/
│           ├── navigation.js
│           ├── scroll.js
│           ├── capabilities.js
│           ├── lifecycle.js
│           ├── lab.js
│           ├── interactions.js
│           └── form.js
└── design/                 # planning visuals, not required in production
```

## Architecture rules

1. Essential copy and links remain in HTML.
2. JavaScript enhances; it does not provide the only access to content.
3. Each JavaScript module has one responsibility.
4. CSS uses shared tokens instead of framework utilities.
5. Only transform and opacity are used for frequent animation where practical.
6. Reduced motion can be selected by the visitor and honors the OS preference.
7. No third-party request is required for the homepage to render.
8. System fonts prevent font-download delays in the prototype.
9. The prototype is explicitly `noindex` and robots-blocked until the domain and production content are confirmed.
10. Production contact submission must be server-validated; the prototype does not transmit personal data.

## Shared-hosting production path

### Option A — Static + PHP form

Best for the lowest hosting cost and minimal content updates.

- Static HTML/CSS/JS pages
- PHP form handler
- SMTP email delivery
- Optional SQLite/MySQL lead log
- Manually generated sitemap or PHP build utility

### Option B — WordPress custom theme

Best when non-technical editing and frequent insight publishing are required.

- Custom theme reproducing this frontend
- WordPress/PHP/MySQL
- Native block fields or a controlled field system
- Static caching
- Custom metadata/schema controls

### Option C — PHP custom site

Best for custom shared-hosting workflows without WordPress.

- PHP templates and includes
- MySQL only when required
- Simple admin limited to actual editing needs
- Full-page caching

The final production choice should be made after confirming hosting, update frequency, user roles and content workflow.

## Prototype limitations

- Contact form currently demonstrates interaction only.
- Email, phone, WhatsApp and domain values are placeholders.
- Insight links are marked as planned because articles do not yet exist.
- Production canonical, Open Graph URL, sitemap and schema will be added after the official domain and business data are confirmed.
