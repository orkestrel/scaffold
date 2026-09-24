# Terrain brief — B-MODAL wave 2: MODAL, OFFCANVAS, TIP, TOAST (Cursor Grok, read-only)

Route `grok` on Cursor Grok (`grok-4.7-high`), `--mode=ask`, read-only, rooted at `/home/user/veneer`
(the session branch and `main` at `2a3f223`). Perform the reading directly and spawn nothing. Capture
`git status --porcelain` before and after; any change is a deviation. Return evidence with
`file:line` pointers, cite every site by its symbol or heading and a line only as approximate, and
return no raw file dumps, no decisions, no design, and no edits. Never read `dist/`,
`node_modules/bootstrap/dist/`, `tmp/`, or a lockfile. Quote at most twelve lines per site.

## Question

What does each wave-2 unit of the overlays and feedback family need at `2a3f223`, and which files
does each one touch? The units and their keys are fixed by
`/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` § Units and routing: MODAL
(`modal`, the `.modal-header .btn-close` combinator, the `overlay-backdrop` mixin), OFFCANVAS
(`offcanvas`, the `.offcanvas-header .btn-close` combinator, the R10 navbar specimen, the same
`overlay-backdrop` mixin), TIP (`tooltip`, `popover`, the `reset-text` mixin), and TOAST (`toast`,
the `.toast-header .btn-close` combinator). The family's first terrain,
`/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md`, was measured at `87ff1d0`,
before the family's wave 1 (CONDITIONS `8ca1609`, ALERT `f31f24c`, CAROUSEL `2071f8f`) and the
disclosure and utilities waves landed. Read it and the verdict first. Its § A (the oracle surface
from `node_modules/bootstrap/scss/`) and § B (the plugin obligations) stand unless the tree says
otherwise; re-measure only what the landings could have moved.

## Evidence sought

1. **What the tree carries per unit.** For each of MODAL, OFFCANVAS, TIP, and TOAST: whether its
   partial exists under `src/styles/components/` and what it holds; its key's rows in
   `tests/setup.ts` (`CASCADE_KEYS`, `DRIVEN_KEYS`, the `CLOSE_DEFERRED` rows and the `Overlays`
   owner that CLOSE-OUT retires later), in `tests/setupStyles.ts`, and in the conformance oracle
   (`tests/conformance.test.ts` and `tests/fixtures/oracle/inventory.json`: the key's selector and
   custom-property counts); its rows in `guides/veneer.md` (the deferral table, § Compatibility,
   the obligation ledger, the plugin rows with `Owner: J-ENGINE.`); whether `src/styles/index.scss`
   and `src/styles/_mixins.scss` already carry the `overlay-backdrop` or `reset-text` mixin; and the
   `.btn-close` combinator sites in `src/styles/components/_close.scss`.
2. **The sibling pattern to copy.** How the landed ALERT and CAROUSEL units shipped a key end to
   end: the partial, its `@use` order in `src/styles/index.scss` (the release's load order), the
   section class under `app/browser/sections/`, its registration in `app/browser/constants.ts` and
   `app/browser/Showcase.ts`, its style proof under `tests/src/styles/components/`, its section
   test under `tests/app/browser/sections/`, its capture registration (`CASCADE_KEYS` rows and the
   journey's frames in `tests/app/browser/integration.test.ts`), and its guide rows. Name the files
   and symbols; do not dump them.
3. **Frames and prerequisites.** How the `.viewport` frame in `app/browser/styles/_shell.scss` and
   the specimen band (`[data-specimen]:has(> .viewport)`) serve a fixed or viewport-sized overlay
   specimen; which UTIL-DISPLAY and UTIL-PLACEMENT classes (`d-block`, `position-*`, `start-50`,
   `top-50`, `translate-middle-*`) and which NAVBAR and DROPDOWN rules the four units read; and
   the `normalizeMediaCondition` helper CONDITIONS shipped, where OFFCANVAS's responsive
   `offcanvas-{breakpoint}` loop meets it.
4. **The collision map.** Every file two or more of the four units must write (for example
   `tests/setup.ts`, `tests/setupStyles.ts`, `src/styles/index.scss`, `src/styles/_mixins.scss`,
   `guides/veneer.md`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, the journey), with
   the region of each file each unit touches, so the Orchestrator can scope shared files as
   report-only patches.
5. **Files each unit makes false.** For each unit, the tests and fixtures whose assertions its
   landing makes false (a deferral row a test enumerates, an inventory count, a section order, a
   guide parity row), found by searching for the key's existing members rather than by reasoning.

## Output

Return, as your final message and nothing else: one section per evidence item, each unit's
findings under its own heading within the section, a contradictions list (the earlier terrain
report or the verdict against the tree), and an unresolved-inputs list.
