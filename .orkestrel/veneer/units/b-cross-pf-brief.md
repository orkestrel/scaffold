# Unit PAGE-FRAME (`pf`) — bounded frame documents, region geometry, and the area guard

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-pf` (branch `unit/pf` from the
session head `dc92a09`). The executor that opens this brief is that subagent.

## Objective

Every frame the capture journey writes, at every registered variant, reads back through the installed
`readFrame` function and the `measureVariation` function with its declared region inside what the frame
shows; a frame's size does not grow when a showcase section is added elsewhere; and a frame the browser
could not decode is refused at placement, on every run, naming its scenario. The design is
`/home/user/scaffold/.orkestrel/veneer/units/pf-design-verdict.md`, rulings R1 to R6 and R8.

## Context

**Design.** The verdict above, and the two proposals beside it (`pf-design-planner-proposal.md`,
`pf-design-analyst-proposal.md`) for each ruling's reasoning. Where a proposal disagrees with the
verdict, the verdict wins. R7 (the verify verdict's row V1) and R9 (the Test-side carriers) are not
this unit's.

**The two failures, measured on the batch-2 capture run over `dc92a09`.**
- At `light-1280` and `dark-1280`, the case `portfolio > reads every frame this variant left in the
  portfolio directory inside its declared region` throws `Capture frame at
  tmp/capture/states/showcase--light-1280.png is not an image this browser decodes`. Every page frame
  there is 1280 × 53410 or 1280 × 53442 pixels, 260.8 MiB decoded. The batch-1 frame
  `showcase--dark-1280.png` at 1280 × 41954, 204.9 MiB decoded, read back.
- At `light-390` and `dark-390`, the same case fails with `Blank frame region:
  tmp/capture/states/bottom-offcanvas--light-390.png: expected 0 to be greater than 0`. The run's
  artifact `tmp/capture/light-390.txt` records the region `{"x":0,"y":130.8125,"width":390,"height":253.1875}`
  in a 390 × 392 frame; the frame shows the bottom panel from the frame's top edge, 392 pixels tall.

**The mechanism.** The `FrameManager` class in `tests/setupBrowser.ts` (its `place` and `page` methods
and its private shooting method) stages the pane at `window.innerWidth` × `window.innerHeight`, reads
the region, and calls the portfolio's `place` method. The installed `captureFrame` function
(`node_modules/@orkestrel/test/dist/src/browser/index.js`, search `async function captureFrame`)
restages the pane to the document's content height from the installed `measureContent` function, which
the package also exports with `stagePane` and `releasePane`. The showcase mounts a `header` (the heading
and the Dark mode control) and a `main` whose children are the Showcase region and one section per
family (`app/browser/Showcase.ts`, the private mounting method). The reset layer writes
`[hidden] { display: none !important; }` (`src/styles/_reset.scss`), and no showcase code sets `hidden`.

**Sites.** Every call of the `page` method: `grep -n "FRAMES.page(" tests/app/browser/integration.test.ts`.
The page-strip case is `repaints and lifts a page under the pointer and under keyboard focus, in both
modes` (R5). Every pointer-held placement: search the file for `hoverAccessible`, `.hover()`, and
`driveHold`, and read which placement follows each (R6). The sentences each ruling makes false are
listed in the planner's proposal § 2 and the analyst's § 2; re-find each by its text.

**Standing conditions.**
- BCF runs beside this unit in `/home/user/veneer-bcf` and edits `tests/app/browser/integration.test.ts`
  (the pointer staging before the resting frames and added driven scenarios), `tests/setup.ts` (registry
  rows), and `app/browser/constants.ts`. FADE and LEDGER run from `42fd88e`. Every overlap merges
  three-way at landing, so keep each edit local to the site it changes and reformat nothing else.
- The container is loaded. A timing failure is an observation you report with its command; the
  Orchestrator re-runs it alone after you exit.
- A capture run is `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache
  --reporter=dot --project "journey:<variant>*"` with a variant from `light-1280`, `dark-1280`,
  `light-390`, and `dark-390`. Run one variant at a time.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,patterns,documentation,writing}.md`;
the notes `/home/user/scaffold/.orkestrel/veneer/units/w2-w3-note-1.md` and `w2-w3-note-2.md`; skill:
none. Setup code throws and never asserts (`.claude/rules/tests.md`). Prefer the real portfolio, with
capture off, to observe a placement; use a recorder that implements the portfolio's interface only where
the real portfolio cannot observe the state a proof needs, and say which rule admits it. Every added
case runs red first, and each named mutation's red run is retained. A test is named for what it proves,
never for a ruling's identifier.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree's `node_modules` is a hard-linked copy. Build
the styles (`npm run build:src`) before any browser proof. Write every instrument, extract, and log under
the worktree's `tmp/units/` or `tmp/probe/` with the `pf` prefix, and nothing into the session scratchpad
or the system temporary directory.

