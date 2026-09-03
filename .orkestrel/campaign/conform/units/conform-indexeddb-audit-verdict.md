# Audit verdict — unit conform-indexeddb (2026-09-03)

Workflows: round 1 in `wf_c7b5931c-88f` (`instruments/layer.workflow.js`, stopped 10:36 UTC before this package's fix round could start); the briefed fix round 1 and round 2 in `wf_6380885b-9c1` (`instruments/fixaudit.workflow.js`). Lanes: `reviewer` on Claude Opus 5 holding the objective lane as the recorded substitution for the dark GPT-5.6 Sol bench (`codex` absent from PATH, probed 07:24 UTC); `checker` on Claude Sonnet. Writer: `implementer` on Claude Opus 5. Subject: the unit's uncommitted changes on the baseline d133c65. Brief: `briefs/conform-indexeddb-brief.md` (successor of `conform-indexeddb-brief-1.md`); fix brief: `briefs/conform-indexeddb-fix1-brief.md`; report: `reports/conform-indexeddb-report.md`; evidence: `units/conform-indexeddb.diff.txt`, `units/conform-indexeddb.status.txt`; lane verdicts: `units/l1/15-indexeddb-objective-r1-*.json`, `units/l1/16-indexeddb-checker-r1-*.json`, `units/fa1/10-indexeddb-checker-r2-*.json`, `units/fa1/11-indexeddb-objective-r2-*.json`.

| Round | Objective lane | Checker | Outcome |
| --- | --- | --- | --- |
| 1 | FAIL 8 (F1: the `seek`-on-a-store-cursor claim at `src/browser/types.ts:268-270` and `guides/indexeddb.md:296` was unexecuted; referrals R1 to R4) | PASS | fix round 1 from the Orchestrator's briefed rulings: the executed browser test added, the prose following the measurement |
| 2 | PASS (referrals R1 to R4 carried, R5 new) | PASS | accepted |

## Orchestrator's rulings on the referrals

- **R1** (`src/browser/types.ts:42` still reads `e.g.` where indexeddb-subj-15 fixed the guide's twin sentence): outside every row's site list; carried to indexeddb's follow-on unit (`ledgers/followons.md`).
- **R2** (after a clean `commit()`, `IndexedDBTransaction.store(name)` throws code `ABORTED` with "is no longer active", though the transaction committed; `types.ts:35` publishes `ABORTED` as "a transaction rolled back"): pre-existing, reachable before this unit through the `complete` listener, named by no row. Carried to the next matrix as a correctness finding against the transaction's post-commit state.
- **R3** (the brief's behavioural-or-documentation binary leaves obj-6, obj-2, obj-3, and obj-8 in neither bucket for claim 4's failing-first rule): recorded against the template; a row that adds or moves a helper owes the proof that the helper's own test would be red without it, and the template's Method step 2 says so from the next generated brief.
- **R4** (the `RT_PATH` report path): the generator defect fixed at 10:09 UTC; closed.
- **R5** (the executed case asserts `errorCode(onSeek) === 'UNKNOWN'` and the native `InvalidAccessError` name is bound by a substring guard alone): the lane rules the rule satisfied within its lane and names the finer edit (capture `onSeek.cause`, assert a `DOMException`, read its name, align the three prose sites); carried to the follow-on unit as an optional tightening, not reopened here.

Ruling: ACCEPT at landing on the deciding gate run (`instruments/land-conform.mjs`: format:check, lint:check, check, build, test), recorded in the landing commit. indexeddb-subj-1's consumer edit in `@orkestrel/database` is carried in database's brief.

Terminal: `VERDICT: PASS`
