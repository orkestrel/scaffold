# J-COLLAPSE audit round 3 — the subjective lane's brief

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **subjective** lane: the `#conflicts` method's shape and name and its place in `#activate`; the `#writeTriggers` signature with both lists; the guide's hand-off, refusal, nesting, and token-order sentences as a contract a consumer reads, and the `Delegate` remark's paragraph; the `parseElement` remark's three sentences; the `#prune` comment; the case titles; the `@returns` patch's voice; the rewrapped paragraphs. State your lane in your first line and the model the alias served. The other lane runs blind, in parallel, on a bench; do not hedge toward an imagined consensus. Your own engine (Opus 5.5) wrote this unit: attack it harder for that reason.

## Subject

The J-COLLAPSE unit's round 3 in the worktree `C:/Users/mikes/WebstormProjects/veneer-collapse` (branch `unit/collapse`; round 1 committed as `0ad71cd`, Veneer `main` `468a118` merged as `eab447e`, the round-2 and round-3 edits uncommitted on top), briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-collapse-brief-3.md` (D1 to D7) after the round-2 verdict `j-collapse-audit-2-verdict.md` and the round-2 subjective lane verdict `j-collapse-audit-2-subjective-verdict.md` (read it for the findings, referrals, and bounds this round closes, not as a ruling on this round). Review evidence, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: the diff `j-collapse-3.diff` (rounds 2 and 3 together; `j-collapse-2.diff` is the round-2 state), the whole-unit diff `j-collapse-3-unit.diff`, the status `j-collapse-3-status.txt`, the report `j-collapse-report-3.md`, the readings `j-collapse-round3-red.log.txt` and `j-collapse-round3-green.log.txt`, the patches under `j-collapse-patches-2/`, the Orchestrator's run `j-collapse-gates-3.log.txt`; the worktree's files (`src/browser/Collapse.ts`, `Delegate.ts`, `parsers.ts`, `validators.ts`, `Button.ts`, `HostSnapshot.ts`, `helpers.ts`, `types.ts`, `constants.ts`, `tests/src/browser/*.ts`, `guides/veneer.md`); E12 as amended 2026-09-24 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; R5 and R18 as amended in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md`.

## What the round decides

Whether the round-2 findings are closed and J-COLLAPSE lands on Veneer `main` with its returned patches integrated.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-collapse-gates-3.log.txt`): the status lists the eight modified files and no new file; the scoped typecheck, oxlint, and oxfmt checks, the browser suite (200 of 200 on Chromium 153), `test:guides` (19 of 19), and `test:policy` pass; the builds exit 0 and the conformance gate reads 22 of 22 after them; the tree-wide `npm run check` exits 0; the four patches apply together; the brief-3 greps read as its criteria fix; do not report those as findings. The Orchestrator's replay runs after your lane returns, so `j-collapse-mutations-3-orchestrator.log.txt` is absent while you read; record that clause `UNRESOLVED` and rule the rest of the claim.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-collapse-audit-claims-3.md`, attempting refutation of each through your lane's lenses; claims 2's guide half, 3, 4, and 7 are the ones your lane decides, claims 1, 2, and 5's shape (`#writeTriggers` with both lists; `#conflicts` as a name under `names.md` and as the first statement after the target check; the `#prune` comment) you rule as well, and on 6, 8, and 9 you rule from the source and refer an objective defect. Read every added or changed sentence against `names.md`, `typescript.md`, `documentation.md`, and `writing.md` (a count such as "one of the two engines" is yours to rule: a fixed pair named by its members, or a count of a set W2 grows), every departure against E9, and the refusal sentences against E12's letter. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command. Report no prose finding: a wording you would change is a bound, unless the sentence states a fact the code contradicts or a fixed token or name the maps make replaceable.

## Unknowns

1. Whether `#conflicts` is the right name and shape (a boolean query on the target, before the routes) against an alternative that resolves both routes' hosts once and hands them to the routes (claim 2): rule.
2. Whether "the first live delegate whose root contains it to reach it" reads on first pass, and whether the § Delegation restoration sentence's "in the first delegate to hear it" and this sentence name one rule in one voice (claim 2): rule.
3. Whether the takeover paragraph's added clause ("from the moment a hide removes the `shown` token until the transition settles, the panel must lack it") sits in the right sentence and reads in the paragraph's voice, given the orphan line the Orchestrator will rewrap (claim 7): rule.
4. Whether the `parseElement` remark's three sentences read as one comparison against `getElement` (claim 4): rule.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`, `browser.md`; E6, E9, E11, E12 as amended, E13; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
