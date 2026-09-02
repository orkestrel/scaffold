# Unit U9 gates — the authoritative gate chain per repository

## Role and engine

`verifier` on Sonnet, native Claude Code subagent, one dispatch per repository. Run the exact
commands named for your repository, in order, and report exit-code truth with exact failure
excerpts. Fix nothing. Spawn nothing.

## Objective

Report whether the repository's ordered gate chain is green at its current commit, reading each
gate bare.

## Context

**Law.** `AGENTS.md` § Work process (the chain and its order); `.claude/rules/workspace.md`
§ Script intent. Skill: none.

**Host.** Windows 11, Git Bash. `node_modules` is installed in each repository. Browser projects
run headless Chromium through Playwright; the browsers are installed under
`%LOCALAPPDATA%\ms-playwright`. Read a gate bare: never pipe it through `tail`, `grep`, or `head`
when deciding its exit code; capture the whole output to a file under `tmp/` if it is long and
quote the failing excerpt from that file.

**Standing conditions.** Terrain's `git status` reads `D  package-lock.json` and
`?? package-lock.json` before any command; that is the user's state, not a finding. Terrain's
`node_modules/@orkestrel/test` is the packed tarball from `tmp/units/terrain-reference-tarball.txt`,
installed with `--no-save`; do not run `npm ci` or `npm install` there.

## The chain per repository

Run in this order and stop reporting nothing early; run every gate even after one fails, so the
report carries the whole picture.

| Repository | Commands |
| --- | --- |
| scaffold (`C:\Users\mikes\WebstormProjects\scaffold`) | `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test` |
| test (`C:\Users\mikes\WebstormProjects\test`) | `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test` |
| form (`C:\Users\mikes\WebstormProjects\form`) | `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test` |
| terrain (`C:\Users\mikes\WebstormProjects\terrain`) | `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test` |

Record `git rev-parse --short HEAD` and `git status --porcelain` before the first command.

## Output

Return, as your final message, one table: gate, exit code, the final summary line the gate
printed (test counts for a Vitest gate), and for a red gate the exact failing excerpt. Then one
line: `GATES: GREEN` or `GATES: RED (<which>)`. No process diary.

## Deviation contract

Stop and report when a command is missing from `package.json` or `node_modules` is absent. Nothing
else is a deviation: a red gate is a result, reported as such.
