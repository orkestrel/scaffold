# Unit TIP (`tp`) — the `tooltip` and `popover` keys ship with the text-reset mixin

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent in the worktree `/home/user/veneer-tp` (branch
`unit/tp` from `2a3f223`, Veneer `main`). The executor that opens this brief is that subagent.

## Objective

The `tooltip` and `popover` keys ship in `src/styles/components/_tooltip.scss` and
`src/styles/components/_popover.scss` exactly as the pinned inventory records them: both read the
`reset-text` mixin appended to `src/styles/_mixins.scss`; `--bs-tooltip-zindex` and
`--bs-popover-zindex` are bound to their stack rungs; a `Tooltip` region and a `Popover` region each
render one tip per explicit side at rest inside the `.viewport` frame; the mirrored browser proofs, the
ledger rows, and the guide sections; every shared-file change returned as an exact patch.

## Context

**Evidence.** The wave-2 terrain `/home/user/scaffold/.orkestrel/veneer/units/b-modal-w2-terrain-report.md`
(measured at `2a3f223`: § 1 TIP for what the tree carries, § 2 for the ALERT and CAROUSEL pattern to
copy, § 3 for the frame and the placement stand-ins, § 4 for the collision map, § 5 TIP for the files
the result makes false, and its contradictions list) and the family's first terrain
`/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md` (§ A the oracle surface for
`tooltip` and `popover`, § B the Tooltip and Popover plugin obligations; its § D and § G are
superseded by the wave-2 terrain). The wave-2 terrain is the one home for every line number and count
this brief does not state; take each yourself before you edit. Where a terrain and the tree disagree,
the tree wins and the report records the disagreement.

**Law.** `AGENTS.md` in the worktree, which names its authorities;
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing,architecture,typescript}.md`
(the Veneer checkout carries no `.claude/rules/` directory, so read the rule files from the scaffold
checkout); skill: none (the `enterprise-bootstrap` skill is reference craft, not process); the guide
`guides/veneer.md`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`,
whose rulings M1 to M20 and § Family record bind this unit. The rulings this unit carries: M2 (states
at rest; `.tooltip` without `.show` and the `data-popper-placement` forms are engine-written and proved
by a declared-and-resolved reading with no frame, the reason recorded), M3 (no inline style; the
engine writes a tip's placement inline, so the release's static idiom stands in with shipped
`position-*`, `start-50`, `top-50`, and `translate-middle-*` utilities, on the tip and on its arrow
where the arrow needs a position; each section says so in one sentence), M9 (each explicit side has a
specimen with the stand-ins, alone with no trigger; the `-auto[data-popper-placement]` forms render no
specimen and are proved by the `@extend` equality per side; `data-popper-placement` appears as a markup
attribute only inside the proof), M11 (`reset-text`), M13 (the Tooltip row names the `Sanitizer` and
`TemplateFactory` utilities; this unit rewrites the sanitizer sentence in § Compatibility's closing
paragraph to name J-ENGINE as its owner), M14 (`Top tooltip`, `Right popover`, and so on), M15 (`role="tooltip"`
and an `id` on each tip; no specimen claims `aria-describedby` wiring), M17, M18, M19.

**Rulings fixed for this wave.**
- The `reset-text` mixin writes the release's text reset as the inventory records the declarations
  under `.tooltip` and `.popover`, with no parameter, appended after the `utility-variable` mixin
  (MODAL and OFFCANVAS append `overlay-backdrop` after it too; integration orders the appends as
  `overlay-backdrop`, then `reset-text`). Its case goes into `tests/src/styles/mixins.test.ts` beside
  the existing declaration-mixin cases. `findDuplication` stays empty.
- M7 bindings for this unit: `--bs-tooltip-zindex: var(--vn-stack-hint)` on `.tooltip` and
  `--bs-popover-zindex: var(--vn-stack-popover)` on `.popover`, each a `tokenized` departure. The
  stacking table's `-popover`, `-hint`, `-toast` row is shared with TOAST: your patch writes
  `--bs-popover-zindex`, `--bs-tooltip-zindex` into that row's Alias cell and TOAST's writes
  `--bs-toast-zindex`; integration joins them in rung order. MODAL rewrites the paragraph under the
  stacking table; leave it as the base has it.
