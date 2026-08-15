# VS Infosys — Digital Experience Design Bible

**Status:** Research and design-system foundation  
**Date:** 14 August 2026  
**Purpose:** The single source of truth for the next visual concept and eventual implementation.

---

## 1. The Strategic Reset

### What changed

VS Infosys currently has only a company name. There are no approved photographs, client logos, testimonials, case studies, portfolio items, performance results, awards or company-history details.

The website must therefore **never**:

- invent clients, testimonials, awards, years of experience or results;
- show fictional work in a section that looks like a client portfolio;
- describe VS Infosys as new, inexperienced or “just starting”; or
- compensate with vague claims such as “industry-leading” or “trusted by hundreds”.

### The core strategy

> **The website itself will be the first and strongest proof of capability.**

A creative technology company can demonstrate expertise through the quality of its own experience: visual craft, interaction quality, speed, accessibility, clarity, useful tools, technical explanations and original thinking. Research into leading agency sites repeatedly supports this “show, do not merely tell” approach. Fantasy is specifically noted for making its homepage experience prove its design capability; Active Theory treats its own site as a continuous demonstration of interactive technology; and high-performing agency sites combine immersive presentation with a clear value proposition.[1][2][3]

The site will not have a **Portfolio**, **Our Work**, **Case Studies**, **Clients** or **Testimonials** section at launch. Navigation will not contain an empty “Work” link.

Instead, credibility will come from five honest forms of proof:

1. **Experiential proof** — the website feels exceptionally designed and engineered.
2. **Demonstration proof** — live micro-experiences show what websites, commerce, SEO, content and AI can do.
3. **Process proof** — visitors can see how VS Infosys thinks and delivers.
4. **Knowledge proof** — useful original articles, checklists and interactive tools answer real buyer questions.
5. **Technical proof** — the live site publishes its own performance, accessibility and SEO standards after they are measured in production.

---

## 2. Research Principles and Findings

## 2.1 What strong cinematic websites do well

Awwwards categorizes successful storytelling as the combination of visual design and UI that encourages interaction. Its one-page and storytelling collections repeatedly feature continuous journeys, scroll-triggered motion, WebGL, controlled reveals and minimal navigation.[4][5]

The most reusable patterns are:

- one visual idea repeated through the entire story;
- oversized typography acting as imagery;
- alternating moments of intensity and calm;
- scroll progression that changes a scene instead of merely moving cards upward;
- pinned chapters with controlled internal progression;
- visual transitions that connect subjects rather than decorative effects between unrelated blocks;
- a clear conversion route that remains accessible throughout the experience.

### VS Infosys application

The recurring visual idea will be **light becoming structure**:

- A small white-hot point appears in the opening.
- It emits a glowing line and reveals the hero typography.
- The line becomes a wireframe, browser frame, commerce path, search graph, content waveform and AI workflow.
- It finally resolves into a clean contact path.

This gives all services a shared visual language without requiring client photography.

## 2.2 Lessons from benchmark studios

### Obys — typography, grid and motion

Obys describes its own approach as modernist design combining typography, grid systems and motion to balance clarity, usability and bold expression. Its Typography Principles project turns hierarchy, rhythm and balance into an interactive learning experience.[6][7]

**Adopt:** disciplined grid, expressive scale changes, typography as a visual scene, strong rhythm.  
**Do not copy:** layouts, exact transitions, type treatments or brand devices.

### Active Theory — the medium demonstrates the service

Active Theory positions itself around the blend of story, art and technology, with work centered on browser-based interactive experiences. Its site is frequently described as an environment rather than a conventional scrolling brochure.[2][8]

**Adopt:** the experience itself as evidence, technically ambitious hero moment, interaction as discovery.  
**Avoid:** game-like navigation that obscures ordinary service discovery.

### Unseen Studio — scroll-tied 3D with optimization built in

For Superlist, Unseen tied bespoke WebGL graphics to scroll, added detailed text motion and optimized the result through removing invisible geometry, baking animations and using lightweight textures.[9]

**Adopt:** optimization as part of art direction, not an afterthought; one lightweight 3D hero object; scroll-controlled story.  
**Avoid:** making every section a WebGL scene.

