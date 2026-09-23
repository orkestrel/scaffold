# J-TYPES audit round 5 — the objective lane's brief (the amended contracts)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: correctness against Bootstrap's source and the platform's measured behaviour, the completeness of the vocabulary maps, and contract sufficiency. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Opus 5.5 wrote this round; your engine did not, and your lane's J-ENGINE-SHAPE proposal is one of the two inventories the round reconciled.

## Subject

The J-TYPES unit's round 5 in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (base `55ca0cd`, the pushed Veneer `main` tip carrying the rollup fix), uncommitted, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief-5.md` (edits E13 to E18) to bring the contracts to the amended design under E9 to E11. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-5.diff` and the actual status `j-types-5-status.txt`; the unit's report `j-types-report-5.md` (its vocabulary mapping table is claim 4's subject); the amended design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` § Amendments; the reconciliation `units/j-engine-shape-verdict.md` and your lane's proposal `units/j-engine-shape-objective-proposal.md`; the probes `units/j-types-3-probe-sanitizer-*.log.txt` and `units/j-types-4-probe-sanitizer-4.log.txt`; the worktree's files; Bootstrap 5.3.8's source at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/` (each entity's constants at the top of its file, `util/backdrop.js`, `util/scrollbar.js`, `util/swipe.js`, `dom/selector-engine.js`, `util/component-functions.js`).

## What the round decides

Whether the amended contracts land on Veneer `main` as the base every implementation unit writes against. A wrong default, a missing key, or a key in the wrong kind reaches every component, so claim 4 is where your lane's attention goes.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-types-gates-5.log.txt`): `git status --short` lists exactly the two files; `npm run build:src:browser` exits 0; `npm run check:src:browser`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts`, `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md`, `npm run test:guides` (19 of 19), and `npm run test:policy` (109 passed, 1 skipped) pass. The Orchestrator's run of the unit's probe (`j-types-probe-5.ts`, `j-types-probe-5.log.txt`) reports exactly the five refusals claim 6 names and no other diagnostic. The Orchestrator's criterion-3 grep over `src/browser/types.ts` returns only the five `HostSnapshot*` lines.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-5.md`, attempting refutation of each; claims 2, 4, 5, 6, and 8 are the ones your lane decides. For claim 4, walk every entity's Bootstrap file: list its `CLASS_NAME_*`, `SELECTOR_*`, and data-attribute reads and writes, and for each name say which map key carries it, or that the table lists it as derived, excluded, or platform, or that it is missing; check every default value against the constant; rule each of the unit's rulings R1 to R13 under `j-engine-shape-verdict.md` § Question 1. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. You may run `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory for a type-level attack; you run no build and no browser test. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

Whether the nested `center: { down, up }` group inside `DropdownClassMap`, under a shallow `Partial`, is a shape a consumer can override one token of without restating the other, and whether that matters (claim 3): report. Whether Tab's `trigger` selector default carries all three toggle values as Bootstrap's `SELECTOR_DATA_TOGGLE` does, and whether ScrollSpy's `link` selector carries Bootstrap's full `SELECTOR_LINK_ITEMS` (claim 4): report the values verbatim.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `documentation.md`, `writing.md` in that folder; E6 to E11 in `decisions.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding unless the sentence states a fact the source or the probes contradict.

## Execution

**A bench engine reading this brief inside its own CLI:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts one per claim in the claims file's order, each `CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED` with its evidence; findings fitting no claim, each substantiated to the `BROKEN` standard; "Attacked and held"; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
