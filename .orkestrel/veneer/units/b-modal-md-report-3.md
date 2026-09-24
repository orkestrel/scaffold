# Unit MODAL (`md`) round 3 report

Round 3 carries fixes M7, M8, and M9 from `md-audit-2-verdict.md`, and writes this report under the
M10 obligation. The revised shared patch is `.orkestrel/veneer/units/md-shared-3.patch`, which supersedes
`md-shared-2.patch` whole.

- **Gates:** every gate the criteria name exits 0 on the rebuilt validation copy. In the worktree,
  the `format:check` script and the `lint:check` script each exit 0.
- **Patch check:** the revised patch passes `git apply --check` on a fresh extract of `2a3f223`.
- **Interdiff:** against `md-shared-2.patch`, it differs only at the M7, M8, and M9 sites and in the
  re-flow those sites carry.
- **Owned files:** no owned file changed this round. The M9 sweep found no hit in the owned files,
  and the `.orkestrel/veneer/units/md-3.diff` file is byte-equal to the `.orkestrel/veneer/units/md-2.diff` file.

## Fixes

### M7: the toggle-trigger clause of the Modal plugin row

Site: the Modal `plugin` row in the § Compatibility table of the `guides/veneer.md` file.

- **Before:** "…a `[data-bs-toggle="modal"]` trigger toggles the dialog it names, hides any other shown
  dialog first, and returns focus to itself after the dialog hides while the trigger is still
  visible; …"
- **After:** "…a `[data-bs-toggle="modal"]` trigger calls the `hide` method of the modal already shown,
  which that modal's `hide.bs.modal` event can cancel, then calls the `toggle` method of the dialog it
  names, and returns focus to itself after that dialog hides while the trigger is still visible; …"

Every other clause of the row reads as round 2 wrote it.

The release source lines each clause rests on, in the `node_modules/bootstrap/js/src/modal.js` file:

- **The handler:** the data-API click handler is
  `EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {` at line
  339.
- **The `hide` call:** the handler finds the shown modal through
  `const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR)` at line 360, where the `OPEN_SELECTOR`
  constant is `'.modal.show'` at line 45. It then calls `Modal.getInstance(alreadyOpen).hide()` at
  lines 361 and 362, inside the `if (alreadyOpen)` guard.
- **The cancelable hide:** the `hide` method starts at line 123. It triggers the `hide.bs.modal` event
  and returns at line 130, `if (hideEvent.defaultPrevented) {`, before any change to the dialog.
- **The `toggle` call:** the handler calls `data.toggle(this)` at line 367 on the instance of the
  target that `getElementFromSelector(this)` names at line 340.
- **What the toggle does:** the `toggle` method at lines 94 and 95 calls the `hide` method or the `show`
  method. Each of those methods can return without a change: the `show` method at line 107,
  `if (showEvent.defaultPrevented) {`, and the `hide` method at line 130.
- **Focus return:** the focus restorer is registered at lines 346 to 357. It runs only when the
  `show.bs.modal` event is not prevented (line 347), and it focuses the trigger on the `hidden` event
  under `if (isVisible(this))` (line 353).

The row promises no unconditional visibility change: it names the calls, the cancelable event, and
the condition on the focus return.

Reading: `npm run test:guides` and `npm run test:conformance` exit 0 on the copy. The conformance
compatibility case reads the rewritten row.

### M8: the paragraph under the stacking table

Site: the paragraph under the stacking table in the `guides/veneer.md` file.

- **Before:** "Bootstrap declares each rung except the sticky and fixed levels as a variable on its
  component's rule, and writes those levels as literals in its position helpers; a component Veneer
  ships binds that variable to its rung, and the Alias column names each binding."
- **After:** "Bootstrap declares each rung as a variable on its component's rule, except the sticky and
  fixed levels, which it writes as literals in its position helpers, and the drawer-backdrop level,
  which it writes as a literal on the `.offcanvas-backdrop` rule; a component Veneer ships binds that
  variable to its rung, and the Alias column names each binding."

The release source lines each clause rests on, in the `node_modules/bootstrap/scss` folder:

