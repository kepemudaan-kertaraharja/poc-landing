# Technical handover

Run the npm commands in this guide from **this website repository's root**, where `package.json` lives. All source paths are relative to that root. A parent package or sibling repository is not required.

## Stack and deliberate boundaries

- Semantic HTML, plain CSS, and browser JavaScript.
- Vite is a development server and production asset bundler, not an application framework.
- Project content is imported from a local JSON file during the build.
- Project documentation stays in `docs/`; it is not copied into the public output.
- Node's test runner validates content integrity; Playwright checks the browser flows.
- No runtime package CDN, client router, backend, database, authentication, CMS, analytics, or secrets.

The deployed files need only an HTTP static server. Node and npm are required for development/building, not for serving a built release.

## Setup

Use Node.js 22.12+ or a newer supported LTS. Check with `node --version` and `npm --version`.

```sh
npm ci
npm run dev
```

Use the printed URL rather than double-clicking `index.html`. The development source imports JSON through Vite and is not intended to run under `file://`.

The dev server binds to all interfaces to support previewing on another device on a trusted local network. To restrict it to your machine, use `npm run dev -- --host 127.0.0.1`. On a phone, use the computer's local network IP and the displayed port; `localhost` on the phone refers to the phone itself.

## Build and preview

```sh
npm run build
npm run preview
```

`npm run build` uses this repository's `vite.config.js`, bundles the public landing page, and copies its `public/` assets into `dist/`. The internal presentation has its own repository, package, assets, and build. Neither project documentation nor general documentation is copied into the site build. Generated output is disposable: edit source, rebuild, and deploy the output. Never patch `dist/` as the primary fix.

`base: './'` in `vite.config.js` makes bundled assets portable between a root domain and a GitHub project path. Handwritten links also use relative paths. Keep this property when adding pages or assets.

## File-by-file responsibilities

| File / directory | Responsibility |
| --- | --- |
| `index.html` | All landing sections, draft form, metadata |
| `profil/index.html` | Dedicated organization-profile page and static metadata |
| `kegiatan/*/index.html` | Dedicated activity-page entries and static metadata |
| `content/projects.json` | Program content shared by cards, dedicated pages, and selector |
| `src/main.js` | Landing-page filters, draft form, and navigation; no remote requests |
| `src/activity.js` | Shared dedicated-page rendering from the activity ID on `<body>` |
| `src/profile.js` | Organization-profile process tabs and active-section navigation state |
| `src/style.css` | Website-owned styles and local font references |
| `public/` | Files copied unchanged: images, fonts, icon; future `CNAME` if needed |
| `docs/` | Project scope, editorial guide, development and release instructions |
| `package.json`, `package-lock.json` | This repository's commands, dependencies, and locked versions |
| `vite.config.js` | Landing-page root, public build, relative base |
| `playwright.config.js` | Production-preview browser checks under a project-style subpath |
| `.github/workflows/pages.yml` | This repository's public site build and deployment |

## Landing-page behavior

1. Vite resolves the project JSON import when building.
2. `renderProjects()` selects a category and renders cards. A polite live region announces the result count.
3. Card, editorial, and status links use ordinary anchors to `kegiatan/[id]/`.
4. Each activity HTML entry identifies its record with `data-activity`; `src/activity.js` renders the shared JSON fields using text nodes and creates its lists safely.
5. The activity contact link returns to `/?activity=[id]#dukung`; the landing page validates that ID and preselects it when the local draft dialog opens.
6. Native `dialog.showModal()` handles focus containment and Escape for the message draft. Close buttons and genuine backdrop clicks also close it. Support, participation, and feedback links use `partner`, `volunteer`, and `idea` roles.
7. Native form validation requires a message; JavaScript also rejects fewer than 10 non-padding characters. Maximum input length is 1,500 characters.
8. Submit constructs plain text and shows an explicitly unsent preview. Download saves `pesan-pemuda-babakan-rw009.txt` using a temporary local Blob URL, clicks an anchor, and revokes the URL afterward.
9. Editing a draft preserves the current form values. Reloading/navigating away clears the in-page draft. There is no `localStorage`, cookie, server submission, or background sync.

