<!-- Retained by the Orchestrator: `uf-status.txt` and `uf.diff` captured read-only from /home/user/veneer-uf at retention, because the unit returned none. -->
# UTIL-FONT (`uf`) report

Unit UTIL-FONT ran as `opus` on Opus 5.5, a native subagent, in `/home/user/veneer-uf` (branch `unit/uf`, base `2a3f223`). The unit shipped the `font`, `fs`, `fst`, `fw`, and `lh` keys whole. Every scoped gate reads green on the validation copy. No stop condition fired. Mid-campaign notes 1 and 2 are applied (§ Mid-campaign notes applied).

## Owned files

| File | Change |
| --- | --- |
| `src/styles/utilities/_font.scss` | Added (54 lines). Writes the five entries in the release's map order through the `utility` mixin, in one `breakpoint-each` walk, in the `utilities` layer. `.fs-N` reads `var(--vn-size-{9-N})`, `.lh-base` reads `var(--vn-line-body)`, `.font-monospace` reads `var(--bs-font-monospace)` byte for byte, and the other values stay literal. The partial writes no fluid formula, no 1200px cap, no hand-written `!important`, and no mode rule. |
| `tests/src/styles/utilities/font.test.ts` | Added (298 lines, 28 cases). The mirrored proof. Every case population comes from a frozen setup table. |
| `tests/app/browser/sections/TypeSection.test.ts` | +39. Covers the appended specimen names, their markup, and their element sequence. |
| `app/browser/sections/TypeSection.ts` | 1 line. TSDoc summary: "Renders the declared typography, list, quotation, and font utility specimens into a named region." |

Owned diffstat against `2a3f223`: `git diff --stat` reads `TypeSection.ts | 2 +-` and `TypeSection.test.ts | 39 +`, and the two added files are untracked. `git status --porcelain` lists ` M app/browser/sections/TypeSection.ts`, ` M tests/app/browser/sections/TypeSection.test.ts`, `?? src/styles/utilities/_font.scss`, and `?? tests/src/styles/utilities/font.test.ts`.

The shared patches (report-only) are retained in `.orkestrel/veneer/units/` (the combined patch) and `.orkestrel/veneer/units/uf-instruments/` (the per-file patches). `uf-shared.patch` is the combined patch. The per-file patches are `uf-src-styles-index.scss.patch`, `uf-tests-conformance.test.ts.patch`, `uf-tests-setupStyles.ts.patch`, `uf-tests-setupStyles.test.ts.patch`, `uf-tests-setupServer.test.ts.patch`, `uf-tests-setup.ts.patch`, `uf-app-browser-constants.ts.patch`, and `uf-guides-veneer.md.patch`. `git apply --check .orkestrel/veneer/units/uf-shared.patch` passes against the worktree. `git apply --stat` reads: 8 files changed, 316 insertions(+), 4 deletions(-).

The retained evidence is in the same directory:
- `uf-mutations.sh` is the mutation instrument, and `uf-mutations.log.txt` is its log. The log gives each site, command, exit, summary line, and failing case name.
- `uf-gates.log.txt` holds the scoped gate exits.
- `uf-tailwind-probe.log.txt` holds the Tailwind instrument and its output.
- `uf-format-check.log.txt` and `uf-lint-check.log.txt` hold the worktree checks.
- `uf-stage-*.log.txt` are the staging logs.

## Baseline (clean worktree at `2a3f223`, before any edit)

- `npm run test:conformance`: exit 0, 22 passed.
- `npm run test:service`: exit 0, 18 passed.

## Failing-first evidence

Every run here is logged in `uf-mutations.log.txt`.

