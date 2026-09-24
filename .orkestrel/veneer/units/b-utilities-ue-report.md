<!-- Retained by the Orchestrator: `ue-status.txt` and `ue.diff` captured read-only from /home/user/veneer-ue at retention, because the unit returned none. -->
# UTIL-EFFECT (`ue`) report

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-ue` (branch `unit/ue`, base `2a3f223`).

## Outcome

The `shadow`, `opacity`, and `focus-ring` keys ship. The built cascade carries every selector the
inventory records under those keys, with no extra selector. The owned proofs are green, and every
named mutation turns its case red. The shared-file patch applies cleanly to `2a3f223` and turns the
conformance, service, guide, policy, section, and light-1280 journey gates green on the validation
copy.

Three items need a decision from you. The first two are deviations; the third is a scratchpad write that predates note 2:

- **The specimen `Focus ring` is renamed `Default focus ring`.** A specimen and its region may not
  share a name. With both named `Focus ring`, the journey failed with "2 rendered subjects answer to
  the name "Focus ring"". The deviations section has the evidence and the alternative.
- **Criterion 3's `!important` wording does not apply to the `.focus-ring:focus` helper.** The helper
  keeps the release's normal priority, per family ruling 5 and R6.
- **The unit wrote into the session scratchpad before note 2 arrived.** Deviation 5 lists every
  write and where it went.

## Touched files

Owned files. All are new and untracked, and `git status --porcelain` lists these paths and nothing else.

| File | Summary |
| --- | --- |
| `src/styles/utilities/_opacity.scss` (21 lines) | The `opacity` entry through the `utility` mixin, not responsive, literal steps. |
| `src/styles/utilities/_shadow.scss` (20 lines) | The `shadow` entry through the `utility` mixin, reading the release's `--bs-box-shadow*` aliases byte for byte. |
| `src/styles/components/_focus-ring.scss` (26 lines) | The `.focus-ring:focus` helper (normal, with the `forced-ring` mixin) and the `focus-ring` map entry through the `utility-variable` mixin over `tokens.$aliased`. |
| `tests/src/styles/utilities/opacity.test.ts` (97 lines) | Steps at every boundary reading, no infixed class, order, dark island and density, priority, escape. |
| `tests/src/styles/utilities/shadow.test.ts` (185 lines) | Each class against its token's own paint at every boundary reading, no infixed class, elevation factor, retuned step and alias, dark island and density, order, priority, escape. |
| `tests/src/styles/components/focus-ring.test.ts` (235 lines) | Resting and focused ring, offsets, role rings at a retuned alpha, dark island, role order, forced colors, layer and precedence. |
| `app/browser/sections/ShadowSection.ts`, `OpacitySection.ts`, `FocusRingSection.ts` (21 lines each) | The `SpecimenSection` subclasses for the Shadow, Opacity, and Focus ring regions. |
| `tests/app/browser/sections/ShadowSection.test.ts` (67), `OpacitySection.test.ts` (80), `FocusRingSection.test.ts` (122) | Section contract, derived specimen readings, keyboard traversal rings. |

Shared files are report-only. The unit returns them as the patch `.orkestrel/veneer/units/ue-shared.patch` (909
lines), embedded at the end of this report. The `git apply --stat` output against a `2a3f223`
extract:

```text
 src/styles/index.scss                 |    3 +
 tests/setup.ts                        |   30 +++++++++
 tests/setupStyles.ts                  |   55 ++++++++++++++++
 tests/setupStyles.test.ts             |   55 ++++++++++++++++
 tests/conformance.test.ts             |    6 ++
 tests/setupServer.test.ts             |    3 +
 app/browser/constants.ts              |   97 ++++++++++++++++++++++++++++
 app/browser/Showcase.ts               |    6 ++
 app/browser/index.ts                  |    3 +
 tests/app/browser/Showcase.test.ts    |    9 +++
 tests/app/browser/index.test.ts       |    9 +++
 tests/app/browser/integration.test.ts |   60 +++++++++++++++++
 tests/setup.css                       |    2 -
 tests/fixtures/tailwind/consumer.css  |    2 -
 tests/fixtures/tailwind/preflight.css |    2 -
 tests/fixtures/tailwind/markup.html   |    9 +++
 guides/veneer.md                      |  131 ++++++++++++++++++++++++++++++---
 17 files changed, 467 insertions(+), 15 deletions(-)
