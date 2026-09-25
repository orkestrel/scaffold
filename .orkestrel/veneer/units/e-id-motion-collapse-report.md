# E-ID-MOTION-COLLAPSE — report

Retained by the Orchestrator from `/home/user/veneer-mcol/tmp/units/mcol-report.md`. Every `tmp/units/` log, script, diff,
and status file it names is retained in `mcol-instruments/` beside this report; other paths are relative to
`/home/user/veneer-mcol/`, and the round is committed there as `9e1fe4e` on `unit/mcol`.

**State: done, with a deviation.** The collapse panel moves its size on `--vn-motion-panel` and `--vn-ease-panel`,
and the accordion chevron turns on `--vn-motion-feedback` and `--vn-ease-standard`. The rewritten fade case proves
the load order without fixing the collapse timing. Every plant fails a proof with an `AssertionError` and was restored
byte for byte, and every acceptance gate exits 0.

**The deviation.** The installed `sampleTransition` reader can't read the chevron's running transition, because the
transition runs on the button's `::after` pseudo-element. The chevron proof reads the pseudo-element's resolved
longhands and its turn frames instead. I did not add a reader. The following § Shared-file patch lets the reader take
a pseudo-element.

## The stop and the grant

The unit first stopped before any edit. That report is kept at `tmp/units/mcol-stop-report.md`. Brief 2
(`e-id-motion-collapse-brief-2.md`) granted the collapse-timing case in `tests/src/styles/components/fade.test.ts` and added the
`fade-order` plant. The work then ran from Execution step 1 of the original brief.

## Searches

- **Pins in `tests/`.** `grep -rnE "0\.35s|'height 0\.35s'|0\.2s" tests/ --include=*.ts` found hits in the collapse and
  accordion proofs, which this unit owns. It also found `fade.test.ts` line 250, which brief 2 granted. The
  `tests/setupBrowser.test.ts:1836` hit is an inline test style and is unaffected. The stop report has the full
  output.
- **App proofs, the showcase, and engine proofs.** `grep -rnE "0\.35s|\b350\b|0\.2s|ease-in-out" tests/app app
  tests/src/browser` returned nothing. It covered the collapse and accordion showcase sections, their app proofs, and
  `tests/src/browser/Collapse.test.ts`.
- **Other style proofs and setup files.** `grep -rnE "\b350\b|collapsing" tests/src/styles tests/*.ts`, excluding the
  collapse and fade proofs, returned only unaffected hits. The case table in `tests/setupStyles.test.ts` names the
  `--bs-accordion-btn-icon-transition` property, which the partial still declares, and `npm run test:setup` stays
  green.
- **Stale guide timings.** `grep -n "0\.35s\|0\.2s" guides/veneer.md` after the edit returns only the release values
  quoted in the departure bullets and ledger rows, plus the unrelated `.icon-link` rows.
- **Readings retaken in the worktree.** They matched the brief. `_tokens.scss` declares
  `--vn-motion-feedback: calc(150ms * var(--vn-factor-motion))`,
  `--vn-motion-panel: calc(250ms * var(--vn-factor-motion))`, `--vn-ease-standard: ease`, and
  `--vn-ease-panel: cubic-bezier(0.32, 0.72, 0, 1)`. The partials and the pinned checks were as the Evidence states.

## Unknowns

- **Ledger classes.** `npm run build:src && npm run test:conformance` printed these rows to add, each classed
  `tokenized` by the classifier:
  ```text
  accordion | .accordion | --bs-accordion-btn-icon-transition | — | transform 0.2s ease-in-out | transform var(--vn-motion-feedback) var(--vn-ease-standard) | tokenized
  collapsing | .collapsing | transition | — | height 0.35s ease | height var(--vn-motion-panel) var(--vn-ease-panel) | tokenized
  collapsing | .collapsing.collapse-horizontal | transition | — | width 0.35s ease | width var(--vn-motion-panel) var(--vn-ease-panel) | tokenized
  ```
  None of them preserves the release's resolved value. Under the § Departures legend each is a retune, which is the
  classifier defect the MODAL verdict carried to LEDGER-RETUNE (claim 5). The rows record what the gate prints.
- **App proofs, the showcase, and engine proofs.** None fixes a value this unit changes, per § Searches.

## Failing first, then green

