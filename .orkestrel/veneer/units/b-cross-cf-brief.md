# Unit FADE (`cf`) — the `transition` key (B-CROSS, X5)

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-cf` (branch `unit/cf` from the
session head `42fd88e`). The executor that opens this brief is that subagent.

## Objective

The `transition` key ships: the `.fade` rule and its `.fade:not(.show)` state in a
`src/styles/components/_fade.scss` partial, the transition written through the `transition` mixin, the
`Fade` region and its specimens, the `### Fade classes` guide section, and every guide sentence the
shipped rule makes false rewritten, per `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md`
ruling X5 and § Family record.

## Context

**Design.** The verdict above: X1 (the ledger follows the inventory's record), X5 (this unit), and
§ Family record (shared, owned, off-limits, and the files the result makes false). Where a proposal
beside the verdict disagrees with it, the verdict wins.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing,architecture,typescript}.md`;
the notes `w2-w3-note-1.md` and `w2-w3-note-2.md` beside this brief (nouns after code tokens, case
populations in setup tables, mutation logs, no scratchpad writes); skill: none. Proofs read computed
values (D45), and each named mutation's red run is retained.

**Terrain, measured at `a9dff19` (re-measure at `42fd88e` before editing).**

- The inventory (`tests/fixtures/oracle/inventory.json`, `components.transition`) records `.fade` with
  `transition: opacity 0.15s linear`, its `prefers-reduced-motion: reduce` twin with `transition: none`,
  `.fade:not(.show)` with `opacity: 0`, and the compound selectors `.modal.fade .modal-dialog` (with its
  reduced-motion twin), `.modal-backdrop.fade`, and `.offcanvas-backdrop.fade`. The MODAL and OFFCANVAS
  partials write the compound selectors; this unit writes `.fade` and `.fade:not(.show)` alone.
- The `transition` mixin in `src/styles/_mixins.scss` writes its value and `transition: none` under the
  reduced-motion condition. The `--vn-motion-feedback` token resolves to `150ms` times the motion
  factor, so X5 binds the value `opacity var(--vn-motion-feedback) linear` and the ledger records one
  `tokenized` row for the duration.
- The order case in `tests/conformance.test.ts` (the case that loads the passive block and the helpers
  in the release order) maps the release stem `transitions` to the single partial `collapse`. X5 widens
  the map's value to a list, `fade` then `collapse`, with this unit as its first consumer.
- The guide sentences that state no Veneer rule reads the `fade` class sit in § Toast classes, § Tooltip
  classes, § Popover classes, the Alert section, and the Elements decision paragraph; find every one by
  searching `guides/veneer.md` for the `fade` class, and name the search in the report.
- Every showcase specimen carrying the `fade` class at `a9dff19` also carries the `show` class (the
  modal and its backdrop in `app/browser/constants.ts`); `carousel-fade` is a distinct class. Re-run
  that search at `42fd88e` and stop if a specimen carries `fade` without `show`.

**Tree.** `/home/user/veneer-cf` at `42fd88e`: the session branch with the MODAL, TIP, TOAST, and OFFCANVAS
landings, so every compound fade selector ships. UTIL-SPACING, UTIL-TEXT, and BARE-BUTTON may land after
this checkout is cut; none touches the files this unit owns, and the shared patch merges three-way.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree has its own `node_modules`. Build the styles
(`npm run build:src`) before any proof that reads the built cascade. Write every instrument, extract,
and log under the worktree's `tmp/units/` or `tmp/probe/` with the `cf` prefix, and nothing into the
session scratchpad or the system temporary directory.

## Unknowns

- The key the ledger counts each compound fade selector under after the D22 ladder runs: read it from
  the conformance and ledger gates before editing and record the reading; X1 rules that the ledger
  follows the record as implemented.
- Whether the `Fade` region's hidden specimen needs the reserved-box wrapper R1 names or an existing
  frame convention covers it: read the TOAST and MODAL sections' frames and state which one the region
  reuses.

## Scope

**Owned.** `src/styles/components/_fade.scss`; `tests/src/styles/components/fade.test.ts`;
`app/browser/sections/FadeSection.ts`; `tests/app/browser/sections/FadeSection.test.ts`.

**Shared (report-only).** `src/styles/index.scss`; `tests/conformance.test.ts` (the `listed` literal,
the order case's stem map, and the `transition` entries); `tests/setup.ts` and `tests/setup.test.ts`
(`CASCADE_KEYS` if the region adds a key); `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (any
case table the proof adds); `app/browser/constants.ts` (`TRANSITION_COPY`, `TRANSITION_SPECIMENS`);
`app/browser/Showcase.ts`; `app/browser/index.ts`; `tests/app/browser/Showcase.test.ts`;
`tests/app/browser/index.test.ts`; `tests/app/browser/integration.test.ts`; `guides/veneer.md`
(`### Fade classes`, § Files, § Showcase, § Tests, the § Compatibility row, the `#### transition`
ledger rows, and every sentence the search in § Context finds). Return one `cf-shared.patch` against
`42fd88e` and edit nothing there.

