# Unit P-taverna — make taverna overwriteable

## Role and engine

`builder` on Sonnet, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\taverna`. Perform the assignment directly and spawn nothing.
Fully specified; stop on any deviation.

## Objective

Declare the planned packages the fleet visit needs, remove the stale catalog agent file, and move
the operator's SessionStart hooks out of the vendored settings file, so the Orchestrator can
commit and run `scaffold overwrite` from a clean baseline.

## Context

Evidence: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\absorb-consumers-report.md`
§ taverna (no `@orkestrel/scaffold`, `test`, or `probe` declared; `.claude/agents/orkestrel.md`
carries the old specialist body without catalog markers; `.claude/settings.json` carries
SessionStart hooks to `scripts/deps.sh`, `ollama.sh`, `cursor.sh`). Procedure:
`C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-publish\references\wave.md`
§ Visit a repository (a stale catalog agent body is deleted and committed before the overwrite;
a target's own Claude permissions live in `.claude/settings.local.json`, never in the vendored
`.claude/settings.json`). Host: Windows 11, Git Bash. Network is not needed: install nothing.

## Steps

1. Record `git rev-parse --short HEAD` and `git status --porcelain` before any write. Where a
   row exists that is not yours, record it as the user's and never stage, restore, or rewrite it.
2. In `package.json` `devDependencies`, add, in alphabetical order among the `@orkestrel/*`
   rows: `"@orkestrel/probe": "^0.0.11"`, `"@orkestrel/scaffold": "^0.0.60"`,
   `"@orkestrel/test": "^0.0.12"`. Move no other range. Do not run `npm install`.
3. Delete `.claude/agents/orkestrel.md` with `git rm --quiet -- .claude/agents/orkestrel.md`
   (index and working tree; this is the wave's remedy and is not a forbidden command).
4. Read `.claude/settings.json`. Copy its `hooks` block, and any `permissions` block that is the
   operator's own rather than the vendored floor, into `.claude/settings.local.json` (create it
   with the same JSON shape if absent; merge if present). Leave `.claude/settings.json` untouched:
   the overwrite replaces it. Check whether `.claude/settings.local.json` is gitignored
   (`git check-ignore -q .claude/settings.local.json`) and record the answer.
5. Record `npm view @orkestrel/scaffold version` and `npm view @orkestrel/test version` (a read,
   not an install) so the Orchestrator knows whether the visit runs online or `--offline`.

## Scope

**Owned.** `package.json`, `.claude/agents/orkestrel.md` (deletion), `.claude/settings.local.json`.
**Off-limits.** Everything else. No commit; no `git checkout`/`restore`/`stash`/`reset`/`clean`;
no `npm install`.

## Output

Write `tmp/units/prepare-taverna-report.md` in the taverna checkout (create `tmp/units/`) and
return it: the head and status before and after; the three declared rows; the deletion;
the hook bodies moved and whether the local settings file is ignored; the two registry
versions; `git diff --stat`; `git status --porcelain`.

## Deviation contract

Stop and report when `package.json` already declares any of the three packages, when
`.claude/settings.json` holds no `hooks` block, or when a status row you did not write appears at
a path the overwrite would delete. Decide nothing else.

## Acceptance criteria

1. The three ranges are declared exactly as written; no other manifest line changed.
2. `git ls-files .claude/agents/orkestrel.md` prints nothing.
3. `.claude/settings.local.json` carries the hooks; the report states whether it is ignored.
