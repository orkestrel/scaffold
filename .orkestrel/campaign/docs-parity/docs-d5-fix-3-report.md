# Unit D5-fix-3 — report

## M1. `collectCells`

- `scripts/docs.ts:169` — renamed the declaration `function collectSummaries(guide: GuideInterface): ReadonlySet<string>` to `function collectCells(guide: GuideInterface): ReadonlySet<string>`. Its doc block ("Collects the compared keys a guide's Surface and Methods tables carry.") named no old word, so it stands unchanged.
- `scripts/docs.ts:396` — updated the call site `summaries: collectSummaries(guide)` to `summaries: collectCells(guide)`.

## M2. The no-op tally case

- `tests/src/core/compilers.test.ts:2053-2071` (`SEED_OVERLAP_CHILD`) — added a third Surface row `| \`frame\` | function | Frames a widget for the panel. |`, byte-identical to the parent row's cell at `tests/src/core/compilers.test.ts:2045`.
- `tests/src/core/compilers.test.ts:2374-2379` (`reported.lines`, the no-direction run) — updated to the measured three-line array: the parent's `frame` drift, the child's `paint` drift, and the new duplicate child `frame` drift, with `rows read: 2, disagreements found: 3`.
- `tests/src/core/compilers.test.ts:2395-2399` (`written.lines`, the `--to source` run) — updated the closing line to the measured `rows read: 2, disagreements found: 3, written: 2, reported: 0`, keeping the whole-file assertion (`toBe(SEED_OVERLAP_WRITTEN)`), the one-`wrote`-line assertion, and the clean-re-report assertion (`disagreements found: 0`) unchanged.
- Measured closing line: `rows read: 2, disagreements found: 3, written: 2, reported: 0`. The duplicate `frame` drift in the child row takes the no-op branch at `scripts/docs.ts:355` (`if (spliced === text) continue`) once the parent row has already rewritten that shared block, so `found` counts it while `written` and `reported` do not.

## M3. The silent pitch limbs

- `tests/src/core/compilers.test.ts:2015-2022` — added `SEED_NAMELESS_MANIFEST` (a copy of `SEED_MANIFEST` with the `name` field deleted) and `SEED_NAMELESS` (`SEED_REPORTED` with that manifest).
- `tests/src/core/compilers.test.ts:2024-2039` — added `SEED_UNOWNED_INDEX` (an index whose one row's spec is `guides/component.md`, never `guides/widget.md`) and `SEED_UNOWNED` (a manifest naming `widget`, a `guides/component.md` file, and no `guides/widget.md`), so `readShortName` resolves `widget` but no row's `spec` is `guides/widget.md`.
- `tests/src/core/compilers.test.ts:2358-2372` — case `carries no pitch line for a manifest declaring no name`, over `SEED_NAMELESS`, asserting the exact line array (the standing `no doc block carries the key` drift alone, `rows read: 1, disagreements found: 1, written: 0, reported: 1`) and `run.status` `1`.
- `tests/src/core/compilers.test.ts:2374-2388` — case `carries no pitch line for a manifest naming a guide the index does not index under its own spec`, over `SEED_UNOWNED`, asserting the same shape under `guides/component.md`.
- Both cases ran green on the first measured run; no adjustment was needed.

## M4. The write run's closing line

- `guides/scaffold.md:1055-1057` — added to the write-run paragraph: "A write run's closing line names two further values beside the row and disagreement counts: `written:` counts the rewrites the run carried across, and `reported:` counts the disagreements it left standing with a reason." placed before the existing exit-code sentence.

## Acceptance criteria

1. `grep -n "collectSummaries" scripts/docs.ts` — no output, exit `1`. `grep -n "collectCells" scripts/docs.ts` prints:
   ```
   169:function collectCells(guide: GuideInterface): ReadonlySet<string> {
   396:				summaries: collectCells(guide),
   ```
2. `npm run format:check` — exit `0`, last lines: "All matched files use the correct format." / "Finished in 9374ms on 223 files using 4 threads."
   `npm run lint:check` — exit `0`, no output.
   `npm run check` — exit `0`, last line: `> tsc --noEmit -p configs/src/tsconfig.bin.json` with no diagnostics.
3. `npm run test:src:core` — exit `0`, last lines: "Test Files  9 passed (9)" / "Tests  402 passed (402)". The two M3 cases and the overlap case are collected and green among them.
   `npm run test:policy` — exit `0`, last lines: "Test Files  1 passed (1)" / "Tests  91 passed (91)".
4. `npm run build` — exit `0`, last lines: "build-inventory: staged 122 file(s) into host.json".
   `sha256sum host.json` before and after a second `npm run build:inventory`: `8209ce012ea1d775d8137915988455afb4991f34a43f7405e16060e5358de96d` both times — identical.
5. Observation: `npm run docs` — exit `1`, last line: `rows read: 1, disagreements found: 316`.

## Tree state

`git status --short`:
```
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M guides/scaffold.md
 M host.json
 M package.json
 M src/core/Compiler.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupServer.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

`git diff --stat`:
```
 .claude/rules/documentation.md   |  11 +-
 .claude/rules/tests.md           |  20 +-
 .claude/rules/workspace.md       |  30 +-
 guides/scaffold.md               |  75 +++-
 host.json                        |  16 +-
 package.json                     |   1 +
 src/core/Compiler.ts             |   4 +-
 src/core/compilers.ts            |  90 ++++-
 src/core/constants.ts            |  19 +-
 tests/distribution.test.ts       |   1 +
 tests/guides.test.ts             |  51 ++-
 tests/setupServer.ts             |   2 +-
 tests/src/core/compilers.test.ts | 724 ++++++++++++++++++++++++++++++++++++++-
 tests/src/core/helpers.test.ts   |  29 ++
 tests/src/server/helpers.test.ts |  60 +++-
 tsconfig.json                    |   4 +-
 16 files changed, 1045 insertions(+), 92 deletions(-)
```

All rows outside the four owned files (`scripts/docs.ts`, `tests/src/core/compilers.test.ts`, `guides/scaffold.md`, `host.json`) predate this unit and were carried in per the standing conditions (D4, D5, D5-fix, D5-fix-2 uncommitted). `scripts/docs.ts` is untracked, as it was entering this unit; `host.json` moved only by the `npm run build:inventory` regeneration in criterion 4, matching its digest before and after.

## Flagged claims

- No claim in this report rests on an unmeasured value. Every count in the M2 and M3 sections and every gate result in Acceptance criteria was read from an actual command's output during this unit's run, not inferred.
- The M2 rows in the no-direction and `--to source` runs were derived by first running the test red against a guessed expectation, reading the actual output, and then setting the assertion to that measured value — the standard is a proof against real output, not a derivation restated as an assertion.

No count of a growable set appears above; every number given is a value from a specific named run.