### Locomotive — type as motion and editorial pacing

Recent analysis of Locomotive’s site highlights viewport-scale type, scroll-responsive transformation, magazine-like case-study layouts and timing that feels polished without becoming noisy. Locomotive Scroll itself uses optimized viewport detection and disables parallax on touch devices.[10][11]

**Adopt:** type-led scenes, editorial pacing, responsive removal of unnecessary effects.  
**Avoid:** horizontal movement when it makes service content hard to discover.

### Monochrome references

Research on monochrome web design consistently points to black and white as a foundation that places more responsibility on typography, hierarchy, texture and motion. Alternating black and white chapters creates rhythm, while a single accent color can focus attention on key actions.[12][13]

**VS Infosys decision:** true black/soft white foundation, grayscale imagery and controlled white/orange glow. Orange is used as emitted light, not as a general UI fill.

## 2.3 Information architecture research

Progressive disclosure recommends showing the most important choices first and revealing specialized options only on request. The initial split must preserve frequently needed information, and the path to deeper information must be obvious and clearly labelled.[14]

For multi-service firms, good information architecture separates service, audience, location and resource logic; builds service hubs; and structures navigation around buying decisions rather than internal departments.[15] Strong service sites group complex offerings, use concise descriptions and guide users from high-level outcomes into deeper pages.[16]

### VS Infosys application

The 13 services are grouped around customer outcomes:

1. **Create a Digital Presence**  
   Web design, development, dynamic websites, WordPress, domain and hosting

2. **Build Products & Commerce**  
   E-commerce, Shopify and app development

3. **Grow Demand**  
   SEO and digital marketing

4. **Produce Brand Content**  
   Content writing, graphics and video generation

5. **Automate with AI**  
   AI implementation and workflow automation

The homepage introduces these five routes. Individual technology and service detail remains available through progressive disclosure and dedicated service pages.

## 2.4 Motion and scroll research

GSAP ScrollTrigger supports pinned sections, scrubbed timelines, snapping and responsive media-query handling. Motion’s scroll APIs can bind progress to transforms, opacity, clip-path and filters, with GPU acceleration where supported. For pinned sections, Motion recommends using native `position: sticky` where possible.[17][18]

Native CSS scroll-driven animation is useful for simple progress and reveal effects, but MDN still marks `animation-timeline` as limited availability. It therefore requires progressive enhancement and a visible fallback.[19]

### VS Infosys motion architecture

Use the lightest appropriate technique:

- **CSS transitions:** buttons, links, menu, minor reveals.
- **Intersection Observer or Motion:** ordinary in-view text and object reveals.
- **Native sticky positioning:** pinned layouts wherever possible.
- **GSAP ScrollTrigger:** only for complex multi-stage pinned chapters and synchronized sequences.
- **Canvas:** glowing particles/lines if DOM elements become expensive.
- **WebGL/Three.js:** one hero object or one high-value scene only, if performance testing permits.
- **Image sequence:** only if a specific visual transformation cannot be achieved more efficiently.

No effect should require custom scroll-jacking. The browser’s native scroll remains the source of truth.

## 2.5 Performance research

Web performance guidance recommends restricting animation primarily to `transform` and `opacity`, because layout- or paint-triggering animation is expensive. The target for a smooth experience is 60fps, which allows roughly 16.7ms per frame.[20][21]

Core Web Vitals targets remain:

- LCP: 2.5 seconds or less
- INP: 200 milliseconds or less
- CLS: 0.1 or less[22]

### VS Infosys performance rules

- Hero must communicate before any 3D enhancement finishes loading.
- The headline and CTA are server-rendered HTML, never canvas-only.
- Hero 3D loads progressively after critical text and font resources.
- Maximum one persistent canvas at a time.
- Below-fold scene assets load near the viewport.
- Images use AVIF/WebP with explicit dimensions.
- Mobile receives reduced geometry, fewer particles and static alternatives.
- `will-change` is applied temporarily and sparingly.
- Performance is checked on mid-range Android hardware, not only desktop development machines.

## 2.6 Accessibility research