```

The patch leaves `tests/setup.test.ts` and `ROADMAP.md` unchanged. The ROADMAP fold needs the landing
SHA, which only the integrator has.

## Baseline (worktree, before any edit)

- `npm run test:conformance`: exit 0, 22 passed (`.orkestrel/veneer/units/ue-instruments/ue-baseline-conformance.log.txt`).
- `npm run build:src:styles && npm run test:service`: exit 0, 18 passed (`.orkestrel/veneer/units/ue-instruments/ue-baseline-service.log.txt`).

## Scoped gate evidence

The unit took these readings on the validation copy `tmp/probe/base`: the `2a3f223` archive, a
hard-linked `node_modules`, the owned files, and the shared patch. Script:
`.orkestrel/veneer/units/ue-instruments/ue-gates.sh`. Log: `.orkestrel/veneer/units/ue-instruments/ue-gates.log.txt`, with one `ue-gate-<name>.log.txt` per gate.

| Criterion | Command | Exit | Reading |
| --- | --- | --- | --- |
| 1 (worktree) | `npm run format:check` | 0 | all matched files formatted (`ue-worktree-format.log.txt`) |
| 1 (worktree) | `npm run lint:check` | 0 | no diagnostic (`ue-worktree-lint.log.txt`) |
| 1 (copy) | `npm run format:check`, `npm run lint:check` | 0, 0 | on the copy with the patch applied |
| 2 | `npm run check` | 0 | — |
| 3 | `npm run build:src` + `ue-cascade-keys.mjs` | 0 | inventory records 18 selectors under the keys; the cascade emits the same 18 unconditioned, none missing, none extra; one conditioned rule, `.focus-ring:focus` under `(forced-colors:active)` { outline }, the Additions row; no priority mismatch (`ue-cascade-keys.log.txt`) |
| 4 | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot <owned styles proofs>` | 0 | 29 passed |
| 5 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser <owned section proofs> tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | 12 passed |
| 6 | `npm run test:conformance` | 0 | 22 passed, ledger rows applied through the patch |
| 7 | `npm run build:src:styles && npm run test:service` | 0 | 18 passed |
| — | `npm run test:guides` | 0 | 19 passed |
| — | `npm run test:policy` | 0 | 109 passed, 1 skipped |
| observation | `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-1280` | 0 | 45 passed, no `CAPTURE` |
| observation | journey `dark-390`, before the note-1 refactor of the journey case | 0 | 45 passed (`ue-journey-dark-390.log.txt`) |
| observation | `npm run test:setup` | 0 | 267 passed in the final gate run (`ue-gate-setup.log.txt`). Earlier runs under a load average of 15 to 33 timed out on `recordButtonOracle` and one Sass-compile case (`ue-setup-under-load.log.txt`, `ue-gate-setup-rerun.log.txt`). |
| observation | `npm run test:conformance` at a load average of 28 to 33 | 1, 1 | Two timeouts during the control runs: the oracle recording and the expanded-compile forced-colors case. The same file passed 22 of 22 with `--testTimeout=120000` (`ue-control-conformance-green*.log.txt`) and at default timeouts in the final gate run. |

The unit deleted `tmp/probe/` before this report. The baseline service run in the worktree left
`tmp/tailwind/candidates.txt`, which is gitignored.

## Coverage matrix

