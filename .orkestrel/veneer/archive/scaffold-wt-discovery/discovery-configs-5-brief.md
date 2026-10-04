# Unit discovery-configs-5 — pass each gate through to Vitest and restore the release gate's isolation

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\scaffold-wt-discovery`, branch `discovery-configs` at `92a980af2` (pushed). Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The review

The confirming review of `92a980af2` (Opus, objective, 2026-10-03) is at `tmp/codex/discovery-configs-4-review.md`: FAIL 2 (argument arity against Vitest's `mri` parser), 5 (same-named tests merged at gate matching), and 6 (installing fixtures under the checkout resolve dependencies from its `node_modules`), plus F-a to F-d. Claims 1, 3, 4, 7, 8, and 9 hold. Repair every required change with these rulings.

## Rulings

- **Pass through, never re-parse (required changes 1 to 3).** Stop classifying a gate's options against an allowlist. Pass every argument of the gate invocation to `vitest list` verbatim, in order, except a denylist of options that only shape output or execution and never selection: the reporter, output-file, coverage, color, cache, silent, UI, watch, and run-mode options, with their spellings and arity read from the installed Vitest CLI. Vitest then parses every selecting option itself, so `--no-X`, boolean values, `--` tokens, `--passWithNoTests`, `--allowOnly`, and `--strictTags` behave as Vitest defines them. Read arity only to remove a denylisted option and its value. An option `vitest list` refuses makes the census exit 2 naming the gate and the option.
- **Invocations that run no tests (4).** `--mergeReports`, `--listTags`, and `--clearCache` are not gates, as `bench` and `list` are not.
- **`--root` (5).** When a gate sets `--root` or `--dir` without `--config`, list its universe under the same root with no pinned config, as its own unit.
- **Duplicate names (6).** Add `--includeTaskLocation` to the universe listing and every full gate listing, and key full-gate identities on file, project, name, line, and column.
- **The release gate (7).** Return the installing fixtures to the system temporary directory, outside every directory with a `node_modules` above it, and find why the earlier run failed there: this host's distribution adopter installs with prefer-offline and can read stale packuments after a re-pin (refresh with a lock-only online resolve of a generated adopter, as the Windows npm notes in the scaffold records state); establish the actual cause from a run before changing anything. Keep the containment proof as a control that a package installed only in the checkout cannot be imported from a fixture's consumer.
- **The checkout census failure (9, F-a).** Remove the `expect.soft` added at `tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts:1134`; a soft assertion that hides a failure weakens the gate. Reproduce the exit 3, record its cause, and repair the cause (for example a file another process writes under `tmp/probes/` between the universe and a gate listing); never loosen the assertion.
- **Weak cases (8, F-b).** Add a line-filter case that selects one of two tests in one file, a `--tagsFilter` case, a boolean flag before a file filter, and a duplicate-name case with a partial gate, each red at `92a980af2`.
- **Empty rows (F-c).** Classify a row empty from the gate's own Vitest listing, never by comparing a filter string with reported names.
- **Wording (10, F-d).** Name every exit-2 cause in the opening comment and `SKILL.md`, and state the workbench rule as built.
- **Cost.** A gate with no arguments selects its unit's universe; reuse the universe listing for it instead of spawning another.

## Gates

After the last edit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:skills`, `npm run test:policy`, `npm run test:guides`, `npm run test:config`, `npm run build`, then `npm test`, then `npm run test:distribution` with no temporary-directory override. Then `git diff --check`. The final `git status --porcelain` is empty. When a test times out while another writer loads the host, rerun that file alone and report both runs; never raise a budget.

## Output

Write `tmp/codex/discovery-configs-5-report.md` and return it as your final message: per finding the change and its red and green commands with counts, the distribution failure's established cause, the checkout census failure's established cause, scaffold's and veneer's census output and wall times, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only if `vitest list` cannot accept a gate's arguments as `vitest run` does, and report: expected, found, evidence, and one hypothesis.
