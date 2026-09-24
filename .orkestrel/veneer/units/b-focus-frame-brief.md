# Unit FOCUS-FRAME (`ff`) — focus frames over lifted specimens, and the dark focus indicators

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-ff` (branch `unit/ff` from the
session head `e4a6d7c`, which carries PAGE-FRAME and BCF). The executor that opens this brief is that subagent.

## Objective

Every focus scenario is an element frame in which a reader finds the whole ring, and every focused control in
dark mode paints the indicator the release paints. The design is
`/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md`, rows P1, P2, and P3, and V1 of
`/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md`.

## Context

**The work, in this order.**
1. **P3 first, because it is a probe.** In the dark `vertical-group` frames the checked `Column center` label
   loses its fill, and in `check-group-focus--dark-1280.png` the `Row copy` button carries a hover face. Find
   each cause with a probe before any fix (a driven scenario that resets the `column-alignment` radio; a
   pointer an earlier scenario left over the button) and record the reading. Fix the cause in the case that
   produces it.
2. **P1, the focus frames.** Every focus scenario the journey places with the `page` method of the
   `FrameManager` class becomes an element frame of its lifted specimen inside a padded wrapper, the pattern
   the `dropdown-menu-focus` and `nav-underline-focus` cases use (the live specimen moved to the document's
   start and put back in `finally`), and each case reads its ring against the region the placement recorded,
   the way the `nav-underline-focus` case does, so a frame that crops the ring reddens it. Find every site
   with `grep -n "FRAMES.page(" tests/app/browser/integration.test.ts` and convert every focus placement;
   `showcase` stays a page frame. Where a focus scenario's region is a label or a row rather than the control,
   keep its declared region inside the element frame.
3. **P2, the dark indicators.** In dark mode the focused valid control, invalid control, skip link, and
   list-group action row show no indicator in the frames. For each, read the computed `box-shadow`,
   `outline`, and `border-color` in both modes in the browser, against the release's rule
   (`node_modules/bootstrap/scss/forms/_validation.scss` and `mixins/_forms.scss`, `_list-group.scss`, and
   the `.visually-hidden-focusable` helper with the browser's own focus outline), and record both readings.
   Where Veneer departs from the release, fix the rule and prove it in the style proofs with a mutation; where
   Veneer matches the release and the frame only lacked resolution, say so, and the element frame from item 2
   is the evidence.

**Standing conditions.**
- FORMS-FRAMES runs beside this unit in `/home/user/veneer-fr` and adds forms specimens, registry rows, and
  driven cases to the same shared files. Keep each edit local to the site it changes; every overlap merges
  three-way at landing. A focus scenario FORMS-FRAMES adds is its own.
- THEME runs in `/home/user/veneer-ct` and owns `src/styles/_tokens.scss` and `src/styles/_theme.scss`.
- The engine session's Placement proof in `tests/src/browser/Placement.test.ts` fails on Veneer `main`; it is
  outside this unit and never a reason to stop.
- The container is loaded. A timing failure is an observation you report with its command.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`;
the notes `/home/user/scaffold/.orkestrel/veneer/units/w2-w3-note-1.md` and `w2-w3-note-2.md`; skill: none.
Every added or changed proof runs red first, and each named mutation's red run is retained. A test is named for
what it proves, never for a row identifier. Every pointer-held placement carries the structural guard
`expect(mounted.host.querySelector('main')?.contains(<host>)).toBe(false)`.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree's `node_modules` is a hard-linked copy. Build the styles
(`npm run build:src`) before any browser proof. A capture run is
`CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:<variant>*"`
with a variant from `light-1280`, `dark-1280`, `light-390`, and `dark-390`; run one variant at a time. Write every instrument, extract, and log under the worktree's `tmp/units/` or `tmp/probe/` with
the `ff` prefix, and nothing into the session scratchpad or the system temporary directory.

## Unknowns

- P3's causes and P2's readings: probe and record each before its fix.
- Whether a converted frame's declared region sits inside the element frame for every scenario: report any that
  does not, with its reading.

## Scope

**Owned.** `tests/app/browser/integration.test.ts` (the focus placements, the P3 cases, and their comments);
`tests/setup.ts` (the registry rows and TSDoc a converted placement makes false); `tests/setup.test.ts` where a
registry change makes a case false; for P2's fixes, `src/styles/components/_validation.scss`,
`src/styles/components/_list-group.scss`, and `src/styles/utilities/_visually-hidden.scss`, with their
proofs under `tests/src/styles/`.

**Shared (report-only).** `guides/veneer.md` (§ Tests, the frame sentences a conversion makes false, and the
ledger rows a P2 fix changes). Return one `ff-shared.patch` against `e4a6d7c` and edit nothing there.

**Off-limits.** `src/styles/_tokens.scss`, `src/styles/_theme.scss`, and every partial not named above;
`app/**` (a specimen change stops the unit); `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`;
`tests/fixtures/oracle/**`; `src/browser/**`; `src/core/**`; `tests/src/browser/**`; `tests/src/core/**`
(D43); `configs/**`; the manifests; the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and
`tests/config.test.ts`; `ROADMAP.md`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs
only; a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-ff/tmp/units/ff-report.md` and the same text as the final message: P3's probe
readings and fixes; each converted scenario with its frame dimensions before and after and its ring reading; P2's
readings in both modes against the release's, and each fix; each gate's command exactly as it ran with every
argument, its exit, and its result line; the mutation log `tmp/units/ff-mutations.log.txt`; `ff-shared.patch`,
`ff.diff`, and `ff-status.txt` under `tmp/units/`. The report states no tally of a growable set and no temporal
word, and follows every code token with a noun.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a fix needs an
off-limits file, when a P3 probe names a cause outside the capture, or when a converted frame cannot hold its
declared region. Decide, record, and carry on for helper and case names, the padding depth, and where each case
sits in its file.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup` exits 0, and the style proofs a P2 fix adds exit 0 and redden on their mutations.
3. A `CAPTURE=1` run at `dark-1280` and at `light-390` passes the journey, and each converted focus frame
   shows its whole ring; the ring check reddens when one converted placement is put back on the unpadded
   specimen.
4. `npm run test:guides` exits 0 in a scratch copy under `tmp/probe/` with `ff-shared.patch` applied.

**Observations, not criteria.** The capture runs at `light-1280` and `dark-390`, the whole suite, and
`npm run test:service` are the Orchestrator's at landing.

## Review evidence

`ff.diff`, `ff-status.txt`, `ff-shared.patch`, `ff-report.md`, `ff-mutations.log.txt`, and the frames the
report names.
