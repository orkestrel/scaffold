# J-MODAL round 1 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, native subagent, 188 tool uses, 3865 s; retained from the subagent's return text with the mutation table replaced by a pointer to the retained log `j-modal-mutations.log.txt`, which carries it row for row; the tree is the worktree `veneer/tmp/worktrees/modal` on `unit/modal` from `e24e2c3`, uncommitted)

J-MODAL is complete. `Modal`, `Backdrop`, `ScrollLock`, `Isolation`, the delegate's modal toggle and dismiss routes, the tables, the guard, the parser and the guide are in place. Every acceptance command exits 0 on Chromium 153.0.8010.12, and every mutation turns its named case red. There is one ancillary deviation (the backdrop is not excepted from `Isolation`) and one shared-file patch for `types.ts` plus the guide row that must change with it. I made no `prove` MCP call.

The browser receipt is a probe in this worktree that printed `HeadlessChrome/153.0.8010.12`. The `src/styles/components/_modal.scss` log is empty on this tip, so the proofs use the brief's test-local sheet.

## Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/`.
- `src/browser/Modal.ts` (new): the engine, with Escape and light dismiss, the static bounce, `update` plus a window resize listener, a body `open` token counted per token, and a door read after every write, dispatch and await.
- `src/browser/Backdrop.ts` (new): the in-flow backdrop element. It reflows when animated, waits through `settleAnimations`, and a later call takes over from an earlier one.
- `src/browser/ScrollLock.ts` (new): a lock counted per document through one `HostSnapshot`, compensating like `ScrollBarHelper`. Elements narrower than the window are skipped, and a document with no window only gets `overflow: hidden`.
- `src/browser/Isolation.ts` (new): writes `inert` on the siblings at each level of the host's ancestor chain up to the body, clears it from the chain, and watches for inserted elements. Isolations share their claims per element, so the newest claim decides and they can end in any order. Focus returns on destroy.
- `src/browser/Delegate.ts`: adds the modal vocabulary, `#routeModal`, `#routeDismiss`, `#readModal`, `#readDismissed` and `#conflictsModal`. The old `#conflicts` body becomes `#conflictsCollapse`, and `Modal` joins the mark, acquire and discard unions.
- `src/browser/constants.ts`: adds the `MODAL_*` tables, plus `BACKDROP_CLASSES` and `SCROLL_LOCK_SELECTORS`.
- `src/browser/validators.ts`: adds `isModalEvent`.
- `src/browser/parsers.ts`: adds `parseBackdrop`.
- `src/browser/index.ts`: exports `ScrollLock`, `Backdrop`, `Isolation` and `Modal`.
- Tests: `Modal.test.ts`, `Backdrop.test.ts`, `ScrollLock.test.ts`, `Isolation.test.ts` (new); modal cases added to `Delegate.test.ts`; rows added to `validators.test.ts`, `parsers.test.ts` and the `index.test.ts` export list.
- `guides/veneer.md`: § Surface rows, the Modal fence, `#### Modal`, and the Modal `plugin` row (`shipped`, Proof `tests/src/browser/Modal.test.ts`, the catalog wording from the styles branch commit `d271926` with the M7 fix).

## Obligations
Red-first reading: `tmp/j-modal/red.py` (retained as `j-modal-red.py`) put the base bytes back in the source files, ran each test file whole, and restored the unit's bytes. Command, verbatim: `node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project src:browser <file>`. `Modal.test.ts`, `Backdrop.test.ts`, `ScrollLock.test.ts`, `Isolation.test.ts`, `Delegate.test.ts`, `validators.test.ts`, `parsers.test.ts`: `exit=1 | Test Files  1 failed (1) / Tests  no tests / ... Error: Failed to import test file`; `index.test.ts`: `exit=1 | Test Files  1 failed (1) / Tests  1 failed | 2 passed (3) / FAIL ... exports the browser surface without registering document or window listeners`; receipt `restored byte for byte`. That red is at file level; the per-case red is the mutation table.

Green readings, from the `GREEN?` rows of `mutations-2.log.txt`: Modal 0 failed of 29, Backdrop 0 of 7, ScrollLock 0 of 5, Isolation 0 of 5, Delegate 0 of 44, validators 0 of 12, parsers 0 of 5, index 0 of 3.

