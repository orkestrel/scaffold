# Unit FORMS-FRAMES (`fr`) — the forms family's unframed states and the range focus hairline

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-fr` (branch `unit/fr` from the
session head `e4a6d7c`). The executor that opens this brief is that subagent.

## Objective

Every developer-written form state the partials write has a frame that shows it, and the range thumb's focus
hairline paints what the release paints. The design is
`/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md`, rows P10 and P15, with the lens returns
`/home/user/scaffold/.orkestrel/veneer/units/pv-forms-lenses.json` (the critic's `unframed` list names each
state's selector and site).

## Context

**The work, implementation first.**
1. **P10, the range hairline.** `src/styles/components/_form-range.scss` paints the focused thumb's 1-pixel
   hairline with `var(--vn-surface-body-base)`, which is dark in dark mode. The release compiles
   `$form-range-thumb-focus-box-shadow` as `0 0 0 1px $body-bg, $input-focus-box-shadow` with the Sass
   `$body-bg`, white in both modes (`node_modules/bootstrap/scss/_variables.scss`). Paint the hairline with the
   white palette entry, prove the computed value in both modes in `tests/src/styles/components/form-range.test.ts`
   (or the range proof the tree has) with a mutation that restores the surface, and correct the ledger row that
   calls the change `tokenized` (shared patch).
2. **P15, the frames.** Give each developer-written state a specimen row or a driven scenario with its frames:
   switch focus; the pressed check and the pressed range thumb; the file button's hover; the small and large
   steps of the file, textarea, color, and plaintext controls; an empty focused floating textarea; a disabled
   floating input and select; a focused button inside an input group; a select and a floating label inside an
   input group; a validated select under focus and a validated check under focus; a validated textarea and a
   validated color control; inline-check feedback; and a control valid under `.was-validated`. Record
   `:-moz-focusring` and the autofill rules as outside Chromium's reach in the guide, not framed. Each focus or
   pointer state is an element frame of its lifted specimen inside a padded wrapper, the pattern the
   `nav-underline-focus` case uses, never a page frame; each pointer-held placement carries the structural guard
   `expect(mounted.host.querySelector('main')?.contains(<host>)).toBe(false)`; each resting state is a
   `CASCADE_KEYS` row over a specimen.

**Standing conditions.**
- FOCUS-FRAME runs beside this unit in `/home/user/veneer-ff` and converts the existing focus page frames,
  including the forms' own (`form-check-box-focus`, `form-control-text-focus`, `form-floating-empty-focus`,
  `form-select-base-focus`, `input-group-button-focus`, `range-focus`, `valid-control-focus`,
  `invalid-control-focus`); leave those placements to it. Keep each edit local; every overlap merges
  three-way at landing.
- THEME runs in `/home/user/veneer-ct` and owns `src/styles/_tokens.scss` and `src/styles/_theme.scss`.
- The engine session's Placement proof in `tests/src/browser/Placement.test.ts` fails on Veneer `main`; it is
  outside this unit.
- The container is loaded. A timing failure is an observation you report with its command.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`;
the notes `/home/user/scaffold/.orkestrel/veneer/units/w2-w3-note-1.md` and `w2-w3-note-2.md`; skill: none.
Every added case runs red first against the tree without its fix, and each named mutation's red run is retained.
A test is named for what it proves, never for a row identifier. Section proofs derive their populations from the
specimen tables.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree's `node_modules` is a hard-linked copy. Build the styles
(`npm run build:src`) before any browser proof. A capture run is
`CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:<variant>*"`
with a variant from `light-1280`, `dark-1280`, `light-390`, and `dark-390`; run one variant at a time. Write every instrument, extract, and log under the worktree's `tmp/units/` or `tmp/probe/` with the
`fr` prefix, and nothing into the session scratchpad or the system temporary directory.

## Unknowns

- Whether each state can be reached in Chromium from the showcase (the pressed states hold `:active` only while
  the pointer is down): drive the ones the installed `driveHold` function reaches, and record any that it does
  not, with the reading.

## Scope

**Owned.** The forms specimen tables in `app/browser/constants.ts` (`FORM_CHECK_SPECIMENS`,
`FORM_CONTROL_SPECIMENS`, `FORM_RANGE_SPECIMENS`, `FORM_SELECT_SPECIMENS`, `FORM_FLOATING_SPECIMENS`,
`INPUT_GROUP_SPECIMENS`, and `VALIDATION_SPECIMENS`, with their TSDoc); the forms registry rows in
`tests/setup.ts` and their TSDoc; the forms driven cases this unit adds to `tests/app/browser/integration.test.ts`;
the forms section proofs under `tests/app/browser/sections/`; `tests/setup.test.ts` and
`tests/app/browser/Showcase.test.ts` where a registry or specimen change makes a case false;
`src/styles/components/_form-range.scss` and its style proof.

**Shared (report-only).** `guides/veneer.md` (the range ledger row, § Tests, the forms class sections a
specimen changes, and the Chromium-reach sentence). Return one `fr-shared.patch` against `e4a6d7c` and edit
nothing there.

**Off-limits.** Every other partial under `src/styles/**`; every other specimen table; the focus placements
FOCUS-FRAME converts; `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`; `tests/fixtures/oracle/**`;
`src/browser/**`; `src/core/**`; `tests/src/browser/**`; `tests/src/core/**` (D43); `configs/**`; the manifests;
the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`; `ROADMAP.md`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only;
a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-fr/tmp/units/fr-report.md` and the same text as the final message: P10's readings
in both modes before and after; each P15 state with its specimen or scenario, its frames by path, and its proof;
each state recorded as unreachable with its reading; each gate's command exactly as it ran with every argument,
its exit, and its result line; the mutation log `tmp/units/fr-mutations.log.txt`; `fr-shared.patch`, `fr.diff`,
and `fr-status.txt` under `tmp/units/`. The report states no tally of a growable set and no temporal word, and
follows every code token with a noun.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a state needs an
off-limits file or a cascade change beyond P10. Decide, record, and carry on for specimen labels, scenario
stems, case titles, the order of added rows, and where each case sits.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run build:src` exits 0, and the range proof reads the white hairline in both modes and reddens on its
   mutation.
3. `npm run test:setup` exits 0 with the added registry rows, and the forms section proofs and
   `tests/app/browser/Showcase.test.ts` exit 0 under the `app:browser` project.
4. A `CAPTURE=1` run at `light-1280` and at `dark-390` writes every added frame and passes the journey.
5. `npm run test:guides` exits 0 in a scratch copy under `tmp/probe/` with `fr-shared.patch` applied.

**Observations, not criteria.** The other capture variants, the whole suite, and `npm run test:service` are the
Orchestrator's at landing.

## Review evidence

`fr.diff`, `fr-status.txt`, `fr-shared.patch`, `fr-report.md`, `fr-mutations.log.txt`, and the frames the
report names.
