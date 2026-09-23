# Unit UTIL-SPACER (`us`) — round 3 (successor brief 4): the shared patch regenerated against the landing base

This brief succeeds `us-brief-3.md` (round 2, complete in the worktree) and carries one finding of the Orchestrator's: `us-shared-2.patch` applies to `87ff1d0` and fails on `c3ac297` at `tests/conformance.test.ts` (around its line 349) and `guides/veneer.md` (around its line 162), because CLOSE-GUIDE and B-PASSIVE-ORDER-GUIDE moved the guide's sections and the conformance order case gained members after the unit's base (`us-2-measurements.txt` records both readings). No owned file changes in this round.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-us` (branch `unit/us`, uncommitted round-2 writes over `87ff1d0`, its own `node_modules`).

## Objective

`tmp/units/us-shared-3.patch`: one unified diff against `c3ac297` whose content equals `us-shared-2.patch` hunk for hunk (the same added lines, the same rows, the same sentences) and whose context lines are the landing base's, applying cleanly there.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/us-shared-2.patch` (the content to carry), `us-2-measurements.txt` (the failing readings), `b-utilities-us-report-2.md` § Guide text (what each guide hunk places where), `us-audit-verdict.md` § Rulings (R4: `### Gap utilities` stays its own section). The landing base is the commit `c3ac297` on the session branch of the same repository (`git -C /home/user/veneer-us log -1 c3ac297` confirms it; `git -C /home/user/veneer-us show c3ac297:guides/veneer.md` and `git -C /home/user/veneer-us show c3ac297:src/styles/index.scss` read its guide and its barrel).

**Law.** `AGENTS.md`; `.claude/rules/{documentation,writing}.md`. Skill: none. Guide: `guides/veneer.md` (report-only: the patch).

**Placement rule.** The guide's sections follow the barrel's order. Place `### Gap utilities` between the sections of the partials that precede and follow `utilities/gap` in the `@use` order of `src/styles/index.scss` at `c3ac297`; place every other guide hunk at the site the round-2 report names, located by its heading and text rather than by line number. The conformance order case's expected list at `c3ac297` carries more members than at `87ff1d0`; insert `column-gap` and `gap` at the release's positions among the members present there, keeping the case's existing members.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-us`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`; no network needed.

**Standing conditions.** The worktree's owned files are dirty by design (round 2); do not revert anything and do not edit them. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are forbidden. The shared files stay report-only in the worktree. Build a validation copy under `tmp/probe/land/`: `git -C /home/user/veneer-us archive c3ac297 | tar -x -C tmp/probe/land`, then `cp -al node_modules tmp/probe/land/node_modules`, then `git -C tmp/probe/land init -q && git -C tmp/probe/land add -A && git -C tmp/probe/land commit -qm base`; copy the owned files over it (`git -C /home/user/veneer-us status --porcelain` lists them); delete `tmp/probe/` before the report.

## Unknowns

None.

## Scope

**Owned.** `tmp/units/us-shared-3.patch`, `tmp/units/us-report-3.md`.

**Shared (report-only, inside the patch).** `app/browser/constants.ts`, `tests/setup.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.ts`, `guides/veneer.md`, `ROADMAP.md`.

**Off-limits.** Everything else, the round-2 owned files included.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix` outside the validation copy.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

`tmp/units/us-shared-3.patch` and the report `tmp/units/us-report-3.md`: for each hunk whose context changed, the site at `c3ac297` (heading and first line) and the statement that its added lines equal round 2's; the `git apply --check` line; each gate's command and result line on the validation copy. The report states no count and uses no banned term.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when a site the round-2 report names cannot be located at `c3ac297` or when an added line of round 2's patch cannot be carried unchanged. Decide, record, and carry on for hunk boundaries and context width.

## Acceptance criteria

1. `git -C tmp/probe/land apply --check tmp/units/us-shared-3.patch` exits 0, and the patch's file list equals the Shared row.
2. The added lines of `us-shared-3.patch` (every line beginning `+` that is not a file header) equal the added lines of `us-shared-2.patch` as a multiset, and no line beginning `-` appears in either that the other lacks; record the command that compared them and its output.
3. On the validation copy with the owned files and the patch applied, after `npm run build:src` and `npm run build:app`: `npx oxfmt --check` over the patched shared files, `npm run check`, `npm run test:guides`, `npm run test:policy`, and `npm run test:conformance` exit 0, recorded with their result lines.
4. The report carries each item of § Output.

## Review evidence

`tmp/units/us-shared-3.patch`, the report, and `git -C /home/user/veneer-us status --porcelain` at hand-back showing the round-2 owned files and nothing new outside `tmp/`.
