# Unit UTIL-DISPLAY (`ud`) — round 2 (successor brief 2): the fix round

This brief succeeds `b-utilities-ud-brief.md` (round 1, complete in the worktree) and carries every ruling in `ud-audit-verdict.md` § Rulings: claim 3 (the matrix's mutations and the control log), claim 4 (the inline-style refusal, the centering reading, the item labels), claim 7 (the § Tailwind sentence, the nouns, the wording), claim 8 (the case tables' home, the report), the retained evidence for claims 2 and 6, and the `FLEX_COPY` clause. Every owned file round 1 wrote stays; this round edits them in place and returns a revised shared patch.

## Role and engine

`opus` on Opus 5.5 (the `opus` alias), a native Claude subagent, the sole writer in `/home/user/veneer-ud` (branch `unit/ud`, uncommitted round-1 writes over `e4e6a40`, its own `node_modules`).

## Objective

The UTIL-DISPLAY unit with every round-1 finding closed: a proof matrix whose every case names a mutation that reddens it with a logged unmutated control, section proofs that refuse an inline style, a centering reading that can fail, specimen labels that name the class they demonstrate, the case tables in `tests/setupStyles.ts`, the ruled guide sentences, the retained conformance and Tailwind evidence, and one shared-file patch `tmp/units/ud-shared-2.patch` against `e4e6a40` carrying index lines.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/ud-audit-verdict.md` § Rulings and the three lane verdicts beside it (`ud-audit-objective-verdict.md`, `ud-audit-subjective-verdict.md`, `ud-audit-checker-verdict.md`) name every site and the exact right text; where a lane and the reconciled verdict differ, the reconciled verdict wins. Round 1's patch is `ud-shared.patch` and its report `b-utilities-ud-report.md`, both retained there; round 1's instruments are under `/home/user/scaffold/.orkestrel/veneer/units/ud-instruments/` (read-only for this round; the worktree's own copy under `tmp/units/ud-instruments/` is yours to extend into `tmp/units/ud-instruments-2/`). The UTIL-SPACER precedent for a setup-file case table is `GAP_STEP_CASES` in `tests/setupStyles.ts` and its freeze case in `tests/setupStyles.test.ts`.

**Law.** `AGENTS.md`; `.claude/rules/{styles,tests,browser,names,documentation,writing,typescript}.md` (`tests.md` § "Data tables and case matrices belong in a setup file at any size"); the family record `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-family.md`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`. Skill: none. Guide: `guides/veneer.md` (report-only: the patch).

**Installed primitives.** `@orkestrel/test` browser readers as round 1 used them; the installed `sass` and `tailwindcss` compilers as round 1 used them; this round adds no helper.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-ud`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`; Chromium 141 at `/opt/pw-browsers` for the browser proofs; no network needed. Five sibling units run in their own worktrees; a timing failure under that load is re-run alone once and reported with the load reading.

**Measurements.** The objective lane read the display mode case at `display.test.ts` around line 119 as reading `.d-inline-flex` and `.d-table-cell` with no competing declaration, the vertical-stack layout case at `stacks.test.ts` around line 32, the section proofs' markup comparisons at `DisplaySection.test.ts` around line 32 and `FlexSection.test.ts` around line 38, the guide's class-token subjects at the patch's lines around 667 and 674, and the data tables at `display.test.ts` around line 9, `flex.test.ts` around lines 11 and 114, and `vertical-align.test.ts` around line 8; the subjective lane read the centering case at `FlexSection.test.ts` around lines 88 to 128 and the `FLEX_SPECIMENS` doc comment at the patch's line 72. Re-take each against the worktree before editing.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The worktree's owned files are dirty by design (round 1); do not revert anything. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are forbidden, `git add -N` followed by `git reset` included; produce the diff of an untracked file with `git diff --no-index /dev/null <path>`. The shared files stay report-only in the worktree. Build the landing copy as round 1 did (`git ls-files` plus the owned files plus the patch, a hard-linked `node_modules`, under `tmp/probe/land/`), but initialize it as a git repository and commit its base before applying the patch, so the patch you return comes from `git diff` there and carries `index` lines (round 1's patch had none, and `git apply --3way` at landing needs them); run every mutation, every control, and every gate there; copy every log into `tmp/units/ud-instruments-2/logs/` and every script into `tmp/units/ud-instruments-2/tools/` before deleting `tmp/probe/`. Veneer `main` has moved past `e4e6a40` (the disclosure and ALERT landings); the patch stays against `e4e6a40` and the Orchestrator resolves it three-way at landing.

## Unknowns

None.

## Scope

**Owned.** `src/styles/utilities/_display.scss`, `_flex.scss`, `_vertical-align.scss`, `src/styles/components/_stacks.scss`, `tests/src/styles/utilities/display.test.ts`, `flex.test.ts`, `vertical-align.test.ts`, `tests/src/styles/components/stacks.test.ts`, `app/browser/sections/DisplaySection.ts`, `FlexSection.ts`, `tests/app/browser/sections/DisplaySection.test.ts`, `FlexSection.test.ts`, `tmp/units/ud-shared-2.patch`, `tmp/units/ud-report-2.md`, `tmp/units/ud-instruments-2/`.

**Shared (report-only, inside the revised patch, which supersedes `ud-shared.patch` whole).** The files round 1's patch touched (`src/styles/index.scss`, `app/browser/constants.ts`, `app/browser/index.ts`, `app/browser/Showcase.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/fixtures/tailwind/markup.html`, `guides/veneer.md`) and now `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (the case tables and their freeze case).

