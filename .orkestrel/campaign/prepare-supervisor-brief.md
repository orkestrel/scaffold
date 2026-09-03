# Unit P-supervisor — make supervisor overwriteable

## Role and engine

`builder` on Sonnet, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\supervisor`. Perform the assignment directly and spawn nothing.
Fully specified; stop on any deviation.

## Objective

Remove the stale catalog agent file, move the operator's hooks and permissions out of the
vendored settings file, and record the MCP registration the overwrite will delete, so the
Orchestrator can commit and run `scaffold overwrite` from a clean baseline.

## Context

Evidence: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\absorb-consumers-report.md`
§ supervisor (`.claude/agents/orkestrel.md` has catalog markers but a stale table and a body
that is not the 0.0.60 floor; `.claude/settings.json` carries a large permissions matrix and
SessionStart and Stop hooks; `.mcp.json` is tracked and registers the probe and codex servers;
scaffold `^0.0.50`, test `^0.0.10`, probe `^0.0.2` are declared and stale). Procedure:
`C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-publish\references\wave.md`
§ Visit a repository (delete and commit a stale catalog agent before the overwrite; a
gitignored `.mcp.json` becomes a permanent foreign finding, so never gitignore it). Host:
Windows 11, Git Bash. Install nothing.

## Steps

1. Record `git rev-parse --short HEAD` and `git status --porcelain` before any write. Where a
   row exists that is not yours, record it as the user's and never stage, restore, or rewrite it.
2. Delete `.claude/agents/orkestrel.md` with `git rm --quiet -- .claude/agents/orkestrel.md`.
3. Read `.claude/settings.json`. Copy its `hooks` block and its `permissions` block into
   `.claude/settings.local.json` (create with the same JSON shape if absent; merge if present).
   Leave `.claude/settings.json` untouched. Record whether the local file is gitignored.
4. Read `.mcp.json` and record its server names and commands verbatim in the report, so the
   operator can register them outside the tree after the overwrite deletes the file. Do not
   delete it, do not gitignore it.
5. Move no `package.json` range: the visit re-pins scaffold, test, probe, and every runtime
   range together. Record `npm view @orkestrel/scaffold version`, `npm view @orkestrel/test
   version`, and `npm view @orkestrel/supervisor version` (the registry head the later bump
   moves from).

## Scope

**Owned.** `.claude/agents/orkestrel.md` (deletion), `.claude/settings.local.json`.
**Off-limits.** Everything else. No commit; no `git checkout`/`restore`/`stash`/`reset`/`clean`;
no `npm install`.

## Output

Write `tmp/units/prepare-supervisor-report.md` in the supervisor checkout (create `tmp/units/`)
and return it: head and status before and after; the deletion; the hooks and permissions
moved and whether the local file is ignored; the MCP servers verbatim; the three registry
versions; `git diff --stat`; `git status --porcelain`.

## Deviation contract

Stop and report when `.claude/settings.json` holds neither `hooks` nor `permissions`, or when a
status row you did not write appears at a path the overwrite would delete. Decide nothing else.

## Acceptance criteria

1. `git ls-files .claude/agents/orkestrel.md` prints nothing.
2. `.claude/settings.local.json` carries the hooks and permissions; the report states whether
   it is ignored.
3. The MCP servers are recorded verbatim.
