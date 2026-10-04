# Unit flip-showcase (U5b): the three-face showcase, its Tailwind section, and the chrome replacements

## Role and engine

astra on GPT-6 Astra (effort high), run as `codex exec` at `danger-full-access`. Executor: BENCH_ENGINE. You are the only writer of tracked files in `/home/user/veneer`. Another unit, `flip-probe-3`, may still write `/home/user/veneer/tmp/probes/flip4/**` while you run. Its files may appear in `git status --porcelain`: list them and change none. Every path in this brief is absolute, or it names a file under `/home/user/veneer` in prose.

## Objective

Implement unit U5b of the Tailwind flip in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. U2 (`bae9a1b`) and U3 (`54c05ff`) are committed; U4 `flip-integration` is accepted and committed before this launch. Your work:

- Serve three faces from the showcase: `bootstrap`, `unexcluded`, and `tailwindcss`, each from the record fields of `/home/user/veneer/app/browser/recipe.json`.
- Rewrite the Tailwind section (`/home/user/veneer/app/browser/sections/tailwindcss.html`) to the 23 specimens of the copy document, in its order, with its strings verbatim.
- Replace the chrome classes the verdict names, across every section fragment and the factories.
- Amend and add the cases of `/home/user/veneer/tests/app/browser/` that read a label, a face, a caption, or the chrome.
- Rerun the P4 chrome probe against the built page, and rebuild `/home/user/veneer/showcase/browser.html` with `npm run build:showcase`.

Commit nothing.

## Context

