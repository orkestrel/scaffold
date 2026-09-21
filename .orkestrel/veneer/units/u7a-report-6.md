<!-- Retained from u7a-6-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7a-6.jsonl, thread 01a0c15b-9f27-7913-a31f-c578918c330d, exit 0, 2026-09-20 20:33. The matrix move over the complete brief-5 implementation; every gate exit 0; the cascade digest unchanged. -->

# U7a successor report 6

The Button case matrices live in `tests/setupStyles.ts`, and the requested gates exit 0.
The final cascade digest equals the brief-5 digest. The working tree remains uncommitted at
HEAD `2bc922d`.

The effective brief is `u7a-brief-6.md`. This report closes the placement stop in
`u7a-report-5.md`; that report remains the implementation, controls, and calibration
record.

## Moved tables

Every table has a doc block naming its cases, uses `Object.freeze` with `as const`, and lives
in `tests/setupStyles.ts`. Tuple rows are also frozen. The move preserves the table values.
The following table names each export and its consumer.

| Export | Consumer file | Case that reads it |
| --- | --- | --- |
| `BUTTON_BARE_CASES` | `tests/src/styles/elements/button.test.ts` | `resolves the calibrated geometry and interaction paint in %s mode` |
| `BUTTON_FILLED_CASES` | `tests/src/styles/components/button.test.ts` | `paints %s in %s mode across rest, focus, hover, active, pressed, and disabled states` |
| `BUTTON_MODES` | `tests/src/styles/components/button.test.ts` | `fills each outline role on hover in %s mode` |
| `BUTTON_OUTLINE_CASES` | `tests/src/styles/components/button.test.ts` | The role loop inside `fills each outline role on hover in %s mode` |
| `BUTTON_SIZE_CASES` | `tests/src/styles/components/button.test.ts` | `resolves the %s size on the direct class and the group child` |

The test files import these tables. Test registration and the outline-role loop remain in the
test files. No inline case matrix remains in either Button test file.

## Enumerating assertion: setup exports

The case in `tests/setupStyles.test.ts` is “exports the scanner, the predicates, the collectors,
and the compatibility oracle, and nothing the document has to answer”. Its expected export list
adds the following names under the standing clause.

- `BUTTON_BARE_CASES`
- `BUTTON_FILLED_CASES`
- `BUTTON_MODES`
- `BUTTON_OUTLINE_CASES`
- `BUTTON_SIZE_CASES`

## Ancillary choice: persistent-state assertions

The acceptance criterion requires the Button tests to contain no inline case matrix. The
filled-role case also contained `for (const state of ['active', 'show'])`, outside the matrices
named by their original line locations. I expanded that loop into explicit class-add, paint
assertion, and class-remove operations for `active` and `show`. This preserves the assertions
without adding another setup export. The final ordered gate run follows this edit.

## Gates

The following commands ran in the prescribed order on Windows on 2026-09-20 through
`tmp/u7a/gates-6.cmd`. The script clears `PLAYWRIGHT_CHANNEL` for managed Chromium and sets it
to `msedge` for the Edge run. Every command exits 0. The styles commands build the cascade
before running the browser project.

### npm.cmd run format:check

Exit 0. The final lines in `tmp/u7a/format-final-6.log` are:

```text
npm notice run @orkestrel/veneer@0.0.1 format:check
npm notice run oxfmt --config .oxfmtrc.json --check .
Checking formatting...

All matched files use the correct format.
Finished in 796ms on 86 files using 16 threads.
```

### npm.cmd run lint:check

Exit 0. The final lines in `tmp/u7a/lint-final-6.log` are:

```text
npm notice run @orkestrel/veneer@0.0.1 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```

### npm.cmd run check

Exit 0. The final lines in `tmp/u7a/check-final-6.log` are:

```text
npm notice run @orkestrel/veneer@0.0.1 check:src:styles
npm notice run tsc --noEmit -p configs/src/tsconfig.styles.json
npm notice run @orkestrel/veneer@0.0.1 check:app
npm notice run npm run check:app:browser
npm notice run @orkestrel/veneer@0.0.1 check:app:browser
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json
```

### npm.cmd run test:setup -- tests/setupStyles.test.ts