| Section of the log | Command | Before the change | After the change |
| --- | --- | --- | --- |
| `absent` | `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/utilities/font.test.ts`, with the `@use 'utilities/font'` line removed | build ✓, **27 failed, 1 passed (28)**. The one that passed is `writes no infixed class for any font entry`, which an absent partial satisfies. | 28 passed (`control`). The log confirms the rebuilt cascade equals the pristine build. |
| `section` | `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/sections/TypeSection.test.ts`, with the five specimens removed | **1 failed, 1 passed**: `renders every Type specimen in table order inside the named region` | 2 passed |
| `ledger` | `npm run test:conformance`, with the `#### fs` and `#### lh` tables removed | **1 failed, 21 passed**: `records every measured value difference in the guide ledger` | 22 passed |
| `tablevalue`, `entryrow`, `entryproperty` | `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts -t "font entry"`, with one table value changed, one entry row removed, or one row's property changed | **1 failed** each: `binds the font entry, weight, style, and line-height tables to the inventory in its order` | passing, in the `setup` gate |

## Coverage matrix

The inventory holds 24 records under the unit's keys: 20 unconditioned selectors and 4 records under `@media (min-width: 1200px)`. The built cascade holds 20 rules under those keys. Each rule sits in `@layer utilities` under no media, and each carries `!important` on its one property declaration. The rules write no custom property, and the cascade holds no other selector under those keys.

Each mutation was applied to the built cascade and the proof re-run. The Red column lists the cases each mutation turns red, and the Log column names the section of `uf-mutations.log.txt` that records the run.

| Inventory record or condition | Proof case | Mutation (log section) | Red | Specimen | Capture scenario |
| --- | --- | --- | --- | --- | --- |
| `.font-monospace { font-family }` | `reads the monospace stack from the alias the release names and the token the alias reads` | The value written as `var(--vn-font-mono-base)` (`monotoken`). A literal `monospace` (`monoliteral`). | 1 each | Monospace | `monospace` (`.font-monospace`, `font-family`) |
| `.fs-1` to `.fs-4 { font-size }`, unconditioned | `resolves the size class of the 'hN' level to the size its heading class resolves at each journey viewport` (390 and 1280). `reads the size class of the 'hN' level from the '--vn-size-{9-N}' token its heading class reads`. | The fluid `calc()` expression (`fluid`). The release literal (`literal`). | 10 and 13 | Font sizes | `font-sizes` (`.fs-1`, `font-size`) |
| `.fs-5`, `.fs-6 { font-size }` | The same two cases. | The release literal (`literal`: levels 5 and 6 red in the retune case, level 5 red in the viewport case). `.fs-6` alone as `1rem` (`fs6literal`). | 13 and 1 | Font sizes | `font-sizes` |
| `.fs-1` to `.fs-4` under `@media (min-width: 1200px)`, dropped | The viewport case at 1280. | The release cap block added (`cap`). | 4 (levels 1 to 4) | Font sizes | `font-sizes` |
| `.fst-italic`, `.fst-normal { font-style }` | `resolves every style step inside an oblique parent`. The parent is `oblique 20deg`, because Chromium 141 computes a bare `oblique` as `italic`. | `.fst-italic` renamed away (`italicmissing`). | 3 | Font styles | `font-styles` (`.fst-italic`, `font-style`) |
| `.fw-lighter` to `.fw-bolder { font-weight }` (7 records) | `resolves every weight step under a 400 parent weight` and `under a 600 parent weight`. Each step is read against an inline twin carrying the recorded value. The control case is `resolves the relative weight steps differently under the two parent weights`. | `lighter` written as 100 (`lighter100`). `bolder` written as 700 (`bolder700`). `.fw-normal` renamed away (`normalmissing`). | 2, 2, and 1 | Font weights | `font-weights` (`.fw-bolder`, `font-weight`) |
| `.lh-1`, `.lh-sm`, `.lh-lg { line-height }` | `resolves the '<key>' line height as its recorded factor of a fixed font size` | `.lh-sm` written as 1.2 (`lhsm`). | 2 | Line heights | `line-heights` (`.lh-lg`, `line-height`) |
| `.lh-base { line-height }` | The factor case, and `reads the base line height from the body line token` | A literal 1.5 (`lhliteral`). | 1 | Line heights | `line-heights` |
| No infixed class, every key | `writes no infixed class for any font entry`. It reads each entry's `-md` form at 1401 against the surrounding paragraph. It also runs `findRule` for every value of every entry under every breakpoint infix, built from `BREAKPOINT_INFIXES` and the setup tables. | `.fw-md-bold` added (`infixed`). `.fw-md-semibold` added (`infixedsample`). | 1 each | — | — |
| Mode and density factor, every key | `reads no mode or density factor, so a dark island and a doubled factor leave every value` | A `[data-bs-theme=dark] .fw-semibold` rule added (`moderule`). `.lh-lg` written as `calc(2 * var(--vn-factor-density))` (`density`). | 1 each | — | — |