| Inventory selector and condition | Proof case | Distinguishing mutation (red in `ue-mutations.log.txt`) | Specimen | Capture scenario |
| --- | --- | --- | --- | --- |
| `.shadow` { box-shadow: var(--bs-box-shadow) } | shadow: resolves each class to the elevation step its alias reads around each boundary; scales every shadow step with the elevation factor; moves each class with a retuned elevation step | shadow written as a literal (8 cases red: every boundary case, the factor case, and the retune case) | Shadows | `shadows` (rest, `.shadow` box-shadow) |
| `.shadow-sm` { box-shadow: var(--bs-box-shadow-sm) } | same boundary case against the `--vn-shadow-1` reference box; factor case | alias swap; the recorded run swaps the lg alias, and the reference-box comparison reads sm the same way | Shadows | `shadows` |
| `.shadow-lg` { box-shadow: var(--bs-box-shadow-lg) } | same; retune case for a consumer-set `--bs-box-shadow-lg` alias | shadow-lg reads the default alias (7 red) | Shadows | `shadows` |
| `.shadow-none` { box-shadow: none } | boundary case; order case (`.shadow-lg.shadow-none` resolves none); priority and escape cases | shadow order reversed (order case red); shadow-none `!important` dropped (priority and escape red) | Shadows | `shadows` |
| no responsive `shadow` infix | boundary case: no infixed class rule, and an infixed element keeps its resting shadow at every boundary reading | shadow written responsive (6 red) | — | — |
| `.opacity-0` to `.opacity-100` { opacity } | opacity: resolves every step at the empty infix around each boundary | opacity step mis-valued (7 red) | Opacity steps | `opacity-steps` (rest, `.opacity-50` opacity) |
| no responsive `opacity` infix | same case, with infixed elements and no `.opacity-{infix}-{step}` rule | opacity written responsive (5 red) | — | — |
| opacity map order | writes the steps in the release order | opacity order reversed (1 red) | — | — |
| opacity priority | priority over a later unlayered rule; escape | opacity-50 `!important` dropped (8 red) | — | — |
| `.focus-ring:focus` { outline: 0; box-shadow: … } | focus ring: paints nothing at rest and the default ring under keyboard focus; offsets and blurs the ring through the variables | helper without the focus condition (2 red); helper color written as a literal (5 red); helper offsets written without the variables (1 red) | Default focus ring | `default-focus-ring` (rest, `.focus-ring` box-shadow), `default-focus-ring-focus` (driven) |
| `@media (forced-colors: active)` `.focus-ring:focus` { outline } (addition) | outlines the focused element at the focus width under forced colors | forced-ring omitted (1 red) | Default focus ring | none: forced colors are read by the proof, not photographed |
| `.focus-ring-primary` … `.focus-ring-dark` { --bs-focus-ring-color } | paints each role class ring from its own channel alias at the ring opacity; reads each mode through its aliases (dark island); role order | primary role omitted (2 red); role order reversed (1 red) | Focus ring roles | `focus-ring-roles` (rest, `.focus-ring-danger` `--bs-focus-ring-color`), `focus-ring-roles-focus` (driven, danger link) |
| role-class priority (normal) | the layer case: a consumer's unlayered `--bs-focus-ring-color` wins | css-var written important (1 red) | — | — |
| helper priority (normal) | the layer case: a consumer's unlayered `:focus` rule, `.shadow-none`, and a rule in `@layer utilities` each win | helper written important (1 red) | — | — |

Every mutation run is in `.orkestrel/veneer/units/ue-instruments/ue-mutations.log.txt`, and each entry holds the mutated site,
both sides of the replacement, the command, the build and test exits, the summary line, and the
failing cases. The script that produced the log is `.orkestrel/veneer/units/ue-instruments/ue-mutations.sh`. The unmutated run
passed 29 of 29.

## Shared-name table

The unit measured each name through the installed compiler: `ue-tailwind-longhands.mjs`, output in
`ue-tailwind-longhands.log.txt`. The consumer equality read the same result. Before the line changed,
it demanded exactly the shadow names (`ue-service-measure-before-line.log.txt`).

| Shared name | Tailwind declares | Veneer `!important` covers | Measured status |
| --- | --- | --- | --- |
| `opacity-0`, `opacity-25`, `opacity-50`, `opacity-75`, `opacity-100` | `opacity` | `opacity` | off the line |
| `shadow`, `shadow-sm`, `shadow-lg`, `shadow-none` | `--tw-shadow`, `box-shadow` | `box-shadow` alone | on the line |
| `focus-ring`, `focus-ring-*` | no rule generated | — | not shared |

The unit appended `shadow shadow-sm shadow-lg shadow-none` to the line in `tests/setup.css`,
`consumer.css`, `preflight.css`, and both guide recipe fences, in that order, for the set union. The
negative controls follow, each logged:

- **Shared name written onto the line.** `opacity-50` added to every copy: exit 1, 2 failed
  (`derives the shared class names…` and `keeps a shared name on the line…`). Log:
  `ue-control-service-line.log.txt`.
- **Importance dropped.** `.opacity-50` stripped of its `!important` in the built cascade: exit 1, the
  same 2 cases failed. Log: `ue-control-service-important.log.txt`.
- **Green control.** 18 of 18 passed. Log: `ue-control-service-green.log.txt`.

## Precedence cases

