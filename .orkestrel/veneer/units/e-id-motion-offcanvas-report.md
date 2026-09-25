# E-ID-MOTION-OFFCANVAS report

Retained by the Orchestrator from `/home/user/veneer-moff/tmp/units/moff-report.md`. Every `tmp/units/` log, script, diff,
and status file it names is retained in `moff-instruments/` beside this report; other paths are relative to
`/home/user/veneer-moff/`, and the round is committed there as `73cd4f0` on `unit/moff`.

**Outcome.** The unit is complete under `moff-brief.md` and `e-id-motion-offcanvas-brief-2.md`.
- The offcanvas panel slides over `--vn-motion-panel` on `--vn-ease-panel` and fades over `--vn-motion-panel` on
  `--vn-ease-out`.
- It is transparent at rest and under `.hiding`, and opaque under `.showing` and `.show:not(.hiding)`.
- A responsive panel in its in-flow range stays opaque and runs no transition.
- The expanded navbar resets the in-flow panel to full opacity.
- Every acceptance gate exits 0, and every plant fails a proof with an `AssertionError` and restores byte-identically.

**Deviation state.** No open deviation.
- The unit stopped once, because the hidden-state opacity reached the resting panel an expanded navbar puts back in the
  flow. The first report returned that stop, with its evidence in `tmp/units/moff-stop-styles.log.txt` and
  `tmp/units/moff-probe-navbar-reset.log.txt`.
- Brief 2 ruled the reset into the navbar partial, and this report covers the work after that ruling.

## Searches

- **Engine and showcase.** I searched `0\.3s|300ms|ease-in-out` across `tests/src/browser`, `tests/app`, and `app`.
  No match.
- **Files naming `offcanvas`.**
  - `tests/src/browser/{Delegate,validators,Offcanvas,index}.test.ts`
  - `tests/app/browser/sections/{EngineSection,NavbarSection,OffcanvasSection}.test.ts`
  - `app/browser/sections/OffcanvasSection.ts`
  - `app/browser/constants.ts`
- **Opacity readings.** Of those files, only `tests/src/browser/Offcanvas.test.ts` reads an opacity: the backdrop's, in
  the case `reads the shipped offcanvas declarations the motion proofs run under`. No file pins the panel's opacity or
  duration.
- **Showcase navbar.** The `Navbar with offcanvas` specimen in `app/browser/constants.ts` puts `show` on its panel.
- **Result.** No engine proof or showcase proof pins a value this unit changes. `npm run test:app` and the `src:browser`
  run both exit 0.
- **Style pins.** I searched `0.3s|ease-in-out` across `tests/`. The only offcanvas pin was the old `offcanvas.test.ts`
  motion case, which this unit replaces.
- **`navbar.test.ts`.** One case enumerates the `.navbar-expand{infix} .offcanvas` rule's declarations:
  `turns an offcanvas panel into part of the expanded row above the boundary, over the hidden state the panel carries inline`.
  It gains the panel's opacity: `'1'` in the expanded row, and `'0'` below the boundary. The file's other references to
  `.navbar-expand .offcanvas` read media conditions only, and the change leaves those conditions as they were.

## Unknowns

- **Opacity declaration form.** `opacity: 0` goes in the `$panel` map, and `opacity: 1` in the
  `'&.showing, &.show:not(.hiding)'` entry of the `$nested` map. The bare panel and each responsive panel below its
  boundary already emit both maps, so the responsive in-flow range gets neither declaration. The navbar in-flow range
  takes `opacity: 1` on the navbar partial's rule, per brief 2.
- **Ledger classing.** `npm run test:conformance` classes each change as follows. The following § Guide rows lists
  every row.
  - Each panel class records the transition variable as a `tokenized` departure.
  - Each opacity declaration, and each navbar reset, is a `declaration` addition under the `offcanvas` key.
  - Per brief 2, I recorded the rows exactly as the gate prints them, and left the `tokenized` member for LEDGER-RETUNE.
- **Engine and showcase readings.** See the preceding § Searches.

## Failing-first and green readings

