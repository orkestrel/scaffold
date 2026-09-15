# Unit U0b — head-start install script: pack `@orkestrel/agent` and install the tarball into ollama and mcp

## Role and engine

`builder` on Sonnet, a native Claude subagent. Perform the assignment directly and spawn nothing.
You AUTHOR the script; you never run it (the Orchestrator runs it as a tracked command).

## Objective

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/u0b-swap-agent.sh`: a re-runnable bash
script that builds the `agent` checkout, packs it, and installs the tarball (never links it) into
the `ollama` and `mcp` checkouts with `npm install --no-save --ignore-scripts --no-audit --no-fund
<tarball>`, recording a receipt — the agent twin of the retained tool script.

## Context

**Evidence.** The tool script to pattern after, byte for byte where the package name is the only
difference: `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/u0-swap-tool.sh` (its receipt
`u0-receipt.md` beside it shows the recorded fields). `ollama/package.json` declares
`"@orkestrel/agent": "^0.0.22"`; `mcp/package.json` declares no `@orkestrel/agent` (it is
installed there only as a test subject for the distribution proof, so the receipt records
"declared range: none" for mcp and the installed version before as `absent` when
`node_modules/@orkestrel/agent/package.json` does not exist).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/portability.md`;
`.agents/orchestration.md` § "Fixing a dependency before it publishes".

**Host.** Git Bash on Windows 11; paths in the `/c/Users/mikes/WebstormProjects` form.

**Standing conditions.** When the script RUNS, the agent checkout carries unit U2's uncommitted
edits; record `git status --porcelain` and `git rev-parse --short HEAD` of `agent` in the receipt.
The token that proves the new agent landed: the installed `dist/src/core/index.d.ts` mentions
`ToolContext` (the agent now imports it) — count it before and after.

## Unknowns

none.

## Scope

**Owned.** `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/u0b-swap-agent.sh` only.
**Off-limits.** Everything else. Do not run the script or any install, pack, or build.
**Tools and limits.** Read, Write, Bash for `bash -n` only.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The script path, the `bash -n` result, and a five-line description of the receipt fields.

## Deviation contract

Stop and report if the tool script is missing. Decide and carry on for everything else.

## Acceptance criteria

1. `bash -n tmp/units/u0b-swap-agent.sh` exits 0.
2. Builds `agent` (`npm run build`, log `tmp/units/u0b-build.log.txt`), packs to
   `<scaffold>/tmp/tarballs` removing older `orkestrel-agent-*.tgz` first (log
   `u0b-pack.log.txt`), installs the newest tarball into `ollama` then `mcp` with the exact flags,
   never `npm link`; exits non-zero before any install if the build or pack fails.
3. The receipt `tmp/units/u0b-receipt.md` records agent HEAD, status, date, tarball path and size,
   and per consumer: declared range before/after (or `none`), installed version before/after (or
   `absent`), install exit code, the `ToolContext` count in the installed declaration before/after,
   and manifest/lock dirtiness after.
