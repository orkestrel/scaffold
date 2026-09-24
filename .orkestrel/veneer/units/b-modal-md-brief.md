# Unit MODAL (`md`) — the `modal` key ships with its header combinator and the shared backdrop mixin

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent in the worktree `/home/user/veneer-md` (branch
`unit/md` from `2a3f223`, Veneer `main`). The executor that opens this brief is that subagent.

## Objective

The `modal` key ships in `src/styles/components/_modal.scss` exactly as the pinned inventory records
it: the `.modal-header .btn-close` combinator written in the partial and its `CLOSE_DEFERRED` entry
moved to `CLOSE_SELECTORS`; the backdrop written through the `overlay-backdrop` mixin appended to
`src/styles/_mixins.scss`; `--bs-modal-zindex` and `--bs-backdrop-zindex` bound to their stack rungs; a
`Modal` region rendering every developer-written state at rest inside the `.viewport` frame; the
mirrored browser proofs, the ledger rows, and the guide section; every shared-file change returned as
an exact patch.

## Context

**Evidence.** The wave-2 terrain `/home/user/scaffold/.orkestrel/veneer/units/b-modal-w2-terrain-report.md`
(measured at `2a3f223`: § 1 MODAL for what the tree carries, § 2 for the ALERT and CAROUSEL pattern to
copy, § 3 for the frame and the stand-ins, § 4 for the collision map, § 5 MODAL for the files the
result makes false, and its contradictions list) and the family's first terrain
`/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md` (§ A the oracle surface for
`modal`, § B the Modal plugin obligations; its § D and § G are superseded by the wave-2 terrain). The
wave-2 terrain is the one home for every line number and count this brief does not state; take each
yourself before you edit. Where a terrain and the tree disagree, the tree wins and the report records
the disagreement.

**Law.** `AGENTS.md` in the worktree, which names its authorities;
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing,architecture,typescript}.md`
(the Veneer checkout carries no `.claude/rules/` directory, so read the rule files from the scaffold
checkout); skill: none (the
`enterprise-bootstrap` skill is reference craft, not process); the guide `guides/veneer.md`; the
design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`, whose rulings M1 to
M20 and § Family record bind this unit. The rulings this unit carries: M2 (states at rest; `Static
modal` renders a specimen; `showing`, `hiding`, and the backdrop's `fade` without `show` are proved by
a declared-and-resolved reading with no frame, the reason recorded), M3 (no inline style; the
`.viewport` frame; `d-block` stands in for the display the engine writes inline, and the section says
so in one sentence), M4 (`Shown modal` renders its backdrop as a sibling inside the frame; no other
modal specimen carries one), M5 (`.modal.fade .modal-dialog`, its reduced-motion twin, and
`.modal-backdrop.fade` ship here; `.fade` and `.fade:not(.show)` stay B-CROSS's; no specimen depends on
`.fade:not(.show)`), M6, M7, M11, M12 (`modal-open` never appears in a specimen; the section states in
one sentence that the engine reads it and no Veneer rule does), M13, M14, M15 (`role="dialog"`, no
`aria-modal`; probe the accessibility tree first: mount a dialog beside a button and resolve the button
by name), M17, M18, M19.

**Rulings fixed for this wave.**
- The `overlay-backdrop` mixin is Bootstrap's own shape, with three parameters, so the backdrop's
  `fade` and `show` pair is written once rather than in two partials. MODAL and OFFCANVAS each write
  this block verbatim, appended after the `utility-variable` mixin, and integration appends one copy:

  ```scss
  // Paints the viewport-sized backdrop a modal or an offcanvas panel places behind itself, at the
  // `$zindex` stack rung in `$color`, transparent while it carries `fade` alone and at `$opacity`
  // after the engine adds `show`, as the release writes its shared backdrop.
  @mixin overlay-backdrop($zindex, $color, $opacity) {
  	position: fixed;
  	top: 0;
  	left: 0;
  	z-index: $zindex;
  	width: 100vw;
  	height: 100vh;
  	background-color: $color;

  	&.fade {
  		opacity: 0;
  	}

  	&.show {
  		opacity: $opacity;
  	}
  }
  ```

  MODAL's shared patch also carries the mixin's case in `tests/src/styles/mixins.test.ts`, beside the
  existing declaration-mixin cases; OFFCANVAS's patch carries no case for it.
