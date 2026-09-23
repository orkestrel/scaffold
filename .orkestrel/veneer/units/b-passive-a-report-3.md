# Unit B-PASSIVE-A-3 — report

The brief `tmp/units/b-passive-a-brief-2.md` is complete. Every finding it names is closed in the owned
files. Both named mutations ran red and green again. Every badge, breadcrumb, and close frame was
regenerated for the four variants after the last edit. Two gates stay red, each on a known blocker
outside this unit's files: `test:app` (the `ButtonSection.test.ts` standing blocker, plus the
button-host consequence in the shared `Showcase.test.ts`, whose exact patch is in § Shared-file patch)
and `test:setup` (the setupServer Set literal, plus the shared-block sweep that B-SWEEP replaces).

## State at resumption

Readings taken at 2026-09-23 00:15 UTC, before any edit. The worktree was compared file by file
against round 1's tree, which was rebuilt from `/home/user/scaffold/tmp/audit/ba.diff` applied to
`3a9202a` in the scratchpad.

- The three partials were byte-identical to round 1, so no transient plant had been left in place.
  SHA-256 values: `_badge.scss` `67a589a7…52c2b4`, `_breadcrumb.scss` `60dfab79…780854`, and
  `_close.scss` `d3181b21…2ec1a3`.
- Files that the interrupted round changed: `app/browser/constants.ts`, `guides/veneer.md`,
  `tests/app/browser/integration.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`,
  `tests/setupBrowser.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, the
  `BadgeSection.test.ts` and `CloseSection.test.ts` proofs, and the `badge.test.ts`,
  `breadcrumb.test.ts`, and `close.test.ts` proofs.
- `format:check`, `lint:check`, and `check` all exited 0 on that tree.

| Finding | Ruling at resumption |
| --- | --- |
| 1 Analyst 3 (close hover binding) | **Closed in part.** The case is present (`close control states > reads the hover opacity from the variable a consumer retunes through a scope of their own`). No mutation reading exists. |
| 2 Reviewer F1 (badge rationale) | **Closed in part.** The `BADGE_GEOMETRY_CASES` doc block is rewritten, the separating case is added, and the case comment is corrected. No mutation reading exists. |
| 3 Analyst 8 (specimens and scenarios) | **Closed in part.** The `Badge on a button` specimen is present and asserted in `BadgeSection.test.ts`. `CASCADE_KEYS` has rows for `badge-word`, `badge-at-heading-scale`, `badge-collapsed` (region `.table-dark td`), `badge-on-a-button`, and `breadcrumb-single-step`. Frames were on disk from 23:44 to 23:47, after the last source edit at 23:43. However, the `Badge on a button` frame showed the bare button's dark label on the dark cell, and it was barely readable. |
| 4 Analyst F1 (helper placement) | **Closed.** `mountBadge`, `mountTrail`, and `mountClose` are exported from `tests/setupBrowser.ts` with TSDoc, inventory rows, and a `component mounts` describe. The function assigned inside the test callback in `setupStyles.test.ts` is replaced by a `for…of` over literal rows. |
| 5 Reviewer F2 (inverted close text) | **Closed** in `constants.ts` and `CloseSection.test.ts`. The frame still needed a fresh reading. |
| 6 Reviewer R2 (close journey case) | **Not closed.** The case re-staged and re-read after each shot, but it only *recorded* the hover reading. Every manifest showed `"framedHover":false,"framedHovered":"0.5"`, so the `close-control-hover` frame was a resting frame under a hover name. |
| 7 Analyst 6 (guide) | **Closed in part.** The sentences were narrowed and `active` and `disabled` were written in, but two lines ran past the wrap width, the close section still said "refusal states" and "each refusal", and the badge sentence read awkwardly. |

## Per finding

### 1 — close hover binding

- **Change:** carried as found. The case retunes `--bs-btn-close-hover-opacity: 0.6` through a
  `.retuned .btn-close` rule, drives hover, and asserts `0.6`.
- **Mutation:** in `_close.scss`, `.btn-close:hover` was changed to `opacity: 0.75;`. SHA-256
  `d3181b21…2ec1a3` became `b05ba4c2…5d3aa`.
- **Red:** `npm run test:src:styles` exited 1 with 1 failed and 454 passed. The only failure was the
  named case: `expected '0.75' to be '0.6'`.
- **Revert:** the exact reverse edit restored SHA-256 `d3181b21…2ec1a3`.
- **Green:** the same command exited 0 with 455 passed.

### 2 — badge geometry rationale

- **Change:** carried as found. The case is `badge geometry > resolves the recorded padding against
  the badge size rather than the host size`. It uses a 16px host,
  `scene.load('.badge { --bs-badge-font-size: 2em; }')`, and asserts padding-left `20.8` and
  padding-top `11.2`.
- **Mutation:** the padding was written as `0.4875em` of the host:
  `--bs-badge-padding-x: calc(0.4875em / (var(--bs-badge-font-size) / 1em));` and
  `--bs-badge-padding-y: calc(0.2625em / (var(--bs-badge-font-size) / 1em));`. SHA-256
  `67a589a7…52c2b4` became `a0ce2303…8e56`.
- **Red:** `npm run test:src:styles` exited 1 with 1 failed and 454 passed. The only failure was the
  named case: `expected 7.8 to be close to 20.8`. Both `BADGE_GEOMETRY_CASES` rows passed under this
  mutation, which confirms the reviewer's point.
- **Revert:** the exact reverse edit restored SHA-256 `67a589a7…52c2b4`.
- **Green:** the same command exited 0 with 455 passed.
- **Extra reading behind the rewritten doc claim:** the padding was planted as the absolute `7.8px`
  and `4.2px` (SHA-256 `69c443d6…81ef`). `npm run test:src:styles` then exited 1 with 2 failed:
  `resolves the relative box on a '24px host'` (`7.8` against `11.7`) and the separating case. The
  revert restored `67a589a7…52c2b4`.

### 3 — specimens and scenarios

- **Change this round:** the `Badge on a button` host is now `class="btn btn-primary"`. The badge
  declares no fill and the bare `.btn` paints the body text, so the round-2 frame showed a near-black
  "Inbox" on the dark cell. The `BADGE_COPY` paragraph names the primary button.
  `BadgeSection.test.ts` asserts the `btn-primary` fill, and a comment gives the reason.
- **Scenarios registered in `CASCADE_KEYS`:** `badge-word`, `badge-at-heading-scale`,
  `badge-collapsed`, `badge-on-a-button`, and `breadcrumb-single-step`.
- **New red case:** `tests/app/browser/Showcase.test.ts > Showcase > mounts its sections after the
  region and destroys them before removing the nodes`, with
  `expected [ 'Primary', …(27) ] to strictly equal [ 'Primary', …(26) ]`, where the extra entry is
  `"Inbox 7"`. The red is in the shared `Showcase.test.ts`, not in `ButtonSection.test.ts` as the
  brief anticipated. § Shared-file patch has the fix, verified green.

### 4 — helper placement

Carried as found. `npm run test:setup:browser` exits 0 with 57 passed, including the
`component mounts` cases.

### 5 — inverted close specimen

Carried as found. The frame was regenerated: `close-inverted--light-1280.png` shows "Inverted
notice" beside the inverted mark.

### 6 — close journey case

- **Failing-first command:**
  `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --project journey:light-1280 -t 'drives the close control'`.
- **Red:** `expect(framedHover).toBe(true)` and `expect(framedHovered).toBe(hovered)` were added to
  the as-found case. The run reported 1 failed and 25 skipped: `expected false to be true`.
- **Change:** the hover now follows the Button ordering on the lifted specimen. The real
  `Close control` specimen moves to the document's start behind a comment marker, not a copy, because
  a copy would answer to the same accessible name. The case then stages the pane, hovers, asserts
  `:hover`, and stages reduced motion. It asserts `transition-duration` is `0s` at the shot. The
  first green attempt read `0.749994` because staging re-triggers the transition. The case then calls
  `FRAMES.place('close-control-hover', control, specimen)`, re-stages, re-reads `:hover` and the
  opacity, and asserts both. The specimen goes back to its place, and the focus frame stays a page
  frame, re-staged and asserted as before. `rest`, `hovered`, `focused`, and `rested` are asserted as
  `['0.5', '0.75', '1', '0.5']`. The `CLOSE_KEYS` remark in `tests/setup.ts` now states the split
  (hover is an element frame of the lifted specimen, focus is a page frame) and the reason for each.
- **Green:** the same command reported 1 passed and 25 skipped. All four manifests read
  `"framedHover":true,"framedHovered":"0.75","framedFocus":true,"framedFocused":"1"`.

### 7 — guide

- § Badge classes: "The font size and the padding are relative, and so is the `em` box they make."
  The `-1px` button offset is named as absolute.
- § Close classes: the `em` box scales with the text, and the radius and focus shadow read `rem`.
  "refusal states" became "`disabled` states". "A control is `disabled` through the `disabled`
  attribute and through the `disabled` class alike, and each form removes …".
- § Breadcrumb classes: already names the `active` class and the `active` item. It only needed a
  reflow.
- All three sections are wrapped at the file's width.

## Touched files

This round changed these files:

- `tests/app/browser/integration.test.ts`: the close case rewritten per finding 6.
- `tests/setup.ts`: the `CLOSE_KEYS` remark states the frame-scope split.
- `guides/veneer.md`: the three sections narrowed, the state words written, and the lines wrapped.
- `app/browser/constants.ts`: the button host is `btn btn-primary` and the copy names it.
- `tests/app/browser/sections/BadgeSection.test.ts`: asserts the filled host.

The other round-2 edits are carried as found and were ruled on in § State at resumption. Diffstat of
tracked files against `3a9202a`: `16 files changed, 900 insertions(+), 80 deletions(-)`.

## Gates

All gates were run from `/home/user/veneer-ba` after the final edit.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | all files correctly formatted |
| `npm run lint:check` | 0 | — |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | — |
| `npm run test:src:styles` | 0 | 455 passed |
| `npm run test:setup:browser` | 0 | 57 passed |
| `npm run test:app` | 1 | 2 failed, 30 passed: `ButtonSection > declares a specimen for every button variant the shipped cascade carries` (standing blocker) and `Showcase > mounts its sections after the region and destroys them before removing the nodes` (finding 3's consequence) |
| `npm run test:conformance` | 0 | 17 passed |
| `npm run test:guides` | 0 | 18 passed |
| `CAPTURE=1 npm run test:journey -- --project journey:light-1280` | 0 | 26 passed |
| `… journey:dark-1280` | 0 | 26 passed |
| `… journey:light-390` | 0 | 26 passed |
| `… journey:dark-390` | 0 | 26 passed |

The following readings are observations, not criteria:

- `npm run test:setup` exits 1 with 2 failed and 162 passed. The failures are
  `server setup > skips engine and CSS obligations whose Proof cell is a dash` (the Set literal) and
  `styles setup > carries no shared written declaration block across style partials`, which D15's
  `findDuplication` gate replaces when B-SWEEP lands.
- `npm run test:policy` exits 0 with 109 passed and 1 skipped.
- The whole concurrent `npm run test:journey` was not run.
- Load average during the journeys was 3 to 7, with sibling units live.

## Frames

The four variants were regenerated serially, and every frame in `tmp/capture/states` postdates
00:38. There is one frame per scenario at each of `light-1280`, `dark-1280`, `light-390`, and
`dark-390`:

```text
badge-at-heading-scale--<variant>.png
badge-collapsed--<variant>.png
badge-counter--<variant>.png
badge-on-a-button--<variant>.png
badge-word--<variant>.png
breadcrumb-single-step--<variant>.png
breadcrumb-trail--<variant>.png
close-control--<variant>.png
close-control-focus--<variant>.png
close-control-hover--<variant>.png
close-inverted--<variant>.png
close-refused-by-attribute--<variant>.png
close-refused-by-class--<variant>.png
```

The accessibility artifact `<subject>--<variant>-accessibility.txt` is written for every subject
except the two driven close scenarios.

These frames were read by eye:

- `badge-on-a-button--light-1280.png`: a primary button "Inbox 7" on the dark row.
- `badge-collapsed--dark-390.png`: the "No unread shipments" cell.
- `close-inverted--light-1280.png`: "Inverted notice" beside the white mark.
- `close-control-hover--light-1280.png` and `close-control-hover--dark-1280.png`: the lifted
  control.
- `breadcrumb-single-step--light-390.png`: "Home".
- `close-control-focus--dark-390.png`: the page frame.

## Shared-file patch — `tests/app/browser/Showcase.test.ts`

The patch was verified on a scratch copy of this tree with hard-linked `node_modules`. The
`app:browser` project then reported 1 failed and 31 passed, the failure being the `ButtonSection`
blocker alone. `tsc --noEmit --project tsconfig.json` exited 0, `vue-tsc` on the app configuration
exited 0, and `oxlint` and the `oxfmt --check` on the file both exited 0.

```diff
@@ -1,6 +1,7 @@
 import {
 	BADGE_SPECIMENS,
 	BREADCRUMB_SPECIMENS,
+	BUTTON_COPY,
 	BUTTON_SPECIMENS,
 	CLOSE_SPECIMENS,
 	CONTENT_SPECIMENS,
@@ -29,7 +30,7 @@
 	waitForState,
 } from '@orkestrel/test/browser'
 import { afterEach, describe, expect, it } from 'vitest'
