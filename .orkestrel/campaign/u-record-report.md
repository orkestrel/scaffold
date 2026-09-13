# u-record — unit report

Engine: Sonnet `builder`, native subagent, workflow `wf_532659d1-39d`.
Structured return, transcribed verbatim from the workflow journal.

## done

false

## touched

- `ROADMAP.md` — Replaced the falsified npm-crash-boundary row with the measured boundary, ruling, and Node floor, and added the two carried-forward findings (the `&&` test-chain suppression and the `@types/node` range/floor mismatch), per the brief's exact prose.

## criteria

- npm run format:check — exit `0`
- npm run test:policy — exit `0`
- git diff --stat names ROADMAP.md only — exit `1` — Full-tree git diff --stat lists ROADMAP.md plus tests/distribution.test.ts, tests/setupServer.test.ts, tests/setupServer.ts, tests/src/server/helpers.test.ts — all from the two prior writers the dispatch told me not to revert. Scoped check `git diff --stat -- ROADMAP.md` shows exactly one file, 23 insertions(+), 6 deletions(-), confirming my own edit touched only the owned file.
- old phrase absent from ROADMAP.md — exit `1` — grep -n "the field names npm 11" ROADMAP.md exits 1 (no match), meaning the phrase is gone — a grep exit of 1 here is the passing state since it signals absence.

## observations

- `npm run format:check` and `npm run test:policy` both exit 0 against the current tree, including my ROADMAP.md edit.
- The row to replace was found by its content exactly as described (lines 370-375 before the edit) and rewritten in the file's existing bullet style and wrap width.
- No word in the new prose triggered the policy prose sweep; test:policy's 91 tests pass, including the Markdown sweep.

## deviation

Expected: `git diff --stat` (full tree) would name `ROADMAP.md` only, per acceptance criterion 3. Found: the working tree already carries edits from two prior writers in `tests/distribution.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, and `tests/src/server/helpers.test.ts` before I started, and the dispatch instructed me explicitly not to revert them. Evidence: `git diff --stat` output listing all five files with `ROADMAP.md | 29 ++++--` among them; `git diff --stat -- ROADMAP.md` in isolation shows only that file, 23 insertions(+) and 6 deletions(-). Done or not: my scoped edit to `ROADMAP.md` is complete and correct; criterion 3 as written against the full-tree diff cannot pass in this working tree state without violating the "do not revert" instruction. Hypothesis: criterion 3 was written assuming a clean baseline before the other two writers landed, and needs re-scoping to `git diff --stat -- ROADMAP.md` for this multi-writer session.


---

## Orchestrator ruling on the deviation

Criterion 3 was the brief's defect. The three units ran serially in one checkout under one
workflow, with no checkpoint commit between nodes, so the second and third writers opened a tree
already carrying the first's uncommitted edits, and a full-tree `git diff --stat` could not name a
single file without reverting work the dispatch forbade reverting. The unit refused the criterion
rather than the instruction, which is the deviation contract working. Re-scoped to
`git diff --stat -- ROADMAP.md`, which names that file alone at 23 insertions and 6 deletions.

Criterion 4 is met: `grep -c "the field names npm 11" ROADMAP.md` reads `0`. The unit recorded
grep's exit `1` — no match — as the criterion's exit code; it is the criterion's success.

The contract's checkpoint rule — commit before each writing dispatch — binds between workflow
nodes too. A successor workflow that serializes writers commits between them, or scopes each
unit's diff criterion to its owned paths.
