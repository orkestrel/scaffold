# E-ID-MOTION-FACTOR round 2 — report

`opus` on Opus 5.5, sole writer in `/home/user/veneer-mfac` over Veneer `b613ae4`, round 1 still uncommitted
beneath. Every acceptance criterion reads green in the logs named here. No deviation stop was hit.

## Outcome

- **Claim 2.** The floating label writes `calc(var(--vn-motion-feedback) / 1.5)` and the progress bar writes
  `calc(var(--vn-motion-feedback) * 4)`, each on the release's easing. No partial outside `_tokens.scss` reads
  `--vn-factor-motion` (grep of `src/styles/**/*.scss` excluding `_tokens.scss`: no match). A wrapper that sets the
  factor alone no longer slows either transition.
- **Claim 5.** § Factors is rewritten. The release-value equality now covers only the transitions that keep the
  release's timing.
- **R2.** One exported reader, `sweepMotionFactor`, runs every motion-factor sweep, including the `fade.test.ts` sweep.
  Its proof lives in `tests/setupBrowser.test.ts`.
- **F2.** The accordion comment now reads on the first pass. The nav and pagination sentences in the guide state the easing fact as "which no
  `--vn-ease-*` token resolves to".

## Decision the unit took: float rounding on the label

A fraction of the feedback token is not exactly `100` in Chromium. I ran a throwaway case, logged in
`mfac-instruments/r2/mfac-2-probe-calc.log.txt` and deleted afterwards. It read the running duration the browser reports for
each candidate form:

| Form | Declared `transition-duration` | Running duration (ms) |
| --- | --- | --- |
| `calc(var(--vn-motion-feedback) / 1.5)` | `0.1s` | `99.99999999999999` |
| `calc(var(--vn-motion-feedback) * 2 / 3)` | `0.1s` | `99.99999999999999` |
| `calc(var(--vn-motion-feedback) - 50ms)` | `0.1s` | `99.99999999999999` |
| `calc(var(--vn-motion-feedback) * 4)` | `0.6s` | `600` |
| `calc(100ms * var(--vn-factor-motion))` (round 1) | `0.1s` | `100` |

The browser holds the token in seconds (`0.15 / 1.5`), so no form derived from the feedback token reads exactly `100`.
I kept the ruled form, `/ 1.5`. The label's running-duration assertions now compare within floating-point rounding
using `expect.closeTo(100, 6)` and `toBeCloseTo(100, 6)`, and the doubled ratio uses `expect.closeTo(2, 6)`. The
declared `transition-duration` assertion, `'0.1s, 0.1s'`, still passes unchanged. The subtree case compares the wrapped
duration to the unwrapped one with `toBe`, so rounding cannot hide a doubled factor. This is ancillary to claim 2 and
changes no other case.

## The sweep reader

The reader lives in `tests/setupBrowser.ts`, directly after `sampleTransition`. It adds the
`import { TOKEN_NAMES } from '@src/core'` line.

```ts
export function sweepMotionFactor<T>(drive: () => T): readonly T[]
```

- **Name.** Under `.claude/rules/names.md` a module helper takes `{verb}{Noun}`. The helper sweeps the motion factor,
  and no fixed prefix fits: `read*` returns one value from a host object, and `sample*` is the transition reader's.
- **Behavior.**
  - It sets `--vn-factor-motion` inline on the document element to `1`, `2`, and `0` in turn, runs the drive at each,
    and returns the readings in that order.
  - After each drive, in a `finally` block, it restores the element's own factor value and priority, or removes the
    factor if the element held none. It then clears the `scene` registry.
  - A throwing drive propagates its error after the same restore.
- **Signature choices.**
  - The drive runs synchronously, because every sweep it serves is synchronous.
  - The factors are fixed, because every case sweeps the same values.
  - The return is `readonly T[]` rather than a record. Building a `{ resting, doubled, zeroed }` record without an
    assertion needs a second exported per-factor helper, and the brief asks for one reader.
  - Call sites destructure `[resting, doubled, zeroed]`. Round 1 named the zero reading `stopped`. I renamed it to
    `zeroed` because `stop` is a fixed lifecycle verb.