| Case | Reading | Mutation that reddens it |
| --- | --- | --- |
| `.opacity-50` against a later unlayered `.probe { opacity: 0.3 }` | 0.5 | importance dropped |
| `.opacity-50` against an unlayered `!important`, then against `@layer utilities { … !important }` | 0.5, then 0.2 | importance dropped |
| `.shadow-none` against the same pair | none, then the layered value | importance dropped |
| `.opacity-100.opacity-0` | 1 | order reversed |
| `.shadow-lg.shadow-sm`, `.shadow-lg.shadow-none` | lg, none | order reversed |
| `.focus-ring-danger.focus-ring-primary` under focus | danger ring | role order reversed |
| unlayered `.consumer:focus { box-shadow }` over the helper | the consumer shadow | helper written important |
| unlayered `--bs-focus-ring-color` over `.focus-ring-danger` | the consumer color | css-var written important |
| `.focus-ring.shadow-none` under focus | none (the important utility layer wins, as in the release) | — (release behavior; recorded in the guide) |
| `@layer utilities { .escaped:focus { box-shadow } }` over the helper | the layered shadow | helper written important |

## Ledger rows

- **`#### <key>` departures: none.** Conformance passed without a departure row. The ledger compares
  `.25` and `0.25` after normalization, and every `var(--bs-*)` value is byte-identical to the
  release.
- **`### Additions`.** The following row, category `declaration`, follows the `.navbar-toggler:focus`
  row. Removing it fails the `records every emitted name the official inventory lacks` case and the
  `reports an unrecorded literal declaration on a shipped rule as a declaration addition` case
  (`ue-control-conformance-addition.log.txt`).

  ```text
  | `focus-ring`   | `.focus-ring:focus { outline }`                               | `@media (forced-colors: active)`                 | declaration | Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there. |
  ```
- **Compatibility rows.** The patch adds `shadow` selector, `opacity` selector, `focus-ring`
  selector, and `focus-ring` variable after the `invisible` row. It also adds `focus-ring`,
  `opacity`, and `shadow` to the `listed` literal and to the `tests/setupServer.test.ts` component
  set.

## Section text

- **Shadow region.** Paragraph: "Compare the shadow steps from none to large, each a box shadow on a
  card that the elevation factor scales." The region renders the `Shadows` specimen: a
  `row row-cols-2 row-cols-md-4 g-4` grid of cards carrying `shadow-none`, `shadow-sm`, `shadow`, and
  `shadow-lg`, each labeled with its class.
- **Opacity region.** Paragraph: "Compare the opacity steps, each fading the bar beside its class
  name, from a bar that paints nothing to a bar at full strength." The region renders the
  `Opacity steps` specimen: for
  each step, a `row align-items-center g-2` with a `col-3` label naming the class and a `col-9`
  `placeholder w-100 opacity-N` bar hidden from assistive technology.
- **Focus ring region.** Paragraph: "Press Tab to reach each link and compare the default focus ring
  with the ring each role class paints." Specimen `Default focus ring`: one `a.focus-ring` link to
  `#main`. Specimen `Focus ring roles`: a `d-flex flex-wrap gap-3` paragraph with a
  `focus-ring focus-ring-{role}` link per role, each labeled with its class.
- **Order.** `Showcase` constructs the sections after `VisibilitySection` and before
  `NavbarSection`, in the brief's listing order: Shadow, Opacity, Focus ring. The barrel exports
  follow the same order.

## Unknowns, answered

- **Exclusion-line status.** Measured: the opacity steps are off the line, the shadow names are on
  it, and the focus-ring names are not shared. The shared-name table has the details.
- **`attributeSelector`.** The inventory records each of the unit's selectors under exactly one
  key, its own. The ledger attributes them without a ladder change: conformance passes, and the Additions
  row is keyed `focus-ring`. The `tests/setupServer.ts` file needs no change.

## Deviations

1. **Specimen renamed. The brief, the tree, and criterion 5 disagree; the unit resolved the
   disagreement and did not stop.**
   - Expected: the specimen `Focus ring` in the region `Focus ring`.
   - Found: `readSubject` in `tests/setupBrowser.ts` refuses a subject name that both a region and
     a specimen carry. The journey portfolio cases failed with "2 rendered subjects answer to the
     name "Focus ring"" (`ue-journey-name-collision.log.txt`).
   - Done: the specimen is `Default focus ring` (scenarios `default-focus-ring` and
     `default-focus-ring-focus`). The journey then passed 45 of 45.
   - Alternative, if you prefer it: keep the specimen name and rename the region instead, which
     changes `FOCUS_RING_COPY.region`, the Showcase label list, and the section proof.
