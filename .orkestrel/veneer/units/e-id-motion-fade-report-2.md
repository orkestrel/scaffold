# E-ID-MOTION-FADE round 2 report

`opus` on Opus 5.5, native, in `/home/user/veneer-mfade` (branch `unit/mfade` at `2376710`), under
`tmp/units/mfade-brief-2.md`. The `.fade` rule now runs its opacity transition on `--vn-ease-out`, and
`sampleTransition` is in `tests/setupBrowser.ts` with its proof and control. The fade proof read red at
the base and green after. The easing mutation reddened the fade proof with an `AssertionError` and the
ledger's stale-departure case. Every gate in Execution step 4 exits 0. `test:setup` exited 1 on its
first run under load, on timeouts in files this unit did not touch, and exited 0 on its re-run. The
report names one scoped choice: a line in an existing export-list assertion in
`tests/setupBrowser.test.ts`.

## The Unknown's reading

Round 1's reading stands, and this round's runs agree with it. On Chromium 141, `effect.getTiming().easing`
reports the specified keyword: `linear` on the base rule and `ease-out` on the changed rule. At a
motion factor of `0`, Chromium starts no transition.

## The reader

The helper is `sampleTransition(element: Element, property: string): TransitionSample | undefined`,
exported from `tests/setupBrowser.ts` beside `readParentOffset`. It follows the `{verb}{Noun}` helper
form, and its name is the one the design verdict gives. The `TransitionSample` type is plain data, so
it takes the `{Entity}` form, and every member is one word:

- `transition`: the running `CSSTransition`, left paused at its midpoint.
- `duration`: the milliseconds from `effect.getTiming()`.
- `easing`: the timing function from `effect.getTiming()`.
- `start`: the computed value at `currentTime` `0`.
- `midpoint`: the computed value at the delay plus half the duration.

The helper finds the transition by its `transitionProperty` in `element.getAnimations()`. It returns
`undefined` when no transition runs on that property, and throws when the transition has no effect,
no numeric duration, or no easing. It adds no other change to `tests/setupBrowser.ts`, whose diff
holds only additions.

## Changes

- `src/styles/components/_fade.scss`: the rule writes
  `transition(opacity var(--vn-motion-feedback) var(--vn-ease-out))`. The comment states the easing
  and the reason for it.
- `tests/setupBrowser.ts`: the `TransitionSample` interface and the `sampleTransition` function, with
  TSDoc.
- `tests/setupBrowser.test.ts` gains a `sampleTransition` suite and one list entry:
  - The case `reads the named property's running transition, its timing, and its computed start and midpoint, and leaves it paused there`
    uses a fixture with a delayed linear opacity transition and an `ease-in` width transition.
  - The control `reads no transition on the same change once the transition is removed` repeats that
    change with `transition: none` and expects `undefined`, no animations, and the end values.
  - `readStyle` joins the imports.
  - `'sampleTransition'` joins the export list the `exports the showcase mount, …` case enumerates.
- `tests/src/styles/components/fade.test.ts`:
  - The declared value in the `declares the transition over the motion token…` case reads
    `var(--vn-ease-out)`.
  - The `transitions the opacity on the ease-out curve over the feedback duration and collapses the transition under the reduced-motion preference`
    case (renamed from `…linearly…`) reads `ease-out`.
  - The collapsing case reads `ease-out`.
  - The case `runs the opacity transition over the feedback duration on the ease-out curve as the show class leaves and returns`
    is added. It samples both directions and asserts:
    - the element runs only the sampled transition;
    - the duration equals `--vn-motion-feedback` resolved on a specimen's `transition-duration`;
    - the easing is `ease-out` and each direction starts at the expected endpoint;
    - each midpoint lies strictly between the endpoints and past the linear halfway value in the
      direction of travel.
  - The case `doubles the running duration at a doubled motion factor, and runs no transition at a zero factor or under the reduced-motion preference`
    is added.
- `guides/veneer.md`:
  - The fade's row in the § Departures `transition` table has the Veneer cell
    `opacity var(--vn-motion-feedback) var(--vn-ease-out)`. It stays `tokenized`, and the ledger
    agrees.
  - § Fade classes states the easing, what it replaces, and that no transition runs at a factor of
    `0`.
  - The § Fade classes departure bullet names the easing.
  - The § Fade classes proof paragraph lists the running-transition readings.

**Scoped choice.** The export-list case in `tests/setupBrowser.test.ts` asserts the module's full
export set, so adding `sampleTransition` made it false. The first `test:setup:browser` run failed there
with `AssertionError: expected [ 'BUTTON_CLASS', …(65) ] to deeply equal [ 'BUTTON_CLASS', …(64) ]`. I
added the one `'sampleTransition'` entry and changed nothing else in that case. The case title,
"… the cascade readers …", is unchanged.

## Failing-first and green

