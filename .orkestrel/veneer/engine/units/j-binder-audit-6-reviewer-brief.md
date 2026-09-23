# J-BINDER audit round 6 — the subjective lane's brief (the fix round on the round-5 findings)

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **subjective** lane: the snapshot-as-owner change as your round-5 prescription applied, the one-term wording, the guide's rewritten sentence and its rule paragraph as a contract a component unit reads, the flipped round-2 assertion against the `toggle` contract sentence, and the strengthened proof's shape. State your lane in your first line and the model the alias served. The other lane runs blind, in parallel, on a bench; do not hedge toward an imagined consensus. Your own engine (Opus 5.5) wrote this round and your lane prescribed F1 and F2 in the round-5 verdict: attack them harder for that reason.

## Subject

The J-BINDER unit's round 6 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, `main` merged as `cea3359`), rounds 2 to 6 uncommitted, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-brief-6.md` (F1 to F6). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-6.diff` and status `j-binder-6-status.txt`; the report `j-binder-report-6.md`; the round-5 verdict `j-binder-audit-5-verdict.md` and your lane's `j-binder-audit-5-subjective-verdict.md`; the retained instruments the claims file lists; the worktree's files (`src/browser/HostSnapshot.ts`, `Button.ts`, `ColorMode.ts`, `Delegate.ts`, `helpers.ts`, `types.ts`, `tests/src/browser/*.ts`, `tests/setupBrowser.ts`, `guides/veneer.md`); the design verdicts and E6, E9, E10, E11 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`.

## What the round decides

Whether the shared mechanisms every implementation unit builds on land on Veneer `main` under the landed contracts.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-binder-gates-6.log.txt`): the status lists exactly the owned files; the scoped typecheck, oxlint, and oxfmt checks, the browser suite (136 of 136 on Chromium 153), `test:policy`, `test:guides` (19 of 19), and the scoped build pass; the brief-6 greps return no hit; every report-only patch passes `git apply --check`; the tree-wide `npm run check` is red on three off-limits app files until the round-2 app patch lands at integration; the red log records two failed tests on the round-5 source; do not report those as findings.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-6.md`, attempting refutation of each through your lane's lenses; claims 1 (the one term, the comment, the owner field's name and type, nothing over-corrected), 2, 3 (the guide's rule paragraph as a rule a component unit applies to a show, hide, or toggle sequence with a cancelable pre-change event; the flipped round-2 assertion against "Toggles the live host, or returns its state without writing after destruction"), and 6 are the ones your lane decides; on 4 and 5 you rule from the source and refer an objective defect. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command. Report no prose finding: a wording you would change is a bound, unless the sentence states a fact the code contradicts or a fixed token or name the maps make replaceable.

## Unknowns

1. Whether the guide's rule paragraph (around line 558) lets J-COLLAPSE apply the rule to a `show()` that dispatches a cancelable `show.vn.collapse`, writes the transition token and the inline size, awaits the transition, then writes the shown token and dispatches `shown.vn.collapse`, without a further ruling (claim 3): rule, and name any door the paragraph misses.
2. Whether `toggle` returning the host's state read after the dispatch, while its own event carried the state read before it, is the right reading of "Toggles the live host" when a listener toggles again inside the dispatch (claim 3): rule.
3. Whether the owner field's type `HostSnapshot` inside the class's own static registry is the right shape against `HostSnapshotInterface` (claim 1): rule.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6, E9, E10, E11; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
