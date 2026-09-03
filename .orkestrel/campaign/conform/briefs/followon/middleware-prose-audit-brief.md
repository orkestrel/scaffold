# Checker lane — unit middleware-prose (a follow-on in /home/user/fleet/middleware)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/middleware`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `middleware-prose` (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/middleware-prose-brief.md`, report `/home/user/scaffold/tmp/units/followon/middleware-prose-report.md`, evidence `/home/user/work/evidence/conform-middleware.diff` and `conform-middleware.status`), on the landed tip `72cdc4d`, uncommitted.

## Claims

1. The four sites the report names read in the rule's form: `tests/guides.test.ts` (formerly lines 2-3 and 40: "The constants following are this package's own" with no count, and the assertion named by its title "later in this file" with no ordinal), `tests/src/server/middlewares.test.ts` (formerly 1182: "The following capstone"), and `tests/src/core/middlewares.test.ts` (formerly 1905: "exercised indirectly earlier in this file"); no `above`, `below`, count, or ordinal survives in any of them.
3. The case-insensitive sweep `\b(above|below)\b` over `tests/**` (excluding `node_modules`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) returns no hit in a document-reference sense; re-run it and rule every hit by sense (the numeric-comparison hits at `tests/src/core/helpers.test.ts`, `tests/src/core/stores/MemorySessionStore.test.ts`, `tests/src/server/middlewares.test.ts:1159`, and `tests/src/server/MultipartParser.test.ts:110` are permitted).
5. The assertion title the new `tests/guides.test.ts` comment quotes (`names no symbol internal that the barrel already exports`) exists verbatim as an `it` title in that file, and no presence guard or snapshot quotes a changed comment.
7. `/home/user/work/evidence/conform-middleware.status` lists only `tests/guides.test.ts`, `tests/src/core/middlewares.test.ts`, and `tests/src/server/middlewares.test.ts`, and the diff carries no hunk outside them; every hunk changes a comment only.
9. No `TODO`, deferred row, skipped test, `.only`, or debug residue entered on an added line; the report's sites match the diff hunk for hunk; the report's prose states no count.

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
