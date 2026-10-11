# Landing-page documentation map

Status: real archive-backed draft entered for internal review. Last reviewed: 2026-10-10. Website-specific ownership fields remain unassigned until the team agrees them.

## Purpose

These are the landing page's project-specific documents. They support its content, development, and release; they are not pages for public site visitors. Start with [SCOPE.md](SCOPE.md) for the current realignment. Cross-project architecture belongs in the separate general-documentation repository.

The association already has members, current leadership, ongoing activities, and completed work. The problem to solve together is primarily **content and ownership**: how to turn its records into accurate public drafts, verify them, and keep them true. The direction is an evergreen public profile and portfolio, with a modest support invitation and secondary local participation options.

## Read according to your role

| You are… | Start with | Then use |
| --- | --- | --- |
| A committee member | [Site scope](SCOPE.md) | [Team responsibilities](TEAM.md) |
| A program coordinator | [Content guide](CONTENT.md) | [Program and event templates](TEMPLATES.md) |
| A writer or photographer | [Content guide](CONTENT.md) | [Assets](ASSETS.md) |
| A developer or technical backup | [Development](DEVELOPMENT.md) | [Deployment](DEPLOYMENT.md) |
| The site presenter | [Site scope](SCOPE.md) | [Feedback and decision templates](TEMPLATES.md) |

For a leadership meeting, install and run the independent presentation repository using its README. It is not a route on the public site. These project documents remain usable without that repository or a browser presentation.

## Current facts and repository limits

- The organization is Kepemudaan Kampung Babakan RW 009 in Desa Kertaraharja, Kecamatan Cikembar, Kabupaten Sukabumi, with a 2025–2030 leadership term. The exact historical start date still needs confirmation.
- The landing page and live pitch use conversational Indonesian. Technical handover documents use English. Collection templates use Indonesian.
- The site uses the formal organization name. Its geometric mark and visual wordmark remain unapproved working artwork.
- The website contains selected real drafts from the 2025–2026 archive; statuses, dates, totals, and owners are qualified where evidence is incomplete.
- The site currently shows labeled documentation placeholders instead of photographs. Bundled stock and archive files are not displayed.
- Editorial notes are factual drafts, not final reports or approved impact claims.
- The site creates local message drafts for inquiries, support, participation, or feedback; it does not receive messages.
- The public site is static. GitHub Pages is the initial host; a custom domain is optional.
- Future on-premises services are an architectural direction, not implemented functionality.

## What counts as a real launch?

The team has confirmed its public identity, historical timeline, selected activity record, and every published claim; assigned owners; and tested a real response route. The site has been tested on a phone and deployed with appropriate links and metadata. Real-but-unconfirmed drafts are useful during preparation, but a technically successful deployment alone is not a public content launch.

Use the launch checklist in [TEAM.md](TEAM.md), the technical checklist in [DEPLOYMENT.md](DEPLOYMENT.md), and the content brief in [TEMPLATES.md](TEMPLATES.md).

## How to maintain the documentation

1. Edit the relevant Markdown file, not a screenshot or exported copy.
2. Link to an existing explanation instead of duplicating it.
3. If changing behavior, update the corresponding guide in the same change.
4. Record meaningful team decisions using the decision template.
5. Keep document links relative and filenames stable.
6. Review ownership when the committee or technical maintainer changes.

The presentation repository owns its HTML, script, theme, fonts, and meeting templates. Its HTML and Markdown script are maintained together there; no local sibling import or automatic cross-repository synchronization is required.

## Public versus private documentation

This directory is not copied to the public site build. The presentation repository has its own downloadable meeting templates. Templates are empty on purpose. A public repository still exposes these files; do not fill them here with residents' personal details, private contact information, credentials, membership lists, or confidential operating procedures.

Use a separately controlled workspace for private records. If a future docs platform supports authentication, access-controlled content still needs an explicit migration; a hidden navigation link does not make a public static file private.

## Keep project knowledge local

Use this directory for the website's scope, copy, assets, implementation, and publishing instructions. Put shared principles or future service boundaries in the independent general-documentation repository. Each future front-end or back-end repository should have its own `docs/` rather than adding its implementation details here.