## Unknowns

- Each `main` child's height at 390 and 1280, the tallest section a page-frame subject sits in, and
  which sections make the 1280 document taller than the 390 one. Measure before editing and record the
  reading; a subject whose bounded frame still exceeds `FRAME_AREA` stops the unit.
- Whether an engine behavior the showcase mounts reacts to a section taking `hidden` (an observer or a
  scroll handler). Search `app/browser/**` for observers and record what you find.

## Scope

**Owned.** `tests/setupBrowser.ts` (the `FrameManager` class, its bounding, geometry, and refusal, and
their TSDoc); `tests/setupBrowser.test.ts`; `tests/setup.ts` (`FRAME_AREA`, the `SHOWCASE_KEYS` TSDoc,
and the `CascadeKey` and `CASCADE_KEYS` remarks R1 makes false); `tests/setup.test.ts` (the export-list
case and any case the constant makes false); `tests/app/browser/integration.test.ts` (the page-strip
placements, each pointer placement R6 moves, and each comment stating a whole-document or 8000-pixel
frame).

**Shared (report-only).** `guides/veneer.md` (the `showcase` stem row, a paragraph on what a frame's
document holds, the stale "first pixel" sentence of R8, and each sentence the rulings make false; name
the searches). Return one `pf-shared.patch` against `dc92a09` and edit nothing there.

**Off-limits.** `src/**`; `app/**`; the specimen tables; every registry row's `scenario` and `subject`
value; `tests/fixtures/**`; `tests/src/**`; `configs/**`; the manifests; `node_modules/**`; the vendored
`tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`; `ROADMAP.md` (the
Orchestrator's fold).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped
runs only; a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-pf/tmp/units/pf-report.md` and the same text as the final message: the
section heights you measured; the contract as written (the constant, the refusals, and the order of
operations inside the placement); the coverage matrix (each proof, the mutation it distinguishes, and
its red run); each pointer placement and its `:hover` reading; each rewritten sentence, before and
after; each gate's command exactly as it ran with every argument, its exit, and its result line; the
capture runs with each variant's frame dimensions for `showcase`, `bottom-offcanvas`, and the tallest
page frame, and the portfolio case's result; the mutation log `tmp/units/pf-mutations.log.txt`;
`pf-shared.patch`, `pf.diff`, and `pf-status.txt` under `tmp/units/`. The report states no tally of a
growable set, no temporal word, and no list item by position, and follows every code token with a noun.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a fix needs
an off-limits file, when a bounded frame still exceeds `FRAME_AREA`, when a region and its shot still
disagree after R2, or when a pointer state does not survive its shot after R6. Decide, record, and carry
on for helper and case names, the refusal messages' wording, where each added case sits in its file,
and the guide paragraph's position.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files and `npm run lint:check` exit 0; `npm run check` exits 0.
2. `npm run test:setup` exits 0, with `FRAME_AREA` in the export list.
3. `npm run test:setup:browser` exits 0, and each of these proofs ran red first and reddens on its
   mutation:
   - a page frame's document holds the header and the one `main` child holding the subject
     (mutations: no bounding; the subject's own child hidden; the region read before bounding);
   - an element frame of a lifted specimen holds no `main` child, and a specimen sized in `vh` has its
     region read at the height the shot is taken at (mutations: element frames left unbounded; the
     region read at the viewport pane under a taller document);
   - the area guard refuses one device-pixel row over `FRAME_AREA` and places at `FRAME_AREA`
     (mutations: the comparison off by one; the refusal dropped);
   - restoration leaves every `main` child's `hidden` state as it found it, after a placement and after
     a refused one, including a child that carried `hidden` before (mutations: restoration outside
     `finally`; a restoration that clears every `hidden`).
4. `npm run test:guides` exits 0 in a scratch copy under `tmp/probe/` with `pf-shared.patch` applied.
5. A `CAPTURE=1` run at `light-390` writes `bottom-offcanvas--light-390.png` with the panel at the
   variant viewport's `30vh`, and the portfolio case passes at that variant.

**Observations, not criteria.** The capture runs at `dark-390`, `light-1280`, and `dark-1280` (report
each with its frame dimensions and the portfolio case's result); the whole suite and
`npm run test:service` are the Orchestrator's runs after the unit exits.

## Review evidence

`pf.diff`, `pf-status.txt`, `pf-shared.patch`, `pf-report.md`, `pf-mutations.log.txt`, and the frames the
report names. The capture frames are the review input for every claim about a rendered surface.
