# Unit COLLAPSE (`co`) report — successor brief 2

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-co` (branch `unit/co` over
`87ff1d0`). Effective brief: `co-brief-2.md` over `b-collapse-co-brief.md`, plus the
Orchestrator's mid-campaign ruling on `.collapsing` (no specimen carries an inline style).

## Outcome

The `collapse` and `collapsing` keys ship in `_collapse.scss` exactly as the pinned inventory
records them. The four owned source and proof files are written, and `collapse` is on the exclusion
line in the three owned Tailwind files. Every other change is a report-only patch at the end of this
report.

Three stops were resolved inside scope and are recorded under § Deviations:

- **Criteria 2–6 need shared files.** They cannot go green in the worktree while the shared files
  are report-only. For example, the styles proof reads the built cascade, which `src/styles/index.scss`
  must load. So every gate ran in a scratch copy of the worktree with the returned patches applied.
  The worktree's own shared files are untouched.
- **`tests/fixtures/tailwind/markup.html` is needed but not owned.** Criterion 6 needs this file,
  and the brief's Owned row does not grant it. It is returned as a patch.
- **The mid-campaign ruling is applied.** No specimen carries an inline style. The `.collapsing`
  class renders no specimen and no frame (D17). It is proved on probe elements in the cascade proof.

## Touched files (owned)

| File | Summary |
| --- | --- |
| `src/styles/components/_collapse.scss` (new, 31 lines) | The hiding rule, the closing box, and the horizontal compound, with each transition written through the `transition` mixin at the release's `0.35s ease` value. |
| `tests/src/styles/components/collapse.test.ts` (new, 205 lines) | The cascade proof: the written selectors, the declared closing box and its reduced-motion twin, hidden and shown display, the clip with a hit test below the edge, the zero box, the horizontal compound against a nested element, both transitions at rest and staged, and every state inside a dark island. |
| `app/browser/sections/CollapseSection.ts` (new, 20 lines) | The `SpecimenSection` subclass fed by `COLLAPSE_COPY` and `COLLAPSE_SPECIMENS`. |
| `tests/app/browser/sections/CollapseSection.test.ts` (new, 123 lines) | The section contract, the resting classes reaching the region, no `.collapsing` specimen, no inline style, no trigger, each panel's state reading, and destruction. |
| `tests/setup.css` | `collapse` joins the `@source not inline` exclusion line. |
| `tests/fixtures/tailwind/consumer.css` | The same line. |
| `tests/fixtures/tailwind/preflight.css` | The same line. |

Diffstat (`git -C /home/user/veneer-co diff --stat 87ff1d0` plus the untracked files): 3 files
changed, 3 insertions, 3 deletions. The untracked files are the four new files listed in the
preceding table. `git status --porcelain` shows exactly those seven paths. The baseline logs the
first run wrote under `tmp/probe/` were moved to `co-instruments/co-baseline-conformance.log.txt` and
`co-instruments/co-baseline-styles.log.txt`, and `tmp/probe/` was removed.

## Unknowns, answered

- **Inline style on a specimen.** The shell renders specimen markup through `innerHTML` and the
  showcase declares no CSP, so an inline style would survive. The journey's census case
  (`reads the mounted class and style populations`) refuses one, so under the mid-campaign ruling
  no specimen carries an inline style. `CollapseSection.test.ts` asserts
  `region.querySelector('[style]')` is `null`.
- **Shared-name enumerations.** `grep -rn "caption-bottom caption-top\|caption-top" tests/` finds
  the exclusion line only in `tests/setup.css` and the two owned fixtures. No file under
  `tests/service/tailwind/**` and no case in `tests/setupServer.test.ts` enumerates the shared
  names, so no service proof is owned or patched. The consumer proof enumerates the shared set by
  requiring an element per name in `tests/fixtures/tailwind/markup.html`. That fixture is patched
  (see § Deviations).

## Proof matrix

Readings are from the scratch copy with every returned patch applied. The mutation log is
`co-instruments/logs/mutations.log.txt`. Each mutation was applied to one file, rebuilt, run, and
restored to a matching SHA-256.

| Recorded selector and condition (key) | Proof case | Distinguishing mutation → red cases | Specimen | Capture scenario |
| --- | --- | --- | --- | --- |
| `.collapse:not(.show)`, no condition (`collapse`) | `hides a collapse until the show class is set, and leaves the shown panel its own display`; `writes the recorded collapse and collapsing selectors and no other rule on their classes`; `resolves every state the same inside a dark island as inside a light one` | `:not(.show)` dropped → 4 red (those three plus `closes a panel carrying no size of its own to a zero-height box`); a dark-island retune added → 2 red (the island case and the selector case) | `Collapse hidden`, `Horizontal collapse hidden`; the shown pair as the contrast | `collapse-hidden`, `horizontal-collapse-hidden` (selector `.card:has(> .collapse)` or `.card:has(> .collapse-horizontal)`, property `height`; the hidden panel's own box clips to no pixel) |
| `.collapse.show`, the shown state (no rule of its own) | the same hide/show case (shown `display` is the element's own, `block` or `inline`); `CollapseSection > renders each panel in the state its specimen names` | the shown specimen drops `show` → 1 red; the horizontal shown specimen drops `show` → 1 red | `Collapse shown`, `Horizontal collapse shown` | `collapse-shown` (`.collapse.show`, `display`), `horizontal-collapse-shown` (`.collapse-horizontal.show`, `display`) |
| `.collapsing`, no condition (`collapsing`): `height: 0`, `overflow: hidden`, `transition: height 0.35s ease` | `declares the recorded closing box at rest and no transition under the reduced-motion condition`; `clips a closing panel to the size set on it and lets the page show through below` (the `readHit` hit test at the child's centre, below the panel's bottom edge, lands outside the child); `closes a panel carrying no size of its own to a zero-height box` | `overflow` dropped → 3 red; `height: 0` dropped → 2 red | none: declined under the mid-campaign ruling, because its resting paint is empty (D17) | none (declined; recorded in the `CASCADE_KEYS` remarks and § Collapse classes) |
| `.collapsing` under `@media (prefers-reduced-motion: reduce)`: `transition: none` (`collapsing`) | the declared case (condition text equals `REDUCED_MOTION`); `transitions the closing size and collapses that transition under the reduced-motion preference` (`0.35s` at rest, `0s` under `stageMedia({ motion: false })`, `0.35s` after `releaseMedia()`) | a bare `transition` without the mixin → 2 red | none (declined) | none |
| `.collapsing.collapse-horizontal`, no condition (`collapse` and `collapsing`): `width: 0`, `height: auto`, `transition: width 0.35s ease` | the declared case; `closes a horizontal panel on its width alone, and only where both classes sit on one element` (zero width, content height, and a nested `.collapse-horizontal` keeping its width and `transition-property: all`) | written as the descendant `.collapsing .collapse-horizontal` → 5 red | none (declined); `.collapse-horizontal` renders at rest in the horizontal pair | none |
| `.collapsing.collapse-horizontal` under `@media (prefers-reduced-motion: reduce)`: `transition: none` (`collapse` and `collapsing`) | the declared case; the transitions case | a bare `transition` without the mixin → 2 red | none (declined) | none |
| The whole key set against the ledger | `cascade ledger > records every measured value difference in the guide ledger` (conformance) | `height 0.35s ease` → `height 0.3s ease` → 1 red, printing `collapsing \| .collapsing \| transition \| — \| height 0.35s ease \| height 0.3s ease \| declared` | — | — |

Failing-first evidence for the cascade proof: with the barrel line absent from the build, the
following command exits 1 with `Tests 8 failed (8)`, and with the line present it exits 0 with
`Tests 8 passed (8)`. Both runs are in the scratch copy.

```text
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/collapse.test.ts
```

Criterion 3: the built cascade (`dist/src/styles/index.css`, minified to one line, so
`grep -c` reads `1`) carries these rules and no other rule naming `.collapse` or `.collapsing`:
`.collapse:not(.show){display:none}`, `.collapsing{height:0;transition:height .35s;overflow:hidden}`,
`@media (prefers-reduced-motion:reduce){.collapsing{transition:none}}`,
`.collapsing.collapse-horizontal{width:0;height:auto;transition:width .35s}`, and
`@media (prefers-reduced-motion:reduce){.collapsing.collapse-horizontal{transition:none}}`.
`grep -o '\.collaps[a-z-]*'` tallies `.collapse` once, `.collapse-horizontal` twice, and
`.collapsing` four times. The inventory records the same set: `collapse` with 3 selector entries
(`.collapse:not(.show)`, the horizontal compound, and its reduced-motion twin) and `collapsing` with
4 (`.collapsing`, its twin, the horizontal compound, and its twin).

## Ledger rows

None. With the keys in the `listed` literal, the conformance ledger gates (departures, additions,
deferrals, and compatibility presence) are green. So the comparison reports no departure and no
addition for `collapse` or `collapsing`, and no `#### collapse` or `#### collapsing` table is
created. The ledger mutation in the preceding matrix shows that the comparison reads the key.
`0.35s ease` is written as the release's literal because no motion token resolves to `0.35s`. The
easing alone is not routed through `--vn-ease-standard`, because that would record a `tokenized`
departure while the duration still ignores `--vn-factor-motion`.

## Resting rows (`CASCADE_KEYS`, appended at the end) and subjects

| Scenario | Subject | Selector | Property |
| --- | --- | --- | --- |
| `collapse-shown` | `Collapse shown` | `.collapse.show` | `display` |
| `collapse-hidden` | `Collapse hidden` | `.card:has(> .collapse)` | `height` |
| `horizontal-collapse-shown` | `Horizontal collapse shown` | `.collapse-horizontal.show` | `display` |
| `horizontal-collapse-hidden` | `Horizontal collapse hidden` | `.card:has(> .collapse-horizontal)` | `height` |

A hidden row names its card, which hosts the hidden panel. This follows the registry's
`display: none` rule, the same rule the `badge-collapsed` row follows. No driven row is added, and
no `CaptureState` member is added. The journey ran at all four variants without `CAPTURE=1` in the
scratch copy, and each exited 0 with `Tests 38 passed (38)`. That run includes the lifted-frame
equality over these rows and the census with no inline style. The capture run is the
Orchestrator's.

## Guide text (inside the `guides/veneer.md` patch)

- **§ Surface (R17):** "…so they stay that shape until the first engine component carrying a
  cancelable pre-change event lands." The B-COLLAPSE sentence is removed.
- **§ Files row:** `src/styles/components/_collapse.scss`, "The hidden and shown panel, the closing
  box on each axis, and their transitions in the components layer, read by
  `tests/src/styles/components/collapse.test.ts`." It follows the `_pagination.scss` row.
- **§ Tailwind:** `collapse` is added to both recipe fences, and one sentence names the `collapse`
  class and Tailwind's `visibility: collapse` utility.
- **§ Collapse classes:** placed before `### Button group classes`, because `collapse` loads before
  `button-group`. It covers both keys, states that the classes are set in markup, and points at
  § Compatibility for the plugin. It also records the declined closing specimen.
- **§ Compatibility:** a `collapse | selector` row and a `collapsing | selector` row follow the
  pagination rows. Neither key has a variable row, because the inventory's property map is empty.
  The Collapse `plugin` row follows the last engine row: `engine | plugin | Collapse: … Owner:
  J-ENGINE. | — | accepted`, with the obligation cell from terrain § B. The cell is kept within
  the table's existing column width, so the formatter re-pads no other row. The R8 sentence
  follows the table: "A `plugin` row records behavior the engine owns and no shipped Veneer module
  performs, while the classes that plugin sets ship in the cascade and render in markup."
- **§ Showcase:** one clause, "and a Collapse region follows the Input group region".
- **§ Tests:** a link to the collapse classes proof.

## Scoped gate exits

Worktree, owned files only, as they stand:

- `npm run format:check`: exit 0.
- `npm run lint:check`: exit 0.
- `npm run test:policy`: exit 0 (`109 passed | 1 skipped`).
- `npm run check`: exit 2. The only errors are `TS2724` in `CollapseSection.ts` and
  `CollapseSection.test.ts`, because `COLLAPSE_COPY`, `COLLAPSE_SPECIMENS`, and `CollapseSection`
  reach the barrel only through the shared patches.

Scratch copy (`co-unit-tools/gates.sh`, all returned patches applied; logs under
`co-instruments/logs/`):

- `npm run format:check`: exit 0.
- `npm run lint:check`: exit 0.
- `npm run check`: exit 0.
- `npm run build:src`: exit 0.
- The criterion-4 command: exit 0 (8 passed).
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CollapseSection.test.ts`:
  exit 0 (3 passed). The section proof runs in the `app:browser` project of `vite.config.ts`, the
  project its siblings use.
- `npm run test:app`: exit 0 (68 passed).
- `npm run test:setup`: exit 0 (250 passed).
- `npm run test:conformance`: exit 0 (21 passed).
- `npm run test:guides`: exit 0 (18 passed).
- `npm run test:policy`: exit 0.
- `npm run test:service`: exit 0 (18 passed).
- `npm run test:setup:browser`: exit 0 (65 passed).
- `npm run test:config`: exit 0.
- The whole styles project: exit 0 (766 passed).
- The journey at each variant: exit 0 (38 passed each).

Criterion 6 controls (consumer proof only):

- With `collapse` dropped from the consumer's line, the run exits 1 with 4 failed, and the pairing
  reports `collapse visibility: visible became collapse`.
- With the markup fixture at `87ff1d0`, the run exits 1 with 1 failed:
  `derives the shared class names, and mounts an element for every one of them` lists `collapse`
  as unmounted.

Baseline readings the first run took at `87ff1d0` (`co-instruments/co-baseline-*.log.txt`):
`test:conformance` 21 passed; the scoped styles run 51 passed over 3 files.

## Deviations

1. **The acceptance criteria need report-only files.**
   - Expected: criteria 2–6 green in the worktree.
   - Found: the styles proof reads `dist/src/styles/index.css` (`configs/src/vite.styles.config.ts`
     `setupFiles`), which carries the partial only when `src/styles/index.scss` loads it. The
     section needs `COLLAPSE_COPY` and `COLLAPSE_SPECIMENS` in `app/browser/constants.ts` and the
     barrel row. The guide, the `listed` literal, and the service markup fixture are shared as
     well.
   - Evidence: the worktree's `npm run check` exits 2 with `TS2724` on the missing exports. In the
     scratch copy, the collapse proof is red (8 of 8) before the barrel line and green after it.
   - Done: all owned work. Every shared change is a patch that `git apply --check` accepts on the
     worktree. Every gate is green in a copy with the patches applied (copied with hardlinked
     `node_modules`; no shared file in the worktree was edited).
   - Hypothesis: the brief's criteria assumed the B-PASSIVE shape, where shared files were
     writable in the worktree.
2. **`tests/fixtures/tailwind/markup.html` is off-limits in the brief.**
   - Found: it is off-limits under the brief's `tests/fixtures/**` exception list, and criterion 6
     requires it. The family record's off-limits entry excepts "COLLAPSE's Tailwind fixtures"
     without naming them, so the two documents disagree on this file.
   - Evidence: with the fixture at `87ff1d0`, the consumer proof fails
     `derives the shared class names, and mounts an element for every one of them` with `collapse`
     unmounted.
   - Done: returned as a one-line patch. The file is not edited.
3. **The baseline predates B-PASSIVE-ORDER.**
   - Found: `87ff1d0` does not carry B-PASSIVE-ORDER. Main (`72fdde4`) does, through `f898502`.
     The `index.scss` hunk of the patch against `87ff1d0` fails on main
     (`patch -p1 --dry-run`: `1 out of 1 hunk FAILED`). Every other hunk applies there.
   - Done: a post-BPO patch for `src/styles/index.scss` and `tests/conformance.test.ts` follows. It
     carries the barrel line, the `listed` addition, and the order-case extension, with the
     `transitions` token mapped to the `collapse` stem.
   - Evidence: in the scratch copy with that patch, `test:conformance` exits 0 (22 passed). With
     `collapse` loaded after `button-group`, the order case exits 1.
4. **The mid-campaign ruling on `.collapsing` is applied.**
   - Change: the brief's collapsing-height and collapsing-width specimens are replaced by
     `Horizontal collapse shown` and `Horizontal collapse hidden`. `.collapsing` renders no
     specimen and no frame, because its resting paint is empty (D17).
   - Proof: the class is proved on probe elements, through its declared and resolved readings
     under `stageMedia({ motion: false })`. The installed `stageMedia` function takes
     `MediaOptions`, and `REDUCED_MOTION` is the condition text the case compares.
   - Records: the decline is written in the `CASCADE_KEYS` remarks, in § Collapse classes, and in
     the `COLLAPSE_SPECIMENS` remarks.
5. **The journey's declared-table case needs a patch.** `tests/app/browser/integration.test.ts`
   case `names a specimen the showcase declares, or its own region, as every scenario subject`
   reddened on the four new subjects. It needs `COLLAPSE_SPECIMENS` in its import and its declared
   list, and that patch is included. No driven frame is added.
6. **Criterion 4's wording is read as follows.**
   - "`readPixels` below the bottom edge" is implemented as the installed `readHit` function on
     the clipped child's centre, which sits below the panel's edge.
   - "`grep -c`" on the minified cascade returns one line, so criterion 3 reports the rule list and
     an occurrence tally instead.
7. **§ Showcase may collide with CLOSE-GUIDE.** The guide patch adds one clause to § Showcase in
   the `87ff1d0` enumeration voice. If CLOSE-GUIDE's rewrite of § Showcase lands first, drop that
   clause.

Choices settled within scope:

- Specimen names and copy.
- The card host for every panel, so a hidden panel's frame is its header.
- The hidden rows' `.card:has(> …)` selectors with `height`.
- `collapse` after `col-12` on the exclusion line (the proof compares sorted names).
- The Files row after `_pagination.scss`.
- The compatibility rows after the pagination rows, and the plugin row after the last engine row.
- The literal `0.35s ease` value.

## ROADMAP.md

No patch. The family row and the J-ENGINE carrier rows already read as D41 fold 47 left them, and
the § Surface sentence now agrees with the carrier row for `emitEvent`, `bindEventMap`, and
`Delegate` ("J-ENGINE's first cancelable-event unit moves all three"). The family row closes at the
family's exit criterion, not at this unit.

## What the unit could not close

- **The capture run and its frames.** `CAPTURE=1 npm run test:journey` is the Orchestrator's run.
  The four registered scenarios were placed without capture at every variant.
- **`.collapsing` frames.** They are declined by ruling (D17). The class has no frame at any
  variant.
- **The worktree's own `npm run check`, styles, section, conformance, guide, and service gates.**
  These go green only after the shared patches integrate (Deviation 1).
- **A later `.fade` unit.** B-CROSS owns `.fade`, which also lives in the release's
  `transitions` partial. The post-BPO order case maps `transitions` to `collapse`, so the `.fade`
  unit rules on that mapping when it gives `.fade` a partial.

Instruments (Orchestrator scratchpad, not in the tree):

- `co-unit-tools/gates.sh`, `mutate.py`, `apply-guide.py`, `sync-owned.sh`, `section.md`,
  `plugin-cell.txt`, and `logs/`.
- The validation copy `co-unit-check/`, which holds hardlinked `node_modules`. Delete it with
  `rm -rf` on that directory only.
- Both directories sit under `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/`.

## Shared-file patches

Unified diff against `87ff1d0`. `git -C /home/user/veneer-co apply --check` accepts it. It changes
12 files (153 insertions, 7 deletions): `src/styles/index.scss`, `app/browser/constants.ts`,
`app/browser/index.ts`, `app/browser/Showcase.ts`, `tests/setup.ts`,
`tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`,
`guides/veneer.md`, and `tests/fixtures/tailwind/markup.html`. `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `tests/setup.test.ts`, and `ROADMAP.md` need no change.

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -61,6 +61,7 @@
 @use 'components/input-group';
 @use 'components/validation';
 @use 'components/pagination';
+@use 'components/collapse';
 @use 'components/button-group';
 @use 'components/progress' as progress-component;
 @use 'components/spinner';
--- a/app/browser/constants.ts
+++ b/app/browser/constants.ts
@@ -1690,3 +1690,48 @@
 			'<div class="container-fluid"><fieldset class="row"><legend class="col-5 col-form-label">Pickup</legend><div class="col-7"><input class="form-control" type="date" aria-label="Pickup date" value="2026-09-23"></div></fieldset></div>',
 	}),
 ])
+
+/** Holds the Collapse section's visible copy and accessible name. */
+export const COLLAPSE_COPY = Object.freeze({
+	region: 'Collapse',
+	paragraph:
+		'Compare a shown and a hidden panel, then the same pair carrying the horizontal class, each state set as a class in markup.',
+})
+
+/**
+ * Lists the collapse specimens the section renders, one state each, in render order.
+ *
+ * @remarks
+ * Each state is a class written in the markup, and no specimen carries a trigger: the classes are
+ * what this key ships, and the plugin that moves a panel between them is an engine obligation the
+ * guide's compatibility table records. Each panel sits inside a card under the header it belongs to,
+ * so a frame of a hidden panel is the header alone rather than an empty box. The horizontal pair
+ * renders the same as the vertical pair, because the horizontal class takes effect only beside the
+ * closing class.
+ *
+ * No specimen renders the closing class. A closing panel rests at zero height until an engine writes
+ * an inline size on it, and the showcase renders no inline style, so its frame would carry nothing;
+ * the `tests/src/styles/components/collapse.test.ts` file reads that class on its own elements.
+ */
+export const COLLAPSE_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
+	Object.freeze({
+		name: 'Collapse shown',
+		markup:
+			'<div class="card"><div class="card-header">Parcel 1042</div><div class="collapse show"><div class="card-body">Left the Harbor Street depot at 08:10. The courier expects to arrive before noon.</div></div></div>',
+	}),
+	Object.freeze({
+		name: 'Collapse hidden',
+		markup:
+			'<div class="card"><div class="card-header">Parcel 1043</div><div class="collapse"><div class="card-body">Waiting at the Harbor Street depot for the afternoon run.</div></div></div>',
+	}),
+	Object.freeze({
+		name: 'Horizontal collapse shown',
+		markup:
+			'<div class="card"><div class="card-header">Route 7</div><div class="collapse collapse-horizontal show"><div class="card-body">Carries every parcel bound for the north loop.</div></div></div>',
+	}),
+	Object.freeze({
+		name: 'Horizontal collapse hidden',
+		markup:
+			'<div class="card"><div class="card-header">Route 8</div><div class="collapse collapse-horizontal"><div class="card-body">Carries every parcel bound for the south loop.</div></div></div>',
+	}),
+])
--- a/app/browser/index.ts
+++ b/app/browser/index.ts
@@ -27,3 +27,4 @@
 export * from './sections/BreadcrumbSection.js'
 export * from './sections/CloseSection.js'
 export * from './sections/InputGroupSection.js'
