# Unit CAROUSEL (`ca`) — round 3 (successor brief 3): the comparator's order check, the fade case's own title, and the report's record

This brief succeeds `ca-brief-2.md` (round 2, complete in the worktree) and carries `ca-audit-2-verdict.md` § Rulings: claim 5 with R-A (the comparator), FADE-IN-CONTRAST, FADE-COMMENT, and claim 8 with R-B and REPORT-COUNTS. Every owned file rounds 1 and 2 wrote stays; this round edits `tests/src/styles/components/carousel.test.ts` (one comment), `tests/app/browser/sections/CarouselSection.test.ts` (one case split), the comparator, and the report, and returns the same shared patch unless a file it touches is shared (none is).

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-ca` (branch `unit/ca`, uncommitted writes over `c3ac297`, its own `node_modules`).

## Objective

A comparator whose expanded-mode order check reads a moved departure property red with retained negative controls for every red branch, a section proof whose fade assertion sits under its own title, a fade comment naming every mutation routed to it, a controls comment naming its readings, and a round-3 report recording the executed commands.

## Context

**Evidence.** `ca-audit-2-verdict.md` § Rulings and the three lane verdicts beside it (`ca-audit-2-objective-verdict.md` claims 5, 7, and 8; `ca-audit-2-subjective-verdict.md` FADE-IN-CONTRAST, FADE-COMMENT, R-A, R-B). The comparator is `tmp/units/ca-instruments-2/tools/cascade-check.mjs` in the worktree (retained copy `ca-instruments-2/tools/cascade-check.mjs`; the objective lane cites the `expected` set built around line 228 and the exclusion `!expected.has(property)` around line 236). The contrast case sits in `tests/app/browser/sections/CarouselSection.test.ts` around lines 129 to 170 with the fading assertion around lines 165 to 170; the fade comment in `tests/src/styles/components/carousel.test.ts` around lines 177 to 180; the controls comment around line 286. Re-take each line against the worktree before editing.

**Law.** `AGENTS.md` § Writing; `.claude/rules/{tests,writing,typescript}.md`. Skill: none.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-ca`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`; Chromium 141 at `/opt/pw-browsers`.

**Standing conditions.** The worktree's owned files are dirty by design; do not revert anything. No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, `git worktree`, or `git add -N`. Rebuild the validation copy as round 2 did (`git archive c3ac297` into `tmp/probe/base/`, `cp -al node_modules`, `git init`/`add`/`commit`, the owned files copied in, the patch applied) for the comparator runs and the scoped proof runs; delete `tmp/probe/` after copying the logs into `tmp/units/ca-instruments-2/logs/`. The shared patch `tmp/units/ca-shared-2.patch` does not change; the report `tmp/units/ca-report-3.md` is this round's.

## Unknowns

None.

## Scope

**Owned.** `tests/src/styles/components/carousel.test.ts` (the two comments), `tests/app/browser/sections/CarouselSection.test.ts` (the case split), `tmp/units/ca-instruments-2/tools/cascade-check.mjs` and `cascade-runs.sh`, `tmp/units/ca-instruments-2/logs/` (the added runs), `tmp/units/ca-report-3.md`, `tmp/units/ca-3.diff`, `tmp/units/ca-3-status.txt`.

**Off-limits.** Everything else, `_carousel.scss` and `CarouselSection.ts` included, the shared files, and the vendored files.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; scoped runs only.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

`tmp/units/ca-report-3.md`: each site's before and after; the comparator runs (clean expanded and built, `color-before-position`, `missing-selector`, `swapped-keys`, `moved-layer`, `stale-departure`, restored) with their logs; the section and styles proof runs; the scoped `oxfmt` and `oxlint` commands with their executed arguments and results in the worktree; the worktree `git apply --check` line; the matrix row for `.carousel-fade .carousel-item.active` as rewritten. The report states no count of a growable set, names no list item by its position, writes "a regular expression" where round 2 wrote a count, and uses no banned term. Also `tmp/units/ca-3.diff` (`git diff --no-index /dev/null <path>` per owned test file) and `tmp/units/ca-3-status.txt`.

## Deviation contract

Stop and report when a negative control reads green after the comparator change or when the split case changes the contrast case's reading. Decide, record, and carry on for the new case's exact assertion shape and each control's exact edit.

## Acceptance criteria

1. `cascade-check.mjs` in `expanded` mode compares declaration order over every shared property, those with a recorded value departure included, and excludes only a property absent from one side; the clean expanded and built runs read green and the restored runs read green (logs under `logs/cascade/`).
2. The negative controls each read red with the named line, logged under `logs/cascade/`: `color-before-position` (`RED DECLARATION-ORDER` in expanded mode), `missing-selector` (`RED MISSING`), `swapped-keys` (`RED ORDER`), `moved-layer` (`RED LAYER`), and `stale-departure` (`RED STALE-DEPARTURE`, against a copy of the guide carrying one added `#### carousel` row the cascade does not write).
3. `CarouselSection.test.ts` carries the case `paints the fading carousel's resting slide at full opacity` holding the fading assertion the contrast case carried, the contrast case no longer reads the fading specimen, and the section mutation `fade-class-dropped` reddens the new case (logged under `logs/section-mutations/`) while the unmutated control is green.
4. The fade case's comment in `carousel.test.ts` names a fade rule that stops hiding the other slides, a stacking rule that drops the resting slide or either incoming slide, and the outgoing slide's delay dropped; the controls comment names the light, dark, and consumer readings with no "all three".
5. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/carousel.test.ts` and `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CarouselSection.test.ts` exit 0 in the validation copy after `npm run build:src`; the scoped `oxfmt --check` and `oxlint --deny-warnings` over the two owned test files exit 0 in the worktree, logged; `git -C /home/user/veneer-ca apply --check /home/user/veneer-ca/tmp/units/ca-shared-2.patch` exit 0, logged.
6. The report carries each item of § Output.

## Review evidence

`tmp/units/ca-3.diff`, `tmp/units/ca-3-status.txt`, the report, and the instrument directory.
