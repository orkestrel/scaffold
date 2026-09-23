# J-BINDER audit round 2 — the subjective lane's brief (the mechanisms under the landed contracts)

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **subjective** lane: the shape, naming, and ergonomics of the resolver, the guards, the tables, the delegate's rules, and the guide's engine subsections, as every implementation unit and a consumer will read them. State your lane in your first line and the model the alias served. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Your own engine (Opus 5.5) wrote this round: attack it harder for that reason.

## Subject

The J-BINDER unit's round 2 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, Veneer `main` merged as `cea3359`), uncommitted, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-brief-2.md` (B1 to B8 with B7a). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-2.diff` and status `j-binder-2-status.txt`; the report `j-binder-report-2.md`; the round-1 verdict `j-binder-audit-verdict.md` and its subjective lane `j-binder-audit-subjective-verdict.md`; the worktree's files; the design verdicts `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` § Amendments and `units/j-engine-shape-verdict.md` § Question 1; E6, E9, E10, E11 in `decisions.md`.

## What the round decides

Whether the shared mechanisms every implementation unit builds on land on Veneer `main` under the landed contracts.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-binder-gates-2.log.txt`): the status lists exactly the owned files; the scoped typecheck, oxlint, and oxfmt checks, the browser suite (119 of 119 on Chromium 153), `test:policy`, `test:guides`, and the scoped build pass. The tree-wide `npm run check` is red on three off-limits app files until the unit's report-only patch lands at integration; do not report that as a finding.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-2.md`, attempting refutation of each through your lane's lenses; claims 1, 2, 4, 7, and 8 (the departures' bounding rules, the guide's voice and parity) are the ones your lane decides, and on the others you rule from the source and refer an objective defect. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command. Report no prose finding: a wording you would change is a bound, unless the sentence states a fact the code contradicts or a fixed token or name the maps make replaceable.

## Unknowns

1. Whether one `resolveVocabulary(defaults, overrides, guard, code)` is the right shape against three named resolvers, and whether its four positional parameters read well at every call site (claim 2): rule under the single-word and options-object laws.
2. Whether the `MutationObserver.prototype.disconnect` recorder inline in the Delegate pruning case belongs in `tests/setupBrowser.ts` as a shared helper now or at its second consumer: rule.
3. Whether `Button` validating a `selectors` group it never reads is the right contract for a manually constructed button, or whether `ButtonOptions` ought not to carry `selectors` at all (the delegate being the only reader): rule, and refer the contract question if you find one.
4. Whether `Delegate`'s description and the guide's `### Delegation` state the once-per-click-and-route rule and the destroyed-engine drop in a form a consumer can rely on (claims 4 and 7): rule.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6, E9, E10, E11; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