- **Proof**, in `describe('sweepMotionFactor')` in `tests/setupBrowser.test.ts`:
  - `runs the drive at the resting, doubled, and zero motion factor on the document element, and clears the factor and the scene after each`
    - The fixture div transitions opacity over `var(--vn-motion-feedback)`, so it scales. The control div transitions
      over a literal `150ms`.
    - Each drive records the inline factor, which must be `1`, `2`, then `0`, and which earlier hosts are still
      connected.
    - The fixture must read a positive base, twice the base, then `undefined`. The control must read `[150, 150, 150]`.
    - After the call, the inline factor must be `''` and every host must be disconnected.
    - The case loads the published cascade with `await import('../src/styles/index.scss')`, the same import
      `mountShowcase` performs. Run alone under load, the case took 7036 ms (first restore plant run,
      `loadavg=13.40`; the rerun overwrote that log, so only this report carries that reading) and 9378 ms (final restore plant run, `loadavg=14.38`). The `setup:browser` project sets no
      `testTimeout`, so Vitest's browser-mode default of 15000 ms applies
      (`node_modules/vitest/dist/chunks/coverage.DM_a_rWm.js:538`, `resolved.testTimeout ??= resolved.browser.enabled ? 15e3 : 5e3`).
  - `restores the factor and priority the document element held, and clears the scene, after a drive that returns and after one that throws`
    - The root starts at `3 !important`.
    - A returning sweep must read `['1', '2', '0']` and restore `['3', 'important']`.
    - A drive that throws at the resting factor must propagate its error. It must see only `1`, restore
      `['3', 'important']`, and leave its host disconnected.
- **Mutation named.** The restore plant removes the restore branch and keeps `scene.clear()`. Each case then fails with
  an `AssertionError` (`expected '0' to be ''` and `expected [ '0', '' ] to deeply equal [ '3', 'important' ]`), so
  the assertions distinguish that mutation from the passing reader.
- **Routed call sites.**
  - The motion-factor case in each of `form-floating`, `progress`, `nav`, `pagination`, `navbar`, and `accordion`.
  - The `fade.test.ts` case `doubles the running duration at a doubled motion factor, and runs no transition at a zero
    factor or under the reduced-motion preference`. Only its loop changed: the sweep returns the
    `[duration, opacity]` pairs, and the reduced-motion reading is appended as before.
  - No assertion changed in any routed case, apart from the label's rounding tolerance described in the preceding
    section.
  - The round 1 `afterEach` line removing the factor is gone from the routed style files, because the reader restores the
    factor itself.
  - I did not route the other `fade.test.ts` factor case, `rescales the transition with the published motion factor`.
    It sets only `2` and reads the declared duration, so routing it would add a zero-factor reading and change what it
    asserts.
- **Export-list entry.** I added `'sweepMotionFactor'` to the `exports the showcase mount, …` case, and the import list
  gains `sweepMotionFactor` and `TOKEN_NAMES`.

## Failing-first and green readings

**Command:** `mfac-instruments/r2/mfac-2-styles-run.sh <log> 'subtree that sets the motion factor alone' tests/src/styles/components/form-floating.test.ts tests/src/styles/components/progress.test.ts`.
The script runs `npm run build:src:styles` and then
`npx vitest run --config configs/src/vite.styles.config.ts --reporter=verbose -t '<pattern>' <files>`.

| Reading | Source | Log | Result | loadavg |
| --- | --- | --- | --- | --- |
| Red, first draft of the cases | round 1 partials | `mfac-2-red.log.txt` | `Tests 2 failed \| 37 skipped (39)`, exit 1: `[ 100, 200 ]` vs `[ 100, 100 ]`, `[ 600, 1200 ]` vs `[ 600, 600 ]` | 5.27 |
| Red, final case text | round 1 partials planted back, restored identical (`mfac-2-red-final.sh`) | `mfac-2-red-final.log.txt` | `Tests 2 failed \| 37 skipped (39)`, exit 1: `expected 200 to be 100`, `[ 600, 1200 ]` vs `[ 600, 600 ]` | 16.55 |
| Green | round 2 partials | `mfac-2-green.log.txt` | `Tests 2 passed \| 37 skipped (39)`, exit 0 | 5.12 |

The in-script rebuild at the end of `mfac-2-red-final.sh` logged `rebuild-exit=1`, because the script did not source
`mfac-env.sh`. I rebuilt separately (`mfac-2-rebuild.log.txt`, exit 0) and added the source line to the script
afterwards. The green run rebuilds on its own.

The subtree cases:

- `form-floating.test.ts` › form floating motion › `keeps the label transform at the root duration inside a subtree that sets the motion factor alone`
- `progress.test.ts` › progress classes › `keeps the bar width at the root duration inside a subtree that sets the motion factor alone`

The brief names the form-floating case. The progress case covers the other site claim 2 names, in an owned file.

