1. **Findings**

Added the 12 prescribed figures. The section census, order controls, and acceptance gates pass. Both sheets remain byte-identical to their launch values. No commit was made.

The implementation follows [documented-markup.md](/home/user/scaffold/tmp/codex/documented-markup.md), § 2, § 3, and “Orchestrator rulings on the corpus”; [reviewer-verdict.md](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-falsify/reviewer-verdict.md), F1, F7, F8, and its final rulings; [flip-copy.md](/home/user/scaffold/tmp/codex/flip-copy.md), § 3 ruling 3.0, § 7, and § 8; and [design-verdict.md](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md), § 4 and § 5. The chrome follows the showcase archive’s [brief.md](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-showcase/brief.md), Implementation § 2–3. The accordion follows the enterprise-bootstrap [component reference](/home/user/scaffold/.agents/skills/enterprise-bootstrap/references/components.md), “Accordion,” as required by its [SKILL.md](/home/user/scaffold/.agents/skills/enterprise-bootstrap/SKILL.md).

The following ranges cover each added outer figure. “Preceding” names the preceding figure’s caption ID.

| Specimen | Fragment and figure lines | Preceding | Slug | Caption title |
| --- | --- | --- | --- | --- |
| S1 | [alerts.html](/home/user/veneer/app/browser/sections/alerts.html:158), 158–184 | `alerts-content-title` | `alerts-documented` | Alert heading in Bootstrap's markup |
| S2 | [card.html](/home/user/veneer/app/browser/sections/card.html:50), 50–80 | `card-image-title` | `card-documented-titles` | Card titles in Bootstrap's markup |
| S3 | [card.html](/home/user/veneer/app/browser/sections/card.html:226), 226–253 | `card-header-title` | `card-documented-header` | Card header heading in Bootstrap's markup |
| S4 | [dropdowns.html](/home/user/veneer/app/browser/sections/dropdowns.html:31), 31–55 | `dropdowns-content-title` | `dropdowns-documented-header` | Dropdown header in Bootstrap's markup |
| S5 | [typography.html](/home/user/veneer/app/browser/sections/typography.html:72), 72–97 | `typography-display-title` | `typography-documented-display` | Display headings in Bootstrap's markup |
| S6 | [typography.html](/home/user/veneer/app/browser/sections/typography.html:158), 158–180 | `typography-lists-title` | `typography-documented-inline` | Inline list in Bootstrap's markup |
| S7 | [typography.html](/home/user/veneer/app/browser/sections/typography.html:183), 183–226 | `typography-documented-inline-title` | `typography-documented-description` | Description list in Bootstrap's markup |
| S8 | [figures.html](/home/user/veneer/app/browser/sections/figures.html:23), 23–48 | `figures-start-title` | `figures-documented` | Figure in Bootstrap's markup |
| S9 | [placeholders.html](/home/user/veneer/app/browser/sections/placeholders.html:67), 67–92 | `placeholders-animation-title` | `placeholders-documented-animation` | Placeholder animations in Bootstrap's markup |
| S10 | [images.html](/home/user/veneer/app/browser/sections/images.html:48), 48–70 | `images-thumbnail-title` | `images-documented-thumbnail` | Image thumbnail in Bootstrap's markup |
| S11 | [navbar.html](/home/user/veneer/app/browser/sections/navbar.html:136), 136–158 | `navbar-open-title` | `navbar-documented-text` | Navbar text with a link |
| Accordion | [accordion.html](/home/user/veneer/app/browser/sections/accordion.html:96), 96–142 | `accordion-default-title` | `accordion-documented` | Accordion in Bootstrap's markup |

All added figures use the prescribed chrome and normal-flow wrapper, with no figure ID or style attribute. S5 retains six `h1` elements; S9’s wrapper carries `aria-hidden="true"`; S10 has no width or height attribute. The corpus’s bare descendants remain bare. On the built page, S1–S11 match the corpus’s DOM after whitespace normalization; no page ID or added caption title collides. No ownership, required-list, admission-rule, section-title, or lead change was needed.