- M7 bindings for this unit: `--bs-modal-zindex: var(--vn-stack-dialog-base)` on `.modal`,
  `--bs-backdrop-zindex: var(--vn-stack-dialog-backdrop)` on `.modal-backdrop`, each a `tokenized`
  departure. The stacking table's `-dialog-backdrop`, `-dialog-base` row takes the Alias cell
  `--bs-backdrop-zindex`, `--bs-modal-zindex`. The `-dropdown`, `-sticky`, `-fixed` row's Alias cell
  names DROPDOWN's landed binding, which the guide records as `--bs-dropdown-zindex` on
  `.dropdown-menu` reading `var(--vn-stack-dropdown)` (`#### dropdown`, departure `tokenized`, and the
  `### Dropdown classes` sentence that says every menu at that level reads the `--vn-stack-dropdown`
  tier); `-sticky` and `-fixed` answer no `--bs-*` variable, and you word that cell. MODAL rewrites the
  paragraph under the stacking table that says each rung answers no `--bs-*` alias to: "Bootstrap
  declares each rung as a variable on its component's rule; a component Veneer ships binds that
  variable to its rung, and the Alias column names each binding."
- M1 ruling 5: `var(--vn-palette-black-base)` for the backdrop's literal black and
  `var(--vn-palette-white-base)` for a literal white; every duration stays literal except a `0.15s`
  control transition, which reads `--vn-motion-feedback`. A transition goes through the `transition`
  mixin, which writes its reduced-motion twin.
- Barrel order (M19), final for the family: `close`, `toast`, `modal`, `tooltip`, `popover`,
  `carousel`, `spinner`, `offcanvas`, `placeholder`. Your patch inserts `components/modal` after
  `components/close`; integration orders the siblings.
- Showcase order (M14), final for the family: `AccordionSection`, then `ToastSection`, `ModalSection`,
  `TooltipSection`, `PopoverSection`, `OffcanvasSection`, then `DisplaySection`. Your patch inserts
  `ModalSection` after `AccordionSection`; the `app/browser/index.ts` row and the `Showcase.test.ts`
  label follow the same position.
- The Modal `plugin` row copies the landed Alert row's shape in § Compatibility, states the Modal
  obligations from the first terrain's § B, names the `Backdrop`, `FocusTrap`, and `ScrollBarHelper`
  utilities, and ends "Owner: J-ENGINE." The `## Surface` interface rows are the engine session's;
  never edit them.

**Installed primitives.** `@orkestrel/test` 0.0.21
(`node_modules/@orkestrel/test/dist/src/core/index.d.cts` and `dist/src/browser/index.d.cts`:
`readStyle`, `readPixels`, `readHit`, `matchesColor`, `stageMedia`, `visitBreakpoint`,
`waitForAnimations`, `readClipEdge`, `clipsOverflow`, `readClipMargin`, the recorders) and
`@orkestrel/contract` (guards); the tree's own readers in `tests/setupStyles.ts` and
`tests/setupBrowser.ts`. A helper, wait, or reader whose job an installed export does is a defect; the
audit's checker probes the diff for export names.

**Host.** Linux, `bash`, working path `/home/user/veneer-md`; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(the host npm is 10.9.7 and the manifest refuses it); `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`,
Chromium 141 (`chromium-1194`) for the browser proofs; no sandbox; no network needed. A foreground
command longer than 10 minutes is the Orchestrator's.

**Measurements.** Taken by the staging script `units/b-modal-w2-stage.sh` at `2a3f223`: `npm run
build:src` and `npm run test:conformance` exit 0 in this worktree (`tmp/units/md-stage-build.log.txt`,
`tmp/units/md-stage-conformance.log.txt`). Run `npm run test:conformance` and the close proof
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
forbidden. OFFCANVAS (`/home/user/veneer-oc`), TIP (`/home/user/veneer-tp`), and TOAST
(`/home/user/veneer-to`) run in parallel in their own worktrees; their files are off-limits, and their
entries in `CLOSE_DEFERRED`, the stacking table, the barrel, and the showcase stay as the base has them
in your patch.

## Unknowns