Every run follows `npm run build:src:styles`.

| Reading | Command | Log | Result |
| --- | --- | --- | --- |
| Base rules at `877e7c6`, first proofs | `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/offcanvas.test.ts` | `tmp/units/moff-red.log.txt` | exit 1; 18 failed, 22 passed |
| Base rules at `877e7c6`, final proofs | `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/navbar.test.ts` | `tmp/units/moff-red-final.log.txt` | exit 1; 19 failed, 63 passed |
| Final rules | same as the preceding row | `tmp/units/moff-green.log.txt` | exit 0; 82 passed |

**How the base reading was taken.** I copied both partials back to their `877e7c6` bytes, confirmed that with
`git diff --quiet`, rebuilt, and ran the final proofs. Afterwards I restored the final partials and confirmed them
with `cmp`.

**Result at base.** Every failure is an `AssertionError`. These proofs fail at base, each named for what it asserts:
- `paints a panel carrying "$classes" when the state shows it, and keeps it slid out and transparent while the state leaves it`
  fails for `''`, `hiding`, and `show hiding`. The expected opacity comes from the shared table's `slid` field, so
  `tests/setupStyles.ts` needs no patch.
- `slides the $placement panel in from its edge on the panel curve and fades it in on the ease-out curve over the panel duration as the showing class joins, and back out as the hiding class joins`
  fails at every placement.
- `keeps the $name panel opaque and still at and above its boundary, and slides and fades it in below` fails at every
  responsive boundary.
- `doubles the running slide and fade at a doubled motion factor, and runs none at a zero factor or under the reduced-motion preference, on the bare panel and on a responsive panel below its boundary`
  fails.
- `lays a shown and a resting panel into the $name expanded bar and leaves them fixed below the boundary` fails at each
  boundary from `sm` to `xxl`.
- `turns an offcanvas panel into part of the expanded row above the boundary, over the hidden state the panel carries inline`
  fails; it is in `navbar.test.ts`.

**Shape of the proofs.**
- Each proof drives the class writes the engine makes: `showing` and `show` together, then `showing` removed, then
  `hiding` added and `show` removed, then `hiding` removed.
- Each proof reads the transition through `sampleTransition`.
- Each sample's presence is asserted with `toBeDefined()` or `not.toContain(undefined)` before `requireValue` narrows it.
- A reading with no transition holds `undefined` in its duration slot.
- The factor case uses `sweepMotionFactor` inside `visitBreakpoint(1399, …)`, once with motion allowed and once under
  the staged reduced-motion preference. The doubled reading is compared with the resting one as a ratio.

## Rules as written

The rule changes in `src/styles/components/_offcanvas.scss` are:

```scss
$panel: (
	// …
	visibility: hidden,
	opacity: 0,
	// …
);
$nested: (
	// …
	'&.showing, &.show:not(.hiding)': (
		transform: none,
		opacity: 1,
	),
	// …
);
// every panel class
		--bs-offcanvas-transition:
			transform var(--vn-motion-panel) var(--vn-ease-panel),
			opacity var(--vn-motion-panel) var(--vn-ease-out);
```

The rule change in `src/styles/components/_navbar.scss` is:

```scss
		.navbar-expand#{$infix} .offcanvas {
			// …
			transform: none !important;
			opacity: 1;
			transition: none;
		}
```

**Comments.** In the offcanvas partial, the header comment and the responsive-range comment now state the transparent
rest, the token timing, and the in-flow range's full opacity. In the navbar partial, the expand-ramp comment now states
the opacity reset and why specificity alone carries it.

## Guide rows

**§ Departures, `offcanvas` table.** The following row follows each class's `--bs-offcanvas-padding-y` row, for
`.offcanvas`, `.offcanvas-xxl`, `.offcanvas-xl`, `.offcanvas-lg`, `.offcanvas-md`, and `.offcanvas-sm`:

| Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure |
| --- | --- | --- | --- | --- | --- | --- |
| `offcanvas` | `.offcanvas[-bp]` | `--bs-offcanvas-transition` | — | `transform 0.3s ease-in-out` | `transform var(--vn-motion-panel) var(--vn-ease-panel), opacity var(--vn-motion-panel) var(--vn-ease-out)` | tokenized |