+export * from './sections/CollapseSection.js'
--- a/app/browser/Showcase.ts
+++ b/app/browser/Showcase.ts
@@ -8,6 +8,7 @@
 import { ButtonSection } from './sections/ButtonSection.js'
 import { CardSection } from './sections/CardSection.js'
 import { CloseSection } from './sections/CloseSection.js'
+import { CollapseSection } from './sections/CollapseSection.js'
 import { ContentSection } from './sections/ContentSection.js'
 import { FormCheckSection } from './sections/FormCheckSection.js'
 import { FormControlSection } from './sections/FormControlSection.js'
@@ -114,6 +115,7 @@
 			new BreadcrumbSection(this.#main),
 			new CloseSection(this.#main),
 			new InputGroupSection(this.#main),
+			new CollapseSection(this.#main),
 		]
 	}
 
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -197,6 +197,10 @@
 	| 'Vertical group'
 	| 'Wrapping toolbar'
 	| 'Waving placeholder'
+	| 'Collapse shown'
+	| 'Collapse hidden'
+	| 'Horizontal collapse shown'
+	| 'Horizontal collapse hidden'
 
 /**
  * Names one state a journey drives its subject to, or reads that subject in.
@@ -373,6 +377,11 @@
  * the grow spinners and the `tests/src/styles/components/spinner.test.ts` file reads their running
  * timelines; what is declined here is the frame, because there is nothing in it to read.
  *
+ * The closing collapse box is declined for the same reason. A panel carrying the `collapsing` class
+ * rests at zero height until an engine writes an inline size on it, and the showcase renders no
+ * inline style, so the Collapse region renders no closing panel and the
+ * `tests/src/styles/components/collapse.test.ts` file reads that class on its own elements.
+ *
  * A key whose recorded rule resolves `display: none` at rest names the surrounding region rather
  * than the element the key ships: that element's own box clips to no pixel, so a frame declared on
  * it reads back nothing. Its declared region is the element that hosts it, and the collapse itself
@@ -1063,6 +1072,30 @@
 		selector: 'legend.col-form-label',
 		property: 'margin-bottom',
 	}),
+	Object.freeze({
+		scenario: 'collapse-shown',
+		subject: 'Collapse shown',
+		selector: '.collapse.show',
+		property: 'display',
+	}),
+	Object.freeze({
+		scenario: 'collapse-hidden',
+		subject: 'Collapse hidden',
+		selector: '.card:has(> .collapse)',
+		property: 'height',
+	}),
+	Object.freeze({
+		scenario: 'horizontal-collapse-shown',
+		subject: 'Horizontal collapse shown',
+		selector: '.collapse-horizontal.show',
+		property: 'display',
+	}),
+	Object.freeze({
+		scenario: 'horizontal-collapse-hidden',
+		subject: 'Horizontal collapse hidden',
+		selector: '.card:has(> .collapse-horizontal)',
+		property: 'height',
+	}),
 ])
 
 /**
--- a/tests/app/browser/Showcase.test.ts
+++ b/tests/app/browser/Showcase.test.ts
@@ -5,6 +5,7 @@
 	BREADCRUMB_SPECIMENS,
 	BUTTON_SPECIMENS,
 	CLOSE_SPECIMENS,
+	COLLAPSE_SPECIMENS,
 	CONTENT_SPECIMENS,
 	FORM_CHECK_SPECIMENS,
 	FORM_CONTROL_SPECIMENS,
@@ -111,6 +112,7 @@
 				'Breadcrumb',
 				'Close',
 				'Input group',
+				'Collapse',
 			])
 			expect(
 				[...host.querySelectorAll('[data-specimen]')].map((element) =>
@@ -142,6 +144,7 @@
 					...BREADCRUMB_SPECIMENS,
 					...CLOSE_SPECIMENS,
 					...INPUT_GROUP_SPECIMENS,
+					...COLLAPSE_SPECIMENS,
 				].map((specimen) => specimen.name),
 			)
 			expect(readPerception('Showcase')).toBe('Explore the color mode with the Dark mode control.')
--- a/tests/app/browser/index.test.ts
+++ b/tests/app/browser/index.test.ts
@@ -27,10 +27,13 @@
 			'CARD_SPECIMENS',
 			'CLOSE_COPY',
 			'CLOSE_SPECIMENS',
+			'COLLAPSE_COPY',
+			'COLLAPSE_SPECIMENS',
 			'CONTENT_COPY',
 			'CONTENT_SPECIMENS',
 			'CardSection',
 			'CloseSection',
+			'CollapseSection',
 			'ContentSection',
 			'FORM_CHECK_COPY',
 			'FORM_CHECK_SPECIMENS',
--- a/tests/app/browser/integration.test.ts
+++ b/tests/app/browser/integration.test.ts
@@ -45,6 +45,7 @@
 	BUTTON_SPECIMENS,
 	CARD_SPECIMENS,
 	CLOSE_SPECIMENS,
+	COLLAPSE_SPECIMENS,
 	CONTENT_SPECIMENS,
 	FORM_CHECK_SPECIMENS,
 	FORM_CONTROL_SPECIMENS,
@@ -1678,6 +1679,7 @@
 				BUTTON_SPECIMENS,
 				CARD_SPECIMENS,
 				CLOSE_SPECIMENS,
+				COLLAPSE_SPECIMENS,
 				CONTENT_SPECIMENS,
 				FORM_CHECK_SPECIMENS,
 				FORM_CONTROL_SPECIMENS,
--- a/tests/conformance.test.ts
+++ b/tests/conformance.test.ts
@@ -105,6 +105,8 @@
 			'btn-toolbar',
 			'card',
 			'col',
+			'collapse',
+			'collapsing',
 			'container',
 			'display',
 			'figure',
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -1345,6 +1345,8 @@
 				'btn-toolbar',
 				'card',
 				'col',
+				'collapse',
+				'collapsing',
 				'container',
 				'display',
 				'engine',
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -64,8 +64,8 @@
 `emitEvent` dispatches a bubbling, non-cancelable event and cannot express a cancelable one, and
 `bindEventMap` and `Delegate` are shaped around Button: the event map, the selector, and the engine
 each name that one component. `emitEvent`, `bindEventMap`, and `Delegate` are mechanisms with one
-consumer, so they stay that shape until a second component needs them. B-COLLAPSE is the unit that
-generalizes them, because Collapse is the first component carrying a cancelable pre-change event.
+consumer, so they stay that shape until the first engine component carrying a cancelable pre-change
+event lands.
 
 ## Methods
 
@@ -216,6 +216,7 @@
 | `src/styles/components/_input-group.scss`   | The input group row, its addon, sizes, squared corners, overlap, and lifts in the components layer, read by `tests/src/styles/components/input-group.test.ts`.                                                                                     |
 | `src/styles/components/_validation.scss`    | The validation scope, state classes, feedback, and tooltips in the components layer, read by `tests/src/styles/components/validation.test.ts`.                                                                                                     |
 | `src/styles/components/_pagination.scss`    | The pagination strip, its page links, their states, and the size classes in the components layer.                                                                                                                                                  |
+| `src/styles/components/_collapse.scss`      | The hidden and shown panel, the closing box on each axis, and their transitions in the components layer, read by `tests/src/styles/components/collapse.test.ts`.                                                                                   |
 | `src/styles/_reset.scss`                    | The universal box model, hidden state, and motion-aware root scrolling in the reset layer.                                                                                                                                                         |
 | `src/styles/elements/_html.scss`            | The document baseline in the elements layer.                                                                                                                                                                                                       |
 | `src/styles/elements/_body.scss`            | The body baseline in the elements layer.                                                                                                                                                                                                           |
@@ -357,7 +358,7 @@
 @import '@orkestrel/veneer/styles';
 /* Your own markup directory. */
 @source './src';
-@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container table");
+@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 collapse container table");
 ```
 
 The following recipe is the `preflight` profile, which takes the bare import so Tailwind's own reset
@@ -370,7 +371,7 @@
 @import '@orkestrel/veneer/styles';
 /* Your own markup directory. */
 @source './src';
-@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container table");
+@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 collapse container table");
 ```
 
 The workspace compiles the `tailwind` recipe as written. The `tests/fixtures/tailwind/consumer.css`
@@ -400,7 +401,10 @@
 rule for that name declares; a name Veneer declares important on some other longhand stays on the
 line, because that importance does not cover every longhand Tailwind's rule would otherwise win.
 The line withholds a name that stays on it from Tailwind's generation, so Veneer's declaration is
-the only one the page carries for it.
+the only one the page carries for it. The `collapse` class is one such name: Tailwind's `collapse`
+utility writes `visibility: collapse`, so a paired build that generated it would hide every shown
+panel, and [the consumer pairing](../tests/service/tailwind/consumer.test.ts) reads the shown panel
+its markup fixture carries resolving what the shipped cascade alone resolves for it.
 
 The `tests/setup.css` file is where the workspace writes that line. The
 profiles proof reads it from that file rather than repeating it,
@@ -825,6 +829,46 @@
 refused pointer, the density and radius factors, a consumer's own override, and the transition
 collapse under the staged preference.
 
+### Collapse classes
+
+The collapse key and the collapsing key ship whole: the hidden panel, the shown panel, and the
+closing box on each axis. Each state is a class set in markup. This section describes what each
+class renders, and § Compatibility records the plugin that moves a panel between the classes as an
+engine obligation.
+
+A panel carrying the `collapse` class without the `show` class resolves `display: none`, so it
+leaves the page and the accessible tree together. Adding the `show` class returns the panel to the
+display its own element carries: a panel on a `div` element is a block, and a panel on a `span`
+element is inline. No rule writes a display for the shown state, and the `collapse-horizontal` class
+changes nothing at rest, because its rule selects it only beside the `collapsing` class.
+
+The `collapsing` class is the box a panel is while it opens or closes. It zeroes the height and
+hides the overflow, so the panel clips its content to the height the element carries inline, and a
+panel carrying no inline height is a zero-height box. The `collapse-horizontal` class on the same
+element turns the clip onto the other axis: the width is zeroed, the height returns to `auto`, and
+the panel clips its content to the width the element carries inline. The horizontal rule is a
+compound selector, so a horizontal element nested inside a closing panel takes nothing from it.
+
+Each closing box transitions the size it clips, `height` or `width`, over the release's
+`0.35s ease` value. No published motion token resolves to `0.35s`, so the value is Bootstrap's
+literal rather than a motion token, and `--vn-factor-motion` does not rescale it. The transition is written
+through the `transition` mixin, so the reduced-motion rule the release records beside each one is
+emitted with it, and the duration resolves to `0s` under that preference. The hiding rule carries no
+transition, so a panel shown or hidden by its class changes state at once.
+
+No rule here paints a color, so every state resolves the same in either color mode.
+
+The Collapse region renders the shown and the hidden panel on each axis, each inside a card under
+its header. It renders no closing panel: a panel carrying the `collapsing` class rests at zero
+height until an engine writes an inline size on it, and no specimen carries an inline style, so a
+frame of it would carry nothing. The capture registry declines that frame the way it declines the
+grow spinners, and the cascade proof reads the class instead.
+
+`tests/src/styles/components/collapse.test.ts` reads each state in the browser: the written
+selectors, the hidden and the shown display, the clip under an inline height with a hit test below
+the panel's edge, the zero box under none, the horizontal compound against a nested element, both
+transitions at rest and under the staged preference, and every state inside a dark island.
+
 ### Button group classes
 
 The button group key ships whole, in its own partial after the vertical rule in the components
@@ -3935,6 +3979,8 @@
 | is-invalid       | variable       | The `--bs-form-select-bg-icon` property carries the invalid mark on a single-value select; its value and the icon map behind it are proved in `tests/src/styles/components/validation.test.ts`.                                                                                                                                                                                                                                                                  | —                     | shipped  |
 | pagination       | selector       | Every official `.pagination`, `.page-link`, and `.page-item` selector ships in the components layer; resolved geometry, states, and stacking are proved in `tests/src/styles/components/pagination.test.ts`.                                                                                                                                                                                                                                                     | —                     | shipped  |
 | pagination       | variable       | Every official `--bs-pagination-*` property is declared, and each size class redeclares its padding, font, and radius; overrides are proved in `tests/src/styles/components/pagination.test.ts`.                                                                                                                                                                                                                                                                 | —                     | shipped  |
+| collapse         | selector       | Every official `.collapse` selector ships in the components layer, the hiding rule and the horizontal closing box included; resolved display, clip, and motion are proved in `tests/src/styles/components/collapse.test.ts`.                                                                                                                                                                                                                                     | —                     | shipped  |
+| collapsing       | selector       | Every official `.collapsing` selector ships in the components layer, the horizontal compound and each reduced-motion twin included; resolved clip, size, and motion are proved in `tests/src/styles/components/collapse.test.ts`.                                                                                                                                                                                                                                | —                     | shipped  |
 | engine           | identity       | Cross-cutting engine: `VERSION` `'5.3.8'`; `DATA_KEY` `bs.${NAME}`; `EVENT_KEY` `.${DATA_KEY}`; `eventName(name)` returns `${name}${EVENT_KEY}`                                                                                                                                                                                                                                                                                                                  | —                     | accepted |
 | engine           | option         | Cross-cutting engine: `Default`/`DefaultType` inherited empty from `Config` unless a component overrides                                                                                                                                                                                                                                                                                                                                                         | —                     | accepted |
 | engine           | attribute      | Cross-cutting engine: `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last                                                                                                                                                                                                                                                                                                                                    | —                     | accepted |
@@ -3956,6 +4002,9 @@
 | engine           | option         | util/config.js: Base `Config` class; `Default: {}`, `DefaultType: {}`; `NAME` getter throws; extended by `BaseComponent`, `Backdrop`, `FocusTrap`, `Swipe`, `TemplateFactory`                                                                                                                                                                                                                                                                                    | —                     | accepted |
 | engine           | method         | util/index.js: `getUID`, `getElement`, `isElement`, `isVisible`, `isDisabled`, `isRTL`, `toType`, `noop`, `parseSelector`, `reflow`, `execute`, `findShadowRoot`, `getNextActiveElement` exported as shared utilities                                                                                                                                                                                                                                            | —                     | accepted |
 | engine           | initialization | util/index.js: `getjQuery` skipped when `document.body` carries `data-bs-no-jquery`; `defineJQueryPlugin` registers `$.fn[NAME]` after `onDOMContentLoaded`                                                                                                                                                                                                                                                                                                      | —                     | accepted |
+| engine           | plugin         | Collapse: a `[data-bs-toggle="collapse"]` trigger names its panel by `data-bs-target` or `href` attribute; `parent: null` and `toggle: true` defaults; `toggle`, `show`, and `hide` methods; cancelable `show.bs.collapse` and `hide.bs.collapse` events, then `shown.bs.collapse` and `hidden.bs.collapse` events; trigger `aria-expanded` and `collapsed` states track the panel; `collapsing` class and inline size until transition end. Owner: J-ENGINE.    | —                     | accepted |
+
+A `plugin` row records behavior the engine owns and no shipped Veneer module performs, while the classes that plugin sets ship in the cascade and render in markup.
 
 An accepted row records scope; a named Proof step obliges the official recording to agree with the
 row. A shipped selector or variable row requires its official vocabulary less the deferrals under
@@ -4024,8 +4073,9 @@
 timelines, so what is declined is the frame rather than the proof.
 
 A Validation region follows the Table region; a Form check, a Form control, a Form floating, a Form
-label, a Form range, and a Form select region follow the Spinner region; and an Input group region
-follows the Close region, each carrying that key's own specimens. The Form label region carries a
+label, a Form range, and a Form select region follow the Spinner region; an Input group region
+follows the Close region; and a Collapse region follows the Input group region, each carrying that
+key's own specimens. The Form label region carries a
 label above its control with the help text the control names as its description, and a horizontal
 label level with the control beside it at each size and as the legend of a group.
 
@@ -4140,6 +4190,7 @@
 [the breadcrumb classes](../tests/src/styles/components/breadcrumb.test.ts),
 [the badge classes](../tests/src/styles/components/badge.test.ts),
 [the close classes](../tests/src/styles/components/close.test.ts),
+[the collapse classes](../tests/src/styles/components/collapse.test.ts),
 [the icon link classes](../tests/src/styles/components/icon-link.test.ts),
 [the ratio classes](../tests/src/styles/components/ratio.test.ts),
 [the vertical rule](../tests/src/styles/components/vr.test.ts),
--- a/tests/fixtures/tailwind/markup.html
+++ b/tests/fixtures/tailwind/markup.html
@@ -34,5 +34,6 @@
 			</tr>
 		</tbody>
 	</table>
+	<div class="collapse show">Shown panel</div>
 	<button type="button" class="btn px-8">Action</button>
 </div>
```

Post-BPO form of the barrel and conformance hunks, against main `72fdde4`. Use it in place of the
`src/styles/index.scss` and `tests/conformance.test.ts` hunks of the preceding diff when
B-PASSIVE-ORDER has landed:

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -57,6 +57,7 @@
 @use 'components/form-floating';
 @use 'components/input-group';
 @use 'components/validation';
+@use 'components/collapse';
 @use 'components/button-group';
 @use 'components/card';
 @use 'components/breadcrumb';
--- a/tests/conformance.test.ts
+++ b/tests/conformance.test.ts
@@ -105,6 +105,8 @@
 			'btn-toolbar',
 			'card',
 			'col',
+			'collapse',
+			'collapsing',
 			'container',
 			'display',
 			'figure',
@@ -351,15 +353,18 @@
 	})
 	// The release names the passive partials with the `spinners` token and the `placeholders`
 	// token, plural forms Veneer writes from the singular `spinner` stem and the `placeholder`
-	// stem, so this case maps them the way the forms case maps its own renamed partials. The
-	// passive block and the helpers both load after every forms partial, in the release's own
-	// sequence.
+	// stem, and it writes the collapse classes in its `transitions` partial, which Veneer writes as
+	// the `collapse` stem, so this case maps them the way the forms case maps its own renamed
+	// partials. The passive block and the helpers both load after every forms partial, in the
+	// release's own sequence.
 	it('loads the passive block and the helpers in the release order, after every forms partial', () => {
 		const stems: Readonly<Record<string, string>> = Object.freeze({
+			transitions: 'collapse',
 			spinners: 'spinner',
 			placeholders: 'placeholder',
 		})
 		const passiveNames = new Set([
+			'transitions',
 			'button-group',
 			'card',
 			'breadcrumb',
@@ -379,6 +384,7 @@
 			.flatMap(([, name]) => (name === undefined || !passiveNames.has(name) ? [] : [name]))
 			.map((name) => stems[name] ?? name)
 		expect(passive).toEqual([
+			'collapse',
 			'button-group',
 			'card',
 			'breadcrumb',
```