2. **Criterion 3 and the helper's priority.**
   - Expected by criterion 3: `!important` on each property declaration of every recorded selector.
   - Found: `.focus-ring:focus` is a helper that the release writes normally. Family ruling 5 and R6
     keep helpers as recorded, the conformance priority case compares priority with the compiled
     release, and the family record wins.
   - Done: the helper is normal and every utility property is important
     (`ue-cascade-keys.log.txt`, no mismatch).
3. **Ancillary choice: the role classes sit beside the helper in the components layer**, as the
   brief's partial list fixes. The only other rules that set `--bs-focus-ring-color` are the
   `theme`-layer `:root` and `[data-bs-theme]` scopes, measured on the built cascade. So the layer
   choice moves no resolution, and the guide states this.
4. **Ancillary choice: host workaround.** The validation copy sat inside the worktree's gitignored
   `tmp/`, so `oxfmt` excluded every file there. The unit ran `git init` inside `tmp/probe/base` to
   make the copy its own ignore root, and deleted the copy with `tmp/probe/`.
5. **Scratchpad writes before note 2.** Before note 2 arrived, the unit wrote these paths into the
   session scratchpad:
   - `t.scss`, a Sass probe of the `rgba()` pass-through, at 00:37.
   - `wt-lint.log`, a worktree `lint:check` log, at 01:18.
   - The `ue-apply`, `ue-p`, and `ue-q` directories of `2a3f223` extracts.

   Each write used plain `>` redirection, so if a sibling already held `t.scss` or `wt-lint.log`, the
   unit overwrote it. The unit cannot tell whether that happened. Both files held the unit's own
   content when checked; the unit moved them to `.orkestrel/veneer/units/ue-instruments/ue-sass-rgba-probe.scss` and
   `.orkestrel/veneer/units/ue-instruments/ue-worktree-lint-early.log.txt`. It removed its own directories by their paths.
   After note 2, the unit read only the npm 11 `PATH` entry from the scratchpad.

## Mid-campaign notes 1 and 2, applied

- **Code tokens.** Every code token in the new guide prose and comments takes a noun (the `none`
  value, the `0` value, the `!important` flag, the `$aliased` list).
- **Case populations.** The section proofs derive their populations from the rendered specimens.
  The styles proofs iterate `GRID_BREAKPOINT_CASES`, `SHADOW_CASES`, `OPACITY_STEPS`, and
  `FOCUS_RING_ROLES` from the setup file. The journey case derives its rows from `DRIVEN_KEYS` over
  `FOCUS_RING_SPECIMENS`.
- **Mutation logs.** Every mutation and control run is retained under `tmp/units/` (retained under `.orkestrel/veneer/units/ue-instruments/`).
- **Rule application.** Each claim names the rule that applies it: the element-level alpha retune
  moves role rings only, and the root-level step retune moves the shadow class that reads it.
- **Derived bindings.** The `SHADOW_CASES` token binding is derived from the declarations in the
  `src/styles/_tokens.scss` file. A planted alias change turned the binding case red, then the file
  was restored.
- **Scratchpad (note 2).** Every instrument, extract, and log sits under `tmp/units/` (retained under `.orkestrel/veneer/units/ue-instruments/`) or
  `tmp/probe/`, named with the `ue` prefix. Deviation 5 lists the earlier scratchpad writes.

## Not closed

- **Integration.** Apply the patch, fold the `ROADMAP.md` row with the landing SHA, and run
  `CAPTURE=1` across the four variants for the new frames: `shadows`, `opacity-steps`,
  `default-focus-ring`, `focus-ring-roles`, `default-focus-ring-focus`, and
  `focus-ring-roles-focus`.
- **Timing re-runs.** Re-run `test:setup` and `test:conformance` on an idle host. Both passed in the
  final gate run, but under load their oracle-recording and expanded-compile cases time out.
- **Parallel units.** The patch keeps the base's versions of the files the sibling units patch.
  Integrate the exclusion line, the `listed` literal, and the registries as a set union with the
  siblings' patches.

## Shared-file patch (`.orkestrel/veneer/units/ue-shared.patch`, unified diff against `2a3f223`)

The exact shared patch is `.orkestrel/veneer/units/ue-shared.patch`; the retained copy drops the appended duplicate.