## Rules and prose as written

`_form-floating.scss`, header comment:

> The label's lift is feedback to the control's own input, so its transition reads the feedback token scaled by the
> release's own ratio to it, the way the height reads a multiple of a space token, and the motion factor reaches it
> only through that token.

`_progress.scss`, comment before `--bs-progress-bar-transition`:

> The fill's width change is feedback to the value the bar reports, so its transition reads the feedback token scaled
> by the release's own ratio to it, and keeps the release's curve; the motion factor reaches it only through that
> token.

`_accordion.scss`, F2:

> The button's transition reads the `--bs-accordion-transition` property, whose durations are the
> `--vn-motion-feedback` token. The `transition` mixin emits the reduced-motion twin the release records beside the
> button's transition and beside the chevron's.

`_nav.scss`: the easing clause now reads "which no `--vn-ease-*` token resolves to", matching the guide.

`guides/veneer.md` § Factors, the paragraph round 1 wrote, with the exception list kept:

> The motion factor scales every transition duration the cascade writes except the collapse, modal dialog, offcanvas
> panel, carousel slide and indicator, and accordion chevron timings, which keep the release's literals as their own
> sections record. A scaled duration reads a `--vn-motion-*` token or a multiple of one, so it doubles from its own
> resting value at a factor of `2` and starts no transition at a factor of `0`. At a factor of `1`, a scaled duration
> that keeps the release's timing resolves to the release's value, and one § Departures records against the release,
> such as the `.icon-link` transform's, resolves to its token's value.

Other guide text changed:

- **Form-floating departure bullet:** "the partial writes each duration as `calc(var(--vn-motion-feedback) / 1.5)`,
  because the label's lift is feedback to the control's own input. The transition resolves to the release's value at
  a factor of `1`, rescales with the factor through the token, and keeps the release's `ease-in-out` curve."
- **Form-floating proof paragraph:** adds "and the root's duration inside a wrapper that sets a doubled factor alone".
  It also closes the stray line break round 1 left after "the".
- **Nav paragraph, F2:** "Its curve stays the release's `ease-in-out`, which no `--vn-ease-*` token resolves to."
  Rewrapped.
- **Pagination paragraph, F2:** the same sentence.
- **Progress paragraph:** "The bar's width transition reads four times the `--vn-motion-feedback` token, because the
  fill's width change is feedback to the value the bar reports. It resolves to the release's value at a factor of `1`,
  rescales with the `--vn-factor-motion` factor through the token, and keeps the release's `ease` curve." The rest is
  unchanged and rewrapped.
- **Progress departure bullet:** "the partial writes `width calc(var(--vn-motion-feedback) * 4) ease`, which resolves
  to the release's value at a factor of `1` and rescales with the factor through the token."
- **Progress proof paragraph:** adds the subtree reading.

## Guide rows

I took the Veneer cells from `npm run test:conformance` (`mfac-2-conformance-probe.log.txt`, the pre-update failing run):

| Key | Selector | Property | Veneer cell |
| --- | --- | --- | --- |
| `form-floating` | `.form-floating > label` | `transition` | `opacity calc(var(--vn-motion-feedback) / 1.5) ease-in-out, transform calc(var(--vn-motion-feedback) / 1.5) ease-in-out` |
| `progress` | `.progress` | `--bs-progress-bar-transition` | `width calc(var(--vn-motion-feedback) * 4) ease` |
| `progress` | `.progress-stacked` | `--bs-progress-bar-transition` | `width calc(var(--vn-motion-feedback) * 4) ease` |

Each row stays classified `tokenized`.

## Plants

Each plant ran through `mfac-instruments/r2/mfac-2-plant.sh`, which backs up the file, applies the plant, echoes the command,
runs it, and restores the file with a sha256 check.

| Plant | File | Command | Result | Restored | loadavg |
| --- | --- | --- | --- | --- | --- |
| `label`: round 1's `calc(100ms * var(--vn-factor-motion))` back on the label (`mfac-2-plant-label.py`) | `src/styles/components/_form-floating.scss` | build, then `npx vitest run --config configs/src/vite.styles.config.ts -t 'motion factor' tests/src/styles/components/form-floating.test.ts` | the subtree case fails, `AssertionError: expected 200 to be 100`; the sweep case passes; exit 1 | identical | 12.56 |
| `bar`: round 1's `calc(600ms * var(--vn-factor-motion))` back on the bar (`mfac-2-plant-bar.py`) | `src/styles/components/_progress.scss` | same for `progress.test.ts` | the subtree case fails, `AssertionError: expected [ 600, 1200 ] to deeply equal [ 600, 600 ]`; exit 1 | identical | 12.03 |
| `restore`: the reader skips the factor restore (`mfac-2-plant-restore.py`) | `tests/setupBrowser.ts` | `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts -t sweepMotionFactor` | each reader case fails with an `AssertionError`; exit 1 | identical | 14.38 |

