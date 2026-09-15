# Unit U0 — head-start install script: pack `@orkestrel/tool` and install the tarball into its consumers

## Role and engine

`builder` on Sonnet, a native Claude subagent. Perform the assignment directly and spawn nothing.
You AUTHOR the script; you never run it. Running it installs packages, which the permission floor
bars every role from; the Orchestrator runs it as a tracked command.

## Objective

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/u0-swap-tool.sh`: a re-runnable bash
script that builds the `tool` checkout, packs it, and installs the tarball (never links it) into
the `agent`, `mcp`, and `ollama` checkouts with `npm install --no-save --ignore-scripts --no-audit
--no-fund <tarball>`, recording a receipt.

## Context

**Evidence.** The retained scripts from the previous campaign are the pattern to follow; read them
first: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/U0-prior-g1-pack.sh.txt` and
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/U0-prior-a4-4-run.sh.txt` (byte
copies from git history, commits `1d789fcb` and `c5dbfa84`). Checkout root:
`C:/Users/mikes/WebstormProjects` (`tool`, `agent`, `mcp`, `ollama` are siblings of `scaffold`).
Each consumer declares `"@orkestrel/tool": "^0.0.14"` (verified 2026-09-15 by
`grep -n '"@orkestrel/tool"' agent/package.json mcp/package.json ollama/package.json`).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`;
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/portability.md` (bash under `scripts/`
style: `#!/usr/bin/env bash`, LF endings); `.agents/orchestration.md` § "Fixing a dependency before
it publishes" (install it, never link it; record the range you replaced; rebuild and repack whenever
the source moves; keep tarballs out of the tree under `tmp/`).

**Host.** Git Bash on Windows 11. `npm` resolves in Git Bash. Paths in the script use the
`/c/Users/mikes/WebstormProjects` form. No `setsid`, no heredocs, no `$(...)` needed beyond what
the prior scripts already use (those forms ran on this host).

**Standing conditions.** `tool` has no uncommitted changes at the time the script is authored, but
by the time it RUNS the tool checkout carries unit U1's edits; the script must not assume a clean
tree and must record `git status --porcelain` and `git rev-parse --short HEAD` of `tool` in the
receipt. `tmp/` is git-ignored in every checkout.

## Unknowns

none.

## Scope

**Owned.** `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/u0-swap-tool.sh` only.

**Off-limits.** Every other file. Do not run the script. Do not run `npm install`, `npm pack`, or
`npm run build` anywhere.

**Tools and limits.** Read, Write, Bash for read-only checks (`bash -n` syntax check of your own
script is permitted). No installs, no builds, no git mutations.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return: the script path, the `bash -n` result, and a five-line description of what the script
records in its receipt. Nothing else.

## Deviation contract

Stop and report if either prior script is missing or if a consumer's `package.json` does not
declare `@orkestrel/tool`. Decide and carry on for everything else.

## Acceptance criteria

1. `bash -n tmp/units/u0-swap-tool.sh` exits 0.
2. The script: `set -u`; builds `tool` with `npm run build` (log to `tmp/units/u0-build.log.txt`); packs with `npm pack --pack-destination <scaffold>/tmp/tarballs` (log `u0-pack.log.txt`), removing older `orkestrel-tool-*.tgz` from that directory first; installs the newest tarball into `agent`, `mcp`, and `ollama` in that order with `npm install --no-save --ignore-scripts --no-audit --no-fund` (one log per consumer); never uses `npm link`.
3. The receipt `tmp/units/u0-receipt.md` records, for each consumer: the declared range before and after (unchanged, since `--no-save`), the installed version before and after (`node_modules/@orkestrel/tool/package.json`), the install exit code, and whether the installed `dist/src/core/index.d.ts` contains the token `ToolContext` after the install (the token U1 introduces; `0` before, `1` or more after).
4. The receipt records `tool` HEAD, `tool` status, the tarball path and size, and the date.
5. The script exits non-zero if the build or the pack fails, before any install.