W3C notes that parallax and movement triggered by scrolling can cause dizziness, nausea and headaches. It recommends eliminating unnecessary motion, honoring user motion preferences or providing a control to disable non-essential effects.[23] Motion’s accessibility guidance similarly recommends replacing large transform animation with opacity, disabling autoplay video and turning off parallax for users requesting reduced motion.[24]

### VS Infosys accessibility rules

- Respect `prefers-reduced-motion` across CSS, Motion, GSAP and WebGL.
- Add an optional visible **Motion: On/Off** control in the utility menu.
- Reduced mode replaces parallax and spatial transitions with short fades or immediate states.
- All content remains in semantic DOM order regardless of visual pinning.
- Pinned scenes never trap keyboard focus or hide the current reading position.
- No flashing glow; pulses stay slow and below seizure-risk thresholds.
- Body copy maintains WCAG AA contrast.
- Decorative graphics do not add screen-reader noise.

---

## 3. Credibility Without a Portfolio

## 3.1 What replaces the portfolio section

### A. The Website as Exhibit Zero

The site visibly demonstrates:

- art direction;
- responsive layout;
- cinematic motion;
- clear information architecture;
- technical execution;
- performance discipline;
- accessibility;
- conversion-focused UX.

This is never labelled “portfolio”. It is simply the quality of the experience.

### B. Interactive Capability Demonstrations

These are reusable, honest demonstrations—not fictional client projects:

1. **Website transformation demo**  
   A generic unstructured page transforms into a clean, responsive interface as the user scrolls.

2. **Commerce conversion path**  
   A neutral product object moves through discovery, product detail, cart and checkout states.

3. **SEO visibility map**  
   Search intent nodes organize into content clusters and technical foundations. No fabricated traffic graph.

4. **Content engine**  
   One idea visibly expands into an article, social graphic and video storyboard.

5. **AI workflow**  
   A repetitive manual enquiry flow becomes an assisted qualification and routing system.

Every demo explains a principle and an outcome. None uses an invented company, result or testimonial.

### C. Useful Interactive Tools

These provide value before a sales call and demonstrate expertise:

- Website Readiness Check
- Project Scope Builder
- Platform Selector: Shopify, WordPress or Custom
- SEO Foundations Checklist
- AI Opportunity Finder

The launch homepage can include one compact tool: **“What should you build next?”** The visitor answers three questions and receives a suggested route with relevant services. The result is guidance, not an automated quote or guaranteed recommendation.

### D. Build Standards

Publish a clear standard covering:

- responsive behavior;
- technical SEO;
- accessibility;
- performance;
- content editing;
- testing;
- launch support.

This is more credible than unsupported “best quality” language.

### E. Original Thinking

Initial useful resources should answer buying questions:

- Custom website, WordPress or Shopify: how to choose
- What actually affects website cost?
- A practical website launch checklist
- SEO before and after launch
- Where AI automation helps—and where it does not

Do not publish dozens of thin AI-generated posts. Three strong resources are better than a fake archive.

## 3.2 Language rules

### Use

- “We design and build…”
- “Our approach…”
- “Built around your users and business goals.”
- “Explore what is possible.”
- “See how the system works.”
- “Every project includes…”

### Avoid until verified

- “For over X years”
- “Hundreds of clients”
- “Award-winning”
- “Delhi’s leading agency”
- “Proven results”
- “Trusted by…”
- numerical performance claims about client work

Confident communication does not require discussing the age of the company.

---

## 4. Revised Homepage Story — 20 Sections

The homepage is structured as five cinematic acts. This expands both sections and content while keeping a clear narrative.

## Act I — Attention: Light Begins

### 01. Utility Header

**Content:** VS Infosys wordmark; Services, Approach, Insights, About; Start a Project.  
**Design:** transparent black with hairline grid; becomes opaque on scroll.  
**Motion:** wordmark and links fade in after the first light pulse.

### 02. Cinematic Hero — “Build What Comes Next”

**Headline:** “We design, build and grow digital businesses.”  
**Support:** “Websites, commerce, content, marketing and AI systems—crafted in Delhi for ambitious businesses everywhere.”  
**Actions:** Start a Project / Explore Capabilities.  
**Visual:** a white-hot point forms a translucent monochrome object with an orange-white orbital glow.  
**Scroll:** object unfolds into a wireframe grid while the headline separates into depth layers.