**§ Additions.** The following rows follow the offcanvas backdrop rows. Each Reason cell takes one of these
sentences:
- **Rest:** "The fixed panel rests transparent, so it fades in on Elements' panel motion as it slides in from its edge,
  where the release slides an opaque panel."
- **State:** "The states that bring the panel in make it opaque, so the panel fades in as the `showing` and `show`
  classes join and fades out as the `hiding` class joins."
- **Navbar:** "The expanded bar puts the panel back in the flow, so it clears the transparent rest the offcanvas partial
  gives a fixed panel, as it clears the panel's hidden state and slide."

| Name | Condition | Value | Reason |
| --- | --- | --- | --- |
| `.navbar-expand .offcanvas { opacity }` | — | `1` | Navbar |
| `.navbar-expand-{sm,md,lg,xl,xxl} .offcanvas { opacity }` | `@media (width >= 576px, 768px, 992px, 1200px, 1400px)` | `1` | Navbar |
| `.offcanvas-{sm,md,lg,xl,xxl} { opacity }` | `@media (width < 576px, 768px, 992px, 1200px, 1400px)` | `0` | Rest |
| `.offcanvas-{bp}.showing { opacity }` and `.offcanvas-{bp}.show:not(.hiding) { opacity }` | the same `width <` query | `1` | State |
| `.offcanvas { opacity }` | — | `0` | Rest |
| `.offcanvas.showing { opacity }` and `.offcanvas.show:not(.hiding) { opacity }` | — | `1` | State |

**Prose.**
- **§ Offcanvas classes.**
  - The `0.3s ease-in-out` literal is struck from the literals paragraph.
  - The transparent rest joins the placement paragraph, and the hiding fade joins the paragraph on the script's classes.
  - The responsive paragraph states the in-flow opacity and the absent transition.
  - The motion paragraph names the timing by its tokens and states the factor and the reduced-motion twin.
  - A departure bullet, "The panel moves on Elements' panel motion", is added.
  - The proof paragraph lists the new readings.
- **§ Navbar classes.** The paragraph "The expanded bar also turns an offcanvas panel into part of its row" states that
  the bar's rule makes the panel opaque, and that the reset is Veneer's own.
- **§ Factors.** The exception list drops "offcanvas panel".
- **Wrap.** Each touched paragraph is re-wrapped at 100 columns. An `awk 'length > 100 && !/^\|/'` sweep over the base
  guide and the final guide reports the same over-width lines, so the re-wrap added none.

## `## Engine` hunk

The Orchestrator tells the engine session about this hunk:

```diff
-The shipped cascade slides the panel through a `transform` transition of `0.3s`, and the
+The shipped cascade slides and fades the panel over the `--vn-motion-panel` token, on the
+`--vn-ease-panel` curve for the slide and the `--vn-ease-out` curve for the fade, and the
 `overlay-backdrop` mixin fades the backdrop over the `--vn-motion-panel` token, so each wait lasts
 as long as the longer of the two. Under reduced motion the cascade writes `transition: none` on
```

## Plant table

`tmp/units/moff-plants.sh` runs every plant. For each plant, the script:
1. copies the file;
2. applies the plant, and prints the `diff` into the log;
3. runs `npm run build:src:styles`;
4. runs `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/navbar.test.ts`;
5. copies the file back, and records the `cmp` result.

After the last plant, `cmp` against the final copies confirmed both partials.

