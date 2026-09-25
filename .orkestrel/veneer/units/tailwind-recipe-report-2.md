# Unit TAILWIND-RECIPE round 2 report

The preflight recipe's markup `@source` line is load-bearing. `compileProfile` roots the plugin's automatic source
detection at an empty scratch directory, so removing the line from `consumer-preflight.css` fails the order case on
`.px-8` with an assertion. Before the fix, the same plant left that assertion green. The `components.html` and `consumer-preflight.css` fixtures
are read through `TAILWIND_PATHS`. `COMPONENT_FLOOR` and `OVERLAP_FLOOR` are frozen exports of `tests/setupService.ts`. Every moved-longhand report goes
through `collectMovedLonghands`, which `tests/setupServer.ts` exports and `tests/setupServer.test.ts` proves. Every gate
in Acceptance exited 0. Deviation state: none. Shared-file patches: none.

Role and engine: `opus` on Opus 5.5, native Claude subagent, sole writer in `/home/user/veneer-twr` over Veneer
`21c821a`, with round 1 uncommitted beneath it.

## Touched files

- `tests/setupService.ts`: `compileProfile` compiles with `base` set to an empty scratch directory that it owns and
  removes. `TAILWIND_PATHS` gains the `components` key and the `consumer` group (`tailwind`, `preflight`). The module
  adds the frozen `COMPONENT_FLOOR` and `OVERLAP_FLOOR` exports and the `COMPONENT_TIMEOUT` budget. `importCompiler` and
  `ReadinessOptions.compiler` are typed as the installed plugin (`typeof tailwindcss`) in place of
  `PluginCreator<never>`, so the compile can pass the `base` option.
- `tests/setupService.test.ts`: the export-list case gains the added exports and their frozen checks. The `TAILWIND_PATHS`
  case flattens the `consumer` group and asserts the extended population. An added `compileProfile` case proves the scan
  isolation against the plugin's default.
- `tests/setupServer.ts`: adds `collectMovedLonghands` beside `collectImportantNames` and changes nothing else.
- `tests/setupServer.test.ts`: adds the `collectMovedLonghands` proof, its import, and its export-list row, and changes
  nothing else.
- `tests/service/tailwind/consumer.test.ts`:
  - reads every fixture through `TAILWIND_PATHS` and imports `COMPONENT_FLOOR`;
  - routes every moved-longhand report through the helper;
  - renames the recipe page's `StageManager` to `served`;
  - retitles the order cases and the component case;
  - requires the `base` block to carry rules;
  - gives the component case `COMPONENT_TIMEOUT`;
  - rewrites the comments about the markup line.
- `tests/service/tailwind/profiles.test.ts`: the exclusion-line census reads each file of `TAILWIND_PATHS.consumer`, so
  it includes `consumer-preflight.css`.
- `tests/service/tailwind/preflight.test.ts`: imports `OVERLAP_FLOOR` in place of the local `FLOOR_TAGS`. It routes the
  staged-defaults no-move equality through the helper.
- `guides/veneer.md`: covers § Tailwind (the recipe paragraph, the preflight paragraph, the list of written copies, and
  the `gap-3` paragraph), the § Files `tests/setupService.ts` row, and the § Tests Tailwind sentence.
- `tests/fixtures/tailwind/**`: unchanged from round 1 (`diff -u` against the round 2 backups is empty).

Diffstat (`git diff 21c821a --stat`; the fixtures are untracked and appended to `twr-2.diff` through
`git diff --no-index /dev/null <file>`):

```text
 guides/veneer.md                         | 131 ++++++++------
 tests/service/tailwind/consumer.test.ts  | 282 +++++++++++++++++++++++++------
 tests/service/tailwind/preflight.test.ts |  35 ++--
 tests/service/tailwind/profiles.test.ts  |  13 +-
 tests/setupServer.test.ts                |  81 +++++++++
 tests/setupServer.ts                     |  40 +++++
 tests/setupService.test.ts               |  50 +++++-
 tests/setupService.ts                    | 103 +++++++++--
 8 files changed, 585 insertions(+), 150 deletions(-)
 tests/fixtures/tailwind/components.html        | 56 lines (untracked, round 1)
 tests/fixtures/tailwind/consumer-preflight.css |  6 lines (untracked, round 1)
```

