# Checker lane — unit table-prose (a follow-on in /home/user/fleet/table)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/table`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `table-prose` (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/table-prose-brief.md`, report `/home/user/scaffold/tmp/units/followon/table-prose-report.md`, evidence `/home/user/work/evidence/conform-table.diff` and `conform-table.status`), on the landed tip `08d4526`, uncommitted.

## Claims

1. Every site the brief names is rewritten in the rule's form: `guides/table.md` at the lines the report names (formerly 56, 106, 195, 227, 488, 1495) reads "Everything in this guide is exported", "the readonly state in the `## Surface` rows", "described later" (twice), "every refusal described later", and "the preceding worked examples executed"; the comment formerly at `tests/guides.test.ts:233` reads "Each following test transcribes"; no `above` or `below` survives at any of them.
3. The case-insensitive sweep `\b(above|below)\b` over `guides/table.md`, `README.md`, `src/**`, and `tests/**` (excluding `node_modules`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) returns no hit in a document-reference sense; re-run it and rule every hit by sense (`README.md:77` "the layer above" names an architectural layer and `tests/src/core/tables/PaginationManager.test.ts:39` "below one" names a numeric threshold; both are permitted).
5. `tests/guides.test.ts` carries no stale presence guard over a changed guide sentence (grep the changed sentences' old and new text), and the guide's method tables are untouched by the diff; the only Surface-row change is the `TableInterface` row the brief's site list names.
7. `/home/user/work/evidence/conform-table.status` lists only `guides/table.md` and `tests/guides.test.ts`, and the diff carries no hunk outside them.
9. No `TODO`, deferred row, skipped test, `.only`, or debug residue entered on an added line; the report's sites match the diff hunk for hunk; where the diff for `guides/table.md` shows a table reflow beside the prose changes, the report's gate section names the formatter run that produced it.

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
