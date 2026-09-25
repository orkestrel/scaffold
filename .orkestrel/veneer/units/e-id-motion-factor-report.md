# E-ID-MOTION-FACTOR report

`opus` on Opus 5.5, native, sole writer in `/home/user/veneer-mfac` (branch `unit/mfac`, base `b613ae4`).

## Deviation state

The work is done, and the following points need your ruling.

- **The literal stop clause fired, and I continued after measuring it.** An engine proof reads a nav
  duration: `tests/src/browser/Tab.test.ts`, case "reads the shipped nav and fade declarations the pane
  proofs run under…", asserts `expect(getComputedStyle(link).transitionDuration).toBe('0.15s, 0.15s, 0.15s')`
  on a `.nav-link` under the nav cascade. The Tab factor case ("dispatches shown with no running pane fade…")
  and `tests/src/browser/ScrollSpy.test.ts` also load `_nav.scss?inline`. The change keeps `0.15s` at
  a factor of `1`, so I ran both files after the change instead of stopping on the search. Both stayed
  green (see § Observations). No off-limits file needs a change. The pin is still a literal pin of a
  duration that now scales, which puts it in the same class as the verdict's "Pending shared changes
  for the engine session". Tell me if the clause was meant to stop the unit regardless.
- **The § Factors sentence names its exceptions.** At `b613ae4` the collapse, modal dialog, offcanvas
  panel, carousel slide and indicator, and accordion chevron still keep literal durations. "Every
  transition" would be false on this tree, so the sentence says "every transition duration … except"
  and lists them. Each of E-ID-MOTION-COLLAPSE, -MODAL, -OFFCANVAS, and -CAROUSEL has to strike its
  own name from that list when it lands. The carrier for each strike is that unit, and the plan does
  not name it yet.
- **Ancillary choices I settled:**
  - I ran `npm run build:src:core` and `npm run build:src:browser` in this worktree only, because the
    conformance runtime-boundary case reads `dist/src/core/index.js`.
  - I put the departure rows in each component's ledger table rather than the `transition` table,
    because the conformance proof keys each row by component.

## Touched files

- `src/styles/components/_form-floating.scss`: the label transition is `calc(100ms * var(--vn-factor-motion))` on `ease-in-out`, and the header comment gains the reason.
- `src/styles/components/_progress.scss`: `--bs-progress-bar-transition` is `width calc(600ms * var(--vn-factor-motion)) ease`, with a comment.
- `src/styles/components/_nav.scss`: the link transition reads `var(--vn-motion-feedback)` on `ease-in-out`, and the comment is rewritten.
- `src/styles/components/_pagination.scss`: the page-link transition reads `var(--vn-motion-feedback)` on `ease-in-out`, and the comment is rewritten.
- `src/styles/components/_navbar.scss`: `--bs-navbar-toggler-transition` reads `var(--vn-motion-feedback)` on `ease-in-out`, with a comment.
- `src/styles/components/_accordion.scss`: `--bs-accordion-transition` reads `var(--vn-motion-feedback)` on the release's curves. The chevron's `--bs-accordion-btn-icon-transition` is untouched.
- `tests/src/styles/components/{form-floating,progress,nav,pagination,navbar,accordion}.test.ts`: each file gains one motion-factor case, imports `sampleTransition`, and resets the motion factor in its `afterEach` hook.
- `guides/veneer.md`: adds the ledger departure rows and the § Factors reach paragraph, and rewrites the transition prose, departure bullets, and proof sentences in each family section. The ledger tables were realigned by `oxfmt`.

Diffstat from `git diff --stat b613ae4`:

```text
 guides/veneer.md                                  | 276 +++++++++++++---------
 src/styles/components/_accordion.scss             |  14 +-
 src/styles/components/_form-floating.scss         |  17 +-
 src/styles/components/_nav.scss                   |  12 +-
 src/styles/components/_navbar.scss                |   4 +-
 src/styles/components/_pagination.scss            |  16 +-
 src/styles/components/_progress.scss              |   4 +-
 tests/src/styles/components/accordion.test.ts     |  50 +++-
 tests/src/styles/components/form-floating.test.ts |  35 ++-
 tests/src/styles/components/nav.test.ts           |  40 +++-
 tests/src/styles/components/navbar.test.ts        |  27 +++
 tests/src/styles/components/pagination.test.ts    |  36 +++
 tests/src/styles/components/progress.test.ts      |  33 ++-
 13 files changed, 422 insertions(+), 142 deletions(-)
```