## Source isolation: the mechanism and its reading

The installed `@tailwindcss/postcss` 4.3.3 plugin uses its `base` option (default `process.cwd()`) only as the root of
automatic source detection. That root is `{ base, pattern: '**/*' }` when the stylesheet's import writes no `source(…)`
argument. The plugin resolves imports and `@source` rules against `dirname(from)`, independently of `base`
(`node_modules/@tailwindcss/postcss/dist/index.mjs`, function `Jt`). So `compileProfile` passes `base: scratch.path` for
an empty `createScratch()` directory and destroys it in `finally`. The compile then scans exactly the files that the
profile's own `@source` rules name. Profiles that write `source(none)` (`tests/setup.css`, `preflight.css`, and
`unexcluded.css`) compile the same either way.

The reading comes from `node tmp/units/twr-2-isolation-probe.mjs` (retained as `twr-instruments/r2/twr-2-isolation-probe.mjs`) (log `twr-instruments/r2/twr-2-isolation-probe.log.txt`, load
average 1.30). It compiles each recipe from its own path through the real plugin:

| Recipe                   | Detection root     | Markup line | `.px-8` | `.sepia-390` | `.ring` |
| ------------------------ | ------------------ | ----------- | ------- | ------------ | ------- |
| `consumer.css`           | working directory  | present     | yes     | yes          | yes     |
| `consumer.css`           | working directory  | removed     | yes     | yes          | yes     |
| `consumer.css`           | empty directory    | present     | yes     | no           | no      |
| `consumer.css`           | empty directory    | removed     | no      | no           | no      |
| `consumer-preflight.css` | working directory  | present     | yes     | yes          | yes     |
| `consumer-preflight.css` | working directory  | removed     | yes     | yes          | yes     |
| `consumer-preflight.css` | empty directory    | present     | yes     | no           | no      |
| `consumer-preflight.css` | empty directory    | removed     | no      | no           | no      |

- `.sepia-390` and `.ring` are classes written only in repository text outside the markup. Each is absent from the
  isolated compile.
- The isolated selector set is a subset of the unisolated one (`isolated not in cwd: []`). The removed selectors are
  the repository-only classes, such as `.flex`, `.grid`, `.blur`, `.ring`, and `.sepia-390`.
- Under isolation, the markup line adds `.hidden` and `.px-8`, and nothing else. Without isolation, the markup line adds
  nothing (`cwd with the line, not without it: []`).
- The removed classes appear on no mounted element, and every service case stayed green (`twr-2-test-service.log.txt`).
  So the isolation changes no reading beyond the markup line's own classes, and the stop condition did not fire.

The committed proof is `compileProfile > scans only the markup the profile's own source rules name, and nothing the
working directory carries`. A `@tailwind utilities;` profile with `@source './markup.html'` over
`<div class="flex">` compiles to `['flex']`. The same bytes through `postcss([plugin()])` emit other names from the
working directory, and that is the control. The mutation this case catches is `compileProfile` dropping the `base`
option. Before the fix it failed with `AssertionError: expected [ 'pointer-events-auto', …(135) ] to deeply equal
[ 'flex' ]`.

## Key ruling

`consumer-preflight.css` has no one-word key: `recipe` also names `consumer.css`, and `preflight` is taken by the
profile. So the shape changes. `TAILWIND_PATHS.consumer` becomes a frozen group of the recipes the workspace executes,
keyed by the profile each recipe carries:

- `TAILWIND_PATHS.consumer.tailwind` is `tests/fixtures/tailwind/consumer.css`.
- `TAILWIND_PATHS.consumer.preflight` is `tests/fixtures/tailwind/consumer-preflight.css`.
- `TAILWIND_PATHS.components` is `tests/fixtures/tailwind/components.html`.

