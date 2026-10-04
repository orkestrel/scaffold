# Unit discovery-configs-3 — gate per test, match Vitest's filters, and name instances from the merged label

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\scaffold-wt-discovery`, branch `discovery-configs` at `245248689`. Make two commits (census, then templates); never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The review

`tmp/codex/discovery-configs-2-review.md`: `FAIL 1, 3, 4` and X1 to X3. Repair every item as it states, with these rulings.

## Commit 1: the census

- Gate each merged test, by its `[file, projectName, name]` identity, by the listings that collected it; a row is gated only when every test in it is, and a row with any ungated test is flagged (closes 1(a) and 1(c)). A project that collects nothing anywhere keeps the named-but-empty reading the absent-project case relies on.
- Record a test-file argument as a file gate only for a command that is not a Vitest invocation (1(b)).
- Fold only a browser-instance suffix: the browser names Vitest's providers accept (read them from the installed `vitest` and `@vitest/browser*` declarations; never a guessed list), so `core (legacy)` stays its own project (1(d)).
- Match `--project` filters with Vitest's own semantics: wildcards, `!` negation, and case-insensitive whole-name matching, read from the installed Vitest source the review cites, so `--project "src:*"`, `--project !browser`, and `--project Core` gate what Vitest runs.
- Recognize a Vitest invocation only with the Vitest token in command position (directly, or after `node`, `npx`, or a path to `vitest.mjs`), so `npm ls vitest` is not a gate; a `vitest list` is not a test gate.
- X1: a row's `units` lists only the listings that collected it. X2: `vitest bench` lists in Vitest's `benchmark` default mode.
- A proof for each of 1(a), 1(b), 1(c), 1(d), the three filter forms, command position, and X2, each red on `245248689` and green after.
- The opening comment and `SKILL.md` state the per-test rule.

## Commit 2: the generated configs

- Emit the factories with no instance names; after `mergeOverride`, name each instance that still has none `${label} (${browser})` from the merged label, so an overridden label and an instance a consumer adds are named alike, and `appVue` and `appJourney` drop inherited names instead of restating a label.
- Prove it live for every factory that emits instances (src browser, app browser, app Vue, the journey, a sheet) and for an overridden label and an added instance, each red before and green after. That proof spawns Vitest with Chromium, so it lives in a project of its own, not in the parallel `src:core` pool (`.claude/rules/tests.md` § Expensive proofs); register its gate.
- Move the instance-naming paragraph to the guide section that owns the generated factories (X3), and make it true for an overridden label.
- Run `npm run test:distribution` (the adopter run reaches `tests/config.test.ts:184-189`, `:360-367`, `:412-416`).

## The timeouts

Run `npm run test:src:core` three times at `81ac20857` and three times at your final tip on this host, with no other browser work running (check with `Get-Process chrome,msedge,node`; report what else ran), and report every result. The final `npm test` must exit 0; never raise a budget to get there.

## Gates

After each commit's last edit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:skills`, `npm run test:policy`, `npm run test:guides`, `npm run test:config`; after commit 2 also `npm run build`, then `npm test`, then `npm run test:distribution`. Then `git diff --check`. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/discovery-configs-3-report.md` and return it as your final message: per item the change and its red and green commands with counts, veneer's census (run from its root with your script by absolute path), the timeout runs, the gate tables, both commit hashes, and any deviation. No process diary.

## Deviation contract

Stop only if Vitest's filter or instance-name semantics cannot be read from its installed source, and report: expected, found, evidence, and one hypothesis.
