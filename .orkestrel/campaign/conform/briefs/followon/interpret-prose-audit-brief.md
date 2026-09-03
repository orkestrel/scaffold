# Checker lane, round 1 — unit interpret-prose (a follow-on in /home/user/fleet/interpret)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/interpret`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `interpret-prose` (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/interpret-prose-brief.md`, fix brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/interpret-prose-fix1-brief.md`, report `/home/user/scaffold/tmp/units/followon/interpret-prose-report.md` with its `## Fix round 1` section, evidence `/home/user/work/evidence/conform-interpret.diff` and `/home/user/work/evidence/conform-interpret.status`), on the landed tip `b2cd68e`, uncommitted. Round 1 rewrote the `via`, `e.g.`, citation, `as const`, and "five" sites in the tests, the guide, and two `src/core/types.ts` doc sentences; the fix round rewrote the remaining "five" sites in `src/core/Interpret.ts`, `src/core/helpers.ts`, `src/core/factories.ts`, and `README.md`.

## Claims

1. Every row of both briefs is applied in the tree: no `via` or `e.g.` survives in the non-vendored `tests/**`; no `design §N` or `ledger N` citation survives there; the `scoreTemplate` fence in `guides/interpret.md` declares `template` with a `Template` annotation and no `as const`, and `tests/guides.test.ts` transcribes it without `as const`; every sentence that tallied the pipeline's stages as "five" in `src/**`, `README.md`, `guides/interpret.md`, and the non-vendored `tests/**` names the stages or drops the number.
3. The sweeps `\bvia\b`, `e\.g\.`, `design §|ledger [0-9]|§[0-9]`, `as const`, and `\bfive\b|\b5[- ](stage|phase|record)` (case-insensitive) over `src/**`, `README.md`, `guides/interpret.md`, `guides/README.md`, and `tests/**` (excluding `node_modules`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) return no hit in a banned sense; re-run them and rule every hit by sense.
5. `tests/guides.test.ts` carries no stale presence guard over a changed guide sentence (grep the changed sentences' old and new text from the diff); the `scoreTemplate` transcription still asserts the fence's printed value; every changed cell in the guide's Surface rows and method tables is a tally rewrite or column re-padding from it, and no other cell text changed.
7. `/home/user/work/evidence/conform-interpret.status` lists only `README.md`, `guides/interpret.md`, `src/core/Interpret.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/setup.ts`, and test files under `tests/src/core/**`, and the diff carries no hunk outside them; every `src` hunk changes comment or doc text only, never a statement.
9. No `TODO`, deferred row, skipped test, `.only`, or debug residue entered on an added line; the report's rows match the diff hunk for hunk; the report discloses the one command it ran outside its granted list (`npx oxfmt --config .oxfmtrc.json guides/interpret.md`) and the diff for that file shows the reflow beside the prose changes; the report's authored prose states no count.

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
