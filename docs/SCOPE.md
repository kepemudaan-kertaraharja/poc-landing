# Site content and direction

Status: scope aligned to an established organization and an evergreen public profile. The repository separation is implemented and the website now contains real, reviewable drafts before final publication decisions.

## Organizational context

The association already exists. It has members, current leadership, ongoing activities, and completed projects. The first anniversary motivated the website initiative and initial review timing, but the public site itself is a general organization profile intended to remain useful afterward.

The formal name, location, 2025–2030 leadership term, and selected 2025–2026 activity record now come from internal source material. The exact historical start date, public launch date, current schedules, contact ownership, selected leadership details, and publication permissions still need approval.

Content moves through four plain states:

1. **Placeholder:** illustrative material used only where approved local material is unavailable.
2. **Real draft:** based on the organization's actual record but not yet approved for publication.
3. **Confirmed:** checked by the responsible leader or activity owner, including dates, status, results, and permissions.
4. **Published:** selected confirmed material released on the public site.

## The public site's job

Introduce the association, explain what it does, show ongoing and completed work honestly, preserve useful history or timeline entries, and give interested people a clear way to contact the right person.

The site should make sense to an unfamiliar visitor, including a potential member or external supporter. It remains a profile of the organization, not a sponsor sales page. Support is a modest invitation after visitors understand the work.

## Keep

- Landing hero and overall visual identity.
- Activities overview and filtering.
- The general look of the activities and editorial sections.
- FAQ and closing section.

## Content adjustments to work through next

### Introduction / “Kenalan dulu”

The empty left column is a deliberate editorial margin: its small section label balances the larger content column. Some breathing room is useful, but the column can carry identity rather than remain mostly unused.

Proposed use: a compact organization profile containing the approved name, RW/location, short purpose, and a real local photograph or approved public leadership information. A confirmed start date can appear in a timeline without becoming the site's main theme. Tighten the column if approved material is unavailable. Do not fill it with invented statistics, dates, member counts, or decorative facts.

### Activities and detail pages

Implemented: project dialogs have been replaced by dedicated activity pages. Each page has a shareable URL, a path back to the activity list, and room for meaningful content.

Routes use `kegiatan/[slug-kegiatan]/`. The current three pages follow the archive-backed groupings in `content/projects.json`; their names and boundaries remain review drafts, not commitments to final public routes.

Each detail page should answer:

1. What is the activity and its confirmed status: planned, upcoming, ongoing, paused, or completed?
2. What local need is it responding to, and whom is it for?
3. What happens during the activity?
4. Who is responsible, and what time/place is actually confirmed?
5. What has happened so far, what results can be supported, and what documentation may be published?
6. How can someone ask about this specific activity?

Keep goals distinct from achieved results. The current website entries are archive-backed drafts and explicitly preserve unknown schedules, totals, and completion states. Confirm every factual claim with the responsible owner before publication. Stories that refer to an activity should link to that activity's page.

### Stories / editorial section

Keep the visual treatment. The current notes are concise archive-backed drafts about clean-water support, shared learning, and the volleyball-court renovation. Confirm outcomes and permissions before treating them as the organization's published history. Avoid repeating the entire activity brief here.

### Fourth section / connection

The current section mixes support, local participation, agenda, feedback, and a downloadable draft. That is too many purposes in one place.

Proposed replacement: **“Terhubung dengan kami”**, with two clear visitor intentions:

- **Saya ingin ikut** — membership/activity enquiry, eligibility, and a contact who can explain the next step.
- **Saya ingin mendukung** — offer of time, expertise, equipment, space, or other help, with a contact who can follow up.

A short general-question link can serve everything else. Keep upcoming activities with the activities content instead of hiding them inside this connection section. The final channel and recipient need to be chosen before wiring real links.

The current local draft/download interface is provisional and should be replaced by the agreed handoff. It does not send messages and should not be treated as an inbox.

## Communication: proposed first production flow

```text
Visitor chooses an intention
        ↓
Site explains the destination and who responds
        ↓
Visitor opens the chosen contact channel with an editable template
        ↓
Visitor reviews and sends the message there
        ↓
Named contact acknowledges and routes it to the appropriate coordinator
```

### Recommendation: one owned contact, clear templates

Start with an association-controlled WhatsApp number if there is someone responsible for monitoring it. The two visitor intentions can use that same number with different templates. If the organization already assigns membership and external relations to different people, route directly to those approved contacts instead.

Do not broadcast one enquiry to every channel or committee member. That makes responsibility unclear and can create duplicate replies. Show one recommended route, with an alternative such as an organization email only when someone monitors it.

Opening a prefilled WhatsApp message does **not** send it. The label should say “Lanjut ke WhatsApp”; explain who receives it. Let the visitor edit and send. If they do not use WhatsApp, show the approved alternative. No approved public number or address has yet been supplied to this repository or wired into the prototype.

Templates should help people start, not reject imperfectly written enquiries:

```text
Halo pengurus [nama organisasi], saya ingin tahu cara ikut kegiatan.
Kegiatan yang saya lihat: [judul + tautan halaman]
Pertanyaan saya: …
```

```text
Halo pengurus [nama organisasi], saya ingin membicarakan dukungan untuk
[judul kegiatan atau organisasi].
Bentuk bantuan yang bisa saya tawarkan: …
```

Ask only for what is needed to continue the conversation. Formal member registration, identity verification, and records are separate from the first public enquiry.

### When an intake platform becomes useful

Use an existing shared form/inbox or a dedicated platform when the team needs assignments, status tracking, reliable records, structured registration, or multiple people handling a meaningful volume of enquiries. A new dashboard still requires a response owner; it does not solve unanswered messages by itself.

Before implementation, agree the recipient, required fields, access, notifications, statuses, retention, and who checks it. A self-hosted intake service would be its own front-end/back-end project, documented separately. GitHub Pages alone cannot receive and store those submissions.

## Decisions needed from the current leadership

| Decision | Current state |
| --- | --- |
| Approved organization identity and location | Formal name and location entered from official records; approve for public display |
| Historical start date and timeline wording | Must be confirmed if shown publicly |
| Public leadership information | Current leadership exists; decide which roles/names may be published |
| Real activities | Three archive-backed groupings entered; current schedules and status details need verification |
| First-year stories and publishable documentation | Draft stories entered; final reports and photo permissions remain outstanding |
| Person/role who receives general enquiries | To be named |
| One shared contact or separate membership/support contacts | To be agreed |
| Public WhatsApp number and/or alternative email | Not supplied |
| Reasonable response expectation and backup | To be agreed |
| Enquiry only or formal membership application | Enquiry-first recommended |

## Separation from the public site

- The public landing page explains the organization to visitors.
- Project docs explain how to author, maintain, and publish that site.
- General docs explain shared architecture and future services.
- The internal presentation is the site maintainer presenting to the current organization leadership: the anniversary-motivated initiative, evergreen site direction, current prototype, existing material to turn into drafts, responsibilities, communication ownership, and the work needed for publication.

The former toolkit's completion questions and templates belong in that internal presentation/materials. They are no longer a public navigation destination.

## This pass

Implemented: independent repository boundaries; project-local tooling and deployment; archive-backed organization identity, activity groupings, historical notes, status qualifications, and low-risk draft media; updated checks; and the internal presentation's audience/production framing.

Next content pass: review the dedicated activity pages with responsible owners; decide whether any broad grouping should split into separate programs; and obtain the renovation LPJ, historical start-date decision, current schedules, public contact owner, leadership-display decision, and media permissions. The real contact handoff follows after approval.