### 03. Focus Statement

**Headline:** “Your digital presence should do more than exist.”  
**Content:** It should explain, persuade, convert, simplify operations and create room to grow.  
**Design:** quiet white chapter after an intense black hero.  
**Motion:** each outcome appears as the glowing line crosses it.

### 04. Outcome Navigator

Five routes: Presence, Products & Commerce, Demand, Brand Content, AI Automation.  
**Interaction:** pointer movement changes one central abstract object; tap/keyboard selection reveals included services.  
**Purpose:** lets buyers self-select without scanning 13 equal cards.

## Act II — Possibility: What We Can Build

### 05. Pinned Digital Lifecycle

A 400–500vh outer section with a sticky viewport. One business idea moves through four scenes: **Imagine → Build → Launch → Grow**.  
**Visual:** the same glowing object evolves from point to grid to interface to connected ecosystem.  
**Content:** concise outcome-led copy with one route per scene.  
**Fallback:** four ordinary stacked sections.

### 06. Web Experience Chapter

Covers web design, development, dynamic websites and WordPress.  
**Demonstration:** an intentionally disordered interface aligns into a responsive grid as the user scrolls.  
**Copy focus:** clarity, speed, search readiness and easy management.

### 07. Commerce Chapter

Covers e-commerce and Shopify.  
**Demonstration:** a grayscale object travels through discovery, product, cart and checkout frames. Orange glow marks only the current decision point.  
**Copy focus:** reduce friction from first view to purchase.

### 08. Growth Engine Chapter

Covers SEO and digital marketing.  
**Demonstration:** scattered search questions cluster into topics, pages and a measurement loop.  
**Copy focus:** technical foundation + useful content + measurable campaigns.  
**Rule:** no fake traffic charts.

### 09. Content Studio Chapter

Covers writing, graphics and video generation.  
**Demonstration:** one core idea branches into headline, article outline, graphic composition and video frames.  
**Copy focus:** a consistent message adapted to multiple formats.

### 10. AI in Practical Terms

Covers AI implementation.  
**Demonstration:** a manual lead enquiry passes through five disconnected boxes; scroll connects qualification, knowledge retrieval, response and routing into one assisted workflow.  
**Copy focus:** useful automation, human oversight and workflow fit—not futuristic hype.

### 11. Applications & Connected Systems

Covers app development, Node.js/MongoDB systems and Laravel/Filament capability.  
**Visual:** layered interface planes and data paths with subtle depth.  
**Copy focus:** dashboards, portals, internal tools and custom applications.

## Act III — Evidence: The Site Proves the Standard

### 12. Interactive Capability Lab

**Not a portfolio.** A split-screen live playground lets visitors activate three demonstrations:

- Responsive Layout
- Conversion Path
- Intelligent Workflow

Each demonstration is small, fast and self-contained. The section’s title can be **“Experience the difference.”** It does not mention concept work, past clients or fictional brands.

### 13. Built to a Higher Standard

Six measurable build principles:

- Fast by design
- Responsive at every breakpoint
- Search-ready structure
- Accessible interactions
- Editable content
- Secure, maintainable foundations

After launch, verified metrics for the VS Infosys site itself may appear here, with date and test conditions. Until then, show standards—not scores.

### 14. Technology with a Reason

Technology appears as a decision system, not a logo wall:

- Next.js / React for high-performance experiences
- WordPress for familiar content workflows
- Shopify for focused commerce
- Laravel / Filament for operational applications
- Node.js / MongoDB for flexible connected systems
- Payload CMS for structured custom publishing

Interaction reveals **when we choose it**, **what it enables** and **who it suits**.

### 15. What You Receive

A tangible deliverables section builds confidence:

- Strategy and scope
- UX structure
- UI design system
- Responsive development
- Content/CMS setup
- QA and launch
- Documentation and handover
- Optional growth support

**Design:** a cinematic exploded stack resembling sheets of glass; scroll assembles it into one system.

## Act IV — Confidence: How Engagement Works

### 16. The VS Method

Five steps: **Discover → Define → Design → Develop → Evolve**.  
A pinned vertical rail updates a large scene and supporting copy. The final step exits naturally into the next section rather than snapping.

