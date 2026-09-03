# Checker lane — unit reason-prose (a follow-on in /home/user/fleet/reason)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/reason`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `reason-prose` (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/reason-prose-brief.md`, report `/home/user/scaffold/tmp/units/followon/reason-prose-report.md`, evidence `/home/user/work/evidence/conform-reason.diff` and `conform-reason.status`), on the landed tip `803e4f6`, uncommitted.

## Claims

1. Every row of the brief is applied in the tree: every `defaults to …` doc-block site in `src/core/factories.ts` reads the `Default: \`value\`.` form that `src/core/types.ts` and `src/core/constants.ts` carry, with the guide twins in `guides/reason.md` aligned; `via` is gone from the test sites the brief lists; `tests/setup.ts` carries no `simplest` and its header names no `setupBrowser.ts`; the manager tally at `guides/reason.md` (formerly "seven") and `src/core/factories.ts:278-279` names the managers.
3. The sweeps `\bvia\b`, `\bsimpl(y|e|er|est|ify|ified)\b`, `defaults to`, `setupBrowser`, and `\b(seven|six|eight)\b` (case-insensitive) over `src/core/factories.ts`, `guides/reason.md`, and `tests/**` (excluding `node_modules`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) return no hit in a banned sense; re-run them and rule every hit by sense (the `//` module comment at `factories.ts:519` and the `defaults to` sites in `tests/**` are outside the brief's rows and are recorded, not refuted; a fixed fixture length such as "six-operation chain" is permitted).
5. `tests/guides.test.ts` carries no stale presence guard over a changed guide sentence (grep the changed sentences' old and new text), and the guide's method tables and Surface rows are untouched by the diff except the `default:` cells the brief names.
7. `/home/user/work/evidence/conform-reason.status` lists only `guides/reason.md`, `src/core/factories.ts`, `tests/setup.ts`, and test files under `tests/src/core/**`, and the diff carries no hunk outside them and none under `src/core/types.ts`.
9. No `TODO`, deferred row, skipped test, `.only`, or debug residue entered on an added line; the report's rows match the diff hunk for hunk; the report discloses the one command it ran outside its granted list (`npx oxfmt --config .oxfmtrc.json guides/reason.md`) and the diff for that file shows the table reflow beside the prose changes.

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