Every leaf is one word, per `.claude/rules/names.md` § Group options by entity. Every consumer of
`TAILWIND_PATHS.consumer` was updated: `consumer.test.ts` and `profiles.test.ts`. The census walks
`Object.values(TAILWIND_PATHS.consumer)`, so a recipe added to the group joins the census without an edit.

## Helper

The helper is exported from `tests/setupServer.ts` beside `collectImportantNames`:

```ts
export function collectMovedLonghands(
	standalone: ReadonlyArray<readonly [string, ReadonlyMap<string, string>]>,
	paired: ReadonlyArray<ReadonlyMap<string, string>>,
): readonly string[]
```

It returns `label property: value became after` for each longhand of each standalone reading whose paired value
differs. A property the paired map lacks, or a standalone reading with no pair at its index, reports as
`became undefined`. The helper is pure, and it throws nothing.

The proof is in `tests/setupServer.test.ts > collectMovedLonghands`:

- `reports nothing for readings that resolve every longhand alike`: the paired maps are separate objects in another key
  order, plus the empty case.
- `reports each longhand whose value changed, labelled with its reading, in reading order`
- `reports a longhand the paired reading lacks, and every longhand of a reading with no pair`

The export-list case gains the `collectMovedLonghands` row.

Sites routed through the helper:

- `consumer.test.ts`: the tailwind recipe's shared-name equality, the important-branch equality, the exclusion-control
  case (it asserts `toContain('col-1 grid-column-start: auto became 1')`, which adds the `col-1` label), the preflight
  recipe's shared-name equality, and the component case's `moved` and `displaced` readings. A floor class is displaced
  when the helper reports any move on the control page. That is the same predicate the inline loop pushed per property.
- `preflight.test.ts`: the staged-defaults equality (`expect(collectMovedLonghands([[tag, held]], staged)).toEqual([])`).
  Its `held` reading gains `requireValue(…, 'The fixture rendered no <tag>')`, which follows the file's existing
  convention for the same read. The fixture always mounts the tag.

Sites ruled not to be copies, and left in place:

- `preflight.test.ts`, the staged-defaults case's `moved` list. It computes which property names moved, so that it can
  intersect them with the `lower` and `declared` populations. The helper returns lines, so it cannot answer that
  without its lines being parsed back.
- `preflight.test.ts`, the per-property loop of the `it.each` case. It asserts each declared longhand by tag, property,
  and value, and it records the `kept` and `measured` rows beside each assertion. It never builds the move report.

## Failing-first evidence

| Command                                                                                                            | Before the fix                                                  | After the fix                                                |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------ |
| `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupService.test.ts` | `Tests 7 failed \| 143 passed (150)`, `exit=1` (`twr-2-setup-before.log.txt`) | `Tests 150 passed (150)`, `exit=0` (`twr-2-setup.log.txt`) |
| `npm run test:service` with the markup line removed from `consumer-preflight.css`                                  | `Tests 1 failed \| 23 passed (24)`: only the fence case fails, and `.px-8` stays green (`twr-2-plant-markup-before.log.txt`) | `Tests 2 failed \| 22 passed (24)`: the fence case and the scanner assertion (`twr-2-plant-markup-final.log.txt`) |

The failing tests before the fix were:

- `server setup > declares the identity constants, …` (the export list);
- `collectMovedLonghands > reports nothing for readings that resolve every longhand alike`;
- `collectMovedLonghands > reports each longhand whose value changed, labelled with its reading, in reading order`;
- `collectMovedLonghands > reports a longhand the paired reading lacks, and every longhand of a reading with no pair`;
- `service setup > exports the readiness verdict and its gathering, the compiler loader, the profile compile, the
  Tailwind paths and floors, the proof budgets, and the stage`;
- `TAILWIND_PATHS > locates each Tailwind profile and fixture the service proofs read, as a file under the workspace
  root`;
- `compileProfile > scans only the markup the profile's own source rules name, and nothing the working directory
  carries`.

## Plants

