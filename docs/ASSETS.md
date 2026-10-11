# Design and asset register

Paths in this register are relative to this repository's root. This source register is not part of the public site build; bundled font licenses remain in `public/fonts/`.

## Working identity

**Kepemudaan Kampung Babakan RW 009** is the formal name used in the source records. The asterisk-like mark and the `PEMUDA BABAKAN` word treatment are original working artwork for this prototype, not the association's approved logo.

The visual direction is a local noticeboard or community zine: oversized condensed headlines, strong ink-on-paper contrast, collage photography, a lime circular sticker, slightly rotated paper elements, numbered sections, and quieter serif handwriting-like accents. It deliberately avoids a generic corporate software landing-page treatment.

## Tokens

| Token | Value | Purpose |
| --- | --- | --- |
| Paper | `#f7f7ef` | Main reading background |
| Ink | `#24261f` | Text, buttons, dark editorial section |
| Lime | `#d5f45b` | Invitation and collective-action highlights |
| Muted | `#696b60` | Secondary text |
| Line | `#d8d9cf` | Quiet dividers |
| Pink | `#f2ced1` | Complementary support/idea panel |
| Headline | Barlow Condensed, 700 | Large editorial headings |
| Body | DM Sans, variable | Navigation, controls, explanatory text |
| Accent | System Georgia, italic | A warmer change of voice within headings |

Tokens and font declarations live at the start of `src/style.css`. The independent presentation repository owns its own theme and font files; it does not import this stylesheet. Major layouts adapt at 1100, 780, and 540 pixels. Avoid changing a single color instance in isolation when it should be a token-wide change.

## Photographs

The site currently displays labeled documentation placeholders instead of photographs. The files below remain bundled but unused until suitable material and publication permission are confirmed.

Downloaded from Unsplash image delivery on 2026-10-09. Source identifiers are recorded below so an editor can locate the originals. License reference: [Unsplash License](https://unsplash.com/license). These assets are bundled locally; no live Unsplash request is needed by visitors.

| Local file | Usage | Source |
| --- | --- | --- |
| `public/images/arsip-hayu-camp.jpg` | Bundled but currently unused | Internal organization archive; permission pending; metadata stripped |
| `public/images/arsip-gotong-royong.jpg` | Bundled but currently unused | Internal organization archive; permission pending; metadata stripped |
| `public/images/friends.jpg` | Bundled but currently unused | [Unsplash image photo-1529156069898-49953e39b3ac](https://images.unsplash.com/photo-1529156069898-49953e39b3ac) |
| `public/images/garden.jpg` | Bundled but currently unused | [Unsplash image photo-1416879595882-3373a0480b5b](https://images.unsplash.com/photo-1416879595882-3373a0480b5b) |
| `public/images/learn.jpg` | Bundled but currently unused | [Unsplash image photo-1522202176988-66273c2fd55f](https://images.unsplash.com/photo-1522202176988-66273c2fd55f) |
| `public/images/court.jpg` | Bundled but currently unused | [Unsplash image photo-1546519638-68e109498ffc](https://images.unsplash.com/photo-1546519638-68e109498ffc) |

The stock-photo license does not turn the depicted people into representatives of this association. Do not claim their endorsement or describe stock images as documentation of local achievements. Do not publish the archive photographs until permission is recorded; replace them with illustrations if permission is not granted.

## Fonts

Both locally bundled fonts use the SIL Open Font License 1.1. Copyright notices and the full license are included in `public/fonts/OFL.txt` and copied into the deployment.

| File | Source family | Copyright |
| --- | --- | --- |
| `public/fonts/barlow-condensed-latin.woff2` | [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) | 2017 The Barlow Project Authors |
| `public/fonts/dm-sans-latin.woff2` | [DM Sans](https://fonts.google.com/specimen/DM+Sans) | 2014 The DM Sans Project Authors |

The files are Latin subsets supplied by Google Fonts. If additional scripts are required, obtain the appropriate subsets and retain their licenses. System fallback fonts remain available if a local font fails.

## Other graphics

- `public/favicon.svg`: simple custom asterisk on lime.
- Inline SVG brand mark, curved arrow, and agenda spark: original geometric decoration for this demo.
- Unicode arrows, plus marks, and smile symbol: decorative UI elements, generally hidden from assistive technology when adjacent text already explains the action.
- No third-party icon library is used.

## Replacement procedure

1. Select an asset that genuinely represents the organization and can be published.
2. Record its creator/source, permission status, intended usage, and responsible owner.
3. Compress to a reasonable size and choose an appropriate crop.
4. Replace the relevant placeholder in `index.html`, `src/main.js`, or `src/activity.js` with the approved image.
5. Update the alternative text and source note.
6. Update this register, run checks, and inspect desktop/phone crops.

Prefer a few strong real images to many decorative downloads. Never use a resident's photograph or quote as public material simply because it appeared in a private group chat.

## Project licensing

This register records third-party asset licenses; it does not declare an overall open-source license for the association's project or grant rights to future member contributions. The organization should choose its desired code/content license if it plans public reuse beyond reviewing this prototype. Keep asset license notices with redistributed font files.