-import { BUTTON_CLASS, mountShowcase } from '../../setupBrowser.js'
+import { BUTTON_CLASS, mountShowcase, readSubject } from '../../setupBrowser.js'
 
 afterEach(() => {
 	document.documentElement.removeAttribute('data-bs-theme')
@@ -99,7 +100,13 @@
 				].map((specimen) => specimen.name),
 			)
 			expect(readPerception('Showcase')).toBe('Explore the color mode with the Dark mode control.')
-			const specimens = [...host.querySelectorAll(`.${BUTTON_CLASS}`)]
+			// The Button specimens are the Buttons region's own hosts. A markup section can render the
+			// button class as the composition its own key selects, the way the Badge section renders a
+			// badge inside a button, and that host is a specimen of the markup section rather than of
+			// the Button table.
+			const specimens = [
+				...readSubject(host, BUTTON_COPY.region).querySelectorAll(`.${BUTTON_CLASS}`),
+			]
 			expect(specimens.map((element) => readName(element))).toStrictEqual(
 				BUTTON_SPECIMENS.map((specimen) => specimen.name),
 			)
```

The `ButtonSection.test.ts` exclusion patch is unchanged from round 1's Deviation 3.

## `git status --porcelain`

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/ledger/departures.md
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/BadgeSection.ts
?? app/browser/sections/BreadcrumbSection.ts
?? app/browser/sections/CloseSection.ts
?? src/styles/components/_badge.scss
?? src/styles/components/_breadcrumb.scss
?? src/styles/components/_close.scss
?? tests/app/browser/sections/BadgeSection.test.ts
?? tests/app/browser/sections/BreadcrumbSection.test.ts
?? tests/app/browser/sections/CloseSection.test.ts
?? tests/src/styles/components/badge.test.ts
?? tests/src/styles/components/breadcrumb.test.ts
?? tests/src/styles/components/close.test.ts
```