The full diff is `mfac.diff`, and the status is `mfac-status.txt`, which lists only
the preceding files as ` M`.

## Searches

- **Literal durations.** I ran `grep -rn 's ease\|s linear\|[0-9]s)' src/styles --include=*.scss` plus a
  wider `grep -rnE '[0-9.]+m?s\b' src/styles`. Owned sites: `_form-floating.scss` (label), `_progress.scss`
  (bar width), `_nav.scss`, `_pagination.scss`, `_navbar.scss` (toggler), and `_accordion.scss` (the
  button's `--bs-accordion-transition`). Excluded as other units' sites: offcanvas, carousel (slide,
  fade hold, indicators), collapse, modal, and the accordion chevron. Excluded as animations: the
  progress stripes, the placeholder, and the spinner. Every other `transition` in `src/styles` already
  reads `--vn-motion-feedback`: the elements and components button, form-control, form-select,
  form-range, form-check, icon-link, fade, and carousel controls.
- **After the change.** I ran `grep -oE '(-[a-z]+-)?transition(-duration)?:[^;}]*' dist/src/styles/index.css`
  over the built cascade, dropping lines that name `vn-motion` or `vn-factor-motion`. The only literal
  durations left are `.2s` (chevron), `.3s` (offcanvas, modal), `.35s` (collapse), and `.6s` (carousel
  slide, fade hold, indicator). That result is the evidence for the § Factors exception list.
- **Engine proofs and app journeys.** I searched `tests/src/browser` and `tests/app` for the partials,
  their selectors, and `transitionDuration`/`transition-duration`/`getAnimations`:
  - Engine proofs: `Tab.test.ts` reads the nav link's duration, quoted in § Deviation state.
    `ScrollSpy.test.ts` loads the nav cascade but reads no duration. `Collapse.test.ts` loads only
    `_collapse.scss`. None loads the pagination, progress, navbar, accordion, or floating-label
    partial.
  - App journeys: `tests/app/browser/integration.test.ts` (floating-label journey around "The label
    transitions its transform") calls `waitForAnimations(label)` and reads the settled transform, not a
    duration. No app journey reads one of these durations as a value.
- **Pins in `tests/`.** I searched for `0.15s`, `0.1s`, `0.6s`, `150ms`, `100ms`, and `600ms`. The owned
  pins are the declaration readings in form-floating ("transitions the label opacity and transform…",
  `0.1s, 0.1s`), progress (`0.6s`), nav, pagination, navbar (`0.15s`), and accordion
  (`0.15s, …`, `0.2s`). Each still holds at a factor of `1`, because Chromium resolves the `calc()`
  to `0.15s`, `0.1s`, or `0.6s`, so I left them as they were. Every other hit is in another unit's
  proof, in `tests/src/browser`, or in `tests/setupStyles.test.ts`, which pins a normalizer.

## Per-site form ruling

- **`0.15s` sites (nav, pagination, navbar toggler, accordion button): `var(--vn-motion-feedback)`.** The
  token resolves to `calc(150ms * var(--vn-factor-motion))`, which is the release's value at a factor of
  `1`, and the Button family already reads it for the same feedback transitions. Each easing stays the
  release's literal (`ease-in-out`, and `ease` on the accordion radius), because `--vn-ease-standard`
  resolves to `ease`.
- **`0.1s` floating label and `0.6s` progress bar: `calc(<release ms> * var(--vn-factor-motion))`.** No motion
  token resolves to either value, and adding one is outside the owned set. The form copies the
  token file's own declaration form.
- **Shared-file option (report-only).** The `calc(<ms> * var(--vn-factor-motion))` form now sits in the
  form-floating and progress partials. `.claude/rules/styles.md` moves a pattern that appears in more
  than one partial into `_mixins.scss`, and those sites share one decision: the motion factor's reach. I recommend landing the patch in
  `mfac-instruments/mfac-motion-function.patch`. It adds `@function motion($duration)` to `_mixins.scss` and
  rewrites the form-floating and progress sites to call it. I compiled `index.scss` with `./node_modules/.bin/sass` from a
  copy of `src/styles` with and without the patch, and the two outputs are byte-identical (`cmp`
  reported `identical`). The ledger rows and proofs therefore stand unchanged. The cost is one more
  function in `_mixins.scss`. The patch:

```diff
--- a/src/styles/_mixins.scss
+++ b/src/styles/_mixins.scss
@@ -354,6 +354,12 @@
 	}
 }
 
+// Scales a release's own duration by the motion factor, so a transition no motion token resolves
+// to still resolves the release's duration at the resting factor and moves with the factor.
+@function motion($duration) {
+	@return calc(#{$duration} * var(--vn-factor-motion));
+}
+
 @mixin transition($value) {
 	transition: $value;
 	@include reduced-motion {
--- a/src/styles/components/_form-floating.scss
+++ b/src/styles/components/_form-floating.scss
@@ -50,8 +50,8 @@
 		transform-origin: 0 0;
 		@include transition(
 			(
-				opacity calc(100ms * var(--vn-factor-motion)) ease-in-out,
-				transform calc(100ms * var(--vn-factor-motion)) ease-in-out
+				opacity motion(100ms) ease-in-out,
+				transform motion(100ms) ease-in-out
 			)
 		);
 	}
--- a/src/styles/components/_progress.scss
+++ b/src/styles/components/_progress.scss
@@ -24,7 +24,7 @@
 		--bs-progress-bar-bg: var(--vn-palette-blue);
 		// The width transition multiplies the release's `0.6s` duration by the motion factor, because
 		// no motion token resolves to it, and keeps the release's curve.
-		--bs-progress-bar-transition: width calc(600ms * var(--vn-factor-motion)) ease;
+		--bs-progress-bar-transition: width #{motion(600ms)} ease;
 		display: flex;
 		height: var(--bs-progress-height);
 		overflow: hidden;
```

## Failing-first and green

Each case drives the real change: a value that lifts the label, a moved bar width, a tab made active,
a page focused and made active, a focused toggler, or the lone accordion button collapsed. It then
reads the running `CSSTransition` through `sampleTransition` at factors `1`, `2`, and `0`. The
assertions:

- At a factor of `1`, the duration equals the release's value and the easing equals the release's curve.
- At a factor of `2`, the duration divided by the factor-`1` reading equals `2`, with the same easing.
- At a factor of `0`, no transition runs.

Shorthands are read on the longhand the browser runs: `border-top-color`, and
`border-bottom-left-radius` on the accordion.

The failing-first test names:

- `form floating motion > runs the label transform over the release duration and curve at the resting motion factor, twice as long at a doubled factor, and not at all at a zero factor`
- `progress classes > runs the bar width over the release duration and curve at the resting motion factor, twice as long at a doubled factor, and not at all at a zero factor`
- `nav classes > runs the tab paint over the release duration and curve at the resting motion factor, twice as long at a doubled factor, and not at all at a zero factor`
- `pagination classes > runs the page paint and ring over the release duration and curve at the resting motion factor, twice as long at a doubled factor, and not at all at a zero factor`
- `navbar classes > runs the toggler ring over the release duration and curve at the resting motion factor, twice as long at a doubled factor, and not at all at a zero factor`
- `accordion classes > runs the button paint, line, and corner over the release durations and curves at the resting motion factor, twice as long at a doubled factor, and not at all at a zero factor`

`mfac-instruments/mfac-proofs.sh <name>` runs the command for both readings. It runs `npm run build:src:styles`,
then `npx vitest run --config configs/src/vite.styles.config.ts --reporter=verbose` over the owned
style files with `-t 'motion factor'`.

- **Red at the base partials** (`mfac-instruments/mfac-red.log.txt`, loadavg `2.19 4.39 8.70`):
  `Tests  6 failed | 158 skipped (164)`, `exit=1`. Every failure is an `AssertionError` at the ratio,
  for example `expected [ 1, 'ease-in-out' ] to deeply equal [ 2, 'ease-in-out' ]`. The factor-`1`
  reading passed at every site first, so every sampled property ran with the release's duration and
  easing.
- **Green after the change** (`mfac-instruments/mfac-green.log.txt`, loadavg `2.96 4.31 8.45`):
  `Tests  6 passed | 158 skipped (164)`, `exit=0`.
- **Whole owned files** (`mfac-instruments/mfac-files.sh files`, `mfac-instruments/mfac-files.log.txt`, loadavg
  `3.77 4.41 8.38`): `Test Files  6 passed (6)`, `Tests  164 passed (164)`, `exit=0`.

## Guide rows

These ledger rows are in § Departures, and `npm run test:conformance` printed each one as unrecorded
before I added it:

```text
| `accordion` | `.accordion` | `--bs-accordion-transition` | — | `color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease` | `color var(--vn-motion-feedback) ease-in-out, background-color var(--vn-motion-feedback) ease-in-out, border-color var(--vn-motion-feedback) ease-in-out, box-shadow var(--vn-motion-feedback) ease-in-out, border-radius var(--vn-motion-feedback) ease` | tokenized |
| `form-floating` | `.form-floating > label` | `transition` | — | `opacity 0.1s ease-in-out, transform 0.1s ease-in-out` | `opacity calc(100ms * var(--vn-factor-motion)) ease-in-out, transform calc(100ms * var(--vn-factor-motion)) ease-in-out` | tokenized |
| `nav` | `.nav-link` | `transition` | — | `color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out` | `color var(--vn-motion-feedback) ease-in-out, background-color var(--vn-motion-feedback) ease-in-out, border-color var(--vn-motion-feedback) ease-in-out` | tokenized |
| `navbar` | `.navbar` | `--bs-navbar-toggler-transition` | — | `box-shadow 0.15s ease-in-out` | `box-shadow var(--vn-motion-feedback) ease-in-out` | tokenized |
| `pagination` | `.page-link` | `transition` | — | `color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out` | `color var(--vn-motion-feedback) ease-in-out, background-color var(--vn-motion-feedback) ease-in-out, border-color var(--vn-motion-feedback) ease-in-out, box-shadow var(--vn-motion-feedback) ease-in-out` | tokenized |
| `progress` | `.progress` | `--bs-progress-bar-transition` | — | `width 0.6s ease` | `width calc(600ms * var(--vn-factor-motion)) ease` | tokenized |
| `progress` | `.progress-stacked` | `--bs-progress-bar-transition` | — | `width 0.6s ease` | `width calc(600ms * var(--vn-factor-motion)) ease` | tokenized |
```

The § Factors paragraph added after the factor table:

> The motion factor scales every transition duration the cascade writes except the collapse, modal
> dialog, offcanvas panel, carousel slide and indicator, and accordion chevron timings, which keep the
> release's literals as their own sections record. A scaled duration reads a `--vn-motion-*` token or
> multiplies the release's own duration by the factor, so it resolves to the release's value at a
> factor of `1`, doubles at a factor of `2`, and starts no transition at a factor of `0`.

The family sections changed as follows:

- **Form floating, accordion, and progress** each gain a "scales with the motion factor" departure bullet.
- **Nav, pagination, and navbar** replace the "carries Bootstrap's own `0.15s ease-in-out` rather than
  the motion tokens" paragraph with the token duration and the release's curve.
- **Every one of those sections** gains a proof sentence for the running transition at the resting, doubled, and
  zero factors.

The accordion paragraph keeps "The chevron transition carries Bootstrap's own `0.2s` timing" for
E-ID-MOTION-COLLAPSE to change.

I swept the added lines of `git diff -U0 -- guides src tests` case-insensitively for the
`.claude/rules/writing.md` substitution terms plus `ensure` and `guarantee`. The sweep returned no hit.

## Plants

`mfac-instruments/mfac-plant.sh` ran each plant. The script saves the file, applies the plant script, logs the
diff, runs the proof, restores the file, and compares the sha256 digests before and after.

| Plant | Reversal | Proof run | Result | Restore |
| --- | --- | --- | --- | --- |
| `pagination` (`mfac-instruments/mfac-plant-pagination.log.txt`) | `var(--vn-motion-feedback) ease-in-out` back to `0.15s ease-in-out` in `_pagination.scss` | `mfac-instruments/mfac-styles-run.sh tests/src/styles/components/pagination.test.ts` | `AssertionError: expected [ [ 1, 'ease-in-out' ], …(3) ] to deeply equal [ [ 2, 'ease-in-out' ], …(3) ]`, `Tests  1 failed \| 17 skipped (18)`, `exit=1` | `restored=identical` |
| `floating` (`mfac-instruments/mfac-plant-floating.log.txt`) | `calc(100ms * var(--vn-factor-motion))` back to `0.1s` in `_form-floating.scss` | `mfac-instruments/mfac-styles-run.sh tests/src/styles/components/form-floating.test.ts` | `AssertionError: expected [ 1, 'ease-in-out' ] to deeply equal [ 2, 'ease-in-out' ]`, `Tests  1 failed \| 18 skipped (19)`, `exit=1` | `restored=identical` |
| `ledger` (`mfac-instruments/mfac-plant-ledger.log.txt`) | removed the `navbar` `--bs-navbar-toggler-transition` row from `guides/veneer.md` | `npm run test:conformance` | "records every measured value difference in the guide ledger" and "measures the dark component rules…" each fail with an `AssertionError` naming that row, `exit=1` | `restored=identical` |

The ledger plant ran at loadavg `15.63 11.38 9.99`. Its log also shows the case "imports no forbidden
runtime package…" timing out at 5000ms under that load. That timeout does not come from the plant.

## Gates

`mfac-instruments/mfac-gates.sh` ran the gates, and each log ends in `exit=`.

| Gate | Log | Result | loadavg at start |
| --- | --- | --- | --- |
| oxfmt `--check` over the owned files | `mfac-instruments/mfac-format.log.txt` | `exit=0` | `13.59 11.38 10.07` |
| `npm run check` | `mfac-instruments/mfac-check.log.txt` | `exit=0` | `15.67 12.21 10.41` |
| `npm run lint:check` | `mfac-instruments/mfac-lint.log.txt` | `exit=0` | `21.28 15.33 11.82` |
| `npm run test:conformance` | `mfac-instruments/mfac-conformance.log.txt` | `Tests  26 passed (26)`, `exit=0` | `16.45 16.51 13.03` |
| `npm run test:guides` | `mfac-instruments/mfac-guides.log.txt` | `Tests  26 passed (26)`, `exit=0` | `19.42 16.97 12.98` |
| `npm run test:policy` | `mfac-instruments/mfac-policy.log.txt` | `exit=0` | `17.08 16.61 12.97` |

The conformance gate first ran at loadavg `22.03 15.86 12.07` and failed on timeouts alone:
"records official Button behavior…" at 10100ms and "imports no forbidden runtime package…" at 5000ms
(`mfac-instruments/mfac-conformance-loaded.log.txt`). The standalone re-run in the table passed. Take the
deciding reading yourself.

## Observations

- `npm run test:src:styles` over the whole project (`mfac-instruments/mfac-styles-suite.log.txt`, loadavg
  `10.47 15.05 12.70` at start): `Test Files  115 passed (115)`, `Tests  1516 passed (1516)`, `exit=0`.
- The engine proofs that load the nav cascade stay green after the change
  (`mfac-instruments/mfac-engine-read.log.txt`, loadavg `7.01 5.17 8.44`). The command was
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/Tab.test.ts tests/src/browser/ScrollSpy.test.ts`,
  and the result was `Test Files  2 passed (2)`, `Tests  79 passed (79)`, `exit=0`.
- No proof covers the § Factors reach as a whole. The per-site cases and the built-cascade sweep in
  § Searches back it. A rendered sweep over every transition would belong in
  `tests/src/styles/tokens.test.ts`, which this unit does not own.
- `_accordion.scss` and the accordion guide section are also E-ID-MOTION-COLLAPSE's (chevron). This unit and
  E-ID-MOTION-COLLAPSE edit adjacent lines in the partial's `.accordion` block and the same guide paragraph, so expect
  a textual merge at the second landing.

## Artifacts

All artifacts are retained under `mfac-instruments/` (launched from `/home/user/veneer-mfac/tmp/units/`):

- Environment: `mfac-env.sh`.
- Run scripts: `mfac-proofs.sh`, `mfac-files.sh`, `mfac-styles-run.sh`, `mfac-plant.sh` with
  `mfac-plant-{pagination,floating,ledger}.py`, and `mfac-gates.sh`.
- Edit scripts: `mfac-add-cases.py`, `mfac-ledger.py`, and `mfac-prose.py`.
- Shared-file patch: `mfac-motion-function.patch`, with its compile check under `patch/verify/`.
- Logs: `mfac-*.log.txt`.
- Diff and status: `mfac.diff` and `mfac-status.txt`.