This command runs the owned proofs:
`npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/collapse.test.ts tests/src/styles/components/accordion.test.ts tests/src/styles/components/fade.test.ts`

- **Red at the base: 4 failed, 47 passed, exit 1** (`tmp/units/mcol-red.log.txt`, load `2.28 3.98 5.61`). This run
  used the final proofs against the base rules. `_collapse.scss` and `_accordion.scss` were set back to their `877e7c6` bytes, the styles were
  rebuilt, and afterwards the edited partials were restored. Every failure is an `AssertionError`:
  - `declares the recorded closing box at rest and no transition under the reduced-motion condition`;
  - `opens and closes a vertical panel on its height and a horizontal panel on its width over the panel duration on the
    panel curve, twice as long at a doubled motion factor, and not at all at a zero factor or under the reduced-motion
    preference`, which received `[ 350, 'ease', '0px' ]` against `[ 250, 'cubic-bezier(0.32, 0.72, 0, 1)', '0px' ]`;
  - `transitions the button paint and the chevron turn and collapses both under the reduced-motion preference`;
  - `turns the chevron over the feedback duration on the standard curve as the button takes and loses the collapsed
    class, twice as long at a doubled motion factor, and at once at a zero factor or under the reduced-motion
    preference`, which received `[ 'transform', '0.2s', 'ease-in-out' ]`.
- **Green after the change: 51 passed, exit 0** (`tmp/units/mcol-green.log.txt`, load `7.64 4.95 4.42`). This run
  followed `npm run build:src`.
- **Change after the red run.** Only the chevron case's comment changed.
- **Retired.** The case `keeps the closing transition at the release duration under a doubled motion factor`. The
  new collapse motion case reads the doubled factor as a ratio instead.

## What the proofs read

- **Collapse, the new motion case.** Through `sweepMotionFactor`, under both the ordinary and the reduced-motion
  preference, each axis runs the class and size writes the engine makes on open and on close. `sampleTransition` then
  reads the running transition.
  - At the resting factor, the proof checks each sample's presence (`toBeDefined`) before narrowing it.
  - The duration and curve must equal a specimen that resolves the tokens outside the collapse rules.
  - The start frame is checked, and the midpoint frame must be past half the travel.
  - The panel's running list must hold that transition alone, and the declared `transition-property` must be the size
    alone. This check reports an opacity entry even though opacity never changes.
  - Each panel must settle at its end size.
  - At a doubled factor, each duration must be exactly 2 times the resting one, on the same curve.
  - At a zero factor, and at every factor under reduced motion, no transition may run, and each panel must still reach
    its end size.
- **Collapse, the declaration case.** It expects `height var(--vn-motion-panel) var(--vn-ease-panel)` and
  `width var(--vn-motion-panel) var(--vn-ease-panel)`, built from the `TOKEN_NAMES` constant, and `none` under the
  reduced-motion condition.
- **Accordion chevron.** The chevron's row in the existing reduced-motion case changes to `transform`, `0.15s`,
  `ease`. The button's rows are unchanged.
  - The new chevron case, through `sweepMotionFactor` under both preferences, reads the pseudo-element's longhands
    as one button takes the `collapsed` class and another loses it. The values must equal a specimen's resolved
    `--vn-motion-feedback` and `--vn-ease-standard`, and the doubled duration must be 2 times the resting one.
  - It also reads the turn frames as matrices. A running turn holds each chevron at its start frame. A zero factor or
    the reduced-motion preference lands the chevron on its end frame at once, and the expanded end frame is
    `matrix(-1, 0, 0, -1, 0, 0)`, the release's `rotate(-180deg)`.
- **Accordion button.** Its own transition cases are unchanged and green.
- **Fade load order.** The rewritten case compares the element carrying both classes with a plain `.collapsing`
  element, checks that the plain element's property is `height`, and keeps the plain fading element's
  `['opacity', '0.15s', 'ease-out']`.

## The rules as written

`src/styles/components/_collapse.scss`:
```scss
	.collapsing {
		height: 0;
		overflow: hidden;
		@include transition(height var(--vn-motion-panel) var(--vn-ease-panel));
	}
	// …
	.collapsing.collapse-horizontal {
		width: 0;
		height: auto;
		@include transition(width var(--vn-motion-panel) var(--vn-ease-panel));
	}
```
The header comment says the closing box moves its size on the panel tokens and moves no opacity, because the
`collapsing` class marks both directions. No root `interpolate-size` is written.

