# Unit UTIL-PLACEMENT (`upl`) — round 2 (successor brief 2): the fix round

This brief succeeds `b-utilities-upl-brief.md` (round 1, complete in the worktree) and carries every ruling in `upl-audit-verdict.md` § Rulings: claim 3 (the matrix, the missing logs, the frame runs), claim 4 (the `Maximum sizes` placement), claim 7 (the nouns, the frame paragraph, the cause clause, the wording), claim 8 (the case tables' home, the fixtures, the consumer patch's function, the comment counts), F1 (the registry remark), F2 (the corrected consumer patch), and the report's counts. Every owned file round 1 wrote stays; this round edits them in place and returns revised shared patches.

## Role and engine

`opus` on Opus 5.5 (the `opus` alias), a native Claude subagent, the sole writer in `/home/user/veneer-upl` (branch `unit/upl`, uncommitted round-1 writes over `e4e6a40`, its own `node_modules`).

## Objective

The UTIL-PLACEMENT unit with every round-1 finding closed: a matrix whose every case names a mutation that falsifies it with every run logged and its population stated, the `Maximum sizes` box inside the frame, the case tables and fixtures in the setup files, the ruled guide sentences, a consumer patch with no nested function, the registry remark, and one shared-file patch `tmp/units/upl-shared-2.patch` against `e4e6a40` carrying `index` lines and covering every shared file including `tests/service/tailwind/consumer.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `tests/setupBrowser.ts`.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/upl-audit-verdict.md` § Rulings and the three lane verdicts beside it (`upl-audit-objective-verdict.md`, `upl-audit-subjective-verdict.md`, `upl-audit-checker-verdict.md`) name every site and the exact right text; where a lane and the reconciled verdict differ, the reconciled verdict wins. Round 1's patches are `upl-shared.patch` and `upl-consumer.patch` and its report `b-utilities-upl-report.md`, retained there; round 1's instruments are under `/home/user/scaffold/.orkestrel/veneer/units/upl-instruments/` (read-only for this round; the worktree's own copy under `tmp/units/upl-instruments/` is yours to extend into `tmp/units/upl-instruments-2/`). The setup-file precedent is `GAP_STEP_CASES` in `tests/setupStyles.ts` with its freeze case in `tests/setupStyles.test.ts`; `GRID_BREAKPOINT_CASES` sits in `tests/setupStyles.ts` (around line 1551); `tests/setupBrowser.ts` holds the browser builders the section proofs share (read its exports before adding the focused start control).

**Law.** `AGENTS.md` (§ Design laws "No nested functions"; § Writing); `.claude/rules/{styles,tests,browser,names,documentation,writing,typescript}.md` (`tests.md` § "Data tables and case matrices belong in a setup file at any size"); the family record `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-family.md` (ruling 8: `.vw-100`, `.fixed-*`, and `.sticky-*` render inside the shell `.viewport` frame); the design verdicts `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md` and `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (M3, M4). Skill: none. Guide: `guides/veneer.md` (report-only: the patch).

**Installed primitives.** `@orkestrel/test` browser readers as round 1 used them; the installed `sass` and `tailwindcss` compilers; this round adds no helper beyond the setup-file builder the ruling names.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-upl`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`; Chromium 141 at `/opt/pw-browsers`; sibling units run in their own worktrees, so a timing failure under load is re-run alone once and reported with the load reading.

**Measurements.** The objective lane read the matrix's helper-placement row at `b-utilities-upl-report.md` around line 119 against `helper-in-components.log.txt` (only the utility-precedence and layer-escape cases red), the frame logs' population of 6, and the missing `visibility-order-reversed` and `fixed-important` logs; the subjective lane read the `Maximum sizes` markup at `upl-shared.patch` around line 128, the bare tokens at the patch's lines around 929 to 1017, the § Showcase paragraph around lines 1125 to 1134, the § Tailwind clause around lines 908 to 910, the nested function at `upl-consumer.patch` around line 16, the local tables at `sizing.test.ts` around lines 9 and 18, `position.test.ts` around lines 8 to 23, `visually-hidden.test.ts` around lines 14 to 19, and `components/position.test.ts` around lines 11 and 12, the hand-typed infix lists, and the repeated `Start` button fixture. Re-take each against the worktree before editing.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The worktree's owned files are dirty by design (round 1); do not revert anything. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are forbidden, `git add -N` followed by `git reset` included; produce the diff of an untracked file with `git diff --no-index /dev/null <path>`. The shared files stay report-only in the worktree. Build the fresh copy as round 1 did (`git archive e4e6a40`, `cp -al node_modules`, the owned files laid over it, the patch applied), but initialize it as a git repository and commit its base before applying, so the returned patch comes from `git diff` there and carries `index` lines; run every mutation, every control, and every gate there; copy every log into `tmp/units/upl-instruments-2/logs/` and every script into `tmp/units/upl-instruments-2/tools/` before deleting `tmp/probe/`. Veneer `main` has moved past `e4e6a40`; the patch stays against `e4e6a40` and the Orchestrator resolves it three-way at landing.

## Unknowns

None.

## Scope

**Owned.** The round-1 owned files (`src/styles/utilities/_position.scss`, `_sizing.scss`, `_visibility.scss`, `_visually-hidden.scss`, `src/styles/components/_position.scss`, `app/browser/styles/_shell.scss`, `app/browser/sections/PositionSection.ts`, `SizingSection.ts`, `VisibilitySection.ts`, the five style proofs, the three section proofs), `tmp/units/upl-shared-2.patch`, `tmp/units/upl-report-2.md`, `tmp/units/upl-instruments-2/`.

**Shared (report-only, inside the revised patch, which supersedes `upl-shared.patch` and `upl-consumer.patch` whole).** The files round 1's patches touched, and `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `tests/setupBrowser.ts`.

**Off-limits.** Everything else, the vendored files, `ROADMAP.md`, `README.md`, `package.json`, `src/styles/_mixins.scss`, `src/styles/_tokens.scss`, `tests/fixtures/oracle/**`, `tests/setupServer.ts`, `src/browser/**`, `src/core/**`, and every sibling unit's files.

**What asserts the state this change ends.** `tests/setupStyles.test.ts` (the freeze case over the new constants), the five style proofs and the three section proofs (Owned), `tests/service/tailwind/consumer.test.ts` (the consumer case), `tests/guides.test.ts` and `tests/policy.test.ts` on the fresh copy (the guide).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix` outside the fresh copy.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

`tmp/units/upl-shared-2.patch` (one unified diff with `index` lines against `e4e6a40` covering every shared file) and the report `tmp/units/upl-report-2.md`: each finding's site with its before and after; the proof matrix with every case naming a mutation that reddens it and every run's population; the mutation record with one log per run in one copy (the unmutated controls included); the frame runs against the shipped section proof; each gate's exact command and result line on the fresh copy; the `git apply --check` line. The report states no count of a growable set, names no list item by its position, and uses no banned term.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when a moved table changes a proof's reading, when the `Maximum sizes` box inside the frame changes the sizing readings the cap case takes, or when a guide site the ruling names cannot be located on `e4e6a40`. Decide, record, and carry on for the constants' exact shapes, names, and doc comments, the builder's exact signature, paragraph wrapping, and where inside the instrument directory each log sits.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 in the fresh copy with the owned files and the patch applied.
2. `git -C <fresh copy> apply --check tmp/units/upl-shared-2.patch` exits 0 after the copy is returned to `e4e6a40`, the patch carries an `index` line per file, and its file list equals the Shared row.
3. `tests/setupStyles.ts` exports frozen, documented, qualified constants for the size steps, the edge steps, the position values, the hidden-reading table, and one container fixture per shape, with the infix names derived from `GRID_BREAKPOINT_CASES`; `tests/setupStyles.test.ts` binds them in a freeze case beside the gap steps' case; `tests/setupBrowser.ts` exports a builder for the focused start control; the five style proofs and the three section proofs import them and restate no table, fixture, or infix list.
4. The mutation record under `tmp/units/upl-instruments-2/logs/` holds one log per run in one copy with its population stated: the unmutated style and section controls green; every round-1 mutation; `visibility-order-reversed` red on the visibility precedence case; `fixed-important` red on the normal-helper case; the frame mutations (`contain` dropped, `overflow: auto`, the height unbounded) red against the shipped `PositionSection.test.ts`; and the matrix names, for every case, a mutation that reddens it (the helper-placement mutation on the utility-precedence and layer-escape cases only).
5. In the patched `app/browser/constants.ts`: the `Maximum sizes` specimen renders its `.vw-100` box inside its `.viewport` element beside the height cap, the `SIZING_SPECIMENS` remark says so, and the Sizing section proof's readings are green; the `CASCADE_KEYS` remark in `tests/setup.ts` carries the hidden-host sentence the ruling names.
6. `tests/service/tailwind/consumer.test.ts` in the patch reads each branch element on its own name's longhands with `longhands.get(name) ?? []` inlined at its uses and no function assignment inside the test body; `npm run build:src:styles && npm run test:service` exits 0 in the fresh copy and the round-1 negative controls stay red, logged.
7. In the patched guide: every class token used as a sentence subject or object in the three utility sections and the § Showcase frame paragraph takes its noun; the frame paragraph opens on the frame, names the specimens that render inside "the shell's `viewport` class" as shipped, and carries no region-order sentence; the § Tailwind clause states that a longhand another name declares can move for a reason outside the equality; "each resolved value", "sets aside a width or height the element declares, so the box takes its content's size", and "including a box inside an invisible ancestor" replace the sentences the subjective lane names.
8. `src/styles/utilities/_position.scss` and `_sizing.scss` carry no count in their comments (the edge entries; the single-value maps).
9. The scoped runs over the five style proofs plus `tests/setupStyles.test.ts`, and over the three section proofs plus `Showcase.test.ts` and `index.test.ts`, exit 0 in the fresh copy after `npm run build:src`.
10. On the fresh copy: `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, and `npm run test:conformance` exit 0, recorded with their exact commands and result lines.
11. The report carries each item of § Output.

**Observations, not criteria.** The journey and `CAPTURE=1` are the Orchestrator's at landing.

## Review evidence

`tmp/units/upl-shared-2.patch`; `git diff --no-index /dev/null <path>` per untracked owned file and `git diff` for `_shell.scss`, concatenated as `tmp/units/upl-2.diff`; `git -C /home/user/veneer-upl status --porcelain` as `tmp/units/upl-2-status.txt`; the report; the instrument directory.