**Off-limits.** Everything else, the vendored files, `ROADMAP.md`, `README.md`, `package.json`, `src/styles/_mixins.scss`, `src/styles/_tokens.scss`, `tests/fixtures/oracle/**`, `tests/setupServer.ts`, `src/browser/**`, `src/core/**`, and every sibling unit's files.

**What asserts the state this change ends.** `tests/setupStyles.test.ts` (the freeze case over the new constants), the four style proofs and the two section proofs (Owned), `tests/guides.test.ts` and `tests/policy.test.ts` on the landing copy (the guide).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix` outside the landing copy.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

`tmp/units/ud-shared-2.patch` (one unified diff with `index` lines against `e4e6a40` covering every shared file) and the report `tmp/units/ud-report-2.md`: each finding's site with its before and after; the proof matrix with every case naming a mutation that reddens it; the mutation record with one log per run (the unmutated control included), each naming its copy; the conformance output and the `cascade.test.ts` control run; the Tailwind control logs with the restoration digests; each gate's exact command and result line on the landing copy; the `git apply --check` line. The report states no count of a growable set, names no list item by its position, and uses no banned term.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when an added mutation does not redden its named case, when a moved case table changes a proof's reading, or when a guide site the ruling names cannot be located on `e4e6a40`. Decide, record, and carry on for the constants' exact shapes and doc comments, the centering assertion's exact form, the labels' exact wording where the ruling names the convention, paragraph wrapping, and where inside the instrument directory each log sits.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 in the landing copy with the owned files and the patch applied.
2. `git -C tmp/probe/land apply --check tmp/units/ud-shared-2.patch` exits 0 after the copy is returned to `e4e6a40`, the patch carries an `index` line per file, and its file list equals the Shared row.
3. `tests/setupStyles.ts` exports frozen, documented `DISPLAY_VALUES`, `ALIGN_VALUES`, `FLEX_ENTRY_CASES`, and `FLEX_RESTING_VALUES` (the flex case matrix and its resting-value table; name the members for what they are), `tests/setupStyles.test.ts` binds them in a freeze case beside the gap steps' case, and `display.test.ts`, `flex.test.ts`, `vertical-align.test.ts`, `DisplaySection.test.ts`, and `FlexSection.test.ts` import them and restate no list.
4. The mutation record under `tmp/units/ud-instruments-2/logs/` holds one log per run in one copy: the unmutated control green over the four style proofs; every round-1 mutation; `display-mode-override` (a `[data-bs-theme='dark']` override of `.d-inline-flex` planted in the partial) red on the display mode case; `vstack-direction-dropped` (`flex-direction: column` removed from `.vstack`) red on the vertical-stack layout case; and the matrix names, for every case, a mutation that reddens it.
5. `DisplaySection.test.ts` and `FlexSection.test.ts` each assert `region.querySelector('[style]')` is null, and the section mutation `inline-style-added` (a `style` attribute on a specimen element in the constants) reddens each, logged; the horizontal-stack centering case also asserts each text item's box height is less than the stack's box height, and the mutation `hstack-center-dropped` (`align-items: center` removed from `.hstack`) reddens it, logged.
6. In the patched `app/browser/constants.ts`: every item that demonstrates a class in the `Aligned items`, `Aligned content`, `Aligned self`, and `Fill, grow, and shrink` specimens is labeled with that class's full name (the tall sibling keeps `Tall`; the stacks' items keep their prose labels); the `FLEX_SPECIMENS` doc comment states that convention; `FLEX_COPY.paragraph` carries no "Resize the viewport" clause.
7. In the patched guide: the § Tailwind sentence round 1 added is replaced by "Every other shipped name off the line reads the same way; Tailwind's `order-first` rule declares the `order` longhand alone, and Veneer declares it with `!important`, so the `order-first` class resolves Veneer's `-1` rather than Tailwind's `-9999`." placed directly after the gap-steps sentence; every class token used as a sentence subject in `### Display utilities` and `### Flex utilities` takes its noun ("the `.d-md-flex` class lays…", "the `.d-print-none` class hides…"); the print-block sentence reads "one `@media print` block, after the walk, that writes every value again under the `-print` infix."; `vertical-alignment` is the one spelling.
8. `tmp/units/ud-instruments-2/logs/` holds the landing copy's `npm run test:conformance` output with its departures, additions, and stale-row assertions green; a `cascade.test.ts` run with a planted `.d-probe` rule reporting `extra` above zero, then the clean run; and the Tailwind control A and control B runs of `npm run test:service` red with their cases named and the restoration digests equal.
9. The scoped runs `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/display.test.ts tests/src/styles/utilities/flex.test.ts tests/src/styles/utilities/vertical-align.test.ts tests/src/styles/components/stacks.test.ts tests/setupStyles.test.ts` and `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/DisplaySection.test.ts tests/app/browser/sections/FlexSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` exit 0 in the landing copy after `npm run build:src`.
10. On the landing copy: `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, `npm run test:conformance`, and `npm run build:src:styles && npm run test:service` exit 0, recorded with their exact commands and result lines.
11. The report carries each item of § Output.

**Observations, not criteria.** The journey and `CAPTURE=1` are the Orchestrator's at landing.

## Review evidence

`tmp/units/ud-shared-2.patch`; `git diff --no-index /dev/null <path>` per owned file, concatenated as `tmp/units/ud-2.diff`; `git -C /home/user/veneer-ud status --porcelain` as `tmp/units/ud-2-status.txt`; the report; the instrument directory.