### 17. Engagement Paths

Three honest routes without publishing unconfirmed prices:

- Launch a new digital presence
- Improve an existing experience
- Build a custom product or automation

Each route explains the typical objective, likely deliverables and recommended first conversation.

### 18. Who We Work Best With

- Founders shaping a new idea
- Businesses replacing an outdated digital presence
- Commerce teams improving customer journeys
- Service companies seeking consistent demand
- Teams removing repetitive manual work

This describes fit rather than claiming prior industry projects.

## Act V — Action: Light Becomes Direction

### 19. Ideas & Practical Guides

Three strong launch resources with original diagrams:

- Choosing the right website platform
- Planning a website that can grow
- Finding practical AI opportunities in your business

The section builds authority and internal SEO routes without pretending to have a long publication history.

### 20. FAQ + Delhi + Project Starter + Closing Frame

This final long chapter contains three clear beats:

1. **Buyer FAQ** — timeline, process, platforms, content, hosting, revisions and support.
2. **Built in Delhi. Working beyond borders.** — abstract map grid and real contact details when supplied.
3. **What should we build next?** — project route selector, contact details and Start a Project CTA.

The light trail straightens into a clear line pointing toward the form. The ending is calm and conversion-focused rather than another visual climax.

---

## 5. Visual Design System

## 5.1 Core aesthetic

**Descriptor:** Monochrome precision illuminated by digital light.

The experience is approximately 85% black, white and grayscale; 15% emitted orange-white light. Glow is treated as a material and storytelling device, not decoration.

## 5.2 Color tokens

### Foundations

- `ink-1000` — `#050505` — primary dark canvas
- `ink-950` — `#0A0A0A` — raised dark surface
- `ink-900` — `#111111` — cards and menus
- `paper-50` — `#F5F5F0` — primary light canvas
- `paper-100` — `#ECECE6` — alternate light surface
- `white` — `#FFFFFF` — high emphasis and light core

### Text

- `text-on-dark-primary` — `#F5F5F0`
- `text-on-dark-secondary` — `#A8A8A2`
- `text-on-light-primary` — `#0A0A0A`
- `text-on-light-secondary` — `#5E5E59`

### Light accent

- `glow-core` — `#FFFFFF`
- `glow-hot` — `#FFD5C2`
- `glow-orange` — `#FF5A1F`
- `glow-deep` — `#8F2600`

Orange is allowed for the active point, CTA focus, current timeline state and emitted light. Large text remains monochrome.

## 5.3 Typography

### Recommended pairing

- **Display/UI:** Geist Sans or Manrope
- **Editorial accent:** Instrument Serif or a similarly licensed modern serif, used only for one or two emotional phrases
- **Technical/meta:** Geist Mono

### Fluid scale

- Hero: `clamp(4rem, 9.5vw, 9rem)`
- Display 1: `clamp(3.2rem, 7vw, 7rem)`
- Display 2: `clamp(2.5rem, 5vw, 5rem)`
- Heading 2: `clamp(2rem, 3.6vw, 3.75rem)`
- Heading 3: `clamp(1.5rem, 2.2vw, 2.5rem)`
- Lead: `clamp(1.15rem, 1.5vw, 1.5rem)`
- Body: `clamp(1rem, 1.05vw, 1.125rem)`
- Meta: `0.75–0.875rem`

### Typography rules

- Hero line length: 8–12 words or 2–3 controlled lines.
- Body measure: 55–70 characters.
- Sentence case for headings.
- Uppercase only for small labels and navigation metadata.
- Tight display tracking; comfortable body leading.
- Never animate each character continuously. Character splitting is reserved for one-time scene reveals.

## 5.4 Grid and spacing

### Desktop

- 12 columns
- Maximum content width: 1440px
- Outer margin: 48–72px
- Gutter: 20–24px
- Primary section spacing: 160–240px

### Tablet

- 8 columns
- Outer margin: 32px
- Section spacing: 120–160px

### Mobile

- 4 columns
- Outer margin: 20px
- Section spacing: 88–120px

### Spacing tokens