**Off-limits.** Every other partial under `src/styles/**`, including `_mixins.scss`, `_tokens.scss`,
`_theme.scss`, `_modal.scss`, `_offcanvas.scss`, and `_collapse.scss`; `tests/setupServer.ts` and
`tests/setupServer.test.ts` (LEDGER's); `tests/fixtures/oracle/**`; `src/browser/**`; `src/core/**`;
`tests/src/browser/**`; `tests/src/core/**` (D43); `configs/**`; the manifests; the vendored
`tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`; `ROADMAP.md` (the
Orchestrator's fold).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped
runs only; a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-cf/tmp/units/cf-report.md` and the same text as the final message: the
emitted `.fade` rules; the coverage matrix (each recorded `transition` selector, the partial that writes
it, the proof case, and the mutation it distinguishes); the failing-first run of every added case
against the tree without the partial; each gate's command exactly as it ran with every argument, its
exit, and its result line; the mutation log `tmp/units/cf-mutations.log.txt` (site, command, exits,
summary, failing cases); the ledger rows as the gate printed them; the sentence search and each
rewritten sentence; `cf-shared.patch`, `cf.diff`, and `cf-status.txt` under `tmp/units/`. The report
states no tally of a growable set, no temporal word, and no list item by position, and follows every
code token with a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix needs an off-limits file,
when a shipped specimen carries `fade` without `show`, or when a gate refuses a row X1 or X5 rules.
Decide, record, and carry on for the case titles, the specimen labels, the section's paragraph order,
and where each added case sits in its file.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree with the shared patch applied
   in a scratch copy; `npm run check` exits 0 there.
2. `npm run build:src` exits 0, and the emitted cascade carries `.fade` with the bound transition, its
   reduced-motion twin with `transition: none`, and `.fade:not(.show)` with `opacity: 0`.
3. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
   tests/src/styles/components/fade.test.ts` exits 0, and each case reddens on its named mutation: the
   `:not(.show)` state dropped; the duration written as a literal; the reduced-motion twin dropped;
   the partial loaded after `collapse`.
4. `npm run test:conformance` and `npm run test:guides` exit 0 in the scratch copy, with `transition`
   in the `listed` literal and a shipped selector row.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser
   tests/app/browser/sections/FadeSection.test.ts tests/app/browser/Showcase.test.ts
   tests/app/browser/index.test.ts` exits 0 in the scratch copy.

**Observations, not criteria.** The whole suite, `npm run test:service`, the journey, and `CAPTURE=1`
are the Orchestrator's runs at landing.

## Review evidence

`cf.diff`, `cf-status.txt`, `cf-shared.patch`, `cf-report.md`, and `cf-mutations.log.txt`.