S7’s caption is the following exact string, with `mb-2` inside a `code` element:

```html
Bootstrap only and without the layer: the list and each description keep the reboot's bottom margin. With the layer: preflight removes both margins, and the consumer adds a margin utility such as <code>mb-2</code>.
```

The built-page readings use Chromium 141.0.7390.37, light mode, and a 1280 × 800 viewport. The face labels come from `FACES` at launch.

| Face button | Outer `dl.row` margin-bottom | First `dd.col-sm-9` margin-bottom |
| --- | --- | --- |
| Bootstrap | 16px | 8px |
| Tailwind, no layer | 16px | 8px |
| Tailwind + layer | 0px | 0px |

The measurement control adds `mb-0` under Bootstrap: both readings become 0px; removing it restores 16px and 8px. See [readings.json](/home/user/veneer/tmp/units/flip-specimens/readings.json).

Every other added caption reads: “Bootstrap's example markup, without a companion class or substitute tag that hides a departure.”

The shared names, read against `tests/fixtures/tailwindcss/comparison.json`’s `shared` array, are as follows. Every figure additionally carries the prescribed chrome’s shared names `bg-transparent`, `flex-wrap`, `mb-0`, and `mt-1`.

| Specimen | Shared names inside documented markup |
| --- | --- |
| S1 | `mb-0` |
| S2 | `mb-2` |
| S3 | None |
| S4 | None |
| S5 | None |
| S6 | None |
| S7 | None |
| S8 | `rounded` |
| S9 | `col-12` |
| S10 | None |
| S11 | None |
| Accordion | `collapse`, explicitly prescribed by Implementation item 3 |

S7’s `col-sm-3`, `col-sm-4`, `col-sm-8`, `col-sm-9`, and `text-truncate` names are not shared. No discretionary shared companion was added. See [shared.json](/home/user/veneer/tmp/units/flip-specimens/shared.json).

The accordion uses the unique container ID `accordion-documented`, panel ID `accordion-documented-harbor`, caption ID `accordion-documented-title`, and button text “Harbor arrival procedure.” Its body reads: “The harbor office assigns a pilot at the outer buoy and confirms the vessel's berth before the tug crews leave the east quay.”

The pre-edit accordion search found no whole-page count or index over `.accordion`, no `accordion-button` reference, and no `#accordion-default` reference in the two named files. The related readers remain unchanged:

- [tests/setupBrowser.ts:2150](/home/user/veneer/tests/setupBrowser.ts:2150): `collectFrozenShowcase` selects `figure .accordion`, then excludes roots containing live routes. The added accordion contains `data-bs-toggle` and is excluded.
- [tests/setupBrowser.ts:2787](/home/user/veneer/tests/setupBrowser.ts:2787): `readAccordionSelection` counts expanded controls only within `context.siblings`. The assertion at 2796 uses the same named controls and their `aria-controls`.
- [tests/setupBrowser.ts:2818](/home/user/veneer/tests/setupBrowser.ts:2818): traversal indexes the supplied sibling names. The scenario lists at 2845 explicitly name the existing default and flush groups. The added control changes neither list; it adds a tab stop between the groups.
- [tests/setupBrowser.ts:2310](/home/user/veneer/tests/setupBrowser.ts:2310), 2351, and 4625 select an accordion lifecycle profile, transition destination, or scenario table by family, without counting page accordions. The `buildAccordion` helper at 5258 constructs an independent fixture.
- [tests/app/browser/integration.test.ts:531](/home/user/veneer/tests/app/browser/integration.test.ts:531): the interaction selects “Returns and exchanges” and checks that the Accordion region contains its existing text. At 847, the paired-state case selects the accordion family’s declared scenario. Neither reading indexes the added figure.

The section test file’s case disposition extends the archive’s [cases.md](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-showcase/cases.md), “tests/app/browser/sections/integration.test.ts”:

