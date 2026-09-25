# E-ID-MOTION-OFFCANVAS round 2 report

Retained by the Orchestrator from `/home/user/veneer-moff/tmp/units/moff-report-2.md`. Every `tmp/units/` log, script, diff, probe, and status
file it names is retained in `moff-instruments-2/` beside this report; other paths are relative to `/home/user/veneer-moff/`, and the
round is committed there as `32a6c28` on `unit/moff`.

**Outcome.** Round 2 closes claim 3, claim 6, and the text-integrity finding under `moff-brief-3.md`.
- **Responsive exit.** Below its boundary, a responsive panel is now proved through the whole class sequence the engine
  writes, both entry and exit.
- **Plants.** Every plant fails a case with an `AssertionError` and restores byte-identically. That covers round 1's
  plants and this round's `hiding-opaque`, `leak`, and `mixin`.
- **Guide.** It states what the panel's timing resolves to at a motion factor of `1`.
- **Comments.** Every comment line this unit wrote fits in 100 columns.
- **Gates.** Every acceptance gate exits 0.

**Deviation state.** No deviation. One file-name collision:
- `tmp/units/moff-green-2.log.txt` here is this round's green reading. Round 1 had used that name for an intermediate run.
- The re-run plants also rewrote the round-1 plant logs in this worktree.
- Round 1's copies are retained under `/home/user/scaffold/.orkestrel/veneer/units/moff-instruments/`.

## Red and green readings

Every run follows `npm run build:src:styles`, and every command is:
`npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/navbar.test.ts`

| Reading | Rules | Log | Result |
| --- | --- | --- | --- |
| Red | Round 1's rules (`73cd4f0`) with `.offcanvas-sm.hiding { opacity: 1 }` planted below the `sm` boundary | `tmp/units/moff-plant-hiding-opaque.log.txt` | exit 1; 1 failed, 81 passed; the failure is the extended responsive case for `sm`, an `AssertionError` at viewport 575 |
| Green | Round 1's rules, without the plant | `tmp/units/moff-green-2.log.txt` | exit 0; 82 passed |

This round changes no rule. The only partial edit rewords one comment, so the extended proof fails on the plant alone.

## Case coverage

Each case below states the class writes it drives and what it reads. Where a case writes no class, that is stated. The
viewports under "Responsive" are each breakpoint's `readings`: one pixel below its boundary, the boundary itself, and one
pixel above.

| Case | Class writes driven | What it reads |
| --- | --- | --- |
| `paints a panel carrying "$classes" when the state shows it, and keeps it slid out and transparent while the state leaves it` | None. It mounts a static `.offcanvas-start` panel carrying `''`, `show`, `showing`, `hiding`, or `show hiding`. | The computed `visibility`, the transform's horizontal shift, and `opacity`. |
| `slides the $placement panel in from its edge on the panel curve and fades it in on the ease-out curve over the panel duration as the showing class joins, and back out as the hiding class joins` | On a bare panel at each placement, the whole engine sequence: `showing` and `show` join; `showing` leaves; `hiding` joins as `show` leaves; `hiding` leaves. | Through `sampleTransition`, on entry and on exit, the `transform` and `opacity` transitions: duration, easing, start value, and midpoint. It compares them with a token specimen and checks the settled values. After `showing` leaves and after `hiding` leaves, it reads that `getAnimations()` is empty. |
| `keeps the $name panel opaque with no transition at and above its boundary, and below it slides and fades the panel in as the showing class joins and back out as the hiding class joins` (extended this round) | On `.offcanvas-{name}` at each viewport, the whole engine sequence, as in the preceding row. | The resting opacity. Through `sampleTransition`, the duration and easing of the `transform` and `opacity` transitions on entry and on exit. The opacity once shown, and the opacity after the exit. `getAnimations()` after `showing` leaves and after `hiding` leaves. In the in-flow range every sample must be absent and the opacity `1` at every step. Below the boundary, both moves must run on the specimen's duration and curves, ending at opacity `0`. |
| `doubles the running slide and fade at a doubled motion factor, and runs none at a zero factor or under the reduced-motion preference, on the bare panel and on a responsive panel below its boundary` | The entry only: `showing` and `show` join, on a bare panel and on an `.offcanvas-xxl` panel at 1399. It runs at factors `1`, `2`, and `0`, with motion allowed and under the staged reduced-motion preference. | Through `sampleTransition`, the duration of the `transform` and `opacity` transitions, and each settled value. The doubled reading is compared with the resting one as a ratio. |
| `lays a shown and a resting panel into the $name expanded bar and leaves them fixed below the boundary` | None. It mounts a `show` panel and a resting panel inside each expanded bar. | At each viewport: position, grow, width, fill, edge, and `transition-property` of the shown panel; its header and body display; and the resting panel's visibility, shift, border, and `opacity`. It samples no running transition. |
| `navbar.test.ts`: `turns an offcanvas panel into part of the expanded row above the boundary, over the hidden state the panel carries inline` | None. It mounts a panel whose hidden state is inline. | At 991 and 992: the computed position, grow, visibility, transform, `opacity`, width, fill, edge, header, body, and inset. |
| `fixes the $name panel below its boundary and lays it inline at and above it`, and `keeps the bare panel fixed at every width` | None. | The computed layout, and the media conditions each selector is written under. The reduced-motion twin that the `transition` mixin emits is among those conditions. |

