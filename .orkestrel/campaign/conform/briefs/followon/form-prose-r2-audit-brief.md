# Checker lane, round 2 — unit form-prose (a follow-on in /home/user/fleet/form)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/form`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `form-prose` after its fix round 1 (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/form-prose-brief.md`, fix brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/form-prose-fix1-brief.md`, report `/home/user/scaffold/tmp/units/followon/form-prose-report.md` with its `## Fix round 1` section, evidence `/home/user/work/evidence/conform-form.diff` and `conform-form.status`), on the landed tip `23c6fe0`, uncommitted. The round-1 lane confirmed claims 1, 3, 7, and 9 and refuted claim 5 on a wording this round corrects: the changed `FormInterface` Surface row at `guides/form.md:91` is the brief's own row 2.

## Claims

1. Every row of the brief is applied in the tree at the site the report names, and the fix round's four comment sites in `tests/guides.test.ts` (formerly lines 2, 91, 244, and 246) read "The following constants are this", "the assertion that a name stays stranded fails", "Each following block transcribes", and "the earlier name resolution would pass it", with no `above`, `below`, count, or ordinal left in any of them.
3. The sweeps `\b(above|below|should)\b` (case-insensitive) and the number words over `guides/form.md`, `tests/setup.test.ts`, `src/**`, and `tests/**` (excluding `node_modules`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) return no hit in a banned sense in the unit's Owned files, `tests/guides.test.ts` included; re-run them and rule every hit by sense (a fixed arity, a literal fixture value, or a numeric relationship is permitted).
5. `tests/guides.test.ts` carries no presence guard quoting a sentence the unit changed (grep the changed sentences' old and new text), the guide's method tables are untouched by the diff, and the only Surface-row change in the diff is the `FormInterface` row at `guides/form.md:91`, whose directional reference the brief's row 2 names.
7. `/home/user/work/evidence/conform-form.status` lists only `guides/form.md`, `src/core/types.ts`, `tests/setup.test.ts`, `tests/src/core/helpers.test.ts`, and `tests/guides.test.ts`, and the diff carries no hunk outside them; the `tests/guides.test.ts` hunks change comment lines only.
9. No `TODO`, deferred row, skipped test, or debug residue entered on an added line; the report's rows and its `## Fix round 1` sites match the diff hunk for hunk; the report discloses the formatter run on `guides/form.md` and the diff shows that run moved table padding only.

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