Each plant ran through `twr-instruments/r2/twr-2-plant.sh` (plant program `twr-instruments/r2/twr-2-plant.py`), with the command
`npm run test:service`. The driver echoes each command it runs. It restores the guide and the `consumer.css` and `consumer-preflight.css` fixtures from
backups taken before the plant. Each log records the `cmp` byte-identical restores and an unchanged `git diff --stat`
and `git status`. The `-final` plants ran after the last edit to any owned file. `sha256sum -c
twr-instruments/r2/twr-2-final.sha256` reports every owned file unchanged since the checksums were taken before those plants.

| Plant (log `twr-instruments/r2/twr-2-plant-<name>.log.txt`)                    | Change                                                         | Failing case and assertion                                                                                                                                                                                                                                                                                                                                  | Restored |
| --------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `markup-before` (round 1 code)                                        | remove `@source './markup.html';` from `consumer-preflight.css` | only `executes each recipe the guide ships, …`: `expected [] to deeply equal [ '@source \'./markup.html\';' ]`; the scanner assertion passes                                                                                                                                                                                                                  | yes      |
| `markup-final`                                                        | the same change                                                | `executes each recipe the guide ships, …` as before; and `the preflight recipe > resolves the cascade import, scans the markup line, …`: `AssertionError: expected [ '.text-bg-primary', …(1429) ] to include '.px-8'`                                                                                                                                          | yes      |
| `markup-consumer-final`                                               | remove the line from `consumer.css`                            | the fence case; `the consumer pairing > resolves the cascade import, scans the markup line, …`: `expected [ … ] to include '.px-8'`; `overrides a component declaration …`: `expected [] to not deeply equal []`; `keeps the button surface …`: `expected { 'padding-top': '6px', …(18) } to deeply equal { … }`                                             | yes      |
| `order-paired-final` (the re-run paired plant, R2)                    | delete the order line from the guide's `preflight` fence and the fixture | the order case: `expected [ 'properties', 'theme', 'base', …(4) ] to deeply equal [ Array(7) ]`; the component case: `expected [ …(240) ] to deeply equal []`; the shared-name case: `expected [ …(4) ] to deeply equal []`                                                                                                   | yes      |

The earlier non-final runs (`twr-2-plant-markup.log.txt`, `-markup-consumer`, and `-order-paired`) read the same.

R4 has its own control, a probe run through `twr-instruments/r2/probe/vitest.config.ts` (log `twr-2-base-probe.log.txt`,
`Tests 1 passed (1)`). The base-block reading returns selectors for `@layer base { *, ::after { box-sizing: border-box } }`
and `[]` for `@layer base {}`. The round 1 reading, a non-empty block list, passes on the empty block.

## Budget reading (R3)

The following table lists the component case's duration in `npm run test:service -- --reporter=verbose` runs of the
full service suite, all on a 4-CPU host.

| Log                           | Load average at start | Component case | Suite  |
| ----------------------------- | --------------------- | -------------- | ------ |
| `twr-2-timing-1.log.txt`      | 6.66                  | 2958 ms        | 24 passed |
| `twr-2-timing-2.log.txt`      | 7.46                  | 3390 ms        | 24 passed |
| `twr-2-timing-3.log.txt`      | 20.50                 | 9074 ms        | 24 passed |

`COMPONENT_TIMEOUT` is set from the high mark: 2 × 9074 ms + 5000 ms = 23148 ms. That is the `STAGE_TIMEOUT` formula,
and the TSDoc records the run and its load average. Before this unit, the case ran under the project default of
120000 ms.

## Gates

`twr-instruments/r2/twr-2-gates.sh` ran every gate. It echoes each command into its log, followed by `exit=` and
`cat /proc/loadavg`.