## Plant table

`tmp/units/moff-plants-2.sh` supersedes `moff-plants.sh`, which stays in place. It adds `hiding-opaque`, `leak`, and
`mixin`, and takes plant names as arguments. For each plant it:
1. copies the file;
2. applies the plant and prints the `diff` into the log;
3. rebuilds the styles;
4. runs the command from the red and green readings;
5. restores the file and records the `cmp` result.

After the full run, `cmp` against the final copies confirmed both partials. Every failure in every log is an
`AssertionError`. The summary is in `tmp/units/moff-plants-2-summary.log.txt`.

| Plant | Change | Log | Result | Failing cases | Restored |
| --- | --- | --- | --- | --- | --- |
| `literal` | `_offcanvas.scss`: the transition variable back to `transform 0.3s ease-in-out` | `tmp/units/moff-plant-literal.log.txt` | exit 1; 15 failed | slide-and-fade at each placement; responsive at each boundary; factor; expanded bar from `sm` to `xxl` | identical |
| `opacity` | `_offcanvas.scss`: `opacity: 0` removed from `$panel` | `tmp/units/moff-plant-opacity.log.txt` | exit 1; 19 failed | state for `''`, `hiding`, and `show hiding`; slide-and-fade; responsive; factor; expanded bar from `sm` to `xxl`; the `navbar.test.ts` row case | identical |
| `transition` | `_offcanvas.scss`: both `@include transition(var(--bs-offcanvas-transition))` lines removed | `tmp/units/moff-plant-transition.log.txt` | exit 1; 21 failed | ramp at each boundary; bare panel at every width; slide-and-fade; responsive; factor; expanded bar from `sm` to `xxl` | identical |
| `navbar-reset` | `_navbar.scss`: `opacity: 1` removed | `tmp/units/moff-plant-navbar-reset.log.txt` | exit 1; 7 failed | expanded bar from `xs` to `xxl`; the `navbar.test.ts` row case | identical |
| `hiding-opaque` | `_offcanvas.scss`: `@include breakpoint-down(sm) { .offcanvas-sm.hiding { opacity: 1; } }` added in the components layer | `tmp/units/moff-plant-hiding-opaque.log.txt` | exit 1; 1 failed | responsive for `sm`, at 575 | identical |
| `leak` | `_offcanvas.scss`: `opacity: 0` added to the responsive panel's `breakpoint-up` block | `tmp/units/moff-plant-leak.log.txt` | exit 1; 5 failed | responsive at each boundary, each at the boundary itself (576, 768, 992, 1200, 1400), where `resting` reads `'0'` against `'1'` | identical |
| `mixin` | `_offcanvas.scss`: the bare panel's `@include transition(…)` written as `transition: var(--bs-offcanvas-transition);` | `tmp/units/moff-plant-mixin.log.txt` | exit 1; 2 failed | the factor case, at its `expect(reduced)` assertion: the bare panel runs `250` under the reduced-motion preference; `keeps the bare panel fixed at every width`, which loses its reduced-motion condition | identical |

## Guide sentences as written

I read each value from the built `dist/src/styles/index.css`:
- `--vn-motion-panel:calc(.25s * var(--vn-factor-motion))`
- `--vn-ease-panel:cubic-bezier(.32, .72, 0, 1)`
- `--vn-ease-out:ease-out`

**§ Offcanvas classes, motion paragraph.**

> The panel slides over the `--vn-motion-panel` token on the `--vn-ease-panel` curve and fades over
> the `--vn-motion-panel` token on the `--vn-ease-out` curve, so each move resolves to `250ms` at a
> factor of `1`, in place of the release's `0.3s`, and rescales with the `--vn-factor-motion` factor.
> The release's `transform 0.3s ease-in-out` transition moves the transform alone. The travel stays
> the release's whole width or height.

