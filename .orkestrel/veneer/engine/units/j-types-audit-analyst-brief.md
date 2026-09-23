# J-TYPES audit — the objective lane's brief (round 1)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: correctness against Bootstrap's source, constraints, contract sufficiency, and mechanical conformance. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane runs blind and in parallel; do not hedge toward an imagined consensus.

## Subject

The whole chain: Veneer `main` at `376d84a` (its tip is `97ac9ab`, one commit on `src/browser/ColorMode.ts`, its test, and one guide sentence, which this unit does not touch), the J-TYPES unit's uncommitted change in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (its first and only round), briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief.md` to declare every engine contract the design verdict (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md`, R2 to R14) fixes, types first, before any implementation unit. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types.diff` and the actual status `j-types-status.txt` beside it; the unit's report `j-types-report.md` (its "Rulings taken" section records the shapes the unit settled under the brief's Unknown 2); the worktree's files themselves; Bootstrap 5.3.8's source at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/` (each plugin's `Default` object, its `EVENT_*` constants, and its `EventHandler.trigger` calls are the ground truth for claims 1 to 4 and 7).

## What the round decides

Whether the contracts land on Veneer `main` as the base every implementation unit (J-BINDER, J-COLLAPSE, and the rest) writes against. A defect in a contract reaches every later unit, so a finding here is worth more than one in any implementation.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree, not taken from the unit's report (`j-types-gates.log.txt`): `git status --short` lists exactly the two files the diff shows; `npm run check:src:browser` exits 0; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts` exits 0; `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md` exits 0; `npm run test:guides` passes 19 of 19; `npm run test:policy` passes 109 (1 skipped); `npm run test:src:browser -- tests/src/browser/index.test.ts` passes 2 of 2. The Orchestrator's mutation for claim 15 ran as the claim states. `git diff -w -U0 -- guides/veneer.md` removes three lines (two separator rows and the `toggle` cell) and adds 240.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims.md`, attempting refutation of each. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. Before confirming a claim about a proof (claims 10, 11, and 15), name the mutation that would make that proof fail and say whether its assertions distinguish that mutation from the passing case. Your sandbox is read-only and denies the loopback listener the browser project binds, so you run no browser test; you may run `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory for a type-level attack, and `git diff` and `grep` freely. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files. Attack claims 1 to 4 and 7 from Bootstrap's source, not from the verdict's summary of it.

## Unknowns

Whether any `{Entity}Options` key set leaves a Bootstrap `Default` key with no TypeScript path that the verdict does not exclude (claim 3): walk each plugin's `Default` object and report every key and its path or exclusion. Whether Toast's `show` lacking a "was shown" refusal is a departure or Bootstrap's own behaviour (claim 7): read `toast.js` `show()` and report.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification (the conduct law); `typescript.md`, `names.md`, `patterns.md`, `architecture.md`, `documentation.md`, `writing.md` in that folder; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape (the value set and the terminal line). Report no prose finding: a wording, comment, or guide-sentence observation is a bound the Orchestrator records, not a finding.

## Execution

**A bench engine reading this brief inside its own CLI:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts one per claim in the claims file's order, each `CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED` with its evidence (`file:line`, the attack, or the settling command); findings fitting no claim, each substantiated to the `BROKEN` standard; "Attacked and held"; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