- **A variable per rung:**
  - The `_dropdown.scss` file declares `--#{$prefix}dropdown-zindex: #{$zindex-dropdown};` at line 21
    and applies it at line 50.
  - The `_offcanvas.scss` file declares `--#{$prefix}offcanvas-zindex: #{$zindex-offcanvas};` at
    line 5 and applies it at line 37.
  - The `_modal.scss` file declares `--#{$prefix}modal-zindex: #{$zindex-modal};` at line 12 and
    applies it at line 38. It declares `--#{$prefix}backdrop-zindex: #{$zindex-modal-backdrop};` at
    line 115, which the `overlay-backdrop` mixin reads at line 120.
  - The `_popover.scss` file declares `--#{$prefix}popover-zindex` at line 3 and applies it at
    line 25.
  - The `_tooltip.scss` file declares `--#{$prefix}tooltip-zindex` at line 4 and applies it at
    line 18.
  - The `_toasts.scss` file declares `--#{$prefix}toast-zindex` at lines 3 and 41 and applies it at
    line 44.
- **The sticky and fixed literals:** the `helpers/_position.scss` file writes
  `z-index: $zindex-fixed;` at lines 8 and 16, and `z-index: $zindex-sticky;` at lines 27 and 33.
- **The drawer-backdrop literal:** the `_offcanvas.scss` file writes
  `@include overlay-backdrop($zindex-offcanvas-backdrop, $offcanvas-backdrop-bg, $offcanvas-backdrop-opacity);`
  at line 120. That call passes the Sass value rather than a custom property on the
  `.offcanvas-backdrop` rule.

Reading: `npm run test:guides` exits 0 on the copy.

### M9: boundaries and caps named by position

Site: the `MODAL_SIZE_CASES` TSDoc in the `tests/setupStyles.ts` file.

- **Before:** "Below the first boundary no dialog is capped."
- **After:** "Below the small boundary no dialog is capped."

Site: the comment in the dialog-cap binding case of the `tests/setupStyles.test.ts` file.

- **Before:** "…so the first cap of a size that declares no width of its own there is the default one."
- **After:** "…so the cap at the small boundary of a size that declares no width of its own there is the
  default one."

The sweep read every line rounds 1 and 2 added, in the shared patch and in the owned files, for these
words: `first`, `second`, `third`, `last`, `final`, `next`, `previous`, `former`, `latter`,
`narrowest`, `widest`, `lowest`, and `highest`. It found no other boundary, cap, step, or rung named
by position. Each other hit was ruled as the following list states:

- **Replaced by M7:** the "hides any other shown dialog first" clause in the plugin row.
- **Fixture data:** the specimen sample strings "at first light" and "the next convoy".
- **A copy, not a position:** "a second copy" in the backdrop fixture comment.
- **Unchanged rows:** the lines of other components' compatibility rows that the table re-pad
  carries unchanged.
- **Identifiers and property names:** the `first` and `last` bindings and the `previous` binding in
  the `modal.test.ts` file, and the `*-bottom` property names.
- **Viewport variants, not boundaries, caps, steps, or rungs:**
  - "The narrowest variant is read" in the `modal.test.ts` file.
  - "at the narrowest and the widest variant" in the `ModalSection.test.ts` file.
  - Each of these names a viewport variant, and those files sit outside this round's owned sites.

Reading: the `tests/setupStyles.test.ts` file in the setup project exits 0 on the copy.

## Gates

The validation copy `tmp/probe/md-base/` in the worktree was built this way:
1. Extract `git archive 2a3f223`.
2. Hard-link the `node_modules` folder.
3. Apply `md-shared-2.patch` with `patch -p1`.
4. Copy the owned files over.
5. Make the round-3 edits.

After the readings, the copy was deleted with the pristine extract, the apply extracts, and the
file list. The `md` prefix follows the note-2 rule, so the copy's folder is `md-base` rather than
`base`.