The control run (`control`) read 0 failed, 28 passed. The log confirms the pristine cascade was restored after the cascade mutations.

## Precedence cases and their mutations

1. **Later value inside an entry.** The case is `resolves the later value of an entry where an element carries two of its classes`. Each attribute lists its classes in the reverse of map order. Mutations: rules reordered inside each entry (`reorder`: 1 red). `!important` dropped (`normal`: 3 red, this case included). Rules moved to an elements-layer block (`elementslayer`: 2 red, this case included).
2. **Size class over heading and display classes.** The case is `overrides the heading and display classes on the same element`. `.h1.fs-6.fw-light.lh-sm` reads 16px, 300, and 20px, and `.display-1.fw-bold.fs-2` reads 30px and 700. Mutation: the rules this case reads, moved to `@layer elements` at normal priority (`elementslayer`: red). Dropping `!important` alone leaves this case green, because the utilities layer already beats the components layer. So this case pins the layer, and case 3 pins the priority.
3. **Priority over a later unlayered rule.** The case is `keeps its priority over a later unlayered consumer rule`. The consumer rule moves every property on the unclassed paragraph and none on the classed one. Mutation: `!important` dropped (`normal`: red).
4. **Escape.** The case is `yields to an important override inside the utilities layer and to no unlayered one`. Mutations: `!important` dropped (`normal`: red). The `.fs-3` and `.lh-base` rules moved out of every layer, still important (`unlayered`: 1 red, this case).

## Shared-name table

Tailwind 4.3.3 generates no rule for any of the unit's names, so the unit ships no shared name. The exclusion line, its copies, and `tests/fixtures/tailwind/markup.html` stay unchanged. The unit returns no line names for the union.

| Name | Longhands Tailwind declares | Measured exclusion-line status |
| --- | --- | --- |
| `font-monospace` | none (Tailwind emits no rule) | not shared; stays off the line |
| `fs-1` to `fs-6` | none | not shared |
| `fst-italic`, `fst-normal` | none | not shared |
| `fw-lighter`, `fw-light`, `fw-normal`, `fw-medium`, `fw-semibold`, `fw-bold`, `fw-bolder` | none | not shared |
| `lh-1`, `lh-sm`, `lh-base`, `lh-lg` | none | not shared |

`uf-tailwind-probe.log.txt` holds the evidence:
- The readiness step's candidate list carries all 20 names.
- A direct compile through `@tailwindcss/postcss` of the 20 names plus the controls `font-mono`, `italic`, and `leading-6` emits only `.font-mono`, `.leading-6`, and `.italic`.

The profiles case `withholds every shared class name the exclusion line names, and emits exactly the shared names off it` stays green. That case derives the shared set from the instrument, which carries no exclusion line.

Negative control (`tailwind-line` in the mutation log): `fw-bold` was written onto the exclusion line in `tests/setup.css`, `consumer.css`, `preflight.css`, and the guide fence. `npm run build:src:styles && npm run test:service` then read **exit 1, 2 failed | 16 passed**. The failures were `derives the shared class names, and mounts an element for every one of them` and `keeps a shared name on the line while its importance covers only some of the longhands Tailwind declares`. The log confirms the line was restored. The "`!important` dropped" form of the control does not apply here, because no name the unit ships is shared.

