# Unit bft report — B-FORMS-CLOSE-TABLES

Role `opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-bft` (detached at
`d02bd46`). Every acceptance criterion is green. No deviation stop was taken. The probe's reading
matches R4's expected line.

## Probe readings (criterion 1)

The script is `tmp/units/bft-literal-probe.sh`, and its log is `tmp/units/bft-literal-probe.log.txt`.
It ran once, before any other edit, and its `EXIT` trap restores the plant from a byte copy.

| Step | Command | Exit | Result line |
| --- | --- | --- | --- |
| Precheck | `grep -n 'letter-spacing' tests/setupStyles.ts guides/veneer.md` | 1 | No row and no Additions row names `letter-spacing` |
| Baseline | `sha256sum src/styles/components/_form-control.scss` | 0 | `76979f1cf0525fc4c6c5eecfeecf392f6e2aa9f82d0a4b498d760bf6ff8c8efc` |
| Plant | awk inserts `letter-spacing: 0.01em;` as the last line of the first `.form-control {` rule | 0 | `40a41 > letter-spacing: 0.01em;` |
| Build | `npm run build:src` | 0 | Build completed |
| Setup | `npm run test:setup` | 0 | `Tests  243 passed (243)` |
| Browser | `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/form-control.test.ts` | 0 | `Tests  32 passed (32)` |
| Conformance | `npm run test:conformance` | 1 | `FAIL ... cascade ledger > records every emitted name the official inventory lacks`; `Tests  1 failed \| 18 passed (19)`; received `"form-control \| .form-control { letter-spacing } \| — \| declaration"` |
| Restore | `cp` of the byte copy | 0 | `== restore: plant removed` |
| Hash | `sha256sum` after restore | 0 | `76979f1c…8efc`, `sha256 equal: yes` |
| Tree | `git status --porcelain src` | 0 | Empty |

The probe's `build:src` left a planted `dist/`. After the restore, `npm run build:src` ran again
(exit 0), and `grep -c "letter-spacing:.01em\|letter-spacing: 0.01em" dist/src/styles/*.css`
returned `0`.

## Diff summary

`git status --porcelain`:

```text
 M tests/conformance.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/components/form-range.test.ts
 M tests/src/styles/components/input-group.test.ts
```

`git diff --stat`:

```text
 tests/conformance.test.ts                       |  33 ++++-
 tests/setupServer.test.ts                       |  30 ++++
 tests/setupServer.ts                            |  36 +++++
 tests/setupStyles.test.ts                       | 123 +++++++----------
 tests/setupStyles.ts                            | 174 +++++++++++++++++-------
 tests/src/styles/components/form-range.test.ts  |  19 ++-
 tests/src/styles/components/input-group.test.ts |  33 +++--
 7 files changed, 304 insertions(+), 144 deletions(-)
```

Each file changes as follows:

- `tests/setupServer.ts`: exports `collectDeclarationReads(blocks: readonly CascadeBlock[])`. It
  routes each value through the existing `collectValueNames` export.
- `tests/setupServer.test.ts`: adds the helper test and its entry in the exports list.
- `tests/setupStyles.ts`: declares `FormRangeCase` and reshapes `FORM_RANGE_CASES` to per-property
  `reads` with its own reduced-motion twin rows. It deletes `INPUT_GROUP_ROUNDING` and its doc block,
  and adds one sentence to the `FORM_CONTROL_CASES` remark.
- `tests/setupStyles.test.ts`: routes the range, text-control, and input-group Node cases through
  the helper. The range case adds the per-property `toEqual` and the R9 condition exclusion. The
  fixture's import, exports entry, and freeze expectations are gone, and the freeze case's title
  drops "and the rounding rule".
- `tests/conformance.test.ts`: adds the in-memory planted-literal case. The inventory, shipped
  keys, and guide additions are held once at describe level.
- `tests/src/styles/components/input-group.test.ts`: removes the fixture import and all three
  `scene.load` calls. It rewrites the corner comments and binds kept corners to the resolved
  `--bs-border-radius`.
- `tests/src/styles/components/form-range.test.ts`: reads the map shape per property, on resting
  rows only.

