# Content and editing guide

Paths below are relative to this website repository's root. This is project documentation, not a public site page. Read [SCOPE.md](SCOPE.md) for the established-organization context, evergreen site direction, and content states.

## The editorial promise

Help someone discovering the association answer four questions: **Who are you? What have you done? What is happening now? Why does it matter locally?** Use specific, welcoming language. Avoid inflated promises and numbers without evidence.

This is a profile-and-portfolio-first site for a real, active organization. Potential collaborators, the general public, members, and residents should all be able to understand it. Lead with identity and actual work; keep support as a small, optional invitation rather than the purpose of every section. No sponsorship packages or implied partner benefits are part of the current scope.

The page order is: introduction → identity and goals → activities → editorial notes → modest support invitation and local status → FAQ. The primary hero action is **Lihat jejak kegiatan**. Local participation remains available below the main profile content.

“Tumbuh. Bergerak. Bareng.” is draft profile copy, not an approved organizational slogan. The team should decide whether to keep, revise, or remove it after reviewing the organization's public voice.

## Where each piece lives

| Page area | File | Content owner |
| --- | --- | --- |
| Name, hero, purpose, principles | `index.html` | Committee + editor |
| Activity cards and dedicated-page descriptions | `content/projects.json` | Program coordinator |
| Editorial notes and related project links | `index.html`, `#cerita` | Editor + program coordinator |
| Compact local agenda | `index.html`, `#agenda` | Program coordinator |
| Support invitation, local participation, FAQ | `index.html`, `#dukung`, `#gabung`, `#faq` | Editor + contact owner |
| Draft construction and role behavior | `src/main.js` | Technical maintainer |
| Colors, type, responsive layout | `src/style.css` | Technical maintainer |
| Photos | `public/images/` | Documentation/photo owner |

The internal presentation has its own independent repository and locally owned meeting templates. Edit its slide copy and script there; this website does not import or build them.

Most copy is deliberately ordinary HTML. Only the structured project data is JSON. There is no CMS or admin login.

## For nontechnical contributors

You do not need to edit code. Copy the relevant brief from [TEMPLATES.md](TEMPLATES.md), use existing records or first-hand knowledge, identify the source/owner, mark what still needs confirmation, and give it to the content editor. Include the exact old wording when suggesting a replacement.

A useful request is: “On ‘Jaga lingkungan, bantu warga’, confirm the public owner as ‘Koordinator lingkungan’; committee confirmed on [date].” An unhelpful request is: “Make the site better.”

Use a shared meeting document or existing group discussion to collect drafts. The editor consolidates one version for review so the technical maintainer does not have to reconcile competing messages. A real draft may be incomplete; it must not be labeled confirmed until the responsible person has checked it.

## Drafting the first real content

The first archive-backed draft uses a small 2025–2026 activity record rather than trying to publish everything at once. Review it against:

1. Official identity, confirmed founding date, purpose, and the leadership roles approved for public display.
2. A short organization overview and optional timeline that distinguish milestones from promotional claims.
3. A selected mix of ongoing and completed activities, each with an owner, status, dates or timeframe, and source material.
4. Permissioned photographs, or clear documentation placeholders until suitable material is available.
5. One monitored public contact route and accurate participation instructions.

Mark every working item `Draf` until its responsible owner approves it. Approximate dates must be labeled approximate. Do not infer attendance, impact, member counts, leadership titles, or completion from photos or chat messages alone. Keep private member lists and internal contact details outside the public repository.

## Project data reference

`content/projects.json` is an array of objects. Copy an existing object to draft a real activity. JSON uses double quotes, commas between entries, and no comments or trailing commas.

| Field | Meaning | Editing rule |
| --- | --- | --- |
| `id` | Stable identifier used by editorial notes, agenda, and selection | Unique lowercase slug, e.g. `gotong-royong-lingkungan` |
| `category` | Activity field identifier | `lingkungan`, `pendidikan`, or `kebersamaan` |
| `categoryLabel` | Visible category | Use the matching Indonesian label |
| `format` | Detail-page treatment and occurrence tag | Use `one-off` for a single response/project or `recurring` for a program intended to repeat; keep this separate from completion status |
| `title` | Short parent activity-page title | Aim for one or two short lines |
| `summary` | Parent activity-page overview | One or two useful sentences |
| `activities` | Individual cards shown on the landing page | Add one object per documented activity with `title`, `summary`, `timing`, `status`, `format`, and an ISO `sortDate`; set `detail: false` when no matching detail page exists |
| `image` | Reserved local image path | Not displayed while documentation placeholders are active |
| `imageAlt` | Visible placeholder label | Use a short label such as `Dokumentasi Kegiatan Lingkungan` |
| `imageNote` | Reserved source/permission note | Use when an approved photograph replaces the placeholder |
| `status` | Visible activity status | Use the verified activity state: planned, ongoing, paused, or completed; track draft/confirmed approval separately |
| `goal` | The local need/outcome | Distinguish the original goal from any result already achieved |
| `context` | Why the activity matters | Use known local context; label interpretation and avoid invented evidence |
| `audience` | Intended or actual participants/beneficiaries | For completed work, state actual participation only when supported by records |
| `steps` | Array of activity steps | For ongoing work, describe the current process; for completed work, describe what happened |
| `needs` | Array of resources or roles | Make contributions understandable |
| `success` | Target or supported result | Label targets and measured results separately |
| `closing` | Final detail-page note | For one-off work, state report or financial gaps; for recurring work, give truthful participation guidance |
| `owner` | Approved public owner/role | No private telephone numbers in this field |
| `timing` | Current schedule information | Unknown dates must remain explicitly unknown |
| `location` | Current place information | Name only a supported location; keep session-specific details unconfirmed when needed |