- Whether a Tailwind utility shares a name with a modal class: run the shared-name reading over the
  class names you ship (`grep -o` over the built cascade against the exclusion line in
  `tests/setup.css`) and report; M17 makes `test:service` an observation unless a shared name appears.
- Whether the default dialog, the scrollable dialog, and the centred dialog fit the `24rem` frame at
  390 without a clipped close control: measure with `readClipEdge` and report the reading; a specimen
  that cannot fit stops the unit under § Deviation contract.

## Scope

**Owned.** `src/styles/components/_modal.scss`, `tests/src/styles/components/modal.test.ts`,
`app/browser/sections/ModalSection.ts`, `tests/app/browser/sections/ModalSection.test.ts`.

**Shared (report-only; return an exact patch against `2a3f223`).** `src/styles/index.scss` (the `@use`,
M19); `src/styles/_mixins.scss` (the `overlay-backdrop` block, M11) and
`tests/src/styles/mixins.test.ts` (its case); `tests/setupStyles.ts` (the `CLOSE_DEFERRED` entry moved
to `CLOSE_SELECTORS`; the modal case tables) and `tests/setupStyles.test.ts` (the tables bound to the
inventory and added to the export and frozen-table lists; the partition case unchanged in shape);
`tests/setup.ts` (the `CaptureSubject` members and resting `CASCADE_KEYS` rows; a `DRIVEN_KEYS` row
only for a state the journey must drive); `tests/app/browser/integration.test.ts`,
`tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`; `tests/conformance.test.ts`
(`'modal'` in `listed`, the order case); `tests/setupServer.test.ts` (the dash-proof component set);
`app/browser/constants.ts` (`MODAL_COPY`, `MODAL_SPECIMENS`), `app/browser/Showcase.ts`,
`app/browser/index.ts`; `guides/veneer.md` (the `_modal.scss` § Files row; `### Modal classes` in the
barrel's position; the `#### modal` rows and the `.modal-header .btn-close` row under
`#### btn-close` exactly as the gate measures them, and any `### Additions` row; the `modal` selector
and variable rows and the Modal `plugin` row in § Compatibility; the `.modal-header .btn-close`
`Overlays` row deleted from § Deferred selectors; the stacking table's dialog and dropdown Alias
cells and the rewritten paragraph; the § Showcase and § Tests links); `ROADMAP.md` (nothing: the
family row closes at the family's exit).

**Off-limits.** OFFCANVAS's, TIP's, and TOAST's owned files (`_offcanvas.scss`, `_tooltip.scss`,
`_popover.scss`, `_toast.scss`, their proofs, their sections, their section proofs, and
`NavbarSection.test.ts`); `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`
(the engine session's); `tests/setupServer.ts`; `tests/fixtures/**` (except the Tailwind fixtures if a
shared name appears, reported first); `app/browser/styles/**`; `src/styles/_tokens.scss`,
`src/styles/_theme.scss`, every partial but `_modal.scss`; `configs/**`, `package.json`,
`package-lock.json`, `README.md`; the vendored files.

