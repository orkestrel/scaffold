# J-TYPES audit round 6 — the objective lane's brief (the round-5 findings closed)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: correctness against Bootstrap's source, the equivalence of the derived selector compositions, the accounting rows, and contract sufficiency. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Opus 5.5 wrote these rounds; your engine did not, and your lane's round-5 verdict (`units/j-types-audit-5-objective-verdict.md`) raised the accounting gaps claim 7 closes.

## Subject

The J-TYPES unit's rounds 6 and 7 in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (tip `b9adebf`, round 5 committed over Veneer `main` `55ca0cd`), one uncommitted edit set, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief-6.md` (edits E19 to E28) and `j-types-brief-7.md` (E29, E30) to close the round-5 audit's findings. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-7.diff` and the actual status `j-types-7-status.txt`; the unit's reports `j-types-report-6.md` and `j-types-report-7.md`; the round-5 verdicts `j-types-audit-5-verdict.md` and `j-types-audit-5-subjective-verdict.md`; the amended design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` § Amendments and `units/j-engine-shape-verdict.md` § Question 1; the worktree's files; Bootstrap 5.3.8's source at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/` (`dropdown.js`, `tab.js`, `scrollspy.js`, `offcanvas.js`, `modal.js`, `tooltip.js`, `util/scrollbar.js`, `util/backdrop.js`).

## What the round decides

Whether rounds 5 to 7 land on Veneer `main` together as the contract base every implementation unit writes against. A composition that matches a different element set than Bootstrap's constant, or a pass-through sentence the implementation cannot honour, reaches every component, so claims 2, 5, and 7 are where your lane's attention goes.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-types-gates-6.log.txt`): `git status --short` lists exactly the two files; `npm run build:src:browser` exits 0; `npm run check:src:browser`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts`, `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md`, `npm run test:guides` (19 of 19), and `npm run test:policy` (109 passed, 1 skipped) pass; the criterion-3 refusal grep returns no hit and the presence grep returns `parent` (twice: `CollapseAttributeMap.parent` pre-existing, and the scrollspy key), `descendants` (the attribute key and the option), and `step`; the Orchestrator's run of the probe `j-types-probe-6.ts` reports exactly the four refusals claim 4 names and no diagnostic on the acceptance lines.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-6.md`, attempting refutation of each; claims 2, 5, 7, and 1 are the ones your lane decides. For claim 2, substitute every default into each composition and compare the matched set against Bootstrap's constant by reading the selectors (where you doubt equivalence, name the element that one matches and the other does not, or state that none exists); rule on `:not(.{disabled}, :disabled)` against `:not(.disabled):not(:disabled)`. For claim 7, confirm the citations resolve (`offcanvas.js:111`, `:147`, `:267`; `util/scrollbar.js:79`) and that no other name from your round-5 walk remains unaccounted. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. You may run `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory for a type-level attack; you run no build and no browser test. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

Whether the registry walk the E27 row names for the offcanvas resize handler is equivalent to Bootstrap's query for a shown responsive panel whose owner was created by the delegate (claim 7): rule from `offcanvas.js:111` and `:267`. Whether `:is({menu}) :is({entry})` with the defaults matches a `.dropdown-item` nested in a `.dropdown-menu` inside another `.dropdown-menu` the same way `.dropdown-menu .dropdown-item` does (claim 2): rule.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `documentation.md`, `writing.md` in that folder; E6 to E11 in `decisions.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding unless the sentence states a fact the source or the probes contradict.

## Execution

**The Astra engine inside its CLI:** perform the assignment directly and spawn nothing; write no file outside the system temporary directory.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence (`file:line`), findings fitting no claim, "Attacked and held", referrals, bounds, and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