Use an 8px base with intentional exceptions for 1px borders and optical alignment: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 240.

## 5.5 Shape, border and depth

- Default corner radius: 0–8px
- Large media frame radius: maximum 12px
- Pills reserved for statuses, filters and compact actions
- Hairline border: `1px` at 12–20% opacity
- No generic floating-card shadows
- Depth comes from black levels, blur, atmospheric glow, overlap and motion

## 5.6 Image and generated-art system

All initial imagery can be produced without photography. Every visual belongs to one of four categories:

1. **Light Objects** — translucent monochrome forms with orange-white illumination
2. **Interface Fragments** — abstract but usable browser, commerce and dashboard structures
3. **Data Fields** — nodes, grids, paths, waves and content clusters
4. **Material Textures** — grain, glass, paper, smoke and subtle lens bloom

### Consistency rules

- black or transparent background;
- grayscale material;
- one warm light source;
- no humans, robots, handshakes, code rain or generic city skylines;
- no visible fake brand names;
- 35mm cinematic softness combined with crisp UI typography;
- visual center should leave copy-safe negative space;
- generate foreground, subject and atmosphere as separate layers when parallax is planned.

---

## 6. Motion Design System

## 6.1 Motion principles

1. **Motion explains hierarchy.**
2. **Scroll controls progress, not basic access.**
3. **One primary movement per viewport.**
4. **Every intense scene is followed by visual rest.**
5. **Direction has meaning:** forward/down means progression; outward means expansion; alignment means clarity.
6. **Glow indicates energy, focus or connection—not random decoration.**

## 6.2 Motion tokens

### Durations

- Instant feedback: 120ms
- Micro-interaction: 180–240ms
- UI state: 320–480ms
- Editorial reveal: 700–1000ms
- Scene transition: 1200–1800ms

### Easing

- UI enter: `cubic-bezier(0.22, 1, 0.36, 1)`
- UI exit: `cubic-bezier(0.4, 0, 1, 1)`
- Cinematic transform: custom smooth ease approximating `expo.out`
- Scroll-scrubbed movement: linear progress with local damping, not time-based easing

## 6.3 Signature effects

### Effect A — Light Trace

A 1–2px glowing path draws between scenes. It can become a grid line, underline, node connection or form boundary. Reuse in hero, service navigator, process and contact.

### Effect B — Luminous Object Parallax

Three-layer composition:

- background haze at approximately 0.15–0.2 relative movement;
- main object at 0.3–0.4;
- foreground particles or edge reflection at 0.45–0.5.

Movement remains within 6–10% of viewport size. Disable on touch and reduced-motion modes.

### Effect C — Pinned Chapter Reveal

An outer section provides scroll distance; an inner viewport uses `position: sticky`. Copy changes in discrete beats while the main visual evolves continuously. Progress is visible through labels or a rail, so the visitor knows the section is moving.

### Effect D — Masked Section Handoff

A light shape expands into a circular or linear mask, revealing the next black/white chapter. Use only two or three times on the homepage; ordinary sections use direct transitions.

### Effect E — Image Depth Window

The media frame remains stable while inner grayscale imagery moves subtly, creating depth. A glow passes behind the frame to reveal edges. This is safer and more readable than moving the whole content block.

### Effect F — Interface Assembly

Lines, columns and content blocks move from disordered states into a disciplined grid. This directly demonstrates design capability in the web chapter.

### Effect G — Data Connection

Nodes activate sequentially; the connecting light follows the narrative from input to outcome. Used in SEO, AI and application sections with different geometry but the same behavior.

## 6.4 Pinned-section storyboard

### Hero pin: 150–220vh desktop only

- 0–20%: point of light appears; headline resolves
- 20–50%: glass object enters and rotates subtly
- 50–75%: orbit stretches into a line
- 75–100%: line becomes the next section’s grid boundary

### Digital lifecycle: 400–500vh

- 0–25%: Imagine — point and sketch
- 25–50%: Build — wireframe and structure
- 50–75%: Launch — responsive interface
- 75–100%: Grow — connected search, content and data field

### Process: 300–400vh

- Each fifth changes headline, short copy and visual layer
- The persistent object becomes increasingly complete
- Exit uses normal document flow rather than abrupt unpinning

