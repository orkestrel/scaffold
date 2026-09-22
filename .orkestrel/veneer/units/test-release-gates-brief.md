# Unit TEST-RELEASE-GATES — Independent gate evidence for the @orkestrel/test 0.0.19 release

## Role and engine

`verifier` on Sonnet, a native Claude subagent. Perform the runs directly and spawn nothing.

## Objective

Report exit-code truth for the release gate chain of `/home/user/test` on branch
`claude/inspiring-allen-t4qzv1` after the tolerance unit and the version bump landed in the
working tree.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md`;
`/home/user/scaffold/.agents/skills/orkestrel-publish/references/wave.md` § Prepare a layer (the
package's own `prepublishOnly` script is the gate).

**Host.** Linux, bash, Node 22, npm 10.9.7 (`npm ci` refuses nothing here; the manifest carries no
`devEngines`), Playwright Chromium 141 at `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Network is
available to `npm` (the distribution proof packs and installs from the registry).

**Standing conditions.** `git status` shows the tolerance edit in `tests/src/browser/helpers.test.ts`,
the bumped `package.json` and `package-lock.json`, and nothing else; read that dirty state as
expected. The `test:distribution -- --mode release` step fails rather than skips on an unreachable
registry by design.

## Scope

Read-only; run only the commands named. No fix, no edit, no install other than what the named
scripts perform themselves.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Commands, in order

1. `cd /home/user/test && git status --porcelain`
2. `cd /home/user/test && npm run format:check`
3. `cd /home/user/test && npm run lint:check`
4. `cd /home/user/test && npm run check`
5. `cd /home/user/test && npm run build`
6. `cd /home/user/test && npm test`
7. `cd /home/user/test && npm run test:distribution -- --mode release`

## Output

The Gate Report: per command, PASS or FAIL with the exit code and on FAIL the exact failing excerpt
with the file and line it points to; the overall verdict; anomalies one line each. Nothing else.