The script `.orkestrel/veneer/units/md-instruments/md-gates-3.sh` ran the gates from the copy's root, with the npm 11 `PATH`
entry and `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Each log is in `.orkestrel/veneer/units/md-instruments/md-gates-3/`, and
the summary is `.orkestrel/veneer/units/md-instruments/md-gates-3.txt`.

| Command, as it ran | Result |
| --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md tests/setupStyles.ts tests/setupStyles.test.ts` | exit 0, `All matched files use the correct format.` |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/setupStyles.ts tests/setupStyles.test.ts` | exit 0 |
| `npm run build:src` | exit 0 |
| `npm run check` | exit 0 |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | exit 0, `Tests  126 passed (126)` |
| `npm run test:guides` | exit 0, `Tests  19 passed (19)` |
| `npm run test:policy` | exit 0, `Tests  109 passed \| 1 skipped (110)` |
| `npm run test:conformance` | exit 0, `Tests  22 passed (22)` |

The script's first run left out `npm run build:src`, so the copy held no built stylesheet. That run
failed `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`
with `Tests  5 failed | 121 passed (126)` and `npm run test:conformance` with
`Tests  6 failed | 16 passed (22)`, every failure an `ENOENT` error on
`dist/src/styles/index.css`. I added the build line to the script, and the preceding table records the
run that followed.

In the worktree:

| Command, as it ran | Result |
| --- | --- |
| `npm run format:check` | exit 0 (`.orkestrel/veneer/units/md-instruments/md-3-worktree-format.log.txt`) |
| `npm run lint:check` | exit 0 (`.orkestrel/veneer/units/md-instruments/md-3-worktree-lint.log.txt`) |

## The revised patch

The revised patch is `.orkestrel/veneer/units/md-shared-3.patch`, a unified diff against `2a3f223`.

- **Apply check:** `git apply --check ../../units/md-shared-3.patch`, run in a fresh `git archive
  2a3f223` extract that holds its own `git init` repository, exited 0.
- **Stat:** `git apply --stat` reads `16 files changed, 917 insertions(+), 223 deletions(-)`.
- **Fidelity:** applied, the patch reproduces the copy's shared files byte for byte.

The interdiff is `.orkestrel/veneer/units/md-instruments/md-3-shared-interdiff.txt`. It compares an extract carrying
`md-shared-2.patch` against an extract carrying `md-shared-3.patch`, and touches these files:

- **The `guides/veneer.md` file:**
  - the stacking paragraph (M8, re-flowed);
  - the Modal `plugin` row (M7);
  - the compatibility table's divider row and column padding. The longer row widens the Obligation
    column, so the formatter re-pads that table again, and integration re-formats it rather than
    merging it line by line.
- **The `tests/setupStyles.ts` file:** the `MODAL_SIZE_CASES` TSDoc line (M9).
- **The `tests/setupStyles.test.ts` file:** the binding case's comment (M9, re-flowed).

## Review evidence

- `.orkestrel/veneer/units/md-3.diff`: the worktree diff against `2a3f223`, plus each owned file through
  `git diff --no-index /dev/null`. It is byte-equal to `.orkestrel/veneer/units/md-2.diff`.
- `.orkestrel/veneer/units/md-3-status.txt`: the worktree's status, which lists the owned files alone, all
  untracked.
- `.orkestrel/veneer/units/md-shared-3.patch`: the revised shared patch.
- `.orkestrel/veneer/units/md-instruments/md-3-shared-interdiff.txt`: the interdiff against `md-shared-2.patch`.
- `.orkestrel/veneer/units/md-instruments/md-report-3.md`: this report.

## Deviation state

Nothing stopped the unit. I settled these choices as the deviation contract allows:

- **M7 wording:** "the modal already shown" names the element the handler finds through the
  `.modal.show` selector. The row keeps the focus-return clause, and ties it to "that dialog", the
  dialog the trigger names.
- **Re-flowed text:** the stacking paragraph and the binding case's comment.
- **Where this round wrote:** every instrument, log, and extract went under the worktree's
  `tmp/units/` or `tmp/probe/` folders with the `md` prefix. The session scratchpad was only read,
  for the npm 11 `PATH` entry.