**What asserts the state this change ends.** The wave-2 terrain § 5 MODAL is the list: the
`CLOSE_DEFERRED` entry and its partition case in `tests/setupStyles.test.ts`; the no-rule assertion
over `CLOSE_DEFERRED` in `tests/src/styles/components/close.test.ts` (it reads the table, so the moved
entry closes it without an edit; patch it as Shared if a reading says otherwise); the § Deferred
selectors row; the `listed` literal and the order case in `tests/conformance.test.ts`; the component
set in `tests/setupServer.test.ts`; the exact region and export lists in `Showcase.test.ts` and
`index.test.ts`; the stacking Alias cells and paragraph. Every entry ends in Shared. Search bound:
grep `'carousel'` and `CarouselSection` across `tests/`, `app/`, and `src/` at `2a3f223` and re-derive
the set.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git
command; no tree-wide `format` or lint `--fix` (scoped `npx oxfmt <file>` over your owned files is
permitted); `npm run build:src` and `npm run build:src:styles` are permitted in the validation copy;
scoped runs only; a runtime probe lives under `tmp/probe/` and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report file `/home/user/veneer-md/tmp/units/md-report.md`: the touched files; the ledger rows the
gate measured; the resting rows and subjects; the R19 proof matrix (each recorded selector and
condition mapped to its case, its distinguishing mutation, its specimen, and its scenario); the
failing-first and mutation record with commands; each gate's command and result line on the
validation copy; the accessibility-tree probe's reading; the frame-fit reading; the shared-name
reading; the guide text; and the exact shared patch (a unified diff against `2a3f223`, also written to
`tmp/units/md-shared.patch`). The report states no count of a growable set and uses no banned term.
Delivered as that file plus the same text as the final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis —
per `.agents/orchestration.md` § Deviation protocol when a recorded selector cannot be rendered without
an inline style or an unshipped class, when a specimen cannot fit the frame, when a mutation the
criteria name cannot be distinguished by any assertion, when the ledger gate throws a claim collision,
or when a gate needs an off-limits file. Decide, record, and carry on for the specimen copy and names
within M14, the case names, where the guide section's paragraphs sit, the Alias cell wording for
`-sticky` and `-fixed`, the exact `:has()` qualifiers of capture rows, and the position of new rows at
the end of their tables.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the validation copy: `npm run check` exits 0; `npm run build:src` exits 0 and the built cascade
   carries every `modal` selector the inventory records with its declarations, the `.modal-header
   .btn-close` rule, and no other rule naming those classes (the report lists them against the
   inventory).
3. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
   tests/src/styles/components/modal.test.ts tests/src/styles/components/close.test.ts
   tests/src/styles/mixins.test.ts` exits 0 on the validation copy, and each case distinguishes its
   named mutation: `.modal` and `.modal-backdrop` read their `z-index` from `--vn-stack-dialog-base`
   and `--vn-stack-dialog-backdrop`, and a wrapper retuning a rung moves the computed value (mutation:
   the literal `1055` or `1050`); the backdrop is transparent with `fade` alone and at
   `--bs-backdrop-opacity` with `fade show` (mutation: the mixin's `&.show` block dropped); the
   mixin's case reads every declaration the block writes (mutation: one declaration dropped); the
   dialog's `max-width` steps at the release's boundaries for the default, `modal-sm`, `modal-lg`, and
   `modal-xl`, read through `visitBreakpoint` (mutation: one boundary name shifted); each
   `modal-fullscreen-{infix}-down` class fills the viewport below its boundary and not at it
   (mutation: `breakpoint-up` written for `breakpoint-down`); `modal-dialog-centered` centres the
   dialog and `modal-dialog-scrollable` scrolls the body inside a capped dialog (mutation: each
   rule's defining declaration dropped); `.modal.fade .modal-dialog` translates the dialog and
   `.modal.show .modal-dialog` clears the transform, with the reduced-motion twin under
   `stageMedia` (mutation: the transition written without the mixin); `.modal-static` scales the
   dialog (mutation: the rule dropped); the header's close control takes the header's padding and
   negative margins while a control outside the header reads none (mutation: the rule written as
   `.modal .btn-close`); the content resolves its colours from the body aliases in light and inside a
   dark island (mutation: a literal colour).
4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser
   tests/app/browser/sections/ModalSection.test.ts` exits 0 on the validation copy, asserting the region contract, no `[style]`, each
   specimen inside `.viewport`, the backdrop only in `Shown modal`, `role="dialog"` with no
   `aria-modal`, the close control's `aria-label`, and no specimen carrying `modal-open`.
5. `npm run test:conformance` exits 0 on the validation copy with `modal` in `listed`, the presence,
   ledger, deferral, priority, and duplication gates green, and the `.modal-header .btn-close`
   `Overlays` row gone; `npm run test:guides` and `npm run test:policy` exit 0 there.
6. The report carries each item of § Output, and the patch passes `git apply --check` on a fresh
   extract of `2a3f223`.

**Observations, not criteria.** The journey, `CAPTURE=1`, `test:service`, and the whole styles project
are the Orchestrator's runs at landing.

## Review evidence

`git -C /home/user/veneer-md diff 2a3f223` (with the new files rendered through `git diff --no-index
/dev/null <file>`) and `git -C /home/user/veneer-md status --porcelain` at hand-back (`md.diff`,
`md-status.txt`), the patch `md-shared.patch`, and the report.
