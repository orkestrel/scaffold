# Unit brief: run the release gate chain for scaffold 0.0.56

## Role and engine

`verifier` on Claude Sonnet. Gate evidence is a native cheap-tier lane; the Sol bench is dark this
session (`codex` CLI ENOENT), which changes nothing for this unit.

## Objective

Run the exact `prepublishOnly` chain for `@orkestrel/scaffold` at the current committed tip and
report exit-code truth for every command. This is the authoritative evidence for the release: no
writer's self-report substitutes for it.

## Context

- Repository: `/home/user/scaffold`, branch `claude/scaffold-proposal-impl-nabmm9`, tree clean at
  the bump commit. The manifest version is `0.0.56`; the registry serves `0.0.55`.
- The chain the manifest declares is:
  `npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:distribution -- --mode release`.
- Run each command separately, in that order, so no single shell call approaches the ten-minute
  foreground cap. Continue through the chain even after a failure, so the report names every
  failing gate rather than the first one.
- `npm run build` rewrites `dist/` and `host.json`. That is expected and is part of the chain.
- `npm run test:distribution -- --mode release` packs the package and installs it in a temporary
  consumer, so it reaches the network and is the slowest command in the chain. Under
  `--mode release` it fails rather than skips on an unreachable registry.
- Standing condition: `tests/src/core/templates.test.ts` prints expected stderr during a passing
  run. Treat printed stderr as an anomaly to name, never as a failure; the exit code rules.
- Read `AGENTS.md` before acting. No skill is dispatch-named.

## Unknowns

The wall-clock cost of `test:distribution` under `--mode release` in this container is unmeasured.
If a single command exceeds its shell budget, report the cap and the command rather than retrying
it.

## Scope

- Owned: nothing. This unit writes no source file and fixes nothing.
- Allowed: `Read`, `Grep`, `Glob`, `Bash`. Run only the commands this brief names, plus
  `git status --short` and `git log --oneline -1`.
- Off-limits: every edit, every commit, every push, `git checkout`, `git restore`, `git stash`,
  `git reset`, `git clean`, and `npm publish`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Return one report:

- each command, its exit code, and the counts it printed (files formatted or checked, diagnostics,
  per-project test totals);
- the exact failing excerpt for any non-zero exit;
- the `git status --short` output after the chain, and whether `host.json` moved;
- any anomaly you observed, named as an anomaly with its command.

No process diary.

## Deviation contract

Stop and report — expected, found, evidence, done or not done, at most one hypothesis — if a
command is missing from the manifest, if the tree is dirty before you start, or if a command
cannot run at all. Do not fix, re-pin, install, or edit anything.

## Acceptance criteria

1. Every command in the chain has run and its exit code is reported.
2. Per-project test totals are reported for `npm test`.
3. The `test:distribution` result is reported with its mode.
4. `git status --short` after the chain is reported verbatim.