| Case | Disposition |
| --- | --- |
| `%s shows every class it owns and only admitted classes` | Kept unchanged; runs over the grown fragments with the same admission rule. |
| `places each documented specimen directly after the figure it complements` | Added; checks each figure’s section, unique slug, exact caption title, and preceding caption title. Swapping each figure with its predecessor makes the same predecessor assertion throw; the control restores the order. |
| `places each Tailwind specimen in the copy order with its caption title` | Kept unchanged. |
| `keeps chrome classes off every replaced name` | Kept unchanged, including its planted controls. |
| `reports a removed owned class, a planted class, a style attribute, and a hidden element` | Kept unchanged. |
| `keeps every frozen-state specimen off the engine routes, and reports a planted route` | Kept unchanged. |
| `admits the icon tokens the icon templates name, and no other bi- token` | Kept unchanged. |

2. **Acceptance criteria**

The launch status was clean. The launch log was:

```text
527ea39 Harden the flip's proofs: controls, hazard witnesses, overrides, titles, switch names
ca2c90e Compact sticky showcase header with short face labels
473edd6 Rewrite the Tailwind and showcase prose for the flipped layer
```

The baseline commands ran before editing, with npm 11 first on `PATH`.

| Baseline command | Measured | Exit | Failing titles |
| --- | --- | --- | --- |
| `npm run test:app:browser` | 8 files, 236 tests passed; 94.89s | 0 | None |
| `npm run test:setup:browser` | 2 files, 134 tests passed; 134.53s | 0 | None |

The acceptance commands ran in the brief’s order, without output filters.

| Criterion and command | Expected | Measured | Exit |
| --- | --- | --- | --- |
| 1. `npm run check` | Typechecks pass | Root, source, and app checks pass | 0 |
| 2. `npm run lint:check` | No lint errors or warnings | Pass | 0 |
| 3. `npm run format:check` | All matched files formatted | 357 files pass | 0 |
| 4. `npm run test:app:browser` | Browser app tests pass | 8 files, 237 tests pass; 96.37s | 0 |
| 5. `npm run build:app:browser` | Browser page builds | 114 modules; build completes in 785ms | 0 |
| 5. `npm run test:setup:browser` | Observe specimen readings and partition checks passing | 2 files, 134 tests pass; 139.04s; no failing title | 0 |
| 6. `git diff --check` | No whitespace errors | No output; also passes after showcase generation | 0 |
| 7. `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` | Both equal launch digests | Exact equality, including after showcase generation | 0 |
| 8. `npm run build:showcase` | Rebuild after preceding gates pass | 113 modules; single-file build completes in 891ms | 0 |
| 8. `sha256sum /home/user/veneer/showcase/browser.html` | Record rebuilt digest | `4b257b2f1412add97cee095eb2d6449c6b114a9b1a50adcfec7944b774bfcd76` | 0 |

The scoped command `npx vitest run --config vite.config.ts --project app:browser tests/app/browser/sections/integration.test.ts -t 'section census'` passes 78 tests in 13.55s, exit 0. The initial browser build for S7 readings also exits 0. `node tmp/units/flip-specimens/readings.ts` exits 0 with the readings and structural comparisons reported earlier.

No gate failed, so there is no failed-gate output to reproduce. Both browser builds print Vite’s warning that the minified chunk exceeds 500 kB; both exit 0.

3. **Specimen-to-row map**

This table extends the showcase archive’s [curation.md](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-showcase/curation.md) with every row in the corpus’s § 2 “Rows the fixed point is expected to derive.” These are carriers for the following fixed-point unit, not sheet changes made here. The corpus’s final ruling excludes the S7 rows.