`src/styles/components/_accordion.scss`, on `.accordion`:
```scss
		// The chevron turns over the feedback duration on the standard curve, so the motion factor
		// scales it; the half turn it ends at stays the release's.
		--bs-accordion-btn-icon-transition: transform var(--vn-motion-feedback) var(--vn-ease-standard);
```
`--bs-accordion-btn-icon-transform: rotate(-180deg)` and the button's `--bs-accordion-transition` are unchanged.

## Guide rows

In `guides/veneer.md`:
- **§ Collapse classes.** The motion paragraph states the panel timing, the factor scaling, and why no opacity moves.
  A departures list is added with the bullet **"The size moves on the panel motion tokens."** The proof paragraph
  names the running-transition readings.
- **§ Accordion classes.** The motion paragraph states the chevron's `transform` on `--vn-motion-feedback` and
  `--vn-ease-standard`, ending at `rotate(-180deg)`. A departure bullet is added: **"The chevron turns on the feedback
  motion tokens."** The proof paragraph names the chevron readings.
- **§ Factors.** The exception list becomes "except the offcanvas panel and the carousel slide and indicator
  timings". The collapse and accordion chevron entries are struck, and the paragraph's tail is rewrapped.
- **§ Departures.** A row is added to the `accordion` table, after `--bs-accordion-btn-padding-y` in declaration
  order. A `collapsing` table is added between `col` and `column-gap`, carrying the `collapsing` rows printed in § Unknowns.
  No § Additions row applies.

## Plants

`tmp/units/mcol-plants.mjs` ran every plant. Each log records the plant, the SHA-256 digest before and after, the
build exit, and the load. Each run used the owned proofs command from § Failing first, then green.

| Plant | Written | Result | Restored |
| --- | --- | --- | --- |
| `collapse-literal` | `.collapsing` back to `@include transition(height 0.35s ease);` | 2 failed, 49 passed, exit 1; `AssertionError` in the declaration case and in the motion case (`[ 350, 'ease', '0px' ]` against `[ 250, … ]`) | identical, `eec96a98…` |
| `chevron-literal` | `--bs-accordion-btn-icon-transition: transform 0.2s ease-in-out;` | 2 failed, 49 passed, exit 1; `AssertionError` in the reduced-motion slot case and in the chevron case | identical, `5f9448ad…` |
| `collapse-opacity` | `.collapsing` given `(height var(--vn-motion-panel) var(--vn-ease-panel), opacity var(--vn-motion-panel) var(--vn-ease-panel))` | 3 failed, 48 passed, exit 1; `AssertionError` in the declaration case, in the motion case (declared list is not `height`), and in the fade case (`'height, opacity'`) | identical, `eec96a98…` |
| `fade-order` | A `<style>@layer components { .fade { transition: opacity var(--vn-motion-feedback) var(--vn-ease-out) } }</style>` after the elements the fade case mounts | 1 failed, 50 passed, exit 1; `AssertionError` in the fade case (`[ 'opacity', '0.15s', 'ease-out' ]` against `[ 'height', '0.25s', … ]`) | identical, `cb8e150a…` |

- **Logs:** `tmp/units/mcol-plant-<name>.log.txt`.
- **First `collapse-opacity` run: invalid.** The mixin rejected a two-argument call, so the build exited 1 and the
  proofs ran against the previous build. The script now restores the file and throws on a failed build, and the
  planted value is a single list.
- **First `fade-order` run: invalid.** It put the sheet before the elements, which shifted the readings, so the
  failure did not come from load order. The final plant puts the sheet after the elements.
- **Final rerun.** Every plant was run again with the final script, and those runs are what the logs keep.

## Gates

Each gate is logged to `tmp/units/mcol-<gate>.log.txt`, with the command first, then `exit=`, then `/proc/loadavg`.

