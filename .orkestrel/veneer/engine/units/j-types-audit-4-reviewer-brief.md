# J-TYPES audit round 4 — the subjective lane's brief (the per-element entry)

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **subjective** lane: the shape and naming of the per-element mirror, the placement of the rationale, and the voice of the doc blocks. State your lane in your first line and the model the alias served. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Your own engine (Opus 5.5, the `opus` role) wrote this round, and your round-3 F1 is the finding it closes: attack it harder for that reason.

## Subject

The J-TYPES unit's round 4 in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (base `1868007`), uncommitted on top of round 3's tree, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief-4.md` (edit E12). Review evidence: the actual diff against the base `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-4.diff` (rounds 3 and 4; `j-types-3.diff` is round 3 alone) and the actual status `j-types-4-status.txt`; the unit's report `j-types-report-4.md`; round 3's verdicts `j-types-audit-3-verdict.md` and `j-types-audit-3-subjective-verdict.md` (yours); the Orchestrator's probe readings `j-types-3-probe-sanitizer-2.log.txt` and `j-types-3-probe-sanitizer-3.log.txt`; E6 and E7 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; the worktree's files; the installed 6.0.3 library `C:/Users/mikes/WebstormProjects/veneer-types/node_modules/typescript/lib/lib.dom.d.ts` around lines 2640 to 2658.

## What the round decides

Whether J-TYPES lands on Veneer `main` with a sanitizer contract that can express Bootstrap's per-tag allowlist.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-types-gates-4.log.txt`): the status lists exactly the two files; `npm run build:src:browser` exits 0; the scoped typecheck, oxlint, and oxfmt checks, `npm run test:guides` (19 of 19), and `npm run test:policy` pass; the Orchestrator's run of the unit's probe (`j-types-probe-4.log.txt`) reports exactly its two refusals; the guide's content change beyond round 3 is the widened separator, the new row, and the `SetHTMLOptions` summary.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-4.md`, attempting refutation of each through your lane's lenses; claims 1, 3, and 4 are the ones your lane decides, and on claim 2 you rule from the probe readings and refer an objective defect. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is `UNRESOLVED`. You run no command. Report no prose finding: a wording you would change is a bound, unless the sentence states a fact the installed library or the probes contradict.

## Unknowns

Whether `SanitizerElementNamespaceWithAttributes`, the standard's own dictionary name, is the right name for a mirror that omits `namespace` (claim 1): rule on it under `names.md` § General vocabulary against the alternative of naming the standard's `SanitizerElementWithAttributes` typedef (a string or that dictionary). Whether the added `attributes` default sentence ("the attributes the platform's safe baseline keeps") belongs on the leaf or is a claim the contract cannot check (claim 2): rule on it under `writing.md` § Claims and time.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `documentation.md`, `writing.md`; E6 and E7; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
