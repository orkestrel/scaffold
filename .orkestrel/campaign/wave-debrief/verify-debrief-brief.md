# Unit verify-debrief — the authoritative gate run after the debrief's landing

## Role and engine

`verifier` on Claude Sonnet, a native subagent reading this brief: perform the assignment directly and spawn nothing. Read-only over the tree; run only the commands named here.

## Objective

Report exit-code truth for scaffold's gate chain on the integrated tree in `/home/user/scaffold`, so the debrief's propagation is proved by the generated-workspace projects and not by any writer's report.

## Context

**Law.** `AGENTS.md` § Work process (the gate order); `.claude/rules/quality.md` § Probes before arguments ("Read a gate bare").

**Host.** Linux, bash, working path `/home/user/scaffold`, network available through the proxy. A foreground command is capped at 10 minutes; the whole `prepublishOnly` chain last ran in 2 min 1 s (`22:21:40` → `22:23:41` on 2026-09-04), so run each gate as its own command and never pipe a gate into `tail` or `grep`.

**Measurements.** The tree carries the debrief's landing (a catalog change under `src/` and `tests/`, skill and contract prose under `.agents/`, `ROADMAP.md`, `guides/scaffold.md`, `.claude/agents/orkestrel.md`); `host.json` and `dist/` move with `npm run build`.

**Standing conditions.** None known to fail.

## Scope

Tools: Bash, Read, Grep, Glob. No edit, no write, no fix. Never `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no install, no commit.

## Execution

Run, in this order, each as one command, and record the exit code and the last lines of output for each:

1. `npm run format:check`
2. `npm run lint:check`
3. `npm run check`
4. `npm run build`
5. `npm test`
6. `npm run test:distribution -- --mode release` (an observation: report its reading and its exit code; it is not a criterion of this unit)
7. `git status --short` after the run (the build rewrites `host.json`; report every path listed)

## Output

Return, as your final message: one line per command with its exit code, the exact failure excerpt for any non-zero exit (the `FAIL` lines, the `error TS` lines, or the last 30 lines), the `git status --short` listing, and exactly one terminal line: `GATES: GREEN` when commands 1 through 5 exit 0, or `GATES: RED <command numbers>`.