Logs: `mfac-instruments/r2/mfac-2-plant-{label,bar,restore}.log.txt`. I rebuilt the styles after the plants, and the final
styles and green runs rebuild on their own.

## Gates

`mfac-instruments/r2/mfac-2-gates.sh` runs each gate below. Each log starts with the command and ends with `exit=` and
`/proc/loadavg`.

| Gate | Log | Exit | Reading | loadavg at start |
| --- | --- | --- | --- | --- |
| `oxfmt --config .oxfmtrc.json --check` over every owned file | `mfac-2-format.log.txt` | 0 | all matched files formatted | 17.14 |
| `npm run check` | `mfac-2-check.log.txt` | 0 | — | 14.70 |
| `npm run lint:check` | `mfac-2-lint.log.txt` | 0 | `--deny-warnings` | 10.20 |
| `npm run test:conformance` | `mfac-2-conformance.log.txt` | 0 | `Tests 26 passed (26)` | 9.94 |
| `npm run test:guides` | `mfac-2-guides.log.txt` | 0 | `Tests 26 passed (26)` | 6.95 |
| `npm run test:policy` | `mfac-2-policy.log.txt` | 0 | `Tests 109 passed \| 1 skipped (110)` | 6.65 |
| Owned style files: `mfac-2-styles-run.sh styles ''` over `form-floating`, `progress`, `nav`, `pagination`, `navbar`, `accordion`, `fade` | `mfac-2-styles.log.txt` | 0 | `Test Files 7 passed (7)`, `Tests 176 passed (176)` | 6.48 |
| `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` | `mfac-2-setup-browser.log.txt` | 0 | `Tests 94 passed (94)`, duration 54.56 s | 15.62 |

## Diff and status

- `mfac-2.diff` is `git diff b613ae4`, cumulative over rounds 1 and 2.
- `mfac-2-status.txt` is `git status --short`. It lists only owned files: `guides/veneer.md`, the round 1
  partials, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, and the owned style test files.

`git diff b613ae4 --stat`:

```text
 guides/veneer.md                                  | 278 +++++++++++++---------
 src/styles/components/_accordion.scss             |  14 +-
 src/styles/components/_form-floating.scss         |  17 +-
 src/styles/components/_nav.scss                   |  13 +-
 src/styles/components/_navbar.scss                |   4 +-
 src/styles/components/_pagination.scss            |  16 +-
 src/styles/components/_progress.scss              |   5 +-
 tests/setupBrowser.test.ts                        |  81 +++++++
 tests/setupBrowser.ts                             |  51 ++++
 tests/src/styles/components/accordion.test.ts     |  46 +++-
 tests/src/styles/components/fade.test.ts          |  29 ++-
 tests/src/styles/components/form-floating.test.ts |  56 ++++-
 tests/src/styles/components/nav.test.ts           |  36 ++-
 tests/src/styles/components/navbar.test.ts        |  23 ++
 tests/src/styles/components/pagination.test.ts    |  32 +++
 tests/src/styles/components/progress.test.ts      |  47 +++-
 16 files changed, 592 insertions(+), 156 deletions(-)
```

The shared-file hunks in `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` are the reader, its `TOKEN_NAMES`
import, its proof, and its export-list and import-list entries. Nothing else changed there.

## Deviation state

No stop. I settled these choices within the owned scope:

- the reader's name, signature, and home;
- the rounding tolerance on the label's running duration;
- the extra progress subtree case;
- the `stopped` to `zeroed` rename;
- the removal of the redundant `afterEach` factor lines.

## Observations

- The reader's first proof case ran for 7036 ms and 9378 ms when run alone under load, against a 15000 ms default
  timeout. In the full file run, `mountShowcase` has already imported the cascade by the time the case runs. A heavier
  load could push the isolated run toward the timeout. I did not prove how much of that time the import takes.
- The carried F1 sections (collapse, modal, offcanvas, carousel) are untouched, as the verdict assigns them to their
  own units.
- The rest of the scripts, probes, and logs are under `mfac-instruments/r2/mfac-2-*`.
