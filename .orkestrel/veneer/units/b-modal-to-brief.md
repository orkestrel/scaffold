# Unit TOAST (`to`) — the `toast` key ships with its header combinator

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent in the worktree `/home/user/veneer-to` (branch
`unit/to` from `2a3f223`, Veneer `main`). The executor that opens this brief is that subagent.

## Objective

The `toast` key ships in `src/styles/components/_toast.scss` exactly as the pinned inventory records
it: the `.toast-header .btn-close` combinator written in the partial and its `CLOSE_DEFERRED` entry
moved to `CLOSE_SELECTORS`; `--bs-toast-zindex` bound to its stack rung on `.toast` and
`.toast-container`; a `Toast` region rendering every developer-written state at rest inside the
`.viewport` frame; the mirrored browser proofs, the ledger rows, and the guide section; every
shared-file change returned as an exact patch.

## Context

**Evidence.** The wave-2 terrain `/home/user/scaffold/.orkestrel/veneer/units/b-modal-w2-terrain-report.md`
(measured at `2a3f223`: § 1 TOAST for what the tree carries, § 2 for the ALERT and CAROUSEL pattern to
copy, § 3 for the frame and the stand-ins, § 4 for the collision map, § 5 TOAST for the files the
result makes false, and its contradictions list) and the family's first terrain
`/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md` (§ A the oracle surface for
`toast`, § B the Toast plugin obligations; its § D and § G are superseded by the wave-2 terrain). The
wave-2 terrain is the one home for every line number and count this brief does not state; take each
yourself before you edit. Where a terrain and the tree disagree, the tree wins and the report records
the disagreement.