Because the content is bundled at build time, a JSON edit requires rebuilding before deployment. Activity cards and pages currently render `imageAlt` as visible documentation placeholders; bundled files under `public/images/` are reserved for approved replacements.

Editorial notes and the compact activity-status list use native `details`/`summary`. They require no new JavaScript. Editorial copy lives in `index.html`; activity context and intended participants use the JSON fields `context` and `audience`. The dark editorial section reuses the existing `agenda-*` layout classes; the status list sits inside `#agenda` below the support note.

## Separate internal presentation

The separate presentation repository is for explaining the website and launch requirements to the current organization leadership. It is not a public website route or a dependency of this repository. Run its npm commands from its own root according to its README.

The source HTML remains readable as a sequence of slides without JavaScript. Once initialized, `.deck-ready` displays only `.is-active`. The `#slide-N` URL hash selects a slide; invalid or out-of-range indices resolve to a valid slide.

Controls: Previous/Next buttons, Arrow Left/Right, Page Up/Down, Home/End, `N` for notes, `F` for fullscreen where available. Controls are standard focusable buttons; the counter announces changes. Fullscreen depends on browser support and permission.

The presentation owns its print styles, editable `PITCH.md`, and meeting materials. Its source and assets are bundled in its own build without importing from this website repository.

## Tests

```sh
npm test
npx playwright install chromium
npm run test:browser
```

Content checks catch missing required fields, duplicate IDs, unknown categories, missing local images/pages, and stale editorial/status links. Browser checks cover filtering, dedicated activity navigation and return paths, draft validation/download, navigation, FAQ, asset loading, and narrow-screen overflow.

The browser test web server builds and serves the production output under `/rw-demo/`. This catches root-relative path mistakes that a localhost root preview can miss. Tests use Chromium on desktop and mobile-sized views; they do not certify all browsers. Before official launch, also test on the actual phones/browsers used by residents.

## Accessibility decisions

- One primary heading on the landing page, section headings, landmarks, and a skip link.
- Actual anchors for navigation and actual buttons for actions.
- Native `details`/`summary`, native labeled form controls, native modal dialogs.
- Visible keyboard focus and a mobile-menu expanded state.
- Visible documentation placeholders have matching accessible labels.
- Decorative graphics are hidden from assistive technology.
- Polite status announcements for filters and draft creation.
- Reduced-motion preference disables transitions and smooth scrolling.

When modifying interactions, try them with Tab, Shift+Tab, Enter, Space, and Escape. Keep labels accurate and maintain focus after opening/closing dialogs. Do not replace native controls with clickable generic containers.

## Troubleshooting

| Symptom | Check / remedy |
| --- | --- |
| Vite reports unsupported Node | Install a supported Node version and rerun `npm ci` |
| Module imports fail after double-clicking HTML | Use `npm run dev` or serve the built output over HTTP |
| Dependency mismatch | Keep `package-lock.json` committed; use `npm ci` for a clean reproducible install |
| Port is busy | Use the alternate printed URL or pass `--port 5174` |
| Placeholder label missing | Check the project's `imageAlt` value and rebuild |
| Activity/status link opens nothing | Check its `kegiatan/[id]/` path, page directory, and Vite build input; run `npm test` |
| A category shows no expected card | Match `data-filter` and the JSON `category` exactly |
| Site loses styles under a repository path | Restore relative links/base, rebuild, and run browser tests |
| Old toolkit or presentation URL is missing | These are intentionally no longer public site routes; run the separate presentation project |
| A dependency install blocks esbuild's setup | Review the package manager's install-script policy; use supported trusted-package settings, then reinstall. Do not disable safeguards globally |
| Browser test cannot launch | Install Playwright Chromium and required OS libraries |
| Fullscreen does not work | Use the browser's own presentation/fullscreen mode; the slides work without it |
| Old content is still visible | Confirm latest workflow deployed; reload without cache; verify the source edit was built |

## Dependency and handover practice

There are two development dependencies: Vite and Playwright. Update intentionally, review the lockfile, run content checks/build/browser checks, then deploy. There are no production npm dependencies to operate on the host.

For handover, ask the backup to run the site from a fresh checkout, change one sample line, build, and explain the rollback process. Keep operational credentials outside this repository. Record changed ownership and links in the appropriate private team workspace.
