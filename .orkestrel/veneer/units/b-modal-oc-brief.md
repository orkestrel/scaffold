# Unit OFFCANVAS (`oc`) — the `offcanvas` key ships with its responsive ramp, header combinator, and navbar specimen

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent in the worktree `/home/user/veneer-oc` (branch
`unit/oc` from `2a3f223`, Veneer `main`). The executor that opens this brief is that subagent.

## Objective

The `offcanvas` key ships in `src/styles/components/_offcanvas.scss` exactly as the pinned inventory
records it: the bare panel and the `offcanvas-{infix}` ramp; the `.offcanvas-header .btn-close`
combinator written in the partial and its `CLOSE_DEFERRED` entry moved to `CLOSE_SELECTORS`; the
backdrop written through the `overlay-backdrop` mixin; `--bs-offcanvas-zindex` and the backdrop's
`z-index` bound to their stack rungs; an `Offcanvas` region rendering one shown panel per placement and
one per infix inside the `.viewport` frame; the `Navbar with offcanvas` specimen in the Navbar region;
the mirrored browser proofs, the ledger rows, and the guide section; every shared-file change returned
as an exact patch.

## Context

**Evidence.** The wave-2 terrain `/home/user/scaffold/.orkestrel/veneer/units/b-modal-w2-terrain-report.md`
(measured at `2a3f223`: § 1 OFFCANVAS for what the tree carries, including the navbar expand ramp that
already ships the `.navbar-expand{infix} .offcanvas` rules from `_navbar.scss`; § 2 for the ALERT and
CAROUSEL pattern to copy; § 3 for the frame, the stand-ins, and where the ramp meets the
`normalizeMediaCondition` helper; § 4 for the collision map; § 5 OFFCANVAS for the files the result
makes false; and its contradictions list) and the family's first terrain
`/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md` (§ A the oracle surface for
`offcanvas`, § B the Offcanvas plugin obligations; its § D and § G are superseded by the wave-2
terrain). The wave-2 terrain is the one home for every line number and count this brief does not
state; take each yourself before you edit. Where a terrain and the tree disagree, the tree wins and the
report records the disagreement.

**Law.** `AGENTS.md` in the worktree, which names its authorities;
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing,architecture,typescript}.md`
(the Veneer checkout carries no `.claude/rules/` directory, so read the rule files from the scaffold
checkout); skill: none (the `enterprise-bootstrap` skill is reference craft, not process); the guide
`guides/veneer.md`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`,
whose rulings M1 to M20 and § Family record bind this unit. The rulings this unit carries: M2 (states
at rest; `showing`, `hiding`, and the backdrop's `fade` without `show` are engine-written and proved by
a declared-and-resolved reading with no frame, the reason recorded; every panel specimen carries
`show`), M3 (no inline style; every panel renders inside the `.viewport` frame, and the section says so
in one sentence), M4 (`Start offcanvas` renders its backdrop as a sibling inside the frame; no other
offcanvas specimen carries one), M5 (`.offcanvas-backdrop.fade` ships here; `.fade` and
`.fade:not(.show)` stay B-CROSS's), M6, M7, M10, M11, M13 (the Offcanvas row names the `Backdrop`,
`FocusTrap`, and `ScrollBarHelper` utilities), M14, M15 (`role="dialog"`, no `aria-modal`), M17, M18,
M19.

**Rulings fixed for this wave.**
- M10: the bare `.offcanvas` is unconditioned; each `offcanvas-{infix}` pairs the `breakpoint-down`
  and `breakpoint-up` mixins at one boundary name, as the release pairs `media-breakpoint-down($next)`
  and `media-breakpoint-up($next)`; one shown panel per placement and one per infix, each infix proved
  through `visitBreakpoint` on both sides of its boundary; the `xxl` inline state has no frame (R16),
  and the report records why. The conformance comparison normalizes each condition through the
  `normalizeMediaCondition` helper, so a range condition the Veneer mixins emit meets the recorded
  `max-width` or `min-width` feature there; `tests/setupServer.ts` stays off-limits.
- M10, the navbar carry: the `Navbar with offcanvas` specimen lands in the Navbar region inside a
  `.viewport` frame through a `NAVBAR_SPECIMENS` entry in `app/browser/constants.ts` (Shared), and this
  unit owns `tests/app/browser/sections/NavbarSection.test.ts` for it: the assertion that the region
  holds no `.offcanvas` and the comment beside it flip. The `.navbar-expand{infix} .offcanvas*` rules
  stay in `_navbar.scss`, which stays off-limits; where the ledger gate measures a row for one of those
  selectors, the row sits under `#### offcanvas`, and `#### navbar` loses it (the D22 ladder as
  implemented governs). NAVBAR's landed guide text that says those rules ship ahead of the panel's own
  partial and that the Navbar region renders no offcanvas panel (`### Navbar classes`, and the
  `NAVBAR_SPECIMENS` comment) is rewritten against what ships.
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

  MODAL's shared patch carries the mixin's case in `tests/src/styles/mixins.test.ts`; yours carries no
  case for it and no other change to that file.
