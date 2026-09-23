# J-BINDER audit round 5 — the subjective lane's brief (the fix round on the round-4 findings)

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **subjective** lane: the ownership mechanism as a contract a component unit can build on, the per-call owner against the design laws, the interfaces' new sentences and the guide's paragraphs, and the liveness rule as every later engine will read it. State your lane in your first line and the model the alias served. The other lane runs blind, in parallel, on a bench; do not hedge toward an imagined consensus. Your own engine (Opus 5.5) wrote this round and proposed the per-invocation ownership in the round-4 verdict's rulings: attack it harder for that reason.

## Subject

The J-BINDER unit's round 5 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, `main` merged as `cea3359`), rounds 2 to 5 uncommitted, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-brief-5.md` (E1 to E5). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-5.diff` and status `j-binder-5-status.txt`; the report `j-binder-report-5.md`; the round-4 verdict `j-binder-audit-4-verdict.md` and your lane's `j-binder-audit-4-subjective-verdict.md`; the retained instruments the claims file lists; the worktree's files (`src/browser/HostSnapshot.ts`, `Button.ts`, `ColorMode.ts`, `Delegate.ts`, `helpers.ts`, `types.ts`, `tests/src/browser/*.ts`, `tests/setupBrowser.ts`, `guides/veneer.md`); the design verdicts and E6, E9, E10, E11 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`.

## What the round decides

Whether the shared mechanisms every implementation unit builds on land on Veneer `main` under the landed contracts.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-binder-gates-5.log.txt`): the status lists exactly the owned files; the scoped typecheck, oxlint, and oxfmt checks, the browser suite (134 of 134 on Chromium 153), `test:policy`, `test:guides` (19 of 19), and the scoped build pass; the brief-5 ownership grep returns no hit; the tree-wide `npm run check` is red on three off-limits app files until the round-2 app patch lands at integration; the red log records five failed tests on the round-4 source; do not report those as findings.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-5.md`, attempting refutation of each through your lane's lenses; claims 2 (its design ruling: whether the pending entry's owner stays a per-call object or becomes the snapshot, with the captured lists carrying the withdrawal), 3, and 6 are the ones your lane decides; claim 1's shape (the three reads of the signal in `Button.toggle`, the `#original` reads in `ColorMode.apply`, the folded `toggle` branch, the guide's rule sentence) you rule as well; on 4 and 5 you rule from the source and refer an objective defect. For claim 2, read the round-4 objective verdict's claim-5 interleaving and the round-5 code and say what the per-call object buys that `this` would not, under `AGENTS.md` § Design laws (derive state; no superfluous wrappers) and E6; if it buys nothing, say whether the contract's sentence "each restoration invocation owns the targets" still describes the behaviour when the owner is the snapshot. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command. Report no prose finding: a wording you would change is a bound, unless the sentence states a fact the code contradicts or a fixed token or name the maps make replaceable.

## Unknowns

1. Whether the per-call `invocation` object is a second identity that derives nothing (the unit's own reading: no reachable interleaving tells it from the snapshot) and so must go under E6 and the derive-state law, or whether it is the right unit of ownership for a reader of `HostSnapshotInterface.restore` even when unobservable (claim 2): rule.
2. Whether `HostSnapshotInterface.save`'s two-sentence description paragraph (the parity cell carries both sentences) is the right shape under `documentation.md` and `typescript.md`'s doc-block rules, or whether the second sentence belongs in the remark (claim 3): rule.
3. Whether the guide's § Ownership and restoration says "Each restoration owns the targets" where the interface says "Each restoration invocation": whether the two words name one concept (claim 3): rule.
4. Whether the liveness rule's sentence in the guide ("reads its lifetime again after each write a reaction can run inside") is stated as a rule a component unit can apply without the round-4 verdict in hand (claim 1): rule.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6, E9, E10, E11; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