| Gate                                                                                          | Log                               | Result                                                   | Load average after |
| --------------------------------------------------------------------------------------------- | --------------------------------- | -------------------------------------------------------- | ------------------ |
| `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check <owned files>`                      | `twr-2-oxfmt-check.log.txt`       | `All matched files use the correct format.`, `exit=0`    | 7.46               |
| `npm run check`                                                                               | `twr-2-check.log.txt`             | `exit=0`                                                 | 6.43               |
| `npm run lint:check`                                                                          | `twr-2-lint-check.log.txt`        | `exit=0`                                                 | 6.15               |
| `npm run build:src`                                                                           | `twr-2-build-src.log.txt`         | `exit=0`                                                 | 5.75               |
| `npm run test:service`                                                                        | `twr-2-test-service.log.txt`      | `Tests 24 passed (24)`, `exit=0`                         | 4.61               |
| `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupService.test.ts` | `twr-2-setup.log.txt` | `Tests 150 passed (150)`, `exit=0`                       | 4.36               |
| `npm run test:guides`                                                                         | `twr-2-test-guides.log.txt`       | `Tests 26 passed (26)`, `exit=0`                         | 4.09               |
| `npm run test:policy`                                                                         | `twr-2-test-policy.log.txt`       | `Tests 109 passed \| 1 skipped (110)`, `exit=0`          | 3.84               |

## Review evidence

- Diff: `twr-2.diff` (`git diff 21c821a`, plus `git diff --no-index /dev/null` for each untracked fixture).
- Status: `twr-2-status.txt`, which reads:

```text
 M guides/veneer.md
 M tests/service/tailwind/consumer.test.ts
 M tests/service/tailwind/preflight.test.ts
 M tests/service/tailwind/profiles.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupService.test.ts
 M tests/setupService.ts
?? tests/fixtures/tailwind/components.html
?? tests/fixtures/tailwind/consumer-preflight.css
```

- The `tests/setupServer.ts` and `tests/setupServer.test.ts` hunks are the helper, its proof, its import, and its
  export-list row, and nothing else. They merge by hunk with LEDGER-ADDITIONS and J-ORACLE.

## Choices settled within the deviation contract

- The stage manager that serves the compiled recipe is named `served`. After the rename, `recipe` in
  `consumer.test.ts` names only a guide fence.
- Retitled cases:
  - The preflight order case becomes `resolves the cascade import, scans the markup line, declares the order the
    cascade puts the document in, and fills the base layer with Tailwind's reset`.
  - The component case becomes `keeps every longhand a component rule declares where the cascade alone resolves it,
    and moves each floor class when the order line is dropped`.
  - The `tailwind` recipe's sibling order case asserts `.px-8` the same way, so it becomes `resolves the cascade import,
    scans the markup line, and declares the order the cascade puts the document in`.
- `FLOOR_TAGS` moves as `OVERLAP_FLOOR`, so that every floor export takes the `<QUALIFIER>_FLOOR` form of
  `CANDIDATE_FLOOR` and `COMPONENT_FLOOR`, qualified by what it bounds.
- The § Files `tests/setupService.ts` row stays within the width of the table's widest cell, so the table does not
  re-pad. The `tests/fixtures/tailwind/` row was already true and is unchanged.

## Observations for the Orchestrator

- **A timing failure under load, in a case this unit did not touch.** One development run of the setup command read
  `Tests 1 failed | 137 passed | 12 skipped (150)` at a load average of 18.79. The failure was a `Test timed out in
  10100ms` and a `Hook timed out in 10100ms` in `server setup > records and reads official control state …` and the
  `oracle action bindings and exclusions` hook, which are Button-oracle Chromium cases (`twr-instruments/r2/twr-2-setup-dev2.log.txt`).
  The gate run at a load average of 4.36 read `150 passed`. Per `.agents/orchestration.md` § Writing concurrency rule 10,
  the Orchestrator owns the deciding re-run.
- **Test-file data that predates this unit is outside the brief's claim 9.** `EXECUTED_SOURCE` and `SHIPPED_SOURCE` in
  `consumer.test.ts` predate round 1 (`21c821a`), and so do `ORDER` and `CONTROL_VARIABLES` in `profiles.test.ts`. They
  are the same class of finding as claim 9, recorded here for the next change.
- **A guide line over 100 columns.** Guide line 3403 is 102 columns wide. The rewrap keeps the
  `@source './markup.html';` code span on one line.
- **An instrument outside the ignored probe path.** The R4 probe lives under `twr-instruments/r2/probe/`, as the brief directs.
  It runs through its own config file, which borrows the `service` project's aliases, not through the `probe` project,
  whose include is `tmp/probe/**`.