### Mobile alternative

No long pinning. Each scene becomes a 90–120vh chapter with a sticky visual limited to its own short section. Copy remains visible, effects simplify and the progress rail becomes numbered labels.

---

## 7. Component System

### Navigation

- transparent/solid header states;
- menu overlay with large service routes;
- visible active section state;
- keyboard and focus support;
- no custom cursor required for usability.

### Buttons

- Primary: white fill on dark, black text; orange glow appears on hover/focus
- Secondary: transparent with hairline border
- Text link: animated line trace
- Minimum touch target: 44px

### Editorial section header

- section number;
- short category label;
- one large statement;
- optional one-paragraph explanation;
- alignment can alternate, but reading order remains conventional.

### Capability panel

- one outcome title;
- 2–4 sentence explanation;
- included services revealed on selection;
- a visual response tied to that category;
- direct link to deeper service content.

### Technical decision row

- technology;
- best-fit scenario;
- what it enables;
- optional “explore capability” link.

### FAQ

- single-column accessible accordion;
- first item may remain open;
- no animation beyond height/opacity and reduced-motion fallback;
- full answer remains indexable.

### Project starter

- one question per step;
- visible progress;
- back navigation;
- no unnecessary personal data;
- direct WhatsApp/email alternative.

---

## 8. Asset and Reuse Matrix

| Asset family | Primary use | Secondary reuse | Motion treatment |
|---|---|---|---|
| Hero light object | Hero | Footer closing frame, Open Graph image | slow rotation, orbit-to-line |
| Wireframe browser | Web chapter | service page hero, article graphics | grid assembly, depth window |
| Neutral commerce object | Commerce chapter | Shopify/e-commerce pages | horizontal journey, light focus |
| Search node field | Growth chapter | SEO page, insight illustrations | nodes cluster and connect |
| Content prism | Content chapter | writing/graphics/video pages | one-to-many branching |
| AI workflow line | AI chapter | AI service page and tool result | path tracing and state activation |
| Layered system stack | Deliverables | process page, proposal visuals | exploded-to-assembled stack |
| Delhi coordinate field | Closing chapter | contact/about page | slow line drift only |
| Grain and bloom textures | Whole site | all visual scenes | static or extremely slow |

### Asset production order

1. Hero object and light behavior
2. Grid and line system
3. Web interface fragment
4. Commerce object and screens
5. SEO/data field
6. Content branching visual
7. AI workflow
8. Deliverables stack
9. Delhi coordinate field
10. Responsive and reduced-motion variants

---

## 9. Content System

## 9.1 Homepage copy rhythm

Use three content densities:

- **Impact:** 3–10 words, large type
- **Explanation:** 20–45 words
- **Decision support:** 60–120 words, lists or accordions

Do not place long paragraphs inside pinned motion scenes. Detailed information follows immediately after or lives on service pages.

## 9.2 Message hierarchy

1. What VS Infosys does
2. What outcomes clients can pursue
3. How services connect
4. What quality standard is included
5. How the process works
6. Whether the engagement fits the visitor
7. How to start

## 9.3 Initial SEO/content clusters

- Web design and development in Delhi
- Dynamic website development
- WordPress development
- Shopify and e-commerce development
- SEO and digital marketing
- AI implementation for businesses
- App and custom system development

Homepage language remains natural. Location-specific detail belongs in relevant pages and contact/about information; avoid repetitive locality pages without distinct value.

---

## 10. Experience Quality Gates

The visual concept may proceed only if it meets these checks:

### Strategy

- No portfolio or social-proof placeholder exists.
- The site feels confident without unsupported claims.
- All 13 services remain discoverable.
- The website itself demonstrates what VS Infosys sells.

### Visual

- Black/white remains dominant.
- Glow has a narrative role in every appearance.
- Each act has a distinct pace and composition.
- No generic SaaS card wall appears.
- Generated imagery follows one art direction.

### UX

- The offering is understandable in five seconds.
- Navigation works without animation.
- Every pinned scene has a visible progression cue.
- The visitor can skip to Services or Contact.
- Mobile content order remains straightforward.

### Motion