## Acceptance criteria

1. **Met.** See § Probe readings.
2. **Met.** `npx oxfmt --config .oxfmtrc.json --check` over the 7 owned files exits 0
   (`Finished in 131ms on 7 files`). `npm run format:check` exits 0 (`All matched files use the
   correct format.`). `npm run lint:check` exits 0 and prints no finding. `npm run check` exits 0.
3. **Met.** `collectDeclarationReads` is exported and tested by `collects the custom properties
   each declaration reads, keyed by selector and by condition`. The fixture covers a property
   reading 3 names in order, a property reading none (absent), a reduced-motion twin keyed apart
   from its resting rule, two rules under one key where the later literal replaces the earlier
   token, and empty input. `grep -n "matchAll(/var" tests/setupStyles.test.ts` returns only line
   2725, in the `FORM_FLOATING_CASES` case. The brief keeps that case's joined-string shape for
   B-FORMS-LABEL, so the case is untouched.
4. **Met.** `grep -rn INPUT_GROUP_ROUNDING tests guides app src` exits 1. The first corner case and
   the floating corner case assert `[text, round]` and `[round, chosen]` equal to the radius that
   a `<span style="border-radius: var(--bs-border-radius)">` resolves to. Every case holds squared
   corners to `0`. The "until the control family lands" sentence is gone.
5. **Met.** `FormRangeCase` is declared as specified, and `FORM_RANGE_CASES` has the type
   `readonly FormRangeCase[]`. The table and every map and list in it are frozen, which the Node
   case asserts. The Node case asserts both of these equalities:
   - The `selector condition` rows equal the inventory's keyed rules.
   - The written keys equal the keyed rules, after excluding blocks whose normalized condition
     matches no range rule's.
   The per-property comparison is a `toEqual` on the map, and `form-range.test.ts` reads the map.
6. **Met.** `reports an unrecorded literal declaration on a shipped rule as a declaration addition`
   asserts `planted.unrecorded` equal to
   `['form-control | .form-control { letter-spacing } | — | declaration']` and `additions.unrecorded`
   equal to `[]`. The reader is unchanged.
7. **Met.** The `FORM_CONTROL_CASES` remark adds this sentence: "A literal declaration on a property
   the row neither values nor reads falls outside both maps, and the conformance case `records
   every emitted name the official inventory lacks` reports it as a `declaration` addition."
8. **Met.** The three gate commands returned these results:
   - `npm run test:setup` exits 0 (`Tests  244 passed (244)`).
   - `npm run test:conformance` exits 0 (`Tests  20 passed (20)`).
   - `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/input-group.test.ts tests/src/styles/components/form-range.test.ts`
     exits 0 (`Tests  25 passed (25)`).

The whole `npm run test:src:styles` run is an observation, not a criterion. It exited 0 with
`Test Files  75 passed (75)` and `Tests  739 passed (739)`. `npm test` was not run.

## Failing-first and mutation evidence

- **Helper, failing first.** Command:
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts`.
  - Before the implementation: `Tests  2 failed | 92 passed (94)`. The failures were `collects the
    custom properties each declaration reads, keyed by selector and by condition`
    (`TypeError: collectDeclarationReads is not a function`) and the exports case.
  - After the implementation: `Tests  94 passed (94)`.
- **Per-property range comparison.** The mutation swapped the thumb row's `width` and
  `margin-top` names. The joined-string `includes` check that this change removes would have passed
  it. Command:
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`.
  - With the mutation: `Tests  1 failed | 104 passed (105)`, and the failing case is the range
    Node case.
  - The file was then restored, and `cmp` confirmed it byte-identical.
- **Conformance case.** The probe's on-disk plant is the red reading of the same reader. The case
  asserts a non-empty exact list, so a reader that stopped reporting declaration additions reddens
  it.
- **R9 exclusion.** A runtime probe in `tmp/probe/` (since deleted) took three readings against
  in-memory copies of the real cascade:
  - A `.form-range:focus` block under `@media (forced-colors: active)` stays out of the written
    keys, which still equal the inventory's keys. The additions ledger reports it as
    `form-range .form-range:focus { outline } @media (forced-colors: active) declaration`.
  - A `.form-range:focus` block under `@media (prefers-reduced-motion: reduce)` enters the written
    keys as `.form-range:focus @media (prefers-reduced-motion: reduce)`, so the equality reddens.
  - The unmodified cascade gives written keys equal to the inventory's keys.