## Ledger rows written

These are the categories the comparison prints (`collectLedger`, read from the `ledger` failing-first run).

- `#### fs`, placed after `#### fixed` in sorted-key order:
  - `fs | .fs-1 | font-size | — | calc(1.375rem + 1.5vw) | var(--vn-size-8) | tokenized`
  - `fs | .fs-2 | font-size | — | calc(1.325rem + 0.9vw) | var(--vn-size-7) | tokenized`
  - `fs | .fs-3 | font-size | — | calc(1.3rem + 0.6vw) | var(--vn-size-6) | tokenized`
  - `fs | .fs-4 | font-size | — | calc(1.275rem + 0.3vw) | var(--vn-size-5) | tokenized`
  - `fs | .fs-5 | font-size | — | 1.25rem | var(--vn-size-4) | tokenized`
  - `fs | .fs-6 | font-size | — | 1rem | var(--vn-size-3) | tokenized`
  - `fs | .fs-N | font-size | @media (min-width: 1200px) | <cap> | — | dropped`, one row for each of N = 1 to 4, with the caps `2.5rem`, `2rem`, `1.75rem`, and `1.5rem`
- `#### lh`, placed after `#### lead`: `lh | .lh-base | line-height | — | 1.5 | var(--vn-line-body) | tokenized`
- `### Additions`: none. The additions gates read green.
- `font`, `fst`, and `fw` carry no departure.

## Section text

The Type region keeps its section class. Its copy and specimens change through the constants patch. The region paragraph reads: "Heading and display classes, lead copy, inline emphasis, lists, quotations, and the font utilities that set the size, weight, style, line height, and monospace stack of a run of text."

The specimens are appended in this order: `Font sizes`, `Font weights`, `Font styles`, `Line heights`, and `Monospace`. The patch carries the markup. Each specimen uses only classes shipped at `2a3f223` plus the unit's own.

## Unknowns, answered

- `attributeSelector`: each of the 20 selectors is recorded under exactly one inventory key, and that key is the selector's class prefix. No pre-existing cascade selector carries a `font-`, `fs-`, `fst-`, `fw-`, or `lh-` class. The ladder needs no change, and the ledger run attributed every row to the `fs` key or the `lh` key.
- Exclusion status: settled by measurement. No name is shared.

## Scoped gate exits

Criterion 1 ran in the worktree. Criteria 2 to 7 ran on the validation copy `tmp/probe/base/`, which is `git archive 2a3f223`, plus the owned files and `uf-shared.patch`. The gate log is `uf-gates.log.txt`.

1. `npm run format:check`: exit 0 (353 files). `npm run lint:check`: exit 0. Both ran in the worktree.
2. `npm run check`: exit 0.
3. `npm run build:src`: exit 0. The inventory holds 24 records and the cascade holds 20 rules, per § Coverage matrix.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/font.test.ts`: exit 0, 28 passed. The whole styles project read exit 0, 93 files and 1087 tests passed.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/TypeSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts`: exit 0, 7 passed. `npm run test:app` read exit 0, 40 files and 112 tests passed.
6. `npm run test:conformance`, with the ledger rows applied: exit 0, 22 passed.
7. `npm run build:src:styles && npm run test:service`: exit 0, 18 passed. The negative control is recorded in § Shared-name table.

Further readings on the copy:
- `npm run test:setup`: exit 0, 267 passed. Two earlier runs, under a load average near 16 on 4 cores, timed out once each in the Button oracle case `records and reads official control state and rejects contradicted or absent obligation steps` at 10100ms. That case reads none of the unit's files. Record it only as a load observation.
- `npm run test:policy`: exit 0, 109 passed and 1 skipped.
- `npm run test:guides`: exit 0.
- Observation: `npm run test:journey` (no `CAPTURE`), run before note 1, read exit 0, 176 passed, with the five `CASCADE_KEYS` rows registered.

