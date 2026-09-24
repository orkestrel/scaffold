# J-INTEGRATION round 1 — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

INT1, INT2, INT3, and INT5 closed, each with an executed proof, and the whole browser suite passes; **INT4 stopped, not done** (the route the brief names turns `test:guides` red, and the fix is a guide edit outside the owned sections). Nothing committed. Worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration`; evidence retained under `j-integration-evidence/`.

## Files touched

`git diff --stat`: `guides/veneer.md` 29, `src/browser/Backdrop.ts` 36, `src/browser/Modal.ts` 15, `src/browser/Offcanvas.ts` 38, `src/browser/types.ts` 5, `tests/src/browser/Backdrop.test.ts` 51, `Delegate.test.ts` 40, `Modal.test.ts` 196, `Offcanvas.test.ts` 301; 615 insertions, 96 deletions.

- `Modal.ts`: a hide the host took over during the backdrop's fade returns the backdrop to its shown state; a door follows the backdrop's removal.
- `Offcanvas.ts`: a door follows the backdrop's insertion in `show`; `#halt` returns the held backdrop to its shown state at every hide door after the fade starts.
- `Backdrop.ts`: `show` appends only when the parent does not hold the element, and reads its lifetime after the insertion through a private `#holds`.
- `types.ts`: the `BackdropInterface.show` `@remarks`.
- `guides/veneer.md`: `#### Modal` (the Backdrop bullet and the takeover paragraph), `#### Offcanvas` (the takeover paragraph, whose "no reaction runs inside its append" sentence was false).
- Search bound before the first edit: `HostSnapshot.ts:85,96,98`, `Isolation.ts:42`, `Modal.test.ts:22-23`; after, only the `HostSnapshot.ts` and `Isolation.ts` lines.

## Per obligation

- **INT1 (done).** `Modal.test.ts` loads `_tokens.scss`, `_fade.scss`, and `_modal.scss` through `?inline` and `scene.load` (the `Offcanvas.test.ts` and `Dropdown.test.ts` route); the test-local sheet, its false comment, and the reduced-motion sheet (covered by the shipped `transition` mixin) removed. Case "reads the shipped modal declarations the motion and stacking proofs run under" (display, transitions, `pointer-events`, backdrop opacity 0 and 0.5, host `z-index` above backdrop `z-index`, `elementFromPoint` returning the host, the `modal-static` transform). First run 1 failed / 39 passed on the writer's own assertion (`transform` reads `none` inside a `display: none` host), moved after the display write; then 40 of 40. Mutation: the modal's `z-index` set to the backdrop rung in `_modal.scss` gives `expected 1050 to be greater than 1050`.
- **INT2 (done, red first).** `Modal.hide` calls `void backdrop.show()` after its door fails while the modal is live. Case "returns the backdrop to its shown state when the host takes a hide over during the backdrop fade, with and without the fade token". Red: `Tests 1 failed | 40 skipped (41)` (with `fade` tokens `["modal-backdrop","fade"]`, opacity `"0"`; without, `["modal-backdrop"]`, opacity `"1"`); green `1 passed | 40 skipped (41)`; removing the restore reddens this case alone.
- **INT3 (done, proof only).** Case "drives the modal route and the offcanvas route once each for one trusted click over one host both triggers name under nested roots" (a consumer-built modal on the host; `userEvent.click` on a modal trigger nested in an offcanvas trigger); green `1 passed | 138 skipped (139)`; mutation `#mark` keyed to one route (`routes.get/set(Button, …)`) gives `[["show.vn.modal"],["hide.vn.modal"]]` for `[["show.vn.modal"],["hide.vn.offcanvas"]]`; `Delegate.ts` digest `8fa99441…0f749` before and after; no `Delegate.ts` defect.
- **INT5 (done, red first).** Case "writes and dispatches nothing more after a reaction to a backdrop write stops the change, and completes a change whose reaction only calls the opposite method". Red `1 failed | 46 skipped (47)`, the two insertion rows only (destroy: `stale ["DIV aria-modal"]`, the host keeping `aria-modal="true"` after destruction; token takeover: `stale ["DIV aria-modal"]`); fix: a door after `this.#backdrop.show()`; green `1 passed | 46 skipped`; removing the door reddens the same two rows.
- **Additions the same questions required (writer's decision, recorded).** The Offcanvas held backdrop (case "removes no backdrop and returns it to its shown state when the host takes a hide over after the backdrop begins to fade", replacing the old "removes no backdrop…" case; red on every row, tokens `[offcanvas-backdrop, fade]`, opacity `"0"`; with `#halt` alone `stale ["DIV children","DIV children"]`, because `Backdrop.show` moved the element, which is why `show` skips the append; then green). The Modal backdrop removal's door (case "writes and dispatches nothing more after a reaction inside the backdrop removal stops the hide"; red `stale ["BODY class","BODY class"]`; the Modal file then 42 of 42). The Backdrop's own door (case "writes no shown token after a reaction inside its insertion destroys it, resolving false"; red classList `["modal-backdrop","show"]`; then 9 of 9). The Backdrop in-place show (case "shows a backdrop its parent already holds in place, moving nothing"; no pre-fix red run, its mutation reddens it).
- **Mutation digests.** Each plant reddened only its named case; every file restored (`_modal.scss` `4d3a3930…01f00c8`; `Modal.ts` `d35fdab0…44f5`; `Offcanvas.ts` `2a5d79d8…7e79`; `Backdrop.ts` `f332c331…104e`); a diff against the pre-run digest file reported every digest unchanged.

## Unknowns

1. INT1's route: the `?inline` partial imports from `tests/src/browser/`; `npx oxlint --deny-warnings tests/src/browser/Modal.test.ts` exit 0; the file 40 of 40.
2. INT2's reading: wrong in both states (with `fade` opacity 0, without opacity 1; the Offcanvas likewise opacity 0); after the fix every row reads `show` and opacity 0.5.
3. INT5's reading: only the insertion let a stale change finish; nothing runs inside the token writes of a plain `div` (an observer runs inside the wait, whose door follows); the removal already had a door.

## Acceptance

`tmp/j-integration/acceptance.sh`: `check:src:browser`, oxlint, oxfmt, `check` exit 0; guides 20; policy 109 and 1 skipped; the owned files 270 of 270 (5 files); `test:src:browser` 805 of 805 (25 files, 75.58 s) on Chromium 153.0.8010.12. No shared-file patch; no `prove` call.

## Deviation state: INT4 stopped

Expected: each private shape in `HostSnapshot.ts` declared once in `types.ts`, and one array form. Found: a type in `types.ts` is a barrel export, and a probe adding `HostSnapshotAttribute` failed `test:guides` "documents every barrel export" with `[ 'type HostSnapshotAttribute' ]` (a `## Surface` row outside the owned sections; `int4-probe.log.txt`); `typeof this.#joined` fails `TS1003` (`int4-typeof-probe.log.txt`); `typescript/array-type: array-simple` requires `ReadonlyArray<{…}>` for inline shapes and `readonly T[]` for named ones. Both files restored with matching digests. Options: (A) public shapes with Surface rows; (B) the repetition stays, which the plan row offers. Hypothesis: B.

## Observations outside scope

- A show the host stopped leaves a shown backdrop behind a hidden modal or panel (the mirror of INT2; predates the unit).
- A takeover inside the backdrop's removal leaves the modal or panel shown with no backdrop (the door stops the hide, and the removal already ran).
- A Modal hide stopped at the `display` write leaves the host `display: none` while it carries `show` (predates the unit).