Exit 0. The final lines in `tmp/u7a/setup-final-6.log` are:

```text
 Test Files  1 passed (1)
      Tests  71 passed (71)
   Start at  20:31:58
   Duration  1.18s (transform 115ms, setup 31ms, import 754ms, tests 243ms, environment 0ms)
```

### npm.cmd run test:src:styles — managed Chromium

Exit 0. The final lines in `tmp/u7a/styles-final-6.log` are:

```text
 Test Files  9 passed (9)
      Tests  69 passed (69)
   Start at  20:32:01
   Duration  9.61s (transform 0ms, setup 354ms, import 292ms, tests 7.46s, environment 0ms)
```

### npm.cmd run test:conformance

Exit 0. The final lines in `tmp/u7a/conformance-final-6.log` are:

```text
 Test Files  1 passed (1)
      Tests  8 passed (8)
   Start at  20:32:12
   Duration  3.79s (transform 80ms, setup 31ms, import 654ms, tests 2.94s, environment 0ms)
```

### npm.cmd run test:guides

Exit 0. The final lines in `tmp/u7a/guides-final-6.log` are:

```text
 Test Files  1 passed (1)
      Tests  18 passed (18)
   Start at  20:32:16
   Duration  504ms (transform 51ms, setup 31ms, import 315ms, tests 6ms, environment 0ms)
```

### PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles — Edge

Exit 0. The final lines in `tmp/u7a/edge-final-6.log` are:

```text
 Test Files  9 passed (9)
      Tests  69 passed (69)
   Start at  20:32:19
   Duration  16.63s (transform 0ms, setup 375ms, import 292ms, tests 8.06s, environment 0ms)
```

## Digest comparison

The SHA-256 of `dist/src/styles/index.css` after the final Edge build is
`d544aae8cd656efcbf4e843427633a87c362e385fcfdbb3794134c328f0a6f7a`.
It equals the brief-5 digest
`d544aae8cd656efcbf4e843427633a87c362e385fcfdbb3794134c328f0a6f7a`.
This pass changes no source partial.

## Git evidence

The actual diff is retained in `tmp/u7a/actual-diff-6.patch`, with SHA-256
`ffdec1c3bdf61a4ec8e367396072954a1a76e8ad133f62de791795ffc151f097`.
It contains `git diff --no-ext-diff` and the untracked files' `git diff --no-ext-diff --no-index`
output against `tmp/u7a/empty-6.txt`. The latter commands return the expected difference exit 1.
The evidence script is `tmp/u7a/evidence-6.mjs`. `git diff --check` exits 0.

The actual `git diff --stat` output is:

```text
 guides/veneer.md                | 179 +++++++++++++++++++++++++++----
 src/core/constants.ts           |  14 +++
 src/styles/_mixins.scss         |  13 +++
 src/styles/_theme.scss          |   6 ++
 src/styles/_tokens.scss         |  17 +++
 src/styles/index.scss           |   2 +
 tests/conformance.test.ts       |   2 +-
 tests/setupStyles.test.ts       |  69 ++++++++++++
 tests/setupStyles.ts            | 228 ++++++++++++++++++++++++++++++++++++++++
 tests/src/styles/index.test.ts  |  17 ++-
 tests/src/styles/mixins.test.ts |  16 +++
 11 files changed, 533 insertions(+), 30 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_theme.scss
 M src/styles/_tokens.scss
 M src/styles/index.scss
 M tests/conformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/index.test.ts
 M tests/src/styles/mixins.test.ts
?? src/styles/components/_button.scss
?? src/styles/elements/_button.scss
?? tests/src/styles/components/button.test.ts
?? tests/src/styles/elements/button.test.ts
```

Status contains only owned files. The report, logs, and instruments are under ignored `tmp/`.
Git reports that it cannot access `C:\Users\mikes/.config/git/ignore`; the status command exits 0.

This pass edits `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and the Button test files.
The inherited implementation remains in place. No agent was spawned, dependency installed,
commit made, or scaffold-owned file edited. The brief marks the `prove` tool blocked; this report
carries command output and no receipt. Independent acceptance has not run. The launching
Orchestrator must attach its CLI journal path and session identifier, which this dispatch did
not supply.