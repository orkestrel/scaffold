# Checker lane, round 2 — unit reason-prose (a follow-on in /home/user/fleet/reason)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/reason`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `reason-prose` (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/reason-prose-brief.md`, report `/home/user/scaffold/tmp/units/followon/reason-prose-report.md` with its `## Orchestrator correction` section, evidence `/home/user/work/evidence/conform-reason.diff` and `conform-reason.status`), on the landed tip `803e4f6`, uncommitted. The round-1 lane confirmed claims 1, 3, and 7 and refuted claims 5 and 9: claim 5 on a wording this round corrects (the changed Surface and method rows at `guides/reason.md:387` and `:552` are the brief's own tally row, and the re-padded factories table carries the brief's `default:` cells), and claim 9 on a `tests/setup.ts` `@param` line the unit changed outside its rows, which the Orchestrator reverted at 18:19 UTC.

## Claims

1. Every row of the brief is applied in the tree: every `defaults to …` doc-block site in `src/core/factories.ts` reads the `Default: \`value\`.` form that `src/core/types.ts` and `src/core/constants.ts` carry, with the guide twins in `guides/reason.md` aligned; `via` is gone from the test sites the brief lists; `tests/setup.ts` carries no `simplest` and its header names no `setupBrowser.ts`; the manager tally in `guides/reason.md` (formerly "seven") and at `src/core/factories.ts` (formerly `:278-279`) names the managers.
3. The sweeps `\bvia\b`, `\bsimpl(y|e|er|est|ify|ified)\b`, `defaults to`, `setupBrowser`, and `\b(seven|six|eight)\b` (case-insensitive) over `src/core/factories.ts`, `guides/reason.md`, and `tests/**` (excluding `node_modules`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) return no hit in a banned sense; re-run them and rule every hit by sense (the `//` module comment at `src/core/factories.ts:519` and the `defaults to` sites in `tests/**` are outside the brief's rows and are recorded, not refuted; a fixed fixture length such as "six-operation chain" is permitted).
5. `tests/guides.test.ts` carries no stale presence guard over a changed guide sentence (grep the changed sentences' old and new text); every changed cell in the guide's Surface rows and method tables is one of: a `defaults to` → `default:` cell, the manager tally at the `DefinitionBuilderInterface` Surface row and the `destroy` method row naming the managers, or column re-padding from those changes; no other cell text changed.
7. `/home/user/work/evidence/conform-reason.status` lists only `guides/reason.md`, `src/core/factories.ts`, `tests/setup.ts`, and test files under `tests/src/core/**`, and the diff carries no hunk outside them and none under `src/core/types.ts`.
9. The `tests/setup.ts` diff changes the header comment (no `setupBrowser.ts`) and the `simplest` sentence only, and no `@param` line in `tests/**` changed; no `TODO`, deferred row, skipped test, `.only`, or debug residue entered on an added line; the report's rows match the diff hunk for hunk and its `## Orchestrator correction` section names the reverted line; the report discloses the one command it ran outside its granted list (`npx oxfmt --config .oxfmtrc.json guides/reason.md`) and the diff for that file shows the table reflow beside the prose changes.

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
