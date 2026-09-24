# Unit CLOSE-OUT (`xo`) — the landed families' carried implementation and record repairs

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-xo` (branch `unit/xo` from the
session head `ec98064`, which carries every landed B-family unit and PAGE-FRAME). The executor that opens
this brief is that subagent.

## Objective

Every `ROADMAP.md` § Carriers row whose carrier names CLOSE-OUT closes, and the overlay family's
CLOSE-OUT row closes with them: the empty close-combinator deferral and its `Overlays` owner are retired,
the heading size mapping is written once, the carousel proof and the two inline case pairs derive from
frozen tables, the obligation ledger holds each row once under an assertion, and the utility regions follow
one order rule. The implementation is the priority: every item that changes code or a proof lands with its
red run before any prose item.

## Context

**The work, implementation first, in this order.**
1. **The close deferral (the B-MODAL design verdict's CLOSE-OUT row,
   `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`).** `CLOSE_DEFERRED` in
   `tests/setupStyles.ts` is an empty frozen list since the overlay units shipped every header combinator.
   Remove the constant, its row in the export-list case of `tests/setupStyles.test.ts`, and the three
   assertions that read it in the case around the text "The close key is the one of the three" (the union
   against the record, the disjointness, and the `Overlays` owner filter over the `readDeferrals` function).
   The case then compares `CLOSE_SELECTORS` against the recorded `btn-close` selectors directly, and asserts
   that no deferral row names the `Overlays` owner. Retire every guide sentence or row that names the
   deferral or that owner (report-only, in the shared patch).
2. **The heading size mapping (the UTIL-FONT round-1 audit).** `src/styles/elements/_heading.scss`,
   `src/styles/components/_type.scss`, and `src/styles/utilities/_font.scss` each write
   `var(--vn-size-#{9 - $level})`. Write one `@function` in `src/styles/_mixins.scss` per
   `.claude/rules/styles.md` (a lowercase kebab-case name) that returns the size token for a heading level,
   and make the three sites call it. Prove the built stylesheets byte-equal before and after
   (`npm run build:src`, then compare `dist/` with the base build), and add the function's case to the
   mixins proof with a mutation that reddens it.
3. **The carousel proof's names (the TOAST round-1 audit).** `tests/app/browser/sections/CarouselSection.test.ts`
   iterates an inline list of specimen names; derive the population from `CAROUSEL_SPECIMENS` the way the
   toast section proof does, and retain the red run of a specimen added to the table alone.
4. **The inline case pairs (the NAVBAR round-2 audit).** The `[selector, expected]` pairs in
   `tests/src/styles/components/nav.test.ts` and `tests/src/styles/components/input-group.test.ts` (the
   carrier row names them; locate each by its case) move to documented, frozen tables in
   `tests/setupStyles.ts` under `.claude/rules/tests.md`, each bound in the freeze case; a table left
   unfrozen reddens the freeze case.
5. **The obligation ledger (the UTIL-PLACEMENT landing).** `guides/veneer.md`'s `| Component | Kind |
   Obligation |` table carries the `btn | accessibility | A toggle announces the button role …` row
   twice. The shared patch deletes the second copy. The `readCompatibility` function in
   `tests/setupServer.ts` reads that table (THEME's file; read it, never edit it). Add the assertion that
   every row it returns is unique to the guide proof `tests/guides.test.ts`, inside the package assertions
   its `GuideCommand` callback registers (`.claude/rules/documentation.md` § Parity); it reddens on the guide
   at `ec98064`.
6. **The utility region order (the first wave-2/3 landing batch).** State one order rule for the utility
   regions, their `### … utilities` guide sections, and their § Tests links, and apply it: the family
   record's showcase ruling asks for barrel order (`src/styles/index.scss`). Move the regions in
   `app/browser/Showcase.ts` or `app/browser/index.ts` to that order, and update the showcase and index
   proofs the move makes false; the guide sections and links move in the shared patch.
7. **Prose.** The `#### ` departure tables after `table` and before `placeholder` follow the sorted run
   § Departures states, or the section names the exception; every field token in the older TSDoc blocks of
   `tests/setupStyles.ts` (the `INPUT_GROUP_SIZE_CASES` and `INPUT_GROUP_FLOATING_CASES` blocks among them)
   takes its noun; every code token in the `### Alert classes` and `### Carousel classes` sections takes its
   noun; the `TYPE_SPECIMENS` remark in `app/browser/constants.ts` names the 390 and 1280 journey widths the
   `line-heights` frames prove, not every width.

**Terrain, at `ec98064` (re-measure before editing).** Each item's site is named above by symbol or text;
line numbers in the carrier rows are approximate. The `@function breakpoints` and `@function breakpoint`
declarations in `src/styles/_mixins.scss` are the pattern for the added function.

**Standing conditions.**
- BCF runs in `/home/user/veneer-bcf` (the disclosure section proofs, `tests/setupBrowser.ts`,
  `tests/setup.ts` rows, `tests/app/browser/integration.test.ts`, and four disclosure tables in
  `app/browser/constants.ts`); THEME runs in `/home/user/veneer-ct` (`src/styles/_tokens.scss`,
  `src/styles/_theme.scss`, `tests/setupServer.ts`, and the `Color modes` section). Both may return
  report-only patches to files this unit owns; every overlap merges three-way at landing, so keep each edit
  local to its site and reformat nothing else.
- The engine session's Placement proof in `tests/src/browser/Placement.test.ts` fails on Veneer `main` and on
  the session head; it is outside this unit and never a reason to stop.
- The container is loaded. A timing failure is an observation you report with its command.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`;
the notes `/home/user/scaffold/.orkestrel/veneer/units/w2-w3-note-1.md` and `w2-w3-note-2.md`; skill: none.
Every added or changed proof runs red first against the tree without its fix, and each named mutation's red
run is retained. A test is named for what it proves, never for a carrier row.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree's `node_modules` is a hard-linked copy. Build the
styles (`npm run build:src`) before any proof that reads the built cascade. Write every instrument, extract,
and log under the worktree's `tmp/units/` or `tmp/probe/` with the `xo` prefix, and nothing into the session
scratchpad or the system temporary directory.

## Unknowns

- Whether the guide proof's `GuideCommand` callback reaches the `readCompatibility` function without a
  circular import: report how the assertion reads the rows.
- Whether moving the utility regions changes a capture scenario's page frame: the regions' order changes
  which section follows which, and PAGE-FRAME bounds each page frame to its own section, so report any
  frame the move changes as an observation.

## Scope

**Owned.** `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (items 1, 4, and 7's TSDoc);
`src/styles/_mixins.scss`, `src/styles/elements/_heading.scss`, `src/styles/components/_type.scss`,
`src/styles/utilities/_font.scss`, and the mixins proof under `tests/src/styles/` (item 2);
`tests/app/browser/sections/CarouselSection.test.ts` (item 3); `tests/src/styles/components/nav.test.ts` and
`tests/src/styles/components/input-group.test.ts` (item 4); `tests/guides.test.ts` (item 5); `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/app/browser/Showcase.test.ts`, and
`tests/app/browser/index.test.ts` (item 6); the `TYPE_SPECIMENS` TSDoc in `app/browser/constants.ts` and
nothing else in that file (item 7).

**Shared (report-only).** `guides/veneer.md` (items 1, 5, 6, and 7). Return one `xo-shared.patch` against
`ec98064` and edit nothing there.

**Off-limits.** `src/styles/_tokens.scss` and `src/styles/_theme.scss` (THEME's); `tests/setupBrowser.ts`,
`tests/setupBrowser.test.ts`, `tests/setup.ts`, `tests/app/browser/integration.test.ts`, and the
disclosure section proofs (BCF's); every other table in `app/browser/constants.ts`; `tests/setupServer.ts`
unless it is item 5's reader, in which case stop and report; `tests/fixtures/oracle/**`; `src/browser/**`;
`src/core/**`; `tests/src/browser/**`; `tests/src/core/**` (D43); `configs/**`; the manifests; the vendored
`tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`; `ROADMAP.md`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs
only; a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-xo/tmp/units/xo-report.md` and the same text as the final message: for each
item, what changed, the proof that shows it, and its red run; the byte-equality reading for item 2; the
order rule for item 6 and each moved region; each gate's command exactly as it ran with every argument, its
exit, and its result line; the mutation log `tmp/units/xo-mutations.log.txt`; `xo-shared.patch`, `xo.diff`,
and `xo-status.txt` under `tmp/units/`. The report states no tally of a growable set and no temporal word,
and follows every code token with a noun, list labels included.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when an item needs
an off-limits file, or when item 2's build is not byte-equal. Decide, record,
and carry on for the function's name, each table's name, the order rule's wording, and where each added
case sits in its file.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run build:src` exits 0 and the built stylesheets are byte-equal to the base build; the function's
   case reddens on its mutation.
3. `npm run test:setup` exits 0 without `CLOSE_DEFERRED` in the export list, and the freeze case reddens on
   each moved table left unfrozen.
4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser
   tests/app/browser/sections/CarouselSection.test.ts tests/app/browser/Showcase.test.ts
   tests/app/browser/index.test.ts` exits 0, and the carousel derivation reddens on an added row.
5. The style proofs for `nav`, `input-group`, and the mixins exit 0 (`npm run test:src:styles` scoped to
   those files).
6. `npm run test:guides` exits 0 in a scratch copy under `tmp/probe/` with `xo-shared.patch` applied, and the
   ledger's uniqueness assertion reddens on the guide at `ec98064`.

**Observations, not criteria.** The whole suite, `npm run test:service`, and the capture runs are the
Orchestrator's at landing.

## Review evidence

`xo.diff`, `xo-status.txt`, `xo-shared.patch`, `xo-report.md`, and `xo-mutations.log.txt`.
