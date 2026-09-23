# J-TYPES audit round 10 — the objective lane's brief (the fix round on the round-9 findings)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: the offcanvas sentences against Bootstrap's source and the contract, and the Tab wording against the keys. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The subjective lane is not run on this round (every round-10 sentence adopts a lane's own round-9 wording or your lane's correction verbatim; the round-9 verdict records the reason), so your lane and the checker decide it; do not hedge toward an imagined consensus. Opus 5.5 wrote this round; your engine did not, and your lane's round-9 verdict (`units/j-types-audit-9-objective-verdict.md`) raised claim 2 here.

## Subject

The J-TYPES unit's round 10 in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (tip `b9adebf`), rounds 6 to 10 as one uncommitted edit set, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief-10.md` (E47 to E51). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-10.diff` and status `j-types-10-status.txt`; the report `j-types-report-10.md`; the round-9 verdict `j-types-audit-9-verdict.md` and the lanes' verdicts it names; the worktree's files; Bootstrap 5.3.8's source at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/` (`offcanvas.js`, `base-component.js`, `tab.js`).

## What the round decides

Whether rounds 5 to 10 land on Veneer `main` together as the contract base every implementation unit writes against.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree over the final tree (`j-types-gates-10.log.txt`): the status lists exactly the two files; `npm run build:src:browser` exits 0; `npm run check:src:browser`, the scoped oxlint and oxfmt checks, `npm run test:guides` (19 of 19), and `npm run test:policy` (109 passed, 1 skipped) pass; the round-6, round-8, and round-9 refusal greps return no hit; the listing of every Tab declaration line containing "trigger" shows the `trigger` key, its sentence, and the `{trigger}` placeholder alone; the round-6 probe reports exactly its four refusals and no diagnostic on its acceptance lines; `TabSelectorMap.link`'s default reads `[role="tab"]` in the file.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-10.md`, attempting refutation of each; claims 1, 2, and 3 are the ones your lane decides. For claim 2, check every statement of the departure paragraph against the cited source, and name any difference between Bootstrap's resize behaviour and the engine's stated rule that the paragraph omits. For claim 1, rule whether "a resize during the slide-in is applied when the slide-in settles" is expressible through the declared contracts (`hide` refusing during a transition; the `shown` event) and consistent with the `destroy` sentence. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. You may run `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory; you run no build and no browser test. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

Whether any statement in the departure paragraph is still broader or narrower than Bootstrap's source (claim 2): report each with its citation, or that none exists.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `documentation.md`, `writing.md` in that folder; E6 to E11 in `decisions.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding unless the sentence states a fact the source contradicts.

## Execution

**The Astra engine inside its CLI:** perform the assignment directly and spawn nothing; write no file outside the system temporary directory.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence (`file:line`), findings fitting no claim, "Attacked and held", referrals, bounds, and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
