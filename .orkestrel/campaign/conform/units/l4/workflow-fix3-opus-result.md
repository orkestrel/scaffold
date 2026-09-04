Unit complete. All five findings closed, R1 recorded, gates green.

## Edits

**`/home/user/fleet/workflow/tests/guides.test.ts:2`** (O1) — number deleted, not corrected.
- Before: `// this repo's own \`guides/README.md\` manifest. The four constants below are this`
- After: `// this repo's own \`guides/README.md\` manifest. The constants below are this`

**`/home/user/scaffold/tmp/units/conform/conform-workflow-report.md:44`** (O6) — both cited lines opened and confirmed before writing (`tests/setup.ts:523` reads `export function isBrowserVuePath(path: string): boolean {`; `tests/setup.test.ts:423` reads `describe('isBrowserVuePath', () => {`).
- Before: ``…remains at `tests/setup.ts:508` with its `describe` block in `tests/setup.test.ts`, untouched.``
- After: ``…remains at `tests/setup.ts:523` with its `describe` block at `tests/setup.test.ts:423`, untouched.``

**`…conform-workflow-report.md:76`** (O3)
- Before: `58 files changed: 57 modified, 1 added (\`tests/src/core/Collection.test.ts\`). \`git status --short\` lists only files under Owned; no vendored file, …`
- After: ``` `git status --short` lists only files under Owned; `tests/src/core/Collection.test.ts` is added and every other path modified. No vendored file, no `package.json`, no `configs/`, no `.claude/`. ```

**`…conform-workflow-report.md:140`** (O3)
- Before: `Four rows move the published surface.`
- After: `These rows move the published surface.` — consumer sentence kept unchanged.

**`…conform-workflow-report.md:150`** (R1) — sentence added under the § Breaking table, because the row moves behaviour rather than a symbol and the table's columns are Removed or renamed: `workflow-subj-6` changes what `WorkflowManagerInterface.remove(ids[])` returns for a partial batch from `true` to `false`, and for an empty batch from `false` to `true`; no fleet consumer, evidenced by `grep -rn 'WorkflowManager' --include=*.ts --include=*.vue /home/user/fleet/*/src /home/user/fleet/*/app` returning no hit outside `/home/user/fleet/workflow/src` (exit 1).

**`…conform-workflow-report.md:497-609`** — `## Fix round 3` appended, naming the verdict file, each edit before and after, the control captures with counts, and the O4 and R2 rulings.

## Corrected sweep rows, as written

`:102` — ``| `§` | `guides/workflow.md`, `guides/README.md`, `README.md` | recorded empty, and that reading is FALSE — the sweep returns `guides/README.md:89` and `guides/workflow.md:1462`. Both are the named-section citation form this row prescribes, and every section they cite exists (`AGENTS.md` § Design laws, `.claude/rules/names.md` § Fixed lifecycle vocabulary, `.claude/rules/typescript.md` § Errors and outcomes, `.claude/rules/documentation.md` § Parity), so the row supports its conclusion after all: no numbered-section form survives and no tree change is owed |``

`:103` — ``| `§[0-9]` | whole checkout minus `node_modules` | recorded as hitting `guides/{budget,queue,timeout,abort,contract}.md`, and that reading is FALSE — it names fewer files than the sweep returns. The sweep hits `guides/{abort,budget,contract,database,emitter,guide,queue,timeout}.md`. Every one is a vendored dependency guide mirror, outside this unit's Owned set and correctly untouched, so the conclusion stands: no authored file carries the numbered-section form |``

## Control

Command: `npm run test:setup`, run bare in `/home/user/fleet/workflow`.

| Run | Plant | Capture | Result |
| --- | ----- | ------- | ------ |
| red | both planted | `/home/user/work/evidence/workflow-proofs/o5-setup-control-red.txt` | exit 1 — 1 failed / 28 passed (29); `buildTasks > mints a fresh tree per call, so a transition on one call cannot reach a later one` |
| red | `buildCollection` alone | `/home/user/work/evidence/workflow-proofs/o5-setup-collection-control-red.txt` | exit 1 — 1 failed / 28 passed (29); `buildCollection > defaults the noun to the task vocabulary and wires the real compiled guard` |
| green | restored | `/home/user/work/evidence/workflow-proofs/o5-setup-control-green.txt` | exit 0 — 3 files / 29 tests passed |

## `git diff --stat -- tests/setup.ts`

Before the plant and after the restore, identical: `1 file changed, 55 insertions(+), 40 deletions(-)`. MD5 `b0311d105154c023cbc9189c88602450` at both readings.

## `git status --short`

59 paths, byte-identical to the round's opening list: `tests/src/core/Collection.test.ts` added, every other path modified. Nothing new.

## Gates

| Command | Exit |
| ------- | ---- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run test:setup` | 0 — 3 files / 29 tests passed |

## Deviation state

No stop trigger fired. Two ancillary decisions taken, recorded, and carried on from:

1. **A second red capture for O5.** The brief's method — plant both bodies in one edit — cannot redden a `buildCollection` case, and the first capture proves it. The shared `PLANTED_TREE` leaves the task the earlier case starts in `running`, so `Collection.update` refuses at its `#pending` gate (`/home/user/fleet/workflow/src/core/Collection.ts:107-108`) before consulting the guard; `store.update(first.id, { name: '' }).success` then reads `false` for the wrong reason and the case passes under the very guard it is written to catch. Planting `buildCollection` alone reddens it. Both captures are inside the owned `o5-*.txt` glob, and each fixture now carries a proof that ran red against its own body.
2. **A period rather than a colon at `:140`.** The consumer sentence sits between that clause and the table, so the brief's trailing colon would dangle.