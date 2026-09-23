# J-SEED audit — the objective lane's brief (round 1)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: correctness under adverse orderings, constraints, test sufficiency, and mechanical conformance. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane runs blind and in parallel; do not hedge toward an imagined consensus.

## Subject

The whole chain: Veneer `main` at `376d84a`, the J-SEED unit's uncommitted change in the worktree `C:/Users/mikes/WebstormProjects/veneer-seed` on `unit/seed` (its first and only round), briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-seed-brief.md` to repair the design verdict's R16 (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md`): after `destroy()`, `ColorMode.apply` and `toggle` write nothing. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-seed.diff` and the actual status `j-seed-status.txt` beside it; the unit's report `j-seed-report.md`; the worktree's files themselves.

## What the round decides

Whether J-SEED lands on Veneer `main` as the engine session's first code landing. A finding is worth more than a clean pass: the alternative is a consumer finding it after the package publishes.

## Already established — do not re-run

Verified by the Orchestrator directly, not taken from the unit's report: `git status --short` in the worktree lists exactly the three files the diff shows; `npm run test:src:browser -- tests/src/browser/ColorMode.test.ts` in the worktree exits 0 with `14 passed (14)` in Chromium 153.0.8010.12 (Playwright's managed `chromium-1243`); the base `376d84a` is Veneer `origin/main`.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-seed-audit-claims.md`, attempting refutation of each. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. Before confirming a claim about a proof (claims 5 and 6), name the mutation that would make that proof fail and say whether its assertions distinguish that mutation from the passing case. Your sandbox is read-only and denies the loopback listener the browser project binds, so you run no browser test: where a claim needs a run, rule `UNRESOLVED` and name the exact command and the mutation the Orchestrator runs on the host. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

Whether `tests/src/browser/ColorMode.test.ts` clears `sessionStorage` between cases (claim 6): read the file's setup and the browser project's setup files (`tests/setup.ts`, `tests/setupBrowser.ts`) for a storage fixture; report what you find.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification (the conduct law); `typescript.md`, `tests.md`, `architecture.md`, `names.md`, `writing.md` in that folder; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape (the value set and the terminal line). Report no prose finding: a wording, comment, or guide-sentence observation is a bound the Orchestrator records, not a finding.

## Execution

**A bench engine reading this brief inside its own CLI:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts one per claim in the claims file's order, each `CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED` with its evidence (`file:line`, the attack, or the settling command); findings fitting no claim, each substantiated to the `BROKEN` standard; "Attacked and held"; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
