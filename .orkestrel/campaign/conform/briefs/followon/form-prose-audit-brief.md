# Checker lane — unit form-prose (a follow-on in /home/user/fleet/form)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/form`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `form-prose` (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/form-prose-brief.md`, report `/home/user/scaffold/tmp/units/followon/form-prose-report.md`, evidence `/home/user/work/evidence/conform-form.diff` and `conform-form.status`), landed on the tip `23c6fe0` and uncommitted.

## Claims

1. Every row of the brief (the three counts, the seven directional references, the `@throws` form at `src/core/types.ts:109`, the `should` literal at `tests/src/core/helpers.test.ts:242`) is applied in the tree at the site the report names, with the wording the brief prescribes or a sentence-fitted equivalent.
3. The sweeps `\b(above|below|should)\b` (case-insensitive) and the number words over `guides/form.md`, `tests/setup.test.ts`, `src/**`, and `tests/**` (excluding `node_modules`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) return no hit in a banned sense inside the unit's Owned files; re-run them and rule every hit by sense.
5. `tests/guides.test.ts` carries no presence guard quoting a sentence the unit changed (grep the changed sentences' old and new text), and the guide's method tables and Surface rows are untouched by the diff.
7. `/home/user/work/evidence/conform-form.status` lists only `guides/form.md`, `src/core/types.ts`, `tests/setup.test.ts`, and `tests/src/core/helpers.test.ts`, and the diff carries no hunk outside them.
9. No `TODO`, deferred row, skipped test, or debug residue entered on an added line; the report's rows match the diff hunk for hunk; the report discloses the one command it ran outside its granted list (`npx oxfmt --config .oxfmtrc.json guides/form.md`) and the diff shows that run moved table padding only.

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
