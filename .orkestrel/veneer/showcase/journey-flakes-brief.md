# Unit journey-flakes — find why veneer's journey fails intermittently, and fix the causes

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in `C:\Users\mikes\WebstormProjects\veneer` on `main` at `24ae43d` (unpushed: the re-pin to `@orkestrel/browser` `^0.0.22` and `@orkestrel/scaffold` `^0.0.90`, and the scaffold 0.0.90 overwrite, which names browser instances from their merged labels; `main` on the remote is `4929856`). Commit each established fix separately; never push, publish, or install outside this checkout. Perform the assignment yourself and spawn nothing.

## The failures

`npm run test:journey` passed 88 of 88 at `4929856` in the proofs runs (2026-10-03, several runs). After the re-pin and overwrite, two runs on a quiet host each failed one different case:

1. The release visit's run: `tests/app/browser/integration.test.ts:1085` ("showcase statecharts › drives the $family table through its controls with motion=$motion"): `failures` and `harness.failures` were empty, yet `harness.status` was not `'passed'`. The variant and table were not captured.
2. The rerun (`tmp/visit-journey-rerun.log`): `journey:dark-390 (chromium)`, the same `it.each` at `:1062`, `:1083`: "Expands from xl shown through {Escape}: Condition \"Toggle navigation completes {Escape}\" did not hold within 5000ms (waited 5009.5ms)".

Whether the overwrite plays any part is not established; the overwrite changes `vite.config.ts` (instance naming in `mergeOverride`, `appJourney`, `appVue`) and the vendored `tests/config.test.ts`, not the journey's tests or veneer's engine.

## Assignment

1. **Measure the rate.** Run `npm run test:journey` enough times at `24ae43d`, and at `4929856` (in a temporary worktree you create under `tmp/` and remove after, or by checking out `vite.config.ts` and `tests/config.test.ts` from `4929856` temporarily and restoring them), to tell whether the failures are new or were always intermittent. Say before the runs how many settle the question and why; record every run with the host's other load (`Get-Process chrome,msedge,chrome-headless-shell,node,codex`), and capture each failing case's variant, table, scenario, and harness state (status, failures, and the statechart attributes) when it fails.
2. **Find each cause** from the code and the run evidence: the harness's status settling after its failure list (case 1), and the navbar collapse at 390 px under `Escape` from the `xl`-shown state (case 2): a missed `transitionend` or `hidden.bs.collapse`, a stale engine phase, a focus or pointer leftover from an earlier row, a derived observation window that is too short for the collapse at that width, or a host fact. Compare with Bootstrap 5.3.8 where the engine's behavior is in question (`.claude/rules/` and the departure ledger in `guides/` govern a departure).
3. **Fix each cause at its source** with a control that fails before the fix under the condition that exposes it. An engine defect gets an engine fix with its unit or oracle test (and, if `app/browser` or a page input changes, a rebuilt `showcase/browser.html` whose hash matches a fresh build); a harness timing assumption becomes a wait on the condition (`.claude/rules/tests.md` § Condition). Never raise a budget or a timeout to make a run pass.
4. **Prove it held**: repeat step 1's runs at the final commit the same way.

## Cost: the user's rule (2026-10-03)

Keep the journey's cost reasonable and measurable; no fractional or micro optimization. No figure in this brief is a target or a cap; size runs and thresholds to the case and state the reasoning.

## Gates

After the last commit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run test:setup:browser`, `npm run test:src`, `npm run test:app`, `npm run test:journey`, `npm run test:journey:vue`, `npm run test:integration`, `npm run test:conformance`, `npm run test:guides`, `npm run test:policy`, `npm run test:config`; then `git diff --check`. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/journey-flakes-report.md` and return it as your final message: the run tables at both commits with load, each failure's captured state, each cause with its evidence, each fix with its red and green evidence, the gate table, the commit hashes, and any deviation. No process diary.

## Deviation contract

Stop when a cause lies outside veneer (Chromium, Vitest, Playwright, or a dependency) and cannot be fixed here without a contract change, and report: expected, found, evidence, and one hypothesis.