- The guide sentences this unit rewrites against what ships: the hint-surface and popover-asymmetry
  sentences in `### Outside the ledger` and the sanitizer sentence in § Compatibility's closing
  paragraph (the wave-2 terrain § 1 TIP names each).
- M1 ruling 5: a literal black or white reads `var(--vn-palette-black-base)` or
  `var(--vn-palette-white-base)`; every duration stays literal.
- Barrel order (M19), final for the family: `close`, `toast`, `modal`, `tooltip`, `popover`,
  `carousel`, `spinner`, `offcanvas`, `placeholder`. Your patch inserts `components/tooltip`, then
  `components/popover`, after `components/close`; integration orders the siblings.
- Showcase order (M14), final for the family: `AccordionSection`, then `ToastSection`, `ModalSection`,
  `TooltipSection`, `PopoverSection`, `OffcanvasSection`, then `DisplaySection`. Your patch inserts
  `TooltipSection`, then `PopoverSection`, after `AccordionSection`; the `app/browser/index.ts` rows and
  the `Showcase.test.ts` labels follow the same position.
- The Tooltip and Popover `plugin` rows copy the landed Alert row's shape in § Compatibility, state the
  obligations from the first terrain's § B, and end "Owner: J-ENGINE." The `## Surface` interface rows
  are the engine session's; never edit them.
- The forms keys' `.valid-tooltip` and `.invalid-tooltip` in `src/styles/components/_validation.scss`
  and the input-group exclusion beside them are shipped vocabulary outside this unit's keys; never
  edit them.

**Installed primitives.** `@orkestrel/test` 0.0.21
(`node_modules/@orkestrel/test/dist/src/core/index.d.cts` and `dist/src/browser/index.d.cts`:
`readStyle`, `readPixels`, `readHit`, `matchesColor`, `stageMedia`, `visitBreakpoint`,
`waitForAnimations`, `readClipEdge`, `clipsOverflow`, `readClipMargin`, the recorders) and
`@orkestrel/contract` (guards); the tree's own readers in `tests/setupStyles.ts` and
`tests/setupBrowser.ts`. A helper, wait, or reader whose job an installed export does is a defect; the
audit's checker probes the diff for export names.

**Host.** Linux, `bash`, working path `/home/user/veneer-tp`; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(the host npm is 10.9.7 and the manifest refuses it); `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`,
Chromium 141 (`chromium-1194`) for the browser proofs; no sandbox; no network needed. A foreground
command longer than 10 minutes is the Orchestrator's.

**Measurements.** Taken by the staging script `units/b-modal-w2-stage.sh` at `2a3f223`: `npm run
build:src` and `npm run test:conformance` exit 0 in this worktree (`tmp/units/tp-stage-build.log.txt`,
`tmp/units/tp-stage-conformance.log.txt`). Run `npm run test:conformance` first and record its exit as
your baseline.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The worktree's `node_modules` is a hard-linked copy of the checkout's with the
Vite and Vitest caches removed: never edit a file under `node_modules`. `tests/setupPolicy.ts`,
`tests/policy.test.ts`, and `tests/config.test.ts` are vendored; never edit them. The shared files stay
report-only: read every gate that needs a shared file (`check`, the section proofs, the built cascade,
conformance, guides) on a validation copy you build under `tmp/probe/base/` (`git archive 2a3f223 | tar
-x -C tmp/probe/base`, `cp -al node_modules tmp/probe/base/node_modules`, your owned files copied over
it, your shared patch applied), record them as the copy's readings, and delete `tmp/probe/` before the
report. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are
forbidden. MODAL (`/home/user/veneer-md`), OFFCANVAS (`/home/user/veneer-oc`), and TOAST
(`/home/user/veneer-to`) run in parallel in their own worktrees; their files are off-limits, and their
entries in the stacking table, the mixin list, the barrel, and the showcase stay as the base has them
in your patch.

## Unknowns