**§ Offcanvas classes, departure bullet "The panel moves on Elements' panel motion".** This sentence follows "in place
of the recorded `transform 0.3s ease-in-out` value":

> At a factor of `1` the slide resolves to a `250ms` duration on the
> `cubic-bezier(0.32, 0.72, 0, 1)` curve and the fade to a `250ms` duration on the `ease-out` curve.

**"Which fades nothing."** I replaced the phrase in both places it appeared:
- In the guide, the separate sentence "The release's `transform 0.3s ease-in-out` transition moves the transform alone."
- In the header comment of `_offcanvas.scss`, "…in place of the release's `transform 0.3s ease-in-out`, which moves the
  transform alone."

## Comment sweep

The command is `awk 'length > 100 && $0 ~ /^[[:space:]]*\/\//'`, run over each owned test and partial at the unit's
base `877e7c6`, at round 1 `73cd4f0`, and on the final tree.

| File | `877e7c6` | `73cd4f0` | Final |
| --- | --- | --- | --- |
| `tests/src/styles/components/offcanvas.test.ts` | the `.offcanvas .btn-close` combinator comment; the expanded-navbar comment ("to them. Each panel sits in a block slot…") | the `.btn-close` comment; the round-1 responsive comment ("the flow, where no rule…"); the expanded-navbar comment ("the resting panel in the row. Each panel sits…") | the `.btn-close` comment alone |
| `tests/src/styles/components/navbar.test.ts` | none | none | none |
| `src/styles/components/_offcanvas.scss` | none | none | none |
| `src/styles/components/_navbar.scss` | none | none | none |

- **Expanded-navbar comment.** I re-wrapped it at 100 columns.
- **Round-1 responsive comment.** The extended case's rewritten comment replaced it.
- **`.btn-close` comment.** The line predates this unit, which neither added nor changed it, so I left it.

## Gate table

`tmp/units/moff-gates-2.sh` supersedes `moff-gates.sh` and writes the `-2` logs. Each log opens with the command and
ends with `exit=` and `/proc/loadavg`. The summary is in `tmp/units/moff-gates-2-summary.log.txt`.

| Gate | Command | Log | Exit | Tests | Load (1-minute) |
| --- | --- | --- | --- | --- | --- |
| Format | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check` over the owned partials, tests, and guide | `tmp/units/moff-format-2.log.txt` | 0 | — | 5.46 |
| Check | `npm run check` | `tmp/units/moff-check-2.log.txt` | 0 | — | 4.28 |
| Lint | `npm run lint:check` | `tmp/units/moff-lint-2.log.txt` | 0 | — | 4.26 |
| Guides | `npm run test:guides` | `tmp/units/moff-guides-2.log.txt` | 0 | 26 passed | 4.46 |
| Policy | `npm run test:policy` | `tmp/units/moff-policy-2.log.txt` | 0 | 109 passed, 1 skipped | 4.82 |
| Setup | `npm run test:setup` | `tmp/units/moff-setup-2.log.txt` | 0 | 357 passed | 6.08 |
| Build | `npm run build:src` | `tmp/units/moff-build-src-2.log.txt` | 0 | — | 6.42 |
| Browser | `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts tests/src/browser/Backdrop.test.ts` | `tmp/units/moff-browser-2.log.txt` | 0 | 75 passed | 5.53 |
| App | `npm run test:app` | `tmp/units/moff-app-2.log.txt` | 0 | 223 passed | 5.47 |
| Conformance | `npm run test:conformance` | `tmp/units/moff-conformance-2.log.txt` | 0 | 45 passed | 7.81 |
| Styles (observation) | `npm run test:src:styles` | `tmp/units/moff-styles-2.log.txt` | 0 | 1565 passed | 13.50 |

## Diff and status

`tmp/units/moff-2.diff` holds `git diff 73cd4f0`, and `tmp/units/moff-2-status.txt` holds the status. The diffstat is
3 files changed, 86 insertions(+), 30 deletions(-). Each changed file:
- ` M guides/veneer.md`: the resolved timing in the § Offcanvas classes motion paragraph and departure bullet.
- ` M src/styles/components/_offcanvas.scss`: the header comment's "which fades nothing" becomes "which moves the
  transform alone".
- ` M tests/src/styles/components/offcanvas.test.ts`: the responsive case drives the exit and reads it, with a new
  title and comment; the expanded-navbar comment is re-wrapped.

`tests/setupStyles.ts` and `tests/setupBrowser.ts` are unchanged, and no shared-file patch is returned.