## Guide paragraph for the Orchestrator (`guides/veneer.md` § Input group classes)

Replace this span, from "The text control and select classes carry no radius…" through the
floating-wrapper sentence:

```text
The text control and select classes carry no radius of their own in this cascade, so the proof
supplies one from a consumer rule beneath the components layer; a corner the group squares reads
zero against it and a kept corner reads that radius. The floating wrapper is a plain box here, so
its rules are read on the wrapper and on the control inside it rather than on a rendered floating
label.
```

Use this exact text:

```text
The text control and select classes each write a `--bs-border-radius` corner through the
`input-border` mixin. The proof holds every kept corner to the radius the same element carries
outside a group, holds the control's and the select's kept corners to the value
`--bs-border-radius` resolves to, and reads every corner the group squares as zero. The floating
wrapper writes `position: relative` and no border, so the group's free-space and focus-lift rules
are read on the wrapper, and the corners the group squares are read on the control or select
inside it, which carries the border; the floating rows render no label.
```

## The unknown's answer

Every corner expectation holds from the shipped radius, and no expectation changed its value.
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/input-group.test.ts`
returned these results:

- Before, with the `HEAD` copies of `tests/setupStyles.ts` and `input-group.test.ts` put in place
  temporarily and restored byte-identical by `cmp`: `Tests  19 passed (19)`.
- After the change: `Tests  19 passed (19)`.

The fixture was inert. Its `border-radius: 7px` sits in `@layer elements`, and the components-layer
`border-radius: var(--bs-border-radius)` on `.form-control` and `.form-select` outranks it. Two
assertions were added: the first corner case now binds the addon and the control, and the floating
corner case binds the control and the select, each to the resolved `--bs-border-radius`.

## Decisions recorded (deviation contract, ancillary)

- **Helper parameter.** The helper takes `blocks: readonly CascadeBlock[]` instead of
  `cascade: string`. Every calling case already holds the blocks: the input-group case counts
  them, and the range case filters them by condition. The helper drops properties that read no
  custom property, which is the population a row names, so the three
  `Object.fromEntries(... names.length > 0)` projections are gone.
- **Normalized conditions.** The range exclusion compares normalized conditions through
  `normalizeMediaCondition`. That is the matching rule the additions reader applies.
- **Resting rows in the browser.** The browser range case reads resting rows only. `findRule`
  returns the first rule a selector reaches, and a twin's `{}` map is read by the existing
  motion case.
- **Planted ledger at describe level.** The conformance case's planted ledger is built at describe
  level, the same way the existing `measured` ledger is. One run built it inside the test while
  the whole styles suite ran concurrently, and it timed out at the 5000 ms default. Idle, the file
  runs in `Duration  12.99s`.
- **Range remark wording.** The range remark keeps the `FORM_CONTROL_CASES` sentences. It replaces
  "leaves its literals to the value assertions" with the table's own clause ("which is what
  separates a rule holding Bootstrap's own values from one this package routed onto tokens"),
  because the range table holds no values.

## Weakest claims

1. **R9 has no population on this tree.** Removing the condition filter changes nothing at
   `d02bd46`. The exclusion rests on the deleted probe until `bff` adds the forced block.
2. **The key expression is not centralized.** The `condition === undefined ? selector :
   `${selector} ${condition}`` expression recurs in the helper and in the Node cases. It also
   recurs in the untouched floating case, which keeps its inline `matchAll(/var\(` scan for
   B-FORMS-LABEL.
3. **Browser shorthand readings rely on Chromium serialization.** The browser range reading calls
   `getPropertyValue` on shorthands (`transition`, `border-radius`). It passes only because
   Chromium returns a `var()`-bearing shorthand as written.
4. **One timing failure under contention.** The conformance timeout above was observed once under
   load. It is an observation for the Orchestrator's idle run, not a diagnosis.