- M7 bindings for this unit: `--bs-offcanvas-zindex: var(--vn-stack-drawer-base)` on the panel rules,
  and the `.offcanvas-backdrop` `z-index` through the mixin's `$zindex` as
  `var(--vn-stack-drawer-backdrop)`, each a `tokenized` departure. The stacking table's
  `-drawer-backdrop`, `-drawer-base` row takes the Alias cell naming each binding: the release declares
  no variable for the offcanvas backdrop's rung, so word that entry for the literal it replaces. MODAL
  rewrites the paragraph under the stacking table; leave it as the base has it.
- M1 ruling 5: `var(--vn-palette-black-base)` for the backdrop's literal black and
  `var(--vn-palette-white-base)` for a literal white; every duration stays literal. A transition goes
  through the `transition` mixin, which writes its reduced-motion twin.
- Barrel order (M19), final for the family: `close`, `toast`, `modal`, `tooltip`, `popover`,
  `carousel`, `spinner`, `offcanvas`, `placeholder`. Your patch inserts `components/offcanvas` after
  `components/spinner`.
- Showcase order (M14), final for the family: `AccordionSection`, then `ToastSection`, `ModalSection`,
  `TooltipSection`, `PopoverSection`, `OffcanvasSection`, then `DisplaySection`. Your patch inserts
  `OffcanvasSection` after `AccordionSection`; the `app/browser/index.ts` row and the `Showcase.test.ts`
  label follow the same position.
- The Offcanvas `plugin` row copies the landed Alert row's shape in § Compatibility, states the
  Offcanvas obligations from the first terrain's § B, names the `Backdrop`, `FocusTrap`, and
  `ScrollBarHelper` utilities, and ends "Owner: J-ENGINE." The `## Surface` interface rows are the
  engine session's; never edit them.

**Installed primitives.** `@orkestrel/test` 0.0.21
(`node_modules/@orkestrel/test/dist/src/core/index.d.cts` and `dist/src/browser/index.d.cts`:
`readStyle`, `readPixels`, `readHit`, `matchesColor`, `stageMedia`, `visitBreakpoint`,
`waitForAnimations`, `readClipEdge`, `clipsOverflow`, `readClipMargin`, the recorders) and
`@orkestrel/contract` (guards); the tree's own readers in `tests/setupStyles.ts` and
`tests/setupBrowser.ts`, including the `collectMediaConditions` reader `tests/setupBrowser.ts` exports
and `navbar.test.ts` imports. A helper,
wait, or reader whose job an installed export does is a defect; the audit's checker probes the diff for
export names.

**Host.** Linux, `bash`, working path `/home/user/veneer-oc`; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(the host npm is 10.9.7 and the manifest refuses it); `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`,
Chromium 141 (`chromium-1194`) for the browser proofs; no sandbox; no network needed. A foreground
command longer than 10 minutes is the Orchestrator's.

**Measurements.** Taken by the staging script `units/b-modal-w2-stage.sh` at `2a3f223`: `npm run
build:src` and `npm run test:conformance` exit 0 in this worktree (`tmp/units/oc-stage-build.log.txt`,
`tmp/units/oc-stage-conformance.log.txt`). Run `npm run test:conformance`, the close proof
`tests/src/styles/components/close.test.ts`, and the navbar proof
`tests/src/styles/components/navbar.test.ts` first and record their exits as your baseline.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The worktree's `node_modules` is a hard-linked copy of the checkout's with the
Vite and Vitest caches removed: never edit a file under `node_modules`. `tests/setupPolicy.ts`,
`tests/policy.test.ts`, and `tests/config.test.ts` are vendored; never edit them. The shared files stay
report-only: read every gate that needs a shared file (`check`, the section proofs, the built cascade,
conformance, guides) on a validation copy you build under `tmp/probe/base/` (`git archive 2a3f223 | tar
-x -C tmp/probe/base`, `cp -al node_modules tmp/probe/base/node_modules`, your owned files copied over
it, your shared patch applied), record them as the copy's readings, and delete `tmp/probe/` before the
report. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are
forbidden. MODAL (`/home/user/veneer-md`), TIP (`/home/user/veneer-tp`), and TOAST
(`/home/user/veneer-to`) run in parallel in their own worktrees; their files are off-limits, and their
entries in `CLOSE_DEFERRED`, the stacking table, the barrel, and the showcase stay as the base has them
in your patch.

