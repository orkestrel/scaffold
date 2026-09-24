# Unit OVERLAY-FRAMES (`fo`) — the carousel picture, the carousel proof, and the overlay family's unframed states

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-fo` (branch `unit/fo` from the
session head `cf5e447`). The executor that opens this brief is that subagent.

## Objective

The carousel specimens fill their carousel at every width, the carousel proof holds when a specimen is added, and every developer-written overlay state has a frame that shows it. The design is `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md`, rows
P11, P12, and P16, with the lens returns `/home/user/scaffold/.orkestrel/veneer/units/pv-overlays-lenses.json` (the critic's
`unframed` list names each state's selector and site).

## Context

**The work, implementation first.**
1. **P11, the carousel picture.** At 1280 the carousel pictures are 800 pixels wide inside a 1280-pixel
   carousel, so the controls, the caption, and the indicators sit over the page surface. The release's markup gives
   each picture `d-block w-100`; give the specimens' pictures the width the release's markup gives them, and prove
   in the carousel section proof that each picture spans its item. Read the resting frames' previous chevron in
   the recapture: BCF's released pointer and padded lift cover the resting frames, so report whether the hover
   residue remains, with the reading.
2. **P12, the advancing case.** The carousel section proof's advancing case fails whenever any specimen is added:
   the incoming picture reads `undefined` after `scrollIntoView` (CLOSE-OUT's observation in
   `b-close-out-report.md`). Find the cause with a probe and fix the case, and retain the red run of an added
   specimen before and after.
3. **P16, the frames.** The next carousel control's hover and focus (the driven case selects only the previous
   control); a roleless `.alert`; and the popover header strip at a size a reader can see (an element frame over
   the header). The engine-written transition states stay unframed under V7 of `b-collapse-verify-verdict.md`.

Each focus or pointer state is an element frame of its lifted specimen inside a padded wrapper, the pattern the
`nav-underline-focus` case uses, never a page frame; each pointer-held placement carries the structural guard
`expect(mounted.host.querySelector('main')?.contains(<host>)).toBe(false)`; each resting state is a
`CASCADE_KEYS` row over a specimen.

**Standing conditions.**
- Other frames units run beside this one in their own worktrees and add rows and cases to the same shared files.
  Keep each edit local to the site it changes and inside this family's run of each file; every overlap merges
  three-way at landing.
- THEME owns `src/styles/_tokens.scss` and `src/styles/_theme.scss`.
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
`fo` prefix, and nothing into the session scratchpad or the system temporary directory.

## Unknowns

- Whether each state can be reached in Chromium from the showcase: drive the ones the installed functions reach,
  and record any that they do not, with the reading.

## Scope

**Owned.** The overlay specimen tables in `app/browser/constants.ts` (`CAROUSEL_SPECIMENS`, `ALERT_SPECIMENS`, `POPOVER_SPECIMENS`, with their TSDoc); the overlay registry rows in `tests/setup.ts` and their TSDoc; the overlay driven cases in `tests/app/browser/integration.test.ts`; `tests/app/browser/sections/CarouselSection.test.ts`, `AlertSection.test.ts`, and `PopoverSection.test.ts`; `tests/setup.test.ts` and `tests/app/browser/Showcase.test.ts` where a registry or specimen change makes a case false.

**Shared (report-only).** `guides/veneer.md` (§ Carousel classes, § Alert classes, § Popover classes, and § Tests). Return one `fo-shared.patch` against `cf5e447` and
edit nothing there.

**Off-limits.** every partial under `src/styles/**`; every other specimen table; `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`;
`tests/fixtures/oracle/**`; `src/browser/**`; `src/core/**`; `tests/src/browser/**`; `tests/src/core/**` (D43);
`configs/**`; the manifests; the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`;
`ROADMAP.md`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only;
a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-fo/tmp/units/fo-report.md` and the same text as the final message: each row's
change, its specimen or scenario, its frames by path, and its proof with its red run; each state recorded as
unreachable with its reading; each gate's command exactly as it ran with every argument, its exit, and its result
line; the mutation log `tmp/units/fo-mutations.log.txt`; `fo-shared.patch`, `fo.diff`, and `fo-status.txt`
under `tmp/units/`. The report states no tally of a growable set and no temporal word, and follows every code
token with a noun.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a row needs an
off-limits file or a cascade change the brief does not name. Decide, record, and carry on for specimen labels,
scenario stems, case titles, the order of added rows, and where each case sits.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. Each added proof reddens on its mutation.
3. `npm run test:setup` exits 0 with the added registry rows, and the overlay section proofs and `tests/app/browser/Showcase.test.ts` exit 0 under the `app:browser` project, with the advancing case green under an added specimen.
4. A `CAPTURE=1` run at `light-1280` and at `dark-390` writes every added frame and passes the journey.
5. `npm run test:guides` exits 0 in a scratch copy under `tmp/probe/` with `fo-shared.patch` applied.

**Observations, not criteria.** The other capture variants, the whole suite, and `npm run test:service` are the
Orchestrator's at landing.

## Review evidence

`fo.diff`, `fo-status.txt`, `fo-shared.patch`, `fo-report.md`, `fo-mutations.log.txt`, and the frames
the report names.
