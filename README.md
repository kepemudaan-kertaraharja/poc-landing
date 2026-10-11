# Kepemudaan Kampung Babakan RW 009 - website draft

An Indonesian-first evergreen profile for an established neighborhood youth association: bold condensed type, a lime-and-paper palette, documentation placeholders, and a community-noticeboard feel.

**Site direction: “Here is who we are and what we do.”** This is a public association profile and portfolio for people discovering the community, including potential collaborators. Identity, activities, and stories lead; a small support invitation and local participation options follow. It is one public site, with no separate sponsor funnel.

**The organization and its work are real; the website now contains a real but unconfirmed content draft.** The official name, location, 2025–2030 leadership term, and selected 2025–2026 activities come from internal records. Current schedules, impact totals, the final volleyball-court renovation report, public contact ownership, and photo permissions still require approval.

The first anniversary motivated the initial project timing, but the site itself is a general organization profile rather than an anniversary microsite. Historical dates and completed work may appear as supporting timeline content. The site remains `noindex` and visibly marked for internal review.

## Run it

Requirements: **Node.js 22.12+ (or a newer supported LTS)** and npm. No backend, API key, database, or environment variables.

Run commands from **this repository's root** (the directory containing this `package.json`). The website installs and builds independently of the presentation and general-docs repositories. See [the site scope](docs/SCOPE.md) for current decisions.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, usually **http://localhost:5173**.

| Route | What it contains |
| --- | --- |
| `/` | Association profile, project filters and briefs, editorial notes, modest support section, local agenda, message draft, FAQ |
| `/profil/` | Organization profile with an interactive working-process section |
| `/kegiatan/gotong-royong-lingkungan/` | Environment and resident-support activity draft |
| `/kegiatan/ruang-belajar-budaya/` | Education, training, culture, and religious activity draft |
| `/kegiatan/lapang-dan-olahraga/` | Court renovation and sports activity draft |

The site contains visitor-facing content only. Project docs live in `docs/`. The internal presentation and general architecture documentation are separate repositories; neither is needed to run this site.

```sh
npm test                 # Content integrity checks
npm run build           # Portable static output in this repository's dist/
npm run preview         # Serve the built site, usually on port 4173
```

Browser checks (one-time browser download required):

```sh
npx playwright install chromium
npm run test:browser
```

On a Linux CI machine missing browser libraries, use `npx playwright install --with-deps chromium`.

## What actually works

- Responsive navigation and anchor links.
- Category filters for 20 archive-backed activities, sorted newest first and showing four initially with an option to expand the list.
- One-off/recurring occurrence tags on every activity card.
- Accessible cards and dedicated activity pages with shareable URLs, type-specific context, documented results or participation guidance, ownership roles, timing/location, evidence gaps, and support needs.
- Expandable archive notes and a compact status panel, both linked to the corresponding activity grouping.
- Inquiry, support, participation, and feedback options, input validation, editable message preview, and local `.txt` download.
- Native FAQ disclosures.
- Local photographs and fonts: visitors do not need a third-party image or font service.
- GitHub Pages workflow and relative deployment paths for project sites or a custom domain.

**The message form does not send, register, or persist anything.** Text remains in the current page's memory until navigation/reload; clicking download saves a file on the visitor's device. There are no analytics, tracking scripts, accounts, invented impact statistics, or fabricated contact details. Archive-based claims remain drafts until the responsible owners approve them. A real contact route is a launch decision.

## Start the team discussion

1. Open the separate presentation repository and follow its README to present the internal deck to the current organization leadership.
2. Let someone unfamiliar with the association explain who it is, find an activity, and describe its purpose. Then ask where they would go to make contact.
3. Use [the collection templates](docs/TEMPLATES.md) to turn existing records and first-hand knowledge into clearly marked drafts.
4. Ask current leaders and activity owners to verify those drafts; assign one content editor, one contact owner, and a technical backup.
5. Publish only after the team confirms its identity, activity record, permissions, and participation route.

## Documentation

The source of truth is ordinary Markdown in [`docs/`](docs/README.md). It can be read in GitHub, a text editor, or a future documentation platform. These documents are **not copied into the public site build**. A public repository would still expose committed documents; keep private records elsewhere.

| Document | Purpose |
| --- | --- |
| [Documentation map](docs/README.md) | Reading order and ownership |
| [Site scope](docs/SCOPE.md) | Current direction, section feedback, activity-page plan, and contact decisions |
| [Content guide](docs/CONTENT.md) | Editing text, project fields, images, agenda, and FAQs |
| [Team operating guide](docs/TEAM.md) | Responsibilities, feedback process, launch plan, and maintenance |
| [Collection templates](docs/TEMPLATES.md) | Copy-and-fill briefs, feedback, and decision log |
| [Development handover](docs/DEVELOPMENT.md) | File map, implementation details, checks, troubleshooting |
| [Hosting and domain guide](docs/DEPLOYMENT.md) | GitHub Pages, DNS, HTTPS, rollback, host migration |
| [Design and asset register](docs/ASSETS.md) | Palette, typography, image sources, licenses, replacement guidance |

## File map

```text
landing-page/
  index.html                 Public site structure and editorial copy
  kegiatan/*/index.html      Dedicated activity-page entries
  src/main.js                Filters, draft download, navigation
  src/activity.js            Shared activity-page rendering
  src/style.css              Visual identity and responsive styles
  content/projects.json      Editable program data
  public/images/             Local archive and illustrative photographs
  public/fonts/              Local fonts and license
  public/favicon.svg         Working brand mark
  docs/                      Project-specific documentation
  tests/                     Existing content and browser checks
  package.json               Website commands and dependencies
  package-lock.json          Website dependency lockfile
  .gitignore                 Website-generated files
  .github/workflows/         Website deployment
  vite.config.js             Public site build
  playwright.config.js       Browser-check configuration
  dist/                      Generated public release, after building
```

## Hosting cost and ownership

GitHub Pages can host this static site at **$0 hosting cost**, using an eligible free public repository and staying within GitHub's current terms and limits. A custom domain is optional and has a separate registration/renewal cost. This repository's `.github/workflows/pages.yml` deploys `dist/`, which also works on a regular static web server.

No repository, domain, or live deployment has been created by this prototype. Follow [DEPLOYMENT.md](docs/DEPLOYMENT.md) when the organization is ready.

## The next useful change

Review the first real-content draft and the three dedicated activity pages with the responsible leaders. Confirm whether these broad groupings are the right public page boundaries, plus the historical start date, current schedules, publishable leadership information, image permissions, monitored contact route, and renovation completion/financial report.