The validation copy under `tmp/probe/` was deleted before this report.

## Mid-campaign notes applied

Note 1:
1. **Code tokens take a noun.** The guide patch now writes "the `!important` flag", "a fluid `calc()` expression", "the `1.5` factor", "the `var(--vn-line-body)` value", and "proved in the `tests/src/styles/utilities/font.test.ts` proof" in each compatibility row. The `FONT_WEIGHT_PARENTS` remark states the weights as plain numbers. A sweep of every comment and doc block in the owned files and the patches finds no bare token.
2. **No case population in the test file.** A frozen, exported `FONT_ENTRY_CASES` table (prefix, property, and one class per entry) joins `tests/setupStyles.ts`. The infixed-class, dark-and-density, and priority cases derive their classes and properties from it. The infixed lookup derives every value from `TYPE_HEADING_CASES`, `FONT_STYLE_VALUES`, `FONT_WEIGHT_CASES`, `LINE_HEIGHT_CASES`, and `BREAKPOINT_INFIXES`.
3. **Every mutation logged.** `uf-mutations.sh` re-ran every mutation, and `uf-mutations.log.txt` retains each one.
4. **Stated only what a rule applies.** Every retune claim names a rule that applies the token: `.fs-N` applies `font-size`, `.lh-base` applies `line-height`, and `.font-monospace` applies `font-family`.
5. **Tables bound by derivation.** The binding case derives the font keys from the inventory by rule shape: every key whose every rule is one `.KEY-*` class setting one longhand of the `font` shorthand. It then compares each table against the inventory's records under its key, without restating the literal values.

Note 2: the unit wrote three items in the session scratchpad, before note 2 arrived: a `uf/` directory, and the files `fmt.txt` and `lint.txt`. Each was the unit's own. The contents of the two files moved to `uf-format-check.log.txt` and `uf-lint-check.log.txt`. Each item was then removed by the path the unit created it at. Every other instrument and log sits under `tmp/units/` (retained under `.orkestrel/veneer/units/uf-instruments/`) or `tmp/probe/` with the `uf` prefix. The unit read only the npm 11 `PATH` entry from the scratchpad.

## Deviations (ancillary choices, recorded)

- **Section heading.** The unit named the section `### Font utilities`, for the mechanism and the partial, as `### Gap utilities` names its section while its specimens sit in Layout. The release's documentation page for these classes is "Text", and UTIL-TEXT's section takes that name. The section sits after `### Visibility utilities`.
- **Showcase prose.** § Showcase gains one sentence: "The font utilities join Type beside the heading and display classes whose sizes they share."
- **Reused tables.** The size cases reuse `TYPE_HEADING_CASES` and `TYPE_HEADING_TOKEN_CASES`. So the disjoint-default invariant `setupStyles.test.ts` already holds over those retune values also arms the `.fs-N` retune.
- **Compatibility component set.** The `tests/setupServer.test.ts` case `skips engine and CSS obligations whose Proof cell is a dash` enumerates the compatibility components, and the brief grants that set. It went red without the five keys, so it carries a patch.
- **ROADMAP.** No patch. The fold names the landing commit, which the unit cannot know. A suggested clause for the B-UTILITIES row: "UTIL-FONT landed as `<commit>` (the font family, size, style, weight, and line-height keys appended to the Type region, the size classes on the heading scale with the fluid formula and its cap dropped, and no shared Tailwind name)".

No stop condition fired. The brief, the family record, and the tree agreed on every fact this unit read.

## What the unit could not close

- `CAPTURE=1` frames for the `font-sizes`, `font-weights`, `font-styles`, `line-heights`, and `monospace` scenarios, which are the Orchestrator's run at landing.
- The ROADMAP fold, which carries the landing commit.

## Shared-file patches (exact, unified diff against `2a3f223`)

The exact shared patch is `.orkestrel/veneer/units/uf-shared.patch`; the retained copy drops the appended duplicate.