- **MODAL1 (`Modal`)** is pinned by: "shows over the backdrop and hides, locking the body, isolating the page, and moving focus in step"; "displays the host after the backdrop fades in…" and "hides the host after its own fade settles…"; "leaves focus and the page alone when focus is false" (R17); "resolves the backdrop, the dismissal, and focus from the attributes, the constructor winning path by path"; "leaves an empty class attribute on the body…" (the E13 bound, where it appears); the door cases ("stops writing when a reaction…", "stops a show whose shown-token write…", "stops a hide whose token removal…").
- **MODAL2 (the mechanisms)** is pinned by "hides the body overflow and pads…", "shares one lock…", "reference-counts the scroll lock and the open token across two modals…", "makes every element beside the host chain inert…" (focus attempts read the platform's inert behaviour), "hands each element to the newest live claim…", and "appends an element carrying the host and fade tokens, fades it in from a layout read…".
- **MODAL3 (delegate routes)** is pinned by "shows the modal a trigger names…returns focus to the trigger…", "returns no focus to the trigger when a listener prevents the show…", "hides the shown modal inside the root before…", "hides the modal a dismiss trigger names or sits in…", and the E12 refusal cases. J-ALERT had not landed, so I wrote the dismiss resolution inline in `#readDismissed`; it duplicates J-ALERT's.
- **MODAL4 (guard, tables, parser, barrel)**: `isModalEvent` reads `isInstance(value, CustomEvent)`. The typecheck admits it: it narrows to `CustomEvent<unknown>`, and `check:src:browser` exits 0. The tables are frozen, `parseBackdrop` has its rows, and the export list grew.

## Unknowns
1. **Isolation scope:** it walks the ancestor chain and marks the siblings at each level up to the body. The backdrop is **not** excepted, because `IsolationOptions` has no member that could name it. The modal host covers the backdrop, so no press reaches it either way. J-OFFCANVAS, whose backdrop takes the click, will need such a member in `types.ts`.
2. **`update`:** it re-runs Bootstrap's `_adjustDialog`, which re-reads the scrollbar width and pads the host. It does not re-measure the lock's body compensation, because the lock hides the scrollbar and a re-read would measure 0. It runs at show, on `update`, and on a window resize; hide removes both paddings.

## Mutation table
Retained verbatim as `j-modal-mutations.log.txt` (the `mutations-2.log.txt` run: every row `EXACT` or `JOINED`, eight `GREEN?` rows at 0 failed, identical digests, `receipt: restored byte for byte`). The earlier run (retained as `j-modal-mutations-first-run.log.txt`) missed some rows; each was repaired: two mis-aimed rows were re-targeted; the destroy lock proof was masked by locks that earlier mutated cases left behind, so the destruction cases gained an explicit `overflow` assertion; the `isConnected && checkVisibility()` focus guards in `Isolation` and in the delegate's focus return had no observable effect (the platform already refuses focus to a disconnected or unrendered element), so both were deleted, following the J-COLLAPSE precedent; the refused-show row now drops the abort instead.

## Acceptance command output
From `tmp/j-modal/gates.log.txt` (retained as `j-modal-writer-gates.log.txt`):
```
EXIT npm run check:src:browser -> 0
EXIT npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser -> 0
All matched files use the correct format.
EXIT npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md -> 0
 Test Files  14 passed (14)
      Tests  264 passed (264)
EXIT npm run test:src:browser -> 0          (plus the documented HostSnapshot SyntaxError diagnostic)
 Test Files  1 passed (1)
      Tests  19 passed (19)
EXIT npm run test:guides -> 0
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
EXIT npm run test:policy -> 0
EXIT npm run build:src:core -> 0
EXIT npm run build:src:styles -> 0
dist/src/browser/index.js  85.52 kB │ gzip: 20.09 kB │ map: 154.89 kB
EXIT npm run build:src:browser -> 0
 Test Files  1 passed (1)
      Tests  22 passed (22)
EXIT npm run test:conformance -> 0
 Test Files  4 passed (4)
      Tests  267 passed (267)
EXIT npm run test:setup -> 0
```
I also ran `npx tsc --noEmit -p tsconfig.json`, which typechecks the tests; it exits 0.

## `git status --short` and `git diff --stat`
```
 M guides/veneer.md
 M src/browser/Delegate.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/Backdrop.ts
?? src/browser/Isolation.ts
?? src/browser/Modal.ts
?? src/browser/ScrollLock.ts
?? tests/src/browser/Backdrop.test.ts
?? tests/src/browser/Isolation.test.ts
?? tests/src/browser/Modal.test.ts
?? tests/src/browser/ScrollLock.test.ts
 guides/veneer.md                     | 656 +++++++++++++++++++++++------------
 src/browser/Delegate.ts              | 171 ++++++++-
 src/browser/constants.ts             |  66 ++++
 src/browser/index.ts                 |   4 +
 src/browser/parsers.ts               |  25 +-
 src/browser/validators.ts            |  34 +-
 tests/src/browser/Delegate.test.ts   | 320 ++++++++++++++++-
 tests/src/browser/index.test.ts      |  13 +
 tests/src/browser/parsers.test.ts    |  25 +-
 tests/src/browser/validators.test.ts |  61 ++++
 10 files changed, 1146 insertions(+), 229 deletions(-)
```
Untracked files by line count: `Modal.ts` 453, `Backdrop.ts` 91, `ScrollLock.ts` 106, `Isolation.ts` 131, `Modal.test.ts` 1044, `Backdrop.test.ts` 118, `ScrollLock.test.ts` 119, `Isolation.test.ts` 144.

## Shared-file patch
Saved as `tmp/j-modal/shared.patch` (retained as `j-modal-patches/j-modal-shared.diff`). The implementation makes these `types.ts` sentences false, and the guide's `IsolationInterface` row has to change with them for parity: `IsolationInterface.destroy` ("Releases every inert claim the isolation holds, restoring each value no live isolation still claims, and returns focus to the trigger."), the `BackdropInterface` `show` and `hide` `@returns` sentences (adding "or a later call started before the fade settled"), and the `ModalInterface` `show` and `hide` `@returns` sentences (adding "or the host's `shown` token reads the change as taken over"), with the guide's `IsolationInterface` Methods row re-padded to the new sentence.

## Deviation state
- **Ancillary deviation, not a stop:** `Isolation` does not except the backdrop, as reported under Unknowns. Closing it needs a `types.ts` member such as a list of elements to leave alone, which belongs to J-OFFCANVAS and is not proposed here.
- **Ancillary choices I settled in scope:** the Delegate holds the modal vocabulary in an inline field type, not a new `ModalVocabulary` in `types.ts`; `BACKDROP_CLASSES` and `SCROLL_LOCK_SELECTORS` were added to `constants.ts`, because R19 requires default tables for the new mechanisms; the test sheet adds Bootstrap's `z-index` rungs and the `.modal-dialog` / `.modal-content` `pointer-events` pair, because a press beside the dialog needs them, one case adds its own reduced-motion rule, every `Modal.test.ts` case that calls `scene.load(cascade)` reads that sheet, `Backdrop.test.ts` and `ScrollLock.test.ts` each read their own small sheet, and the other cases read none; hide waits on the host's own fade, as Bootstrap's `hide` does, not on the dialog.
- **Merge warning:** the Modal `plugin` row is wider than the Obligation column, so I re-padded the whole Compatibility table in the formatter's shape. Every other row changes in whitespace only. The styles branch widened the same table in `d271926`, so expect a mechanical conflict at landing.
- **Observations:** this host's Chromium hides scrollbars, so every width reads 0; the `padding-right` branch of `update` and the non-zero compensation have no reading here, and the tests assert against the probed width. `recordListeners` cannot see window listeners on this runner, because Vitest defines its own `addEventListener` on the window; the existing `index.test.ts` window filter has the same blind spot. `DismissOptions.backdrop` says "a click on the backdrop"; for the modal it is a press on the host beside the dialog; the wording is right for Offcanvas, so I left it.

---

The Orchestrator's retention note: the instrument, its two logs, the red script, the writer's gate log, and the shared patch are retained beside this report as `j-modal-mutations.py`, `j-modal-mutations.log.txt`, `j-modal-mutations-first-run.log.txt`, `j-modal-red.py`, `j-modal-writer-gates.log.txt`, and `j-modal-patches/j-modal-shared.diff`; the review evidence is `j-modal.diff` and `j-modal-status.txt`, captured by `w2-gates.sh modal`, whose log is `j-modal-gates.log.txt`.