**Law.** `AGENTS.md` in the worktree, which names its authorities;
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing,architecture,typescript}.md`
(the Veneer checkout carries no `.claude/rules/` directory, so read the rule files from the scaffold
checkout); skill: none (the `enterprise-bootstrap` skill is reference craft, not process); the guide
`guides/veneer.md`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`,
whose rulings M1 to M20 and § Family record bind this unit. The rulings this unit carries: M2 (states
at rest; `toast.showing` is engine-written and proved by a declared-and-resolved reading with no
frame, the reason recorded; a toast without `show` is hidden by the release's own rule, so every
specimen carries `show`), M3 (no inline style; the `.toast-container` is absolutely positioned, so a
container specimen renders inside the `.viewport` frame, placed with shipped `position-*`, `top-*`,
`start-*`, `end-*`, `bottom-*`, and `translate-middle-*` utilities, and the section says so in one
sentence), M6, M7, M13, M14 (`Shown toast` is the default state's name), M15, M17, M18, M19.

**Rulings fixed for this wave.**
- M7 binding for this unit: `--bs-toast-zindex: var(--vn-stack-toast)` on `.toast` and on
  `.toast-container`, each a `tokenized` departure. The stacking table's `-popover`, `-hint`, `-toast`
  row is shared with TIP: your patch writes `--bs-toast-zindex` into that row's Alias cell and TIP's
  writes `--bs-popover-zindex`, `--bs-tooltip-zindex`; integration joins them in rung order. MODAL
  rewrites the paragraph under the stacking table; leave it as the base has it.
- M1 ruling 5: a literal black or white reads `var(--vn-palette-black-base)` or
  `var(--vn-palette-white-base)`; every duration stays literal.
- M19: the order case's stem map in `tests/conformance.test.ts` gains `toasts: 'toast'`, because the
  release's import name is `toasts` and the partial's is `toast`.
- Barrel order (M19), final for the family: `close`, `toast`, `modal`, `tooltip`, `popover`,
  `carousel`, `spinner`, `offcanvas`, `placeholder`. Your patch inserts `components/toast` after
  `components/close`; integration orders the siblings.
- Showcase order (M14), final for the family: `AccordionSection`, then `ToastSection`, `ModalSection`,
  `TooltipSection`, `PopoverSection`, `OffcanvasSection`, then `DisplaySection`. Your patch inserts
  `ToastSection` after `AccordionSection`; the `app/browser/index.ts` row and the `Showcase.test.ts`
  label follow the same position.
- The Toast `plugin` row copies the landed Alert row's shape in § Compatibility, states the Toast
  obligations from the first terrain's § B, and ends "Owner: J-ENGINE." The `## Surface` interface rows
  are the engine session's; never edit them.

**Installed primitives.** `@orkestrel/test` 0.0.21
(`node_modules/@orkestrel/test/dist/src/core/index.d.cts` and `dist/src/browser/index.d.cts`:
`readStyle`, `readPixels`, `readHit`, `matchesColor`, `stageMedia`, `visitBreakpoint`,
`waitForAnimations`, `readClipEdge`, `clipsOverflow`, `readClipMargin`, the recorders) and
`@orkestrel/contract` (guards); the tree's own readers in `tests/setupStyles.ts` and
`tests/setupBrowser.ts`. A helper, wait, or reader whose job an installed export does is a defect; the
audit's checker probes the diff for export names.

**Host.** Linux, `bash`, working path `/home/user/veneer-to`; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(the host npm is 10.9.7 and the manifest refuses it); `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`,
Chromium 141 (`chromium-1194`) for the browser proofs; no sandbox; no network needed. A foreground
command longer than 10 minutes is the Orchestrator's.

**Measurements.** Taken by the staging script `units/b-modal-w2-stage.sh` at `2a3f223`: `npm run
build:src` and `npm run test:conformance` exit 0 in this worktree (`tmp/units/to-stage-build.log.txt`,
`tmp/units/to-stage-conformance.log.txt`). Run `npm run test:conformance` and the close proof
`tests/src/styles/components/close.test.ts` first and record their exits as your baseline.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The worktree's `node_modules` is a hard-linked copy of the checkout's with the
Vite and Vitest caches removed: never edit a file under `node_modules`. `tests/setupPolicy.ts`,
`tests/policy.test.ts`, and `tests/config.test.ts` are vendored; never edit them. The shared files stay
report-only: read every gate that needs a shared file (`check`, the section proof, the built cascade,
conformance, guides) on a validation copy you build under `tmp/probe/base/` (`git archive 2a3f223 | tar
-x -C tmp/probe/base`, `cp -al node_modules tmp/probe/base/node_modules`, your owned files copied over
it, your shared patch applied), record them as the copy's readings, and delete `tmp/probe/` before the
report. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are
forbidden. MODAL (`/home/user/veneer-md`), OFFCANVAS (`/home/user/veneer-oc`), and TIP
(`/home/user/veneer-tp`) run in parallel in their own worktrees; their files are off-limits, and their
entries in `CLOSE_DEFERRED`, the stacking table, the barrel, and the showcase stay as the base has them
in your patch.

## Unknowns

- Whether a Tailwind utility shares a name with a toast class: run the shared-name reading over the
  class names you ship (`grep -o` over the built cascade against the exclusion line in
  `tests/setup.css`) and report; M17 makes `test:service` an observation unless a shared name appears.
- Whether a coloured toast can be written with a shipped utility (`text-bg-*` or the background and
  border utilities) at `2a3f223`: search the built cascade for the class before you use it, and report
  the reading; a specimen needing an unshipped class is refused, not worked around.

## Scope

**Owned.** `src/styles/components/_toast.scss`, `tests/src/styles/components/toast.test.ts`,
`app/browser/sections/ToastSection.ts`, `tests/app/browser/sections/ToastSection.test.ts`.

**Shared (report-only; return an exact patch against `2a3f223`).** `src/styles/index.scss` (the `@use`,
M19); `tests/setupStyles.ts` (the `CLOSE_DEFERRED` entry moved to `CLOSE_SELECTORS`; the toast case
tables) and `tests/setupStyles.test.ts` (the tables bound to the inventory and added to the export and
frozen-table lists; the partition case unchanged in shape); `tests/setup.ts` (the `CaptureSubject`
members and resting `CASCADE_KEYS` rows; a `DRIVEN_KEYS` row only for a state the journey must drive);
`tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`,
`tests/app/browser/index.test.ts`; `tests/conformance.test.ts` (`'toast'` in `listed`, the order case
and its `toasts` stem); `tests/setupServer.test.ts` (the dash-proof component set);
`app/browser/constants.ts` (`TOAST_COPY`, `TOAST_SPECIMENS`), `app/browser/Showcase.ts`,
`app/browser/index.ts`; `guides/veneer.md` (the `_toast.scss` § Files row; `### Toast classes` in the
barrel's position; the `#### toast` rows and the `.toast-header .btn-close` row under
`#### btn-close` exactly as the gate measures them, and any `### Additions` row; the `toast` selector
and variable rows and the Toast `plugin` row in § Compatibility; the `.toast-header .btn-close`
`Overlays` row deleted from § Deferred selectors; the toast entry of the stacking table's Alias cell;
the § Showcase and § Tests links); `ROADMAP.md` (nothing: the family row closes at the family's exit).

**Off-limits.** MODAL's, OFFCANVAS's, and TIP's owned files (`_modal.scss`, `_offcanvas.scss`,
`_tooltip.scss`, `_popover.scss`, their proofs, their sections, their section proofs, and
`NavbarSection.test.ts`); `src/styles/_mixins.scss` and `tests/src/styles/mixins.test.ts` (MODAL,
OFFCANVAS, and TIP append there; this unit adds no mixin); `src/browser/**`, `src/core/**`,
`tests/src/browser/**`, `tests/src/core/**` (the engine session's); `tests/setupServer.ts`;
`tests/fixtures/**` (except the Tailwind fixtures if a shared name appears, reported first);
`app/browser/styles/**`; `src/styles/_tokens.scss`, `src/styles/_theme.scss`, every partial but
`_toast.scss`; `configs/**`, `package.json`, `package-lock.json`, `README.md`; the vendored files.

**What asserts the state this change ends.** The wave-2 terrain § 5 TOAST is the list: the
`CLOSE_DEFERRED` entry and its partition case in `tests/setupStyles.test.ts`; the no-rule assertion
over `CLOSE_DEFERRED` in `tests/src/styles/components/close.test.ts` (it reads the table, so the moved
entry closes it without an edit; patch it as Shared if a reading says otherwise); the § Deferred
selectors row; the `listed` literal, `passiveNames`, and the `stems` map in the order case of
`tests/conformance.test.ts`; the component set in `tests/setupServer.test.ts`; the exact region and
export lists in `Showcase.test.ts` and `index.test.ts`; the stacking Alias cell. Every entry ends in
Shared. Search bound: grep `'carousel'` and `CarouselSection` across `tests/`, `app/`, and `src/` at
`2a3f223` and re-derive the set.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git
command; no tree-wide `format` or lint `--fix` (scoped `npx oxfmt <file>` over your owned files is
permitted); `npm run build:src` and `npm run build:src:styles` are permitted in the validation copy;
scoped runs only; a runtime probe lives under `tmp/probe/` and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report file `/home/user/veneer-to/tmp/units/to-report.md`: the touched files; the ledger rows the
gate measured; the resting rows and subjects; the R19 proof matrix (each recorded selector and
condition mapped to its case, its distinguishing mutation, its specimen, and its scenario); the
failing-first and mutation record with commands; each gate's command and result line on the
validation copy; the shared-name reading; the coloured-toast reading; the guide text; and the exact
shared patch (a unified diff against `2a3f223`, also written to `tmp/units/to-shared.patch`). The
report states no count of a growable set and uses no banned term. Delivered as that file plus the same
text as the final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis —
per `.agents/orchestration.md` § Deviation protocol when a recorded selector cannot be rendered without
an inline style or an unshipped class, when a mutation the criteria name cannot be distinguished by any
assertion, when the ledger gate throws a claim collision, or when a gate needs an off-limits file.
Decide, record, and carry on for the specimen copy and names within M14, the case names, where the
guide section's paragraphs sit, the exact `:has()` qualifiers of capture rows, and the position of new
rows at the end of their tables.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the validation copy: `npm run check` exits 0; `npm run build:src` exits 0 and the built cascade
   carries every `toast` selector the inventory records with its declarations, the `.toast-header
   .btn-close` rule, and no other rule naming those classes (the report lists them against the
   inventory).
3. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
   tests/src/styles/components/toast.test.ts tests/src/styles/components/close.test.ts` exits 0 on the
   validation copy, and each case distinguishes its named mutation: `.toast-container` reads its
   `z-index` from `--vn-stack-toast` through `--bs-toast-zindex`, and a wrapper retuning the rung moves
   the computed value (mutation: the literal `1090`); `.toast` carries the same binding (mutation: the
   variable dropped from `.toast`); a toast without `show` computes `display: none` and a toast with
   `show` does not (mutation: the `:not(.show)` rule dropped); `showing` computes opacity 0 (mutation:
   the rule dropped); stacked toasts inside a container are spaced by `--bs-toast-spacing` and the
   last one is not (mutation: the `:not(:last-child)` qualifier dropped); the header's top corners
   take the radius less the border width (mutation: the full radius); the header's close control takes
   the header's margins while a control outside the header reads none (mutation: the rule written as
   `.toast .btn-close`); the toast resolves its colours from the body aliases in light and inside a
   dark island (mutation: a literal colour).
4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser
   tests/app/browser/sections/ToastSection.test.ts` exits 0 on the validation copy, asserting the
   region contract, no `[style]`, each container specimen inside `.viewport`, `show` on every toast,
   the `role` and `aria-live` pair the release's markup gives a toast, and the close control's
   `aria-label`.
5. `npm run test:conformance` exits 0 on the validation copy with `toast` in `listed`, the order case
   green with the `toasts` stem, the presence, ledger, deferral, priority, and duplication gates green,
   and the `.toast-header .btn-close` `Overlays` row gone; `npm run test:guides` and `npm run
   test:policy` exit 0 there.
6. The report carries each item of § Output, and the patch passes `git apply --check` on a fresh
   extract of `2a3f223`.

**Observations, not criteria.** The journey, `CAPTURE=1`, `test:service`, and the whole styles project
are the Orchestrator's runs at landing.

## Review evidence

`git -C /home/user/veneer-to diff 2a3f223` (with the new files rendered through `git diff --no-index
/dev/null <file>`) and `git -C /home/user/veneer-to status --porcelain` at hand-back (`to.diff`,
`to-status.txt`), the patch `to-shared.patch`, and the report.
