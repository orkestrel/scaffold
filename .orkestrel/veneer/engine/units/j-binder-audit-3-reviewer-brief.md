# J-BINDER audit round 3 — the subjective lane's brief (the fix round on the round-2 findings)

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **subjective** lane: the shape of the resolver's new signature and the declared types, the delegate's four private methods and its hold, the teardown order as a contract a component unit can build on, the shared recorder, and the guide's engine subsections. State your lane in your first line and the model the alias served. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Your own engine (Opus 5.5) wrote this round and the round-2 subjective verdict it answers: attack it harder for that reason, and do not accept a finding as closed because its wording was adopted.

## Subject

The J-BINDER unit's round 3 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, `main` merged as `cea3359`), rounds 2 and 3 uncommitted, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-brief-3.md` (C1 to C7). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-3.diff` and status `j-binder-3-status.txt`; the reports `j-binder-report-3.md` and `j-binder-report-2.md`; the round-2 verdict `j-binder-audit-2-verdict.md` and your lane's `j-binder-audit-2-subjective-verdict.md`; the retained instruments and patches the claims file lists; the worktree's files; the design verdicts `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` § Amendments and `units/j-engine-shape-verdict.md` § Question 1; E6, E9, E10, E11 in `decisions.md`.

## What the round decides

Whether the shared mechanisms every implementation unit builds on land on Veneer `main` under the landed contracts.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-binder-gates-3.log.txt`): the status lists exactly the owned files; the scoped typecheck, oxlint, and oxfmt checks (`tests/setupBrowser.ts` included), the browser suite (124 of 124 on Chromium 153), `test:policy`, `test:guides`, and the scoped build pass; the prefix grep hits only the guide's CSS vendor-prefix prose; the tree-wide `npm run check` is red on three off-limits app files until the round-2 app patch lands at integration, and `git apply --check` accepts every report-only patch; do not report those as findings.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-3.md`, attempting refutation of each through your lane's lenses; claims 2 (the residual path: rule whether a cheap and correct closure exists, such as an engine's restoration stopping when its host acquires another owner, or whether the documented limit is the right contract), 3, 4, and 6 are the ones your lane decides, and on the others you rule from the source and refer an objective defect. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command. Report no prose finding: a wording you would change is a bound, unless the sentence states a fact the code contradicts or a fixed token or name the maps make replaceable.

## Unknowns

1. Whether `AttributeNames<TKey>` as a mapped type alias and `ButtonVocabulary` as an interface are the right shapes and names under `names.md`, and whether `NoInfer<AttributeNames<TKey>>` on the resolver reads well at each call site (claim 4): rule.
2. Whether the delegate's hold (`#held`, `#restore`, `#drive`) is a mechanism a second entity route (J-COLLAPSE) can reuse without change, or is Button-shaped (claim 2 and the round-2 R6): rule.
3. Whether `HostSnapshot`'s restore order is a contract that belongs in `types.ts` on `HostSnapshotInterface.restore` rather than in the class remarks alone, given that a component unit relies on it (claim 2): rule and refer.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6, E9, E10, E11; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