This round changed no path beyond round 2's set. `Showcase.test.ts`, `departures.md`, and the other
round-1 paths are byte-identical to round 1. No `tmp/probe/` exists.

## Partials SHA-256

| Partial | Before this round | After this round |
| --- | --- | --- |
| `_badge.scss` | `67a589a7563afd961571fe9f1293e5d766ba3a479d59cef040620e82b352c2b4` | the same |
| `_breadcrumb.scss` | `60dfab79fe3c6cf310264a852da7b5a188d1a0d098486dc299010ce3d3780854` | the same |
| `_close.scss` | `d3181b210d34e372562fefc93476232fb943d9b1b29cde7c1462049b1e2ec1a3` | the same |

## Deviations

1. **Finding 6 went beyond re-staging.** Expected: re-stage and re-read the states after each shot.
   Found: re-staging alone reads the hover as lost, because the in-place control sits at the foot of
   the 8000-pixel document. The measured red is in § Per finding 6. Done: the hover frame is taken
   on the lifted specimen with the Button ordering, which is reviewer claim 8's own remedy, and the
   focus frame stays a page frame. The change stays inside the owned close case and the `CLOSE_KEYS`
   block. The frame scope is recorded as an ancillary choice this unit settled.
2. **The button-host red is in the shared `Showcase.test.ts`, not in `ButtonSection.test.ts`.**
   Reported with the verified patch.
3. **The badge button host is `btn btn-primary`.** This is the specimen copy the deviation contract
   lets this unit settle. It was chosen for legibility, and the frame confirms the result.

These observations are outside this unit's scope and are carried to the Orchestrator:

- The § Tests stem table in `guides/veneer.md` lists none of the round-2 scenarios or the driven and
  refused close scenarios. That section was outside the three owned sections. The carrier is
  unassigned.
- The comment in `_badge.scss` says the font size is relative to "the badge's own inherited font
  size", but the font size is `0.75em` of the host. The partial had to stay byte-identical, so this
  round left it. The carrier is unassigned.
