# Unit THEME (`ct`), brief 3 — round 2: the test-data placement, the registry plant, the breakpoint alias, and the report

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-ct2` (branch `unit/ct2` from the
session head `ac74459`, which carries THEME round 1 as `595ac02` merged with Veneer `main`'s `afae42c`). The
executor that opens this brief is that subagent.

## What changed and why

THEME round 1 landed on the session branch as `595ac02`. Its audit (`/home/user/scaffold/.orkestrel/veneer/units/ct-audit-verdict.md`)
confirmed every code claim and carried these findings to this round; the `_tokens.scss` and `_mixins.scss`
findings F1 and F2 went to the LABEL unit, which owns those files, and are not this round's.

- **TEST-DATA** (the objective lane; the subjective lane's R2): the `controls` population in
  `tests/app/browser/sections/ColorModeSection.test.ts`, the dark-site population in `tests/conformance.test.ts`,
  the `retuned` population in `tests/src/styles/theme.test.ts`, and the `tiers` population in
  `tests/src/styles/components/alert.test.ts` sit in test files. `.claude/rules/tests.md` puts data tables and
  case matrices in a setup file. Move each into a frozen, exported setup constant with TSDoc, or derive it from
  the population that already owns it (the `THEME_GRAY_TIERS` constant, the `COLOR_MODE_SPECIMENS` markup, the
  inventory); keep DOM nodes and assertions in the test. In the `alert.test.ts` case, filter out the pairs the
  release writes alike first and assert on the rest, instead of three reads inside a nested ternary.
- **R1** (the subjective lane): the X3 plant in `tests/setupServer.test.ts` reaches the matched-site loop of the
  registry rule in `collectAdditions` (`tests/setupServer.ts`) only. A mutation that deletes the
  unmatched-selector branch's registry check leaves every case green. Add the plant that reddens on that
  mutation, run it red against the mutation, and retain the run.
- **R4 / X8** (the subjective lane; `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` X8 and
  § Exit criterion): the breakpoint tokens close under exit item 6. Prove in the styles project that a
  `--vn-breakpoint-md` override moves `--bs-breakpoint-md` (the alias `_tokens.scss` writes) while a
  `breakpoint-up(md)` declaration does not move, because the breakpoints are fixed at compile time; the control
  is that declaration. State the limit in the guide's breakpoint token paragraph (shared patch).
- **Claims 7 and 8** (the objective lane): the round-2 report names S4 as the export proof that the index proof
  catches, and S1 to S3 as the section mutations; it states which added case ran red against the unfixed tree
  and which is bound by a named mutation instead (the nested-island case by M5), and it states no diffstat
  tally and no temporal word.

## Objective

Every THEME test population lives in a setup file or is derived, the registry rule's unmatched-selector branch
has a plant that reddens, the breakpoint alias case proves X8, and the report is true.

## Context

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{tests,styles,browser,names,typescript,architecture,documentation,writing,quality}.md`;
the notes `/home/user/scaffold/.orkestrel/veneer/units/w2-w3-note-1.md` and `w2-w3-note-2.md`; skill: none.
Every added case runs red first against the tree without its fix, or names the mutation that reddens it; each
mutation's red run is retained. A test is named for what it proves, never for a finding identifier.

**Standing conditions.**
- LABEL runs beside this unit in `/home/user/veneer-lc` and owns `src/styles/_tokens.scss`,
  `src/styles/_mixins.scss`, `src/styles/_theme.scss`, the button, color-bg, link, and tooltip partials, and
  their proofs; `tests/setupStyles.ts` is report-only for both units. If LABEL's change would make one of this
  unit's files false, the Orchestrator integrates it.
- The frames units own the specimen tables, `tests/setup.ts` and `tests/setup.test.ts`, and the driven cases;
  a constant this unit adds to `tests/setup.ts` goes in the shared patch.
- The engine session's Placement proof in `tests/src/browser/Placement.test.ts` fails on Veneer `main`; it is
  outside this unit.
- The container is loaded. A timing failure is an observation you report with its command.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree's `node_modules` is a hard-linked copy. Build the styles
(`npm run build:src`) before any proof that reads the built cascade. Write every instrument, extract, and log
under the worktree's `tmp/units/` or `tmp/probe/` with the `ct2` prefix, and nothing into the session
scratchpad or the system temporary directory.

## Unknowns

- Which setup file each population belongs in: the styles populations go to `tests/setupStyles.ts`, the
  conformance population to `tests/setupServer.ts`, and the section population to `tests/setup.ts`, unless a
  derivation from an existing population replaces the table; record the choice per population.

## Scope

**Owned.** `tests/src/styles/theme.test.ts`, `tests/src/styles/tokens.test.ts`,
`tests/src/styles/components/alert.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, and
`tests/app/browser/sections/ColorModeSection.test.ts`.

**Shared (report-only).** `tests/setupStyles.ts` and `tests/setupStyles.test.ts`; `tests/setup.ts` and
`tests/setup.test.ts`; `tests/conformance.test.ts`; `guides/veneer.md` (the breakpoint token paragraph and any
sentence a moved constant makes false). Return one `ct2-shared.patch` against `ac74459` and edit nothing there.

**Off-limits.** Every file under `src/**` and `app/**`; the files LABEL owns; `tests/setupBrowser.ts` and
`tests/setupBrowser.test.ts`; `tests/app/browser/integration.test.ts`; `tests/fixtures/oracle/**`;
`tests/src/browser/**`; `tests/src/core/**` (D43); `configs/**`; the manifests; the vendored
`tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`; `ROADMAP.md`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs
only; a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-ct2/tmp/units/ct2-report.md` and the same text as the final message: each moved
or derived population with its home; the R1 plant with its mutation and red run; the X8 proof with its control
and red run; the corrected accounts of S1 to S4 and of which cases ran red first; each gate's command exactly as
it ran with every argument, its exit, and its result line; the mutation log `tmp/units/ct2-mutations.log.txt`;
`ct2-shared.patch`, `ct2.diff`, and `ct2-status.txt` under `tmp/units/`. The report states no tally of a
growable set and no temporal word, and follows every code token with a noun.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a fix needs an
off-limits file, or when X8's proof shows a `breakpoint-up(md)` declaration moving. Decide, record, and carry on
for constant names, which setup file holds a population, case names, and where each added case sits.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0 (the check with
   `ct2-shared.patch` applied in a scratch copy under `tmp/probe/`).
2. `npm run test:setup` exits 0 with the R1 plant, which reddens on its mutation.
3. `npm run build:src` exits 0, and the theme, tokens, and alert proofs exit 0 under the styles project, the X8
   case reddening when its override stops reaching the alias.
4. `npm run test:conformance`, `npm run test:guides`, and the ColorModeSection proof exit 0 in the scratch copy.

**Observations, not criteria.** The whole suite and the capture runs are the Orchestrator's at landing.

## Review evidence

`ct2.diff`, `ct2-status.txt`, `ct2-shared.patch`, `ct2-report.md`, and `ct2-mutations.log.txt`.
