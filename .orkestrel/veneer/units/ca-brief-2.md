# Unit CAROUSEL (`ca`) — round 2 (successor brief 2): the fix round

This brief succeeds `b-modal-ca-brief.md` (round 1, complete in the worktree) and carries every ruling in `ca-audit-verdict.md` § Rulings: claim 3 (the missing mutations and the matrix), claim 4 (the height assertion over every displayed slide), claim 8 (the tokens, the counts, the report), CAROUSEL-COPY (M14), F1 (the retained comparator with a negative control), R1 (the `visually-hidden` reason dropped), and R2 (the contrast under the caption box). Every owned file round 1 wrote stays; this round edits them in place and returns a revised shared patch.

## Role and engine

`opus` on Opus 5.5 (the `opus` alias), a native Claude subagent, the sole writer in `/home/user/veneer-ca` (branch `unit/ca`, uncommitted round-1 writes over `c3ac297`, its own `node_modules`).

## Objective

The CAROUSEL unit with every round-1 finding closed: executed mutations for every recorded rule the matrix names, a height assertion over every displayed slide, a contrast reading over every fill under the caption box, the ruled tokens and copy, a retained cascade comparator with its negative controls, and one shared-file patch `tmp/units/ca-shared-2.patch` against `c3ac297`.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/ca-audit-verdict.md` § Rulings and the three lane verdicts beside it (`ca-audit-objective-verdict.md`, `ca-audit-subjective-verdict.md`, `ca-audit-checker-verdict.md`) name every site and the exact right text; where a lane and the reconciled verdict differ, the reconciled verdict wins. Round 1's patch is `ca-shared.patch` and its report `b-modal-ca-report.md`, both retained there; round 1's instruments and logs are under `/home/user/scaffold/.orkestrel/veneer/units/ca-instruments/` (`tools/` and `logs/`, read-only for this round; the comparator `cascade-check.mjs` that `tools/gates.sh` names is absent there, which is F1). The landing base is `c3ac297` (`git -C /home/user/veneer-ca log -1 c3ac297`).

**Law.** `AGENTS.md`; `.claude/rules/{styles,tests,browser,names,documentation,writing,typescript}.md`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (M2, M8, M12, M14, R17, R19); the terrain `/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md`. Skill: none. Guide: `guides/veneer.md` (report-only: the patch).

**Installed primitives.** `@orkestrel/test` browser readers as round 1 used them; the installed `sass` compiler for the comparator's expanded compile; this round adds no helper.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-ca`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`; Chromium 141 at `/opt/pw-browsers` for the browser proofs; no network needed.

**Measurements.** The objective lane read the retained `mutations.log.txt` as recording failures in the advance and the selector-set cases for `next-guard-dropped` and `prev-guard-dropped`, and none in the lone-slide or display cases; the section proof's height assertion reads one slide (`CarouselSection.test.ts` around the advancing case, "as tall as its picture"); the contrast case parses the `<rect>` fill alone. Re-take each against the worktree before editing.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The worktree's owned files are dirty by design (round 1); do not revert anything. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are forbidden, `git add -N` followed by `git reset` included; produce the diff of an untracked file with `git diff --no-index /dev/null <path>`. The shared files stay report-only in the worktree. Build a fresh validation copy under `tmp/probe/base/`: `git -C /home/user/veneer-ca archive c3ac297 | tar -x -C tmp/probe/base`, then `cp -al node_modules tmp/probe/base/node_modules`, then `git -C tmp/probe/base init -q && git -C tmp/probe/base add -A && git -C tmp/probe/base commit -qm base`; copy the owned files over it after each edit and apply the patch; run every mutation, the comparator, and every gate there; copy the logs into `tmp/units/ca-instruments-2/logs/` and every script into `tmp/units/ca-instruments-2/tools/` before deleting `tmp/probe/`. The harness may refuse a write to the report path once; write the report as your final message in full as well as to the file.

## Unknowns

None.

## Scope

**Owned.** `src/styles/components/_carousel.scss`, `tests/src/styles/components/carousel.test.ts`, `app/browser/sections/CarouselSection.ts`, `tests/app/browser/sections/CarouselSection.test.ts`, `tmp/units/ca-shared-2.patch`, `tmp/units/ca-report-2.md`, `tmp/units/ca-instruments-2/` (this round's scripts, the comparator, one log per mutation, the control logs, each gate's log).

**Shared (report-only, inside the revised patch, which supersedes `ca-shared.patch` whole).** `src/styles/index.scss`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/setup.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `guides/veneer.md`.

**Off-limits.** Everything else, the vendored files, `ROADMAP.md`, `README.md`, `package.json`, `tests/fixtures/**`, `tests/setupServer.ts`, `src/browser/**`, `src/core/**`, and the sibling units' files (`_alert.scss`, `_collapse.scss`, `_dropdown.scss`, `_nav.scss`, their proofs and sections).

**What asserts the state this change ends.** `tests/src/styles/components/carousel.test.ts` (the display, fade, controls, and contrast readings), `tests/app/browser/sections/CarouselSection.test.ts` (the height loop), `tests/guides.test.ts` and `tests/policy.test.ts` on the validation copy (the guide).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix` outside the validation copy.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

`tmp/units/ca-shared-2.patch` (one unified diff against `c3ac297` covering every shared file) and the report `tmp/units/ca-report-2.md`: each finding's site with its before and after; the mutation table with every row naming the executed mutation, its log under `ca-instruments-2/logs/`, the `RUN` line's copy, and the case that went red; the comparator's runs (the expanded compile, the built cascade, and each negative control) with their logs; each gate's command and result line on the validation copy; the `git apply --check` line. The report states no count, names no list item by its position, writes no `new` or `now`, and uses no banned term.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when an added mutation does not redden its named case against the shipped proof, when the comparator's negative control does not read red, or when a guide site the ruling names cannot be located on `c3ac297`. Decide, record, and carry on for paragraph wrapping, the height loop's exact shape (one case or a loop inside the advancing case), how the contrast case parses the path fill, and where inside the instrument directory each log sits.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 in the validation copy with the owned files and the patch applied.
2. `git -C tmp/probe/base apply --check tmp/units/ca-shared-2.patch` exits 0 after the copy is returned to `c3ac297`, and the patch's file list equals the Shared row.
3. `mutate.py` under `tmp/units/ca-instruments-2/tools/` adds `next-display-dropped`, `prev-display-dropped`, `fade-active-dropped`, and `next-right-dropped`; each runs red on its named case against the shipped `carousel.test.ts` in the validation copy with one log per row; the unmutated control is green; the R19 matrix names `next-guard-dropped` and `prev-guard-dropped` on the advance case, the display mutations on the `.carousel-item-next` and `.carousel-item-prev` rows, `fade-active-dropped` on the `.carousel-fade .carousel-item.active` row, and `next-right-dropped` on the `.carousel-control-next` row.
4. `CarouselSection.test.ts` asserts, for every `.carousel-item.active` and `.carousel-item-next` slide in every specimen, that the slide's box height equals its picture's box height, under a title naming what it proves; the section mutation `stray-block` (visible text appended after the picture inside the captioned specimen's active slide) reddens it, recorded with its log.
5. The contrast case in `CarouselSection.test.ts` reads every fill the specimen's SVG paints beneath the caption box (the `<rect>` fill and the `<path>` fill, parsed from the specimen source) and asserts the lowest ratio against the caption color meets 4.5:1; the mutation `path-lightened` (the path fill raised to a light gray in the specimen source) reddens it, recorded with its log.
6. `tmp/units/ca-instruments-2/tools/cascade-check.mjs` reproduces round 1's comparison (the expanded compile and the built cascade against the inventory's selector order, conditions, declaration order, and normalized icon URIs), its clean runs are green with their logs, and its negative controls (one planted carousel rule; one swapped icon URI) read red with their logs.
7. In the patched guide and `app/browser/constants.ts`: `CAROUSEL_COPY.paragraph` reads "Compare a captioned carousel, a fading one, an inverted one over light pictures, and one caught advancing to its next slide, each state set as a class in markup, and hover or focus a control to compare its states."; the `CAROUSEL_SPECIMENS` TSDoc writes "the `active` class marks the resting slide and its indicator"; the guide's control sentence reads "Each control is named by its `aria-label` attribute." and the specimens' remark carries no "utility this cascade does not ship" clause; the guide writes "the `--bs-carousel-*` variables" and "the same variables"; the § Showcase paragraph and the class-section region pointer are unchanged.
8. `_carousel.scss`'s opening comment writes "the `active` class marks…", "the `carousel-item-next` and `carousel-item-prev` classes mark…", and "the `carousel-item-start` and `carousel-item-end` classes mark…"; `carousel.test.ts` writes "omits one of its variables" and titles the case "retunes every carousel variable…".
9. The scoped runs `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/carousel.test.ts tests/src/styles/components/close.test.ts` and `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CarouselSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` exit 0 in the validation copy after `npm run build:src`.
10. On the validation copy: `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, and `npm run test:conformance` exit 0, recorded with their result lines.
11. The report carries each item of § Output.

**Observations, not criteria.** The journey and `CAPTURE=1` are the Orchestrator's at landing, and the caption's size at 390 (R3) is ruled there on the frames.

## Review evidence

`tmp/units/ca-shared-2.patch`; `git diff --no-index /dev/null <path>` per owned file, concatenated as `tmp/units/ca-2.diff`; `git -C /home/user/veneer-ca status --porcelain` as `tmp/units/ca-2-status.txt`; the report; the instrument directory.