## Unknowns

- Whether shipping the bare `.offcanvas` rules changes a reading `tests/src/styles/components/navbar.test.ts`
  takes against its expanded-panel fixture: run that proof on the validation copy, and where a reading
  moves, correct the proof in the owned file and record the before and after readings in the report.
- Whether a Tailwind utility shares a name with an offcanvas class: run the shared-name reading over
  the class names you ship (`grep -o` over the built cascade against the exclusion line in
  `tests/setup.css`) and report; M17 makes `test:service` an observation unless a shared name appears.

## Scope

**Owned.** `src/styles/components/_offcanvas.scss`, `tests/src/styles/components/offcanvas.test.ts`,
`app/browser/sections/OffcanvasSection.ts`, `tests/app/browser/sections/OffcanvasSection.test.ts`,
`tests/app/browser/sections/NavbarSection.test.ts` (for the `Navbar with offcanvas` specimen alone),
`tests/src/styles/components/navbar.test.ts` (for a reading the shipped panel rules move, alone).

**Shared (report-only; return an exact patch against `2a3f223`).** `src/styles/index.scss` (the `@use`,
M19); `src/styles/_mixins.scss` (the `overlay-backdrop` block, M11); `tests/setupStyles.ts` (the
`CLOSE_DEFERRED` entry moved to `CLOSE_SELECTORS`; the offcanvas case tables) and
`tests/setupStyles.test.ts` (the tables bound to the inventory and added to the export and frozen-table
lists; the partition case unchanged in shape); `tests/setup.ts` (the `CaptureSubject` members and
resting `CASCADE_KEYS` rows for the offcanvas specimens and `Navbar with offcanvas`; a `DRIVEN_KEYS` row
only for a state the journey must drive); `tests/app/browser/integration.test.ts`,
`tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`; `tests/conformance.test.ts`
(`'offcanvas'` in `listed`, the order case); `tests/setupServer.test.ts` (the dash-proof component set);
`app/browser/constants.ts` (`OFFCANVAS_COPY`, `OFFCANVAS_SPECIMENS`, the `NAVBAR_SPECIMENS` entry and
its comment), `app/browser/Showcase.ts`, `app/browser/index.ts`; `guides/veneer.md` (the
`_offcanvas.scss` § Files row; `### Offcanvas classes` in the barrel's position; the `#### offcanvas`
rows, any row that moves out of `#### navbar`, and the `.offcanvas-header .btn-close` row under
`#### btn-close` exactly as the gate measures them, and any `### Additions` row; the `offcanvas`
selector and variable rows and the Offcanvas `plugin` row in § Compatibility; the
`.offcanvas-header .btn-close` `Overlays` row deleted from § Deferred selectors; the drawer Alias cell;
the `### Navbar classes` sentences about the panel; the § Showcase and § Tests links); `ROADMAP.md`
(nothing: the family row closes at the family's exit; the carrier row for the navbar offcanvas panel is
the Orchestrator's fold).

**Off-limits.** MODAL's, TIP's, and TOAST's owned files (`_modal.scss`, `_tooltip.scss`,
`_popover.scss`, `_toast.scss`, their proofs, their sections, their section proofs);
`tests/src/styles/mixins.test.ts` (MODAL and TIP patch it); `src/styles/components/_navbar.scss` and
`app/browser/sections/NavbarSection.ts` (the landed navbar; a gate that needs either stops the unit);
`src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**` (the engine session's);
`tests/setupServer.ts`; `tests/fixtures/**` (except the Tailwind fixtures if a shared name appears,
reported first); `app/browser/styles/**`; `src/styles/_tokens.scss`, `src/styles/_theme.scss`, every
partial but `_offcanvas.scss`; `configs/**`, `package.json`, `package-lock.json`, `README.md`; the
vendored files.

**What asserts the state this change ends.** The wave-2 terrain § 5 OFFCANVAS is the list: the
`CLOSE_DEFERRED` entry and its partition case in `tests/setupStyles.test.ts`; the no-rule assertion
over `CLOSE_DEFERRED` in `tests/src/styles/components/close.test.ts` (it reads the table, so the moved
entry closes it without an edit; patch it as Shared if a reading says otherwise); the § Deferred
selectors row; the null `.offcanvas` expectation and its comment in `NavbarSection.test.ts` (Owned);
the `NAVBAR_SPECIMENS` comment and the `### Navbar classes` sentences (Shared); the binding of
`NAVBAR_SELECTORS` to the navbar key's selectors in `tests/setupStyles.test.ts`, which stays true
because the inventory records those selectors under both keys (read it; Shared patch if a reading
says otherwise); the `listed` literal and the order case in `tests/conformance.test.ts`; the component
set in `tests/setupServer.test.ts`; the exact region and export lists in `Showcase.test.ts` and
`index.test.ts`; the drawer Alias cell. Every entry ends in Owned or Shared. Search bound: grep
`'carousel'`, `CarouselSection`, and `offcanvas` across `tests/`, `app/`, and `src/` at `2a3f223` and
re-derive the set.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git
command; no tree-wide `format` or lint `--fix` (scoped `npx oxfmt <file>` over your owned files is
permitted); `npm run build:src` and `npm run build:src:styles` are permitted in the validation copy;
scoped runs only; a runtime probe lives under `tmp/probe/` and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report file `/home/user/veneer-oc/tmp/units/oc-report.md`: the touched files; the ledger rows the
gate measured, including any row that moved from `#### navbar`; the resting rows and subjects; the R19
proof matrix (each recorded selector and condition mapped to its case, its distinguishing mutation,
its specimen, and its scenario); the failing-first and mutation record with commands; each gate's
command and result line on the validation copy; the navbar proof's before and after readings; the
shared-name reading; the guide text; and the exact shared patch (a unified diff against `2a3f223`, also
written to `tmp/units/oc-shared.patch`). The report states no count of a growable set and uses no
banned term. Delivered as that file plus the same text as the final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis —
per `.agents/orchestration.md` § Deviation protocol when a recorded selector cannot be rendered without
an inline style or an unshipped class, when a panel cannot be shown inside its frame, when a mutation
the criteria name cannot be distinguished by any assertion, when the ledger gate throws a claim
collision, or when a gate needs an off-limits file. Decide, record, and carry on for the specimen copy
and names within M14, the case names, where the guide section's paragraphs sit, the Alias cell wording
for the backdrop's rung, the exact `:has()` qualifiers of capture rows, and the position of new rows at
the end of their tables.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the validation copy: `npm run check` exits 0; `npm run build:src` exits 0 and the built cascade
   carries every `offcanvas` selector the inventory records with its declarations and conditions, the
   `.offcanvas-header .btn-close` rule, and no other rule naming those classes beyond the navbar expand
   rules that already ship (the report lists them against the inventory).
3. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
   tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/close.test.ts
   tests/src/styles/components/navbar.test.ts` exits 0 on the validation copy, and each case
   distinguishes its named mutation: the panel reads its `z-index` from `--vn-stack-drawer-base` and
   the backdrop from `--vn-stack-drawer-backdrop`, and a wrapper retuning a rung moves the computed
   value (mutation: the literal `1045` or `1040`); the backdrop is transparent with `fade` alone and at
   the release's opacity with `fade show` (mutation: the backdrop written without the mixin); each
   placement sits on its edge, spans its axis, and draws its inner border, and slides out along its own
   axis without `show` (mutation: two placements' transforms swapped); a shown panel clears the
   transform and is visible (mutation: the `show` rule dropped); each `offcanvas-{infix}` panel is
   fixed below its boundary and inline at and above it, with its header hidden and its body a flex row,
   read through `visitBreakpoint` on both sides (mutation: one infix's `breakpoint-down` and
   `breakpoint-up` names shifted apart); the header's close control takes the header's margins while a
   control outside the header reads none (mutation: the rule written as `.offcanvas .btn-close`); the
   panel resolves its colours from the body aliases in light and inside a dark island (mutation: a
   literal colour); the transition's reduced-motion twin reads `none` under `stageMedia` (mutation: the
   transition written without the mixin).
4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser
   tests/app/browser/sections/OffcanvasSection.test.ts tests/app/browser/sections/NavbarSection.test.ts`
   exits 0 on the validation copy, asserting the region contract, no `[style]`, each panel inside
   `.viewport` with `show`, the backdrop only in `Start offcanvas`, `role="dialog"` with no
   `aria-modal`, the close control's `aria-label`, and the `Navbar with offcanvas` specimen inside its
   frame in the Navbar region.
5. `npm run test:conformance` exits 0 on the validation copy with `offcanvas` in `listed`, the presence,
   ledger, deferral, priority, and duplication gates green, and the `.offcanvas-header .btn-close`
   `Overlays` row gone; `npm run test:guides` and `npm run test:policy` exit 0 there.
6. The report carries each item of § Output, and the patch passes `git apply --check` on a fresh
   extract of `2a3f223`.

**Observations, not criteria.** The journey, `CAPTURE=1`, `test:service`, and the whole styles project
are the Orchestrator's runs at landing.

## Review evidence

`git -C /home/user/veneer-oc diff 2a3f223` (with the new files rendered through `git diff --no-index
/dev/null <file>`) and `git -C /home/user/veneer-oc status --porcelain` at hand-back (`oc.diff`,
`oc-status.txt`), the patch `oc-shared.patch`, and the report.