| Corpus form | Expected class or selector | Specimen and element | Longhands / binding ruling |
| --- | --- | --- | --- |
| reboot | `alert-heading` | S1: `h4.alert-heading` | font-size, font-weight, margin-bottom |
| reboot | `card-subtitle` | S2: `h6.card-subtitle.mb-2.text-body-secondary` | font-weight |
| reboot | `card-header` | S3: `h5.card-header` | font-size, font-weight |
| reboot | `dropdown-header` | S4: `h6.dropdown-header` | font-weight |
| reboot | `display-6` | S5: `h1.display-6` | margin-bottom |
| reboot | `list-inline` | S6: `ul.list-inline` | margin-bottom |
| reboot | `row` | S7: outer and nested `dl.row` | **No row under final corpus ruling**; consumer owns margin-bottom. |
| reboot | `col-sm-9` | S7: outer `dd.col-sm-9` elements | **No row under final corpus ruling**; consumer owns margin-bottom. |
| reboot | `col-sm-8` | S7: nested `dd.col-sm-8` | **No row under final corpus ruling**; consumer owns margin-bottom. |
| reboot | `figure` | S8: inner `figure.figure` | margin-bottom |
| reboot | `placeholder-wave` | S9: `p.placeholder-wave` | margin-bottom |
| restore | `img:where(.img-thumbnail)` | S10: `img.img-thumbnail` in normal flow | display |
| scoped | `:where(.navbar-text) a` | S11: bare `a` inside `span.navbar-text` | text-decoration-line, text-decoration-color; fixed point decides. |

The corpus also lists margin-block-end alongside margin-bottom. These added carriers extend already-covered archive rows:

| Existing row | Added carrier |
| --- | --- |
| `card-title` | S2 and S3: `h5.card-title` |
| `card-text` | S2 and S3: `p.card-text` |
| `card-link` | S2: both `a.card-link` elements |
| `display-1` through `display-5` | S5: corresponding `h1` elements |
| `img:where(.figure-img)`, `img:where(.img-fluid)` | S8: `img.figure-img.img-fluid.rounded` |
| `placeholder-glow` | S9: `p.placeholder-glow` |
| `accordion-header` | Accordion: `h2.accordion-header` |
| `button:where(.accordion-button)` | Accordion: `button.accordion-button` |

4. **Digests**

The full SHA-256 readings are:

| Artifact | Launch | Final |
| --- | --- | --- |
| `dist/src/bootstrap/index.css` | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| `dist/src/tailwindcss/index.css` | `22f33114084c835a177ed2d8cf971670b75eabbd309d96915e62108b3146cf43` | `22f33114084c835a177ed2d8cf971670b75eabbd309d96915e62108b3146cf43` |
| `showcase/browser.html` | `db52837f85eead1457a0504e85e551dd981245c7fabbf1c1d464eec1241e48e4` | `4b257b2f1412add97cee095eb2d6449c6b114a9b1a50adcfec7944b774bfcd76` |

The rebuilt showcase’s build-id line is at 37275:

```html
		<meta name="build-id" content="3eeda9d0c9dced993fccaa36235206fc98caed5ecaee9a2b67ebc9850642223e" />
```

5. **Browser setup observations**

Neither `npm run test:setup:browser` run has a failing title. Both pass 134 tests. The specimen readings and partition checks pass after the additions. The existing caption readings match the baseline at 1280 and 390 px, and the alignment reading remains `["left","left","left"]` at 768 px. S7’s live readings are reported in item 1; this unit does not add a `TAILWIND_READINGS` row, which the brief assigns to `flip-preservation`.

6. **Edited files and final status**

Formatted only these owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`: `app/browser/sections/accordion.html`, `alerts.html`, `card.html`, `dropdowns.html`, `figures.html`, `images.html`, `navbar.html`, `placeholders.html`, and `typography.html`, plus `tests/app/browser/sections/integration.test.ts`. Formatting exits 0. The fragment and test diff contains 475 inserted lines and no deleted line. The showcase changes only through `npm run build:showcase`.

Scratch scripts and evidence are under `tmp/units/flip-specimens/`. No source sheet, record, constant, setup helper, journey test, guide, config, manifest, lockfile, or Tailwind fragment was edited. No agent was spawned and no commit was made.

The final `git status --porcelain` is:

```text
 M app/browser/sections/accordion.html
 M app/browser/sections/alerts.html
 M app/browser/sections/card.html
 M app/browser/sections/dropdowns.html
 M app/browser/sections/figures.html
 M app/browser/sections/images.html
 M app/browser/sections/navbar.html
 M app/browser/sections/placeholders.html
 M app/browser/sections/typography.html
 M showcase/browser.html
 M tests/app/browser/sections/integration.test.ts
```
