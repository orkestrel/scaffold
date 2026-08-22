# Unit mcp-adopt, amendment 1: role, engine, and host facts

This amendment supplements `unit-mcp-adopt-brief.md`, which named no role or engine. The
original stands; this file adds what was missing and updates the standing facts to the
dispatch moment. Written 2026-08-21, before the unit's launch.

## Role and engine

Role `implementer`, engine **Claude Opus 5**, in the main checkout at
`C:/Users/mikes/WebstormProjects/mcp`. Routed native rather than to the Sol bench because
the transport suite spawns real child processes, which the bench sandbox denies. You
perform the assignment directly and spawn nothing beyond the suites you run.

## Context added

- Read `AGENTS.md`, the applicable `.claude/rules/*` files, and `guides/mcp.md` before
  editing.
- The `@orkestrel/process` tarball is installed at 0.0.6 before your start; the manifest
  and lockfile therefore already differ from HEAD, and that pair is a standing entry, not
  yours to change further. The published upstream contract you adopt is exactly the one
  the original brief states.
- Host facts: Windows 11, Git Bash for POSIX commands; the `npm` PowerShell shim is
  blocked — invoke `npm.cmd` and `npx.cmd` from the repository root.
- The upstream `ProcessExit.drained` field, `settled`, monotonic `stopping`, and the
  total terminal moment landed as described; `Process.evidence` freezes at the terminal
  moment and stays readable on the held reference afterward.

## Output added

Beside the original brief's acceptance report: the complete diff, per-criterion exit
codes with totals, and the deviation report shape from `.agents/orchestration.md` if any
trigger fires.
