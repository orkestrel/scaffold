# J-TYPES audit round 2 — the objective lane's brief (the fix round)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: correctness against Bootstrap's source, constraints, and contract sufficiency. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Opus 5.5 wrote this fix round; your engine did not, so your lane is the round's independent auditor.

## Subject

The J-TYPES unit's fix round (round 2) in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (base `376d84a`), uncommitted on top of round 1's tree, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief-2.md` (edits E1 to E10) to close the items round 1's reconciled verdict `j-types-audit-verdict.md` carried (its claims 3, 4, 6, 7, 9, finding F1, referrals R2 to R4, and the bounds). Review evidence: the actual diff against the base `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-2.diff` (both rounds), the round-2 delta of the types file `j-types-2-types-delta.diff`, the actual status `j-types-2-status.txt`; the unit's report `j-types-report-2.md` (its "Edits", "Rulings taken", "Observations", and "Type-level probe" sections); round 1's lane verdicts `j-types-audit-objective-verdict.md` (yours) and `j-types-audit-subjective-verdict.md`; the worktree's files; Bootstrap 5.3.8's source at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/`.

## What the round decides

Whether the contracts land on Veneer `main` as the base every implementation unit writes against. Round 1 found that the shared placement group leaked one entity's options into another and that four refusal lists departed from the source; this round decides whether those repairs are complete and introduced nothing new.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree on the fixed tree (`j-types-gates-2.log.txt`): `git status --short` lists exactly the two files; `npm run check:src:browser`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts`, `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md`, `npm run test:guides` (19 of 19), `npm run test:policy`, and the browser index proof pass. The Orchestrator's own run of the unit's probe `j-types-probe-2.ts` (`j-types-probe-2.log.txt`) reports exactly its five `BAD` lines. The substitution sweep over the added lines returns `once` only in "at once" and `new` only in the `new Sanitizer()` sample.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-2.md`, attempting refutation of each; claims 1 to 5 and 10 are the ones your lane decides. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. For claim 10, re-run your round-1 attacks for claims 1, 2, 5, 8, 10, and 14 against the fixed tree and name each. Your sandbox is read-only and denies the loopback listener, so you run no browser test; you may run `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory for a type-level attack, and `git diff` and `grep` freely. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

Whether the `fill` `@returns` list (claim 3) and the `show` `@returns` list (claim 4) can disagree on the in-flight case in a reachable state: the unit's observation 1 notes that `fill` omits the in-flight refusal while `show` names it; rule whether a `fill` during a transition in flight is a state the contract must name, and say what the sentence must say if so.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; `typescript.md`, `names.md`, `patterns.md`, `documentation.md`, `writing.md` in that folder; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding: a wording observation is a bound the Orchestrator records, not a finding.

## Execution

**A bench engine reading this brief inside its own CLI:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts one per claim in the claims file's order, each `CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED` with its evidence; findings fitting no claim, each substantiated to the `BROKEN` standard; "Attacked and held"; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
