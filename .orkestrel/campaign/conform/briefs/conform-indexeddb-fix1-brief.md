# Fix round 1 — unit conform-indexeddb

## Role and engine

`implementer` on Claude Opus 5, a native subagent, the sole writer in `/home/user/fleet/indexeddb`. Perform the assignment directly and spawn nothing.

## Subject

The unit brief is `/home/user/scaffold/tmp/units/conform/conform-indexeddb-brief.md` (its Host paragraph's shell discipline binds this round too) and the writer's report is `/home/user/scaffold/tmp/units/conform/conform-indexeddb-report.md`. The tree carries the unit's uncommitted changes on the baseline d133c65; no fix-round agent has touched it.

## The round-1 verdicts

- Objective lane (Claude Opus 5, the recorded substitution for the dark Sol bench): `/home/user/work/l1r/15-indexeddb-objective-r1-a728554b14f15ce1a.json` — `FAIL 8` and finding F1 outside the claims.
- Checker (Claude Sonnet): `/home/user/work/l1r/16-indexeddb-checker-r1-a93e7e02666499778.json` — `PASS`.

Read both in full.

## Orchestrator rulings

1. **Claim 8** is structural: no read-only lane can take the gate run, and the deciding run at landing settles it. Re-run the gate chain bare (`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`) and record each exit code in the report's § Gates.
2. **F1** is substantiated: `src/browser/types.ts:268-270` and `guides/indexeddb.md:296` publish that `seek` on a store cursor reaches the caller as an `IndexedDBError` of code `UNKNOWN` because the native call raises `InvalidAccessError`, and no test executes it. Adopt the lane's prescription: add the executed browser test in `tests/src/browser/IndexedDBCursor.test.ts` that drives `seek` on a cursor from `db.store(name).cursor()` and asserts the error the browser produces, with the failing-first proof recorded (the exact command, its failing count, then its passing count). Where the measured error differs from the prose, the prose follows the measurement in both sites; where it matches, the prose stays.

## Method and output

Adopt the rulings, re-run the gate chain, rewrite `/home/user/scaffold/tmp/units/conform/conform-indexeddb-report.md` so it describes the whole unit as it now stands with a `## Fix round 1` section naming each finding and what closed it, and refresh the evidence files `/home/user/work/evidence/conform-indexeddb.diff` (`git diff HEAD` after `git add -N` on every created file) and `/home/user/work/evidence/conform-indexeddb.status` (`git status --short`). Do not commit, stage beyond `git add -N`, push, install, or run any discarding git command. Return the structured output.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a ruling contradicts the tree in a way you cannot close inside Owned. Decide, record, and carry on from an ancillary question.
