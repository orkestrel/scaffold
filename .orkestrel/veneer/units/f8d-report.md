# Unit F8d IMPORTANCE-LONGHANDS — report

`opus` on Opus 5.5 (native Claude subagent). Worktree `/home/user/veneer-f8d`, baseline `cdf7f55`.
The unit is done. No deviation stopped it. All acceptance criteria are met. One evidence fact in the
brief is contradicted (the value of Tailwind's `.col-1` rule); it does not affect any ruling. See
§ Deviations.

## Unknowns

- **Import direction.** `tests/setupService.ts` imports values from `./setupServer.js`
  (`CASCADE_PATH`, `readBuiltCascade`, `SheetReader`, `WORKSPACE_ROOT`, in the import block near the
  top of the file). `tests/setupServer.ts` imports nothing from `./setupService.js`. Per the brief,
  the rule shape is declared in `tests/setupServer.ts` as the `LonghandRule` interface
  (`selector`, `properties`, `important`, all readonly). `StageRule` keeps its own members and
  satisfies `LonghandRule` structurally. The consumer proof passes `StageRule[]` to both helpers,
  and `npm run check` exits 0. Flag for audit: the members of `LonghandRule` and `StageRule` are
  the same set. The brief fixed this form over importing against the existing direction.
- **Shorthand priority in Chromium.** Chromium reports `getPropertyPriority(...) === 'important'`
  on every longhand a `!important` shorthand sets. `grid-column: 5 !important` gives
  `important: ['grid-column-start', 'grid-column-end']`. The same measurement shows that Chromium
  lists normal declarations before important ones, whatever the authored order.
  `.vn-stage-probe { grid-column: 5 !important; margin-top: 0; color: red !important }` expands to
  `properties: ['margin-top', 'grid-column-start', 'grid-column-end', 'color']` and
  `important: ['grid-column-start', 'grid-column-end', 'color']`. The `expand` proof pins both
  arrays exactly.

## Changes

- `tests/setupService.ts`
  - The `StageRule` interface gains `readonly important: readonly string[]`, with TSDoc.
  - The `StageManager.expand` method fills `important` by filtering `Array.from(rule.style)` on
    `getPropertyPriority(name) === 'important'`. Its `@returns` and `@remarks` now state the
    importance reading and the shorthand behaviour measured in § Unknowns.
- `tests/setupServer.ts`
  - Adds the exported `LonghandRule` interface.
  - Adds the exported `collectRuleLonghands(rules, names): ReadonlyMap<string, readonly string[]>`
    function. Each name, first-seen and deduplicated, maps to the union of `properties` over the
    rules whose `collectSelectorClasses` include it, in first-seen order. A name that no rule
    names maps to `[]`.
  - `collectImportantNames(rules, longhands)` replaces `collectImportantNames(reader)`. It returns
    each name in the map, in map order, whose longhands are all in the union of `important` over
    the rules naming it. Ancillary choice: a name with an empty longhand list is not returned,
    because no importance was read for it and a vacuous `every` would otherwise drop it from the
    line. The TSDoc keeps the rule statement and names both inputs.
- `tests/setupServer.test.ts`
  - Adds `LonghandRule` to the type import and `collectRuleLonghands` to the value import and the
    export-name inventory.
  - Adds the `collectRuleLonghands` case "unions the properties of every rule whose selector names
    the class, in the order the names are given". It covers compound and descendant selectors,
    an attribute-value class that is not counted, a duplicate name, a name with no rule, and empty
    inputs.
  - Replaces the `collectImportantNames` case with two cases:
    - "reports a name whose importance covers every longhand it has to cover, across the rules
      naming it" (a union across rules, including a descendant selector, and an empty map).
    - "keeps a name out whose importance covers only some of its longhands, or another longhand"
      (a partial cover, importance on another longhand, an empty longhand list, and an
      attribute-value class).
- `tests/setupService.test.ts`
  - The `expand` case is retitled "expands each rule to the longhand names Chromium assigns and
    the ones it declares important, nested rules included, without applying the sheet". It adds
    the shorthand `!important` probe rule and asserts `important: []` on the normal rules.
- `tests/service/tailwind/consumer.test.ts`
  - The `collectSelectorClasses` import is replaced by `collectRuleLonghands`.
  - The exclusion reading is a module-scope `exclusion` constant, shared by the equality case and
    the new case.
  - The equality case reads `longhands = collectRuleLonghands(await stage.expand(instrumentProfile), shared)`
    and `important = collectImportantNames(await stage.expand(readBuiltCascade()), longhands)`.
  - The branch case plants
    `.col-1 { grid-column-start: 5 !important; grid-column-end: 5 !important }` (the longhand form
    was chosen; § Unknowns shows the shorthand also expands to both). It asserts
    `longhands.get('col-1')` equals `['grid-column-start', 'grid-column-end']`. It takes `branch`
    from `collectImportantNames` over the planted cascade and reads `properties` as the union of
    the branch names' longhands.
  - Adds the case "keeps a shared name on the line while its importance covers only some of the
    longhands Tailwind declares". It plants `.col-1 { grid-column-start: 5 !important }` alone and
    asserts three things: `col-1` is not in `collectImportantNames`, `excluded` contains `col-1`,
    and the equality holds.
- `guides/veneer.md`
  - § Tailwind equality paragraph: the sentence "The importance branch runs over the names Veneer
    declares important on some longhand" is replaced. The new text says the proof reads Tailwind's
    longhands and Veneer's importance as Chromium expands the two sheets, so a shorthand counts as
    the longhands it sets. The branch runs over names whose `!important` declarations cover every
    longhand Tailwind's rule declares. The plant covers both `col-1` longhands. A second plant
    makes only `grid-column-start` important, and the equality still holds with `col-1` on the
    line.
  - § Files: the `tests/setupServer.ts` row gains "the shared-name readings". The wording was kept
    inside the column's existing width, so the formatter does not re-pad the table. The
    `tests/setupService.ts` row is unchanged, because that file gains no export.

## Failing-first record

"Old implementation" here means the old per-name reading carried onto the new signature
(`if (properties.length > 0 && important.length > 0) names.push(name)`). The original body reads
`reader.declarations`, which is `undefined` on the new inputs. It would throw a `TypeError`, which
is a red for the wrong reason.

The consumer proof's command is
`npm run test:service -- tests/service/tailwind/consumer.test.ts`:

- Red: `Tests 1 failed | 7 passed (8)`. The failing case is the new "keeps a shared name on the
  line while its importance covers only some of the longhands Tailwind declares" case, with
  `expected [ 'col-1' ] to not include 'col-1'`.
- Green: `Tests 8 passed (8)`.

The setup proofs' command is
`npm run test:setup -- tests/setupService.test.ts tests/setupServer.test.ts`:

- Red: `Tests 1 failed | 116 passed (117)`. The failing case is `collectImportantNames > keeps a
  name out whose importance covers only some of its longhands, or another longhand`, which
  received `['col-1', 'table']`.
- Green: `Tests 117 passed (117)`.
- Between the red run and the green run, the `expand` proof failed once. That failure came from
  my first expectation of the authored order; it was corrected to Chromium's measured order. It is
  not part of this record.

## Mutation record

The main plant goes in `tests/setupServer.ts`, `collectImportantNames`, at the condition near
line 1777. It replaces
`if (properties.length > 0 && properties.every((property) => important.includes(property)))` plus
the following line `names.push(name)` with
`if (properties.length > 0 && important.length > 0) names.push(name)`. This is the per-name reading
that ignores what `longhands` contains.

- Consumer: `npm run test:service -- tests/service/tailwind/consumer.test.ts` gives
  `1 failed | 7 passed (8)`. Only the new case failed.
- Setup: `npm run test:setup -- tests/setupServer.test.ts` gives `1 failed | 92 passed (93)`.
  Only the "keeps a name out …" case failed.
- Reverse edit: the exact inverse replacement. `grep -n "properties.every" tests/setupServer.ts`
  finds the restored line, and `oxfmt --check` exits 0.

The second plant removes `properties.length > 0 && ` at the same site (the vacuous-`every` guard).

- Setup: `npm run test:setup -- tests/setupServer.test.ts` gives `2 failed | 91 passed (93)`. Both
  `collectImportantNames` cases received an extra `caption-top`.
- Reverse edit: the exact inverse `sed` substitution. After it, the same command gives
  `93 passed (93)`.

## Gates

All runs are from `/home/user/veneer-f8d`. `dist/` was absent in the worktree, so
`npm run build:src` ran first.

- `npx oxfmt --config .oxfmtrc.json --check` over the 6 owned files exits 0 ("All matched files
  use the correct format").
- `npx oxlint --config .oxlintrc.json --deny-warnings` over the 5 owned TypeScript files exits 0
  with no diagnostics.
- `npm run check` exits 0.
- `npm run test:setup` exits 0: `Test Files 4 passed (4)`, `Tests 236 passed (236)`, 14.39s.
  - Observation: 2 earlier runs exited 1 at load average 13.6 to 14.9. The failures were timeouts
    in cases this unit did not touch:
    - `server setup > records and reads official control state and rejects contradicted or
      absent obligation steps` ("Test timed out in 10100ms").
    - `server setup > oracle action bindings and exclusions` ("Hook timed out in 10100ms").
  - The green run was at load average 10.9.
- `npm run build:src:styles && npm run test:service` exits 0: `Test Files 3 passed (3)`,
  `Tests 18 passed (18)`, 10.76s wall time.
- `npm run test:guides` exits 0: `Tests 18 passed (18)`.

Bound check: a word-boundary grep for `collectImportantNames|collectRuleLonghands|LonghandRule`
over `tests/` and `guides/` finds only `tests/setupServer.ts`, `tests/setupServer.test.ts`, and
`tests/service/tailwind/consumer.test.ts`. The guide names none of these symbols.

## ROADMAP closing text (report-only)

The following text is the F8d row's status cell (`ROADMAP.md`, the row starting
`| F8d IMPORTANCE-LONGHANDS`). `COMMIT` is a placeholder for the landing commit:

> `opus` on Opus 5.5 from `cdf7f55` (the service proof drives Chromium, which the bench sandbox
> denies); landed as `COMMIT` after audit by `analyst` on Astra and `reviewer` on Opus 5.5; the
> stage's expanded rules carry their important longhands, `collectRuleLonghands` joins
> `tests/setupServer.ts`, `collectImportantNames` reports a shared name only where Veneer's
> importance covers every longhand Tailwind's rule for it declares, and the consumer proof's
> equality, its branch case, and a partial-importance case enforce that one rule

The findings-table row
"`collectImportantNames` and the shared-name equality in the consumer proof compute importance per
name … (F8c-B round 5)" closes with this text:

> Closed by F8d IMPORTANCE-LONGHANDS (`COMMIT`): importance is computed over the longhands
> Tailwind's rule declares, in the helper, the equality, and the branch case

## `git status --porcelain`

```text
 M guides/veneer.md
 M tests/service/tailwind/consumer.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupService.test.ts
 M tests/setupService.ts
```

`tmp/units/f8d-report.md` is this report. `tmp/` is ignored.

## `git diff cdf7f55 --stat`

```text
 guides/veneer.md                        |  17 +++---
 tests/service/tailwind/consumer.test.ts |  69 ++++++++++++++--------
 tests/setupServer.test.ts               | 100 +++++++++++++++++++++++++++-----
 tests/setupServer.ts                    |  83 ++++++++++++++++++++++----
 tests/setupService.test.ts              |  19 +++++-
 tests/setupService.ts                   |  28 +++++++--
 6 files changed, 252 insertions(+), 64 deletions(-)
```

## Deviations

None stopped the unit. The following items are recorded:

- **Evidence contradicted (not a stop).** The brief says Tailwind's `.col-1` rule declares
  `grid-column: span 1 / span 1`. The compiled instrument (`tests/fixtures/tailwind/unexcluded.css`
  through the installed `@tailwindcss/postcss`, in a scratchpad script) emits
  `.col-1 { grid-column: 1; }`. Chromium still expands it to `grid-column-start` and
  `grid-column-end`, and the branch case asserts that pair. So the ruling holds that the
  one-longhand plant covers one of two longhands. This is also consistent with the negative
  control's `grid-column-start: auto became 1`.
- **Standing condition not named in the brief.** The worktree had no `dist/`. `npm run build:src`
  (allowed by the brief) built it before the setup and service runs.
- **Timing.** The two oracle timeouts under load in `npm run test:setup` are reported in § Gates.
  The Orchestrator takes the deciding re-run.
- **Ancillary choices.**
  - The empty-longhand rule in `collectImportantNames`.
  - The name `LonghandRule`.
  - The module-scope `exclusion` constant.
  - The plants kept as case-local `planted` strings, the way the original branch case wrote its
    plant.
  - The case titles as listed in § Changes.
