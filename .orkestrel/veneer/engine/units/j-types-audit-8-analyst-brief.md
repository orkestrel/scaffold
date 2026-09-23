# J-TYPES audit round 8 — the objective lane's brief (the fix round on the round-6 findings)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: correctness against Bootstrap's source and the measured platform, the selector compositions' equivalence, and the offcanvas mechanism's consistency with the contracts. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Opus 5.5 wrote this round; your engine did not, and your lane's round-6 verdict (`units/j-types-audit-6-objective-verdict.md`) raised claims 1, 3, and 4 here.

## Subject

The J-TYPES unit's round 8 in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (tip `b9adebf`), rounds 6 to 8 as one uncommitted edit set, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief-8.md` (E31 to E40). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-8.diff` and status `j-types-8-status.txt`; the report `j-types-report-8.md`; the round-6 verdict `j-types-audit-6-verdict.md`; the probe reading `j-types-8-probe-sanitizer.log.txt` and its test `j-types-8-probe-sanitizer.test.ts`; the worktree's files; Bootstrap 5.3.8's source at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/` (`scrollspy.js`, `carousel.js`, `tab.js`, `offcanvas.js`, `base-component.js`).

## What the round decides

Whether rounds 5 to 8 land on Veneer `main` together as the contract base every implementation unit writes against.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree over the final tree (`j-types-gates-8.log.txt`): the status lists exactly the two files; `npm run build:src:browser` exits 0; `npm run check:src:browser`, the scoped oxlint and oxfmt checks, `npm run test:guides` (19 of 19), and `npm run test:policy` (109 passed, 1 skipped) pass; the round-6 refusal grep, the round-8 refusal grep, and the presence grep pass; the round-6 probe reports exactly its four refusals and no diagnostic on its acceptance lines. Probe 8's readings are in `j-types-8-probe-sanitizer.log.txt`.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-8.md`, attempting refutation of each; claims 1, 2, 3, and 4 are the ones your lane decides. For claim 2, sweep every `{Entity}SelectorMap` default in `types.ts` against that entity's class-map and selector-map keys, including descendant-combinator composites, and name any default that embeds another key's token. For claim 4, rule whether the per-instance resize listener is expressible through the contracts as declared and whether the departure sentence is accurate against `offcanvas.js:267-269`. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. You may run `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory; you run no build and no browser test. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

Whether any `SelectorMap` default still embeds a sibling key's token by a form the Orchestrator's greps did not cover (claim 2): report each hit or that none exists, with the pattern you swept.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `documentation.md`, `writing.md` in that folder; E6 to E11 in `decisions.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding unless the sentence states a fact the source or the probes contradict.

## Execution

**The Astra engine inside its CLI:** perform the assignment directly and spawn nothing; write no file outside the system temporary directory.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence (`file:line`), findings fitting no claim, "Attacked and held", referrals, bounds, and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