| Gate | Command | Result |
| --- | --- | --- |
| `check` | `npm run check` | exit 0 |
| `lint-check` | `npm run lint:check` | exit 0 |
| `oxfmt-check` | `oxfmt --config .oxfmtrc.json --check` over the owned files | exit 0 |
| `setup` | `npm run test:setup` | exit 0; 357 passed |
| `conformance` | `npm run test:conformance` | exit 0; 45 passed |
| `guides` | `npm run test:guides` | exit 0; 26 passed |
| `policy` | `npm run test:policy` | exit 0; 109 passed, 1 skipped (a skip already present at the base) |
| `build-src` | `npm run build:src` | exit 0 |
| `collapse-browser` | `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Collapse.test.ts` | exit 0; 49 passed |
| `app` | `npm run test:app` | exit 0; 223 passed, load `7.38 4.70 4.33` |
| `green` | the owned proofs command | exit 0; 51 passed |

**Observation (not a criterion):** `npm run test:src:styles` over the whole project exited 0, with 115 files and
1556 tests passed, at load `5.64 5.39 4.72` (`tmp/units/mcol-styles-observation.log.txt`).

## Shared-file patch (report-only): `tests/setupBrowser.ts`

This patch lets `sampleTransition` read a pseudo-element's running transition. In the tree, a chevron case would then
call `sampleTransition(button, 'transform', '::after')` in place of the frame readings.

I tested the find and read logic with a temporary probe case in `accordion.test.ts`, and then removed it
(`tmp/units/mcol-probe-pseudo.log.txt`). Without the subtree option, `getAnimations()` on the button omits the
`::after` transform. With the subtree option, filtering on the target and `pseudoElement === '::after'` found it at
150 ms `ease`. Its start frame was `matrix(-1, 0, 0, -1, 0, 0)`, and a midpoint frame could be read.

The patch changes a behaviour: a transition with no `KeyframeEffect` now reads as `undefined` rather than throwing.
The patch also needs a `tests/setupBrowser.test.ts` case in the `setup:browser` project.

```diff
  * @param property - The transitioned property, as the `transitionProperty` member of a
  *   `CSSTransition` names it, such as `opacity`.
+ * @param pseudo - The pseudo-element whose transition to read, such as `::after`. Default: the
+ *   element itself.
@@
-export function sampleTransition(element: Element, property: string): TransitionSample | undefined {
-	const transition = element
-		.getAnimations()
-		.find(
-			(animation): animation is CSSTransition =>
-				animation instanceof CSSTransition && animation.transitionProperty === property,
-		)
+export function sampleTransition(
+	element: Element,
+	property: string,
+	pseudo?: string,
+): TransitionSample | undefined {
+	const transition = element
+		.getAnimations({ subtree: pseudo !== undefined })
+		.find(
+			(animation): animation is CSSTransition =>
+				animation instanceof CSSTransition &&
+				animation.transitionProperty === property &&
+				animation.effect instanceof KeyframeEffect &&
+				animation.effect.target === element &&
+				animation.effect.pseudoElement === (pseudo ?? null),
+		)
@@
-	const start = readStyle(element, property)
+	const start = readStyle(element, property, pseudo)
@@
-	const midpoint = readStyle(element, property)
+	const midpoint = readStyle(element, property, pseudo)
```

## Diff and status

- **Diff:** `tmp/units/mcol.diff` (`git diff 877e7c6`). `git diff 877e7c6 --numstat` reads `guides/veneer.md`
  +52 −20, `_accordion.scss` +3 −1, `_collapse.scss` +7 −6, `accordion.test.ts` +93 −2, `collapse.test.ts` +157 −42,
  and `fade.test.ts` +13 −13, for 325 insertions and 84 deletions.
- **Status:** `tmp/units/mcol-status.txt`. It lists `M` for `guides/veneer.md`,
  `src/styles/components/_accordion.scss`, `src/styles/components/_collapse.scss`,
  `tests/src/styles/components/accordion.test.ts`, `tests/src/styles/components/collapse.test.ts`, and
  `tests/src/styles/components/fade.test.ts`. No file outside the owned set changed.
- **Instruments:** `tmp/units/` keeps the edit scripts (`edit-*.mjs`), the plant script and its backups, the gate
  script `mcol-gate.sh`, the base and new copies of the edited files, and every log.

## Deviation state

- **Stop:** raised once, before any edit, and resolved by brief 2.
- **Chevron reader:** the running transition on the pseudo-element can't be read through the installed reader. The
  chevron is proved through its resolved longhands and turn frames. The reader change is the preceding shared-file
  patch, left to the Orchestrator to integrate and route.
- **Settled within scope:**
  - The collapse timing is written inline in both rules. The partial uses no map or variable to route it through.
  - The case titles and the guide wording.