The command, after `npm run build:src:styles`, was
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/fade.test.ts`.

| State | Reading |
| --- | --- |
| Base rule (`linear`), proofs written | exit 1, `Tests  4 failed \| 6 passed (10)`. The failures are the declaration case, the resolved-easing case, the running-transition case (`AssertionError: expected [ 150, 'linear', '1' ] to deeply equal [ 150, 'ease-out', '1' ]`), and the collapsing case. The factor case passes at the base, because it guards the duration, which the base already tokenizes. |
| Rule on `var(--vn-ease-out)` | exit 0, `Tests  10 passed (10)` |

The reader's proof ran through
`npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup:browser -t sampleTransition`
and read exit 0, with both `sampleTransition` cases passing.

## Mutation table

Each plant was restored from a copy of the green file and checked with `cmp`. The cascade was rebuilt
after each plant and after each restore.

| Plant | Command | Reading |
| --- | --- | --- |
| `_fade.scss` easing back to `linear` | fade proof command | exit 1, `4 failed \| 6 passed`, each an `AssertionError`; the running-transition case reads `expected [ 150, 'linear', '1' ] to deeply equal [ 150, 'ease-out', '1' ]` |
| The same plant | `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project conformance` | exit 1. `names no departure the compiled cascade no longer carries` fails, naming the stale row `transition \| .fade \| transition \| — \| opacity 0.15s linear \| opacity var(--vn-motion-feedback) var(--vn-ease-out) \| tokenized`. `records every measured value difference in the guide ledger` and `measures the dark component rules…` also fail on the unrecorded `linear` value. `runtime boundaries › bundles no forbidden runtime…` fails too, but with an `ENOENT` on `dist/src/core/index.js`, because at that point only the styles build existed. It failed the same way at green before `npm run build` and passes in the gate run. |
| `_fade.scss` duration as the `0.15s` literal | fade proof command | exit 1, `3 failed \| 7 passed`; the factor case reads `expected [ [ 150, '0' ], [ 150, '0' ], …(1) ] to deeply equal [ [ 300, '0' ], …(2) ]` |
| `sampleTransition` midpoint without the delay | reader proof command | exit 1, `1 failed \| 1 passed`: `expected [ 200, 'linear', '1', '1' ] to deeply equal [ 200, 'linear', '1', '0.5' ]` |
| `sampleTransition` takes the first transition instead of the named property | reader proof command | exit 1, `1 failed \| 1 passed`: `expected [ 'opacity', 'opacity' ] to deeply equal [ 'opacity', 'width' ]` |

## Gate table

The chain ran from `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/mfade-gates.sh`.
It runs `npm run build` first, then each gate. Each log is `tmp/units/mfade-<gate>.log.txt` with the
gate's colon written as `-`, and each ends in `exit=$?`.

| Gate | Log | Exit |
| --- | --- | --- |
| `npm run build` | `mfade-build.log.txt` | 0 |
| `npm run format:check` | `mfade-format-check.log.txt` | 0 (re-run after the export-list edit) |
| `npm run lint:check` | `mfade-lint-check.log.txt` | 0 (re-run after the export-list edit) |
| `npm run check` | `mfade-check.log.txt` | 0 (re-run after the export-list edit) |
| `npm run test:src:styles` | `mfade-test-src-styles.log.txt` | 0 |
| `npm run test:setup` | `mfade-test-setup.log.txt` | 0 on the re-run; the first run is kept as `mfade-test-setup-first.log.txt` (see the following observation) |
| `npm run test:setup:browser` | `mfade-test-setup-browser.log.txt` | 0 after the export-list edit, `Tests  90 passed (90)` |
| `npm run test:conformance` | `mfade-test-conformance.log.txt` | 0 |
| `npm run test:guides` | `mfade-test-guides.log.txt` | 0 |
| `npm run test:policy` | `mfade-test-policy.log.txt` | 0 |

**Observation: `test:setup` under load.** The first run exited 1. Five cases timed out, at 5000ms or
10100ms, in `tests/setupServer.test.ts` and `tests/setupStyles.test.ts`, which this unit did not touch.
The host's load average then read 16.41 over 5 minutes. The re-run exited 0 with
`Tests  321 passed (321)`, at a 1-minute load average of 8.45. The authoritative reading belongs to the
Orchestrator.

## Records

- `tmp/units/mfade.diff` holds `git diff 2376710` (`5 files changed, 254 insertions(+), 21 deletions(-)`).
- `tmp/units/mfade-status.txt` reads `## unit/mfade` and ` M` on the five owned files:
  - `guides/veneer.md`
  - `src/styles/components/_fade.scss`
  - `tests/setupBrowser.test.ts`
  - `tests/setupBrowser.ts`
  - `tests/src/styles/components/fade.test.ts`

## Deviation state

No stop. No engine proof reads the fade's easing: round 1 searched `tests/src/browser`, and nothing
under it changed. Every edit is in an owned file. The report path follows the coordinator's
instruction, `tmp/units/mfade-report-2.md`, so round 1's `mfade-report.md` stays in place.