- Whether a tip specimen whose box hangs outside its host enters the journey's hanging branch, which
  requires the hanging set to be exactly the forms keys' input-group tooltip pairs (the wave-2 terrain
  § 5 TIP): keep every tip's box inside its frame, read it with `readClipEdge`, and report the reading;
  if a tip cannot be kept inside, stop under § Deviation contract.
- Whether a Tailwind utility shares a name with a tip class: run the shared-name reading over the class
  names you ship (`grep -o` over the built cascade against the exclusion line in `tests/setup.css`) and
  report; M17 makes `test:service` an observation unless a shared name appears.

## Scope

**Owned.** `src/styles/components/_tooltip.scss`, `src/styles/components/_popover.scss`,
`tests/src/styles/components/tooltip.test.ts`, `tests/src/styles/components/popover.test.ts`,
`app/browser/sections/TooltipSection.ts`, `app/browser/sections/PopoverSection.ts`,
`tests/app/browser/sections/TooltipSection.test.ts`, `tests/app/browser/sections/PopoverSection.test.ts`.

**Shared (report-only; return an exact patch against `2a3f223`).** `src/styles/index.scss` (the `@use`
rows, M19); `src/styles/_mixins.scss` (the `reset-text` block, M11) and
`tests/src/styles/mixins.test.ts` (its case); `tests/setupStyles.ts` (the tooltip and popover case
tables) and `tests/setupStyles.test.ts` (the tables bound to the inventory and added to the export and
frozen-table lists); `tests/setup.ts` (the `CaptureSubject` members and resting `CASCADE_KEYS` rows; a
`DRIVEN_KEYS` row only for a state the journey must drive); `tests/app/browser/integration.test.ts`,
`tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`; `tests/conformance.test.ts`
(`'tooltip'` and `'popover'` in `listed`, the order case); `tests/setupServer.test.ts` (the dash-proof
component set); `app/browser/constants.ts` (`TOOLTIP_COPY`, `TOOLTIP_SPECIMENS`, `POPOVER_COPY`,
`POPOVER_SPECIMENS`), `app/browser/Showcase.ts`, `app/browser/index.ts`; `guides/veneer.md` (the
`_tooltip.scss` and `_popover.scss` § Files rows; `### Tooltip classes` and `### Popover classes` in the
barrel's position; the `#### tooltip` and `#### popover` rows exactly as the gate measures them, and
any `### Additions` row; the selector and variable rows and the Tooltip and Popover `plugin` rows in
§ Compatibility; the popover and hint entries of the stacking table's Alias cell; the outside-ledger
and sanitizer sentences; the § Showcase and § Tests links); `ROADMAP.md` (nothing: the family row
closes at the family's exit).

**Off-limits.** MODAL's, OFFCANVAS's, and TOAST's owned files (`_modal.scss`, `_offcanvas.scss`,
`_toast.scss`, their proofs, their sections, their section proofs, and `NavbarSection.test.ts`);
`src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**` (the engine session's);
`tests/setupServer.ts`; `tests/fixtures/**` (except the Tailwind fixtures if a shared name appears,
reported first); `app/browser/styles/**`; `src/styles/_tokens.scss`, `src/styles/_theme.scss`, every
partial but `_tooltip.scss` and `_popover.scss`; `configs/**`, `package.json`, `package-lock.json`,
`README.md`; the vendored files.

**What asserts the state this change ends.** The wave-2 terrain § 5 TIP is the list: the `listed`
literal and the order case in `tests/conformance.test.ts`; the component set in
`tests/setupServer.test.ts`; the exact region and export lists in `Showcase.test.ts` and
`index.test.ts`; the journey's hanging-key set and its `tooltip` hit string, which stay true only
while no tip hangs; the outside-ledger and sanitizer sentences; the stacking Alias cell. Every entry
ends in Shared. Search bound: grep `'carousel'` and `CarouselSection` across `tests/`, `app/`, and
`src/` at `2a3f223` and re-derive the set.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git
command; no tree-wide `format` or lint `--fix` (scoped `npx oxfmt <file>` over your owned files is
permitted); `npm run build:src` and `npm run build:src:styles` are permitted in the validation copy;
scoped runs only; a runtime probe lives under `tmp/probe/` and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report file `/home/user/veneer-tp/tmp/units/tp-report.md`: the touched files; the ledger rows the
gate measured; the resting rows and subjects; the R19 proof matrix (each recorded selector and
condition mapped to its case, its distinguishing mutation, its specimen, and its scenario); the
failing-first and mutation record with commands; each gate's command and result line on the
validation copy; the hanging reading; the shared-name reading; the guide text; and the exact shared
patch (a unified diff against `2a3f223`, also written to `tmp/units/tp-shared.patch`). The report
states no count of a growable set and uses no banned term. Delivered as that file plus the same text as
the final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis —
per `.agents/orchestration.md` § Deviation protocol when a recorded selector cannot be rendered without
an inline style or an unshipped class, when a tip cannot be kept inside its frame, when a mutation the
criteria name cannot be distinguished by any assertion, when the ledger gate throws a claim collision,
or when a gate needs an off-limits file. Decide, record, and carry on for the specimen copy and names
within M14, the case names, where the guide sections' paragraphs sit, the stand-in utilities each
arrow takes, the exact `:has()` qualifiers of capture rows, and the position of new rows at the end of
their tables.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the validation copy: `npm run check` exits 0; `npm run build:src` exits 0 and the built cascade
   carries every `tooltip` and `popover` selector the inventory records with its declarations and no
   other rule naming those classes (the report lists them against the inventory).
3. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
   tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts
   tests/src/styles/mixins.test.ts` exits 0 on the validation copy, and each case distinguishes its
   named mutation: `.tooltip` and `.popover` read their `z-index` from `--vn-stack-hint` and
   `--vn-stack-popover`, and a wrapper retuning a rung moves the computed value (mutation: the literal
   `1080` or `1070`); a tip inside a bold, uppercase, right-aligned, nowrap parent reads the reset
   weight, transform, alignment, and wrapping (mutation: the `reset-text` call dropped from one
   partial); the mixin's case reads every declaration the block writes (mutation: one declaration
   dropped); `.tooltip` computes opacity 0 without `show` and `--bs-tooltip-opacity` with it
   (mutation: the `.show` rule dropped); each explicit side's arrow sits on the side facing its host
   and paints its facing border in the tip's background, and the popover's arrow paints its outer
   border colour under its fill (mutation: two sides' rules swapped); each
   `-auto[data-popper-placement^=<side>]` form resolves the same arrow geometry as the explicit side
   (mutation: one side's `@extend` pointing at another side); the popover header's bottom placement
   strip paints the header background (mutation: the rule dropped); an empty popover header computes
   `display: none` (mutation: the `:empty` rule dropped); both resolve their colours from the body and
   emphasis aliases in light and inside a dark island (mutation: a literal colour).
4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser
   tests/app/browser/sections/TooltipSection.test.ts tests/app/browser/sections/PopoverSection.test.ts`
   exits 0 on the validation copy, asserting each region's contract, no `[style]`, one specimen per
   explicit side inside `.viewport` with no trigger, `role="tooltip"` and a unique `id` on each tip, no
   `data-popper-placement` attribute in any specimen, and no `aria-describedby` claim.
5. `npm run test:conformance` exits 0 on the validation copy with `tooltip` and `popover` in `listed`
   and the presence, ledger, deferral, priority, and duplication gates green; `npm run test:guides` and
   `npm run test:policy` exit 0 there.
6. The report carries each item of § Output, and the patch passes `git apply --check` on a fresh
   extract of `2a3f223`.

**Observations, not criteria.** The journey, `CAPTURE=1`, `test:service`, and the whole styles project
are the Orchestrator's runs at landing.

## Review evidence

`git -C /home/user/veneer-tp diff 2a3f223` (with the new files rendered through `git diff --no-index
/dev/null <file>`) and `git -C /home/user/veneer-tp status --porcelain` at hand-back (`tp.diff`,
`tp-status.txt`), the patch `tp-shared.patch`, and the report.