Each object populates a dedicated page and the message project selector; its nested `activities` populate the individual landing-page cards. The page route is `kegiatan/[id]/`. Cards with approved matching detail copy link to that parent grouping; archive-only cards marked `detail: false` remain non-clickable. Changing an ID requires renaming its page directory and updating those links and the Vite build input; a content check catches stale or missing pages. Each activity page links back to the local-only message draft with that activity preselected.

The editorial notes in `#cerita` are manually written HTML and are not generated from JSON. Keep them consistent with the linked activity. They are currently archive-backed activity drafts; confirm events, outcomes, and publication permissions while retaining the distinction between draft, ongoing work, and completed work.

The current fields are a **prototype model**. First fit the selected real activities into it. If actual schedules require independent dates, venues, capacity, or multiple events per activity, add a separate events data source when the drafts demonstrate that need. Do not encode a whole event schedule into an activity title.

### Add or change a category

Most updates should use an existing category. If the team truly needs another:

1. Set the new `category` and `categoryLabel` in the applicable project objects.
2. Update the allowed category map in `tests/content.test.mjs`.
3. Run the content and browser checks.

The landing-page controls filter by category. The one-off/recurring distinction appears as a tag on each card, and each category initially shows its four newest cards before the visitor expands it.

### Remove a project

Remove its JSON object and dedicated page directory, then update its editorial/status links and the Vite build input. The project selector updates automatically. Recheck any presentation or prose that still mentions it. At least one activity is expected in the current design.

## Changing text safely

- Preserve element IDs such as `gerakan`, `cerita`, `dukung`, `agenda`, and `gabung`; links target them.
- Preserve JavaScript hooks: IDs, `data-join`, `data-close`, and each activity page's `data-activity`.
- Keep button labels action-oriented and accurate.
- In HTML, write `&amp;` for a literal ampersand and escape markup characters when necessary.
- JSON strings are escaped before being placed into HTML. Keep image paths local; do not add HTML inside data fields.
- Run `npm test` and `npm run build`, then check the changed page at mobile and desktop sizes.

## Photos and evidence

The site currently renders `imageAlt` as a visible documentation placeholder. Bundled stock and organization-archive files remain unused until a suitable photograph and its publication permission are confirmed.

Before replacing one, confirm the contributor has permission to publish it and that recognizable participants have the relevant consent. Apply the association's rules for images of minors. Remove private location or device metadata when appropriate. Record the source and permission owner in an asset register.

Practical image guidance:

- Hero: roughly 1,000–1,400 pixels on the long edge, compressed JPEG/WebP.
- Cards: roughly 760–1,000 pixels wide, subjects clear in a landscape crop.
- Prefer under 250 KB per photo, while keeping visible detail.
- Update `imageAlt` with a concise description when an approved photograph replaces a placeholder.
- Test the crop on a phone before enabling a photograph.

The official asset register is [ASSETS.md](ASSETS.md). Update it when replacing a bundled asset.

## Real contact: a required launch decision

The current form prepares a **local message only**, downloaded as `pesan-pemuda-babakan-rw009.txt`. It accepts an inquiry, an offer of support, interest in joining, or feedback. It is intentional that no message disappears into a fake inbox.

For the first real launch, agree one monitored public route. A verified association email or an approved messaging invitation can be linked without adding a backend. The committee must own the destination and decide who replies and how often. Replace the demo draft UI with truthful contact instructions as part of that change; do not merely relabel the submit button. Keep ordinary introductions welcome; visitors do not need to pledge support to get in touch.

If the team later needs a real intake form, specify the recipient, required fields, validation, success/failure behavior, data retention, and response owner before adding a service. GitHub Pages cannot run the receiving backend.

## Before publishing the site

- Confirm official name, RW number, location, historical start date if shown, logo, language, and organizing body.
- Confirm who may participate and any supervision needs.
- Replace or explicitly retain illustrative content; do not silently turn placeholders or drafts into confirmed facts.
- Supply verified dates, venues, owner, status, and contribution instructions for each published activity.
- Provide one working, monitored contact route.
- Confirm photo rights and public-facing contacts.
- Reword demo notices accurately; remove `noindex, nofollow` only from pages that should be discoverable.
- Set final title, description, canonical URL, and social-preview metadata once the domain is known.
- Keep the internal presentation and project documentation separate from the public site release. They have separate source locations and the site build does not include them. A public source repository still exposes its committed documents.

## Activity drafts currently in the prototype

1. **Jaga lingkungan, bantu warga:** groups documented cleanup, road-access preparation, and clean-water support while leaving totals unclaimed.
2. **Belajar dekat rumah:** groups documented English, Jaipong, kajian, design, and practical training while leaving the current schedule unconfirmed.
3. **Lapang hidup, warga bergerak:** groups the volleyball-court renovation and sports sessions while identifying the missing completion/financial report.

These are review groupings, not necessarily final public activity names or dedicated-page boundaries. Split or rename them only when approved content demonstrates the need.
