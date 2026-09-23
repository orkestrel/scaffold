# The engine session's landing gate chain — the verifier's brief

## Role and engine

`verifier` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, `Glob`, and `Bash`. The executor that opens this brief is that subagent. The Orchestrator names the landing (the unit and the `main` commit) in the dispatch message; this brief is the same for every landing.

## Objective

The authoritative gate chain's exit-code truth on the Veneer `main` checkout at the named commit, so the Orchestrator pushes on evidence.

## Context

**Evidence.** The Orchestrator has cherry-picked the unit onto `main` in `C:/Users/mikes/WebstormProjects/veneer` and states the commit in the dispatch; `git -C C:/Users/mikes/WebstormProjects/veneer log --oneline -1` shows it. `node_modules` is installed from the lockfile with the digest marker at `node_modules/.orkestrel-lock.sha256`.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Work process (the gate order: `format:check` → `lint:check` → `check` → `build` → `npm test`), `.claude/rules/workspace.md` § Script intent and § Test project matrix (`test:service` runs the Tailwind service proofs outside `test`), `.claude/rules/quality.md` § Probes before arguments (read a gate bare; a pipeline stage after it hides the failing lines); skill: none.

**Installed primitives.** Not this unit's concern.

**Host.** Windows 11; the subagent's `Bash` is Git Bash; run every command from `C:/Users/mikes/WebstormProjects/veneer`; npm `12.0.2`; the browser projects launch Playwright's managed Chromium 153.0.8010.12; no network is needed (`test:service` compiles Tailwind in Node and drives the local browser). The chain takes several minutes; run each command in the foreground and read its exit code.

**Measurements.** None. Every reading is yours to take.

**Control identifiers.** None.

**Standing conditions.** `git status` may show the Orchestrator's records under `tmp/` (ignored) and nothing else; a dirty tracked file is a finding to report, never to discard. The `test:service` project drives Chromium and takes longer than the unit projects. `npm run build` writes `dist/`, which is expected.

## Unknowns

None.

## Scope

**Owned.** None. **Shared.** None. **Off-limits.** Every file: never edit, never fix, never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, never `format` or `lint --fix`, never install.

**Tools and limits.** `Bash` for the named commands only; `Read`, `Grep`, `Glob` to trim a failure excerpt.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The Gate Report as your final message: per gate, the exact command, `PASS` or `FAIL` with the exit code, and on `FAIL` the exact failing excerpt trimmed to the failure and the suspected owning file; the overall verdict `GREEN` only if every gate passed; anomalies one line each; the `git log --oneline -1` reading and the Chromium build the browser projects reported. No process diary.

## Deviation contract

Stop and report when a command cannot start (a missing script, a missing `node_modules`). Decide nothing else.

## Acceptance criteria

1. `npm run format:check` exit code read.
2. `npm run lint:check` exit code read.
3. `npm run check` exit code read.
4. `npm run build` exit code read.
5. `npm test` exit code read.
6. `npm run test:service` exit code read.

**Observations, not criteria.** The chain's wall-clock duration.

## Review evidence

The Gate Report is the evidence; the Orchestrator retains it as `<unit>-landing-gates.log.txt` beside the unit's records.