| Plant | File and change | Log | Result | Restored |
| --- | --- | --- | --- | --- |
| `literal` | `_offcanvas.scss`: the transition variable back to `transform 0.3s ease-in-out` | `tmp/units/moff-plant-literal.log.txt` | exit 1; 15 failed: the slide-and-fade cases, the in-flow cases, the factor case, the navbar cases from `sm` to `xxl`; all `AssertionError` | identical |
| `opacity` | `_offcanvas.scss`: `opacity: 0` removed from `$panel` | `tmp/units/moff-plant-opacity.log.txt` | exit 1; 19 failed: the state cases for `''`, `hiding`, and `show hiding`, the slide-and-fade cases, the in-flow cases, the factor case, the navbar cases from `sm` to `xxl`, and the `navbar.test.ts` row case; all `AssertionError` | identical |
| `transition` | `_offcanvas.scss`: both `@include transition(var(--bs-offcanvas-transition))` lines removed | `tmp/units/moff-plant-transition.log.txt` | exit 1; 21 failed: the ramp and bare-panel condition cases, the slide-and-fade cases, the in-flow cases, the factor case, the navbar cases from `sm` to `xxl`; all `AssertionError` | identical |
| `navbar-reset` | `_navbar.scss`: `opacity: 1` removed | `tmp/units/moff-plant-navbar-reset.log.txt` | exit 1; 7 failed: `lays a shown and a resting panel into the $name expanded bar …` for `xs` to `xxl`, on the resting panel's opacity, and the `navbar.test.ts` row case; all `AssertionError` | identical |

## Gate table

`tmp/units/moff-gates.sh` ran each gate on the final tree. Each log echoes its command first and ends with `exit=` and
`/proc/loadavg`. I re-ran the format gate after the guide's last re-wrap.

| Gate | Command | Log | Exit | Tests | Load (1-minute) |
| --- | --- | --- | --- | --- | --- |
| Format | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check` over the five changed files | `tmp/units/moff-format.log.txt` | 0 | — | 7.84 |
| Check | `npm run check` | `tmp/units/moff-check.log.txt` | 0 | — | 2.70 |
| Lint | `npm run lint:check` | `tmp/units/moff-lint.log.txt` | 0 | — | 2.70 |
| Guides | `npm run test:guides` | `tmp/units/moff-guides.log.txt` | 0 | 26 passed | 2.75 |
| Policy | `npm run test:policy` | `tmp/units/moff-policy.log.txt` | 0 | 109 passed, 1 skipped | 2.85 |
| Setup | `npm run test:setup` | `tmp/units/moff-setup.log.txt` | 0 | 357 passed | 4.25 |
| Build | `npm run build:src` | `tmp/units/moff-build-src.log.txt` | 0 | — | 3.91 |
| Browser | `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts tests/src/browser/Backdrop.test.ts` | `tmp/units/moff-browser.log.txt` | 0 | 75 passed | 2.35 |
| App | `npm run test:app` | `tmp/units/moff-app.log.txt` | 0 | 223 passed | 3.86 |
| Conformance | `npm run test:conformance` | `tmp/units/moff-conformance.log.txt` | 0 | 45 passed | 3.85 |
| Styles (observation) | `npm run test:src:styles` | `tmp/units/moff-styles.log.txt` | 0 | 1565 passed | 7.40 |

## Files

**Diff and status.** `tmp/units/moff.diff` holds `git diff 877e7c6`, and `tmp/units/moff-status.txt` holds the status.
The diffstat is 5 files changed, 348 insertions(+), 134 deletions(-). The status and each file's change:
- ` M guides/veneer.md`: the departure and addition rows; the § Offcanvas classes, § Navbar classes, § Factors, and
  `## Engine` prose.
- ` M src/styles/components/_navbar.scss`: `opacity: 1` on the expanded bar's panel rule, and its comment.
- ` M src/styles/components/_offcanvas.scss`: the transparent rest, the opaque shown states, the token transition, and
  the comments.
- ` M tests/src/styles/components/navbar.test.ts`: the expanded-row case reads the panel's opacity.
- ` M tests/src/styles/components/offcanvas.test.ts`: the state, slide-and-fade, in-flow, factor, and navbar proofs.

**Shared-file patches.** None. `tests/setupStyles.ts` and `tests/setupBrowser.ts` are unchanged.

**Scripts and scratch.**
- `tmp/units/moff-plants.sh` and `tmp/units/moff-gates.sh` are the scripts that ran the plants and the gates.
- `tmp/units/work/` holds the base and final copies of both partials, the base guide, and the build logs.