- No scroll-jacking.
- No more than one dominant motion per viewport.
- Reduced-motion mode is designed, not patched later.
- Pinned content does not trap users.
- Effects support the narrative.

### Performance

- Critical copy does not depend on JS/WebGL.
- Hero enhancement is progressive.
- Animation primarily uses transform and opacity.
- Mobile receives reduced assets.
- Production Core Web Vitals are measured before publishing performance claims.

---

## 11. Next Visual Concept Deliverables

The next design phase should not be a single compressed full-page image. It should include multiple readable frames:

1. **Desktop hero + opening chapter** — establishes art direction
2. **Desktop pinned lifecycle keyframes** — four frames showing scroll progression
3. **Desktop capability chapters** — web, commerce, growth/content and AI
4. **Desktop standards/process/contact** — credibility and conversion
5. **Mobile hero + service navigator** — proves responsive intent
6. **Motion storyboard sheet** — arrows, progress and pinned behavior

This set will make feedback more useful than one long screenshot with unreadable small sections.

---

## 12. Research Library

### Creative direction and agency benchmarks

1. [KrishaWeb — Creative agency websites and the website-as-proof principle](https://www.krishaweb.com/blog/best-creative-agency-websites/)
2. [Active Theory](https://activetheory.net/home)
3. [Teamwork — Marketing agency website patterns](https://www.teamwork.com/blog/marketing-agency-websites/)
4. [Awwwards — Storytelling collection](https://www.awwwards.com/awwwards/collections/storytelling/)
5. [Awwwards — One-page collection](https://www.awwwards.com/awwwards/collections/one-page/)
6. [Obys Agency — About and design philosophy](https://obys.agency/about)
7. [Obys Typography Principles](https://typographyprinciples.obys.agency/)
8. [Awwwards — GSAP website examples](https://www.awwwards.com/websites/gsap/)
9. [Unseen Studio — Superlist project and optimization approach](https://unseen.co/projects/superlist/)
10. [Locomotive website design analysis](https://sitethis.com/site/locomotive)
11. [Locomotive Scroll repository](https://github.com/locomotivemtl/locomotive-scroll)
12. [Monochrome website design patterns](https://hostadvice.com/blog/website-design/monochrome-websites/)
13. [Black website references](https://reallygooddesigns.com/black-website-examples/)

### UX, content and information architecture

14. [Nielsen Norman Group — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
15. [B2B service website information architecture checklist](https://www.agencyimmersive.com/blog/website-information-architecture-checklist-b2b-service-businesses)
16. [Professional service site content grouping examples](https://huemor.rocks/blog/best-professional-service-company-websites/)
17. [Senuto — Demonstrating expertise with useful interactive content](https://www.senuto.com/en/blog/how-to-build-expertise-and-trust/)
18. [Shopify — Content and thought leadership as expertise signals](https://www.shopify.com/blog/free-portfolio-website)

### Animation and implementation research

19. [GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
20. [GSAP responsive animation with matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/)
21. [GSAP canvas image sequence helper](https://gsap.com/docs/v3/HelperFunctions/helpers/imageSequenceScrub/)
22. [Motion — Scroll-linked animations](https://motion.dev/docs/react-use-scroll)
23. [Motion — React performance](https://motion.dev/docs/react-motion-component)
24. [MDN — CSS animation timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline)
25. [MDN — CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)

### Performance and accessibility

26. [web.dev — Animations and performance](https://web.dev/articles/animations-and-performance)
27. [web.dev — High-performance CSS animation](https://web.dev/articles/animations-guide)
28. [web.dev — Core Web Vitals](https://web.dev/articles/vitals)
29. [web.dev — prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion)
30. [W3C — Animation from interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)
31. [W3C — Reduced-motion CSS technique](https://www.w3.org/WAI/WCAG22/Techniques/css/C39)
32. [Motion — Accessible animations in React](https://motion.dev/docs/react-accessibility)

---

## Final Direction

VS Infosys will not pretend to have a portfolio. It will build something more valuable at this stage: a website that demonstrates exceptional taste, clear thinking, technical control and practical usefulness in every interaction.

The final experience should feel like a **cinematic product demonstration for a digital partner**, not an agency template with empty proof sections.