- **Re-read at launch (U4's output).** This brief describes the checkout at veneer `54c05ff`, while U4 ran. U4 edits no file you own, but before editing, read these as U4 left them:
  - `/home/user/scaffold/tmp/codex/flip-integration-last.md` (U4's report), for its reverse-order measurement: whether `[recipeRecord.unexcluded, built]` reads the same as `[built, recipeRecord.unexcluded]` on the witness elements and the incompatible names **(re-read)**. Implementation item 1 says what you do with each outcome.
  - `git log --oneline -3` and `git status --porcelain`. Expect U4's commit on top of `54c05ff` and no tracked change.
  - `/home/user/veneer/tests/setup.ts` `PreflightRecord` and `/home/user/veneer/tests/setupStyles.ts` **(re-read)** only if `npm run check` reports an error there; neither is yours.

- **The governing copy document.** `/home/user/scaffold/tmp/codex/flip-copy.md` (U5a, 98 rulings, with § Orchestrator rulings on the open items at its end). You apply it verbatim. Every label, title, lead, caption, specimen order, header ruling, vocabulary ruling, and test title comes from it. This brief quotes each string or cites its ruling number. Never reword, shorten, re-punctuate, or re-inflect a copy string. A caption string holds HTML: each `<code>` stays a `<code>` and each `<strong>` stays a `<strong>`. Prettier-style line wrapping inside an element is allowed; the text content after whitespace collapse must equal the copy string exactly.

- **Evidence.** Read these in order before editing:
  1. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`. It governs where the copy document is silent; § 12 and § 13 override earlier text. Read § 1 R5 and R7, § 4 (named cases), § 5 Showcase (all of it: the faces, `TAILWIND_READINGS`, the partition proof U6 owns, the chrome), § 8 item 6 (this unit: the browser types, constants, `Showcase`, factories, section fragments, and their tests; acceptance `check`, `test:app:browser`, P4 rerun), § 10 items 2, 4, 7, 8, and 9, § 12 (the § 5 bullet), § 13 P4 and P5.
  2. The P4 and P5 readings:
     - `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-probe/report-excerpt.md` (lines 14, 15, 30, 31: P4 1188 longhand departures and 0 box departures at each width; P5 every triple matched, `text-center text-md-start` reads `left` under every face at 768).
     - `/home/user/veneer/tmp/probes/flip2/report.md` § P4 (line 9117) and § P5 (line 11522).
     - `/home/user/veneer/tmp/probes/flip2/out/p4.json` and `/home/user/veneer/tmp/probes/flip2/out/p5.json`.
     - The probe code you copy for the rerun: `/home/user/veneer/tmp/probes/flip2/p4.ts`, `/home/user/veneer/tmp/probes/flip2/lib.ts`, `/home/user/veneer/tmp/probes/flip2/browser.ts`, `/home/user/veneer/tmp/probes/flip2/types.ts`. Never edit them in place.
     - What P4 measured, from `/home/user/veneer/tmp/probes/flip2/out/p4.json` (both widths alike): 508 class mutations on its chrome population: 297 `figure.card.h-100` became `flex-fill` (each parent column gained `d-flex`), 199 card bodies and the 2 header rows (`container-xxl … gap-3 py-3` and `d-flex flex-wrap align-items-center gap-3`) replaced `gap-3` with `row-gap-3 column-gap-3`; no chrome element carried `rounded`, `border`, or a `card-body.w-100`. The 1188 departures are exactly 297 × (`display` on the column, block to flex; `flex-grow` 0 to 1, `min-height` and `min-block-size` 0px to auto on the figure); 0 box departures. At 390: the Stylesheets group box is 366 px wide and 52 px tall, `buttons wrap to separate rows: false`, `group extends past viewport: false`; `Bootstrap only` 90.25 px, `Bootstrap with Tailwind` 132.78 px, `Tailwind without the layer` 144.97 px wide.
  3. `/home/user/veneer/tmp/probes/flip4/report.md`, if present at launch: the derived curation table of `flip-probe-3`, for caption 3.20 only (Implementation item 3). At brief time it exists and carries rows `scoped: .table td`, `scoped: .table th`, `scoped: .table tr`, `scoped: .table thead`, and `scoped: .table tbody` on the eight border-color longhands (lines 20 to 34). Read it again at launch **(re-read)**.
  4. `/home/user/veneer/guides/veneer.md` § Tailwind compatibility sheet, the curation table (28 rows, lines 1290 to 1320 at brief time), and § Showcase and § Faces (lines 1665 to 1720). Read only; U7 aligns the guide.
  5. The boundary rule: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` § Rules (line 38): `/home/user/veneer/tests/setupBrowser.ts` imports no value from the app folder, only types.
  6. Current code. Read every named item before editing:
     - `/home/user/veneer/app/browser/types.ts`: `Face` :13 is `'bootstrap' | 'tailwindcss'` with TSDoc :1 to :12 ("Names the stylesheet set …"); `Choice` :96, `Group` :109, `Section` :127.
     - `/home/user/veneer/app/browser/constants.ts`: `FACES` :31 to :34 (labels `Bootstrap only`, `Bootstrap with Tailwind`; TSDoc :24 to :30), `THEMES` :44, `GROUPS` :75 to :85 (`tailwindcss` titled `Bootstrap with Tailwind` at :84), the `tailwindcss` entry of `SECTIONS` :529 to :534 (lead at :533), `TAILWIND_CLASSES` :1208 (14 names; TSDoc :1195 to :1207 says "under the Tailwind face").
     - `/home/user/veneer/app/browser/Showcase.ts` (188 lines): imports `sheet` from `../../dist/src/bootstrap/index.css?raw` (:2) and `{ recipe }` from the sibling `recipe.json` (:8); the constructor builds `style#veneer-bootstrap` (:49 to :51) and `style#veneer-tailwindcss` (:52 to :54); `start` appends the Bootstrap sheet and mounts under `bootstrap` and `light` (:73 to :97); `destroy` removes both sheets (:123, :124); `#select` (:165 to :187) inserts the recipe before the Bootstrap sheet for `tailwindcss`, removes it for `bootstrap`, derives `selected` from `this.#tailwindcss.isConnected`, presses buttons, and writes the status. The class TSDoc :10 to :31 describes two faces.
     - `/home/user/veneer/app/browser/factories.ts`: the matrix column at :605 to :609 (`col-xl-12` or `col`), `createFigure` :439 to :470 (TSDoc :444 `figure.card.h-100`, :449 to :450 the remark; class list `card h-100 mb-0` at :459), `createShell` :737 onward (header bar `container-xxl d-flex flex-wrap align-items-center gap-3 py-3` at :767, controls `d-flex flex-wrap align-items-center gap-3` at :776, `createChoices(document, 'Stylesheets', FACES, face)` at :786; TSDoc :737 "stylesheet set").
     - `/home/user/veneer/app/browser/helpers.ts` `describeState` :114 to :129 (TSDoc example :123 `'Bootstrap with Tailwind, dark color mode'`).
     - `/home/user/veneer/app/browser/recipe.json`: keys `tailwindcss`, `sheet` (`f24045107a143ae750869243ecc1928e77a4084601718de10f02a9c187b84a40`), `candidates` (2039), `recipe` (359330 characters), `unexcluded` (20662 characters). Both texts open with the Tailwind banner, `@layer properties;`, then the order statement `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;`. The page imports them as JSON named exports; `recipe` is inlined into the built page today.
     - `/home/user/veneer/app/browser/sections/tailwindcss.html` (303 lines): the alert :1 to :5, the hint :6, the recipe `pre` :7 to :14 (`bg-body-tertiary border rounded p-3 mb-4`), the grid `row row-cols-1 row-cols-xl-2 g-4` :15, twelve specimens with ids `tailwindcss-padding`, `-spacing`, `-collapse`, `-container`, `-radius`, `-grid`, `-responsive`, `-arbitrary`, `-bare`, `-decoration`, `-stack`, `-departure` (`col-xl-12`).
     - Every fragment in `/home/user/veneer/app/browser/sections/`: 223 occurrences of `class="card h-100 mb-0"`; card bodies `card-body d-flex flex-wrap align-content-start align-items-start gap-3` (104), `card-body d-flex flex-wrap align-items-start gap-3` (87), `card-body d-flex flex-wrap align-content-start align-items-center gap-3` (8). Count them again with `grep -c` before editing.
     - `/home/user/veneer/app/browser/templates.ts` `ICONS` :34 (holds `calendar-event` at :41). Read only.
     - `/home/user/veneer/node_modules/bootstrap-icons/icons/calendar-event.svg`, for the inline icon markup of specimen 3.15 (fragments embed icons inline, as `/home/user/veneer/app/browser/sections/alerts.html` :59 does).
     - `/home/user/veneer/src/core/constants.ts` (`CLASS_NAMES`). Verified at brief time from `/home/user/veneer/dist/src/core/index.js`: `border-top`, `border-end`, `border-bottom`, `border-start`, `rounded-2`, `column-gap-3`, `flex-fill`, and `d-flex` are under `CLASS_NAMES.bootstrap.utilities`; `row-gap-3` is under `CLASS_NAMES.bootstrap.components.row.gap` (the registry files it under the `row` prefix). All nine are Bootstrap-only names: none is in `shared` of `/home/user/veneer/tests/fixtures/tailwindcss/comparison.json`, while `h-100`, `gap-3`, `rounded`, `border`, `mb-0`, `mb-2`, `mb-4`, and `p-3` are.
     - Tests (rulings in Implementation item 5): `/home/user/veneer/tests/app/browser/Showcase.test.ts` (442 lines), `/home/user/veneer/tests/app/browser/constants.test.ts` (311), `/home/user/veneer/tests/app/browser/factories.test.ts` (911), `/home/user/veneer/tests/app/browser/helpers.test.ts` (251), `/home/user/veneer/tests/app/browser/sections/integration.test.ts` (126), `/home/user/veneer/tests/app/browser/index.test.ts` (46).
     - `/home/user/veneer/tests/setupBrowser.ts`, read only (U6 owns it). It imports `type { Choice, Face, Showcase, Theme }` from `@app/browser` (:21). Its showcase helpers you must keep compatible: `TailwindReading` :141 (`values` and `narrow` typed `Record<Face | 'unexcluded', string>`), `FACE_LABELS` :157 (`Readonly<Record<Face, string>>`, two keys), `TAILWIND_READINGS` :213, `buildShowcase` :456, `readFace` :587, `applyFace` :659 (clicks `FACE_LABELS[face]`), `resolveSpecimen` (finds a figure by its caption title), `readShowcaseChrome` :943 (finds the group named `Stylesheets`, the status named `Showcase state`, and the element `#tailwindcss`), `assertFace` :1081, `FACE_SCENARIOS` :1140, `ShowcaseSelection` :1248, `buildPairScenarios` :1288.
     - `/home/user/veneer/tests/app/browser/integration.test.ts`, read only (U6). It is excluded from the `app:browser` project (`/home/user/veneer/vite.config.ts` :320).
     - `/home/user/veneer/configs/app/vite.showcase.config.ts` (the `build:showcase` build) and `/home/user/veneer/configs/app/tsconfig.browser.json` (`check:app:browser` includes the harness file). Read only.
- **Law.**
  - `/home/user/scaffold/AGENTS.md`: the non-negotiables (no `any`, no `as` beyond `as const`, no `!`, no `@ts-*`, lint-disable, or formatter-ignore directives, no new npm package, no mocks), the environment boundary (no app value reaches `/home/user/veneer/tests/setupBrowser.ts`), no nested functions, readonly interface properties, types before implementation, `{verb}{Noun}` helpers, and the wrapper law. Scripts are TypeScript run by `node path/file.ts`, importing only `node:` modules and installed packages.
  - `/home/user/scaffold/.claude/rules/tests.md`: one behavior per case, planted and removed controls.
  - `/home/user/scaffold/.claude/rules/typescript.md`: every exported item keeps the full TSDoc contract; update each contract your change makes false.
  - `/home/user/scaffold/.claude/rules/writing.md`: plain present-tense prose and titles; fictional descriptive data. The copy document already satisfies it; your own TSDoc must too.
  - `/home/user/scaffold/.claude/rules/styles.md` and `/home/user/scaffold/.claude/rules/names.md`.
  - `/home/user/scaffold/.agents/skills/enterprise-bootstrap/SKILL.md`, for Bootstrap's documented markup of the added specimens (card, modal and offcanvas titles, alert link, pagination, table, check).
- **Installed primitives.** In `/home/user/veneer/node_modules`: `vitest` with the browser module, `@orkestrel/test` (`requireValue`, `waitForCondition`), `@orkestrel/test/browser` (`readStyle`, `readClasses`, `readName`, `readRole`, `clickAccessible`, `readPerception`, `readContrast`), `playwright` (for the P4 rerun, as the probe uses it). The existing test helpers in each file (`mount`, `parkShowcasePointer`) are reused; a local twin of an existing helper is a defect.
- **Host.**
  - Linux POSIX. Run from `/home/user/veneer`, with `/home/user/.wave/npm11/node_modules/.bin` first on `PATH` (npm 11).
  - Chromium 141.0.7390.37 under Playwright; the P4 rerun launches `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` as `/home/user/veneer/tmp/probes/flip2/lib.ts` :49 does, on a loopback `node:http` server on port 0.
  - Sandbox `danger-full-access`: no network, installs, or commits.
  - A nested `git` may report "not a git repository". Do not diagnose that; your own `git status --porcelain` is the authority.
  - `/home/user/veneer/tmp/` and `/home/user/veneer/dist/` are ignored. Create `/home/user/veneer/tmp/units/flip-showcase/`.
- **Standing conditions.**
  - At start, `git status --porcelain` shows no tracked change, plus `flip-probe-3`'s ignored files if any. Record the list.
  - Baseline before any edit: `sha256sum dist/src/bootstrap/index.css` (expect `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`), `sha256sum app/browser/recipe.json showcase/browser.html`, one `npm run test:app:browser` run, and one `npm run test:setup:browser` run. Record each exit and every failing title.

## Implementation

Each item can be checked against its acceptance.

1. **Face plumbing.** Copy document § 1 and § 5; verdict § 5 and R7.
   - **The union.** `Face` in `/home/user/veneer/app/browser/types.ts` becomes `'bootstrap' | 'unexcluded' | 'tailwindcss'` (ruling 1.1). Rewrite its TSDoc: what each face holds (the three bullets below), and an example. The type gains a member and loses none; no other exported type of that file loses or renames a member.
   - **`FACES`** in `/home/user/veneer/app/browser/constants.ts`, in this order (rulings 1.2 to 1.5):
     - `{ value: 'bootstrap', label: 'Bootstrap only' }`
     - `{ value: 'unexcluded', label: 'Tailwind without the layer' }`
     - `{ value: 'tailwindcss', label: 'Tailwind with the layer' }`

     Each entry frozen, the array frozen, as today. Its TSDoc says "Lists the faces in button order …" and its example reads `['Bootstrap only', 'Tailwind without the layer', 'Tailwind with the layer']`.
   - **The group.** Accessible name `Stylesheets`, with no visible group title (ruling 1.6); `createChoices(document, 'Stylesheets', FACES, face)` stays. The header holds five buttons: the three face buttons, then `Light` and `Dark` in the `Color mode` group, then the status line named `Showcase state` (rulings 5.2, 5.4).
   - **Default face.** `bootstrap` on every `start` (ruling 1.7).
   - **State carrier.** None: no URL fragment, no query, no storage; a reload returns to `bootstrap` (ruling 1.8). Add none.
   - **Status sentence.** `LABEL, THEME color mode` through `describeState`, unchanged in form (ruling 1.9); for example `Tailwind without the layer, dark color mode`.
   - **Sheets per face.** `Showcase` holds three `style` elements, built once in the constructor (verdict § 5):
     - `style#veneer-bootstrap`: the text of `/home/user/veneer/dist/src/bootstrap/index.css` (`?raw`, as today).
     - `style#veneer-unexcluded`: the `unexcluded` field of `/home/user/veneer/app/browser/recipe.json`. The id is this brief's pin; the copy document names no id for it.
     - `style#veneer-tailwindcss`: the `recipe` field of the same record.

     Import both fields as named JSON exports (`import { recipe, unexcluded } from './recipe.json'`). The document's `head` holds exactly, among `style[id^="veneer-"]` and in this order (ruling 5.3):

     | Face | `style[id^="veneer-"]` ids in document order |
     | --- | --- |
     | `bootstrap` | `veneer-bootstrap` |
     | `unexcluded` | `veneer-unexcluded`, `veneer-bootstrap`, adjacent (`veneer-unexcluded`'s `nextElementSibling` is `veneer-bootstrap`) |
     | `tailwindcss` | `veneer-tailwindcss` |

     - The misuse composition (the Bootstrap sheet beside the recipe, in either order) is never served, in any state or transition. `tailwindcss` removes `style#veneer-bootstrap` from the document; returning to `bootstrap` or `unexcluded` puts it back at the position it held, so `destroy` restores the head exactly as the existing `restores the title, a %s data-bs-theme, the head, and the body on destroy` case reads it.
     - The selected face is derived from which sheets are connected, never from a field that can disagree with the document.
     - **The order and U4's measurement.** The copy document (rulings 1.12, 5.3, 8.8) and verdict § 5 place the `unexcluded` compile directly before the Bootstrap sheet. U4 pinned its integration composition as `[built, unexcluded]` and measured the reverse order once. Read that measurement in `/home/user/scaffold/tmp/codex/flip-integration-last.md` **(re-read)**. When it reads no difference, serve the order of the table above and quote U4's reading in your report. When it reports a witness or incompatible-name difference, apply the Orchestrator's ruling in § Rulings appended before launch; when that section carries none, stop.
   - **Toggle behavior.** Each face press sets `aria-pressed="true"` and the `active` class on its button, `aria-pressed="false"` and `text-body-emphasis` on the other two, keeps the color mode buttons as they are, and writes the status sentence (ruling 5.3). A press on the face already selected changes nothing. A color mode press keeps the face.
   - **TSDoc.** Rewrite the `Showcase` class contract, `start`, `destroy`, and `#select`'s comment for three faces, in the vocabulary of copy § 7 (7.7 face, 7.18: no "stylesheet set"). `createShell`'s `@param face` reads "The selected face, pressed in the Stylesheets group". `describeState`'s TSDoc reads "face" and its example `describeState('tailwindcss', 'dark') // 'Tailwind with the layer, dark color mode'` (see § Rulings for the scope of `/home/user/veneer/app/browser/helpers.ts`).

2. **The Tailwind section.**
   - **Group title** (`GROUPS`, id `tailwindcss`): `Tailwind` (ruling 2.1).
   - **Section** (`SECTIONS`, id `tailwindcss`): one section (2.2); title `Tailwind on Bootstrap markup`, kept (2.3); lead `Bootstrap markup and Tailwind utilities under the three faces, from bare elements through curated components to the utility names both systems declare.` (2.4).
   - **Introduction.** Replace the alert text (fragment :2 to :4) with five paragraphs inside the same `div.alert.alert-secondary.mb-4`, each a `p` carrying `mb-2` and the last one `mb-0` (ruling 2.9), in this order: ruling 2.5, ruling 1.11, ruling 1.12, ruling 1.13, ruling 2.7 (rulings 1.10, 2.6). The exact strings:
     - 2.5: `The Stylesheets buttons in the header switch the whole page between three faces, and the specimens in this section show where the faces differ.`
     - 1.11: `<strong>Bootstrap only</strong> holds the built <code>./bootstrap</code> sheet alone, the baseline every departure is read against.`
     - 1.12: `<strong>Tailwind without the layer</strong> holds the compile of the following recipe without its <code>@orkestrel/veneer/tailwindcss</code> import, before that same <code>./bootstrap</code> sheet: Tailwind's <code>collapse</code> and <code>container</code> utilities reach Bootstrap's components, and Bootstrap's important utilities outrank Tailwind's on every name both declare.`
     - 1.13: `<strong>Tailwind with the layer</strong> holds the compile of the whole recipe alone, whose <code>@orkestrel/veneer/tailwindcss</code> import is the layer, Bootstrap for Tailwind: Tailwind wins at every conflict, and Bootstrap's components keep their look.`
     - 2.7: `Switch faces and compare: an element that carries a utility name both systems declare, such as the <code>mt-3</code> class, reads Bootstrap's value without the layer and Tailwind's with it; a component name both declare, such as the <code>collapse</code> class, keeps Bootstrap's rule alone with the layer; a heading, paragraph, or link that carries a component class keeps Bootstrap's reboot through a curated copy; and a bare element reads Tailwind's preflight.`
   - **Hint and recipe** (rulings 2.10, 2.11): the hint `Scroll sideways to read the complete recipe.` and the region `Tailwind recipe` with its three lines are kept. The `pre` takes the chrome replacement (item 4).
   - **No page counts** (ruling 2.8): no count of shared names anywhere on the page.
   - **The 23 specimens**, in the order of copy § 4, inside the existing `row row-cols-1 row-cols-xl-2 g-4` grid. Each specimen keeps the section's convention: `<div class="col d-flex">` (the `hidden` specimen keeps `col-xl-12`, so `col-xl-12 d-flex`), a `figure.card.flex-fill.mb-0` with `aria-labelledby="tailwindcss-SLUG-title"`, a card body `card-body d-flex flex-wrap align-content-start align-items-start row-gap-3 column-gap-3`, and a `figcaption.card-footer.bg-transparent.small` holding the title span (`d-block fw-semibold`, id `tailwindcss-SLUG-title`), the class list `code.text-body-secondary` (C), and the caption span `d-block text-body-secondary mt-1` (X). Keep the twelve existing slugs; the new slugs are below. Inside a specimen, a block that needs the row's width carries `flex-fill` (Bootstrap-only), never `w-100` (a shared name, verdict § 10 item 4); an existing specimen keeps its classes as the copy rules. Every new specimen class must be a registry class (the section census admits nothing else), and `TAILWIND_CLASSES` stays its 14 names.

     | # | Slug | Title (T) | Class list (C) | Body (B) | Caption (X), verbatim |
     | --- | --- | --- | --- | --- | --- |
     | 1 | `card` (new) | `Bootstrap card on Tailwind's reset` | `card card-body card-title card-text btn btn-primary p` | `div.card` > `div.card-body` > `h5.card-title` `Coastal ferry`, `p.card-text` `Departs the north pier every 40 minutes.`, bare `p` `Timetables change on public holidays.`, `button.btn.btn-primary` (type `button`) `View timetable` | ruling 3.13 X |
     | 2 | `heading` (new) | `Bare heading beside a heading class` | `h5 p.h5` | bare `h5` `A bare h5 heading`, `p.h5` `A paragraph with the h5 class` | ruling 3.14 X |
     | 3 | `bare` | `Bare image and list` (kept) | `img ul` (kept) | ruling 3.9 B: `A bare image` + the existing image (kept: `alt="Grey hills"`, `width="48"`, `height="24"`) + `sits inline with the text under Bootstrap only.`; list items `A bare list shows bullets` and `under Bootstrap only` | ruling 3.9 X |
     | 4 | `departure` | `Hidden attribute with a display utility` (kept) | `<div hidden class="d-flex">` (kept, escaped as today) | the hidden row kept; the paragraph `The row before this line shows under Bootstrap only and disappears under both Tailwind faces.` | ruling 3.12 X; the sentence `This is the recipe's named departure.` is deleted |
     | 5 | `icon` (new) | `Icon in a Bootstrap button` | `btn btn-primary bi` | `button.btn.btn-primary` (type `button`) holding the inline `calendar-event` icon (`svg.bi.bi-calendar-event`, `aria-hidden="true"`, `focusable="false"`, `fill="currentColor"`, `width` and `height` `1em`, the path from the icon file) and the text `Book a crossing` | ruling 3.15 X |
     | 6 | `figure-image` (new) | `Image in a Bootstrap figure` | `figure figure-img figure-caption` | `figure.figure.mb-0` holding `img.figure-img` (alt `Hills behind the north pier`, a data-URI SVG with explicit `width` and `height`, no `img-fluid`, no `rounded`) and `figcaption.figure-caption` `North pier at dusk.` | ruling 3.16 X |
     | 7 | `titles` (new) | `Bootstrap modal and offcanvas titles` | `modal-title fs-5 offcanvas-title` | `h1.modal-title.fs-5` `Crossing details`, `h5.offcanvas-title` `Crossing filters` | ruling 3.17 X |
     | 8 | `alert-link` (new) | `Link in a Bootstrap alert` | `alert alert-info alert-link` | `div.alert.alert-info.mb-0` holding `The 18:40 crossing leaves late. `, `a.alert-link` (`href="#"`) `See the revised time`, then `.` | ruling 3.18 X |
     | 9 | `pagination` (new) | `Bootstrap pagination list` | `pagination page-item page-link` | `nav` with `aria-label="Timetable pages"` holding `ul.pagination` with no `mb-0`, three `li.page-item > a.page-link` (`href="#"`) `Early`, `Midday`, `Late` | ruling 3.19 X |
     | 10 | `table` (new) | `Bootstrap table with bare cells` | `table th td` | `table.table.mb-0`: `thead` row with `th` (scope `col`) `Ferry` and `Departs`; `tbody` rows `Coastal ferry` / `08:20` and `Island shuttle` / `09:05` in bare `td` cells | ruling 3.20 X, or its fallback (below) |
     | 11 | `checkbox` (new) | `Bootstrap checkbox` | `form-check form-check-input form-check-label` | `div.form-check` holding `input.form-check-input` (type `checkbox`, id `tailwindcss-night-crossings`) and `label.form-check-label` (`for` that id) `Include night crossings` | ruling 3.21 X |
     | 12 | `collapse` | `Collapse, a name both systems declare` | `collapse show` (kept) | ruling 3.3 B: `This panel shows wherever Bootstrap's collapse rule applies alone.` | ruling 3.3 X |
     | 13 | `container` | `Container, a name both systems declare` | `container` (kept) | ruling 3.4 B: `A Bootstrap container holds this line inside the card.` | ruling 3.4 X |
     | 14 | `padding` | `Tailwind padding on a Bootstrap button` (kept) | `btn btn-primary px-8` (kept) | kept | ruling 3.1 X |
     | 15 | `grid` | `Tailwind grid in a card body` (kept) | `card-body grid grid-cols-3 gap-3` (kept) | kept | ruling 3.6 X |
     | 16 | `responsive` | `Tailwind variant at the md breakpoint` (kept) | `md:flex gap-3` (kept) | kept | ruling 3.7 X |
     | 17 | `arbitrary` | `Arbitrary margin value` (kept) | `mt-[1rem]` (kept) | kept | ruling 3.8 X |
     | 18 | `decoration` | `Tailwind color, ring, shadow, and size` (kept) | kept | kept | ruling 3.10 X |
     | 19 | `stack` | `Tailwind dividers and vertical spacing` (kept) | `divide-y space-y-2` (kept) | kept | ruling 3.11 X |
     | 20 | `spacing` | `Shared spacing, border, and radius` | `d-flex gap-4 mt-3 border rounded` | kept | ruling 3.2 X |
     | 21 | `border-width` (new) | `Border width without a border style` | `border-1` | `div.border-1.bg-body-tertiary.px-2` `Platform edge` | ruling 3.22 X |
     | 22 | `radius` | `Pill radius beside rounded-full` (kept) | kept | kept | ruling 3.5 X |
     | 23 | `alignment` (new) | `Responsive alignment at the md breakpoint` | `text-center text-md-start` | `p.text-center.text-md-start.mb-0` `Boarding closes 10 minutes before departure.` (it may carry `flex-fill` so the alignment shows) | ruling 3.23 X |

     Copy each X string from `/home/user/scaffold/tmp/codex/flip-copy.md` § 3 character for character; the table cites the ruling instead of repeating it. Fictional data stays the copy document's ferry and harbor data. No new id or accessible name may collide with one on the page (`grep` over `/home/user/veneer/app/browser` and `/home/user/veneer/tests`).
   - **Caption 3.20 (open item 1).** At launch, read `/home/user/veneer/tmp/probes/flip4/report.md` **(re-read)**:
     - If it exists and its derived table carries a `scoped` row for the `.table` cells' border color (a `scoped: .table td` or `scoped: .table th` row naming `border-bottom-color`), X is ruling 3.20's string verbatim, with its with-the-layer clause: `Every face: each cell's bottom border takes the table's border color. With the layer, a scoped copy of the reboot's cell rule holds it against preflight, which gives a bare cell's border the text color.`
     - Otherwise, apply the Orchestrator's ruling on open item 1 (copy document, last section): the caption names the departure. Use the three-face form of ruling 3.0 with readings you take live under the three faces on the built page (`border-bottom-color` of a bare `td`), and report the string you wrote and the three readings. This is the one caption you compose; compose it only in this branch.
     - In both branches, read `border-bottom-color` of a bare `td` and of the `table` under each face and report the triple. If the scoped-clause branch applies and the `tailwindcss` reading differs from the `bootstrap` reading, keep the copy string, and report the mismatch with the three readings (the sheet U2 built carries the § 4 seed, and a later unit lands the derived table).
   - **The curation table and the specimens.** The guide's 28 rows map to specimens as follows; report this mapping with each row's page location:
     - In the Tailwind section: `card-title` and `card-text` (specimen 1), `svg:where(.bi)` (5), `img:where(.figure-img)` (6), `modal-title` and `offcanvas-title` (7), `alert-link` (8), `pagination` (9), `input:where(.form-check-input)` (11).
     - No Tailwind-section specimen; the face toggle reaches the row in its own section (ruling 2.5): `popover-header` (Popovers and Engine states), `accordion-header` and `accordion-button` (Accordion), `placeholder-glow` (Placeholders), `stretched-link` (Stretched link), `visually-hidden-focusable` (Visually hidden, and the skip link), `card-link` (Card), `icon-link` (Icon link), the nine `link-*` rows (Colored links), `input:where(.btn-check)` (Checks and radios, Button group), `input:where(.form-range)` (Range). The copy document fixes 23 specimens and adds none for these. For each, confirm with `grep` that the class occurs in its section's fragment or a matrix, and report a row whose class the page never renders.

3. **Chrome replacements.** Verdict § 5 and § 10 item 8; copy § 6. The chrome population is P4's: the header and its descendants, `main` and its children, group headings and section headings and leads, each labelled specimen figure, its direct card body, and its caption. Specimen content keeps its classes (`w-100`, `border`, `rounded`, `gap-3` inside a specimen stay; verdict § 5: "`w-100` inside specimen markup stays").

   | Site | Today | After |
   | --- | --- | --- |
   | Every `figure` in `/home/user/veneer/app/browser/sections/*.html` with `class="card h-100 mb-0"` (223 at brief time) | `card h-100 mb-0` | `card flex-fill mb-0`, and its parent column (`col`, `col-xl-12`, or any `col*`) gains `d-flex` |
   | `/home/user/veneer/app/browser/factories.ts` :459 (`createFigure`) | `card h-100 mb-0` | `card flex-fill mb-0` |
   | `/home/user/veneer/app/browser/factories.ts` :605 to :609 (the matrix column) | `col-xl-12` or `col` | `col-xl-12 d-flex` or `col d-flex` |
   | Every fragment card body with `gap-3` in the three class strings above (199 at brief time) | `… gap-3` | `… row-gap-3 column-gap-3`, in the position `gap-3` held |
   | `/home/user/veneer/app/browser/factories.ts` :767 (header bar) | `container-xxl d-flex flex-wrap align-items-center gap-3 py-3` | `container-xxl d-flex flex-wrap align-items-center row-gap-3 column-gap-3 py-3` |
   | `/home/user/veneer/app/browser/factories.ts` :776 (header controls) | `d-flex flex-wrap align-items-center gap-3` | `d-flex flex-wrap align-items-center row-gap-3 column-gap-3` |
   | `/home/user/veneer/app/browser/sections/tailwindcss.html` :8 (the recipe `pre`; Orchestrator ruling on open item 2) | `bg-body-tertiary border rounded p-3 mb-4` | `bg-body-tertiary border-top border-end border-bottom border-start rounded-2 p-3 mb-4` |
   | The Tailwind section's alert (:1; open item 2) | `alert alert-secondary mb-4` | unchanged: it carries no replaced name; `mb-4` stays |
   | A `card-body` carrying `w-100` | none at brief time (P4 matched none) | nothing to change; report the count you find |

   - `createFigure`'s TSDoc follows ruling 6.3: ``A `figure.card.flex-fill` labelled by its caption title``; the remark `The figure fills its grid column` stays.
   - No visible text changes with these replacements (ruling 6.1).
   - Count each kind before and after and report the counts. After the edit, `grep -c 'card h-100' app/browser/sections/*.html app/browser/factories.ts` reads 0 everywhere, and no chrome element carries `h-100`, `gap-3`, `rounded`, or `border` (the P4 rerun's census reads it).
   - The remaining chrome spacing (`py-3`, `px-4`, `py-5`, `mt-5`, `pt-4`, `mb-4`, `mb-0`, `mt-1`, `gap-2`, `bg-transparent`, `flex-wrap`) stays (verdict § 5).

4. **The header at 390 px.** Copy § 5. The three face buttons, labels and order as in item 1, stay on one row inside the 366 px content width, each label wrapping to two lines inside its button; the Color mode group and the status wrap to rows of their own; no label is shortened (ruling 5.5). No class change beyond item 3 is expected; P4 measured this layout with the clone. The P4 rerun (item 6) measures it with the final strings (ruling 5.6).

5. **Tests.** Titles follow copy § 8 (lower-case first word, present-tense verb, no closing period). Line numbers are from brief time.
   - `/home/user/veneer/tests/app/browser/Showcase.test.ts`:
     - :25 `destroys only its own toasts …`: kept.
     - :64 `mounts the page under the Bootstrap face and the light color mode`: kept title (ruling 8.8); amended: the header rows read `['Bootstrap only', 'true', true]`, `['Tailwind without the layer', 'false', false]`, `['Tailwind with the layer', 'false', false]`, `['Light', 'true', true]`, `['Dark', 'false', false]`; `veneer-unexcluded` and `veneer-tailwindcss` are absent.
     - :94 `inserts the Tailwind compile directly before the Bootstrap sheet under the Tailwind face`: deleted, replaced by two cases (ruling 8.8):
       - `holds the recipe compile alone under the tailwindcss face`: after `Tailwind with the layer`, the ids read `['veneer-tailwindcss']`, its text equals `recipe`, the status reads `Tailwind with the layer, light color mode`, the pressed buttons read `['Tailwind with the layer', 'Light']`; a second press changes nothing; `Bootstrap only` returns `['veneer-bootstrap']` and its text equals `sheet`. Removed control: no state of the case holds `veneer-bootstrap` beside `veneer-tailwindcss`.
       - `inserts the unexcluded compile directly before the Bootstrap sheet under the unexcluded face`: after `Tailwind without the layer`, the ids read `['veneer-unexcluded', 'veneer-bootstrap']`, the first's `nextElementSibling` is the second, its text equals `unexcluded`, the status reads `Tailwind without the layer, light color mode`; a second press changes nothing; `Bootstrap only` returns `['veneer-bootstrap']`.
     - Added `moves between every pair of faces through the Stylesheets buttons`: from each face, a press on each other face button yields that face's ids, pressed set, and status (the six transitions), and the head never holds a misuse composition. Removed control: after `destroy`, a press on a stale face button changes no `style` element.
     - Added `leaves a host stylesheet in place under each face`: a planted `style#host-sheet` appended to the head before `start` keeps its position and text under each face and after `destroy`.
     - :138 `writes the selected color mode …`: kept title; amended labels (`Tailwind with the layer`; status `Tailwind with the layer, dark color mode` and `…, light color mode`).
     - :168 `reads every header button at 4.5:1 or more …`: kept title; amended to five rows, and the dark pass presses each face button once, reading all five buttons after each press.
     - :206 (the `it.each` `restores the title, a %s data-bs-theme, the head, and the body on destroy`): kept; it presses `Tailwind with the layer`. Add one press of `Tailwind without the layer` before it so the restored head is read after both Tailwind faces.
     - :259 `ignores a click on the header of a destroyed mount …`: kept; the stale button is `Tailwind with the layer`.
     - :286 `mounts a fresh page under the defaults …`: kept; the last read is `['veneer-tailwindcss']`.
     - :314 `restarts a mounted page …`: kept; label amended.
     - :333, :374, :396, :427: kept.
   - `/home/user/veneer/tests/app/browser/constants.test.ts`:
     - :184 `places every section in a declared group …`: the last `GROUPS` title reads `Tailwind` (:200). The check at :202 (no group title equals a section title) still passes.
     - :298 `labels the stylesheet and color-mode buttons and titles the page`: kept title (ruling 8.9); `FACES` reads the three entries of item 1.
     - Added in `SECTIONS`: `leads the Tailwind section with the three faces`, asserting the lead of 2.4 and the title of 2.3 for id `tailwindcss`.
     - :236 `TAILWIND_CLASSES …`: kept unchanged.
   - `/home/user/veneer/tests/app/browser/factories.test.ts`:
     - :408 `labels a card figure by its caption title …`: :420 reads `['card', 'flex-fill', 'mb-0']`.
     - :584 `labels a matrix section by its heading …`: :595 reads `col-xl-12 d-flex`.
     - :602 `gives each templated row its figure and a base-only family a half-width column`: :614 reads `col d-flex`.
     - :770 `presses %s and %s and reads them in the status line`: six rows, adding `['unexcluded', 'light']` and `['unexcluded', 'dark']` between the Bootstrap and Tailwind rows.
     - :789 `builds the skip link, banner, controls, contents region, and main landmark`: the Stylesheets group reads `['Bootstrap only', 'Tailwind without the layer', 'Tailwind with the layer']`. Add the header bar and controls class lists of item 3, with a removed control: no header element carries `gap-3`.
     - :865 `carries only registry, engine marker, icon, and Tailwind class tokens …`: kept; add `createShell(document, 'unexcluded', 'light')` beside the `tailwindcss` page if the case's shape admits it in one behavior; otherwise leave it.
   - `/home/user/veneer/tests/app/browser/sections/integration.test.ts`:
     - :42 `%s shows every class it owns and only admitted classes`: the figure check (:66 to :74) reads `card flex-fill mb-0` for a figure whose parent matches `.row > .col.d-flex, .row > .col-xl-12.d-flex`, and `card mb-0` otherwise. Every new specimen class is admitted (registry, icon tokens) and the Tailwind section still carries every `TAILWIND_CLASSES` member.
     - Added: `places each Tailwind specimen in the copy order with its caption title`, reading the 23 figure titles of the `tailwindcss` section in the order of copy § 4. Planted control: swapping two figures fails it.
     - Added: `keeps chrome classes off every replaced name`: no figure, card body, or column the section factory builds carries `h-100`, and no direct card body carries `gap-3`. Planted control: a figure given `h-100` fails it.
   - `/home/user/veneer/tests/app/browser/helpers.test.ts` :150 (see § Rulings): title `names the face by its button label and the color mode by its value` (rule 7.18), six expectations over the three faces and two modes.
   - `/home/user/veneer/tests/app/browser/index.test.ts`: amend only if the export list changes; it should not.
   - Never edit `/home/user/veneer/tests/setupBrowser.ts`, `/home/user/veneer/tests/setupBrowser.test.ts`, or `/home/user/veneer/tests/app/browser/integration.test.ts`.

6. **The P4 rerun.** Copy `p4.ts`, `lib.ts`, `browser.ts`, and `types.ts` from `/home/user/veneer/tmp/probes/flip2/` into `/home/user/veneer/tmp/units/flip-showcase/` and adapt the copy only as follows:
   - Output to out/p4.json under the unit folder; drop every import of a module the rerun does not use (the Sass and Tailwind compilers stay out unless needed).
   - Serve `/home/user/veneer/dist/app/browser` as the probe does, after `npm run build:app:browser` (it writes `dist/`, which is ignored).
   - Mount under the `bootstrap` face at 1280 and at 390 (light). Because the built page already carries the replacements, invert the mapping on the same chrome population to recreate the old classes, read the baseline, apply the forward mapping of item 3 again, and compare, exactly as `p4.ts` compares. The inverse: an element carrying all four side classes takes `border` in their place; `rounded-2` takes `rounded`; `row-gap-3 column-gap-3` take `gap-3`; `figure.card.flex-fill` takes `h-100`, and the `d-flex` its parent gained is removed.
   - A Bootstrap-only departure is a box departure, or a longhand departure outside the replaced classes' own declarations. Expected at each width: 0 box departures; every longhand departure is `display` (block to flex) on a column, or `flex-grow` (0 to 1), `min-height`, or `min-block-size` (0px to auto) on a figure. Report the counts per kind (P4 read 297 figures and 1188 departures before the section grew by 11 specimens).
   - The census: on the built page, no chrome element carries `h-100`, `gap-3`, `rounded`, or `border`. Expect 0.
   - The header at 390, with no clone: the three real face buttons share one row (`buttonsWrap` false), the group does not extend past the viewport (`overflow` false), and the report lists each face button's box (width, height) and the group box.
   - Exit nonzero when any expectation fails. Run it twice (`node tmp/units/flip-showcase/p4.ts`) and `cmp` the two outputs: byte-identical, with no timestamp or duration in the file.

7. **The showcase build.** `npm run build:showcase` writes `/home/user/veneer/showcase/browser.html`. Rebuild it after every other gate is green and commit nothing; the Orchestrator commits the whole file after U8. Report `sha256sum showcase/browser.html` before and after, and the `build-id` stamp line.

## Unknowns

- Whether U4's reverse-order measurement reads a difference (item 1).
- Whether `flip-probe-3`'s report carries the `.table` scoped row at launch, and what a bare `td` reads under each face (item 2).
- Whether the header buttons fit with `Tailwind with the layer` in place of the measured `Bootstrap with Tailwind` (same 23 characters, other glyphs; ruling 5.6).
- How many longhand departures the rerun reads with the 23 specimens.
- Whether `npm run test:setup:browser`'s showcase describes fail on the new labels (expected: `FACE_LABELS` still names `Bootstrap with Tailwind`, so `applyFace('tailwindcss')` finds no button; U6 adapts them).

## Scope

- **Owned.**
  - `/home/user/veneer/app/browser/types.ts`, `/home/user/veneer/app/browser/constants.ts`, `/home/user/veneer/app/browser/Showcase.ts`, `/home/user/veneer/app/browser/factories.ts`.
  - Every fragment in `/home/user/veneer/app/browser/sections/` (`*.html`).
  - `/home/user/veneer/app/browser/index.html` only if the header lived there; it does not (the header is built by `createShell`), so leave it.
  - `/home/user/veneer/tests/app/browser/Showcase.test.ts`, `/home/user/veneer/tests/app/browser/constants.test.ts`, `/home/user/veneer/tests/app/browser/factories.test.ts`, `/home/user/veneer/tests/app/browser/sections/integration.test.ts`.
  - Under § Rulings: `describeState`'s TSDoc in `/home/user/veneer/app/browser/helpers.ts` and the `describeState` describe of `/home/user/veneer/tests/app/browser/helpers.test.ts`, nothing else in either file.
  - `/home/user/veneer/tmp/units/flip-showcase/**` (create it).
  - `/home/user/veneer/showcase/browser.html`, through `npm run build:showcase` only.
- **Type compatibility.** A type that `/home/user/veneer/tests/setupBrowser.ts` imports from `@app/browser` (`Choice`, `Face`, `Showcase`, `Theme`) may gain a member and may not lose or rename one; U6 adapts the helpers after. A rename is a stop.
- **Off-limits.**
  - Everything else, including: `/home/user/veneer/tests/setupBrowser.ts` and `/home/user/veneer/tests/setupBrowser.test.ts` (U6), `/home/user/veneer/tests/app/browser/integration.test.ts` (U6), `/home/user/veneer/tests/integration.test.ts`, `/home/user/veneer/tests/conformance.test.ts`, `/home/user/veneer/src/`, `/home/user/veneer/guides/`, `/home/user/veneer/app/browser/recipe.json` (U3's record; a needed change is a stop), `/home/user/veneer/app/browser/templates.ts`, `/home/user/veneer/app/browser/main.ts`, `/home/user/veneer/app/vue/`, `/home/user/veneer/package.json`, the lockfile, `/home/user/veneer/vite.config.ts`, `/home/user/veneer/configs/`, `/home/user/veneer/tmp/probes/`.
  - Forbidden operations:
    - npm install, commit, push, any credential, `git stash`, `git add`, `git reset`, `git checkout`, or any destructive command;
    - a tree-wide mutating gate (`npm run lint`, `npm run format`). Format only owned files, with `npx oxfmt --config .oxfmtrc.json --write <files>`, and say which;
    - rebuilding `dist/` beyond `npm run build:app:browser`. The bootstrap digest `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` stays unchanged.
- **Tools and limits.** `node`; the `npm run` scripts named here; `npx vitest run --config vite.config.ts --project app:browser <file> -t "<title>"`; `npx oxfmt` on owned files; `sha256sum`; `cmp`; `grep`; `git status --porcelain`; `git diff`; `git show HEAD:<path>`.

## Execution

Do the assignment yourself and spawn nothing. Order:

1. The re-reads and the baseline.
2. The face plumbing (types, constants, `Showcase`) with the `Showcase.test.ts`, `constants.test.ts`, `factories.test.ts`, and `helpers.test.ts` cases.
3. The chrome replacements across the fragments and factories, with the section and factory cases.
4. The Tailwind section.
5. `npm run build:app:browser`, then the P4 rerun, twice.
6. The gates, then `npm run build:showcase`.

Fix every failure in owned files before you report.

## Output

Write the final message through the last-message file, with no process diary:

1. Lead with the findings:
   - the face composition per face as the tests read it, and U4's reverse-order reading you relied on;
   - the chrome counts per kind before and after;
   - the P4 rerun: departures per kind at 1280 and 390, box departures, the census count, each face button's box at 390, and the `cmp` result;
   - the caption 3.20 branch taken, with the bare `td` and `table` border-color triple;
   - the curation-row mapping of item 2, with any row the page never renders;
   - the case list per test file, each marked kept, amended (how), deleted (why), or added;
   - each gate's exit code.
2. Paths: every edited file and the files under `/home/user/veneer/tmp/units/flip-showcase/`.
3. `sha256sum showcase/browser.html` before and after, and its `build-id` line.
4. Every `npm run test:setup:browser` failing title, each marked as a showcase describe (U6) or not.
5. Anything not run, with the exact error or skip line.
6. The final `git status --porcelain`, with `flip-probe-3`'s entries listed as not yours.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when any of these happens:

- A sandbox write is rejected. Never try another write mechanism.
- A copy-document string cannot be applied as written (a class it names is not a registry class, a string collides with an accessible name on the page, or a caption contradicts a live reading other than caption 3.20's).
- A face composition cannot be served from the `recipe` and `unexcluded` fields of `/home/user/veneer/app/browser/recipe.json`, or `/home/user/veneer/app/browser/recipe.json` must change.
- U4's report shows a reverse-order difference and § Rulings carries no ruling for it.
- `/home/user/veneer/tests/setupBrowser.ts` would need a change to keep `npm run check` green beyond the one admitted error of § Rulings, or to keep `npm run test:setup:browser` green on a showcase describe.
- A type that `/home/user/veneer/tests/setupBrowser.ts` imports would lose or rename a member.
- The P4 rerun reads a box departure, a longhand departure outside the four kinds of item 6, a replaced name on chrome, or a face button on a row of its own at 390.
- The bootstrap digest `7932f7a5…` changes.
- A file outside Owned must change.

Settle ancillary choices yourself and record them: added test titles (in the § 8 shape), the slugs of the new specimens if the table's collide, the data-URI image of specimen 6, the helper names in the P4 copy.

## Acceptance criteria

Cheapest first; run each one bare, from `/home/user/veneer`.

1. `npm run check`. It exits 0, or it exits nonzero with exactly the one admitted error of § Rulings and no other; report the full output.
2. `npm run lint:check`
3. `npm run format:check`
4. `npm run test:app:browser`
5. `npm run build:app:browser`, then `node tmp/units/flip-showcase/p4.ts` twice: each exits 0, and `cmp` of the two outputs exits 0.
6. `npm run build:showcase`; report `sha256sum showcase/browser.html`.
7. `npm run test:setup:browser`, as an observation: U6 owns its showcase describes; report each failure with its title.
8. `sha256sum dist/src/bootstrap/index.css` equals `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.
9. `git diff --check`

## Review evidence

The actual diff, the P4 rerun output, the chrome counts, the case table, the `/home/user/veneer/showcase/browser.html` digest, and `git status --porcelain`.

## Rulings appended before launch

The driver sets these defaults from the evidence; the Orchestrator confirms or replaces each before launch.

- **Launch order.** This unit launches after U4 `flip-integration` is accepted and committed. Read `/home/user/scaffold/tmp/codex/flip-integration-last.md` and `git log --oneline -3` as U4 left them.
- **The admitted `check` error.** Widening `Face` makes `FACE_LABELS` in `/home/user/veneer/tests/setupBrowser.ts` :157 (`Readonly<Record<Face, string>>`, two keys) miss the `unexcluded` key, and `check:app:browser` type-checks that file (`/home/user/veneer/configs/app/tsconfig.browser.json`). That one error, a missing property `unexcluded` at that declaration, is admitted; U6 adds the key. Any other error in `/home/user/veneer/tests/setupBrowser.ts` is a stop.
- **`describeState` scope.** `FACES` feeds `describeState`, so `/home/user/veneer/tests/app/browser/helpers.test.ts` :153 and :154 (`Bootstrap with Tailwind, …`) fail once the labels change. The `describeState` TSDoc in `/home/user/veneer/app/browser/helpers.ts` and the `describeState` describe of `/home/user/veneer/tests/app/browser/helpers.test.ts` are owned for this change only.
- **Order of the `unexcluded` face.** Serve `unexcluded` directly before `style#veneer-bootstrap` (verdict § 5; copy rulings 1.12, 5.3, 8.8). U4's integration pin `[built, unexcluded]` stays U4's. If U4's report reads a difference between the two orders, stop.
- **Caption 3.20.** Implementation item 2 rules both branches.
- **Cap.** 5400 s.

## Orchestrator rulings on the three decisions

1. **`npm run check` stays green.** The unit may edit `tests/setupBrowser.ts` for exactly what the typecheck needs after `Face` gains `unexcluded`: the `FACE_LABELS` entry for `unexcluded` with the copy document's label `Tailwind without the layer`, and, only if an exhaustive switch or record in that file refuses to compile, the minimal branch for `unexcluded` that mirrors the page's composition (the record's `unexcluded` text before the lifted sheet). Nothing else in that file changes; the report quotes each changed line. U6 owns every other change to the showcase helpers.
2. **`describeState`.** Granted: the `describeState` TSDoc in `app/browser/helpers.ts` and the `describeState` describe in `tests/app/browser/helpers.test.ts` join Owned.
3. **Order of the `unexcluded` face.** The page serves `[unexcluded, built]`: the record's `unexcluded` text first, then `style#veneer-bootstrap`, as verdict § 5 and the copy rulings 1.12, 5.3, and 8.8 state. Both texts open with `@layer properties;` and the order statement, so the order moves no layer. At launch read `/home/user/scaffold/tmp/codex/flip-integration-2-last.md` § reverse-order measurement: a longhand that reads differently between `[built, unexcluded]` and `[unexcluded, built]` on the witnesses is a stop (expected, found, the longhand).

## Launch order

This unit launches after `flip-integration-2` and after the fold unit `flip-sheet-2` (the derived curation table with its `scoped` rows folded into `src/tailwindcss/_tokens.scss`, the Sass `scope` mixin, the guide table, and the tests) are accepted and committed, so the page's `tailwindcss` face carries the scoped `.table` rows that caption 3.20 names. At launch re-read `guides/veneer.md` § Tailwind compatibility sheet for the row list the specimen mapping uses; a row the page never renders is reported, not invented.
