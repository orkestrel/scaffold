# Unit P-lloyds — make lloyds overwriteable

## Role and engine

`builder` on Sonnet, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\lloyds`. Perform the assignment directly and spawn nothing.
Fully specified; stop on any deviation.

## Objective

Declare the planned packages the fleet visit needs so the Orchestrator can commit and run
`scaffold overwrite` from a clean baseline.

## Context

Evidence: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\absorb-consumers-report.md`
§ lloyds (no `@orkestrel/scaffold`, `test`, or `probe` declared; no `.claude/agents/orkestrel.md`;
Bootstrap and Halfmoon in `devDependencies`). Procedure:
`C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-publish\references\wave.md`
§ Visit a repository. Host: Windows 11, Git Bash. Install nothing.

## Steps

1. Record `git rev-parse --short HEAD` and `git status --porcelain` before any write. Where a
   row exists that is not yours (a staged or untracked lockfile is expected), record it as the
   user's and never stage, restore, or rewrite it.
2. In `package.json` `devDependencies`, add in alphabetical order among any `@orkestrel/*`
   rows (or after the last `@` scoped row): `"@orkestrel/probe": "^0.0.11"`,
   `"@orkestrel/scaffold": "^0.0.60"`, `"@orkestrel/test": "^0.0.12"`. Move no other range.
3. Confirm `.claude/agents/orkestrel.md` is absent from the index and the working tree
   (`git ls-files` and `ls`); where an untracked copy exists, stop and report.
4. Read `.claude/settings.json` if present; where it carries a `hooks` block or operator
   permissions, copy them into `.claude/settings.local.json` as taverna's brief describes and
   record whether that file is ignored; where it is absent, record that.
5. Record `npm view @orkestrel/scaffold version` and `npm view @orkestrel/test version`.

## Scope

**Owned.** `package.json`, `.claude/settings.local.json`. **Off-limits.** Everything else. No
commit; no `git checkout`/`restore`/`stash`/`reset`/`clean`; no `npm install`.

## Output

Write `tmp/units/prepare-lloyds-report.md` in the lloyds checkout (create `tmp/units/`) and
return it: head and status before and after; the three rows; the catalog agent reading; the
settings reading; the two registry versions; `git diff --stat`; `git status --porcelain`.

## Deviation contract

Stop and report when `package.json` already declares any of the three, or when an untracked
catalog agent file exists. Decide nothing else.

## Acceptance criteria

1. The three ranges are declared exactly as written; no other manifest line changed.
2. The report states the catalog agent file's absence and the settings reading.
